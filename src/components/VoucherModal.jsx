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
import { getLogoClass } from '../utils/logoUtils';
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
        if (fee === 'Variable') {
            return { label: 'Savings', value: 'Variable' };
        }
        // Default fallthrough - changed from 'Fees' to 'Savings' as requested
        return { label: 'Savings', value: fee };
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
                {/* Header - Refactored for clean layout */}
                <div className="modal-header" style={{
                    padding: '28px 28px 10px', // Increased padding
                    display: 'flex',
                    alignItems: 'center', // Changed from flex-start to center for better alignment with multi-line titles
                    justifyContent: 'space-between',
                    gap: '24px',
                    marginBottom: '10px'
                }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
                        <div className="modal-header__logo" style={{
                            width: '80px', // Slightly larger
                            height: '80px',
                            borderRadius: '20px',
                            padding: '14px',
                            background: 'white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <img
                                src={ensureHttps(voucher.logo)}
                                alt=""
                                className={getLogoClass(voucher.logo)}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(voucher.brand)}&background=random`;
                                }}
                            />
                        </div>
                        <div>
                            <h2 className="modal-header__title" style={{
                                fontSize: '1.75rem', // Larger title
                                fontWeight: '700',
                                margin: '0 0 8px 0',
                                lineHeight: 1.1,
                                wordBreak: 'break-word' // Ensure long words don't overflow
                            }}>{voucher.brand}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="modal-header__tag" style={{
                                    fontSize: '0.85rem',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>{voucher.category}</span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
                        {/* Share Button - Boxy Style */}
                        <button
                            onClick={() => {
                                const url = `${window.location.origin}${window.location.pathname}#/?voucher=${voucher.id}`;
                                const text = `Check out ${voucher.brand} voucher deals on Card Perks! 🎫💰`;
                                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                            }}
                            className="btn-header-action"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255, 255, 255, 0.03)',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                height: '48px'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                            <span style={{ fontWeight: '500' }}>Share</span>
                        </button>

                        {/* Visit Site - Boxy Style */}
                        {voucher.site && (
                            <a
                                href={voucher.site}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-header-action"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    padding: '0 16px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    color: 'var(--text-primary)',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    height: '48px',
                                    lineHeight: 1.2
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Visit Site</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                </div>
                            </a>
                        )}

                        <button
                            onClick={onClose}
                            style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '2rem',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                marginLeft: '8px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Content - List View */}
                <div className="modal-content" style={{ padding: '0 28px 28px' }}>

                    <div className="platforms-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {voucher.platforms.map((platform, idx) => {
                            const style = getPlatformStyle(platform.name);
                            const { label, value } = getRewardText(platform.fee);
                            const isBest = idx === bestPlatformIndex;
                            const isSelected = selectedPlatform === platform.name;

                            return (
                                <div
                                    key={idx}
                                    className={`platform-row ${isBest ? 'best' : ''}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '20px 24px',
                                        borderRadius: '16px',
                                        background: isBest ? 'rgba(34, 197, 94, 0.06)' : 'var(--item-bg)',
                                        border: isBest ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid var(--item-border)',
                                        position: 'relative',
                                        transition: 'transform 0.2s ease',
                                        animation: `fadeIn 0.3s ease-out ${idx * 0.05}s both`
                                    }}
                                >
                                    {/* Left: Logo & Name */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '16px',
                                            background: style.bg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            flexShrink: 0
                                        }}>
                                            {style.logo ? (
                                                <img src={style.logo} alt={platform.name} style={{ maxWidth: '75%', maxHeight: '75%', objectFit: 'contain' }} />
                                            ) : (
                                                <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>{platform.name[0]}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{platform.name}</div>
                                            {['iShop', 'Maximize', 'Gyftr', 'MagicPin', 'SaveSage'].some(p => platform.name.toLowerCase().includes(p.toLowerCase())) && (
                                                <div style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    padding: '2px 8px',
                                                    borderRadius: '100px',
                                                    background: '#bbf7d0',
                                                    color: '#166534',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                    letterSpacing: '0.02em'
                                                }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }}></div>
                                                    LIVE
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Spacer to push everything else right */}
                                    <div style={{ flex: 1 }}></div>

                                    {/* Right Group: Metrics + Button */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                                        {/* Savings */}
                                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '80px' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>{label}</span>
                                            <span style={{
                                                fontSize: '1.1rem',
                                                fontWeight: '700',
                                                color: label === 'Savings' ? '#22c55e' : 'var(--text-primary)',
                                                letterSpacing: '-0.02em'
                                            }}>{value}</span>
                                        </div>

                                        {/* Monthly Cap */}
                                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '90px' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Monthly Cap</span>
                                            <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>{platform.cap || '-'}</span>
                                        </div>

                                        {/* Buy Button */}
                                        <a
                                            href={platform.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-buy"
                                            style={{
                                                padding: '12px 24px',
                                                borderRadius: '10px',
                                                background: '#0F172A',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: '#fff',
                                                textDecoration: 'none',
                                                fontWeight: '600',
                                                fontSize: '0.95rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                transition: 'all 0.2s',
                                                whiteSpace: 'nowrap',
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.background = '#1e293b';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.background = '#0F172A';
                                            }}
                                        >
                                            Buy Now ↗
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tip Card */}
                    <div className="info-card" style={{
                        marginTop: '2rem',
                        padding: '16px',
                        borderRadius: '12px',
                        background: 'var(--bg-secondary)',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: '#FDE047',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            💡
                        </div>
                        <div>
                            <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>Did you know?</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
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
