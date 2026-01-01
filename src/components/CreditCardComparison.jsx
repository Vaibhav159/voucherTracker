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
    const [selectedPreset, setSelectedPreset] = useState(null);

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
        setSelectedPreset(null); // Clear preset when manually changing selection

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
        setSelectedPreset(null);
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
            if (activeFilter === 'Cashback') {
                return card.rewardType === 'cashback' || card.category === 'Cashback';
            }
            if (activeFilter === 'Travel') {
                if (card.category === 'Travel') return true;
                const tags = card.tags?.map(t => t.toLowerCase()) || [];
                return tags.includes('travel');
            }
            if (activeFilter === 'Premium') {
                if (card.category === 'Premium') return true;
                const tags = card.tags?.map(t => t.toLowerCase()) || [];
                return tags.includes('premium') || tags.includes('super-premium') || tags.includes('invite only');
            }
            if (activeFilter === 'Dining') {
                const tags = card.tags?.map(t => t.toLowerCase()) || [];
                const features = card.features?.join(' ').toLowerCase() || '';
                const bestFor = card.bestFor?.toLowerCase() || '';
                return tags.includes('dining') || tags.includes('food delivery') ||
                    features.includes('dining') || bestFor.includes('food') || bestFor.includes('dining');
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
                // For "recommended" with an active category filter, prioritize exact category matches
                if (activeFilter && activeFilter !== 'All' && activeFilter !== 'Lifetime Free' && activeFilter !== 'Low Forex' && activeFilter !== 'Lounge') {
                    return cards.sort((a, b) => {
                        const aExact = a.category === activeFilter ? 0 : 1;
                        const bExact = b.category === activeFilter ? 0 : 1;
                        return aExact - bExact;
                    });
                }
                return cards;
        }
    }, [filteredCards, sortBy, activeFilter]);

    // Categories - only filters with actual implementation
    const cardFilters = ['All', 'Lifetime Free', 'Low Forex', 'Cashback', 'Travel', 'Premium', 'Shopping', 'Dining', 'Fuel', 'Lounge'];

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
    const handlePresetSelection = useCallback((cardNames, presetName) => {
        // Find card IDs that match the card names with improved matching
        const matchedIds = [];

        cardNames.forEach(searchName => {
            const searchLower = searchName.toLowerCase().trim();
            const searchWords = searchLower.split(/\s+/).filter(word => word.length > 2);

            // Try to find the best match using different strategies
            let found = null;

            // Strategy 1: Exact match
            found = creditCards.find(card => card.name.toLowerCase() === searchLower);

            // Strategy 2: Card name starts with search term
            if (!found) {
                found = creditCards.find(card => card.name.toLowerCase().startsWith(searchLower));
            }

            // Strategy 3: Card name contains the full search term
            if (!found) {
                found = creditCards.find(card => card.name.toLowerCase().includes(searchLower));
            }

            // Strategy 4: All significant search words appear in card name (in order)
            if (!found && searchWords.length > 0) {
                found = creditCards.find(card => {
                    const cardNameLower = card.name.toLowerCase();
                    // All words from searchName must be in the card name
                    return searchWords.every(word => cardNameLower.includes(word));
                });
            }

            // Strategy 5: Match by key identifying words (bank + card type)
            if (!found && searchWords.length >= 2) {
                found = creditCards.find(card => {
                    const cardNameLower = card.name.toLowerCase();
                    const cardWords = cardNameLower.split(/\s+/);
                    // Check if at least 2 key words match and the first word matches
                    const firstWordMatch = cardWords[0].includes(searchWords[0]) || searchWords[0].includes(cardWords[0]);
                    const secondWordMatch = searchWords.length > 1 && cardWords.some(w => w.includes(searchWords[1]) || searchWords[1].includes(w));
                    return firstWordMatch && secondWordMatch;
                });
            }

            if (found && !matchedIds.includes(found.id)) {
                matchedIds.push(found.id);
            }
        });

        if (matchedIds.length > 0) {
            // Clear existing and select new ones
            clearSelection();
            matchedIds.forEach(id => toggleCardSelection(id));
            setSelectedPreset(presetName || null);
            toast.success(`Selected ${matchedIds.length} cards for comparison`);
            // Scroll to top to show comparison table
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            toast.warning('Could not find matching cards');
        }
    }, [clearSelection, toggleCardSelection, toast, creditCards, setSelectedPreset]);

    // Popular comparisons for empty state
    const popularComparisons = [
        { name: '⛽ Fuel Savers', desc: 'Maximum savings on fuel purchases and surcharge waiver', cards: ['IndianOil RBL Bank XTRA', 'BPCL SBI Card', 'IndianOil Axis Bank'] },
        { name: '🍽️ Dining Delights', desc: 'Best rewards on restaurants, food delivery, and dining', cards: ['HDFC Swiggy Credit Card', 'IndusInd EazyDiner Credit Card', 'HSBC Live+ Credit Card'] },
        { name: '🎬 Entertainment Buffs', desc: 'Free movie tickets, BOGO offers, and entertainment perks', cards: ['PVR INOX Kotak Credit Card', 'Axis MyZone Credit Card', 'IndusInd Legend Credit Card'] },
        { name: '📱 UPI Champions', desc: 'Best rewards on UPI scan & pay transactions', cards: ['HDFC Tata Neu Infinity', 'Kiwi RuPay Credit Card', 'Jupiter Edge CSB'] },
        { name: '💡 Utility Warriors', desc: 'Best cashback on electricity, broadband, and bill payments', cards: ['Axis Airtel Credit Card', 'Axis Bank Ace', 'PhonePe HDFC Ultimo'] },
        { name: '🆓 Lifetime Free Stars', desc: 'Best value with zero annual fees forever', cards: ['Amazon Pay ICICI', 'IDFC First Select', 'Scapia Federal Credit Card'] },
        { name: '🌟 Beginners\' Best', desc: 'Perfect first credit cards for new users', cards: ['Axis Neo Credit Card', 'SBI SimplyCLICK Credit Card', 'OneCard Credit Card'] },
        { name: '🏨 Hotel Loyalists', desc: 'Best cards for hotel points, elite status, and stays', cards: ['Marriott Bonvoy HDFC', 'Axis Reserve', 'HDFC Regalia Gold'] },
        { name: '✈️ Airline Miles', desc: 'Best for air miles accumulation and transfers', cards: ['Axis Atlas Credit Card', 'Air India SBI', 'Amex Platinum Travel'] },
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
    // Only show blocking error if we have no credit cards AND a backend error
    if (error && sortedCards.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-danger)' }}>
                <h3>Error loading credit cards</h3>
                <p>Please try again later or check your connection.</p>
            </div>
        );
    }

    // Show skeleton during initial load for grid view
    if (isLoading && view === 'grid') {
        return (
            <div style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
                <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        Browse Credit Cards
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Loading cards...</p>
                </header>
                <CreditCardGridSkeleton count={9} />
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
            {/* Header - Dynamic based on view */}
            <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                    {view === 'grid' ? 'Browse Credit Cards' : 'Compare Credit Cards'}
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {view === 'grid'
                        ? `${creditCards.length} cards available • Click to compare`
                        : `Comparing ${selectedCards.length} cards • Features and benefits`
                    }
                </p>
            </header>


            {/* Grid View */}
            {view === 'grid' && (
                <>
                    {/* Premium Filter Section - Liquid Glass */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '28px 32px',
                        marginBottom: '2.5rem',
                        border: '1px solid rgba(255,255,255,0.18)',
                        boxShadow: `
                            0 8px 32px rgba(0,0,0,0.3),
                            inset 0 1px 1px rgba(255,255,255,0.1),
                            inset 0 -1px 1px rgba(0,0,0,0.1)
                        `,
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Glass Shine Effect */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '50%',
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
                            borderRadius: '24px 24px 0 0',
                            pointerEvents: 'none',
                        }} />
                        {/* Accent Glow */}
                        <div style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-20%',
                            width: '60%',
                            height: '100%',
                            background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '-50%',
                            right: '-20%',
                            width: '60%',
                            height: '100%',
                            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                        {/* Top Row - Search & Controls */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '24px',
                            position: 'relative',
                            zIndex: 1,
                        }}>
                            {/* Search Input - Glass Style */}
                            <div style={{ flex: '1 1 300px', position: 'relative', minWidth: '200px' }}>
                                <input
                                    type="text"
                                    placeholder="Search credit cards..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        minWidth: '200px',
                                        padding: '16px 20px',
                                        paddingLeft: '52px',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        background: 'rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(10px)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        transition: 'all 0.3s ease',
                                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(6, 182, 212, 0.6)';
                                        e.target.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.2), inset 0 1px 2px rgba(0,0,0,0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                                        e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.1)';
                                    }}
                                />
                                <svg
                                    style={{
                                        position: 'absolute',
                                        left: '18px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '20px',
                                        height: '20px',
                                        opacity: 0.5,
                                    }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Bank Filter - Glass Style */}
                            <select
                                value={activeBank}
                                onChange={(e) => setActiveBank(e.target.value)}
                                style={{
                                    padding: '16px 20px',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    background: 'rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(10px)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    minWidth: '160px',
                                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {banks.map(bank => (
                                    <option key={bank} value={bank}>{bank === 'All' ? 'All Banks' : bank}</option>
                                ))}
                            </select>

                            {/* Sort - Glass Style */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '16px 20px',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    background: 'rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(10px)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    minWidth: '150px',
                                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <option value="recommended">Recommended</option>
                                <option value="fee-low">Fee: Low to High</option>
                                <option value="fee-high">Fee: High to Low</option>
                                <option value="reward-high">Highest Rewards</option>
                                <option value="name">Name A-Z</option>
                            </select>
                        </div>

                        {/* Category Filters - Glass Pills */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px',
                            position: 'relative',
                            zIndex: 1,
                        }}>
                            {cardFilters.map(filter => {
                                const isActive = activeFilter === filter;
                                return (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        style={{
                                            padding: '12px 24px',
                                            borderRadius: '50px',
                                            border: isActive
                                                ? '1px solid rgba(6, 182, 212, 0.5)'
                                                : '1px solid rgba(255,255,255,0.12)',
                                            background: isActive
                                                ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3))'
                                                : 'rgba(255,255,255,0.04)',
                                            backdropFilter: 'blur(8px)',
                                            color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            fontWeight: isActive ? '600' : '500',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            boxShadow: isActive
                                                ? '0 4px 20px rgba(6, 182, 212, 0.25), inset 0 1px 1px rgba(255,255,255,0.1)'
                                                : 'inset 0 1px 1px rgba(255,255,255,0.05)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) {
                                                e.target.style.background = 'rgba(255,255,255,0.08)';
                                                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                e.target.style.color = 'rgba(255,255,255,0.9)';
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) {
                                                e.target.style.background = 'rgba(255,255,255,0.04)';
                                                e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                                                e.target.style.color = 'rgba(255,255,255,0.6)';
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = 'inset 0 1px 1px rgba(255,255,255,0.05)';
                                            }
                                        }}
                                    >
                                        {filter}
                                    </button>
                                );
                            })}
                        </div>
                    </div>


                    {/* Cards Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 320px))',
                        justifyContent: 'center',
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
                                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    {selectedPreset ? (
                                        <span style={{ color: 'var(--accent-cyan)' }}>{selectedPreset}</span>
                                    ) : (
                                        'Comparison'
                                    )}
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

                                    {/* Share to X (Twitter) */}
                                    <button
                                        onClick={() => {
                                            const cardNames = selectedCards.map(id => getCardDetails(id)?.name).filter(Boolean).join(' vs ');
                                            const cardIds = selectedCards.join(',');
                                            const url = `${window.location.origin}${window.location.pathname}#/compare-cards?cards=${cardIds}`;
                                            const text = `Check out my credit card comparison: ${cardNames} on Voucher Tracker! 💳`;
                                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                                            toast.success('Opening X/Twitter...');
                                        }}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(29, 161, 242, 0.4)',
                                            background: 'rgba(29, 161, 242, 0.1)',
                                            color: '#1DA1F2',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                        }}
                                        title="Share to X (Twitter)"
                                    >
                                        𝕏 Share
                                    </button>


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
                                        onClick={() => handlePresetSelection(comparison.cards, comparison.name)}
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
