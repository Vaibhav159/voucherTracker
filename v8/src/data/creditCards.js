// Credit Cards Data Loader
// Loads card data from JSON files and provides utility functions

// Import all card JSON files
const cardFiles = import.meta.glob('./cards/*.json', { eager: true });

// Card image mappings - maps card slugs to image filenames
const cardImageMap = {
    // HDFC Cards
    'hdfc-infinia-metal': 'hdfc-infinia-metal.webp',
    'hdfc-infinia': 'hdfc-infinia-metal.webp',
    'hdfc-diners-club-black-credit-card': 'hdfc-diners-club-black.png',
    'hdfc-diners-club-black-metal-edition': 'hdfc-diners-club-black-metal.png',
    'hdfc-regalia-credit-card': 'hdfc-regalia.webp',
    'hdfc-regalia-gold-credit-card': 'hdfc-regalia-gold.png',
    'hdfc-millennia-credit-card': 'hdfc-millennia.png',
    'hdfc-moneyback-plus-credit-card': 'hdfc-moneyback-plus.png',
    'hdfc-freedom-credit-card': 'hdfc-freedom.png',
    'hdfc-pixel-go-credit-card': 'hdfc-pixel-go.jpg',
    'hdfc-pixel-play-credit-card': 'hdfc-pixel-play.png',
    'hdfc-bizblack-metal-edition-credit-card': 'hdfc-bizblack-metal.webp',
    'hdfc-bizpower-credit-card': 'hdfc-bizpower.png',
    'irctc-hdfc-bank-credit-card': 'irctc-hdfc.webp',
    'swiggy-hdfc-bank-credit-card': 'hdfc-swiggy.png',
    'tata-neu-infinity-hdfc-bank-credit-card': 'hdfc-tata-neu-infinity.webp',
    'tata-neu-plus-hdfc-bank-credit-card': 'hdfc-tata-neu-plus.jpg',
    'marriott-bonvoy-hdfc-credit-card': 'marriott-bonvoy-hdfc.webp',
    'shoppers-stop-hdfc-credit-card': 'hdfc-shoppers-stop.png',
    'shoppers-stop-black-hdfc-credit-card': 'hdfc-shoppers-stop-black.png',

    // ICICI Cards
    'icici-coral-credit-card': 'icici-coral.webp',
    'icici-rubyx-credit-card': 'icici-rubyx.webp',
    'icici-sapphiro-credit-card': 'icici-sapphiro.webp',
    'icici-emeralde-credit-card': 'icici-emeralde.webp',
    'icici-emeralde-private-metal': 'icici-emeralde-private-metal.webp',
    'adani-one-icici-platinum-credit-card': 'adani-one-icici-platinum.webp',
    'adani-one-icici-signature-credit-card': 'adani-one-icici-signature.webp',
    'amazon-pay-icici-credit-card': 'amazon-pay-icici.webp',
    'emirates-skywards-icici-emeralde': 'icici-emirates-emeralde.webp',
    'icici-emirates-skywards-rubyx-credit-card': 'icici-emirates-rubyx.webp',
    'icici-emirates-skywards-sapphiro-credit-card': 'icici-emirates-sapphiro.webp',
    'icici-hpcl-super-saver-credit-card': 'icici-hpcl-super-saver.webp',
    'icici-makemytrip-signature-credit-card': 'icici-makemytrip-signature.png',
    'makemytrip-icici-signature-credit-card': 'icici-makemytrip-signature.png',
    'icici-manchester-united-platinum-credit-card': 'icici-manchester-platinum.webp',
    'icici-manchester-united-signature-card': 'icici-manchester-united-signature.webp',
    'icici-platinum-chip-credit-card': 'icici-platinum-chip.webp',
    'times-black-icici-credit-card': 'icici-times-black.webp',

    // SBI Cards
    'sbi-card-elite': 'sbi-elite.png',
    'sbi-elite-credit-card': 'sbi-elite.png',
    'sbi-prime-credit-card': 'sbi-prime.png',
    'sbi-aurum-credit-card': 'sbi-aurum.webp',
    'sbi-card-miles-elite': 'sbi-miles-elite.png',
    'sbi-simplyclick-credit-card': 'sbi-simplyclick.png',
    'sbi-simplysave-credit-card': 'sbi-simplysave.png',
    'sbi-simplysave-upi-rupay-card': 'sbi-simplysave-upi-rupay.png',
    'sbi-pulse-credit-card': 'sbi-pulse.png',
    'cashback-sbi-card': 'sbi-cashback.png',
    'bpcl-sbi-card-octane': 'bpcl-sbi-octane.webp',
    'bpcl-sbi-credit-card': 'bpcl-sbi.png',
    'club-vistara-sbi-card': 'club-vistara-sbi.webp',
    'club-vistara-sbi-card-prime': 'club-vistara-sbi-prime.webp',
    'flipkart-sbi-card-data': 'sbi-flipkart.png',
    'indigo-sbi-card': 'sbi-indigo.png',
    'yatra-sbi-credit-card': 'yatra-sbi.webp',
    'paytm-sbi-card-data': 'sbi-paytm.png',
    'paytm-sbi-card-select': 'sbi-paytm-select.png',
    'phonepe-sbi-card-purple': 'sbi-phonepe.png',
    'phonepe-sbi-card-select-black': 'sbi-phonepe-select.png',
    'reliance-sbi-card': 'sbi-reliance.png',
    'apollo-sbi-card-select': 'sbi-apollo.png',

    // Axis Cards
    'axis-atlas-credit-card': 'axis-atlas.webp',
    'axis-magnus-credit-card': 'axis-magnus.webp',
    'axis-reserve-credit-card': 'axis-reserve.webp',
    'axis-bank-select-credit-card': 'axis-select.webp',
    'flipkart-axis-bank-credit-card': 'flipkart-axis.webp',
    'airtel-axis-bank-credit-card': 'axis-airtel.png',
    'indianoil-axis-bank-credit-card': 'axis-indianoil.webp',

    // AMEX Cards
    'amex-gold-charge-card-india': 'amex-gold-charge.avif',
    'amex-platinum-charge-card-india': 'amex-platinum-charge.avif',
    'amex-platinum-travel-credit-card': 'amex-platinum-travel.webp',

    // IDFC Cards
    'idfc-first-private-credit-card': 'idfc-first-private.webp',
    'idfc-first-select-credit-card': 'idfc-first-select.avif',
    'idfc-first-wealth-credit-card': 'idfc-first-wealth.webp',

    // Standard Chartered
    'sc-ultimate-credit-card': 'sc-ultimate.webp',
};

// Get card image path
export const getCardImage = (cardSlug) => {
    const filename = cardImageMap[cardSlug];
    if (filename) {
        return `/assets/cards/${filename}`;
    }
    // Try to construct a default path based on slug
    return null;
};

// Process all cards into an array (with image paths)
export const allCards = Object.values(cardFiles).map(module => {
    const card = module.default || module;
    // Add image path if not already present or override with mapped image
    const mappedImage = getCardImage(card.slug || card.id);
    if (mappedImage) {
        card.image = mappedImage;
    }
    return card;
});

// Get unique banks from all cards
export const getAllBanks = () => {
    const banks = [...new Set(allCards.map(card => card.bank))];
    return banks.sort();
};

// Get cards filtered by bank
export const getCardsByBank = (bankNames) => {
    if (!bankNames || bankNames.length === 0) return allCards;
    return allCards.filter(card => bankNames.includes(card.bank));
};

// Get card by ID or slug
export const getCardById = (id) => {
    return allCards.find(card => card.id === id || card.slug === id);
};

// Get cards by tier (ultra-premium, premium, mid-tier, entry)
export const getCardsByTier = (tier) => {
    return allCards.filter(card => card.cardType?.tier === tier);
};

// Get cards by network type (Visa, Mastercard, AMEX, etc.)
export const getCardsByNetwork = (networkType) => {
    return allCards.filter(card =>
        card.network?.type?.toLowerCase() === networkType.toLowerCase()
    );
};

// Get featured/premium cards (ultra-premium tier or metal material)
export const getFeaturedCards = (limit = 4) => {
    const featured = allCards.filter(card =>
        card.cardType?.tier === 'ultra-premium' ||
        card.cardType?.material === 'metal'
    );
    return featured.slice(0, limit);
};

// Helper to format currency
export const formatCurrency = (amount, currency = 'INR') => {
    if (amount === null || amount === undefined) return 'N/A';
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(0)}k`;
    }
    return `₹${amount}`;
};

// Get reward rate as percentage string
export const getRewardRate = (card) => {
    if (!card.rewards?.baseRate) return 'N/A';
    const percentage = card.rewards.baseRate.effectivePercentage;
    if (percentage) {
        return `${(percentage * 100).toFixed(1)}%`;
    }
    return 'N/A';
};

// Get best redemption value
export const getBestRedemptionValue = (card) => {
    if (!card.rewards?.redemption?.bestValue) return null;
    return card.rewards.redemption.bestValue;
};

// Check if card has lounge access
export const hasLoungeAccess = (card) => {
    return card.loungeAccess?.domestic?.enabled || card.loungeAccess?.international?.enabled;
};

// Get annual fee info
export const getAnnualFee = (card) => {
    const fee = card.fees?.annual?.amount;
    const joining = card.fees?.joining?.amount;
    const waiver = card.fees?.annual?.renewalWaiver;

    return {
        annual: fee,
        joining: joining,
        hasWaiver: waiver?.available || false,
        waiverThreshold: waiver?.spendThreshold || null,
        waiverText: waiver?.waiverText || null
    };
};

export default allCards;
