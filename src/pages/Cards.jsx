import { useState } from 'react';
import Footer from '../components/layout/Footer';

const sampleCards = [
  {
    id: 1,
    name: 'Infinia Metal Edition',
    bank: 'HDFC BANK',
    rewardRate: '3.3% - 33%',
    smartBuyCap: '₹ 15,000 / mo',
    cardNumber: '8892',
    gradient: 'from-[#1a1a1a] via-[#2d2d2d] to-[#000000]',
  },
  {
    id: 2,
    name: 'Platinum Charge',
    bank: 'AMERICAN EXPRESS',
    tajVouchers: '₹ 45,000',
    concierge: '24/7 Global',
    cardNumber: '•••••',
    gradient: 'from-gray-300 via-gray-100 to-gray-400',
    isAmex: true,
  },
  {
    id: 3,
    name: 'Magnus Burgundy',
    bank: 'Axis Bank',
    milestoneProgress: 80,
    edgePoints: '25,000',
    cardNumber: '4512',
    gradient: 'from-[#3f190d] to-[#1a0505]',
  },
  {
    id: 4,
    name: 'SBI Aurum',
    bank: 'AURUM',
    tataCliq: '₹ 5,000 Due',
    bookMyShow: '4 Free tix',
    cardNumber: '1122',
    gradient: 'from-[#111] to-[#111]',
  },
];

export default function Cards() {
  const [selectedFilters, setSelectedFilters] = useState(['Lounge Access']);

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="flex flex-1 overflow-hidden relative">
      {/* Sidebar Filters */}
      <aside className="w-80 flex-shrink-0 flex flex-col bg-espresso-900 border-r border-gold-500/10 overflow-y-auto z-20 hidden lg:flex">
        <div className="p-6 flex flex-col gap-8">
          <div className="relative w-full">
            <label className="text-xs font-bold text-copper-400 uppercase tracking-widest mb-2 block">
              Refine Search
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/50 text-[18px]">
                filter_list
              </span>
              <input
                className="bg-espresso-800/50 border border-gold-500/20 rounded-lg py-2.5 pl-10 pr-4 text-sm text-gold-100 focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 w-full placeholder-gold-500/30"
                placeholder="Search cards by name..."
                type="text"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-gold-100 text-sm font-semibold uppercase tracking-wider">Features & Benefits</h4>
            </div>
            <div className="flex flex-col gap-3">
              {[
                'Lounge Access',
                'Fuel Surcharge',
                'Shopping Rewards',
                'Movie Offers',
                'Dining',
                'Golf Games',
                'Insurance',
              ].map((filter) => (
                <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      checked={selectedFilters.includes(filter)}
                      onChange={() => toggleFilter(filter)}
                      className="peer appearance-none w-4 h-4 rounded border border-copper-400/30 bg-espresso-800/50 checked:bg-copper-500 checked:border-copper-500 focus:ring-0 transition-all"
                      type="checkbox"
                    />
                    <span className="material-symbols-outlined text-white absolute inset-0 text-[12px] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                      check
                    </span>
                  </div>
                  <span className="text-off-white/70 text-sm font-medium group-hover:text-off-white transition-colors">
                    {filter}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-espresso-900">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-copper-900/10 to-transparent pointer-events-none z-0"></div>

        <div className="flex-1 overflow-y-auto z-10 p-6 lg:p-10 scroll-smooth pb-24">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-end gap-6 border-b border-gold-500/10 pb-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-off-white">
                  Explore <span className="gold-text">Premium Credit Cards</span>
                </h2>
                <p className="text-gold-100/50 text-sm font-light max-w-xl">
                  Discover and compare elite credit cards to maximize your rewards and benefits.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                <div className="relative group flex-shrink-0">
                  <button className="h-10 px-4 rounded-lg bg-espresso-800 border border-gold-500/20 text-gold-100 text-sm font-medium flex items-center gap-2 hover:bg-espresso-700 hover:border-gold-500/40 transition-all justify-between min-w-[130px]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-copper-400">account_balance</span>
                      All Banks
                    </div>
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  </button>
                </div>

                <div className="h-6 w-px bg-gold-500/10"></div>

                <div className="relative group flex-shrink-0">
                  <button className="h-10 px-4 rounded-lg bg-espresso-800 border border-gold-500/20 text-gold-100 text-sm font-medium flex items-center gap-2 hover:bg-espresso-700 hover:border-gold-500/40 transition-all justify-between min-w-[130px]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-copper-400">sort</span>
                      Sort by
                    </div>
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {sampleCards.map((card) => (
                <div key={card.id} className="group relative flex flex-col gap-4">
                  {/* Card Visual */}
                  <div className="relative w-full aspect-[1.586] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group-hover:shadow-gold-500/20 group-hover:scale-[1.02] transition-all duration-300 transform-gpu border border-white/5">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient} ${
                        card.isAmex ? 'opacity-90 mix-blend-overlay' : 'opacity-90 mix-blend-multiply'
                      }`}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-gold-100/5 to-white/0 opacity-50"></div>

                    <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start">
                        <div
                          className={`${
                            card.isAmex ? 'text-black/80 mix-blend-hard-light' : 'text-white/90'
                          } font-bold text-lg tracking-wider`}
                        >
                          {card.bank}
                        </div>
                        <span
                          className={`material-symbols-outlined ${
                            card.isAmex ? 'text-black/60' : 'text-white/50'
                          } text-3xl`}
                        >
                          contactless
                        </span>
                      </div>

                      {card.isAmex && (
                        <div className="flex items-center justify-center">
                          <div className="size-16 rounded-full border-2 border-black/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-black/20 text-4xl">person</span>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-1 mt-auto">
                        <div
                          className={`${
                            card.isAmex ? 'text-black/80' : 'text-white/90'
                          } font-mono text-xl tracking-widest drop-shadow-md`}
                        >
                          •••• •••• •••• {card.cardNumber}
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <div
                            className={`${
                              card.isAmex ? 'text-black/70' : 'text-white/60'
                            } text-xs uppercase tracking-wider font-semibold`}
                          >
                            Aditya R.
                          </div>
                          <div
                            className={`${
                              card.isAmex ? 'text-blue-900' : 'text-white'
                            } font-bold italic text-2xl leading-none`}
                          >
                            {card.isAmex ? 'AMEX' : 'VISA'}
                          </div>
                        </div>
                      </div>

                      {!card.isAmex && (
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-32 h-32 bg-gold-500/10 blur-3xl rounded-full pointer-events-none"></div>
                      )}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="glass-card rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center border-b border-gold-500/10 pb-3">
                      <h3 className="text-lg font-bold text-off-white">{card.name}</h3>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 cursor-pointer group/cmp" title="Add to Compare">
                          <input
                            className="appearance-none peer w-3.5 h-3.5 border border-gold-500/30 rounded bg-espresso-900/50 checked:bg-copper-500 checked:border-copper-500 focus:ring-0"
                            type="checkbox"
                          />
                          <span className="text-[10px] uppercase font-bold tracking-wider text-gold-500/50 peer-checked:text-copper-400 group-hover/cmp:text-gold-100 transition-colors">
                            Compare
                          </span>
                        </label>
                        <div className="h-4 w-px bg-gold-500/10"></div>
                        <button
                          className="text-gold-500/30 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gold-500/5"
                          title="Add to Favourites"
                        >
                          <span className="material-symbols-outlined text-[20px]">favorite</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gold-100/40 text-xs">
                          {card.rewardRate ? 'Reward Rate' : card.tajVouchers ? 'Taj Vouchers' : 'Monthly Milestone'}
                        </p>
                        <p className="text-off-white font-medium">
                          {card.rewardRate || card.tajVouchers || (
                            <div className="flex items-center gap-2 mt-0.5">
                              <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-copper-400 w-[80%]"></div>
                              </div>
                              <span className="text-xs text-off-white">80%</span>
                            </div>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-gold-100/40 text-xs">
                          {card.smartBuyCap
                            ? 'SmartBuy Cap'
                            : card.concierge
                            ? 'Concierge'
                            : card.edgePoints
                            ? 'Edge Points'
                            : 'BookMyShow'}
                        </p>
                        <p className="text-off-white font-medium">
                          {card.smartBuyCap || card.concierge || card.edgePoints || card.bookMyShow}
                        </p>
                      </div>
                    </div>

                    <button className="w-full mt-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gold-300 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer within page */}
            <div className="mt-8 border-t border-gold-500/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gold-100/40 text-sm">
              <p>© 2024 LuxCard Financial. Premium Banking Dashboard.</p>
              <div className="flex gap-6">
                <a className="hover:text-gold-100 transition-colors" href="#">
                  Privacy
                </a>
                <a className="hover:text-gold-100 transition-colors" href="#">
                  Terms
                </a>
                <a className="hover:text-gold-100 transition-colors" href="#">
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Compare Button */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
          <button className="bg-copper-500 hover:bg-copper-600 text-white pl-6 pr-8 py-3 rounded-full shadow-2xl shadow-copper-500/30 flex items-center gap-3 transition-all transform hover:scale-105 group border border-white/10">
            <div className="relative">
              <span className="material-symbols-outlined text-[24px]">compare_arrows</span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-espresso-950 text-[9px] font-bold text-copper-400 ring-2 ring-copper-500">
                2
              </span>
            </div>
            <span className="font-medium tracking-wide">Compare Cards</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
