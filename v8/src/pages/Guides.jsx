import { useState } from 'react';

const categories = [
    { id: 'wealth', label: 'Wealth Management', active: true },
    { id: 'cards', label: 'Credit Card Optimization' },
    { id: 'investment', label: 'Investment Strategies' },
    { id: 'tax', label: 'Tax Planning' },
    { id: 'luxury', label: 'Luxury Lifestyle' },
];

const tags = ['#Magnus', '#Infinia', '#Forex'];

const featuredGuides = {
    main: {
        id: 1,
        title: 'Wealth Preservation in Volatile Markets',
        description: 'Strategic allocation assets that hedge against inflation while maintaining liquidity for high-net-worth portfolios.',
        category: 'Wealth Management',
        readTime: '12 min read',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAXnMUh1XAox8jCMF1w6w-HtbIBAkSVhzo9YRxNcuuEKWtUCvi_hkvkWTb8TxiRdD3EqEROLezJzXAZ-GSb-8AQisH20808J_neph3LnmqZFdKgza6SovuTQlfcsyeLBqaihfCmQmelNk6DYA9yFSUm10N51cCZ-QluJ1McbTUp0h4B61x0yTKDeL5ZzcQ-LF4FeOAw-TCfZCykiJoSsxaEZVDXi2tKQ-59y1wpv8ObvjAzVm0_lGxNHHjRFSoYil7Yw-Yz0_UY_U3',
    },
    side: [
        {
            id: 2,
            title: 'The 2024 Metal Card Hierarchy',
            category: 'Cards',
            readTime: '8 min read',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB54RqoRbXM4iXADxc3JTAEY8inrRe_CpAajICKB9dKQ69ZJQRXQTInPN9N0szwIV3pUp55_-EoTJGyC-014brOl6XSLICk29LmFokz32GnZp5s730ZuIlYDhFNXxqH0n6iPbsrMttiZFJsyXrcrLzy_elYHnfr3d9NcqosP3VJS4j4yqq9s89OCE0-YeIaaDZZFwbz0E-HnMUYyjY8yD1YDHR5gkYMSAgUPVRNbKNlcxJxvPL1b7PMjBdbbwrDE3i3cX4xL7hYFoLK',
        },
        {
            id: 3,
            title: 'Unlocking First Class Upgrades',
            category: 'Travel',
            readTime: '5 min read',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmglLYszM9JkwUU3Fl2l9SMVuL-X1bJ0O2U4_p-XLszFbhQIaUOcJiDHi1XJWMIeGQmrd6IjwyT_TIdxb0-AnMUxRfSxjM5Vko-V3s3R1m41IqGwz7HeQqwgCTN4aXZ6iTQh0gz0m-4jvZiR_JZSbwdk7Wp1uIJZiEScJ2YwDiBL0-Fz6Se8D_k1fyxsAfJgVVMS4KTtHbHZmjsjpNvLLJioMQqHoEEFSWrxbwFYhQCj-rzgm5qtZJDsJ6rVRdvvAM3Z_vLEWIiu_D',
        },
    ],
};

const latestInsights = [
    {
        id: 4,
        title: 'Amex Platinum vs. Axis Magnus: The 2024 Showdown',
        description: 'Devaluation updates have changed the game. We break down the math for spenders over ₹10L per annum to help you decide.',
        category: 'Credit Optimization',
        categoryBadge: 'Analysis',
        readTime: '6 min read',
        author: 'Sarah Jenkins',
        authorRole: 'Senior Analyst',
        authorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABFlT7HPrdv3VNeM7-ZJwZgVoQ4gFEyUcdVELHV3HllZ0LlvrIbT7BoQUMPJyy4XpeIZ73imz9DcV4Y4YS10L9sw_mHSSR5Joh2NcubmkW3LR3NsbtTQ7xOlDT35vh6Zpd3L8jUee1c_chptLqKoMyM-2swRdrKxmYJdx6ECRu87f7Wtn6YMZYtSvDDEkT6L9WDXbXX3UiRplSbk2bAzBrP1xceX6DcXlwIh1jInXf_eXRShLQ5FWFDe_hJ9FtH8zHuo3ixUs6yKEJ',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkxQln9oDsdxHJQgjFEu-RuNGehfJYn1o_ACH1YOtzJV3Rz80fNc5fP5A__mV7qlExPcpDLtVxhJlF03gX6DRQFLHJ3dl1pgaAiwU0yHHpQcLbGKUtpSTmXvPSdg4wMJLuXAsC5MoWd6ElpgSK-xgeCpKlxD1zWOBiqDXWxbFx0KeFLv9OybVt3BvMDhzT0HuWJGkbUrYX3uHgxpB04MZVSdEUak2_seZdK1Bvl_7lIaz4SL3tZivRzaBxDbWnfV266tHi6-3_rkYR',
        featured: true,
    },
    {
        id: 5,
        title: 'Concierge Secrets: Booking Impossible Tables',
        description: 'How to leverage your Visa Infinite or Amex Centurion concierge to unlock dining experiences unavailable to the public.',
        category: 'Luxury Dining',
        categoryBadge: 'Lifestyle',
        readTime: '4 min',
        author: 'Arun Verma',
        authorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdP6EOC2bxIrZJ2wV5QkHHBr1TOIdgu7K-sZ0-3B42UNBK6_kBa6gBRMA2Dc0Mn7xm2XS98aVm22oU-lup03B50yZp8NUUMIyMs6Tys4yE_53gz-O_HyEvdzmAqbsE23KaNMI183hqNEnN_E_oC1Pt0OGRar6rQ2OjvJG12qgH9DslCswMeWqNtK9pqTLnRVhTIJ1-iqTPCo1ffwbFgKldcT0tgb_ZlfStL65KuwwjPVBPA9ikqzgPMk4v2kmjawpEd0T2cZks4fSp',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK1HhwxDHF9HlPCMSW2N7iIzV3d3GNlcAfMhQ-l_fVL2YvJtJW30uOBRP51QH3s8AwQ1g6dAY8IvWH3bQgleVeG8p89VRjWMDNFVCMoukdL34uMhkghYP0YU2O3bolD7DZUOwpGBptwc3So213oVZSlVlEmcEhJxHQiH3XLLt7YVUq5aGFqGJJjqp-x8piMZrlR3XMuV4qdsUORoTbuvlh_4J_zoS7O4vyzGj52x440OxYCqhxmkmkrHaikKE4gLY16-8kPHSoiKWX',
    },
    {
        id: 6,
        title: 'Hidden Lounge Networks in SE Asia',
        description: 'Beyond Priority Pass: Discovering exclusive boutique lounges accessible via specific premium Asian credit cards.',
        category: 'Rewards',
        categoryBadge: 'Travel',
        readTime: '5 min',
        author: 'Elena Roy',
        authorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9W68ZYJhAxKy8CCR6gkbBRbE8Mc9oT1EUmTfBD1q9_JXhQInOu7gJORHEcgAWvRwKVA8k2FnSHtubjqf7NjYkGIA1RqQ26mOJWV__VL9GydbyyZ7-YGJK3xeGXlRJYCBbGEOukAaZ1MwIwngYVC6TszQHfVUWaxPfrSzn-qOodiqDbUDzoYzlmncbTYWwSNKgCCvMyZC3TLQ7D8kSh5bVVhPGpdovoVnCzZtcBp8rg7Fb3OD3bdHL2ZMwJ456qrjRCXhJ7TDNky18',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmglLYszM9JkwUU3Fl2l9SMVuL-X1bJ0O2U4_p-XLszFbhQIaUOcJiDHi1XJWMIeGQmrd6IjwyT_TIdxb0-AnMUxRfSxjM5Vko-V3s3R1m41IqGwz7HeQqwgCTN4aXZ6iTQh0gz0m-4jvZiR_JZSbwdk7Wp1uIJZiEScJ2YwDiBL0-Fz6Se8D_k1fyxsAfJgVVMS4KTtHbHZmjsjpNvLLJioMQqHoEEFSWrxbwFYhQCj-rzgm5qtZJDsJ6rVRdvvAM3Z_vLEWIiu_D',
    },
];

const trendingArticles = [
    { id: 1, title: 'Maximizing Reward Points on Fuel Spends', readTime: '3 min read', date: 'Yesterday' },
    { id: 2, title: 'Tax Implications of International Credit Card Usage', readTime: '5 min read', date: 'Oct 22' },
    { id: 3, title: 'Hidden Benefits of the Axis Burgundy Account', readTime: '7 min read', date: 'Oct 20' },
    { id: 4, title: 'Is the Taj Epicure Membership Worth It?', readTime: '4 min read', date: 'Oct 18' },
];

export default function Guides() {
    const [selectedCategory, setSelectedCategory] = useState('wealth');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex h-full w-full">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-espresso-700 bg-surface-dark overflow-y-auto flex-shrink-0">
                <div className="p-6">
                    {/* Search */}
                    <div className="mb-8 relative">
                        <h3 className="text-copper text-xs font-bold uppercase tracking-[0.15em] mb-3">Find Guides</h3>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary text-[18px]">manage_search</span>
                            <input
                                className="w-full bg-background-dark/50 border border-espresso-700 rounded-lg pl-10 pr-3 py-2.5 text-sm text-warm-white focus:ring-1 focus:ring-primary focus:border-primary placeholder-gold-dim/50 outline-none transition-all shadow-inner"
                                placeholder="Search topics..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <h3 className="text-copper text-xs font-bold uppercase tracking-[0.15em] mb-4">Categories</h3>
                    <nav className="flex flex-col gap-1.5">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${selectedCategory === cat.id
                                        ? 'bg-surface-dark-hover border border-primary/20 hover:border-primary/50 shadow-sm'
                                        : 'border border-transparent hover:bg-surface-dark-hover hover:border-espresso-700/50'
                                    }`}
                            >
                                <span className={`text-sm font-medium transition-colors ${selectedCategory === cat.id ? 'text-primary font-display tracking-wide' : 'text-gold-dim group-hover:text-warm-white'
                                    }`}>
                                    {cat.label}
                                </span>
                                {selectedCategory === cat.id && (
                                    <span className="material-symbols-outlined text-primary text-[16px]">chevron_right</span>
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="h-px bg-espresso-700 w-full my-8"></div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-1 text-[10px] uppercase font-bold border border-espresso-700 bg-background-dark/30 rounded text-gold-dim hover:border-copper hover:text-copper cursor-pointer transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Premium Digest CTA */}
                    <div className="mt-auto pt-10 pb-4">
                        <div className="p-5 rounded-xl bg-gradient-to-br from-[#120b09] to-[#1f1512] border border-espresso-700 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 -mt-6 -mr-6 size-20 bg-copper/10 rounded-full blur-xl"></div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">diamond</span>
                                <h4 className="text-warm-white font-display font-semibold relative z-10">Premium Digest</h4>
                            </div>
                            <p className="text-xs text-gold-dim mb-4 relative z-10 font-light leading-relaxed">Exclusive insights delivered to your inbox every Monday.</p>
                            <button className="w-full py-2 text-xs font-bold text-background-dark bg-primary hover:bg-primary-hover rounded transition-colors uppercase tracking-wider relative z-10">Subscribe</button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-background-dark relative scroll-smooth">
                <div className="flex-1 max-w-[1400px] mx-auto w-full p-6 md:p-8 lg:p-12 pb-24">
                    {/* Header */}
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <span className="text-copper text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Editorial Hub</span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-warm-white">Guides <span className="font-light text-gold-dim italic">&</span> Insights</h1>
                        </div>
                        <div className="hidden md:block">
                            <span className="text-gold-dim text-sm font-light italic">Curated for the modern investor</span>
                        </div>
                    </div>

                    {/* Featured Guides Section */}
                    <section className="mb-16">
                        <div className="flex items-end justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-[1px] bg-gradient-to-r from-primary to-transparent"></span>
                                <h2 className="text-3xl font-display font-semibold text-warm-white tracking-widest">Featured Guides</h2>
                            </div>
                            <div className="flex gap-2">
                                <button className="size-10 rounded-full border border-espresso-700 text-gold-dim hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-300 group bg-surface-dark hover:bg-surface-dark-hover">
                                    <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                                </button>
                                <button className="size-10 rounded-full border border-espresso-700 text-gold-dim hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-300 group bg-surface-dark hover:bg-surface-dark-hover">
                                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[550px]">
                            {/* Main Featured */}
                            <article className="lg:col-span-8 relative h-full rounded-2xl overflow-hidden group shadow-2xl ring-1 ring-white/5 bg-background-dark">
                                <div className="absolute inset-0 w-full h-full overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110 saturate-[0.9]"
                                        style={{ backgroundImage: `url("${featuredGuides.main.image}")` }}
                                    ></div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050302] via-[#050302]/70 to-transparent z-10 opacity-90"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#050302]/90 via-transparent to-transparent z-10"></div>

                                <button className="absolute top-6 right-6 z-30 size-10 flex items-center justify-center rounded-full bg-surface-dark/40 backdrop-blur-md border border-white/10 text-gold-dim hover:text-copper hover:border-copper/50 transition-all duration-300">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>

                                <div className="absolute bottom-0 left-0 z-20 p-8 md:p-12 w-full md:w-5/6 flex flex-col items-start">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-3 py-1 rounded-[2px] border border-primary/40 bg-surface-dark/60 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-[0.25em] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[12px]">verified</span>
                                            {featuredGuides.main.category}
                                        </span>
                                        <span className="w-px h-3 bg-white/20"></span>
                                        <span className="text-gold-dim/80 text-xs font-medium tracking-wide flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[14px] text-copper">schedule</span> {featuredGuides.main.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-display font-medium text-warm-white mb-6 leading-[1.1] tracking-wide drop-shadow-lg group-hover:text-primary-hover transition-colors duration-500">
                                        {featuredGuides.main.title}
                                    </h3>
                                    <p className="text-gold-dim text-base md:text-lg font-light leading-relaxed mb-8 line-clamp-2 max-w-2xl border-l-2 border-primary/30 pl-4 opacity-90">
                                        {featuredGuides.main.description}
                                    </p>
                                    <a className="inline-flex items-center gap-3 border border-copper/60 text-copper px-6 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-[0.2em] hover:bg-copper hover:text-[#120b09] hover:border-copper transition-all duration-300 backdrop-blur-sm group/btn" href="#">
                                        Read Analysis
                                        <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform duration-300">arrow_right_alt</span>
                                    </a>
                                </div>
                            </article>

                            {/* Side Featured */}
                            <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                                {featuredGuides.side.map((guide) => (
                                    <article key={guide.id} className="relative flex-1 rounded-2xl overflow-hidden group shadow-lg ring-1 ring-white/5 bg-background-dark">
                                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                                            <div
                                                className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 saturate-[0.85]"
                                                style={{ backgroundImage: `url("${guide.image}")` }}
                                            ></div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050302] via-[#050302]/40 to-transparent z-10"></div>

                                        <button className="absolute top-4 right-4 z-30 size-8 flex items-center justify-center rounded-full bg-surface-dark/40 backdrop-blur-md border border-white/10 text-gold-dim hover:text-copper hover:border-copper/50 transition-all duration-300">
                                            <span className="material-symbols-outlined text-[16px]">favorite</span>
                                        </button>

                                        <div className="absolute bottom-0 left-0 z-20 p-6 md:p-8 w-full flex flex-col items-start">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="px-2 py-0.5 rounded-[2px] border border-copper/40 bg-surface-dark/60 backdrop-blur-md text-copper text-[9px] font-bold uppercase tracking-[0.2em] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                                                    {guide.category}
                                                </span>
                                                <span className="text-gold-dim/70 text-[10px] uppercase tracking-wider font-medium">{guide.readTime}</span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-display font-medium text-warm-white leading-snug group-hover:text-primary transition-colors mb-4 tracking-wide">
                                                {guide.title}
                                            </h3>
                                            <a className="inline-flex items-center gap-2 border border-copper/30 text-copper px-4 py-1.5 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-copper hover:text-surface-dark transition-all duration-300 backdrop-blur-sm" href="#">
                                                Read Guide
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Latest Insights Section */}
                    <section>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-copper/20 pb-4">
                            <h2 className="text-2xl font-display font-bold text-warm-white">Latest Insights</h2>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 hover:bg-primary hover:text-background-dark transition-all">All</button>
                                <button className="px-4 py-1.5 rounded-full bg-transparent text-gold-dim text-xs font-medium border border-espresso-700 hover:border-gold-dim hover:text-warm-white transition-all">Strategy</button>
                                <button className="px-4 py-1.5 rounded-full bg-transparent text-gold-dim text-xs font-medium border border-espresso-700 hover:border-gold-dim hover:text-warm-white transition-all">News</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Main Content */}
                            <div className="lg:col-span-8 flex flex-col">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {latestInsights.map((article, idx) => (
                                        <article key={article.id} className={`group relative flex ${article.featured ? 'md:col-span-2 flex-col sm:flex-row' : 'flex-col'} bg-surface-dark border border-espresso-700 rounded-2xl overflow-hidden hover:border-copper/30 transition-all duration-300 shadow-lg`}>
                                            <div className={`${article.featured ? 'sm:w-2/5 h-64 sm:h-auto' : 'h-48'} overflow-hidden relative`}>
                                                <div
                                                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                                    style={{ backgroundImage: `url("${article.image}")` }}
                                                ></div>
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-surface-dark/90 backdrop-blur-sm text-copper text-[10px] font-bold px-2.5 py-1 rounded-[2px] border border-copper/20 uppercase tracking-widest shadow-md">{article.categoryBadge}</span>
                                                </div>
                                                <button className="absolute top-4 right-4 z-20 size-8 flex items-center justify-center rounded-full bg-surface-dark/60 backdrop-blur-sm border border-white/10 text-warm-white hover:text-copper hover:border-copper transition-all duration-300 shadow-lg">
                                                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                                                </button>
                                            </div>
                                            <div className={`p-6 ${article.featured ? 'sm:w-3/5' : ''} flex flex-col ${article.featured ? 'justify-center' : 'flex-1'} relative`}>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-copper text-xs font-medium italic">{article.category}</span>
                                                    <span className="w-px h-3 bg-espresso-700"></span>
                                                    <span className="text-gold-dim text-xs flex items-center gap-1.5 font-medium">
                                                        <span className="material-symbols-outlined text-[14px]">schedule</span> {article.readTime}
                                                    </span>
                                                </div>
                                                <h3 className={`${article.featured ? 'text-2xl lg:text-3xl' : 'text-xl'} font-display font-medium text-warm-white mb-3 group-hover:text-primary transition-colors leading-tight`}>
                                                    {article.title}
                                                </h3>
                                                <p className="text-gold-dim text-sm font-light leading-relaxed line-clamp-2 mb-4 border-l border-copper/30 pl-3">
                                                    {article.description}
                                                </p>
                                                <div className="mt-auto pt-4 border-t border-espresso-700/50 flex items-center gap-2">
                                                    <div
                                                        className="size-6 rounded-full bg-gray-700 bg-cover bg-center ring-1 ring-white/10"
                                                        style={{ backgroundImage: `url("${article.authorImage}")` }}
                                                    ></div>
                                                    <span className="text-xs text-gold-dim font-medium">{article.author}</span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                <button className="w-full py-4 border border-espresso-700 text-gold-dim hover:text-primary hover:border-primary/50 text-sm font-bold uppercase tracking-widest rounded-xl transition-all hover:bg-surface-dark-hover flex items-center justify-center gap-2">
                                    Load More Articles
                                </button>
                            </div>

                            {/* Trending Sidebar */}
                            <aside className="lg:col-span-4 pl-0 lg:pl-6 border-l-0 lg:border-l border-copper/10">
                                <div className="sticky top-24">
                                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-copper/20">
                                        <span className="material-symbols-outlined text-copper text-xl">trending_up</span>
                                        <h3 className="text-sm font-bold text-warm-white uppercase tracking-widest">Trending Now</h3>
                                    </div>

                                    <div className="flex flex-col">
                                        {trendingArticles.map((article, idx) => (
                                            <div key={article.id}>
                                                <div className="group flex gap-5 items-start relative pr-8 cursor-pointer py-2">
                                                    <div className="text-2xl font-display font-bold text-copper/60 group-hover:text-primary transition-colors">
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-warm-white font-medium font-display leading-snug mb-2 group-hover:text-primary transition-colors text-lg">
                                                            {article.title}
                                                        </h4>
                                                        <div className="flex items-center gap-3 text-[10px] text-gold-dim/60 uppercase tracking-wider font-semibold">
                                                            <span>{article.readTime}</span>
                                                            <span className="size-0.5 rounded-full bg-copper"></span>
                                                            <span>{article.date}</span>
                                                        </div>
                                                    </div>
                                                    <button className="absolute right-0 top-2 size-6 flex items-center justify-center text-gold-dim/20 hover:text-copper transition-all duration-300">
                                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                                    </button>
                                                </div>
                                                {idx < trendingArticles.length - 1 && (
                                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-copper/20 to-transparent my-4"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quote Card */}
                                    <div className="mt-10 p-8 rounded-xl border border-primary/20 bg-surface-dark-hover text-center relative overflow-hidden">
                                        <div className="absolute top-0 right-0 size-20 bg-primary/5 rounded-full blur-xl -mr-5 -mt-5"></div>
                                        <div className="absolute bottom-0 left-0 size-16 bg-copper/5 rounded-full blur-xl -ml-5 -mb-5"></div>
                                        <span className="material-symbols-outlined text-copper/30 text-4xl mb-2 block mx-auto">format_quote</span>
                                        <p className="text-warm-white font-display italic text-lg mb-4 relative z-10">"Money is a terrible master but an excellent servant."</p>
                                        <div className="w-10 h-px bg-copper/40 mx-auto mb-3"></div>
                                        <span className="text-xs text-copper font-bold uppercase tracking-[0.2em] relative z-10">P.T. Barnum</span>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </section>

                    {/* Newsletter Section */}
                    <section className="mt-16 bg-gradient-to-r from-[#1f1512] to-[#120b09] rounded-2xl p-8 md:p-12 relative overflow-hidden border border-espresso-700">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-primary rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-copper rounded-full mix-blend-overlay filter blur-[80px] opacity-10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-xl">
                                <h2 className="text-2xl md:text-3xl font-bold text-warm-white mb-3 font-display">Don't Miss the Next Devaluation Update</h2>
                                <p className="text-gold-dim font-light">Join 15,000+ premium members receiving weekly alerts on credit card reward changes and bonus offers.</p>
                            </div>
                            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                                <input
                                    className="bg-black/20 border border-white/10 text-warm-white rounded-lg px-4 py-3 min-w-[280px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-white/20 transition-all"
                                    placeholder="Your work email"
                                    type="email"
                                />
                                <button className="bg-primary text-background-dark font-bold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors whitespace-nowrap shadow-lg shadow-black/20">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
