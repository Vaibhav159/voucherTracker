export default function Guides() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="flex-1 max-w-[1400px] mx-auto w-full p-6 md:p-8 lg:p-12 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-copper text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Editorial Hub</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-main">Guides <span className="font-light text-text-muted italic">&</span> Insights</h1>
          </div>
          <div className="hidden md:block">
            <span className="text-text-muted text-sm font-light italic">Curated for the modern investor</span>
          </div>
        </div>

        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-gradient-to-r from-primary to-transparent"></span>
              <h2 className="text-3xl font-display font-semibold text-text-main tracking-widest">Featured Guides</h2>
            </div>
            <div className="flex gap-2">
              <button className="size-10 rounded-full border border-border-dark text-text-muted hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-300 group bg-surface-dark hover:bg-surface-highlight">
                <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
              </button>
              <button className="size-10 rounded-full border border-border-dark text-text-muted hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-300 group bg-surface-dark hover:bg-surface-highlight">
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[550px]">
            <article className="lg:col-span-8 relative h-full rounded-2xl overflow-hidden group shadow-elevated ring-1 ring-white/5 bg-background-dark">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110 saturate-[0.9]" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800")'}}></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050302] via-[#050302]/70 to-transparent z-10 opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#050302]/90 via-transparent to-transparent z-10"></div>

              <button className="absolute top-6 right-6 z-30 size-10 flex items-center justify-center rounded-full bg-surface-dark/40 backdrop-blur-md border border-white/10 text-text-muted hover:text-copper hover:border-copper/50 transition-all duration-300 group/fav">
                <span className="material-symbols-outlined text-[20px] group-active/fav:scale-90 group-hover/fav:fill-1 transition-transform">favorite</span>
              </button>

              <div className="absolute bottom-0 left-0 z-20 p-8 md:p-12 w-full md:w-5/6 flex flex-col items-start">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-[2px] border border-primary/40 bg-surface-dark/60 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-[0.25em] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    Wealth Management
                  </span>
                  <span className="w-px h-3 bg-white/20"></span>
                  <span className="text-text-muted/80 text-xs font-medium tracking-wide flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-copper">schedule</span> 12 min read
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-display font-medium text-text-main mb-6 leading-[1.1] tracking-wide drop-shadow-lg group-hover:text-primary-hover transition-colors duration-500">
                  Wealth Preservation in Volatile Markets
                </h3>

                <p className="text-text-muted text-base md:text-lg font-light leading-relaxed mb-8 line-clamp-2 max-w-2xl border-l-2 border-primary/30 pl-4 opacity-90">
                  Strategic allocation assets that hedge against inflation while maintaining liquidity for high-net-worth portfolios.
                </p>

                <a className="inline-flex items-center gap-3 border border-copper/60 text-copper px-6 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-[0.2em] hover:bg-copper hover:text-[#120b09] hover:border-copper transition-all duration-300 backdrop-blur-sm group/btn" href="#">
                  Read Analysis
                  <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform duration-300">arrow_right_alt</span>
                </a>
              </div>
            </article>

            <div className="lg:col-span-4 flex flex-col gap-6 h-full">
              {[
                { title: "The 2024 Metal Card Hierarchy", category: "Cards", time: "8 min read" },
                { title: "Unlocking First Class Upgrades", category: "Travel", time: "5 min read" }
              ].map((guide, index) => (
                <article key={index} className="relative flex-1 rounded-2xl overflow-hidden group shadow-lg ring-1 ring-white/5 bg-background-dark">
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 saturate-[0.85]" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400")'}}></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050302] via-[#050302]/40 to-transparent z-10"></div>

                  <button className="absolute top-4 right-4 z-30 size-8 flex items-center justify-center rounded-full bg-surface-dark/40 backdrop-blur-md border border-white/10 text-text-muted hover:text-copper hover:border-copper/50 transition-all duration-300 group/fav">
                    <span className="material-symbols-outlined text-[16px] group-active/fav:scale-90 group-hover/fav:fill-1 transition-transform">favorite</span>
                  </button>

                  <div className="absolute bottom-0 left-0 z-20 p-6 md:p-8 w-full flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-0.5 rounded-[2px] border border-copper/40 bg-surface-dark/60 backdrop-blur-md text-copper text-[9px] font-bold uppercase tracking-[0.2em] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
                        {guide.category}
                      </span>
                      <span className="text-text-muted/70 text-[10px] uppercase tracking-wider font-medium">{guide.time}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-display font-medium text-text-main leading-snug group-hover:text-primary transition-colors mb-4 tracking-wide">
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

        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-copper/20 pb-4">
            <h2 className="text-2xl font-display font-bold text-text-main">Latest Insights</h2>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 hover:bg-primary hover:text-background-dark transition-all">All</button>
              <button className="px-4 py-1.5 rounded-full bg-transparent text-text-muted text-xs font-medium border border-border-dark hover:border-text-muted hover:text-text-main transition-all">Strategy</button>
              <button className="px-4 py-1.5 rounded-full bg-transparent text-text-muted text-xs font-medium border border-border-dark hover:border-text-muted hover:text-text-main transition-all">News</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <article className="md:col-span-2 group relative flex flex-col sm:flex-row bg-surface-dark border border-border-dark rounded-2xl overflow-hidden hover:border-copper/30 transition-all duration-300 shadow-lg">
                  <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden relative">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1554224311-3bf6b6573855?w=600")'}}></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-surface-dark/90 backdrop-blur-sm text-copper text-[10px] font-bold px-2.5 py-1 rounded-[2px] border border-copper/20 uppercase tracking-widest shadow-md">Analysis</span>
                    </div>
                  </div>
                  <div className="p-8 sm:w-3/5 flex flex-col justify-center relative">
                    <button className="absolute top-6 right-6 z-20 size-8 flex items-center justify-center rounded-full bg-transparent border border-border-dark text-text-muted hover:text-copper hover:border-copper hover:bg-surface-highlight transition-all duration-300 group/fav">
                      <span className="material-symbols-outlined text-[18px] group-active/fav:scale-90 group-hover/fav:fill-1 transition-transform">favorite</span>
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-copper text-xs font-medium italic">Credit Optimization</span>
                      <span className="w-px h-3 bg-border-dark"></span>
                      <span className="text-text-muted text-xs flex items-center gap-1.5 font-medium"><span className="material-symbols-outlined text-[14px]">schedule</span> 6 min read</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-display font-medium text-text-main mb-4 group-hover:text-primary transition-colors leading-tight">
                      Amex Platinum vs. Axis Magnus: The 2024 Showdown
                    </h3>
                    <p className="text-text-muted text-sm font-light leading-relaxed line-clamp-2 mb-6 border-l border-copper/30 pl-3">
                      Devaluation updates have changed the game. We break down the math for spenders over ₹10L per annum to help you decide.
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="size-8 rounded-full bg-gray-700 bg-cover bg-center ring-1 ring-white/10 shadow-md" style={{backgroundImage: 'url("https://i.pravatar.cc/150?img=1")'}}></div>
                      <div>
                        <span className="text-xs text-text-main font-semibold block">Sarah Jenkins</span>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">Senior Analyst</span>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="group relative flex flex-col bg-surface-dark border border-border-dark rounded-2xl overflow-hidden hover:border-copper/30 transition-all duration-300 shadow-lg">
                  <div className="h-48 overflow-hidden relative">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400")'}}></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-surface-dark/90 backdrop-blur-sm text-copper text-[10px] font-bold px-2.5 py-1 rounded-[2px] border border-copper/20 uppercase tracking-widest shadow-md">Lifestyle</span>
                    </div>
                    <button className="absolute top-4 right-4 z-20 size-8 flex items-center justify-center rounded-full bg-surface-dark/60 backdrop-blur-sm border border-white/10 text-text-main hover:text-copper hover:border-copper transition-all duration-300 group/fav shadow-lg">
                      <span className="material-symbols-outlined text-[18px] group-active/fav:scale-90 group-hover/fav:fill-1 transition-transform">favorite</span>
                    </button>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Luxury Dining</span>
                      <span className="grow"></span>
                      <span className="text-text-muted text-[10px] flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">schedule</span> 4 min</span>
                    </div>
                    <h3 className="text-xl font-display font-medium text-text-main mb-3 group-hover:text-primary transition-colors leading-snug">
                      Concierge Secrets: Booking Impossible Tables
                    </h3>
                    <p className="text-text-muted text-sm font-light leading-relaxed line-clamp-3 mb-4">
                      How to leverage your Visa Infinite or Amex Centurion concierge to unlock dining experiences unavailable to the public.
                    </p>
                    <div className="mt-auto pt-4 border-t border-border-dark/50 flex items-center gap-2">
                      <div className="size-6 rounded-full bg-gray-700 bg-cover bg-center ring-1 ring-white/10" style={{backgroundImage: 'url("https://i.pravatar.cc/150?img=2")'}}></div>
                      <span className="text-xs text-text-muted font-medium">Arun Verma</span>
                    </div>
                  </div>
                </article>

                <article className="group relative flex flex-col bg-surface-dark border border-border-dark rounded-2xl overflow-hidden hover:border-copper/30 transition-all duration-300 shadow-lg">
                  <div className="h-48 overflow-hidden relative">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 saturate-[0.8]" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400")'}}></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-surface-dark/90 backdrop-blur-sm text-copper text-[10px] font-bold px-2.5 py-1 rounded-[2px] border border-copper/20 uppercase tracking-widest shadow-md">Travel</span>
                    </div>
                    <button className="absolute top-4 right-4 z-20 size-8 flex items-center justify-center rounded-full bg-surface-dark/60 backdrop-blur-sm border border-white/10 text-text-main hover:text-copper hover:border-copper transition-all duration-300 group/fav shadow-lg">
                      <span className="material-symbols-outlined text-[18px] group-active/fav:scale-90 group-hover/fav:fill-1 transition-transform">favorite</span>
                    </button>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-text-muted text-[10px] font-bold uppercase tracking-widest">Rewards</span>
                      <span className="grow"></span>
                      <span className="text-text-muted text-[10px] flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">schedule</span> 5 min</span>
                    </div>
                    <h3 className="text-xl font-display font-medium text-text-main mb-3 group-hover:text-primary transition-colors leading-snug">
                      Hidden Lounge Networks in SE Asia
                    </h3>
                    <p className="text-text-muted text-sm font-light leading-relaxed line-clamp-3 mb-4">
                      Beyond Priority Pass: Discovering exclusive boutique lounges accessible via specific premium Asian credit cards.
                    </p>
                    <div className="mt-auto pt-4 border-t border-border-dark/50 flex items-center gap-2">
                      <div className="size-6 rounded-full bg-gray-700 bg-cover bg-center ring-1 ring-white/10" style={{backgroundImage: 'url("https://i.pravatar.cc/150?img=3")'}}></div>
                      <span className="text-xs text-text-muted font-medium">Elena Roy</span>
                    </div>
                  </div>
                </article>
              </div>

              <button className="w-full py-4 border border-border-dark text-text-muted hover:text-primary hover:border-primary/50 text-sm font-bold uppercase tracking-widest rounded-xl transition-all hover:bg-surface-highlight flex items-center justify-center gap-2">
                Load More Articles
              </button>
            </div>

            <aside className="lg:col-span-4 pl-0 lg:pl-6 border-l-0 lg:border-l border-copper/10">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-copper/20">
                  <span className="material-symbols-outlined text-copper text-xl">trending_up</span>
                  <h3 className="text-sm font-bold text-text-main uppercase tracking-widest">Trending Now</h3>
                </div>
                <div className="flex flex-col">
                  <div className="group flex gap-5 items-start relative pr-8 cursor-pointer py-2">
                    <div className="text-2xl font-display font-bold text-copper/60 group-hover:text-primary transition-colors">01</div>
                    <div>
                      <h4 className="text-text-main font-medium font-display leading-snug mb-2 group-hover:text-primary transition-colors text-lg">Maximizing Reward Points on Fuel Spends</h4>
                      <div className="flex items-center gap-3 text-[10px] text-text-muted/60 uppercase tracking-wider font-semibold">
                        <span>3 min read</span>
                        <span className="size-0.5 rounded-full bg-copper"></span>
                        <span>Yesterday</span>
                      </div>
                    </div>
                    <button className="absolute right-0 top-2 size-6 flex items-center justify-center text-text-muted/20 hover:text-copper transition-all duration-300 group/fav">
                      <span className="material-symbols-outlined text-[18px] group-active/fav:scale-90 group-hover/fav:fill-1 transition-transform">favorite</span>
                    </button>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-copper/20 to-transparent my-4"></div>

                  <div className="group flex gap-5 items-start relative pr-8 cursor-pointer py-2">
                    <div className="text-2xl font-display font-bold text-copper/60 group-hover:text-primary transition-colors">02</div>
                    <div>
                      <h4 className="text-text-main font-medium font-display leading-snug mb-2 group-hover:text-primary transition-colors text-lg">Tax Implications of International Credit Card Usage</h4>
                      <div className="flex items-center gap-3 text-[10px] text-text-muted/60 uppercase tracking-wider font-semibold">
                        <span>5 min read</span>
                        <span className="size-0.5 rounded-full bg-copper"></span>
                        <span>Oct 22</span>
                      </div>
                    </div>
                    <button className="absolute right-0 top-2 size-6 flex items-center justify-center text-text-muted/20 hover:text-copper transition-all duration-300 group/fav">
                      <span className="material-symbols-outlined text-[18px] group-active/fav:scale-90 group-hover/fav:fill-1 transition-transform">favorite</span>
                    </button>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-copper/20 to-transparent my-4"></div>

                  <div className="group flex gap-5 items-start relative pr-8 cursor-pointer py-2">
                    <div className="text-2xl font-display font-bold text-copper/60 group-hover:text-primary transition-colors">03</div>
                    <div>
                      <h4 className="text-text-main font-medium font-display leading-snug mb-2 group-hover:text-primary transition-colors text-lg">Hidden Benefits of the Axis Burgundy Account</h4>
                      <div className="flex items-center gap-3 text-[10px] text-text-muted/60 uppercase tracking-wider font-semibold">
                        <span>7 min read</span>
                        <span className="size-0.5 rounded-full bg-copper"></span>
                        <span>Oct 20</span>
                      </div>
                    </div>
                    <button className="absolute right-0 top-2 size-6 flex items-center justify-center text-text-muted/20 hover:text-copper transition-all duration-300 group/fav">
                      <span className="material-symbols-outlined text-[18px] group-active/fav:scale-90 group-hover/fav:fill-1 transition-transform">favorite</span>
                    </button>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-copper/20 to-transparent my-4"></div>

                  <div className="group flex gap-5 items-start relative pr-8 cursor-pointer py-2">
                    <div className="text-2xl font-display font-bold text-copper/60 group-hover:text-primary transition-colors">04</div>
                    <div>
                      <h4 className="text-text-main font-medium font-display leading-snug mb-2 group-hover:text-primary transition-colors text-lg">Is the Taj Epicure Membership Worth It?</h4>
                      <div className="flex items-center gap-3 text-[10px] text-text-muted/60 uppercase tracking-wider font-semibold">
                        <span>4 min read</span>
                        <span className="size-0.5 rounded-full bg-copper"></span>
                        <span>Oct 18</span>
                      </div>
                    </div>
                    <button className="absolute right-0 top-2 size-6 flex items-center justify-center text-text-muted/20 hover:text-copper transition-all duration-300 group/fav">
                      <span className="material-symbols-outlined text-[18px] group-active/fav:scale-90 group-hover/fav:fill-1 transition-transform">favorite</span>
                    </button>
                  </div>
                </div>

                <div className="mt-10 p-8 rounded-xl border border-primary/20 bg-surface-highlight text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 size-20 bg-primary/5 rounded-full blur-xl -mr-5 -mt-5"></div>
                  <div className="absolute bottom-0 left-0 size-16 bg-copper/5 rounded-full blur-xl -ml-5 -mb-5"></div>
                  <span className="material-symbols-outlined text-copper/30 text-4xl mb-2 block mx-auto">format_quote</span>
                  <p className="text-text-main font-display italic text-lg mb-4 relative z-10">"Money is a terrible master but an excellent servant."</p>
                  <div className="w-10 h-px bg-copper/40 mx-auto mb-3"></div>
                  <span className="text-xs text-copper font-bold uppercase tracking-[0.2em] relative z-10">P.T. Barnum</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-16 bg-gradient-to-r from-[#1f1512] to-[#120b09] rounded-2xl p-8 md:p-12 relative overflow-hidden border border-border-dark">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-primary rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-copper rounded-full mix-blend-overlay filter blur-[80px] opacity-10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-3 font-display">Don't Miss the Next Devaluation Update</h2>
              <p className="text-text-muted font-light">Join 15,000+ premium members receiving weekly alerts on credit card reward changes and bonus offers.</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input className="bg-black/20 border border-white/10 text-text-main rounded-lg px-4 py-3 min-w-[280px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-white/20 transition-all" placeholder="Your work email" type="email" />
              <button className="bg-primary text-background-dark font-bold px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors whitespace-nowrap shadow-lg shadow-black/20">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
