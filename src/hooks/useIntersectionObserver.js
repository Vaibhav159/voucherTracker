import { useEffect, useRef } from 'react';

/**
 * Custom hook for Intersection Observer API
 * Used for infinite scroll and lazy loading
 *
 * @param {Function} callback - Function to call when element intersects
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1, default: 0.1)
 * @param {string} options.root - Root element for intersection (default: viewport)
 * @param {string} options.rootMargin - Margin around root (default: '0px')
 * @returns {RefObject} Ref to attach to the observed element
 */
export const useIntersectionObserver = (callback, options = {}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const defaultOptions = {
      threshold: 0.1,
      root: null,
      rootMargin: '0px',
    };

    const observerOptions = { ...defaultOptions, ...options };

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Call callback when element intersects
        if (entry.isIntersecting) {
          callback();
        }
      },
      observerOptions
    );

    // Start observing if ref is attached
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [callback, options.threshold, options.root, options.rootMargin]);

  return observerRef;
};

export default useIntersectionObserver;
