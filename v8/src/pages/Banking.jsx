import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const Banking = () => {
    const [selectedBanks, setSelectedBanks] = useState(['all']);
    const [selectedTier, setSelectedTier] = useState('wealth');
    const { isFavorite, toggleFavorite: toggleFavoriteContext, getFavoriteCount, clearFavorites } = useFavorites();
    const [compareList, setCompareList] = useState([]);

    const bankingTiers = [
        {
            id: 'hdfc-imperia',
            bank: 'HDFC',
            bankColor: '#004c8f',
            tierType: 'Private Wealth',
            tierName: 'Imperia Banking',
            tagline: 'Top-tier wealth management for HNWIs.',
            tier: 'wealth',
            eligibility: [
                { label: 'Monthly Avg Balance', value: '₹ 10 Lakhs' },
                { label: 'Total Relationship Value', value: '₹ 30 Lakhs' },
                { label: 'Net Salary Credit', value: '₹ 3 Lakhs/mo' },
            ],
            benefits: [
                { title: 'Infinia Eligibility', desc: 'Fast-track access.' },
                { title: 'Locker', desc: 'Flat 50% waiver on rentals.' },
            ],
            cta: 'Check Eligibility',
        },
        {
            id: 'icici-wealth',
            bank: 'ICICI',
            bankColor: '#f37e20',
            tierType: 'Wealth Mgmt',
            tierName: 'Wealth Management',
            tagline: 'Holistic family banking solutions.',
            tier: 'wealth',
            eligibility: [
                { label: 'Monthly Avg Balance', value: '₹ 10 Lakhs' },
                { label: 'Total Relationship Value', value: '₹ 50 Lakhs' },
                { label: 'Home Loan Value', value: '> ₹ 2 Crores' },
            ],
            benefits: [
                { title: 'Family Banking', desc: 'Benefits for 4 members.' },
                { title: 'Golf Access', desc: 'Complimentary lessons.' },
            ],
            cta: 'View Details',
        },
        {
            id: 'axis-burgundy',
            bank: 'AXIS',
            bankColor: '#97144d',
            tierType: 'Burgundy',
            tierName: 'Burgundy',
            tagline: 'Curated banking for the affluent.',
            tier: 'wealth',
            eligibility: [
                { label: 'Monthly Avg Balance', value: '₹ 10 Lakhs' },
                { label: 'Total Relationship Value', value: '₹ 30 Lakhs' },
                { label: 'Net Salary Credit', value: '₹ 3 Lakhs/mo' },
            ],
            benefits: [
                { title: 'Debit Card', desc: 'Zero convenience fees.' },
                { title: 'Dining', desc: 'BookMyShow tickets.' },
            ],
            cta: 'View Details',
        },
    ];

    const banks = [
        { id: 'all', name: 'All Banks', count: 24 },
        { id: 'hdfc', name: 'HDFC Bank', count: 8 },
        { id: 'icici', name: 'ICICI Bank', count: 6 },
        { id: 'axis', name: 'Axis Bank', count: 5 },
    ];

    const tiers = [
        { id: 'wealth', name: 'Wealth / Private', count: 4 },
        { id: 'premium', name: 'Premium', count: 12 },
        { id: 'salary', name: 'Salary', count: 8 },
    ];

    const toggleFavorite = (tierId) => {
        toggleFavoriteContext('banking', tierId);
    };

    const toggleCompare = (tierId) => {
        setCompareList(prev => {
            if (prev.includes(tierId)) {
                return prev.filter(id => id !== tierId);
            }
            if (prev.length >= 3) {
                // Max 3 items for comparison
                return prev;
            }
            return [...prev, tierId];
        });
    };

    return (
        <div className="flex flex-1 overflow-hidden relative font-display text-gold-100 bg-espresso-950">

            {/* Sidebar */}
            <aside className="w-72 flex-shrink-0 flex flex-col bg-espresso-900 border-r border-espresso-700 overflow-y-auto z-20 hidden lg:flex scrollbar-thin scrollbar-thumb-espresso-700">
                <div className="p-6 flex flex-col gap-6 flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-copper-500 text-lg">tune</span>
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest">Filters</h3>
                        </div>
                        <button className="text-copper-400 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors">
                            Reset
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">search</span>
                        <input
                            className="w-full bg-espresso-800 border border-espresso-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-copper-500 transition-all"
                            placeholder="Find a bank..."
                            type="text"
                        />
                    </div>

                    {/* Institutions */}
                    <div className="border-t border-espresso-700 pt-5">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-copper-500 text-lg">account_balance</span>
                            <h4 className="text-white text-xs font-bold uppercase tracking-widest">Institutions</h4>
                        </div>
                        <div className="flex flex-col gap-2">
                            {banks.map((bank) => (
                                <label key={bank.id} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-espresso-800 cursor-pointer group transition-all">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedBanks.includes(bank.id)}
                                            onChange={() => {
                                                if (bank.id === 'all') {
                                                    setSelectedBanks(['all']);
                                                } else {
                                                    setSelectedBanks(prev =>
                                                        prev.includes(bank.id)
                                                            ? prev.filter(b => b !== bank.id)
                                                            : [...prev.filter(b => b !== 'all'), bank.id]
                                                    );
                                                }
                                            }}
                                            className="hidden peer"
                                        />
                                        <div className="w-4 h-4 rounded border border-copper-500/50 bg-espresso-950 flex items-center justify-center transition-all peer-checked:bg-copper-500 peer-checked:border-copper-500">
                                            <svg className="w-2.5 h-2.5 text-espresso-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{bank.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{bank.count}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Tier Level */}
                    <div className="border-t border-espresso-700 pt-5">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-copper-500 text-lg">diamond</span>
                            <h4 className="text-white text-xs font-bold uppercase tracking-widest">Tier Level</h4>
                        </div>
                        <div className="flex flex-col gap-1">
                            {tiers.map((tier) => (
                                <button
                                    key={tier.id}
                                    onClick={() => setSelectedTier(tier.id)}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-left ${selectedTier === tier.id
                                        ? 'bg-copper-500/10 border-l-2 border-copper-500 text-gold-400'
                                        : 'hover:bg-espresso-800 text-gray-400 hover:text-white border-l-2 border-transparent'
                                        }`}
                                >
                                    <span className="text-sm font-medium">{tier.name}</span>
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${selectedTier === tier.id ? 'bg-copper-500 text-espresso-950' : 'text-gray-500'
                                        }`}>
                                        {tier.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="mt-auto border border-espresso-700 bg-espresso-800/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-gold-400 text-lg">lightbulb</span>
                            <span className="text-xs font-bold text-copper-400 uppercase tracking-widest">Pro Tip</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Grouping family accounts can fast-track your upgrade to <span className="text-gold-400 font-semibold">Imperia</span> status instantly.
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-gold-400 text-lg">verified_user</span>
                        <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">Private Banking Selection</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide mb-2">
                        Banking Tiers Decoded
                    </h1>
                    <p className="text-sm text-gray-400 max-w-2xl">
                        Compare wealth and family banking eligibility across India's premier banks. Find the tier that matches your lifestyle and financial stature.
                    </p>
                </div>

                {/* Compare Bar */}
                {compareList.length > 0 && (
                    <div className="mb-6 p-4 bg-espresso-900 border border-copper-500/30 rounded-xl flex items-center justify-between animate-fade-in">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-copper-500">compare_arrows</span>
                            <span className="text-sm text-white font-medium">
                                {compareList.length} tier{compareList.length > 1 ? 's' : ''} selected for comparison
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCompareList([])}
                                className="text-xs text-gray-400 hover:text-white transition-colors"
                            >
                                Clear
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-copper-500 text-espresso-950 text-xs font-bold uppercase tracking-wider hover:bg-copper-400 transition-colors">
                                Compare Now
                            </button>
                        </div>
                    </div>
                )}

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                    {bankingTiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`bg-espresso-900 border rounded-xl overflow-hidden flex flex-col hover:border-gold-400/50 hover:shadow-glow-copper transition-all duration-300 group ${compareList.includes(tier.id) ? 'border-copper-500 ring-2 ring-copper-500/30' : 'border-espresso-700'
                                }`}
                        >
                            {/* Card Header */}
                            <div className="p-5 border-b border-espresso-700 bg-espresso-900/50">
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
                                            className={`transition-colors ${compareList.includes(tier.id)
                                                ? 'text-copper-400'
                                                : 'text-gray-500 hover:text-gold-400'
                                                }`}
                                            title={compareList.includes(tier.id) ? 'Remove from compare' : 'Add to compare'}
                                        >
                                            <span className="material-symbols-outlined text-lg">compare_arrows</span>
                                        </button>
                                        <button
                                            onClick={() => toggleFavorite(tier.id)}
                                            className={`transition-colors ${isFavorite('banking', tier.id)
                                                ? 'text-red-500'
                                                : 'text-gray-500 hover:text-red-400'
                                                }`}
                                            title={isFavorite('banking', tier.id) ? 'Remove from favorites' : 'Add to favorites'}
                                        >
                                            <span
                                                className="material-symbols-outlined text-lg"
                                                style={isFavorite('banking', tier.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                                            >
                                                favorite
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <span className="block text-[10px] font-semibold text-copper-500 uppercase tracking-widest mb-1">
                                    {tier.tierType}
                                </span>
                                <h3 className="text-lg font-serif font-bold text-white group-hover:text-gold-400 transition-colors">
                                    {tier.tierName}
                                </h3>
                                <p className="text-xs text-gray-500 italic mt-1">{tier.tagline}</p>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-1">
                                {/* Eligibility */}
                                <div className="mb-5">
                                    <h4 className="text-[10px] font-bold text-copper-400 uppercase tracking-widest mb-3">
                                        Eligibility
                                    </h4>
                                    <div className="space-y-2">
                                        {tier.eligibility.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center py-1.5 border-b border-espresso-700 last:border-0">
                                                <span className="text-xs text-gray-400">{item.label}</span>
                                                <span className="text-xs font-semibold text-white">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div>
                                    <h4 className="text-[10px] font-bold text-copper-400 uppercase tracking-widest mb-3">
                                        Benefits
                                    </h4>
                                    <ul className="space-y-2">
                                        {tier.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                                                <span className="h-px w-2 bg-copper-500 mt-2 shrink-0"></span>
                                                <span>
                                                    <strong className="text-gold-400">{benefit.title}:</strong> {benefit.desc}
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
                                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-copper-600 to-copper-500 text-white text-xs font-bold uppercase tracking-widest hover:from-copper-500 hover:to-copper-400 transition-all shadow-md flex items-center justify-center gap-2 group/btn"
                                >
                                    {tier.cta}
                                    <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Family Banking Callout */}
                <div className="bg-espresso-900 border border-espresso-700 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-espresso-800 flex items-center justify-center border border-copper-500/30">
                            <span className="material-symbols-outlined text-gold-400 text-2xl">family_restroom</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-serif font-bold text-white mb-1">Family Banking Advantage</h4>
                            <p className="text-xs text-gray-400 max-w-xl">
                                Did you know? HDFC Imperia allows grouping up to 4 family members to maintain the TRV requirement collectively, making it easier to upgrade everyone's status instantly.
                            </p>
                        </div>
                    </div>
                    <button className="px-5 py-2 rounded-lg border border-copper-500 text-copper-400 text-xs font-bold uppercase tracking-widest hover:bg-copper-500 hover:text-white transition-all whitespace-nowrap">
                        Read Grouping Guide
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Banking;
