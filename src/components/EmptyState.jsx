/**
 * EmptyState - Enhanced with Better Illustrations & Actions
 * 
 * Improvements:
 * - Context-aware illustrations
 * - Suggested actions
 * - Better messaging
 * - Animation
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

// SVG Illustrations as components
const SearchIllustration = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="52" cy="52" r="40" stroke="var(--text-secondary)" strokeWidth="3" opacity="0.3"/>
        <circle cx="52" cy="52" r="28" stroke="var(--accent-cyan)" strokeWidth="2" strokeDasharray="4 4"/>
        <path d="M82 82L105 105" stroke="var(--text-secondary)" strokeWidth="4" strokeLinecap="round" opacity="0.3"/>
        <circle cx="52" cy="52" r="8" fill="var(--accent-cyan)" opacity="0.3"/>
    </svg>
);

const EmptyBoxIllustration = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <rect x="20" y="40" width="80" height="60" rx="4" stroke="var(--text-secondary)" strokeWidth="2" opacity="0.3"/>
        <path d="M20 55L60 75L100 55" stroke="var(--text-secondary)" strokeWidth="2" opacity="0.3"/>
        <ellipse cx="60" cy="35" rx="25" ry="8" stroke="var(--accent-pink)" strokeWidth="2" strokeDasharray="4 4"/>
        <path d="M50 30V20M60 28V15M70 30V20" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const HeartIllustration = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path 
            d="M60 100C60 100 20 70 20 45C20 25 35 15 50 15C60 15 60 25 60 25C60 25 60 15 70 15C85 15 100 25 100 45C100 70 60 100 60 100Z" 
            stroke="var(--text-secondary)" 
            strokeWidth="2" 
            strokeDasharray="4 4"
            opacity="0.3"
        />
        <path 
            d="M60 85C60 85 35 65 35 50C35 38 44 32 52 32C58 32 60 38 60 38C60 38 62 32 68 32C76 32 85 38 85 50C85 65 60 85 60 85Z" 
            fill="var(--accent-pink)" 
            opacity="0.15"
        />
    </svg>
);

const CardIllustration = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <rect x="15" y="35" width="70" height="45" rx="6" stroke="var(--text-secondary)" strokeWidth="2" opacity="0.3" transform="rotate(-5 15 35)"/>
        <rect x="35" y="40" width="70" height="45" rx="6" stroke="var(--accent-cyan)" strokeWidth="2" opacity="0.5"/>
        <rect x="40" y="52" width="25" height="4" rx="2" fill="var(--text-secondary)" opacity="0.3"/>
        <rect x="40" y="62" width="40" height="3" rx="1.5" fill="var(--text-secondary)" opacity="0.2"/>
        <rect x="40" y="70" width="30" height="3" rx="1.5" fill="var(--text-secondary)" opacity="0.2"/>
    </svg>
);

const ErrorIllustration = () => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="45" stroke="var(--text-secondary)" strokeWidth="2" opacity="0.3"/>
        <path d="M45 45L75 75M75 45L45 75" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
    </svg>
);

const ILLUSTRATIONS = {
    search: SearchIllustration,
    empty: EmptyBoxIllustration,
    favorites: HeartIllustration,
    cards: CardIllustration,
    error: ErrorIllustration,
};

const EmptyState = memo(({
    illustration = 'empty',
    title,
    description,
    action,
    actionLabel,
    secondaryAction,
    secondaryActionLabel,
    children,
}) => {
    const IllustrationComponent = ILLUSTRATIONS[illustration] || ILLUSTRATIONS.empty;

    return (
        <div
            className="glass-panel"
            style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                maxWidth: '500px',
                margin: '2rem auto',
                animation: 'fadeInUp 0.4s ease-out',
            }}
            role="status"
            aria-live="polite"
        >
            {/* Illustration */}
            <div
                style={{
                    marginBottom: '1.5rem',
                    animation: 'float 3s ease-in-out infinite',
                }}
            >
                <IllustrationComponent />
            </div>

            {/* Title */}
            {title && (
                <h3
                    style={{
                        color: 'var(--text-primary)',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                    }}
                >
                    {title}
                </h3>
            )}

            {/* Description */}
            {description && (
                <p
                    style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        marginBottom: '1.5rem',
                        maxWidth: '350px',
                        margin: '0 auto 1.5rem',
                    }}
                >
                    {description}
                </p>
            )}

            {/* Actions */}
            {(action || secondaryAction) && (
                <div
                    style={{
                        display: 'flex',
                        gap: '0.75rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {action && (
                        <button
                            onClick={action}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '10px',
                                border: 'none',
                                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-pink))',
                                color: '#fff',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(6, 182, 212, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {actionLabel || 'Take Action'}
                        </button>
                    )}
                    {secondaryAction && (
                        <button
                            onClick={secondaryAction}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '10px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'var(--text-secondary)',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.color = 'var(--text-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                            }}
                        >
                            {secondaryActionLabel || 'Learn More'}
                        </button>
                    )}
                </div>
            )}

            {/* Custom children */}
            {children}

            {/* Float animation */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
});

EmptyState.displayName = 'EmptyState';

EmptyState.propTypes = {
    illustration: PropTypes.oneOf(['search', 'empty', 'favorites', 'cards', 'error']),
    title: PropTypes.string,
    description: PropTypes.string,
    action: PropTypes.func,
    actionLabel: PropTypes.string,
    secondaryAction: PropTypes.func,
    secondaryActionLabel: PropTypes.string,
    children: PropTypes.node,
};

export default EmptyState;
