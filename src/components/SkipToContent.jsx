import React from 'react';

const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="skip-to-content"
      style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 999999,
        padding: '1rem 1.5rem',
        background: 'var(--accent-cyan)',
        color: '#000',
        fontWeight: 600,
        borderRadius: '0 0 8px 8px',
        textDecoration: 'none',
        transition: 'left 0.2s'
      }}
      onFocus={(e) => {
        e.target.style.left = '50%';
        e.target.style.transform = 'translateX(-50%)';
      }}
      onBlur={(e) => {
        e.target.style.left = '-9999px';
        e.target.style.transform = 'none';
      }}
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
