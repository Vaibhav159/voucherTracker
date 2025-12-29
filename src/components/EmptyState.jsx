import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable empty state component with illustrations
 * @param {string} illustration - Type of illustration: 'search', 'heart', 'error', 'empty'
 * @param {string} title - Main title text
 * @param {string} description - Description text
 * @param {object} action - Optional action button { label, onClick }
 */
const EmptyState = ({ illustration = 'empty', title, description, action }) => {
  // SVG illustrations for different empty states
  const illustrations = {
    search: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="var(--accent-cyan)" strokeWidth="4" fill="none" opacity="0.3"/>
        <path d="M70 70L95 95" stroke="var(--accent-cyan)" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
        <circle cx="50" cy="50" r="20" stroke="var(--accent-cyan)" strokeWidth="3" fill="none"/>
      </svg>
    ),
    heart: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 95L35 70C25 60 25 45 35 35C45 25 60 30 60 30C60 30 75 25 85 35C95 45 95 60 85 70L60 95Z" stroke="var(--accent-pink)" strokeWidth="3" fill="none" opacity="0.3"/>
      </svg>
    ),
    error: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="40" stroke="#ef4444" strokeWidth="3" fill="none" opacity="0.3"/>
        <path d="M45 45L75 75M75 45L45 75" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    empty: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="40" width="60" height="50" rx="8" stroke="var(--glass-border)" strokeWidth="3" fill="none" opacity="0.3"/>
        <path d="M45 60H75M45 70H65" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        minHeight: '300px',
      }}
      role="status"
      aria-live="polite"
    >
      {/* Illustration */}
      <div style={{ marginBottom: '1.5rem', opacity: 0.6 }}>
        {illustrations[illustration] || illustrations.empty}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            maxWidth: '400px',
            marginBottom: action ? '1.5rem' : '0',
            lineHeight: '1.6',
          }}
        >
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            background: 'var(--glass-bg)',
            color: 'var(--text-primary)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.borderColor = 'var(--accent-cyan)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.borderColor = 'var(--glass-border)';
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  illustration: PropTypes.oneOf(['search', 'heart', 'error', 'empty']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};

export default EmptyState;
