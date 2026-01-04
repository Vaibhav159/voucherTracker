
import fs from 'fs';
import path from 'path';

// Use CWD relative paths
const JSON_FILE = path.join(process.cwd(), 'src/data/creditCards.json');
const JS_FILE = path.join(process.cwd(), 'src/data/creditCards.js');
const SOURCE_IMAGES_DIR = path.join(process.cwd(), 'src/data/images');
const TARGET_IMAGES_DIR = path.join(process.cwd(), 'public/assets/cards');
const PLACEHOLDER_IMAGE = '/assets/cards/placeholder.png';
const PATCH_FILE = path.join(process.cwd(), 'scripts/image_patch.json'); // From v2 script

// Manual mapping: cardId -> source relative path
const MANUAL_MAP = {
    "hdfc-diners-club-black": "hdfc/diners-club-black-metal.png",
    "hdfc-moneyback-plus": "hdfc/moneyback-plus-credit-card.png",
    "hdfc-freedom": "hdfc/freedom-credit-card.png",
    "hdfc-tata-neu-plus": "hdfc/tata-neu-plus-hdfc.jpg",
    "marriott-bonvoy-hdfc": "hdfc/HDFC-Bank-Marriott-Bonvoy-Credit-Card.webp",
    "hdfc-shoppers-stop": "hdfc/facia_shoppers_stop_mass.png",
    "hdfc-shoppers-stop-black": "hdfc/facia_shoppers_stop_black.png",
    "hdfc-bizblack-metal": "hdfc/bizblack-metal-edition.webp",
    "axis-indianoil": "axis/IndianOil-Axis-Bank-Credit-Card.png.webp",
    "axis-lic-signature": "axis/axis lic.jpeg.webp",
    "sbi-prime": "sbi card/Prime_349x218-px-Front.png",
    "sbi-elite": "sbi card/Elite_349x218-px-Front.png",
    "sbi-simplysave-upi-rupay": "sbi card/sbi simply save rupay.png",
    "sbi-simplyclick": "sbi card/Simplyclick_349x218-Front.png",
    "icici-manchester-united-signature": "icici/manchester-signature-desktop.webp",
    "icici-manchester-platinum": "icici/manchester-platinum-desktop.webp",
    "icici-makemytrip-signature": "icici/makemytrip-desk-banner.png",
    "adani-one-icici-signature": "icici/adani-signature.webp",
    "adani-one-icici-platinum": "icici/adani-platinum.webp",
    "icici-times-black": "icici/times-black-banner.webp",
    "amex-platinum-reserve": "amex/American Express® Platinum ReserveSM Credit Card .avif",
    "amex-platinum-charge": "amex/American Express® Platinum Card .avif",
    "amex-gold-charge": "amex/American Express® Gold Card .avif",
    "amex-mrcc": "amex/American Express Membership Rewards® Credit Card .avif",
    "amex-smartearn": "amex/American Express SmartEarn™ Credit Card .avif",
    "amex-platinum-travel": "amex/American Express® Platinum Travel Credit Card .webp",
    "idfc-first-private": "idfc/private-card.webp",
    "idfc-first-select": "idfc/Select-Visa-Signature_Maroon.avif",
    "idfc-first-classic": "idfc/Classic_Blue-Classic-Visa-Platinum.avif",
    "idfc-first-millennia": "idfc/first millenia.webp",
    "idfc-first-wow": "idfc/first black wow.avif",
    "idfc-first-wealth": "idfc/Wealth_Visa-Infinite-Credit-Cards.webp",
    "indusind-indulge": "indusind/indulge_credit_card.webp",
    "indusind-pinnacle": "indusind/IB_Pinnacle-Card_397x257.webp",
    "indusind-legend": "indusind/Legend_card-image_396x257px.webp",
    "indusind-eazydiner-platinum": "indusind/th-EazyDiner_banner.webp",
    "indusind-platinum-aura-edge": "indusind/PlatinumAuraEdgeCreditCard396x257px.webp",
    "indusind-tiger": "indusind/Card-Tiger-CC.webp",
    "indusind-pioneer-heritage": "indusind/th-pioneer-heritage-credit-card1.png",
    "indusind-pioneer-legacy": "indusind/pioneer_legacy_world_card.webp",
    "yes-bank-reserv": "yes bank/reserv-card-img.png",
    "yes-bank-byoc": "yes bank/byoc-card-img.png",
    "yes-bank-elite-plus": "yes bank/elite-card-img.png",
    "yes-bank-ace": "yes bank/ace-card-img.png",
    "yes-bank-select": "yes bank/select-card-img.png",
    "yes-bank-marquee": "yes bank/marquee-card-img.png",
    "bob-premier": "bob/Bank-of-Baroda-Premier-Credit-Card.webp",
    "federal-imperio": "federal/Visa Imperio.jpg",
    "federal-signet": "federal/Visa Signet (1).jpg",
    "federal-celesta": "federal/Visa Celesta.jpg"
};

async function restoreAndFix() {
    console.log(`Loading JSON from: ${JSON_FILE}`);

    let cards;
    try {
        const fileContent = fs.readFileSync(JSON_FILE, 'utf8');
        cards = JSON.parse(fileContent);
    } catch (err) {
        console.error('Error loading creditCards.json:', err);
        process.exit(1);
    }

    // Load auto-patch if successful
    let imagePatch = {};
    if (fs.existsSync(PATCH_FILE)) {
        imagePatch = JSON.parse(fs.readFileSync(PATCH_FILE, 'utf8'));
    }

    let fixCount = 0;

    if (!fs.existsSync(TARGET_IMAGES_DIR)) {
        fs.mkdirSync(TARGET_IMAGES_DIR, { recursive: true });
    }

    // Ensure Placeholder exists
    if (!fs.existsSync(path.join(TARGET_IMAGES_DIR, 'placeholder.png'))) {
        const sample = path.join(SOURCE_IMAGES_DIR, 'amex/American Express® Gold Card .avif');
        if (fs.existsSync(sample)) {
            fs.copyFileSync(sample, path.join(TARGET_IMAGES_DIR, 'placeholder.png'));
        }
    }

    const updatedCards = cards.map(card => {
        let newCard = { ...card };
        let sourcePath = null;
        let matched = false;

        // 1. Check Manual Map
        if (MANUAL_MAP[card.id]) {
            sourcePath = path.join(SOURCE_IMAGES_DIR, MANUAL_MAP[card.id]);
        }

        if (sourcePath && fs.existsSync(sourcePath)) {
            const ext = path.extname(sourcePath);
            const targetFilename = `${card.id}${ext}`;
            const targetPath = path.join(TARGET_IMAGES_DIR, targetFilename);
            fs.copyFileSync(sourcePath, targetPath);
            newCard.image = `/assets/cards/${targetFilename}`;
            matched = true;
            fixCount++;
        }

        // 2. If not manually matched, use Auto Patch (from v2 script)
        if (!matched && imagePatch[card.id]) {
            // Check if file exists in target (v2 script should have copied it)
            // But we should verify path
            newCard.image = imagePatch[card.id];
            matched = true;
        }

        // 3. Fix Link Paths (ensure /assets/cards/)
        if (newCard.image && !newCard.image.startsWith('/assets/cards/') && !newCard.image.startsWith('http')) {
            const basename = path.basename(newCard.image);
            newCard.image = `/assets/cards/${basename}`;
        }

        // 4. Fallback to placeholder if still missing
        if (newCard.image) {
            let relativePath = newCard.image;
            if (relativePath.startsWith('/')) relativePath = relativePath.substring(1);
            const currentPath = path.join(process.cwd(), 'public', relativePath);

            if (!fs.existsSync(currentPath)) {
                newCard.image = PLACEHOLDER_IMAGE;
            }
        } else {
            newCard.image = PLACEHOLDER_IMAGE;
        }

        // 5. Fill Stubs
        const isStub = !newCard.fees || !newCard.rewards || !newCard.link;
        if (isStub) {
            if (!newCard.fees) newCard.fees = { joining: 0, renewal: 0, renewalCondition: "Check website" };
            if (!newCard.rewards) newCard.rewards = { type: "N/A", rate: 0, description: "Details coming soon" };
            if (!newCard.link) newCard.link = `https://www.google.com/search?q=${encodeURIComponent(newCard.name)}`;
            if (!newCard.features) newCard.features = ["Details coming soon"];
            if (!newCard.metadata) newCard.metadata = { type: "consumer" };
        }

        return newCard;
    });

    const fileContent = `export const creditCards = ${JSON.stringify(updatedCards, null, 2)};`;
    fs.writeFileSync(JS_FILE, fileContent);

    console.log(`\nRestored and Fixed creditCards.js`);
    console.log(`- Total Cards: ${updatedCards.length}`);
    console.log(`- Manual/Auto Fixes applied/verified.`);
}

restoreAndFix();
