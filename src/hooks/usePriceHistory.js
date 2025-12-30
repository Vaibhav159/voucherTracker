import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for tracking price history
 */
export const usePriceHistory = (voucherId) => {
  const [allPriceHistory, setAllPriceHistory] = useLocalStorage('priceHistory', {});
  const [priceHistory, setPriceHistory] = useState([]);

  // Load price history for specific voucher
  useEffect(() => {
    if (voucherId && allPriceHistory[voucherId]) {
      setPriceHistory(allPriceHistory[voucherId]);
    } else {
      setPriceHistory([]);
    }
  }, [voucherId, allPriceHistory]);

  // Add price data point
  const addPricePoint = useCallback((platform, discount, date = new Date().toISOString()) => {
    if (!voucherId) return false;

    const newPoint = {
      date,
      platform,
      discount: parseFloat(discount) || 0
    };

    setAllPriceHistory(prev => ({
      ...prev,
      [voucherId]: [...(prev[voucherId] || []), newPoint]
    }));

    return true;
  }, [voucherId, setAllPriceHistory]);

  // Get history for specific platform
  const getPlatformHistory = useCallback((platformName) => {
    return priceHistory
      .filter(point => point.platform === platformName)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [priceHistory]);

  // Get best historical discount
  const getBestHistoricalDiscount = useCallback(() => {
    if (priceHistory.length === 0) return null;

    return priceHistory.reduce((best, current) => {
      return current.discount > best.discount ? current : best;
    }, priceHistory[0]);
  }, [priceHistory]);

  // Get price trend (up, down, stable)
  const getPriceTrend = useCallback((platformName, days = 30) => {
    const history = getPlatformHistory(platformName);
    if (history.length < 2) return 'stable';

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const recentHistory = history.filter(point => new Date(point.date) >= cutoffDate);
    if (recentHistory.length < 2) return 'stable';

    const oldestDiscount = recentHistory[0].discount;
    const latestDiscount = recentHistory[recentHistory.length - 1].discount;

    const percentChange = ((latestDiscount - oldestDiscount) / oldestDiscount) * 100;

    if (percentChange > 5) return 'up';
    if (percentChange < -5) return 'down';
    return 'stable';
  }, [getPlatformHistory]);

  return {
    priceHistory,
    addPricePoint,
    getPlatformHistory,
    getBestHistoricalDiscount,
    getPriceTrend
  };
};
