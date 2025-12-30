import { useCallback } from 'react';

/**
 * Custom hook for parsing discount/fee strings
 * Consolidates discount parsing logic duplicated across multiple components
 *
 * @returns {Object} Object containing parsing utility functions
 */
export const useDiscountParser = () => {
  /**
   * Parse a discount percentage from a fee string
   * @param {string} fee - Fee string like "Discount 18%" or "Save 10%"
   * @returns {number} The parsed discount percentage or 0
   */
  const parseDiscount = useCallback((fee) => {
    if (!fee) return 0;

    // Extract percentage number from string
    const match = fee.match(/(\d+(\.\d+)?)%/);
    if (!match) return 0;

    const percentage = parseFloat(match[1]);

    // Only count as discount if string contains discount/save keywords
    const isDiscountFee = fee.toLowerCase().includes('discount') ||
                          fee.toLowerCase().includes('save');

    return isDiscountFee ? percentage : 0;
  }, []);

  /**
   * Find the platform with the best discount from an array of platforms
   * @param {Array} platforms - Array of platform objects with 'fee' property
   * @returns {Object} Object with { idx: number, discount: number }
   */
  const getBestPlatform = useCallback((platforms) => {
    if (!platforms || platforms.length === 0) {
      return { idx: -1, discount: 0 };
    }

    return platforms.reduce((best, current, idx) => {
      const discount = parseDiscount(current.fee);
      return discount > best.discount ? { idx, discount } : best;
    }, { idx: -1, discount: 0 });
  }, [parseDiscount]);

  /**
   * Calculate the maximum discount from an array of platforms
   * @param {Array} platforms - Array of platform objects with 'fee' property
   * @returns {number} The maximum discount percentage
   */
  const getMaxDiscount = useCallback((platforms) => {
    if (!platforms || platforms.length === 0) return 0;

    return Math.max(
      ...platforms.map((platform) => parseDiscount(platform.fee)),
      0
    );
  }, [parseDiscount]);

  /**
   * Check if a fee string represents a discount
   * @param {string} fee - Fee string to check
   * @returns {boolean} True if the fee is a discount
   */
  const isDiscountFee = useCallback((fee) => {
    if (!fee) return false;
    return fee.toLowerCase().includes('discount') ||
           fee.toLowerCase().includes('save');
  }, []);

  return {
    parseDiscount,
    getBestPlatform,
    getMaxDiscount,
    isDiscountFee,
  };
};

export default useDiscountParser;
