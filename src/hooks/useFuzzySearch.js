import { useMemo } from 'react';
import Fuse from 'fuse.js';

/**
 * Custom hook for fuzzy search using Fuse.js
 * Consolidates all Fuse.js search logic into a single reusable hook
 *
 * @param {Array} data - The data array to search
 * @param {string} searchTerm - The search query
 * @param {Object} fuseOptions - Fuse.js options (keys, threshold, etc.)
 * @returns {Array} The filtered/searched results
 */
export const useFuzzySearch = (data, searchTerm, fuseOptions = {}) => {
  // Create Fuse instance with memoization
  const fuse = useMemo(() => {
    const defaultOptions = {
      threshold: 0.4,
      ignoreLocation: true,
      includeScore: true,
    };

    return new Fuse(data, { ...defaultOptions, ...fuseOptions });
  }, [data, fuseOptions.keys?.join(','), fuseOptions.threshold]);

  // Perform search with memoization
  const results = useMemo(() => {
    // If no search term, return all data
    if (!searchTerm || searchTerm.trim() === '') {
      return data;
    }

    // Perform fuzzy search
    const searchResults = fuse.search(searchTerm);
    return searchResults.map((result) => result.item);
  }, [searchTerm, data, fuse]);

  return results;
};

export default useFuzzySearch;
