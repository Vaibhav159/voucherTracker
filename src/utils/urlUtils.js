
/**
 * Utility functions for URL manipulation and sanitization.
 */

/**
 * Ensures that a given URL uses HTTPS.
 * If the URL starts with 'http://', it replaces it with 'https://'.
 * Handles generic cases to avoid mixed content warnings.
 *
 * @param {string} url - The URL to check.
 * @returns {string} - The HTTPS URL or the original value if not a string/http.
 */
export const ensureHttps = (url) => {
    if (!url || typeof url !== 'string') return url;

    // Trim whitespace just in case
    const trimmedUrl = url.trim();

    if (trimmedUrl.toLowerCase().startsWith('http://')) {
        return trimmedUrl.replace(/^http:\/\//i, 'https://');
    }

    return trimmedUrl;
};
