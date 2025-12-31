/**
 * CreditCardComparison - FIXED VERSION
 * 
 * Fixes:
 * - Added actual comparison table (was placeholder)
 * - Proper card data display
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';
import { useCreditCards } from '../hooks/useCreditCards';
import CardImage from './CardImage';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from './UXPolish';
import { CreditCardGridSkeleton } from './Skeleton';
import LoadingSpinner from './LoadingSpinner';

// Comparison rows configuration
const COMPARISON_ROWS = [
    { key: 'bank', label: 'Bank', icon: '🏦' },
    { key: 'annualFee', label: 'Annual Fee', icon: '💰' },
    { key: 'joiningFee', label: 'Joining Fee', icon: '🎟️' },
    { key: 'rewardRate', label: 'Reward Rate', icon: '⭐' },
    { key: 'welcomeBonus', label: 'Welcome Bonus', icon: '🎁' },
    { key: 'fxMarkup', label: 'Forex Markup', icon: '🌍' },
    { key: 'loungeAccess', label: 'Lounge Access', icon: '✈️' },
    { key: 'fuelSurcharge', label: 'Fuel Benefits', icon: '⛽' },
    { key: 'bestFor', label: 'Best For', icon: '🎯' },
];

const CreditCardComparison = ({ view = 'grid', selectedCards = [], toggleCardSelection, clearSelection }) => {
    const { creditCards, loading, error } = useCreditCards();
    const toast = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeBank, setActiveBank] = useState('All');
    const [modalCard, setModalCard] = useState(null);
    const [sortBy, setSortBy] = useState('recommended');
    const [isLoading, setIsLoading] = useState(true);
    const { isCardFavorite, toggleFavoriteCard } = useFavorites();

    // Additional filters
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [feeRange, setFeeRange] = useState('all');
    const [forexFilter, setForexFilter] = useState('all');
    const [hasLounge, setHasLounge] = useState(false);
    const [networkFilter, setNetworkFilter] = useState('all');

    // Simulate initial load for skeleton
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const getCardDetails = (id) => creditCards.find(card => card.id === id);

    const openModal = (card, e) => {
        e.stopPropagation();
        setModalCard(card);
    };

    const closeModal = () => setModalCard(null);

    // Enhanced card selection with toast
    const handleCardSelection = useCallback((cardId) => {
        const card = getCardDetails(cardId);
        const isSelected = selectedCards.includes(cardId);

        if (!isSelected && selectedCards.length >= 4) {
            toast.warning('Maximum 4 cards can be compared at once');
            return;
        }

        toggleCardSelection(cardId);

        if (navigator.vibrate) {
            navigator.vibrate(isSelected ? 30 : [30, 50, 30]);
        }

        if (!isSelected) {
            toast.success(`${card?.name} added to comparison`);
        }
    }, [selectedCards, toggleCardSelection, toast]);

    // Enhanced clear with toast
    const handleClearSelection = useCallback(() => {
        if (selectedCards.length === 0) return;
        const count = selectedCards.length;
        clearSelection();
        toast.info(`Cleared ${count} card${count !== 1 ? 's' : ''} from comparison`);
    }, [selectedCards, clearSelection, toast]);

    // Copy comparison link
    const copyComparisonLink = useCallback(() => {
        const cardIds = selectedCards.join(',');
        const url = `${window.location.origin}${window.location.pathname}#/compare-cards?cards=${cardIds}`;
        navigator.clipboard.writeText(url).then(() => {
            toast.success('Comparison link copied!');
        }).catch(() => {
            toast.error('Failed to copy link');
        });
    }, [selectedCards, toast]);

    // Share comparison
    const shareComparison = useCallback(() => {
        const cardNames = selectedCards.map(id => getCardDetails(id)?.name).filter(Boolean).join(', ');
        const cardIds = selectedCards.join(',');
        const url = `${window.location.origin}${window.location.pathname}#/compare-cards?cards=${cardIds}`;

        if (navigator.share) {
            navigator.share({
                title: 'Credit Card Comparison',
                text: `Compare: ${cardNames}`,
                url: url
            }).catch(() => { });
        }
    }, [selectedCards]);

    // Keyboard handlers
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (modalCard) closeModal();
                else if (selectedCards.length > 0) handleClearSelection();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = modalCard ? 'hidden' : 'unset';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [modalCard, selectedCards, handleClearSelection]);

    // Parse functions
    const parseFee = (fee) => {
        if (!fee) return 9999;
        const lower = fee.toLowerCase();
        if (lower.includes('lifetime free') || lower.includes('₹0') || lower === 'free') return 0;
        const match = fee.match(/₹?([\d,]+)/);
        return match ? parseInt(match[1].replace(/,/g, '')) : 9999;
    };

    const parseReward = (rate) => {
        if (!rate) return 0;
        const match = rate.match(/([\d.]+)%/);
        return match ? parseFloat(match[1]) : 0;
    };

    // Extract banks
    const banks = useMemo(() => {
        const bankSet = new Set(creditCards.map(c => c.bank));
        return ['All', ...Array.from(bankSet).sort()];
    }, [creditCards]);

    // Filter cards
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
            if (activeBank !== 'All' && card.bank !== activeBank) return false;

            if (feeRange !== 'all') {
                const fee = parseFee(card.annualFee);
                if (feeRange === 'free' && fee !== 0) return false;
                if (feeRange === 'low' && (fee === 0 || fee > 500)) return false;
                if (feeRange === 'mid' && (fee <= 500 || fee > 2000)) return false;
                if (feeRange === 'premium' && fee <= 2000) return false;
            }

            if (forexFilter !== 'all') {
                const fxNum = parseFloat(card.fxMarkup?.replace('%', '') || '100');
                if (forexFilter === 'low' && fxNum > 2) return false;
                if (forexFilter === 'mid' && fxNum > 3) return false;
            }

            if (hasLounge) {
                const features = card.features?.join(' ').toLowerCase() || '';
                const tags = card.tags?.join(' ').toLowerCase() || '';
                if (!features.includes('lounge') && !tags.includes('lounge')) return false;
            }

            if (networkFilter !== 'all') {
                const cardText = (card.name + ' ' + card.bank + ' ' + (card.features?.join(' ') || '')).toLowerCase();
                if (networkFilter === 'visa' && !cardText.includes('visa')) return false;
                if (networkFilter === 'mastercard' && !cardText.includes('mastercard')) return false;
                if (networkFilter === 'rupay' && !cardText.includes('rupay')) return false;
                if (networkFilter === 'amex' && !cardText.includes('amex')) return false;
            }

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
                return lower.includes('fuel') || lower.includes('petrol');
            }
            if (activeFilter === 'Shopping') {
                if (card.category === 'Shopping') return true;
                const lower = (card.name + ' ' + card.bestFor + ' ' + card.features?.join(' ')).toLowerCase();
                return lower.includes('shopping') || lower.includes('amazon') || lower.includes('flipkart');
            }
            if (activeFilter === 'Lounge') {
                const features = card.features?.join(' ').toLowerCase() || '';
                return features.includes('lounge');
            }
            return card.category === activeFilter;
        });
    }, [searchTerm, activeBank, activeFilter, feeRange, forexFilter, hasLounge, networkFilter, creditCards]);

    // Sort cards
    const sortedCards = useMemo(() => {
        const cards = [...filteredCards];
        switch (sortBy) {
            case 'fee-low':
                return cards.sort((a, b) => parseFee(a.annualFee) - parseFee(b.annualFee));
            case 'fee-high':
                return cards.sort((a, b) => parseFee(b.annualFee) - parseFee(a.annualFee));
            case 'reward-high':
                return cards.sort((a, b) => parseReward(b.rewardRate) - parseReward(a.rewardRate));
            case 'name':
                return cards.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return cards;
        }
    }, [filteredCards, sortBy]);

    // Categories
    const primaryFilters = ['All', 'Lifetime Free', 'Low Forex', 'Shopping', 'Travel', 'Fuel', 'Lounge'];
    const secondaryFilters = ['Lifestyle', 'Dining', 'Premium', 'Business', 'Student'];

    const getTierColor = (tier) => {
        const colors = {
            'super-premium': '#FFD700',
            'premium': '#C0C0C0',
            'mid': '#CD7F32',
            'entry': '#4A5568',
        };
        return colors[tier] || '#4A5568';
    };

    // Helper to get comparison value
    const getComparisonValue = (card, key) => {
        if (!card) return '-';

        if (key === 'loungeAccess') {
            const features = card.features?.join(' ').toLowerCase() || '';
            if (features.includes('unlimited lounge')) return '✅ Unlimited';
            if (features.includes('lounge')) {
                const match = features.match(/(\d+)\s*lounge/i);
                return match ? `✅ ${match[1]} visits` : '✅ Yes';
            }
            return '❌ No';
        }

        if (key === 'fuelSurcharge') {
            const features = card.features?.join(' ').toLowerCase() || '';
            if (features.includes('fuel')) return '✅ Yes';
            return '❌ No';
        }

        const value = card[key];
        if (!value || value === '') return '-';
        return value;
    };

    // Check if fee is free
    const isFreeCard = (fee) => {
        if (!fee) return false;
        const lower = fee.toLowerCase();
        return lower.includes('free') || lower.includes('₹0');
    };

    // Handle preset comparison selection - find cards by name and select them
    const handlePresetSelection = useCallback((cardNames) => {
        // Find card IDs that match the card names (fuzzy match on name)
        const matchedIds = [];
        cardNames.forEach(name => {
            const found = creditCards.find(card => {
                const cardNameLower = card.name.toLowerCase();
                const searchLower = name.toLowerCase();
                // Match if the card name contains the search term or vice versa
                return cardNameLower.includes(searchLower) || searchLower.includes(cardNameLower) ||
                    // Also match partial words
                    cardNameLower.split(' ').some(word => searchLower.includes(word) && word.length > 2) ||
                    searchLower.split(' ').some(word => cardNameLower.includes(word) && word.length > 2);
            });
            if (found && !matchedIds.includes(found.id)) {
                matchedIds.push(found.id);
            }
        });

        if (matchedIds.length > 0) {
            // Clear existing and select new ones
            clearSelection();
            matchedIds.forEach(id => toggleCardSelection(id));
            toast.success(`Selected ${matchedIds.length} cards for comparison`);
        } else {
            toast.warning('Could not find matching cards');
        }
    }, [clearSelection, toggleCardSelection, toast, creditCards]);

    // Popular comparisons for empty state
    const popularComparisons = [
        { name: '⛽ Fuel Savers', desc: 'Maximum savings on fuel purchases and surcharge waiver', cards: ['IndianOil RBL', 'BPCL SBI', 'IOC Axis'] },
        { name: '🍽️ Dining Delights', desc: 'Best rewards on restaurants, food delivery, and dining', cards: ['HDFC Swiggy', 'IndusInd EazyDiner', 'HSBC Live+'] },
        { name: '🎬 Entertainment Buffs', desc: 'Free movie tickets, BOGO offers, and entertainment perks', cards: ['PVR INOX Kotak', 'Axis MyZone', 'IndusInd Legend'] },
        { name: '📱 UPI Champions', desc: 'Best rewards on UPI scan & pay transactions', cards: ['Tata Neu HDFC', 'Kiwi RuPay', 'Jupiter Edge'] },
        { name: '💡 Utility Warriors', desc: 'Best cashback on electricity, broadband, and bill payments', cards: ['Airtel Axis', 'Axis Ace', 'PhonePe Ultimo'] },
        { name: '🆓 Lifetime Free Stars', desc: 'Best value with zero annual fees forever', cards: ['Amazon ICICI', 'IDFC Millennia', 'Scapia Federal'] },
        { name: '🌟 Beginners\' Best', desc: 'Perfect first credit cards for new users', cards: ['Axis Neo', 'SBI SimplyCLICK', 'OneCard'] },
        { name: '🏨 Hotel Loyalists', desc: 'Best cards for hotel points, elite status, and stays', cards: ['Marriott HDFC', 'Axis Reserve', 'Regalia Gold'] },
        { name: '✈️ Airline Miles', desc: 'Best for air miles accumulation and transfers', cards: ['Axis Atlas', 'Air India SBI', 'Amex Platinum'] },
    ];

    // Render Comparison Table
    const renderComparisonTable = () => {
        const cards = selectedCards.map(id => getCardDetails(id)).filter(Boolean);

        if (cards.length === 0) return null;

        return (
            <div className="comparison-table-wrapper" style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    {/* Header - Card Images */}
                    <thead>
                        <tr>
                            <th style={{
                                padding: '1rem',
                                textAlign: 'left',
                                borderBottom: '2px solid var(--glass-border)',
                                background: 'rgba(139, 92, 246, 0.05)',
                                width: '160px',
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    💳 Card
                                </span>
                            </th>
                            {cards.map(card => (
                                <th key={card.id} style={{
                                    padding: '1.5rem 1rem',
                                    textAlign: 'center',
                                    borderBottom: '2px solid var(--glass-border)',
                                    background: 'rgba(139, 92, 246, 0.05)',
                                    position: 'relative',
                                    minWidth: '180px',
                                }}>
                                    {/* Remove button */}
                                    <button
                                        onClick={() => toggleCardSelection(card.id)}
                                        style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.3)',
                                            color: '#ef4444',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        title="Remove from comparison"
                                    >
                                        ✕
                                    </button>

                                    {/* Card Image */}
                                    <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                                        <CardImage card={card} style={{ maxWidth: '120px', maxHeight: '75px' }} />
                                    </div>

                                    {/* Card Name */}
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                        {card.name}
                                    </div>

                                    {/* Tier Badge */}
                                    {card.tier && (
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '2px 8px',
                                            borderRadius: '10px',
                                            fontSize: '0.65rem',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            background: `${getTierColor(card.tier)}20`,
                                            color: getTierColor(card.tier),
                                        }}>
                                            {card.tier?.replace('-', ' ')}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body - Comparison Rows */}
                    <tbody>
                        {COMPARISON_ROWS.map((row, idx) => (
                            <tr key={row.key} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                                <td style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid var(--glass-border)',
                                    color: 'var(--text-secondary)',
                                    fontWeight: 500,
                                    fontSize: '0.85rem',
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span>{row.icon}</span>
                                        <span>{row.label}</span>
                                    </span>
                                </td>
                                {cards.map(card => {
                                    const value = getComparisonValue(card, row.key);
                                    const isHighlight = (row.key === 'annualFee' && isFreeCard(value));

                                    return (
                                        <td key={card.id} style={{
                                            padding: '1rem',
                                            textAlign: 'center',
                                            borderBottom: '1px solid var(--glass-border)',
                                            color: isHighlight ? '#22c55e' : 'var(--text-primary)',
                                            fontWeight: isHighlight ? 600 : 400,
                                            fontSize: '0.85rem',
                                        }}>
                                            {value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}

                        {/* Features Row */}
                        <tr>
                            <td style={{
                                padding: '1rem',
                                borderBottom: '1px solid var(--glass-border)',
                                color: 'var(--text-secondary)',
                                fontWeight: 500,
                                fontSize: '0.85rem',
                                verticalAlign: 'top',
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>✨</span>
                                    <span>Key Features</span>
                                </span>
                            </td>
                            {cards.map(card => (
                                <td key={card.id} style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid var(--glass-border)',
                                    textAlign: 'left',
                                    fontSize: '0.8rem',
                                }}>
                                    {card.features && card.features.length > 0 ? (
                                        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                                            {card.features.slice(0, 4).map((f, i) => (
                                                <li key={i} style={{ marginBottom: '4px' }}>{f}</li>
                                            ))}
                                            {card.features.length > 4 && (
                                                <li style={{ color: 'var(--accent-violet)', fontStyle: 'italic' }}>
                                                    +{card.features.length - 4} more
                                                </li>
                                            )}
                                        </ul>
                                    ) : (
                                        <span style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>-</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    </tbody>

                    {/* Footer - Action Buttons */}
                    <tfoot>
                        <tr>
                            <td style={{ padding: '1rem' }}></td>
                            {cards.map(card => (
                                <td key={card.id} style={{ padding: '1rem', textAlign: 'center' }}>
                                    <Link
                                        to={`/card-guide/${card.id}`}
                                        style={{
                                            display: 'inline-block',
                                            padding: '8px 16px',
                                            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-pink))',
                                            color: '#000',
                                            textDecoration: 'none',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        View Details →
                                    </Link>
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    };

    // Show loading state from hook
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-danger)' }}>
                <h3>Error loading credit cards</h3>
                <p>Please try again later.</p>
            </div>
        );
    }

    // Show skeleton during initial load for grid view
    if (isLoading && view === 'grid') {
        return (
            <div style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
                <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        Compare Credit Cards
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Loading cards...</p>
                </header>
                <CreditCardGridSkeleton count={9} />
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
            {/* Header */}
            <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                    Compare Credit Cards
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Compare the features and benefits of your selected cards.
                </p>
            </header>

            {/* Grid View */}
            {view === 'grid' && (
                <>
                    {/* Search and Filters */}
                    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        {/* Search */}
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Search cards by name, bank, or features..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.95rem',
                                }}
                            />
                        </div>

                        {/* Bank + Sort Row */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            <select
                                value={activeBank}
                                onChange={(e) => setActiveBank(e.target.value)}
                                style={{
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.85rem',
                                    minWidth: '160px',
                                }}
                            >
                                {banks.map(bank => (
                                    <option key={bank} value={bank}>{bank === 'All' ? 'All Banks' : bank}</option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.85rem',
                                }}
                            >
                                <option value="recommended">Recommended</option>
                                <option value="fee-low">Fee: Low to High</option>
                                <option value="fee-high">Fee: High to Low</option>
                                <option value="reward-high">Highest Rewards</option>
                                <option value="name">Name A-Z</option>
                            </select>
                        </div>

                        {/* Category Filters */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {primaryFilters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: '20px',
                                        border: activeFilter === filter ? '1px solid var(--accent-purple)' : '1px solid var(--glass-border)',
                                        background: activeFilter === filter ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.03)',
                                        color: activeFilter === filter ? 'var(--accent-purple)' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {filter}
                                </button>
                            ))}

                            {showAllCategories && secondaryFilters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: '20px',
                                        border: activeFilter === filter ? '1px solid var(--accent-purple)' : '1px solid var(--glass-border)',
                                        background: activeFilter === filter ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.03)',
                                        color: activeFilter === filter ? 'var(--accent-purple)' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    {filter}
                                </button>
                            ))}

                            <button
                                onClick={() => setShowAllCategories(!showAllCategories)}
                                style={{
                                    padding: '8px 12px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--accent-purple)',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                }}
                            >
                                {showAllCategories ? '− Less' : `+${secondaryFilters.length} more`}
                            </button>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}>
                        {sortedCards.length > 0 ? (
                            sortedCards.map((card, index) => {
                                const isSelected = selectedCards.includes(card.id);

                                return (
                                    <div
                                        key={card.id}
                                        className="glass-panel credit-card-item"
                                        style={{
                                            padding: '1.5rem',
                                            cursor: 'pointer',
                                            border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                                            position: 'relative',
                                            transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                            boxShadow: isSelected ? '0 0 30px rgba(6, 182, 212, 0.2)' : 'none',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onClick={(e) => openModal(card, e)}
                                    >
                                        {/* Selection Checkbox */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                height: '32px',
                                                width: '32px',
                                                borderRadius: '50%',
                                                border: isSelected ? '2px solid var(--accent-cyan)' : '2px solid rgba(255,255,255,0.25)',
                                                backgroundColor: isSelected ? 'var(--accent-cyan)' : 'rgba(0,0,0,0.4)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                boxShadow: isSelected ? '0 0 15px rgba(6, 182, 212, 0.5)' : 'none'
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCardSelection(card.id);
                                            }}
                                            title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
                                        >
                                            {isSelected && <span style={{ color: '#000', fontSize: '16px', fontWeight: 'bold' }}>✓</span>}
                                        </div>

                                        {/* Favorite Button */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                left: '12px',
                                                height: '32px',
                                                width: '32px',
                                                borderRadius: '50%',
                                                backgroundColor: 'rgba(0,0,0,0.4)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavoriteCard(card.id, card.name);
                                            }}
                                        >
                                            <span style={{ fontSize: '14px' }}>
                                                {isCardFavorite(card.id) ? '❤️' : '🤍'}
                                            </span>
                                        </div>

                                        {/* Card Image */}
                                        <div style={{
                                            height: '140px',
                                            marginBottom: '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '12px'
                                        }}>
                                            <CardImage card={card} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                        </div>

                                        <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.05rem', fontWeight: 600 }}>{card.name}</h3>
                                        <p style={{ margin: '0 0 0.8rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{card.bank}</p>

                                        {/* Tags */}
                                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                                            {card.category && (
                                                <span style={{
                                                    display: 'inline-block',
                                                    background: 'rgba(99, 102, 241, 0.15)',
                                                    color: '#a5b4fc',
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.75rem',
                                                }}>
                                                    {card.category}
                                                </span>
                                            )}
                                            {card.tier && (
                                                <span style={{
                                                    display: 'inline-block',
                                                    background: `${getTierColor(card.tier)}20`,
                                                    color: getTierColor(card.tier),
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.75rem',
                                                    textTransform: 'capitalize',
                                                }}>
                                                    {card.tier?.replace('-', ' ')}
                                                </span>
                                            )}
                                        </div>

                                        {/* Quick Stats */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '8px',
                                            fontSize: '0.8rem',
                                        }}>
                                            <div>
                                                <div style={{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Annual Fee</div>
                                                <div style={{ fontWeight: 600, color: parseFee(card.annualFee) === 0 ? '#22c55e' : 'var(--text-primary)' }}>
                                                    {card.annualFee || 'N/A'}
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Reward Rate</div>
                                                <div style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>
                                                    {card.rewardRate || 'Varies'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                                <h3>No cards found</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>

                    {/* Selected Cards Floating Bar */}
                    {selectedCards.length > 0 && (
                        <div style={{
                            position: 'fixed',
                            bottom: '24px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(20, 20, 35, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '16px',
                            padding: '12px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            zIndex: 100,
                            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                        }}>
                            <span style={{ fontWeight: 600 }}>
                                {selectedCards.length}/4 cards selected
                            </span>
                            <Link
                                to="/compare-cards"
                                state={{ view: 'table' }}
                                onClick={() => { }}
                                style={{
                                    padding: '10px 20px',
                                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-pink))',
                                    color: '#000',
                                    textDecoration: 'none',
                                    borderRadius: '10px',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                }}
                            >
                                Compare Now →
                            </Link>
                            <button
                                onClick={handleClearSelection}
                                style={{
                                    padding: '10px 16px',
                                    background: 'transparent',
                                    border: '1px solid rgba(239, 68, 68, 0.5)',
                                    color: '#ef4444',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Table View - COMPARISON */}
            {view === 'table' && (
                <>
                    {selectedCards.length > 0 ? (
                        <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
                            {/* Header */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1.5rem',
                                borderBottom: '1px solid var(--glass-border)',
                                paddingBottom: '1rem',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    Comparison
                                    <span style={{
                                        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-pink))',
                                        color: '#000',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                    }}>
                                        {selectedCards.length}/4
                                    </span>
                                </h3>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={copyComparisonLink}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '10px',
                                            border: '1px solid var(--glass-border)',
                                            background: 'transparent',
                                            color: 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                        }}
                                    >
                                        🔗 Copy Link
                                    </button>

                                    {navigator.share && (
                                        <button
                                            onClick={shareComparison}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '10px',
                                                border: '1px solid var(--glass-border)',
                                                background: 'transparent',
                                                color: 'var(--text-secondary)',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                            }}
                                        >
                                            📤 Share
                                        </button>
                                    )}

                                    <button
                                        onClick={handleClearSelection}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '10px',
                                            border: '1px solid #ef4444',
                                            background: 'transparent',
                                            color: '#ef4444',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                        }}
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>

                            {/* ACTUAL COMPARISON TABLE */}
                            {renderComparisonTable()}
                        </div>
                    ) : (
                        /* Empty State with Popular Comparisons */
                        <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                                No Cards Selected
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                                Select from popular comparisons below, or go to Cards to choose your own.
                            </p>

                            {/* Popular Comparisons Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: '1.25rem',
                                textAlign: 'left',
                                marginBottom: '2rem',
                            }}>
                                {popularComparisons.map((comparison, idx) => (
                                    <div
                                        key={idx}
                                        className="glass-panel"
                                        style={{
                                            padding: '1.25rem',
                                            cursor: 'pointer',
                                            border: '1px solid var(--accent-cyan)',
                                            borderRadius: '12px',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onClick={() => handlePresetSelection(comparison.cards)}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>
                                            {comparison.name}
                                        </h4>
                                        <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            {comparison.desc}
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {comparison.cards.map((card, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        padding: '4px 10px',
                                                        background: 'rgba(6, 182, 212, 0.1)',
                                                        border: '1px solid rgba(6, 182, 212, 0.3)',
                                                        borderRadius: '16px',
                                                        fontSize: '0.75rem',
                                                        color: 'var(--accent-cyan)',
                                                    }}
                                                >
                                                    {card}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/know-your-cards"
                                style={{
                                    display: 'inline-block',
                                    padding: '14px 28px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-pink))',
                                    color: '#000',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                }}
                            >
                                Browse All Cards →
                            </Link>
                        </div>
                    )}
                </>
            )}

            {/* Modal */}
            {modalCard && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 200,
                        padding: '2rem',
                    }}
                    onClick={closeModal}
                >
                    <div
                        className="glass-panel"
                        style={{
                            maxWidth: '500px',
                            width: '100%',
                            padding: '2rem',
                            maxHeight: '80vh',
                            overflow: 'auto',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                            }}
                        >
                            ×
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <CardImage card={modalCard} style={{ maxWidth: '200px', margin: '0 auto 1rem' }} />
                            <h3 style={{ margin: '0 0 0.25rem' }}>{modalCard.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{modalCard.bank}</p>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Annual Fee</span>
                                <span style={{ fontWeight: 600, color: parseFee(modalCard.annualFee) === 0 ? '#22c55e' : 'var(--text-primary)' }}>
                                    {modalCard.annualFee || 'N/A'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Reward Rate</span>
                                <span style={{ fontWeight: 600 }}>{modalCard.rewardRate || 'Varies'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Forex Markup</span>
                                <span style={{ fontWeight: 600 }}>{modalCard.fxMarkup || 'N/A'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Best For</span>
                                <span style={{ fontWeight: 600 }}>{modalCard.bestFor || '-'}</span>
                            </div>
                        </div>

                        {modalCard.features && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ margin: '0 0 0.75rem', color: 'var(--accent-cyan)' }}>Key Features</h4>
                                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                                    {modalCard.features.slice(0, 5).map((f, i) => (
                                        <li key={i} style={{ marginBottom: '0.5rem' }}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => {
                                    handleCardSelection(modalCard.id);
                                    closeModal();
                                }}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: selectedCards.includes(modalCard.id) ? '1px solid #ef4444' : '1px solid var(--accent-cyan)',
                                    background: selectedCards.includes(modalCard.id) ? 'rgba(239, 68, 68, 0.1)' : 'rgba(6, 182, 212, 0.1)',
                                    color: selectedCards.includes(modalCard.id) ? '#ef4444' : 'var(--accent-cyan)',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                }}
                            >
                                {selectedCards.includes(modalCard.id) ? 'Remove from Compare' : 'Add to Compare'}
                            </button>
                            <Link
                                to={`/card-guide/${modalCard.id}`}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-pink))',
                                    color: '#000',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    textAlign: 'center',
                                }}
                            >
                                View Full Details
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

CreditCardComparison.propTypes = {
    view: PropTypes.oneOf(['grid', 'table']),
    selectedCards: PropTypes.array,
    toggleCardSelection: PropTypes.func,
    clearSelection: PropTypes.func,
};

export default CreditCardComparison;
