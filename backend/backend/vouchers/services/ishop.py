"""
iShop platform sync service.
"""

from __future__ import annotations

import hashlib
import json

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher
from cryptography.hazmat.primitives.ciphers import algorithms
from cryptography.hazmat.primitives.ciphers import modes

from backend.vouchers.choices import PlatformName
from backend.vouchers.services.base import BaseSyncService
from backend.vouchers.services.base import SyncItem


class IShopSyncService(BaseSyncService):
    """Sync service for iShop platform."""

    platform_name = PlatformName.ISHOP
    platform_icon_url = "https://ishop.reward360.in/favicon.ico"

    # TODO: Replace with actual theme ID
    THEME_ID = "REPLACE_WITH_ACTUAL_THEME_ID"

    def decrypt_data(self, encrypted_str: str, theme_id: str | None = None) -> dict | list:
        """
        Decrypt iShop encrypted response.

        Args:
            encrypted_str: The encrypted string from iShop API
            theme_id: Optional theme ID override (defaults to class THEME_ID)

        Returns:
            Decrypted JSON data or dict with error
        """
        theme_id = theme_id or self.THEME_ID

        try:
            # 1. Split the response string
            parts = encrypted_str.split(".")
            if len(parts) != 4:
                raise ValueError("Invalid format: Expected 4 dot-separated parts")

            ciphertext_hex, iv_hex, tag_hex, _ = parts

            # 2. Convert Hex to Bytes
            ciphertext = bytes.fromhex(ciphertext_hex)
            iv = bytes.fromhex(iv_hex)
            tag = bytes.fromhex(tag_hex)

            # 3. Generate the Key (SHA-256 hash of themeId)
            key = hashlib.sha256(theme_id.encode("utf-8")).digest()

            # 4. Decrypt using AES-GCM
            decryptor = Cipher(
                algorithms.AES(key),
                modes.GCM(iv, tag),
                backend=default_backend(),
            ).decryptor()

            decrypted_data = decryptor.update(ciphertext) + decryptor.finalize()

            # 5. Parse JSON
            return json.loads(decrypted_data.decode("utf-8"))

        except Exception as e:
            return {"error": str(e)}

    def sync_from_encrypted(self, encrypted_data: str) -> dict:
        """
        Decrypt and sync iShop data.

        Args:
            encrypted_data: Encrypted data string from iShop API

        Returns:
            Dict with status, message, and sync counts
        """
        try:
            # 1. Decrypt
            decrypted_items = self.decrypt_data(encrypted_data)

            if isinstance(decrypted_items, dict) and "error" in decrypted_items:
                return {
                    "status": "error",
                    "message": f"Decryption failed: {decrypted_items['error']}",
                }

            if not isinstance(decrypted_items, list):
                # It might be wrapped in keys like {"data": [...]}
                if isinstance(decrypted_items, dict) and "data" in decrypted_items:
                    decrypted_items = decrypted_items["data"]
                else:
                    return {"status": "error", "message": "Decrypted data is not a list"}

            # 2. Transform items
            sync_items: list[SyncItem] = []
            for item in decrypted_items:
                sync_item = self._transform_item(item)
                if sync_item:
                    sync_items.append(sync_item)

            # 3. Perform bulk sync
            result = self.sync_items(sync_items)

            return {
                "status": "success",
                "message": f"Synced {len(decrypted_items)} items from iShop.",
                "created": result.created,
                "updated": result.updated,
                "skipped_count": result.skipped_count,
            }

        except Exception as e:
            return {"status": "error", "message": str(e)}

    def _transform_item(self, item: dict) -> SyncItem | None:
        """Transform an iShop item to SyncItem format."""
        brand_name = item.get("brand")
        if not brand_name:
            return None

        name = item.get("name")
        sku = item.get("sku")
        external_id = str(sku) if sku else str(item.get("_id"))

        # Reward Value / Fee
        reward_value = item.get("reward_value", "")
        fee_text = reward_value if reward_value else "Check Site"

        return SyncItem(
            external_id=external_id,
            brand_name=brand_name,
            gift_card_name=name,
            fee=fee_text,
            link="https://ishop.reward360.in/",
            raw_data=item,
            priority=5,
            cap="",
        )
