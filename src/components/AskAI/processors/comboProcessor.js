/**
 * Combo Processor
 * Generates card + voucher combination recommendations for maximum savings
 */

import { PLATFORM_INFO } from '../constants/platforms';
import { getBestPlatform, findVoucherByBrand, parseDiscount } from './voucherProcessor';

/**
 * Brand-specific strategies
 */
const BRAND_STRATEGIES = {
  amazon: {
    keywords: ['amazon'],
    strategy: `**Amazon Savings Strategy:**

**Option 1: Direct Purchase (Simple)**
- Use **Amazon Pay ICICI Card** for 5% unlimited cashback
- No caps, no hassle

**Option 2: Voucher Stacking (Advanced)**
- Buy Amazon vouchers via **iShop** (discount varies)
- Use **ICICI Emeralde** for 18% reward points on iShop
- Total savings: ~20-25%

**💡 Pro Tip:** For purchases under ₹5K, direct purchase is easier. For larger purchases, voucher stacking gives better value.`,
    recommendedCards: ['Amazon Pay ICICI', 'ICICI Emeralde'],
    platform: 'Amazon',
  },

  flipkart: {
    keywords: ['flipkart'],
    strategy: `**Flipkart Savings Strategy:**

**Option 1: Direct Purchase (Simple)**
- Use **Flipkart Axis Bank Card** for 5% unlimited cashback
- Works on all Flipkart purchases

**Option 2: Voucher Stacking (Advanced)**
- Buy Flipkart vouchers via **iShop** (~18% discount)
- Use **ICICI Emeralde** for additional reward points
- Total savings: ~36%

**💡 Pro Tip:** During Big Billion Days, combine card discounts + bank offers for maximum savings.`,
    recommendedCards: ['Flipkart Axis Bank', 'ICICI Emeralde'],
    platform: 'Flipkart',
  },

  swiggy: {
    keywords: ['swiggy'],
    strategy: `**Swiggy Savings Strategy:**

**Option 1: Direct Purchase**
- **HDFC Swiggy Card** gives 10% on Swiggy orders (cap ₹1500/month)

**Option 2: Voucher Stacking (Better)**
- Buy Swiggy vouchers via **iShop** or **Gyftr**
- Use **ICICI/HDFC premium card** for rewards
- Total savings: 15-25%

**💡 Pro Tip:** Buy vouchers in bulk during discount offers for additional savings.`,
    recommendedCards: ['HDFC Swiggy', 'ICICI Emeralde', 'HDFC Regalia'],
    platform: 'Swiggy',
  },

  zomato: {
    keywords: ['zomato'],
    strategy: `**Zomato Savings Strategy:**

**Option 1: Dining Cards**
- **IndusInd EazyDiner** for dining discounts
- **HDFC Diners Club** for BOGO offers

**Option 2: Voucher Stacking**
- Buy Zomato vouchers via **iShop** or **Gyftr**
- Use premium card for reward points
- Total savings: 15-25%

**💡 Pro Tip:** Combine Zomato Pro membership discounts with voucher stacking for maximum value.`,
    recommendedCards: ['IndusInd EazyDiner', 'HDFC Diners Club Black', 'ICICI Emeralde'],
    platform: 'Zomato',
  },

  pvr: {
    keywords: ['pvr', 'inox', 'movie', 'cinema'],
    strategy: `**PVR/INOX Savings Strategy:**

**Option 1: Movie-Specific Cards**
- **Kotak PVR INOX Card** for dedicated benefits
- **HDFC Diners Club** for BOGO movie tickets

**Option 2: Voucher Purchase**
- Buy PVR vouchers via **iShop** or **Gyftr**
- Use premium card for rewards
- Save 10-20% on tickets

**💡 Pro Tip:** Book through BookMyShow with HDFC/ICICI cards for additional cashback.`,
    recommendedCards: ['Kotak PVR', 'HDFC Diners Club Black', 'ICICI Sapphiro'],
    platform: 'PVR',
  },

  bigbasket: {
    keywords: ['bigbasket', 'grocery', 'groceries'],
    strategy: `**BigBasket/Grocery Savings Strategy:**

**Option 1: Voucher Stacking (Recommended)**
- Buy BigBasket vouchers via **iShop** (~15% discount)
- Use **ICICI Emeralde** for 18% reward points
- Total savings: ~33%

**Option 2: Direct with Cashback**
- Use **SBI Cashback** (5% online, capped)
- Or **HDFC Millennia** for accelerated rewards

**💡 Pro Tip:** BB Wallets from iShop don't expire - stock up during high discount periods.`,
    recommendedCards: ['ICICI Emeralde', 'SBI Cashback', 'HDFC Millennia'],
    platform: 'BigBasket',
  },

  myntra: {
    keywords: ['myntra', 'fashion'],
    strategy: `**Myntra Savings Strategy:**

**Option 1: Voucher Stacking**
- Buy Myntra vouchers via **iShop** or **Gyftr**
- Use **ICICI Emeralde** for ~36% total savings

**Option 2: Direct Shopping**
- Use **SBI Cashback** for 5% online cashback
- Or premium card for reward points

**💡 Pro Tip:** Stack vouchers with Myntra Insider points and sale discounts for maximum value.`,
    recommendedCards: ['ICICI Emeralde', 'ICICI Sapphiro', 'SBI Cashback'],
    platform: 'Myntra',
  },

  default: {
    keywords: [],
    strategy: `**General Savings Strategy:**

**For brands on iShop:**
- Use **ICICI Premium Cards** (Emeralde/Sapphiro)
- 18% voucher discount + 18% reward points = ~36% savings

**For brands on SmartBuy:**
- Use **HDFC Premium Cards** (Infinia/Diners Black)
- 10X rewards = ~33% value

**For brands on Gyftr/Maximize:**
- Use any high-reward card
- 10-15% voucher discount + card rewards

**💡 Pro Tip:** Always check iShop and SmartBuy first for best discounts.`,
    recommendedCards: ['ICICI Emeralde', 'HDFC Infinia', 'Axis Magnus'],
    platform: null,
  },
};

/**
 * Get combo recommendation for a brand
 */
export const getComboRecommendation = (vouchers, cards, brand) => {
  if (!brand) {
    return null;
  }

  const lowerBrand = brand.toLowerCase().trim();

  // Find matching voucher
  const matchingVoucher = findVoucherByBrand(vouchers, brand);

  // Find matching strategy
  let strategy = BRAND_STRATEGIES.default;
  for (const [key, strategyConfig] of Object.entries(BRAND_STRATEGIES)) {
    if (key === 'default') continue;
    if (strategyConfig.keywords.some((k) => lowerBrand.includes(k))) {
      strategy = strategyConfig;
      break;
    }
  }

  // Get best platform for this voucher
  const bestPlatformInfo = matchingVoucher ? getBestPlatform(matchingVoucher) : null;

  // Find recommended cards
  const recommendedCards = strategy.recommendedCards
    .map((cardName) =>
      cards.find((c) => c.name?.toLowerCase().includes(cardName.toLowerCase()))
    )
    .filter(Boolean)
    .slice(0, 3);

  // Build custom strategy if we have voucher data
  let customStrategy = strategy.strategy;
  if (matchingVoucher && bestPlatformInfo) {
    const hasIshop = matchingVoucher.platforms?.some(
      (p) => p.name?.toLowerCase().includes('ishop')
    );
    const hasSmartbuy = matchingVoucher.platforms?.some(
      (p) => p.name?.toLowerCase().includes('smartbuy')
    );

    if (hasIshop && !customStrategy.includes('iShop')) {
      customStrategy += `\n\n**💎 iShop Available!**
- Current discount: ${bestPlatformInfo.discount}%
- Use ICICI cards for additional rewards
- Potential total savings: ${Math.min(bestPlatformInfo.discount + 18, 40)}%`;
    }

    if (hasSmartbuy && !customStrategy.includes('SmartBuy')) {
      customStrategy += `\n\n**🔵 SmartBuy Available!**
- Use HDFC premium cards for 10X rewards
- Potential total savings: ~33%`;
    }
  }

  return {
    brand: matchingVoucher?.brand || brand,
    voucher: matchingVoucher,
    bestPlatform: bestPlatformInfo,
    strategy: customStrategy,
    cards: recommendedCards,
    platformsAvailable: matchingVoucher?.platforms?.map((p) => p.name) || [],
  };
};

/**
 * Get platform-specific card recommendation
 */
export const getPlatformCardRecommendation = (cards, platform) => {
  const platformLower = platform.toLowerCase();
  const platformInfo = PLATFORM_INFO[platformLower];

  if (!platformInfo) {
    return {
      found: false,
      platform,
      recommendation: `I don't have specific information about "${platform}". Try asking about iShop, SmartBuy, Gyftr, or Maximize.`,
      cards: [],
    };
  }

  // Find recommended cards
  const recommendedCards = platformInfo.recommendedCards
    .map((cardName) =>
      cards.find((c) => c.name?.toLowerCase().includes(cardName.toLowerCase().split(' ')[0]))
    )
    .filter(Boolean)
    .slice(0, 4);

  // Build recommendation text
  const recommendation = `## ${platformInfo.emoji} ${platformInfo.name}

**Best For:** ${platformInfo.bestFor}

**Why Use It:**
${platformInfo.highlights.map((h) => `- ${h}`).join('\n')}

**Maximum Savings:** ${platformInfo.maxSavings}

**Recommended Cards:**
${recommendedCards.map((c) => `- **${c.name}** (${c.bank})`).join('\n')}

${platformInfo.bank ? `\n**Note:** Best used with ${platformInfo.bank} cards for maximum rewards.` : ''}

🔗 [Visit ${platformInfo.shortName}](${platformInfo.url})`;

  return {
    found: true,
    platform: platformInfo,
    recommendation,
    cards: recommendedCards,
  };
};

/**
 * Calculate total potential savings for a combo
 */
export const calculateTotalSavings = (voucher, card, platform) => {
  if (!voucher) return { voucherDiscount: 0, cardReward: 0, total: 0 };

  const platformData = voucher.platforms?.find(
    (p) => p.name?.toLowerCase() === platform?.toLowerCase()
  );
  const voucherDiscount = parseDiscount(platformData?.fee) || 0;

  // Estimate card reward based on card type and platform
  let cardReward = 0;
  if (card) {
    // iShop + ICICI cards
    if (platform?.toLowerCase() === 'ishop' && card.bank === 'ICICI Bank') {
      if (card.name?.toLowerCase().includes('emeralde')) {
        cardReward = 18;
      } else if (card.name?.toLowerCase().includes('sapphiro')) {
        cardReward = 12;
      } else {
        cardReward = 6;
      }
    }
    // SmartBuy + HDFC cards
    else if (platform?.toLowerCase() === 'smartbuy' && card.bank === 'HDFC Bank') {
      if (card.name?.toLowerCase().includes('infinia') ||
          card.name?.toLowerCase().includes('diners')) {
        cardReward = 33;
      } else if (card.name?.toLowerCase().includes('regalia')) {
        cardReward = 13;
      } else {
        cardReward = 10;
      }
    }
    // Default card rewards
    else {
      const rewardMatch = card.rewardRate?.match(/([\d.]+)%/);
      cardReward = rewardMatch ? parseFloat(rewardMatch[1]) : 1;
    }
  }

  // Total is not simply additive due to how discounts compound
  // But for simplicity, we'll show approximate total
  const total = Math.min(voucherDiscount + cardReward, 50); // Cap at 50% for realism

  return {
    voucherDiscount,
    cardReward,
    total,
    breakdown: `${voucherDiscount}% voucher + ~${cardReward}% card = ~${total}% total`,
  };
};

/**
 * Get top combo recommendations
 */
export const getTopCombos = (vouchers, cards, limit = 5) => {
  const combos = [];

  // Find vouchers with highest discounts on iShop
  const ishopVouchers = vouchers
    .filter((v) => v.platforms?.some((p) => p.name?.toLowerCase().includes('ishop')))
    .sort((a, b) => {
      const discountA = parseDiscount(
        a.platforms.find((p) => p.name?.toLowerCase().includes('ishop'))?.fee
      );
      const discountB = parseDiscount(
        b.platforms.find((p) => p.name?.toLowerCase().includes('ishop'))?.fee
      );
      return discountB - discountA;
    })
    .slice(0, limit);

  // Get ICICI Emeralde for iShop combos
  const emeralde = cards.find((c) => c.name?.toLowerCase().includes('emeralde'));

  for (const voucher of ishopVouchers) {
    const savings = calculateTotalSavings(voucher, emeralde, 'ishop');
    combos.push({
      voucher,
      card: emeralde,
      platform: 'iShop',
      savings,
    });
  }

  return combos.sort((a, b) => b.savings.total - a.savings.total).slice(0, limit);
};

export default {
  getComboRecommendation,
  getPlatformCardRecommendation,
  calculateTotalSavings,
  getTopCombos,
  BRAND_STRATEGIES,
};
