/**
 * URL Slug Utilities for shareable links
 */

/**
 * Convert a display name to URL-friendly slug
 * "HDFC Infinia Metal" → "hdfc-infinia-metal"
 */
export function toSlug(name) {
    if (!name) return '';
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .replace(/-+/g, '-')           // Replace multiple hyphens with single
        .trim();
}

/**
 * Convert a slug back to title case
 * "hdfc-infinia-metal" → "Hdfc Infinia Metal"
 */
export function fromSlug(slug) {
    if (!slug) return '';
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Find item in array by matching slug
 */
export function findBySlug(items, slug, nameKey = 'name') {
    if (!slug || !items) return null;
    const normalizedSlug = slug.toLowerCase();
    return items.find(item => toSlug(item[nameKey]) === normalizedSlug);
}

/**
 * Parse numeric value from slug (for amounts)
 * "25000" → 25000
 * "25k" → 25000
 */
export function parseAmount(value) {
    if (!value) return null;
    const str = value.toLowerCase().replace(/,/g, '');
    if (str.endsWith('k')) {
        return parseFloat(str) * 1000;
    }
    if (str.endsWith('l') || str.endsWith('lac') || str.endsWith('lakh')) {
        return parseFloat(str) * 100000;
    }
    return parseFloat(str) || null;
}

/**
 * Format amount for URL
 * 25000 → "25000"
 */
export function formatAmountForUrl(amount) {
    if (!amount) return '';
    return String(Math.round(amount));
}
