/**
 * Keyword mappings for card search
 * Maps user keywords to filter functions and explanations
 */

export const CARD_KEYWORDS = {
  // Categories
  cashback: {
    filter: (c) => c.rewardType === 'cashback' || c.category === 'Cashback',
    explanation: '💰 Cashback cards',
    priority: 1,
  },
  travel: {
    filter: (c) =>
      c.category === 'Travel' ||
      c.tags?.some((t) => t.toLowerCase().includes('travel')),
    explanation: '✈️ Travel cards',
    priority: 1,
  },
  premium: {
    filter: (c) => c.category === 'Premium',
    explanation: '💎 Premium cards',
    priority: 1,
  },
  'super premium': {
    filter: (c) => c.category === 'Super Premium',
    explanation: '👑 Super Premium cards',
    priority: 1,
  },
  fuel: {
    filter: (c) =>
      c.category === 'Fuel' ||
      c.bestFor?.toLowerCase().includes('fuel') ||
      c.tags?.some((t) => t.toLowerCase().includes('fuel')),
    explanation: '⛽ Fuel cards',
    priority: 1,
  },
  shopping: {
    filter: (c) =>
      c.bestFor?.toLowerCase().includes('shopping') ||
      c.tags?.some((t) => t.toLowerCase().includes('shopping')),
    explanation: '🛍️ Shopping cards',
    priority: 1,
  },
  dining: {
    filter: (c) =>
      c.bestFor?.toLowerCase().includes('dining') ||
      c.bestFor?.toLowerCase().includes('food') ||
      c.tags?.some((t) => t.toLowerCase().includes('dining')),
    explanation: '🍽️ Dining cards',
    priority: 1,
  },
  movies: {
    filter: (c) =>
      c.bestFor?.toLowerCase().includes('movie') ||
      c.name?.toLowerCase().includes('pvr') ||
      c.tags?.some((t) => t.toLowerCase().includes('movie')),
    explanation: '🎬 Movie cards',
    priority: 1,
  },

  // Features
  'lifetime free': {
    filter: (c) => {
      const fee = c.annualFee?.toLowerCase() || '';
      return fee.includes('lifetime free') || fee.includes('ltf') || fee === '₹0';
    },
    explanation: '🆓 Lifetime Free cards',
    priority: 2,
  },
  ltf: {
    filter: (c) => {
      const fee = c.annualFee?.toLowerCase() || '';
      return fee.includes('lifetime free') || fee.includes('ltf') || fee === '₹0';
    },
    explanation: '🆓 Lifetime Free cards',
    priority: 2,
  },
  free: {
    filter: (c) => {
      const fee = c.annualFee?.toLowerCase() || '';
      return (
        fee.includes('free') || fee === '₹0' || fee.includes('no annual fee')
      );
    },
    explanation: '🆓 Free/Low fee cards',
    priority: 2,
  },
  lounge: {
    filter: (c) =>
      c.tags?.some((t) => t.toLowerCase().includes('lounge')) ||
      c.features?.some((f) => f.toLowerCase().includes('lounge')),
    explanation: '✈️ Cards with lounge access',
    priority: 2,
  },
  'unlimited lounge': {
    filter: (c) =>
      c.tags?.some((t) => t.toLowerCase().includes('unlimited lounge')) ||
      c.features?.some((f) => f.toLowerCase().includes('unlimited')),
    explanation: '✈️ Unlimited lounge cards',
    priority: 2,
  },
  forex: {
    filter: (c) => {
      const markup = parseFloat(c.fxMarkup) || 99;
      return (
        markup <= 2 ||
        c.tags?.some((t) => t.toLowerCase().includes('low forex')) ||
        c.tags?.some((t) => t.toLowerCase().includes('forex'))
      );
    },
    explanation: '🌍 Low forex markup cards',
    priority: 2,
  },
  'low forex': {
    filter: (c) => {
      const markup = parseFloat(c.fxMarkup) || 99;
      return markup <= 2;
    },
    explanation: '🌍 Low forex markup cards (≤2%)',
    priority: 2,
  },
  'zero forex': {
    filter: (c) => {
      const markup = parseFloat(c.fxMarkup) || 99;
      return markup === 0 || c.fxMarkup?.toLowerCase().includes('zero');
    },
    explanation: '🌍 Zero forex markup cards',
    priority: 2,
  },

  // Banks
  hdfc: {
    filter: (c) => c.bank === 'HDFC Bank',
    explanation: '🏦 HDFC Bank cards',
    priority: 3,
  },
  icici: {
    filter: (c) => c.bank === 'ICICI Bank',
    explanation: '🏦 ICICI Bank cards',
    priority: 3,
  },
  axis: {
    filter: (c) => c.bank === 'Axis Bank',
    explanation: '🏦 Axis Bank cards',
    priority: 3,
  },
  sbi: {
    filter: (c) => c.bank === 'SBI Card',
    explanation: '🏦 SBI cards',
    priority: 3,
  },
  amex: {
    filter: (c) => c.bank === 'American Express',
    explanation: '🏦 American Express cards',
    priority: 3,
  },
  'american express': {
    filter: (c) => c.bank === 'American Express',
    explanation: '🏦 American Express cards',
    priority: 3,
  },
  kotak: {
    filter: (c) => c.bank === 'Kotak Mahindra Bank',
    explanation: '🏦 Kotak Bank cards',
    priority: 3,
  },
  indusind: {
    filter: (c) => c.bank === 'IndusInd Bank',
    explanation: '🏦 IndusInd Bank cards',
    priority: 3,
  },
  idfc: {
    filter: (c) => c.bank === 'IDFC First Bank',
    explanation: '🏦 IDFC First Bank cards',
    priority: 3,
  },
  au: {
    filter: (c) => c.bank === 'AU Small Finance Bank',
    explanation: '🏦 AU Bank cards',
    priority: 3,
  },
  yes: {
    filter: (c) => c.bank === 'Yes Bank',
    explanation: '🏦 Yes Bank cards',
    priority: 3,
  },
  rbl: {
    filter: (c) => c.bank === 'RBL Bank',
    explanation: '🏦 RBL Bank cards',
    priority: 3,
  },
  hsbc: {
    filter: (c) => c.bank === 'HSBC India',
    explanation: '🏦 HSBC cards',
    priority: 3,
  },
  'standard chartered': {
    filter: (c) => c.bank === 'Standard Chartered Bank',
    explanation: '🏦 Standard Chartered cards',
    priority: 3,
  },
  sc: {
    filter: (c) => c.bank === 'Standard Chartered Bank',
    explanation: '🏦 Standard Chartered cards',
    priority: 3,
  },
  federal: {
    filter: (c) => c.bank === 'Federal Bank',
    explanation: '🏦 Federal Bank cards',
    priority: 3,
  },
  bob: {
    filter: (c) => c.bank === 'Bank of Baroda',
    explanation: '🏦 Bank of Baroda cards',
    priority: 3,
  },

  // Specific card names
  infinia: {
    filter: (c) => c.name?.toLowerCase().includes('infinia'),
    explanation: '💳 HDFC Infinia',
    priority: 4,
  },
  'diners black': {
    filter: (c) =>
      c.name?.toLowerCase().includes('diners') &&
      c.name?.toLowerCase().includes('black'),
    explanation: '💳 HDFC Diners Club Black',
    priority: 4,
  },
  regalia: {
    filter: (c) => c.name?.toLowerCase().includes('regalia'),
    explanation: '💳 HDFC Regalia',
    priority: 4,
  },
  millennia: {
    filter: (c) => c.name?.toLowerCase().includes('millennia'),
    explanation: '💳 HDFC Millennia',
    priority: 4,
  },
  emeralde: {
    filter: (c) => c.name?.toLowerCase().includes('emeralde'),
    explanation: '💳 ICICI Emeralde',
    priority: 4,
  },
  sapphiro: {
    filter: (c) => c.name?.toLowerCase().includes('sapphiro'),
    explanation: '💳 ICICI Sapphiro',
    priority: 4,
  },
  rubyx: {
    filter: (c) => c.name?.toLowerCase().includes('rubyx'),
    explanation: '💳 ICICI Rubyx',
    priority: 4,
  },
  magnus: {
    filter: (c) => c.name?.toLowerCase().includes('magnus'),
    explanation: '💳 Axis Magnus',
    priority: 4,
  },
  reserve: {
    filter: (c) => c.name?.toLowerCase().includes('reserve'),
    explanation: '💳 Axis Reserve',
    priority: 4,
  },
  atlas: {
    filter: (c) => c.name?.toLowerCase().includes('atlas'),
    explanation: '💳 Axis Atlas',
    priority: 4,
  },
  elite: {
    filter: (c) => c.name?.toLowerCase().includes('elite'),
    explanation: '💳 SBI Elite',
    priority: 4,
  },
  'amazon pay': {
    filter: (c) => c.name?.toLowerCase().includes('amazon'),
    explanation: '💳 Amazon Pay ICICI',
    priority: 4,
  },
  flipkart: {
    filter: (c) => c.name?.toLowerCase().includes('flipkart'),
    explanation: '💳 Flipkart Axis',
    priority: 4,
  },
  swiggy: {
    filter: (c) => c.name?.toLowerCase().includes('swiggy'),
    explanation: '💳 HDFC Swiggy',
    priority: 4,
  },

  // Platforms
  smartbuy: {
    filter: (c) =>
      c.verdict?.toLowerCase().includes('smartbuy') ||
      c.features?.some((f) => f.toLowerCase().includes('smartbuy')) ||
      c.bank === 'HDFC Bank',
    explanation: '🔵 SmartBuy compatible cards (HDFC)',
    priority: 2,
  },
  ishop: {
    filter: (c) =>
      c.verdict?.toLowerCase().includes('ishop') ||
      c.features?.some((f) => f.toLowerCase().includes('ishop')) ||
      c.bank === 'ICICI Bank',
    explanation: '🛒 iShop compatible cards (ICICI)',
    priority: 2,
  },
};

/**
 * Voucher categories for filtering
 */
export const VOUCHER_CATEGORIES = [
  'Shopping',
  'Dining & Food',
  'Food',
  'Entertainment',
  'Travel',
  'Fashion & Accessories',
  'Fashion',
  'Electronics',
  'Grocery',
  'Health & Wellness',
  'Home & Living',
  'Beauty',
  'Automotive',
  'Jewellery',
  'Kids',
  'Sports & Fitness',
];

/**
 * Spending tier thresholds (monthly in INR)
 */
export const SPENDING_TIERS = {
  ultra_high: {
    min: 500000,
    label: '₹5L+',
    recommendations: ['Axis Reserve', 'Axis Magnus', 'HDFC Infinia', 'ICICI Emeralde'],
  },
  high: {
    min: 300000,
    label: '₹3L+',
    recommendations: ['Axis Magnus', 'HDFC Infinia Metal', 'ICICI Emeralde Private Metal'],
  },
  medium_high: {
    min: 100000,
    label: '₹1L+',
    recommendations: ['HDFC Infinia', 'ICICI Emeralde', 'SBI Elite'],
  },
  medium: {
    min: 50000,
    label: '₹50K+',
    recommendations: ['SBI Cashback', 'HDFC Regalia', 'ICICI Sapphiro'],
  },
  low: {
    min: 0,
    label: 'Under ₹50K',
    recommendations: ['Amazon Pay ICICI', 'SBI Cashback', 'Flipkart Axis'],
  },
};

export default {
  CARD_KEYWORDS,
  VOUCHER_CATEGORIES,
  SPENDING_TIERS,
};
