import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VOUCHERS_PATH = path.join(__dirname, '../src/data/vouchers.json');

const MAGICPIN_URL = 'https://magicpin.in/sam-api/affiliates/get_merchant_vouchers/';

const HEADERS = {
    'accept': '*/*',
    'accept-language': 'en-IN,en;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    'origin': 'https://magicpin.in',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://magicpin.in/category/?categoryName=custom_1114eac6-e0e9-4fd7-a9da-69caa6ede3a7',
    'sec-ch-ua': '"Brave";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
};

async function syncMagicPinData() {
    try {
        console.log("Starting MagicPin Sync...");

        // Load Existing Vouchers
        let existingVouchers = [];
        try {
            const fileContent = await fs.readFile(VOUCHERS_PATH, 'utf-8');
            existingVouchers = JSON.parse(fileContent);
        } catch (error) {
            console.warn(`Could not read ${VOUCHERS_PATH}, initializing empty.`);
        }

        const voucherMap = new Map();
        existingVouchers.forEach(v => {
            voucherMap.set(normalizeInfo(v.brand), v);
        });

        let updatedCount = 0;
        let newCount = 0;
        let nextOffset = 0;
        let hasMore = true;

        while (hasMore) {
            console.log(`Fetching MagicPin data (offset: ${nextOffset})...`);

            const payload = {
                "next": nextOffset, // Correct logic actually requires sending the `next` value from PRIVATE response, but initial usage sends 0? Or is 'start' the key?
                // The bash command sent "next": 20 and "start": "0".
                // Usually "params"."start" controls offset for this API based on typical patterns, but let's observe response `next`.
                // Actually, let's look at the curl again. `data-raw '{"next":20,"params":{"lon":77.209021,"start":"0",...}`
                // It seems `params.start` is the offset.
                "params": {
                    "lon": 77.209021,
                    "start": String(nextOffset),
                    "page": "custom_1114eac6-e0e9-4fd7-a9da-69caa6ede3a7",
                    "filter_by": "use_magicpoints_v1",
                    "lat": 28.613939,
                    "category": "",
                    "locality_ids": "",
                    "sort_by": "score:desc",
                    "limit": "50" // Requesting 50
                },
                "parseVouchers": true
            };

            const response = await fetch(MAGICPIN_URL, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                console.error(`Status ${response.status} - Stopping.`);
                break;
            }

            const json = await response.json();

            if (!json.vouchers || !json.vouchers.data) {
                console.log("No vouchers found in response - Stopping.");
                break;
            }

            const items = json.vouchers.data;
            if (items.length === 0) {
                console.log("Empty data array - Stopping.");
                break;
            }

            console.log(`  Processing ${items.length} items...`);

            for (const item of items) {
                const brandName = item.title && item.title.value ? item.title.value : "Unknown";
                const normalizedBrand = normalizeInfo(brandName);

                let voucher = voucherMap.get(normalizedBrand);

                // Parsing Category from misc_text_1 (e.g. "Fashion Online<br>4935 bought...")
                let category = "Shopping";
                const miscText = item.misc_text_1 && item.misc_text_1.value ? item.misc_text_1.value : "";
                if (miscText) {
                    const rawCat = miscText.split('<br>')[0].trim();
                    category = mapCategory(rawCat);
                }

                if (!voucher) {
                    voucher = {
                        id: `mp-${String(item.action?.analytics?.analytics_map?.subject_id || Math.random())}`,
                        brand: brandName,
                        logo: item.image_url || "",
                        category: category,
                        platforms: []
                    };
                    existingVouchers.push(voucher);
                    voucherMap.set(normalizedBrand, voucher);
                    newCount++;
                } else {
                    // Update logo if existing is generic or missing (prioritize clear logos if possible, but MagicPin usually has good ones)
                    if (!voucher.logo && item.image_url) {
                        voucher.logo = item.image_url;
                    }
                }

                // Parse Discount
                // typical highlight_text.value: "Save<br>5%"
                let fee = "None";
                if (item.highlight_text && item.highlight_text.value) {
                    const parts = item.highlight_text.value.split('<br>');
                    if (parts.length > 1) {
                        // "Save 5%"
                        fee = `${parts[0]} ${parts[1]}`;
                    } else {
                        fee = item.highlight_text.value;
                    }
                }

                // Denominations - Not explicit in list view, assume check link

                const mpPlatform = {
                    name: "MagicPin",
                    cap: "Check App",
                    fee: fee,
                    denominations: ["Check Link"],
                    link: item.url || "https://magicpin.in",
                    color: "#7000ff" // MagicPin Purple
                };

                const platformIndex = voucher.platforms.findIndex(p => p.name.toLowerCase() === 'magicpin');
                if (platformIndex >= 0) {
                    voucher.platforms[platformIndex] = {
                        ...voucher.platforms[platformIndex],
                        fee: fee,
                        link: mpPlatform.link
                    };
                } else {
                    voucher.platforms.push(mpPlatform);
                }
                updatedCount++;
            }

            // Pagination Logic
            // The response `json.vouchers.next` or `json.next` usually indicates the next offset?
            // In the example response: "next": 40 is at the root level AND inside vouchers.
            // Let's use json.vouchers.next if available.
            if (json.vouchers && typeof json.vouchers.next === 'number') {
                nextOffset = json.vouchers.next;
            } else if (typeof json.next === 'number') {
                nextOffset = json.next;
            } else {
                // Fallback if no next field
                nextOffset += items.length;
            }

            // Safety break or if fewer items than requested were returned (often implies end)
            if (items.length < 10) {
                hasMore = false;
            }

            // Artificial limit to prevent infinite loops during dev
            if (nextOffset > 500) {
                console.log("Reached safety limit of 500 items.");
                hasMore = false;
            }
        }

        // Save
        await fs.writeFile(VOUCHERS_PATH, JSON.stringify(existingVouchers, null, 4));
        console.log(`MagicPin Sync complete. Updated: ${updatedCount}, New: ${newCount}.`);

    } catch (error) {
        console.error("Error syncing MagicPin data:", error);
    }
}

function normalizeInfo(str) {
    if (!str) return "";
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function mapCategory(apiCat) {
    if (!apiCat) return "Other";
    const c = apiCat.toLowerCase();
    if (c.includes('fashion')) return 'Fashion';
    if (c.includes('food') || c.includes('restaurant') || c.includes('dining')) return 'Food';
    if (c.includes('electronics')) return 'Electronics';
    if (c.includes('travel') || c.includes('flight') || c.includes('hotel')) return 'Travel';
    if (c.includes('grocery')) return 'Grocery';
    if (c.includes('beauty') || c.includes('salon')) return 'Beauty';
    if (c.includes('entertainment') || c.includes('movie') || c.includes('event')) return 'Entertainment';
    if (c.includes('health') || c.includes('pharmacy')) return 'Health';
    return 'Shopping';
}

syncMagicPinData();
