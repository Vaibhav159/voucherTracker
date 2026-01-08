export default function AboutUs() {
    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-950">
            {/* Sidebar */}
            <aside className="w-64 bg-espresso-950 border-r border-copper/40 hidden md:flex flex-col flex-shrink-0 h-full overflow-y-auto pb-4">
                <div className="p-4">
                    <div className="bg-espresso-800 rounded-sm p-4 mb-8 flex items-center gap-3 border border-primary/20 shadow-lg">
                        <div className="h-8 w-8 rounded-full border border-primary/40 flex items-center justify-center text-gold-400">
                            <span className="material-symbols-outlined text-sm">diamond</span>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Premium Plan</h3>
                            <p className="text-[10px] text-gold-dim mt-0.5">Valid until Dec 2024</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <a className="flex items-center gap-3 px-3 py-3 rounded-sm text-gold-dim hover:bg-espresso-800 hover:text-white group transition-all duration-300" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors text-[20px]">dashboard</span>
                            <span className="text-sm font-light">Dashboard</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-3 rounded-sm text-gold-dim hover:bg-espresso-800 hover:text-white group transition-all duration-300" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors text-[20px]">credit_card</span>
                            <span className="text-sm font-light">My Cards</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-3 rounded-sm text-gold-dim hover:bg-espresso-800 hover:text-white group transition-all duration-300" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors text-[20px]">confirmation_number</span>
                            <span className="text-sm font-light">Vouchers</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-3 rounded-sm bg-espresso-800/50 text-white border-l-2 border-primary group transition-all duration-300" href="#">
                            <span className="material-symbols-outlined text-primary text-[20px]">info</span>
                            <span className="text-sm font-medium">About Us</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-3 rounded-sm text-gold-dim hover:bg-espresso-800 hover:text-white group transition-all duration-300" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors text-[20px]">settings</span>
                            <span className="text-sm font-light">Settings</span>
                        </a>
                    </nav>
                </div>

                <div className="mt-auto p-4 border-t border-primary/10">
                    <a className="flex items-center gap-3 px-3 py-2 rounded-sm text-gold-dim hover:text-white transition-colors group" href="#">
                        <span className="material-symbols-outlined text-xl group-hover:text-primary transition-colors">logout</span>
                        <span className="text-sm font-light">Sign Out</span>
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-espresso-950 scroll-smooth relative">
                <div className="max-w-6xl mx-auto px-8 py-16 md:px-16 md:py-24 space-y-24 md:space-y-32">

                    {/* Hero Section */}
                    <section className="text-center max-w-4xl mx-auto space-y-8">
                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gold-400 leading-tight drop-shadow-sm">
                            Democratizing Credit <br />Card Rewards.
                        </h1>
                        <p className="text-xl md:text-2xl text-white font-light tracking-wide opacity-90 max-w-2xl mx-auto leading-relaxed">
                            Making every rupee count through transparency and precision data.
                        </p>
                    </section>

                    {/* Problem Section */}
                    <section>
                        <div className="border-l border-primary pl-8 md:pl-12 max-w-4xl mx-auto">
                            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-6 block">The Problem</span>
                            <div className="space-y-8 text-lg md:text-xl leading-loose text-white font-light">
                                <p>
                                    The financial rewards ecosystem is <span className="text-primary font-medium">intentionally opaque</span>. With fragmented data across multiple portals, complex redemption ratios, and hidden terms, genuine savings are often elusive.
                                </p>
                                <p>
                                    Banks rely on this complexity. We believe in <span className="text-primary font-medium">clarity</span>. By aggregating real-time data and simplifying the mathematics of rewards, we ensure you never leave money on the table.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* What We Build Section */}
                    <section>
                        <div className="mb-16">
                            <h2 className="font-serif text-4xl md:text-5xl text-gold-400 mb-6">What We Build</h2>
                            <p className="text-white max-w-xl text-lg font-light tracking-wide opacity-80">
                                A comprehensive ecosystem of tools designed to replace spreadsheets and guesswork with actionable intelligence.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-espresso-800/40 p-10 rounded-sm border border-copper/40 hover:border-primary transition-all duration-500 group hover:-translate-y-1 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-primary text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 font-light">hub</span>
                                <h3 className="text-white font-medium text-xl mb-4 tracking-wide">Rate Aggregator</h3>
                                <p className="text-gray-300 leading-relaxed text-sm font-light opacity-90">
                                    Real-time consolidation of voucher rates across Gyftr, Amazon, and direct portals, instantly highlighting the highest redemption value.
                                </p>
                            </div>

                            <div className="bg-espresso-800/40 p-10 rounded-sm border border-copper/40 hover:border-primary transition-all duration-500 group hover:-translate-y-1 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-primary text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 font-light">calculate</span>
                                <h3 className="text-white font-medium text-xl mb-4 tracking-wide">Reward Calculator</h3>
                                <p className="text-gray-300 leading-relaxed text-sm font-light opacity-90">
                                    Advanced algorithms that factor in card-specific multipliers, monthly capping limits, and MCC codes to project exact savings.
                                </p>
                            </div>

                            <div className="bg-espresso-800/40 p-10 rounded-sm border border-copper/40 hover:border-primary transition-all duration-500 group hover:-translate-y-1 backdrop-blur-sm">
                                <span className="material-symbols-outlined text-primary text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 font-light">notifications_active</span>
                                <h3 className="text-white font-medium text-xl mb-4 tracking-wide">Deal Alerts</h3>
                                <p className="text-gray-300 leading-relaxed text-sm font-light opacity-90">
                                    Automated monitoring of limited-time offers and potential devaluations, ensuring you maximize benefits before they expire.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Open Source Section */}
                    <section className="border-y border-primary/20 py-20 -mx-8 px-8 md:-mx-16 md:px-16 relative overflow-hidden">
                        <div className="absolute inset-0 bg-espresso-800/20 pointer-events-none"></div>
                        <div className="max-w-5xl mx-auto relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="font-serif text-4xl md:text-5xl text-gold-400 mb-6">Our Open Source Promise</h2>
                                <p className="text-gray-200 font-light text-lg tracking-wide max-w-2xl mx-auto">
                                    Financial tools require absolute trust. We don't just ask for it; we prove it through transparency.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-12">
                                <div className="text-center px-4 group">
                                    <h4 className="text-xl text-white font-serif font-bold mb-4 group-hover:text-gold-400 transition-colors">Community Audited</h4>
                                    <p className="text-sm text-gray-400 leading-loose font-light">
                                        Our entire codebase is open for public inspection. Security researchers and community members verify our calculations daily.
                                    </p>
                                </div>

                                <div className="text-center px-4 border-t md:border-t-0 md:border-l border-primary/30 pt-10 md:pt-0 group">
                                    <h4 className="text-xl text-white font-serif font-bold mb-4 group-hover:text-gold-400 transition-colors">Privacy Centric</h4>
                                    <p className="text-sm text-gray-400 leading-loose font-light">
                                        We practice data minimization. Your financial data stays on your device and is never sold to third-party advertisers.
                                    </p>
                                </div>

                                <div className="text-center px-4 border-t md:border-t-0 md:border-l border-primary/30 pt-10 md:pt-0 group">
                                    <h4 className="text-xl text-white font-serif font-bold mb-4 group-hover:text-gold-400 transition-colors">User Governance</h4>
                                    <p className="text-sm text-gray-400 leading-loose font-light">
                                        Roadmap decisions are driven by user votes, not investor pressure. We build what the community actually needs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Founder Section */}
                    <section className="max-w-4xl mx-auto">
                        <div className="relative bg-gradient-to-br from-espresso-800 to-espresso-900 border border-primary/40 p-10 md:p-16 rounded-sm overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-48 bg-primary/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12 text-center md:text-left">
                                <div className="flex-shrink-0 relative group">
                                    <div className="h-40 w-40 rounded-full p-2 border border-primary/40 group-hover:border-gold-400 transition-colors duration-500">
                                        <div className="h-full w-full rounded-full bg-espresso-700 flex items-center justify-center">
                                            <span className="text-gold-400 text-4xl font-serif font-bold">VL</span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-espresso-950 border border-primary text-gold-400 text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest shadow-lg">
                                        Founder
                                    </div>
                                </div>

                                <div className="flex-1 pt-2">
                                    <h3 className="font-serif text-4xl text-gold-400 font-bold mb-2">Vaibhav Lodha</h3>
                                    <p className="text-white text-sm tracking-[0.2em] uppercase mb-8 opacity-90">Creator & Lead Architect</p>
                                    <blockquote className="text-xl text-white font-light italic mb-10 leading-relaxed opacity-90">
                                        "I built CardPerks because I was tired of spreadsheets. I wanted a dashboard that respected both my time and my wallet."
                                    </blockquote>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                                        <a className="px-8 py-3 bg-espresso-950 border border-primary/60 text-white text-sm hover:border-gold-400 hover:text-gold-400 transition-all duration-300 rounded-sm uppercase tracking-widest font-medium" href="#">
                                            Contact
                                        </a>
                                        <a className="px-8 py-3 bg-espresso-950 border border-primary/60 text-white text-sm hover:border-gold-400 hover:text-gold-400 transition-all duration-300 rounded-sm uppercase tracking-widest font-medium" href="#">
                                            View Source
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="pt-16 border-t border-primary/20 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gold-dim pb-12">
                        <p className="font-light tracking-wide">© 2024 CardPerks Inc. All rights reserved.</p>
                        <div className="flex gap-8 mt-6 md:mt-0 font-light">
                            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}
