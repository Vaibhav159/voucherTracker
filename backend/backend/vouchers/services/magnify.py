from __future__ import annotations

import re

import requests

from backend.vouchers.choices import PlatformName
from backend.vouchers.services.base import BaseSyncService
from backend.vouchers.services.base import SyncItem

BATCH_SIZE = 100


class MagnifySyncService(BaseSyncService):
    """Sync service for Magnify platform."""

    platform_name = PlatformName.MAGNIFY
    platform_icon_url = "https://magnify.club/favicon.ico"

    API_URL = "https://api.magnify.club/api/giftcard/public/inventory?limit=1000"
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    }

    @staticmethod
    def to_slug(name: str):
        s = name.strip().lower()
        s = s.replace("'", "-")
        s = re.sub(r"[^a-z0-9\s-]", "", s)
        s = re.sub(r"\s+", "-", s)
        s = re.sub(r"-+", "-", s)
        return s.strip("-")

    def fetch_and_sync(self) -> dict:
        try:
            print("Fetching vouchers from Magnify platform...")
            response = requests.get(self.API_URL, headers=self.HEADERS)
            response.raise_for_status()
            data = response.json()

            # Handle list or dict response
            items = []
            if isinstance(data, list):
                items = data
            elif isinstance(data, dict):
                if "data" in data:
                    inner = data["data"]
                    if isinstance(inner, list):
                        items = inner
                    elif isinstance(inner, dict):
                        items = inner.get("giftCards", [])
                else:
                    items = data.get("giftCards", [])

            sync_items = []
            for item in items:
                sync_item = self._transform_item(item)
                if sync_item:
                    sync_items.append(sync_item)

            result = self.sync_items(sync_items)

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

    def _transform_item(self, item: dict) -> SyncItem | None:
        discount_val = item.get("discount", 0)
        try:
            val = float(discount_val)
            if val <= 0:
                fee = "None"
            else:
                percentage = val * 100
                if percentage.is_integer():
                    fee = f"Discount {int(percentage)}%"
                else:
                    items_str = f"{percentage:.2f}".rstrip("0").rstrip(".")
                    fee = f"Discount {items_str}%"
        except:
            fee = "Check App"

        external_id = str(item.get("id"))
        name = item.get("name")
        slug = item.get("slug") or self.to_slug(name)

        # Link construction - using generic or slug if available
        link = f"https://magnify.club/buy-gift-card/{slug}"

        return SyncItem(
            external_id=external_id,
            brand_name=name,
            gift_card_name=name,
            fee=fee,
            link=link,
            raw_data=item,
            priority=10,
            cap="Unlimited",
        )
