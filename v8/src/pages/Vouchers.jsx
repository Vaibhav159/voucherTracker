import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { toSlug, fromSlug } from '../utils/slugify';

// Static placeholder data for vouchers
const categories = [
    'All', 'Dining & Food', 'Fashion & Accessories', 'Travel & Leisure',
    'E-commerce & Technology', 'Groceries & Essentials', 'Entertainment & OTT',
    'Home & Living', 'Health & Wellness', 'Miscellaneous', 'Jewellery',
    'New', 'Books & Stationery', 'Beauty & Personal Care', 'Sports & Fitness',
    'Shopping', 'Gaming'
];

const popularVouchers = [
    {
        id: 1,
        name: 'Taj Epicure Plus',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnAtu-QR6_CP0UCf8hGSh8dHj4yewlwefB85eeU3BS67QiT7BNghVu9jovQ5g2OuIII8B0wauqVKWqqCrofZcXz0omkiYX35URgsMko3joKfPbkQsF_sRvdJxwC_Pnn_BRHGBiyN5K0gGvsWk1fvDf6cyKuYfTOg44NoaPrw00xleFvYnwpgoWJLM09qfojjO1qaFokVb9vgJfD7C5MzT830-eVg4Ak1RW0Ae7pG9ix5luRmVLwxhBJEaehh0XhzGMADwLxoMZDmzL',
        discount: '25% OFF',
        description: 'Luxury Dining & Stays',
        badge: 'Ends in 4h',
        badgeType: 'timer'
    },
    {
        id: 2,
        name: 'Ethos Watches',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFfCT9brPI76WstLeXdvhwzyQzMLCmk_VJo_BgYOUfSuz6yDuPO3Q-NpYfSWOCHy2UpDqsrvtHw8738PhRs4Ro0dG5a1DXkP893rGvFLYHPtGPEnecAoY-vUUnJ-8vPcKRHnWos6qtatC0zPIllktk9dCLUSv-8SWvqCJ0wmUzRraxbmwunVBDN-KJ0MfegzEsFnFgadnh0puXm2jibqALd_pOA_41ZainYE6z1xaN5cqiSBpwyh_yRjMBesbNp_NDedAvXiWlHk9k',
        discount: '5% Back',
        description: 'Plus free comprehensive insurance.',
        badge: 'Cashback',
        badgeType: 'cashback'
    },
    {
        id: 3,
        name: 'Singapore Air',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx03ltNqZoOIZlJQYFqxtEjXqM_Jvl2Sxh2m7-XZoaCpaWnH3Y4-4FT-IScynKfw9ksaBpcVNWoDKW0ASAJbdAHJo2SzmSmO3NQQKR3iqnDHG9aG3fCl6AJ1gn6QiEQR4Y8X_NF-Xyv3_TORTYc8ys7ARPGCNUwy09SxhNmlpKyxyOujhiBcweVI590fLu36KfGS7vCD-UvgPnotDjf4QeBArbf51KpNn5f_cGRvnBEs2GAZetuyGqYAw6ipdJS5jrHyF0m0fcvPaV',
        discount: '2x Pts',
        description: 'Double points on Business Class bookings.',
        badge: 'Multiplier',
        badgeType: 'multiplier'
    }
];

const allVouchers = [
    { id: 1, name: 'Amazon Pay', category: 'Shopping & Utilities', rate: '3.0%', value: '₹5k - ₹50k', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6ooTpHUSnAD9hmeg7s1PEfgLoq7kgBpeRRPU3a3UGNEWHnVXEA_L6LkoilChCHJwo4H14Mk62SWPWZVKKi_pFE1dyrTT77oFgpp4bOtByYracviXGTEh65FgAUKScYl3rY3QI9gzY1vbSfsWghAyIcNJ4MhbN_Bdp7S7VK_e4cbFbzKKus6pwVFAIbWJPHz4M5GQOGUoTXsUXOvPKZVohrvtzk6ijpTy6Srrf_i6qx_xl253JXbk3WyVqWZn0PaTesO0ZpzCTJpfi', description: 'Utility Bill Payments & Shopping', accent: '#000000' },
    { id: 2, name: 'Flipkart', category: 'Electronics & Fashion', rate: '4.5%', value: '₹2k - ₹25k', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSMojF3rvw73gprVwzCBUCoYRgI7GOdnc5eaplizQrIJFpqkUc82WRJCdZquN9bFgBtvpP4YlW1Lm194FZ0zp-U3RXf6JrB9pOap1dkSJXo6R3my73kgrwLyzDQpCV4kIYR2ZpIGcbtp21fSPMrxinvCds4i4Vai7MVmm2VYwzCrkvohNi29HXy1KvU4Va4i3tzSK2H0YHgtp0KCNnYMu4WNfuCLpGpRDjdNodgD1O90-NtzIftNXGAk74yLUJLeLMgymQetDZiqAY', description: 'Big Billion Days Offers', accent: '#2874f0' },
    { id: 3, name: 'Tata CLiQ Lux', category: 'Premium Brands', rate: '8.0%', value: '₹10k - ₹1L', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEdbAgcCQMfi9KSzqnzCkFTwBfgbiHmvO4JYxSLr-QOKwrsZ8RuVC1zMGzO7Qpn7r7Jqd1WxR41uPbdKQuH9Qf4Tw5F1k1-9F-QSCK2Y3fmFgvZBG5F3fnjXYThBhD6wMvrlzs15z2Ti6ndRui3p3Q0bD-sQX8pV_4A-1G0MDkXdgWA2SONVMyMY_M2oydYeutePq7VEVqMACY2-dPZGNrPEpwnaLc3t_6hA17oH3yD8M3fqlM4gzSXtiw26o513btn_K0OcKP9f12', description: 'Luxury Fashion & Lifestyles', accent: '#000000' },
    { id: 4, name: 'MakeMyTrip', category: 'Flights & Hotels', rate: '6.5%', value: '₹5k - ₹50k', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM-ONx7YRVj3FdDI7tiF6jXggWo8vVeNsdhmAYpSva-x39r2gRDg2MuwUK1ln_XSPJldShfEX1j95iBTv4RPvUA-0-ZrzUT4DPxVlrmKOTFKFJNAA-DxsIa4oSwTNiS5VANIKVCyzPYhhEZLCqfrT9Nvda9LQcB2Wjcm6BDfhdeG13QGkpyA0OO1IZqjs29PqRSFgyNz12sw5HzSz_s5W45A_HQj3bKMYUl5h13-Lq0D0ve-4Y06wOlIdJxYAruOA5D9mqEOQ2QLyc', description: 'Hotels, Flights & Holiday Packages', accent: '#c11b1b' },
    { id: 5, name: 'Croma', category: 'Electronics', rate: '2.5%', value: '₹1k - ₹20k', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqEG-P67B28mebCrP1nukI8G_eCwTqUK7Lx0oZknEOlpKdz4VRBIdFrJlfukKbWnLdPxI9VOAjfQygXpMM75e4uHL3zOCQMQLw05jzckvAlTUeS6d9MGNV07y5CoSaIxE_pJXWBwunxq7Ms4IsV2vcF5s9eNMRrt8EKnGZMkHUpM-yLMawMt2GhJXIL_GqWMuM0ryNo1Hp0FsiczJ3FcAj7KPCSRY5an8AoW9iTbYeZwBfcp_KhhpkcRB9t2qnqhpaqOxuaGBZShwE', description: 'Gadgets & Home Appliances', accent: '#00e9a3' },
    { id: 6, name: 'Zomato Gold', category: 'Dining', rate: '9.0%', value: '₹500 - ₹2k', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBDsnC14q0_RtAr00y67eEuLu8dLGD68k501H14IrHKN_BNxt9vv8diQPGeelzcAwSEPSGkq0vZ9pebC204ch2vPFsNlJGdMAaLQPu4XotNdynDU1rvyEA3PkNy0iJDndHsrbXxXuJn5sPT09ltohF_BuHPccFAbpaCWDGT7QnNGTm-dx4dbfwO2c2zguNuv6Ckylis_NbykYPBreFM-F4GHg05m2uYwHQxHxm9pb05NsSOg5GMd0FoSuCorZktrSJkJI6jkmTBjBw', description: 'Food Delivery & Dining', accent: '#cb202d' },
    { id: 7, name: 'Uber', category: 'Travel & Commute', rate: '4.0%', value: '₹250 - ₹1k', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjrU0BovYB7KFoJhxYaf2i-WqsZTevE70yUIKVEMbNBZhTsoPXjT7aqYFOAUil2l5t8O8MFYglpR_hW5eHBWDhGsUmgsy_hF9Q5s-C8cmQ11T7T9Q9gPvwV27ntdl0cMGJkBgIeeh6ZC7qim8E-RMPNbBqISe1ePwrqn-bP6NdFyLwtnvJ0VvJu8GiDE8VfTijj24fd4Y2upd6CJdCz-77xzTdIF9Myw8Ou_2JRZ9FL3m0LZbvi5O_TT4cDD5UuET-ALKanV6kjJxe', description: 'Rides & Intercity Travel', accent: '#000000' },
    { id: 8, name: 'Pantaloons', category: 'Fashion Retail', rate: '7.5%', value: '₹1k - ₹10k', logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrkvktUP3yXOPrJLGn0AA6smpfIUsoQK99C-5YueLjRuPK00TgFDvZNaZmi1Li5CSzosnNv1NDHYfyAgXSVoFKNy9ee0mh5MHcrTFVjvCorI8FiU7dwyvjEL2STBXZti9nAMJmNI_tpTiVWHNY0vKhKeuvawd6vKzeDv_gUb4PbNNVTKwu5XunDVSuD7y_WF1g8IwHLcP79RA33q6HBZTeYnLc3W7va1wMxuycU3N6Ths8WvSqZNVU30TfCdBQA4yXnI1mqjQUZi8l', description: 'Trendy Fashion & Styles', accent: '#000000' },
];

export default function Vouchers() {
    const { category: categoryParam } = useParams();
    const navigate = useNavigate();

    // Find category from URL param or use default
    const initialCategory = categoryParam
        ? categories.find(c => toSlug(c) === categoryParam) || 'All'
        : 'All';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState('recommended');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    // Update URL when category changes
    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        if (cat === 'All') {
            navigate('/vouchers', { replace: true });
        } else {
            navigate(`/vouchers/${toSlug(cat)}`, { replace: true });
        }
    };

    // Filter vouchers based on selected category
    const filteredVouchers = selectedCategory === 'All'
        ? allVouchers
        : allVouchers.filter(v =>
            v.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            selectedCategory.toLowerCase().includes(v.category.split(' ')[0].toLowerCase())
        );

    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const { isFavorite, toggleFavorite, getFavoriteCount, clearFavorites, getFavoriteIds, notification } = useFavorites();

    const handleVoucherClick = (voucher) => {
        setSelectedVoucher(voucher);
    };

    const closeVoucherModal = () => {
        setSelectedVoucher(null);
    };

    const handleToggleFavorite = (e, voucherId) => {
        e.stopPropagation();
        toggleFavorite('vouchers', voucherId);
    };

    return (
        <div className="flex flex-col h-full overflow-hidden relative">
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 flex flex-col bg-background-dark border-r border-primary/20 relative z-20 overflow-y-auto hide-scrollbar pb-6">
                    <div className="p-6 pb-2">
                        <h3 className="text-gold-text font-serif font-bold text-lg mb-1">Filter Vouchers</h3>
                        <p className="text-warm-gray text-xs mb-6">Refine by category & preferences</p>

                        {/* Search in sidebar */}
                        <div className="relative w-full mb-4 group">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-dim group-focus-within:text-primary transition-colors material-symbols-outlined text-[18px]">search</span>
                            <input
                                className="w-full bg-surface-dark border border-primary/20 rounded-lg py-2 pl-9 pr-4 text-xs text-warm-white focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 placeholder-warm-gray/50 transition-all font-light"
                                placeholder="Search filters..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Reset button */}
                        <div className="mb-8">
                            <button
                                className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 bg-gradient-to-r from-primary to-[#8c5341] text-background-dark text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(200,127,69,0.4)] transition-shadow"
                                onClick={() => {
                                    handleCategoryChange('All');
                                    setSortBy('recommended');
                                    setSearchQuery('');
                                }}
                            >
                                <span className="material-symbols-outlined text-sm">filter_alt_off</span>
                                RESET FILTERS
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="mb-8">
                            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">category</span> Categories
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${selectedCategory === cat
                                            ? 'bg-primary/20 border border-primary text-white shadow-[0_0_8px_rgba(200,127,69,0.3)]'
                                            : 'bg-surface-dark border border-primary/20 text-warm-white hover:bg-white/5 hover:border-primary/50 hover:text-white'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort By */}
                        <div className="mb-8">
                            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">sort</span> Sort By
                            </h4>
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-3 group cursor-pointer">
                                    <input
                                        checked={sortBy === 'recommended'}
                                        onChange={() => setSortBy('recommended')}
                                        className="bg-surface-dark border-primary/30 text-primary focus:ring-primary/50 focus:ring-offset-background-dark"
                                        name="sortby"
                                        type="radio"
                                    />
                                    <span className={`text-sm transition-colors ${sortBy === 'recommended' ? 'text-warm-white' : 'text-gold-dim'} group-hover:text-white`}>Recommended</span>
                                </label>
                                <label className="flex items-center gap-3 group cursor-pointer">
                                    <input
                                        checked={sortBy === 'highest-roi'}
                                        onChange={() => setSortBy('highest-roi')}
                                        className="bg-surface-dark border-primary/30 text-primary focus:ring-primary/50 focus:ring-offset-background-dark"
                                        name="sortby"
                                        type="radio"
                                    />
                                    <span className={`text-sm transition-colors ${sortBy === 'highest-roi' ? 'text-warm-white' : 'text-gold-dim'} group-hover:text-white`}>Highest ROI</span>
                                </label>
                                <label className="flex items-center gap-3 group cursor-pointer">
                                    <input
                                        checked={sortBy === 'expires-soon'}
                                        onChange={() => setSortBy('expires-soon')}
                                        className="bg-surface-dark border-primary/30 text-primary focus:ring-primary/50 focus:ring-offset-background-dark"
                                        name="sortby"
                                        type="radio"
                                    />
                                    <span className={`text-sm transition-colors ${sortBy === 'expires-soon' ? 'text-warm-white' : 'text-gold-dim'} group-hover:text-white`}>Expires Soon</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-gradient-to-br from-background-dark to-[#0f0502]">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar p-8 pb-20">
                        <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
                            {/* Header */}
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-wrap items-end justify-between gap-4">
                                    <div>
                                        <h2 className="text-4xl font-serif text-warm-white mb-2">Exclusive Vouchers</h2>
                                        <p className="text-warm-gray font-light">Negotiated rates for premium cardholders. Maximize your <span className="text-primary font-medium">Reward ROI</span>.</p>
                                    </div>

                                    {/* Rate Ticker */}
                                    <div className="flex items-center gap-4 bg-surface-dark border border-primary/20 rounded-lg p-2 pr-4 shadow-lg shadow-black/30">
                                        <div className="bg-primary/10 rounded px-2 py-1">
                                            <span className="material-symbols-outlined text-primary text-sm">monitoring</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gold-dim uppercase tracking-wide">Gold (24k)</span>
                                            <span className="text-xs font-bold text-gold-text">₹7,200/g <span className="text-green-500 ml-1">+0.4%</span></span>
                                        </div>
                                        <div className="w-px h-6 bg-white/10 mx-2"></div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gold-dim uppercase tracking-wide">USD Buy</span>
                                            <span className="text-xs font-bold text-white">₹83.50 <span className="text-red-400 ml-1">-0.05%</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Popular Vouchers */}
                            <section className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-serif text-warm-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-sm">hotel_class</span>
                                        Popular Vouchers
                                    </h3>
                                    <div className="flex gap-2">
                                        <button className="p-1 rounded hover:bg-surface-dark-hover border border-transparent hover:border-primary/20 text-warm-white transition-all">
                                            <span className="material-symbols-outlined">chevron_left</span>
                                        </button>
                                        <button className="p-1 rounded hover:bg-surface-dark-hover border border-transparent hover:border-primary/20 text-warm-white transition-all">
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {popularVouchers.map((voucher) => (
                                        <div key={voucher.id} onClick={() => handleVoucherClick(voucher)} className="relative group bg-surface-dark rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-primary/10 cursor-pointer">
                                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent z-10"></div>
                                            <div
                                                className="h-48 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                                style={{ backgroundImage: `url("${voucher.image}")` }}
                                            ></div>
                                            <div className="absolute bottom-0 left-0 w-full p-5 z-20 flex flex-col gap-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${voucher.badgeType === 'timer' ? 'text-primary' :
                                                            voucher.badgeType === 'cashback' ? 'text-green-400' : 'text-primary'
                                                            }`}>
                                                            {voucher.badgeType === 'timer' && <span className="material-symbols-outlined text-[10px]">timer</span>}
                                                            {voucher.badge}
                                                        </p>
                                                        <h4 className="text-xl font-serif text-warm-white">{voucher.name}</h4>
                                                    </div>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded shadow-lg shadow-black/40 ${voucher.badgeType === 'timer'
                                                        ? 'bg-primary text-background-dark'
                                                        : 'bg-white/10 backdrop-blur text-gold-text border border-gold-dim/30'
                                                        }`}>
                                                        {voucher.discount}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-warm-gray">{voucher.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* All Offers Header */}
                            <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                                <h3 className="text-lg font-serif text-warm-white">All Offers</h3>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-gold-dim uppercase tracking-wider font-medium">View:</span>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`transition-colors ${viewMode === 'grid' ? 'text-primary' : 'text-gold-dim'} hover:text-white`}
                                        >
                                            <span className="material-symbols-outlined">grid_view</span>
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`transition-colors ${viewMode === 'list' ? 'text-primary' : 'text-gold-dim'} hover:text-white`}
                                        >
                                            <span className="material-symbols-outlined">view_list</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Voucher Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {filteredVouchers.map((voucher) => (
                                    <div key={voucher.id} onClick={() => handleVoucherClick(voucher)} className="bg-surface-dark rounded-xl p-5 border border-white/5 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] group flex flex-col gap-4 relative overflow-hidden cursor-pointer">
                                        <div className="absolute top-0 right-0 p-5 z-10">
                                            <button
                                                className={`transition-colors ${isFavorite('vouchers', voucher.id) ? 'text-red-500' : 'text-gold-dim hover:text-primary'}`}
                                                onClick={(e) => handleToggleFavorite(e, voucher.id)}
                                            >
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={isFavorite('vouchers', voucher.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                                                >
                                                    favorite
                                                </span>
                                            </button>
                                        </div>

                                        <div className="bg-white rounded-lg p-2 size-12 flex items-center justify-center shadow-lg">
                                            <img className="w-full h-auto opacity-90" src={voucher.logo} alt={voucher.name} />
                                        </div>

                                        <div>
                                            <h4 className="text-gold-text font-semibold text-lg">{voucher.name}</h4>
                                            <p className="text-warm-gray text-xs mt-1">{voucher.category}</p>
                                        </div>

                                        <div className="py-3 border-t border-dashed border-primary/20">
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-[10px] uppercase text-gold-dim/70 font-bold">Effective Rate</p>
                                                    <p className="text-2xl font-bold text-primary">{voucher.rate}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] uppercase text-gold-dim/70 font-bold">Value</p>
                                                    <p className="text-sm font-medium text-warm-white">{voucher.value}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full py-2 rounded-lg bg-surface-dark border border-primary/30 text-primary font-bold text-sm hover:bg-primary hover:text-background-dark transition-all shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
                                            Buy Voucher
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Load More */}
                            <div className="flex justify-center mt-6">
                                <button className="text-warm-gray hover:text-primary flex items-center gap-2 text-sm font-medium group transition-colors">
                                    Load More Vouchers
                                    <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">expand_more</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Premium Voucher Modal */}
            {selectedVoucher && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
                    onClick={closeVoucherModal}
                >
                    <div
                        className="relative w-full max-w-5xl bg-espresso-950 rounded-2xl shadow-2xl border border-espresso-700 flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeVoucherModal}
                            className="absolute top-4 right-4 z-30 size-10 rounded-full bg-espresso-900 hover:bg-espresso-800 text-gray-400 hover:text-white transition-all border border-espresso-700 flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>

                        {/* Left Panel - Brand Image */}
                        <div className="w-full md:w-[38%] bg-espresso-900 p-6 md:p-8 flex flex-col justify-center items-center border-r border-espresso-700">
                            {/* Image Container */}
                            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 group border border-espresso-700 shadow-lg">
                                {/* Corner Badge */}
                                <div className="absolute top-3 left-3 z-20 bg-white text-espresso-950 px-3 py-1 rounded shadow-md">
                                    <span className="font-bold text-[10px] tracking-wider uppercase">{selectedVoucher.name?.split(' ')[0] || 'Brand'}</span>
                                </div>

                                {selectedVoucher.image ? (
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundImage: `url('${selectedVoucher.image}')` }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-espresso-800 flex items-center justify-center p-6">
                                        <img src={selectedVoucher.logo} alt={selectedVoucher.name} className="w-2/3 h-auto object-contain" />
                                    </div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso-900 to-transparent" />
                            </div>

                            {/* Brand Info */}
                            <div className="text-center space-y-2 w-full">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 uppercase tracking-wide">{selectedVoucher.name}</h2>
                                <p className="text-xs text-copper-500 font-medium uppercase tracking-widest">{selectedVoucher.description}</p>
                            </div>
                        </div>

                        {/* Right Panel - Offers */}
                        <div className="w-full md:w-[62%] flex flex-col bg-espresso-950">
                            {/* Header */}
                            <div className="px-6 py-5 border-b border-espresso-700">
                                <div className="flex items-start justify-between pr-12">
                                    <div>
                                        <h3 className="text-xl font-serif font-bold text-white">Available Offers</h3>
                                        <p className="text-xs text-gray-500 mt-1">Compare real-time rewards across platforms</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 bg-espresso-900 px-2.5 py-1 rounded border border-espresso-700 mt-1">
                                        <span className="material-symbols-outlined text-xs">schedule</span>
                                        Updated today
                                    </div>
                                </div>
                            </div>

                            {/* Offers List */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                                {/* Best Rate - Featured */}
                                <div className="relative">
                                    <div className="absolute -top-2 left-4 z-10 bg-gold-400 text-espresso-950 text-[9px] font-bold px-2.5 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-xs">verified</span>
                                        Best Rate
                                    </div>
                                    <div className="bg-espresso-900 border-2 border-copper-500/50 rounded-xl p-4 mt-1">
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <div className="flex items-center gap-3 w-full sm:w-[35%] sm:border-r sm:border-espresso-700 sm:pr-4">
                                                <div className="size-11 rounded-lg bg-copper-500/20 flex items-center justify-center text-copper-400 border border-copper-500/30">
                                                    <span className="material-symbols-outlined text-xl">storefront</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-white font-semibold">iShop</h4>
                                                    <p className="text-[10px] text-copper-500 uppercase tracking-wider font-medium">Recommended</p>
                                                </div>
                                                <span className="material-symbols-outlined text-sm text-gray-600 hover:text-gray-400 cursor-help">info</span>
                                            </div>
                                            <div className="flex items-center gap-6 w-full sm:w-[65%]">
                                                <div className="flex-1">
                                                    <p className="text-[9px] text-gray-500 uppercase tracking-wider font-medium mb-0.5">Savings</p>
                                                    <p className="text-xl font-bold text-gold-400">{selectedVoucher.rate || selectedVoucher.discount || '25% OFF'}</p>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[9px] text-gray-500 uppercase tracking-wider font-medium mb-0.5">Cap/Mo</p>
                                                    <p className="text-sm font-semibold text-white">No Cap</p>
                                                </div>
                                                <button className="h-9 px-5 rounded-lg bg-copper-500 hover:bg-copper-400 text-espresso-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0">
                                                    Buy Now
                                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Other Platforms */}
                                {[
                                    { name: 'SmartBuy', type: 'HDFC Bank', icon: 'shopping_bag', savings: '5X Points', cap: '10,000 Pts' },
                                    { name: 'Gyftr', type: 'Aggregator', icon: 'card_giftcard', savings: '3X Points', cap: '2,500 Pts' },
                                    { name: 'Amazon', type: 'Marketplace', icon: 'local_shipping', savings: '2% Back', savingsLabel: 'Cashback', cap: '₹500' },
                                    { name: 'Flipkart', type: 'Marketplace', icon: 'inventory_2', savings: '₹50 Off', savingsLabel: 'Fees', cap: '1 Usage' }
                                ].map((platform, idx) => (
                                    <div key={idx} className="bg-espresso-900 border border-espresso-700 rounded-xl p-4 hover:border-copper-500/50 transition-all group">
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <div className="flex items-center gap-3 w-full sm:w-[35%] sm:border-r sm:border-espresso-700 sm:pr-4">
                                                <div className="size-10 rounded-lg bg-espresso-800 flex items-center justify-center text-copper-500 border border-espresso-700">
                                                    <span className="material-symbols-outlined text-lg">{platform.icon}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-white font-medium text-sm">{platform.name}</h4>
                                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{platform.type}</p>
                                                </div>
                                                <span className="material-symbols-outlined text-sm text-gray-600 hover:text-gray-400 cursor-help opacity-50 group-hover:opacity-100">info</span>
                                            </div>
                                            <div className="flex items-center gap-6 w-full sm:w-[65%]">
                                                <div className="flex-1">
                                                    <p className="text-[9px] text-gray-500 uppercase tracking-wider font-medium mb-0.5">{platform.savingsLabel || 'Savings'}</p>
                                                    <p className="text-base font-bold text-gold-400">{platform.savings}</p>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[9px] text-gray-500 uppercase tracking-wider font-medium mb-0.5">Cap/Mo</p>
                                                    <p className="text-xs font-medium text-gray-400">{platform.cap}</p>
                                                </div>
                                                <div className="size-9 flex items-center justify-center text-copper-500 border border-espresso-700 rounded-lg hover:bg-copper-500/10 hover:border-copper-500/50 cursor-pointer transition-all shrink-0">
                                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-3 border-t border-espresso-700 bg-espresso-900/50">
                                <p className="text-[10px] text-gray-500 text-center">
                                    Offers are real-time and subject to card eligibility. <a className="text-copper-500 hover:text-copper-400 cursor-pointer">View T&C</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Floating Favorites Bar */}
            {notification.show && notification.type === 'vouchers' && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-fade-in-up">
                    <div className="bg-surface-dark border-2 border-primary rounded-full px-6 py-3 flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(200,127,69,0.3)]">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-red-500 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            </div>
                            <div>
                                <p className="text-warm-white text-sm font-bold">{getFavoriteCount('vouchers')} {getFavoriteCount('vouchers') === 1 ? 'Voucher' : 'Vouchers'} Saved</p>
                                <p className="text-warm-gray text-[10px] uppercase tracking-wider">View your favorites</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-primary/30"></div>
                        <Link
                            to="/favorites"
                            className="px-5 py-2.5 rounded-full bg-primary text-background-dark text-xs font-bold uppercase tracking-wider transition-all hover:bg-primary-hover shadow-glow-copper flex items-center gap-2"
                        >
                            View Favorites
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                        <button
                            onClick={() => clearFavorites('vouchers')}
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
