"""
iShop platform sync service.
"""

from __future__ import annotations

import binascii
import hashlib
import json
import os

import requests
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

    BASE_URL = "https://ishop.reward360.in"
    THEME_ID: str | None = None  # Will be fetched dynamically

    def __init__(self):
        super().__init__()
        self.session = requests.Session()
        self.session.headers.update(
            {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-IN,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "origin": self.BASE_URL,
                "pragma": "no-cache",
                "sec-ch-ua": '"Brave";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",  # noqa: E501
            },
        )

    def encrypt(self, plain_text: str) -> str:
        """
        Encrypts payload using AES-GCM.
        Output format: Hex(Cipher).Hex(IV).Hex(Tag)
        """
        if not self.THEME_ID:
            raise ValueError("Theme ID not set. Cannot encrypt.")

        key = hashlib.sha256(self.THEME_ID.encode("utf-8")).digest()

        # 1. Generate 12-byte IV (Nonce)
        iv = os.urandom(12)

        # 2. Setup Cipher
        encryptor = Cipher(
            algorithms.AES(key),
            modes.GCM(iv),
            backend=default_backend(),
        ).encryptor()

        # 3. Encrypt
        ciphertext = encryptor.update(plain_text.encode("utf-8")) + encryptor.finalize()
        tag = encryptor.tag

        # 4. Convert to Hex
        hex_cipher = binascii.hexlify(ciphertext).decode("utf-8")
        hex_iv = binascii.hexlify(iv).decode("utf-8")
        hex_tag = binascii.hexlify(tag).decode("utf-8")

        # 5. Format Output
        return f"{hex_cipher}.{hex_iv}.{hex_tag}"

    def decrypt_data(self, encrypted_str: str, theme_id: str | None = None) -> dict | list:
        """
        Decrypt iShop encrypted response.

        Args:
            encrypted_str: The encrypted string from iShop API
            theme_id: Optional theme ID override (defaults to instance THEME_ID)

        Returns:
            Decrypted JSON data or dict with error
        """
        theme_id = theme_id or self.THEME_ID
        if not theme_id:
            return {"error": "Theme ID not provided for decryption"}

        try:
            # 1. Split the response string
            parts = encrypted_str.split(".")
            # Server usually sends 4 parts but sometimes 3, logic from script adapts
            if len(parts) < 3:
                raise ValueError(f"Invalid format: Expected at least 3 dot-separated parts, got {len(parts)}")

            ciphertext_hex = parts[0]
            iv_hex = parts[1]
            tag_hex = parts[2]
            # part[3] might be extra signature or similar, ignored in script too

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

    def initialize_session(self):
        """Step 1: Get CSRF tokens and initialize cookies."""
        url = f"{self.BASE_URL}/middleware/csrf-token"
        resp = self.session.get(url)
        resp.raise_for_status()

        # Extract tokens
        data = resp.json()
        xsrf_token = data.get("token")

        # Requests Session automatically handles the cookies from the response,
        # but we need to update headers with the XSRF token manually.
        self.session.headers.update(
            {
                "csrf-token": xsrf_token,
                "x-csrf-token": xsrf_token,
                "XSRF-TOKEN": xsrf_token,
            },
        )

    def get_app_config(self, post_payload: str = "XXXXXX"):
        """Step 2: Get App Config to retrieve Theme-ID."""
        url = f"{self.BASE_URL}/middleware/appConfig/get-config-data"

        payload = {"post": post_payload}
        resp = self.session.post(url, json=payload)
        resp.raise_for_status()

        # Extract Theme ID from headers
        self.THEME_ID = resp.headers.get("theme-id")
        if not self.THEME_ID:
            raise ValueError("Theme-ID not found in response headers")

    def fetch_product_listing(self) -> list[dict]:
        """Step 3: Encrypt payload and fetch products."""
        if not self.THEME_ID:
            raise RuntimeError("Theme ID not initialized. Run get_app_config first.")

        url = f"{self.BASE_URL}/middleware/e-gift/getProductListingById"

        # Create and Encrypt Payload
        raw_payload = json.dumps({"filter": ""})
        encrypted_payload = self.encrypt(raw_payload)

        # Send Request
        resp = self.session.post(url, json={"postData": encrypted_payload})
        resp.raise_for_status()

        response_data = resp.json()
        encrypted_response = response_data.get("response")

        if not encrypted_response:
            raise ValueError("No encrypted response found in payload.")

        decrypted_items = self.decrypt_data(encrypted_response)

        if isinstance(decrypted_items, dict) and "error" in decrypted_items:
            raise ValueError(f"Decryption failed: {decrypted_items['error']}")

        print(f"{decrypted_items.keys()=}")

        if not isinstance(decrypted_items, list):
            # It might be wrapped in keys like {"data": [...]}
            if isinstance(decrypted_items, dict) and "values" in decrypted_items:
                decrypted_items = decrypted_items["values"]
            else:
                raise ValueError("Decrypted data is not a list")

        return decrypted_items

    def fetch_and_sync(self):
        """
        Full flow: Init session -> Get Config -> Fetch -> Sync
        """
        try:
            self.initialize_session()
            self.get_app_config()
            items = self.fetch_product_listing()

            # 2. Transform items
            sync_items: list[SyncItem] = []
            for item in items:
                sync_item = self._transform_item(item)
                if sync_item:
                    sync_items.append(sync_item)

            # 3. Perform bulk sync
            result = self.sync_items(sync_items)

            return {
                "status": "success",
                "message": f"Synced {len(items)} items from iShop.",
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

        name = brand_name
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
