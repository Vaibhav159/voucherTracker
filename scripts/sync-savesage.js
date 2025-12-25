import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VOUCHERS_PATH = path.join(__dirname, '../src/data/vouchers.json');
const SAVESAGE_PATH = path.join(__dirname, '../savesage.json');

// Helper to normalize brand names for comparison
const normalize = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const syncSaveSage = () => {
    try {
        const vouchersRaw = fs.readFileSync(VOUCHERS_PATH, 'utf8');
        const vouchers = JSON.parse(vouchersRaw);

        const saveSageRaw = fs.readFileSync(SAVESAGE_PATH, 'utf8');
        // The user file ends with a dot, we might need to handle that if it's invalid JSON
        // But assuming the tool write was valid JSON array
        const saveSageData = JSON.parse(saveSageRaw);

        let updatedCount = 0;
        const notFoundBrands = [];

        saveSageData.forEach(item => {
            const brandName = item.brand;
            const discount = item.discount;

            const normalizedBrand = normalize(brandName);

            // Find matching voucher
            const voucher = vouchers.find(v => normalize(v.brand) === normalizedBrand);

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

        if (notFoundBrands.length > 0) {
            const unmatchedPath = path.join(__dirname, '../savesage_unmatched.json');

            // Write simplified object: "Brand": "Discount"
            const unmatchedData = saveSageData
                .filter(item => notFoundBrands.includes(item.brand))
                .map(item => ({ brand: item.brand, discount: item.discount }));

            fs.writeFileSync(unmatchedPath, JSON.stringify(unmatchedData, null, 4));
            console.log(`Unmatched brands saved to: ${unmatchedPath}`);
        } else {
            console.log('None. All brands matched!');
        }

    } catch (error) {
        console.error('Error syncing SaveSage data:', error);
    }
};

syncSaveSage();
