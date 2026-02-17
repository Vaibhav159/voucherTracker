"""
Gyftr platform sync service.
"""

from __future__ import annotations

import requests

from backend.vouchers.choices import PlatformName
from backend.vouchers.services.base import BaseSyncService
from backend.vouchers.services.base import SyncItem
from backend.vouchers.services.base import SyncResult


class GyftrSyncService(BaseSyncService):
    """Sync service for Gyftr platform."""

    platform_name = PlatformName.GYFTR
    platform_icon_url = "https://www.gyftr.com/public/images/gyftr_logo.png"

    CATEGORIES_URL = "https://communication.gyftr.com/hdfcsmartbuyapizeta/hdfcbank/api/v1/home/categories"
    BRANDS_URL_TEMPLATE = (
        "https://communication.gyftr.com/hdfcsmartbuyapizeta/hdfcbank/api/v1/categories/brands/{slug}/300"
    )
    HEADERS = {
        "accept": "application/json, text/plain, */*",
        "origin": "https://www.gyftr.com",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
        "content-type": "application/json",
    }

    def fetch_and_sync(self) -> dict:
        """
        Fetch data from Gyftr API and sync to database.

        Returns:
            Dict with status, message, and sync counts
        """
        try:
            # 1. Fetch Categories
            cat_res = requests.get(self.CATEGORIES_URL, headers=self.HEADERS)
            cat_res.raise_for_status()
            cat_json = cat_res.json()

            if cat_json.get("status") != "SUCCESS":
                return {"status": "error", "message": "Failed to fetch categories"}

            categories = cat_json.get("data", [])
            sync_items: list[SyncItem] = []

            sync_result = SyncResult(0, 0, 0, [])

            all_external_ids = set()

            # 2. Fetch brands for each category
            for cat in categories:
                cat_slug = cat.get("slug")
                brands_url = self.BRANDS_URL_TEMPLATE.format(slug=cat_slug)

                payload = {
                    "id": 0,
                    "brandid": 0,
                    "from": 0,
                    "to": 500,
                    "bogoFilter": "",
                    "redemptionFilter": "",
                    "saleFilter": False,
                }

                try:
                    brand_res = requests.post(brands_url, headers=self.HEADERS, json=payload)
                    brand_res.raise_for_status()
                    brand_json = brand_res.json()

                    if brand_json.get("status") != "SUCCESS":
                        continue

                    brands = brand_json.get("data", [])

                    for item in brands:
                        item["category"] = cat["name"]  # Add category for raw_data
                        sync_item = self._transform_item(item)
                        if sync_item:
                            sync_items.append(sync_item)
                            all_external_ids.add(sync_item.external_id)

                except Exception as brand_err:
                    print(f"Error fetching brands for {cat_slug}: {brand_err}")
                    continue

                # 3. Perform bulk sync
                print(f"Fetched {len(sync_items)} brands for {cat_slug}")
                result = self.sync_items(sync_items)
                sync_items.clear()
                sync_result += result
                print(f"Synced {len(result)} brands for {cat_slug}")

            # 4. Update stock status for all items
            print(f"Updating stock status. Found {len(all_external_ids)} active items.")
            self.update_stock_status(all_external_ids)

            return {
                "status": "success",
                "message": "Synced Gyftr items.",
                "created": sync_result.created,
                "updated": sync_result.updated,
                "skipped_count": sync_result.skipped_count,
            }

        except Exception as e:
            return {"status": "error", "message": str(e)}

    def _transform_item(self, item: dict) -> SyncItem | None:
        """Transform a Gyftr API item to SyncItem format."""
        brand_name = item.get("name")
        external_id = str(item.get("id"))

        try:
            offer_type = item.get("offer_type") or ""
            offer_val = float(item.get("offer_value", 0) or 0) if offer_type == "DIS" else 0
        except (ValueError, TypeError):
            offer_val = 0

        discount_text = f"Discount {offer_val:g}%" if offer_val > 0 else "None"
        slug = item.get("slug")
        link = f"https://www.gyftr.com/instantvouchers/{slug}"

        return SyncItem(
            external_id=external_id,
            brand_name=brand_name,
            gift_card_name=brand_name,
            fee=discount_text,
            link=link,
            raw_data=item,
            priority=5,  # Lower than Maximize
            cap="",
        )
