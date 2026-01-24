export default function GetInTouch() {
    return (
        <div className="flex flex-1 overflow-hidden relative bg-theme-bg">
            {/* Sidebar */}
            <aside className="hidden md:flex w-72 flex-col justify-between bg-theme-bg border-r border-theme-border p-6 flex-shrink-0 z-20 relative">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-theme-surface to-theme-bg border border-theme-border shadow-inner group cursor-pointer">
                            <span className="material-symbols-outlined text-accent group-hover:scale-110 transition-transform duration-300">account_balance_wallet</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-theme-primary text-lg font-bold leading-none tracking-tight font-serif">CardPerks</h1>
                            <p className="text-accent-secondary text-[10px] font-bold uppercase tracking-[0.15em] mt-1.5">Premium</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-theme-secondary hover:text-theme-primary hover:bg-theme-surface transition-all duration-200 group" href="#">
                            <span className="material-symbols-outlined text-theme-muted group-hover:text-accent-secondary transition-colors">dashboard</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-theme-secondary hover:text-theme-primary hover:bg-theme-surface transition-all duration-200 group" href="#">
                            <span className="material-symbols-outlined text-theme-muted group-hover:text-accent-secondary transition-colors">credit_card</span>
                            <span className="text-sm font-medium">Cards</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-theme-secondary hover:text-theme-primary hover:bg-theme-surface transition-all duration-200 group" href="#">
                            <span className="material-symbols-outlined text-theme-muted group-hover:text-accent-secondary transition-colors">bar_chart</span>
                            <span className="text-sm font-medium">Analysis</span>
                        </a>
                        <div className="h-px bg-theme-border my-2 mx-4 opacity-50"></div>
                        <a className="relative flex items-center gap-3 px-4 py-3 bg-theme-surface text-theme-primary transition-all duration-200 overflow-hidden group" href="#">
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-copper shadow-[0_0_10px_rgba(187,112,42,0.5)]"></div>
                            <span className="material-symbols-outlined text-accent-secondary">support_agent</span>
                            <span className="text-sm font-bold z-10 tracking-wide">Get in Touch</span>
                        </a>
                        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-theme-secondary hover:text-theme-primary hover:bg-theme-surface transition-all duration-200 group" href="#">
                            <span className="material-symbols-outlined text-theme-muted group-hover:text-accent-secondary transition-colors">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </a>
                    </nav>
                </div>

                <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-theme-surface border border-theme-border group cursor-pointer hover:border-copper/30 transition-colors">
                    <div className="size-9 rounded-full bg-gradient-to-br from-theme-surface to-theme-bg flex items-center justify-center text-accent-secondary font-serif font-bold text-xs border border-copper/20 group-hover:border-copper transition-colors shadow-inner">
                        VL
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <p className="text-theme-primary text-sm font-bold truncate font-serif">Vaibhav Lodha</p>
                        <p className="text-theme-secondary text-[10px] uppercase tracking-wider truncate">Pro Member</p>
                    </div>
                    <span className="material-symbols-outlined text-theme-muted text-lg ml-auto group-hover:text-theme-primary transition-colors">more_vert</span>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 h-full relative overflow-hidden bg-theme-bg">
                <header className="flex items-center justify-between border-b border-theme-border bg-theme-bg px-8 py-5 z-10">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-theme-secondary hover:text-theme-primary">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="hidden md:flex items-center text-sm font-medium">
                            <span className="text-theme-muted">Help Center</span>
                            <span className="material-symbols-outlined text-[16px] mx-3 text-theme-muted">chevron_right</span>
                            <span className="text-accent-secondary font-semibold">Contact</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center justify-center size-10 rounded-full text-theme-secondary hover:bg-theme-surface hover:text-theme-primary border border-transparent hover:border-theme-border transition-all relative group">
                            <span className="material-symbols-outlined text-[22px] group-hover:animate-pulse">notifications</span>
                            <span className="absolute top-2.5 right-2.5 size-2 bg-copper rounded-full ring-2 ring-theme-bg"></span>
                        </button>
                        <button className="flex items-center justify-center size-10 rounded-full text-theme-secondary hover:bg-theme-surface hover:text-theme-primary border border-transparent hover:border-theme-border transition-all">
                            <span className="material-symbols-outlined text-[22px]">help</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-theme-bg relative">
                    <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_-20%,rgba(187,112,42,0.08),transparent_70%)] pointer-events-none"></div>

                    <div className="max-w-6xl mx-auto px-6 py-12 md:px-12 md:py-16">
                        {/* Header */}
                        <div className="mb-16 max-w-3xl relative">
                            <h1 className="font-serif text-5xl md:text-6xl text-accent font-bold leading-tight mb-4 tracking-tight drop-shadow-sm">
                                Get in Touch
                            </h1>
                            <p className="text-theme-primary text-lg md:text-xl font-normal leading-relaxed max-w-2xl opacity-90">
                                Have a feature request, found a bug, or just want to talk points? We are listening.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            {/* Twitter/X Card */}
                            <div className="group relative flex flex-col bg-theme-surface border border-copper rounded-xl p-8 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-copper/10 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-copper/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 mb-6 inline-flex p-3 rounded-lg bg-theme-bg border border-theme-border text-accent-secondary w-fit shadow-md">
                                    <svg aria-hidden="true" className="size-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                    </svg>
                                </div>
                                <div className="relative z-10 flex-1">
                                    <h3 className="text-theme-primary text-xl font-bold mb-2 tracking-wide">Join the Conversation</h3>
                                    <p className="text-theme-primary/80 font-normal leading-relaxed text-sm">Fastest way to get help and connect with the community.</p>
                                </div>
                                <div className="relative z-10 mt-8">
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-theme-bg border border-copper text-theme-primary rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(187,112,42,0.2)] font-bold tracking-wide text-sm">
                                        <span>DM on X</span>
                                        <span className="opacity-70 font-normal text-xs">(@vaibhav_lodha)</span>
                                    </button>
                                </div>
                            </div>

                            {/* GitHub Card */}
                            <div className="group relative flex flex-col bg-theme-surface border border-copper rounded-xl p-8 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-copper/10 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-copper/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 mb-6 inline-flex p-3 rounded-lg bg-theme-bg border border-theme-border text-accent-secondary w-fit shadow-md">
                                    <svg aria-hidden="true" className="size-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div className="relative z-10 flex-1">
                                    <h3 className="text-theme-primary text-xl font-bold mb-2 tracking-wide">Report a Bug</h3>
                                    <p className="text-theme-primary/80 font-normal leading-relaxed text-sm">Found something off? Open an issue on our repo.</p>
                                </div>
                                <div className="relative z-10 mt-8">
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-theme-bg border border-copper text-theme-primary rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(187,112,42,0.2)] font-bold tracking-wide text-sm">
                                        <span>View GitHub Repo</span>
                                        <span className="material-symbols-outlined text-sm">arrow_outward</span>
                                    </button>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div className="group relative flex flex-col bg-theme-surface border border-copper rounded-xl p-8 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-copper/10 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-copper/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 mb-6 inline-flex p-3 rounded-lg bg-theme-bg border border-theme-border text-accent-secondary w-fit shadow-md">
                                    <span className="material-symbols-outlined text-[24px]">mail</span>
                                </div>
                                <div className="relative z-10 flex-1">
                                    <h3 className="text-theme-primary text-xl font-bold mb-2 tracking-wide">General Inquiries</h3>
                                    <p className="text-theme-primary/80 font-normal leading-relaxed text-sm">For collaboration, partnerships, or just to say hello.</p>
                                </div>
                                <div className="relative z-10 mt-8 h-[46px] flex items-center">
                                    <a className="group/link flex items-center gap-2 text-theme-primary font-bold text-sm tracking-wide transition-colors" href="mailto:hello@vouchertracker.com">
                                        <span className="border-b-2 border-transparent group-hover/link:border-copper pb-0.5 transition-all duration-300">hello@vouchertracker.com</span>
                                        <span className="material-symbols-outlined text-accent-secondary text-lg transition-transform group-hover/link:translate-x-1">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-24 pt-8 border-t border-theme-border flex flex-col md:flex-row justify-between items-center text-white text-sm gap-4 opacity-80">
                            <p className="font-medium tracking-wide">© 2024 CardPerks. All rights reserved.</p>
                            <div className="flex gap-8">
                                <a className="text-white border-b border-copper hover:text-accent-secondary transition-colors pb-0.5" href="#">Privacy</a>
                                <a className="text-white border-b border-copper hover:text-accent-secondary transition-colors pb-0.5" href="#">Terms</a>
                                <a className="text-white border-b border-copper hover:text-accent-secondary transition-colors pb-0.5" href="#">Sitemap</a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
