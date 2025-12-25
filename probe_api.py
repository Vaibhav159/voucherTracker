import requests

url = "https://communication.gyftr.com/hdfcsmartbuyapizeta/hdfcbank/api/v1/categories/brands/electronics/300"
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.gyftr.com/",
    "Origin": "https://www.gyftr.com",
    "Accept": "application/json, text/plain, */*"
}

try:
    print(f"Testing {url} with headers...")
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Status: {response.status_code}")
    print("Headers:", response.headers)
    if response.status_code == 200:
        print("Success! Response preview:")
        print(response.text[:500])
    else:
        print("Response:", response.text[:500])
except Exception as e:
    print(f"Error: {e}")
