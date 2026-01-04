/**
 * Intent Recognition System
 * Recognizes user intent from natural language queries
 */

/**
 * Intent definitions with patterns and entity extraction
 */
const INTENTS = {
  CARD_COMPARISON: {
    patterns: [
      /compare\s+(.+?)\s+(?:vs?|versus|and|with|or)\s+(.+)/i,
      /(.+?)\s+vs?\s+(.+)/i,
      /difference\s+between\s+(.+?)\s+and\s+(.+)/i,
      /which\s+is\s+better\s+(.+?)\s+or\s+(.+)/i,
    ],
    extract: (match) => ({
      card1: match[1]?.trim(),
      card2: match[2]?.trim(),
    }),
    priority: 10,
  },

  COMBO_RECOMMENDATION: {
    patterns: [
      /best\s+(?:combo|combination|strategy)\s+(?:for|on)\s+(.+)/i,
      /how\s+to\s+(?:save|maximize|get\s+discount)\s+(?:on|at|for)\s+(.+)/i,
      /maximize\s+savings?\s+(?:on|at|for)\s+(.+)/i,
      /(?:card|voucher)\s+combo\s+for\s+(.+)/i,
      /stacking?\s+(?:on|for)\s+(.+)/i,
    ],
    extract: (match) => ({
      brand: match[1]?.trim(),
    }),
    priority: 9,
  },

  SPENDING_ADVICE: {
    patterns: [
      /(?:i\s+)?spend\s+(?:around\s+)?₹?\s?(\d+(?:,\d+)*)\s*([lLkK])?(?:\s*(?:per\s+)?(?:month|monthly))?/i,
      /monthly\s+spend\s+(?:of\s+)?₹?\s?(\d+(?:,\d+)*)\s*([lLkK])?/i,
      /₹?\s?(\d+(?:,\d+)*)\s*([lLkK])?\s+(?:monthly\s+)?spend/i,
      /budget\s+(?:of\s+)?₹?\s?(\d+(?:,\d+)*)\s*([lLkK])?/i,
    ],
    extract: (match) => {
      let amount = parseFloat(match[1]?.replace(/,/g, '') || '0');
      const unit = match[2]?.toLowerCase();
      if (unit === 'l') amount *= 100000;
      else if (unit === 'k') amount *= 1000;
      return { monthlySpend: amount };
    },
    priority: 8,
  },

  BANKING_TIER_ELIGIBILITY: {
    patterns: [
      /what\s+tier\s+(?:for|with)\s+(?:₹?\s?)?(\d+(?:,\d+)*)\s*([lLkK])?\s*(?:NRV|nrv|balance)?/i,
      /(?:₹?\s?)?(\d+(?:,\d+)*)\s*([lLkK])?\s*(?:NRV|nrv)\s+(?:eligib|tier|which)/i,
      /eligib(?:le|ility)\s+(?:for|with)\s+(?:₹?\s?)?(\d+(?:,\d+)*)\s*([lLkK])?/i,
      /which\s+(?:wealth\s+)?tier\s+(?:can\s+i\s+get|am\s+i\s+eligible)/i,
    ],
    extract: (match) => {
      if (!match[1]) return { nrvAmount: null };
      let amount = parseFloat(match[1]?.replace(/,/g, '') || '0');
      const unit = match[2]?.toLowerCase();
      if (unit === 'l') amount *= 1; // Already in lakhs
      else if (unit === 'k') amount /= 100; // Convert to lakhs
      else amount /= 100000; // Assume raw number, convert to lakhs
      return { nrvAmount: amount };
    },
    priority: 7,
  },

  BANKING_TIER_INFO: {
    patterns: [
      /(.+?)\s+(?:wealth\s+)?tiers?/i,
      /(?:wealth\s+)?tiers?\s+(?:for|of|at)\s+(.+)/i,
      /(.+?)\s+(?:imperia|burgundy|privy|preferred|private|priority)/i,
    ],
    extract: (match) => ({
      bank: match[1]?.trim(),
    }),
    priority: 6,
  },

  FAMILY_BANKING: {
    patterns: [
      /family\s+banking/i,
      /family\s+(?:account|benefits|program)/i,
      /add\s+family\s+member/i,
      /joint\s+(?:account|banking)/i,
    ],
    extract: () => ({ type: 'family' }),
    priority: 6,
  },

  PLATFORM_ADVICE: {
    patterns: [
      /(?:which|best|what)\s+card\s+(?:for|on)\s+(ishop|smartbuy|gyftr|maximize|magicpin|savesage)/i,
      /how\s+to\s+(?:use|maximize)\s+(ishop|smartbuy|gyftr|maximize)/i,
      /(ishop|smartbuy|gyftr|maximize)\s+(?:card|best|recommend)/i,
      /cards?\s+(?:for|with)\s+(ishop|smartbuy|gyftr|maximize)/i,
    ],
    extract: (match) => ({
      platform: match[1]?.toLowerCase(),
    }),
    priority: 5,
  },

  VOUCHER_SEARCH: {
    patterns: [
      /(.+?)\s+vouchers?/i,
      /vouchers?\s+(?:for|on|at)\s+(.+)/i,
      /discount\s+(?:on|at|for)\s+(.+)/i,
      /gift\s+cards?\s+(?:for|on)\s+(.+)/i,
    ],
    extract: (match) => ({
      category: match[1]?.trim() || match[2]?.trim(),
    }),
    priority: 4,
  },

  CARD_SEARCH: {
    patterns: [
      /best\s+(.+?)\s+cards?/i,
      /(.+?)\s+cards?\s+(?:recommend|suggest)/i,
      /recommend\s+(.+?)\s+cards?/i,
      /which\s+(.+?)\s+card/i,
      /good\s+(.+?)\s+cards?/i,
      /top\s+(.+?)\s+cards?/i,
    ],
    extract: (match) => ({
      category: match[1]?.trim(),
    }),
    priority: 3,
  },

  CARD_INFO: {
    patterns: [
      /(?:tell\s+me\s+)?about\s+(.+?)\s+card/i,
      /(.+?)\s+card\s+(?:details|features|benefits|review)/i,
      /(?:is|are)\s+(.+?)\s+card\s+(?:good|worth)/i,
    ],
    extract: (match) => ({
      cardName: match[1]?.trim(),
    }),
    priority: 2,
  },

  GREETING: {
    patterns: [
      /^(?:hi|hello|hey|hola|namaste|good\s+(?:morning|afternoon|evening))[\s!]*$/i,
      /^(?:what'?s?\s+up|howdy|greetings)[\s!]*$/i,
    ],
    extract: () => ({}),
    priority: 1,
  },

  HELP: {
    patterns: [
      /^(?:help|what\s+can\s+you\s+do|capabilities|features)[\s?]*$/i,
      /^how\s+(?:do\s+i\s+use|does\s+this\s+work)/i,
    ],
    extract: () => ({}),
    priority: 1,
  },
};

/**
 * Recognize intent from user query
 * @param {string} query - User's input query
 * @returns {Object} - Recognized intent with entities and confidence
 */
export const recognizeIntent = (query) => {
  if (!query || typeof query !== 'string') {
    return {
      intent: 'UNKNOWN',
      confidence: 0,
      entities: {},
      originalQuery: query,
    };
  }

  const normalizedQuery = query.trim();

  // Sort intents by priority (highest first)
  const sortedIntents = Object.entries(INTENTS).sort(
    ([, a], [, b]) => b.priority - a.priority
  );

  for (const [intentName, config] of sortedIntents) {
    for (const pattern of config.patterns) {
      const match = normalizedQuery.match(pattern);
      if (match) {
        return {
          intent: intentName,
          confidence: 0.9,
          entities: config.extract(match),
          originalQuery: query,
          matchedPattern: pattern.toString(),
        };
      }
    }
  }

  // Fallback: Try to identify any keywords
  const fallbackIntent = identifyFallbackIntent(normalizedQuery);

  return {
    intent: fallbackIntent.intent,
    confidence: fallbackIntent.confidence,
    entities: { query: normalizedQuery },
    originalQuery: query,
  };
};

/**
 * Identify fallback intent using keyword matching
 */
const identifyFallbackIntent = (query) => {
  const lowerQuery = query.toLowerCase();

  // Check for card-related keywords
  const cardKeywords = ['card', 'cashback', 'reward', 'points', 'miles', 'fee', 'premium'];
  if (cardKeywords.some((k) => lowerQuery.includes(k))) {
    return { intent: 'GENERAL_CARD_SEARCH', confidence: 0.6 };
  }

  // Check for voucher-related keywords
  const voucherKeywords = ['voucher', 'gift card', 'discount', 'coupon', 'deal'];
  if (voucherKeywords.some((k) => lowerQuery.includes(k))) {
    return { intent: 'GENERAL_VOUCHER_SEARCH', confidence: 0.6 };
  }

  // Check for banking-related keywords
  const bankingKeywords = ['bank', 'tier', 'wealth', 'nrv', 'balance', 'account'];
  if (bankingKeywords.some((k) => lowerQuery.includes(k))) {
    return { intent: 'GENERAL_BANKING_QUERY', confidence: 0.6 };
  }

  // Check for platform keywords
  const platformKeywords = ['ishop', 'smartbuy', 'gyftr', 'maximize', 'magicpin'];
  if (platformKeywords.some((k) => lowerQuery.includes(k))) {
    return { intent: 'GENERAL_PLATFORM_QUERY', confidence: 0.6 };
  }

  return { intent: 'GENERAL_SEARCH', confidence: 0.4 };
};

/**
 * Extract amount from query string
 */
export const extractAmount = (query) => {
  const patterns = [
    /₹\s?(\d+(?:,\d+)*(?:\.\d+)?)\s*([lLkK])?/,
    /(\d+(?:,\d+)*(?:\.\d+)?)\s*([lLkKcC]r?)/,
    /(\d+(?:,\d+)*)\s*(?:lakh|lac)/i,
    /(\d+(?:,\d+)*)\s*(?:crore|cr)/i,
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      let amount = parseFloat(match[1].replace(/,/g, ''));
      const unit = match[2]?.toLowerCase();

      if (query.toLowerCase().includes('crore') || unit?.startsWith('c')) {
        amount *= 10000000;
      } else if (query.toLowerCase().includes('lakh') || query.toLowerCase().includes('lac') || unit === 'l') {
        amount *= 100000;
      } else if (unit === 'k') {
        amount *= 1000;
      }

      return amount;
    }
  }

  return null;
};

/**
 * Extract brand names from query
 */
export const extractBrand = (query) => {
  const commonBrands = [
    'amazon', 'flipkart', 'swiggy', 'zomato', 'myntra', 'ajio',
    'bigbasket', 'blinkit', 'zepto', 'pvr', 'inox', 'bookmyshow',
    'starbucks', 'dominos', 'pizza hut', 'kfc', 'mcdonalds',
    'uber', 'ola', 'cleartrip', 'makemytrip', 'goibibo',
    'nykaa', 'tata cliq', 'croma', 'reliance digital',
  ];

  const lowerQuery = query.toLowerCase();

  for (const brand of commonBrands) {
    if (lowerQuery.includes(brand)) {
      return brand;
    }
  }

  return null;
};

export default recognizeIntent;
