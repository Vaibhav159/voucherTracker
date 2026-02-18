/**
 * VoucherCard - Polished Version
 *
 * Improvements:
 * - Animated favorite button with haptic feedback
 * - Better hover states
 * - Improved accessibility
 * - Toast notifications
 * - Optimized re-renders
 */

import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { getPlatformLogo } from '../utils/platformLogos';
import { ensureHttps } from '../utils/urlUtils';
import { getLogoClass } from '../utils/logoUtils';
import ExpiryBadge from './ExpiryBadge';
import { useFavorites } from '../context/FavoritesContext';

const VoucherCard = memo(({ voucher, onClick, index = 0 }) => {
    const platformNames = voucher.platforms.map(p => p.name);
    const { toggleFavoriteVoucher, isVoucherFavorite } = useFavorites();
    const isFavorite = isVoucherFavorite(voucher.slug);


    const [isHovered, setIsHovered] = useState(false);
    const [favoriteAnimating, setFavoriteAnimating] = useState(false);

    // Calculate max discount from platform fees
    const maxDiscount = React.useMemo(() => {
        let max = 0;
        voucher.platforms.forEach(p => {
            const fee = p.fee || '';
            const match = fee.match(/(\d+(?:\.\d+)?)\s*%/);
            if (match) {
                const discount = parseFloat(match[1]);
                if (discount > max) max = discount;
            }
        });
        return Math.round(max);
    }, [voucher.platforms]);

    // Handle favorite toggle with animation & toast
    const handleFavoriteClick = useCallback((e) => {
        e.stopPropagation();
        setFavoriteAnimating(true);

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(isFavorite ? 30 : [30, 50, 30]);
        }

        toggleFavoriteVoucher(voucher.slug, voucher.brand);

        setTimeout(() => setFavoriteAnimating(false), 400);
    }, [isFavorite, toggleFavoriteVoucher, voucher.slug, voucher.brand]);

    // Staggered animation delay (max 0.5s)
    const animationDelay = Math.min(index * 0.03, 0.5);

    return (
        <button
            onClick={() => onClick?.(voucher)}
            className="glass-panel voucher-card"
            aria-label={`View details for ${voucher.brand} in ${voucher.category} category. Available on ${platformNames.length} platform${platformNames.length > 1 ? 's' : ''}. ${maxDiscount > 0 ? `Up to ${maxDiscount}% off.` : ''}`}
            data-tour={index === 0 ? "voucher-card" : undefined}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                animationDelay: `${animationDelay}s`,
                transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
            }}
        >
            {/* Favorite Toggle Button - Improved */}
            <span
                onClick={handleFavoriteClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleFavoriteClick(e);
                    }
                }}
                role="button"
                tabIndex={0}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={isFavorite}
                style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    background: isFavorite ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    border: isFavorite ? '2px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--glass-border)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontSize: '1rem',
                    zIndex: 5,
                    transform: favoriteAnimating ? 'scale(1.3)' : 'scale(1)',
                    boxShadow: isFavorite ? '0 0 12px rgba(239, 68, 68, 0.3)' : 'none',
                }}
            >
                <span style={{
                    display: 'inline-block',
                    transition: 'transform 0.25s',
                    transform: favoriteAnimating && !isFavorite ? 'scale(1.3) rotate(15deg)' : 'scale(1)',
                }}>
                    {isFavorite ? '❤️' : '🤍'}
                </span>

                {/* Burst effect */}
                {favoriteAnimating && !isFavorite && (
                    <span style={{
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '50%',
                        border: '2px solid rgba(239, 68, 68, 0.5)',
                        animation: 'ripple 0.4s ease-out forwards',
                    }} />
                )}
            </span>

            {/* Discount Badge - Enhanced */}
            {maxDiscount > 0 && (
                <span
                    className="voucher-discount-badge"
                    style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: '#fff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '5px 10px',
                        borderRadius: '8px',
                        boxShadow: '0 3px 10px rgba(34, 197, 94, 0.35)',
                        zIndex: 5,
                        letterSpacing: '0.3px',
                    }}
                >
                    {maxDiscount}% OFF
                </span>
            )}

            <div className="voucher-card__header">
                <div className="voucher-card__logo" style={{
                    transition: 'transform 0.3s ease',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}>
                    <img
                        src={ensureHttps(voucher.logo)}
                        alt="" // Decorative, brand name is in text
                        loading="lazy"
                        className={getLogoClass(voucher.logo)}
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(voucher.brand)}&background=random&color=fff&bold=true`;
                        }}
                    />
                </div>
                <div className="voucher-card__info">
                    <h3 className="voucher-card__brand">{voucher.brand}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span className="voucher-card__category">{voucher.category}</span>
                        {voucher.expiryDays && voucher.lastUpdated && (
                            <ExpiryBadge
                                lastUpdated={voucher.lastUpdated}
                                expiryDays={voucher.expiryDays}
                                size="xs"
                            />
                        )}
                    </div>

                </div>
            </div>

            <div className="voucher-card__body">
                <div className="voucher-card__platforms-section">
                    <p className="voucher-card__platforms-label">Available on</p>
                    <div className="voucher-card__platforms-list">
                        {platformNames.slice(0, 3).map(name => {
                            const logo = getPlatformLogo(name);
                            return (
                                <span key={name} className="platform-badge" style={{
                                    transition: 'transform 0.2s, background 0.2s',
                                }}>
                                    {logo && <img src={logo} alt="" loading="lazy" />}
                                    {name}
                                </span>
                            );
                        })}
                        {platformNames.length > 3 && (
                            <span className="platform-badge__count">+{platformNames.length - 3}</span>
                        )}
                    </div>
                </div>

                <div className="voucher-card__footer">
                    <span className="voucher-card__cta-text" style={{
                        transition: 'color 0.2s',
                        color: isHovered ? 'var(--accent-cyan)' : undefined,
                    }}>
                        Check Rates
                    </span>
                    <div className="btn-icon" style={{
                        transition: 'transform 0.2s, background 0.2s',
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--bg-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Ripple animation style */}
            <style>{`
                @keyframes ripple {
                    from {
                        transform: scale(1);
                        opacity: 1;
                    }
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `}</style>
        </button>
    );
});

VoucherCard.displayName = 'VoucherCard';

VoucherCard.propTypes = {
    voucher: PropTypes.shape({
        id: PropTypes.string,
        brand: PropTypes.string.isRequired,
        logo: PropTypes.string,
        category: PropTypes.string.isRequired,
        expiryDays: PropTypes.number,
        lastUpdated: PropTypes.string,
        platforms: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            fee: PropTypes.string,
            cap: PropTypes.string,
            link: PropTypes.string,
        })).isRequired,
    }).isRequired,
    onClick: PropTypes.func,
    index: PropTypes.number,
};

export default VoucherCard;
