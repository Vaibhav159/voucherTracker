import json
import hashlib
import binascii
import requests
from typing import Dict, Any, Optional

# Unified cryptography library (removed pycryptodome)
import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend


class VoucherSecurity:
    """
    Handles AES-GCM encryption and decryption for the Voucher API.
    Replicates the logic: Ciphertext.IV.Tag
    """

    def __init__(self, theme_id: str):
        # Derive key: SHA-256 hash of the theme_id
        self.THEME_ID = theme_id
        self.key = hashlib.sha256(theme_id.encode("utf-8")).digest()

    def encrypt(self, plain_text: str) -> str:
        """
        Encrypts payload using AES-GCM.
        Output format: Hex(Cipher).Hex(IV).Hex(Tag)
        """
        # 1. Generate 12-byte IV (Nonce)
        iv = os.urandom(12)

        # 2. Setup Cipher
        encryptor = Cipher(
            algorithms.AES(self.key), modes.GCM(iv), backend=default_backend()
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

    def decrypt_data(self, encrypted_str: str) -> Dict[str, Any]:
        """
        Decrypts the server response.
        Expected Format: Ciphertext.IV.Tag.Extra
        """
        try:
            parts = encrypted_str.split(".")

            # Handling the split parts (Server usually sends 4 parts)
            if len(parts) >= 3:
                ciphertext_hex, iv_hex, tag_hex = parts[0], parts[1], parts[2]
            else:
                raise ValueError(f"Invalid encrypted format. Parts found: {len(parts)}")

            # Convert Hex to Bytes
            ciphertext = bytes.fromhex(ciphertext_hex)
            iv = bytes.fromhex(iv_hex)
            tag = bytes.fromhex(tag_hex)

            # Decrypt
            decryptor = Cipher(
                algorithms.AES(self.key),
                modes.GCM(iv, tag),
                backend=default_backend(),
            ).decryptor()

            decrypted_bytes = decryptor.update(ciphertext) + decryptor.finalize()
            return json.loads(decrypted_bytes.decode("utf-8"))

        except Exception as e:
            print(f"[-] Decryption Error: {e}")
            return {"error": str(e)}


class IShopClient:
    BASE_URL = "https://ishop.reward360.in"

    def __init__(self):
        self.session = requests.Session()
        self.security: Optional[VoucherSecurity] = None
        self.theme_id: Optional[str] = None

        # Default Headers
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
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
            }
        )

    def initialize_session(self):
        """Step 1: Get CSRF tokens and initialize cookies."""
        print("[*] Initializing Session...")
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
            }
        )
        print("[+] Session Initialized.")

    def get_app_config(self, post_payload: str = "XXXXXX"):
        """Step 2: Get App Config to retrieve Theme-ID."""
        print("[*] Fetching App Config...")
        url = f"{self.BASE_URL}/middleware/appConfig/get-config-data"

        payload = {"post": post_payload}
        resp = self.session.post(url, json=payload)
        resp.raise_for_status()

        # Extract Theme ID from headers
        self.theme_id = resp.headers.get("theme-id")
        if not self.theme_id:
            raise ValueError("Theme-ID not found in response headers")

        print(f"[+] Theme ID received: {self.theme_id}")

        # Initialize Security Module with the new Theme ID
        self.security = VoucherSecurity(self.theme_id)

        # Optional: Debugging JWT signature if needed
        # config_data = resp.json()
        # jwt.decode(config_data["signature"], options={"verify_signature": False})

    def get_product_listing(self):
        """Step 3: Encrypt payload and fetch products."""
        if not self.security:
            raise RuntimeError("Security not initialized. Run get_app_config first.")

        print("[*] Fetching Product Listing...")
        url = f"{self.BASE_URL}/middleware/e-gift/getProductListingById"

        # Create and Encrypt Payload
        raw_payload = json.dumps({"filter": ""})
        encrypted_payload = self.security.encrypt(raw_payload)

        # Send Request
        resp = self.session.post(url, json={"postData": encrypted_payload})

        if resp.status_code != 200:
            print(f"[-] Request failed: {resp.status_code} - {resp.text}")
            return

        response_data = resp.json()
        encrypted_response = response_data.get("response")

        if encrypted_response:
            decrypted_data = self.security.decrypt_data(encrypted_response)

            # Save to file
            filename = "ishop.json"
            with open(filename, "w") as f:
                json.dump(decrypted_data, f, indent=4)
            print(f"[+] Data decrypted and saved to {filename}")
        else:
            print("[-] No encrypted response found in payload.")


def main():
    try:
        client = IShopClient()

        # 1. Setup Tokens
        client.initialize_session()

        # 2. Get Config & Theme ID
        client.get_app_config(post_payload="XXXXXX")

        # 3. Get Products & Decrypt
        client.get_product_listing()

    except Exception as e:
        print(f"[-] Critical Error: {e}")


if __name__ == "__main__":
    main()
