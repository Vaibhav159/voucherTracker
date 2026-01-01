/**
 * LoadingButton Component
 * 
 * Enhanced button with loading state, disabled state, and icons.
 * Provides visual feedback for async actions.
 */

import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Inline spinner for button loading state
 */
const ButtonSpinner = memo(({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{
      animation: 'button-spin 0.8s linear infinite',
    }}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="31.4 31.4"
      style={{ opacity: 0.25 }}
    />
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="31.4 31.4"
      strokeDashoffset="62.8"
      style={{
        animation: 'button-spinner-dash 1.5s ease-in-out infinite',
      }}
    />
    <style>{`
      @keyframes button-spin {
        to { transform: rotate(360deg); }
      }
      @keyframes button-spinner-dash {
        0% {
          stroke-dasharray: 1, 150;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -35;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -124;
        }
      }
    `}</style>
  </svg>
));

ButtonSpinner.displayName = 'ButtonSpinner';

/**
 * Success checkmark for completed state
 */
const ButtonSuccess = memo(({ size = 18, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      animation: 'button-success-in 0.3s ease forwards',
    }}
  >
    <path d="M5 12l5 5L19 7" />
    <style>{`
      @keyframes button-success-in {
        from {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
        }
        to {
          stroke-dashoffset: 0;
        }
      }
    `}</style>
  </svg>
));

ButtonSuccess.displayName = 'ButtonSuccess';

/**
 * Button variants configuration
 */
const VARIANTS = {
  primary: {
    base: {
      background: 'linear-gradient(135deg, var(--accent-violet, #4a00e0), var(--accent-pink, #8B5CF6))',
      color: '#fff',
      border: 'none',
      boxShadow: '0 4px 15px rgba(112, 0, 255, 0.3)',
    },
    hover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 25px rgba(112, 0, 255, 0.4)',
      filter: 'brightness(1.1)',
    },
    active: {
      transform: 'translateY(0)',
      boxShadow: '0 2px 10px rgba(112, 0, 255, 0.3)',
    },
  },
  secondary: {
    base: {
      background: 'var(--btn-secondary-bg, rgba(255, 255, 255, 0.1))',
      color: 'var(--btn-secondary-text, #fff)',
      border: '1px solid var(--glass-border, rgba(255, 255, 255, 0.1))',
    },
    hover: {
      background: 'var(--btn-secondary-hover-bg, rgba(255, 255, 255, 0.15))',
      borderColor: 'var(--glass-highlight, rgba(255, 255, 255, 0.2))',
    },
  },
  success: {
    base: {
      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
      color: '#fff',
      border: 'none',
      boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
    },
    hover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 25px rgba(34, 197, 94, 0.4)',
    },
  },
  danger: {
    base: {
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
      color: '#fff',
      border: 'none',
      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
    },
    hover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 25px rgba(239, 68, 68, 0.4)',
    },
  },
  ghost: {
    base: {
      background: 'transparent',
      color: 'var(--text-primary, #fff)',
      border: 'none',
    },
    hover: {
      background: 'rgba(255, 255, 255, 0.1)',
    },
  },
  outline: {
    base: {
      background: 'transparent',
      color: 'var(--accent-cyan, #00f0ff)',
      border: '1px solid var(--accent-cyan, #00f0ff)',
    },
    hover: {
      background: 'var(--accent-cyan-dim, rgba(0, 240, 255, 0.1))',
    },
  },
};

/**
 * Size configurations
 */
const SIZES = {
  xs: {
    padding: '6px 12px',
    fontSize: '0.75rem',
    borderRadius: '6px',
    gap: '6px',
    minHeight: '28px',
  },
  sm: {
    padding: '8px 16px',
    fontSize: '0.85rem',
    borderRadius: '8px',
    gap: '8px',
    minHeight: '34px',
  },
  md: {
    padding: '10px 20px',
    fontSize: '0.95rem',
    borderRadius: '10px',
    gap: '10px',
    minHeight: '42px',
  },
  lg: {
    padding: '14px 28px',
    fontSize: '1.05rem',
    borderRadius: '12px',
    gap: '12px',
    minHeight: '50px',
  },
  xl: {
    padding: '18px 36px',
    fontSize: '1.1rem',
    borderRadius: '14px',
    gap: '14px',
    minHeight: '58px',
  },
};

/**
 * LoadingButton Component
 */
const LoadingButton = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isSuccess = false,
  isDisabled = false,
  loadingText,
  successText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  style = {},
  ...props
}, ref) => {
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyles = SIZES[size] || SIZES.md;

  const isInteractive = !isLoading && !isDisabled && !isSuccess;

  // Determine button content
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <ButtonSpinner size={parseInt(sizeStyles.fontSize) * 14} />
          {loadingText && <span>{loadingText}</span>}
        </>
      );
    }

    if (isSuccess) {
      return (
        <>
          <ButtonSuccess size={parseInt(sizeStyles.fontSize) * 14} />
          {successText && <span>{successText}</span>}
        </>
      );
    }

    return (
      <>
        {leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
      </>
    );
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={!isInteractive}
      onClick={isInteractive ? onClick : undefined}
      className={`loading-button ${className}`}
      style={{
        // Base styles
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inherit',
        fontWeight: 600,
        cursor: isInteractive ? 'pointer' : 'not-allowed',
        outline: 'none',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        
        // Size styles
        ...sizeStyles,
        
        // Variant styles
        ...variantStyles.base,
        
        // State styles
        opacity: isDisabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        
        // Custom styles
        ...style,
      }}
      onMouseEnter={(e) => {
        if (isInteractive && variantStyles.hover) {
          Object.assign(e.currentTarget.style, variantStyles.hover);
        }
      }}
      onMouseLeave={(e) => {
        if (isInteractive) {
          // Reset hover styles
          Object.assign(e.currentTarget.style, {
            transform: 'none',
            boxShadow: variantStyles.base.boxShadow || 'none',
            filter: 'none',
            background: variantStyles.base.background,
            borderColor: variantStyles.base.border?.includes('solid') 
              ? variantStyles.base.border.split(' ').pop() 
              : undefined,
          });
        }
      }}
      onMouseDown={(e) => {
        if (isInteractive && variantStyles.active) {
          Object.assign(e.currentTarget.style, variantStyles.active);
        }
      }}
      onMouseUp={(e) => {
        if (isInteractive && variantStyles.hover) {
          Object.assign(e.currentTarget.style, variantStyles.hover);
        }
      }}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

LoadingButton.displayName = 'LoadingButton';

LoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'ghost', 'outline']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isDisabled: PropTypes.bool,
  loadingText: PropTypes.string,
  successText: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * Icon Button - Circular button for icons only
 */
export const IconButton = forwardRef(({
  icon,
  variant = 'ghost',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  label,
  onClick,
  className = '',
  style = {},
  ...props
}, ref) => {
  const sizePx = {
    xs: 28,
    sm: 34,
    md: 40,
    lg: 48,
    xl: 56,
  }[size] || 40;

  return (
    <LoadingButton
      ref={ref}
      variant={variant}
      isLoading={isLoading}
      isDisabled={isDisabled}
      onClick={onClick}
      aria-label={label}
      className={`icon-button ${className}`}
      style={{
        width: sizePx,
        height: sizePx,
        minHeight: sizePx,
        padding: 0,
        borderRadius: '50%',
        ...style,
      }}
      {...props}
    >
      {icon}
    </LoadingButton>
  );
});

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'ghost', 'outline']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * ButtonGroup - Groups related buttons together
 */
export const ButtonGroup = memo(({ children, spacing = '8px', direction = 'row' }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: direction,
      gap: spacing,
    }}
  >
    {children}
  </div>
));

ButtonGroup.displayName = 'ButtonGroup';

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
};

export default LoadingButton;
