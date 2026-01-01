// Points conversion data for major Indian credit cards (January 2026)
// Now dynamically generated from creditCards.js for consistency
import { creditCards } from './creditCards';

// Tier colors and labels for UI
export const tierConfig = {
    "super-premium": { color: "#B8860B", bg: "rgba(184, 134, 11, 0.15)", label: "Super Premium" },
    "premium": { color: "#9370DB", bg: "rgba(147, 112, 219, 0.15)", label: "Premium" },
    "mid": { color: "#20B2AA", bg: "rgba(32, 178, 170, 0.15)", label: "Mid-Range" },
    "entry": { color: "#708090", bg: "rgba(112, 128, 144, 0.15)", label: "Entry Level" },
    "fuel": { color: "#FF6347", bg: "rgba(255, 99, 71, 0.15)", label: "Fuel Card" },
    "co-branded": { color: "#06b6d4", bg: "rgba(6, 182, 212, 0.15)", label: "Co-Branded" },
};

// Build pointsConversion from creditCards data for cards that have redemption info
const buildPointsConversion = () => {
    const conversion = {};

    creditCards.forEach(card => {
        // Only include cards that have redemption data
        if (!card.rewards?.redemption) return;

        const redemption = card.rewards.redemption;
        const calculator = card.rewards.calculator;

        // Map options to expected format
        const options = (redemption.options || []).map(opt => ({
            type: opt.type,
            value: opt.value || redemption.baseValue || 0.25,
            description: opt.desc || opt.description || "",
            recommended: opt.recommended || false
        }));

        // If no options, create a default one based on reward type
        if (options.length === 0) {
            options.push({
                type: card.rewards.type === 'cashback' ? "Statement Credit" : "Vouchers/Statement",
                value: redemption.baseValue || 0.25,
                description: `1 point = ₹${redemption.baseValue || 0.25}`,
                recommended: true
            });
        }

        conversion[card.name] = {
            bank: card.bank,
            cardId: card.id,
            pointName: card.rewards.name || (card.rewards.type === 'cashback' ? 'Cashback' : 'Reward Points'),
            baseValue: redemption.baseValue || 0.25,
            tier: calculator?.tier || (card.rewards.type === 'cashback' ? 'entry' : 'mid'),
            earning: card.rewards.earningText || `${(card.rewards.baseRate || 0.01) * 100}% rewards`,
            options: options,
            bestOption: redemption.bestOption || options[0]?.type || "Statement Credit",
            notes: card.metadata?.verdict || "",
            exclusions: card.rewards.exclusions || "Standard exclusions apply",
            // Keep reference to original card
            originalCard: card
        };
    });

    return conversion;
};

// Export the dynamically built pointsConversion
export const pointsConversion = buildPointsConversion();

// Helper function to calculate conversion
export const calculatePointsValue = (cardName, points, optionType) => {
    const card = pointsConversion[cardName];
    if (!card) return null;

    const option = card.options.find(o => o.type === optionType);
    if (!option) return null;

    return {
        points,
        rupeeValue: points * option.value,
        option: option.type,
        description: option.description
    };
};

// Get all card names
export const getCardNames = () => Object.keys(pointsConversion);

// Get best redemption for a card
export const getBestRedemption = (cardName) => {
    const card = pointsConversion[cardName];
    return card ? card.bestOption : null;
};

// Get cards by bank
export const getCardsByBank = (bankName) =>
    Object.entries(pointsConversion)
        .filter(([_, card]) => card.bank === bankName)
        .map(([name]) => name);

// Get all unique banks
export const getAllBanks = () => [...new Set(Object.values(pointsConversion).map(c => c.bank))].sort();

// Get cards by tier
export const getCardsByTier = (tier) =>
    Object.entries(pointsConversion)
        .filter(([_, card]) => card.tier === tier)
        .map(([name]) => name);

// Get card count
export const getCardCount = () => Object.keys(pointsConversion).length;
