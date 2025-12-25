import { creditCards } from '../data/creditCards';
import { vouchers } from '../data/vouchers';

// ========== MCC EXCLUSION DATABASE ==========
// Based on comprehensive analysis of Indian credit card terms (2025)
const MCC_EXCLUSIONS = {
    utilities: ['4814', '4816', '4899', '4900', '9399'],
    insurance: ['5960', '6300', '6381'],
    fuel: ['5172', '5541', '5542', '5983'],
    railways: ['4011', '4112'],
    education: ['8211', '8220', '8241', '8244', '8249', '8299', '8351'],
    wallets: ['6540'],
    rent: ['6513'],
    giftCards: ['5947']
};

// Cards with specific exclusions
const CARD_EXCLUSIONS = {
    'SBI Cashback': [...MCC_EXCLUSIONS.utilities, ...MCC_EXCLUSIONS.insurance, ...MCC_EXCLUSIONS.fuel,
    ...MCC_EXCLUSIONS.railways, ...MCC_EXCLUSIONS.education, ...MCC_EXCLUSIONS.wallets,
    ...MCC_EXCLUSIONS.rent, ...MCC_EXCLUSIONS.giftCards],
    'HDFC Millennia': [...MCC_EXCLUSIONS.fuel, ...MCC_EXCLUSIONS.wallets],
    'Amazon Pay ICICI': [...MCC_EXCLUSIONS.fuel]
};

// ========== REWARD CAPS (Monthly) ==========
const REWARD_CAPS = {
    'SBI Cashback': { max: 5000, impliedSpend: 100000 },
    'HDFC Millennia': { max: 1000, impliedSpend: 20000, category: '5%' },
    'HDFC Infinia': { maxAcceleratedPoints: 15000 },
    'HDFC Diners Club Black': { maxAcceleratedPoints: 7500 },
    'Axis Ace': { max: 500, categories: ['utilities', 'food'] },
    'Airtel Axis': {
        airtel: { max: 250, impliedSpend: 1000 },
        utilities: { max: 250, impliedSpend: 2500 },
        food: { max: 500, impliedSpend: 5000 }
    }
};

// ========== SMARTBUY MULTIPLIERS ==========
const SMARTBUY_MULTIPLIERS = {
    'Apple Tresor': 10,
    'IGP': 10,
    'Flights': 5,
    'Amazon Voucher': 3, // Down from 5X, with 2.95% fee
    'Flipkart Voucher': 3,
    'Hotels': 10
};

// ========== ARBITRAGE STRATEGIES ==========
const ARBITRAGE_STRATEGIES = {
    utilities: {
        name: "Amazon Pay Bridge",
        description: "Buy Amazon Pay voucher via SmartBuy/Park+ → Pay utility via Amazon Pay",
        effectiveReturn: {
            'HDFC Infinia': '~13.5% (after SmartBuy fee)',
            'SBI Cashback': '~5% (via Park+, if MCC favorable)',
            'Amex Gold': '~5X points (via Reward Multiplier)'
        }
    },
    fuel: {
        name: "IOCL Voucher Hack",
        description: "Buy IOCL voucher on Park+ with SBI Cashback → Redeem at pump",
        effectiveReturn: '5% (if Park+ MCC = online shopping)',
        risk: "MCC may flag as fuel; Pump acceptance varies"
    }
};

// ========== CATEGORY DECISION TREES ==========
const CATEGORY_RECOMMENDATIONS = {
    utilities: [
        { card: 'Airtel Axis', condition: 'Bill ≤ ₹2,500 via Airtel Thanks', return: '10%', cap: '₹250/month', tier: 1 },
        { card: 'Axis Ace', condition: 'Android + Google Pay', return: '5%', cap: '₹500/month', tier: 2 },
        { card: 'Tata Neu Infinity', condition: 'UPI via Tata Neu App', return: '1.5% NeuCoins', note: 'Best for UPI-only merchants', tier: 2 },
        { card: 'HDFC Infinia', condition: 'SmartBuy Voucher → Amazon Pay', return: '~13.5%', note: 'Best for large bills', tier: 3 },
        { card: 'SBI Cashback', condition: 'Amazon Direct Voucher → Amazon Pay', return: '5%', note: 'No Park+ fees', tier: 3 }
    ],
    fuel: [
        { card: 'IndianOil RBL XTRA', condition: 'At IOCL pumps', return: '7.5%', note: 'Best fuel card' },
        { card: 'SBI BPCL Octane', condition: 'At BPCL pumps', return: '7.25%', note: 'Premium BPCL card' },
        { card: 'IDFC First Power+', condition: 'At HPCL pumps', return: '4%', note: 'Good for HPCL' },
        { card: 'SBI Cashback', condition: 'IOCL Voucher via Park+', return: '~5%', note: 'Arbitrage (check fees)' }
    ],
    dining: [
        { card: 'HSBC Live+', condition: 'All dining & food delivery', return: '10%', cap: '₹1,000/month (₹10k spend)', tier: 1, highlight: true },
        { card: 'HDFC Swiggy', condition: 'Swiggy App only', return: '10%', cap: '₹1,500/month', tier: 1 },
        { card: 'Airtel Axis', condition: 'Swiggy/Zomato/BigBasket', return: '10%', cap: '₹500/month', tier: 2 },
        { card: 'Axis Neo', condition: 'Use code AXISNEO / AXIS120', return: '40% off (₹120 on ₹500)', note: 'Coupon hack', tier: 2 },
        { card: 'HDFC Millennia', condition: 'Direct on Swiggy/Zomato', return: '5%', cap: '₹1,000/month', tier: 3 },
        { card: 'SBI Cashback', condition: 'Any online food order', return: '5%', cap: '₹5,000/month', tier: 3 }
    ],
    grocery: [
        { card: 'HSBC Live+', condition: 'BigBasket/Blinkit/Offline Grocery', return: '10%', cap: '₹1,000/month (₹10k spend)', tier: 1, highlight: true },
        { card: 'Tata Neu Infinity', condition: 'BigBasket via Tata Neu App', return: '10% NeuCoins', note: '5% base + 5% NeuPass', tier: 1 },
        { card: 'SBI Cashback', condition: 'Any online grocery', return: '5%', cap: '₹5,000/month', tier: 2 },
        { card: 'Axis Ace', condition: 'Offline grocery (GPay)', return: '2%', note: 'Unlimited', tier: 3 }
    ],
    shopping: [
        { card: 'Amazon Pay ICICI', condition: 'Amazon (Prime)', return: '5% unlimited', note: 'Best for Amazon' },
        { card: 'Flipkart Axis', condition: 'Flipkart/Myntra', return: '5-7.5%', cap: '₹4,000/quarter' },
        { card: 'SBI Cashback', condition: 'Any online shopping', return: '5%', cap: '₹5,000/month' },
        { card: 'HDFC Millennia', condition: 'Amazon/Flipkart/Myntra', return: '5%', cap: '₹1,000/month' }
    ],
    travel: [
        { card: 'HDFC Infinia', condition: 'SmartBuy Hotels', return: 'Up to 33%', note: '10X points' },
        { card: 'Axis Atlas', condition: 'Travel EDGE Portal', return: '5%', note: '1:2 mile conversion' },
        { card: 'Scapia Federal', condition: 'Any international', return: '2-4%', note: '0% forex markup!', highlight: true },
        { card: 'AU Ixigo', condition: 'Train bookings on Ixigo', return: '10%', note: '0% forex, 16 railway lounges' }
    ],
    insurance: [
        { card: 'None direct', condition: 'Most cards exclude insurance MCC', return: '0%', note: 'Use Amazon Pay bridge' },
        { card: 'HDFC Infinia', condition: 'SmartBuy Voucher → Amazon Pay', return: '~10%', note: 'Best arbitrage' },
        { card: 'Amex Platinum Travel', condition: 'Pay if under ₹4L milestone', return: 'Milestone bonus', note: 'Counts toward 7.5% yield' }
    ],
    upi: [
        { card: 'Tata Neu Infinity', condition: 'UPI via Tata Neu App', return: '1.5% NeuCoins', note: 'Best UPI card', highlight: true },
        { card: 'Tata Neu Infinity', condition: 'UPI via GPay/PhonePe', return: '0.5% NeuCoins', note: 'Lower rate' },
        { card: 'AU Ixigo', condition: 'RuPay Credit on UPI', return: '1%', note: 'Limited' }
    ]
};

// ========== AMEX MILESTONE LOGIC ==========
const AMEX_MILESTONES = {
    'MRCC': {
        monthly: '₹1,500 x 4 = 1,000 bonus pts + ₹20k total = 1,000 pts',
        strategy: 'Do 4 transactions of ₹1,500 (Amazon Vouchers via Gyftr). Stop after ₹20k.'
    },
    'Gold': {
        monthly: '₹1,000 x 6 = 1,000 bonus pts',
        strategy: 'Do 6 transactions of ₹1,000 (Gyftr Reward Multiplier).'
    },
    'Platinum Travel': {
        annual: '₹4 Lakh spend = 40,000 MR pts + ₹10k Taj Voucher',
        strategy: 'Primary for large expenses until ₹4L hit. Total yield: 7.5%.'
    }
};

// ========== HSBC LIVE+ SPECIAL LOGIC ==========
const HSBC_LIVE_PLUS = {
    categories: ['Dining', 'Food Delivery', 'Grocery'],
    return: '10%',
    cap: '₹1,000/month',
    impliedSpend: 10000,
    beats: ['HDFC Swiggy (only Swiggy)', 'Airtel Axis (lower cap)'],
    note: 'Best all-round dining/grocery card in 2025'
};

// ========== TATA NEU INFINITY LOGIC ==========
const TATA_NEU_INFINITY = {
    upi: { tataNeuApp: '1.5%', otherApps: '0.5%' },
    tataEcosystem: '10% (5% base + 5% NeuPass)',
    brands: ['BigBasket', 'Croma', 'Air India Express', 'Tata CLiQ', '1mg'],
    note: 'Default UPI card for merchants not accepting credit cards'
};

// ========== CARD TIER RECOMMENDATIONS ==========
const USER_PROFILES = {
    beginner: {
        spend: '< ₹2L/year',
        cards: ['SBI Cashback', 'Axis Ace', 'Amazon Pay ICICI'],
        strategy: 'Focus on flat cashback, avoid complex stacking'
    },
    traveler: {
        spend: '₹4L-10L/year',
        cards: ['Amex Platinum Travel', 'Axis Atlas', 'Scapia Federal'],
        strategy: 'Hit Amex ₹4L milestone for ₹30k value, use Scapia for forex'
    },
    hni: {
        spend: '> ₹10L/year',
        cards: ['HDFC Infinia', 'Amex Gold', 'ICICI Emeralde'],
        strategy: 'Maximize SmartBuy multipliers, stack voucher arbitrage'
    }
};

// ========== HELPER FUNCTIONS ==========
const extractDiscount = (feeStr) => {
    if (!feeStr) return 0;
    const match = feeStr.match(/(\d+(\.\d+)?)%/);
    return match ? parseFloat(match[1]) : 0;
};

const findVoucherByBrand = (query) => {
    const lower = query.toLowerCase();
    const aliases = {
        'amazon': ['amazon', 'amzn'], 'swiggy': ['swiggy'], 'zomato': ['zomato'],
        'flipkart': ['flipkart', 'fk'], 'bigbasket': ['bigbasket', 'bb'],
        'uber': ['uber'], 'dominos': ['dominos'], 'pvr': ['pvr', 'movie']
    };

    for (const [brand, aliasList] of Object.entries(aliases)) {
        if (aliasList.some(a => lower.includes(a))) {
            return vouchers.find(v => v.brand.toLowerCase().includes(brand));
        }
    }
    return vouchers.find(v => lower.includes(v.brand.toLowerCase().split(' ')[0]));
};

const findCardByName = (query) => {
    const lower = query.toLowerCase();
    for (const card of creditCards) {
        const name = card.name.toLowerCase().replace(' credit card', '').replace(' card', '');
        if (lower.includes(name) || name.split(' ').every(w => w.length > 2 && lower.includes(w))) {
            return card;
        }
    }
    return null;
};

// ========== MAIN ANALYZER ==========
export const analyzeQuery = (query) => {
    try {
        const lower = query.toLowerCase().trim();

        // ----- GREETINGS -----
        if (['hi', 'hello', 'hey'].some(g => lower.startsWith(g))) {
            return "Hey! 👋 I'm CardGenie - your credit card optimization expert.\n\n" +
                "I can help with:\n" +
                "• **Voucher deals**: \"Cheapest Amazon voucher\"\n" +
                "• **Best cards**: \"Best card for utilities\" or \"Best travel card\"\n" +
                "• **Arbitrage**: \"How to pay electricity bill\"\n" +
                "• **Card details**: \"HDFC Infinia features\"";
        }

        // ----- UTILITIES/ELECTRICITY/BILLS -----
        if (lower.includes('utility') || lower.includes('electric') || lower.includes('bill') ||
            lower.includes('water') || lower.includes('gas bill')) {
            let resp = "**Best Cards for Utility Bills:**\n\n";
            CATEGORY_RECOMMENDATIONS.utilities.forEach((rec, i) => {
                resp += `${i + 1}. **${rec.card}**\n`;
                resp += `   • ${rec.condition}\n`;
                resp += `   • Return: ${rec.return}${rec.cap ? ` (Cap: ${rec.cap})` : ''}\n`;
                if (rec.note) resp += `   • 💡 ${rec.note}\n`;
                resp += '\n';
            });
            resp += "**Pro Strategy:**\n";
            resp += "For large bills, use the **Amazon Pay Bridge**:\n";
            resp += "1. Buy Amazon Pay voucher via SmartBuy (HDFC) or Park+ (SBI)\n";
            resp += "2. Load to Amazon Pay wallet\n";
            resp += "3. Pay utility bill via Amazon Pay\n";
            resp += "This bypasses MCC exclusions and earns rewards!";
            return resp;
        }

        // ----- FUEL -----
        if (lower.includes('fuel') || lower.includes('petrol') || lower.includes('diesel') ||
            lower.includes('bpcl') || lower.includes('hpcl') || lower.includes('iocl')) {
            let resp = "**Best Cards for Fuel:**\n\n";
            CATEGORY_RECOMMENDATIONS.fuel.forEach((rec, i) => {
                resp += `${i + 1}. **${rec.card}** - ${rec.return}\n`;
                resp += `   ${rec.condition}\n`;
                if (rec.note) resp += `   💡 ${rec.note}\n`;
                resp += '\n';
            });
            resp += "**⚠️ Note:** Most cards only offer 1% fuel surcharge WAIVER (not reward). ";
            resp += "Co-branded fuel cards like IOCL RBL actually give rewards.";
            return resp;
        }

        // ----- FOOD/DINING -----
        if (lower.includes('swiggy') || lower.includes('zomato') || lower.includes('food delivery') ||
            lower.includes('food order') || lower.includes('dining') || lower.includes('restaurant')) {
            let resp = "**Best Cards for Dining & Food Delivery:**\n\n";
            resp += "🏆 **Top Pick: HSBC Live+** - 10% on ALL dining/food (₹10k cap)\n\n";
            CATEGORY_RECOMMENDATIONS.dining.forEach((rec, i) => {
                const badge = rec.highlight ? '⭐ ' : '';
                resp += `${i + 1}. ${badge}**${rec.card}** - ${rec.return}\n`;
                resp += `   ${rec.condition}${rec.cap ? ` (Cap: ${rec.cap})` : ''}\n`;
                if (rec.note) resp += `   💡 ${rec.note}\n`;
                resp += '\n';
            });
            return resp;
        }

        // ----- GROCERY -----
        if (lower.includes('grocery') || lower.includes('bigbasket') || lower.includes('blinkit') ||
            lower.includes('zepto') || lower.includes('instamart')) {
            let resp = "**Best Cards for Grocery:**\n\n";
            resp += "🏆 **Top Pick: HSBC Live+** - 10% on ALL grocery (online + offline)\n\n";
            CATEGORY_RECOMMENDATIONS.grocery.forEach((rec, i) => {
                const badge = rec.highlight ? '⭐ ' : '';
                resp += `${i + 1}. ${badge}**${rec.card}** - ${rec.return}\n`;
                resp += `   ${rec.condition}${rec.cap ? ` (Cap: ${rec.cap})` : ''}\n`;
                if (rec.note) resp += `   💡 ${rec.note}\n`;
                resp += '\n';
            });
            return resp;
        }

        // ----- UPI PAYMENTS -----
        if (lower.includes('upi') || lower.includes('gpay') || lower.includes('phonepe') ||
            lower.includes('google pay')) {
            let resp = "**Best Cards for UPI Payments:**\n\n";
            resp += "When merchants don't accept credit cards, use RuPay Credit on UPI:\n\n";
            CATEGORY_RECOMMENDATIONS.upi.forEach((rec, i) => {
                const badge = rec.highlight ? '⭐ ' : '';
                resp += `${i + 1}. ${badge}**${rec.card}** - ${rec.return}\n`;
                resp += `   ${rec.condition}\n`;
                if (rec.note) resp += `   💡 ${rec.note}\n`;
                resp += '\n';
            });
            resp += "**Pro Tip:** Use Tata Neu app for UPI to get 1.5% (vs 0.5% on GPay/PhonePe)";
            return resp;
        }

        // ----- INSURANCE -----
        if (lower.includes('insurance') || lower.includes('lic') || lower.includes('premium')) {
            return "**Paying Insurance Premiums:**\n\n" +
                "⚠️ **Bad News:** Most cards exclude insurance (MCC 6300/6381).\n\n" +
                "✅ **Workaround - Amazon Pay Bridge:**\n" +
                "1. Buy Amazon Pay voucher via **HDFC SmartBuy** (~10-13% return)\n" +
                "2. Or via **Park+** with SBI Cashback (~5% if MCC favorable)\n" +
                "3. Pay insurance via Amazon Pay balance\n\n" +
                "**Result:** You earn rewards on a normally excluded category!\n\n" +
                "**Alternative:** If insurer accepts credit cards directly, check if your premium counts toward Amex milestones.";
        }

        // ----- RENT -----
        if (lower.includes('rent')) {
            return "**Paying Rent via Credit Card:**\n\n" +
                "⚠️ **Generally not recommended** due to:\n" +
                "• Platform fees: 1-2% (Cred, NoBroker, Housing)\n" +
                "• HDFC charges 1% fee on rent transactions\n" +
                "• Most cards exclude rent from rewards (MCC 6513)\n\n" +
                "✅ **Only pay if:**\n" +
                "• Hitting an Amex milestone (₹4L for Plat Travel = 7.5% return)\n" +
                "• Using a card with rewards > 2.5% (rare)\n\n" +
                "**Lowest fee platform:** RedGirraffe via HDFC BillPay";
        }

        // ----- TRAVEL/FOREX -----
        if (lower.includes('travel') || lower.includes('international') || lower.includes('forex') ||
            lower.includes('abroad')) {
            let resp = "**Best Travel & Forex Cards:**\n\n";
            const travelCards = creditCards.filter(c => {
                const fx = parseFloat(c.fxMarkup?.replace('%', '') || '100');
                return fx <= 2 || c.category === 'Travel';
            }).slice(0, 5);

            travelCards.forEach((c, i) => {
                resp += `${i + 1}. **${c.name}** (Forex: ${c.fxMarkup})\n`;
                resp += `   ${c.verdict}\n\n`;
            });

            resp += "**🏆 Best Forex Cards:**\n";
            resp += "• **Scapia Federal** - 0% markup (Lifetime Free!)\n";
            resp += "• **AU Ixigo** - 0% markup\n";
            resp += "• **IDFC First Wealth** - 1.5% markup (LTF Premium)\n";
            return resp;
        }

        // ----- SMARTBUY/MULTIPLIERS -----
        if (lower.includes('smartbuy') || lower.includes('multiplier') || lower.includes('10x') || lower.includes('5x')) {
            return "**HDFC SmartBuy Multipliers (2025):**\n\n" +
                "🔥 **10X Points:**\n" +
                "• Apple Imagine Tresor\n" +
                "• IGP.com\n" +
                "• Hotels\n\n" +
                "✈️ **5X Points:**\n" +
                "• Flights (ClearTrip, Yatra)\n\n" +
                "🛒 **3X Points:**\n" +
                "• Amazon/Flipkart Instant Vouchers\n" +
                "• ⚠️ NEW: 2.95% processing fee applies!\n\n" +
                "**Net Return Calculation:**\n" +
                "• Infinia 3X on ₹10k: ₹990 points - ₹295 fee = ~7% net\n" +
                "• Infinia 5X on ₹10k: ₹1650 points - ₹295 fee = ~13.5% net\n\n" +
                "**Monthly Caps:**\n" +
                "• Infinia: 15,000 accelerated points\n" +
                "• DCB: 7,500 accelerated points";
        }

        // ----- VOUCHERS -----
        const voucher = findVoucherByBrand(lower);
        if (voucher && voucher.platforms?.length > 0) {
            let best = voucher.platforms[0];
            let maxDisc = extractDiscount(best.fee);
            voucher.platforms.forEach(p => {
                const d = extractDiscount(p.fee);
                if (d > maxDisc) { maxDisc = d; best = p; }
            });

            let resp = `**${voucher.brand}**\n\n`;
            if (maxDisc > 0) resp += `🏆 **Best Deal:** ${best.name} (~${maxDisc}% off)\n\n`;
            resp += `**All Platforms:**\n`;
            voucher.platforms.slice(0, 5).forEach(p => {
                resp += `• ${p.name}: ${extractDiscount(p.fee) > 0 ? `~${extractDiscount(p.fee)}%` : p.fee || 'Check'}\n`;
            });

            // Add stacking recommendation
            const brandWord = voucher.brand.split(' ')[0].toLowerCase();
            if (brandWord === 'amazon') {
                resp += "\n**💡 Stacking Tip:**\n";
                resp += "Use HDFC Infinia on SmartBuy for ~13% return, OR\n";
                resp += "SBI Cashback on Park+ for ~5% return.";
            }
            return resp;
        }

        // ----- SPECIFIC CARD -----
        const card = findCardByName(lower);
        if (card) {
            let resp = `**${card.name}**\n\n${card.verdict}\n\n`;
            resp += `• **Bank:** ${card.bank}\n`;
            resp += `• **Annual Fee:** ${card.annualFee}\n`;
            resp += `• **Rewards:** ${card.rewardRate}\n`;
            resp += `• **Forex Markup:** ${card.fxMarkup}\n`;
            resp += `• **Best For:** ${card.bestFor}\n`;
            resp += `• **Category:** ${card.category}`;

            // Add exclusion warnings
            if (CARD_EXCLUSIONS[card.name]) {
                resp += `\n\n⚠️ **Exclusions:** Fuel, Wallets, Rent, Insurance, Utilities (use Amazon Pay bridge)`;
            }
            if (REWARD_CAPS[card.name]) {
                resp += `\n\n📊 **Cap:** ${JSON.stringify(REWARD_CAPS[card.name])}`;
            }
            return resp;
        }

        // ----- LIFETIME FREE -----
        if (lower.includes('lifetime free') || lower.includes('ltf') || lower.includes('no fee')) {
            const ltfCards = creditCards.filter(c =>
                c.annualFee?.toLowerCase().includes('lifetime free')
            );
            let resp = "**Best Lifetime Free Cards:**\n\n";
            ltfCards.slice(0, 6).forEach((c, i) => {
                resp += `${i + 1}. **${c.name}**\n   ${c.verdict}\n\n`;
            });
            return resp;
        }

        // ----- CASHBACK/SHOPPING -----
        if (lower.includes('cashback') || lower.includes('shopping') || lower.includes('online')) {
            let resp = "**Best Cashback/Shopping Cards:**\n\n";
            CATEGORY_RECOMMENDATIONS.shopping.forEach((rec, i) => {
                resp += `${i + 1}. **${rec.card}** - ${rec.return}\n`;
                resp += `   ${rec.condition}${rec.cap ? ` (Cap: ${rec.cap})` : ''}\n`;
                if (rec.note) resp += `   💡 ${rec.note}\n`;
                resp += '\n';
            });
            return resp;
        }

        // ----- PREMIUM CARDS / INFINIA / SMARTBUY -----
        if (lower.includes('infinia') || lower.includes('premium card') || lower.includes('best premium')) {
            return "**HDFC Infinia Metal - The 2025 Benchmark:**\n\n" +
                "**Base Rate:** 5 RP per ₹150 = 3.33% return\n\n" +
                "**SmartBuy Multipliers:**\n" +
                "• 🏨 Hotels: 10X = **33% return** (Best in India)\n" +
                "• ✈️ Flights: 5X = 16.6% return\n" +
                "• 🍎 Apple (Tresor): 5X = 16.6% return\n" +
                "• 🛒 Amazon/Flipkart: 3X = 10% (minus 2.95% fee = ~7%)\n\n" +
                "**Monthly Caps:**\n" +
                "• Accelerated bonus: 15,000 RP/month\n" +
                "• Grocery: 2,000 RP/month\n" +
                "• Tanishq redemption: 50,000 RP/quarter\n\n" +
                "**Exclusions:** Rent, Govt, Wallets, Insurance, Utilities\n\n" +
                "**💡 Strategy:** Route excluded spends via Amazon Pay Bridge";
        }

        // ----- MAGNUS / BURGUNDY -----
        if (lower.includes('magnus') || lower.includes('burgundy')) {
            return "**Axis Magnus 2025 - The Burgundy Split:**\n\n" +
                "⚠️ **Important:** Magnus now has TWO versions!\n\n" +
                "**Standard Magnus (Devalued):**\n" +
                "• Transfer ratio: 5:2 (60% value loss)\n" +
                "• No monthly milestone\n" +
                "• Fee: ₹12,500 + GST\n\n" +
                "**Magnus for Burgundy (Premium):**\n" +
                "• Transfer ratio: 5:4 (retained)\n" +
                "• Requires Burgundy banking (₹30L+ TRV)\n" +
                "• Unlimited lounge + 4 guest visits\n\n" +
                "**💡 Strategy:** Only worth it if you have Burgundy relationship. Otherwise, consider HDFC Infinia instead.";
        }

        // ----- AMEX MILESTONES -----
        if (lower.includes('amex') || lower.includes('american express') || lower.includes('mrcc')) {
            return "**American Express Milestone Strategy 2025:**\n\n" +
                "**MRCC (Membership Rewards Credit Card):**\n" +
                "• 4 txns of ₹1,500 = 1,000 bonus pts\n" +
                "• ₹20k total = another 1,000 pts\n" +
                "• 💡 Buy 4x ₹1,500 Amazon vouchers via Gyftr\n\n" +
                "**Amex Gold:**\n" +
                "• 6 txns of ₹1,000 = 1,000 bonus pts\n" +
                "• 💡 Use Gyftr Reward Multiplier\n\n" +
                "**Platinum Travel:**\n" +
                "• ₹4 Lakh annual = 40,000 MR + ₹10k Taj Voucher\n" +
                "• Effective yield: **7.5%** if you hit exactly ₹4L\n" +
                "• 💡 Use for large spends (Insurance, Jewelry) until limit\n\n" +
                "**Retention Tip:** Threaten to cancel → Often get 50-100% fee waiver";
        }

        // ----- ICICI Emeralde Private Metal -----
        if (lower.includes('emeralde') || lower.includes('icici private') || lower.includes('epm')) {
            return "**ICICI Emeralde Private Metal - The Phantom Card:**\n\n" +
                "🏆 **Why It's Special:** Flat 3% everywhere, MINIMAL exclusions\n\n" +
                "**Reward Logic:**\n" +
                "• 3% value-back on almost ALL categories\n" +
                "• ✅ Rewards on Insurance, Utilities, Education (rare!)\n" +
                "• 1 RP = ₹1 redemption value\n\n" +
                "**Eligibility (The Hard Part):**\n" +
                "• Invite-only or via high-level RM\n" +
                "• Requires TRV of ₹50L - ₹1Cr+\n" +
                "• ₹40L salary is NOT enough\n\n" +
                "**Benefits:**\n" +
                "• Unlimited lounge access\n" +
                "• Taj Epicure membership\n" +
                "• 1.5% forex markup\n\n" +
                "**💡 Strategy:** If you can get it, use for ALL 'boring' spends (Insurance, Rent, Utilities) where other cards give 0%.";
        }

        // ----- IDFC Mayura -----
        if (lower.includes('mayura') || lower.includes('idfc first') || lower.includes('idfc premium')) {
            return "**IDFC FIRST Mayura - The Travel Portal Engine:**\n\n" +
                "**Portal Multipliers (Via IDFC Portal):**\n" +
                "• 🏨 Hotels: 50X points = **16.6% return**\n" +
                "• ✈️ Flights: 30X points = ~10% return\n" +
                "• 1 Point = ₹0.50 for travel redemption\n\n" +
                "**Threshold Accelerator:**\n" +
                "• Spend ₹20k+ in billing cycle → 10X points\n" +
                "• Below ₹20k → Only 5X points\n" +
                "• Penalizes 'sock-drawer' usage\n\n" +
                "**Forex Reality:**\n" +
                "• Marketed as 0% but ~0.5% spread observed\n" +
                "• 'Zero Fees' ≠ Interbank rates\n\n" +
                "**Annual Fee:** ₹6,000 (waivable)\n\n" +
                "**💡 Strategy:** Use IDFC Portal for hotels to beat HDFC SmartBuy's 33% only if you value the lower fee.";
        }

        // ----- Yes Bank Marquee -----
        if (lower.includes('marquee') || lower.includes('yes bank')) {
            return "**Yes Bank Marquee - The Subscription Model:**\n\n" +
                "**Subscription Logic:**\n" +
                "• Pay extra fee to boost multipliers\n" +
                "• Online: 36 RP per ₹200 (with subscription)\n" +
                "• Offline: 18 RP per ₹200\n\n" +
                "**2025 Devaluations:**\n" +
                "• Online multipliers: 3X → 2X reduced\n" +
                "• 70% cap on redemptions (30% must be cash)\n\n" +
                "**Lounge Access Crisis:**\n" +
                "• ₹1 Lakh/quarter spend required\n" +
                "• 'Trailing benefit' logic\n\n" +
                "**Utility Warning:**\n" +
                "• 1% fee if utilities > ₹25k/month\n\n" +
                "**💡 Verdict:** Complex mechanics, frequent devaluations. Consider SC Ultimate for simplicity.";
        }

        // ----- SC Ultimate -----
        if (lower.includes('sc ultimate') || lower.includes('standard chartered') || lower.includes('stanchart')) {
            return "**Standard Chartered Ultimate - The Flat Rate Specialist:**\n\n" +
                "🏆 **For:** Users who hate tracking multipliers\n\n" +
                "**Reward Logic:**\n" +
                "• 5 points per ₹150 = **3.33% flat**\n" +
                "• 1 Point = ₹1 (vouchers)\n\n" +
                "**2025 Exclusions:**\n" +
                "• Utilities, Insurance, Schools, Govt: 3 pts/₹150 (2%)\n" +
                "• Still better than HDFC (0%) on these!\n\n" +
                "**Annual Fee:** ₹5,000\n\n" +
                "**💡 Strategy:** Best for users who value simplicity. Use for 'pain payments' where HDFC gives nothing.";
        }

        // ----- Axis Reserve/Atlas -----
        if (lower.includes('axis reserve') || lower.includes('atlas')) {
            return "**Axis Reserve & Atlas 2025:**\n\n" +
                "**Reserve (₹50k Fee):**\n" +
                "• Transfer ratio: 5:4 (Burgundy Private only, else 5:2)\n" +
                "• Requires ₹5 Crore NRV for best ratio\n" +
                "• 12 guest lounge visits/year\n" +
                "• Accor Plus + 4 luxury transfers\n\n" +
                "**Atlas (Traveler's Card):**\n" +
                "• Earns Edge Miles (not Rewards)\n" +
                "• Tiered: Silver → Gold → Platinum\n" +
                "• Better transfer ratios than standard Magnus\n" +
                "• The 'Math Nerd's Choice' for 2025\n\n" +
                "**💡 Strategy:** Atlas for travelers who calculate. Reserve only if you're Private Banking.";
        }

        // ----- SBI Aurum -----
        if (lower.includes('aurum') || lower.includes('sbi premium')) {
            return "**SBI Aurum - The Milestone Hunter:**\n\n" +
                "**Monthly Milestone:**\n" +
                "• Spend ₹1 Lakh → ₹1,500 Tata CLiQ voucher\n\n" +
                "**Annual Milestones:**\n" +
                "• ₹5 Lakh → ₹5,000 voucher\n" +
                "• ₹10 Lakh → ₹10,000 voucher  \n" +
                "• ₹20 Lakh → ₹20,000 voucher\n\n" +
                "**Effective Yield:**\n" +
                "• Hit all milestones: 3.6% - 4%\n" +
                "• Miss milestones: Below 2%\n\n" +
                "**💡 Strategy:** Only viable if you consistently hit monthly ₹1L+ spend.";
        }

        // ----- FALLBACK -----
        return "I can help with:\n\n" +
            "• **Vouchers:** \"Cheapest Amazon voucher\"\n" +
            "• **Categories:** \"Best card for dining/grocery/UPI\"\n" +
            "• **Premium:** \"Infinia strategy\" or \"Magnus Burgundy\"\n" +
            "• **Challengers:** \"IDFC Mayura\" or \"SC Ultimate\"\n" +
            "• **Milestones:** \"Amex strategy\" or \"SBI Aurum\"\n" +
            "• **Exclusive:** \"ICICI Emeralde\" or \"Axis Reserve\"\n" +
            "• **Arbitrage:** \"How to pay insurance\"\n" +
            "• **Card details:** \"HDFC Infinia\" or \"SBI Cashback\"";

    } catch (err) {
        console.error("Bot error:", err);
        return "Something went wrong. Please try rephrasing.";
    }
};
