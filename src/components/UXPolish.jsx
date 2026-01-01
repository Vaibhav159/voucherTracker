/**
 * VoucherTracker UX Polish Package
 * 
 * Improvements for maximum user satisfaction:
 * 1. Toast notifications for user feedback
 * 2. Skeleton loaders for perceived performance
 * 3. Enhanced micro-interactions
 * 4. Improved empty states
 * 5. Better accessibility
 * 6. Haptic feedback (mobile)
 */

// ============================================
// 1. TOAST NOTIFICATION SYSTEM
// ============================================

import { useState, useCallback, createContext, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        console.warn('useToast must be used within ToastProvider');
        return {
            success: () => {},
            error: () => {},
            info: () => {},
            warning: () => {},
        };
    }
    return context;
};

const TOAST_CONFIG = {
    success: {
        icon: '✓',
        bg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(22, 163, 74, 0.95))',
        border: 'rgba(34, 197, 94, 0.4)',
    },
    error: {
        icon: '✕',
        bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))',
        border: 'rgba(239, 68, 68, 0.4)',
    },
    info: {
        icon: 'ℹ',
        bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(37, 99, 235, 0.95))',
        border: 'rgba(59, 130, 246, 0.4)',
    },
    warning: {
        icon: '⚠',
        bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95), rgba(217, 119, 6, 0.95))',
        border: 'rgba(245, 158, 11, 0.4)',
    },
};

const Toast = ({ id, type, message, onDismiss, isExiting }) => {
    const config = TOAST_CONFIG[type] || TOAST_CONFIG.info;

    return (
        <div
            role="alert"
            aria-live="polite"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 20px',
                borderRadius: '14px',
                background: config.bg,
                border: `1px solid ${config.border}`,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.2)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 500,
                maxWidth: '380px',
                backdropFilter: 'blur(10px)',
                animation: isExiting ? 'toastSlideOut 0.3s ease-in forwards' : 'toastSlideIn 0.3s ease-out',
            }}
        >
            <span style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                flexShrink: 0,
            }}>
                {config.icon}
            </span>
            <span style={{ flex: 1, lineHeight: 1.4 }}>{message}</span>
            <button
                onClick={() => onDismiss(id)}
                aria-label="Dismiss"
                style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    lineHeight: 1,
                    transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
                ×
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((type, message, duration = 3500) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, type, message, isExiting: false }]);

        // Haptic feedback on mobile
        if (navigator.vibrate && type === 'success') {
            navigator.vibrate(50);
        }

        if (duration > 0) {
            setTimeout(() => {
                setToasts(prev => prev.map(t => t.id === id ? { ...t, isExiting: true } : t));
                setTimeout(() => {
                    setToasts(prev => prev.filter(t => t.id !== id));
                }, 300);
            }, duration);
        }
        return id;
    }, []);

    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, isExiting: true } : t));
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 300);
    }, []);

    const toast = {
        success: (msg, dur) => addToast('success', msg, dur),
        error: (msg, dur) => addToast('error', msg, dur),
        info: (msg, dur) => addToast('info', msg, dur),
        warning: (msg, dur) => addToast('warning', msg, dur),
        dismiss: dismissToast,
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            {typeof document !== 'undefined' && createPortal(
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 10000,
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    gap: '10px',
                    pointerEvents: 'none',
                }}>
                    {toasts.map(t => (
                        <div key={t.id} style={{ pointerEvents: 'auto' }}>
                            <Toast {...t} onDismiss={dismissToast} />
                        </div>
                    ))}
                    <style>{`
                        @keyframes toastSlideIn {
                            from { opacity: 0; transform: translateX(100%) scale(0.8); }
                            to { opacity: 1; transform: translateX(0) scale(1); }
                        }
                        @keyframes toastSlideOut {
                            from { opacity: 1; transform: translateX(0) scale(1); }
                            to { opacity: 0; transform: translateX(100%) scale(0.8); }
                        }
                        @media (max-width: 480px) {
                            [style*="position: fixed"][style*="bottom: 24px"] {
                                left: 12px !important;
                                right: 12px !important;
                                bottom: 80px !important;
                            }
                        }
                    `}</style>
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};


// ============================================
// 2. SKELETON LOADERS
// ============================================

const shimmerKeyframes = `
@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
@keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.7; }
}
`;

const shimmerStyle = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear',
};

export const SkeletonBox = ({ width = '100%', height = '20px', borderRadius = '8px', style = {} }) => (
    <div style={{ width, height, borderRadius, ...shimmerStyle, ...style }} />
);

export const VoucherCardSkeleton = ({ index = 0 }) => (
    <div
        className="glass-panel"
        style={{
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            animation: `pulse 1.5s ease-in-out infinite`,
            animationDelay: `${Math.min(index * 0.05, 0.3)}s`,
        }}
    >
        <style>{shimmerKeyframes}</style>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <SkeletonBox width="64px" height="64px" borderRadius="16px" />
            <div style={{ flex: 1 }}>
                <SkeletonBox width="70%" height="20px" style={{ marginBottom: '10px' }} />
                <SkeletonBox width="45%" height="14px" />
            </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
            <SkeletonBox width="90px" height="12px" style={{ marginBottom: '12px' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
                <SkeletonBox width="75px" height="28px" borderRadius="14px" />
                <SkeletonBox width="65px" height="28px" borderRadius="14px" />
                <SkeletonBox width="55px" height="28px" borderRadius="14px" />
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
            <SkeletonBox width="100px" height="16px" />
            <SkeletonBox width="36px" height="36px" borderRadius="50%" />
        </div>
    </div>
);

export const VoucherGridSkeleton = ({ count = 6 }) => (
    <>
        <style>{shimmerKeyframes}</style>
        <div className="voucher-grid">
            {Array.from({ length: count }).map((_, i) => (
                <VoucherCardSkeleton key={i} index={i} />
            ))}
        </div>
    </>
);


// ============================================
// 3. ENHANCED EMPTY STATE
// ============================================

export const EnhancedEmptyState = ({ 
    title = "No results found",
    description = "Try adjusting your search or filters",
    icon = "🔍",
    actionLabel,
    onAction,
    suggestions = []
}) => (
    <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        maxWidth: '400px',
        margin: '0 auto',
    }}>
        {/* Animated Icon */}
        <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem',
            animation: 'float 3s ease-in-out infinite',
        }}>
            {icon}
        </div>
        
        <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
        }}>
            {title}
        </h3>
        
        <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
        }}>
            {description}
        </p>

        {/* Suggestions */}
        {suggestions.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    Try searching for:
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => onAction?.(s)}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '20px',
                                border: '1px solid var(--glass-border)',
                                background: 'var(--glass-bg)',
                                color: 'var(--text-secondary)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                                e.currentTarget.style.color = 'var(--accent-cyan)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--glass-border)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                            }}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* Action Button */}
        {actionLabel && onAction && (
            <button
                onClick={() => onAction()}
                className="btn-primary"
                style={{ padding: '12px 28px' }}
            >
                {actionLabel}
            </button>
        )}

        <style>{`
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `}</style>
    </div>
);


// ============================================
// 4. IMPROVED FAVORITE BUTTON WITH ANIMATION
// ============================================

export const AnimatedFavoriteButton = ({ 
    isFavorite, 
    onToggle, 
    size = 32,
    showLabel = false 
}) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setIsAnimating(true);
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(isFavorite ? 30 : [30, 50, 30]);
        }
        
        onToggle();
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <button
            onClick={handleClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-pressed={isFavorite}
            style={{
                background: isFavorite ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: isFavorite ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--glass-border)',
                borderRadius: '50%',
                width: `${size}px`,
                height: `${size}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: `${size * 0.5}px`,
                transform: isAnimating ? 'scale(1.3)' : 'scale(1)',
                position: 'relative',
                overflow: 'visible',
            }}
        >
            <span style={{
                transition: 'transform 0.2s',
                transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
            }}>
                {isFavorite ? '❤️' : '🤍'}
            </span>
            
            {/* Burst particles on favorite */}
            {isAnimating && isFavorite && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                }}>
                    {[...Array(6)].map((_, i) => (
                        <span
                            key={i}
                            style={{
                                position: 'absolute',
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#ef4444',
                                animation: `burst 0.4s ease-out forwards`,
                                animationDelay: `${i * 0.03}s`,
                                transform: `rotate(${i * 60}deg) translateY(-${size * 0.6}px)`,
                            }}
                        />
                    ))}
                </div>
            )}
            
            <style>{`
                @keyframes burst {
                    0% { opacity: 1; transform: rotate(inherit) translateY(-${size * 0.3}px) scale(1); }
                    100% { opacity: 0; transform: rotate(inherit) translateY(-${size * 0.8}px) scale(0); }
                }
            `}</style>
        </button>
    );
};


// ============================================
// 5. COPY BUTTON WITH FEEDBACK
// ============================================

export const CopyButton = ({ text, label = 'Copy', successLabel = 'Copied!' }) => {
    const [copied, setCopied] = useState(false);
    const toast = useToast();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success('Link copied to clipboard!');
            if (navigator.vibrate) navigator.vibrate(50);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy');
        }
    };

    return (
        <button
            onClick={handleCopy}
            style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: copied ? '1px solid #22c55e' : '1px solid var(--glass-border)',
                background: copied ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
                color: copied ? '#22c55e' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
            }}
        >
            {copied ? '✓' : '📋'} {copied ? successLabel : label}
        </button>
    );
};


// ============================================
// 6. LOADING BUTTON
// ============================================

export const LoadingButton = ({ 
    children, 
    onClick, 
    isLoading = false,
    loadingText = 'Loading...',
    variant = 'primary',
    disabled = false,
    ...props 
}) => {
    const baseStyles = {
        padding: '12px 24px',
        borderRadius: '10px',
        fontWeight: 600,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s',
        opacity: disabled ? 0.6 : 1,
        fontFamily: 'inherit',
        fontSize: '0.95rem',
    };

    const variantStyles = {
        primary: {
            background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
            color: '#fff',
            border: 'none',
        },
        secondary: {
            background: 'var(--glass-bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-border)',
        },
    };

    return (
        <button
            onClick={!disabled && !isLoading ? onClick : undefined}
            disabled={disabled || isLoading}
            style={{ ...baseStyles, ...variantStyles[variant] }}
            {...props}
        >
            {isLoading && (
                <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                }} />
            )}
            {isLoading ? loadingText : children}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </button>
    );
};


// ============================================
// 7. SCROLL TO TOP BUTTON
// ============================================

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (navigator.vibrate) navigator.vibrate(30);
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
                position: 'fixed',
                bottom: '100px',
                right: '24px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-pink))',
                border: 'none',
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                zIndex: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeInUp 0.3s ease-out',
                transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            ↑
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </button>
    );
};


// ============================================
// 8. KEYBOARD SHORTCUT LISTENER
// ============================================

export const useKeyboardShortcuts = (shortcuts) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ignore if typing in input
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

            const key = e.key.toLowerCase();
            const combo = [
                e.metaKey || e.ctrlKey ? 'cmd' : '',
                e.shiftKey ? 'shift' : '',
                e.altKey ? 'alt' : '',
                key
            ].filter(Boolean).join('+');

            if (shortcuts[combo]) {
                e.preventDefault();
                shortcuts[combo]();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
};


// ============================================
// 9. FOCUS TRAP FOR MODALS
// ============================================

export const useFocusTrap = (isOpen, containerRef) => {
    useEffect(() => {
        if (!isOpen || !containerRef.current) return;

        const container = containerRef.current;
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTab = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        container.addEventListener('keydown', handleTab);
        firstElement?.focus();

        return () => container.removeEventListener('keydown', handleTab);
    }, [isOpen, containerRef]);
};


// ============================================
// 10. CSS POLISH ADDITIONS
// ============================================

export const PolishStyles = () => (
    <style>{`
        /* Improved Focus States */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        select:focus-visible {
            outline: 2px solid var(--accent-cyan);
            outline-offset: 2px;
        }

        /* Smoother Transitions */
        .glass-panel,
        .voucher-card,
        .platform-card,
        .nav-item {
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Better Touch Targets */
        @media (pointer: coarse) {
            button, a, [role="button"] {
                min-height: 44px;
                min-width: 44px;
            }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        /* Better Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
        }

        /* Selection Color */
        ::selection {
            background: rgba(6, 182, 212, 0.3);
            color: inherit;
        }

        /* Smooth Scroll */
        html {
            scroll-behavior: smooth;
        }

        /* Loading Shimmer */
        .skeleton-shimmer {
            background: linear-gradient(90deg, 
                rgba(255,255,255,0.03) 0%, 
                rgba(255,255,255,0.08) 50%, 
                rgba(255,255,255,0.03) 100%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite linear;
        }

        /* Pulse Animation */
        .pulse {
            animation: pulse 2s ease-in-out infinite;
        }

        /* Float Animation */
        .float {
            animation: float 3s ease-in-out infinite;
        }
    `}</style>
);


// ============================================
// EXPORTS
// ============================================

export default {
    ToastProvider,
    useToast,
    VoucherCardSkeleton,
    VoucherGridSkeleton,
    SkeletonBox,
    EnhancedEmptyState,
    AnimatedFavoriteButton,
    CopyButton,
    LoadingButton,
    ScrollToTopButton,
    useKeyboardShortcuts,
    useFocusTrap,
    PolishStyles,
};
