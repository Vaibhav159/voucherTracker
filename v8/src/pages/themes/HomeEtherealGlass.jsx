import { Link } from 'react-router-dom';

// Theme 3: Ethereal Glass - Ultra-modern glassmorphism with layered transparency
export default function HomeEtherealGlass() {
    return (
        <div className="ethereal-bg min-h-screen">
            <div className="refraction-line left-1/4"></div>
            <div className="refraction-line right-1/3" style={{ animationDelay: '5s' }}></div>
            <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-8 md:px-8 lg:py-16">

                {/* Hero Section */}
                <section className="mb-24 relative overflow-hidden rounded-3xl glass-primary">
                    <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-pink-500/10 blur-[100px]"></div>
                    <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-blue-500/10 blur-[80px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]"></div>

                    <div className="relative z-10 flex flex-col gap-12 p-8 lg:flex-row lg:items-center lg:p-12">
                        <div className="flex flex-1 flex-col gap-8">
                            {/* Badge */}
                            <div className="badge-glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                                <span className="material-symbols-outlined text-[16px]">verified</span>
                                Elite Access
                            </div>

                            {/* Headline */}
                            <h1 className="font-serif text-5xl font-extrabold leading-[1.1] tracking-wide text-white md:text-6xl lg:text-7xl">
                                Stop Overpaying.<br />
                                <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">Start Maximizing.</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="max-w-lg text-lg font-light leading-relaxed text-white/70">
                                Your all-in-one dashboard for credit card rewards, gift card discounts, and banking offers. Track vouchers across Gyftr, Amazon, and 10+ platforms in real-time.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-5 pt-2">
                                <Link
                                    to="/vouchers"
                                    className="btn-glass-primary group relative inline-flex h-14 min-w-[180px] items-center justify-center overflow-hidden rounded-lg px-8 text-base font-bold"
                                >
                                    <span className="relative z-10">Explore Vouchers</span>
                                </Link>
                                <Link
                                    to="/calculator"
                                    className="btn-glass-secondary inline-flex h-14 min-w-[160px] items-center justify-center gap-2 rounded-lg px-8 text-base font-medium"
                                >
                                    <span className="material-symbols-outlined text-[20px]">calculate</span>
                                    Calculate My Rewards
                                </Link>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="relative flex flex-1 items-center justify-center lg:justify-end">
                            <div className="relative h-[380px] w-full max-w-[500px] animate-premium-float">
                                <div className="absolute inset-0 z-0 rounded-2xl glass-primary">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-pink-400/15 blur-[60px]"></div>
                                    <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-blue-400/15 blur-[50px]"></div>

                                    <div className="relative flex h-full flex-col justify-between p-8">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 shadow-lg ring-1 ring-white/30 backdrop-blur-sm">
                                                    <img src="/assets/logo.jpg" alt="CardPerks Logo" className="h-8 w-8 object-contain rounded-sm" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-serif text-lg font-bold text-white tracking-wide">CardPerks</span>
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Infinia Reserve</span>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-white/20 text-4xl">contactless</span>
                                        </div>

                                        <div className="space-y-8 mt-4">
                                            <div className="group relative overflow-hidden rounded-xl glass-secondary p-6 transition-all hover:bg-white/10">
                                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <div className="relative z-10 flex justify-between items-end">
                                                    <div>
                                                        <p className="text-xs font-medium uppercase tracking-wider text-white/50 mb-1">Total Rewards Value</p>
                                                        <div className="font-serif text-4xl font-bold text-white tracking-wide">₹ 2,45,890</div>
                                                    </div>
                                                    <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-bold text-green-400 border border-green-500/20 backdrop-blur-sm">
                                                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                                        +12.4%
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-end px-1">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Card Holder</span>
                                                    <span className="font-mono text-sm tracking-widest text-white/70">VIKRAM MEHTA</span>
                                                </div>
                                                <div className="flex flex-col gap-1.5 text-right">
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Valid Thru</span>
                                                    <span className="font-mono text-sm font-medium text-white/70">09/28</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 ring-1 ring-inset ring-white/5"></div>
                                </div>

                                {/* Floating notification */}
                                <div className="absolute -right-6 top-20 z-10 animate-[float_4s_ease-in-out_infinite_reverse] rounded-lg glass-secondary p-3 shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500/20 text-green-400 backdrop-blur-sm">
                                            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase text-white/50">Marriott Bonvoy</span>
                                            <span className="text-sm font-bold text-white">+5,000 Pts</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Highlights */}
                <section className="mb-16">
                    <div className="mb-8 flex flex-col gap-2 border-b border-white/10 pb-4">
                        <h2 className="font-serif text-3xl font-bold text-white">Feature Highlights</h2>
                        <p className="text-white/60">Everything you need to optimize your savings in one place.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: 'compare_arrows', title: 'Compare & Conquer', desc: 'Instantly compare voucher rates across major platforms like Gyftr, Amazon, and Park+ to ensure you never overpay.' },
                            { icon: 'credit_score', title: 'Credit Card Companion', desc: 'Detailed breakdowns of premium cards like Infinia, Magnus, and DCB Black—know your perks inside out.' },
                            { icon: 'tips_and_updates', title: 'Smart Tools', desc: 'From reward point calculators to currency conversion guides, use our utilities to make informed decisions.' },
                            { icon: 'local_mall', title: 'Daily Essentials', desc: 'Find the best discounts for your everyday needs—Swiggy, Zomato, BigBasket, and Uber.' },
                        ].map((feature, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-2xl glass-primary p-8 transition-all premium-lift">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white/80 group-hover:bg-white/20 group-hover:text-white transition-all duration-300 backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-[28px]">{feature.icon}</span>
                                </div>
                                <h3 className="mb-2 font-serif text-xl font-bold text-white">{feature.title}</h3>
                                <p className="text-sm leading-relaxed text-white/60 group-hover:text-white/80">{feature.desc}</p>
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition-all group-hover:bg-blue-400/15"></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-16">
                    <div className="rounded-3xl glass-primary p-8 lg:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-pink-500/5 blur-[100px] pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <h2 className="font-serif text-3xl font-bold text-white mb-4">How It Works</h2>
                                <p className="text-white/60 max-w-2xl mx-auto">Three simple steps to maximize your savings.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { num: '1', title: 'Search', desc: "Enter the brand or store you want to shop at (e.g., 'Amazon', 'Myntra')." },
                                    { num: '2', title: 'Compare', desc: 'View a list of voucher rates and reward multipliers across different platforms.' },
                                    { num: '3', title: 'Save', desc: 'Choose the best deal, buy the voucher, and enjoy instant savings.' },
                                ].map((step, i) => (
                                    <div key={i} className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full glass-secondary flex items-center justify-center mb-6 border border-white/20">
                                            <span className="font-serif text-2xl font-bold text-white">{step.num}</span>
                                        </div>
                                        <h3 className="font-serif text-xl font-bold text-white mb-3">{step.title}</h3>
                                        <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Latest Guides */}
                <section className="mb-16">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="font-serif text-3xl font-bold text-white">Latest Guides</h2>
                        <Link to="/guides" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">View All</Link>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row">
                        {[
                            { cat: 'Travel Strategy', title: 'How to maximize HDFC Infinia for international flights', desc: 'Learn the secret strategies to get up to 33% return on your travel bookings.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnEOKhNhBmMb4b5quIo7V96zApqsBPW1kCbw-b-nYnuir-laJIS_bNeDfVziwF5GfT1-jfN5HN7XQi0cmvzILoczOZZpmJWe2R-43TQYDtBcmOJV_U_wL-8PO8lcgNAut4g82Z8dNfaDH3IPm7EQJceN44rEzojOgzjH6Dgeo7u7FawisAjigzO3VGwHpJiBQtyNe8L2wG8DG5IPTTol4hCvFot9N0NHOPhPyCqJ0at-VQZeBnQ5SuuAYAfWLYvEFj1T_y_cl2aNaY' },
                            { cat: 'Wealth', title: 'Converting Reward Points to Gold: Is it worth it?', desc: 'A detailed analysis of conversion ratios across major banks in 2024.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZwtjEuzZuKCQ7BboLe1zotmgyLUa5VdXJQ0grX58ATgi3_Y8oGT4yEZ9u_fGbphm3PxmAHdqmcf8UhuSrjf_g4XaPJOc1H2l2Il4W6NN329ie44omHAtfgiTK3WwxXqTrUl2z3nTMcR9l8Ah0DqechJGyZM8Gof_agO1Z8NLJVfziFOIvBdrxSrR8V4ASEXi-ja5JRthykYk7bHGZzyD1eYojDc5qmSW30pcZT1rXyJJUlYu50200pDOaTlv0FNHfJZhwRLCcGKC0' },
                        ].map((guide, i) => (
                            <div key={i} className="group flex flex-1 flex-col gap-5 rounded-2xl glass-primary p-5 transition-all sm:flex-row premium-lift">
                                <div className="aspect-video w-full overflow-hidden rounded-lg sm:w-56 relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80"
                                        style={{ backgroundImage: `url('${guide.img}')` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                                <div className="flex flex-col justify-center gap-3">
                                    <span className="text-xs font-bold uppercase tracking-widest text-pink-300">{guide.cat}</span>
                                    <h3 className="font-serif text-xl font-bold leading-tight text-white group-hover:text-blue-200 transition-colors">{guide.title}</h3>
                                    <p className="line-clamp-2 text-sm text-white/60">{guide.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
