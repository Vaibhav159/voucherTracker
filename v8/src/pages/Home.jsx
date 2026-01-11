import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function Home() {
    return (
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 lg:py-16">
            {/* Hero Section */}
            <section className="mb-24 relative overflow-hidden rounded-3xl border border-espresso-700 bg-espresso-900 shadow-2xl">
                <div className="hero-bg-shimmer absolute inset-0 opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-espresso-900 via-espresso-900/95 to-transparent"></div>
                <div className="absolute top-0 right-0 h-64 w-64 bg-gold-400/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-20 h-48 w-48 bg-copper-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 flex flex-col gap-12 p-8 lg:flex-row lg:items-center lg:p-12">
                    <div className="flex flex-1 flex-col gap-8">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-copper-400/40 bg-copper-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-copper-400 backdrop-blur-sm shadow-sm shadow-copper-900/50">
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            Elite Access
                        </div>

                        <h1 className="font-serif text-5xl font-extrabold leading-[1.1] tracking-wide text-white md:text-6xl lg:text-7xl">
                            Stop Overpaying.<br />
                            <span className="text-gradient-gold drop-shadow-sm">Start Maximizing.</span>
                        </h1>

                        <p className="max-w-lg text-lg font-light leading-relaxed text-gray-300">
                            Your all-in-one dashboard for credit card rewards, gift card discounts, and banking offers. Track vouchers across Gyftr, Amazon, and 10+ platforms in real-time.
                        </p>

                        <div className="flex flex-wrap gap-5 pt-2">
                            <Link
                                to="/vouchers"
                                className="group relative inline-flex h-14 min-w-[180px] items-center justify-center overflow-hidden rounded-lg bg-gold-500 px-8 text-base font-bold text-espresso-950 shadow-lg shadow-gold-900/20 transition-all hover:scale-[1.02] hover:bg-gold-400 hover:shadow-gold-500/20 border-b-4 border-copper-600 active:border-b-0 active:translate-y-1"
                            >
                                <span className="relative z-10">Explore Vouchers</span>
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </Link>
                            <Link
                                to="/calculator"
                                className="inline-flex h-14 min-w-[160px] items-center justify-center gap-2 rounded-lg border border-gold-400/30 bg-transparent px-8 text-base font-medium text-gold-300 transition-all hover:border-gold-400 hover:bg-gold-400/5 hover:text-gold-400 backdrop-blur-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">calculate</span>
                                Calculate My Rewards
                            </Link>
                        </div>
                    </div>

                    {/* Animated Card */}
                    <div className="relative flex flex-1 items-center justify-center lg:justify-end">
                        <div className="relative h-[380px] w-full max-w-[500px] animate-float">
                            <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-espresso-800 to-espresso-950 border border-white/10 shadow-2xl shadow-black/60 backdrop-blur-xl">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold-400/10 blur-[60px]"></div>
                                <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-copper-400/10 blur-[50px]"></div>

                                <div className="relative flex h-full flex-col justify-between p-8">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 shadow-lg ring-1 ring-white/20">
                                                <img src="/assets/logo.jpg" alt="CardPerks Logo" className="h-8 w-8 object-contain rounded-sm animate-pulse" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-serif text-lg font-bold text-gold-300 tracking-wide">CardPerks</span>
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-copper-400">Infinia Reserve</span>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-white/20 text-4xl">contactless</span>
                                    </div>

                                    <div className="space-y-8 mt-4">
                                        <div className="group relative overflow-hidden rounded-xl border border-gold-500/10 bg-gradient-to-r from-white/5 to-white/[0.02] p-6 backdrop-blur-md transition-all hover:border-gold-500/20">
                                            <div className="absolute inset-0 bg-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <div className="relative z-10 flex justify-between items-end">
                                                <div>
                                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">Total Rewards Value</p>
                                                    <div className="font-serif text-4xl font-bold text-white tracking-wide">₹ 2,45,890</div>
                                                </div>
                                                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-bold text-green-400 border border-green-500/20">
                                                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                                    +12.4%
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-end px-1">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Card Holder</span>
                                                <span className="font-mono text-sm tracking-widest text-gray-200">VIKRAM MEHTA</span>
                                            </div>
                                            <div className="flex flex-col gap-1.5 text-right">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Valid Thru</span>
                                                <span className="font-mono text-sm font-medium text-gray-200">09/28</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 ring-1 ring-inset ring-white/5"></div>
                            </div>

                            {/* Floating notification */}
                            <div className="absolute -right-6 top-20 z-10 animate-[float_4s_ease-in-out_infinite_reverse] rounded-lg border border-espresso-700 bg-espresso-800/90 p-3 shadow-xl backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500/20 text-green-400">
                                        <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase text-gray-400">Marriott Bonvoy</span>
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
                <div className="mb-8 flex flex-col gap-2 border-b border-espresso-700 pb-4">
                    <h2 className="font-serif text-3xl font-bold text-white">Feature Highlights</h2>
                    <p className="text-gray-400">Everything you need to optimize your savings in one place.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="group relative overflow-hidden rounded-2xl border border-espresso-700 bg-espresso-800 p-8 transition-all hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-xl hover:shadow-black/20">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400 group-hover:bg-gold-400 group-hover:text-espresso-900 transition-colors duration-300">
                            <span className="material-symbols-outlined text-[28px]">compare_arrows</span>
                        </div>
                        <h3 className="mb-2 font-serif text-xl font-bold text-white">Compare & Conquer</h3>
                        <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">Instantly compare voucher rates across major platforms like Gyftr, Amazon, and Park+ to ensure you never overpay.</p>
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold-400/5 blur-2xl transition-all group-hover:bg-gold-400/10"></div>
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border border-espresso-700 bg-espresso-800 p-8 transition-all hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-xl hover:shadow-black/20">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-copper-400/10 text-copper-400 group-hover:bg-copper-400 group-hover:text-espresso-900 transition-colors duration-300">
                            <span className="material-symbols-outlined text-[28px]">credit_score</span>
                        </div>
                        <h3 className="mb-2 font-serif text-xl font-bold text-white">Credit Card Companion</h3>
                        <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">Detailed breakdowns of premium cards like Infinia, Magnus, and DCB Black—know your perks inside out.</p>
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-copper-400/5 blur-2xl transition-all group-hover:bg-copper-400/10"></div>
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border border-espresso-700 bg-espresso-800 p-8 transition-all hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-xl hover:shadow-black/20">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400 group-hover:bg-gold-400 group-hover:text-espresso-900 transition-colors duration-300">
                            <span className="material-symbols-outlined text-[28px]">tips_and_updates</span>
                        </div>
                        <h3 className="mb-2 font-serif text-xl font-bold text-white">Smart Tools</h3>
                        <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">From reward point calculators to currency conversion guides, use our utilities to make informed decisions.</p>
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold-400/5 blur-2xl transition-all group-hover:bg-gold-400/10"></div>
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border border-espresso-700 bg-espresso-800 p-8 transition-all hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-xl hover:shadow-black/20">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-copper-400/10 text-copper-400 group-hover:bg-copper-400 group-hover:text-espresso-900 transition-colors duration-300">
                            <span className="material-symbols-outlined text-[28px]">local_mall</span>
                        </div>
                        <h3 className="mb-2 font-serif text-xl font-bold text-white">Daily Essentials</h3>
                        <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">Find the best discounts for your everyday needs—Swiggy, Zomato, BigBasket, and Uber.</p>
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-copper-400/5 blur-2xl transition-all group-hover:bg-copper-400/10"></div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="mb-16">
                <div className="rounded-3xl border border-espresso-700 bg-espresso-900/50 p-8 lg:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-400/5 to-transparent pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-3xl font-bold text-white mb-4">How It Works</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">Three simple steps to maximize your savings.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-espresso-800 border border-gold-400/20 flex items-center justify-center mb-6 shadow-lg shadow-gold-900/20">
                                    <span className="font-serif text-2xl font-bold text-gold-400">1</span>
                                </div>
                                <h3 className="font-serif text-xl font-bold text-white mb-3">Search</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">Enter the brand or store you want to shop at (e.g., 'Amazon', 'Myntra').</p>
                            </div>

                            <div className="relative flex flex-col items-center text-center">
                                <div className="hidden md:block absolute top-8 -left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-espresso-700 to-transparent"></div>
                                <div className="w-16 h-16 rounded-full bg-espresso-800 border border-gold-400/20 flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-gold-900/20">
                                    <span className="font-serif text-2xl font-bold text-gold-400">2</span>
                                </div>
                                <h3 className="font-serif text-xl font-bold text-white mb-3">Compare</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">View a list of voucher rates and reward multipliers across different platforms.</p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-espresso-800 border border-gold-400/20 flex items-center justify-center mb-6 shadow-lg shadow-gold-900/20">
                                    <span className="font-serif text-2xl font-bold text-gold-400">3</span>
                                </div>
                                <h3 className="font-serif text-xl font-bold text-white mb-3">Save</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">Choose the best deal, buy the voucher, and enjoy instant savings.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Guides */}
            <section className="mb-16">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-serif text-3xl font-bold text-white">Latest Guides</h2>
                    <Link to="/guides" className="text-sm font-semibold text-gold-400 hover:text-gold-300">View All</Link>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="group flex flex-1 flex-col gap-5 rounded-2xl border border-espresso-700 bg-espresso-800 p-5 transition-all hover:border-gold-500/30 sm:flex-row">
                        <div className="aspect-video w-full overflow-hidden rounded-lg bg-espresso-700 sm:w-56 relative">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBnEOKhNhBmMb4b5quIo7V96zApqsBPW1kCbw-b-nYnuir-laJIS_bNeDfVziwF5GfT1-jfN5HN7XQi0cmvzILoczOZZpmJWe2R-43TQYDtBcmOJV_U_wL-8PO8lcgNAut4g82Z8dNfaDH3IPm7EQJceN44rEzojOgzjH6Dgeo7u7FawisAjigzO3VGwHpJiBQtyNe8L2wG8DG5IPTTol4hCvFot9N0NHOPhPyCqJ0at-VQZeBnQ5SuuAYAfWLYvEFj1T_y_cl2aNaY')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 to-transparent"></div>
                        </div>
                        <div className="flex flex-col justify-center gap-3">
                            <span className="text-xs font-bold uppercase tracking-widest text-copper-400">Travel Strategy</span>
                            <h3 className="font-serif text-xl font-bold leading-tight text-white group-hover:text-gold-300 transition-colors">How to maximize HDFC Infinia for international flights</h3>
                            <p className="line-clamp-2 text-sm text-gray-400">Learn the secret strategies to get up to 33% return on your travel bookings.</p>
                        </div>
                    </div>

                    <div className="group flex flex-1 flex-col gap-5 rounded-2xl border border-espresso-700 bg-espresso-800 p-5 transition-all hover:border-gold-500/30 sm:flex-row">
                        <div className="aspect-video w-full overflow-hidden rounded-lg bg-espresso-700 sm:w-56 relative">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZwtjEuzZuKCQ7BboLe1zotmgyLUa5VdXJQ0grX58ATgi3_Y8oGT4yEZ9u_fGbphm3PxmAHdqmcf8UhuSrjf_g4XaPJOc1H2l2Il4W6NN329ie44omHAtfgiTK3WwxXqTrUl2z3nTMcR9l8Ah0DqechJGyZM8Gof_agO1Z8NLJVfziFOIvBdrxSrR8V4ASEXi-ja5JRthykYk7bHGZzyD1eYojDc5qmSW30pcZT1rXyJJUlYu50200pDOaTlv0FNHfJZhwRLCcGKC0')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 to-transparent"></div>
                        </div>
                        <div className="flex flex-col justify-center gap-3">
                            <span className="text-xs font-bold uppercase tracking-widest text-copper-400">Wealth</span>
                            <h3 className="font-serif text-xl font-bold leading-tight text-white group-hover:text-gold-300 transition-colors">Converting Reward Points to Gold: Is it worth it?</h3>
                            <p className="line-clamp-2 text-sm text-gray-400">A detailed analysis of conversion ratios across major banks in 2024.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
