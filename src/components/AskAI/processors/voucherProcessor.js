/**
 * Voucher Processor
 * Handles voucher search, filtering, and recommendations
 */

import Fuse from 'fuse.js';
import { VOUCHER_CATEGORIES } from '../constants/keywords';
import { PLATFORM_INFO } from '../constants/platforms';

// Fuse.js configuration for voucher search
const FUSE_OPTIONS = {
  keys: [
    { name: 'brand', weight: 0.5 },
    { name: 'category', weight: 0.3 },
    { name: 'platforms.name', weight: 0.2 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
  includeScore: true,
  minMatchCharLength: 2,
};

let fuseInstance = null;
let cachedVouchers = null;

/**
 * Initialize or get Fuse instance
 */
const getFuseInstance = (vouchers) => {
  if (!fuseInstance || cachedVouchers !== vouchers) {
    fuseInstance = new Fuse(vouchers, FUSE_OPTIONS);
    cachedVouchers = vouchers;
  }
  return fuseInstance;
};

/**
 * Parse discount percentage from fee string
 */
export const parseDiscount = (fee) => {
  if (!fee) return 0;
  const match = fee.match(/(\d+(?:\.\d+)?)/);
  if (!match) return 0;

  const percentage = parseFloat(match[1]);
  const isDiscount = fee.toLowerCase().includes('discount') ||
                     fee.toLowerCase().includes('save') ||
                     fee.toLowerCase().includes('%');

  return isDiscount ? percentage : 0;
};

/**
 * Get best platform for a voucher
 */
export const getBestPlatform = (voucher) => {
  if (!voucher?.platforms || voucher.platforms.length === 0) {
    return null;
  }

  let bestPlatform = voucher.platforms[0];
  let bestDiscount = parseDiscount(voucher.platforms[0].fee);

  for (const platform of voucher.platforms) {
    const discount = parseDiscount(platform.fee);
    if (discount > bestDiscount) {
      bestDiscount = discount;
      bestPlatform = platform;
    }
  }

  return {
    platform: bestPlatform,
    discount: bestDiscount,
    platformInfo: PLATFORM_INFO[bestPlatform.name?.toLowerCase()] || null,
  };
};

/**
 * Search vouchers using fuzzy matching
 */
export const searchVouchersFuzzy = (vouchers, query, limit = 10) => {
  if (!query || !vouchers?.length) return [];

  const fuse = getFuseInstance(vouchers);
  const results = fuse.search(query);

  return results.slice(0, limit).map((result) => ({
    ...result.item,
    relevanceScore: 1 - (result.score || 0),
  }));
};

/**
 * Filter vouchers by category
 */
export const filterVouchersByCategory = (vouchers, category) => {
  if (!category || !vouchers?.length) {
    return { vouchers: [], explanation: '' };
  }

  const lowerCategory = category.toLowerCase().trim();

  // Find matching category
  const matchedCategory = VOUCHER_CATEGORIES.find(
    (cat) => cat.toLowerCase().includes(lowerCategory) ||
             lowerCategory.includes(cat.toLowerCase())
  );

  if (matchedCategory) {
    const filtered = vouchers.filter(
      (v) => v.category?.toLowerCase() === matchedCategory.toLowerCase()
    );
    return {
      vouchers: filtered,
      explanation: `🎫 ${matchedCategory} vouchers`,
      category: matchedCategory,
    };
  }

  return { vouchers: [], explanation: '', category: null };
};

/**
 * Filter vouchers by platform
 */
export const filterVouchersByPlatform = (vouchers, platform) => {
  if (!platform || !vouchers?.length) {
    return { vouchers: [], explanation: '' };
  }

  const lowerPlatform = platform.toLowerCase().trim();
  const platformInfo = PLATFORM_INFO[lowerPlatform];

  const filtered = vouchers.filter((v) =>
    v.platforms?.some((p) => p.name?.toLowerCase().includes(lowerPlatform))
  );

  return {
    vouchers: filtered,
    explanation: `${platformInfo?.emoji || '🎫'} Vouchers on ${platformInfo?.name || platform}`,
    platform: platformInfo || { name: platform },
  };
};

/**
 * Search vouchers with combined approach
 */
export const searchVouchers = (vouchers, query, options = {}) => {
  const { limit = 10, sortBy = 'discount' } = options;

  if (!query || !vouchers?.length) {
    return {
      vouchers: [],
      explanation: '🔍 No search query provided',
      totalFound: 0,
    };
  }

  const lowerQuery = query.toLowerCase().trim();
  let results = [];
  let explanation = '';

  // Step 1: Check for platform filter
  const platformKeys = Object.keys(PLATFORM_INFO);
  const platformMatch = platformKeys.find((p) => lowerQuery.includes(p));

  if (platformMatch) {
    const platformResult = filterVouchersByPlatform(vouchers, platformMatch);
    if (platformResult.vouchers.length > 0) {
      results = platformResult.vouchers;
      explanation = platformResult.explanation;
    }
  }

  // Step 2: Check for category filter
  if (results.length === 0) {
    const categoryResult = filterVouchersByCategory(vouchers, lowerQuery);
    if (categoryResult.vouchers.length > 0) {
      results = categoryResult.vouchers;
      explanation = categoryResult.explanation;
    }
  }

  // Step 3: Fall back to fuzzy search
  if (results.length === 0) {
    results = searchVouchersFuzzy(vouchers, query, limit * 2);
    explanation = `🔍 Vouchers matching "${query}"`;
  }

  // Step 4: Sort results
  results = sortVouchers(results, sortBy);

  // Step 5: Limit results
  const totalFound = results.length;
  results = results.slice(0, limit);

  return {
    vouchers: results,
    explanation,
    totalFound,
    query,
  };
};

/**
 * Sort vouchers by various criteria
 */
export const sortVouchers = (vouchers, sortBy = 'discount') => {
  const sorted = [...vouchers];

  switch (sortBy) {
    case 'discount':
      sorted.sort((a, b) => {
        const discountA = Math.max(...(a.platforms?.map((p) => parseDiscount(p.fee)) || [0]));
        const discountB = Math.max(...(b.platforms?.map((p) => parseDiscount(p.fee)) || [0]));
        return discountB - discountA;
      });
      break;
    case 'alphabetical':
      sorted.sort((a, b) => (a.brand || '').localeCompare(b.brand || ''));
      break;
    case 'expiry':
      sorted.sort((a, b) => (a.expiryDays || 999) - (b.expiryDays || 999));
      break;
    case 'relevance':
    default:
      // Sort by relevance score if available, then by discount
      sorted.sort((a, b) => {
        if (a.relevanceScore && b.relevanceScore) {
          return b.relevanceScore - a.relevanceScore;
        }
        const discountA = Math.max(...(a.platforms?.map((p) => parseDiscount(p.fee)) || [0]));
        const discountB = Math.max(...(b.platforms?.map((p) => parseDiscount(p.fee)) || [0]));
        return discountB - discountA;
      });
      break;
  }

  return sorted;
};

/**
 * Find voucher by brand name
 */
export const findVoucherByBrand = (vouchers, brand) => {
  if (!brand || !vouchers?.length) return null;

  const lowerBrand = brand.toLowerCase().trim();

  // Exact match first
  let voucher = vouchers.find(
    (v) => v.brand?.toLowerCase() === lowerBrand
  );

  // Partial match
  if (!voucher) {
    voucher = vouchers.find(
      (v) => v.brand?.toLowerCase().includes(lowerBrand)
    );
  }

  // Fuzzy match
  if (!voucher) {
    const results = searchVouchersFuzzy(vouchers, brand, 1);
    voucher = results[0] || null;
  }

  return voucher;
};

/**
 * Get top deals (highest discounts)
 */
export const getTopDeals = (vouchers, limit = 10) => {
  return sortVouchers(vouchers, 'discount').slice(0, limit);
};

/**
 * Get vouchers by expiry (expiring soon first)
 */
export const getExpiringSoon = (vouchers, days = 30, limit = 10) => {
  return vouchers
    .filter((v) => v.expiryDays && v.expiryDays <= days)
    .sort((a, b) => (a.expiryDays || 999) - (b.expiryDays || 999))
    .slice(0, limit);
};

/**
 * Get voucher stats
 */
export const getVoucherStats = (vouchers) => {
  const categories = new Set(vouchers.map((v) => v.category).filter(Boolean));
  const platforms = new Set(vouchers.flatMap((v) => v.platforms?.map((p) => p.name) || []));

  let totalMaxDiscount = 0;
  let highestDiscount = { discount: 0, voucher: null };

  for (const voucher of vouchers) {
    const best = getBestPlatform(voucher);
    if (best && best.discount > highestDiscount.discount) {
      highestDiscount = { discount: best.discount, voucher };
    }
    totalMaxDiscount = Math.max(totalMaxDiscount, best?.discount || 0);
  }

  return {
    totalVouchers: vouchers.length,
    categories: Array.from(categories),
    categoryCount: categories.size,
    platforms: Array.from(platforms),
    platformCount: platforms.size,
    highestDiscount,
    averageDiscount: calculateAverageDiscount(vouchers),
  };
};

/**
 * Calculate average discount across all vouchers
 */
const calculateAverageDiscount = (vouchers) => {
  const discounts = vouchers
    .map((v) => getBestPlatform(v)?.discount || 0)
    .filter((d) => d > 0);

  if (discounts.length === 0) return 0;

  return discounts.reduce((sum, d) => sum + d, 0) / discounts.length;
};

export default {
  searchVouchers,
  searchVouchersFuzzy,
  filterVouchersByCategory,
  filterVouchersByPlatform,
  sortVouchers,
  findVoucherByBrand,
  getBestPlatform,
  getTopDeals,
  getExpiringSoon,
  getVoucherStats,
  parseDiscount,
};
