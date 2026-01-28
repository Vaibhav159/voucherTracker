/**
 * VoucherModal - Polished Version
 *
 * Improvements:
 * - Toast notifications on copy
 * - Share to WhatsApp/Twitter
 * - Quick add to favorites
 * - Better "Best Deal" highlighting
 * - Improved accessibility
 * - Animated interactions
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPlatformStyle } from '../utils/platformLogos';
import { ensureHttps } from '../utils/urlUtils';
import { Link } from 'react-router-dom';
import { useModalKeyHandler } from '../hooks/useModalKeyHandler';
import { useDiscountParser } from '../hooks/useDiscountParser';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from './UXPolish';
import ExpiryBadge from './ExpiryBadge';

const VoucherModal = ({ voucher, onClose, selectedPlatform }) => {
    const toast = useToast();
    const { toggleFavoriteVoucher, isVoucherFavorite } = useFavorites();

    const [activeTab, setActiveTab] = useState('offers');
    const [showShareMenu, setShowShareMenu] = useState(null);

    // Hooks
    useModalKeyHandler(true, onClose);
    const { getBestPlatform } = useDiscountParser();

    const isFavorite = isVoucherFavorite(voucher?.id);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = ''; // Restore original
        };
    }, []);

    // Copy link with toast
    const copyLink = useCallback((link, platformName) => {
        navigator.clipboard.writeText(link).then(() => {
            setCopiedLink(platformName);
            toast.success(`Link copied for ${platformName}!`);
            setTimeout(() => setCopiedLink(null), 2000);
        }).catch(() => {
            toast.error('Failed to copy link');
        });
    }, [toast]);
    // Share functionality
    const shareVoucher = useCallback((platform, method) => {
        const url = platform.link;
        const text = `Check out ${voucher.brand} voucher on ${platform.name} - ${platform.fee} discount!`;

        if (method === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
            toast.success('Opening WhatsApp...');
        } else if (method === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
            toast.success('Opening Twitter...');
        } else if (method === 'native' && navigator.share) {
            navigator.share({
                title: `${voucher.brand} Voucher`,
                text: text,
                url: url
            }).then(() => {
                toast.success('Shared successfully!');
            }).catch(() => { });
        }
        setShowShareMenu(null);
    }, [voucher, toast]);

    // Copy all deals
    const copyAllDeals = useCallback(() => {
        const deals = voucher.platforms.map(p =>
            `${p.name}: ${p.fee} (Cap: ${p.cap}) - ${p.link}`
        ).join('\n\n');

        const text = `${voucher.brand} Voucher Deals:\n\n${deals}`;

        navigator.clipboard.writeText(text).then(() => {
            toast.success('All deals copied to clipboard!');
        });
    }, [voucher, toast]);

    // Toggle favorite with feedback
    const handleFavoriteToggle = useCallback(() => {
        toggleFavoriteVoucher(voucher.id, voucher.brand);

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(isFavorite ? 30 : [30, 50, 30]);
        }
    }, [toggleFavoriteVoucher, voucher, isFavorite]);

    // Calculate best platform
    const bestPlatformIndex = useMemo(() => {
        if (!voucher) return -1;
        const { idx, discount } = getBestPlatform(voucher.platforms);
        return discount > 0 ? idx : -1;
    }, [voucher, getBestPlatform]);

    // Calculate total potential savings
    const potentialSavings = useMemo(() => {
        if (!voucher || bestPlatformIndex === -1) return null;
        const bestPlatform = voucher.platforms[bestPlatformIndex];
        const fee = bestPlatform.fee || '';
        const match = fee.match(/(\d+(?:\.\d+)?)\s*%/);
        if (match) {
            const discount = parseFloat(match[1]);
            // Assume ₹1000 spend for calculation
            return Math.round(1000 * discount / 100);
        }
        return null;
    }, [voucher, bestPlatformIndex]);

    const getRewardText = (fee) => {
        if (fee.toLowerCase().includes('discount')) {
            return { label: 'Savings', value: fee.replace('Discount', '').trim() };
        }
        if (fee === 'None') {
            return { label: 'Fees', value: '0%' };
        }
        return { label: 'Fees', value: fee };
    };

    if (!voucher) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="voucher-modal-title"
        >
            <div
                className="modal-container glass-panel"
                onClick={e => e.stopPropagation()}
                style={{
                    animation: 'modalSlideIn 0.3s ease-out',
                    maxWidth: '700px',
                    width: '95%',
                    margin: '0 auto'
                }}
            >
                {/* Header */}
                <div className="modal-header">
                    <div className="modal-header__logo">
                        <img
                            src={ensureHttps(voucher.logo)}
                            alt=""
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(voucher.brand)}&background=random`;
                            }}
                        />
                    </div>
                    <div className="modal-header-wrapper" style={{ flex: 1, display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                        <div className="modal-header__info" style={{ flex: 1 }}>
                            <h2 id="voucher-modal-title" className="modal-header__title">{voucher.brand}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                                <span className="modal-header__tag">{voucher.category}</span>
                                {voucher.expiryDays && voucher.lastUpdated && (
                                    <ExpiryBadge
                                        lastUpdated={voucher.lastUpdated}
                                        expiryDays={voucher.expiryDays}
                                        size="xs"
                                    />
                                )}

                            </div>
                        </div>

                        {/* Action Buttons - Clean like production */}
                        <div className="modal-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center', alignSelf: 'flex-start' }}>
                            {/* Share to X button */}
                            <button
                                onClick={() => {
                                    const url = `${window.location.origin}${window.location.pathname}#/?voucher=${voucher.id}`;
                                    const text = `Check out ${voucher.brand} voucher deals on Voucher Tracker! 🎫💰`;
                                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                                    toast.success('Opening X/Twitter...');
                                }}
                                style={{
                                    padding: '8px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    background: 'linear-gradient(135deg, #000, #1a1a1a)',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'linear-gradient(135deg, #1a1a1a, #333)';
                                    e.target.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'linear-gradient(135deg, #000, #1a1a1a)';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                                title="Share to X (Twitter)"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                Share
                            </button>
                            {voucher.site && (
                                <a
                                    href={voucher.site}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="launch-site-btn"
                                    style={{
                                        textDecoration: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.85rem',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                                        e.target.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <span className="btn-text-desktop">Visit Site</span>
                                    <span className="btn-text-mobile">Site</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                </a>
                            )}
                            <button
                                onClick={onClose}
                                className="btn-close"
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                </div>

                {/* Content - Directly show offers like production */}
                <div className="modal-content" role="tabpanel">
                    <div className="modal-section-header" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                        paddingLeft: '4px',
                        paddingTop: '16px'
                    }}>
                        <span style={{
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            letterSpacing: '0.05em',
                            color: 'var(--text-secondary)',
                            textTransform: 'uppercase'
                        }}>Available Offers</span>
                    </div>

                    <div className="platforms-grid">
                        {voucher.platforms.map((platform, idx) => {
                            const style = getPlatformStyle(platform.name);
                            const { label, value } = getRewardText(platform.fee);
                            const isBest = idx === bestPlatformIndex;
                            const isSelected = selectedPlatform === platform.name;

                            return (
                                <div
                                    key={idx}
                                    className={`platform-offer ${isBest ? 'best' : ''} ${isSelected ? 'selected' : ''}`}
                                    style={{
                                        position: 'relative',
                                        animation: `fadeInUp 0.3s ease-out ${idx * 0.1}s both`,
                                        minHeight: '105px'
                                    }}
                                >
                                    {isBest && (
                                        <div className="platform-offer__badge" style={{
                                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                            animation: 'pulse 2s infinite',
                                        }}>
                                            🏆 BEST RATE
                                        </div>
                                    )}

                                    {/* Monthly Cap - Top Right */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        textAlign: 'right'
                                    }}>
                                        <div className="platform-offer__metric-label" style={{ fontSize: '0.75rem', marginBottom: '2px' }}>Monthly Cap</div>
                                        <div className="platform-offer__metric-value" style={{ fontSize: '0.9rem' }}>{platform.cap}</div>
                                    </div>

                                    <div className="platform-offer__header" style={{ alignItems: 'flex-start' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '70px' }}>
                                            <div
                                                className="platform-offer__logo"
                                                style={{
                                                    background: style.bg,
                                                    padding: style.padding,
                                                    borderRadius: '12px',
                                                    width: '56px',
                                                    height: '56px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {style.logo ? (
                                                    <img
                                                        src={style.logo}
                                                        alt={platform.name}
                                                        style={{
                                                            maxWidth: '100%',
                                                            maxHeight: '100%',
                                                            objectFit: 'contain'
                                                        }}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                <span style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.2rem',
                                                    display: style.logo ? 'none' : 'flex'
                                                }}>
                                                    {platform.name[0]}
                                                </span>
                                            </div>
                                            <span style={{ fontSize: '1rem', fontWeight: 600, textAlign: 'center', lineHeight: '1.2', color: 'var(--text-primary)' }}>
                                                {platform.name}
                                            </span>
                                        </div>

                                        <div className="platform-offer__details" style={{ marginLeft: '16px', flex: 1 }}>
                                            <div className="platform-offer__metric">
                                                <div className="platform-offer__metric-label">{label}</div>
                                                <div className={`platform-offer__metric-value ${label === 'Savings' ? 'savings' : ''}`}>
                                                    {value}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buy Button - Absolute Bottom Right */}
                                    <a
                                        href={platform.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary"
                                        style={{
                                            position: 'absolute',
                                            bottom: '12px',
                                            right: '12px',
                                            minWidth: '100px',
                                            justifyContent: 'center',
                                            padding: '6px 16px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '8px',
                                            color: 'var(--text-primary)',
                                            transition: 'all 0.2s',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Buy Now <span style={{ opacity: 0.5 }}>↗</span>
                                    </a>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tip Card */}
                    <div className="info-card" style={{ marginTop: '1.5rem' }}>
                        <span className="info-card__icon">💡</span>
                        <div>
                            <h4 className="info-card__title">Did you know?</h4>
                            <p className="info-card__description">
                                Buying vouchers often stacks with credit card rewards. Check your card's specific multiplier for 'Gift Card' purchases before buying.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews and Price History tabs hidden for now */}

                {/* Review Modal */}


                {/* Animation styles */}
                <style>{`
                    @keyframes modalSlideIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px) scale(0.98);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.8; }
                    }
                `}</style>
            </div >
        </div >
    );
};

VoucherModal.propTypes = {
    voucher: PropTypes.shape({
        id: PropTypes.string,
        brand: PropTypes.string.isRequired,
        logo: PropTypes.string,
        category: PropTypes.string,
        site: PropTypes.string,
        expiryDays: PropTypes.number,
        lastUpdated: PropTypes.string,
        platforms: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            fee: PropTypes.string,
            cap: PropTypes.string,
            link: PropTypes.string,
            denominations: PropTypes.array,
        })).isRequired,
    }),
    onClose: PropTypes.func.isRequired,
    selectedPlatform: PropTypes.string,
};

export default VoucherModal;
