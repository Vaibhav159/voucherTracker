// Expiry tracking utilities

/**
 * Calculate days until expiry
 * @param {string} lastUpdated - ISO date string
 * @param {number} expiryDays - Number of days until voucher expires
 * @returns {number} Days remaining (negative if expired)
 */
export const calculateDaysRemaining = (lastUpdated, expiryDays) => {
  if (!lastUpdated || !expiryDays) return null;

  const lastUpdateDate = new Date(lastUpdated);
  const today = new Date();
  const expiryDate = new Date(lastUpdateDate);
  expiryDate.setDate(expiryDate.getDate() + expiryDays);

  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Get expiry status and styling
 * @param {number} daysRemaining - Days until expiry
 * @returns {Object} Status object with color, text, and urgency
 */
export const getExpiryStatus = (daysRemaining) => {
  if (daysRemaining === null) {
    return {
      status: 'unknown',
      text: 'No expiry data',
      color: 'var(--text-secondary)',
      urgency: 'none'
    };
  }

  if (daysRemaining < 0) {
    return {
      status: 'expired',
      text: 'Expired',
      color: '#ef4444',
      urgency: 'critical'
    };
  }

  if (daysRemaining === 0) {
    return {
      status: 'today',
      text: 'Expires today',
      color: '#f97316',
      urgency: 'critical'
    };
  }

  if (daysRemaining <= 7) {
    return {
      status: 'urgent',
      text: `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} left`,
      color: '#f59e0b',
      urgency: 'high'
    };
  }

  if (daysRemaining <= 30) {
    return {
      status: 'soon',
      text: `${daysRemaining} days left`,
      color: '#eab308',
      urgency: 'medium'
    };
  }

  return {
    status: 'valid',
    text: `${daysRemaining} days left`,
    color: '#22c55e',
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
