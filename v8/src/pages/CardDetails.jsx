import { Link, useParams } from 'react-router-dom';

export default function CardDetails() {
    // In a real app, we would fetch card details using the ID
    const { id } = useParams();

    return (
        <div className="flex flex-1 overflow-hidden relative">
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-theme-bg">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-theme-texture opacity-30"></div>
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-secondary/5 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[120px] rounded-full"></div>
                </div>
                <div className="flex-1 overflow-y-auto z-10 p-6 lg:p-10 scroll-smooth pb-20 scrollbar-thin scrollbar-theme">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
                        <div className="flex items-center gap-2 text-xs font-medium text-theme-primary/40 uppercase tracking-wider animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
                            <Link className="hover:text-accent-secondary transition-colors" to="/cards">Cards</Link>
                            <span className="material-symbols-outlined text-[12px] text-accent-secondary-500">arrow_forward_ios</span>
                            <span className="hover:text-accent-secondary transition-colors cursor-pointer">Premium</span>
                            <span className="material-symbols-outlined text-[12px] text-accent-secondary-500">arrow_forward_ios</span>
                            <span className="text-accent">HDFC Infinia Metal</span>
                        </div>
                        <section className="relative rounded-3xl overflow-hidden bg-theme-surface/80 border border-accent-secondary/30 p-8 lg:p-14 shadow-2xl animate-fade-in-up" id="overview">
                            <div className="absolute inset-0 bg-metal-sheen opacity-40"></div>
                            <div className="absolute left-0 top-0 w-full h-1/2 bg-gradient-to-b from-accent-secondary/5 to-transparent pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
                                <div className="flex flex-col items-center gap-8 shrink-0 w-full lg:w-auto">
                                    <div className="relative group perspective-1000">
                                        <div className="w-[320px] h-[200px] lg:w-[480px] lg:h-[300px] rounded-2xl shadow-card-depth transform transition-transform duration-700 hover:rotate-y-6 hover:scale-105 relative z-20">
                                            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 ring-1 ring-black/30 bg-theme-bg">
                                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwz4Z0xXa-7CC9PqVv3-PtCozR5yso5WmX0zoV81jKWmZamgG9AC3SwQpJrMKStrYByKf_R1tBMdXpDy4epfXeVZpkP3pJXFsGyqEyVur80ZnoHl_zjbUT1oLhy14a6KUJcEW2pxdZzJvh9X2OxxXM0FcDvwjHi6pMzAiI5DVJSUdJul5nnn_sbHeVrKY4CuEsmaTeqODk6OWfv86d5WC4ONaQjoDOSXs19Dnoozaj_Xkg2zwJ9BG2zTkG6bv4Ju6laEOlww0QHj5b")' }}></div>
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                                <div className="absolute inset-0 bg-copper-sheen opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-14 left-10 right-10 h-14 bg-black/60 blur-2xl rounded-[50%] z-10 transition-all duration-500 group-hover:blur-3xl group-hover:bg-accent-secondary/20"></div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full justify-center">
                                        <button className="flex-1 max-w-[200px] py-3.5 px-6 rounded bg-accent-secondary border border-accent text-theme-primary font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all btn-press shadow-glow-copper flex items-center justify-center gap-2 group/btn">
                                            Apply Now
                                            <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                        </button>
                                        <button className="py-3.5 px-6 rounded bg-transparent border border-accent-secondary/50 text-theme-primary font-bold uppercase tracking-widest text-xs hover:bg-white/5 hover:border-white transition-all btn-press flex items-center justify-center gap-2 group/cmp">
                                            <span className="material-symbols-outlined text-[18px] text-theme-primary transition-transform group-hover/cmp:rotate-180">compare_arrows</span>
                                            Compare
                                        </button>
                                        <button className="size-11 rounded-full border border-accent-secondary/30 bg-theme-surface text-accent-secondary hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/10 flex items-center justify-center transition-all btn-press group/fav">
                                            <span className="material-symbols-outlined text-[20px] group-hover/fav:scale-110 transition-transform">favorite</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="metal-badge px-3 py-1.5 rounded-full border border-accent-secondary/20 text-accent-secondary text-[10px] font-bold uppercase tracking-widest shadow-inner">
                                            Super Premium
                                        </span>
                                        <span className="px-3 py-1.5 rounded-full bg-green-900/20 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Active
                                        </span>
                                    </div>
                                    <h1 className="text-4xl lg:text-6xl font-serif text-theme-primary font-bold tracking-tight mb-4 drop-shadow-xl leading-tight">
                                        HDFC Infinia <br /><span className="text-gradient-gold italic font-medium">Metal Edition</span>
                                    </h1>
                                    <p className="text-lg text-theme-primary font-light mb-10 max-w-xl mx-auto lg:mx-0 font-display leading-relaxed opacity-90">
                                        The pinnacle of luxury. Experience unlimited lounge access, 24/7 concierge, and the highest reward rate in the industry.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8 border-t border-accent-secondary/20">
                                        <div className="flex flex-col items-center lg:items-start gap-2 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="p-2 rounded bg-accent-secondary/10 mb-1">
                                                <span className="material-symbols-outlined text-accent-secondary text-[24px]">stars</span>
                                            </div>
                                            <span className="text-xs text-accent-secondary font-bold uppercase tracking-wider">Rewards</span>
                                            <span className="text-theme-primary text-lg font-medium">3.3% Base Rate</span>
                                        </div>
                                        <div className="flex flex-col items-center lg:items-start gap-2 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="p-2 rounded bg-accent-secondary/10 mb-1">
                                                <span className="material-symbols-outlined text-accent-secondary text-[24px]">flight_takeoff</span>
                                            </div>
                                            <span className="text-xs text-accent-secondary font-bold uppercase tracking-wider">Travel</span>
                                            <span className="text-theme-primary text-lg font-medium">Unlimited Lounge</span>
                                        </div>
                                        <div className="flex flex-col items-center lg:items-start gap-2 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="p-2 rounded bg-accent-secondary/10 mb-1">
                                                <span className="material-symbols-outlined text-accent-secondary text-[24px]">concierge</span>
                                            </div>
                                            <span className="text-xs text-accent-secondary font-bold uppercase tracking-wider">Service</span>
                                            <span className="text-theme-primary text-lg font-medium">24/7 Concierge</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="animate-fade-in-up w-full" style={{ animationDelay: '0.15s' }}>
                            <details className="group bg-theme-surface border border-accent-secondary/20 rounded-xl overflow-hidden hover:border-accent-secondary/50 transition-all cursor-pointer open:bg-theme-surface shadow-lg">
                                <summary className="flex items-center justify-between p-6 select-none list-none">
                                    <div className="flex items-center gap-5">
                                        <div className="size-12 rounded-full bg-gradient-to-br from-theme-surface to-theme-bg border border-accent-secondary/30 flex items-center justify-center text-accent-secondary-500 shadow-inner group-hover:text-accent-secondary transition-colors">
                                            <span className="material-symbols-outlined text-[24px]">verified</span>
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-theme-primary tracking-wide">Why choose this card?</h3>
                                    </div>
                                    <span className="material-symbols-outlined text-accent transition-transform duration-300 group-open:rotate-180 text-[28px]">expand_circle_down</span>
                                </summary>
                                <div className="accordion-content px-6 pb-8 pt-2 text-theme-primary/80 leading-relaxed font-light pl-[5.5rem] border-l border-accent-secondary/10 ml-[2.25rem] mb-6">
                                    <p className="mb-4 text-lg">
                                        The HDFC Infinia Metal Edition is widely considered the best credit card in India for high spenders. Its defining feature is the <span className="text-accent font-bold">3.3% base reward rate</span> which extends to almost all spends, and can be accelerated up to <span className="text-accent font-bold">33% (10X)</span> via the SmartBuy portal for flight bookings and hotel stays.
                                    </p>
                                    <p className="text-theme-primary/60">
                                        Beyond rewards, it offers one of the few true "unlimited" lounge access programs for both primary and add-on cardholders globally. The metal form factor and lower forex markup of 2% make it an essential travel companion.
                                    </p>
                                </div>
                            </details>
                        </section>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up w-full" style={{ animationDelay: '0.25s' }}>
                            <section className="bg-theme-surface rounded-2xl border border-white/5 p-8 flex flex-col hover:border-accent-secondary/40 hover:shadow-glow-copper/10 transition-all duration-300 shadow-xl group" id="fees">
                                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-accent-secondary/20">
                                    <div className="p-2 rounded bg-theme-surface border border-white/5 group-hover:border-accent-secondary/30 transition-colors">
                                        <span className="material-symbols-outlined text-accent-secondary-500 text-[24px]">account_balance_wallet</span>
                                    </div>
                                    <h3 className="text-lg font-display text-theme-primary font-bold tracking-wide uppercase">Fees & Charges</h3>
                                </div>
                                <div className="flex flex-col gap-6 flex-1">
                                    <div className="flex justify-between items-center group/item hover:translate-x-1 transition-transform">
                                        <span className="text-sm text-theme-primary/60 font-medium">Joining Fee</span>
                                        <span className="text-xl text-accent font-serif font-bold">₹12,500 <span className="text-xs text-theme-primary/30 font-sans font-normal">+ GST</span></span>
                                    </div>
                                    <div className="h-px bg-accent-secondary/10 w-full"></div>
                                    <div className="flex justify-between items-center group/item hover:translate-x-1 transition-transform">
                                        <span className="text-sm text-theme-primary/60 font-medium">Annual Fee</span>
                                        <span className="text-xl text-accent font-serif font-bold">₹12,500 <span className="text-xs text-theme-primary/30 font-sans font-normal">+ GST</span></span>
                                    </div>
                                    <div className="h-px bg-accent-secondary/10 w-full"></div>
                                    <div className="flex justify-between items-start group/item hover:translate-x-1 transition-transform">
                                        <span className="text-sm text-theme-primary/60 font-medium mt-1">Waiver Condition</span>
                                        <div className="text-right">
                                            <span className="text-base text-theme-primary font-bold block">Spend ₹10 Lakhs</span>
                                            <span className="text-xs text-accent-secondary/80">in previous 12 months</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-6 bg-theme-bg/40 -mx-8 -mb-8 p-6 border-t border-white/5">
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-accent text-[20px] mt-0.5">redeem</span>
                                            <div>
                                                <p className="text-sm text-theme-primary font-bold mb-1 uppercase tracking-wider">Welcome Benefit</p>
                                                <p className="text-xs text-theme-primary/50">12,500 Reward Points upon fee realization (equivalent to ₹12,500).</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="bg-theme-surface rounded-2xl border border-white/5 p-8 flex flex-col hover:border-accent-secondary/40 hover:shadow-glow-copper/10 transition-all duration-300 shadow-xl group" id="rewards">
                                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-accent-secondary/20">
                                    <div className="p-2 rounded bg-theme-surface border border-white/5 group-hover:border-accent-secondary/30 transition-colors">
                                        <span className="material-symbols-outlined text-accent-secondary-500 text-[24px]">diamond</span>
                                    </div>
                                    <h3 className="text-lg font-display text-theme-primary font-bold tracking-wide uppercase">Rewards & Value</h3>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between items-center hover:translate-x-1 transition-transform">
                                        <span className="text-sm text-theme-primary/60 font-medium">Base Reward Rate</span>
                                        <span className="text-xl text-accent font-serif font-bold">3.3%</span>
                                    </div>
                                    <div className="h-px bg-accent-secondary/10 w-full"></div>
                                    <div className="flex justify-between items-center hover:translate-x-1 transition-transform">
                                        <span className="text-sm text-theme-primary/60 font-medium">SmartBuy (Accelerated)</span>
                                        <span className="text-xl text-accent font-serif font-bold">Up to 33%</span>
                                    </div>
                                    <div className="h-px bg-accent-secondary/10 w-full"></div>
                                    <div className="flex justify-between items-center hover:translate-x-1 transition-transform">
                                        <span className="text-sm text-theme-primary/60 font-medium">1 Reward Point Value</span>
                                        <span className="text-xl text-accent font-serif font-bold">₹ 1.00</span>
                                    </div>
                                    <div className="p-5 rounded-lg bg-gradient-to-br from-accent-secondary/10 to-transparent border border-accent-secondary/20 mt-4">
                                        <h4 className="text-xs font-bold text-accent-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[14px]">checklist</span> Redemption
                                        </h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-center justify-between text-sm">
                                                <span className="text-theme-primary/80">Flight & Hotels</span>
                                                <span className="text-accent font-bold font-serif">1 : 1</span>
                                            </li>
                                            <li className="flex items-center justify-between text-sm">
                                                <span className="text-theme-primary/80">Apple Products</span>
                                                <span className="text-accent font-bold font-serif">1 : 1</span>
                                            </li>
                                            <li className="flex items-center justify-between text-sm">
                                                <span className="text-theme-primary/80">Airmiles Transfer</span>
                                                <span className="text-accent font-bold font-serif">1 : 1</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                            <section className="bg-theme-surface rounded-2xl border border-white/5 p-8 flex flex-col hover:border-accent-secondary/40 hover:shadow-glow-copper/10 transition-all duration-300 shadow-xl group" id="travel">
                                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-accent-secondary/20">
                                    <div className="p-2 rounded bg-theme-surface border border-white/5 group-hover:border-accent-secondary/30 transition-colors">
                                        <span className="material-symbols-outlined text-accent-secondary-500 text-[24px]">flight_takeoff</span>
                                    </div>
                                    <h3 className="text-lg font-display text-theme-primary font-bold tracking-wide uppercase">Travel & Lounge</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex flex-col gap-2 hover:translate-x-1 transition-transform">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest">Domestic Lounge</span>
                                            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-theme-primary/60">Primary + Add-on</span>
                                        </div>
                                        <p className="text-theme-primary font-serif text-2xl font-bold">Unlimited</p>
                                    </div>
                                    <div className="h-px bg-accent-secondary/10 w-full"></div>
                                    <div className="flex flex-col gap-2 hover:translate-x-1 transition-transform">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest">International Lounge</span>
                                            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-theme-primary/60">Priority Pass</span>
                                        </div>
                                        <p className="text-theme-primary font-serif text-2xl font-bold">Unlimited</p>
                                    </div>
                                    <div className="h-px bg-accent-secondary/10 w-full"></div>
                                    <div className="flex flex-col gap-2 hover:translate-x-1 transition-transform">
                                        <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest">Forex Markup</span>
                                        <div className="flex items-baseline gap-3">
                                            <p className="text-accent font-serif text-2xl font-bold">2.0%</p>
                                            <span className="text-sm font-light text-theme-primary/30 line-through decoration-accent-secondary/50">3.5%</span>
                                        </div>
                                        <p className="text-xs text-theme-primary/50">Lowest in category</p>
                                    </div>
                                </div>
                            </section>
                            <section className="bg-theme-surface rounded-2xl border border-white/5 p-8 flex flex-col hover:border-accent-secondary/40 hover:shadow-glow-copper/10 transition-all duration-300 shadow-xl group md:col-span-2 lg:col-span-3" id="lifestyle">
                                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-accent-secondary/20">
                                    <div className="p-2 rounded bg-theme-surface border border-white/5 group-hover:border-accent-secondary/30 transition-colors">
                                        <span className="material-symbols-outlined text-accent-secondary-500 text-[24px]">sports_golf</span>
                                    </div>
                                    <h3 className="text-lg font-display text-theme-primary font-bold tracking-wide uppercase">Lifestyle & Insurance</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="flex gap-4 hover:bg-white/5 p-4 rounded-xl transition-colors">
                                        <div className="size-12 rounded-full bg-theme-surface flex items-center justify-center shrink-0 border border-accent-secondary/20 shadow-inner">
                                            <span className="material-symbols-outlined text-accent">golf_course</span>
                                        </div>
                                        <div>
                                            <h4 class="text-theme-primary font-bold mb-2 text-sm uppercase tracking-wider">Golf Games</h4>
                                            <p class="text-sm text-theme-primary/60 leading-relaxed font-light">Unlimited complimentary golf games at leading courses in India and select courses worldwide.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 hover:bg-white/5 p-4 rounded-xl transition-colors">
                                        <div className="size-12 rounded-full bg-theme-surface flex items-center justify-center shrink-0 border border-accent-secondary/20 shadow-inner">
                                            <span className="material-symbols-outlined text-accent">restaurant</span>
                                        </div>
                                        <div>
                                            <h4 className="text-theme-primary font-bold mb-2 text-sm uppercase tracking-wider">Club Marriott</h4>
                                            <p className="text-sm text-theme-primary/60 leading-relaxed font-light">Complimentary Club Marriott membership for the first year, offering up to 20% discounts on dining.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 hover:bg-white/5 p-4 rounded-xl transition-colors">
                                        <div className="size-12 rounded-full bg-theme-surface flex items-center justify-center shrink-0 border border-accent-secondary/20 shadow-inner">
                                            <span className="material-symbols-outlined text-accent">medical_services</span>
                                        </div>
                                        <div>
                                            <h4 className="text-theme-primary font-bold mb-2 text-sm uppercase tracking-wider">Insurance Cover</h4>
                                            <p className="text-sm text-theme-primary/60 leading-relaxed font-light">Accidental air death cover of <span className="text-theme-primary font-medium">₹3 Crores</span>. Medical emergency cover up to <span class="text-theme-primary font-medium">₹50 Lakhs</span>.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <section className="animate-fade-in-up w-full pt-10 border-t border-accent-secondary/20" style={{ animationDelay: '0.35s' }}>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-accent-secondary-500 text-[24px]">view_carousel</span>
                                <h4 className="text-theme-primary text-lg font-bold uppercase tracking-widest font-display">Similar Premium Cards</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="group relative rounded-xl bg-theme-surface border border-white/5 p-5 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 shimmer-hover cursor-pointer">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-10 rounded bg-gradient-to-r from-gray-700 to-gray-600 border border-white/10 shadow-sm relative overflow-hidden">
                                            <div className="absolute inset-0 bg-black/20"></div>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-theme-primary group-hover:text-accent-secondary transition-colors">Axis Magnus</h5>
                                            <p className="text-[10px] text-theme-primary/40">₹12,500 Fee</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3 mt-2">
                                        <span className="text-theme-primary/60">Reward Rate</span>
                                        <span className="text-accent font-bold">4.8%</span>
                                    </div>
                                </div>
                                <div className="group relative rounded-xl bg-theme-surface border border-white/5 p-5 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 shimmer-hover cursor-pointer">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-10 rounded bg-gradient-to-r from-blue-900 to-blue-800 border border-white/10 shadow-sm relative overflow-hidden">
                                            <div className="absolute inset-0 bg-black/20"></div>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-theme-primary group-hover:text-accent-secondary transition-colors">SBI Aurum</h5>
                                            <p className="text-[10px] text-theme-primary/40">₹10,000 Fee</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3 mt-2">
                                        <span className="text-theme-primary/60">Reward Rate</span>
                                        <span className="text-accent font-bold">3.0%</span>
                                    </div>
                                </div>
                                <div className="group relative rounded-xl bg-theme-surface border border-white/5 p-5 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 shimmer-hover cursor-pointer">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-10 rounded bg-gradient-to-r from-red-900 to-red-800 border border-white/10 shadow-sm relative overflow-hidden">
                                            <div className="absolute inset-0 bg-black/20"></div>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-theme-primary group-hover:text-accent-secondary transition-colors">ICICI Emeralde</h5>
                                            <p className="text-[10px] text-theme-primary/40">₹12,000 Fee</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3 mt-2">
                                        <span className="text-theme-primary/60">Reward Rate</span>
                                        <span className="text-accent font-bold">2.5%</span>
                                    </div>
                                </div>
                                <div className="group relative rounded-xl bg-theme-surface border border-white/5 p-5 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 shimmer-hover cursor-pointer">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-10 rounded bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 shadow-sm relative overflow-hidden">
                                            <div className="absolute inset-0 bg-black/20"></div>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-theme-primary group-hover:text-accent-secondary transition-colors">Amex Platinum</h5>
                                            <p className="text-[10px] text-theme-primary/40">₹60,000 Fee</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3 mt-2">
                                        <span className="text-theme-primary/60">Reward Rate</span>
                                        <span className="text-accent font-bold">Varied</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
                            <div className="relative rounded-2xl overflow-hidden bg-theme-surface bg-theme-texture border-[3px] border-accent-secondary p-8 lg:p-12 shadow-[0_10px_40px_rgba(205,127,50,0.15)] group isolate">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-theme-bg via-theme-surface/90 to-transparent"></div>
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="size-14 rounded-full bg-theme-bg border border-accent flex items-center justify-center shadow-[0_0_20px_rgba(205,127,50,0.3)] group-hover:scale-110 transition-transform duration-300">
                                                <span className="material-symbols-outlined text-accent-secondary text-[28px]">workspace_premium</span>
                                            </div>
                                            <div>
                                                <h5 className="text-theme-primary font-serif text-2xl font-bold tracking-tight">Unlock Premium Concierge</h5>
                                                <p className="text-accent-secondary font-bold text-xs uppercase tracking-widest mt-1">Exclusive Member Benefits</p>
                                            </div>
                                        </div>
                                        <p className="text-theme-primary/70 max-w-xl font-light leading-relaxed">Upgrade your plan today to access dedicated relationship managers, invite-only events, and 0% markup on international transactions worldwide.</p>
                                    </div>
                                    <button className="shrink-0 px-8 py-4 rounded bg-transparent border-2 border-accent-secondary text-accent-secondary hover:bg-accent hover:text-theme-primary hover:border-transparent text-sm font-bold uppercase tracking-widest transition-all btn-press shadow-lg group-hover:shadow-[0_0_30px_rgba(205,127,50,0.4)] flex items-center gap-3">
                                        Upgrade Now
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
