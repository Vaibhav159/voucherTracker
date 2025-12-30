// Points conversion data for major Indian credit cards (December 2025)
// Value represents ₹ equivalent per point for each redemption option

// Tier colors and labels for UI
export const tierConfig = {
    "super-premium": { color: "#B8860B", bg: "rgba(184, 134, 11, 0.15)", label: "Super Premium" },
    "premium": { color: "#9370DB", bg: "rgba(147, 112, 219, 0.15)", label: "Premium" },
    "mid": { color: "#20B2AA", bg: "rgba(32, 178, 170, 0.15)", label: "Mid-Range" },
    "entry": { color: "#708090", bg: "rgba(112, 128, 144, 0.15)", label: "Entry Level" },
    "fuel": { color: "#FF6347", bg: "rgba(255, 99, 71, 0.15)", label: "Fuel Card" },
};

export const pointsConversion = {
    // ═══════════════════════════════════════════════════════════════
    // HDFC BANK CARDS
    // ═══════════════════════════════════════════════════════════════
    "HDFC Infinia": {
        bank: "HDFC Bank",
        pointName: "Reward Points",
        baseValue: 1.0,
        tier: "super-premium",
        earning: "5 RP per ₹150 spent (3.33% earn rate)",
        options: [
            { type: "SmartBuy Flights", value: 1.0, description: "1 point = ₹1", recommended: true },
            { type: "SmartBuy Hotels", value: 1.0, description: "1 point = ₹1", recommended: true },
            { type: "Apple Products (SmartBuy)", value: 1.0, description: "1 point = ₹1 (max 1 product/quarter)", recommended: true },
            { type: "Tanishq Vouchers", value: 1.0, description: "1 point = ₹1 (max 50K points/quarter)", recommended: true },
            { type: "Air Miles (Singapore Air/Kris)", value: 1.0, description: "1:1 transfer", recommended: true },
            { type: "InterMiles", value: 1.0, description: "1:1 transfer", recommended: true },
            { type: "Marriott Bonvoy", value: 1.0, description: "1:1 transfer", recommended: true },
            { type: "ITC Hotels", value: 0.70, description: "3 RP = ₹2.1", recommended: false },
            { type: "SmartBuy Catalog/Vouchers", value: 0.50, description: "1 point = ₹0.50", recommended: false },
            { type: "Statement Credit", value: 0.30, description: "1 point = ₹0.30", recommended: false },
        ],
        bestOption: "SmartBuy Flights/Hotels, Apple, Tanishq or Air Miles transfer",
        notes: "Points never expire. From Feb 2026: Max 5 redemptions/month, 2L points/statement cycle, 1.5L points/month for travel/airmiles.",
        exclusions: "No RP on rent, govt payments, education via apps. Utility/Telecom capped at 2K RP/month each.",
    },
    "HDFC Infinia Metal": {
        bank: "HDFC Bank",
        pointName: "Reward Points",
        baseValue: 1.0,
        tier: "super-premium",
        earning: "5 RP per ₹150 spent (3.33% earn rate)",
        options: [
            { type: "SmartBuy Flights", value: 1.0, description: "1 point = ₹1", recommended: true },
            { type: "SmartBuy Hotels", value: 1.0, description: "1 point = ₹1", recommended: true },
            { type: "Apple Products (SmartBuy)", value: 1.0, description: "1 point = ₹1 (max 1 product/quarter)", recommended: true },
            { type: "Tanishq Vouchers", value: 1.0, description: "1 point = ₹1 (max 50K points/quarter)", recommended: true },
            { type: "Air Miles Transfer", value: 1.0, description: "1:1 transfer", recommended: true },
            { type: "Statement Credit", value: 0.30, description: "1 point = ₹0.30", recommended: false },
        ],
        bestOption: "SmartBuy Flights/Hotels or Air Miles transfer",
        notes: "Same benefits as Infinia. Metal card with ₹12,500 fee (waived on ₹10L spend). Welcome 12,500 RP.",
        exclusions: "Same exclusions as Infinia",
    },
    "HDFC Diners Club Black": {
        bank: "HDFC Bank",
        pointName: "Reward Points",
        baseValue: 1.0,
        tier: "super-premium",
        earning: "5 RP per ₹150 spent (3.33% earn rate)",
        options: [
            { type: "SmartBuy Flights", value: 1.0, description: "1 point = ₹1", recommended: true },
            { type: "SmartBuy Hotels", value: 1.0, description: "1 point = ₹1", recommended: true },
            { type: "Air Miles Transfer", value: 1.0, description: "1:1 transfer", recommended: true },
            { type: "InterMiles", value: 1.0, description: "1:1 transfer", recommended: true },
            { type: "SmartBuy Catalog", value: 0.50, description: "1 point = ₹0.50", recommended: false },
            { type: "Statement Credit", value: 0.30, description: "1 point = ₹0.30", recommended: false },
        ],
        bestOption: "SmartBuy Flights or Air Miles transfer",
        notes: "Metal variant available. 10K bonus RP on ₹4L quarterly spend. Swiggy One & Amazon Prime as welcome benefit.",
        exclusions: "No Apple/Tanishq 1:1 redemption (unlike Infinia)",
    },
    "HDFC Regalia Gold": {
        bank: "HDFC Bank",
        pointName: "Reward Points",
        baseValue: 0.50,
        tier: "premium",
        earning: "4 RP per ₹150 spent (~1.33% earn rate)",
        options: [
            { type: "SmartBuy Flights", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "SmartBuy Hotels", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "Air Miles (2:1)", value: 0.50, description: "2 RP = 1 Air Mile", recommended: true },
            { type: "Statement Credit", value: 0.20, description: "1 point = ₹0.20", recommended: false },
        ],
        bestOption: "SmartBuy Flights/Hotels",
        notes: "₹2,500 fee. Upgrade from Regalia. Good milestone benefits. MMT Black Gold membership.",
        exclusions: "Standard HDFC exclusions apply",
    },
    "HDFC Regalia": {
        bank: "HDFC Bank",
        pointName: "Reward Points",
        baseValue: 0.50,
        tier: "premium",
        earning: "4 RP per ₹150 spent",
        options: [
            { type: "SmartBuy Flights", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "SmartBuy Hotels", value: 0.30, description: "1 point = ₹0.30", recommended: false },
            { type: "Air Miles (2:1)", value: 0.50, description: "2:1 transfer", recommended: true },
            { type: "Statement Credit", value: 0.20, description: "1 point = ₹0.20", recommended: false },
        ],
        bestOption: "SmartBuy Flights",
        notes: "Being phased out for Regalia Gold. Lower value than Infinia/DCB.",
        exclusions: "Standard HDFC exclusions",
    },
    "HDFC Millennia": {
        bank: "HDFC Bank",
        pointName: "CashPoints",
        baseValue: 1.0,
        tier: "entry",
        earning: "5% CashBack on Amazon/Flipkart/Myntra, 2.5% on other online, 1% offline",
        options: [
            { type: "Statement Credit", value: 1.0, description: "1 point = ₹1 (₹50 redemption fee)", recommended: true },
            { type: "SmartBuy Travel", value: 1.0, description: "1 point = ₹1", recommended: true },
            { type: "Catalog Redemption", value: 0.25, description: "Poor value", recommended: false },
        ],
        bestOption: "Statement Credit or SmartBuy Travel",
        notes: "Cashback card. Min 2500 CashPoints to redeem. ₹50 fee per redemption. 1000 CashPoints cap/month on 5% category.",
        exclusions: "No rewards on fuel, EMI, wallet loads",
    },
    "HDFC MoneyBack+": {
        bank: "HDFC Bank",
        pointName: "CashPoints",
        baseValue: 1.0,
        tier: "entry",
        earning: "2 CashPoints per ₹150 on online, 1 CP per ₹150 offline",
        options: [
            { type: "Statement Credit", value: 1.0, description: "1 point = ₹1", recommended: true },
        ],
        bestOption: "Statement Credit",
        notes: "Entry-level cashback card. Simple redemption structure.",
        exclusions: "No rewards on fuel, wallet loads",
    },
    "HDFC Tata Neu Infinity": {
        bank: "HDFC Bank",
        pointName: "NeuCoins",
        baseValue: 1.0,
        tier: "premium",
        earning: "5% on Tata brands, 1.5% elsewhere",
        options: [
            { type: "Tata Ecosystem", value: 1.0, description: "1 NeuCoin = ₹1", recommended: true },
            { type: "SmartBuy", value: 0.50, description: "Convert to RP first", recommended: false },
        ],
        bestOption: "Use directly in Tata ecosystem (BigBasket, 1mg, Croma, AirAsia)",
        notes: "Best for Tata ecosystem users. 5% on Tata brands, 1.5% elsewhere.",
        exclusions: "NeuCoins expire 12 months from earn date",
    },
    "HDFC Tata Neu Plus": {
        bank: "HDFC Bank",
        pointName: "NeuCoins",
        baseValue: 1.0,
        tier: "entry",
        earning: "2% on Tata brands, 1% elsewhere",
        options: [
            { type: "Tata Ecosystem", value: 1.0, description: "1 NeuCoin = ₹1", recommended: true },
        ],
        bestOption: "Use directly in Tata ecosystem",
        notes: "Entry-level Tata card. 2% on Tata brands, 1% elsewhere.",
        exclusions: "NeuCoins expire 12 months from earn date",
    },
    "HDFC Swiggy": {
        bank: "HDFC Bank",
        pointName: "Swiggy Money",
        baseValue: 1.0,
        tier: "entry",
        earning: "10% on Swiggy, 5% on online, 1% offline",
        options: [
            { type: "Swiggy Wallet", value: 1.0, description: "Direct cashback", recommended: true },
        ],
        bestOption: "Auto-credited to Swiggy wallet",
        notes: "10% on Swiggy, 5% on online, 1% offline. Max ₹1500/month.",
        exclusions: "Monthly cashback caps apply",
    },

    // ═══════════════════════════════════════════════════════════════
    // ICICI BANK CARDS
    // ═══════════════════════════════════════════════════════════════
    "ICICI Emeralde": {
        bank: "ICICI Bank",
        pointName: "PAYBACK Points",
        baseValue: 0.50,
        tier: "super-premium",
        earning: "4 PAYBACK points per ₹100 spent",
        options: [
            { type: "iShop Flights", value: 0.50, description: "Best value redemption", recommended: true },
            { type: "iShop Hotels", value: 0.50, description: "Good value", recommended: true },
            { type: "Air Miles (Vistara CV)", value: 0.40, description: "2.5:1 transfer", recommended: true },
            { type: "InterMiles", value: 0.35, description: "Decent value", recommended: false },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: false },
        ],
        bestOption: "iShop Flight/Hotel Redemption",
        notes: "Invite-only super premium card. Use iShop portal for best returns. Emeralde Private variant also available.",
        exclusions: "Check ICICI exclusion list",
    },
    "ICICI Sapphiro": {
        bank: "ICICI Bank",
        pointName: "PAYBACK Points",
        baseValue: 0.40,
        tier: "premium",
        earning: "2 PAYBACK points per ₹100 spent",
        options: [
            { type: "iShop Flights", value: 0.40, description: "Best value", recommended: true },
            { type: "iShop Hotels", value: 0.40, description: "Good value", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: false },
        ],
        bestOption: "iShop Flight Redemption",
        notes: "Slightly lower value than Emeralde. Good travel benefits.",
        exclusions: "Standard ICICI exclusions",
    },
    "Amazon Pay ICICI": {
        bank: "ICICI Bank",
        pointName: "Amazon Pay Cashback",
        baseValue: 1.0,
        tier: "entry",
        earning: "5% on Amazon (Prime), 3% (non-Prime), 2% on bill payments, 1% elsewhere",
        options: [
            { type: "Amazon Pay Balance", value: 1.0, description: "Auto-credited cashback", recommended: true },
        ],
        bestOption: "Auto-credited as Amazon Pay Balance",
        notes: "Lifetime free. No conversion needed - direct cashback. One of the best entry-level cards.",
        exclusions: "Gift cards, Amazon Business purchases have lower rates",
    },
    "MakeMyTrip ICICI": {
        bank: "ICICI Bank",
        pointName: "My Cash",
        baseValue: 1.0,
        tier: "mid",
        earning: "Up to 10% on MMT, 2% on other travel, 1% elsewhere",
        options: [
            { type: "MakeMyTrip Bookings", value: 1.0, description: "1 MyCash = ₹1", recommended: true },
        ],
        bestOption: "Redeem on MakeMyTrip for flights/hotels",
        notes: "Best for frequent MMT users. Direct value redemption on travel.",
        exclusions: "Standard exclusions apply",
    },

    // ═══════════════════════════════════════════════════════════════
    // AXIS BANK CARDS
    // ═══════════════════════════════════════════════════════════════
    "Axis Magnus": {
        bank: "Axis Bank",
        pointName: "EDGE MILES",
        baseValue: 0.40,
        tier: "super-premium",
        earning: "12 EDGE Miles per ₹200 (up to ₹1.5L), 35 EDGE Miles per ₹200 (above ₹1.5L)",
        options: [
            { type: "Air Miles - Group A", value: 0.40, description: "5:2 ratio, 1L points/year cap", recommended: true },
            { type: "Air Miles - Group B", value: 0.40, description: "5:2 ratio, 4L points/year cap", recommended: true },
            { type: "Travel EDGE Portal", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "EDGE Rewards Catalog", value: 0.20, description: "1 point = ₹0.20", recommended: false },
            { type: "Statement Credit", value: 0.20, description: "Poor value", recommended: false },
        ],
        bestOption: "Travel EDGE Portal or Air Miles Transfer (within caps)",
        notes: "DEVALUED Apr 2024: Miles ratio changed from 5:4 to 5:2. Annual caps apply. ₹12,500 fee (waived on ₹25L spend).",
        exclusions: "No RP on fuel, insurance, utility, gold, rent, govt payments, wallet loads",
    },
    "Axis Magnus Burgundy": {
        bank: "Axis Bank",
        pointName: "EDGE MILES",
        baseValue: 0.80,
        tier: "super-premium",
        earning: "12 EDGE Miles per ₹200 (up to ₹1.5L), 35 EDGE Miles per ₹200 (above ₹1.5L)",
        options: [
            { type: "Air Miles - Group A", value: 0.80, description: "5:4 ratio, 2L points/year cap", recommended: true },
            { type: "Air Miles - Group B", value: 0.80, description: "5:4 ratio, 8L points/year cap", recommended: true },
            { type: "Travel EDGE Portal", value: 0.50, description: "1 point = ₹0.50", recommended: false },
        ],
        bestOption: "Air Miles Transfer (5:4 ratio retained)",
        notes: "For Burgundy clients only. Retains 5:4 ratio (unlike regular Magnus). ₹30K fee (waived on ₹30L spend). 10L transfer cap/year.",
        exclusions: "Same as Magnus",
    },
    "Axis Reserve": {
        bank: "Axis Bank",
        pointName: "EDGE MILES",
        baseValue: 0.50,
        tier: "super-premium",
        earning: "12 EDGE Miles per ₹200 spent",
        options: [
            { type: "Air Miles - Group A", value: 0.50, description: "5:2 ratio", recommended: true },
            { type: "Travel EDGE Portal", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "Statement Credit", value: 0.20, description: "Poor value", recommended: false },
        ],
        bestOption: "Travel EDGE or Air Miles Transfer",
        notes: "Ultra-premium card. Same transfer limits as Magnus apply. ₹50K annual fee. Meet & greet services.",
        exclusions: "Same exclusions as Magnus",
    },
    "Axis Atlas": {
        bank: "Axis Bank",
        pointName: "EDGE MILES",
        baseValue: 0.40,
        tier: "premium",
        earning: "5 EDGE Miles per ₹100 on airlines/hotels, 2 per ₹100 elsewhere",
        options: [
            { type: "Air Miles Transfer", value: 0.40, description: "5:2 ratio", recommended: true },
            { type: "Travel EDGE Portal", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "Statement Credit", value: 0.20, description: "Poor value", recommended: false },
        ],
        bestOption: "Travel EDGE or Air Miles transfer",
        notes: "Travel-focused card. Same caps as Magnus. ₹5K fee (waived on ₹7.5L spend).",
        exclusions: "Same exclusions as Magnus",
    },
    "Flipkart Axis": {
        bank: "Axis Bank",
        pointName: "Cashback",
        baseValue: 1.0,
        tier: "entry",
        earning: "5% on Flipkart/Myntra/Cleartrip, 4% on bill payments, 1.5% elsewhere",
        options: [
            { type: "Statement Credit", value: 1.0, description: "Auto-credited", recommended: true },
        ],
        bestOption: "Auto-credited as statement credit",
        notes: "Lifetime free. Direct cashback, no conversion needed. Monthly cap of ₹1500 on Flipkart category.",
        exclusions: "Caps on accelerated cashback categories",
    },
    "Axis Ace": {
        bank: "Axis Bank",
        pointName: "Cashback",
        baseValue: 1.0,
        tier: "entry",
        earning: "5% on Google Pay, 4% on Swiggy/Zomato, 2% on bill payments, 1.5% elsewhere",
        options: [
            { type: "Statement Credit", value: 1.0, description: "Auto-credited", recommended: true },
        ],
        bestOption: "Auto-credited as statement credit",
        notes: "Lifetime free. Good for UPI & food delivery users. ₹1500/month cap on 5% category.",
        exclusions: "Monthly caps apply",
    },
    "Airtel Axis": {
        bank: "Axis Bank",
        pointName: "Cashback",
        baseValue: 1.0,
        tier: "entry",
        earning: "25% on Airtel services, 10% on utilities, 1% elsewhere",
        options: [
            { type: "Statement Credit", value: 1.0, description: "Auto-credited", recommended: true },
        ],
        bestOption: "Use for Airtel services and bill payments",
        notes: "Best for Airtel users. 25% on Airtel recharges/bills (₹250 cap/month). Lifetime free.",
        exclusions: "Category caps apply",
    },

    // ═══════════════════════════════════════════════════════════════
    // SBI CARDS
    // ═══════════════════════════════════════════════════════════════
    "SBI Aurum": {
        bank: "SBI Card",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "super-premium",
        earning: "2 RP per ₹100 (domestic), 4 RP per ₹100 (international)",
        options: [
            { type: "Air Miles (Vistara/Air India)", value: 0.30, description: "Better value", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: false },
            { type: "e-Gift Voucher", value: 0.25, description: "Various brands", recommended: false },
        ],
        bestOption: "Air Miles transfer or milestone benefits",
        notes: "₹10K annual fee. Strong milestone benefits: 20K RP on ₹5L spend, 30K RP on ₹10L spend.",
        exclusions: "Fuel, rent, govt, insurance excluded",
    },
    "SBI Elite": {
        bank: "SBI Card",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "premium",
        earning: "2 RP per ₹100 (5X on dining/grocery/departmental)",
        options: [
            { type: "Air Miles (Vistara CV)", value: 0.30, description: "Best value", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: false },
            { type: "e-Gift Voucher", value: 0.25, description: "Various brands", recommended: false },
        ],
        bestOption: "Milestone benefits + Air Miles",
        notes: "₹4,999 fee (waived on ₹10L spend). Free movie tickets ₹500/month. 10K RP on ₹3L/4L spend milestones.",
        exclusions: "10K RP cap/month on dining/grocery/dept stores combined",
    },
    "SBI Prime": {
        bank: "SBI Card",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "mid",
        earning: "2 RP per ₹100, 10X on dining via Swiggy Dineout",
        options: [
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: true },
            { type: "e-Gift Voucher", value: 0.25, description: "Various brands", recommended: false },
        ],
        bestOption: "Statement Credit or milestone redemption",
        notes: "₹2,999 fee. Pizza Hut voucher worth ₹1000 on ₹50K quarterly spend.",
        exclusions: "Standard SBI exclusions",
    },
    "SBI Cashback": {
        bank: "SBI Card",
        pointName: "Cashback",
        baseValue: 1.0,
        tier: "entry",
        earning: "5% cashback on all online spends",
        options: [
            { type: "Statement Credit", value: 1.0, description: "Auto-credited", recommended: true },
        ],
        bestOption: "Auto-credited within 2 days of statement",
        notes: "₹999 fee. ₹5000/month cashback cap. One of the best pure cashback cards.",
        exclusions: "Only online spends earn 5%. Offline is 1%.",
    },
    "SBI SimplyCLICK": {
        bank: "SBI Card",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "entry",
        earning: "10 RP per ₹100 on partner sites (Amazon, Cleartrip etc), 1 RP per ₹100 elsewhere",
        options: [
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: true },
            { type: "e-Gift Voucher", value: 0.25, description: "Amazon etc", recommended: true },
        ],
        bestOption: "Partner e-vouchers or statement credit",
        notes: "₹499 fee. 10X on select online partners. From Apr 2025: Swiggy reduced to 5X.",
        exclusions: "Standard exclusions",
    },

    // ═══════════════════════════════════════════════════════════════
    // IDFC FIRST BANK CARDS
    // ═══════════════════════════════════════════════════════════════
    "IDFC FIRST Wealth": {
        bank: "IDFC First Bank",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "premium",
        earning: "3X RP per ₹150 (up to ₹20K), 10X RP per ₹150 (above ₹20K)",
        options: [
            { type: "Pay with Points (online)", value: 0.25, description: "1 point = ₹0.25", recommended: true },
            { type: "Poshvine Vouchers", value: 0.25, description: "1 point = ₹0.25", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25 (₹99 fee)", recommended: false },
        ],
        bestOption: "Pay with Points at checkout or Poshvine vouchers",
        notes: "LIFETIME FREE. Points never expire. ₹99 redemption fee. Lounge access needs ₹20K spend/month.",
        exclusions: "Utility & Insurance earn only 1X. Education/Wallet/Govt earn 3X but excluded from 10X threshold.",
    },
    "IDFC FIRST Select": {
        bank: "IDFC First Bank",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "mid",
        earning: "3X RP per ₹150 (up to ₹20K), 10X RP per ₹150 (above ₹20K)",
        options: [
            { type: "Pay with Points", value: 0.25, description: "1 point = ₹0.25", recommended: true },
            { type: "Poshvine Vouchers", value: 0.25, description: "1 point = ₹0.25", recommended: true },
        ],
        bestOption: "Pay with Points at checkout",
        notes: "Lifetime free. Same reward structure as Wealth but fewer lifestyle perks.",
        exclusions: "Same as Wealth",
    },
    "IDFC FIRST Classic": {
        bank: "IDFC First Bank",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "entry",
        earning: "3X RP per ₹150 (up to ₹20K), 10X RP per ₹150 (above ₹20K)",
        options: [
            { type: "Pay with Points", value: 0.25, description: "1 point = ₹0.25", recommended: true },
        ],
        bestOption: "Pay with Points at checkout",
        notes: "Lifetime free entry-level card. Points never expire.",
        exclusions: "Standard exclusions",
    },

    // ═══════════════════════════════════════════════════════════════
    // AU SMALL FINANCE BANK CARDS
    // ═══════════════════════════════════════════════════════════════
    "AU Ixigo": {
        bank: "AU Small Finance Bank",
        pointName: "ixigo money",
        baseValue: 1.0,
        tier: "mid",
        earning: "10% on ixigo app, 4% on travel, 1% elsewhere",
        options: [
            { type: "ixigo App Bookings", value: 1.0, description: "1 point = ₹1 on travel", recommended: true },
        ],
        bestOption: "Redeem on ixigo app for flights/hotels",
        notes: "Best travel co-brand card. Only redeemable on ixigo app. Lifetime free with conditions.",
        exclusions: "Redemption only via ixigo app",
    },
    "AU LIT": {
        bank: "AU Small Finance Bank",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "entry",
        earning: "Customizable rewards - choose 3 categories",
        options: [
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: true },
        ],
        bestOption: "Statement credit or vouchers",
        notes: "India's first customizable credit card. Lifetime free. Choose your reward categories.",
        exclusions: "Based on selected categories",
    },
    "AU Altura Plus": {
        bank: "AU Small Finance Bank",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "entry",
        earning: "4 RP per ₹100 on travel/entertainment, 2 RP per ₹100 elsewhere",
        options: [
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: true },
            { type: "Gift Vouchers", value: 0.25, description: "Various brands", recommended: false },
        ],
        bestOption: "Statement credit",
        notes: "Entry-level card with decent travel earn rate.",
        exclusions: "Standard exclusions",
    },

    // ═══════════════════════════════════════════════════════════════
    // AMERICAN EXPRESS CARDS
    // ═══════════════════════════════════════════════════════════════
    "Amex Platinum Travel": {
        bank: "American Express",
        pointName: "Membership Rewards",
        baseValue: 0.50,
        tier: "premium",
        earning: "5 MR per ₹50 on travel (Amex Travel, flights), 1 MR per ₹50 elsewhere",
        options: [
            { type: "Amex Travel Portal", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "Taj Vouchers", value: 0.50, description: "1 point = ₹0.50", recommended: true },
            { type: "Partner Transfer", value: 0.40, description: "To airlines", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "Poor value", recommended: false },
        ],
        bestOption: "Taj vouchers or Amex Travel portal",
        notes: "₹5,000 fee. Best travel card. Complimentary Taj voucher worth ₹10K. Points expire 18 months after last earn.",
        exclusions: "Check Amex exclusions",
    },
    "Amex MRCC (Membership Rewards)": {
        bank: "American Express",
        pointName: "Membership Rewards",
        baseValue: 0.50,
        tier: "entry",
        earning: "1 MR per ₹50. 1000 bonus MR on first 4 transactions of ₹1500+. 2000 MR monthly on ₹20K spend.",
        options: [
            { type: "18K Gold Collection", value: 0.50, description: "18K points = ₹9K voucher", recommended: true },
            { type: "Tanishq Voucher", value: 0.50, description: "Good value", recommended: true },
            { type: "Amazon Voucher", value: 0.45, description: "Decent", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "Poor value", recommended: false },
        ],
        bestOption: "18K Gold Collection or Tanishq vouchers",
        notes: "₹1,500 fee. Up to 6-8% reward rate if optimized. 1000 bonus MR for each of first 4 transactions.",
        exclusions: "Check Amex exclusions",
    },
    "Amex Gold": {
        bank: "American Express",
        pointName: "Membership Rewards",
        baseValue: 0.50,
        tier: "premium",
        earning: "5 MR per ₹50 on dining/travel, 1 MR per ₹50 elsewhere",
        options: [
            { type: "Partner Transfer", value: 0.50, description: "To Marriott, Delta etc", recommended: true },
            { type: "Amex Travel", value: 0.50, description: "Good value", recommended: true },
        ],
        bestOption: "Partner transfers or travel redemption",
        notes: "Premium dining & travel card. Strong milestone benefits.",
        exclusions: "Standard Amex exclusions",
    },

    // ═══════════════════════════════════════════════════════════════
    // OTHER POPULAR CARDS
    // ═══════════════════════════════════════════════════════════════
    "OneCard": {
        bank: "FPL Technologies (Federal Bank)",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "entry",
        earning: "5X on top spend category, 1X elsewhere",
        options: [
            { type: "Pay Bill", value: 0.25, description: "1 point = ₹0.25", recommended: true },
            { type: "Brand Vouchers", value: 0.25, description: "Via app", recommended: true },
        ],
        bestOption: "Use against card bill or brand vouchers",
        notes: "Lifetime free metal card. 5X on your top category automatically.",
        exclusions: "Standard exclusions",
    },
    "Scapia": {
        bank: "Federal Bank",
        pointName: "Scapia Coins",
        baseValue: 0.50,
        tier: "entry",
        earning: "5 coins per ₹100 spent (5% on travel via app)",
        options: [
            { type: "Scapia Travel App", value: 0.50, description: "Only redemption option", recommended: true },
        ],
        bestOption: "Redeem on Scapia app for travel bookings",
        notes: "Lifetime free. Unlimited airport lounge access. Zero forex markup. Only redeemable on Scapia.",
        exclusions: "Redemption only on Scapia app",
    },
    "Niyo SBM": {
        bank: "SBM Bank India",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "entry",
        earning: "1 RP per ₹100 spent",
        options: [
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: true },
        ],
        bestOption: "Statement credit",
        notes: "Zero forex markup card. Best for international travelers. Lifetime free.",
        exclusions: "Low reward rate but excellent forex benefit",
    },

    // ═══════════════════════════════════════════════════════════════
    // KOTAK MAHINDRA BANK CARDS
    // ═══════════════════════════════════════════════════════════════
    "Kotak 811": {
        bank: "Kotak Mahindra Bank",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "entry",
        earning: "4 RP per ₹150 spent",
        options: [
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: true },
            { type: "Gift Vouchers", value: 0.25, description: "E-vouchers", recommended: false },
        ],
        bestOption: "Statement credit",
        notes: "Entry-level secured card. Against FD.",
        exclusions: "Standard exclusions",
    },
    "Kotak Royale Signature": {
        bank: "Kotak Mahindra Bank",
        pointName: "Reward Points",
        baseValue: 0.50,
        tier: "mid",
        earning: "8 RP per ₹150 on travel, 4 RP per ₹150 elsewhere",
        options: [
            { type: "Air Miles (InterMiles)", value: 0.50, description: "2:1 transfer", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: false },
        ],
        bestOption: "Transfer to InterMiles for travel",
        notes: "Mid-premium card. Good travel earn rate.",
        exclusions: "Standard exclusions",
    },

    // ═══════════════════════════════════════════════════════════════
    // INDUSIND BANK CARDS
    // ═══════════════════════════════════════════════════════════════
    "IndusInd Legend": {
        bank: "IndusInd Bank",
        pointName: "Reward Points",
        baseValue: 0.75,
        tier: "premium",
        earning: "1.5 RP per ₹100 base, higher on categories",
        options: [
            { type: "InterMiles", value: 0.75, description: "4:3 transfer", recommended: true },
            { type: "Statement Credit", value: 0.35, description: "1 point = ₹0.35", recommended: false },
        ],
        bestOption: "Transfer to InterMiles",
        notes: "Premium card. Good transfer ratio to InterMiles.",
        exclusions: "Standard exclusions",
    },
    "IndusInd Tiger": {
        bank: "IndusInd Bank",
        pointName: "Reward Points",
        baseValue: 0.50,
        tier: "mid",
        earning: "1 RP per ₹100 base",
        options: [
            { type: "E-Vouchers", value: 0.50, description: "Various brands", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: false },
        ],
        bestOption: "Redeem for e-vouchers",
        notes: "Decent mid-range card.",
        exclusions: "Standard exclusions",
    },

    // ═══════════════════════════════════════════════════════════════
    // RBL BANK CARDS
    // ═══════════════════════════════════════════════════════════════
    "RBL Shoprite": {
        bank: "RBL Bank",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "entry",
        earning: "5% on BigBasket/Swiggy, 1% elsewhere",
        options: [
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: true },
            { type: "E-Vouchers", value: 0.25, description: "Various brands", recommended: false },
        ],
        bestOption: "Statement credit",
        notes: "Good for grocery & food delivery users.",
        exclusions: "Category caps apply",
    },
    "IndianOil RBL XTRA": {
        bank: "RBL Bank",
        pointName: "Fuel Points",
        baseValue: 0.25,
        tier: "fuel",
        earning: "Up to 8.5% value back at IndianOil",
        options: [
            { type: "Free Fuel", value: 0.25, description: "Redeem for IOCL fuel", recommended: true },
        ],
        bestOption: "Redeem for free fuel at IndianOil",
        notes: "Best fuel card for IOCL users. 3000 bonus Fuel Points welcome benefit.",
        exclusions: "Best value only at IOCL",
    },

    // ═══════════════════════════════════════════════════════════════
    // YES BANK CARDS
    // ═══════════════════════════════════════════════════════════════
    "Yes Marquee": {
        bank: "Yes Bank",
        pointName: "Reward Points",
        baseValue: 0.50,
        tier: "premium",
        earning: "3 RP per ₹100 on travel, 2 RP per ₹100 elsewhere",
        options: [
            { type: "E-Vouchers", value: 0.50, description: "Amazon, Flipkart etc", recommended: true },
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: false },
        ],
        bestOption: "Redeem for e-vouchers",
        notes: "Underrated card with good reward rate.",
        exclusions: "Standard exclusions",
    },
    "Yes Private": {
        bank: "Yes Bank",
        pointName: "Reward Points",
        baseValue: 0.75,
        tier: "super-premium",
        earning: "4 RP per ₹100 international, 2 RP per ₹100 domestic",
        options: [
            { type: "Air Miles (InterMiles)", value: 0.75, description: "Good transfer", recommended: true },
            { type: "E-Vouchers", value: 0.50, description: "Good value", recommended: true },
        ],
        bestOption: "Transfer to InterMiles or e-vouchers",
        notes: "Premium invite-only card.",
        exclusions: "Standard exclusions",
    },

    // ═══════════════════════════════════════════════════════════════
    // HSBC CARDS
    // ═══════════════════════════════════════════════════════════════
    "HSBC TravelOne": {
        bank: "HSBC",
        pointName: "Travel Miles",
        baseValue: 0.50,
        tier: "premium",
        earning: "Accelerated miles on travel categories",
        options: [
            { type: "Air Miles (1:1)", value: 0.50, description: "1:1 transfer ratio", recommended: true },
            { type: "Travel Redemption", value: 0.50, description: "Good value", recommended: true },
        ],
        bestOption: "Air Miles transfer at 1:1",
        notes: "Best HSBC travel card. 1:1 miles transfer is unique advantage.",
        exclusions: "Check HSBC T&Cs",
    },
    "HSBC Platinum": {
        bank: "HSBC",
        pointName: "Reward Points",
        baseValue: 0.25,
        tier: "entry",
        earning: "1 RP per ₹150 spent",
        options: [
            { type: "Statement Credit", value: 0.25, description: "1 point = ₹0.25", recommended: true },
        ],
        bestOption: "Statement credit",
        notes: "No joining fee. 2000 RP welcome bonus on app download + ₹5K spend.",
        exclusions: "Standard exclusions",
    },
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

// Get all tiers
export const getAllTiers = () => Object.keys(tierConfig);

// Last updated timestamp
export const POINTS_DATA_LAST_UPDATED = "December 2025";
