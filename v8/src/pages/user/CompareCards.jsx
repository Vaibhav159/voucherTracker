import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toSlug, fromSlug } from '../../utils/slugify';

// Available cards for comparison
const availableCards = [
    { id: 'hdfc-infinia', name: 'Infinia Metal', bank: 'HDFC Bank', gradient: 'from-gray-700 to-gray-900' },
    { id: 'axis-magnus', name: 'Magnus Burgundy', bank: 'Axis Bank', gradient: 'from-[#3b211a] to-[#1a110d]' },
    { id: 'amex-platinum', name: 'Platinum Travel', bank: 'American Express', gradient: 'from-gray-400 to-gray-600' },
    { id: 'icici-sapphiro', name: 'Sapphiro', bank: 'ICICI Bank', gradient: 'from-blue-900 to-blue-950' },
    { id: 'sbi-elite', name: 'Elite', bank: 'SBI Card', gradient: 'from-blue-700 to-blue-900' },
];

const compareData = {
    fees: {
        title: 'Fees & Charges',
        icon: '💰',
        rows: [
            { metric: 'Joining Fee', card1: '₹ 12,500 + GST', card2: '₹ 30,000 + GST' },
            { metric: 'Renewal Fee', card1: '₹ 12,500 + GST', card2: '₹ 30,000 + GST' },
            { metric: 'Fee Waiver', card1: 'Spends > ₹10L', card2: 'Spends > ₹25L' },
            { metric: 'Forex Markup', card1: '2%', card2: '2%', highlight: true },
        ],
    },
    rewards: {
        title: 'Rewards & Value',
        icon: '💎',
        rows: [
            { metric: 'Base Reward Rate', card1: '3.3%', card2: '4.8%' },
            { metric: 'Accelerated Rate', card1: 'Up to 33% (10X)', card1Sub: 'SmartBuy', card2: 'Up to 24% (5X)', card2Sub: 'Travel Edge', card1Best: true },
            { metric: 'Reward Type', card1: 'Points', card2: 'Edge Miles' },
            { metric: '1 Point Value', card1: '₹ 1.00', card2: '₹ 0.80', copper: true },
            { metric: 'Redemption Partners', card1: '14+ (Air/Hotel)', card2: '20+ (Air/Hotel)' },
            { metric: 'Capping', card1: 'None', card1Green: true, card2: '25k pts / month' },
        ],
    },
    milestones: {
        title: 'Milestones',
        icon: '🎯',
        rows: [
            { metric: 'Spend Benefits', card1: '-', card2: '25k Pts', card2Sub: 'on ₹1.5L spend/mo' },
        ],
    },
    travel: {
        title: 'Travel & Lounge',
        icon: '✈️',
        rows: [
            { metric: 'Domestic Lounge', card1: 'Unlimited', card2: 'Unlimited' },
            { metric: 'Intl. Lounge', card1: 'Unlimited (PP)', card2: 'Unlimited (PP)' },
            { metric: 'Guest Access', card1: 'Unlimited', card2: '8 Guests / Year' },
        ],
    },
    lifestyle: {
        title: 'Lifestyle',
        icon: '⛳',
        rows: [
            { metric: 'Golf Games', card1: 'Unlimited', card2: 'Unlimited' },
            { metric: 'Movies / Dining', card1: 'B1G1 (ITC Buffets)', card2: 'B1G1 (BookMyShow)' },
            { metric: 'Concierge', card1: '24/7 Global', card2: '24/7 Dedicated', copper: true },
        ],
    },
};

export default function CompareCards() {
    const { card1: card1Param, card2: card2Param } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    // Find cards from URL params or use defaults
    const selectedCard1 = availableCards.find(c => c.id === card1Param) || availableCards[0];
    const selectedCard2 = availableCards.find(c => c.id === card2Param) || availableCards[1];

    // Update URL when cards change
    const updateUrl = (newCard1Id, newCard2Id) => {
        navigate(`/compare/${newCard1Id}/${newCard2Id}`, { replace: true });
    };

    // Copy shareable link
    const copyShareLink = () => {
        const url = `${window.location.origin}/compare/${selectedCard1.id}/${selectedCard2.id}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-1 overflow-hidden relative bg-theme-bg">
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-theme-bg relative">
                {/* Header */}
                <header className="flex items-center justify-between gap-4 px-6 py-3 border-b border-theme-border bg-theme-bg/95 backdrop-blur-md z-20 sticky top-0 h-16 shrink-0">
                    <div className="hidden lg:flex items-center gap-2 text-xs text-accent-dim">
                        <span className="material-symbols-outlined text-base">home</span>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span>Credit Cards</span>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span className="text-theme-primary font-medium">Compare</span>
                    </div>

                    <div className="flex-1 max-w-md mx-auto">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-accent-dim group-focus-within:text-accent transition-colors">
                                <span className="material-symbols-outlined text-[18px]">search</span>
                            </div>
                            <input
                                className="block w-full py-2 pl-9 pr-3 text-sm text-theme-primary border border-theme-border rounded-md bg-theme-surface focus:ring-1 focus:ring-accent focus:border-accent placeholder-theme-muted transition-all"
                                placeholder="Search cards or benefits..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2 text-accent-dim hover:text-theme-primary hover:bg-theme-border rounded-md transition-colors">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                        <button
                            onClick={copyShareLink}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors text-xs font-medium ${copied
                                ? 'border-green-500 bg-green-500/10 text-green-400'
                                : 'border-theme-border bg-theme-surface text-theme-primary hover:bg-theme-border'}`}
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
                                <h1 className="text-3xl font-serif text-theme-primary tracking-tight mb-1">Detailed Comparison</h1>
                                <p className="text-accent-dim text-sm">Analyzing privileges across fees, rewards, and lifestyle.</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-accent-dim">
                                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-accent"></span>Best Value</span>
                                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-copper"></span>Featured</span>
                            </div>
                        </div>

                        {/* Comparison Table */}
                        <div className="w-full overflow-x-auto rounded-lg border border-theme-border bg-theme-surface shadow-2xl shadow-black/60 hide-scrollbar">
                            <div className="min-w-[900px] grid grid-cols-[220px_1fr_1fr_1fr]">
                                {/* Header Row */}
                                <div className="sticky top-0 z-30 bg-theme-surface border-b border-theme-border p-4 flex flex-col justify-end shadow-md">
                                    <span className="text-[10px] uppercase tracking-widest text-accent-dim/70 font-bold">Metrics</span>
                                </div>

                                {/* Card 1 Header */}
                                <div className="sticky top-0 z-30 bg-theme-surface border-b border-l border-theme-border p-4 flex flex-col items-center gap-3 group relative shadow-md">
                                    <button className="absolute top-2 right-2 text-accent-dim hover:text-red-400 transition-colors" title="Remove Card">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                    <div className={`relative w-32 aspect-[1.586] rounded-lg shadow-lg group-hover:-translate-y-1 transition-transform duration-300 bg-gradient-to-br ${selectedCard1.gradient} flex items-center justify-center`}>
                                        <span className="text-theme-primary font-mono text-xs">{selectedCard1.name.split(' ')[0].toUpperCase()}</span>
                                    </div>
                                    <div className="text-center w-full">
                                        <h3 className="font-serif text-base text-theme-primary font-bold leading-tight">{selectedCard1.name}</h3>
                                        <p className="text-[10px] text-accent-dim uppercase tracking-wider mt-0.5">{selectedCard1.bank}</p>
                                    </div>
                                    <button className="w-full max-w-[140px] py-1.5 bg-accent hover:bg-white text-theme-primary font-bold text-xs uppercase tracking-wide rounded transition-all shadow-lg">
                                        Apply Now
                                    </button>
                                </div>

                                {/* Card 2 Header */}
                                <div className="sticky top-0 z-30 bg-theme-surface border-b border-l border-theme-border p-4 flex flex-col items-center gap-3 group relative shadow-md">
                                    <button className="absolute top-2 right-2 text-accent-dim hover:text-red-400 transition-colors" title="Remove Card">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                    <div className={`relative w-32 aspect-[1.586] rounded-lg shadow-lg group-hover:-translate-y-1 transition-transform duration-300 bg-gradient-to-br ${selectedCard2.gradient} flex items-center justify-center`}>
                                        <span className="text-theme-primary font-mono text-xs">{selectedCard2.name.split(' ')[0].toUpperCase()}</span>
                                    </div>
                                    <div className="text-center w-full">
                                        <h3 className="font-serif text-base text-theme-primary font-bold leading-tight">{selectedCard2.name}</h3>
                                        <p className="text-[10px] text-accent-dim uppercase tracking-wider mt-0.5">{selectedCard2.bank}</p>
                                    </div>
                                    <button className="w-full max-w-[140px] py-1.5 bg-accent hover:bg-white text-theme-primary font-bold text-xs uppercase tracking-wide rounded transition-all shadow-lg">
                                        Apply Now
                                    </button>
                                </div>

                                {/* Add Card Column */}
                                <div className="sticky top-0 z-30 bg-theme-surface border-b border-l border-theme-border p-4 flex flex-col items-center justify-center relative shadow-md">
                                    <div className="flex flex-col items-center justify-center gap-3 w-full h-full rounded-xl border border-dashed border-copper/30 bg-copper/5 hover:bg-copper/10 hover:border-copper/60 transition-all cursor-pointer group py-4">
                                        <div className="size-10 rounded-full bg-theme-border flex items-center justify-center group-hover:bg-accent group-hover:text-theme-primary transition-colors shadow-inner">
                                            <span className="material-symbols-outlined text-xl">add_card</span>
                                        </div>
                                        <span className="text-xs font-semibold text-accent-secondary group-hover:text-accent transition-colors">Add Card</span>
                                    </div>
                                </div>

                                {/* Data Sections */}
                                {Object.entries(compareData).map(([key, section]) => (
                                    <>
                                        {/* Section Header */}
                                        <div key={`${key}-header`} className="col-span-full bg-gradient-to-r from-theme-surface/40 to-transparent px-4 py-2 border-b border-copper/20 flex items-center gap-2 mt-4">
                                            <span className="text-sm">{section.icon}</span>
                                            <h4 className="text-xs font-bold text-accent uppercase tracking-wider">{section.title}</h4>
                                        </div>

                                        {/* Data Rows */}
                                        {section.rows.map((row, idx) => (
                                            <>
                                                <div key={`${key}-${idx}-metric`} className="px-4 py-3 border-b border-theme-border/50 text-accent-dim text-xs font-medium bg-theme-surface/50">{row.metric}</div>
                                                <div key={`${key}-${idx}-card1`} className="px-4 py-3 border-b border-l border-theme-border/50 text-center relative">
                                                    {row.card1Best && <span className="text-[10px] text-accent border border-accent/30 px-1 rounded absolute top-1 right-1">Best</span>}
                                                    <div className={`text-sm ${row.card1Green ? 'text-green-400' : row.copper ? 'text-accent-secondary font-medium' : row.highlight ? 'text-accent font-bold' : 'text-theme-primary'}`}>{row.card1}</div>
                                                    {row.card1Sub && <div className="text-[10px] text-accent-dim">{row.card1Sub}</div>}
                                                </div>
                                                <div key={`${key}-${idx}-card2`} className="px-4 py-3 border-b border-l border-theme-border/50 text-center">
                                                    <div className={`text-sm ${row.copper ? 'text-accent-secondary font-medium' : row.highlight ? 'text-accent font-bold' : 'text-theme-primary'}`}>{row.card2}</div>
                                                    {row.card2Sub && <div className="text-[10px] text-accent-dim">{row.card2Sub}</div>}
                                                </div>
                                                <div key={`${key}-${idx}-empty`} className="px-4 py-3 border-b border-l border-theme-border/50 text-center text-accent-dim/20 text-sm">-</div>
                                            </>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>

                        <p className="text-[10px] text-accent-dim/40 text-center mt-6">
                            *Interest rates, rewards, and fee structures are subject to change by the issuing bank. CardPerks is not a direct issuer. Data updated Jan 2024.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
