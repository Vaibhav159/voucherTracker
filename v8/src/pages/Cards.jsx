import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { toSlug, fromSlug } from '../utils/slugify';
import allCards, { formatCurrency, getRewardRate, hasLoungeAccess, getAnnualFee } from '../data/creditCards';

// Icon mapping based on card tier and type
const getTierIcon = (card) => {
    const tier = card.cardType?.tier;
    const material = card.cardType?.material;
    const isCobranded = card.cardType?.isCobranded;

    if (material === 'metal') return 'diamond';
    if (tier === 'ultra-premium') return 'workspace_premium';
    if (tier === 'premium') return 'star';
    if (isCobranded) return 'handshake';
    if (card.network?.type === 'Visa') return 'credit_card';
    if (card.network?.type === 'Mastercard') return 'credit_card';
    if (card.network?.type === 'Amex') return 'credit_score';
    return 'credit_card';
};

// Badge style based on tier
const getBadgeStyle = (card) => {
    const tier = card.cardType?.tier;
    const material = card.cardType?.material;

    if (material === 'metal') return 'bg-gradient-to-r from-copper-600 to-copper-400 text-white shadow-md';
    if (tier === 'ultra-premium') return 'bg-gradient-to-r from-gold-500 to-gold-400 text-espresso-950 shadow-md';
    if (tier === 'premium') return 'bg-gradient-to-r from-purple-900 to-purple-800 text-white border border-white/10';
    if (tier === 'mid-tier') return 'bg-gradient-to-r from-blue-900 to-blue-800 text-white border border-white/10';
    return 'bg-gradient-to-r from-gray-600 to-gray-500 text-white border border-white/10';
};

// Get badge text based on tier
const getBadgeText = (card) => {
    const tier = card.cardType?.tier;
    const material = card.cardType?.material;
    const network = card.network?.variant || card.network?.type;

    if (material === 'metal') return 'Metal Card';
    if (tier === 'ultra-premium') return 'Ultra Premium';
    if (tier === 'premium') return network || 'Premium';
    if (tier === 'mid-tier') return 'Mid Tier';
    return 'Entry Level';
};

// Build tags array from card features
const buildTags = (card) => {
    const tags = [];

    // Lounge access
    const lounge = card.loungeAccess;
    if (lounge?.domestic?.enabled || lounge?.international?.enabled) {
        const domesticVisits = lounge?.domestic?.visitsPerYear || 0;
        const intlVisits = lounge?.international?.visitsPerYear || 0;
        const totalVisits = domesticVisits + intlVisits;
        const loungeText = totalVisits === -1 ? 'Unlimited Lounge' :
            totalVisits > 0 ? `${totalVisits} Lounge Visits` : 'Lounge Access';
        tags.push({ icon: 'flight', text: loungeText });
    }

    // Concierge
    if (card.concierge?.available) {
        tags.push({ icon: 'support_agent', text: '24/7 Concierge' });
    }

    // Material type
    if (card.cardType?.material === 'metal') {
        tags.push({ icon: 'diamond', text: 'Metal Card' });
    }

    // Co-branded partner
    if (card.cardType?.isCobranded && card.cardType?.cobrandPartner?.name) {
        tags.push({ icon: 'handshake', text: card.cardType.cobrandPartner.name });
    }

    // Reward accelerators (SmartBuy, etc.)
    if (card.rewards?.accelerators?.bankPortal?.enabled) {
        const multiplier = card.rewards.accelerators.bankPortal.multiplier;
        if (multiplier && multiplier > 1) {
            tags.push({ text: `${multiplier}X Rewards`, isGradient: true });
        }
    }

    // Golf access
    if (card.golf?.enabled) {
        tags.push({ icon: 'golf_course', text: 'Golf Access' });
    }

    return tags.slice(0, 3); // Limit to 3 tags for UI
};

// Get quick view benefits from card data
const getQuickViewBenefits = (card) => {
    if (!card._raw) return [];
    const raw = card._raw;
    const benefits = [];

    // Lounge Access
    const lounge = raw.loungeAccess;
    if (lounge?.domestic?.enabled || lounge?.international?.enabled) {
        const domesticVisits = lounge?.domestic?.visitsPerYear;
        const intlVisits = lounge?.international?.visitsPerYear;
        let loungeText = '';
        if (domesticVisits === -1 || intlVisits === -1) {
            loungeText = 'Unlimited Lounge Access';
        } else if (domesticVisits && intlVisits) {
            loungeText = `${domesticVisits} Domestic + ${intlVisits} Int'l Visits`;
        } else if (domesticVisits) {
            loungeText = `${domesticVisits} Domestic Visits/Year`;
        } else if (intlVisits) {
            loungeText = `${intlVisits} International Visits/Year`;
        } else {
            loungeText = 'Lounge Access Available';
        }
        benefits.push({ icon: 'flight', label: 'Travel', text: loungeText });
    }

    // Base Reward Rate
    const rewards = raw.rewards;
    if (rewards?.baseRate?.effectivePercentage) {
        const rate = (rewards.baseRate.effectivePercentage * 100).toFixed(1);
        const accelerator = rewards.accelerators?.bankPortal?.enabled ?
            rewards.accelerators.bankPortal.name : null;
        const multiplier = rewards.accelerators?.bankPortal?.multiplier;
        let rewardText = `${rate}% Base Rate`;
        if (accelerator && multiplier) {
            rewardText += ` • ${multiplier}X on ${accelerator}`;
        }
        benefits.push({ icon: 'trending_up', label: 'Rewards', text: rewardText });
    }

    // Forex Markup
    const forex = raw.forexMarkup;
    if (forex?.percentage !== undefined) {
        benefits.push({ icon: 'currency_exchange', label: 'Forex', text: `${forex.percentage}% Markup` });
    }

    // Concierge
    if (raw.concierge?.available) {
        const type = raw.concierge.type || '24/7 Concierge';
        benefits.push({ icon: 'support_agent', label: 'Concierge', text: type });
    }

    // Golf
    if (raw.golf?.enabled) {
        const golfText = raw.golf.gamesPerYear === -1 ? 'Unlimited Golf Games' :
            raw.golf.gamesPerYear ? `${raw.golf.gamesPerYear} Games/Year` : 'Golf Access';
        benefits.push({ icon: 'golf_course', label: 'Golf', text: golfText });
    }

    // Welcome Bonus
    const welcome = rewards?.bonuses?.welcome;
    if (welcome?.enabled && welcome?.points) {
        benefits.push({ icon: 'card_giftcard', label: 'Welcome', text: `${welcome.points.toLocaleString()} Points` });
    }

    return benefits.slice(0, 4); // Max 4 benefits for UI
};

// Get eligibility text from card data
const getEligibilityText = (card) => {
    if (!card._raw?.eligibility) return null;
    const elig = card._raw.eligibility;

    // Check for income requirement
    const annualIncome = elig.income?.salaried?.annual;
    if (annualIncome) {
        if (annualIncome >= 100000) {
            return `₹${(annualIncome / 100000).toFixed(0)}L+ Income`;
        } else if (annualIncome >= 1000) {
            return `₹${(annualIncome / 1000).toFixed(0)}k+ Income`;
        }
    }

    // Check for employment type
    if (elig.employmentType === 'Invite Only') {
        return 'Invite Only';
    }

    if (elig.existingRelationship?.required) {
        return 'Existing Customer';
    }

    return null;
};

// Transform JSON card to UI format
const transformCardForUI = (card) => {
    const feeInfo = getAnnualFee(card);
    const annualFee = feeInfo.annual || 0;
    const joiningFee = feeInfo.joining || 0;

    // Format fee for display
    const formatFee = (fee) => {
        if (fee === 0) return 'Free';
        if (fee >= 100000) return `₹${(fee / 100000).toFixed(1)}L`;
        if (fee >= 1000) return `₹${(fee / 1000).toFixed(fee % 1000 === 0 ? 0 : 1)}k`;
        return `₹${fee}`;
    };

    // Get reward rate percentage
    const rewardRate = card.rewards?.baseRate?.effectivePercentage;
    const rewardRateStr = rewardRate ? `${(rewardRate * 100).toFixed(1)}%` : 'N/A';

    // Waiver text
    const waiverText = feeInfo.hasWaiver && feeInfo.waiverThreshold ?
        `₹${formatCurrency(feeInfo.waiverThreshold)} spend` : null;

    return {
        // Core properties
        id: card.id || card.slug,
        slug: card.slug || card.id,
        name: card.name,
        bank: card.bank,
        network: card.network?.type || 'Unknown',
        networkVariant: card.network?.variant,
        image: card.image || `/assets/cards/placeholder.png`,
        link: card.link,
        isActive: card.isActive !== false,

        // Card type info
        tier: card.cardType?.tier,
        material: card.cardType?.material,
        isCobranded: card.cardType?.isCobranded,
        cobrandPartner: card.cardType?.cobrandPartner?.name,

        // UI styling properties
        badge: getBadgeText(card),
        badgeStyle: getBadgeStyle(card),
        tags: buildTags(card),
        icon: getTierIcon(card),
        iconBg: 'bg-gradient-to-br from-white to-gray-200',
        isDark: card.cardType?.material === 'metal' || card.cardType?.tier === 'ultra-premium',

        // Stats for card display
        stats: [
            { label: 'Reward Rate', value: rewardRateStr },
            { label: 'Annual Fee', value: formatFee(annualFee) }
        ],
        statsDetail: {
            rewardRate: rewardRateStr,
            fee: formatFee(annualFee),
            feeSub: waiverText || (joiningFee > 0 ? `+ ${formatFee(joiningFee)} join` : '')
        },

        // Raw data for filtering/sorting
        annualFee: annualFee,
        joiningFee: joiningFee,
        rewardRateNum: rewardRate || 0,
        hasLoungeAccess: hasLoungeAccess(card),

        // Full original data for detail view
        _raw: card
    };
};

// Transform all cards
const creditCards = allCards.map(transformCardForUI);

export default function Cards() {
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCard, setSelectedCard] = useState(null);
    const { isFavorite, toggleFavorite, getFavoriteCount, clearFavorites, notification } = useFavorites();
    const [compareCards, setCompareCards] = useState(new Set());

    // Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBanks, setSelectedBanks] = useState([]);
    const [selectedNetworks, setSelectedNetworks] = useState([]);
    const [feeRange, setFeeRange] = useState([0, 100000]); // Max 1L+
    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const [sortBy, setSortBy] = useState('popularity'); // popularity, fee_low, fee_high, reward_rate

    // UI State for dropdowns
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Derived Data for Dropdowns
    const uniqueBanks = useMemo(() => [...new Set(creditCards.map(c => c.bank))].sort(), []);
    const uniqueNetworks = useMemo(() => {
        const networks = new Set();
        creditCards.forEach(c => {
            if (c.network && c.network !== 'Unknown') {
                networks.add(c.network);
            }
        });
        return [...networks].sort();
    }, []);

    // Filter Logic
    const filteredCards = useMemo(() => {
        return creditCards.filter(card => {
            // Search
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                card.name.toLowerCase().includes(searchLower) ||
                card.bank.toLowerCase().includes(searchLower) ||
                (card.cobrandPartner && card.cobrandPartner.toLowerCase().includes(searchLower));
            if (!matchesSearch) return false;

            // Banks
            if (selectedBanks.length > 0 && !selectedBanks.includes(card.bank)) return false;

            // Networks
            if (selectedNetworks.length > 0 && !selectedNetworks.includes(card.network)) return false;

            // Fee Range - use numeric annualFee directly
            const feeNum = card.annualFee || 0;
            if (feeNum < feeRange[0]) return false;
            if (feeRange[1] < 100000 && feeNum > feeRange[1]) return false;

            // Benefits filter
            if (selectedBenefits.length > 0) {
                const hasBenefits = selectedBenefits.every(benefit => {
                    const b = benefit.toLowerCase();
                    if (b === 'lounge access') return card.hasLoungeAccess;
                    if (b === 'metal card') return card.material === 'metal';
                    if (b === 'no forex fee') return card._raw?.foreignCurrency?.markupPercentage === 0;
                    if (b === 'concierge') return card._raw?.concierge?.available;
                    if (b === 'golf games') return card._raw?.golf?.enabled;
                    return true;
                });
                if (!hasBenefits) return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === 'fee_low') {
                return (a.annualFee || 0) - (b.annualFee || 0);
            }
            if (sortBy === 'fee_high') {
                return (b.annualFee || 0) - (a.annualFee || 0);
            }
            if (sortBy === 'reward_rate') {
                return (b.rewardRateNum || 0) - (a.rewardRateNum || 0);
            }
            // Default: sort by tier (ultra-premium first)
            const tierOrder = { 'ultra-premium': 0, 'premium': 1, 'mid-tier': 2, 'entry': 3 };
            return (tierOrder[a.tier] || 4) - (tierOrder[b.tier] || 4);
        });
    }, [searchQuery, selectedBanks, selectedNetworks, selectedBenefits, sortBy, feeRange]);

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeQuickView = () => {
        setSelectedCard(null);
    };

    const handleToggleFavorite = (e, cardId) => {
        e.stopPropagation();
        toggleFavorite('cards', cardId);
    };

    const toggleCompare = (e, cardId) => {
        e.stopPropagation();
        setCompareCards(prev => {
            const newCompare = new Set(prev);
            if (newCompare.has(cardId)) {
                newCompare.delete(cardId);
            } else {
                newCompare.add(cardId);
            }
            return newCompare;
        });
    };

    // Helper handlers for UI
    const toggleBenefit = (benefit) => {
        setSelectedBenefits(prev =>
            prev.includes(benefit) ? prev.filter(b => b !== benefit) : [...prev, benefit]
        );
    };

    // Helper for formatting currency in fee slider
    const formatCurrency = (value) => {
        if (value >= 100000) return '₹1L+';
        if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
        return `₹${value}`;
    };

    return (
        <div className="flex flex-1 overflow-hidden relative font-display text-gold-100 bg-espresso-950">

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-espresso-950">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-espresso-texture opacity-30"></div>
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-copper-500/5 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold-500/5 blur-[120px] rounded-full"></div>
                </div>

                <div className="flex-1 overflow-y-auto z-10 p-6 lg:p-8 scroll-smooth pb-20 scrollbar-thin scrollbar-thumb-espresso-800">
                    <div className="max-w-[1400px] mx-auto flex flex-col gap-10">

                        <div className="flex flex-col gap-6 animate-fade-in-up">
                            <div className="flex flex-col gap-3">
                                <h2 className="text-4xl lg:text-6xl font-serif text-gold-400 font-bold tracking-tight drop-shadow-sm">
                                    Exclusive <span className="text-white font-serif italic font-light">Credit Cards</span>
                                </h2>
                                <p className="text-white/60 text-base font-light max-w-2xl leading-relaxed mt-2 font-display">
                                    Negotiated benefits for premium cardholders. Maximize your <span className="text-copper-400 font-medium border-b border-copper-500/30 pb-0.5">Reward ROI</span> with our curated selection.
                                </p>
                            </div>

                            <div className="w-full border border-white/5 rounded-xl px-4 py-3 flex flex-col md:flex-row gap-4 justify-between items-center bg-espresso-900/70 backdrop-blur-md sticky top-0 z-30 transition-all duration-300 shadow-xl ring-1 ring-white/5">
                                <div className="flex items-center gap-3 w-full md:w-auto overflow-visible py-1">
                                    {/* Search Input */}
                                    <div className="relative group shrink-0 mr-2">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-copper-500 text-[18px]">search</span>
                                        <input
                                            className="bg-espresso-800/50 border border-white/10 rounded-md py-1.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-copper-500 focus:bg-espresso-800 w-40 transition-all placeholder-white/30"
                                            placeholder="Search cards..."
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    <div className="h-6 w-px bg-white/10 mx-1 shrink-0"></div>

                                    {/* Bank Dropdown */}
                                    <div className="relative shrink-0">
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === 'Bank' ? null : 'Bank')}
                                            className={`h-9 px-4 rounded-md border ${activeDropdown === 'Bank' ? 'border-copper-500 bg-espresso-800' : selectedBanks.length > 0 ? 'border-copper-500/50 bg-copper-500/10' : 'border-white/10 bg-espresso-800/50'} flex items-center gap-2 cursor-pointer hover:border-copper-500 hover:bg-espresso-800 transition-all btn-press text-xs uppercase tracking-wider whitespace-nowrap text-white/70 hover:text-white`}
                                        >
                                            Bank {selectedBanks.length > 0 && <span className="text-white font-bold">({selectedBanks.length})</span>}
                                            <span className={`material-symbols-outlined text-copper-500 text-[16px] transition-transform ${activeDropdown === 'Bank' ? 'rotate-180' : ''}`}>expand_more</span>
                                        </button>
                                        {activeDropdown === 'Bank' && (
                                            <>
                                                <div className="fixed inset-0 z-[100]" onClick={() => setActiveDropdown(null)}></div>
                                                <div className="absolute top-full left-0 mt-2 w-72 max-h-96 overflow-y-auto bg-espresso-900 border border-copper-500/50 rounded-xl shadow-2xl z-[101] p-3 scrollbar-thin scrollbar-theme" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex justify-between items-center mb-2 px-2 pb-2 border-b border-white/10">
                                                            <span className="text-xs font-bold text-copper-500 uppercase">Select Banks</span>
                                                            {selectedBanks.length > 0 && (
                                                                <button onClick={() => setSelectedBanks([])} className="text-[10px] text-white/50 hover:text-white">Clear</button>
                                                            )}
                                                        </div>
                                                        {uniqueBanks.map(bank => (
                                                            <label key={bank} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer group">
                                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedBanks.includes(bank) ? 'bg-copper-500 border-copper-500' : 'border-white/30 group-hover:border-copper-500'}`}>
                                                                    {selectedBanks.includes(bank) && <span className="material-symbols-outlined text-[12px] text-espresso-950 font-bold">check</span>}
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedBanks.includes(bank)}
                                                                    onChange={() => {
                                                                        setSelectedBanks(prev => prev.includes(bank) ? prev.filter(b => b !== bank) : [...prev, bank]);
                                                                    }}
                                                                    className="hidden"
                                                                />
                                                                <span className="text-sm text-white">{bank}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Network Dropdown */}
                                    <div className="relative shrink-0">
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === 'Network' ? null : 'Network')}
                                            className={`h-9 px-4 rounded-md border ${activeDropdown === 'Network' ? 'border-copper-500 bg-espresso-800' : selectedNetworks.length > 0 ? 'border-copper-500/50 bg-copper-500/10' : 'border-white/10 bg-espresso-800/50'} flex items-center gap-2 cursor-pointer hover:border-copper-500 hover:bg-espresso-800 transition-all btn-press text-xs uppercase tracking-wider whitespace-nowrap text-white/70 hover:text-white`}
                                        >
                                            Network {selectedNetworks.length > 0 && <span className="text-white font-bold">({selectedNetworks.length})</span>}
                                            <span className={`material-symbols-outlined text-copper-500 text-[16px] transition-transform ${activeDropdown === 'Network' ? 'rotate-180' : ''}`}>expand_more</span>
                                        </button>
                                        {activeDropdown === 'Network' && (
                                            <>
                                                <div className="fixed inset-0 z-[100]" onClick={() => setActiveDropdown(null)}></div>
                                                <div className="absolute top-full left-0 mt-2 w-72 max-h-96 overflow-y-auto bg-espresso-900 border border-copper-500/50 rounded-xl shadow-2xl z-[101] p-3 scrollbar-thin scrollbar-theme" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex justify-between items-center mb-2 px-2 pb-2 border-b border-white/10">
                                                            <span className="text-xs font-bold text-copper-500 uppercase">Select Networks</span>
                                                            {selectedNetworks.length > 0 && (
                                                                <button onClick={() => setSelectedNetworks([])} className="text-[10px] text-white/50 hover:text-white">Clear</button>
                                                            )}
                                                        </div>
                                                        {uniqueNetworks.map(net => (
                                                            <label key={net} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer group">
                                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedNetworks.includes(net) ? 'bg-copper-500 border-copper-500' : 'border-white/30 group-hover:border-copper-500'}`}>
                                                                    {selectedNetworks.includes(net) && <span className="material-symbols-outlined text-[12px] text-espresso-950 font-bold">check</span>}
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedNetworks.includes(net)}
                                                                    onChange={() => {
                                                                        setSelectedNetworks(prev => prev.includes(net) ? prev.filter(n => n !== net) : [...prev, net]);
                                                                    }}
                                                                    className="hidden"
                                                                />
                                                                <span className="text-sm text-white">{net}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Benefits Dropdown */}
                                    <div className="relative shrink-0">
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === 'Benefits' ? null : 'Benefits')}
                                            className={`h-9 px-4 rounded-md border ${activeDropdown === 'Benefits' ? 'border-copper-500 bg-espresso-800' : selectedBenefits.length > 0 ? 'border-copper-500/50 bg-copper-500/10' : 'border-white/10 bg-espresso-800/50'} flex items-center gap-2 cursor-pointer hover:border-copper-500 hover:bg-espresso-800 transition-all btn-press text-xs uppercase tracking-wider whitespace-nowrap text-white/70 hover:text-white`}
                                        >
                                            Benefits {selectedBenefits.length > 0 && <span className="text-white font-bold">({selectedBenefits.length})</span>}
                                            <span className={`material-symbols-outlined text-copper-500 text-[16px] transition-transform ${activeDropdown === 'Benefits' ? 'rotate-180' : ''}`}>expand_more</span>
                                        </button>
                                        {activeDropdown === 'Benefits' && (
                                            <>
                                                <div className="fixed inset-0 z-[100]" onClick={() => setActiveDropdown(null)}></div>
                                                <div className="absolute top-full left-0 mt-2 w-72 max-h-96 overflow-y-auto bg-espresso-900 border border-copper-500/50 rounded-xl shadow-2xl z-[101] p-3 scrollbar-thin scrollbar-theme" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex justify-between items-center mb-2 px-2 pb-2 border-b border-white/10">
                                                            <span className="text-xs font-bold text-copper-500 uppercase">Filter by Benefits</span>
                                                            {selectedBenefits.length > 0 && (
                                                                <button onClick={() => setSelectedBenefits([])} className="text-[10px] text-white/50 hover:text-white">Clear</button>
                                                            )}
                                                        </div>
                                                        {['Lounge Access', 'Golf Games', 'Concierge', 'No Forex Fee', 'Metal Card'].map((benefit, idx) => (
                                                            <label key={idx} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer group">
                                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedBenefits.includes(benefit) ? 'bg-copper-500 border-copper-500' : 'border-white/30 group-hover:border-copper-500'}`}>
                                                                    {selectedBenefits.includes(benefit) && <span className="material-symbols-outlined text-[12px] text-espresso-950 font-bold">check</span>}
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedBenefits.includes(benefit)}
                                                                    onChange={() => toggleBenefit(benefit)}
                                                                    className="hidden"
                                                                />
                                                                <span className="text-sm text-white">{benefit}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Annual Fee Dropdown */}
                                    <div className="relative shrink-0">
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === 'Fee' ? null : 'Fee')}
                                            className={`h-9 px-4 rounded-md border ${activeDropdown === 'Fee' ? 'border-copper-500 bg-espresso-800' : (feeRange[0] > 0 || feeRange[1] < 100000) ? 'border-copper-500/50 bg-copper-500/10' : 'border-white/10 bg-espresso-800/50'} flex items-center gap-2 cursor-pointer hover:border-copper-500 hover:bg-espresso-800 transition-all btn-press text-xs uppercase tracking-wider whitespace-nowrap text-white/70 hover:text-white`}
                                        >
                                            Annual Fee {(feeRange[0] > 0 || feeRange[1] < 100000) && <span className="text-copper-500">•</span>}
                                            <span className={`material-symbols-outlined text-copper-500 text-[16px] transition-transform ${activeDropdown === 'Fee' ? 'rotate-180' : ''}`}>expand_more</span>
                                        </button>
                                        {activeDropdown === 'Fee' && (
                                            <>
                                                <div className="fixed inset-0 z-[100]" onClick={() => setActiveDropdown(null)}></div>
                                                <div className="absolute top-full left-0 mt-2 w-72 bg-espresso-900 border border-copper-500/50 rounded-xl shadow-2xl z-[101] p-3 scrollbar-thin scrollbar-theme" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}>
                                                    <div className="p-2">
                                                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                                                            <span className="text-xs font-bold text-copper-500 uppercase">Max Annual Fee</span>
                                                            <button onClick={() => setFeeRange([0, 100000])} className="text-[10px] text-white/50 hover:text-white">Reset</button>
                                                        </div>
                                                        <div className="px-2 py-2">
                                                            <div className="relative h-6 flex items-center mb-2">
                                                                <input
                                                                    className="w-full z-20 opacity-0 absolute cursor-pointer"
                                                                    type="range"
                                                                    min="0"
                                                                    max="100000"
                                                                    step="1000"
                                                                    value={feeRange[1]}
                                                                    onChange={(e) => setFeeRange([0, parseInt(e.target.value)])}
                                                                />
                                                                <div className="absolute w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                                    <div className="h-full bg-copper-500" style={{ width: `${Math.min(100, (feeRange[1] / 100000) * 100)}%` }}></div>
                                                                </div>
                                                                <div
                                                                    className="absolute w-4 h-4 rounded-full bg-gold-400 border-[2px] border-espresso-900 shadow-glow-copper pointer-events-none transform -translate-x-2 transition-all"
                                                                    style={{ left: `${Math.min(100, (feeRange[1] / 100000) * 100)}%` }}
                                                                ></div>
                                                            </div>
                                                            <div className="flex justify-between text-[11px] text-white/60 font-mono font-medium mt-3">
                                                                <span>₹0</span>
                                                                <span className="text-copper-500 font-bold">{feeRange[1] >= 100000 ? 'Any' : formatCurrency(feeRange[1])}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Sort Dropdown */}
                                    <div className="relative shrink-0">
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === 'Sort' ? null : 'Sort')}
                                            className={`h-9 px-4 rounded-md border ${activeDropdown === 'Sort' ? 'border-copper-500 bg-espresso-800' : sortBy !== 'popularity' ? 'border-copper-500/50 bg-copper-500/10' : 'border-white/10 bg-espresso-800/50'} flex items-center gap-2 cursor-pointer hover:border-copper-500 hover:bg-espresso-800 transition-all btn-press text-xs uppercase tracking-wider whitespace-nowrap text-white/70 hover:text-white`}
                                        >
                                            Sort {sortBy !== 'popularity' && <span className="text-copper-500">•</span>}
                                            <span className="material-symbols-outlined text-copper-500 text-[16px]">sort</span>
                                        </button>
                                        {activeDropdown === 'Sort' && (
                                            <>
                                                <div className="fixed inset-0 z-[100]" onClick={() => setActiveDropdown(null)}></div>
                                                <div className="absolute top-full left-0 mt-2 w-72 bg-espresso-900 border border-copper-500/50 rounded-xl shadow-2xl z-[101] p-3 scrollbar-thin scrollbar-theme" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex justify-between items-center mb-2 px-2 pb-2 border-b border-white/10">
                                                            <span className="text-xs font-bold text-copper-500 uppercase">Sort Order</span>
                                                        </div>
                                                        {[
                                                            { id: 'popularity', label: 'Popularity' },
                                                            { id: 'reward_rate', label: 'Highest Reward Rate' },
                                                            { id: 'fee_low', label: 'Annual Fee (Low to High)' },
                                                            { id: 'fee_high', label: 'Annual Fee (High to Low)' }
                                                        ].map(option => (
                                                            <button
                                                                key={option.id}
                                                                onClick={() => { setSortBy(option.id); setActiveDropdown(null); }}
                                                                className={`flex items-center justify-between p-2 rounded hover:bg-white/5 text-left group ${sortBy === option.id ? 'bg-white/5' : ''}`}
                                                            >
                                                                <span className={`text-sm ${sortBy === option.id ? 'text-copper-500 font-bold' : 'text-white group-hover:text-copper-500'}`}>{option.label}</span>
                                                                {sortBy === option.id && <span className="material-symbols-outlined text-[16px] text-copper-500">check</span>}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                                    <span className="text-xs font-bold text-white/30 tracking-widest uppercase mr-2">View:</span>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`size-9 rounded flex items-center justify-center transition-all btn-press ${viewMode === 'grid'
                                            ? 'bg-espresso-800 border border-copper-500 text-copper-400 shadow-glow-copper relative after:absolute after:inset-0 after:rounded after:shadow-[inset_0_0_10px_rgba(205,127,50,0.2)]'
                                            : 'bg-transparent border border-transparent text-white/30 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`size-9 rounded flex items-center justify-center transition-all btn-press ${viewMode === 'list'
                                            ? 'bg-espresso-800 border border-copper-500 text-copper-400 shadow-glow-copper relative after:absolute after:inset-0 after:rounded after:shadow-[inset_0_0_10px_rgba(205,127,50,0.2)]'
                                            : 'bg-transparent border border-transparent text-white/30 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">view_list</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Featured Selection Header */}
                        <section className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-serif text-gold-200 flex items-center gap-3">
                                    <span className="flex items-center justify-center size-8 rounded-full border border-copper-500/30 bg-espresso-800 text-copper-500 shadow-lg">
                                        <span className="material-symbols-outlined text-[16px]">star</span>
                                    </span>
                                    Featured Selection
                                </h3>
                                <div className="flex gap-2">
                                    <button className="size-9 rounded-full border border-white/5 bg-espresso-900 hover:border-copper-500 text-white/50 hover:text-white flex items-center justify-center transition-all hover:shadow-glow-copper">
                                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                    </button>
                                    <button className="size-9 rounded-full border border-white/5 bg-espresso-900 hover:border-copper-500 text-white/50 hover:text-white flex items-center justify-center transition-all hover:shadow-glow-copper">
                                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>

                            {/* Featured Grid - Remains Grid in both views */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {creditCards.slice(0, 2).map((card, idx) => (
                                    <div key={card.id} onClick={() => handleCardClick(card)} className="relative h-72 rounded-2xl overflow-hidden border border-copper-500/30 group cursor-pointer shadow-card-depth hover:border-copper-400 hover:shadow-card-hover transition-all duration-500 shimmer-hover">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                            style={{ backgroundImage: `url("${card.image}")`, filter: idx === 1 ? 'grayscale(1) brightness(0.6) sepia(0.2) hue-rotate(-30deg)' : undefined }}
                                        ></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-espresso-950 via-espresso-900/90 to-transparent"></div>
                                        <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none"></div>

                                        <div className="relative z-10 p-10 flex flex-col justify-center h-full gap-5 max-w-lg">
                                            <div className="flex items-center gap-3">
                                                {idx === 0 ? (
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-gold-300 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded backdrop-blur-md border border-gold-300/30 shadow-lg">
                                                        <span className="material-symbols-outlined text-[14px] animate-pulse">schedule</span> Ends in 4H
                                                    </span>
                                                ) : (
                                                    <span className="text-copper-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 bg-espresso-950/40 px-3 py-1.5 rounded backdrop-blur-md border border-copper-500/20">
                                                        <span className="material-symbols-outlined text-[16px] text-copper-500">verified</span> CASHBACK
                                                    </span>
                                                )}
                                                <span className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest border shadow-glow-copper ${idx === 0 ? 'bg-copper-500 text-espresso-950 border-copper-400' : 'bg-white/10 backdrop-blur-md border-white/20 text-white'}`}>
                                                    {idx === 0 ? '15% OFF' : '5% Back'}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-4xl font-serif text-white leading-tight mb-3 group-hover:text-gold-200 transition-colors">{card.name}</h3>
                                                <p className="text-white/80 text-sm font-light tracking-wide border-l-2 border-copper-500 pl-3">
                                                    {card.tier === 'ultra-premium' ? 'Experience premium privileges with exclusive luxury benefits.' :
                                                        card.hasLoungeAccess ? 'Comprehensive travel benefits with lounge access.' :
                                                            card.isCobranded ? `Partner benefits with ${card.cobrandPartner || 'exclusive offers'}.` :
                                                                'Great rewards and cashback on everyday spends.'}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                <Link to={`/cards/${card.id}`} className="px-5 py-2 rounded border border-white/20 hover:border-copper-500 hover:bg-copper-500/10 text-xs font-bold uppercase tracking-widest text-white transition-all">View Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section >

                        <section className="mt-4">
                            <div className="flex items-center justify-between mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <h3 className="text-2xl font-serif text-white/90">All Cards ({filteredCards.length})</h3>
                                <span className="text-xs font-bold text-copper-500 tracking-widest uppercase flex items-center gap-2">
                                    View: <span className="text-white">{viewMode === 'grid' ? 'Grid' : 'List'}</span>
                                </span>
                            </div>

                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredCards.map((card, idx) => (
                                        <article key={card.id} onClick={() => handleCardClick(card)} className="group relative flex flex-col rounded-xl overflow-hidden bg-espresso-850 bg-espresso-texture border border-copper-500/40 hover:border-copper-400 shadow-lg animate-pop-scale transition-all duration-500 hover:shadow-glow-copper shimmer-hover hover:-translate-y-1 cursor-pointer" style={{ animationDelay: `${0.25 + (idx * 0.05)}s` }}>
                                            {/* Card Image Section */}
                                            <div className="relative w-full aspect-[1.586/1] bg-gradient-to-br from-espresso-900 via-espresso-850 to-espresso-950 overflow-hidden">
                                                {card.image && !card.image.includes('placeholder') ? (
                                                    <img
                                                        src={card.image}
                                                        alt={card.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                {/* Fallback display - styled card placeholder */}
                                                <div className={`absolute inset-0 flex flex-col items-center justify-center ${card.image && !card.image.includes('placeholder') ? 'hidden' : 'flex'}`}>
                                                    <div className={`absolute inset-0 ${card.bank?.includes('HDFC') ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950' :
                                                            card.bank?.includes('ICICI') ? 'bg-gradient-to-br from-orange-900 via-red-900 to-orange-950' :
                                                                card.bank?.includes('Axis') ? 'bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950' :
                                                                    card.bank?.includes('SBI') ? 'bg-gradient-to-br from-blue-800 via-indigo-900 to-blue-950' :
                                                                        card.bank?.includes('Amex') || card.bank?.includes('American') ? 'bg-gradient-to-br from-cyan-900 via-teal-900 to-cyan-950' :
                                                                            card.bank?.includes('Kotak') ? 'bg-gradient-to-br from-red-900 via-rose-900 to-red-950' :
                                                                                card.bank?.includes('IndusInd') ? 'bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-950' :
                                                                                    card.bank?.includes('Yes') ? 'bg-gradient-to-br from-sky-900 via-cyan-900 to-sky-950' :
                                                                                        card.bank?.includes('RBL') ? 'bg-gradient-to-br from-amber-900 via-yellow-900 to-amber-950' :
                                                                                            'bg-gradient-to-br from-espresso-900 via-espresso-800 to-espresso-950'
                                                        }`}></div>
                                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                                                    <div className="relative z-10 flex flex-col items-center gap-3">
                                                        <span className="material-symbols-outlined text-white/20 text-[56px]">{card.icon}</span>
                                                        <div className="text-center">
                                                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{card.bank?.split(' ')[0]}</p>
                                                            <p className="text-white/30 text-[10px] mt-1">{card.network}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Gradient overlay for text readability */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-transparent to-transparent"></div>
                                                {/* Tier Badge Overlay */}
                                                <div className="absolute top-3 left-3">
                                                    <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm ${card.badgeStyle}`}>
                                                        {card.badge}
                                                    </span>
                                                </div>
                                                {/* Favorite Button */}
                                                <button
                                                    className={`absolute top-3 right-3 transition-all hover:scale-110 p-1.5 rounded-full backdrop-blur-sm ${isFavorite('cards', card.id) ? 'text-red-500 bg-white/20' : 'text-white/60 bg-black/30 hover:text-copper-400 hover:bg-black/50'}`}
                                                    onClick={(e) => handleToggleFavorite(e, card.id)}
                                                >
                                                    <span
                                                        className="material-symbols-outlined text-[20px]"
                                                        style={isFavorite('cards', card.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                                                    >
                                                        favorite
                                                    </span>
                                                </button>
                                                {/* Network Badge */}
                                                <div className="absolute bottom-3 right-3">
                                                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                                                        {card.network}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Card Info Section */}
                                            <div className="p-5 flex flex-col flex-1 relative z-10">
                                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-copper-400 transition-colors font-serif tracking-wide line-clamp-2">{card.name}</h3>
                                                <p className="text-xs text-white/50 mb-3 font-light">{card.bank}</p>

                                                {/* Feature Pills */}
                                                {card.tags && card.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                                        {card.tags.slice(0, 2).map((tag, tagIdx) => (
                                                            <span key={tagIdx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-copper-500/10 border border-copper-500/20 text-[10px] text-copper-400">
                                                                {tag.icon && <span className="material-symbols-outlined text-[12px]">{tag.icon}</span>}
                                                                {tag.text}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Stats Section */}
                                                <div className="mt-auto border-t border-dashed border-copper-500/30 pt-3 flex items-end justify-between">
                                                    <div>
                                                        <p className="text-[10px] text-copper-400/80 font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[12px]">trending_up</span> Reward
                                                        </p>
                                                        <p className="text-xl text-gold-400 font-serif">{card.statsDetail.rewardRate}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-0.5">Fee</p>
                                                        <p className="text-white text-sm font-medium">{card.statsDetail.fee}</p>
                                                        {card.statsDetail.feeSub && (
                                                            <p className="text-[9px] text-white/40">{card.statsDetail.feeSub}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2 mt-4">
                                                    <button className="flex-1 py-2 rounded bg-transparent border border-copper-500/50 text-copper-400 text-[10px] font-bold uppercase tracking-widest hover:bg-gold-btn-gradient hover:text-espresso-950 hover:border-transparent transition-all btn-press">
                                                        Details
                                                    </button>
                                                    <button
                                                        className={`px-3 py-2 rounded border flex items-center justify-center transition-all ${compareCards.has(card.id) ? 'border-copper-500 bg-copper-500/20 text-copper-400' : 'border-copper-500/30 text-white/40 hover:text-copper-400 hover:border-copper-500 hover:bg-copper-500/10'}`}
                                                        title="Compare"
                                                        onClick={(e) => toggleCompare(e, card.id)}
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                // List View
                                <div className="flex flex-col bg-espresso-850/20 rounded-2xl border border-white/5 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                    {filteredCards.map((card, idx) => (
                                        <article key={card.id} className="group card-list-item flex flex-col md:flex-row items-center gap-6 p-5 border-b border-copper-500/10 relative transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-white/5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(205,127,50,0.2)] hover:z-10 animate-fade-in-up" style={{ animationDelay: `${0.1 + (idx * 0.1)}s` }}>
                                            <div className="w-full md:w-32 shrink-0 relative transition-transform duration-500 group-hover:scale-105">
                                                {card.customArt ? (
                                                    <div className="relative z-10 w-32 aspect-[1.586] rounded-lg bg-[#1a1a1a] shadow-lg border border-copper-600/50 flex flex-col justify-between p-3 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-copper-500/20 group-hover:border-copper-400">
                                                        <div className="text-copper-500 font-serif font-bold text-[10px] tracking-wider group-hover:text-gold-300 transition-colors">ATLAS</div>
                                                        <div className="flex justify-between items-end">
                                                            <div className="text-white/30 text-[6px] font-mono">**** 1122</div>
                                                            <div className="size-4 bg-white/10 rounded-full group-hover:bg-copper-500/40 transition-colors"></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img alt={card.name} className={`w-full rounded-lg shadow-lg shadow-black/40 ${card.isGrayscale ? 'grayscale group-hover:grayscale-0' : ''} transition-all duration-500`} src={card.image} />
                                                )}
                                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col gap-1 w-full text-center md:text-left">
                                                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 justify-center md:justify-start">
                                                    <h3 className="text-lg font-bold font-serif text-gold-100 group-hover:text-copper-400 transition-colors truncate">{card.name}</h3>
                                                    {card.tags && card.tags.length > 0 && (
                                                        card.animateSheen ? (
                                                            <span className="hidden sm:inline-block px-2 py-0.5 bg-gradient-to-r from-gold-400 to-gold-600 text-espresso-950 rounded text-[10px] font-bold shadow-sm whitespace-nowrap animate-sheen bg-[length:200%_auto]">Unlimited Lounge</span>
                                                        ) : (
                                                            <span className={`hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold shadow-sm whitespace-nowrap ${card.tags[0]?.isGradient ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-espresso-950' : 'bg-gradient-to-r from-gold-400 to-gold-600 text-espresso-950'}`}>
                                                                {card.tags[0]?.text}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                                <p className="text-xs text-white/40 uppercase tracking-wider">{card.bank} • {card.network}</p>
                                            </div>
                                            <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-8 w-full md:w-auto md:justify-end text-center md:text-left">
                                                {card.stats.map((stat, sIdx) => (
                                                    <div key={sIdx} className="min-w-[100px]">
                                                        <p className="text-white/30 text-[10px] uppercase tracking-wider font-semibold mb-0.5">{stat.label}</p>
                                                        {stat.isProgress ? (
                                                            <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                                                                <div className="h-1 w-16 bg-white/10 rounded-full overflow-hidden">
                                                                    <div className="h-full bg-copper-500 w-[80%] rounded-full group-hover:bg-gold-400 transition-colors duration-500"></div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className={`font-medium text-sm ${stat.label === 'Taj Vouchers' ? 'text-copper-400' : 'text-gold-100 group-hover:text-white'} transition-colors`}>{stat.value}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
                                                <label className="group/compare flex items-center gap-2 cursor-pointer select-none" onClick={(e) => e.stopPropagation()}>
                                                    <input
                                                        className="appearance-none w-4 h-4 border border-white/20 rounded bg-transparent transition-all cursor-pointer hover:border-copper-400 checked:bg-copper-500 checked:border-copper-500"
                                                        type="checkbox"
                                                        checked={compareCards.has(card.id)}
                                                        onChange={(e) => toggleCompare(e, card.id)}
                                                    />
                                                    <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${compareCards.has(card.id) ? 'text-copper-400' : 'text-white/30 group-hover/compare:text-white/60'}`}>Compare</span>
                                                </label>
                                                <div className="h-8 w-px bg-copper-500/10 hidden md:block group-hover:bg-copper-500/30 transition-colors"></div>
                                                <button
                                                    className={`transition-colors flex items-center justify-center btn-press ${isFavorite('cards', card.id) ? 'text-red-500' : 'text-copper-500/50 hover:text-copper-400'}`}
                                                    onClick={(e) => handleToggleFavorite(e, card.id)}
                                                >
                                                    <span
                                                        className="material-symbols-outlined text-[20px]"
                                                        style={isFavorite('cards', card.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                                                    >
                                                        favorite
                                                    </span>
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); handleCardClick(card); }} className="px-5 py-2 rounded bg-espresso-900 border border-copper-500 text-white text-xs font-semibold bg-gradient-to-r hover:from-copper-600 hover:to-gold-600 transition-all whitespace-nowrap shadow-lg btn-press hover:shadow-copper-glow">
                                                    View Details
                                                </button>
                                            </div>
                                        </article>
                                    ))}

                                    <div className="group relative border border-dashed border-copper-500/30 hover:border-copper-400 hover:bg-espresso-800/50 transition-all flex flex-col md:flex-row items-center justify-between cursor-pointer p-8 gap-6 animate-fade-in-up mt-6" style={{ animationDelay: '0.6s' }}>
                                        <div className="flex items-center gap-6">
                                            <div className="size-16 rounded-full bg-espresso-800 border border-copper-500/20 flex items-center justify-center group-hover:bg-copper-500/10 group-hover:border-copper-500 transition-all shadow-xl shrink-0 group-hover:scale-110 duration-300">
                                                <span className="material-symbols-outlined text-copper-500 text-2xl group-hover:rotate-90 transition-transform duration-300">add_card</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-serif font-bold text-gold-100 mb-1">Explore Marketplace</h3>
                                                <p className="text-gold-100/50 text-sm leading-relaxed max-w-md">
                                                    Browse the full card marketplace to find your next premium addition.
                                                </p>
                                            </div>
                                        </div>
                                        <button className="px-6 py-2.5 rounded-full bg-transparent border border-copper-500 text-copper-400 text-sm font-bold hover:bg-copper-500 hover:text-white transition-all flex items-center gap-2 whitespace-nowrap btn-press">
                                            Discover More <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div >
                </div >
            </main >

            {/* Quick View Modal */}
            {
                selectedCard && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 opacity-100 transition-opacity duration-300 pointer-events-auto bg-black/80 backdrop-blur-sm" role="dialog">
                        <div className="relative w-full max-w-5xl bg-espresso-950 bg-espresso-texture rounded-xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9)] border border-copper-500/50 flex flex-col md:flex-row overflow-hidden animate-pop-scale ring-1 ring-copper-400/20">
                            <div className="w-full md:w-5/12 relative bg-gradient-to-br from-espresso-900 via-espresso-850 to-espresso-950 flex flex-col items-center justify-center p-8 lg:p-10 border-b md:border-b-0 md:border-r border-copper-500/30 group overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(205,127,50,0.1),transparent_70%)]"></div>
                                <div className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[50%] bg-copper-500/5 blur-[80px] rounded-full pointer-events-none"></div>
                                <div className="relative w-full aspect-[1.586/1] rounded-xl shadow-2xl transition-transform duration-700 hover:scale-[1.03] z-10 perspective-1000 rotate-card group-hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] border border-copper-500/50 ring-1 ring-white/10">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-200 via-gray-400 to-white p-[1px] shadow-inner">
                                        <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-espresso-900 to-black relative overflow-hidden flex items-center justify-center">
                                            {/* Card Art Logic */}
                                            {selectedCard.image && !selectedCard.customArt ? (
                                                <img src={selectedCard.image} alt={selectedCard.name} className="w-full h-full object-cover opacity-90" />
                                            ) : (
                                                <>
                                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                                                    <span className="material-symbols-outlined text-gold-400 text-[64px] opacity-20 relative z-10 drop-shadow-lg">{selectedCard.icon || 'diamond'}</span>
                                                </>
                                            )}

                                            {/* Overlays */}
                                            <div className="absolute top-5 right-5 text-[10px] font-bold text-gold-300 tracking-[0.2em] font-display uppercase z-20">{selectedCard.bank.split(' ')[0]}</div>
                                            <div className="absolute bottom-6 left-6 text-xs text-white/50 font-mono tracking-wider z-20">**** 4582</div>
                                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-40"></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-center mt-10 relative z-10">
                                    <span className="px-3 py-1 rounded-full bg-gradient-to-b from-copper-400 via-copper-600 to-copper-700 text-[10px] font-bold text-white uppercase tracking-wider shadow-[0_2px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] border border-copper-400/50">{selectedCard.name.split(' ')[0]}</span>
                                    {selectedCard.badge && (
                                        <span className="px-3 py-1 rounded-full bg-gradient-to-b from-copper-400 via-copper-600 to-copper-700 text-[10px] font-bold text-white uppercase tracking-wider shadow-[0_2px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] border border-copper-400/50">{selectedCard.badge}</span>
                                    )}
                                </div>
                            </div>
                            <div className="w-full md:w-7/12 p-8 lg:p-10 flex flex-col bg-espresso-950/95 relative backdrop-blur-sm">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/5 blur-[80px] rounded-full pointer-events-none"></div>
                                <button
                                    onClick={closeQuickView}
                                    className="absolute top-5 right-5 z-20 size-8 rounded-full bg-transparent border border-copper-500/30 text-copper-400 hover:bg-copper-500 hover:text-espresso-950 flex items-center justify-center transition-all hover:rotate-90 hover:border-copper-500 active:scale-90 group"
                                >
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                                <div className="mb-8 relative z-10">
                                    <div className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-2 font-display">{selectedCard.bank}</div>
                                    <h2 className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 font-bold mb-3 tracking-wide leading-tight drop-shadow-sm pb-1">{selectedCard.name}</h2>
                                    <p className="text-white font-sans text-sm leading-relaxed max-w-lg opacity-90 font-light">
                                        {selectedCard.tier === 'ultra-premium' ? 'Experience the pinnacle of premium banking with exclusive privileges and luxury benefits.' :
                                            selectedCard.tier === 'premium' ? 'A premium credit card with excellent rewards and travel benefits.' :
                                                selectedCard.isCobranded && selectedCard.cobrandPartner ? `Partner card with ${selectedCard.cobrandPartner} offering special rewards and benefits.` :
                                                    'A versatile credit card designed for everyday spending and rewards.'}
                                    </p>
                                </div>
                                {/* Dynamic Benefits Grid */}
                                <div className="grid grid-cols-2 gap-y-6 gap-x-6 mb-8 relative z-10">
                                    {(() => {
                                        const benefits = getQuickViewBenefits(selectedCard);
                                        if (benefits.length === 0) {
                                            // Show tags as fallback
                                            return selectedCard.tags.map((tag, tagIdx) => (
                                                <div key={tagIdx} className="flex items-start gap-4 group">
                                                    <span className="material-symbols-outlined text-[24px] text-copper-400 group-hover:text-gold-400 transition-colors mt-0.5">
                                                        {tag.icon || 'star'}
                                                    </span>
                                                    <div>
                                                        <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-1 font-display">Feature</h4>
                                                        <p className="text-white/70 text-sm font-sans">{tag.text}</p>
                                                    </div>
                                                </div>
                                            ));
                                        }
                                        return benefits.map((benefit, bIdx) => (
                                            <div key={bIdx} className="flex items-start gap-4 group">
                                                <span className="material-symbols-outlined text-[24px] text-copper-400 group-hover:text-gold-400 transition-colors mt-0.5">
                                                    {benefit.icon}
                                                </span>
                                                <div>
                                                    <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-1 font-display">{benefit.label}</h4>
                                                    <p className="text-white/70 text-sm font-sans">{benefit.text}</p>
                                                </div>
                                            </div>
                                        ));
                                    })()}
                                </div>
                                {/* Stats Bar */}
                                <div className="border-t border-b border-copper-500/20 py-5 mb-8 flex items-center justify-between relative z-10">
                                    <div>
                                        <p className="text-[10px] text-white/50 font-sans font-bold uppercase tracking-widest mb-1.5">Annual Fee</p>
                                        <p className="text-2xl text-gold-400 font-serif font-bold">{selectedCard.statsDetail?.fee || 'N/A'} <span className="text-xs text-white/40 font-sans font-normal align-middle ml-1">+ GST</span></p>
                                        {selectedCard.statsDetail?.feeSub && (
                                            <p className="text-[10px] text-copper-400 mt-1">{selectedCard.statsDetail.feeSub}</p>
                                        )}
                                    </div>
                                    <div className="h-10 w-px bg-copper-500/20 mx-4"></div>
                                    <div>
                                        <p className="text-[10px] text-white/50 font-sans font-bold uppercase tracking-widest mb-1.5">Eligibility</p>
                                        <p className="text-base text-gold-400 font-serif font-bold">{getEligibilityText(selectedCard) || 'Check Bank'}</p>
                                    </div>
                                    <div className="h-10 w-px bg-copper-500/20 mx-4"></div>
                                    <div>
                                        <p className="text-[10px] text-white/50 font-sans font-bold uppercase tracking-widest mb-1.5">Reward Rate</p>
                                        <p className="text-2xl text-gold-400 font-serif font-bold">{selectedCard.statsDetail?.rewardRate || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="mt-auto flex gap-4 relative z-10">
                                    <button className="flex-1 py-3.5 rounded bg-copper-600 border border-copper-400 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-400 hover:border-gold-300 hover:text-espresso-950 transition-all duration-300 btn-press shadow-glow-copper hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] relative overflow-hidden group">
                                        <span className="relative z-10 flex items-center justify-center gap-2">Apply Now <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span></span>
                                    </button>
                                    <button
                                        className={`px-6 py-3.5 rounded border transition-all flex items-center justify-center gap-2 btn-press ${compareCards.has(selectedCard.id) ? 'border-copper-500 bg-copper-500/20 text-copper-400' : 'border-copper-500/30 text-white hover:text-copper-300 hover:border-copper-500 hover:bg-copper-500/10'}`}
                                        title="Compare"
                                        onClick={(e) => toggleCompare(e, selectedCard.id)}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
                                        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wide">Compare</span>
                                    </button>
                                    <Link to={`/cards/${selectedCard.id}`} className="px-5 py-3.5 rounded border border-transparent text-copper-500/80 hover:text-copper-400 hover:bg-copper-500/10 transition-all flex items-center justify-center btn-press group" title="View Full Details">
                                        <span className="material-symbols-outlined text-[24px] group-hover:scale-125 transition-transform duration-300 group-hover:drop-shadow-[0_0_8px_rgba(205,127,50,0.8)]">visibility</span>
                                    </Link>
                                    <button
                                        className={`px-5 py-3.5 rounded border border-transparent transition-all flex items-center justify-center btn-press group ${isFavorite('cards', selectedCard.id) ? 'text-red-500' : 'text-copper-500/80 hover:text-copper-400 hover:bg-copper-500/10'}`}
                                        title="Add to Favourites"
                                        onClick={(e) => handleToggleFavorite(e, selectedCard.id)}
                                    >
                                        <span
                                            className="material-symbols-outlined text-[24px] group-hover:scale-125 transition-transform duration-300 group-hover:drop-shadow-[0_0_8px_rgba(205,127,50,0.8)]"
                                            style={isFavorite('cards', selectedCard.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                                        >
                                            favorite
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Floating Compare Bar */}
            {
                compareCards.size > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-pop-scale">
                        <div className="bg-espresso-900 border-2 border-copper-500 rounded-full px-6 py-3 flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(205,127,50,0.3)]">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-copper-500/20 border border-copper-500/50 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-copper-400 text-[20px]">compare_arrows</span>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-bold">{compareCards.size} {compareCards.size === 1 ? 'Card' : 'Cards'} Selected</p>
                                    <p className="text-white/50 text-[10px] uppercase tracking-wider">Select up to 3 cards to compare</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-copper-500/30"></div>
                            <Link
                                to={`/compare?cards=${Array.from(compareCards).join(',')}`}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all btn-press flex items-center gap-2 ${compareCards.size >= 2
                                    ? 'bg-copper-500 text-espresso-950 hover:bg-gold-400 shadow-glow-copper'
                                    : 'bg-espresso-800 text-white/50 cursor-not-allowed'
                                    }`}
                                onClick={(e) => compareCards.size < 2 && e.preventDefault()}
                            >
                                Compare Now
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                            <button
                                onClick={() => setCompareCards(new Set())}
                                className="size-8 rounded-full bg-transparent border border-white/10 text-white/40 hover:text-white hover:border-white/30 flex items-center justify-center transition-all"
                                title="Clear selection"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                    </div>
                )
            }
            {/* Floating Favorites Bar */}
            {
                notification.show && notification.type === 'cards' && (
                    <div className={`fixed left-1/2 -translate-x-1/2 z-[60] animate-pop-scale ${compareCards.size > 0 ? 'bottom-24' : 'bottom-6'}`}>
                        <div className="bg-espresso-900 border-2 border-red-500/50 rounded-full px-6 py-3 flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(239,68,68,0.2)]">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-red-500 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-bold">{getFavoriteCount('cards')} {getFavoriteCount('cards') === 1 ? 'Card' : 'Cards'} Saved</p>
                                    <p className="text-white/50 text-[10px] uppercase tracking-wider">View your favorites</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-red-500/30"></div>
                            <Link
                                to="/favorites"
                                className="px-5 py-2.5 rounded-full bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-all hover:bg-red-400 shadow-lg flex items-center gap-2"
                            >
                                View Favorites
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                            <button
                                onClick={() => clearFavorites('cards')}
                                className="size-8 rounded-full bg-transparent border border-white/10 text-white/40 hover:text-white hover:border-white/30 flex items-center justify-center transition-all"
                                title="Clear favorites"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
