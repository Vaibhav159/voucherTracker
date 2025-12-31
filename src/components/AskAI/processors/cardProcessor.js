/**
 * Card Processor
 * Handles credit card search and filtering with fuzzy matching
 */

import Fuse from 'fuse.js';
import { CARD_KEYWORDS, SPENDING_TIERS } from '../constants/keywords';

// Fuse.js configuration for card search
const FUSE_OPTIONS = {
  keys: [
    { name: 'name', weight: 0.35 },
    { name: 'bank', weight: 0.2 },
    { name: 'bestFor', weight: 0.2 },
    { name: 'category', weight: 0.1 },
    { name: 'verdict', weight: 0.1 },
    { name: 'tags', weight: 0.05 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
  minMatchCharLength: 2,
};

let fuseInstance = null;
let cachedCards = null;

/**
 * Initialize or get Fuse instance
 */
const getFuseInstance = (cards) => {
  if (!fuseInstance || cachedCards !== cards) {
    fuseInstance = new Fuse(cards, FUSE_OPTIONS);
    cachedCards = cards;
  }
  return fuseInstance;
};

/**
 * Parse annual fee to number
 */
export const parseFee = (fee) => {
  if (!fee) return 9999;
  const lower = fee.toLowerCase();
  if (lower.includes('lifetime free') || lower.includes('ltf') || lower === '₹0' || lower === 'free') {
    return 0;
  }
  const match = fee.match(/₹?([\d,]+)/);
  return match ? parseInt(match[1].replace(/,/g, ''), 10) : 9999;
};

/**
 * Parse reward rate to percentage
 */
export const parseRewardRate = (rate) => {
  if (!rate) return 0;
  const match = rate.match(/([\d.]+)%/);
  return match ? parseFloat(match[1]) : 0;
};

/**
 * Search cards using fuzzy matching
 */
export const searchCardsFuzzy = (cards, query, limit = 6) => {
  if (!query || !cards?.length) return [];
  
  const fuse = getFuseInstance(cards);
  const results = fuse.search(query);
  
  return results.slice(0, limit).map((result) => ({
    ...result.item,
    relevanceScore: 1 - (result.score || 0),
  }));
};

/**
 * Filter cards by keyword
 */
export const filterCardsByKeyword = (cards, keyword) => {
  if (!keyword || !cards?.length) return { cards: [], explanation: '' };
  
  const lowerKeyword = keyword.toLowerCase().trim();
  
  // Check for exact keyword match in our keywords map
  for (const [key, config] of Object.entries(CARD_KEYWORDS)) {
    if (lowerKeyword.includes(key)) {
      const filtered = cards.filter(config.filter);
      return {
        cards: filtered,
        explanation: config.explanation,
        keyword: key,
      };
    }
  }
  
  return { cards: [], explanation: '', keyword: null };
};

/**
 * Search cards with combined approach (keyword + fuzzy)
 */
export const searchCards = (cards, query, options = {}) => {
  const { limit = 6, sortBy = 'relevance' } = options;
  
  if (!query || !cards?.length) {
    return {
      cards: [],
      explanation: '🔍 No search query provided',
      totalFound: 0,
    };
  }

  const lowerQuery = query.toLowerCase().trim();
  let results = [];
  let explanation = '';

  // Step 1: Try keyword-based filtering first
  const keywordResult = filterCardsByKeyword(cards, lowerQuery);
  
  if (keywordResult.cards.length > 0) {
    results = keywordResult.cards;
    explanation = keywordResult.explanation;
  } else {
    // Step 2: Fall back to fuzzy search
    results = searchCardsFuzzy(cards, query, limit * 2); // Get more results for sorting
    explanation = `🔍 Results for "${query}"`;
  }

  // Step 3: Apply sorting
  results = sortCards(results, sortBy);

  // Step 4: Limit results
  const totalFound = results.length;
  results = results.slice(0, limit);

  return {
    cards: results,
    explanation,
    totalFound,
    query,
  };
};

/**
 * Sort cards by various criteria
 */
export const sortCards = (cards, sortBy = 'relevance') => {
  const sorted = [...cards];

  switch (sortBy) {
    case 'fee_low':
      sorted.sort((a, b) => parseFee(a.annualFee) - parseFee(b.annualFee));
      break;
    case 'fee_high':
      sorted.sort((a, b) => parseFee(b.annualFee) - parseFee(a.annualFee));
      break;
    case 'reward_rate':
      sorted.sort((a, b) => parseRewardRate(b.rewardRate) - parseRewardRate(a.rewardRate));
      break;
    case 'premium_first':
      sorted.sort((a, b) => {
        const categoryOrder = { 'Super Premium': 0, Premium: 1, Travel: 2, Cashback: 3 };
        return (categoryOrder[a.category] ?? 99) - (categoryOrder[b.category] ?? 99);
      });
      break;
    case 'relevance':
    default:
      // Premium cards first, then by relevance score if available
      sorted.sort((a, b) => {
        if (a.category === 'Premium' && b.category !== 'Premium') return -1;
        if (b.category === 'Premium' && a.category !== 'Premium') return 1;
        if (a.relevanceScore && b.relevanceScore) {
          return b.relevanceScore - a.relevanceScore;
        }
        return 0;
      });
      break;
  }

  return sorted;
};

/**
 * Get cards for a specific platform
 */
export const getCardsForPlatform = (cards, platform) => {
  const platformLower = platform.toLowerCase();
  
  const platformBankMap = {
    ishop: 'ICICI Bank',
    smartbuy: 'HDFC Bank',
  };
  
  const targetBank = platformBankMap[platformLower];
  
  if (targetBank) {
    const bankCards = cards.filter((c) => c.bank === targetBank);
    // Sort by category (Premium first) then by reward rate
    return sortCards(bankCards, 'premium_first').slice(0, 6);
  }
  
  // For other platforms, return high-reward cards
  return sortCards(cards, 'reward_rate').slice(0, 6);
};

/**
 * Get spending-based recommendations
 */
export const getSpendingRecommendations = (cards, monthlySpend) => {
  let tier = null;
  let advice = '';
  let recommendedCardNames = [];

  for (const [tierKey, tierConfig] of Object.entries(SPENDING_TIERS)) {
    if (monthlySpend >= tierConfig.min) {
      tier = { key: tierKey, ...tierConfig };
    }
  }

  if (!tier) {
    tier = SPENDING_TIERS.low;
  }

  recommendedCardNames = tier.recommendations;
  
  // Find actual cards matching recommendations
  const recommendedCards = recommendedCardNames
    .map((name) => cards.find((c) => c.name?.toLowerCase().includes(name.toLowerCase())))
    .filter(Boolean)
    .slice(0, 4);

  // Generate advice based on tier
  const formattedSpend = monthlySpend >= 100000 
    ? `₹${(monthlySpend / 100000).toFixed(1)}L` 
    : `₹${(monthlySpend / 1000).toFixed(0)}K`;

  switch (tier.key) {
    case 'ultra_high':
      advice = `For ${formattedSpend}+ monthly spend:
- **Axis Reserve/Magnus** - Tier 2 rewards (35 pts/₹200)
- **HDFC Infinia** - 33% via SmartBuy (15K RP cap)
- **ICICI Emeralde** - 36% via iShop (18K RP cap)

💡 Tip: Split spend across multiple premium cards to maximize all reward caps.`;
      break;
    case 'high':
      advice = `For ${formattedSpend} spend, **Axis Magnus** is optimal:
- You'll hit Tier 2 (35 pts/₹200) = 17.5% base
- Use SmartBuy/iShop to stack additional discounts
- Also consider HDFC Infinia for SmartBuy benefits`;
      break;
    case 'medium_high':
      advice = `For ${formattedSpend} spend:
- **HDFC Infinia** - SmartBuy gives 33% (15K RP cap)
- **ICICI Emeralde** - iShop gives 36% (18K RP cap)
- **SBI Elite** - Good all-rounder with lounge access`;
      break;
    case 'medium':
      advice = `For ${formattedSpend} spend:
- **SBI Cashback** - 5% online (₹5K cap/month)
- **HDFC Regalia** - Good rewards + lounges
- **ICICI Sapphiro** - iShop benefits (12K RP cap)`;
      break;
    default:
      advice = `For ${formattedSpend} spend, focus on **no-cap cashback cards**:
- **Amazon Pay ICICI** - 5% unlimited on Amazon
- **SBI Cashback** - 5% online (₹5K cap)
- **Flipkart Axis** - 5% unlimited on Flipkart`;
  }

  return {
    tier,
    advice,
    cards: recommendedCards,
    formattedSpend,
  };
};

/**
 * Compare two cards
 */
export const compareCards = (cards, cardName1, cardName2) => {
  const card1 = cards.find((c) => 
    c.name?.toLowerCase().includes(cardName1.toLowerCase())
  );
  const card2 = cards.find((c) => 
    c.name?.toLowerCase().includes(cardName2.toLowerCase())
  );

  if (!card1 || !card2) {
    return {
      found: false,
      card1: card1 || null,
      card2: card2 || null,
      comparison: null,
    };
  }

  const fee1 = parseFee(card1.annualFee);
  const fee2 = parseFee(card2.annualFee);
  const reward1 = parseRewardRate(card1.rewardRate);
  const reward2 = parseRewardRate(card2.rewardRate);

  const comparison = {
    fee: {
      winner: fee1 <= fee2 ? card1.name : card2.name,
      card1Fee: card1.annualFee,
      card2Fee: card2.annualFee,
    },
    rewards: {
      winner: reward1 >= reward2 ? card1.name : card2.name,
      card1Rate: card1.rewardRate,
      card2Rate: card2.rewardRate,
    },
    forex: {
      card1Markup: card1.fxMarkup,
      card2Markup: card2.fxMarkup,
    },
    recommendation: generateComparisonRecommendation(card1, card2),
  };

  return {
    found: true,
    card1,
    card2,
    comparison,
  };
};

/**
 * Generate comparison recommendation
 */
const generateComparisonRecommendation = (card1, card2) => {
  const fee1 = parseFee(card1.annualFee);
  const fee2 = parseFee(card2.annualFee);
  
  if (card1.category === 'Premium' && card2.category !== 'Premium') {
    return `**${card1.name}** is the premium choice with better benefits, but **${card2.name}** might be better value for money.`;
  }
  
  if (fee1 === 0 && fee2 > 0) {
    return `**${card1.name}** is lifetime free - better for cost-conscious users. Choose **${card2.name}** if you can justify the fee with spending.`;
  }
  
  if (fee2 === 0 && fee1 > 0) {
    return `**${card2.name}** is lifetime free - better for cost-conscious users. Choose **${card1.name}** if you can justify the fee with spending.`;
  }

  return `Both are solid choices. **${card1.name}** for ${card1.bestFor}. **${card2.name}** for ${card2.bestFor}.`;
};

export default {
  searchCards,
  searchCardsFuzzy,
  filterCardsByKeyword,
  sortCards,
  getCardsForPlatform,
  getSpendingRecommendations,
  compareCards,
  parseFee,
  parseRewardRate,
};
