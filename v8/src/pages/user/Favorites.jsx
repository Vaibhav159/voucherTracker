import { useState } from 'react';

const favoriteVouchers = [
    { id: 1, name: 'Amazon Pay', category: 'Shopping', rate: '98.5%', trend: '+0.5%', trendType: 'up', logo: 'Am' },
    { id: 2, name: 'Swiggy Money', category: 'Food & Dining', rate: '96.0%', trend: 'Stable', trendType: 'stable', logo: 'Sw' },
    { id: 3, name: 'Myntra Luxe', category: 'Fashion', rate: '94.2%', trend: '-1.2%', trendType: 'down', logo: 'My' },
];

const favoriteCards = [
    { id: 1, name: 'HDFC Infinia Metal', bank: 'HDFC BANK', tier: 'Super Premium', lastFour: '8892', rewardRate: '3.3% - 33%', annualFee: '₹12,500 + GST', bgFrom: '#1a120b', bgTo: '#2b2016' },
    { id: 2, name: 'Axis Magnus Burgundy', bank: 'AXIS BANK', tier: 'Premium Lifestyle', lastFour: '4521', rewardRate: '4.8% - 24%', annualFee: '₹30,000 + GST', bgFrom: '#3b211a', bgTo: '#1a110d' },
];

const favoriteBanking = [
    { id: 1, bank: 'HDFC Bank', name: 'Imperia Banking', features: ['Dedicated Relationship Manager', 'Preferential Loan Rates', 'Lifetime Free Imperia Card'] },
    { id: 2, bank: 'ICICI Bank', name: 'Wealth Mgmt', features: ['Family Wealth Account', 'Unlimited Lounge Access', 'Zero Forex Markup'] },
];

const favoriteGuides = [
    { id: 1, title: 'Maximizing HDFC Infinia for international flights', category: 'Travel', readTime: '5 min read' },
    { id: 2, title: 'Ultimate guide to hitting spending milestones', category: 'Strategy', readTime: '8 min read' },
];

const tabs = ['All', 'Vouchers', 'Cards', 'Banking', 'Guides'];

export default function Favorites() {
    const [activeTab, setActiveTab] = useState('All');

    const showVouchers = activeTab === 'All' || activeTab === 'Vouchers';
    const showCards = activeTab === 'All' || activeTab === 'Cards';
    const showBanking = activeTab === 'All' || activeTab === 'Banking';
    const showGuides = activeTab === 'All' || activeTab === 'Guides';

    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-950">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-espresso-950 scroll-smooth">
                <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 lg:py-10">
                    {/* Header */}
                    <div className="mb-10 flex flex-col gap-6 border-b border-copper/20 pb-8 md:flex-row md:items-end md:justify-between sticky top-0 z-10 bg-espresso-950 pt-4 -mt-4">
                        <div>
                            <h1 className="text-3xl font-black text-warm-white md:text-4xl">
                                Your <span className="bg-gradient-to-r from-gold-400 via-warm-white to-copper bg-clip-text text-transparent">Favourites</span>
                            </h1>
                            <p className="mt-2 text-lg text-gold-dim">Manage your tracked items across all categories.</p>
                        </div>

                        <div className="flex gap-1 overflow-x-auto rounded-lg bg-espresso-800 p-1 border border-white/5 shadow-inner hide-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`rounded-md px-5 py-2 text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                                        ? 'bg-primary text-espresso-950 font-bold shadow-sm'
                                        : 'text-gold-dim hover:bg-white/5 hover:text-primary'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Vouchers Section */}
                    {showVouchers && (
                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-xl font-bold text-warm-white">
                                    <span className="material-symbols-outlined text-primary">sell</span>
                                    Watchlisted Vouchers
                                </h2>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/20">{favoriteVouchers.length} Saved</span>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {favoriteVouchers.map((voucher) => (
                                    <div key={voucher.id} className="group relative overflow-hidden rounded-xl border border-white/5 bg-espresso-800 p-5 transition-all hover:border-primary/50 hover:shadow-lg">
                                        <div className="mb-2 flex justify-between items-center">
                                            <span className="inline-flex items-center rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-dim">Voucher</span>
                                            <button className="flex h-8 w-8 items-center justify-center rounded-full text-gold-dim transition-colors hover:bg-red-500/10 hover:text-red-500" title="Remove from Favourites">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-espresso-950 text-xl font-bold text-primary">{voucher.logo}</div>
                                            <div className="flex flex-col">
                                                <h3 className="text-base font-bold text-warm-white line-clamp-1">{voucher.name}</h3>
                                                <p className="text-xs font-medium text-gold-dim">{voucher.category}</p>
                                            </div>
                                        </div>
                                        <div className="mt-5 flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-warm-white">{voucher.rate}</span>
                                            <span className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${voucher.trendType === 'up' ? 'text-green-500 bg-green-500/10' :
                                                voucher.trendType === 'down' ? 'text-red-500 bg-red-500/10' :
                                                    'text-gold-dim bg-gold-dim/10'
                                                }`}>
                                                <span className="material-symbols-outlined text-[14px] mr-0.5">
                                                    {voucher.trendType === 'up' ? 'trending_up' : voucher.trendType === 'down' ? 'trending_down' : 'remove'}
                                                </span>
                                                {voucher.trend}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-[11px] text-gold-dim">Real-time market rate</p>
                                        <div className="mt-5 flex gap-3">
                                            <button className="flex-1 rounded-lg bg-white/5 py-2.5 text-xs font-bold uppercase tracking-wider text-warm-white transition-colors hover:bg-white/10">Details</button>
                                            <button className="flex-1 rounded-lg bg-primary py-2.5 text-xs font-bold uppercase tracking-wider text-espresso-950 transition-transform hover:scale-[1.02]">Buy Now</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Cards Section */}
                    {showCards && (
                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-xl font-bold text-warm-white">
                                    <span className="material-symbols-outlined text-primary">credit_card</span>
                                    Saved Cards
                                </h2>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/20">{favoriteCards.length} Saved</span>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {favoriteCards.map((card) => (
                                    <div key={card.id} className="group relative overflow-hidden rounded-xl border border-white/5 bg-espresso-800 p-0 transition-all hover:border-primary/50 hover:shadow-lg">
                                        <div className="relative h-40 p-5" style={{ background: `linear-gradient(to bottom right, ${card.bgFrom}, ${card.bgTo})` }}>
                                            <div className="relative z-10 flex h-full flex-col justify-between">
                                                <div className="flex justify-between">
                                                    <span className="text-sm font-bold tracking-widest text-white/90">{card.bank}</span>
                                                    <span className="material-symbols-outlined text-white/50">contactless</span>
                                                </div>
                                                <div>
                                                    <div className="mb-2 text-xs text-white/50">{card.name.toUpperCase()}</div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-6 w-10 rounded bg-white/20"></div>
                                                        <div className="text-sm tracking-widest text-white/90">•••• {card.lastFour}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <span className="inline-flex items-center rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-dim mb-1">Credit Card</span>
                                                    <h3 className="font-bold text-warm-white">{card.name}</h3>
                                                    <p className="text-xs text-gold-dim">{card.tier}</p>
                                                </div>
                                                <button className="flex h-8 w-8 items-center justify-center rounded-full text-gold-dim transition-colors hover:bg-red-500/10 hover:text-red-500" title="Remove from Favourites">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                            <div className="mt-4 space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gold-dim">Reward Rate</span>
                                                    <span className="font-bold text-primary">{card.rewardRate}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gold-dim">Annual Fee</span>
                                                    <span className="font-semibold text-warm-white">{card.annualFee}</span>
                                                </div>
                                            </div>
                                            <div className="mt-5 grid grid-cols-2 gap-3">
                                                <button className="rounded-lg bg-white/5 py-2 text-xs font-bold text-warm-white hover:bg-white/10">View Details</button>
                                                <button className="rounded-lg border border-primary/30 bg-primary/10 py-2 text-xs font-bold text-primary hover:bg-primary/20">Apply Now</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Add Card CTA */}
                                <div className="group flex flex-col items-center justify-center rounded-xl border border-dashed border-copper/20 bg-transparent p-6 text-center transition-all hover:border-primary/50 hover:bg-white/5">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-copper transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                                        <span className="material-symbols-outlined text-[24px]">add</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-warm-white">Find More Cards</h3>
                                    <p className="mt-1 text-xs text-gold-dim">Browse our database to add more favorites.</p>
                                    <a className="mt-4 text-xs font-bold text-primary hover:underline" href="#">Browse Directory</a>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Banking Section */}
                    {showBanking && (
                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-xl font-bold text-warm-white">
                                    <span className="material-symbols-outlined text-primary">account_balance</span>
                                    Saved Banking Tiers
                                </h2>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/20">{favoriteBanking.length} Saved</span>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {favoriteBanking.map((tier) => (
                                    <div key={tier.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-espresso-800 p-5 transition-all hover:border-primary/50 hover:shadow-lg">
                                        <div className="mb-4 flex justify-between items-start">
                                            <div className="flex gap-4 items-center">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-espresso-900 text-primary">
                                                    <span className="material-symbols-outlined">account_balance</span>
                                                </div>
                                                <div>
                                                    <span className="inline-flex items-center rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-dim mb-1">Banking Tier</span>
                                                    <div className="flex flex-col">
                                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gold-dim">{tier.bank}</p>
                                                        <h3 className="text-lg font-bold text-warm-white leading-tight">{tier.name}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="flex h-8 w-8 items-center justify-center rounded-full text-gold-dim transition-colors hover:bg-red-500/10 hover:text-red-500" title="Remove from Favourites">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                        <div className="mt-2 mb-6 border-t border-dashed border-white/5 pt-4 flex-1">
                                            <ul className="space-y-3">
                                                {tier.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-sm text-warm-white/80">
                                                        <span className="material-symbols-outlined text-[18px] text-copper shrink-0 mt-0.5">diamond</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-auto">
                                            <button className="w-full rounded-lg bg-white/5 py-2.5 text-xs font-bold uppercase tracking-wider text-warm-white transition-colors hover:bg-white/10">View Details</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Guides Section */}
                    {showGuides && (
                        <section>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-xl font-bold text-warm-white">
                                    <span className="material-symbols-outlined text-primary">menu_book</span>
                                    Saved Guides
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {favoriteGuides.map((guide) => (
                                    <div key={guide.id} className="flex flex-col gap-4 rounded-xl border border-white/5 bg-espresso-800 p-4 transition-all hover:border-primary/30 sm:flex-row">
                                        <div className="aspect-video w-full overflow-hidden rounded-lg bg-espresso-900 sm:w-40 shrink-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-espresso-700">credit_score</span>
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">Guide • {guide.category}</span>
                                                    <button className="flex h-6 w-6 items-center justify-center rounded-full text-gold-dim transition-colors hover:bg-red-500/10 hover:text-red-500" title="Remove from Favourites">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                                <h3 className="text-base font-bold leading-tight text-warm-white hover:text-primary cursor-pointer transition-colors mt-1">{guide.title}</h3>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-2 text-xs text-gold-dim">
                                                    <span className="material-symbols-outlined text-[14px] text-copper">schedule</span>
                                                    {guide.readTime}
                                                </div>
                                                <button className="text-xs font-bold text-gold-dim hover:text-primary">Read Now</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Footer */}
                    <footer className="mt-20 border-t border-copper/20 py-10 text-center">
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            <a className="text-sm text-gold-dim hover:text-primary" href="#">Privacy Policy</a>
                            <a className="text-sm text-gold-dim hover:text-primary" href="#">Terms of Service</a>
                            <a className="text-sm text-gold-dim hover:text-primary" href="#">Contact Support</a>
                        </div>
                        <p className="mt-8 text-sm text-espresso-600">© 2024 CardPerks. All rights reserved.</p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
