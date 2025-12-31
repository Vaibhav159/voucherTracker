/**
 * Response Generator
 * Builds structured responses with content, cards, vouchers, and follow-ups
 */

/**
 * Generate context-aware follow-up suggestions
 */
export const generateFollowUps = (intent, data = {}) => {
  const followUps = [];

  switch (intent) {
    case 'CARD_SEARCH':
      if (data.cards?.length > 0) {
        const firstCard = data.cards[0];
        followUps.push(`Tell me more about ${firstCard.name?.split(' ').slice(0, 2).join(' ')}`);
        if (firstCard.bank) {
          followUps.push(`More ${firstCard.bank} cards`);
        }
        if (data.cards.length >= 2) {
          followUps.push(`Compare ${data.cards[0].name?.split(' ')[0]} vs ${data.cards[1].name?.split(' ')[0]}`);
        }
      } else {
        followUps.push('Best premium cards', 'Lifetime free cards', 'Best cashback cards');
      }
      break;

    case 'CARD_COMPARISON':
      followUps.push(
        'Which one for travel?',
        'Which has better lounges?',
        'Compare annual fees'
      );
      break;

    case 'VOUCHER_SEARCH':
      if (data.vouchers?.length > 0) {
        const firstVoucher = data.vouchers[0];
        followUps.push(`Best combo for ${firstVoucher.brand}`);
        if (data.category) {
          followUps.push(`More ${data.category} vouchers`);
        }
      }
      followUps.push('Which card for iShop?');
      break;

    case 'COMBO_RECOMMENDATION':
      if (data.brand) {
        followUps.push(
          `${data.brand} voucher availability`,
          'Best card for iShop',
          'Best card for SmartBuy'
        );
      }
      break;

    case 'PLATFORM_ADVICE':
      if (data.platform) {
        followUps.push(
          `${data.platform} vouchers`,
          'Compare platforms',
          'Best overall combo strategy'
        );
      }
      break;

    case 'BANKING_TIER_INFO':
    case 'BANKING_TIER_ELIGIBILITY':
      followUps.push(
        'Family banking options',
        'Compare wealth programs',
        'How to increase NRV?'
      );
      break;

    case 'FAMILY_BANKING':
      followUps.push(
        'HDFC family banking',
        'ICICI family banking',
        'Which bank for family?'
      );
      break;

    case 'SPENDING_ADVICE':
      followUps.push(
        'Best premium cards',
        'How to maximize rewards?',
        'Card stacking strategy'
      );
      break;

    case 'GREETING':
    case 'HELP':
    default:
      followUps.push(
        'Best premium card',
        'Which card for iShop?',
        'HDFC wealth tiers'
      );
      break;
  }

  // Return unique follow-ups, limited to 3
  return [...new Set(followUps)].slice(0, 3);
};

/**
 * Build card search response
 */
export const buildCardSearchResponse = (searchResult) => {
  const { cards, explanation, totalFound, query } = searchResult;

  if (!cards || cards.length === 0) {
    return {
      content: `I couldn't find cards matching "${query}".

**Try:**
- Being more specific (e.g., "HDFC travel card")
- Using category names (cashback, travel, premium, fuel)
- Asking about a specific bank`,
      cards: [],
      followUps: ['Best cashback cards', 'Premium travel cards', 'Lifetime free cards'],
    };
  }

  let content = `## ${explanation}\n\n`;
  content += `Found **${totalFound}** cards. Here are the top picks:\n\n`;

  for (const card of cards.slice(0, 4)) {
    content += `### ${card.name}\n`;
    content += `- **Bank:** ${card.bank}\n`;
    content += `- **Best For:** ${card.bestFor || 'General use'}\n`;
    content += `- **Fee:** ${card.annualFee || 'Check bank'}\n`;
    if (card.rewardRate) {
      content += `- **Rewards:** ${card.rewardRate}\n`;
    }
    content += '\n';
  }

  if (totalFound > 4) {
    content += `\n*+${totalFound - 4} more cards available*`;
  }

  return {
    content,
    cards: cards.slice(0, 6),
    followUps: generateFollowUps('CARD_SEARCH', { cards }),
  };
};

/**
 * Build card comparison response
 */
export const buildComparisonResponse = (comparisonResult) => {
  const { found, card1, card2, comparison } = comparisonResult;

  if (!found) {
    const missing = !card1 ? 'first card' : 'second card';
    return {
      content: `I couldn't find the ${missing}. Please check the card name and try again.`,
      cards: [card1, card2].filter(Boolean),
      followUps: ['Best premium cards', 'HDFC cards', 'ICICI cards'],
    };
  }

  let content = `## ⚖️ ${card1.name} vs ${card2.name}\n\n`;

  content += `| Feature | ${card1.name.split(' ').slice(0, 2).join(' ')} | ${card2.name.split(' ').slice(0, 2).join(' ')} |\n`;
  content += `|---------|---------|----------|\n`;
  content += `| **Bank** | ${card1.bank} | ${card2.bank} |\n`;
  content += `| **Annual Fee** | ${card1.annualFee} | ${card2.annualFee} |\n`;
  content += `| **Reward Rate** | ${card1.rewardRate || '-'} | ${card2.rewardRate || '-'} |\n`;
  content += `| **Forex Markup** | ${card1.fxMarkup || '-'} | ${card2.fxMarkup || '-'} |\n`;
  content += `| **Best For** | ${card1.bestFor || '-'} | ${card2.bestFor || '-'} |\n\n`;

  content += `### 💡 Verdict\n\n`;
  content += comparison.recommendation;

  return {
    content,
    cards: [card1, card2],
    followUps: generateFollowUps('CARD_COMPARISON', { cards: [card1, card2] }),
  };
};

/**
 * Build voucher search response
 */
export const buildVoucherSearchResponse = (searchResult) => {
  const { vouchers, explanation, totalFound, query } = searchResult;

  if (!vouchers || vouchers.length === 0) {
    return {
      content: `I couldn't find vouchers matching "${query}".

**Try:**
- Searching by category (Shopping, Food, Travel)
- Searching by platform (iShop, Gyftr, Maximize)
- Searching by brand name`,
      vouchers: [],
      followUps: ['Shopping vouchers', 'Food vouchers', 'iShop vouchers'],
    };
  }

  let content = `## ${explanation}\n\n`;
  content += `Found **${totalFound}** vouchers:\n\n`;

  for (const voucher of vouchers.slice(0, 6)) {
    const platforms = voucher.platforms || [];
    const bestDiscount = Math.max(
      ...platforms.map((p) => {
        const match = p.fee?.match(/(\d+(?:\.\d+)?)/);
        return match ? parseFloat(match[1]) : 0;
      }),
      0
    );

    content += `**${voucher.brand}** - Up to ${bestDiscount}% off\n`;
    content += `- Platforms: ${platforms.map((p) => p.name).join(', ')}\n`;
    if (voucher.expiryDays) {
      content += `- Validity: ${voucher.expiryDays} days\n`;
    }
    content += '\n';
  }

  if (totalFound > 6) {
    content += `\n*+${totalFound - 6} more vouchers available*`;
  }

  return {
    content,
    vouchers: vouchers.slice(0, 6),
    followUps: generateFollowUps('VOUCHER_SEARCH', { vouchers, category: query }),
  };
};

/**
 * Build combo recommendation response
 */
export const buildComboResponse = (comboResult) => {
  const { brand, voucher, bestPlatform, strategy, cards, platformsAvailable } = comboResult;

  let content = `## 🎯 Best Strategy for ${brand}\n\n`;

  if (voucher) {
    content += `**Voucher Available:** ✅ ${voucher.brand}\n`;
    if (bestPlatform) {
      content += `**Best Platform:** ${bestPlatform.platform.name} (${bestPlatform.discount}% off)\n`;
    }
    content += `**Available On:** ${platformsAvailable.join(', ')}\n\n`;
  } else {
    content += `**Note:** I couldn't find a specific voucher for "${brand}". Here's a general strategy:\n\n`;
  }

  content += strategy;

  return {
    content,
    cards: cards || [],
    vouchers: voucher ? [voucher] : [],
    followUps: generateFollowUps('COMBO_RECOMMENDATION', { brand }),
  };
};

/**
 * Build platform advice response
 */
export const buildPlatformResponse = (platformResult) => {
  const { found, recommendation, cards, platform } = platformResult;

  if (!found) {
    return {
      content: recommendation,
      cards: [],
      followUps: ['Which card for iShop?', 'Which card for SmartBuy?', 'Compare platforms'],
    };
  }

  return {
    content: recommendation,
    cards: cards || [],
    followUps: generateFollowUps('PLATFORM_ADVICE', { platform: platform?.shortName }),
  };
};

/**
 * Build spending advice response
 */
export const buildSpendingResponse = (spendingResult) => {
  const { tier, advice, cards, formattedSpend } = spendingResult;

  let content = `## 💳 Card Recommendations for ${formattedSpend} Monthly Spend\n\n`;
  content += advice;

  return {
    content,
    cards: cards || [],
    followUps: generateFollowUps('SPENDING_ADVICE', { tier }),
  };
};

/**
 * Build greeting response
 */
export const buildGreetingResponse = (stats) => {
  const content = `👋 Hello! I'm your **Credit Card + Banking + Voucher AI Advisor**

**I can help you with:**
• **${stats.cardCount || 99}+ Credit Cards** - Find, compare, and choose the best
• **${stats.voucherCount || 920}+ Vouchers** - Maximize discounts with card combos
• **${stats.bankCount || 14} Banks** - Wealth tiers & family banking programs

**Popular questions:**
- "Best card for Amazon/Flipkart/Swiggy?"
- "Which card for iShop/SmartBuy?"
- "Compare Infinia vs Magnus"
- "What tier for 25L NRV?"

**Try the quick action buttons below to get started! 👇**`;

  return {
    content,
    cards: [],
    vouchers: [],
    followUps: ['Best premium card', 'Which card for iShop?', 'HDFC wealth tiers'],
  };
};

/**
 * Build help response
 */
export const buildHelpResponse = () => {
  const content = `## 🤖 How to Use This AI Assistant

**Credit Card Queries:**
- "Best cashback card"
- "HDFC premium cards"
- "Compare Infinia vs Emeralde"
- "Cards with lounge access"

**Voucher & Combo Queries:**
- "Amazon vouchers"
- "Best combo for Flipkart"
- "Shopping vouchers on iShop"

**Platform Queries:**
- "Which card for iShop?"
- "How to use SmartBuy?"

**Banking Queries:**
- "HDFC wealth tiers"
- "What tier for 50L NRV?"
- "Family banking options"

**Spending Queries:**
- "I spend 2L monthly"
- "Best card for 50K spend"

💡 **Tip:** Use the quick action buttons for common queries!`;

  return {
    content,
    cards: [],
    vouchers: [],
    followUps: ['Best premium card', 'Compare platforms', 'How to maximize rewards?'],
  };
};

/**
 * Build error response
 */
export const buildErrorResponse = (error, query) => {
  console.error('AskAI Error:', error);

  return {
    content: `I'm sorry, I encountered an issue processing your request.

**Your query:** "${query}"

**Please try:**
- Rephrasing your question
- Using simpler terms
- Checking the quick action buttons

If the issue persists, try refreshing the page.`,
    cards: [],
    vouchers: [],
    followUps: ['Best premium card', 'Help', 'Popular cards'],
  };
};

/**
 * Build fallback response for unrecognized queries
 */
export const buildFallbackResponse = (query) => {
  return {
    content: `I'm not sure I understood "${query}" correctly.

**Here's what I can help with:**
- Credit card recommendations and comparisons
- Voucher discounts and card combos
- Wealth banking tiers and eligibility
- Platform-specific card advice (iShop, SmartBuy, etc.)

**Try asking:**
- "Best card for Amazon"
- "Which card for iShop?"
- "Compare Infinia vs Magnus"
- "HDFC wealth tiers"`,
    cards: [],
    vouchers: [],
    followUps: ['Best premium card', 'Which card for iShop?', 'Help'],
  };
};

export default {
  generateFollowUps,
  buildCardSearchResponse,
  buildComparisonResponse,
  buildVoucherSearchResponse,
  buildComboResponse,
  buildPlatformResponse,
  buildSpendingResponse,
  buildGreetingResponse,
  buildHelpResponse,
  buildErrorResponse,
  buildFallbackResponse,
};
