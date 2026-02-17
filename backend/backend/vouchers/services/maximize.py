"""
Maximize platform sync service.
"""

from __future__ import annotations

from collections import defaultdict

import requests

from backend.vouchers.choices import PlatformName
from backend.vouchers.services.base import BaseSyncService
from backend.vouchers.services.base import SyncItem


class MaximizeSyncService(BaseSyncService):
    """Sync service for Maximize platform."""

    platform_name = PlatformName.MAXIMIZE
    platform_icon_url = "https://savemax.maximize.money/favicon.ico"

    API_URL = "https://savemax.maximize.money/api/savemax/giftcard/nsession/list?sort=alphabet_asc"
    HEADERS = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-IN,en;q=0.6",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    }

    def fetch_and_sync(self) -> dict:
        """
        Fetch data from Maximize API and sync to database.

        Returns:
            Dict with status, message, and sync counts
        """
        try:
            external_res = requests.get(self.API_URL, headers=self.HEADERS)
            external_res.raise_for_status()
            data = external_res.json()
            items = data.get("data", {}).get("giftCardList", [])

            # Group by brand to handle single vs multiple gift cards per brand
            brand_to_giftcard_map: dict[str, list] = defaultdict(list)
            for item in items:
                brand_to_giftcard_map[item["brand"]].append(item)

            if not brand_to_giftcard_map:
                return {"status": "error", "message": "No brands found."}

            # Transform items to SyncItem format
            sync_items: list[SyncItem] = []
            all_external_ids = set()

            for brand_name, brand_items in brand_to_giftcard_map.items():
                if "Phone" in brand_name:
                    print(brand_items)
                if len(brand_items) == 1:
                    item = brand_items[0]
                    sync_item = self._transform_item(item, use_brand_name=True)
                    if sync_item:
                        sync_items.append(sync_item)
                        all_external_ids.add(sync_item.external_id)
                else:
                    # Multiple items per brand - match via gift card name only
                    for item in brand_items:
                        sync_item = self._transform_item(item, use_brand_name=False)
                        if sync_item:
                            sync_items.append(sync_item)
                            all_external_ids.add(sync_item.external_id)

            # Perform bulk sync
            result = self.sync_items(sync_items)

            # Update stock status
            self.update_stock_status(all_external_ids)

            return {
                "status": "success",
                "message": f"Synced {len(items)} items.",
                "created": result.created,
                "updated": result.updated,
                "skipped_count": result.skipped_count,
                "skipped_items": result.skipped_items,
            }

        except Exception as e:
            return {"status": "error", "message": str(e)}

    def _transform_item(self, item: dict, use_brand_name: bool) -> SyncItem | None:
        """Transform a Maximize API item to SyncItem format."""
        discount = item.get("discount")
        if discount is None:
            return None

        external_id = str(item.get("id"))
        brand_name = item.get("brand")
        gift_card_name = item.get("giftCardName")

        return SyncItem(
            external_id=external_id,
            brand_name=brand_name if use_brand_name else gift_card_name,
            gift_card_name=gift_card_name,
            fee=f"{discount}% OFF" if discount > 0 else "0% OFF",
            link=f"https://www.maximize.money/gift-cards/{brand_name}/{external_id}",
            raw_data=item,
            priority=10,
            cap="No Cap",
        )
