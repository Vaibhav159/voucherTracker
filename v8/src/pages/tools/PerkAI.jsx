import { useState } from 'react';

const historyItems = [
    { id: 1, title: 'Infinia vs Magnus', pinned: false },
    { id: 2, title: 'Amazon Voucher Rates', pinned: false },
    { id: 3, title: 'London Lounge Access', pinned: false },
    { id: 4, title: 'Transfer Partners', pinned: false },
];

const pinnedItems = [
    { id: 1, title: 'Monthly Optimization' },
];

const suggestedPrompts = [
    { icon: 'flight_takeoff', text: 'Optimize my rewards for upcoming travel.' },
    { icon: 'restaurant', text: 'Compare premium credit cards for dining benefits.' },
    { icon: 'diamond', text: 'Show me the best vouchers for luxury shopping.' },
    { icon: 'query_stats', text: 'Analyze my spending patterns for the last quarter.' },
    { icon: 'account_balance', text: 'What are the eligibility criteria for HDFC Private Banking?' },
];

export default function PerkAI() {
    const [query, setQuery] = useState('');

    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-950">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col justify-between border-r border-espresso-700 bg-espresso-950 md:flex z-20">
                <div className="flex flex-col gap-6 p-6">
                    {/* History */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between mb-2 px-3">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-90">History</p>
                            <button className="text-white/40 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[16px]">add</span>
                            </button>
                        </div>
                        <nav className="flex flex-col gap-1">
                            {historyItems.map((item) => (
                                <a
                                    key={item.id}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-primary transition-colors group relative overflow-hidden"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-[18px] text-white/40 group-hover:text-primary transition-colors">history</span>
                                    <span className="truncate">{item.title}</span>
                                    <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-[14px] text-white/40 hover:text-white">more_horiz</span>
                                    </div>
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Pinned */}
                    <div className="flex flex-col gap-2 mt-2">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest px-3 mb-1 opacity-90">Pinned</p>
                        <nav className="flex flex-col gap-1">
                            {pinnedItems.map((item) => (
                                <a
                                    key={item.id}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-primary transition-colors group"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-[18px] text-gold-400 group-hover:text-primary transition-colors">push_pin</span>
                                    <span className="truncate">{item.title}</span>
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="flex flex-col gap-2 p-6 border-t border-espresso-700 bg-espresso-900/50">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors group">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">settings</span>
                        AI Settings
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors group">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">delete</span>
                        Clear History
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="relative flex-1 flex flex-col items-center justify-center bg-black overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e1513_0%,_#0f0a09_40%,_#050303_100%)]"></div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-15%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] animate-pulse mix-blend-screen"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-copper/5 rounded-full blur-[140px] animate-pulse"></div>
                </div>
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]"></div>

                <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center h-full pb-10">
                    {/* AI Greeting */}
                    <div className="mb-10 flex flex-col items-center text-center space-y-6">
                        <div className="relative h-16 w-16 rounded-2xl bg-espresso-900 border border-primary/30 shadow-[0_0_25px_rgba(230,165,126,0.15)] flex items-center justify-center group">
                            <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-md group-hover:bg-primary/20 transition-all duration-500"></div>
                            <span className="material-symbols-outlined text-[36px] text-primary relative z-10">smart_toy</span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-white drop-shadow-sm">
                                Hello, I'm <span className="bg-gradient-to-r from-primary via-gold-400 to-primary bg-clip-text text-transparent">Perk AI</span>.
                            </h1>
                            <div className="max-w-lg mx-auto bg-espresso-800/40 border border-white/5 rounded-xl p-4 text-left backdrop-blur-sm shadow-xl">
                                <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">
                                    I can analyze your <span className="text-primary font-semibold">spending patterns</span>, compare <span className="text-primary font-semibold">real-time voucher rates</span>, or help you craft the perfect <span className="text-primary font-semibold">redemption strategy</span> for your next trip.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className="w-full max-w-2xl relative group z-20">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-gold-400/10 to-primary/30 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
                        <div className="relative flex items-center bg-espresso-900/90 backdrop-blur-md rounded-full border border-primary/30 shadow-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-[0_0_25px_rgba(230,165,126,0.15)] transition-all duration-300">
                            <div className="pl-6 pr-3 py-4 text-primary/60">
                                <span className="material-symbols-outlined text-[24px]">spark</span>
                            </div>
                            <input
                                autoFocus
                                className="w-full bg-transparent border-none p-0 py-4 text-lg text-white placeholder-white/30 focus:ring-0 focus:outline-none font-medium tracking-wide"
                                placeholder="Ask about cards, points, or rewards..."
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="pr-2 pl-2 flex items-center gap-2">
                                <button className="flex items-center justify-center h-10 w-10 rounded-full bg-espresso-800 border border-white/10 hover:bg-primary hover:border-primary text-white hover:text-espresso-950 transition-all duration-200">
                                    <span className="material-symbols-outlined text-[20px] ml-0.5">arrow_upward</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Suggested Prompts */}
                    <div className="mt-10 w-full">
                        <p className="text-center text-primary/60 text-xs font-semibold uppercase tracking-widest mb-4 opacity-80 drop-shadow-md">Suggested Prompts</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {suggestedPrompts.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setQuery(prompt.text)}
                                    className="group relative flex items-center gap-2.5 rounded-xl border border-primary/40 bg-espresso-900 px-4 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:border-primary hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(230,165,126,0.25)] overflow-hidden"
                                    style={{ animationDelay: `${75 * (idx + 1)}ms` }}
                                >
                                    <span className="material-symbols-outlined text-[18px] text-primary group-hover:text-white transition-colors">{prompt.icon}</span>
                                    <span className="relative z-10">{prompt.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="absolute bottom-6 w-full text-center px-4">
                        <p className="text-[11px] text-gold-dim/40 font-medium tracking-wide">
                            Perk AI provides estimates based on current market data. Always verify specific terms with issuers.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
