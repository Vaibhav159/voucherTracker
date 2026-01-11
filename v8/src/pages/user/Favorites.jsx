import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

// Import data sources - these would typically come from APIs or centralized data files
const allVouchers = [
    { id: 1, name: 'Amazon Pay', category: 'Shopping', rate: '98.5%', trend: '+0.5%', trendType: 'up', icon: 'shopping_bag', color: 'text-orange-400' },
    { id: 2, name: 'Swiggy Money', category: 'Food & Dining', rate: '96.0%', trend: 'Stable', trendType: 'stable', icon: 'restaurant', color: 'text-orange-500' },
    { id: 3, name: 'Myntra Luxe', category: 'Fashion', rate: '94.2%', trend: '-1.2%', trendType: 'down', icon: 'checkroom', color: 'text-pink-400' },
    { id: 4, name: 'Flipkart', category: 'Shopping', rate: '97.0%', trend: '+0.3%', trendType: 'up', icon: 'shopping_cart', color: 'text-blue-400' },
    { id: 5, name: 'Zomato', category: 'Food & Dining', rate: '95.5%', trend: 'Stable', trendType: 'stable', icon: 'dinner_dining', color: 'text-red-400' },
];

const allCards = [
    { id: 1, name: 'HDFC Infinia Metal', bank: 'HDFC BANK', tier: 'Super Premium', rewardRate: '3.3% - 33%', annualFee: '₹12,500 + GST', image: '/assets/cards/hdfc-infinia.webp', bgFrom: '#1a120b', bgTo: '#2b2016' },
    { id: 2, name: 'Axis Magnus Burgundy', bank: 'AXIS BANK', tier: 'Premium Lifestyle', rewardRate: '4.8% - 24%', annualFee: '₹30,000 + GST', image: '/assets/cards/axis-magnus.webp', bgFrom: '#3b211a', bgTo: '#1a110d' },
    { id: 3, name: 'ICICI Sapphiro', bank: 'ICICI BANK', tier: 'Super Premium', rewardRate: '2% - 10%', annualFee: '₹6,500 + GST', image: '/assets/cards/icici-sapphiro.webp', bgFrom: '#1a2030', bgTo: '#0d1520' },
];

const allGuides = [
    { id: 1, title: 'Wealth Preservation in Volatile Markets', category: 'Wealth Management', readTime: '12 min read' },
    { id: 2, title: 'The 2024 Metal Card Hierarchy', category: 'Cards', readTime: '8 min read' },
    { id: 3, title: 'Unlocking First Class Upgrades', category: 'Travel', readTime: '5 min read' },
];

const allArticles = [
    { id: 4, title: 'Amex Platinum vs. Axis Magnus: The 2024 Showdown', category: 'Analysis', readTime: '6 min read' },
    { id: 5, title: 'Concierge Secrets: Booking Impossible Tables', category: 'Lifestyle', readTime: '4 min' },
    { id: 6, title: 'Hidden Lounge Networks in SE Asia', category: 'Travel', readTime: '5 min' },
];

const allBanking = [
    { id: 'hdfc-imperia', bank: 'HDFC', tierType: 'Private Wealth', tierName: 'Imperia Banking', tagline: 'Top-tier wealth management for HNWIs.', bankColor: '#004c8f' },
    { id: 'icici-wealth', bank: 'ICICI', tierType: 'Wealth Mgmt', tierName: 'Wealth Management', tagline: 'Holistic family banking solutions.', bankColor: '#f37e20' },
    { id: 'axis-burgundy', bank: 'AXIS', tierType: 'Burgundy', tierName: 'Burgundy', tagline: 'Curated banking for the affluent.', bankColor: '#97144d' },
];

const tabs = ['All', 'Vouchers', 'Cards', 'Banking', 'Guides'];

export default function Favorites() {
    const [activeTab, setActiveTab] = useState('All');
    const { favorites, toggleFavorite, getFavoriteCount } = useFavorites();

    // Filter data based on favorited IDs
    const favoriteVouchers = allVouchers.filter(v => favorites.vouchers?.has(v.id));
    const favoriteCards = allCards.filter(c => favorites.cards?.has(c.id));
    const favoriteGuides = allGuides.filter(g => favorites.guides?.has(g.id));
    const favoriteArticles = allArticles.filter(a => favorites.articles?.has(a.id));
    const favoriteBanking = allBanking.filter(b => favorites.banking?.has(b.id));

    const showVouchers = activeTab === 'All' || activeTab === 'Vouchers';
    const showCards = activeTab === 'All' || activeTab === 'Cards';
    const showBanking = activeTab === 'All' || activeTab === 'Banking';
    const showGuides = activeTab === 'All' || activeTab === 'Guides';

    const totalFavorites = getFavoriteCount();
    const hasAnyFavorites = totalFavorites > 0;

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
                            <p className="mt-2 text-lg text-gold-dim">
                                {hasAnyFavorites
                                    ? `Manage your ${totalFavorites} tracked items across all categories.`
                                    : 'Start adding items to your favorites to see them here.'}
                            </p>
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

                    {/* Empty State */}
                    {!hasAnyFavorites && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="size-24 rounded-full bg-espresso-800 border border-white/5 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-gold-dim text-[48px]">favorite</span>
                            </div>
                            <h2 className="text-2xl font-bold text-warm-white mb-3">No Favorites Yet</h2>
                            <p className="text-gold-dim max-w-md mb-8">
                                Browse our vouchers, cards, and guides to start building your personalized collection of favorites.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/vouchers" className="px-6 py-3 rounded-lg bg-primary text-espresso-950 font-bold text-sm hover:bg-primary-hover transition-colors">
                                    Explore Vouchers
                                </Link>
                                <Link to="/cards" className="px-6 py-3 rounded-lg border border-copper/30 text-copper font-bold text-sm hover:bg-copper/10 transition-colors">
                                    Browse Cards
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Vouchers Section */}
                    {showVouchers && favoriteVouchers.length > 0 && (
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
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10"
                                                title="Remove from Favourites"
                                                onClick={() => toggleFavorite('vouchers', voucher.id)}
                                            >
                                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-espresso-700 ${voucher.color || 'text-gold-400'}`}>
                                                <span className="material-symbols-outlined text-2xl">{voucher.icon || 'sell'}</span>
                                            </div>
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
                                            <Link to="/vouchers" className="flex-1 rounded-lg bg-white/5 py-2.5 text-xs font-bold uppercase tracking-wider text-warm-white transition-colors hover:bg-white/10 text-center">Details</Link>
                                            <button className="flex-1 rounded-lg bg-primary py-2.5 text-xs font-bold uppercase tracking-wider text-espresso-950 transition-transform hover:scale-[1.02]">Buy Now</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Cards Section */}
                    {showCards && favoriteCards.length > 0 && (
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
                                                <button
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10"
                                                    title="Remove from Favourites"
                                                    onClick={() => toggleFavorite('cards', card.id)}
                                                >
                                                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
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
                                                <Link to={`/cards/${card.id}`} className="rounded-lg bg-white/5 py-2 text-xs font-bold text-warm-white hover:bg-white/10 text-center">View Details</Link>
                                                <button className="rounded-lg border border-primary/30 bg-primary/10 py-2 text-xs font-bold text-primary hover:bg-primary/20">Apply Now</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Banking Section */}
                    {showBanking && favoriteBanking.length > 0 && (
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
                                                <div
                                                    className="flex h-12 w-12 items-center justify-center rounded-lg text-white font-bold text-[10px] tracking-tighter"
                                                    style={{ backgroundColor: tier.bankColor }}
                                                >
                                                    {tier.bank}
                                                </div>
                                                <div>
                                                    <span className="inline-flex items-center rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-dim mb-1">Banking Tier</span>
                                                    <div className="flex flex-col">
                                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gold-dim">{tier.tierType}</p>
                                                        <h3 className="text-lg font-bold text-warm-white leading-tight">{tier.tierName}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10"
                                                title="Remove from Favourites"
                                                onClick={() => toggleFavorite('banking', tier.id)}
                                            >
                                                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                            </button>
                                        </div>
                                        <div className="mt-2 mb-6 border-t border-dashed border-white/5 pt-4 flex-1">
                                            <p className="text-sm text-warm-white/80">{tier.tagline}</p>
                                        </div>
                                        <div className="mt-auto">
                                            <Link to={`/banking/${tier.id}`} className="w-full block text-center rounded-lg bg-white/5 py-2.5 text-xs font-bold uppercase tracking-wider text-warm-white transition-colors hover:bg-white/10">View Details</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Guides Section */}
                    {showGuides && (favoriteGuides.length > 0 || favoriteArticles.length > 0) && (
                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-xl font-bold text-warm-white">
                                    <span className="material-symbols-outlined text-primary">menu_book</span>
                                    Saved Guides & Articles
                                </h2>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/20">{favoriteGuides.length + favoriteArticles.length} Saved</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[...favoriteGuides, ...favoriteArticles].map((guide) => (
                                    <div key={guide.id} className="flex flex-col gap-4 rounded-xl border border-white/5 bg-espresso-800 p-4 transition-all hover:border-primary/30 sm:flex-row">
                                        <div className="aspect-video w-full overflow-hidden rounded-lg bg-espresso-900 sm:w-40 shrink-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-4xl text-espresso-700">article</span>
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">Guide • {guide.category}</span>
                                                    <button
                                                        className="flex h-6 w-6 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10"
                                                        title="Remove from Favourites"
                                                        onClick={() => toggleFavorite(favoriteGuides.includes(guide) ? 'guides' : 'articles', guide.id)}
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                                    </button>
                                                </div>
                                                <h3 className="text-base font-bold leading-tight text-warm-white hover:text-primary cursor-pointer transition-colors mt-1">{guide.title}</h3>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-2 text-xs text-gold-dim">
                                                    <span className="material-symbols-outlined text-[14px] text-copper">schedule</span>
                                                    {guide.readTime}
                                                </div>
                                                <Link to="/guides" className="text-xs font-bold text-gold-dim hover:text-primary">Read Now</Link>
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
                            <Link className="text-sm text-gold-dim hover:text-primary" to="/privacy">Privacy Policy</Link>
                            <Link className="text-sm text-gold-dim hover:text-primary" to="/terms">Terms of Service</Link>
                            <Link className="text-sm text-gold-dim hover:text-primary" to="/contact">Contact Support</Link>
                        </div>
                        <p className="mt-8 text-sm text-espresso-600">© 2024 CardPerks. All rights reserved.</p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
