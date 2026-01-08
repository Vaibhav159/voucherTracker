import { useState } from 'react';

const banks = ['All Banks', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'];
const tierTypes = [
    { id: 'wealth', label: 'Wealth / Private', count: 4, active: true },
    { id: 'premium', label: 'Premium / Salary', count: 12 },
    { id: 'family', label: 'Family Banking', count: 8 },
];

const bankingTiers = [
    {
        id: 1,
        bank: 'HDFC',
        bankColor: '#004c8f',
        tierName: 'Imperia Banking',
        tierLabel: 'Private Wealth',
        tierLabelColor: 'bg-copper/10 text-copper border-copper/20',
        description: 'Top-tier wealth management for HNWIs.',
        accentColor: 'copper',
        showCheckEligibility: true,
        criteria: [
            { metric: 'Monthly Avg Balance', value: '₹ 10 Lakhs' },
            { metric: 'Total Relationship Value', value: '₹ 30 Lakhs' },
            { metric: 'Net Salary Credit', value: '₹ 3 Lakhs/mo' },
        ],
        benefits: [
            { title: 'Infinia Card Eligibility:', desc: "Fast-track access to India's most rewarding card." },
            { title: 'Locker Discount:', desc: 'Flat 50% waiver on annual locker rental.' },
            { title: 'Zero Forex:', desc: 'On select global debit cards.' },
        ],
        services: ['Dedicated RM', 'Family Grouping', 'Tax Advisory'],
    },
    {
        id: 2,
        bank: 'ICICI',
        bankColor: '#f37e20',
        tierName: 'Wealth Management',
        tierLabel: 'Wealth Mgmt',
        tierLabelColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        description: 'Holistic family banking solutions.',
        accentColor: 'orange-400',
        criteria: [
            { metric: 'Monthly Avg Balance', value: '₹ 10 Lakhs' },
            { metric: 'Total Relationship Value', value: '₹ 50 Lakhs' },
            { metric: 'Home Loan Value', value: '> ₹ 2 Crores' },
        ],
        benefits: [
            { title: 'Family Banking:', desc: 'Extend benefits to 4 family members.' },
            { title: 'Complimentary Golf:', desc: 'Access to premier golf courses.' },
            { title: 'Investment Desk:', desc: 'Priority access to PMS & AIF.' },
        ],
        services: ['Wealth Coach', 'Estate Planning', 'Concierge'],
    },
    {
        id: 3,
        bank: 'AXIS',
        bankColor: '#97144d',
        tierName: 'Burgundy',
        tierLabel: 'Burgundy',
        tierLabelColor: 'bg-rose-900/30 text-rose-300 border-rose-500/20',
        description: 'Curated banking for the affluent.',
        accentColor: 'rose-400',
        criteria: [
            { metric: 'Monthly Avg Balance', value: '₹ 10 Lakhs' },
            { metric: 'Total Relationship Value', value: '₹ 30 Lakhs' },
            { metric: 'Net Salary Credit', value: '₹ 3 Lakhs/mo' },
        ],
        benefits: [
            { title: 'Burgundy Debit Card:', desc: 'High limits & zero convenience fee.' },
            { title: 'Movies & Dining:', desc: 'Complimentary BookMyShow tickets.' },
            { title: 'Locker Discount:', desc: 'Up to 60% discount on first year.' },
        ],
        services: ['Relationship Mgr', 'Forex Rates', 'Priority Banking'],
    },
];

export default function Banking() {
    const [selectedBanks, setSelectedBanks] = useState(['All Banks', 'HDFC Bank', 'ICICI Bank', 'Axis Bank']);
    const [selectedTier, setSelectedTier] = useState('wealth');

    const toggleBank = (bank) => {
        setSelectedBanks(prev =>
            prev.includes(bank) ? prev.filter(b => b !== bank) : [...prev, bank]
        );
    };

    return (
        <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar */}
            <aside className="hidden md:flex w-60 flex-col border-r border-white/5 bg-[#0f0907] pt-8 pb-6 z-20">
                <div className="px-6 mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-copper text-[18px]">filter_list</span>
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest">Filters</h3>
                    </div>
                    <p className="text-[10px] text-gold-dim/40">Refine your comparison view</p>
                </div>

                <nav className="flex flex-col px-3 space-y-6 overflow-y-auto hide-scrollbar">
                    {/* Filter by Bank */}
                    <div>
                        <h4 className="px-4 mb-2 text-[10px] font-bold text-gold-dim/50 uppercase tracking-[0.15em]">Filter by Bank</h4>
                        <div className="space-y-0.5">
                            {banks.map((bank) => (
                                <label key={bank} className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/5 cursor-pointer group transition-colors">
                                    <input
                                        checked={selectedBanks.includes(bank)}
                                        onChange={() => toggleBank(bank)}
                                        className="rounded border-white/10 bg-white/5 text-copper focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                                        type="checkbox"
                                    />
                                    <span className="text-sm font-medium text-gold-dim group-hover:text-white transition-colors">{bank}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/5 mx-4"></div>

                    {/* Filter by Tier Type */}
                    <div>
                        <h4 className="px-4 mb-2 text-[10px] font-bold text-gold-dim/50 uppercase tracking-[0.15em]">Filter by Tier Type</h4>
                        <div className="space-y-0.5">
                            {tierTypes.map((tier) => (
                                <button
                                    key={tier.id}
                                    onClick={() => setSelectedTier(tier.id)}
                                    className={`w-full flex items-center justify-between rounded-lg px-4 py-2 border-l-2 cursor-pointer group transition-colors ${selectedTier === tier.id
                                            ? 'bg-gradient-to-r from-copper/10 to-transparent border-copper'
                                            : 'hover:bg-white/5 border-transparent'
                                        }`}
                                >
                                    <span className={`text-sm font-medium ${selectedTier === tier.id ? 'text-white' : 'text-gold-dim group-hover:text-white'}`}>
                                        {tier.label}
                                    </span>
                                    <span className={`text-[10px] font-bold ${selectedTier === tier.id ? 'text-copper' : 'text-gold-dim/30 group-hover:text-gold-dim'}`}>
                                        {tier.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/5 mx-4"></div>

                    {/* Tools */}
                    <div>
                        <h4 className="px-4 mb-2 text-[10px] font-bold text-gold-dim/50 uppercase tracking-[0.15em]">Tools</h4>
                        <div className="space-y-0.5">
                            <a className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/5 text-gold-dim hover:text-white transition-colors" href="#">
                                <span className="material-symbols-outlined text-gold-dim/60 text-[18px]">calculate</span>
                                <span className="text-xs font-medium">Eligibility Calc</span>
                            </a>
                            <a className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/5 text-gold-dim hover:text-white transition-colors" href="#">
                                <span className="material-symbols-outlined text-gold-dim/60 text-[18px]">compare_arrows</span>
                                <span className="text-xs font-medium">Compare Features</span>
                            </a>
                        </div>
                    </div>
                </nav>

                {/* Pro Tip */}
                <div className="mt-auto px-4">
                    <div className="rounded-xl border border-white/5 bg-[#160f0c] p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-copper/10 text-copper">
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>lightbulb</span>
                            </div>
                            <span className="text-xs font-bold text-white">Pro Tip</span>
                        </div>
                        <p className="text-[10px] text-gold-dim/70 leading-relaxed">
                            Grouping family accounts can fast-track your upgrade to Imperia status.
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#0c0706] relative hide-scrollbar">
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#1a100c] to-[#0c0706] pointer-events-none"></div>
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-copper/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto max-w-[1600px] px-8 py-10 relative z-10">
                    {/* Header */}
                    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-copper" style={{ fontSize: '18px' }}>stars</span>
                                <span className="text-xs font-semibold text-gold-dim/80 uppercase tracking-widest">Premium Selection</span>
                            </div>
                            <h2 className="text-4xl font-display font-medium text-white tracking-tight mb-2">
                                Banking Tiers <span className="text-gradient-gold font-bold">Decoded</span>
                            </h2>
                            <p className="text-sm text-gold-dim/60 font-light max-w-2xl">
                                Compare wealth and family banking eligibility across HDFC, ICICI, and more. Find the tier that matches your lifestyle and financial stature.
                            </p>
                            <div className="mt-3 flex items-center gap-2 text-[10px] font-medium text-gold-dim/40 uppercase tracking-widest">
                                <span className="material-symbols-outlined text-[14px]">update</span>
                                Last Updated: Oct 2023
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            <label className="flex items-center gap-3 bg-[#130b09] rounded-full p-1 pl-4 pr-1 border border-white/10 hover:border-copper/30 transition-all cursor-pointer group">
                                <span className="text-xs font-medium text-gold-dim group-hover:text-copper transition-colors">My Eligibility</span>
                                <div className="relative">
                                    <input className="sr-only peer" type="checkbox" />
                                    <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gold-dim after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-copper/50"></div>
                                </div>
                            </label>
                            <button className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-gold-dim hover:bg-white/10 hover:text-white hover:border-white/20 transition-all">
                                <span className="material-symbols-outlined text-gold-dim/60 group-hover:text-white transition-colors" style={{ fontSize: '18px' }}>download</span>
                                Download Guide
                            </button>
                        </div>
                    </div>

                    {/* Banking Tier Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {bankingTiers.map((tier) => (
                            <div key={tier.id} className="rounded-2xl p-0 relative overflow-hidden group hover:border-copper/40 transition-all duration-500 flex flex-col h-full bg-espresso-800/30 backdrop-blur-xl border border-copper/10 shadow-lg shadow-black/30">
                                {/* Favorite Button */}
                                <button className="absolute top-6 right-6 z-20 h-8 w-8 rounded-full bg-black/20 hover:bg-copper/20 flex items-center justify-center text-gold-dim/50 hover:text-copper transition-all backdrop-blur-sm border border-white/5 hover:border-copper/30" title="Add to Favourites">
                                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                                </button>

                                {/* Corner Glow */}
                                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${tier.accentColor === 'copper' ? 'from-copper/10' :
                                        tier.accentColor === 'orange-400' ? 'from-orange-500/10' :
                                            'from-rose-900/40'
                                    } to-transparent rounded-bl-full pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity`}></div>

                                {/* Header */}
                                <div className="p-8 pb-6 border-b border-white/5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-10 w-10 bg-white/90 rounded flex items-center justify-center">
                                            <span className="font-bold text-xs tracking-tighter" style={{ color: tier.bankColor }}>{tier.bank}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${tier.tierLabelColor}`}>
                                            {tier.tierLabel}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{tier.tierName}</h3>
                                    <p className="text-xs text-gold-dim/60">{tier.description}</p>
                                </div>

                                {/* Content */}
                                <div className="p-8 py-6 flex-1">
                                    {/* Eligibility Criteria */}
                                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-${tier.accentColor}`}>
                                        <span className="material-symbols-outlined text-sm">verified</span> Eligibility Criteria
                                    </h4>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5 mb-6">
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th className="text-left font-medium text-gold-dim pb-2 border-b border-copper/20 text-xs uppercase tracking-wide">Metric</th>
                                                    <th className="text-right font-medium text-gold-dim pb-2 border-b border-copper/20 text-xs uppercase tracking-wide">Requirement</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tier.criteria.map((c, idx) => (
                                                    <tr key={idx}>
                                                        <td className="py-3 text-warm-white text-sm border-b border-white/5">{c.metric}</td>
                                                        <td className="py-3 text-right font-mono text-copper-light text-sm border-b border-white/5">{c.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Benefits */}
                                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-${tier.accentColor}`}>
                                        <span className="material-symbols-outlined text-sm">redeem</span> Exclusive Benefits
                                    </h4>
                                    <ul className="space-y-3 mb-6">
                                        {tier.benefits.map((b, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gold-dim">
                                                <span className={`material-symbols-outlined text-${tier.accentColor} text-base mt-0.5`}>check_circle</span>
                                                <span><strong className="text-white font-medium">{b.title}</strong> {b.desc}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Services */}
                                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 text-${tier.accentColor}`}>
                                        <span className="material-symbols-outlined text-sm">support_agent</span> Premium Services
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {tier.services.map((s, idx) => (
                                            <span key={idx} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gold-dim/80">{s}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-8 pt-0 mt-auto flex gap-3">
                                    {tier.showCheckEligibility ? (
                                        <button className="flex-1 py-3 rounded-lg bg-gradient-to-r from-copper to-[#a66a30] hover:from-[#dba365] hover:to-[#be7a39] text-[#1a100c] text-sm font-bold uppercase tracking-wider shadow-lg shadow-copper/20 transition-all flex items-center justify-center gap-2">
                                            <span>Check Eligibility</span>
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </button>
                                    ) : (
                                        <button className="flex-1 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                                            <span>View Details</span>
                                        </button>
                                    )}
                                    <button className="h-[46px] w-[46px] flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold-dim hover:text-white hover:border-copper/40 hover:bg-white/10 transition-all" title="Compare">
                                        <span className="material-symbols-outlined">compare_arrows</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Family Banking Banner */}
                    <div className="mt-12 rounded-xl p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 bg-espresso-800/30 backdrop-blur-xl">
                        <div className="flex items-center gap-6">
                            <div className="h-14 w-14 rounded-full bg-copper/10 flex items-center justify-center shrink-0 border border-copper/20">
                                <span className="material-symbols-outlined text-copper text-2xl">family_restroom</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">Family Banking Advantage</h4>
                                <p className="text-sm text-gold-dim/70 max-w-lg">
                                    Did you know? HDFC Imperia allows grouping up to 4 family members to maintain the TRV requirement collectively, making it easier to upgrade everyone's status instantly.
                                </p>
                            </div>
                        </div>
                        <button className="px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-copper/30 text-white text-xs font-bold uppercase tracking-wider transition-all">
                            Read Grouping Guide
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
