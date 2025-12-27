import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';
import { creditCards } from '../data/creditCards';
import CardImage from './CardImage';
import { useFavorites } from '../context/FavoritesContext';

const CreditCardComparison = ({ view = 'grid', selectedCards = [], toggleCardSelection, clearSelection }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeBank, setActiveBank] = useState('All');
    const [modalCard, setModalCard] = useState(null);
    const [sortBy, setSortBy] = useState('recommended');
    const { isCardFavorite, toggleFavoriteCard } = useFavorites();

    const getCardDetails = (id) => creditCards.find(card => card.id === id);

    const openModal = (card, e) => {
        e.stopPropagation();
        setModalCard(card);
    };

    const closeModal = () => setModalCard(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (modalCard) {
            window.addEventListener('keydown', handleKeyDown);
            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            // Restore scrolling
            document.body.style.overflow = 'unset';
        };
    }, [modalCard]);

    // Handle Escape key to clear selection when not in modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && !modalCard && selectedCards.length > 0 && clearSelection) {
                clearSelection();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalCard, selectedCards, clearSelection]);

    // Parse fee to number for sorting
    const parseFee = (fee) => {
        if (!fee) return 9999;
        const lower = fee.toLowerCase();
        if (lower.includes('lifetime free') || lower.includes('₹0') || lower === 'free') return 0;
        const match = fee.match(/₹?([\d,]+)/);
        return match ? parseInt(match[1].replace(/,/g, '')) : 9999;
    };

    // Parse reward rate to number
    const parseReward = (rate) => {
        if (!rate) return 0;
        const match = rate.match(/([\d.]+)%/);
        return match ? parseFloat(match[1]) : 0;
    };

    const filteredCards = useMemo(() => {
        let cards = creditCards;

        if (searchTerm) {
            const fuse = new Fuse(cards, {
                keys: ['name', 'bank', 'tags'],
                threshold: 0.3
            });
            cards = fuse.search(searchTerm).map(res => res.item);
        }

        return cards.filter(card => {
            // Re-apply other filters on the search results
            // Bank Filter
            if (activeBank !== 'All' && card.bank !== activeBank) return false;

            if (activeFilter === 'All') return true;

            // Lifetime Free: Check "Lifetime Free" or "₹0" in fee
            if (activeFilter === 'Lifetime Free') {
                const feeLower = card.annualFee?.toLowerCase() || '';
                return feeLower.includes('lifetime free') || feeLower.includes('₹0') || feeLower === 'free';
            }

            // Low Forex: Cards with 0%, 1%, 1.5%, or 2% markup
            if (activeFilter === 'Low Forex') {
                const fxNum = parseFloat(card.fxMarkup?.replace('%', '') || '100');
                return fxNum <= 2;
            }

            // Fuel: Check category or features
            if (activeFilter === 'Fuel') {
                if (card.category === 'Fuel') return true;
                const lower = (card.name + ' ' + card.features?.join(' ')).toLowerCase();
                return lower.includes('fuel') || lower.includes('petrol') || lower.includes('bpcl') || lower.includes('hpcl') || lower.includes('iocl');
            }

            // Shopping: Check category or features
            if (activeFilter === 'Shopping') {
                if (card.category === 'Shopping') return true;
                const lower = (card.name + ' ' + card.bestFor + ' ' + card.features?.join(' ')).toLowerCase();
                return lower.includes('shopping') || lower.includes('amazon') || lower.includes('flipkart') || lower.includes('online shop');
            }

            // Default: match by category
            return card.category === activeFilter;
        });
    }, [searchTerm, activeBank, activeFilter]);

    const filters = ['All', 'Cashback', 'Travel', 'Premium', 'Fuel', 'Shopping', 'Low Forex', 'Lifetime Free'];

    // Feature search suggestions
    const featureSuggestions = ['lounge access', 'golf', 'fuel surcharge', 'movie', 'milestone', 'airport', 'dining'];

    // Get unique banks
    const banks = ['All', ...new Set(creditCards.map(card => card.bank))].sort();

    // Sort cards based on selected sort option
    const sortedCards = useMemo(() => {
        let cards = [...filteredCards];
        switch (sortBy) {
            case 'fee-low':
                cards.sort((a, b) => parseFee(a.annualFee) - parseFee(b.annualFee));
                break;
            case 'fee-high':
                cards.sort((a, b) => parseFee(b.annualFee) - parseFee(a.annualFee));
                break;
            case 'rewards':
                cards.sort((a, b) => parseReward(b.rewardRate) - parseReward(a.rewardRate));
                break;
            case 'alphabetical':
                cards.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // recommended - no sort, keep original order
                break;
        }
        return cards;
    }, [filteredCards, sortBy]);

    return (
        <div style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
            <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    {view === 'grid' ? 'Know Your Cards' : 'Compare Credit Cards'}
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {view === 'grid'
                        ? 'Explore credit cards and select up to 4 to compare.'
                        : 'Compare the features and benefits of your selected cards.'}
                </p>
            </header>

            {/* Detailed View: Card Selection Grid */}
            {view === 'grid' && (
                <>
                    {/* Search & Filter Section */}

                    {/* Search Bar - Moved out of the wrapper to allow sticky positioning relative to main container */}
                    <div className="sticky-search-bar pill-search-wrapper" style={{ position: 'relative', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
                        <input
                            type="text"
                            placeholder="Search cards by name or bank..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                paddingLeft: '45px',
                                borderRadius: '50px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                        />
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                position: 'absolute',
                                left: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-secondary)'
                            }}
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                style={{
                                    position: 'absolute',
                                    right: '15px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                    fontSize: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div style={{ maxWidth: '800px', margin: '0 auto 3rem auto' }}>
                        {/* Feature/Benefit Quick Search */}
                        {!searchTerm && (
                            <div style={{ marginBottom: '1rem' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textAlign: 'center' }}>
                                    🔍 Try searching by benefit:
                                </p>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {featureSuggestions.map(feature => (
                                        <button
                                            key={feature}
                                            onClick={() => setSearchTerm(feature)}
                                            style={{
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                                background: 'rgba(139, 92, 246, 0.1)',
                                                color: 'var(--accent-purple)',
                                                cursor: 'pointer',
                                                fontSize: '0.75rem',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {feature}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Filter Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: '1px solid',
                                        borderColor: activeFilter === filter ? 'var(--accent-cyan)' : 'var(--glass-border)',
                                        background: activeFilter === filter ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                                        color: activeFilter === filter ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: activeFilter === filter ? '500' : '400',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* Bank & Sort */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '1rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <select
                                value={activeBank}
                                onChange={(e) => setActiveBank(e.target.value)}
                                style={{
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="All">All Banks</option>
                                {banks.filter(b => b !== 'All').map(bank => (
                                    <option key={bank} value={bank}>{bank}</option>
                                ))}
                            </select>

                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {sortedCards.length} cards
                            </span>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="recommended">Recommended</option>
                                <option value="fee-low">Fee: Low to High</option>
                                <option value="fee-high">Fee: High to Low</option>
                                <option value="rewards">Best Rewards</option>
                                <option value="alphabetical">A-Z</option>
                            </select>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}>
                        {sortedCards.length > 0 ? (
                            sortedCards.map(card => {
                                const isSelected = selectedCards.includes(card.id);
                                return (
                                    <div
                                        key={card.id}
                                        className={`glass-panel credit-card-item ${isSelected ? 'selected' : ''}`}
                                        style={{
                                            padding: '1.5rem',
                                            cursor: 'pointer',
                                            border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                                            position: 'relative'
                                        }}
                                        onClick={(e) => openModal(card, e)}
                                    >
                                        {/* Selection Checkbox */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                height: '28px',
                                                width: '28px',
                                                borderRadius: '50%',
                                                border: isSelected ? '2px solid var(--accent-cyan)' : '2px solid rgba(255,255,255,0.25)',
                                                backgroundColor: isSelected ? 'var(--accent-cyan)' : 'rgba(0,0,0,0.4)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 2,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                boxShadow: isSelected ? '0 0 10px rgba(6, 182, 212, 0.5)' : 'none'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCardSelection(card.id);
                                            }}
                                            title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
                                        >
                                            {isSelected && <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>✓</span>}
                                        </div>

                                        {/* Favorite Heart Button */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                left: '12px',
                                                height: '28px',
                                                width: '28px',
                                                borderRadius: '50%',
                                                backgroundColor: 'rgba(0,0,0,0.4)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 2,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavoriteCard(card.id);
                                            }}
                                            title={isCardFavorite(card.id) ? 'Remove from favorites' : 'Add to favorites'}
                                        >
                                            <span style={{
                                                color: isCardFavorite(card.id) ? '#ef4444' : 'rgba(255,255,255,0.5)',
                                                fontSize: '14px',
                                                transition: 'color 0.2s'
                                            }}>
                                                {isCardFavorite(card.id) ? '❤️' : '🤍'}
                                            </span>
                                        </div>
                                        <div className="card-image-container" style={{
                                            height: '140px',
                                            marginBottom: '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            padding: '12px'
                                        }}>
                                            <CardImage card={card} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                        </div>

                                        <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.05rem', fontWeight: '600' }}>{card.name}</h3>
                                        <p style={{ margin: '0 0 0.8rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{card.bank}</p>

                                        {/* Category Badge */}
                                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                background: 'rgba(99, 102, 241, 0.15)',
                                                color: '#a5b4fc',
                                                padding: '3px 8px',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                fontWeight: '500'
                                            }}>
                                                {card.category || 'General'}
                                            </span>

                                            {/* Quick Benefit Badges */}
                                            {card.features?.some(f => f.toLowerCase().includes('lounge')) && (
                                                <span style={{
                                                    padding: '3px 6px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.65rem',
                                                    fontWeight: '500',
                                                    background: 'rgba(251, 146, 60, 0.15)',
                                                    color: '#fb923c'
                                                }} title="Lounge Access">
                                                    ✈️ Lounge
                                                </span>
                                            )}
                                            {parseFloat(card.fxMarkup?.replace('%', '')) <= 2 && (
                                                <span style={{
                                                    padding: '3px 6px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.65rem',
                                                    fontWeight: '500',
                                                    background: 'rgba(34, 197, 94, 0.15)',
                                                    color: '#22c55e'
                                                }} title="Low Forex Markup">
                                                    🌍 {card.fxMarkup} FX
                                                </span>
                                            )}
                                            {card.annualFee?.toLowerCase().includes('lifetime free') && (
                                                <span style={{
                                                    padding: '3px 6px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.65rem',
                                                    fontWeight: '500',
                                                    background: 'rgba(16, 185, 129, 0.15)',
                                                    color: '#10b981'
                                                }} title="Lifetime Free">
                                                    🆓 LTF
                                                </span>
                                            )}
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', marginBottom: '0.8rem', color: 'var(--text-secondary)' }}>
                                            <div>
                                                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fee</div>
                                                <span style={{ color: card.annualFee?.toLowerCase().includes('free') ? '#4ade80' : 'inherit' }}>
                                                    {card.annualFee}
                                                </span>
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reward</div>
                                                {card.rewardRate}
                                            </div>
                                        </div>

                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                                            {card.verdict?.slice(0, 60)}{card.verdict?.length > 60 ? '...' : ''}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                No cards found matching "{searchTerm}" {activeFilter !== 'All' && `in ${activeFilter} category`}
                            </div>
                        )}
                    </div>
                </>
            )
            }

            {/* Compared View: Comparison Table */}
            {
                view === 'table' && (
                    <>
                        {selectedCards.length > 0 ? (
                            <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                    <h3 style={{ margin: 0 }}>Comparison ({selectedCards.length}/4)</h3>

                                    {/* Export/Share Buttons */}
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        {/* Copy Link Button */}
                                        <button
                                            onClick={() => {
                                                const cardIds = selectedCards.join(',');
                                                const url = `${window.location.origin}${window.location.pathname}#/compare-cards?cards=${cardIds}`;
                                                navigator.clipboard.writeText(url).then(() => {
                                                    alert('Link copied to clipboard!');
                                                });
                                            }}
                                            title="Copy shareable link"
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid var(--glass-border)',
                                                color: 'var(--text-secondary)',
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseOver={(e) => {
                                                e.target.style.borderColor = 'var(--accent-cyan)';
                                                e.target.style.color = 'var(--accent-cyan)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.borderColor = 'var(--glass-border)';
                                                e.target.style.color = 'var(--text-secondary)';
                                            }}
                                        >
                                            🔗 Copy Link
                                        </button>

                                        {/* Share Button (Native Share API) */}
                                        {navigator.share && (
                                            <button
                                                onClick={() => {
                                                    const cardNames = selectedCards.map(id => getCardDetails(id).name).join(', ');
                                                    const cardIds = selectedCards.join(',');
                                                    const url = `${window.location.origin}${window.location.pathname}#/compare-cards?cards=${cardIds}`;
                                                    navigator.share({
                                                        title: 'Credit Card Comparison',
                                                        text: `Compare: ${cardNames}`,
                                                        url: url
                                                    });
                                                }}
                                                title="Share comparison"
                                                style={{
                                                    background: 'transparent',
                                                    border: '1px solid var(--glass-border)',
                                                    color: 'var(--text-secondary)',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.target.style.borderColor = 'var(--accent-cyan)';
                                                    e.target.style.color = 'var(--accent-cyan)';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.target.style.borderColor = 'var(--glass-border)';
                                                    e.target.style.color = 'var(--text-secondary)';
                                                }}
                                            >
                                                📤 Share
                                            </button>
                                        )}
                                    </div>

                                    <button
                                        onClick={clearSelection}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid #ef4444', // Red border
                                            color: '#ef4444', // Red text
                                            padding: '5px 12px',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseOver={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                                        onMouseOut={(e) => e.target.style.background = 'transparent'}
                                    >
                                        Clear All
                                    </button>
                                </div>

                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--glass-border)', width: '15%' }}>Feature</th>
                                            {selectedCards.map(id => {
                                                const card = getCardDetails(id);
                                                return (
                                                    <th key={id} style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--glass-border)', width: `${85 / selectedCards.length}% `, verticalAlign: 'top' }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                                                            <div style={{ height: '80px', width: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222', borderRadius: '8px', overflow: 'hidden', padding: '5px' }}>
                                                                <CardImage card={card} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                                            </div>
                                                            <div>
                                                                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{card.name}</div>
                                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>{card.bank}</div>
                                                            </div>
                                                            <button
                                                                onClick={() => toggleCardSelection(id)}
                                                                style={{ background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '44px', fontSize: '0.75rem', padding: '4px 10px', color: 'var(--text-secondary)', cursor: 'pointer', marginTop: '5px' }}
                                                            >
                                                                ✕ Remove
                                                            </button>
                                                        </div>
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Category Row */}
                                        <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Category</td>
                                            {selectedCards.map(id => (
                                                <td key={id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                                                    <span style={{
                                                        background: 'rgba(99, 102, 241, 0.2)',
                                                        color: '#a5b4fc',
                                                        padding: '4px 10px',
                                                        borderRadius: '6px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '500'
                                                    }}>
                                                        {getCardDetails(id).category || 'General'}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Best For Row */}
                                        <tr>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Best For</td>
                                            {selectedCards.map(id => (
                                                <td key={id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: '500', color: 'var(--accent-cyan)' }}>
                                                    {getCardDetails(id).bestFor || '-'}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Annual Fee Row - with BEST indicator */}
                                        <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Annual Fee</td>
                                            {(() => {
                                                const fees = selectedCards.map(id => {
                                                    const fee = getCardDetails(id).annualFee;
                                                    const isFree = fee.toLowerCase().includes('lifetime free');
                                                    const numMatch = fee.match(/₹?([\d,]+)/);
                                                    const numVal = isFree ? 0 : (numMatch ? parseInt(numMatch[1].replace(',', '')) : 9999);
                                                    return { id, fee, isFree, numVal };
                                                });
                                                const minFee = Math.min(...fees.map(f => f.numVal));

                                                return fees.map(({ id, fee, isFree, numVal }) => (
                                                    <td key={id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span style={isFree || numVal === minFee ? { color: '#4ade80', fontWeight: 'bold' } : {}}>
                                                                {fee}
                                                            </span>
                                                            {numVal === minFee && (
                                                                <span style={{ background: '#22c55e', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                                                    BEST
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                ));
                                            })()}
                                        </tr>

                                        {/* Reward Rate Row */}
                                        <tr>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Reward Rate</td>
                                            {selectedCards.map(id => (
                                                <td key={id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: '500' }}>
                                                    {getCardDetails(id).rewardRate}
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Forex Markup Row - with BEST indicator */}
                                        <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Forex Markup</td>
                                            {(() => {
                                                const fxData = selectedCards.map(id => {
                                                    const fx = getCardDetails(id).fxMarkup || '3.5%';
                                                    const fxNum = parseFloat(fx.replace('%', '')) || 3.5;
                                                    return { id, fx, fxNum };
                                                });
                                                const minFx = Math.min(...fxData.map(f => f.fxNum));

                                                return fxData.map(({ id, fx, fxNum }) => (
                                                    <td key={id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span style={fxNum <= 2 ? { color: '#4ade80', fontWeight: 'bold' } : {}}>
                                                                {fx}
                                                            </span>
                                                            {fxNum === minFx && (
                                                                <span style={{ background: '#22c55e', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                                                    BEST
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                ));
                                            })()}
                                        </tr>

                                        {/* Key Benefits Row */}
                                        <tr>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: 'bold', color: 'var(--text-secondary)', verticalAlign: 'top' }}>Key Benefits</td>
                                            {selectedCards.map(id => (
                                                <td key={id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', verticalAlign: 'top' }}>
                                                    <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem' }}>
                                                        {getCardDetails(id).features.map((feature, idx) => (
                                                            <li key={idx} style={{ marginBottom: '0.4rem', color: '#e2e8f0' }}>{feature}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Lounge Access Row */}
                                        <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Lounge Access</td>
                                            {selectedCards.map(id => {
                                                const card = getCardDetails(id);
                                                const features = card.features?.join(' ').toLowerCase() || '';
                                                const hasLounge = features.includes('lounge');
                                                const loungeMatch = features.match(/(\d+).*lounge/i);
                                                return (
                                                    <td key={id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                                                        {hasLounge ? (
                                                            <span style={{ color: '#4ade80' }}>✓ {loungeMatch ? `${loungeMatch[1]} visits` : 'Yes'}</span>
                                                        ) : (
                                                            <span style={{ color: '#94a3b8' }}>—</span>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>

                                        {/* Verdict Row */}
                                        <tr>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: 'bold', color: 'var(--text-secondary)', verticalAlign: 'top' }}>Our Verdict</td>
                                            {selectedCards.map(id => (
                                                <td key={id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', verticalAlign: 'top', fontStyle: 'italic', color: '#cbd5e1', fontSize: '0.9rem' }}>
                                                    "{getCardDetails(id).verdict || '-'}"
                                                </td>
                                            ))}
                                        </tr>

                                        {/* Apply Button Row */}
                                        <tr>
                                            <td style={{ padding: '1.5rem 1rem' }}></td>
                                            {selectedCards.map(id => (
                                                <td key={id} style={{ padding: '1.5rem 1rem' }}>
                                                    <a
                                                        href={getCardDetails(id).applyLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-primary"
                                                        style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center', width: '100%' }}
                                                    >
                                                        Apply Now →
                                                    </a>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🎴</div>
                                <h3 style={{ marginBottom: '0.5rem' }}>No Cards Selected</h3>
                                <p style={{ marginBottom: '1.5rem' }}>Go to the Detailed View and select up to 4 cards to compare them side-by-side.</p>
                                <Link
                                    to="/know-your-cards"
                                    className="btn-primary"
                                    style={{ display: 'inline-block', textDecoration: 'none' }}
                                >
                                    Go to Selection
                                </Link>
                            </div>
                        )}
                    </>
                )
            }

            {/* Floating Action Button (Mobile/Convenience) for Grid View */}
            {
                view === 'grid' && selectedCards.length > 0 && (
                    <div style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <Link
                            to="/compare-cards"
                            className="btn-primary"
                            style={{
                                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                padding: '1rem 2rem',
                                borderRadius: '50px',
                                border: '1px solid var(--accent-cyan)',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        >
                            Compare {selectedCards.length} Cards →
                        </Link>

                        {/* Clear Selection X Button */}
                        <button
                            onClick={clearSelection}
                            style={{
                                background: '#ef4444', // Solid Red
                                border: 'none',
                                borderRadius: '50%',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white', // White X
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                                transition: 'all 0.2s ease'
                            }}
                            aria-label="Clear selection"
                        >
                            ✕
                        </button>
                    </div>
                )
            }

            {/* Card Detail Modal */}
            {
                modalCard && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                            padding: '20px',
                            overflowY: 'auto',
                            animation: 'fadeIn 0.2s ease'
                        }}
                        onClick={closeModal}
                    >
                        <div
                            style={{
                                background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                                borderRadius: '24px',
                                maxWidth: '500px',
                                width: '100%',
                                maxHeight: '85vh',
                                overflowY: 'auto',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                margin: 'auto'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div style={{
                                padding: '20px',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}>
                                <div>
                                    <h2 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', fontWeight: '600' }}>{modalCard.name}</h2>
                                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>{modalCard.bank}</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        color: 'white',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '18px'
                                    }}
                                >✕</button>
                            </div>

                            {/* Card Image */}
                            <div style={{
                                padding: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                background: '#111827'
                            }}>
                                <CardImage card={modalCard} style={{ maxWidth: '200px', maxHeight: '130px' }} />
                            </div>

                            {/* Card Details */}
                            <div style={{ padding: '20px' }}>
                                {/* Category & Best For */}
                                <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                                        {modalCard.category || 'General'}
                                    </span>
                                    <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#86efac', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                                        Best For: {modalCard.bestFor}
                                    </span>
                                </div>

                                {/* Verdict */}
                                <p style={{ color: '#e2e8f0', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                                    "{modalCard.verdict}"
                                </p>

                                {/* Key Stats */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Annual Fee</div>
                                        <div style={{ fontSize: '1rem', fontWeight: '600', color: modalCard.annualFee?.toLowerCase().includes('free') ? '#4ade80' : 'white' }}>
                                            {modalCard.annualFee}
                                        </div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Reward Rate</div>
                                        <div style={{ fontSize: '1rem', fontWeight: '600' }}>{modalCard.rewardRate}</div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Forex Markup</div>
                                        <div style={{ fontSize: '1rem', fontWeight: '600', color: parseFloat(modalCard.fxMarkup) <= 2 ? '#4ade80' : 'white' }}>
                                            {modalCard.fxMarkup}
                                        </div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Category</div>
                                        <div style={{ fontSize: '1rem', fontWeight: '600' }}>{modalCard.category}</div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Key Features</div>
                                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.8' }}>
                                        {modalCard.features?.map((f, i) => <li key={i}>{f}</li>)}
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        onClick={() => {
                                            toggleCardSelection(modalCard.id);
                                            closeModal();
                                        }}
                                        style={{
                                            flex: 1,
                                            padding: '14px',
                                            borderRadius: '12px',
                                            border: selectedCards.includes(modalCard.id) ? '2px solid #ef4444' : '2px solid var(--accent-cyan)',
                                            background: 'transparent',
                                            color: selectedCards.includes(modalCard.id) ? '#ef4444' : 'var(--accent-cyan)',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {selectedCards.includes(modalCard.id) ? '− Remove from Compare' : '+ Add to Compare'}
                                    </button>
                                    <a
                                        href={modalCard.applyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary"
                                        style={{
                                            flex: 1,
                                            padding: '14px',
                                            borderRadius: '12px',
                                            textAlign: 'center',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        Apply Now →
                                    </a>
                                </div>

                                {/* View Full Guide Link */}
                                <Link
                                    to={`/card-guide/${modalCard.id}`}
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        marginTop: '16px',
                                        color: '#94a3b8',
                                        fontSize: '0.9rem',
                                        textDecoration: 'none'
                                    }}
                                    onClick={closeModal}
                                >
                                    View Full Detailed Guide →
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default CreditCardComparison;
