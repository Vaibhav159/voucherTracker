import requests
import jwt
import hashlib
import binascii
import json
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes


class VoucherSecurity:
    def __init__(self, theme_id):
        # JS: ke.md.sha256.create().update(L).digest()
        # We take the raw bytes of the SHA-256 hash as the key
        self.key = hashlib.sha256(theme_id.encode("utf-8")).digest()
        self.THEME_ID = theme_id

    def _get_key(self, theme_id: str | None = None) -> bytes:
        """Helper to derive the SHA-256 key from the themeId."""
        tid = theme_id or self.THEME_ID
        return hashlib.sha256(tid.encode("utf-8")).digest()

    def encrypt(self, plain_text):
        """
        Equivalent to JS: encryptAes($)
        Returns: Ciphertext.IV.Tag (Hex strings separated by dots)
        """
        # 1. Generate IV (Nonce) - 12 bytes
        # JS: ke.random.getBytesSync(12)
        iv = get_random_bytes(12)

        # 2. Initialize Cipher
        # JS: ke.cipher.createCipher("AES-GCM", k)
        cipher = AES.new(self.key, AES.MODE_GCM, nonce=iv)

        # 3. Encrypt
        # JS: t.update(..., "utf8")
        ciphertext, tag = cipher.encrypt_and_digest(plain_text.encode("utf-8"))

        # 4. Convert to Hex
        hex_cipher = binascii.hexlify(ciphertext).decode("utf-8")
        hex_iv = binascii.hexlify(iv).decode("utf-8")
        hex_tag = binascii.hexlify(tag).decode("utf-8")

        # 5. Format Output
        # JS: return `${n}.${f}.${a}`  -> Cipher.IV.Tag
        return f"{hex_cipher}.{hex_iv}.{hex_tag}"

    def decrypt_data(
        self, encrypted_str: str, theme_id: str | None = None
    ) -> dict | list:
        """
        Decrypts the response (Server -> Client).
        Format: Ciphertext.IV.Tag.Extra (4 parts, per your finding)
        """
        theme_id = theme_id or self.THEME_ID

        try:
            # 1. Split the response string
            parts = encrypted_str.split(".")

            # Handling the 4-part server response
            if len(parts) != 4:
                # Fallback: simple check in case server sometimes sends 3 parts
                if len(parts) == 3:
                    ciphertext_hex, iv_hex, tag_hex = parts
                else:
                    raise ValueError(
                        f"Invalid format: Expected 4 parts, got {len(parts)}"
                    )
            else:
                ciphertext_hex, iv_hex, tag_hex, _ = parts

            # 2. Convert Hex to Bytes
            ciphertext = bytes.fromhex(ciphertext_hex)
            iv = bytes.fromhex(iv_hex)
            tag = bytes.fromhex(tag_hex)

            # 3. Generate the Key
            key = self._get_key(theme_id)

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
            print(f"Decryption failed: {e}")
            return {"error": str(e)}


response = requests.get("https://ishop.reward360.in/middleware/csrf-token", headers={})

csrf_token = response.cookies["csrf-token"]
xsrf_token = response.json()["token"]

cookies = {
    "csrf-token": csrf_token,
    "XSRF-TOKEN": xsrf_token,
}

headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-IN,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "csrf-token": xsrf_token,
    "origin": "https://ishop.reward360.in",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://ishop.reward360.in/home-travels/",
    "sec-ch-ua": '"Brave";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
}

json_data = {
    "post": "XXXXXX",
}

response = requests.post(
    "https://ishop.reward360.in/middleware/appConfig/get-config-data",
    cookies=cookies,
    headers=headers,
    json=json_data,
)

print(response.status_code)
config_data = response.json()
public_key = jwt.decode(config_data["signature"], options={"verify_signature": False})
data = config_data["data"]

connect_sid = response.cookies["connect.sid"]

theme_id = response.headers["theme-id"]
# print(f"{theme_id=}, {data=}")
#
# print(f"{connect_sid=}, {config_data=}")

cookies = {
    "csrf-token": csrf_token,
    "XSRF-TOKEN": xsrf_token,
    "connect.sid": connect_sid,
}

headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-IN,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "csrf-token": xsrf_token,
    "origin": "https://ishop.reward360.in",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://ishop.reward360.in/home-travels/",
    "sec-ch-ua": '"Brave";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    "x-csrf-token": xsrf_token,
    "x-xsrf-token": xsrf_token,
}

security = VoucherSecurity(theme_id)

# 2. Create Payload
payload = json.dumps({"filter": ""})

# 3. Encrypt
encrypted_payload = security.encrypt(payload)

json_data = {
    "postData": encrypted_payload,
}

response = requests.post(
    "https://ishop.reward360.in/middleware/e-gift/getProductListingById",
    cookies=cookies,
    headers=headers,
    json=json_data,
)

response_data = response.json()
print(f"getProductListingById - {response.status_code=}, {response_data=}")

decrypt_data = security.decrypt_data(response_data["response"])

with open("ishop.json", "w") as f:
    json.dump(decrypt_data, f)
