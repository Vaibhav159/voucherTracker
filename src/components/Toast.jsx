/**
 * Toast Notification System
 * 
 * Provides global toast notifications for user feedback.
 * Supports success, error, warning, and info types.
 * Auto-dismisses with configurable duration.
 * Accessible with ARIA live regions.
 */

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Toast Context
const ToastContext = createContext(null);

// Toast types with their styles
const TOAST_TYPES = {
  success: {
    icon: '✓',
    bg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(22, 163, 74, 0.95))',
    border: 'rgba(34, 197, 94, 0.5)',
    iconBg: 'rgba(255, 255, 255, 0.2)',
  },
  error: {
    icon: '✕',
    bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))',
    border: 'rgba(239, 68, 68, 0.5)',
    iconBg: 'rgba(255, 255, 255, 0.2)',
  },
  warning: {
    icon: '⚠',
    bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(217, 119, 6, 0.95))',
    border: 'rgba(245, 158, 11, 0.5)',
    iconBg: 'rgba(255, 255, 255, 0.2)',
  },
  info: {
    icon: 'ℹ',
    bg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.95), rgba(8, 145, 178, 0.95))',
    border: 'rgba(6, 182, 212, 0.5)',
    iconBg: 'rgba(255, 255, 255, 0.2)',
  },
};

// Default durations by type
const DEFAULT_DURATIONS = {
  success: 3000,
  error: 5000,
  warning: 4000,
  info: 3500,
};

/**
 * Individual Toast Component
 */
const Toast = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  
  const typeConfig = TOAST_TYPES[toast.type] || TOAST_TYPES.info;
  const duration = toast.duration || DEFAULT_DURATIONS[toast.type] || 3000;

  // Handle dismiss with exit animation
  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    clearInterval(progressRef.current);
    clearTimeout(timerRef.current);
    setTimeout(() => onDismiss(toast.id), 300);
  }, [toast.id, onDismiss]);

  // Auto dismiss timer
  useEffect(() => {
    if (toast.persistent) return;

    // Progress bar animation
    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
    }, 50);

    timerRef.current = setTimeout(handleDismiss, duration);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [duration, handleDismiss, toast.persistent]);

  // Pause on hover
  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    clearInterval(progressRef.current);
  };

  const handleMouseLeave = () => {
    if (toast.persistent) return;
    const remainingTime = (progress / 100) * duration;
    
    const startTime = Date.now();
    const startProgress = progress;
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, startProgress - (elapsed / remainingTime) * startProgress);
      setProgress(remaining);
    }, 50);

    timerRef.current = setTimeout(handleDismiss, remainingTime);
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 16px',
        paddingRight: '40px',
        background: typeConfig.bg,
        borderRadius: '12px',
        border: `1px solid ${typeConfig.border}`,
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.2)',
        color: '#fff',
        minWidth: '280px',
        maxWidth: '420px',
        position: 'relative',
        overflow: 'hidden',
        animation: isExiting 
          ? 'toastSlideOut 0.3s ease forwards' 
          : 'toastSlideIn 0.3s ease forwards',
        backdropFilter: 'blur(10px)',
        transform: 'translateZ(0)', // GPU acceleration
      }}
    >
      {/* Icon */}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: typeConfig.iconBg,
          fontSize: '14px',
          fontWeight: 'bold',
          flexShrink: 0,
        }}
      >
        {toast.icon || typeConfig.icon}
      </span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {toast.title && (
          <div style={{ 
            fontWeight: 600, 
            fontSize: '0.95rem',
            marginBottom: toast.message ? '2px' : 0,
          }}>
            {toast.title}
          </div>
        )}
        {toast.message && (
          <div style={{ 
            fontSize: '0.85rem', 
            opacity: 0.9,
            lineHeight: 1.4,
          }}>
            {toast.message}
          </div>
        )}
      </div>

      {/* Action button (optional) */}
      {toast.action && (
        <button
          onClick={() => {
            toast.action.onClick();
            handleDismiss();
          }}
          style={{
            padding: '6px 12px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
        >
          {toast.action.label}
        </button>
      )}

      {/* Close button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss notification"
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          borderRadius: '50%',
          color: 'rgba(255, 255, 255, 0.8)',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s',
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.color = '#fff';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.color = 'rgba(255, 255, 255, 0.8)';
        }}
      >
        ×
      </button>

      {/* Progress bar */}
      {!toast.persistent && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            width: `${progress}%`,
            background: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '0 3px 0 0',
            transition: 'width 0.05s linear',
          }}
        />
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes toastSlideOut {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};

Toast.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    title: PropTypes.string,
    message: PropTypes.string,
    icon: PropTypes.node,
    duration: PropTypes.number,
    persistent: PropTypes.bool,
    action: PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    }),
  }).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

/**
 * Toast Container - Renders all active toasts
 */
const ToastContainer = ({ toasts, onDismiss, position = 'bottom-right' }) => {
  const positionStyles = {
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' },
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
    'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      style={{
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        flexDirection: position.includes('top') ? 'column' : 'column-reverse',
        gap: '12px',
        pointerEvents: 'none',
        ...positionStyles[position],
      }}
    >
      {toasts.map(toast => (
        <div key={toast.id} style={{ pointerEvents: 'auto' }}>
          <Toast toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
};

/**
 * Toast Provider - Wraps app and provides toast functionality
 */
export const ToastProvider = ({ children, position = 'bottom-right', maxToasts = 5 }) => {
  const [toasts, setToasts] = useState([]);

  // Add a toast
  const addToast = useCallback((toast) => {
    const id = toast.id || `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    setToasts(prev => {
      // Limit max toasts
      const newToasts = [{ ...toast, id }, ...prev].slice(0, maxToasts);
      return newToasts;
    });

    return id;
  }, [maxToasts]);

  // Remove a toast
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Convenience methods
  const toast = useCallback((message, options = {}) => {
    return addToast({ message, type: 'info', ...options });
  }, [addToast]);

  toast.success = useCallback((message, options = {}) => {
    return addToast({ message, type: 'success', ...options });
  }, [addToast]);

  toast.error = useCallback((message, options = {}) => {
    return addToast({ message, type: 'error', ...options });
  }, [addToast]);

  toast.warning = useCallback((message, options = {}) => {
    return addToast({ message, type: 'warning', ...options });
  }, [addToast]);

  toast.info = useCallback((message, options = {}) => {
    return addToast({ message, type: 'info', ...options });
  }, [addToast]);

  toast.promise = useCallback(async (promise, options = {}) => {
    const {
      loading = 'Loading...',
      success = 'Success!',
      error = 'Something went wrong',
    } = options;

    const loadingId = addToast({ 
      message: loading, 
      type: 'info', 
      persistent: true,
      icon: '⏳',
    });

    try {
      const result = await promise;
      removeToast(loadingId);
      addToast({ 
        message: typeof success === 'function' ? success(result) : success, 
        type: 'success' 
      });
      return result;
    } catch (err) {
      removeToast(loadingId);
      addToast({ 
        message: typeof error === 'function' ? error(err) : error, 
        type: 'error' 
      });
      throw err;
    }
  }, [addToast, removeToast]);

  toast.dismiss = removeToast;
  toast.dismissAll = useCallback(() => setToasts([]), []);

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} position={position} />
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf([
    'top-right', 'top-left', 'bottom-right', 
    'bottom-left', 'top-center', 'bottom-center'
  ]),
  maxToasts: PropTypes.number,
};

/**
 * useToast hook - Access toast functionality
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
};

export default ToastProvider;
