import React from 'react';
import PropTypes from 'prop-types';
import { getPlatformStyle } from '../utils/platformLogos';
import { Link } from 'react-router-dom';
import { useModalKeyHandler } from '../hooks/useModalKeyHandler';
import { useDiscountParser } from '../hooks/useDiscountParser';
import { useReviews } from '../hooks/useReviews';
import { usePriceHistory } from '../hooks/usePriceHistory';
import RatingStars from './RatingStars';
import ReviewModal from './ReviewModal';
import ReviewsList from './ReviewsList';
import PriceHistoryChart from './PriceHistoryChart';
import ExpiryBadge from './ExpiryBadge';

const VoucherModal = ({ voucher, onClose, selectedPlatform }) => {
    if (!voucher) return null;

    const [activeTab, setActiveTab] = React.useState('offers'); // 'offers', 'reviews', 'history'
    const [showReviewModal, setShowReviewModal] = React.useState(false);
    const [copiedLink, setCopiedLink] = React.useState(null);
    const [selectedPlatformForHistory, setSelectedPlatformForHistory] = React.useState(
        voucher.platforms[0]?.name || null
    );

    const copyLink = (link, platformName) => {
        navigator.clipboard.writeText(link).then(() => {
            setCopiedLink(platformName);
            setTimeout(() => setCopiedLink(null), 2000);
        });
    };

    // Use custom modal keyboard handler hook
    useModalKeyHandler(true, onClose);

    // Use discount parser hook
    const { getBestPlatform } = useDiscountParser();

    // Use reviews hook
    const { reviews, averageRating, reviewCount, addReview, markHelpful } = useReviews(voucher.id);

    // Use price history hook
    const { priceHistory } = usePriceHistory(voucher.id);

    // Calculate best platform ID/Index
    const bestPlatformIndex = React.useMemo(() => {
        const { idx, discount } = getBestPlatform(voucher.platforms);
        // Only highlight if there is actually a discount > 0
        return discount > 0 ? idx : -1;
    }, [voucher, getBestPlatform]);

    const getRewardText = (fee) => {
        if (fee.toLowerCase().includes('discount')) {
            return { label: 'Savings', value: fee.replace('Discount', '').trim() };
        }
        if (fee === 'None') {
            return { label: 'Fees', value: '0%' };
        }
        return { label: 'Fees', value: fee };
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-container glass-panel"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="modal-header">
                    <div className="modal-header__logo">
                        <img
                            src={voucher.logo}
                            alt={voucher.brand}
                        />
                    </div>
                    <div className="modal-header__info" style={{ flex: 1 }}>
                        <h2 className="modal-header__title">{voucher.brand}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                            <span className="modal-header__tag">{voucher.category}</span>
                            {voucher.expiryDays && voucher.lastUpdated && (
                                <ExpiryBadge
                                    lastUpdated={voucher.lastUpdated}
                                    expiryDays={voucher.expiryDays}
                                    size="xs"
                                />
                            )}
                            {averageRating > 0 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <RatingStars rating={averageRating} size="xs" reviewCount={reviewCount} />
                                </div>
                            )}
                        </div>
                    </div>
                    {voucher.site && (
                        <a
                            href={voucher.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="launch-site-btn"
                        >
                            <span className="btn-text-desktop">Launch Site</span>
                            <span className="btn-text-mobile">Site</span>
                            <span className="btn-icon">↗</span>
                        </a>
                    )}
                    <button
                        onClick={onClose}
                        className="btn-close"
                    >
                        ×
                    </button>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    borderBottom: '1px solid var(--modal-border)',
                    padding: '0 var(--space-lg)',
                    gap: '4px'
                }}>
                    {[
                        { id: 'offers', label: 'Offers', icon: '💰' },
                        { id: 'reviews', label: `Reviews${reviewCount > 0 ? ` (${reviewCount})` : ''}`, icon: '⭐' },
                        { id: 'history', label: 'Price History', icon: '📈' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '12px 16px',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab.id ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                                color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                                fontWeight: activeTab === tab.id ? 600 : 400,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all var(--duration-normal)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div className="modal-body">
                    {activeTab === 'offers' && (
                        <>
                            <div className="modal-section-header">AVAILABLE OFFERS</div>

                            <div className="modal-content">
                                {voucher.platforms.map((platform, idx) => {
                                    const { label, value } = getRewardText(platform.fee);
                                    const style = getPlatformStyle(platform.name);

                                    const isBest = idx === bestPlatformIndex;
                                    const isSelected = selectedPlatform === platform.name;

                                    const platformClasses = [
                                        'platform-offer',
                                        isBest && 'best',
                                        isSelected && 'selected'
                                    ].filter(Boolean).join(' ');

                                    return (
                                        <div key={idx} className={platformClasses}>
                                            {isBest && (
                                                <div className="platform-offer__badge">
                                                    BEST RATE
                                                </div>
                                            )}

                                            <div className="platform-offer__header">
                                                {/* Platform Logo */}
                                                <div
                                                    className="platform-offer__logo"
                                                    style={{
                                                        background: style.bg,
                                                        padding: style.padding
                                                    }}
                                                >
                                                    {style.logo ? (
                                                        <img src={style.logo} alt={platform.name} />
                                                    ) : (
                                                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '1.2rem' }}>{platform.name[0]}</span>
                                                    )}
                                                </div>

                                                {/* Details */}
                                                <div className="platform-offer__details">
                                                    <div className="platform-offer__metric">
                                                        <div className="platform-offer__metric-label">{label}</div>
                                                        <div className={`platform-offer__metric-value ${label === 'Savings' ? 'savings' : ''}`}>
                                                            {value}
                                                        </div>
                                                    </div>
                                                    <div className="platform-offer__metric">
                                                        <div className="platform-offer__metric-label">Monthly Cap</div>
                                                        <div className="platform-offer__metric-value">{platform.cap}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Denominations & Button */}
                                            <div className="platform-offer__footer">
                                                <div className="platform-offer__denominations">
                                                    {platform.denominations.slice(0, 4).map(d => (
                                                        <span key={d} className="denomination-badge">
                                                            ₹{d}
                                                        </span>
                                                    ))}
                                                    {platform.denominations.length > 4 && (
                                                        <span className="text-secondary text-xs">+more</span>
                                                    )}
                                                </div>

                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button
                                                        onClick={() => copyLink(platform.link, platform.name)}
                                                        title="Copy link"
                                                        style={{
                                                            padding: '8px 12px',
                                                            borderRadius: '8px',
                                                            border: copiedLink === platform.name ? '1px solid #22c55e' : '1px solid var(--glass-border)',
                                                            background: copiedLink === platform.name ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                                                            color: copiedLink === platform.name ? '#22c55e' : 'var(--text-secondary)',
                                                            cursor: 'pointer',
                                                            fontSize: '0.8rem',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        {copiedLink === platform.name ? '✓ Copied!' : '📋 Copy'}
                                                    </button>
                                                    <a
                                                        href={platform.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-secondary"
                                                    >
                                                        Buy on {platform.name} ↗
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Did you know section */}
                            <div className="info-card">
                                <span className="info-card__icon">💡</span>
                                <div>
                                    <h4 className="info-card__title">Did you know?</h4>
                                    <p className="info-card__description">
                                        Buying vouchers often stacks with credit card rewards. Check your card's specific multiplier for 'Gift Card' purchases before buying.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'reviews' && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div className="modal-section-header">
                                    USER REVIEWS {reviewCount > 0 && `(${reviewCount})`}
                                </div>
                                <button
                                    onClick={() => setShowReviewModal(true)}
                                    className="btn-primary"
                                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                                >
                                    Write Review
                                </button>
                            </div>

                            {averageRating > 0 && (
                                <div style={{
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: 'var(--space-md)',
                                    marginBottom: 'var(--space-lg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-lg)'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                                            {averageRating.toFixed(1)}
                                        </div>
                                        <RatingStars rating={averageRating} size="md" />
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                            Based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <ReviewsList reviews={reviews} onMarkHelpful={markHelpful} />
                        </>
                    )}

                    {activeTab === 'history' && (
                        <>
                            <div className="modal-section-header">PRICE HISTORY</div>

                            {voucher.platforms.length > 1 && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
                                        Select Platform:
                                    </label>
                                    <select
                                        value={selectedPlatformForHistory}
                                        onChange={(e) => setSelectedPlatformForHistory(e.target.value)}
                                        className="sort-dropdown"
                                        style={{ width: '100%', maxWidth: '300px' }}
                                    >
                                        {voucher.platforms.map((platform, idx) => (
                                            <option key={idx} value={platform.name}>
                                                {platform.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {selectedPlatformForHistory && (
                                <PriceHistoryChart
                                    priceHistory={priceHistory}
                                    platformName={selectedPlatformForHistory}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Review Modal */}
            {showReviewModal && (
                <ReviewModal
                    voucher={voucher}
                    onClose={() => setShowReviewModal(false)}
                    onSubmit={addReview}
                />
            )}
        </div>
    );
};

VoucherModal.propTypes = {
    voucher: PropTypes.shape({
        id: PropTypes.string,
        brand: PropTypes.string.isRequired,
        logo: PropTypes.string,
        category: PropTypes.string.isRequired,
        site: PropTypes.string,
        expiryDays: PropTypes.number,
        lastUpdated: PropTypes.string,
        platforms: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            fee: PropTypes.string,
            cap: PropTypes.string,
            link: PropTypes.string,
            denominations: PropTypes.arrayOf(PropTypes.string),
        })).isRequired,
    }),
    onClose: PropTypes.func.isRequired,
    selectedPlatform: PropTypes.string,
};

export default VoucherModal;
