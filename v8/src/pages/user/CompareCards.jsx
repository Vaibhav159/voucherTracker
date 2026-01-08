import { useState } from 'react';

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
    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-950">
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-espresso-950 relative">
                {/* Header */}
                <header className="flex items-center justify-between gap-4 px-6 py-3 border-b border-espresso-700 bg-espresso-950/95 backdrop-blur-md z-20 sticky top-0 h-16 shrink-0">
                    <div className="hidden lg:flex items-center gap-2 text-xs text-gold-dim">
                        <span className="material-symbols-outlined text-base">home</span>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span>Credit Cards</span>
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
                                placeholder="Search cards or benefits..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gold-dim hover:text-white hover:bg-espresso-700 rounded-md transition-colors">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-espresso-700 bg-espresso-800 text-white hover:bg-espresso-700 transition-colors text-xs font-medium">
                            <span className="material-symbols-outlined text-base">share</span> Share
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth p-6">
                    <div className="max-w-[1500px] mx-auto h-full flex flex-col">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h1 className="text-3xl font-serif text-white tracking-tight mb-1">Detailed Comparison</h1>
                                <p className="text-gold-dim text-sm">Analyzing privileges across fees, rewards, and lifestyle.</p>
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

                                {/* Card 1 Header */}
                                <div className="sticky top-0 z-30 bg-espresso-800 border-b border-l border-espresso-700 p-4 flex flex-col items-center gap-3 group relative shadow-md">
                                    <button className="absolute top-2 right-2 text-gold-dim hover:text-red-400 transition-colors" title="Remove Card">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                    <div className="relative w-32 aspect-[1.586] rounded-lg shadow-lg group-hover:-translate-y-1 transition-transform duration-300 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                        <span className="text-white font-mono text-xs">INFINIA</span>
                                    </div>
                                    <div className="text-center w-full">
                                        <h3 className="font-serif text-base text-white font-bold leading-tight">Infinia Metal</h3>
                                        <p className="text-[10px] text-gold-dim uppercase tracking-wider mt-0.5">HDFC Bank</p>
                                    </div>
                                    <button className="w-full max-w-[140px] py-1.5 bg-gold-400 hover:bg-white text-espresso-950 font-bold text-xs uppercase tracking-wide rounded transition-all shadow-lg">
                                        Apply Now
                                    </button>
                                </div>

                                {/* Card 2 Header */}
                                <div className="sticky top-0 z-30 bg-espresso-800 border-b border-l border-espresso-700 p-4 flex flex-col items-center gap-3 group relative shadow-md">
                                    <button className="absolute top-2 right-2 text-gold-dim hover:text-red-400 transition-colors" title="Remove Card">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                    <div className="relative w-32 aspect-[1.586] rounded-lg shadow-lg group-hover:-translate-y-1 transition-transform duration-300 bg-gradient-to-br from-[#3b211a] to-[#1a110d] flex items-center justify-center">
                                        <span className="text-white font-mono text-xs">MAGNUS</span>
                                    </div>
                                    <div className="text-center w-full">
                                        <h3 className="font-serif text-base text-white font-bold leading-tight">Magnus Burgundy</h3>
                                        <p className="text-[10px] text-gold-dim uppercase tracking-wider mt-0.5">Axis Bank</p>
                                    </div>
                                    <button className="w-full max-w-[140px] py-1.5 bg-gold-400 hover:bg-white text-espresso-950 font-bold text-xs uppercase tracking-wide rounded transition-all shadow-lg">
                                        Apply Now
                                    </button>
                                </div>

                                {/* Add Card Column */}
                                <div className="sticky top-0 z-30 bg-espresso-800 border-b border-l border-espresso-700 p-4 flex flex-col items-center justify-center relative shadow-md">
                                    <div className="flex flex-col items-center justify-center gap-3 w-full h-full rounded-xl border border-dashed border-copper/30 bg-copper/5 hover:bg-copper/10 hover:border-copper/60 transition-all cursor-pointer group py-4">
                                        <div className="size-10 rounded-full bg-espresso-700 flex items-center justify-center group-hover:bg-gold-400 group-hover:text-espresso-950 transition-colors shadow-inner">
                                            <span className="material-symbols-outlined text-xl">add_card</span>
                                        </div>
                                        <span className="text-xs font-semibold text-copper group-hover:text-gold-400 transition-colors">Add Card</span>
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
                                                <div key={`${key}-${idx}-card1`} className="px-4 py-3 border-b border-l border-espresso-700/50 text-center relative">
                                                    {row.card1Best && <span className="text-[10px] text-gold-400 border border-gold-400/30 px-1 rounded absolute top-1 right-1">Best</span>}
                                                    <div className={`text-sm ${row.card1Green ? 'text-green-400' : row.copper ? 'text-copper font-medium' : row.highlight ? 'text-gold-400 font-bold' : 'text-white'}`}>{row.card1}</div>
                                                    {row.card1Sub && <div className="text-[10px] text-gold-dim">{row.card1Sub}</div>}
                                                </div>
                                                <div key={`${key}-${idx}-card2`} className="px-4 py-3 border-b border-l border-espresso-700/50 text-center">
                                                    <div className={`text-sm ${row.copper ? 'text-copper font-medium' : row.highlight ? 'text-gold-400 font-bold' : 'text-white'}`}>{row.card2}</div>
                                                    {row.card2Sub && <div className="text-[10px] text-gold-dim">{row.card2Sub}</div>}
                                                </div>
                                                <div key={`${key}-${idx}-empty`} className="px-4 py-3 border-b border-l border-espresso-700/50 text-center text-gold-dim/20 text-sm">-</div>
                                            </>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>

                        <p className="text-[10px] text-gold-dim/40 text-center mt-6">
                            *Interest rates, rewards, and fee structures are subject to change by the issuing bank. CardPerks is not a direct issuer. Data updated Oct 2023.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
