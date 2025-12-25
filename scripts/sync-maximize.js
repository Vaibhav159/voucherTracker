import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VOUCHERS_PATH = path.join(__dirname, '../src/data/vouchers.json');

const MAXIMISE_API_URL = 'https://savemax.maximize.money/api/savemax/giftcard/list-all-max-coins?sort=alphabet_asc';
const HEADERS = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-IN,en;q=0.6',
    'authorization': 'Bearer ',
    'cache-control': 'no-cache',
    'origin': 'https://www.maximize.money',
    'priority': 'u=1, i',
    'referer': 'https://www.maximize.money/',
    'sec-ch-ua': '"Brave";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
};

async function syncMaximizeData() {
    try {
        console.log(`Fetching data from ${MAXIMISE_API_URL}...`);
        const response = await fetch(MAXIMISE_API_URL, { headers: HEADERS });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        if (json.status !== 'success' || !json.data || !Array.isArray(json.data.giftCardList)) {
            throw new Error('Invalid response structure');
        }

        const maximiseList = json.data.giftCardList;
        console.log(`Fetched ${maximiseList.length} vouchers from Maximize.`);

        // Load existing vouchers
        let existingVouchers = [];
        try {
            const fileContent = await fs.readFile(VOUCHERS_PATH, 'utf-8');
            existingVouchers = JSON.parse(fileContent);
        } catch (error) {
            console.warn(`Could not read ${VOUCHERS_PATH}, starting with valid empty array if file created newly.`);
        }

        // Merge Logic
        // 1. Create a map of existing vouchers by Brand Name (normalized)
        const voucherMap = new Map();
        existingVouchers.forEach(v => {
            voucherMap.set(normalizeInfo(v.brand), v);
        });

        let updatedCount = 0;
        let newCount = 0;

        for (const item of maximiseList) {
            const normalizedBrand = normalizeInfo(item.brand);
            let voucher = voucherMap.get(normalizedBrand);

            if (!voucher) {
                // Create new voucher
                // Parse category: "[\"Dining & Food\"]" -> "Dining & Food"
                let category = "Other";
                try {
                    const cats = JSON.parse(item.category);
                    if (Array.isArray(cats) && cats.length > 0) category = cats[0];
                } catch (e) {
                    // ignore parse error
                }

                voucher = {
                    id: String(item.id), // Use API ID
                    brand: item.brand,
                    logo: item.cardImageUrl || item.giftCardLogo || "",
                    category: category,
                    platforms: []
                };
                existingVouchers.push(voucher);
                voucherMap.set(normalizedBrand, voucher); // Update map
                newCount++;
            }

            // Update Maximize Platform Entry
            const maximisePlatform = {
                name: "Maximize",
                cap: "Unsupported", // API doesn't seem to have cap, using placeholder or "Unlimited" if inferred.
                // Actually, item.maxCoinsEarn might be related, but let's stick to discount.
                cap: "Unlimited",
                fee: item.discount > 0 ? `Discount ${item.discount}%` : "None",
                denominations: ["Any"], // API `list-all` doesn't show denominations, defaulting to "Any"
                link: "https://www.maximize.money/",
                color: "#1c1c1c"
            };

            // Check if Maximize platform exists
            const platformIndex = voucher.platforms.findIndex(p => p.name.toLowerCase() === 'maximise');
            if (platformIndex >= 0) {
                // Update existing
                voucher.platforms[platformIndex] = {
                    ...voucher.platforms[platformIndex],
                    ...maximisePlatform
                };
            } else {
                // Add new
                voucher.platforms.push(maximisePlatform);
            }
            updatedCount++;
        }

        // Save back to file
        await fs.writeFile(VOUCHERS_PATH, JSON.stringify(existingVouchers, null, 4));
        console.log(`Sync complete. Updated: ${updatedCount}, New: ${newCount}, Total: ${existingVouchers.length}`);

    } catch (error) {
        console.error("Error syncing Maximize data:", error.message);
    }
}

function normalizeInfo(str) {
    if (!str) return "";
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

syncMaximizeData();
