import { useState } from 'react';

const features = [
    { id: 'lounge', label: 'Lounge Access', checked: true },
    { id: 'fuel', label: 'Fuel Surcharge' },
    { id: 'shopping', label: 'Shopping Rewards' },
    { id: 'movie', label: 'Movie Offers' },
    { id: 'dining', label: 'Dining' },
    { id: 'golf', label: 'Golf Games' },
    { id: 'insurance', label: 'Insurance' },
];

const creditCards = [
    {
        id: 1,
        name: 'Infinia Metal Edition',
        bank: 'HDFC BANK',
        cardNumber: '•••• •••• •••• 8892',
        holder: 'Aditya R.',
        network: 'VISA',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwz4Z0xXa-7CC9PqVv3-PtCozR5yso5WmX0zoV81jKWmZamgG9AC3SwQpJrMKStrYByKf_R1tBMdXpDy4epfXeVZpkP3pJXFsGyqEyVur80ZnoHl_zjbUT1oLhy14a6KUJcEW2pxdZzJvh9X2OxxXM0FcDvwjHi6pMzAiI5DVJSUdJul5nnn_sbHeVrKY4CuEsmaTeqODk6OWfv86d5WC4ONaQjoDOSXs19Dnoozaj_Xkg2zwJ9BG2zTkG6bv4Ju6laEOlww0QHj5b',
        cardStyle: 'from-[#1a1a1a] via-[#2d2d2d] to-[#000000]',
        stats: [
            { label: 'Reward Rate', value: '3.3% - 33%' },
            { label: 'SmartBuy Cap', value: '₹ 15,000 / mo' },
        ],
        shadowHover: 'group-hover:shadow-gold-500/20',
    },
    {
        id: 2,
        name: 'Platinum Charge',
        bank: 'AMERICAN EXPRESS',
        cardNumber: '3769 •••••• •••••',
        holder: 'Aditya R.',
        network: 'AMEX',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzGpxxlGUDm-_SWVTSmab0Xf0wPcjYLDlfVV76AH4FxatJrvnK6bG1ZcX9cl8isFAlPxITHAfPg2-0kiLiriVczzKtU5cpnujLPYcLDYrtSFxmg2qJhDdmtBSnGpMKlJbYMv1BpqnD37apL6cv_sbr3qWS5WRmPLLaWdX9OjJH6SXn-Ib5Ry9vATasUS_Vtw93XEvh354E-h8GySmj7VvD__54ngudEYaCi6XAvrc3MOYp6QCxeFoaUcileK577XIHL0oJyqTL9UhT',
        cardStyle: 'gray-platinum',
        stats: [
            { label: 'Taj Vouchers', value: '₹ 45,000', highlight: true },
            { label: 'Concierge', value: '24/7 Global' },
        ],
        shadowHover: 'group-hover:shadow-white/10',
    },
    {
        id: 3,
        name: 'Magnus Burgundy',
        bank: 'Axis Bank',
        bankTag: 'Burgundy',
        cardNumber: '•••• •••• •••• 4512',
        holder: 'Aditya R.',
        network: 'Mastercard',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAHlIqVq9QfwG71aVBY09vDALuR7EgDSnhqWTSP0Yw53IByx7hYMkMOTfyLax6P5prTVonVJhDOD-R0OUioMvFM67zvcXXGmqzV3BJU_VmlxI5YWR5sxFCxTVubyt9pmlDeJ2cZVCF0sIsd1RS4LfQdvcPazEYxm3zXS0RxhMTnUcMKN02tcYrmYQlw-BGzbEfvaSDL-6ycPYcUpR-2ghBoIR-rnVysgYkhlGH49_jmFiDmEbClyNu4g1OkAs8BANUT3goxu__2n1k',
        cardStyle: 'from-[#3f190d] to-[#1a0505]',
        stats: [
            { label: 'Monthly Milestone', value: '80%', type: 'progress' },
            { label: 'Edge Points', value: '25,000' },
        ],
        shadowHover: 'group-hover:shadow-copper-900/50',
    },
    {
        id: 4,
        name: 'SBI Aurum',
        bank: 'AURUM',
        cardNumber: '•••• •••• •••• 1122',
        holder: 'Aditya R.',
        network: 'VISA',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI480D_1fvTMTaaqeEEmfn4LF6UtoVER8D_yFZrlUAeHuOy_Fano3NNm64YPraybux_Toih71VizM6rzIJJxYPFl-q256Q_NvnPtfL0hf4LrUTZbSKL50UP5MUiK52Mh3xxeA0xOoFHfeI5xif0OkgJZioXMaqU-KVNcbM1OFIrYuGq-QIGLGsBEePGUitRTIIeAEwSAwkVKFVA859DH2Vy7Qm5JA2DGOgsR6urepX16LcOyHSd_JBGQZOcZJ-5S-xN8Q28D1tutwM',
        cardStyle: 'aurum',
        stats: [
            { label: 'Tata Cliq', value: '₹ 5,000 Due' },
            { label: 'BookMyShow', value: '4 Free tix' },
        ],
        shadowHover: 'group-hover:shadow-copper-600/40',
    },
];

export default function Cards() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFeatures, setSelectedFeatures] = useState(['lounge']);
    const [compareList, setCompareList] = useState([]);

    const toggleFeature = (id) => {
        setSelectedFeatures(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const toggleCompare = (cardId) => {
        setCompareList(prev =>
            prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
        );
    };

    return (
        <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar */}
            <aside className="w-80 flex-shrink-0 flex-col bg-espresso-900 border-r border-gold-500/10 overflow-y-auto z-20 hidden lg:flex">
                <div className="p-6 flex flex-col gap-8">
                    {/* Search */}
                    <div className="relative w-full">
                        <label className="text-xs font-bold text-copper-400 uppercase tracking-widest mb-2 block">Refine Search</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/50 text-[18px]">filter_list</span>
                            <input
                                className="bg-espresso-800/50 border border-gold-500/20 rounded-lg py-2.5 pl-10 pr-4 text-sm text-gold-100 focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 w-full placeholder-gold-500/30"
                                placeholder="Search cards by name..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Features Filter */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h4 className="text-gold-100 text-sm font-semibold uppercase tracking-wider">Features & Benefits</h4>
                        </div>
                        <div className="flex flex-col gap-3">
                            {features.map((feature) => (
                                <label key={feature.id} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            checked={selectedFeatures.includes(feature.id)}
                                            onChange={() => toggleFeature(feature.id)}
                                            className="peer appearance-none w-4 h-4 rounded border border-copper-400/30 bg-espresso-800/50 checked:bg-copper-500 checked:border-copper-500 focus:ring-0 transition-all"
                                            type="checkbox"
                                        />
                                        <span className="material-symbols-outlined text-white absolute inset-0 text-[12px] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
                                    </div>
                                    <span className="text-ivory/70 text-sm font-medium group-hover:text-ivory transition-colors">{feature.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-espresso-900">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-copper-900/10 to-transparent pointer-events-none z-0"></div>

                <div className="flex-1 overflow-y-auto z-10 p-6 lg:p-10 scroll-smooth pb-24">
                    <div className="max-w-7xl mx-auto flex flex-col gap-8">
                        {/* Header */}
                        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 border-b border-gold-500/10 pb-6">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-ivory">
                                    Explore <span className="text-gradient-gold">Premium Credit Cards</span>
                                </h2>
                                <p className="text-gold-100/50 text-sm font-light max-w-xl">
                                    Discover and compare elite credit cards to maximize your rewards and benefits.
                                </p>
                            </div>

                            {/* Filter Dropdowns */}
                            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                                <div className="relative group flex-shrink-0">
                                    <button className="h-10 px-4 rounded-lg bg-espresso-800 border border-gold-500/20 text-gold-100 text-sm font-medium flex items-center gap-2 hover:bg-espresso-700 hover:border-gold-500/40 transition-all justify-between min-w-[130px]">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px] text-copper-400">account_balance</span>
                                            All Banks
                                        </div>
                                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
                                    </button>
                                </div>
                                <div className="h-6 w-px bg-gold-500/10"></div>
                                <div className="relative group flex-shrink-0">
                                    <button className="h-10 px-4 rounded-lg bg-espresso-800 border border-gold-500/20 text-gold-100 text-sm font-medium flex items-center gap-2 hover:bg-espresso-700 hover:border-gold-500/40 transition-all justify-between min-w-[130px]">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px] text-copper-400">sort</span>
                                            Sort by
                                        </div>
                                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {creditCards.map((card) => (
                                <div key={card.id} className="group relative flex flex-col gap-4">
                                    {/* Card Visual */}
                                    <div className={`relative w-full aspect-[1.586] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ${card.shadowHover} group-hover:scale-[1.02] transition-all duration-300 transform-gpu border border-white/5`}>
                                        <div
                                            className="absolute inset-0 bg-cover bg-center z-0"
                                            style={{
                                                backgroundImage: `url("${card.image}")`,
                                                filter: card.cardStyle === 'gray-platinum'
                                                    ? 'grayscale(1) brightness(0.6) sepia(0.2)'
                                                    : card.cardStyle === 'aurum'
                                                        ? 'brightness(0.2)'
                                                        : 'brightness(0.4) sepia(1) hue-rotate(180deg) saturate(2)'
                                            }}
                                        ></div>

                                        {/* Card overlay based on style */}
                                        {card.cardStyle === 'gray-platinum' ? (
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 opacity-90 mix-blend-overlay"></div>
                                        ) : card.cardStyle === 'aurum' ? (
                                            <>
                                                <div className="absolute inset-0 bg-[#111] opacity-95"></div>
                                                <div className="absolute inset-0 border-[1px] border-copper-600/30 m-3 rounded-xl"></div>
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 border border-copper-600/10 rounded-full"></div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`absolute inset-0 bg-gradient-to-br ${card.cardStyle} opacity-90 mix-blend-multiply`}></div>
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-gold-100/5 to-white/0 opacity-50"></div>
                                            </>
                                        )}

                                        {/* Card Content */}
                                        <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                                            <div className="flex justify-between items-start">
                                                <div className={`font-bold text-lg tracking-wider ${card.cardStyle === 'gray-platinum' ? 'text-black/80 mix-blend-hard-light' :
                                                        card.cardStyle === 'aurum' ? 'text-copper-500 font-serif text-xl' :
                                                            'text-white/90'
                                                    } ${card.bank === 'Axis Bank' ? 'italic' : ''}`}>
                                                    {card.bank}
                                                </div>
                                                {card.bankTag ? (
                                                    <div className="text-white/60 text-xs uppercase tracking-widest font-light border border-white/20 px-2 py-0.5 rounded">{card.bankTag}</div>
                                                ) : (
                                                    <span className={`material-symbols-outlined text-3xl ${card.cardStyle === 'gray-platinum' ? 'text-black/60' : 'text-white/50'}`}>contactless</span>
                                                )}
                                            </div>

                                            {card.network !== 'Mastercard' && card.cardStyle !== 'aurum' && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-8 bg-gold-600/30 rounded-md border border-gold-500/30 flex items-center justify-center">
                                                        <div className="w-8 h-5 border border-gold-500/50 rounded-sm"></div>
                                                    </div>
                                                    <span className={`material-symbols-outlined ${card.cardStyle === 'gray-platinum' ? 'text-black/80' : 'text-white/80'}`}>wifi</span>
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-1 mt-auto">
                                                <div className={`font-mono text-xl tracking-widest drop-shadow-md ${card.cardStyle === 'gray-platinum' ? 'text-black/80 font-bold' :
                                                        card.cardStyle === 'aurum' ? 'text-copper-100/60' :
                                                            'text-white/90'
                                                    }`}>
                                                    {card.cardNumber}
                                                </div>
                                                <div className="flex justify-between items-end mt-2">
                                                    <div className={`text-xs uppercase tracking-wider font-semibold ${card.cardStyle === 'gray-platinum' ? 'text-black/70 font-bold' :
                                                            card.cardStyle === 'aurum' ? 'text-copper-100/40' :
                                                                'text-white/60'
                                                        }`}>
                                                        {card.holder}
                                                    </div>
                                                    {card.network === 'Mastercard' ? (
                                                        <div className="flex gap-1">
                                                            <div className="size-6 rounded-full bg-white/80"></div>
                                                            <div className="size-6 rounded-full bg-white/50 -ml-3"></div>
                                                        </div>
                                                    ) : (
                                                        <div className={`font-bold italic text-2xl leading-none ${card.network === 'AMEX' ? 'text-blue-900 text-xl' :
                                                                card.cardStyle === 'aurum' ? 'text-white opacity-50' :
                                                                    'text-white'
                                                            }`}>
                                                            {card.network}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Decorative elements */}
                                            {card.cardStyle !== 'aurum' && (
                                                <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-32 h-32 blur-3xl rounded-full pointer-events-none ${card.bank === 'Axis Bank' ? 'bg-red-600/10 top-0 right-0 w-40 h-40' : 'bg-gold-500/10'
                                                    }`}></div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Info Panel */}
                                    <div className="rounded-xl p-4 flex flex-col gap-3 bg-espresso-800/30 backdrop-blur-xl border border-gold-400/10 shadow-lg shadow-black/30">
                                        <div className="flex justify-between items-center border-b border-gold-500/10 pb-3">
                                            <h3 className="text-lg font-bold text-ivory">{card.name}</h3>
                                            <div className="flex items-center gap-3">
                                                <label className="flex items-center gap-1.5 cursor-pointer group/cmp" title="Add to Compare">
                                                    <input
                                                        checked={compareList.includes(card.id)}
                                                        onChange={() => toggleCompare(card.id)}
                                                        className="appearance-none peer w-3.5 h-3.5 border border-gold-500/30 rounded bg-espresso-900/50 checked:bg-copper-500 checked:border-copper-500 focus:ring-0"
                                                        type="checkbox"
                                                    />
                                                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-500/50 peer-checked:text-copper-400 group-hover/cmp:text-gold-100 transition-colors">Compare</span>
                                                </label>
                                                <div className="h-4 w-px bg-gold-500/10"></div>
                                                <button className="text-gold-500/30 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gold-500/5" title="Add to Favourites">
                                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {card.stats.map((stat, idx) => (
                                                <div key={idx}>
                                                    <p className="text-gold-100/40 text-xs">{stat.label}</p>
                                                    {stat.type === 'progress' ? (
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                                                                <div className="h-full bg-copper-400" style={{ width: stat.value }}></div>
                                                            </div>
                                                            <span className="text-xs text-ivory">{stat.value}</span>
                                                        </div>
                                                    ) : (
                                                        <p className={`font-medium ${stat.highlight ? 'text-copper-400' : 'text-ivory'}`}>{stat.value}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <button className="w-full mt-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gold-300 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                            View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 border-t border-gold-500/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gold-100/40 text-sm">
                            <p>© 2024 CardPerks. Premium Financial Dashboard.</p>
                            <div className="flex gap-6">
                                <a className="hover:text-gold-100 transition-colors" href="#">Privacy</a>
                                <a className="hover:text-gold-100 transition-colors" href="#">Terms</a>
                                <a className="hover:text-gold-100 transition-colors" href="#">Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Compare FAB */}
            {compareList.length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
                    <button className="bg-copper-500 hover:bg-copper-600 text-white pl-6 pr-8 py-3 rounded-full shadow-2xl shadow-copper-500/30 flex items-center gap-3 transition-all transform hover:scale-105 group border border-white/10">
                        <div className="relative">
                            <span className="material-symbols-outlined text-[24px]">compare_arrows</span>
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-espresso-950 text-[9px] font-bold text-copper-400 ring-2 ring-copper-500">
                                {compareList.length}
                            </span>
                        </div>
                        <span className="font-medium tracking-wide">Compare Cards</span>
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
            )}
        </div>
    );
}
