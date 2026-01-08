import { useState } from 'react';

const creditCards = [
    {
        id: 1,
        name: 'Infinia Metal Edition',
        bank: 'HDFC Bank',
        network: 'Visa Infinite',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwz4Z0xXa-7CC9PqVv3-PtCozR5yso5WmX0zoV81jKWmZamgG9AC3SwQpJrMKStrYByKf_R1tBMdXpDy4epfXeVZpkP3pJXFsGyqEyVur80ZnoHl_zjbUT1oLhy14a6KUJcEW2pxdZzJvh9X2OxxXM0FcDvwjHi6pMzAiI5DVJSUdJul5nnn_sbHeVrKY4CuEsmaTeqODk6OWfv86d5WC4ONaQjoDOSXs19Dnoozaj_Xkg2zwJ9BG2zTkG6bv4Ju6laEOlww0QHj5b',
        badge: 'Ultimate Luxury',
        badgeStyle: 'bg-gold-badge text-espresso-950 shadow-gold-400/20',
        tags: [
            { icon: 'percent', text: '3.3% Base Reward' },
            { icon: 'flight', text: 'Unlimited Lounge' }
        ],
        stats: [
            { label: 'Reward Rate', value: '3.3% - 33%' },
            { label: 'Fee', value: '₹ 12,500' }
        ],
        isDark: true,
        shadowHover: 'group-hover:shadow-copper-900/50',
        animateSheen: true
    },
    {
        id: 2,
        name: 'Platinum Charge',
        bank: 'Amex',
        network: 'Charge Card',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzGpxxlGUDm-_SWVTSmab0Xf0wPcjYLDlfVV76AH4FxatJrvnK6bG1ZcX9cl8isFAlPxITHAfPg2-0kiLiriVczzKtU5cpnujLPYcLDYrtSFxmg2qJhDdmtBSnGpMKlJbYMv1BpqnD37apL6cv_sbr3qWS5WRmPLLaWdX9OjJH6SXn-Ib5Ry9vATasUS_Vtw93XEvh354E-h8GySmj7VvD__54ngudEYaCi6XAvrc3MOYp6QCxeFoaUcileK577XIHL0oJyqTL9UhT',
        badge: 'Charge Card',
        badgeStyle: 'bg-white text-espresso-950',
        tags: [
            { icon: 'support_agent', text: '24/7 Concierge' },
            { icon: 'hotel', text: 'Taj & Marriott Gold' }
        ],
        stats: [
            { label: 'Taj Vouchers', value: '₹ 45,000' },
            { label: 'Concierge', value: '24/7 Platinum' }
        ],
        isGrayscale: true
    },
    {
        id: 3,
        name: 'Magnus Burgundy',
        bank: 'Axis Bank',
        network: 'World Elite',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAHlIqVq9QfwG71aVBY09vDALuR7EgDSnhqWTSP0Yw53IByx7hYMkMOTfyLax6P5prTVonVJhDOD-R0OUioMvFM67zvcXXGmqzV3BJU_VmlxI5YWR5sxFCxTVubyt9pmlDeJ2cZVCF0sIsd1RS4LfQdvcPazEYxm3zXS0RxhMTnUcMKN02tcYrmYQlw-BGzbEfvaSDL-6ycPYcUpR-2ghBoIR-rnVysgYkhlGH49_jmFiDmEbClyNu4g1OkAs8BANUT3goxu__2n1k',
        tags: [
            { text: '5X Rewards', isGradient: true },
            { text: 'Fast Track', isBordered: true }
        ],
        stats: [
            { label: 'Milestone', isProgress: true, progress: '80%' },
            { label: 'Bonus', value: '25k Points' }
        ],
        isSepia: true
    },
    {
        id: 4,
        name: 'SBI Aurum',
        bank: 'SBI Card',
        network: 'Super Premium',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI480D_1fvTMTaaqeEEmfn4LF6UtoVER8D_yFZrlUAeHuOy_Fano3NNm64YPraybux_Toih71VizM6rzIJJxYPFl-q256Q_NvnPtfL0hf4LrUTZbSKL50UP5MUiK52Mh3xxeA0xOoFHfeI5xif0OkgJZioXMaqU-KVNcbM1OFIrYuGq-QIGLGsBEePGUitRTIIeAEwSAwkVKFVA859DH2Vy7Qm5JA2DGOgsR6urepX16LcOyHSd_JBGQZOcZJ-5S-xN8Q28D1tutwM',
        customArt: true,
        tags: [
            { text: 'Invite Only', isGradient: true }
        ],
        stats: [
            { label: 'Benefits', value: '₹ 5,000 Tata Cliq' },
            { label: 'Movies', value: '4 Free Tickets' }
        ],
        isDark: true
    },
];

export default function Cards() {
    const [viewMode, setViewMode] = useState('grid');

    return (
        <div className="flex flex-1 overflow-hidden relative font-display text-gold-100 bg-espresso-900 bg-espresso-texture">
            {/* Sidebar */}
            <aside className="w-72 flex-shrink-0 flex flex-col bg-espresso-950 border-r border-copper-500/10 overflow-y-auto z-20 hidden lg:flex">
                <div className="p-6 flex flex-col gap-8">
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <label className="text-[10px] font-bold text-copper-500 uppercase tracking-[0.2em] mb-4 block">Filter Results</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-copper-500/40 text-[18px] group-focus-within:text-copper-400 transition-colors">filter_list</span>
                            <input
                                className="bg-espresso-900 border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-sm text-gold-100 focus:ring-1 focus:ring-copper-500/40 focus:border-copper-500/40 w-full placeholder-white/20 transition-all hover:bg-espresso-850 hover:border-white/10"
                                placeholder="Keyword..."
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-gold-100/80 text-xs font-bold uppercase tracking-[0.1em]">Benefits</h4>
                            <button className="text-[10px] text-copper-500 cursor-pointer hover:text-copper-400 hover:underline transition-colors">Reset</button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {['Lounge Access', 'Golf Games', 'Dining Offers', 'Fuel Surcharge'].map((label, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group checkbox-wrapper p-1 rounded hover:bg-white/5 transition-colors">
                                    <input defaultChecked={idx === 0} className="peer sr-only" type="checkbox" />
                                    <div className="w-4 h-4 rounded border border-copper-500/40 bg-espresso-900 flex items-center justify-center transition-all duration-300 group-hover:border-copper-500 group-hover:shadow-[0_0_8px_rgba(205,127,50,0.2)]">
                                        <svg className="w-2.5 h-2.5 text-espresso-950 opacity-0 transform scale-50 transition-all duration-200" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </div>
                                    <span className="text-gold-100/70 text-sm font-medium group-hover:text-gold-100 transition-colors">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h4 className="text-gold-100/80 text-xs font-bold uppercase tracking-[0.1em] mb-4">Annual Fee</h4>
                        <div className="relative h-1 bg-espresso-800 rounded-full mb-2">
                            <div className="absolute left-0 top-0 h-full bg-copper-500 rounded-full" style={{ width: '60%' }}></div>
                            <div className="absolute top-1/2 -translate-y-1/2 left-[60%] size-3 bg-gold-400 rounded-full shadow border border-espresso-900 cursor-pointer hover:scale-125 transition-transform duration-200"></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-white/40 font-mono">
                            <span>₹0</span>
                            <span>₹50,000</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-6 border-t border-white/5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-copper-900/20 to-espresso-900 border border-copper-500/10 text-center hover:border-copper-500/30 hover:shadow-lg transition-all duration-300 group">
                        <span className="material-symbols-outlined text-gold-400 mb-2 group-hover:scale-110 transition-transform">stars</span>
                        <h5 className="text-gold-100 font-serif text-sm font-bold mb-1">Go Premium</h5>
                        <p className="text-[10px] text-white/50 mb-3">Unlock exclusive metal cards and concierge services.</p>
                        <button className="w-full py-1.5 rounded bg-copper-600 hover:bg-copper-500 text-white text-xs font-medium transition-colors btn-press shadow-lg shadow-black/20">Upgrade Plan</button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-espresso-900 bg-espresso-texture">
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-copper-900/10 to-transparent pointer-events-none z-0"></div>
                <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-copper-600/5 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-soft"></div>

                <div className="flex-1 overflow-y-auto z-10 p-6 lg:p-8 scroll-smooth pb-20">
                    <div className="max-w-[1400px] mx-auto flex flex-col gap-8">

                        <div className="flex flex-col gap-6 animate-fade-in-up">
                            <div className="flex flex-col lg:flex-row justify-between items-end gap-6">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-off-white font-serif">
                                        Explore <span className="text-gradient-gold italic">Premium Cards</span>
                                    </h2>
                                    <p className="text-gold-100/60 text-sm font-light max-w-2xl leading-relaxed">
                                        Compare exclusive credit cards curated for your lifestyle. Filter by benefits, fees, and rewards to find your perfect financial companion.
                                    </p>
                                </div>
                            </div>

                            <div className="w-full border-y border-copper-500/10 py-4 flex flex-col md:flex-row gap-4 justify-between items-center backdrop-blur-sm bg-espresso-900/30 sticky top-0 z-30 transition-all duration-300">
                                <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
                                    <span className="text-xs font-bold text-copper-400 tracking-widest uppercase shrink-0">Filters:</span>
                                    {['Bank', 'Sort', 'Network'].map((label, idx) => (
                                        <div key={idx} className="h-9 px-3 rounded border border-copper-500/30 bg-espresso-850 flex items-center gap-2 cursor-pointer hover:border-copper-400 hover:bg-espresso-800 transition-all shrink-0 btn-press group/filter">
                                            <span className="text-white/60 text-xs uppercase tracking-wider group-hover/filter:text-white/80 transition-colors">{label}</span>
                                            <span className="text-gold-100 text-sm font-medium">{label === 'Bank' ? 'All Banks' : label === 'Sort' ? 'Popularity' : 'Any'}</span>
                                            <span className={`material-symbols-outlined text-copper-500 text-[16px] ${label !== 'Sort' ? 'group-hover/filter:rotate-180 transition-transform' : ''}`}>
                                                {label === 'Sort' ? 'sort' : 'expand_more'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                                    <span className="text-xs font-bold text-copper-400 tracking-widest uppercase mr-2">View:</span>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`size-9 rounded border flex items-center justify-center transition-all btn-press ${viewMode === 'grid'
                                            ? 'border-copper-500/40 bg-copper-500 text-white shadow-lg shadow-copper-500/20'
                                            : 'border-copper-500/20 bg-espresso-850 text-white/40 hover:text-white hover:border-copper-500/40 hover:bg-espresso-800'}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`size-9 rounded border flex items-center justify-center transition-all btn-press ${viewMode === 'list'
                                            ? 'border-copper-500/40 bg-copper-500 text-white shadow-lg shadow-copper-500/20'
                                            : 'border-copper-500/20 bg-espresso-850 text-white/40 hover:text-white hover:border-copper-500/40 hover:bg-espresso-800'}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">view_list</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Featured Selection Header */}
                        <section className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gold-100 uppercase tracking-[0.15em] flex items-center gap-3">
                                    <span className="w-6 h-[2px] bg-copper-500 shadow-glow-copper"></span>
                                    Featured Selection
                                </h3>
                                <div className="flex gap-2">
                                    <button className="size-8 rounded-full border border-copper-500/20 hover:border-copper-500 text-copper-500 hover:text-gold-100 hover:bg-copper-500 flex items-center justify-center transition-all btn-press">
                                        <span className="material-symbols-outlined text-[18px]">west</span>
                                    </button>
                                    <button className="size-8 rounded-full border border-copper-500/20 hover:border-copper-500 text-copper-500 hover:text-gold-100 hover:bg-copper-500 flex items-center justify-center transition-all btn-press">
                                        <span className="material-symbols-outlined text-[18px]">east</span>
                                    </button>
                                </div>
                            </div>

                            {/* Featured Grid - Remains Grid in both views */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {creditCards.slice(0, 2).map((card, idx) => (
                                    <div key={card.id} className="relative h-72 rounded-2xl overflow-hidden border border-white/5 group cursor-pointer shadow-2xl shadow-black/60 hover:shadow-glow-copper transition-all duration-500 hover:border-copper-500/30">
                                        <div
                                            className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 ${idx === 1 ? 'grayscale' : ''}`}
                                            style={{ backgroundImage: `url("${card.image}")`, filter: idx === 1 ? 'grayscale(1) brightness(0.6)' : undefined }}
                                        ></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-espresso-950 via-espresso-900/90 to-transparent"></div>

                                        <div className="relative z-10 p-8 flex flex-col justify-center h-full gap-5 max-w-lg">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shadow-md ${card.badgeStyle || 'bg-white text-espresso-950'}`}>{card.badge || 'Premium'}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-serif text-white font-bold leading-tight mb-1 group-hover:text-gold-200 transition-colors">{card.name}</h3>
                                                <p className="text-copper-300 text-sm font-medium">
                                                    {card.id === 1 ? 'Invite Only • Super Premium' : 'Metal Charge Card • Global Access'}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gold-100/80">
                                                {card.tags?.map((tag, tIdx) => (
                                                    <div key={tIdx} className="flex items-center gap-2">
                                                        <span className="size-5 rounded-full bg-copper-500/20 flex items-center justify-center border border-copper-500/30 text-copper-400">
                                                            <span className="material-symbols-outlined text-[12px]">{tag.icon}</span>
                                                        </span>
                                                        <span>{tag.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className={`mt-2 w-fit px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 group/btn btn-press ${idx === 0
                                                ? 'bg-gradient-to-r from-copper-600 to-copper-500 hover:from-gold-600 hover:to-gold-500 text-white shadow-lg shadow-copper-900/50 border border-white/10 hover:shadow-gold-glow'
                                                : 'border border-copper-500 text-gold-100 bg-espresso-900/50 hover:bg-copper-600 hover:border-copper-400 hover:text-white hover:shadow-copper-glow'}`}>
                                                {idx === 0 ? 'Check Eligibility' : 'View Details'}
                                                <span className={`material-symbols-outlined text-[16px] transition-transform group-hover/btn:translate-x-1 ${idx === 1 ? 'material-symbols-outlined' : ''}`}>
                                                    {idx === 0 ? 'arrow_forward' : 'visibility'}
                                                </span>
                                            </button>
                                        </div>

                                        {/* 3D Card Effect */}
                                        <div
                                            className="absolute -right-12 top-1/2 -translate-y-1/2 w-80 h-48 hidden md:block transition-all duration-700 group-hover:rotate-6 group-hover:scale-110 group-hover:-translate-x-2"
                                            style={{
                                                backgroundImage: `url("${card.image}")`,
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                transform: `perspective(1000px) rotateY(-15deg) rotateZ(${idx === 0 ? 5 : -5}deg)`,
                                                filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.6)) ${idx === 1 ? 'grayscale(1)' : ''}`,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mt-4">
                            <div className="flex items-center justify-between mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    All Cards <span className="text-sm font-normal text-white/40">(124)</span>
                                </h3>
                            </div>

                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {creditCards.map((card, idx) => (
                                        <article key={card.id} className="group relative flex flex-col rounded-2xl overflow-hidden bg-espresso-850 border border-copper-500/20 shadow-xl animate-pop-scale" style={{ animationDelay: `${0.25 + (idx * 0.1)}s` }}>
                                            <div className="absolute inset-0 bg-card-sheen opacity-0 group-hover:opacity-100 animate-sheen pointer-events-none transition-opacity duration-700 z-10 mix-blend-overlay"></div>

                                            <div className="relative w-full aspect-[1.7] bg-black p-6 flex items-center justify-center overflow-hidden">
                                                <div
                                                    className={`absolute inset-0 bg-cover bg-center blur-md opacity-40 scale-110 transition-all duration-1000 ${card.isGrayscale ? 'grayscale group-hover:grayscale-0' : ''} ${card.isSepia ? 'sepia brightness-50 group-hover:sepia-0 group-hover:brightness-75' : 'group-hover:scale-100'}`}
                                                    style={{ backgroundImage: `url("${card.image}")` }}
                                                ></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-espresso-850 via-transparent to-transparent"></div>

                                                {card.customArt ? (
                                                    <div className="relative z-10 w-4/5 aspect-[1.586] rounded-xl bg-[#1a1a1a] shadow-2xl border border-copper-600/50 flex flex-col justify-between p-4 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow-glow-copper">
                                                        <div className="text-copper-500 font-serif font-bold text-lg tracking-wider">AURUM</div>
                                                        <div className="flex justify-between items-end">
                                                            <div className="text-white/30 text-[8px] font-mono">**** 1122</div>
                                                            <div className="size-6 bg-white/10 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img
                                                        alt="Card Art"
                                                        className={`relative z-10 w-4/5 rounded-xl shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105 ${card.isGrayscale ? 'grayscale group-hover:grayscale-0' : ''} ${card.shadowHover || ''}`}
                                                        src={card.image}
                                                    />
                                                )}

                                                <button className="absolute top-4 right-4 z-20 text-copper-500/50 hover:text-copper-400 hover:scale-110 transition-all p-2 rounded-full bg-espresso-900/50 hover:bg-espresso-900 backdrop-blur-sm border border-transparent hover:border-copper-500/30 btn-press group/fav" title="Add to Favourites">
                                                    <span className="material-symbols-outlined text-[20px] filled group-hover/fav:fill-copper-500 group-hover/fav:text-copper-500 transition-all">favorite</span>
                                                </button>
                                            </div>

                                            <div className="p-6 flex flex-col gap-5 relative flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-bold font-serif text-gold-100 group-hover:text-copper-400 transition-colors duration-300">{card.name}</h3>
                                                        <p className="text-xs text-white/40 mt-1 uppercase tracking-wider group-hover:text-white/60 transition-colors">{card.bank} • {card.network}</p>
                                                    </div>
                                                    <label className="group/compare flex items-center gap-2 cursor-pointer select-none">
                                                        <input className="appearance-none peer w-4 h-4 border border-white/20 rounded bg-transparent checked:bg-copper-500 checked:border-copper-500 transition-all duration-300 cursor-pointer shadow-sm hover:border-copper-400" type="checkbox" />
                                                        <span className="material-symbols-outlined text-espresso-950 text-[12px] absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-all duration-200 peer-checked:scale-100 scale-50 left-[5px] top-[5px]">check</span>
                                                        <div className="relative">
                                                            <span className="text-[10px] text-white/30 font-bold tracking-widest uppercase peer-checked:text-copper-400 group-hover/compare:text-white/60 transition-colors">Compare</span>
                                                        </div>
                                                    </label>
                                                </div>

                                                <div className="flex gap-2 flex-wrap">
                                                    {card.tags?.slice(0, 2).map((tag, tIdx) => (
                                                        <span
                                                            key={tIdx}
                                                            className={`px-2.5 py-1 rounded text-[10px] font-bold shadow-sm transition-all ${tag.isGradient ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-espresso-950 group-hover:shadow-glow-gold' :
                                                                    tag.isBordered ? 'bg-espresso-900 border border-gold-500/20 text-gold-300' :
                                                                        tag.text.includes('Concierge') ? 'bg-gradient-to-r from-white/20 to-white/10 text-white border border-white/20 group-hover:border-white/40' :
                                                                            'bg-gradient-to-r from-gold-400 to-gold-600 text-espresso-950 group-hover:shadow-glow-gold'
                                                                }`}
                                                        >
                                                            {tag.text}
                                                        </span>
                                                    ))}
                                                    {card.id == 2 && <span className="px-2.5 py-1 bg-gradient-to-r from-white/20 to-white/10 text-white border border-white/20 rounded text-[10px] font-bold shadow-sm group-hover:border-white/40 transition-colors">Metal Form Factor</span>}
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-auto">
                                                    {card.stats.map((stat, sIdx) => (
                                                        <div key={sIdx}>
                                                            <p className="text-white/30 text-[10px] uppercase tracking-wider font-semibold mb-1">{stat.label}</p>
                                                            {stat.isProgress ? (
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                                                        <div className="h-full bg-copper-500 rounded-full group-hover:animate-pulse" style={{ width: stat.progress }}></div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <p className={`font-medium text-sm ${stat.label === 'Taj Vouchers' ? 'text-copper-400' : 'text-gold-100'}`}>{stat.value}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>

                                                <button className="w-full mt-2 py-3 rounded-lg bg-espresso-900 border border-copper-500 text-white text-sm font-semibold hover:bg-copper-600 hover:border-copper-400 transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-black/20 btn-press">
                                                    View Details
                                                    <span className="material-symbols-outlined text-[16px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                                </button>
                                            </div>
                                        </article>
                                    ))}

                                    <div className="group relative flex flex-col rounded-2xl overflow-hidden border border-dashed border-copper-500/30 hover:border-copper-400 hover:bg-espresso-800/50 transition-all flex items-center justify-center cursor-pointer group-hover:scale-[1.01] duration-300 p-8 text-center min-h-[400px] animate-pop-scale" style={{ animationDelay: '0.65s' }}>
                                        <div className="size-24 rounded-full bg-espresso-800 border border-copper-500/20 flex items-center justify-center mb-6 group-hover:bg-copper-500/10 group-hover:border-copper-500 transition-all duration-300 shadow-xl group-hover:shadow-glow-copper group-hover:scale-110">
                                            <span className="material-symbols-outlined text-copper-500 text-4xl group-hover:scale-110 transition-transform duration-300">add_card</span>
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-gold-100 mb-2">Explore Marketplace</h3>
                                        <p className="text-gold-100/50 text-sm leading-relaxed max-w-[240px] mb-8">
                                            Browse the full card marketplace to find your next premium addition.
                                        </p>
                                        <button className="px-8 py-3 rounded-full bg-transparent border border-copper-500 text-copper-400 text-sm font-bold hover:bg-copper-500 hover:text-white hover:shadow-glow-copper transition-all flex items-center gap-2 btn-press">
                                            Discover More <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // List View
                                <div className="flex flex-col bg-espresso-850/20 rounded-2xl border border-white/5 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                    {creditCards.map((card, idx) => (
                                        <article key={card.id} className="group card-list-item flex flex-col md:flex-row items-center gap-6 p-5 border-b border-copper-500/10 relative transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-white/5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(205,127,50,0.2)] hover:z-10 animate-fade-in-up" style={{ animationDelay: `${0.1 + (idx * 0.1)}s` }}>
                                            <div className="w-full md:w-32 shrink-0 relative transition-transform duration-500 group-hover:scale-105">
                                                {card.customArt ? (
                                                    <div className="relative z-10 w-32 aspect-[1.586] rounded-lg bg-[#1a1a1a] shadow-lg border border-copper-600/50 flex flex-col justify-between p-3 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-copper-500/20 group-hover:border-copper-400">
                                                        <div className="text-copper-500 font-serif font-bold text-[10px] tracking-wider group-hover:text-gold-300 transition-colors">AURUM</div>
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
                                                <div className="flex justify-center md:justify-start">
                                                    <span className={`sm:hidden mt-2 px-2 py-0.5 rounded text-[10px] font-bold shadow-sm ${card.animateSheen ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-espresso-950' : 'bg-gradient-to-r from-gold-400 to-gold-600 text-espresso-950'}`}>
                                                        {card.tags[0].text}
                                                    </span>
                                                </div>
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
                                                <label className="group/compare flex items-center gap-2 cursor-pointer select-none">
                                                    <input className="appearance-none w-4 h-4 border border-white/20 rounded bg-transparent transition-all cursor-pointer hover:border-copper-400 checked:bg-copper-500 checked:border-copper-500" type="checkbox" />
                                                    <span className="text-[10px] text-white/30 font-bold tracking-widest uppercase peer-checked:text-copper-400 group-hover/compare:text-white/60 transition-colors">Compare</span>
                                                </label>
                                                <div className="h-8 w-px bg-copper-500/10 hidden md:block group-hover:bg-copper-500/30 transition-colors"></div>
                                                <button className="text-copper-500/50 hover:text-copper-400 transition-colors flex items-center justify-center btn-press">
                                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                                </button>
                                                <button className="px-5 py-2 rounded bg-espresso-900 border border-copper-500 text-white text-xs font-semibold bg-gradient-to-r hover:from-copper-600 hover:to-gold-600 transition-all whitespace-nowrap shadow-lg btn-press hover:shadow-copper-glow">
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
        </div>
    );
}
