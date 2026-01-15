import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Grid3X3,
    List,
    Heart,
    X,
    ChevronDown,
    Tag,
    Star,
    ExternalLink,
    Clock,
    Sparkles,
    ShoppingBag,
    Loader2
} from 'lucide-react';
import { toSlug } from '../utils/slugify';
import { useFavorites } from '../context/FavoritesContext';
import { staticVouchers, voucherCategories, normalizeVoucher, getBestDiscount, getDenominationsRange } from '../data/vouchers';

import SEO from '../components/SEO';

// API endpoint for vouchers
const VOUCHERS_API = 'https://tracker.cheq.dpdns.org/api/vouchers/';

// Categories for filtering
const categories = [
    'All',
    'Shopping',
    'Food',
    'Fashion',
    'Entertainment',
    'Travel',
    'Grocery',
    'Electronics',
    'Dining & Food',
    'Fashion & Accessories',
    'Travel & Leisure',
    'E-commerce & Technology',
    'Groceries & Essentials',
    'Entertainment & OTT',
    'Home & Living',
    'Health & Wellness',
    'Jewellery',
];

export default function Vouchers() {
    const { category: categoryParam } = useParams();
    const navigate = useNavigate();

    // Find category from URL param or use default
    const initialCategory = categoryParam
        ? categories.find(c => toSlug(c) === categoryParam) || 'All'
        : 'All';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    // API data state
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use global favorites context
    const { isFavorite, toggleFavorite } = useFavorites();

    // Fetch vouchers from API with fallback to static data
    useEffect(() => {
        const fetchVouchers = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(VOUCHERS_API);
                if (!response.ok) {
                    throw new Error('Failed to fetch vouchers');
                }
                const data = await response.json();
                // Normalize API data to match expected format
                const normalizedVouchers = data.map(normalizeVoucher);
                setVouchers(normalizedVouchers);
            } catch (err) {
                console.warn('API fetch failed, using static data:', err);
                setError(err.message);
                // Fallback to static data
                const normalizedFallback = staticVouchers.map(normalizeVoucher);
                setVouchers(normalizedFallback);
            } finally {
                setLoading(false);
            }
        };

        fetchVouchers();
    }, []);

    // Update URL when category changes
    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        if (cat === 'All') {
            navigate('/vouchers', { replace: true });
        } else {
            navigate(`/vouchers/${toSlug(cat)}`, { replace: true });
        }
    };

    // Filter vouchers based on selected category and search
    const filteredVouchers = vouchers.filter(v => {
        const matchesCategory = selectedCategory === 'All' ||
            (v.category && v.category.toLowerCase().includes(selectedCategory.toLowerCase()));
        const matchesSearch = !searchQuery ||
            (v.name && v.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (v.description && v.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (v.brand && v.brand.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });



    const seoTitle = selectedCategory === 'All'
        ? 'Premium Vouchers & Gift Cards | CardPerks'
        : `${selectedCategory} Vouchers | CardPerks`;

    const seoDescription = selectedCategory === 'All'
        ? 'Discover the best voucher deals and maximize your credit card rewards. Compare rates across platforms and save more on every purchase.'
        : `Find the best ${selectedCategory} vouchers with exclusive discounts. Compare rates and maximize your credit card rewards.`;

    return (
        <>
            <SEO title={seoTitle} description={seoDescription} keywords={`vouchers, gift cards, ${selectedCategory}, discounts, credit card rewards`} />

            <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
                {/* Hero Header */}
                <div
                    className="relative overflow-hidden border-b"
                    style={{
                        backgroundColor: 'var(--bg-alt)',
                        borderColor: 'var(--border)',
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: `radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 60%)`,
                        }}
                    />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="animate-fade-in-up">
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
                                    style={{
                                        backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    <Tag size={14} />
                                    <span>{filteredVouchers.length} Vouchers Available</span>
                                </div>
                                <h1
                                    className="text-3xl md:text-4xl font-serif font-bold mb-2"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {selectedCategory === 'All' ? 'Premium Vouchers' : `${selectedCategory} Vouchers`}
                                </h1>
                                <p
                                    className="text-base max-w-xl"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    Maximize your rewards with exclusive voucher deals. Compare rates across platforms.
                                </p>
                            </div>

                            {/* Search */}
                            <div className="w-full md:w-80">
                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2"
                                        style={{ color: 'var(--text-muted)' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search vouchers..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg text-sm"
                                        style={{
                                            backgroundColor: 'var(--surface)',
                                            border: '1px solid var(--border)',
                                            color: 'var(--text-primary)',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Filters Bar */}
                    <div
                        className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2">
                            {categories.slice(0, 6).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                    style={{
                                        backgroundColor: selectedCategory === cat
                                            ? 'var(--accent)'
                                            : 'var(--surface)',
                                        color: selectedCategory === cat
                                            ? 'var(--bg)'
                                            : 'var(--text-secondary)',
                                        border: `1px solid ${selectedCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                <Filter size={16} />
                                More
                                <ChevronDown size={14} />
                            </button>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className="p-2 rounded-lg transition-all"
                                style={{
                                    backgroundColor: viewMode === 'grid' ? 'var(--surface)' : 'transparent',
                                    color: viewMode === 'grid' ? 'var(--accent)' : 'var(--text-muted)',
                                    border: viewMode === 'grid' ? '1px solid var(--border)' : '1px solid transparent',
                                }}
                            >
                                <Grid3X3 size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className="p-2 rounded-lg transition-all"
                                style={{
                                    backgroundColor: viewMode === 'list' ? 'var(--surface)' : 'transparent',
                                    color: viewMode === 'list' ? 'var(--accent)' : 'var(--text-muted)',
                                    border: viewMode === 'list' ? '1px solid var(--border)' : '1px solid transparent',
                                }}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Extended Filters */}
                    {showFilters && (
                        <div
                            className="mb-8 p-4 rounded-xl"
                            style={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                            }}
                        >
                            <div className="flex flex-wrap gap-2">
                                {categories.slice(6).map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                                        style={{
                                            backgroundColor: selectedCategory === cat
                                                ? 'color-mix(in srgb, var(--accent) 15%, transparent)'
                                                : 'transparent',
                                            color: selectedCategory === cat
                                                ? 'var(--accent)'
                                                : 'var(--text-secondary)',
                                            border: `1px solid ${selectedCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Loader2
                                size={40}
                                className="animate-spin mb-4"
                                style={{ color: 'var(--accent)' }}
                            />
                            <p
                                className="text-sm font-medium"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                Loading vouchers...
                            </p>
                        </div>
                    )}

                    {/* Voucher Grid */}
                    {!loading && (
                        <>
                            <div className={`grid gap-6 ${viewMode === 'grid'
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                : 'grid-cols-1'
                                }`}>
                                {filteredVouchers.map((voucher) => (
                                    <article
                                        key={voucher.id}
                                        onClick={() => setSelectedVoucher(voucher)}
                                        className="group cursor-pointer rounded-xl p-5 transition-all hover:-translate-y-1"
                                        style={{
                                            backgroundColor: 'var(--surface)',
                                            border: '1px solid var(--border)',
                                        }}
                                        itemScope
                                        itemType="https://schema.org/Offer"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center p-2"
                                                style={{ backgroundColor: 'white' }}
                                            >
                                                <img
                                                    src={voucher.logo}
                                                    alt={voucher.name}
                                                    className="w-full h-full object-contain"
                                                    loading="lazy"
                                                    itemProp="image"
                                                />
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite('vouchers', voucher.id);
                                                }}
                                                className="p-2 rounded-lg transition-all"
                                                style={{
                                                    color: isFavorite('vouchers', voucher.id) ? '#ef4444' : 'var(--text-muted)',
                                                }}
                                            >
                                                <Heart
                                                    size={18}
                                                    fill={isFavorite('vouchers', voucher.id) ? '#ef4444' : 'none'}
                                                />
                                            </button>
                                        </div>

                                        {/* Info */}
                                        <h2
                                            className="text-lg font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors"
                                            style={{ color: 'var(--text-primary)' }}
                                            itemProp="name"
                                        >
                                            {voucher.name}
                                        </h2>
                                        <p
                                            className="text-xs mb-4"
                                            style={{ color: 'var(--text-muted)' }}
                                            itemProp="category"
                                        >
                                            {voucher.category}
                                        </p>

                                        {/* Rate */}
                                        <div
                                            className="pt-4 border-t"
                                            style={{ borderColor: 'var(--border)' }}
                                        >
                                            <div className="flex items-end justify-between">
                                                <div>
                                                    <p
                                                        className="text-[10px] uppercase tracking-wider font-medium mb-1"
                                                        style={{ color: 'var(--text-muted)' }}
                                                    >
                                                        Effective Rate
                                                    </p>
                                                    <p
                                                        className="text-2xl font-bold"
                                                        style={{ color: 'var(--accent)' }}
                                                        itemProp="discount"
                                                    >
                                                        {voucher.rate}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p
                                                        className="text-[10px] uppercase tracking-wider font-medium mb-1"
                                                        style={{ color: 'var(--text-muted)' }}
                                                    >
                                                        Value Range
                                                    </p>
                                                    <p
                                                        className="text-sm font-medium"
                                                        style={{ color: 'var(--text-secondary)' }}
                                                        itemProp="price"
                                                    >
                                                        {voucher.value}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <button
                                            className="w-full mt-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
                                            style={{
                                                backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                                                color: 'var(--accent)',
                                                border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                                            }}
                                        >
                                            View Offers
                                        </button>
                                    </article>
                                ))}
                            </div>

                            {/* Empty State */}
                            {filteredVouchers.length === 0 && (
                                <div
                                    className="text-center py-16 rounded-xl"
                                    style={{
                                        backgroundColor: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                    }}
                                >
                                    <ShoppingBag
                                        size={48}
                                        className="mx-auto mb-4"
                                        style={{ color: 'var(--text-muted)' }}
                                    />
                                    <h3
                                        className="text-xl font-semibold mb-2"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        No vouchers found
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)' }}>
                                        Try adjusting your filters or search query
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Premium Quick View Modal */}
                {selectedVoucher && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(4px)' }}
                        onClick={() => setSelectedVoucher(null)}
                    >
                        <div
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col md:flex-row"
                            style={{
                                backgroundColor: 'var(--bg)',
                                border: '1px solid var(--border)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedVoucher(null)}
                                className="absolute top-4 right-4 z-20 p-2.5 rounded-full transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                <X size={20} />
                            </button>

                            {/* Left Panel - Brand Showcase */}
                            <div
                                className="w-full md:w-[38%] p-6 md:p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                }}
                            >
                                {/* Brand Image Container */}
                                <div
                                    className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 group"
                                    style={{ border: '1px solid var(--border)' }}
                                >
                                    {/* Corner Badge */}
                                    <div
                                        className="absolute top-3 left-3 z-10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                                        style={{
                                            backgroundColor: 'white',
                                            color: 'var(--bg)',
                                        }}
                                    >
                                        {selectedVoucher.name?.split(' ')[0] || 'Brand'}
                                    </div>

                                    {/* Logo Display */}
                                    <div
                                        className="w-full h-full flex items-center justify-center p-8 transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        <img
                                            src={selectedVoucher.logo}
                                            alt={selectedVoucher.name}
                                            className="w-2/3 h-auto object-contain"
                                        />
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div
                                        className="absolute inset-x-0 bottom-0 h-1/3"
                                        style={{
                                            background: 'linear-gradient(to top, var(--surface), transparent)',
                                        }}
                                    />
                                </div>

                                {/* Brand Info */}
                                <div className="text-center space-y-2 w-full">
                                    <h2
                                        className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-wide"
                                        style={{ color: 'var(--accent)' }}
                                    >
                                        {selectedVoucher.name}
                                    </h2>
                                    <p
                                        className="text-xs font-medium uppercase tracking-widest"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {selectedVoucher.description}
                                    </p>
                                </div>
                            </div>

                            {/* Right Panel - Offers */}
                            <div className="w-full md:w-[62%] flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
                                {/* Header */}
                                <div
                                    className="px-6 py-5 border-b"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    <div className="flex items-start justify-between pr-12">
                                        <div>
                                            <h3
                                                className="text-xl font-serif font-bold"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                Available Offers
                                            </h3>
                                            <p
                                                className="text-xs mt-1"
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                Compare real-time rewards across platforms
                                            </p>
                                        </div>
                                        <div
                                            className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded mt-1"
                                            style={{
                                                backgroundColor: 'var(--surface)',
                                                color: 'var(--text-muted)',
                                                border: '1px solid var(--border)',
                                            }}
                                        >
                                            <Clock size={12} />
                                            Updated today
                                        </div>
                                    </div>
                                </div>

                                {/* Offers List - Scrollable */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-3" style={{ maxHeight: 'calc(90vh - 180px)' }}>
                                    {/* Platform Offers from API */}
                                    {(selectedVoucher.platforms || [])
                                        .map((platform, idx) => {
                                            // Map platform names to icons
                                            const iconMap = {
                                                'iShop': '🏪',
                                                'Gyftr': '🎁',
                                                'MagicPin': '✨',
                                                'SaveSage': '💰',
                                                'Maximize': '💳',
                                                'Amazon': '📦',
                                            };
                                            const icon = iconMap[platform.name] || '🏷️';
                                            const isFirst = idx === 0; // First platform is typically the best

                                            return {
                                                platform: platform.name,
                                                type: platform.cap || 'Check Platform',
                                                icon,
                                                savings: platform.fee || 'Check Platform',
                                                cap: platform.cap,
                                                link: platform.link,
                                                color: platform.color,
                                                denominations: platform.denominations,
                                                recommended: isFirst,
                                            };
                                        })
                                        .map((offer, idx) => (
                                            <div key={idx} className="relative">
                                                {/* Best Rate Badge - Floating */}
                                                {offer.recommended && (
                                                    <div
                                                        className="absolute -top-2 left-4 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                                                        style={{
                                                            backgroundColor: 'var(--accent)',
                                                            color: 'var(--bg)',
                                                        }}
                                                    >
                                                        <Sparkles size={10} />
                                                        Best Rate
                                                    </div>
                                                )}

                                                <div
                                                    className="rounded-xl p-4 transition-all hover:scale-[1.01]"
                                                    style={{
                                                        backgroundColor: 'var(--surface)',
                                                        border: offer.recommended
                                                            ? '2px solid var(--accent)'
                                                            : '1px solid var(--border)',
                                                        marginTop: offer.recommended ? '4px' : '0',
                                                    }}
                                                >
                                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                        {/* Platform Info */}
                                                        <div
                                                            className="flex items-center gap-3 w-full sm:w-[35%] sm:border-r sm:pr-4"
                                                            style={{ borderColor: 'var(--border)' }}
                                                        >
                                                            <div
                                                                className="w-11 h-11 rounded-lg flex items-center justify-center text-xl shrink-0"
                                                                style={{
                                                                    backgroundColor: offer.recommended
                                                                        ? 'color-mix(in srgb, var(--accent) 20%, transparent)'
                                                                        : 'var(--bg)',
                                                                    border: `1px solid ${offer.recommended ? 'var(--accent)' : 'var(--border)'}`,
                                                                }}
                                                            >
                                                                {offer.icon}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4
                                                                    className="font-semibold truncate"
                                                                    style={{ color: 'var(--text-primary)' }}
                                                                >
                                                                    {offer.platform}
                                                                </h4>
                                                                <p
                                                                    className="text-[10px] uppercase tracking-wider"
                                                                    style={{ color: offer.recommended ? 'var(--accent)' : 'var(--text-muted)' }}
                                                                >
                                                                    {offer.type}
                                                                </p>
                                                            </div>
                                                            {/* Info Tooltip */}
                                                            <div className="relative group/tooltip">
                                                                <button
                                                                    className="p-1 rounded opacity-50 hover:opacity-100 transition-opacity"
                                                                    style={{ color: 'var(--text-muted)' }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <circle cx="12" cy="12" r="10" />
                                                                        <path d="M12 16v-4" />
                                                                        <path d="M12 8h.01" />
                                                                    </svg>
                                                                </button>
                                                                {/* Tooltip Content */}
                                                                <div
                                                                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-30"
                                                                    style={{
                                                                        backgroundColor: 'var(--bg)',
                                                                        border: '1px solid var(--border)',
                                                                        color: 'var(--text-secondary)',
                                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                                                    }}
                                                                >
                                                                    {offer.recommended
                                                                        ? 'Highest savings with no monthly cap'
                                                                        : `Via ${offer.type} platform`}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Savings & Action */}
                                                        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-[65%]">
                                                            <div className="flex-1">
                                                                <p
                                                                    className="text-[9px] uppercase tracking-wider font-medium mb-0.5"
                                                                    style={{ color: 'var(--text-muted)' }}
                                                                >
                                                                    Savings
                                                                </p>
                                                                <p
                                                                    className="text-lg sm:text-xl font-bold"
                                                                    style={{ color: 'var(--accent)' }}
                                                                >
                                                                    {offer.savings}
                                                                </p>
                                                            </div>
                                                            <div className="flex-1">
                                                                <p
                                                                    className="text-[9px] uppercase tracking-wider font-medium mb-0.5"
                                                                    style={{ color: 'var(--text-muted)' }}
                                                                >
                                                                    Cap/Mo
                                                                </p>
                                                                <p
                                                                    className="text-sm font-semibold"
                                                                    style={{ color: 'var(--text-secondary)' }}
                                                                >
                                                                    {offer.cap}
                                                                </p>
                                                            </div>
                                                            {offer.recommended ? (
                                                                <button
                                                                    className="h-9 px-5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all hover:opacity-90 shrink-0"
                                                                    style={{
                                                                        backgroundColor: 'var(--accent)',
                                                                        color: 'var(--bg)',
                                                                    }}
                                                                >
                                                                    Buy Now
                                                                    <ExternalLink size={14} />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="h-9 w-9 rounded-lg flex items-center justify-center transition-all hover:scale-105 shrink-0"
                                                                    style={{
                                                                        backgroundColor: 'transparent',
                                                                        color: 'var(--accent)',
                                                                        border: '1px solid var(--border)',
                                                                    }}
                                                                >
                                                                    <ExternalLink size={16} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                {/* Footer */}
                                <div
                                    className="px-6 py-3 border-t"
                                    style={{
                                        borderColor: 'var(--border)',
                                        backgroundColor: 'color-mix(in srgb, var(--surface) 50%, transparent)',
                                    }}
                                >
                                    <p
                                        className="text-[10px] text-center"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        Offers are real-time and subject to card eligibility.{' '}
                                        <span style={{ color: 'var(--accent)', cursor: 'pointer' }}>View T&C</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
