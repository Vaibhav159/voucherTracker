import { Link, useParams } from 'react-router-dom';

// Banking tier data (in production, this would come from a data file or API)
const bankingTiersData = {
    'hdfc-imperia': {
        id: 'hdfc-imperia',
        bank: 'HDFC',
        bankColor: '#004c8f',
        tierType: 'Private Wealth',
        tierName: 'Imperia Banking',
        tagline: 'Top-tier wealth management for high net-worth individuals.',
        description: 'HDFC Imperia is the apex private banking tier, offering bespoke financial solutions, dedicated relationship managers, and exclusive access to premium credit cards like Infinia.',
        eligibility: [
            { label: 'Monthly Avg Balance', value: '₹ 10 Lakhs', icon: 'account_balance' },
            { label: 'Total Relationship Value', value: '₹ 30 Lakhs', icon: 'trending_up' },
            { label: 'Net Salary Credit', value: '₹ 3 Lakhs/mo', icon: 'payments' },
        ],
        benefits: [
            { title: 'Infinia Eligibility', desc: 'Fast-track access to HDFC Infinia Metal credit card, India\'s most rewarding card.', icon: 'credit_card' },
            { title: 'Locker Waiver', desc: 'Flat 50% waiver on locker rentals across all HDFC branches.', icon: 'lock' },
            { title: 'Priority Service', desc: 'Dedicated relationship manager with priority branch service.', icon: 'support_agent' },
            { title: 'Family Banking', desc: 'Add up to 4 family members to pool TRV requirements.', icon: 'family_restroom' },
        ],
        fees: {
            maintenance: 'No AMC',
            minimumBalance: '₹ 10 Lakhs',
            penalty: '₹ 1,000/quarter'
        },
        exclusiveCards: ['Infinia Metal', 'Diners Black'],
    },
    'icici-wealth': {
        id: 'icici-wealth',
        bank: 'ICICI',
        bankColor: '#f37e20',
        tierType: 'Wealth Management',
        tierName: 'Wealth Management',
        tagline: 'Holistic family banking solutions for the affluent.',
        description: 'ICICI Wealth Management offers comprehensive financial planning, investment advisory, and privileged banking services for families with significant assets.',
        eligibility: [
            { label: 'Monthly Avg Balance', value: '₹ 10 Lakhs', icon: 'account_balance' },
            { label: 'Total Relationship Value', value: '₹ 50 Lakhs', icon: 'trending_up' },
            { label: 'Home Loan Value', value: '> ₹ 2 Crores', icon: 'home' },
        ],
        benefits: [
            { title: 'Family Banking', desc: 'Benefits extended to 4 family members under single relationship.', icon: 'family_restroom' },
            { title: 'Golf Access', desc: 'Complimentary golf lessons and course access across India.', icon: 'golf_course' },
            { title: 'Investment Advisory', desc: 'Personalized portfolio management and wealth planning.', icon: 'insights' },
            { title: 'Travel Privileges', desc: 'Airport meet & greet, fast-track immigration at select airports.', icon: 'flight' },
        ],
        fees: {
            maintenance: 'No AMC',
            minimumBalance: '₹ 10 Lakhs',
            penalty: '₹ 1,500/quarter'
        },
        exclusiveCards: ['Emeralde', 'Sapphiro'],
    },
    'axis-burgundy': {
        id: 'axis-burgundy',
        bank: 'AXIS',
        bankColor: '#97144d',
        tierType: 'Burgundy',
        tierName: 'Burgundy',
        tagline: 'Curated banking for the affluent and discerning.',
        description: 'Axis Burgundy delivers a world-class banking experience with personalized services, exclusive rewards, and seamless global access for premium customers.',
        eligibility: [
            { label: 'Monthly Avg Balance', value: '₹ 10 Lakhs', icon: 'account_balance' },
            { label: 'Total Relationship Value', value: '₹ 30 Lakhs', icon: 'trending_up' },
            { label: 'Net Salary Credit', value: '₹ 3 Lakhs/mo', icon: 'payments' },
        ],
        benefits: [
            { title: 'Debit Card', desc: 'Zero convenience fees on all debit card transactions.', icon: 'credit_card' },
            { title: 'Dining', desc: 'Buy 1 Get 1 on BookMyShow movie tickets every month.', icon: 'movie' },
            { title: 'Travel Insurance', desc: 'Complimentary travel insurance up to ₹1 Crore coverage.', icon: 'health_and_safety' },
            { title: 'Lounge Access', desc: 'Unlimited domestic lounge access for primary and add-on members.', icon: 'airline_seat_individual_suite' },
        ],
        fees: {
            maintenance: 'No AMC',
            minimumBalance: '₹ 10 Lakhs',
            penalty: '₹ 1,000/quarter'
        },
        exclusiveCards: ['Magnus', 'Vistara Infinite'],
    },
};

export default function BankingDetails() {
    const { id } = useParams();
    const tier = bankingTiersData[id] || bankingTiersData['hdfc-imperia'];

    return (
        <div className="flex flex-1 overflow-hidden relative">
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-theme-bg">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-theme-texture opacity-30"></div>
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-secondary/5 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[120px] rounded-full"></div>
                </div>

                <div className="flex-1 overflow-y-auto z-10 p-6 lg:p-10 scroll-smooth pb-20 scrollbar-thin scrollbar-theme">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-10">

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs font-medium text-theme-primary/40 uppercase tracking-wider animate-fade-in" style={{ animationDelay: '0.05s' }}>
                            <Link className="hover:text-accent-secondary transition-colors" to="/banking">Banking</Link>
                            <span className="material-symbols-outlined text-[12px] text-accent-secondary-500">arrow_forward_ios</span>
                            <span className="hover:text-accent-secondary transition-colors cursor-pointer">{tier.tierType}</span>
                            <span className="material-symbols-outlined text-[12px] text-accent-secondary-500">arrow_forward_ios</span>
                            <span className="text-accent">{tier.tierName}</span>
                        </div>

                        {/* Hero Section */}
                        <section className="relative rounded-3xl overflow-hidden bg-theme-surface/80 border border-accent-secondary/30 p-8 lg:p-14 shadow-2xl animate-fade-in" id="overview">
                            <div className="absolute inset-0 bg-metal-sheen opacity-40"></div>
                            <div className="absolute left-0 top-0 w-full h-1/2 bg-gradient-to-b from-accent-secondary/5 to-transparent pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
                                {/* Bank Logo & Actions */}
                                <div className="flex flex-col items-center gap-8 shrink-0 w-full lg:w-auto">
                                    <div className="relative group">
                                        <div
                                            className="w-40 h-40 lg:w-56 lg:h-56 rounded-3xl shadow-card-depth flex items-center justify-center text-theme-primary font-bold text-4xl lg:text-6xl tracking-tighter border-2 border-white/10"
                                            style={{ backgroundColor: tier.bankColor }}
                                        >
                                            {tier.bank}
                                        </div>
                                        <div className="absolute -bottom-8 left-8 right-8 h-8 bg-black/40 blur-2xl rounded-[50%] z-10"></div>
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

                                {/* Tier Info */}
                                <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="metal-badge px-3 py-1.5 rounded-full border border-accent-secondary/20 text-accent-secondary text-[10px] font-bold uppercase tracking-widest shadow-inner">
                                            {tier.tierType}
                                        </span>
                                        <span className="px-3 py-1.5 rounded-full bg-green-900/20 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Available
                                        </span>
                                    </div>

                                    <h1 className="text-4xl lg:text-6xl font-serif text-theme-primary font-bold tracking-tight mb-4 drop-shadow-xl leading-tight">
                                        {tier.bank} <br /><span className="text-gradient-gold italic font-medium">{tier.tierName}</span>
                                    </h1>

                                    <p className="text-lg text-theme-primary font-light mb-10 max-w-xl mx-auto lg:mx-0 font-display leading-relaxed opacity-90">
                                        {tier.description}
                                    </p>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8 border-t border-accent-secondary/20">
                                        {tier.eligibility.slice(0, 3).map((item, idx) => (
                                            <div key={idx} className="flex flex-col items-center lg:items-start gap-2 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="p-2 rounded bg-accent-secondary/10 mb-1">
                                                    <span className="material-symbols-outlined text-accent-secondary text-[24px]">{item.icon}</span>
                                                </div>
                                                <span className="text-xs text-accent-secondary font-bold uppercase tracking-wider">{item.label}</span>
                                                <span className="text-theme-primary text-lg font-medium">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Why Choose Section */}
                        <section className="animate-fade-in w-full" style={{ animationDelay: '0.15s' }}>
                            <details className="group bg-theme-surface border border-accent-secondary/20 rounded-xl overflow-hidden hover:border-accent-secondary/50 transition-all cursor-pointer open:bg-theme-surface shadow-lg" open>
                                <summary className="flex items-center justify-between p-6 select-none list-none">
                                    <div className="flex items-center gap-5">
                                        <div className="size-12 rounded-full bg-gradient-to-br from-theme-surface to-theme-bg border border-accent-secondary/30 flex items-center justify-center text-accent-secondary-500 shadow-inner group-hover:text-accent-secondary transition-colors">
                                            <span className="material-symbols-outlined text-[24px]">verified</span>
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-theme-primary tracking-wide">Why choose {tier.tierName}?</h3>
                                    </div>
                                    <span className="material-symbols-outlined text-accent transition-transform duration-300 group-open:rotate-180 text-[28px]">expand_circle_down</span>
                                </summary>
                                <div className="px-6 pb-8 pt-2 text-theme-primary/80 leading-relaxed font-light pl-[5.5rem] border-l border-accent-secondary/10 ml-[2.25rem] mb-6">
                                    <p className="mb-4 text-lg">
                                        {tier.tagline} With <span className="text-accent font-bold">{tier.tierName}</span>, you gain access to exclusive banking privileges, premium credit cards, and personalized wealth management services.
                                    </p>
                                    <p className="text-theme-primary/60">
                                        Maintain the relationship value requirements to unlock benefits worth significantly more than any associated fees. Family pooling options make qualification easier for households.
                                    </p>
                                </div>
                            </details>
                        </section>

                        {/* Benefits & Eligibility Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in w-full" style={{ animationDelay: '0.25s' }}>
                            {/* Eligibility Card */}
                            <section className="bg-theme-surface rounded-2xl border border-white/5 p-8 flex flex-col hover:border-accent-secondary/40 hover:shadow-glow-copper/10 transition-all duration-300 shadow-xl group">
                                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-accent-secondary/20">
                                    <div className="p-2 rounded bg-theme-surface border border-white/5 group-hover:border-accent-secondary/30 transition-colors">
                                        <span className="material-symbols-outlined text-accent-secondary-500 text-[24px]">checklist</span>
                                    </div>
                                    <h3 className="text-lg font-display text-theme-primary font-bold tracking-wide uppercase">Eligibility</h3>
                                </div>
                                <div className="flex flex-col gap-5 flex-1">
                                    {tier.eligibility.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center group/item hover:translate-x-1 transition-transform">
                                            <span className="text-sm text-theme-primary/60 font-medium">{item.label}</span>
                                            <span className="text-lg text-accent font-serif font-bold">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Fees Card */}
                            <section className="bg-theme-surface rounded-2xl border border-white/5 p-8 flex flex-col hover:border-accent-secondary/40 hover:shadow-glow-copper/10 transition-all duration-300 shadow-xl group">
                                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-accent-secondary/20">
                                    <div className="p-2 rounded bg-theme-surface border border-white/5 group-hover:border-accent-secondary/30 transition-colors">
                                        <span className="material-symbols-outlined text-accent-secondary-500 text-[24px]">account_balance_wallet</span>
                                    </div>
                                    <h3 className="text-lg font-display text-theme-primary font-bold tracking-wide uppercase">Fees & Charges</h3>
                                </div>
                                <div className="flex flex-col gap-5 flex-1">
                                    <div className="flex justify-between items-center hover:translate-x-1 transition-transform">
                                        <span className="text-sm text-theme-primary/60 font-medium">Maintenance</span>
                                        <span className="text-lg text-accent font-serif font-bold">{tier.fees.maintenance}</span>
                                    </div>
                                    <div className="h-px bg-accent-secondary/10 w-full"></div>
                                    <div className="flex justify-between items-center hover:translate-x-1 transition-transform">
                                        <span className="text-sm text-theme-primary/60 font-medium">Min. Balance</span>
                                        <span className="text-lg text-accent font-serif font-bold">{tier.fees.minimumBalance}</span>
                                    </div>
                                    <div className="h-px bg-accent-secondary/10 w-full"></div>
                                    <div className="flex justify-between items-center hover:translate-x-1 transition-transform">
                                        <span className="text-sm text-theme-primary/60 font-medium">Non-Maint. Penalty</span>
                                        <span className="text-lg text-theme-primary font-serif font-bold">{tier.fees.penalty}</span>
                                    </div>
                                </div>
                            </section>

                            {/* Exclusive Cards */}
                            <section className="bg-theme-surface rounded-2xl border border-white/5 p-8 flex flex-col hover:border-accent-secondary/40 hover:shadow-glow-copper/10 transition-all duration-300 shadow-xl group">
                                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-accent-secondary/20">
                                    <div className="p-2 rounded bg-theme-surface border border-white/5 group-hover:border-accent-secondary/30 transition-colors">
                                        <span className="material-symbols-outlined text-accent-secondary-500 text-[24px]">credit_card</span>
                                    </div>
                                    <h3 className="text-lg font-display text-theme-primary font-bold tracking-wide uppercase">Exclusive Cards</h3>
                                </div>
                                <div className="flex flex-col gap-4 flex-1">
                                    {tier.exclusiveCards.map((card, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-theme-surface/50 border border-accent-secondary/20 hover:bg-theme-surface transition-colors group/card cursor-pointer">
                                            <div className="w-12 h-8 rounded bg-accent-secondary border border-white/10"></div>
                                            <span className="text-theme-primary font-medium group-hover/card:text-accent transition-colors">{card}</span>
                                            <span className="material-symbols-outlined text-accent-secondary-500 text-sm ml-auto">arrow_forward</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Benefits Full Width */}
                            <section className="bg-theme-surface rounded-2xl border border-white/5 p-8 flex flex-col hover:border-accent-secondary/40 hover:shadow-glow-copper/10 transition-all duration-300 shadow-xl group md:col-span-2 lg:col-span-3">
                                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-accent-secondary/20">
                                    <div className="p-2 rounded bg-theme-surface border border-white/5 group-hover:border-accent-secondary/30 transition-colors">
                                        <span className="material-symbols-outlined text-accent-secondary-500 text-[24px]">stars</span>
                                    </div>
                                    <h3 className="text-lg font-display text-theme-primary font-bold tracking-wide uppercase">Key Benefits</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {tier.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex flex-col gap-3 hover:bg-white/5 p-4 rounded-xl transition-colors">
                                            <div className="size-12 rounded-full bg-theme-surface flex items-center justify-center shrink-0 border border-accent-secondary/20 shadow-inner">
                                                <span className="material-symbols-outlined text-accent">{benefit.icon}</span>
                                            </div>
                                            <h4 className="text-theme-primary font-bold text-sm uppercase tracking-wider">{benefit.title}</h4>
                                            <p className="text-sm text-theme-primary/60 leading-relaxed font-light">{benefit.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* CTA Section */}
                        <section className="mt-12 animate-fade-in" style={{ animationDelay: '0.35s' }}>
                            <div className="relative rounded-2xl overflow-hidden bg-theme-surface bg-theme-texture border-[3px] border-accent-secondary p-8 lg:p-12 shadow-[0_10px_40px_rgba(205,127,50,0.15)] group isolate">
                                <div className="absolute inset-0 bg-gradient-to-r from-theme-bg via-theme-surface/90 to-transparent"></div>
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="size-14 rounded-full bg-theme-bg border border-accent flex items-center justify-center shadow-[0_0_20px_rgba(205,127,50,0.3)] group-hover:scale-110 transition-transform duration-300">
                                                <span className="material-symbols-outlined text-accent-secondary text-[28px]">account_balance</span>
                                            </div>
                                            <div>
                                                <h5 className="text-theme-primary font-serif text-2xl font-bold tracking-tight">Ready to Upgrade?</h5>
                                                <p className="text-accent-secondary font-bold text-xs uppercase tracking-widest mt-1">Contact Your Bank Today</p>
                                            </div>
                                        </div>
                                        <p className="text-theme-primary/70 max-w-xl font-light leading-relaxed">
                                            Visit your nearest {tier.bank} branch or call the priority banking helpline to discuss your eligibility and start your {tier.tierName} journey today.
                                        </p>
                                    </div>
                                    <button className="shrink-0 px-8 py-4 rounded bg-transparent border-2 border-accent-secondary text-accent-secondary hover:bg-accent hover:text-theme-primary hover:border-transparent text-sm font-bold uppercase tracking-widest transition-all btn-press shadow-lg group-hover:shadow-[0_0_30px_rgba(205,127,50,0.4)] flex items-center gap-3">
                                        Get Started
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
