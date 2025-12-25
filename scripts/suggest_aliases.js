import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VOUCHERS_PATH = path.join(__dirname, '../src/data/vouchers.json');
const UNMATCHED_PATH = path.join(__dirname, '../savesage_unmatched.json');

// Simple Levenshtein distance for fuzzy matching
const levenshtein = (a, b) => {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
};

try {
    const vouchers = JSON.parse(fs.readFileSync(VOUCHERS_PATH, 'utf8'));
    const unmatched = JSON.parse(fs.readFileSync(UNMATCHED_PATH, 'utf8'));
    const existingBrands = vouchers.map(v => v.brand);

    console.log("Analyzing " + unmatched.length + " unmatched brands...");

    unmatched.forEach(item => {
        const brand = item.brand;
        let pBrand = brand;

        // Custom cleanup for better matching
        pBrand = pBrand.replace(/ - Luxe/g, "")
            .replace(/ - Coin/g, "")
            .replace(/ Gold Coin/g, "")
            .replace(/ Gold/g, "")
            .replace(/ Diamond/g, "")
            .replace(/ Jewellery/g, "")
            .replace(/ Jewelry/g, "");

        // Find matches
        const exactMatch = existingBrands.find(b => b.toLowerCase() === pBrand.toLowerCase());
        if (exactMatch) {
            console.log(`"${brand}": "${exactMatch}", // Exact match after cleanup`);
            return;
        }

        const substringMatch = existingBrands.find(b => b.toLowerCase().includes(pBrand.toLowerCase()) || pBrand.toLowerCase().includes(b.toLowerCase()));
        if (substringMatch) {
            console.log(`"${brand}": "${substringMatch}", // Substring match`);
            return;
        }

        // Fuzzy
        /*
        let bestDist = 100;
        let bestMatch = "";
        existingBrands.forEach(ex => {
            const dist = levenshtein(pBrand.toLowerCase(), ex.toLowerCase());
            if (dist < bestDist) {
                bestDist = dist;
                bestMatch = ex;
            }
        });

        if (bestDist <= 3) {
             console.log(`"${brand}": "${bestMatch}", // Fuzzy match distance ${bestDist}`);
        }
        */
    });

} catch (e) {
    console.error(e);
}
