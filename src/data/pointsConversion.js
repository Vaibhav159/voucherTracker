// Points conversion data for major Indian credit cards
// Value represents ₹ equivalent per point for each redemption option

export const pointsConversion = {
    // HDFC Bank Cards
    "HDFC Infinia": {
        bank: "HDFC Bank",
        pointName: "Reward Points",
        baseValue: 1.0,
        options: [
            { type: "SmartBuy Flights", value: 1.0, description: "1 point = ₹1", recommended: true },
            { type: "SmartBuy Hotels", value: 0.50, description: "1 point = ₹0.50", recommended: false },
            { type: "Air Miles (Singapore Air)", value: 1.0, description: "1:1 transfer", recommended: true },
            { type: "InterMiles", value: 1.0, description: "1:1 transfer", recommended: true },
            { type: "ITC Hotels", value: 0.70, description: "3 RP = ₹2.1", recommended: false },
            { type: "Statement Credit", value: 0.30, description: "1 point = ₹0.30", recommended: false }
        ],
        bestOption: "SmartBuy Flights or Air Miles transfer",
        notes: "Points never expire. Best value at 1:1 for flights/miles."
    },
    "HDFC Diners Club Black": {
        bank: "HDFC Bank",
        pointName: "Reward Points",
        baseValue: 1.0,
        options: [
            { type: "SmartBuy Flights", value: 1.0, description: "1 point = ₹1", recommended: true },
            { type: "SmartBuy Hotels", value: 0.50, description: "1 point = ₹0.50", recommended: false },
            { type: "Air Miles Transfer", value: 1.0, description: "1:1 transfer", recommended: true },
            { type: "Statement Credit", value: 0.30, description: "1 point = ₹0.30", recommended: false }
        ],
        bestOption: "SmartBuy Flights",
        notes: "Same as Infinia. Metal variant has higher earning but same redemption."
    },
    "HDFC Regalia": {
        bank: "HDFC Bank",
        pointName: "Reward Points",
        baseValue: 0.50,
        options: [
            { type: "SmartBuy Flights", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "SmartBuy Hotels", value: 0.30, description: "1 point = ₹0.30", recommended: false },
            { type: "Air Miles", value: 0.50, description: "2:1 transfer", recommended: true },
            { type: "Statement Credit", value: 0.20, description: "1 point = ₹0.20", recommended: false }
        ],
        bestOption: "SmartBuy Flights",
        notes: "Lower value than Infinia. Best on SmartBuy portal."
    },
    "HDFC Millennia": {
        bank: "HDFC Bank",
        pointName: "CashPoints",
        baseValue: 1.0,
        options: [
            { type: "Statement Credit", value: 1.0, description: "1 point = ₹1", recommended: true },
            { type: "Catalog Redemption", value: 0.25, description: "Poor value", recommended: false }
        ],
        bestOption: "Statement Credit (₹50 fee applies)",
        notes: "Direct cashback as statement credit. Min 500 points, ₹50 redemption fee."
    },

    // ICICI Bank Cards
    "ICICI Emeralde": {
        bank: "ICICI Bank",
        pointName: "Payback Points",
        baseValue: 0.50,
        options: [
            { type: "iShop Flights", value: 0.50, description: "Best value", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: false },
            { type: "Air Miles (Vistara)", value: 0.40, description: "Decent value", recommended: true }
        ],
        bestOption: "iShop Flight Redemption",
        notes: "Use exclusively via iShop portal for best returns."
    },
    "ICICI Sapphiro": {
        bank: "ICICI Bank",
        pointName: "Payback Points",
        baseValue: 0.40,
        options: [
            { type: "iShop Flights", value: 0.40, description: "Best value", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: false }
        ],
        bestOption: "iShop Flight Redemption",
        notes: "Slightly lower value than Emeralde."
    },
    "Amazon Pay ICICI": {
        bank: "ICICI Bank",
        pointName: "Amazon Pay Balance",
        baseValue: 1.0,
        options: [
            { type: "Amazon Pay Balance", value: 1.0, description: "Direct cashback", recommended: true }
        ],
        bestOption: "Auto-credited as Amazon Pay Balance",
        notes: "No conversion needed - direct cashback to Amazon Pay wallet."
    },

    // Axis Bank Cards
    "Axis Magnus": {
        bank: "Axis Bank",
        pointName: "EDGE MILES",
        baseValue: 0.80,
        options: [
            { type: "Air Miles (Group A)", value: 0.80, description: "1:3.2 ratio (Max 1L transfer/yr)", recommended: true },
            { type: "Air Miles (Group B)", value: 0.50, description: "1:2 ratio (Max 4L transfer/yr)", recommended: false },
            { type: "Travel EDGE Portal", value: 0.50, description: "1 point = ₹0.50", recommended: false },
            { type: "Statement Credit", value: 0.25, description: "Poor value", recommended: false }
        ],
        bestOption: "Transfer to Group A partners (Singapore Air, Etihad)",
        notes: "Devalued: Group A (1L) & Group B (4L) transfer caps. No rewards on fuel, insurance, utility, gold, rent."
    },
    "Axis Atlas": {
        bank: "Axis Bank",
        pointName: "EDGE MILES",
        baseValue: 0.50,
        options: [
            { type: "Air Miles Transfer", value: 0.50, description: "1:2 ratio", recommended: true },
            { type: "Travel EDGE Portal", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "Poor value", recommended: false }
        ],
        bestOption: "Travel EDGE or Air Miles transfer",
        notes: "Same transfer limits as Magnus but lower earning rate."
    },
    "Flipkart Axis": {
        bank: "Axis Bank",
        pointName: "Cashback",
        baseValue: 1.0,
        options: [
            { type: "Statement Credit", value: 1.0, description: "Auto-credited", recommended: true }
        ],
        bestOption: "Auto-credited as statement credit",
        notes: "Direct cashback, no conversion needed."
    },

    // SBI Cards
    "SBI Cashback": {
        bank: "SBI Card",
        pointName: "Cashback",
        baseValue: 1.0,
        options: [
            { type: "Statement Credit", value: 1.0, description: "Auto-credited", recommended: true }
        ],
        bestOption: "Auto-credited within 2 days of statement",
        notes: "Direct cashback, ₹5000/month cap. Best in class for simplicity."
    },
    "SBI Elite": {
        bank: "SBI Card",
        pointName: "Reward Points",
        baseValue: 0.25,
        options: [
            { type: "Air Miles (Vistara/Club Vistara)", value: 0.30, description: "Best value", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: false },
            { type: "e-Gift Voucher", value: 0.25, description: "Various brands", recommended: false }
        ],
        bestOption: "Vistara Club transfer",
        notes: "Transfer to airline partners for best value."
    },

    // Other Popular Cards
    "OneCard": {
        bank: "FPL Technologies",
        pointName: "Reward Points",
        baseValue: 0.50,
        options: [
            { type: "Pay Bill", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "Cash Redemption", value: 0.50, description: "Via app", recommended: true }
        ],
        bestOption: "Use against card bill or instant cash",
        notes: "Simple 1 RP per ₹50 spent, no complex tiers."
    },
    "Scapia": {
        bank: "Federal Bank",
        pointName: "Scapia Coins",
        baseValue: 0.50,
        options: [
            { type: "Scapia Travel App", value: 0.50, description: "Only option", recommended: true }
        ],
        bestOption: "Redeem on Scapia app for travel bookings",
        notes: "5 coins per ₹100 spent. Only redeemable on Scapia app."
    },
    "IDFC First Wealth": {
        bank: "IDFC First Bank",
        pointName: "Reward Points",
        baseValue: 0.25,
        options: [
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: true },
            { type: "Flight Redemption", value: 0.30, description: "Via partner", recommended: true }
        ],
        bestOption: "Flight redemption via partner portals",
        notes: "10X rewards on transactions >₹20k make it valuable despite low base."
    }
};

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
