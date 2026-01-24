import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import {
    SlidersHorizontal,
    Search,
    Landmark,
    Gem,
    Lightbulb,
    ShieldCheck,
    ArrowRightLeft,
    Heart,
    Users,
    ArrowRight,
    Check,
    X,
} from 'lucide-react';
import SEO from '../components/SEO';

import { bankingData } from '../data/banking';

const bankColors = {
    'hdfc-bank': '#004c8f',
    'icici-bank': '#f37e20',
    'axis-bank': '#97144d',
    'sbi': '#280071',
    'kotak': '#ed1c24',
    'amex': '#006fcf',
    'idfc': '#9d1d27',
    'au-bank': '#5e2e85',
    'yes-bank': '#005b9b',
    'indusind': '#8d0b1a'
};

// Transform banking data for display
const getAllTiers = () => {
    let allTiers = [];
    bankingData.forEach(bank => {
        if (bank.tiers) {
            bank.tiers.forEach(tier => {
                // Determine tier category for filtering
                let category = 'premium';
                const nameLower = tier.name.toLowerCase();
                const typeLower = (tier.type || '').toLowerCase();

                if (nameLower.includes('wealth') || nameLower.includes('private') || nameLower.includes('imperia') || nameLower.includes('burgundy')) {
                    category = 'wealth';
                } else if (nameLower.includes('salary')) {
                    category = 'salary';
                }

                // Format eligibility
                const eligibility = [];
                if (tier.eligibility) {
                    if (tier.eligibility.amb) eligibility.push({ label: 'Monthly Avg Balance', value: `₹${(tier.eligibility.amb / 100000).toFixed(1)} Lakhs` });
                    if (tier.eligibility.nrv) eligibility.push({ label: 'Total Relationship', value: `₹${(tier.eligibility.nrv / 100000).toFixed(1)} Lakhs` });
                    if (tier.eligibility.salary) eligibility.push({ label: 'Net Salary', value: `₹${(tier.eligibility.salary / 100000).toFixed(1)} Lakhs/mo` });
                    // Add generic description if no specific structured data
                    if (eligibility.length === 0 && tier.eligibility.description) {
                        eligibility.push({ label: 'Criteria', value: 'See details' });
                    }
                }

                // Format benefits - take first 2 features or specific benefits
                const benefits = [];
                if (tier.benefits?.features?.length > 0) {
                    benefits.push({ title: 'Key Feature', desc: tier.benefits.features[0] });
                    if (tier.benefits.features.length > 1) {
                        benefits.push({ title: 'Benefit', desc: tier.benefits.features[1] });
                    }
                } else {
                    if (tier.benefits?.lounge?.domestic) benefits.push({ title: 'Lounge', desc: `Domestic: ${tier.benefits.lounge.domestic}` });
                    if (tier.benefits?.forex?.text) benefits.push({ title: 'Forex', desc: tier.benefits.forex.text });
                }

                allTiers.push({
                    id: tier.id,
                    bank: bank.name.replace(' Bank', ''),
                    bankId: bank.id,
                    bankColor: bankColors[bank.id] || '#333',
                    tierType: category === 'wealth' ? 'Wealth / Private' : 'Premium Banking',
                    tierName: tier.name,
                    tagline: tier.metadata?.bestFor || 'Exclusive banking privileges.',
                    tier: category,
                    eligibility: eligibility.slice(0, 3),
                    benefits: benefits.slice(0, 2),
                    cta: 'View Details',
                    raw: tier // Keep raw data for details if needed later
                });
            });
        }
    });
    return allTiers;
};

const bankingTiers = getAllTiers();

const banks = [
    { id: 'all', name: 'All Banks', count: bankingTiers.length },
    ...bankingData.map(b => ({
        id: b.id,
        name: b.name,
        count: bankingTiers.filter(t => t.bankId === b.id).length
    })).filter(b => b.count > 0)
];

const tiers = [
    { id: 'wealth', name: 'Wealth / Private', count: bankingTiers.filter(t => t.tier === 'wealth').length },
    { id: 'premium', name: 'Premium', count: bankingTiers.filter(t => t.tier === 'premium').length },
    { id: 'salary', name: 'Salary', count: bankingTiers.filter(t => t.tier === 'salary').length },
];

export default function Banking() {
    const [selectedBanks, setSelectedBanks] = useState(['all']);
    const [selectedTier, setSelectedTier] = useState(null);
    const [compareList, setCompareList] = useState([]);
    const { favorites, toggleFavorite, isFavorite } = useFavorites(); // Use global context

    const toggleCompare = (id) => {
        setCompareList(prev => {
            if (prev.includes(id)) return prev.filter(item => item !== id);
            if (prev.length >= 3) return prev;
            return [...prev, id];
        });
    };

    // Filtering logic
    const filteredTiers = bankingTiers.filter(tier => {
        const bankMatch = selectedBanks.includes('all') ||
            selectedBanks.includes(tier.bank.toLowerCase()) ||
            selectedBanks.includes(tier.id.split('-')[0]); // Fallback check

        const tierMatch = !selectedTier || tier.tier === selectedTier;

        return bankMatch && tierMatch;
    });

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Banking Tiers & Wealth Management"
                description="Compare wealth and family banking eligibility across India's premier banks. Find HDFC Imperia, ICICI Wealth, and Axis Burgundy requirements."
                keywords="banking tiers, wealth management, hdfc imperia, icici wealth, axis burgundy, priority banking"
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="animate-fade-in-up">
                            <div className="flex items-center gap-2 mb-3">
                                <ShieldCheck size={20} className="text-[var(--accent)]" />
                                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Private Banking Selection</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide mb-2" style={{ color: 'var(--text-primary)' }}>
                                Banking Tiers Decoded
                            </h1>
                            <p className="text-sm max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                                Compare wealth and family banking eligibility across India's premier banks. Find the tier that matches your lifestyle and financial stature.
                            </p>
                        </div>

                        {/* Top Filters */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Bank Filter */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:border-[var(--accent)]"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                                    <Landmark size={16} />
                                    <span>{selectedBanks.includes('all') ? 'All Banks' : `${selectedBanks.length} Selected`}</span>
                                    <ArrowRight size={14} className="rotate-90" />
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                    {banks.map((bank) => (
                                        <button
                                            key={bank.id}
                                            onClick={() => {
                                                if (bank.id === 'all') setSelectedBanks(['all']);
                                                else setSelectedBanks(prev => {
                                                    const newSelection = prev.includes(bank.id)
                                                        ? prev.filter(b => b !== bank.id)
                                                        : [...prev.filter(b => b !== 'all'), bank.id];
                                                    return newSelection.length === 0 ? ['all'] : newSelection;
                                                });
                                            }}
                                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-[var(--bg)] transition-colors"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            <span>{bank.name}</span>
                                            {selectedBanks.includes(bank.id) && <Check size={14} className="text-[var(--accent)]" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tier Filter */}
                            <div className="bg-[var(--surface)] border rounded-lg p-1 flex items-center" style={{ borderColor: 'var(--border)' }}>
                                <button
                                    onClick={() => setSelectedTier(null)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${!selectedTier ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                                >
                                    All
                                </button>
                                {tiers.map(tier => (
                                    <button
                                        key={tier.id}
                                        onClick={() => setSelectedTier(tier.id)}
                                        className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${selectedTier === tier.id ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                                    >
                                        {tier.name.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compare Bar */}
                {compareList.length > 0 && (
                    <div className="max-w-7xl mx-auto mb-6 p-4 rounded-xl flex items-center justify-between animate-fade-in border"
                        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
                        <div className="flex items-center gap-3">
                            <ArrowRightLeft size={20} className="text-[var(--accent)]" />
                            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                {compareList.length} tier{compareList.length > 1 ? 's' : ''} selected for comparison
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCompareList([])}
                                className="text-xs hover:text-[var(--text-primary)] transition-colors"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Clear
                            </button>
                            <Link
                                to={compareList.length >= 2 ? `/banking/compare/${compareList[0]}/${compareList[1]}` : '#'}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${compareList.length < 2 ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`}
                                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                                onClick={(e) => {
                                    if (compareList.length < 2) {
                                        e.preventDefault();
                                        alert('Please select at least 2 banks to compare');
                                    }
                                }}
                            >
                                Compare Now
                            </Link>
                        </div>
                    </div>
                )}

                {/* Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                    {filteredTiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`rounded-xl overflow-hidden flex flex-col transition-all duration-300 group hover:-translate-y-1 ${compareList.includes(tier.id) ? 'ring-2 ring-[var(--accent)]' : 'border border-[var(--border)]'
                                }`}
                            style={{ backgroundColor: 'var(--surface)' }}
                        >
                            {/* Card Header */}
                            <div className="p-5 border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-alt)' }}>
                                <div className="flex justify-between items-start mb-3">
                                    <div
                                        className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-[9px] tracking-tighter"
                                        style={{ backgroundColor: tier.bankColor }}
                                    >
                                        {tier.bank}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleCompare(tier.id)}
                                            className={`transition-colors p-1 rounded hover:bg-black/5 ${compareList.includes(tier.id)
                                                ? 'text-[var(--accent)]'
                                                : 'text-[var(--text-muted)] hover:text-[var(--accent)]'
                                                }`}
                                            title={compareList.includes(tier.id) ? 'Remove from compare' : 'Add to compare'}
                                        >
                                            <ArrowRightLeft size={18} />
                                        </button>
                                        <button
                                            onClick={() => toggleFavorite('banking', tier.id)}
                                            className={`transition-colors p-1 rounded hover:bg-black/5 ${isFavorite('banking', tier.id)
                                                ? 'text-red-500'
                                                : 'text-[var(--text-muted)] hover:text-red-400'
                                                }`}
                                        >
                                            <Heart size={18} fill={isFavorite('banking', tier.id) ? 'currentColor' : 'none'} />
                                        </button>
                                    </div>
                                </div>
                                <span className="block text-[10px] font-semibold uppercase tracking-widest mb-1 text-[var(--accent)]">
                                    {tier.tierType}
                                </span>
                                <h3 className="text-lg font-serif font-bold group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                                    {tier.tierName}
                                </h3>
                                <p className="text-xs italic mt-1" style={{ color: 'var(--text-muted)' }}>{tier.tagline}</p>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-1 space-y-5">
                                {/* Eligibility */}
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-secondary)' }}>
                                        Eligibility
                                    </h4>
                                    <div className="space-y-2">
                                        {tier.eligibility.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center py-1.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                                                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                                                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-secondary)' }}>
                                        Benefits
                                    </h4>
                                    <ul className="space-y-2">
                                        {tier.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0"></span>
                                                <span>
                                                    <strong style={{ color: 'var(--accent)' }}>{benefit.title}:</strong> {benefit.desc}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="p-5 pt-0">
                                <Link
                                    to={`/banking/${tier.id}`}
                                    className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn hover:scale-[1.02]"
                                    style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                                >
                                    {tier.cta}
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Family Banking Callout */}
                <div className="max-w-7xl mx-auto border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
                    style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full flex items-center justify-center border"
                            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
                            <Users size={24} className="text-[var(--accent)]" />
                        </div>
                        <div>
                            <h4 className="text-lg font-serif font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Family Banking Advantage</h4>
                            <p className="text-xs max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                                Did you know? HDFC Imperia allows grouping up to 4 family members to maintain the TRV requirement collectively, making it easier to upgrade everyone's status instantly.
                            </p>
                        </div>
                    </div>
                    <button className="px-5 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest hover:bg-[var(--accent)] hover:text-white transition-all whitespace-nowrap"
                        style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                        Read Grouping Guide
                    </button>
                </div>



            </main >
        </div >
    );
}
