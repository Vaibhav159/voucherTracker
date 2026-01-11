import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { toSlug, fromSlug } from '../utils/slugify';

const creditCards = [
    {
        id: 1,
        name: 'Infinia Metal',
        bank: 'HDFC Bank',
        network: 'Super Premium',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwz4Z0xXa-7CC9PqVv3-PtCozR5yso5WmX0zoV81jKWmZamgG9AC3SwQpJrMKStrYByKf_R1tBMdXpDy4epfXeVZpkP3pJXFsGyqEyVur80ZnoHl_zjbUT1oLhy14a6KUJcEW2pxdZzJvh9X2OxxXM0FcDvwjHi6pMzAiI5DVJSUdJul5nnn_sbHeVrKY4CuEsmaTeqODk6OWfv86d5WC4ONaQjoDOSXs19Dnoozaj_Xkg2zwJ9BG2zTkG6bv4Ju6laEOlww0QHj5b',
        badge: 'Ultimate Luxury',
        badgeStyle: 'bg-gradient-to-r from-copper-600 to-copper-400 text-white shadow-md',
        tags: [
            { icon: 'diamond', text: 'Ultimate Luxury' },
            { icon: 'flight', text: 'Unlimited Lounge' }
        ],
        stats: [
            { label: 'Reward Rate', value: '3.3%' },
            { label: 'Fee', value: '₹12.5k' }
        ],
        statsDetail: { // For Grid View
            rewardRate: '3.3%',
            fee: '₹12.5k',
            feeSub: '- ₹50k'
        },
        icon: 'diamond', // For Grid Cards
        iconBg: 'bg-gradient-to-br from-white to-gray-200',
        isDark: true,
        animateSheen: true
    },
    {
        id: 2,
        name: 'Platinum Charge',
        bank: 'American Express',
        network: 'Metal',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzGpxxlGUDm-_SWVTSmab0Xf0wPcjYLDlfVV76AH4FxatJrvnK6bG1ZcX9cl8isFAlPxITHAfPg2-0kiLiriVczzKtU5cpnujLPYcLDYrtSFxmg2qJhDdmtBSnGpMKlJbYMv1BpqnD37apL6cv_sbr3qWS5WRmPLLaWdX9OjJH6SXn-Ib5Ry9vATasUS_Vtw93XEvh354E-h8GySmj7VvD__54ngudEYaCi6XAvrc3MOYp6QCxeFoaUcileK577XIHL0oJyqTL9UhT',
        badge: 'Metal Card',
        badgeStyle: 'bg-gradient-to-r from-gray-500 to-gray-400 text-white border border-white/10',
        tags: [
            { icon: 'support_agent', text: '24/7 Concierge' },
            { icon: 'hotel', text: 'Taj & Marriott Gold' }
        ],
        stats: [
            { label: 'Taj Vouchers', value: '₹ 45k' },
            { label: 'Concierge', value: '24/7' }
        ],
        statsDetail: {
            rewardRate: '2.5%',
            fee: '₹60k',
            feeSub: '- ₹70k'
        },
        icon: 'savings',
        iconBg: 'bg-gradient-to-br from-white to-gray-200',
        isGrayscale: true
    },
    {
        id: 3,
        name: 'Magnus Burgundy',
        bank: 'Axis Bank',
        network: 'World Elite',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAHlIqVq9QfwG71aVBY09vDALuR7EgDSnhqWTSP0Yw53IByx7hYMkMOTfyLax6P5prTVonVJhDOD-R0OUioMvFM67zvcXXGmqzV3BJU_VmlxI5YWR5sxFCxTVubyt9pmlDeJ2cZVCF0sIsd1RS4LfQdvcPazEYxm3zXS0RxhMTnUcMKN02tcYrmYQlw-BGzbEfvaSDL-6ycPYcUpR-2ghBoIR-rnVysgYkhlGH49_jmFiDmEbClyNu4g1OkAs8BANUT3goxu__2n1k',
        badge: 'World Elite',
        badgeStyle: 'bg-gradient-to-r from-purple-900 to-purple-800 text-white border border-white/10',
        tags: [
            { text: '5X Rewards', isGradient: true },
            { text: 'Fast Track', isBordered: true }
        ],
        stats: [
            { label: 'Milestone', isProgress: true, progress: '80%' },
            { label: 'Bonus', value: '25k Points' }
        ],
        statsDetail: {
            rewardRate: '4.8%',
            fee: '₹30k',
            feeSub: '- ₹35k'
        },
        icon: 'account_balance',
        iconBg: 'bg-gradient-to-br from-white to-gray-200',
        isSepia: true
    },
    {
        id: 4,
        name: 'Atlas Miles',
        bank: 'Axis Bank',
        network: 'Travel',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI480D_1fvTMTaaqeEEmfn4LF6UtoVER8D_yFZrlUAeHuOy_Fano3NNm64YPraybux_Toih71VizM6rzIJJxYPFl-q256Q_NvnPtfL0hf4LrUTZbSKL50UP5MUiK52Mh3xxeA0xOoFHfeI5xif0OkgJZioXMaqU-KVNcbM1OFIrYuGq-QIGLGsBEePGUitRTIIeAEwSAwkVKFVA859DH2Vy7Qm5JA2DGOgsR6urepX16LcOyHSd_JBGQZOcZJ-5S-xN8Q28D1tutwM',
        customArt: true,
        badge: 'Best Travel',
        badgeStyle: 'bg-gradient-to-r from-blue-900 to-blue-800 text-white border border-white/10',
        tags: [
            { text: 'Invite Only', isGradient: true }
        ],
        stats: [
            { label: 'Benefits', value: '₹ 5k Tata' },
            { label: 'Movies', value: '4 Tix' }
        ],
        statsDetail: {
            rewardRate: '5.0%',
            fee: '₹5k',
            feeSub: '- ₹10k'
        },
        icon: 'flight_takeoff',
        iconBg: 'bg-gradient-to-br from-white to-gray-200',
        isDark: true
    },
];

export default function Cards() {
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCard, setSelectedCard] = useState(null);
    const { isFavorite, toggleFavorite, getFavoriteCount, clearFavorites, notification } = useFavorites();
    const [compareCards, setCompareCards] = useState(new Set());

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

    return (
        <div className="flex flex-1 overflow-hidden relative font-display text-gold-100 bg-espresso-950">

            {/* Sidebar */}
            <aside className="w-72 flex-shrink-0 flex flex-col bg-espresso-850 bg-espresso-texture border-r-2 border-copper-500/30 overflow-y-auto z-20 hidden lg:flex scrollbar-thin scrollbar-thumb-espresso-700 shadow-2xl relative">
                <div className="p-6 flex flex-col gap-8 flex-1">
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-copper-500 text-[24px]">filter_list</span>
                            <h3 className="text-white text-lg font-serif font-bold tracking-wider uppercase">Filter Results</h3>
                        </div>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-copper-500 text-[20px] group-focus-within:text-gold-400 transition-colors">search</span>
                            <input
                                className="bg-espresso-900 border border-copper-500/40 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-copper-500 focus:shadow-glow-copper w-full placeholder-white/30 transition-all shadow-inner hover:border-copper-500/60"
                                placeholder="Search filters..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-5 pb-3 border-b border-copper-500/20">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-copper-500 text-[18px]">stars</span>
                                <h4 className="text-white text-xs font-bold uppercase tracking-widest font-display">Benefits</h4>
                            </div>
                            <button className="text-copper-400 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 group">Reset</button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {['Lounge Access', 'Golf Games', 'Concierge', 'No Forex Fee'].map((label, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group select-none">
                                    <input defaultChecked={idx === 0} className="hidden peer" type="checkbox" />
                                    <div className="w-5 h-5 rounded border border-copper-500/50 bg-espresso-950 flex items-center justify-center transition-all duration-300 peer-checked:bg-copper-500 peer-checked:border-copper-500 group-hover:border-copper-400 group-hover:shadow-[0_0_10px_rgba(205,127,50,0.2)]">
                                        <svg className="w-3.5 h-3.5 text-espresso-950 transform scale-0 transition-transform duration-200 font-bold" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </div>
                                    <span className="text-sm text-white font-medium group-hover:text-copper-300 transition-colors">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center justify-between mb-6 pt-4 border-t border-copper-500/20 mt-2">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-copper-500 text-[18px]">account_balance_wallet</span>
                                <h4 className="text-white text-xs font-bold uppercase tracking-widest font-display">Annual Fee</h4>
                            </div>
                        </div>
                        <div className="px-2">
                            <div className="relative h-6 flex items-center mb-2">
                                <input className="w-full z-20 opacity-0 absolute cursor-pointer" type="range" min="0" max="100000" defaultValue="60000" />
                                <div className="absolute w-full h-1 bg-espresso-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-copper-500" style={{ width: '60%' }}></div>
                                </div>
                                <div className="absolute left-[60%] w-5 h-5 rounded-full bg-gold-400 border-[3px] border-espresso-950 shadow-[0_0_10px_rgba(212,175,55,0.8)] pointer-events-none transform -translate-x-2.5"></div>
                            </div>
                            <div className="flex justify-between text-[11px] text-white/40 font-mono font-medium mt-3">
                                <span>₹0</span>
                                <span className="text-copper-400">Max: ₹60k</span>
                                <span>₹100k+</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-copper-500/20 bg-espresso-900/50 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="p-5 rounded-xl bg-espresso-850 bg-espresso-texture border-[3px] border-copper-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative overflow-hidden text-center isolate">
                        <div className="absolute inset-0 bg-espresso-texture opacity-20 mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-copper-500/20 via-transparent to-transparent pointer-events-none"></div>
                        <div className="flex flex-col items-center gap-3 mb-4 relative z-10">
                            <div className="size-12 rounded-full bg-espresso-950 border border-copper-400 flex items-center justify-center mb-1 shadow-[0_0_20px_rgba(205,127,50,0.3)] group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-copper-400 text-[24px]">workspace_premium</span>
                            </div>
                            <h5 className="text-white font-display text-sm font-bold tracking-widest uppercase">Go Premium</h5>
                        </div>
                        <p className="text-xs text-white/60 mb-5 font-display leading-relaxed relative z-10 px-1">Unlock metal cards, concierge services, and 0% forex fees.</p>
                        <button className="w-full py-2.5 rounded bg-transparent border border-copper-500 text-copper-400 hover:bg-gold-btn-gradient hover:text-espresso-950 hover:border-transparent text-xs font-bold uppercase tracking-wider transition-all btn-press relative z-10 shadow-lg group-hover:shadow-[0_0_25px_rgba(205,127,50,0.4)]">
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </aside>

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
                                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar">
                                    <span className="text-xs font-bold text-copper-500 tracking-widest uppercase shrink-0 flex items-center gap-2 mr-2">
                                        <span className="material-symbols-outlined text-[18px]">tune</span> Filters:
                                    </span>
                                    {['Bank', 'Sort', 'Network'].map((label, idx) => (
                                        <button key={idx} className="h-9 px-4 rounded-md border border-white/10 bg-espresso-800/50 flex items-center gap-2 cursor-pointer hover:border-copper-500 hover:bg-espresso-800 hover:text-white transition-all shrink-0 btn-press text-white/70 text-xs uppercase tracking-wider group">
                                            {label} <span className="text-white font-bold ml-1">{label === 'Bank' ? 'All Banks' : label === 'Sort' ? 'Popularity' : 'Any'}</span>
                                            <span className={`material-symbols-outlined text-copper-500 text-[16px] group-hover:text-copper-400 transition-transform ${label !== 'Sort' ? 'group-hover:rotate-180' : ''}`}>
                                                {label === 'Sort' ? 'sort' : 'expand_more'}
                                            </span>
                                        </button>
                                    ))}
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
                                                    {idx === 0 ? 'Flat discount on dining & luxury stay vouchers.' : 'Comprehensive insurance & global lounge access.'}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                <Link to={`/cards/${card.id}`} className="px-5 py-2 rounded border border-white/20 hover:border-copper-500 hover:bg-copper-500/10 text-xs font-bold uppercase tracking-widest text-white transition-all">View Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mt-4">
                            <div className="flex items-center justify-between mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <h3 className="text-2xl font-serif text-white/90">All Cards</h3>
                                <span className="text-xs font-bold text-copper-500 tracking-widest uppercase flex items-center gap-2">
                                    View: <span className="text-white">{viewMode === 'grid' ? 'Grid' : 'List'}</span>
                                </span>
                            </div>

                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {creditCards.map((card, idx) => (
                                        <article key={card.id} onClick={() => handleCardClick(card)} className="group relative flex flex-col rounded-xl overflow-hidden bg-espresso-850 bg-espresso-texture border border-copper-500/40 hover:border-copper-400 shadow-lg animate-pop-scale transition-all duration-500 hover:shadow-glow-copper shimmer-hover hover:-translate-y-1 cursor-pointer" style={{ animationDelay: `${0.25 + (idx * 0.1)}s` }}>
                                            <div className="p-6 flex flex-col h-full relative z-10">
                                                <div className="flex justify-between items-start mb-5">
                                                    <div className={`size-14 rounded-xl p-0.5 shadow-lg group-hover:shadow-glow-gold transition-all duration-500 ${card.iconBg}`}>
                                                        <div className="w-full h-full rounded-lg bg-white flex items-center justify-center border border-gray-100">
                                                            <span className="material-symbols-outlined text-espresso-950 text-[28px]">{card.icon}</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className={`transition-all hover:scale-110 p-1 ${isFavorite('cards', card.id) ? 'text-red-500' : 'text-white/20 hover:text-copper-500'}`}
                                                        onClick={(e) => handleToggleFavorite(e, card.id)}
                                                    >
                                                        <span
                                                            className="material-symbols-outlined text-[24px]"
                                                            style={isFavorite('cards', card.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                                                        >
                                                            favorite
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider w-fit shadow-md border ${card.badgeStyle}`}>
                                                        {card.badge}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-copper-400 transition-colors font-serif tracking-wide">{card.name}</h3>
                                                <p className="text-xs text-white/50 mb-6 font-light">{card.bank} • {card.network}</p>

                                                <div className="mt-auto border-t border-dashed border-copper-500/30 pt-4 flex items-end justify-between">
                                                    <div>
                                                        <p className="text-[10px] text-copper-400/80 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">trending_up</span> Reward Rate</p>
                                                        <p className="text-2xl text-gold-400 font-serif">{card.statsDetail.rewardRate}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-1">Fee</p>
                                                        <p className="text-white text-sm font-medium">{card.statsDetail.fee} <span className="text-xs text-white/40">{card.statsDetail.feeSub}</span></p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3 mt-6">
                                                    <button className="flex-1 py-2.5 rounded bg-transparent border border-copper-500 text-copper-400 text-xs font-bold uppercase tracking-widest hover:bg-gold-btn-gradient hover:text-espresso-950 hover:border-transparent transition-all btn-press shadow-[0_0_10px_rgba(205,127,50,0.1)] hover:shadow-[0_0_20px_rgba(205,127,50,0.4)]">
                                                        Check Eligibility
                                                    </button>
                                                    <button
                                                        className={`size-10 rounded border flex items-center justify-center transition-all ${compareCards.has(card.id) ? 'border-copper-500 bg-copper-500/20 text-copper-400' : 'border-copper-500/30 text-white/40 hover:text-copper-400 hover:border-copper-500 hover:bg-copper-500/10'}`}
                                                        title="Compare"
                                                        onClick={(e) => toggleCompare(e, card.id)}
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                // List View
                                <div className="flex flex-col bg-espresso-850/20 rounded-2xl border border-white/5 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                    {creditCards.map((card, idx) => (
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
                                                    {card.animateSheen ? (
                                                        <span className="hidden sm:inline-block px-2 py-0.5 bg-gradient-to-r from-gold-400 to-gold-600 text-espresso-950 rounded text-[10px] font-bold shadow-sm whitespace-nowrap animate-sheen bg-[length:200%_auto]">Unlimited Lounge</span>
                                                    ) : (
                                                        <span className={`hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold shadow-sm whitespace-nowrap ${card.tags[0].isGradient ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-espresso-950' : 'bg-gradient-to-r from-gold-400 to-gold-600 text-espresso-950'}`}>
                                                            {card.tags[0].text}
                                                        </span>
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
                    </div>
                </div>
            </main>

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
                                    <p className="text-white font-sans text-sm leading-relaxed max-w-lg opacity-90 font-light">Experience the pinnacle of luxury with invite-only privileges, unlimited lounge access, and dedicated concierge services.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-10 relative z-10">
                                    <div className="flex items-start gap-4 group">
                                        <span className="material-symbols-outlined text-[24px] text-copper-400 group-hover:text-gold-400 transition-colors mt-0.5">flight</span>
                                        <div>
                                            <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-1 font-display">Travel</h4>
                                            <p className="text-white/70 text-sm font-sans">Unlimited Lounge Access</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <span className="material-symbols-outlined text-[24px] text-copper-400 group-hover:text-gold-400 transition-colors mt-0.5">restaurant</span>
                                        <div>
                                            <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-1 font-display">Dining</h4>
                                            <p className="text-white/70 text-sm font-sans"><span className="text-gold-400 font-bold">2x</span> Rewards on Dining</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <span className="material-symbols-outlined text-[24px] text-copper-400 group-hover:text-gold-400 transition-colors mt-0.5">golf_course</span>
                                        <div>
                                            <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-1 font-display">Golf</h4>
                                            <p className="text-white/70 text-sm font-sans">Unlimited Games Global</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <span className="material-symbols-outlined text-[24px] text-copper-400 group-hover:text-gold-400 transition-colors mt-0.5">currency_exchange</span>
                                        <div>
                                            <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-1 font-display">Forex</h4>
                                            <p className="text-white/70 text-sm font-sans">Lowest Markup <span class="text-gold-400 font-bold">(2%)</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-b border-copper-500/20 py-5 mb-8 flex items-center justify-between relative z-10">
                                    <div>
                                        <p className="text-[10px] text-white/50 font-sans font-bold uppercase tracking-widest mb-1.5">Annual Fee</p>
                                        <p className="text-2xl text-gold-400 font-serif font-bold">{selectedCard.statsDetail?.fee || '₹5k'} <span className="text-xs text-white/40 font-sans font-normal align-middle ml-1">+ GST</span></p>
                                    </div>
                                    <div className="h-10 w-px bg-copper-500/20 mx-4"></div>
                                    <div>
                                        <p className="text-[10px] text-white/50 font-sans font-bold uppercase tracking-widest mb-1.5">Eligibility</p>
                                        <p className="text-base text-gold-400 font-serif font-bold">₹45L <span className="text-white/50 text-xs font-sans font-normal">Net Income</span></p>
                                    </div>
                                    <div className="h-10 w-px bg-copper-500/20 mx-4"></div>
                                    <div>
                                        <p className="text-[10px] text-white/50 font-sans font-bold uppercase tracking-widest mb-1.5">Reward Rate</p>
                                        <p className="text-2xl text-gold-400 font-serif font-bold">{selectedCard.statsDetail?.rewardRate || '3.3%'}</p>
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
            {compareCards.size > 0 && (
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
            )}
            {/* Floating Favorites Bar */}
            {notification.show && notification.type === 'cards' && (
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
            )}
        </div >
    );
}
