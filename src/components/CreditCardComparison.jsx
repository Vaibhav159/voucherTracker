import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';
import { useCreditCards } from '../hooks/useCreditCards';
import CardImage from './CardImage';
import { useFavorites } from '../context/FavoritesContext';
import LoadingSpinner from './LoadingSpinner';

const CreditCardComparison = ({ view = 'grid', selectedCards = [], toggleCardSelection, clearSelection }) => {
    const { creditCards, loading, error } = useCreditCards();

    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeBank, setActiveBank] = useState('All');
    const [modalCard, setModalCard] = useState(null);
    const [sortBy, setSortBy] = useState('recommended');
    const { isCardFavorite, toggleFavoriteCard } = useFavorites();

    // New filter states
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [feeRange, setFeeRange] = useState('all'); // 'all', 'free', 'low', 'mid', 'premium'
    const [forexFilter, setForexFilter] = useState('all'); // 'all', 'low', 'mid'
    const [hasLounge, setHasLounge] = useState(false);
    const [networkFilter, setNetworkFilter] = useState('all'); // 'all', 'visa', 'mastercard', 'rupay', 'amex'

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
                keys: ['name', 'bank', 'tags', 'features', 'bestFor'],
                threshold: 0.3
            });
            cards = fuse.search(searchTerm).map(res => res.item);
        }

        return cards.filter(card => {
            // Bank Filter
            if (activeBank !== 'All' && card.bank !== activeBank) return false;

            // Fee Range Filter
            if (feeRange !== 'all') {
                const fee = parseFee(card.annualFee);
                if (feeRange === 'free' && fee !== 0) return false;
                if (feeRange === 'low' && (fee === 0 || fee > 500)) return false;
                if (feeRange === 'mid' && (fee <= 500 || fee > 2000)) return false;
                if (feeRange === 'premium' && fee <= 2000) return false;
            }

            // Forex Filter
            if (forexFilter !== 'all') {
                const fxNum = parseFloat(card.fxMarkup?.replace('%', '') || '100');
                if (forexFilter === 'low' && fxNum > 2) return false;
                if (forexFilter === 'mid' && fxNum > 3) return false;
            }

            // Lounge Filter
            if (hasLounge) {
                const features = card.features?.join(' ').toLowerCase() || '';
                if (!features.includes('lounge')) return false;
            }

            // Network Filter
            if (networkFilter !== 'all') {
                const cardText = (card.name + ' ' + card.bank + ' ' + card.features?.join(' ')).toLowerCase();
                if (networkFilter === 'visa' && !cardText.includes('visa')) return false;
                if (networkFilter === 'mastercard' && !cardText.includes('mastercard')) return false;
                if (networkFilter === 'rupay' && !cardText.includes('rupay')) return false;
                if (networkFilter === 'amex' && !cardText.includes('amex') && !card.bank?.toLowerCase().includes('american express')) return false;
            }

            // Category Filter
            if (activeFilter === 'All') return true;

            if (activeFilter === 'Lifetime Free') {
                const feeLower = card.annualFee?.toLowerCase() || '';
                return feeLower.includes('lifetime free') || feeLower.includes('₹0') || feeLower === 'free';
            }

            if (activeFilter === 'Low Forex') {
                const fxNum = parseFloat(card.fxMarkup?.replace('%', '') || '100');
                return fxNum <= 2;
            }

            if (activeFilter === 'Fuel') {
                if (card.category === 'Fuel') return true;
                const lower = (card.name + ' ' + card.features?.join(' ')).toLowerCase();
                return lower.includes('fuel') || lower.includes('petrol') || lower.includes('bpcl') || lower.includes('hpcl') || lower.includes('iocl');
            }

            if (activeFilter === 'Shopping') {
                if (card.category === 'Shopping') return true;
                const lower = (card.name + ' ' + card.bestFor + ' ' + card.features?.join(' ')).toLowerCase();
                return lower.includes('shopping') || lower.includes('amazon') || lower.includes('flipkart') || lower.includes('online shop');
            }

            if (activeFilter === 'Lounge') {
                const features = card.features?.join(' ').toLowerCase() || '';
                return features.includes('lounge');
            }

            if (activeFilter === 'Lifestyle') {
                return card.category === 'Lifestyle' || card.bestFor?.toLowerCase().includes('lifestyle');
            }

            return card.category === activeFilter;
        });

        return cards;
    }, [searchTerm, activeBank, activeFilter, feeRange, forexFilter, hasLounge, networkFilter, creditCards]);

    // Primary visible categories
    const primaryFilters = ['All', 'Cashback', 'Travel', 'Premium', 'Fuel', 'Shopping'];
    // Additional categories shown when expanded
    const secondaryFilters = ['Low Forex', 'Lifetime Free', 'Lounge', 'Lifestyle'];
    const allFilters = [...primaryFilters, ...secondaryFilters];

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

    // ... (logic)

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-danger)' }}>
                <h3>Error loading credit cards</h3>
                <p>Please try again later.</p>
            </div>
        );
    }

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

                    <div style={{ maxWidth: '900px', margin: '0 auto 2rem auto' }}>
                        {/* Compact Filter Toolbar */}
                        <div style={{
                            display: 'flex',
                            gap: '0.75rem',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            marginBottom: '1rem'
                        }}>
                            {/* Bank Dropdown */}
                            <select
                                value={activeBank}
                                onChange={(e) => setActiveBank(e.target.value)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    minWidth: '130px'
                                }}
                            >
                                <option value="All">All Banks</option>
                                {banks.filter(b => b !== 'All').map(bank => (
                                    <option key={bank} value={bank}>{bank}</option>
                                ))}
                            </select>

                            {/* More Filters Button */}
                            <button
                                onClick={() => setShowMoreFilters(!showMoreFilters)}
                                style={{
                                    padding: '8px 14px',
                                    borderRadius: '8px',
                                    border: `1px solid ${showMoreFilters ? 'var(--accent-cyan)' : 'var(--glass-border)'}`,
                                    background: showMoreFilters ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.05)',
                                    color: showMoreFilters ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <span>⚙️</span> Filters
                                {(feeRange !== 'all' || forexFilter !== 'all' || hasLounge || networkFilter !== 'all') && (
                                    <span style={{
                                        background: 'var(--accent-cyan)',
                                        color: '#000',
                                        borderRadius: '50%',
                                        width: '18px',
                                        height: '18px',
                                        fontSize: '0.7rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold'
                                    }}>
                                        {[feeRange !== 'all', forexFilter !== 'all', hasLounge, networkFilter !== 'all'].filter(Boolean).length}
                                    </span>
                                )}
                            </button>

                            {/* Spacer */}
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {sortedCards.length} cards
                                </span>
                            </div>

                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="recommended">Recommended</option>
                                <option value="fee-low">Fee: Low → High</option>
                                <option value="fee-high">Fee: High → Low</option>
                                <option value="rewards">Best Rewards</option>
                                <option value="alphabetical">A-Z</option>
                            </select>
                        </div>

                        {/* Collapsible More Filters Panel */}
                        {showMoreFilters && (
                            <div
                                className="expand-panel"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    padding: '1rem 1.25rem',
                                    marginBottom: '1rem',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                    gap: '1rem'
                                }}>
                                {/* Fee Range */}
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Annual Fee
                                    </label>
                                    <select
                                        value={feeRange}
                                        onChange={(e) => setFeeRange(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px 10px',
                                            borderRadius: '6px',
                                            border: '1px solid var(--glass-border)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="all">Any Fee</option>
                                        <option value="free">Free (₹0)</option>
                                        <option value="low">Low (₹1-500)</option>
                                        <option value="mid">Mid (₹501-2000)</option>
                                        <option value="premium">Premium (₹2000+)</option>
                                    </select>
                                </div>

                                {/* Forex Markup */}
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Forex Markup
                                    </label>
                                    <select
                                        value={forexFilter}
                                        onChange={(e) => setForexFilter(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px 10px',
                                            borderRadius: '6px',
                                            border: '1px solid var(--glass-border)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="all">Any Markup</option>
                                        <option value="low">Low (≤2%)</option>
                                        <option value="mid">Moderate (≤3%)</option>
                                    </select>
                                </div>

                                {/* Card Network */}
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Card Network
                                    </label>
                                    <select
                                        value={networkFilter}
                                        onChange={(e) => setNetworkFilter(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px 10px',
                                            borderRadius: '6px',
                                            border: '1px solid var(--glass-border)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="all">All Networks</option>
                                        <option value="visa">Visa</option>
                                        <option value="mastercard">Mastercard</option>
                                        <option value="rupay">RuPay</option>
                                        <option value="amex">American Express</option>
                                    </select>
                                </div>

                                {/* Lounge Toggle */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '20px' }}>
                                    <button
                                        onClick={() => setHasLounge(!hasLounge)}
                                        style={{
                                            width: '44px',
                                            height: '24px',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: hasLounge ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.15)',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            transition: 'background 0.2s'
                                        }}
                                    >
                                        <span style={{
                                            position: 'absolute',
                                            top: '2px',
                                            left: hasLounge ? '22px' : '2px',
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            background: '#fff',
                                            transition: 'left 0.2s'
                                        }} />
                                    </button>
                                    <span style={{ fontSize: '0.85rem', color: hasLounge ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>
                                        ✈️ Lounge Access Only
                                    </span>
                                </div>

                                {/* Clear Filters */}
                                {(feeRange !== 'all' || forexFilter !== 'all' || hasLounge || networkFilter !== 'all') && (
                                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
                                        <button
                                            onClick={() => {
                                                setFeeRange('all');
                                                setForexFilter('all');
                                                setHasLounge(false);
                                                setNetworkFilter('all');
                                            }}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '6px',
                                                border: '1px solid #ef4444',
                                                background: 'transparent',
                                                color: '#ef4444',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Category Pills */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {(showAllCategories ? allFilters : primaryFilters).map(filter => (
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

                            {/* Show More/Less Categories */}
                            <button
                                onClick={() => setShowAllCategories(!showAllCategories)}
                                style={{
                                    padding: '8px 14px',
                                    borderRadius: '20px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    color: 'var(--accent-purple)',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {showAllCategories ? '− Less' : `+${secondaryFilters.length} more`}
                            </button>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}>
                        {sortedCards.length > 0 ? (
                            sortedCards.map((card, index) => {
                                const isSelected = selectedCards.includes(card.id);
                                // Calculate stagger delay (cap at 20 cards to avoid too long delays)
                                const staggerDelay = Math.min(index, 20) * 0.03;
                                return (
                                    <div
                                        key={card.id}
                                        className={`glass-panel credit-card-item animate-fade-in-up ${isSelected ? 'selected' : ''}`}
                                        style={{
                                            padding: '1.5rem',
                                            cursor: 'pointer',
                                            border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                                            position: 'relative',
                                            animationDelay: `${staggerDelay}s`,
                                            opacity: 0
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

                                {/* Quick Add Card Search */}
                                {selectedCards.length < 4 && (
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>
                                            ➕ Quick add card to comparison:
                                        </label>
                                        <select
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    toggleCardSelection(e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                            style={{
                                                width: '100%',
                                                maxWidth: '400px',
                                                padding: '10px 12px',
                                                borderRadius: '8px',
                                                border: '1px solid var(--glass-border)',
                                                background: 'rgba(0,0,0,0.3)',
                                                color: 'var(--text-primary)',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="">Select a card to add...</option>
                                            {creditCards
                                                .filter(card => !selectedCards.includes(card.id))
                                                .sort((a, b) => a.name.localeCompare(b.name))
                                                .map(card => (
                                                    <option key={card.id} value={card.id}>
                                                        {card.name} ({card.bank})
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                )}

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

                                        {/* Reward Rate Row - with BEST indicator */}
                                        <tr>
                                            <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Reward Rate</td>
                                            {(() => {
                                                const rewardData = selectedCards.map(id => {
                                                    const rate = getCardDetails(id).rewardRate || '0%';
                                                    // Extract the highest percentage from the rate string
                                                    const matches = rate.match(/(\d+(?:\.\d+)?)/g);
                                                    const rateNum = matches ? Math.max(...matches.map(m => parseFloat(m))) : 0;
                                                    return { id, rate, rateNum };
                                                });
                                                const maxRate = Math.max(...rewardData.map(r => r.rateNum));

                                                return rewardData.map(({ id, rate, rateNum }) => (
                                                    <td key={id} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontWeight: '500' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span style={rateNum === maxRate && maxRate > 0 ? { color: '#4ade80', fontWeight: 'bold' } : {}}>
                                                                {rate}
                                                            </span>
                                                            {rateNum === maxRate && maxRate > 0 && (
                                                                <span style={{ background: '#22c55e', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                                                    BEST
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                ));
                                            })()}
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
                            <div className="popular-comparisons">
                                <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🎴</div>
                                <h3>No Cards Selected</h3>
                                <p>Select from popular comparisons below, or go to Cards to choose your own.</p>

                                {/* Popular Comparison Presets */}
                                <div className="comparison-presets" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // IndianOil RBL XTRA (26), BPCL SBI (27), IOC Axis (84)
                                            const presetCards = [26, 27, 84];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>⛽ Fuel Savers</h4>
                                        <p>Maximum savings on fuel purchases and surcharge waiver</p>
                                        <div className="comparison-preset-cards">
                                            <span>IndianOil RBL</span>
                                            <span>BPCL SBI</span>
                                            <span>IOC Axis</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // HDFC Swiggy (7), IndusInd EazyDiner (72), HSBC Live+ (10)
                                            const presetCards = [7, 72, 10];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>🍽️ Dining Delights</h4>
                                        <p>Best rewards on restaurants, food delivery, and dining</p>
                                        <div className="comparison-preset-cards">
                                            <span>HDFC Swiggy</span>
                                            <span>IndusInd EazyDiner</span>
                                            <span>HSBC Live+</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // PVR INOX Kotak (71), Axis MyZone (37), IndusInd Legend (50)
                                            const presetCards = [71, 37, 50];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>🎬 Entertainment Buffs</h4>
                                        <p>Free movie tickets, BOGO offers, and entertainment perks</p>
                                        <div className="comparison-preset-cards">
                                            <span>PVR INOX Kotak</span>
                                            <span>Axis MyZone</span>
                                            <span>IndusInd Legend</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // Tata Neu HDFC (6), Kiwi RuPay (16), Jupiter Edge (90)
                                            const presetCards = [6, 16, 90];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>📱 UPI Champions</h4>
                                        <p>Best rewards on UPI scan & pay transactions</p>
                                        <div className="comparison-preset-cards">
                                            <span>Tata Neu HDFC</span>
                                            <span>Kiwi RuPay</span>
                                            <span>Jupiter Edge</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // Airtel Axis (8), Axis Ace (20), PhonePe HDFC Ultimo (66)
                                            const presetCards = [8, 20, 66];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>💡 Utility Warriors</h4>
                                        <p>Best cashback on electricity, broadband, and bill payments</p>
                                        <div className="comparison-preset-cards">
                                            <span>Airtel Axis</span>
                                            <span>Axis Ace</span>
                                            <span>PhonePe Ultimo</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // Amazon Pay ICICI (3), IDFC First Millennia (94), Scapia Federal (14)
                                            const presetCards = [3, 94, 14];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>🆓 Lifetime Free Stars</h4>
                                        <p>Best value with zero annual fees forever</p>
                                        <div className="comparison-preset-cards">
                                            <span>Amazon ICICI</span>
                                            <span>IDFC Millennia</span>
                                            <span>Scapia Federal</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // Axis Neo (35), SBI SimplyCLICK (33), OneCard (30)
                                            const presetCards = [35, 33, 30];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>🌟 Beginners' Best</h4>
                                        <p>Perfect first credit cards for new users</p>
                                        <div className="comparison-preset-cards">
                                            <span>Axis Neo</span>
                                            <span>SBI SimplyCLICK</span>
                                            <span>OneCard</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // Marriott Bonvoy HDFC (24), Axis Reserve (55), HDFC Regalia Gold (22)
                                            const presetCards = [24, 55, 22];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>🏨 Hotel Loyalists</h4>
                                        <p>Best cards for hotel points, elite status, and stays</p>
                                        <div className="comparison-preset-cards">
                                            <span>Marriott HDFC</span>
                                            <span>Axis Reserve</span>
                                            <span>Regalia Gold</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // Axis Atlas (9), Air India SBI Signature (69), Amex Platinum Travel (11)
                                            const presetCards = [9, 69, 11];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>🛫 Airline Miles</h4>
                                        <p>Best for air miles accumulation and transfers</p>
                                        <div className="comparison-preset-cards">
                                            <span>Axis Atlas</span>
                                            <span>Air India SBI</span>
                                            <span>Amex Platinum</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // Scapia Federal (14), IDFC Mayura (56), Niyo Global (89)
                                            const presetCards = [14, 56, 89];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>🌍 Zero Forex</h4>
                                        <p>No forex markup on international transactions</p>
                                        <div className="comparison-preset-cards">
                                            <span>Scapia Federal</span>
                                            <span>IDFC Mayura</span>
                                            <span>Niyo Global</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // ICICI Coral (59), HDFC Millennia (29), IDFC First Power+ (28)
                                            const presetCards = [59, 29, 28];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>🥗 Grocery Gurus</h4>
                                        <p>Best rewards on supermarkets and grocery shopping</p>
                                        <div className="comparison-preset-cards">
                                            <span>ICICI Coral</span>
                                            <span>HDFC Millennia</span>
                                            <span>IDFC Power+</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // HDFC Infinia Metal (4), ICICI Emeralde (2), HDFC Infinia Reserve (98)
                                            const presetCards = [4, 2, 98];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>👑 Super Premium</h4>
                                        <p>Invite-only cards for high net-worth individuals</p>
                                        <div className="comparison-preset-cards">
                                            <span>HDFC Infinia</span>
                                            <span>ICICI Emeralde</span>
                                            <span>Infinia Reserve</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // HDFC BizBlack (57), Amex Gold (76), Amex Platinum (61)
                                            const presetCards = [57, 76, 61];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>🏢 Business Elite</h4>
                                        <p>Best cards for business expenses and tax payments</p>
                                        <div className="comparison-preset-cards">
                                            <span>HDFC BizBlack</span>
                                            <span>Amex Gold</span>
                                            <span>Amex Platinum</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // IDFC First Select (43), AU LIT (53), HDFC Millennia (29)
                                            const presetCards = [43, 53, 29];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>📅 Weekend Warriors</h4>
                                        <p>Accelerated rewards on weekend spends</p>
                                        <div className="comparison-preset-cards">
                                            <span>IDFC Select</span>
                                            <span>AU LIT</span>
                                            <span>HDFC Millennia</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // IDFC WOW (44), Kotak 811 (34), OneCard (30)
                                            const presetCards = [44, 34, 30];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>🔒 Secured Cards</h4>
                                        <p>Best FD-backed cards for building credit history</p>
                                        <div className="comparison-preset-cards">
                                            <span>IDFC WOW</span>
                                            <span>Kotak 811</span>
                                            <span>OneCard</span>
                                        </div>
                                    </div>

                                    <div
                                        className="comparison-preset-card"
                                        onClick={() => {
                                            // HDFC Regalia (60), ICICI Sapphiro (58), Axis Select (63)
                                            const presetCards = [60, 58, 63];
                                            presetCards.forEach(id => {
                                                if (!selectedCards.includes(id)) toggleCardSelection(id);
                                            });
                                        }}
                                    >
                                        <h4>💳 All-Rounders</h4>
                                        <p>Best overall value across all spending categories</p>
                                        <div className="comparison-preset-cards">
                                            <span>HDFC Regalia</span>
                                            <span>ICICI Sapphiro</span>
                                            <span>Axis Select</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '2rem' }}>
                                    <Link
                                        to="/know-your-cards"
                                        className="btn-primary"
                                        style={{ display: 'inline-block', textDecoration: 'none' }}
                                    >
                                        Browse All Cards →
                                    </Link>
                                </div>
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

CreditCardComparison.propTypes = {
    view: PropTypes.oneOf(['grid', 'table']),
    selectedCards: PropTypes.arrayOf(PropTypes.string),
    toggleCardSelection: PropTypes.func,
    clearSelection: PropTypes.func,
};

export default CreditCardComparison;
