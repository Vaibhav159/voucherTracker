import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Search,
    Filter,
    Grid3X3,
    List,
    Heart,
    X,
    ChevronDown,
    CreditCard,
    Star,
    ExternalLink,
    Clock,
    Sparkles,
    Plane,
    Gift,
    Percent,
    Shield,
    Info,
    Check,
    ArrowRight,
    DollarSign,
    LayoutGrid,
    LayoutList,
    ArrowRightLeft,
    Loader2,
    RefreshCw
} from 'lucide-react';
import { useCreditCards } from '../hooks/useCreditCards';
import { useFavorites } from '../context/FavoritesContext';
import SEO from '../components/SEO';

// Banks for filtering
const banks = ['All', 'HDFC Bank', 'ICICI Bank', 'SBI Card', 'Axis Bank', 'American Express', 'IDFC First Bank', 'Standard Chartered'];

// Networks for filtering
const networks = ['All', 'Visa', 'Mastercard', 'American Express', 'Diners Club', 'RuPay'];

// Fee Filters
const feeFilters = [
    { id: 'all', label: 'All Fees' },
    { id: 'free', label: 'Lifetime Free' },
    { id: 'low', label: 'Under ₹1,000' },
    { id: 'mid', label: '₹1,000 - ₹5,000' },
    { id: 'high', label: 'Premium (> ₹5,000)' }
];

// Benefits Filters
const benefitFilters = [
    { id: 'lounge', label: 'Lounge Access', icon: Plane },
    { id: 'golf', label: 'Golf Games', icon: Gift },
    { id: 'dining', label: 'Dining Offers', icon: Percent },
    { id: 'movies', label: 'Movie Offers', icon: Sparkles },
];

// Helper to format currency
const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}k`;
    return `₹${amount}`;
};

// Transform card data for UI (v1 format)
const transformCardForUI = (card) => {
    const annualFee = card.fees?.annual || 0;

    const formatFee = (fee) => {
        if (fee === 0) return 'Lifetime Free'; // Improved labeling
        if (fee >= 100000) return `₹${(fee / 100000).toFixed(1)}L`;
        if (fee >= 1000) return `₹${(fee / 1000).toFixed(fee % 1000 === 0 ? 0 : 1)}k`;
        return `₹${fee}`;
    };

    // Get reward rate from v1 format
    const baseRate = card.rewards?.baseRate || 0;
    const rewardRate = baseRate > 0 ? `${(baseRate * 100).toFixed(1)}%` : 'N/A';

    // Determine tier from metadata tags
    const tags = card.metadata?.tags || [];
    let tier = 'entry';
    let material = null;
    if (tags.includes('Super Premium') || tags.includes('Ultra Premium')) tier = 'ultra-premium';
    else if (tags.includes('Premium')) tier = 'premium';
    else if (tags.includes('Mid-Tier')) tier = 'mid-tier';
    if (tags.includes('Metal Card')) material = 'metal';

    // Badge based on tier
    let badge = 'Entry Level';
    if (material === 'metal') badge = 'Metal Card';
    else if (tier === 'ultra-premium') badge = 'Super Premium';
    else if (tier === 'premium') badge = 'Premium';
    else if (tier === 'mid-tier') badge = 'Mid Tier';

    // Build features from v1 format - Expanded
    const features = [];
    const lounge = card.features?.lounge;

    // Lounge Feature
    if (lounge && (lounge.domestic !== 'None' || lounge.international !== 'None')) {
        const unlimited = lounge.domestic?.includes('Unlimited') || lounge.international?.includes('Unlimited');
        features.push({
            icon: Plane,
            text: unlimited ? 'Unlimited Lounge' : 'Lounge Access',
            highlight: unlimited // Highlights premium feature
        });
    }

    // Golf Feature
    if (card.features?.golf?.included) {
        features.push({ icon: Gift, text: 'Golf Games', highlight: true });
    }

    // Movies Feature
    if (card.features?.movies?.text && !card.features.movies.text.includes('None')) {
        features.push({ icon: Sparkles, text: 'Movie Offers' });
    }

    // Dining/Fuel
    if (card.features?.dining?.text) {
        features.push({ icon: Percent, text: 'Dining Delights' });
    } else if (card.features?.fuel?.text) {
        features.push({ icon: Percent, text: 'Fuel Surcharge Waiver' });
    }

    // Best For Summary
    const bestFor = card.metadata?.bestFor;

    // Fee waiver info
    const feeWaiver = card.fees?.waiverText || null;

    return {
        id: card.slug || card.id,
        name: card.name,
        bank: card.bank,
        network: card.features?.forex?.text?.includes('Visa') ? 'Visa' :
            card.features?.forex?.text?.includes('Mastercard') ? 'Mastercard' :
                tags.includes('Diners Club') ? 'Diners Club' :
                    card.bank?.includes('American Express') ? 'American Express' :
                        card.name?.includes('RuPay') ? 'RuPay' : 'Visa',
        image: card.image,
        tier,
        material,
        badge,
        rewardRate,
        annualFee,
        feeDisplay: formatFee(annualFee),
        hasLounge: lounge && (lounge.domestic !== 'None' || lounge.international !== 'None'),
        features: features.slice(0, 3), // Show top 3 features
        feeWaiver,
        bestFor, // New field
        _raw: card
    };
};

export default function Cards() {
    const navigate = useNavigate();

    // Fetch cards from API with static fallback
    const { cards: rawCards, loading, error, isFromApi } = useCreditCards();

    // Transform cards for UI (memoized)
    const creditCards = useMemo(() => {
        return rawCards.map(transformCardForUI);
    }, [rawCards]);

    const [selectedBank, setSelectedBank] = useState('All');
    const [selectedNetwork, setSelectedNetwork] = useState('All');
    const [selectedFee, setSelectedFee] = useState('all');
    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCard, setSelectedCard] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('popularity');

    // Favorites from context (persists across sessions)
    const { isFavorite, toggleFavorite } = useFavorites();

    // Compare Mode State
    const [isCompareMode, setIsCompareMode] = useState(false);
    const [compareList, setCompareList] = useState([]);

    // Check if any filters are active
    const hasActiveFilters = selectedBank !== 'All' || selectedNetwork !== 'All' || selectedFee !== 'all' || selectedBenefits.length > 0 || searchQuery !== '';

    // Clear all filters
    const clearAllFilters = () => {
        setSelectedBank('All');
        setSelectedNetwork('All');
        setSelectedFee('all');
        setSelectedBenefits([]);
        setSearchQuery('');
    };

    // Toggle benefit filter
    const toggleBenefit = (benefitId) => {
        setSelectedBenefits(prev =>
            prev.includes(benefitId) ? prev.filter(b => b !== benefitId) : [...prev, benefitId]
        );
    };

    // Filter cards
    const filteredCards = useMemo(() => {
        return creditCards.filter(card => {
            const matchesBank = selectedBank === 'All' || card.bank === selectedBank;
            const matchesNetwork = selectedNetwork === 'All' || card.network === selectedNetwork;

            // Fee filter logic
            let matchesFee = true;
            if (selectedFee === 'free') matchesFee = card.annualFee === 0;
            else if (selectedFee === 'low') matchesFee = card.annualFee > 0 && card.annualFee < 1000;
            else if (selectedFee === 'mid') matchesFee = card.annualFee >= 1000 && card.annualFee <= 5000;
            else if (selectedFee === 'high') matchesFee = card.annualFee > 5000;

            // Benefits filter logic
            let matchesBenefits = true;
            if (selectedBenefits.length > 0) {
                matchesBenefits = selectedBenefits.every(benefit => {
                    if (benefit === 'lounge') return card.hasLounge;
                    if (benefit === 'golf') return card._raw?.features?.golf?.included;
                    if (benefit === 'dining') return card._raw?.features?.dining?.text;
                    if (benefit === 'movies') return card._raw?.features?.movies?.text && !card._raw?.features?.movies?.text?.includes('None');
                    return true;
                });
            }

            const matchesSearch = !searchQuery ||
                card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.bank.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesBank && matchesNetwork && matchesFee && matchesBenefits && matchesSearch;
        }).sort((a, b) => {
            if (sortBy === 'fee_low') return a.annualFee - b.annualFee;
            if (sortBy === 'fee_high') return b.annualFee - a.annualFee;
            if (sortBy === 'reward_rate') {
                const aRate = parseFloat(a.rewardRate) || 0;
                const bRate = parseFloat(b.rewardRate) || 0;
                return bRate - aRate;
            }
            // Default: premium first
            const tierOrder = { 'ultra-premium': 0, 'premium': 1, 'mid-tier': 2, 'entry': 3 };
            return (tierOrder[a.tier] || 4) - (tierOrder[b.tier] || 4);
        });
    }, [selectedBank, selectedNetwork, selectedFee, selectedBenefits, searchQuery, sortBy]);

    const toggleCompare = (id, e) => {
        e.stopPropagation();
        setCompareList(prev => {
            if (prev.includes(id)) return prev.filter(cid => cid !== id);
            if (prev.length >= 3) return prev; // Max 3 cards
            return [...prev, id];
        });
    };

    // Get quick view benefits (v1 format) - Enhanced version
    const getQuickViewBenefits = (card) => {
        if (!card._raw) return [];
        const benefits = [];
        const raw = card._raw;

        // Lounge Access - More Detail
        const lounge = raw.features?.lounge;
        if (lounge && (lounge.domestic !== 'None' || lounge.international !== 'None')) {
            const domesticText = lounge.domestic && lounge.domestic !== 'None' ? `Domestic: ${lounge.domestic}` : '';
            const intlText = lounge.international && lounge.international !== 'None' ? `International: ${lounge.international}` : '';
            const loungeText = [domesticText, intlText].filter(Boolean).join(' • ');
            benefits.push({ icon: '✈️', label: 'Lounge Access', text: loungeText || 'Lounge Access Included' });
        }

        // Milestone Rewards
        if (raw.rewards?.milestoneBonus && raw.rewards.milestoneBonus !== 'None') {
            benefits.push({
                icon: '🏆',
                label: 'Milestone Rewards',
                text: raw.rewards.milestoneBonus.length > 60
                    ? raw.rewards.milestoneBonus.substring(0, 60) + '...'
                    : raw.rewards.milestoneBonus
            });
        }

        // Reward Rate
        const baseRate = raw.rewards?.baseRate;
        if (baseRate && baseRate > 0) {
            const rateText = raw.rewards?.earningText || `${(baseRate * 100).toFixed(1)}% Base Rate`;
            benefits.push({
                icon: '💰',
                label: 'Base Rewards',
                text: rateText.length > 60 ? `${(baseRate * 100).toFixed(1)}% on all spends` : rateText
            });
        }

        // Forex
        const forex = raw.features?.forex;
        if (forex?.text) {
            benefits.push({ icon: '💱', label: 'Forex Markup', text: forex.text });
        }

        // Welcome Bonus
        if (raw.rewards?.joiningBonus && raw.rewards.joiningBonus !== 'None') {
            benefits.push({
                icon: '🎁',
                label: 'Welcome Bonus',
                text: raw.rewards.joiningBonus.length > 60
                    ? raw.rewards.joiningBonus.substring(0, 60) + '...'
                    : raw.rewards.joiningBonus
            });
        }

        // Movies
        if (raw.features?.movies?.text && raw.features.movies.text !== 'None') {
            benefits.push({
                icon: '🎬',
                label: 'Movie Benefits',
                text: raw.features.movies.text.length > 60
                    ? raw.features.movies.text.substring(0, 60) + '...'
                    : raw.features.movies.text
            });
        }

        // Golf
        if (raw.features?.golf?.included) {
            const golfText = raw.features.golf.text || 'Complimentary golf sessions';
            benefits.push({
                icon: '⛳',
                label: 'Golf Privileges',
                text: golfText.length > 60 ? golfText.substring(0, 60) + '...' : golfText
            });
        }

        // Dining
        if (raw.features?.dining?.text) {
            benefits.push({
                icon: '🍽️',
                label: 'Dining Benefits',
                text: raw.features.dining.text.length > 60
                    ? raw.features.dining.text.substring(0, 60) + '...'
                    : raw.features.dining.text
            });
        }

        // Fuel Surcharge
        if (raw.features?.fuel?.text) {
            benefits.push({
                icon: '⛽',
                label: 'Fuel Benefits',
                text: raw.features.fuel.text.length > 60
                    ? raw.features.fuel.text.substring(0, 60) + '...'
                    : raw.features.fuel.text
            });
        }

        // Best For
        if (raw.metadata?.bestFor) {
            benefits.push({
                icon: '⭐',
                label: 'Best For',
                text: raw.metadata.bestFor.length > 60
                    ? raw.metadata.bestFor.substring(0, 60) + '...'
                    : raw.metadata.bestFor
            });
        }

        return benefits.slice(0, 8); // Show up to 8 benefits
    };

    const seoTitle = selectedBank === 'All'
        ? 'Premium Credit Cards | CardPerks'
        : `${selectedBank} Credit Cards | CardPerks`;

    const seoDescription = 'Compare the best credit cards in India. Find cards with lounge access, rewards, and premium benefits.';

    return (
        <>
            <SEO title={seoTitle} description={seoDescription} keywords="credit cards, rewards, best credit cards india" />

            <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
                {/* Hero Header */}
                <div
                    className="relative overflow-hidden border-b"
                    style={{
                        backgroundColor: 'var(--bg-alt)',
                        borderColor: 'var(--border)',
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: `radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 60%)`,
                        }}
                    />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="animate-fade-in-up">
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
                                    style={{
                                        backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    <CreditCard size={14} />
                                    <span>{filteredCards.length} Cards Available</span>
                                </div>
                                <h1
                                    className="text-3xl md:text-4xl font-serif font-bold mb-2"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {selectedBank === 'All' ? 'Premium Credit Cards' : `${selectedBank} Cards`}
                                </h1>
                                <p
                                    className="text-base max-w-xl"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    Compare features, rewards, and benefits. Find your perfect card match.
                                </p>
                            </div>

                            {/* Search */}
                            <div className="w-full md:w-80">
                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2"
                                        style={{ color: 'var(--text-muted)' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search cards..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg text-sm"
                                        style={{
                                            backgroundColor: 'var(--surface)',
                                            border: '1px solid var(--border)',
                                            color: 'var(--text-primary)',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

                    {/* Compare Bar - Premium floating design */}
                    {isCompareMode && (
                        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg animate-fade-in-up">
                            <div
                                className="p-4 rounded-2xl shadow-2xl flex items-center justify-between backdrop-blur-xl"
                                style={{
                                    background: 'linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 90%, var(--accent)) 100%)',
                                    border: '1px solid color-mix(in srgb, var(--accent) 30%, var(--border))',
                                    boxShadow: '0 20px 50px -10px rgba(0,0,0,0.3), 0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent)',
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Card avatars */}
                                    <div className="flex -space-x-3">
                                        {compareList.map((id, index) => {
                                            const c = creditCards.find(cd => cd.id === id);
                                            return c ? (
                                                <div
                                                    key={id}
                                                    className="w-10 h-10 rounded-xl border-2 overflow-hidden shadow-lg transition-transform hover:scale-110 hover:z-20"
                                                    style={{
                                                        borderColor: 'var(--accent)',
                                                        backgroundColor: 'var(--bg)',
                                                        zIndex: 10 - index,
                                                    }}
                                                >
                                                    <img src={c.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ) : null;
                                        })}
                                        {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-10 h-10 rounded-xl border-2 border-dashed flex items-center justify-center text-xs font-bold"
                                                style={{
                                                    borderColor: 'var(--border)',
                                                    color: 'var(--text-muted)',
                                                    backgroundColor: 'color-mix(in srgb, var(--bg) 50%, transparent)',
                                                }}
                                            >
                                                +
                                            </div>
                                        ))}
                                    </div>

                                    {/* Counter */}
                                    <div>
                                        <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                                            {compareList.length} of 3
                                        </div>
                                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                            {compareList.length < 2 ? 'Select at least 2' : 'Ready to compare'}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => { setCompareList([]); setIsCompareMode(false); }}
                                        className="px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-[var(--surface-hover)]"
                                        style={{
                                            color: 'var(--text-secondary)',
                                            border: '1px solid var(--border)',
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <Link
                                        to={`/cards/compare?ids=${compareList.join(',')}`}
                                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${compareList.length < 2
                                            ? 'opacity-40 pointer-events-none'
                                            : 'hover:brightness-110 shadow-lg'
                                            }`}
                                        style={{
                                            background: compareList.length >= 2
                                                ? 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 80%, #000) 100%)'
                                                : 'var(--accent)',
                                            color: 'var(--bg)',
                                            boxShadow: compareList.length >= 2 ? '0 4px 15px color-mix(in srgb, var(--accent) 40%, transparent)' : 'none',
                                        }}
                                    >
                                        Compare →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filters Bar - Consolidated Dropdowns */}
                    <div
                        className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Bank Dropdown */}
                            <select
                                value={selectedBank}
                                onChange={(e) => setSelectedBank(e.target.value)}
                                className="px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer appearance-none pr-8"
                                style={{
                                    backgroundColor: selectedBank !== 'All' ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'var(--surface)',
                                    color: selectedBank !== 'All' ? 'var(--accent)' : 'var(--text-secondary)',
                                    border: `1px solid ${selectedBank !== 'All' ? 'var(--accent)' : 'var(--border)'}`,
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 8px center',
                                }}
                            >
                                {banks.map((bank) => (
                                    <option key={bank} value={bank}>{bank === 'All' ? 'All Banks' : bank}</option>
                                ))}
                            </select>

                            {/* Network Dropdown */}
                            <select
                                value={selectedNetwork}
                                onChange={(e) => setSelectedNetwork(e.target.value)}
                                className="px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer appearance-none pr-8"
                                style={{
                                    backgroundColor: selectedNetwork !== 'All' ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'var(--surface)',
                                    color: selectedNetwork !== 'All' ? 'var(--accent)' : 'var(--text-secondary)',
                                    border: `1px solid ${selectedNetwork !== 'All' ? 'var(--accent)' : 'var(--border)'}`,
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 8px center',
                                }}
                            >
                                {networks.map((net) => (
                                    <option key={net} value={net}>{net === 'All' ? 'All Networks' : net}</option>
                                ))}
                            </select>

                            {/* Fee Dropdown */}
                            <select
                                value={selectedFee}
                                onChange={(e) => setSelectedFee(e.target.value)}
                                className="px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer appearance-none pr-8"
                                style={{
                                    backgroundColor: selectedFee !== 'all' ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'var(--surface)',
                                    color: selectedFee !== 'all' ? 'var(--accent)' : 'var(--text-secondary)',
                                    border: `1px solid ${selectedFee !== 'all' ? 'var(--accent)' : 'var(--border)'}`,
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 8px center',
                                }}
                            >
                                {feeFilters.map((fee) => (
                                    <option key={fee.id} value={fee.id}>{fee.label}</option>
                                ))}
                            </select>

                            {/* Benefits Toggle Buttons */}
                            <div className="flex items-center gap-1.5">
                                {benefitFilters.map((benefit) => (
                                    <button
                                        key={benefit.id}
                                        onClick={() => toggleBenefit(benefit.id)}
                                        className="p-2.5 rounded-lg transition-all"
                                        style={{
                                            backgroundColor: selectedBenefits.includes(benefit.id)
                                                ? 'color-mix(in srgb, var(--accent) 15%, transparent)'
                                                : 'var(--surface)',
                                            color: selectedBenefits.includes(benefit.id)
                                                ? 'var(--accent)'
                                                : 'var(--text-muted)',
                                            border: `1px solid ${selectedBenefits.includes(benefit.id) ? 'var(--accent)' : 'var(--border)'}`,
                                        }}
                                        title={benefit.label}
                                    >
                                        <benefit.icon size={16} />
                                    </button>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-8 w-px bg-[var(--border)] hidden md:block" />

                            {/* Compare Toggle */}
                            <button
                                onClick={() => setIsCompareMode(!isCompareMode)}
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 border ${isCompareMode
                                    ? 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]'
                                    : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)]'
                                    }`}
                            >
                                <ArrowRightLeft size={16} />
                                Compare
                            </button>

                            {/* Clear Filters */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className="px-3 py-2 text-xs font-medium rounded-lg transition-all hover:bg-[var(--surface)]"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    <X size={14} className="inline mr-1" />
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* View Toggle & Sort */}
                        <div className="flex items-center gap-3">
                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2.5 rounded-lg text-sm appearance-none pr-8 cursor-pointer"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border)',
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 8px center',
                                }}
                            >
                                <option value="popularity">Popular</option>
                                <option value="fee_low">Fee: Low to High</option>
                                <option value="fee_high">Fee: High to Low</option>
                                <option value="reward_rate">Highest Rewards</option>
                            </select>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className="p-2 rounded-lg transition-all"
                                    style={{
                                        backgroundColor: viewMode === 'grid' ? 'var(--surface)' : 'transparent',
                                        color: viewMode === 'grid' ? 'var(--accent)' : 'var(--text-muted)',
                                        border: viewMode === 'grid' ? '1px solid var(--border)' : '1px solid transparent',
                                    }}
                                >
                                    <Grid3X3 size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className="p-2 rounded-lg transition-all"
                                    style={{
                                        backgroundColor: viewMode === 'list' ? 'var(--surface)' : 'transparent',
                                        color: viewMode === 'list' ? 'var(--accent)' : 'var(--text-muted)',
                                        border: viewMode === 'list' ? '1px solid var(--border)' : '1px solid transparent',
                                    }}
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Active Filter Pills */}
                    {hasActiveFilters && (
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Active filters:</span>

                            {selectedBank !== 'All' && (
                                <span
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    {selectedBank}
                                    <button onClick={() => setSelectedBank('All')} className="hover:opacity-70">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}

                            {selectedNetwork !== 'All' && (
                                <span
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    {selectedNetwork}
                                    <button onClick={() => setSelectedNetwork('All')} className="hover:opacity-70">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}

                            {selectedFee !== 'all' && (
                                <span
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    {feeFilters.find(f => f.id === selectedFee)?.label}
                                    <button onClick={() => setSelectedFee('all')} className="hover:opacity-70">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}

                            {selectedBenefits.map(benefitId => {
                                const benefit = benefitFilters.find(b => b.id === benefitId);
                                return benefit ? (
                                    <span
                                        key={benefitId}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                                        style={{
                                            backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        <benefit.icon size={12} />
                                        {benefit.label}
                                        <button onClick={() => toggleBenefit(benefitId)} className="hover:opacity-70">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ) : null;
                            })}

                            {searchQuery && (
                                <span
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    "{searchQuery}"
                                    <button onClick={() => setSearchQuery('')} className="hover:opacity-70">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}

                            <button
                                onClick={clearAllFilters}
                                className="text-xs font-medium px-3 py-1 rounded-full transition-all hover:bg-[var(--surface)]"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                Clear all
                            </button>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 size={40} className="animate-spin" style={{ color: 'var(--accent)' }} />
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading credit cards...</p>
                        </div>
                    )}

                    {/* Cards Display - Grid or List */}
                    {!loading && viewMode === 'grid' ? (
                        /* Grid View */
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredCards.map((card, index) => (
                                <article
                                    key={`${card.id}-${index}`}
                                    onClick={() => isCompareMode ? toggleCompare(card.id, { stopPropagation: () => { } }) : setSelectedCard(card)}
                                    className={`group cursor-pointer rounded-xl overflow-hidden transition-all hover:-translate-y-1 relative ${isCompareMode && compareList.includes(card.id)
                                        ? 'ring-2 ring-[var(--accent)]'
                                        : 'border border-[var(--border)]'
                                        }`}
                                    style={{
                                        backgroundColor: 'var(--surface)',
                                    }}
                                >
                                    {/* Compare Checkbox Overlay */}
                                    {isCompareMode && (
                                        <div
                                            className="absolute inset-0 z-20 flex items-start justify-end p-4 bg-black/10 transition-colors"
                                            onClick={(e) => toggleCompare(card.id, e)}
                                        >
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${compareList.includes(card.id)
                                                ? 'bg-[var(--accent)] border-[var(--accent)]'
                                                : 'bg-white/20 border-white backdrop-blur-sm'
                                                }`}>
                                                {compareList.includes(card.id) && <Check size={14} className="text-[var(--bg)]" />}
                                            </div>
                                        </div>
                                    )}

                                    {/* Card Image */}
                                    <div
                                        className="relative aspect-[1.586/1] overflow-hidden"
                                        style={{ backgroundColor: 'var(--bg-alt)' }}
                                    >
                                        {card.image ? (
                                            <img
                                                src={card.image}
                                                alt={card.name}
                                                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <CreditCard size={48} style={{ color: 'var(--text-muted)' }} />
                                            </div>
                                        )}

                                        {/* Badge Overlay */}
                                        <div className="absolute bottom-3 left-3">
                                            <span
                                                className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                                style={{
                                                    backgroundColor: card.tier === 'ultra-premium' || card.material === 'metal'
                                                        ? 'var(--accent)'
                                                        : 'color-mix(in srgb, var(--bg) 80%, transparent)',
                                                    color: card.tier === 'ultra-premium' || card.material === 'metal'
                                                        ? 'var(--bg)'
                                                        : 'var(--text-primary)',
                                                    backdropFilter: 'blur(8px)',
                                                }}
                                            >
                                                {card.badge}
                                            </span>
                                        </div>

                                        {/* Favorite Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite('cards', card.id);
                                            }}
                                            className="absolute top-3 right-3 p-2 rounded-full transition-all hover:bg-black/20"
                                            style={{
                                                backgroundColor: 'color-mix(in srgb, var(--bg) 60%, transparent)',
                                                backdropFilter: 'blur(8px)',
                                                color: isFavorite('cards', card.id) ? '#ef4444' : 'var(--text-muted)',
                                            }}
                                        >
                                            <Heart
                                                size={16}
                                                fill={isFavorite('cards', card.id) ? '#ef4444' : 'none'}
                                            />
                                        </button>

                                        {/* Network Badge */}
                                        <div className="absolute bottom-3 right-3">
                                            <span
                                                className="px-2 py-1 rounded text-[10px] font-bold uppercase"
                                                style={{
                                                    backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)',
                                                    color: 'var(--text-primary)',
                                                    backdropFilter: 'blur(8px)',
                                                }}
                                            >
                                                {card.network}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Info */}
                                    <div className="p-5">
                                        <h2
                                            className="text-lg font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors line-clamp-1"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            {card.name}
                                        </h2>
                                        <p
                                            className="text-xs mb-4"
                                            style={{ color: 'var(--text-muted)' }}
                                        >
                                            {card.bank}
                                        </p>

                                        {/* Feature Pills */}
                                        {card.features.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-4 max-h-[52px] overflow-hidden">
                                                {card.features.map((feature, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium"
                                                        style={{
                                                            backgroundColor: feature.highlight
                                                                ? 'var(--accent)'
                                                                : 'color-mix(in srgb, var(--accent) 10%, transparent)',
                                                            color: feature.highlight
                                                                ? 'var(--bg)'
                                                                : 'var(--accent)',
                                                        }}
                                                    >
                                                        <feature.icon size={10} />
                                                        {feature.text}
                                                    </span>
                                                ))}
                                                {card.bestFor && (
                                                    <span
                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border border-[var(--border)]"
                                                        style={{ color: 'var(--text-secondary)' }}
                                                    >
                                                        Best for {card.bestFor}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Stats */}
                                        <div
                                            className="pt-4 border-t"
                                            style={{ borderColor: 'var(--border)' }}
                                        >
                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <p
                                                        className="text-[10px] uppercase tracking-wider font-medium mb-1"
                                                        style={{ color: 'var(--text-muted)' }}
                                                    >
                                                        Reward
                                                    </p>
                                                    <p
                                                        className="text-lg font-bold"
                                                        style={{ color: 'var(--accent)' }}
                                                    >
                                                        {card.rewardRate}
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <p
                                                        className="text-[10px] uppercase tracking-wider font-medium mb-1"
                                                        style={{ color: 'var(--text-muted)' }}
                                                    >
                                                        Forex
                                                    </p>
                                                    <p
                                                        className="text-sm font-semibold"
                                                        style={{ color: card._raw?.features?.forex?.text?.includes('0%') || card._raw?.features?.forex?.text?.includes('1%') ? 'var(--accent)' : 'var(--text-secondary)' }}
                                                    >
                                                        {card._raw?.features?.forex?.text || 'N/A'}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p
                                                        className="text-[10px] uppercase tracking-wider font-medium mb-1"
                                                        style={{ color: 'var(--text-muted)' }}
                                                    >
                                                        Fee
                                                    </p>
                                                    <p
                                                        className="text-sm font-medium"
                                                        style={{ color: 'var(--text-secondary)' }}
                                                    >
                                                        {card.feeDisplay}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleCompare(card.id, e);
                                                    setIsCompareMode(true);
                                                }}
                                                className={`py-2.5 px-3 rounded-lg border transition-all flex items-center justify-center ${compareList.includes(card.id)
                                                    ? 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]'
                                                    : 'bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                                                    }`}
                                                title={compareList.includes(card.id) ? "Remove from comparison" : "Add to comparison"}
                                            >
                                                <ArrowRightLeft size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/cards/${card.id}`);
                                                }}
                                                className="flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                                                style={{
                                                    backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                                                    color: 'var(--accent)',
                                                    border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : !loading ? (
                        /* List View - Horizontal Cards */
                        <div
                            className="flex flex-col rounded-2xl overflow-hidden"
                            style={{
                                backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)',
                                border: '1px solid var(--border)',
                            }}
                        >
                            {filteredCards.map((card, index) => (
                                <article
                                    key={`${card.id}-${index}`}
                                    onClick={() => isCompareMode ? toggleCompare(card.id, { stopPropagation: () => { } }) : setSelectedCard(card)}
                                    className="group flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4 md:p-5 cursor-pointer transition-all hover:bg-[var(--surface-hover)] relative"
                                    style={{
                                        borderBottom: index < filteredCards.length - 1 ? '1px solid var(--border)' : 'none',
                                    }}
                                >
                                    {/* Card Image */}
                                    <div className="w-full md:w-36 shrink-0 relative">
                                        <div
                                            className="aspect-[1.586/1] rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                                            style={{ backgroundColor: 'var(--bg-alt)' }}
                                        >
                                            {card.image ? (
                                                <img
                                                    src={card.image}
                                                    alt={card.name}
                                                    className="w-full h-full object-contain p-1"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <CreditCard size={32} style={{ color: 'var(--text-muted)' }} />
                                                </div>
                                            )}
                                        </div>
                                        {/* Tier Badge - Mobile Only */}
                                        <span
                                            className="absolute -top-2 -right-2 md:hidden px-2 py-0.5 rounded-full text-[9px] font-bold uppercase"
                                            style={{
                                                backgroundColor: card.tier === 'ultra-premium' || card.material === 'metal'
                                                    ? 'var(--accent)'
                                                    : 'var(--surface)',
                                                color: card.tier === 'ultra-premium' || card.material === 'metal'
                                                    ? 'var(--bg)'
                                                    : 'var(--text-secondary)',
                                                border: '1px solid var(--border)',
                                            }}
                                        >
                                            {card.badge}
                                        </span>
                                    </div>

                                    {/* Card Info */}
                                    <div className="flex-1 min-w-0 flex flex-col gap-1 w-full text-center md:text-left">
                                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 justify-center md:justify-start">
                                            <h3
                                                className="text-lg font-bold font-serif group-hover:text-[var(--accent)] transition-colors truncate"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {card.name}
                                            </h3>
                                            {/* Feature Tag - Desktop */}
                                            {card.features.length > 0 && card.features[0].highlight && (
                                                <span
                                                    className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold"
                                                    style={{
                                                        backgroundColor: 'var(--accent)',
                                                        color: 'var(--bg)',
                                                    }}
                                                >
                                                    {card.features[0].text}
                                                </span>
                                            )}
                                            {/* Tier Badge - Desktop */}
                                            <span
                                                className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-medium"
                                                style={{
                                                    backgroundColor: card.tier === 'ultra-premium' || card.material === 'metal'
                                                        ? 'var(--accent)'
                                                        : 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                                    color: card.tier === 'ultra-premium' || card.material === 'metal'
                                                        ? 'var(--bg)'
                                                        : 'var(--accent)',
                                                }}
                                            >
                                                {card.badge}
                                            </span>
                                        </div>
                                        <p
                                            className="text-xs uppercase tracking-wider"
                                            style={{ color: 'var(--text-muted)' }}
                                        >
                                            {card.bank} • {card.network}
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-8 w-full md:w-auto md:justify-end text-center md:text-left">
                                        <div className="min-w-[80px]">
                                            <p
                                                className="text-[10px] uppercase tracking-wider font-medium mb-0.5"
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                Reward Rate
                                            </p>
                                            <p
                                                className="text-lg font-bold"
                                                style={{ color: 'var(--accent)' }}
                                            >
                                                {card.rewardRate}
                                            </p>
                                        </div>
                                        <div className="min-w-[80px]">
                                            <p
                                                className="text-[10px] uppercase tracking-wider font-medium mb-0.5"
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                Annual Fee
                                            </p>
                                            <p
                                                className="text-sm font-medium"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {card.feeDisplay}
                                            </p>
                                            {card.feeWaiver && (
                                                <p
                                                    className="text-[9px]"
                                                    style={{ color: 'var(--text-muted)' }}
                                                >
                                                    {card.feeWaiver.length > 25 ? card.feeWaiver.substring(0, 25) + '...' : card.feeWaiver}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0">
                                        {/* Compare Checkbox */}
                                        <label
                                            className="flex items-center gap-2 cursor-pointer select-none"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={compareList.includes(card.id)}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    toggleCompare(card.id, e);
                                                    if (!isCompareMode) setIsCompareMode(true);
                                                }}
                                                className="w-4 h-4 rounded cursor-pointer accent-[var(--accent)]"
                                                style={{
                                                    accentColor: 'var(--accent)',
                                                }}
                                            />
                                            <span
                                                className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${compareList.includes(card.id) ? 'text-[var(--accent)]' : ''
                                                    }`}
                                                style={{ color: compareList.includes(card.id) ? 'var(--accent)' : 'var(--text-muted)' }}
                                            >
                                                Compare
                                            </span>
                                        </label>

                                        {/* Divider */}
                                        <div
                                            className="h-6 w-px hidden md:block"
                                            style={{ backgroundColor: 'var(--border)' }}
                                        />

                                        {/* Favorite Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite('cards', card.id);
                                            }}
                                            className="transition-colors p-1"
                                            style={{
                                                color: isFavorite('cards', card.id) ? '#ef4444' : 'var(--text-muted)',
                                            }}
                                        >
                                            <Heart
                                                size={18}
                                                fill={isFavorite('cards', card.id) ? '#ef4444' : 'none'}
                                            />
                                        </button>

                                        {/* View Details Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/cards/${card.id}`);
                                            }}
                                            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap"
                                            style={{
                                                backgroundColor: 'var(--accent)',
                                                color: 'var(--bg)',
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : null}

                    {/* Empty State */}
                    {!loading && filteredCards.length === 0 && (
                        <div
                            className="text-center py-16 rounded-xl"
                            style={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                            }}
                        >
                            <CreditCard
                                size={48}
                                className="mx-auto mb-4"
                                style={{ color: 'var(--text-muted)' }}
                            />
                            <h3
                                className="text-xl font-semibold mb-2"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                No cards found
                            </h3>
                            <p style={{ color: 'var(--text-muted)' }}>
                                Try adjusting your filters or search query
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedBank('All');
                                    setSelectedNetwork('All');
                                    setSelectedFee('all');
                                    setSearchQuery('');
                                }}
                                className="mt-4 text-[var(--accent)] text-sm font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Premium Quick View Modal */}
                {selectedCard && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(4px)' }}
                        onClick={() => setSelectedCard(null)}
                    >
                        <div
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col md:flex-row"
                            style={{
                                backgroundColor: 'var(--bg)',
                                border: '1px solid var(--border)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="absolute top-4 right-4 z-20 p-2.5 rounded-full transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                <X size={20} />
                            </button>

                            {/* Left Panel - Card Showcase */}
                            <div
                                className="w-full md:w-[45%] p-6 md:p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                }}
                            >
                                {/* Card Image */}
                                <div
                                    className="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden mb-6 group"
                                    style={{ border: '1px solid var(--border)' }}
                                >
                                    {/* Tier Badge */}
                                    <div
                                        className="absolute top-3 left-3 z-10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                                        style={{
                                            backgroundColor: selectedCard.tier === 'ultra-premium' ? 'var(--accent)' : 'white',
                                            color: selectedCard.tier === 'ultra-premium' ? 'var(--bg)' : 'var(--bg)',
                                        }}
                                    >
                                        {selectedCard.badge}
                                    </div>

                                    {selectedCard.image ? (
                                        <img
                                            src={selectedCard.image}
                                            alt={selectedCard.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center"
                                            style={{ backgroundColor: 'var(--bg-alt)' }}
                                        >
                                            <CreditCard size={64} style={{ color: 'var(--text-muted)' }} />
                                        </div>
                                    )}
                                </div>

                                {/* Card Info */}
                                <div className="text-center space-y-2 w-full">
                                    <h2
                                        className="text-2xl md:text-3xl font-serif font-bold"
                                        style={{ color: 'var(--accent)' }}
                                    >
                                        {selectedCard.name}
                                    </h2>
                                    <p
                                        className="text-sm font-medium uppercase tracking-widest"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {selectedCard.bank} • {selectedCard.network}
                                    </p>
                                </div>

                                {/* Quick Stats - 2x2 Grid */}
                                <div
                                    className="w-full mt-6 grid grid-cols-2 gap-3 p-4 rounded-xl"
                                    style={{ backgroundColor: 'var(--bg)' }}
                                >
                                    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--surface)' }}>
                                        <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                                            Reward Rate
                                        </p>
                                        <p className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
                                            {selectedCard.rewardRate}
                                        </p>
                                    </div>
                                    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--surface)' }}>
                                        <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                                            Annual Fee
                                        </p>
                                        <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                            {selectedCard.feeDisplay}
                                        </p>
                                    </div>
                                    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--surface)' }}>
                                        <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                                            Forex Markup
                                        </p>
                                        <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                                            {selectedCard._raw?.features?.forex?.text || 'Standard'}
                                        </p>
                                    </div>
                                    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--surface)' }}>
                                        <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                                            Card Type
                                        </p>
                                        <p className="text-lg font-bold" style={{ color: selectedCard.material === 'metal' ? 'var(--accent)' : 'var(--text-primary)' }}>
                                            {selectedCard.material === 'metal' ? '🪙 Metal' : '💳 Standard'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel - Benefits */}
                            <div className="w-full md:w-[55%] flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
                                {/* Header */}
                                <div
                                    className="px-6 py-5 border-b"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    <div className="flex items-start justify-between pr-12">
                                        <div>
                                            <h3
                                                className="text-xl font-serif font-bold"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                Key Benefits
                                            </h3>
                                            <p
                                                className="text-xs mt-1"
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                Premium features and rewards
                                            </p>
                                        </div>
                                        <div
                                            className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded mt-1"
                                            style={{
                                                backgroundColor: 'var(--surface)',
                                                color: 'var(--text-muted)',
                                                border: '1px solid var(--border)',
                                            }}
                                        >
                                            <Clock size={12} />
                                            Updated today
                                        </div>
                                    </div>
                                </div>

                                {/* Benefits List */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-3" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                                    {getQuickViewBenefits(selectedCard).map((benefit, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-xl p-4 transition-all"
                                            style={{
                                                backgroundColor: 'var(--surface)',
                                                border: '1px solid var(--border)',
                                            }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0"
                                                    style={{
                                                        backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                                    }}
                                                >
                                                    {benefit.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <p
                                                        className="text-[10px] uppercase tracking-wider font-medium mb-0.5"
                                                        style={{ color: 'var(--accent)' }}
                                                    >
                                                        {benefit.label}
                                                    </p>
                                                    <p
                                                        className="text-base font-semibold"
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        {benefit.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Fee Waiver Info */}
                                    {selectedCard.feeWaiver && (
                                        <div
                                            className="rounded-xl p-4"
                                            style={{
                                                backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                                                border: '1px solid var(--accent)',
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Sparkles size={20} style={{ color: 'var(--accent)' }} />
                                                <div>
                                                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                                        Fee Waiver Available
                                                    </p>
                                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                        {selectedCard.feeWaiver}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div
                                    className="px-6 py-4 border-t flex gap-3"
                                    style={{
                                        borderColor: 'var(--border)',
                                        backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)',
                                    }}
                                >
                                    <button
                                        className="flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                                        style={{
                                            backgroundColor: 'var(--accent)',
                                            color: 'var(--bg)',
                                        }}
                                    >
                                        Apply Now
                                        <ExternalLink size={16} />
                                    </button>
                                    <button
                                        className="px-4 py-3 rounded-lg text-sm font-semibold transition-all"
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'var(--accent)',
                                            border: '1px solid var(--border)',
                                        }}
                                        onClick={() => navigate(`/cards/${selectedCard.id}`)}
                                    >
                                        Full Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
