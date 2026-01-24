import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import {
    Heart,
    ShoppingBag,
    CreditCard,
    BookOpen,
    Landmark,
    TrendingUp,
    TrendingDown,
    Minus,
    Clock
} from 'lucide-react';
import SEO from '../../components/SEO';
import { toSlug } from '../../utils/slugify';

// Import actual data sources
import { creditCards as creditCardsData } from '../../data/creditCards';
import { bankingData } from '../../data/banking';

// Transform card data for display (simplified version of Cards.jsx transform)
const transformCardForDisplay = (card) => {
    const annualFee = card.fees?.annual || 0;
    const formatFee = (fee) => {
        if (fee === 0) return 'Lifetime Free';
        if (fee >= 100000) return `₹${(fee / 100000).toFixed(1)}L`;
        if (fee >= 1000) return `₹${(fee / 1000).toFixed(fee % 1000 === 0 ? 0 : 1)}k`;
        return `₹${fee}`;
    };
    const baseRate = card.rewards?.baseRate || 0;
    const rewardRate = baseRate > 0 ? `${(baseRate * 100).toFixed(1)}%` : 'Varies';

    return {
        id: card.slug || card.id,
        name: card.name,
        bank: card.bank,
        tier: card.metadata?.tags?.find(t => ['Super Premium', 'Premium', 'Mid-Tier', 'Entry'].includes(t)) || 'Card',
        rewardRate,
        annualFee: formatFee(annualFee),
        image: card.image,
    };
};

// Flatten banking tiers for lookup
const getAllBankingTiers = () => {
    const tiers = [];
    bankingData.forEach(bank => {
        if (bank.tiers) {
            bank.tiers.forEach(tier => {
                tiers.push({
                    id: tier.id,
                    name: tier.name,
                    bank: bank.name,
                    tierType: tier.type || 'Premium',
                    tagline: tier.description || tier.metadata?.bestFor || 'Premium banking services',
                    bankColor: bank.theme || '#333',
                });
            });
        }
    });
    return tiers;
};

// All cards transformed
const allCards = creditCardsData.map(transformCardForDisplay);

// All banking tiers
const allBanking = getAllBankingTiers();

// Voucher data (matching Vouchers.jsx)
const allVouchers = [
    { id: 1, name: 'Amazon Pay', category: 'Shopping', rate: '3.0%', trend: '+0.5%', trendType: 'up' },
    { id: 2, name: 'Flipkart', category: 'Shopping', rate: '4.5%', trend: '+0.3%', trendType: 'up' },
    { id: 3, name: 'Tata CLiQ Lux', category: 'Fashion & Accessories', rate: '8.0%', trend: 'Stable', trendType: 'stable' },
    { id: 4, name: 'MakeMyTrip', category: 'Travel & Leisure', rate: '6.5%', trend: '+1.0%', trendType: 'up' },
    { id: 5, name: 'Croma', category: 'E-commerce & Technology', rate: '2.5%', trend: 'Stable', trendType: 'stable' },
    { id: 6, name: 'Zomato', category: 'Dining & Food', rate: '9.0%', trend: '+0.5%', trendType: 'up' },
    { id: 7, name: 'Uber', category: 'Travel & Leisure', rate: '4.0%', trend: 'Stable', trendType: 'stable' },
    { id: 8, name: 'Swiggy', category: 'Dining & Food', rate: '8.5%', trend: '+0.2%', trendType: 'up' },
];

// Guides data
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
        <div className="flex flex-1 overflow-hidden relative" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Your Favorites | VoucherTracker"
                description="Access your saved vouchers, credit cards, banking tiers, and guides all in one place."
                keywords="favorites, bookmarks, saved items, voucher tracker"
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto scroll-smooth">
                <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 lg:py-10">
                    {/* Header */}
                    <div className="mb-10 flex flex-col gap-6 border-b pb-8 md:flex-row md:items-end md:justify-between sticky top-0 z-10 pt-4 -mt-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
                        <div>
                            <h1 className="text-3xl font-black md:text-4xl" style={{ color: 'var(--text-primary)' }}>
                                Your <span style={{ color: 'var(--accent)' }}>Favourites</span>
                            </h1>
                            <p className="mt-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
                                {hasAnyFavorites
                                    ? `Manage your ${totalFavorites} tracked items across all categories.`
                                    : 'Start adding items to your favorites to see them here.'}
                            </p>
                        </div>

                        <div className="flex gap-1 overflow-x-auto rounded-lg p-1 border shadow-inner hide-scrollbar" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`rounded-md px-5 py-2 text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                                        ? 'font-bold shadow-sm'
                                        : 'hover:brightness-110'
                                        }`}
                                    style={{
                                        backgroundColor: activeTab === tab ? 'var(--accent)' : 'transparent',
                                        color: activeTab === tab ? 'var(--bg)' : 'var(--text-secondary)'
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Empty State */}
                    {!hasAnyFavorites && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="size-24 rounded-full border flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <Heart size={48} style={{ color: 'var(--text-muted)' }} />
                            </div>
                            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>No Favorites Yet</h2>
                            <p className="max-w-md mb-8" style={{ color: 'var(--text-secondary)' }}>
                                Browse our vouchers, cards, and guides to start building your personalized collection of favorites.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/vouchers" className="px-6 py-3 rounded-lg font-bold text-sm transition-colors hover:brightness-110" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}>
                                    Explore Vouchers
                                </Link>
                                <Link to="/cards" className="px-6 py-3 rounded-lg border font-bold text-sm transition-colors hover:bg-[var(--surface)]" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                                    Browse Cards
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Vouchers Section */}
                    {showVouchers && favoriteVouchers.length > 0 && (
                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    <ShoppingBag size={24} style={{ color: 'var(--accent)' }} />
                                    Watchlisted Vouchers
                                </h2>
                                <span className="rounded-full px-3 py-1 text-xs font-bold ring-1" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', ringColor: 'rgba(var(--accent-rgb), 0.2)' }}>{favoriteVouchers.length} Saved</span>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {favoriteVouchers.map((voucher) => (
                                    <div key={voucher.id} className="group relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                        <div className="mb-2 flex justify-between items-center">
                                            <span className="inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)' }}>Voucher</span>
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10"
                                                title="Remove from Favourites"
                                                onClick={() => toggleFavorite('vouchers', voucher.id)}
                                            >
                                                <Heart size={20} fill="currentColor" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${voucher.color || 'text-[var(--accent)]'}`} style={{ backgroundColor: 'var(--bg)' }}>
                                                <ShoppingBag size={24} />
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-base font-bold line-clamp-1" style={{ color: 'var(--text-primary)' }}>{voucher.name}</h3>
                                                <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{voucher.category}</p>
                                            </div>
                                        </div>
                                        <div className="mt-5 flex items-baseline gap-2">
                                            <span className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{voucher.rate}</span>
                                            <span className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${voucher.trendType === 'up' ? 'text-green-500 bg-green-500/10' :
                                                voucher.trendType === 'down' ? 'text-red-500 bg-red-500/10' :
                                                    'text-[var(--text-secondary)] bg-[var(--text-secondary)]/10'
                                                }`}>
                                                {voucher.trendType === 'up' ? <TrendingUp size={14} className="mr-0.5" /> : voucher.trendType === 'down' ? <TrendingDown size={14} className="mr-0.5" /> : <Minus size={14} className="mr-0.5" />}
                                                {voucher.trend}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-[11px]" style={{ color: 'var(--text-secondary)' }}>Real-time market rate</p>
                                        <div className="mt-5 flex gap-3">
                                            <Link to={`/vouchers/${toSlug(voucher.category)}`} className="flex-1 rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:brightness-110 text-center" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>Details</Link>
                                            <button className="flex-1 rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition-transform hover:scale-[1.02]" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}>Buy Now</button>
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
                                <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    <CreditCard size={24} style={{ color: 'var(--accent)' }} />
                                    Saved Cards
                                </h2>
                                <span className="rounded-full px-3 py-1 text-xs font-bold ring-1" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', ringColor: 'rgba(var(--accent-rgb), 0.2)' }}>{favoriteCards.length} Saved</span>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {favoriteCards.map((card) => (
                                    <div key={card.id} className="group relative overflow-hidden rounded-xl border p-0 transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                        <div className="relative h-40 p-4 flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
                                            {card.image ? (
                                                <img
                                                    src={card.image}
                                                    alt={card.name}
                                                    className="h-full w-auto object-contain max-w-full"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <CreditCard size={48} style={{ color: 'var(--accent)' }} />
                                                    <span className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>{card.bank}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-1" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)' }}>Credit Card</span>
                                                    <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>{card.name}</h3>
                                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{card.tier}</p>
                                                </div>
                                                <button
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10"
                                                    title="Remove from Favourites"
                                                    onClick={() => toggleFavorite('cards', card.id)}
                                                >
                                                    <Heart size={20} fill="currentColor" />
                                                </button>
                                            </div>
                                            <div className="mt-4 space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span style={{ color: 'var(--text-secondary)' }}>Reward Rate</span>
                                                    <span className="font-bold" style={{ color: 'var(--accent)' }}>{card.rewardRate}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span style={{ color: 'var(--text-secondary)' }}>Annual Fee</span>
                                                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{card.annualFee}</span>
                                                </div>
                                            </div>
                                            <div className="mt-5 grid grid-cols-2 gap-3">
                                                <Link to={`/cards/${card.id}`} className="rounded-lg py-2 text-xs font-bold hover:brightness-110 text-center" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>View Details</Link>
                                                <button className="rounded-lg border py-2 text-xs font-bold hover:bg-[var(--surface)]" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'rgba(var(--accent-rgb), 0.1)' }}>Apply Now</button>
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
                                <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    <Landmark size={24} style={{ color: 'var(--accent)' }} />
                                    Saved Banking Tiers
                                </h2>
                                <span className="rounded-full px-3 py-1 text-xs font-bold ring-1" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', ringColor: 'rgba(var(--accent-rgb), 0.2)' }}>{favoriteBanking.length} Saved</span>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {favoriteBanking.map((tier) => (
                                    <div key={tier.id} className="group relative flex flex-col overflow-hidden rounded-xl border p-5 transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                        <div className="mb-4 flex justify-between items-start">
                                            <div className="flex gap-4 items-center">
                                                <div
                                                    className="flex h-12 w-12 items-center justify-center rounded-lg font-bold text-[10px] tracking-tighter text-white"
                                                    style={{ backgroundColor: tier.bankColor }}
                                                >
                                                    {tier.bank}
                                                </div>
                                                <div>
                                                    <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-1" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)' }}>Banking Tier</span>
                                                    <div className="flex flex-col">
                                                        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{tier.tierType}</p>
                                                        <h3 className="text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>{tier.tierName}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10"
                                                title="Remove from Favourites"
                                                onClick={() => toggleFavorite('banking', tier.id)}
                                            >
                                                <Heart size={20} fill="currentColor" />
                                            </button>
                                        </div>
                                        <div className="mt-2 mb-6 border-t border-dashed pt-4 flex-1" style={{ borderColor: 'var(--border)' }}>
                                            <p className="text-sm" style={{ color: 'rgba(var(--text-primary-rgb), 0.8)' }}>{tier.tagline}</p>
                                        </div>
                                        <div className="mt-auto">
                                            <Link to={`/banking/${tier.id}`} className="w-full block text-center rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:brightness-110" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>View Details</Link>
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
                                <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    <BookOpen size={24} style={{ color: 'var(--accent)' }} />
                                    Saved Guides & Articles
                                </h2>
                                <span className="rounded-full px-3 py-1 text-xs font-bold ring-1" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', ringColor: 'rgba(var(--accent-rgb), 0.2)' }}>{favoriteGuides.length + favoriteArticles.length} Saved</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[...favoriteGuides, ...favoriteArticles].map((guide) => (
                                    <div key={guide.id} className="flex flex-col gap-4 rounded-xl border p-4 transition-all hover:shadow-lg sm:flex-row" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                        <div className="aspect-video w-full overflow-hidden rounded-lg sm:w-40 shrink-0 flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
                                            <BookOpen size={32} style={{ color: 'var(--text-muted)' }} />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)' }}>Guide • {guide.category}</span>
                                                    <button
                                                        className="flex h-6 w-6 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10"
                                                        title="Remove from Favourites"
                                                        onClick={() => toggleFavorite(favoriteGuides.includes(guide) ? 'guides' : 'articles', guide.id)}
                                                    >
                                                        <Heart size={18} fill="currentColor" />
                                                    </button>
                                                </div>
                                                <h3 className="text-base font-bold leading-tight cursor-pointer transition-colors mt-1 hover:text-[var(--accent)]" style={{ color: 'var(--text-primary)' }}>{guide.title}</h3>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                    <Clock size={14} style={{ color: 'var(--text-secondary)' }} />
                                                    {guide.readTime}
                                                </div>
                                                <Link to={`/guides/${guide.id}`} className="text-xs font-bold hover:text-[var(--accent)]" style={{ color: 'var(--text-secondary)' }}>Read Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Footer */}
                    <footer className="mt-20 border-t py-10 text-center" style={{ borderColor: 'var(--border)' }}>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            <Link className="text-sm hover:text-[var(--accent)]" style={{ color: 'var(--text-secondary)' }} to="/privacy">Privacy Policy</Link>
                            <Link className="text-sm hover:text-[var(--accent)]" style={{ color: 'var(--text-secondary)' }} to="/terms">Terms of Service</Link>
                            <Link className="text-sm hover:text-[var(--accent)]" style={{ color: 'var(--text-secondary)' }} to="/contact">Contact Support</Link>
                        </div>
                        <p className="mt-8 text-sm" style={{ color: 'var(--text-muted)' }}>© 2024 CardPerks. All rights reserved.</p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
