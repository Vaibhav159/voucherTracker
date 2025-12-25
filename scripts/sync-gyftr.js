import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VOUCHERS_PATH = path.join(__dirname, '../src/data/vouchers.json');

// URL provided by user (currently 404, needs update)
const GYFTR_API_URL = "https://communication.gyftr.com/hdfcsmartbuyapizeta/hdfcbank/api/v1/categories/brands/electronics/300";

async function fetchGyftrData() {
    try {
        console.log(`Fetching data from ${GYFTR_API_URL}...`);
        const response = await fetch(GYFTR_API_URL, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://www.gyftr.com/",
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Data fetched successfully. Parsing...");

        // Parse and transform data
        // Note: Use a parser function that matches the actual response schema
        const newVouchers = parseGyftrResponse(data);

        if (newVouchers.length > 0) {
            await fs.writeFile(VOUCHERS_PATH, JSON.stringify(newVouchers, null, 4));
            console.log(`Successfully updated ${VOUCHERS_PATH} with ${newVouchers.length} vouchers.`);
        } else {
            console.warn("No vouchers found in response.");
        }

    } catch (error) {
        console.error("Error syncing data:", error.message);
        console.log("\nPlease check the URL and ensure it is correct.");
    }
}

// TODO: Adjust this function based on the actual API response structure
function parseGyftrResponse(data) {
    // Example Assumption: data is an array of brands like [{ name: "Brand", ... }]
    // Or data.brands is the array.

    // Fallback if data structure is unknown: just log it
    // console.log("Response structure:", JSON.stringify(data, null, 2));

    const brands = Array.isArray(data) ? data : (data.brands || []);

    return brands.map((brand, index) => ({
        id: String(brand.id || index + 100),
        brand: brand.name || brand.brandName || "Unknown Brand",
        logo: brand.logo || brand.icon || "",
        category: "Electronics", // specific to the URL category
        platforms: [
            {
                name: "Gyftr",
                // Try to extract discount/fee
                cap: brand.cap || "Check App",
                fee: brand.discount ? `Discount ${brand.discount}%` : "Check App",
                denominations: brand.denominations || ["Any"],
                link: brand.link || brand.url || `https://www.gyftr.com/${brand.slug || ''}`,
                color: "#000000" // Default color
            }
        ]
    }));
}

fetchGyftrData();
