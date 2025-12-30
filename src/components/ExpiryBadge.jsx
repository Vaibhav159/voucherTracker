import React from 'react';
import PropTypes from 'prop-types';
import { getExpiryStatus } from '../utils/expiryUtils';

const ExpiryBadge = ({ lastUpdated, expiryDays, size = 'sm' }) => {
  const { status, text, color, urgency } = getExpiryStatus(expiryDays);

  if (status === 'unknown') return null;

  const sizeStyles = {
    xs: { fontSize: '0.65rem', padding: '2px 6px' },
    sm: { fontSize: '0.75rem', padding: '3px 8px' },
    md: { fontSize: '0.85rem', padding: '4px 10px' }
  };

  const style = sizeStyles[size] || sizeStyles.sm;

  return (
    <span
      className="expiry-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: style.fontSize,
        fontWeight: 600,
        padding: style.padding,
        borderRadius: 'var(--radius-full)',
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}
      title={`Last updated: ${lastUpdated || 'Unknown'}`}
    >
      {urgency === 'critical' && <span>⚠️</span>}
      {urgency === 'high' && <span>⏰</span>}
      {urgency === 'medium' && <span>📅</span>}
      {urgency === 'low' && <span>✓</span>}
      {text}
    </span>
  );
};

ExpiryBadge.propTypes = {
  lastUpdated: PropTypes.string,
  expiryDays: PropTypes.number,
  size: PropTypes.oneOf(['xs', 'sm', 'md'])
};

export default ExpiryBadge;
