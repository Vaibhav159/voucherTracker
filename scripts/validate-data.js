
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/creditCards.js');
const IMAGES_DIR = path.join(process.cwd(), 'public/assets/cards');

async function validate() {
    console.log(`Loading credit card data from ${DATA_FILE}...`);
    let cards;
    try {
        const module = await import(DATA_FILE);
        cards = module.creditCards;
    } catch (err) {
        console.error('Error loading creditCards.js:', err);
        process.exit(1);
    }

    console.log(`Loaded ${cards.length} cards.`);

    const errors = [];
    const warnings = [];
    const missingImages = [];
    const stubs = [];
    const ids = new Set();

    for (const card of cards) {
        // Check for duplicates
        if (ids.has(card.id)) {
            errors.push(`Duplicate ID: ${card.id}`);
        }
        ids.add(card.id);

        // Check required fields
        const required = ['id', 'name', 'bank', 'image', 'link', 'fees', 'rewards'];
        const missing = required.filter(field => !card[field]);
        if (missing.length > 0) {
            errors.push(`Card ${card.id} missing fields: ${missing.join(', ')}`);
            stubs.push(card.id);
        }

        // Check Image
        if (card.image) {
            // Handle relative paths from public root
            let relativePath = card.image;
            if (relativePath.startsWith('/')) relativePath = relativePath.substring(1);

            const imagePath = path.join(process.cwd(), 'public', relativePath);
            if (!fs.existsSync(imagePath)) {
                missingImages.push({ id: card.id, image: card.image, path: imagePath });
            }
        } else {
            missingImages.push({ id: card.id, image: "MISSING" });
        }

        // Check for stub/placeholder data (just for info)
        if (card.fees && card.fees.joining === 0 && card.fees.renewal === 0 && card.fees.renewalCondition === "Check website") {
            warnings.push(`Card ${card.id} appears to be a stub.`);
        }
    }

    console.log('\nValidation Report:');
    console.log('------------------');
    console.log(`Total Cards: ${cards.length}`);
    console.log(`Duplicate IDs: ${ids.size !== cards.length ? 'YES' : 'None'}`);
    console.log(`Missing Required Fields: ${stubs.length}`);
    console.log(`Broken Image Links: ${missingImages.length}`);
    console.log(`Stubs (Placeholders): ${warnings.length}`);

    if (missingImages.length > 0) {
        console.log('\nMissing Images:');
        missingImages.slice(0, 10).forEach(item => console.log(`- ${item.id}: ${item.image}`));
        if (missingImages.length > 10) console.log(`... and ${missingImages.length - 10} more.`);
    }

    if (errors.length > 0) {
        console.log('\nErrors:');
        errors.forEach(e => console.log(`- ${e}`));
    }

    if (errors.length > 0 || missingImages.length > 0) {
        process.exit(1);
    } else {
        console.log('\nData is clean! Stubs are valid placeholders.');
    }
}

validate();
