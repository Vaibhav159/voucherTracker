/**
 * Platform information for voucher purchases
 * Centralized configuration for all supported platforms
 */

export const PLATFORM_INFO = {
  ishop: {
    id: 'ishop',
    name: 'iShop (Reward360)',
    shortName: 'iShop',
    bestFor: 'ICICI Bank cardholders',
    recommendedCards: [
      'ICICI Emeralde Private Metal',
      'ICICI Sapphiro Credit Card',
      'ICICI Rubyx Credit Card',
    ],
    benefit: '18% discount + up to 18% reward points = ~36% total savings',
    maxSavings: '36%',
    url: 'https://ishop.reward360.in/',
    emoji: '🛒',
    bank: 'ICICI Bank',
    highlights: [
      'Best-in-class voucher discounts (15-18%)',
      'Additional reward points on ICICI cards',
      'Wide brand selection',
      '10k/month cap on accelerated rewards',
    ],
  },
  gyftr: {
    id: 'gyftr',
    name: 'Gyftr',
    shortName: 'Gyftr',
    bestFor: 'Any credit card with good reward rate',
    recommendedCards: [
      'HDFC Infinia Metal',
      'Axis Magnus Credit Card',
      'SBI Elite Credit Card',
    ],
    benefit: '10-15% discount + card rewards',
    maxSavings: '15%',
    url: 'https://www.gyftr.com/',
    emoji: '🎁',
    bank: null, // Works with any bank
    highlights: [
      'Wide brand selection',
      'No bank restriction',
      'Good instant vouchers',
      '10k/month limit',
    ],
  },
  maximize: {
    id: 'maximize',
    name: 'Maximize',
    shortName: 'Maximize',
    bestFor: 'Unlimited voucher purchases',
    recommendedCards: [
      'Amazon Pay ICICI',
      'Flipkart Axis Bank Credit Card',
      'SBI Cashback Credit Card',
    ],
    benefit: '2-15% discount + unlimited cap',
    maxSavings: '15%',
    url: 'https://www.maximize.money/',
    emoji: '📈',
    bank: null,
    highlights: [
      'No monthly caps',
      'Unlimited purchases',
      'Growing brand catalog',
      'Best for high-volume buyers',
    ],
  },
  magicpin: {
    id: 'magicpin',
    name: 'MagicPin',
    shortName: 'MagicPin',
    bestFor: 'Food & local shopping',
    recommendedCards: [
      'HDFC Swiggy Credit Card',
      'IndusInd EazyDiner Credit Card',
    ],
    benefit: '5-10% discount on select brands',
    maxSavings: '10%',
    url: 'https://magicpin.in/',
    emoji: '📍',
    bank: null,
    highlights: [
      'Great for food delivery',
      'Local merchant deals',
      'Cashback offers',
    ],
  },
  savesage: {
    id: 'savesage',
    name: 'SaveSage',
    shortName: 'SaveSage',
    bestFor: 'Small consistent savings',
    recommendedCards: ['Any cashback card'],
    benefit: '1-15% discount',
    maxSavings: '15%',
    url: 'https://savesage.co/',
    emoji: '💰',
    bank: null,
    highlights: [
      'Simple interface',
      'Good for beginners',
      'Consistent discounts',
    ],
  },
  smartbuy: {
    id: 'smartbuy',
    name: 'HDFC SmartBuy',
    shortName: 'SmartBuy',
    bestFor: 'HDFC cardholders',
    recommendedCards: [
      'HDFC Infinia Metal',
      'HDFC Diners Club Black Metal',
      'HDFC Regalia Credit Card',
    ],
    benefit: '10X rewards (33% value) on flights, hotels, vouchers',
    maxSavings: '33%',
    url: 'https://smartbuy.hdfcbank.com/',
    emoji: '🔵',
    bank: 'HDFC Bank',
    highlights: [
      '10X reward points on select cards',
      'Up to 33% value on Infinia/Diners Black',
      'Best for travel bookings',
      'Monthly caps apply (15K RP typically)',
    ],
  },
};

/**
 * Get platform by ID (case-insensitive)
 */
export const getPlatformById = (id) => {
  if (!id) return null;
  const normalizedId = id.toLowerCase().replace(/\s+/g, '');
  return PLATFORM_INFO[normalizedId] || null;
};

/**
 * Get all platform IDs
 */
export const getAllPlatformIds = () => Object.keys(PLATFORM_INFO);

/**
 * Get platforms for a specific bank
 */
export const getPlatformsForBank = (bankName) => {
  if (!bankName) return Object.values(PLATFORM_INFO);
  
  const normalizedBank = bankName.toLowerCase();
  return Object.values(PLATFORM_INFO).filter(
    (p) => !p.bank || p.bank.toLowerCase().includes(normalizedBank)
  );
};

export default PLATFORM_INFO;
