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
import { Helmet } from 'react-helmet-async';

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
    const [activeFeeType, setActiveFeeType] = useState(null);
    const [activeTier, setActiveTier] = useState(null);
    const [mobileActiveCardIndex, setMobileActiveCardIndex] = useState(0); // For mobile tabbed comparison

    // Simulate initial load for skeleton
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const getCardDetails = (id) => creditCards.find(card => card.id === id || card.slug === id || String(card.id) === String(id));

    const openModal = (card, e) => {
        e.stopPropagation();
        setModalCard(card);
    };

    const closeModal = () => setModalCard(null);

    // Enhanced card selection with toast
    const handleCardSelection = useCallback((cardId) => {
        const card = getCardDetails(cardId);
        const isSelected = selectedCards.includes(cardId);

        if (!isSelected && selectedCards.length >= 3) { // Changed limit to 3
            toast.error('You can compare up to 3 cards');
            return;
        }

        toggleCardSelection(cardId);
        setSelectedPreset(null); // Clear preset when manually changing selection

        if (navigator.vibrate) {
            navigator.vibrate(isSelected ? 30 : [30, 50, 30]);
        }

        if (!isSelected) {
            toast.success(`${card?.name} added to comparison`);
        } else {
            toast.info(`${card?.name} removed from comparison`);
        }
    }, [selectedCards, toggleCardSelection, toast, getCardDetails]);

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
    }, [selectedCards, getCardDetails]);

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

            // Helper to get tags from either old or new format
            const getTags = (c) => (c.metadata?.tags || c.tags || []).map(t => t.toLowerCase());
            const getFeatures = (c) => {
                if (Array.isArray(c.features)) return c.features.join(' ').toLowerCase();
                if (c.features && typeof c.features === 'object') {
                    return Object.values(c.features).map(v => typeof v === 'string' ? v : JSON.stringify(v)).join(' ').toLowerCase();
                }
                return '';
            };
            const getBestFor = (c) => (c.metadata?.bestFor || c.bestFor || '').toLowerCase();
            const getTier = (c) => (c.tier || '').toLowerCase();
            const getRewardType = (c) => (c.rewards?.type || c.rewardType || '').toLowerCase();
            const getAnnualFee = (c) => c.fees?.annual ?? c.annualFee;

            if (activeFilter === 'Lifetime Free') {
                const feeValue = getAnnualFee(card);
                if (typeof feeValue === 'number') return feeValue === 0;
                const feeLower = String(feeValue || '').toLowerCase();
                return feeLower.includes('lifetime free') || feeLower.includes('₹0') || feeLower === 'free' || feeLower === '0';
            }
            if (activeFilter === 'Low Forex') {
                const fxMarkup = card.features?.forex?.markup || card.fxMarkup;
                const fxNum = typeof fxMarkup === 'number' ? fxMarkup * 100 : parseFloat(String(fxMarkup || '').replace('%', '') || '100');
                return fxNum <= 2;
            }
            if (activeFilter === 'Fuel') {
                const tags = getTags(card);
                if (tags.includes('fuel')) return true;
                const features = getFeatures(card);
                const name = card.name?.toLowerCase() || '';
                return features.includes('fuel') || name.includes('fuel') || name.includes('petrol');
            }
            if (activeFilter === 'Shopping') {
                const tags = getTags(card);
                if (tags.includes('shopping') || tags.includes('online shopping')) return true;
                const features = getFeatures(card);
                const bestFor = getBestFor(card);
                return features.includes('shopping') || bestFor.includes('shopping') || bestFor.includes('amazon') || bestFor.includes('flipkart');
            }
            if (activeFilter === 'Lounge') {
                const tags = getTags(card);
                if (tags.includes('lounge') || tags.includes('lounge access')) return true;
                const features = getFeatures(card);
                const loungeInfo = card.features?.lounge;
                if (loungeInfo && (loungeInfo.domestic !== 'None' || loungeInfo.international !== 'None')) return true;
                return features.includes('lounge');
            }
            if (activeFilter === 'Cashback') {
                const rewardType = getRewardType(card);
                const tags = getTags(card);
                return rewardType === 'cashback' || tags.includes('cashback');
            }
            if (activeFilter === 'Travel') {
                const tags = getTags(card);
                return tags.includes('travel') || tags.includes('travel card');
            }
            if (activeFilter === 'Premium') {
                const tier = getTier(card);
                const tags = getTags(card);
                return tier.includes('premium') || tier.includes('super premium') || tier.includes('super-premium') ||
                    tags.includes('premium') || tags.includes('super-premium') || tags.includes('invite only');
            }
            if (activeFilter === 'Dining') {
                const tags = getTags(card);
                const features = getFeatures(card);
                const bestFor = getBestFor(card);
                return tags.includes('dining') || tags.includes('food delivery') || tags.includes('food') ||
                    features.includes('dining') || bestFor.includes('food') || bestFor.includes('dining');
            }
            if (activeFilter === 'Co-branded') {
                const tier = getTier(card);
                const tags = getTags(card);
                return tier.includes('co-branded') || tier.includes('cobranded') ||
                    tags.includes('co-branded') || tags.includes('cobranded');
            }
            if (activeFilter === 'Entry Level') {
                const tier = getTier(card);
                const tags = getTags(card);
                return tier.includes('entry') || tags.includes('entry level') || tags.includes('entry-level');
            }
            if (activeFilter === 'Miles') {
                const rewardType = getRewardType(card);
                const features = getFeatures(card);
                const tags = getTags(card);
                return rewardType === 'miles' || tags.includes('miles') || tags.includes('airmiles') ||
                    features.includes('miles') || features.includes('airmiles');
            }
            if (activeFilter === 'UPI') {
                const features = getFeatures(card);
                const name = card.name?.toLowerCase() || '';
                const tags = getTags(card);
                return tags.includes('upi') || tags.includes('rupay') ||
                    features.includes('upi') || name.includes('upi') || name.includes('rupay');
            }
            return false;
        }).filter(card => {
            // Fee Type filter
            if (activeFeeType) {
                const fee = parseFee(card.annualFee);
                const feeLower = card.annualFee?.toLowerCase() || '';
                const isLTF = feeLower.includes('lifetime free') || feeLower.includes('₹0') || feeLower === 'free' || fee === 0;

                if (activeFeeType === 'ltf' && !isLTF) return false;
                if (activeFeeType === 'low' && (isLTF || fee >= 1000)) return false;
                if (activeFeeType === 'mid' && (fee < 1000 || fee >= 5000)) return false;
                if (activeFeeType === 'premium' && fee < 5000) return false;
            }
            return true;
        }).filter(card => {
            // Tier filter
            if (activeTier) {
                const cardTier = card.tier?.toLowerCase().replace(' ', '-') || '';
                return cardTier === activeTier || cardTier.includes(activeTier);
            }
            return true;
        });
    }, [searchTerm, activeBank, activeFilter, feeRange, forexFilter, hasLounge, networkFilter, creditCards, activeFeeType, activeTier]);

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
    const cardFilters = ['All', 'Lifetime Free', 'Low Forex', 'Cashback', 'Travel', 'Premium', 'Shopping', 'Dining', 'Fuel', 'Lounge', 'Co-branded', 'Entry Level', 'Miles', 'UPI'];

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

    // Get highlighted features for a card
    const getCardHighlights = (card) => {
        const highlights = [];

        // Check smartBuy for accelerated rewards
        const smartBuy = card.rewards?.calculator?.smartBuy;
        if (smartBuy?.merchants) {
            const topMultiplier = Object.values(smartBuy.merchants).reduce((max, m) => {
                const mult = parseInt(m.multiplier?.replace('X', '') || '0');
                return mult > max.value ? { value: mult, label: m.label } : max;
            }, { value: 0, label: '' });

            if (topMultiplier.value >= 5) {
                highlights.push({
                    icon: '🚀',
                    text: topMultiplier.label || `${topMultiplier.value}X Rewards`,
                    color: '#22c55e'
                });
            }
        }

        // Check for lounge access
        const lounge = card.features?.lounge;
        if (lounge && lounge.domestic !== 'None' && !lounge.domestic?.includes('None')) {
            const domesticMatch = lounge.domestic?.match(/(\d+)/);
            const unlimited = lounge.domestic?.toLowerCase().includes('unlimited');
            highlights.push({
                icon: '✈️',
                text: unlimited ? 'Unlimited Lounge' : domesticMatch ? `${domesticMatch[1]} Lounge Visits` : 'Lounge Access',
                color: '#a855f7'
            });
        }

        // Check for low forex
        const fxMarkup = card.features?.forex?.markup;
        if (fxMarkup && fxMarkup <= 0.02) {
            highlights.push({
                icon: '🌍',
                text: `${(fxMarkup * 100).toFixed(1)}% Forex`,
                color: '#3b82f6'
            });
        }

        // Check for fuel benefits
        const fuelBenefit = card.features?.fuel;
        if (fuelBenefit?.surchargeWaiver && fuelBenefit.surchargeWaiver !== '0%') {
            highlights.push({
                icon: '⛽',
                text: `Fuel Waiver ${fuelBenefit.surchargeWaiver}`,
                color: '#f59e0b'
            });
        }

        // Check for lifetime free
        const annualFee = card.fees?.annual;
        if (annualFee === 0 || String(annualFee).toLowerCase().includes('free')) {
            highlights.push({
                icon: '🆓',
                text: 'Lifetime Free',
                color: '#10b981'
            });
        }

        // Check for milestone benefits
        const milestones = card.features?.milestones;
        if (milestones && milestones.length > 0) {
            const topMilestone = milestones[0];
            if (topMilestone?.reward) {
                highlights.push({
                    icon: '🎁',
                    text: topMilestone.reward.substring(0, 25) + (topMilestone.reward.length > 25 ? '...' : ''),
                    color: '#ec4899'
                });
            }
        }

        return highlights.slice(0, 3); // Limit to 3 highlights
    };

    // Check if fee is free
    const isFreeCard = (fee) => {
        if (!fee) return false;
        const lower = fee.toLowerCase();
        return lower.includes('free') || lower.includes('₹0');
    };

    // Handle preset comparison selection - find cards by ID and select them
    const handlePresetSelection = useCallback((cardIds, presetName) => {
        const matchedIds = [];

        cardIds.forEach(id => {
            // Direct ID match
            const found = creditCards.find(card => card.id === id || card.slug === id || card.id === parseInt(id));

            if (found && !matchedIds.includes(found.id)) {
                matchedIds.push(found.id);
            } else {
                // Legacy fallback: Try fuzzy name match if ID fails (e.g. for user custom presets if any)
                // This keeps backward compatibility just in case
                const searchLower = id.toLowerCase();
                const foundByName = creditCards.find(card =>
                    card.name.toLowerCase() === searchLower ||
                    card.name.toLowerCase().includes(searchLower)
                );
                if (foundByName && !matchedIds.includes(foundByName.id)) {
                    matchedIds.push(foundByName.id);
                }
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
            toast.warning('Could not find matching cards for this preset');
        }
    }, [clearSelection, toggleCardSelection, toast, creditCards, setSelectedPreset]);

    // Popular comparisons for empty state
    const popularComparisons = [
        {
            name: '⛽ Fuel Savers',
            desc: 'Maximum savings on fuel purchases and surcharge waiver',
            cards: ['bpcl-sbi-octane', 'axis-indianoil', 'icici-hpcl-super-saver']
        },
        {
            name: '🍽️ Dining Delights',
            desc: 'Best rewards on restaurants, food delivery, and dining',
            cards: ['hdfc-swiggy', 'indusind-eazydiner-platinum', 'hsbc-live-plus']
        },
        {
            name: '🎬 Entertainment Buffs',
            desc: 'Free movie tickets, BOGO offers, and entertainment perks',
            cards: ['kotak-pvr-inox', 'axis-myzone', 'indusind-legend']
        },
        {
            name: '📱 UPI Champions',
            desc: 'Best rewards on UPI scan & pay transactions',
            cards: ['tata-neu-infinity-hdfc', 'kiwi-rupay-credit-card', 'jupiter-edge-csb-rupay-credit-card']
        },
        {
            name: '💡 Utility Warriors',
            desc: 'Best cashback on electricity, broadband, and bill payments',
            cards: ['axis-airtel', 'axis-ace', 'sbi-cashback']
        },
        {
            name: '🆓 Lifetime Free Stars',
            desc: 'Best value with zero annual fees forever',
            cards: ['amazon-pay-icici', 'idfc-first-select', 'scapia-federal-credit-card']
        },
        {
            name: '🌟 Beginners Best',
            desc: 'Perfect first credit cards for new users',
            cards: ['axis-neo', 'sbi-simplyclick', 'onecard-credit-card']
        },
        {
            name: '🏨 Hotel Loyalists',
            desc: 'Best cards for hotel points, elite status, and stays',
            cards: ['marriott-bonvoy-hdfc', 'axis-reserve', 'hdfc-regalia-gold']
        },
        {
            name: '✈️ Airline Miles',
            desc: 'Best for air miles accumulation and transfers',
            cards: ['axis-atlas', 'club-vistara-sbi-prime', 'amex-platinum-travel']
        },
    ];

    // Render Comparison Table
    const renderComparisonTable = () => {
        const cards = selectedCards.map(id => getCardDetails(id)).filter(Boolean);

        if (cards.length === 0) return null;

        // Dynamic column width based on number of cards and screen size
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 400;

        const getColumnWidth = () => {
            if (isMobile) {
                // Fixed width per card on mobile - allows horizontal scroll
                return '130px';
            }
            // Desktop sizes
            if (cards.length === 1) return '350px';
            if (cards.length === 2) return '280px';
            return '220px'; // 3 cards
        };
        const colWidth = getColumnWidth();
        const labelWidth = isMobile ? '75px' : '130px';

        // Always use table view - compact on mobile
        return (
            <div className="liquid-glass" style={{ marginTop: '1rem', position: 'relative' }}>
                <div className="comparison-table-wrapper" style={{
                    overflowX: 'auto',
                    borderRadius: 'inherit',
                    maxWidth: '100vw',
                    width: '100%',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    position: 'relative',
                    margin: isMobile ? '0 -1rem' : 0,
                    padding: isMobile ? '0 1rem' : 0,
                }}>
                    <style>
                        {`
                    .comparison-row:hover {
                        background: rgba(255, 255, 255, 0.03) !important;
                    }
                    .comparison-row:hover td {
                         color: var(--text-primary) !important;
                    }
                    `}
                    </style>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                        {/* Header - Card Images */}
                        <thead>
                            <tr>
                                <th className="glass-sticky-header" style={{
                                    padding: '0.5rem',
                                    textAlign: 'left',
                                    position: 'sticky',
                                    top: 0,
                                    left: 0,
                                    zIndex: 30,
                                    width: '130px'
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        💳 Card
                                    </span>
                                </th>
                                {cards.map(card => (
                                    <th key={card.id} className="glass-sticky-header" style={{
                                        padding: '0.75rem 0.5rem',
                                        textAlign: 'center',
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 20,
                                        width: colWidth,
                                        minWidth: colWidth,
                                        maxWidth: colWidth
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
                                        <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                                            <CardImage card={card} style={{ maxWidth: '80px', maxHeight: '45px' }} />
                                        </div>

                                        {/* Card Name */}
                                        <div style={{ fontWeight: 600, fontSize: '0.75rem', color: 'var(--text-primary)', marginBottom: '0.25rem', lineHeight: '1.2' }}>
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
                                <tr key={row.key} className="comparison-row" style={{
                                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                                    transition: 'background 0.2s ease'
                                }}>
                                    <td className="glass-sticky-col" style={{
                                        padding: '0.5rem',
                                        borderBottom: '1px solid var(--glass-border)',
                                        color: 'var(--text-secondary)',
                                        fontWeight: 500,
                                        fontSize: '0.85rem',
                                        position: 'sticky',
                                        left: 0,
                                        zIndex: 10
                                    }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>{row.icon}</span>
                                            <span>{row.label}</span>
                                        </span>
                                    </td>
                                    {cards.map(card => {
                                        const value = getComparisonValue(card, row.key);

                                        // Special rendering for Reward Rate to show Multiplier Badge
                                        if (row.key === 'rewardRate' && card.multiplierBadge) {
                                            return (
                                                <td key={card.id} style={{
                                                    padding: '0.5rem',
                                                    textAlign: 'center',
                                                    borderBottom: '1px solid var(--glass-border)',
                                                    color: 'var(--text-primary)',
                                                    background: 'rgba(34, 197, 94, 0.03)',
                                                    borderLeft: '1px dashed rgba(34, 197, 94, 0.2)',
                                                    borderRight: '1px dashed rgba(34, 197, 94, 0.2)',
                                                    width: colWidth,
                                                    minWidth: colWidth,
                                                    maxWidth: colWidth,
                                                    whiteSpace: 'normal',
                                                    fontSize: '0.75rem',
                                                    lineHeight: '1.3'
                                                }}>
                                                    <div style={{ fontWeight: 500 }}>{value}</div>
                                                    <div style={{ marginTop: '6px', fontSize: '0.7rem', color: '#22c55e', fontWeight: 600, background: 'rgba(34,197,94,0.1)', padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>
                                                        {card.multiplierBadge}
                                                    </div>
                                                </td>
                                            );
                                        }
                                        const isHighlight = (row.key === 'annualFee' && isFreeCard(value));

                                        return (
                                            <td key={card.id} style={{
                                                padding: '0.5rem',
                                                textAlign: 'center',
                                                borderBottom: '1px solid var(--glass-border)',
                                                color: isHighlight ? '#22c55e' : 'var(--text-primary)',
                                                fontWeight: isHighlight ? 600 : 400,
                                                fontSize: '0.75rem',
                                                width: colWidth,
                                                minWidth: colWidth,
                                                maxWidth: colWidth,
                                                whiteSpace: 'normal',
                                                lineHeight: '1.3'
                                            }}>
                                                {value}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}

                            {/* Features Row */}
                            <tr>
                                <td className="glass-sticky-col" style={{
                                    padding: '0.5rem',
                                    borderBottom: '1px solid var(--glass-border)',
                                    color: 'var(--text-secondary)',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                    verticalAlign: 'top',
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 10
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span>✨</span>
                                        <span>Key Features</span>
                                    </span>
                                </td>
                                {cards.map(card => (
                                    <td key={card.id} style={{
                                        padding: '0.5rem',
                                        borderBottom: '1px solid var(--glass-border)',
                                        textAlign: 'left',
                                        fontSize: '0.7rem',
                                        verticalAlign: 'top',
                                        lineHeight: '1.4',
                                        width: colWidth,
                                        minWidth: colWidth,
                                        maxWidth: colWidth,
                                        whiteSpace: 'normal'
                                    }}>
                                        {card.features && card.features.length > 0 ? (
                                            <ul style={{ margin: 0, paddingLeft: '1rem', color: 'var(--text-secondary)' }}>
                                                {card.features.slice(0, 3).map((f, i) => (
                                                    <li key={i} style={{ marginBottom: '2px' }}>{f}</li>
                                                ))}
                                                {card.features.length > 3 && (
                                                    <li style={{ color: 'var(--accent-violet)', fontStyle: 'italic' }}>
                                                        +{card.features.length - 3} more
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
                                <td style={{ padding: '0.5rem' }}></td>
                                {cards.map(card => (
                                    <td key={card.id} style={{ padding: '0.5rem', textAlign: 'center' }}>
                                        <Link
                                            to={`/card-guide/${card.slug || card.id}`}
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
                        Browse Cards
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Loading cards...</p>
                </header>
                <CreditCardGridSkeleton count={9} />
            </div>
        );
    }

    return (
        <div style={{ paddingTop: view === 'grid' ? '1rem' : '0', paddingBottom: '4rem' }}>
            {/* Header - Dynamic based on view */}
            {view === 'grid' ? (
                <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                    <Helmet>
                        <title>Best Credit Cards in India 2025 - Compare Fees & Rewards | Voucher Tracker</title>
                        <meta name="description" content="Compare the best credit cards in India. Find top cards for cashback, travel, and lounge access. Check eligibility and apply online." />
                        <meta name="keywords" content="best credit card, credit card comparison, best rewards card in India, lifetime free credit cards, voucher tracker" />
                        <link rel="canonical" href="https://vaibhav159.github.io/voucherTracker/#/know-your-cards" />
                    </Helmet>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.25rem', fontStyle: 'italic' }}>
                        Browse Cards
                    </h2>
                </header>
            ) : (
                <header style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
                    <Helmet>
                        <title>Compare Credit Cards | Voucher Tracker</title>
                        <meta name="description" content="Compare selected credit cards side-by-side. Analyze fees, rewards, and features to choose the best card for you." />
                        <link rel="canonical" href="https://vaibhav159.github.io/voucherTracker/#/compare-cards" />
                    </Helmet>
                    <h2 className="text-gradient" style={{ fontSize: '2rem', margin: 0, fontStyle: 'italic' }}>
                        Compare Credit Cards
                    </h2>
                </header>
            )}


            {/* Grid View */}
            {view === 'grid' && (
                <>
                    {/* Premium Filter Section - Refined Glassmorphism */}
                    <div style={{
                        marginBottom: '3rem',
                        position: 'relative',
                    }}>
                        {/* Container */}
                        <div style={{
                            background: 'rgba(30, 41, 59, 0.4)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            borderRadius: '24px',
                            padding: '1.5rem',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Gradient Overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                                pointerEvents: 'none',
                            }} />

                            {/* Top Row: Search & Dropdowns */}
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginBottom: '1.5rem',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                position: 'relative',
                                zIndex: 2
                            }}>
                                {/* Search Bar */}
                                <div style={{ flex: '1 1 300px', position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--text-secondary)',
                                        pointerEvents: 'none',
                                        transition: 'color 0.2s',
                                        zIndex: 10
                                    }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search cards..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 16px 10px 42px',
                                            background: 'rgba(0, 0, 0, 0.2)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '12px',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'var(--accent-cyan)';
                                            e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(6, 182, 212, 0.1)';
                                            e.target.previousSibling.style.color = 'var(--accent-cyan)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                            e.target.style.background = 'rgba(0, 0, 0, 0.2)';
                                            e.target.style.boxShadow = 'none';
                                            e.target.previousSibling.style.color = 'var(--text-secondary)';
                                        }}
                                    />
                                </div>

                                {/* Controls Right */}
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    {/* Bank Select */}
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            value={activeBank}
                                            onChange={(e) => setActiveBank(e.target.value)}
                                            style={{
                                                appearance: 'none',
                                                padding: '8px 32px 8px 12px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '10px',
                                                color: 'var(--text-primary)',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                outline: 'none',
                                                minWidth: '120px',
                                                transition: 'all 0.2s',
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                                        >
                                            {banks.map(bank => {
                                                let label = bank;
                                                if (bank === 'All') {
                                                    label = 'All Banks';
                                                } else if (bank.includes('/') && bank.length > 24) {
                                                    // Handle multi-bank entries usually found in co-branded cards
                                                    label = `${bank.split('/')[0].trim()} & Partners`;
                                                } else if (bank.length > 24) {
                                                    label = `${bank.substring(0, 22)}...`;
                                                }
                                                return <option key={bank} value={bank}>{label}</option>;
                                            })}
                                        </select>
                                        <div style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            pointerEvents: 'none',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>

                                    {/* Sort Select */}
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            style={{
                                                appearance: 'none',
                                                padding: '8px 32px 8px 12px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '10px',
                                                color: 'var(--text-primary)',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                outline: 'none',
                                                minWidth: '140px',
                                                transition: 'all 0.2s',
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                                        >
                                            <option value="recommended">Recommended</option>
                                            <option value="fee-low">Fee: Low to High</option>
                                            <option value="fee-high">Fee: High to Low</option>
                                            <option value="reward-high">Rewards: High to Low</option>
                                            <option value="name">Name: A-Z</option>
                                        </select>
                                        <div style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            pointerEvents: 'none',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Filter Chips - Horizontal Scroll */}
                            <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                overflowX: 'auto',
                                paddingBottom: '4px',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                position: 'relative',
                                zIndex: 2
                            }}>
                                {cardFilters.map(filter => {
                                    const isActive = activeFilter === filter;
                                    return (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveFilter(isActive ? 'All' : filter)}
                                            style={{
                                                flexShrink: 0,
                                                whiteSpace: 'nowrap',
                                                padding: '6px 16px',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                fontWeight: isActive ? 600 : 500,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                                                border: isActive ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                                                background: isActive
                                                    ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))'
                                                    : 'transparent',
                                                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                                                boxShadow: isActive ? '0 4px 12px rgba(6, 182, 212, 0.15)' : 'none',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                                    e.target.style.color = '#fff';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.target.style.background = 'transparent';
                                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                    e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                                                }
                                            }}
                                        >
                                            {filter}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Results Count Fade-in */}
                            <div style={{
                                marginTop: '1rem',
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)',
                                textAlign: 'right',
                                opacity: 0.8
                            }}>
                                Found {filteredCards.length} cards
                            </div>
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

                                        {/* Multiplier Badge - Simple */}
                                        {card.multiplierBadge && (
                                            <div style={{
                                                marginBottom: '10px',
                                                background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.15), rgba(6, 182, 212, 0.15))',
                                                border: '1px dashed rgba(34, 197, 94, 0.4)',
                                                borderRadius: '8px',
                                                padding: '6px 10px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                color: '#22c55e',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}>
                                                🚀 {card.multiplierBadge}
                                            </div>
                                        )}

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
                    {selectedCards.length > 0 && (() => {
                        const isMobileBar = typeof window !== 'undefined' && window.innerWidth < 768;
                        return (
                            <div
                                className="floating-compare-bar"
                                style={{
                                    position: 'fixed',
                                    bottom: isMobileBar
                                        ? 'calc(80px + env(safe-area-inset-bottom, 0px))'
                                        : 'calc(24px + env(safe-area-inset-bottom, 0px))',
                                    left: isMobileBar ? '1rem' : '50%',
                                    right: isMobileBar ? '1rem' : 'auto',
                                    transform: isMobileBar ? 'none' : 'translateX(-50%)',
                                    background: 'rgba(20, 20, 35, 0.98)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: isMobileBar ? '12px' : '16px',
                                    padding: isMobileBar ? '10px 14px' : '12px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: isMobileBar ? '8px' : '12px',
                                    zIndex: 1000,
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                                    maxWidth: isMobileBar ? 'calc(100vw - 2rem)' : 'calc(100vw - 32px)',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                }}>
                                <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                                    {selectedCards.length}/3 cards
                                </span>
                                <Link
                                    to="/compare-cards"
                                    state={{ view: 'table' }}
                                    onClick={() => { }}
                                    style={{
                                        padding: '10px 16px',
                                        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-pink))',
                                        color: '#000',
                                        textDecoration: 'none',
                                        borderRadius: '10px',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Compare →
                                </Link>
                                <button
                                    onClick={handleClearSelection}
                                    style={{
                                        padding: '10px 14px',
                                        background: 'transparent',
                                        border: '1px solid rgba(239, 68, 68, 0.5)',
                                        color: '#ef4444',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        );
                    })()}
                </>
            )}

            {/* Table View - COMPARISON */}
            {view === 'table' && (
                <>
                    {selectedCards.length > 0 ? (
                        <div className="glass-panel" style={{ padding: '1.5rem', maxWidth: '100%', overflow: 'hidden' }}>
                            {/* Header */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem',
                                borderBottom: '1px solid var(--glass-border)',
                                paddingBottom: '0.75rem',
                                flexWrap: 'wrap',
                                gap: '0.75rem'
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
                                        {selectedCards.length}/3
                                    </span>
                                </h3>

                                {/* Add Card Dropdown - Only show if less than 3 cards */}
                                {selectedCards.length < 3 && (
                                    <select
                                        defaultValue=""
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                handleCardSelection(e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(6, 182, 212, 0.4)',
                                            background: 'rgba(6, 182, 212, 0.1)',
                                            color: 'var(--accent-cyan)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            outline: 'none',
                                        }}
                                    >
                                        <option value="" disabled>+ Add Card...</option>
                                        {creditCards
                                            .filter(card => !selectedCards.includes(card.id) && !selectedCards.includes(card.slug))
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map(card => (
                                                <option key={card.id} value={card.id}>{card.name}</option>
                                            ))
                                        }
                                    </select>
                                )}

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
                                                    {getCardDetails(card)?.name || card}
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
                            padding: '1.5rem',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            position: 'relative',
                            borderRadius: '24px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
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

                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <CardImage card={modalCard} style={{ maxWidth: '150px', margin: '0 auto 0.75rem' }} />
                            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>{modalCard.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>{modalCard.bank}</p>
                        </div>

                        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', minWidth: '100px' }}>Annual Fee</span>
                                <span style={{ fontWeight: 600, color: parseFee(modalCard.annualFee) === 0 ? '#22c55e' : 'var(--text-primary)', textAlign: 'right' }}>
                                    {modalCard.annualFee || 'N/A'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)', minWidth: '100px', flexShrink: 0, marginTop: '2px' }}>Reward Rate</span>
                                <span style={{ fontWeight: 600, textAlign: 'right', flex: 1, lineHeight: '1.5' }}>{modalCard.rewardRate || 'Varies'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', minWidth: '90px' }}>Forex Markup</span>
                                <span style={{ fontWeight: 600, textAlign: 'right' }}>{modalCard.fxMarkup || 'N/A'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)', minWidth: '100px', flexShrink: 0, marginTop: '2px' }}>Best For</span>
                                <span style={{ fontWeight: 600, textAlign: 'right', flex: 1, lineHeight: '1.5' }}>{modalCard.bestFor || '-'}</span>
                            </div>
                        </div>

                        {modalCard.features && (
                            <div style={{ marginBottom: '1.25rem' }}>
                                <h4 style={{ margin: '0 0 0.5rem', color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>Key Features</h4>
                                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    {modalCard.features.slice(0, 4).map((f, i) => (
                                        <li key={i} style={{ marginBottom: '0.25rem' }}>{f}</li>
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
                                to={`/card-guide/${modalCard.slug || modalCard.id}`}
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
