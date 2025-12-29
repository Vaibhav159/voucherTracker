import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing voucher reviews
 */
export const useReviews = (voucherId) => {
  const [allReviews, setAllReviews] = useLocalStorage('voucherReviews', {});
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  // Load reviews for specific voucher
  useEffect(() => {
    if (voucherId && allReviews[voucherId]) {
      const voucherReviews = allReviews[voucherId];
      setReviews(voucherReviews);
      setReviewCount(voucherReviews.length);

      if (voucherReviews.length > 0) {
        const avgRating = voucherReviews.reduce((sum, review) => sum + review.rating, 0) / voucherReviews.length;
        setAverageRating(avgRating);
      } else {
        setAverageRating(0);
      }
    } else {
      setReviews([]);
      setReviewCount(0);
      setAverageRating(0);
    }
  }, [voucherId, allReviews]);

  // Add a new review
  const addReview = useCallback((review) => {
    if (!voucherId) return false;

    const newReview = {
      id: Date.now().toString(),
      voucherId,
      rating: review.rating,
      comment: review.comment,
      platform: review.platform || 'General',
      userName: review.userName || 'Anonymous',
      date: new Date().toISOString(),
      helpful: 0
    };

    setAllReviews(prev => ({
      ...prev,
      [voucherId]: [...(prev[voucherId] || []), newReview]
    }));

    return true;
  }, [voucherId, setAllReviews]);

  // Update review helpfulness
  const markHelpful = useCallback((reviewId) => {
    if (!voucherId) return;

    setAllReviews(prev => {
      const voucherReviews = prev[voucherId] || [];
      const updatedReviews = voucherReviews.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      );

      return {
        ...prev,
        [voucherId]: updatedReviews
      };
    });
  }, [voucherId, setAllReviews]);

  // Delete a review (user can delete their own)
  const deleteReview = useCallback((reviewId) => {
    if (!voucherId) return;

    setAllReviews(prev => {
      const voucherReviews = prev[voucherId] || [];
      const updatedReviews = voucherReviews.filter(review => review.id !== reviewId);

      return {
        ...prev,
        [voucherId]: updatedReviews
      };
    });
  }, [voucherId, setAllReviews]);

  return {
    reviews,
    averageRating,
    reviewCount,
    addReview,
    markHelpful,
    deleteReview
  };
};
