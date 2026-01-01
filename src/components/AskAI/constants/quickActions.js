/**
 * Quick action buttons configuration
 * Organized by category for the AskAI interface
 */

export const CARD_QUICK_ACTIONS = [
  { label: '🏆 Best Overall', query: 'best premium card', category: 'premium' },
  { label: '💰 Cashback', query: 'best cashback card', category: 'cashback' },
  { label: '✈️ Travel', query: 'best travel card', category: 'travel' },
  { label: '🆓 Lifetime Free', query: 'lifetime free cards', category: 'free' },
  { label: '🌍 Zero Forex', query: 'best forex card', category: 'forex' },
  { label: '⛽ Fuel', query: 'best fuel card', category: 'fuel' },
];

export const COMBO_QUICK_ACTIONS = [
  { label: '🛒 Amazon', query: 'best combo for amazon', brand: 'amazon' },
  { label: '🛍️ Flipkart', query: 'best combo for flipkart', brand: 'flipkart' },
  { label: '🍔 Swiggy', query: 'best combo for swiggy', brand: 'swiggy' },
  { label: '🍕 Zomato', query: 'best combo for zomato', brand: 'zomato' },
  { label: '🎬 PVR', query: 'best combo for pvr', brand: 'pvr' },
  { label: '🥦 BigBasket', query: 'best combo for bigbasket', brand: 'bigbasket' },
];

export const BANKING_QUICK_ACTIONS = [
  { label: '💎 HDFC Tiers', query: 'HDFC wealth tiers', bank: 'HDFC' },
  { label: '🏦 Axis Burgundy', query: 'Axis wealth tiers', bank: 'Axis' },
  { label: '💰 My Eligibility', query: 'what tier for 25L NRV', type: 'eligibility' },
  { label: '👨‍👩‍👧‍👦 Family Banking', query: 'family banking options', type: 'family' },
  { label: '📊 Compare Tiers', query: 'compare Imperia vs Burgundy', type: 'compare' },
];

export const PLATFORM_QUICK_ACTIONS = [
  { label: '🛒 iShop', query: 'which card for ishop', platform: 'ishop' },
  { label: '🔵 SmartBuy', query: 'which card for smartbuy', platform: 'smartbuy' },
  { label: '🎁 Gyftr', query: 'which card for gyftr', platform: 'gyftr' },
  { label: '📈 Maximize', query: 'which card for maximize', platform: 'maximize' },
];

export const VOUCHER_CATEGORY_ACTIONS = [
  { label: '🛍️ Shopping', query: 'shopping vouchers', category: 'Shopping' },
  { label: '🍔 Food', query: 'food vouchers', category: 'Dining & Food' },
  { label: '🎬 Entertainment', query: 'entertainment vouchers', category: 'Entertainment' },
  { label: '✈️ Travel', query: 'travel vouchers', category: 'Travel' },
  { label: '👗 Fashion', query: 'fashion vouchers', category: 'Fashion & Accessories' },
  { label: '💄 Beauty', query: 'beauty vouchers', category: 'Beauty' },
  { label: '🏠 Home', query: 'home vouchers', category: 'Home & Living' },
  { label: '💪 Health', query: 'health vouchers', category: 'Health & Wellness' },
];

/**
 * Get all quick actions flattened
 */
export const getAllQuickActions = () => [
  ...CARD_QUICK_ACTIONS,
  ...COMBO_QUICK_ACTIONS,
  ...BANKING_QUICK_ACTIONS,
  ...PLATFORM_QUICK_ACTIONS,
  ...VOUCHER_CATEGORY_ACTIONS,
];

/**
 * Get quick action by query
 */
export const getQuickActionByQuery = (query) => {
  const normalizedQuery = query.toLowerCase().trim();
  return getAllQuickActions().find(
    (action) => action.query.toLowerCase() === normalizedQuery
  );
};

export default {
  CARD_QUICK_ACTIONS,
  COMBO_QUICK_ACTIONS,
  BANKING_QUICK_ACTIONS,
  PLATFORM_QUICK_ACTIONS,
  VOUCHER_CATEGORY_ACTIONS,
};
