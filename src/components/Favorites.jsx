import { useState, useMemo } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useVouchers } from '../hooks/useVouchers';
import { useCreditCards } from '../hooks/useCreditCards';
import VoucherCard from './VoucherCard';
import { Link } from 'react-router-dom';
import { wealthBanking, familyBanking } from '../data/bankingPrograms';
import CardImage from './CardImage';

const Favorites = () => {
    const { favoriteVouchers, favoriteCards, favoriteGuides, isVoucherFavorite, isCardFavorite, toggleFavoriteVoucher, toggleFavoriteCard, toggleFavoriteGuide, totalFavorites } = useFavorites();
    const { vouchers, loading: vouchersLoading } = useVouchers();
    const { creditCards, loading: cardsLoading } = useCreditCards();

    const [activeTab, setActiveTab] = useState('cards');

    // Get Voucher Objects
    const favoritedVoucherObjects = useMemo(() => {
        if (!vouchers) return [];
        return vouchers.filter(v => isVoucherFavorite(v.id));
    }, [vouchers, favoriteVouchers, isVoucherFavorite]);

    // Get Card Objects
    const favoritedCardObjects = useMemo(() => {
        if (!creditCards) return [];
        return creditCards.filter(c => isCardFavorite(c.id));
    }, [creditCards, favoriteCards, isCardFavorite]);

    const loading = vouchersLoading || cardsLoading;

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column', gap: '1rem' }}>
                <div className="loading-spinner"></div>
                <span style={{ color: 'var(--text-secondary)' }}>Loading your favorites...</span>
            </div>
        );
    } // Parse guide IDs to get guide info (format: "bank-type-tier")
    const favoritedGuideObjects = useMemo(() => {
        return favoriteGuides.map(guideId => {
            const [bank, type, tierName] = guideId.split('::');
            const data = type === 'wealth' ? wealthBanking[bank] : familyBanking[bank];
            if (!data) return null;

            if (type === 'wealth') {
                const tier = data.tiers?.find(t => t.name === tierName);
                return tier ? { id: guideId, bank, type, ...tier } : null;
            } else {
                return { id: guideId, bank, type, ...data };
            }
        }).filter(Boolean);
    }, [favoriteGuides]);

    // ...

    const tabs = [
        { id: 'cards', label: '💳 Cards', count: favoriteCards.length },
        { id: 'vouchers', label: '🎟️ Vouchers', count: favoriteVouchers.length },
        { id: 'guides', label: '📚 Guides', count: favoriteGuides.length },
    ];

    return (
        <div style={{ padding: '1rem 0 4rem' }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    ❤️ My Favorites
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                    {totalFavorites > 0
                        ? `You have ${totalFavorites} saved item${totalFavorites > 1 ? 's' : ''}`
                        : 'Save cards, vouchers, and guides for quick access'
                    }
                </p>
            </header>

            {/* Tab Switcher */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: activeTab === tab.id
                                ? '1px solid var(--accent-cyan)'
                                : '1px solid var(--glass-border)',
                            background: activeTab === tab.id
                                ? 'rgba(6, 182, 212, 0.15)'
                                : 'rgba(255,255,255,0.05)',
                            color: activeTab === tab.id
                                ? 'var(--accent-cyan)'
                                : 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: activeTab === tab.id ? '600' : '400',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {tab.label}
                        {tab.count > 0 && (
                            <span style={{
                                background: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--glass-border)',
                                color: activeTab === tab.id ? '#000' : 'var(--text-secondary)',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                            }}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Cards Tab */}
                {activeTab === 'cards' && (
                    <div>
                        {favoritedCardObjects.length === 0 ? (
                            <EmptyState
                                icon="💳"
                                title="No favorite cards yet"
                                description="Browse credit cards and click the heart icon to save them here."
                                link="/know-your-cards"
                                linkText="Browse Cards"
                            />
                        ) : (
                            <div className="favorites-grid">
                                {favoritedCardObjects.map(card => (
                                    <div key={card.id} className="favorite-card glass-panel">
                                        <button
                                            className="favorite-remove-btn"
                                            onClick={() => toggleFavoriteCard(card.id)}
                                            title="Remove from favorites"
                                        >
                                            ✕
                                        </button>
                                        <Link to={`/card-guide/${card.id}`} className="favorite-card-link">
                                            <div className="favorite-card-image">
                                                <CardImage card={card} style={{ maxWidth: '140px', maxHeight: '90px' }} />
                                            </div>
                                            <div className="favorite-card-info">
                                                <h4>{card.name}</h4>
                                                <p className="favorite-card-bank">{card.bank}</p>
                                                <div className="favorite-card-meta">
                                                    <span className="favorite-card-fee">
                                                        {card.annualFee === '₹0' || card.annualFee === 'Nil'
                                                            ? '✓ Free'
                                                            : card.annualFee}
                                                    </span>
                                                    <span className="favorite-card-reward">{card.rewardRate}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Vouchers Tab */}
                {activeTab === 'vouchers' && (
                    <div>
                        {favoritedVoucherObjects.length === 0 ? (
                            <EmptyState
                                icon="🎟️"
                                title="No favorite vouchers yet"
                                description="Browse vouchers and click the heart icon to save them here."
                                link="/"
                                linkText="Browse Vouchers"
                            />
                        ) : (
                            <div className="favorites-grid">
                                {favoritedVoucherObjects.map(voucher => (
                                    <div key={voucher.id} className="favorite-voucher glass-panel">
                                        <button
                                            className="favorite-remove-btn"
                                            onClick={() => toggleFavoriteVoucher(voucher.id)}
                                            title="Remove from favorites"
                                        >
                                            ✕
                                        </button>
                                        <div className="favorite-voucher-content">
                                            <div className="favorite-voucher-logo">
                                                {voucher.logo ? (
                                                    <img src={voucher.logo} alt={voucher.brand} />
                                                ) : (
                                                    <span className="brand-letter">
                                                        {voucher.brand.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="favorite-voucher-info">
                                                <h4>{voucher.brand}</h4>
                                                <p className="favorite-voucher-category">{voucher.category}</p>
                                                <div className="favorite-voucher-platforms">
                                                    {voucher.platforms.slice(0, 3).map((p, i) => (
                                                        <span key={i} className="platform-tag">{p.name}</span>
                                                    ))}
                                                    {voucher.platforms.length > 3 && (
                                                        <span className="platform-tag">+{voucher.platforms.length - 3}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Guides Tab */}
                {activeTab === 'guides' && (
                    <div>
                        {favoritedGuideObjects.length === 0 ? (
                            <EmptyState
                                icon="📚"
                                title="No bookmarked guides yet"
                                description="Browse banking guides and click the bookmark icon to save them."
                                link="/banking-guides"
                                linkText="Browse Guides"
                            />
                        ) : (
                            <div className="favorites-grid favorites-grid-guides">
                                {favoritedGuideObjects.map(guide => (
                                    <div key={guide.id} className="favorite-guide glass-panel">
                                        <button
                                            className="favorite-remove-btn"
                                            onClick={() => toggleFavoriteGuide(guide.id)}
                                            title="Remove from favorites"
                                        >
                                            ✕
                                        </button>
                                        <Link to="/banking-guides" className="favorite-guide-link">
                                            <div className="favorite-guide-header">
                                                <span className="favorite-guide-type">
                                                    {guide.type === 'wealth' ? '💎 Wealth' : '👨‍👩‍👧‍👦 Family'}
                                                </span>
                                                <span className="favorite-guide-bank">{guide.bank}</span>
                                            </div>
                                            <h4>{guide.name}</h4>
                                            {guide.minNRV && (
                                                <p className="favorite-guide-nrv">Min NRV: {guide.minNRV}</p>
                                            )}
                                            {guide.eligibleCards && (
                                                <div className="favorite-guide-cards">
                                                    {guide.eligibleCards.slice(0, 2).map((card, i) => (
                                                        <span key={i} className="card-tag">{card}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Empty state component
const EmptyState = ({ icon, title, description, link, linkText }) => (
    <div className="favorites-empty-state">
        <div className="empty-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link} className="empty-cta">
            {linkText} →
        </Link>
    </div>
);

export default Favorites;
