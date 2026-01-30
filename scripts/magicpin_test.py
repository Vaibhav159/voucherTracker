import requests
import json
import time

MAGICPIN_URL = "https://magicpin.in/sam-api/affiliates/get_merchant_vouchers/"

HEADERS = {
    "accept": "*/*",
    "accept-language": "en-IN,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://magicpin.in",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://magicpin.in/category/?categoryName=custom_1114eac6-e0e9-4fd7-a9da-69caa6ede3a7",
    "sec-ch-ua": '"Brave";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
}


def sync_magicpin_data():
    all_items = []

    # Safety limit
    max_offset = 1000  # Increased for better coverage
    next_offset = 0
    has_more = True

    while has_more:
        # Debug info to stderr so it doesn't corrupt stdout JSON
        import sys

        print(f"Fetching MagicPin data (offset: {next_offset})...", file=sys.stderr)

        payload = {
            "next": next_offset,
            "params": {
                "lon": 77.209021,
                "start": str(next_offset),
                "page": "custom_1114eac6-e0e9-4fd7-a9da-69caa6ede3a7",
                "filter_by": "use_magicpoints_v1",
                "lat": 28.613939,
                "category": "",
                "locality_ids": "",
                "sort_by": "score:desc",
                "limit": "50",
            },
            "parseVouchers": True,
        }

        try:
            response = requests.post(MAGICPIN_URL, headers=HEADERS, json=payload)

            if response.status_code != 200:
                print(f"Status {response.status_code} - Stopping.", file=sys.stderr)
                break

            data = response.json()

            vouchers = data.get("vouchers", {})
            items = vouchers.get("data", [])

            if not items:
                print("No items found in response - Stopping.", file=sys.stderr)
                break

            count = len(items)
            all_items.extend(items)

            # Pagination Logic
            # Check json.vouchers.next or json.next
            vouchers_next = vouchers.get("next")
            root_next = data.get("next")

            if isinstance(vouchers_next, int):
                next_offset = vouchers_next
            elif isinstance(root_next, int):
                next_offset = root_next
            else:
                next_offset += count

            if count < 10:
                has_more = False

            if next_offset > max_offset:
                print(f"Reached safety limit of {max_offset} items.", file=sys.stderr)
                has_more = False

            # Be nice to the API
            time.sleep(1)

        except Exception as e:
            print(f"Error: {e}", file=sys.stderr)
            break

    print(json.dumps(all_items, indent=4))
    print(f"Finished. Total items fetched: {len(all_items)}", file=sys.stderr)


if __name__ == "__main__":
    sync_magicpin_data()
