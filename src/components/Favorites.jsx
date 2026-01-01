import { useState, useMemo } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useVouchers } from '../hooks/useVouchers';
import { useCreditCards } from '../hooks/useCreditCards';
import { useGuides } from '../hooks/useGuides';
import VoucherCard from './VoucherCard';
import { Link } from 'react-router-dom';
import { wealthBanking, familyBanking } from '../data/bankingPrograms';
import CardImage from './CardImage';
import LoadingSpinner from './LoadingSpinner';

const Favorites = () => {
    const { favoriteVouchers, favoriteCards, favoriteGuides, isVoucherFavorite, isCardFavorite, toggleFavoriteVoucher, toggleFavoriteCard, toggleFavoriteGuide, totalFavorites } = useFavorites();
    const { vouchers, loading: vouchersLoading } = useVouchers();
    const { creditCards, loading: cardsLoading } = useCreditCards();
    const { guides, loading: guidesLoading } = useGuides();


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

    // Parse guide IDs to get guide info
    // Handles both community guides (simple IDs like "1", "2") and banking guides (format: "bank::type::tier")
    const favoritedGuideObjects = useMemo(() => {
        return favoriteGuides.map(guideId => {
            // First, check if it's a community guide (simple ID)
            const communityGuide = guides.find(g => g.id === guideId);
            if (communityGuide) {
                // Ensure required fields
                return {
                    id: guideId,
                    type: 'community',
                    title: communityGuide.title,
                    description: communityGuide.description,
                    author: communityGuide.author,
                    link: communityGuide.link,
                    tags: communityGuide.tags
                };
            }

            // Otherwise, try parsing as banking guide (format: "bank::type::tierName")
            const parts = guideId.split('::');
            if (parts.length >= 2) {
                const [bank, type, tierName] = parts;
                const data = type === 'wealth' ? wealthBanking[bank] : familyBanking[bank];
                if (!data) return null;

                if (type === 'wealth') {
                    const tier = data.tiers?.find(t => t.name === tierName);
                    return tier ? { id: guideId, bank, type, ...tier } : null;
                } else {
                    return { id: guideId, bank, type, ...data };
                }
            }

            return null;
        }).filter(Boolean);
    }, [favoriteGuides, guides]);

    // Separate community guides from banking guides for counts
    const communityGuideCount = favoritedGuideObjects.filter(g => g.type === 'community').length;
    const bankingGuideCount = favoritedGuideObjects.filter(g => g.type !== 'community').length;

    // Group cards by bank for stats - MUST be before early return to maintain hook order
    const cardsByBank = useMemo(() => {
        const grouped = {};
        favoritedCardObjects.forEach(card => {
            if (!grouped[card.bank]) grouped[card.bank] = [];
            grouped[card.bank].push(card);
        });
        return grouped;
    }, [favoritedCardObjects]);

    // Group vouchers by category for stats - MUST be before early return to maintain hook order
    const vouchersByCategory = useMemo(() => {
        const grouped = {};
        favoritedVoucherObjects.forEach(v => {
            const cat = v.category || 'Other';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(v);
        });
        return grouped;
    }, [favoritedVoucherObjects]);

    const loading = vouchersLoading || cardsLoading || guidesLoading;

    // Tabs definition - can use counts now since all hooks are called
    const tabs = [
        { id: 'cards', label: '💳 Cards', count: favoriteCards.length },
        { id: 'vouchers', label: '🎟️ Vouchers', count: favoriteVouchers.length },
        { id: 'guides', label: '📚 Guides', count: communityGuideCount },
        { id: 'banking', label: '🏦 Banking', count: bankingGuideCount },
    ];

    const handleCompareCards = () => {
        // Navigate to compare with favorite card IDs
        const cardIds = favoriteCards.join(',');
        window.location.href = `/#/compare-cards?cards=${cardIds}`;
    };



    // Loading state - AFTER all hooks
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column', gap: '1rem' }}>
                <LoadingSpinner size="lg" />
                <span style={{ color: 'var(--text-secondary)' }}>Loading your favorites...</span>
            </div>
        );
    }

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



            {/* Stats Cards */}
            {totalFavorites > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem',
                    maxWidth: '900px',
                    margin: '0 auto 2rem'
                }}>
                    {/* Cards Stat */}
                    <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>💳</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                            {favoriteCards.length}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            Cards saved
                        </div>
                    </div>

                    {/* Vouchers Stat */}
                    <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🎟️</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-pink)' }}>
                            {favoriteVouchers.length}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            Vouchers saved
                        </div>
                    </div>

                    {/* Banking Stat */}
                    <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🏦</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-green)' }}>
                            {bankingGuideCount}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            Banking saved
                        </div>
                    </div>

                    {/* Community Guides Stat - Only show if there are community guides */}
                    {communityGuideCount > 0 && (
                        <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>📚</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-violet)' }}>
                                {communityGuideCount}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                Community guides
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Quick Actions */}
            {totalFavorites > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {favoriteCards.length >= 2 && (
                        <button
                            onClick={handleCompareCards}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                background: 'linear-gradient(90deg, var(--accent-violet), var(--accent-pink))',
                                border: 'none',
                                color: '#fff',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            ⚖️ Compare Cards ({favoriteCards.length})
                        </button>
                    )}
                    <button
                        onClick={() => {
                            const exportData = {
                                cards: favoritedCardObjects.map(c => c.name),
                                vouchers: favoritedVoucherObjects.map(v => v.brand),
                                exportedAt: new Date().toISOString()
                            };
                            const text = `My Favorites\n\nCards (${exportData.cards.length}):\n${exportData.cards.map(c => `• ${c}`).join('\n')}\n\nVouchers (${exportData.vouchers.length}):\n${exportData.vouchers.map(v => `• ${v}`).join('\n')}`;
                            navigator.clipboard.writeText(text);
                            alert('Favorites list copied to clipboard!');
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-primary)',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}
                    >
                        📋 Export List
                    </button>
                </div>
            )}

            {/* Recently Added - Quick Preview */}
            {totalFavorites > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        fontSize: '1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        🕐 Recently Added
                    </h3>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        overflowX: 'auto',
                        paddingBottom: '0.5rem'
                    }}>
                        {/* Show last 3 cards */}
                        {favoritedCardObjects.slice(-3).reverse().map(card => (
                            <Link
                                key={`recent-card-${card.id}`}
                                to={`/card-guide/${card.id}`}
                                className="glass-panel"
                                style={{
                                    minWidth: '200px',
                                    padding: '1rem',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    background: 'rgba(6, 182, 212, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem'
                                }}>💳</div>
                                <div>
                                    <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                                        {card.name.length > 20 ? card.name.slice(0, 20) + '...' : card.name}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{card.bank}</div>
                                </div>
                            </Link>
                        ))}
                        {/* Show last 2 vouchers */}
                        {favoritedVoucherObjects.slice(-2).reverse().map(voucher => (
                            <Link
                                key={`recent-voucher-${voucher.id}`}
                                to={`/voucher/${voucher.id}`}
                                className="glass-panel"
                                style={{
                                    minWidth: '180px',
                                    padding: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    textDecoration: 'none'
                                }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    background: 'rgba(236, 72, 153, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem'
                                }}>🎟️</div>
                                <div>
                                    <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                                        {voucher.brand}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{voucher.category}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

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

                {/* Guides Tab - Community Guides only */}
                {activeTab === 'guides' && (
                    <div>
                        {communityGuideCount === 0 ? (
                            <EmptyState
                                icon="📚"
                                title="No saved community guides"
                                description="Browse guides and click the heart icon to save them."
                                link="/guides"
                                linkText="Browse Guides"
                            />
                        ) : (
                            <div className="favorites-grid favorites-grid-guides">
                                {favoritedGuideObjects
                                    .filter(guide => guide.type === 'community')
                                    .map(guide => (
                                        <div key={guide.id} className="favorite-guide glass-panel">
                                            <button
                                                className="favorite-remove-btn"
                                                onClick={() => toggleFavoriteGuide(guide.id)}
                                                title="Remove from favorites"
                                            >
                                                ✕
                                            </button>
                                            <a
                                                href={guide.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="favorite-guide-link"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <div className="favorite-guide-header">
                                                    <span className="favorite-guide-type">📝 Community</span>
                                                    <span className="favorite-guide-bank">{guide.author}</span>
                                                </div>
                                                <h4>{guide.title}</h4>
                                                {guide.tags && (
                                                    <div className="favorite-guide-cards" style={{ marginTop: '0.5rem' }}>
                                                        {guide.tags.slice(0, 2).map((tag, i) => (
                                                            <span key={i} className="card-tag">{tag}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Banking Tab - Wealth/Family Banking Guides */}
                {activeTab === 'banking' && (
                    <div>
                        {bankingGuideCount === 0 ? (
                            <EmptyState
                                icon="🏦"
                                title="No saved banking guides"
                                description="Browse banking guides and click the bookmark icon to save them."
                                link="/banking-guides"
                                linkText="Browse Banking Guides"
                            />
                        ) : (
                            <div className="favorites-grid favorites-grid-guides">
                                {favoritedGuideObjects
                                    .filter(guide => guide.type !== 'community')
                                    .map(guide => (
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
