import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VOUCHERS_PATH = path.join(__dirname, '../src/data/vouchers.json');

const GYFTR_CATEGORIES_URL = 'https://communication.gyftr.com/hdfcsmartbuyapizeta/hdfcbank/api/v1/home/categories';
const GYFTR_BRANDS_URL_TEMPLATE = 'https://communication.gyftr.com/hdfcsmartbuyapizeta/hdfcbank/api/v1/categories/brands/{slug}/300';

const COMMON_HEADERS = {
    'accept': 'application/json, text/plain, */*',
    'origin': 'https://www.gyftr.com',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
};

async function syncGyftrData() {
    try {
        // 1. Fetch Categories
        console.log(`Fetching categories from ${GYFTR_CATEGORIES_URL}...`);
        const catResponse = await fetch(GYFTR_CATEGORIES_URL, { headers: COMMON_HEADERS });
        if (!catResponse.ok) throw new Error(`Failed to fetch categories: ${catResponse.status}`);
        const catJson = await catResponse.json();

        if (catJson.status !== 'SUCCESS' || !Array.isArray(catJson.data)) {
            throw new Error('Invalid categories response structure');
        }

        const categories = catJson.data;
        console.log(`Found ${categories.length} categories.`);

        // 2. Load Existing Vouchers
        let existingVouchers = [];
        try {
            const fileContent = await fs.readFile(VOUCHERS_PATH, 'utf-8');
            existingVouchers = JSON.parse(fileContent);
        } catch (error) {
            console.warn(`Could not read ${VOUCHERS_PATH}, starting with valid empty array if created newly.`);
        }

        const voucherMap = new Map();
        existingVouchers.forEach(v => {
            voucherMap.set(normalizeInfo(v.brand), v);
        });

        let updatedCount = 0;
        let newCount = 0;

        // 3. Iterate Categories and Fetch Brands
        for (const cat of categories) {
            const catSlug = cat.slug;
            const brandsUrl = GYFTR_BRANDS_URL_TEMPLATE.replace('{slug}', catSlug);

            console.log(`Fetching brands for category: ${cat.name} (${catSlug})...`);

            const brandResponse = await fetch(brandsUrl, {
                method: 'POST',
                headers: {
                    ...COMMON_HEADERS,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "id": 0,
                    "brandid": 0,
                    "from": 0,
                    "to": 500, // Increased limit to ensure we get all
                    "bogoFilter": "",
                    "redemptionFilter": "",
                    "saleFilter": false
                })
            });

            if (!brandResponse.ok) {
                console.error(`Failed to fetch brands for ${cat.name}: ${brandResponse.status}`);
                continue;
            }

            const brandJson = await brandResponse.json();
            if (brandJson.status !== 'SUCCESS' || !Array.isArray(brandJson.data)) {
                console.error(`Invalid brands response for ${cat.name}`);
                continue;
            }

            const brands = brandJson.data;
            console.log(`  Processing ${brands.length} brands...`);

            for (const item of brands) {
                const normalizedBrand = normalizeInfo(item.name);
                let voucher = voucherMap.get(normalizedBrand);

                // Determine Category
                // Use existing if available, else API category
                const category = mapCategory(item.category_name);

                if (!voucher) {
                    voucher = {
                        id: String(item.id),
                        brand: item.name,
                        logo: item.brand_icon_url || "",
                        category: category,
                        platforms: []
                    };
                    existingVouchers.push(voucher);
                    voucherMap.set(normalizedBrand, voucher);
                    newCount++;
                } else {
                    // Update logo if missing
                    if (!voucher.logo && item.brand_icon_url) {
                        voucher.logo = item.brand_icon_url;
                    }
                }

                // Gyftr Platform Data
                const offerVal = parseFloat(item.offer_value);
                const discountText = (!isNaN(offerVal) && offerVal > 0) ? `Discount ${offerVal}%` : "None";

                const gyftrPlatform = {
                    name: "Gyftr",
                    cap: "10k/month", // Default assumption for SmartBuy, user can manually adjust if specific
                    fee: discountText,
                    denominations: ["Check Link"], // API doesn't list denominations
                    link: `https://www.gyftr.com/instantvouchers/${item.slug}`,
                    color: "#D42426"
                };

                const platformIndex = voucher.platforms.findIndex(p => p.name.toLowerCase() === 'gyftr');
                if (platformIndex >= 0) {
                    // Update existing platform - preserve cap/denominations if they look custom, but update fee/link
                    // Actually, always updating fee is the goal.
                    const existing = voucher.platforms[platformIndex];
                    voucher.platforms[platformIndex] = {
                        ...existing,
                        fee: discountText,
                        link: gyftrPlatform.link
                        // Keep existing cap/denominations as they might be manually entered/more accurate
                    };
                } else {
                    voucher.platforms.push(gyftrPlatform);
                }
                updatedCount++;
            }
        }

        // 4. Save
        await fs.writeFile(VOUCHERS_PATH, JSON.stringify(existingVouchers, null, 4));
        console.log(`Gyftr Sync complete. Updated: ${updatedCount}, New: ${newCount}, Total Vouchers: ${existingVouchers.length}`);

    } catch (error) {
        console.error("Error syncing Gyftr data:", error);
    }
}

function normalizeInfo(str) {
    if (!str) return "";
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function mapCategory(apiCat) {
    // Simple mapping to keep categories clean
    if (!apiCat) return "Other";
    if (apiCat.includes('Fashion')) return 'Fashion';
    if (apiCat.includes('Food') || apiCat.includes('Restaurant')) return 'Food';
    if (apiCat.includes('Electronics')) return 'Electronics';
    if (apiCat.includes('Travel')) return 'Travel';
    if (apiCat.includes('Grocery')) return 'Grocery';
    if (apiCat.includes('Entertainment')) return 'Entertainment';
    if (apiCat.includes('Health')) return 'Health';
    if (apiCat.includes('Accessories')) return 'Shopping';
    if (apiCat.includes('Gifting')) return 'Shopping';
    return 'Shopping';
}

syncGyftrData();
