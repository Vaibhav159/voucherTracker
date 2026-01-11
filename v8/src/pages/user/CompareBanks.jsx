import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Available banks for comparison
const availableBanks = [
    { id: 'hdfc-imperia', name: 'HDFC Imperia', shortName: 'HDFC', tier: 'Private Banking', gradient: 'from-[#004C8F] to-[#003366]' },
    { id: 'axis-burgundy', name: 'Axis Burgundy', shortName: 'AXIS', tier: 'Priority Banking', gradient: 'from-[#97144D] to-[#6D0F38]' },
    { id: 'icici-wealth', name: 'ICICI Wealth', shortName: 'ICICI', tier: 'Wealth Management', gradient: 'from-[#B02A30] to-[#7A1D22]' },
    { id: 'kotak-privy', name: 'Kotak Privy League', shortName: 'KOTAK', tier: 'Premium Banking', gradient: 'from-[#ED1C24] to-[#A31419]' },
    { id: 'sbi-exclusive', name: 'SBI Exclusive', shortName: 'SBI', tier: 'Exclusive Banking', gradient: 'from-[#22409A] to-[#172B6B]' },
];

const compareData = {
    accounts: {
        title: 'Account Features',
        icon: '🏦',
        rows: [
            { metric: 'Savings Rate', bank1: '3.50%', bank2: '4.00%', bank2Best: true },
            { metric: 'Min Balance', bank1: '₹ 25,000', bank2: '₹ 10,000', bank2Best: true },
            { metric: 'Debit Card', bank1: 'Infinia Metal', bank2: 'Burgundy' },
            { metric: 'Account Type', bank1: 'Imperia', bank2: 'Burgundy' },
        ],
    },
    benefits: {
        title: 'Premium Benefits',
        icon: '💎',
        rows: [
            { metric: 'AMC Debit Card', bank1: 'Waived', bank2: '₹ 999', bank1Best: true },
            { metric: 'Forex Markup', bank1: '1.75%', bank2: '2.00%', bank1Best: true, highlight: true },
            { metric: 'Free NEFT/RTGS', bank1: 'Unlimited', bank2: 'Unlimited' },
            { metric: 'DD/Cheque Free', bank1: '25 / Month', bank2: '10 / Month', bank1Best: true },
            { metric: 'Locker Discount', bank1: '50%', bank2: '25%', bank1Best: true },
        ],
    },
    services: {
        title: 'Digital Services',
        icon: '📱',
        rows: [
            { metric: 'Mobile App Rating', bank1: '4.4 ★', bank2: '4.2 ★', bank1Best: true },
            { metric: 'UPI Limit', bank1: '₹ 2 Lakh', bank2: '₹ 1 Lakh', bank1Best: true },
            { metric: 'Virtual Debit Card', bank1: 'Yes', bank2: 'Yes' },
            { metric: 'Instant FD', bank1: 'Yes', bank2: 'Yes' },
        ],
    },
    wealth: {
        title: 'Wealth Management',
        icon: '💼',
        rows: [
            { metric: 'RM Service', bank1: 'Dedicated', bank2: 'Dedicated', copper: true },
            { metric: 'Investment Products', bank1: 'Full Suite', bank2: 'Full Suite' },
            { metric: 'FD Rate (1 Year)', bank1: '7.10%', bank2: '7.25%', bank2Best: true, highlight: true },
            { metric: 'NRI Services', bank1: 'Comprehensive', bank2: 'Basic', bank1Best: true },
        ],
    },
    lifestyle: {
        title: 'Lifestyle Perks',
        icon: '⛳',
        rows: [
            { metric: 'Golf Access', bank1: '4 Games / Month', bank2: '2 Games / Month', bank1Best: true },
            { metric: 'Airport Lounge', bank1: '8 / Year', bank2: '4 / Year', bank1Best: true },
            { metric: 'Concierge', bank1: '24/7', bank2: 'Business Hrs' },
            { metric: 'Movie Offers', bank1: 'B1G1 PVR', bank2: 'B1G1 INOX' },
        ],
    },
};

export default function CompareBanks() {
    const { bank1: bank1Param, bank2: bank2Param } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    // Find banks from URL params or use defaults
    const selectedBank1 = availableBanks.find(b => b.id === bank1Param) || availableBanks[0];
    const selectedBank2 = availableBanks.find(b => b.id === bank2Param) || availableBanks[1];

    // Update URL when banks change
    const updateUrl = (newBank1Id, newBank2Id) => {
        navigate(`/compare-banks/${newBank1Id}/${newBank2Id}`, { replace: true });
    };

    // Copy shareable link
    const copyShareLink = () => {
        const url = `${window.location.origin}/compare-banks/${selectedBank1.id}/${selectedBank2.id}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-950">
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-espresso-950 relative">
                {/* Header */}
                <header className="flex items-center justify-between gap-4 px-6 py-3 border-b border-espresso-700 bg-espresso-950/95 backdrop-blur-md z-20 sticky top-0 h-16 shrink-0">
                    <div className="hidden lg:flex items-center gap-2 text-xs text-gold-dim">
                        <span className="material-symbols-outlined text-base">home</span>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span>Banking</span>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span className="text-white font-medium">Compare</span>
                    </div>

                    <div className="flex-1 max-w-md mx-auto">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-dim group-focus-within:text-gold-400 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">search</span>
                            </div>
                            <input
                                className="block w-full py-2 pl-9 pr-3 text-sm text-white border border-espresso-700 rounded-md bg-espresso-800 focus:ring-1 focus:ring-gold-400 focus:border-gold-400 placeholder-gold-dim/50 transition-all"
                                placeholder="Search banks or features..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gold-dim hover:text-white hover:bg-espresso-700 rounded-md transition-colors">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                        <button
                            onClick={copyShareLink}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors text-xs font-medium ${copied
                                ? 'border-green-500 bg-green-500/10 text-green-400'
                                : 'border-espresso-700 bg-espresso-800 text-white hover:bg-espresso-700'}`}
                        >
                            <span className="material-symbols-outlined text-base">{copied ? 'check' : 'share'}</span>
                            {copied ? 'Copied!' : 'Share'}
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth p-6">
                    <div className="max-w-[1500px] mx-auto h-full flex flex-col">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h1 className="text-3xl font-serif text-white tracking-tight mb-1">Bank Comparison</h1>
                                <p className="text-gold-dim text-sm">Compare premium banking accounts and their privileges.</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gold-dim">
                                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-gold-400"></span>Best Value</span>
                                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-copper"></span>Featured</span>
                            </div>
                        </div>

                        {/* Comparison Table */}
                        <div className="w-full overflow-x-auto rounded-lg border border-espresso-700 bg-espresso-900 shadow-2xl shadow-black/60 hide-scrollbar">
                            <div className="min-w-[900px] grid grid-cols-[220px_1fr_1fr_1fr]">
                                {/* Header Row */}
                                <div className="sticky top-0 z-30 bg-espresso-900 border-b border-espresso-700 p-4 flex flex-col justify-end shadow-md">
                                    <span className="text-[10px] uppercase tracking-widest text-gold-dim/70 font-bold">Metrics</span>
                                </div>

                                {/* Bank 1 Header */}
                                <div className="sticky top-0 z-30 bg-espresso-800 border-b border-l border-espresso-700 p-4 flex flex-col items-center gap-3 group relative shadow-md">
                                    <button className="absolute top-2 right-2 text-gold-dim hover:text-red-400 transition-colors" title="Remove Bank">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                    <div className={`relative w-16 h-16 rounded-full shadow-lg group-hover:-translate-y-1 transition-transform duration-300 bg-gradient-to-br ${selectedBank1.gradient} flex items-center justify-center`}>
                                        <span className="text-white font-bold text-lg">{selectedBank1.shortName}</span>
                                    </div>
                                    <div className="text-center w-full">
                                        <h3 className="font-serif text-base text-white font-bold leading-tight">{selectedBank1.name}</h3>
                                        <p className="text-[10px] text-gold-dim uppercase tracking-wider mt-0.5">{selectedBank1.tier}</p>
                                    </div>
                                    <button className="w-full max-w-[140px] py-1.5 bg-gold-400 hover:bg-white text-espresso-950 font-bold text-xs uppercase tracking-wide rounded transition-all shadow-lg">
                                        Open Account
                                    </button>
                                </div>

                                {/* Bank 2 Header */}
                                <div className="sticky top-0 z-30 bg-espresso-800 border-b border-l border-espresso-700 p-4 flex flex-col items-center gap-3 group relative shadow-md">
                                    <button className="absolute top-2 right-2 text-gold-dim hover:text-red-400 transition-colors" title="Remove Bank">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                    <div className={`relative w-16 h-16 rounded-full shadow-lg group-hover:-translate-y-1 transition-transform duration-300 bg-gradient-to-br ${selectedBank2.gradient} flex items-center justify-center`}>
                                        <span className="text-white font-bold text-lg">{selectedBank2.shortName}</span>
                                    </div>
                                    <div className="text-center w-full">
                                        <h3 className="font-serif text-base text-white font-bold leading-tight">{selectedBank2.name}</h3>
                                        <p className="text-[10px] text-gold-dim uppercase tracking-wider mt-0.5">{selectedBank2.tier}</p>
                                    </div>
                                    <button className="w-full max-w-[140px] py-1.5 bg-gold-400 hover:bg-white text-espresso-950 font-bold text-xs uppercase tracking-wide rounded transition-all shadow-lg">
                                        Open Account
                                    </button>
                                </div>

                                {/* Add Bank Column */}
                                <div className="sticky top-0 z-30 bg-espresso-800 border-b border-l border-espresso-700 p-4 flex flex-col items-center justify-center relative shadow-md">
                                    <div className="flex flex-col items-center justify-center gap-3 w-full h-full rounded-xl border border-dashed border-copper/30 bg-copper/5 hover:bg-copper/10 hover:border-copper/60 transition-all cursor-pointer group py-4">
                                        <div className="size-10 rounded-full bg-espresso-700 flex items-center justify-center group-hover:bg-gold-400 group-hover:text-espresso-950 transition-colors shadow-inner">
                                            <span className="material-symbols-outlined text-xl">add_business</span>
                                        </div>
                                        <span className="text-xs font-semibold text-copper group-hover:text-gold-400 transition-colors">Add Bank</span>
                                    </div>
                                </div>

                                {/* Data Sections */}
                                {Object.entries(compareData).map(([key, section]) => (
                                    <>
                                        {/* Section Header */}
                                        <div key={`${key}-header`} className="col-span-full bg-gradient-to-r from-espresso-700/40 to-transparent px-4 py-2 border-b border-copper/20 flex items-center gap-2 mt-4">
                                            <span className="text-sm">{section.icon}</span>
                                            <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">{section.title}</h4>
                                        </div>

                                        {/* Data Rows */}
                                        {section.rows.map((row, idx) => (
                                            <>
                                                <div key={`${key}-${idx}-metric`} className="px-4 py-3 border-b border-espresso-700/50 text-gold-dim text-xs font-medium bg-espresso-900/50">{row.metric}</div>
                                                <div key={`${key}-${idx}-bank1`} className="px-4 py-3 border-b border-l border-espresso-700/50 text-center relative">
                                                    {row.bank1Best && <span className="text-[10px] text-gold-400 border border-gold-400/30 px-1 rounded absolute top-1 right-1">Best</span>}
                                                    <div className={`text-sm ${row.bank1Green ? 'text-green-400' : row.copper ? 'text-copper font-medium' : row.highlight ? 'text-gold-400 font-bold' : 'text-white'}`}>{row.bank1}</div>
                                                    {row.bank1Sub && <div className="text-[10px] text-gold-dim">{row.bank1Sub}</div>}
                                                </div>
                                                <div key={`${key}-${idx}-bank2`} className="px-4 py-3 border-b border-l border-espresso-700/50 text-center relative">
                                                    {row.bank2Best && <span className="text-[10px] text-gold-400 border border-gold-400/30 px-1 rounded absolute top-1 right-1">Best</span>}
                                                    <div className={`text-sm ${row.copper ? 'text-copper font-medium' : row.highlight ? 'text-gold-400 font-bold' : 'text-white'}`}>{row.bank2}</div>
                                                    {row.bank2Sub && <div className="text-[10px] text-gold-dim">{row.bank2Sub}</div>}
                                                </div>
                                                <div key={`${key}-${idx}-empty`} className="px-4 py-3 border-b border-l border-espresso-700/50 text-center text-gold-dim/20 text-sm">-</div>
                                            </>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>

                        <p className="text-[10px] text-gold-dim/40 text-center mt-6">
                            *Features, rates, and eligibility criteria are subject to change by the bank. CardPerks is not affiliated with these banks. Data updated Jan 2024.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
