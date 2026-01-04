
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.resolve(__dirname, '../src/data/creditCards.js');
const PATCH_FILE = path.resolve(__dirname, 'image_patch.json');
const TARGET_FILE = path.resolve(__dirname, '../src/data/creditCards.js');

async function applyPatch() {
    // 1. Load Data
    let cards;
    try {
        const module = await import(DATA_FILE);
        cards = module.creditCards;
    } catch (err) {
        console.error('Error loading creditCards.js:', err);
        process.exit(1);
    }

    let imagePatch = {};
    if (fs.existsSync(PATCH_FILE)) {
        imagePatch = JSON.parse(fs.readFileSync(PATCH_FILE, 'utf8'));
    }

    console.log(`Loaded ${cards.length} cards.`);
    console.log(`Loaded ${Object.keys(imagePatch).length} image patches.`);

    let validCount = 0;
    let stubCount = 0;

    const updatedCards = cards.map(card => {
        const newCard = { ...card };

        // 1. Apply Image Patch
        if (imagePatch[card.id]) {
            newCard.image = imagePatch[card.id];
        }

        // 2. Fix Stub Data (Missing Fees/Rewards/Link)
        const isStub = !newCard.fees || !newCard.rewards || !newCard.link;

        if (isStub) {
            stubCount++;
            if (!newCard.fees) {
                newCard.fees = {
                    joining: 0,
                    renewal: 0,
                    renewalCondition: "Check website for details"
                };
            }
            if (!newCard.rewards) {
                newCard.rewards = {
                    type: "N/A",
                    rate: 0,
                    description: "Reward details coming soon"
                };
            }
            if (!newCard.link) {
                newCard.link = `https://www.google.com/search?q=${encodeURIComponent(newCard.name + ' credit card')}`;
            }
            // Ensure some features exist
            if (!newCard.features) {
                newCard.features = ["Details coming soon"];
            }
            if (!newCard.metadata) {
                newCard.metadata = { type: "consumer" };
            }
        } else {
            validCount++;
        }

        // 3. Fix Link Paths for Images (ensure they start with /assets/cards/)
        if (newCard.image && !newCard.image.startsWith('/assets/cards/') && !newCard.image.startsWith('http')) {
            // Use basename if it's some other weird path
            const basename = path.basename(newCard.image);
            newCard.image = `/assets/cards/${basename}`;
        }

        // 4. Fallback for absolutely missing images?
        // If image is still missing or empty, maybe set a placeholder?
        // We won't do that yet, user just wants "broken links" fixed.
        // If the file doesn't exist, it's still "broken". 
        // But fix-images-v2 only put entries in patch if file existed. 
        // So applied patches are valid.

        return newCard;
    });

    // Write back to file
    const fileContent = `export const creditCards = ${JSON.stringify(updatedCards, null, 2)};`;
    fs.writeFileSync(TARGET_FILE, fileContent);

    console.log(`\nUpdated ${TARGET_FILE}`);
    console.log(`- Applied image patches: ${Object.keys(imagePatch).length}`);
    console.log(`- Filled placeholder data for ${stubCount} cards.`);
}

applyPatch();
