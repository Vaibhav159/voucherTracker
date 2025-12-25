import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VOUCHERS_PATH = path.join(__dirname, '../src/data/vouchers.json');
const SAVESAGE_PATH = path.join(__dirname, '../savesage.json');
const ALIAS_PATH = path.join(__dirname, '../src/data/brand_aliases.json');

// Helper to normalize brand names for comparison
const normalize = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const syncSaveSage = () => {
    try {
        const vouchersRaw = fs.readFileSync(VOUCHERS_PATH, 'utf8');
        const vouchers = JSON.parse(vouchersRaw);

        const saveSageRaw = fs.readFileSync(SAVESAGE_PATH, 'utf8');
        const saveSageData = JSON.parse(saveSageRaw);

        let aliases = {};
        if (fs.existsSync(ALIAS_PATH)) {
            aliases = JSON.parse(fs.readFileSync(ALIAS_PATH, 'utf8'));
        }

        let updatedCount = 0;
        const notFoundBrands = [];

        saveSageData.forEach(item => {
            const brandName = item.brand;
            const discount = item.discount;

            // 1. Check Alias
            let targetBrandName = aliases[brandName] || brandName;

            // 2. Try Exact Match
            let voucher = vouchers.find(v => v.brand === targetBrandName);

            // 3. Try Normalized Match
            if (!voucher) {
                const normalizedTarget = normalize(targetBrandName);
                voucher = vouchers.find(v => normalize(v.brand) === normalizedTarget);
            }

            // 4. Try Fuzzy / Suffix Stripping
            if (!voucher) {
                const commonSuffixes = [
                    " - Luxe",
                    " - Coin",
                    " Gold Coin",
                    " Gold",
                    " Diamond",
                    " Jewellery",
                    " Jewelry"
                ];

                let cleanedName = targetBrandName;
                for (const suffix of commonSuffixes) {
                    if (cleanedName.endsWith(suffix) || cleanedName.toLowerCase().endsWith(suffix.toLowerCase())) {
                        cleanedName = cleanedName.replace(new RegExp(suffix + '$', 'i'), '').trim();
                        break; // Only remove one suffix level to avoid over-stripping
                    }
                }

                // Try to find match for cleaned name
                const normalizedCleaned = normalize(cleanedName);
                voucher = vouchers.find(v => normalize(v.brand) === normalizedCleaned);

                // Special case: "Flipkart Consumer" -> "Flipkart" -> "Flipkart Gift Card"
                // If the cleanedName itself is an alias key, we could recurse, but let's keep it simple.
            }

            if (voucher) {
                // Check if SaveSage platform already exists
                const platformIndex = voucher.platforms.findIndex(p => p.name === 'SaveSage');

                const platformData = {
                    name: "SaveSage",
                    cap: "Check App",
                    fee: `Discount ${discount}`,
                    denominations: ["Check App"],
                    link: "https://savesage.club/",
                    color: "#8B5CF6" // Purple matching the logo
                };

                if (platformIndex > -1) {
                    // Update existing
                    voucher.platforms[platformIndex] = platformData;
                } else {
                    // Add new
                    voucher.platforms.push(platformData);
                }
                updatedCount++;
            } else {
                notFoundBrands.push(brandName);
            }
        });

        // Write back to vouchers.json
        fs.writeFileSync(VOUCHERS_PATH, JSON.stringify(vouchers, null, 4));

        console.log(`Successfully updated ${updatedCount} vouchers with SaveSage data.`);

        const unmatchedPath = path.join(__dirname, '../savesage_unmatched.json');
        if (notFoundBrands.length > 0) {
            // Write simplified object: "Brand": "Discount"
            const unmatchedData = saveSageData
                .filter(item => notFoundBrands.includes(item.brand))
                .map(item => ({ brand: item.brand, discount: item.discount }));

            fs.writeFileSync(unmatchedPath, JSON.stringify(unmatchedData, null, 4));
            console.log(`Unmatched brands saved to: ${unmatchedPath}`);
        } else {
            console.log('None. All brands matched!');
            // Cleans up the unmatched file if empty
            if (fs.existsSync(unmatchedPath)) fs.unlinkSync(unmatchedPath);
        }

    } catch (error) {
        console.error('Error syncing SaveSage data:', error);
    }
};

syncSaveSage();
