export default function Favourites() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 lg:py-10">
        <div className="mb-10 flex flex-col gap-6 border-b border-stone-200 pb-8 dark:border-accent-copper/20 md:flex-row md:items-end md:justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark pt-4 -mt-4">
          <div>
            <h1 className="text-3xl font-black text-stone-900 dark:text-warm-white md:text-4xl">
              Your <span className="bg-gradient-to-r from-primary via-primary-light to-accent-copper bg-clip-text text-transparent">Favourites</span>
            </h1>
            <p className="mt-2 text-lg text-stone-600 dark:text-text-gold/80">Manage your tracked items across all categories.</p>
          </div>
          <div className="flex gap-1 overflow-x-auto rounded-lg bg-stone-100 p-1 dark:bg-surface-dark border dark:border-white/5 shadow-inner scrollbar-hide">
            <button className="rounded-md bg-white px-5 py-2 text-sm font-bold text-stone-900 shadow-sm transition-all dark:bg-primary dark:text-surface-darker ring-1 ring-black/5 dark:ring-0">All</button>
            <button className="whitespace-nowrap rounded-md px-5 py-2 text-sm font-medium text-stone-600 transition-all hover:bg-white/50 hover:text-stone-900 dark:text-warm-white/60 dark:hover:bg-white/5 dark:hover:text-primary">Vouchers</button>
            <button className="whitespace-nowrap rounded-md px-5 py-2 text-sm font-medium text-stone-600 transition-all hover:bg-white/50 hover:text-stone-900 dark:text-warm-white/60 dark:hover:bg-white/5 dark:hover:text-primary">Cards</button>
            <button className="whitespace-nowrap rounded-md px-5 py-2 text-sm font-medium text-stone-600 transition-all hover:bg-white/50 hover:text-stone-900 dark:text-warm-white/60 dark:hover:bg-white/5 dark:hover:text-primary">Banking</button>
          </div>
        </div>

        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-stone-900 dark:text-warm-white">
              <span className="material-symbols-outlined text-primary">sell</span>
              Watchlisted Vouchers
            </h2>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/20">3 Saved</span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Amazon Pay', category: 'Shopping', rate: '98.5%', trend: '+0.5%', trendUp: true },
              { name: 'Swiggy Money', category: 'Food & Dining', rate: '96.0%', trend: 'Stable', trendUp: false },
              { name: 'Myntra Luxe', category: 'Fashion', rate: '94.2%', trend: '-1.2%', trendUp: false }
            ].map((voucher) => (
              <div key={voucher.name} className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white p-5 transition-all hover:border-primary/50 hover:shadow-lg dark:border-white/5 dark:bg-surface-darker">
                <div className="mb-2 flex justify-between items-center">
                  <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:bg-white/5 dark:text-stone-400">Voucher</span>
                  <button className="group/btn flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-red-500/10 hover:text-red-500 dark:text-stone-500" title="Remove from Favourites">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-xl font-bold text-stone-800 dark:bg-nav-bg dark:text-primary">{voucher.name.substring(0, 2)}</div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-stone-900 dark:text-warm-white line-clamp-1">{voucher.name}</h3>
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400">{voucher.category}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-stone-900 dark:text-warm-white">{voucher.rate}</span>
                  <span className={`flex items-center text-xs font-bold ${voucher.trendUp ? 'text-green-500 bg-green-500/10' : voucher.trend === 'Stable' ? 'text-stone-500 bg-stone-500/10' : 'text-red-500 bg-red-500/10'} px-1.5 py-0.5 rounded`}>
                    <span className="material-symbols-outlined text-[14px] mr-0.5">{voucher.trendUp ? 'trending_up' : voucher.trend === 'Stable' ? 'remove' : 'trending_down'}</span>
                    {voucher.trend}
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-stone-500 dark:text-stone-400">Real-time market rate</p>
                <div className="mt-5 flex gap-3">
                  <button className="flex-1 rounded-lg bg-stone-100 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-600 transition-colors hover:bg-stone-200 dark:bg-white/5 dark:text-warm-white dark:hover:bg-white/10">Details</button>
                  <button className="flex-1 rounded-lg bg-primary py-2.5 text-xs font-bold uppercase tracking-wider text-stone-900 transition-transform hover:scale-[1.02]">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-stone-900 dark:text-warm-white">
              <span className="material-symbols-outlined text-primary">credit_card</span>
              Saved Cards
            </h2>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/20">2 Saved</span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'HDFC Infinia Metal', bank: 'HDFC Bank', type: 'Super Premium', reward: '3.3% - 33%', fee: '₹12,500 + GST', gradient: 'from-[#1a120b] to-[#2b2016]' },
              { name: 'Axis Magnus Burgundy', bank: 'Axis Bank', type: 'Premium Lifestyle', reward: '4.8% - 24%', fee: '₹30,000 + GST', gradient: 'from-[#3b211a] to-[#1a110d]' }
            ].map((card) => (
              <div key={card.name} className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white p-0 transition-all hover:border-primary/50 hover:shadow-lg dark:border-white/5 dark:bg-surface-darker">
                <div className={`relative h-40 bg-gradient-to-br ${card.gradient} p-5`}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                  <div className="absolute right-0 top-0 h-24 w-24 -translate-y-10 translate-x-8 rounded-full bg-primary/20 blur-2xl"></div>
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex justify-between">
                      <span className="text-sm font-bold tracking-widest text-white/90">{card.bank.toUpperCase()}</span>
                      <span className="material-symbols-outlined text-white/50">contactless</span>
                    </div>
                    <div>
                      <div className="mb-2 text-xs text-white/50">{card.name.toUpperCase()}</div>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-10 rounded bg-white/20"></div>
                        <div className="text-sm tracking-widest text-white/90">•••• 8892</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:bg-white/5 dark:text-stone-400 mb-1">Credit Card</span>
                      <h3 className="font-bold text-stone-900 dark:text-warm-white">{card.name}</h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400">{card.type}</p>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-red-500/10 hover:text-red-500 dark:text-stone-500" title="Remove from Favourites">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500 dark:text-stone-400">Reward Rate</span>
                      <span className="font-bold text-primary">{card.reward}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500 dark:text-stone-400">Annual Fee</span>
                      <span className="font-semibold text-stone-900 dark:text-warm-white">{card.fee}</span>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button className="rounded-lg bg-stone-100 py-2 text-xs font-bold text-stone-700 hover:bg-stone-200 dark:bg-white/5 dark:text-warm-white dark:hover:bg-white/10">View Details</button>
                    <button className="rounded-lg border border-primary/30 bg-primary/10 py-2 text-xs font-bold text-primary hover:bg-primary/20">Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
