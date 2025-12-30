// Expiry tracking utilities

/**
 * Get expiry status and styling
 * @param {number} expiryDays - Number of days valid
 * @returns {Object} Status object with color, text, and urgency
 */
export const getExpiryStatus = (expiryDays) => {
  if (!expiryDays) {
    return {
      status: 'unknown',
      text: 'No expiry data',
      color: 'var(--text-secondary)',
      urgency: 'none'
    };
  }

  // Static display logic as requested
  return {
    status: 'valid',
    text: `${expiryDays} Days Validity`,
    color: '#22c55e', // Always green/valid for now as it's just a policy statement
    urgency: 'low'
  };
};

/**
 * Format last updated date
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatLastUpdated = (dateString) => {
  if (!dateString) return 'Unknown';

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
};
