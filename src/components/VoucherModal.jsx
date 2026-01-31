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
import { useMediaQuery } from '../hooks/useMediaQuery';
import ExpiryBadge from './ExpiryBadge';

const VoucherModal = ({ voucher, onClose, selectedPlatform }) => {
    const toast = useToast();
    const { toggleFavoriteVoucher, isVoucherFavorite } = useFavorites();
    const { getBestPlatform } = useDiscountParser();
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Hooks
    useModalKeyHandler(true, onClose);

    const isFavorite = isVoucherFavorite(voucher?.id);

    // State for selected offer (Mobile Redesign)
    // Initially null so bottom sheet is hidden until interaction
    const [selectedOfferIndex, setSelectedOfferIndex] = useState(null);

    // Calculate best platform index once
    const bestPlatformIndex = useMemo(() => {
        if (!voucher) return -1;
        const { idx, discount } = getBestPlatform(voucher.platforms);
        return discount > 0 ? idx : 0;
    }, [voucher, getBestPlatform]);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const getRewardText = (fee) => {
        if (fee.toLowerCase().includes('discount')) {
            return { label: 'Savings', value: fee.replace('Discount', '').trim(), isSavings: true };
        }
        if (fee === 'None') {
            return { label: 'Fees', value: '0%', isSavings: true };
        }
        if (fee === 'Variable') {
            return { label: 'Savings', value: 'Variable', isSavings: false };
        }
        return { label: 'Savings', value: fee, isSavings: true };
    };

    if (!voucher) return null;

    // --- MOBILE VIEW (New Redesign) ---
    if (isMobile) {
        const selectedOffer = selectedOfferIndex !== null ? voucher.platforms[selectedOfferIndex] : null;
        const selectedReward = selectedOffer ? getRewardText(selectedOffer.fee) : null;
        const selectedStyle = selectedOffer ? getPlatformStyle(selectedOffer.name) : null;

        return (
            <div
                className="modal-overlay mobile-fullscreen-overlay"
                onClick={onClose}
                role="dialog"
                aria-modal="true"
            >
                <div
                    className="modal-container redesign-container"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Dark Header */}
                    <div className="modal-header-redesign">
                        <div className="header-top-row">
                            <div className="header-brand-section">
                                <div className="header-logo-container">
                                    <img
                                        src={ensureHttps(voucher.logo)}
                                        alt={voucher.brand}
                                        className={getLogoClass(voucher.logo)}
                                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(voucher.brand)}&background=random`; }}
                                    />
                                </div>
                                <div className="header-title-container">
                                    <h2 className="header-title">{voucher.brand}</h2>
                                    <div className="header-tags">
                                        <span className="header-tag">{voucher.category}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="header-actions">
                                <button className="icon-btn" onClick={() => {
                                    const url = `${window.location.origin}${window.location.pathname}#/?voucher=${voucher.id}`;
                                    const text = `Check out ${voucher.brand} voucher deals!`;
                                    if (navigator.share) {
                                        navigator.share({ title: voucher.brand, text, url }).catch(() => { });
                                    } else {
                                        navigator.clipboard.writeText(url).then(() => toast.success('Link copied!'));
                                    }
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                                </button>
                                {voucher.site && (
                                    <a href={voucher.site} target="_blank" rel="noopener noreferrer" className="icon-btn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                    </a>
                                )}
                                <button className="icon-btn close-btn" onClick={onClose}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable List */}
                    <div className="modal-content-scrollable">
                        <div className="voucher-list-header">
                            <span className="list-label">Available Offers</span>
                        </div>
                        <div className="voucher-list">
                            {voucher.platforms.map((platform, idx) => {
                                const style = getPlatformStyle(platform.name);
                                const { value, isSavings } = getRewardText(platform.fee);
                                const isSelected = selectedOfferIndex === idx;

                                return (
                                    <div
                                        key={idx}
                                        className={`voucher-list-item ${isSelected ? 'selected' : ''}`}
                                        onClick={() => setSelectedOfferIndex(idx === selectedOfferIndex ? null : idx)}
                                    >
                                        <div className="item-logo-wrapper" style={{ background: style.bg }}>
                                            {style.logo ? <img src={style.logo} alt={platform.name} /> : <span>{platform.name[0]}</span>}
                                        </div>
                                        <div className="item-details">
                                            <div className="item-name-row">
                                                <span className="item-name">{platform.name}</span>
                                                {['iShop', 'Maximize', 'Gyftr', 'MagicPin', 'SaveSage'].some(p => platform.name.toLowerCase().includes(p.toLowerCase())) && (
                                                    <span className="live-badge">● LIVE</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="item-right">
                                            <div className="item-metrics">
                                                <span className="metric-label">{isSavings ? 'SAVINGS' : 'FEES'}</span>
                                                <span className={`metric-value ${isSavings ? 'green' : ''}`}>{value}</span>
                                            </div>
                                            <div className={`chevron ${isSelected ? 'rotated' : ''}`}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sticky Footer - Only shown if an offer is selected */}
                    {selectedOffer && (
                        <div className="modal-bottom-sheet">
                            <div className="sheet-handle"></div>
                            <div className="sheet-content">
                                <div className="sheet-header">
                                    <div className="sheet-logo" style={{ background: selectedStyle.bg }}>
                                        {selectedStyle.logo ? <img src={selectedStyle.logo} alt={selectedOffer.name} /> : <span>{selectedOffer.name[0]}</span>}
                                    </div>
                                    <div className="sheet-title-col">
                                        <h3>{selectedOffer.name} Offer</h3>
                                        <div className="current-live-badge"><span className="dot"></span> CURRENTLY LIVE</div>
                                    </div>
                                    <div className="sheet-savings-col">
                                        <span className="label">SAVINGS</span>
                                        <span className="value">{selectedReward.value}</span>
                                        {selectedReward.isSavings && <span className="off-text">OFF</span>}
                                    </div>
                                </div>
                                <div className="sheet-stats-grid">
                                    <div className="stat-box">
                                        <span className="stat-label">FEES</span>
                                        <span className="stat-value">{selectedOffer.fee === 'None' ? '0%' : selectedOffer.fee}</span>
                                    </div>
                                    <div className="stat-box">
                                        <span className="stat-label">MONTHLY CAP</span>
                                        <span className="stat-value">{selectedOffer.cap || 'No Cap'}</span>
                                    </div>
                                </div>
                                <a href={selectedOffer.link} target="_blank" rel="noopener noreferrer" className="sheet-buy-btn">
                                    Buy Now <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // --- DESKTOP VIEW (Restored Original) ---
    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
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
                {/* Desktop Header */}
                <div className="modal-header" style={{
                    padding: '28px 28px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '24px',
                    marginBottom: '10px'
                }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
                        <div className="modal-header__logo" style={{
                            width: '80px', height: '80px', borderRadius: '20px', padding: '14px',
                            background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                            <img
                                src={ensureHttps(voucher.logo)}
                                alt=""
                                className={getLogoClass(voucher.logo)}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(voucher.brand)}&background=random`; }}
                            />
                        </div>
                        <div>
                            <h2 className="modal-header__title" style={{ fontSize: '1.75rem', fontWeight: '700', margin: '0 0 8px 0', lineHeight: 1.1 }}>{voucher.brand}</h2>
                            <span className="modal-header__tag" style={{
                                fontSize: '0.85rem', padding: '6px 12px', borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)', border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}>{voucher.category}</span>
                        </div>
                    </div>
                    {/* Desktop Actions */}
                    <div className="modal-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <button
                            onClick={() => {
                                const url = `${window.location.origin}${window.location.pathname}#/?voucher=${voucher.id}`;
                                const text = `Check out ${voucher.brand} voucher deals!`;
                                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                            }}
                            className="btn-header-action"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderRadius: '12px',
                                border: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.03)', color: 'var(--text-primary)', cursor: 'pointer', height: '48px'
                            }}
                        >
                            Share
                        </button>
                        {voucher.site && (
                            <a href={voucher.site} target="_blank" rel="noopener noreferrer" className="btn-header-action"
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '4px', padding: '0 16px', borderRadius: '12px',
                                    border: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.03)', color: 'var(--text-primary)', textDecoration: 'none', height: '48px'
                                }}>
                                Visit Site ↗
                            </a>
                        )}
                        <button onClick={onClose} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>×</button>
                    </div>
                </div>

                {/* Desktop Content - List View (Original) */}
                <div className="modal-content" style={{ padding: '0 28px 28px' }}>
                    <div className="platforms-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {voucher.platforms.map((platform, idx) => {
                            const style = getPlatformStyle(platform.name);
                            const { label, value } = getRewardText(platform.fee);
                            const isBest = idx === bestPlatformIndex;

                            return (
                                <div key={idx} className={`platform-row ${isBest ? 'best' : ''}`}
                                    style={{
                                        display: 'flex', alignItems: 'center', padding: '20px 24px', borderRadius: '16px',
                                        background: isBest ? 'rgba(34, 197, 94, 0.06)' : 'var(--item-bg)',
                                        border: isBest ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid var(--item-border)'
                                    }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{
                                            width: '56px', height: '56px', borderRadius: '16px', background: style.bg,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                                        }}>
                                            {style.logo ? <img src={style.logo} alt={platform.name} style={{ maxWidth: '75%', maxHeight: '75%', objectFit: 'contain' }} /> : <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' }}>{platform.name[0]}</span>}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{platform.name}</div>
                                            {/* Live Tag - Preserving original desktop logic which added it conditionally */}
                                            {['iShop', 'Maximize', 'Gyftr', 'MagicPin', 'SaveSage'].some(p => platform.name.toLowerCase().includes(p.toLowerCase())) && (
                                                <div style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '100px',
                                                    background: '#bbf7d0', color: '#166534', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.02em'
                                                }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }}></div>
                                                    LIVE
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}></div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '80px' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>{label}</span>
                                            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: label === 'Savings' ? '#22c55e' : 'var(--text-primary)' }}>{value}</span>
                                        </div>
                                        {/* Buy Button */}
                                        <a href={platform.link} target="_blank" rel="noopener noreferrer" className="btn-buy"
                                            style={{
                                                padding: '12px 24px', borderRadius: '10px', background: '#0F172A',
                                                border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', fontWeight: '600',
                                                display: 'flex', alignItems: 'center', gap: '8px'
                                            }}>
                                            Buy Now ↗
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

VoucherModal.propTypes = {
    voucher: PropTypes.shape({
        id: PropTypes.string,
        brand: PropTypes.string.isRequired,
        logo: PropTypes.string,
        category: PropTypes.string,
        site: PropTypes.string,
        platforms: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            fee: PropTypes.string,
            cap: PropTypes.string,
            link: PropTypes.string,
        })).isRequired,
    }),
    onClose: PropTypes.func.isRequired,
    selectedPlatform: PropTypes.string,
};

export default VoucherModal;
