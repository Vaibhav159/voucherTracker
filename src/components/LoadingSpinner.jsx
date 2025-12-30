import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable loading spinner component
 * @param {string} size - Size of the spinner: 'sm', 'md', 'lg'
 * @param {string} color - Color of the spinner (CSS variable or hex)
 * @param {string} text - Optional loading text to display
 */
const LoadingSpinner = ({ size = 'md', color = 'var(--accent-cyan)', text }) => {
  const sizes = {
    sm: '24px',
    md: '40px',
    lg: '60px',
  };

  const spinnerSize = sizes[size] || sizes.md;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
      }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="loading-spinner"
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `3px solid rgba(255, 255, 255, 0.1)`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
        aria-hidden="true"
      />

      {text && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
          {text}
        </p>
      )}

      <span className="sr-only">Loading...</span>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.string,
  text: PropTypes.string,
};

export default LoadingSpinner;
