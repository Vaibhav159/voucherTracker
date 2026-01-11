import { useState } from 'react';

// Pinned items handled in main component state/rendering, mock data removed from top scope to avoid confusion.

const actionTiles = [
    { icon: 'flight_takeoff', title: 'Travel Optimization', subtitle: 'Reward Strategy', query: 'What are the best credit cards for travel rewards and airline mile optimization?' },
    { icon: 'restaurant', title: 'Premium Dining', subtitle: 'Card Comparison', query: 'Compare premium dining benefits across HDFC Infinia, Axis Magnus, and Amex Platinum.' },
    { icon: 'diamond', title: 'Luxury Vouchers', subtitle: 'Valuation Analysis', query: 'Analyze the best voucher redemption rates for Amazon, Flipkart, and Tata Neu.' },
    { icon: 'ssid_chart', title: 'Spending Pattern', subtitle: 'Quarterly Review', query: 'Review my quarterly spending patterns and suggest reward optimization strategies.' },
];

// Sample comparison data for demo
const sampleComparisonData = [
    { feature: 'Base Reward Rate', infinia: '3.33%', magnus: '1.20%', infiniaHighlight: true },
    { feature: 'Travel Multiplier', infinia: '5X / 10X', magnus: '5X (Portal)', infiniaHighlight: true },
    { feature: 'Points to Miles', infinia: '1:1', magnus: '5:4', infiniaHighlight: false },
    { feature: 'Annual Fee', infinia: '₹12,500', magnus: '₹12,500 + Taxes', infiniaHighlight: false },
];

// AI Avatar Component
const AIAvatar = ({ size = 'md' }) => {
    const sizeClasses = size === 'sm' ? 'w-12 h-12' : 'w-24 h-24 md:w-32 md:h-32';
    return (
        <svg className={`${sizeClasses} drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]`} fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="metal-grad-sm" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#E5A970"></stop>
                    <stop offset="50%" stopColor="#B87333"></stop>
                    <stop offset="100%" stopColor="#6A3815"></stop>
                </linearGradient>
                <linearGradient id="shield-grad-sm" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#1F1A17"></stop>
                    <stop offset="100%" stopColor="#0F0C0A"></stop>
                </linearGradient>
                <linearGradient id="gold-fill-sm" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#F3E5AB"></stop>
                    <stop offset="50%" stopColor="#D4AF37"></stop>
                    <stop offset="100%" stopColor="#8A7120"></stop>
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" fill="none" r="48" stroke="url(#metal-grad-sm)" strokeWidth="1"></circle>
            <circle cx="50" cy="50" fill="url(#shield-grad-sm)" r="45" stroke="url(#metal-grad-sm)" strokeWidth="2"></circle>
            <path d="M50 20 L78 35 V52 C78 72 50 85 50 85 C50 85 22 72 22 52 V35 L50 20 Z" fill="#0A0806" stroke="url(#metal-grad-sm)" strokeWidth="1"></path>
            <text fill="url(#gold-fill-sm)" fontFamily="Cinzel, serif" fontSize="36" fontWeight="bold" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))' }} textAnchor="middle" x="50" y="64">P</text>
        </svg>
    );
};

// User Message Bubble
const UserMessage = ({ content }) => (
    <div className="flex justify-end animate-fade-in-up">
        <div className="bg-espresso-matte border border-[#2C211B] rounded-2xl rounded-tr-none px-6 py-4 max-w-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
            <p className="text-white font-sans text-sm font-light tracking-wide leading-relaxed relative z-10">
                {content}
            </p>
        </div>
        <div className="ml-4 flex-shrink-0 h-10 w-10 rounded-full bg-[#120F0D] border border-[#2C211B] flex items-center justify-center">
            <span className="text-[10px] text-gray-400 font-bold">YOU</span>
        </div>
    </div>
);

// Comparison Table Component
const ComparisonTable = ({ data }) => (
    <div className="bg-obsidian border border-copper-500/20 rounded-lg overflow-hidden shadow-2xl relative my-8 animate-slide-up-bounce" style={{ animationDelay: '0.6s' }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-copper-700 via-copper-500 to-copper-700 opacity-50"></div>
        <div className="px-6 py-5 hairline-b flex justify-between items-center bg-[#0C0A09]">
            <h3 className="text-xs font-serif font-bold tracking-[0.2em] text-copper-400 uppercase">Comparative Value Matrix</h3>
            <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-copper-500 shadow-[0_0_5px_rgba(184,115,51,0.8)] animate-pulse"></span>
                <span className="h-2 w-2 rounded-full bg-gray-800"></span>
            </div>
        </div>
        <div className="p-1">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/[0.02]">
                        <th className="py-5 px-4 md:px-8 text-[10px] uppercase tracking-wider text-gray-500 font-medium w-1/3 hairline-b">Feature</th>
                        <th className="py-5 px-4 md:px-8 text-[10px] uppercase tracking-wider text-gray-300 font-medium w-1/3 text-center hairline-l hairline-b">HDFC Infinia</th>
                        <th className="py-5 px-4 md:px-8 text-[10px] uppercase tracking-wider text-gray-300 font-medium w-1/3 text-center hairline-l hairline-b">Axis Magnus</th>
                    </tr>
                </thead>
                <tbody className="text-sm font-light text-gray-400">
                    {data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                            <td className={`py-5 px-4 md:px-8 text-gray-300 ${idx < data.length - 1 ? 'hairline-b' : ''}`}>{row.feature}</td>
                            <td className={`py-5 px-4 md:px-8 text-center hairline-l ${idx < data.length - 1 ? 'hairline-b' : ''}`}>
                                {row.infiniaHighlight ? (
                                    <span className="text-gold-stamped font-medium animate-sheen inline-block">{row.infinia}</span>
                                ) : (
                                    <span className="text-white">{row.infinia}</span>
                                )}
                            </td>
                            <td className={`py-5 px-4 md:px-8 text-center text-gray-400 hairline-l ${idx < data.length - 1 ? 'hairline-b' : ''}`}>{row.magnus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// Strategy Card Component
const StrategyCard = () => (
    <div className="bg-[#0F0C0A] border border-copper-500/30 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between shadow-strategy-glow relative overflow-hidden animate-slide-up-bounce" style={{ animationDelay: '0.9s' }}>
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-gold-400 via-primary-light to-gold-400"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400/5 via-transparent to-transparent opacity-50"></div>
        <div className="flex items-start gap-5 relative z-10">
            <div className="p-2.5 bg-gold-400/10 rounded border border-gold-400/20 shrink-0">
                <span className="material-symbols-outlined text-gold-400 text-xl animate-pulse-slow">lightbulb</span>
            </div>
            <div>
                <h4 className="text-primary-light text-xs font-bold uppercase tracking-wider mb-2">Smart Strategy</h4>
                <p className="text-gray-400 text-xs leading-relaxed max-w-md">
                    Utilize Infinia for direct flight bookings via SmartBuy (16.5% return). Reserve Magnus points for transfer to Accor Hotels during bonus periods.
                </p>
            </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0 relative z-10">
            <button className="flex-1 md:flex-none px-6 py-3 rounded bg-transparent border border-copper-500/40 text-copper-400 text-xs font-medium hover:border-gold-400 hover:text-primary-light transition-all duration-300 whitespace-nowrap group">
                <span className="group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all">Download PDF</span>
            </button>
            <button className="flex-1 md:flex-none px-6 py-3 rounded bg-gold-btn-gradient text-espresso-dark font-bold text-xs shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-golden-glow hover:brightness-110 transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5">
                Apply Strategy
            </button>
        </div>
    </div>
);

// AI Response Component
const AIResponse = ({ content, showTable = true, showStrategy = true }) => (
    <div className="flex gap-6">
        <div className="flex-shrink-0 relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <AIAvatar size="sm" />
        </div>
        <div className="flex-1 space-y-8 animate-unfurl origin-top" style={{ animationDelay: '0.3s' }}>
            <div className="prose prose-invert max-w-none">
                <p className="text-gray-200 font-light leading-relaxed text-sm animate-typewriter" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            {showTable && <ComparisonTable data={sampleComparisonData} />}
            {showStrategy && <StrategyCard />}
        </div>
    </div>
);

// Follow-up Input Component
const FollowUpInput = ({ value, onChange, onSubmit }) => (
    <div className="absolute bottom-0 left-0 w-full z-40 bg-gradient-to-t from-[#0A0806] via-[#0A0806] to-transparent pt-12 pb-6 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-copper-500/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
                <div className="relative flex items-center bg-[#0A0806] rounded-full shadow-slot border border-copper-500/40 transition-all duration-500 group-focus-within:border-copper-500 group-focus-within:shadow-[inset_0_2px_5px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(184,115,51,0.25)] overflow-hidden">
                    <input
                        className="w-full bg-transparent border-0 focus:ring-0 text-copper-400 text-sm px-6 py-4 placeholder-gray-600 font-light tracking-wide outline-none"
                        placeholder="Ask follow-up..."
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                    />
                    <button
                        className="mr-2 p-2 rounded-full hover:bg-copper-500/10 text-gray-500 hover:text-copper-500 transition-all duration-300 transform active:scale-95"
                        onClick={onSubmit}
                    >
                        <span className="material-symbols-outlined text-xl">send</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default function PerkAI() {
    const [history, setHistory] = useState([
        { id: 1, title: 'Infinia vs Magnus' },
        { id: 2, title: 'Amazon Voucher Rates' },
        { id: 3, title: 'London Lounge Access' },
    ]);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [followUpQuery, setFollowUpQuery] = useState('');

    // Pinned items remain static/mocked for now, but clickable
    const pinnedItems = [
        { id: 1, title: 'Monthly Optimization' },
    ];

    const handleSubmit = () => {
        if (!query.trim()) return;

        // Add user message
        const userMessage = { type: 'user', content: query };

        // Add to history if not already present
        setHistory(prev => {
            const exists = prev.some(item => item.title.toLowerCase() === query.toLowerCase());
            if (!exists) {
                return [{ id: Date.now(), title: query }, ...prev].slice(0, 10); // Keep last 10
            }
            return prev;
        });

        // Add AI response (demo content)
        const aiResponse = {
            type: 'ai',
            content: `Based on current devaluation trends and transfer ratios, <span class="text-gold-stamped font-semibold">HDFC Infinia</span> retains superior <span class="text-gold-stamped font-semibold">Effective ROI</span> for generic travel bookings via SmartBuy. However, Axis Magnus still offers competitive value for specific <span class="text-gold-stamped font-semibold">Transfer Partners</span> if you maintain the burgundy status tier.`
        };

        setMessages([userMessage, aiResponse]);
        setQuery('');
    };

    const handleHistoryClick = (itemTitle) => {
        setQuery(''); // Clear current input
        const userMessage = { type: 'user', content: itemTitle };
        const aiResponse = {
            type: 'ai',
            content: `Start new analysis for: <span class="text-gold-stamped font-semibold">${itemTitle}</span>. Retrieving latest data points and community valuations...`
        };
        setMessages([userMessage, aiResponse]);
    };

    const handleFollowUp = () => {
        if (!followUpQuery.trim()) return;

        const userMessage = { type: 'user', content: followUpQuery };
        const aiResponse = {
            type: 'ai',
            content: `Great follow-up question! Here's additional analysis based on your query about <span class="text-gold-stamped font-semibold">${followUpQuery}</span>...`,
            showTable: false,
            showStrategy: false
        };

        setMessages(prev => [...prev, userMessage, aiResponse]);
        setFollowUpQuery('');
    };

    // Handle clicking action tiles - triggers response with tile's query
    const handleTileClick = (tileQuery) => {
        const userMessage = { type: 'user', content: tileQuery };
        const aiResponse = {
            type: 'ai',
            content: `Based on current devaluation trends and transfer ratios, <span class="text-gold-stamped font-semibold">HDFC Infinia</span> retains superior <span class="text-gold-stamped font-semibold">Effective ROI</span> for generic travel bookings via SmartBuy. However, Axis Magnus still offers competitive value for specific <span class="text-gold-stamped font-semibold">Transfer Partners</span> if you maintain the burgundy status tier.`
        };
        setMessages([userMessage, aiResponse]);

        // Add tile click to history too
        setHistory(prev => {
            const exists = prev.some(item => item.title.toLowerCase() === tileQuery.toLowerCase());
            if (!exists) {
                return [{ id: Date.now(), title: tileQuery }, ...prev].slice(0, 10);
            }
            return prev;
        });
    };

    const hasMessages = messages.length > 0;

    return (
        <div className="flex flex-1 h-full overflow-hidden relative">
            {/* Background Layers */}
            <div className="liquid-bg animate-shimmer-bg"></div>
            <div className="noise-overlay"></div>

            {/* Sidebar - Desktop Only */}
            <aside className="hidden md:flex w-[280px] flex-col border-r border-[#2C211B] bg-leather flex-shrink-0 z-20 relative shadow-[5px_0_30px_rgba(0,0,0,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none opacity-20"></div>

                {/* Sidebar Header removed */}

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto py-6 px-0 space-y-8 relative z-10">
                    {/* History Section */}
                    <div className="animate-fade-in-up px-6" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-xs font-bold tracking-[0.3em] text-copper-400/80 mb-4 uppercase border-b border-copper-500/10 pb-2">History</h3>
                        <ul className="space-y-1">
                            {history.map((item, idx) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleHistoryClick(item.title)}
                                        className={`w-full text-left px-4 py-3 rounded text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all group flex items-center border-l ${idx === 0 ? 'border-copper-500/50 bg-white/5' : 'border-transparent hover:border-copper-500/50'}`}
                                    >
                                        <span className={`material-symbols-outlined text-lg mr-4 transition-colors font-light ${idx === 0 ? 'text-copper-500' : 'text-gray-600 group-hover:text-copper-500'}`}>history</span>
                                        <span className="truncate font-light tracking-wide text-xs">{item.title}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pinned Section */}
                    <div className="animate-fade-in-up px-6" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-4 border-b border-copper-500/10 pb-2">
                            <h3 className="text-xs font-bold tracking-[0.3em] text-copper-400/80 uppercase">Pinned</h3>
                            <button className="text-gray-600 hover:text-copper-500 transition-colors">
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                        <ul className="space-y-1">
                            {pinnedItems.map((item) => (
                                <li key={item.id} className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-copper-500 shadow-[0_0_8px_rgba(184,115,51,0.8)]"></div>
                                    <button
                                        onClick={() => handleHistoryClick(item.title)}
                                        className="w-full text-left px-4 py-3 rounded-r text-sm text-white bg-gradient-to-r from-copper-500/5 to-transparent transition-all group flex items-center"
                                    >
                                        <span className="material-symbols-outlined text-lg mr-4 text-copper-500 transition-colors rotate-45 filled font-light">push_pin</span>
                                        <span className="truncate font-medium tracking-wide text-xs text-copper-400">{item.title}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-6 border-t border-[#2C211B] space-y-2 animate-fade-in-up relative z-10" style={{ animationDelay: '0.3s' }}>
                    <button className="w-full text-left px-4 py-3 rounded text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center group">
                        <span className="material-symbols-outlined text-lg mr-4 text-gray-600 group-hover:text-copper-500 font-light">settings</span>
                        <span className="font-light tracking-wide text-xs">AI Settings</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative bg-[#0A0806]">
                {/* Spotlight Effect */}
                <div className="absolute top-0 left-0 w-full h-[700px] spotlight pointer-events-none z-0"></div>



                {/* Content Area */}
                <div className={`flex-1 overflow-y-auto relative flex flex-col ${hasMessages ? 'justify-start p-6 md:p-12' : 'justify-start items-center px-6 pt-6 pb-8 md:px-12 md:pt-8 md:pb-12'} z-10 scroll-smooth`}>

                    {!hasMessages ? (
                        /* Landing Page View */
                        <div className="w-full max-w-4xl flex flex-col items-center relative space-y-8 md:space-y-10">

                            {/* AI Greeting Section */}
                            <div className="text-center space-y-6 md:space-y-8 animate-fade-in-up flex flex-col items-center">
                                {/* Title */}
                                <div className="space-y-4">
                                    <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-medium leading-tight tracking-[0.05em] drop-shadow-lg">
                                        HELLO, I'M <span className="text-gold-stamped font-bold text-4xl md:text-5xl lg:text-6xl block mt-3">PERK AI.</span>
                                    </h1>
                                    <p className="text-sm md:text-base lg:text-lg text-gray-400 max-w-xl mx-auto font-sans font-light tracking-wide leading-relaxed opacity-80">
                                        Your private wealth analyst for credit optimization,<br />
                                        <span className="text-copper-400">real-time rates</span>, and strategic redemptions.
                                    </p>
                                </div>
                            </div>

                            {/* Search Input */}
                            <div className="w-full max-w-2xl animate-fade-in-up z-20" style={{ animationDelay: '0.2s' }}>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-copper-500/5 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
                                    <div className="relative flex items-center bg-[#050404] rounded-full shadow-slot border border-copper-500/30 transition-all duration-500 group-focus-within:animate-pulse-copper overflow-hidden">
                                        <input
                                            className="w-full bg-transparent border-0 focus:ring-0 text-copper-400 text-base px-6 md:px-8 py-4 md:py-5 placeholder-gray-700 font-light tracking-wide shadow-inner outline-none"
                                            placeholder="Ask about optimized rewards..."
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                        />
                                        <button
                                            className="mr-3 p-2 md:p-3 rounded-full hover:bg-copper-500/10 text-gray-600 hover:text-copper-500 transition-all duration-300 transform active:scale-95 group/btn"
                                            onClick={handleSubmit}
                                        >
                                            <span className="material-symbols-outlined text-xl md:text-2xl font-extralight group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">arrow_outward</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Tiles */}
                            <div className="w-full max-w-3xl">
                                <p className="text-center text-[9px] font-bold tracking-[0.4em] text-gray-600 mb-6 md:mb-8 uppercase opacity-60 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Intelligence & Actions</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                                    {actionTiles.map((tile, idx) => (
                                        <button
                                            key={tile.title}
                                            onClick={() => handleTileClick(tile.query)}
                                            className="animate-fade-in-up flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded bg-[#080808]/90 border border-white/5 hover:border-copper-500/40 hover:shadow-tile-hover hover:-translate-y-1 transition-all duration-500 group text-left relative overflow-hidden backdrop-blur-sm"
                                            style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-copper-500/[0.03] to-transparent pointer-events-none"></div>
                                            <div className="h-10 w-10 md:h-12 md:w-12 rounded flex items-center justify-center bg-[#0F0C0A] border border-white/5 group-hover:border-copper-500/40 transition-colors shrink-0 shadow-inner">
                                                <span className="material-symbols-outlined text-copper-500 font-thin text-xl md:text-2xl">{tile.icon}</span>
                                            </div>
                                            <div>
                                                <span className="block text-gray-300 group-hover:text-copper-400 transition-colors text-sm font-medium tracking-wide">{tile.title}</span>
                                                <span className="block text-gray-600 text-[10px] uppercase tracking-wider mt-1">{tile.subtitle}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* HDFC Button */}
                                <div className="flex justify-center mt-6 md:mt-8 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                                    <button className="flex items-center gap-3 px-5 md:px-6 py-3 rounded border border-copper-500/10 bg-[#080808] hover:border-copper-500/40 hover:text-white text-gray-400 transition-all duration-300 group">
                                        <span className="material-symbols-outlined text-copper-500 font-thin text-lg">account_balance</span>
                                        <span className="text-xs font-light tracking-widest uppercase">HDFC Imperia Eligibility Check</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Response View */
                        <div className="w-full max-w-4xl mx-auto flex flex-col space-y-8 pb-32">
                            {messages.map((msg, idx) => (
                                msg.type === 'user' ? (
                                    <UserMessage key={idx} content={msg.content} />
                                ) : (
                                    <AIResponse
                                        key={idx}
                                        content={msg.content}
                                        showTable={msg.showTable !== false}
                                        showStrategy={msg.showStrategy !== false}
                                    />
                                )
                            ))}
                        </div>
                    )}
                </div>

                {/* Follow-up Input (only shown in response view) */}
                {hasMessages && (
                    <FollowUpInput
                        value={followUpQuery}
                        onChange={setFollowUpQuery}
                        onSubmit={handleFollowUp}
                    />
                )}
            </main>
        </div>
    );
}
