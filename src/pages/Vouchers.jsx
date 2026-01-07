import Footer from '../components/layout/Footer';

const sampleVouchers = [
  { name: 'Amazon Pay', category: 'Shopping & Utilities', rate: '3.0%', value: '₹5k - ₹50k', logo: '🛒' },
  { name: 'Flipkart', category: 'Electronics & Fashion', rate: '4.5%', value: '₹2k - ₹25k', logo: '🛍️' },
  { name: 'Tata CLiQ Lux', category: 'Premium Brands', rate: '8.0%', value: '₹10k - ₹1L', logo: '💎' },
  { name: 'MakeMyTrip', category: 'Flights & Hotels', rate: '6.5%', value: '₹5k - ₹50k', logo: '✈️' },
  { name: 'Croma', category: 'Electronics', rate: '2.5%', value: '₹1k - ₹20k', logo: '📱' },
  { name: 'Zomato Gold', category: 'Dining', rate: '9.0%', value: '₹500 - ₹2k', logo: '🍔' },
  { name: 'Uber', category: 'Travel & Commute', rate: '4.0%', value: '₹250 - ₹1k', logo: '🚗' },
  { name: 'Pantaloons', category: 'Fashion Retail', rate: '7.5%', value: '₹1k - ₹10k', logo: '👔' },
];

export default function Vouchers() {
  return (
    <div className="flex flex-1 overflow-hidden relative">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-background-dark border-r border-primary/20 relative z-20 overflow-y-auto hide-scrollbar pb-6 hidden lg:flex">
        <div className="p-6 pb-2">
          <h3 className="text-gold-text font-serif font-bold text-lg mb-1">Filter Vouchers</h3>
          <p className="text-warm-gray text-xs mb-6">Refine by category & preferences</p>

          <div className="mb-8">
            <button className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 bg-gradient-to-r from-copper-500 to-[#8c5341] text-background-dark text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(200,127,69,0.4)] transition-shadow">
              <span className="material-symbols-outlined text-sm">filter_alt_off</span>
              RESET FILTERS
            </button>
          </div>

          <div className="mb-8">
            <h4 className="text-copper-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">category</span> Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'All',
                'Dining & Food',
                'Fashion & Accessories',
                'Travel & Leisure',
                'E-commerce & Technology',
                'Groceries & Essentials',
              ].map((cat) => (
                <button
                  key={cat}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-medium ${
                    cat === 'All'
                      ? 'bg-copper-500/20 border border-copper-500 text-white shadow-[0_0_8px_rgba(200,127,69,0.3)]'
                      : 'bg-espresso-800 border border-copper-500/20 text-warm-white hover:bg-white/5 hover:border-copper-500/50 hover:text-white'
                  } transition-all`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-gradient-to-br from-espresso-950 to-[#0f0502]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto hide-scrollbar p-8 pb-20">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-4xl font-serif text-warm-white mb-2">Exclusive Vouchers</h2>
                  <p className="text-warm-gray font-light">
                    Negotiated rates for premium cardholders. Maximize your{' '}
                    <span className="text-copper-500 font-medium">Reward ROI</span>.
                  </p>
                </div>
                <div className="flex items-center gap-4 bg-espresso-800 border border-copper-500/20 rounded-lg p-2 pr-4 shadow-lg shadow-black/30">
                  <div className="bg-copper-500/10 rounded px-2 py-1">
                    <span className="material-symbols-outlined text-copper-500 text-sm">monitoring</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gold-dim uppercase tracking-wide">Gold (24k)</span>
                    <span className="text-xs font-bold text-gold-text">
                      ₹7,200/g <span className="text-green-500 ml-1">+0.4%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Voucher Grid */}
            <div className="flex items-center justify-between border-b border-copper-500/10 pb-4">
              <h3 className="text-lg font-serif text-warm-white">All Offers</h3>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gold-dim uppercase tracking-wider font-medium">View:</span>
                <div className="flex gap-1">
                  <button className="text-copper-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">grid_view</span>
                  </button>
                  <button className="text-gold-dim hover:text-white transition-colors">
                    <span className="material-symbols-outlined">view_list</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleVouchers.map((voucher) => (
                <div
                  key={voucher.name}
                  className="bg-espresso-800 rounded-xl p-5 border border-white/5 hover:border-copper-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] group flex flex-col gap-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-5 z-10">
                    <button className="text-gold-dim hover:text-copper-500 transition-colors">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-lg p-2 size-12 flex items-center justify-center shadow-lg text-2xl">
                    {voucher.logo}
                  </div>

                  <div>
                    <h4 className="text-gold-text font-semibold text-lg">{voucher.name}</h4>
                    <p className="text-warm-gray text-xs mt-1">{voucher.category}</p>
                  </div>

                  <div className="py-3 border-t border-dashed border-copper-500/20">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] uppercase text-gold-dim/70 font-bold">Effective Rate</p>
                        <p className="text-2xl font-bold text-copper-500">{voucher.rate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase text-gold-dim/70 font-bold">Value</p>
                        <p className="text-sm font-medium text-warm-white">{voucher.value}</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2 rounded-lg bg-espresso-800 border border-copper-500/30 text-copper-500 font-bold text-sm hover:bg-copper-500 hover:text-espresso-950 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
                    Buy Voucher
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
