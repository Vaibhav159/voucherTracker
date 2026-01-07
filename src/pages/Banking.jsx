const bankingTiers = [
  {
    bank: 'HDFC',
    tier: 'Imperia Banking',
    category: 'Private Wealth',
    requirements: { mab: '₹ 10 Lakhs', trv: '₹ 30 Lakhs', salary: '₹ 3 Lakhs/mo' },
    benefits: ['Infinia Card Eligibility', 'Locker Discount: 50%', 'Zero Forex'],
    services: ['Dedicated RM', 'Family Grouping', 'Tax Advisory'],
    color: 'copper',
  },
  {
    bank: 'ICICI',
    tier: 'Wealth Management',
    category: 'Wealth Mgmt',
    requirements: { mab: '₹ 10 Lakhs', trv: '₹ 50 Lakhs', homeLoan: '> ₹ 2 Crores' },
    benefits: ['Family Banking: 4 members', 'Complimentary Golf', 'Investment Desk: PMS & AIF'],
    services: ['Wealth Coach', 'Estate Planning', 'Concierge'],
    color: 'orange',
  },
  {
    bank: 'AXIS',
    tier: 'Burgundy',
    category: 'Burgundy',
    requirements: { mab: '₹ 10 Lakhs', trv: '₹ 30 Lakhs', salary: '₹ 3 Lakhs/mo' },
    benefits: ['Burgundy Debit Card', 'Movies & Dining: BookMyShow', 'Locker Discount: 60%'],
    services: ['Relationship Mgr', 'Forex Rates', 'Priority Banking'],
    color: 'rose',
  },
];

export default function Banking() {
  return (
    <div className="flex flex-1 overflow-hidden relative">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-white/5 bg-[#0f0907] pt-8 pb-6 z-20">
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-copper-500 text-[18px]">filter_list</span>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Filters</h3>
          </div>
          <p className="text-[10px] text-gold-dim/40">Refine your comparison view</p>
        </div>

        <nav className="flex flex-col px-3 space-y-6 overflow-y-auto scrollbar-hide">
          <div>
            <h4 className="px-4 mb-2 text-[10px] font-bold text-gold-dim/50 uppercase tracking-[0.15em]">
              Filter by Bank
            </h4>
            <div className="space-y-0.5">
              {['All Banks', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map((bank) => (
                <label
                  key={bank}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-white/5 cursor-pointer group transition-colors"
                >
                  <input
                    defaultChecked
                    className="rounded border-white/10 bg-white/5 text-copper-500 focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5"
                    type="checkbox"
                  />
                  <span className="text-sm font-medium text-gold-dim group-hover:text-white transition-colors">
                    {bank}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-white/5 mx-4"></div>

          <div>
            <h4 className="px-4 mb-2 text-[10px] font-bold text-gold-dim/50 uppercase tracking-[0.15em]">
              Filter by Tier Type
            </h4>
            <div className="space-y-0.5">
              <a className="flex items-center justify-between rounded-lg px-4 py-2 bg-gradient-to-r from-copper-500/10 to-transparent border-l-2 border-copper-500 cursor-pointer group">
                <span className="text-sm font-medium text-white">Wealth / Private</span>
                <span className="text-[10px] text-copper-500 font-bold">4</span>
              </a>
              <a className="flex items-center justify-between rounded-lg px-4 py-2 hover:bg-white/5 border-l-2 border-transparent cursor-pointer group transition-colors">
                <span className="text-sm font-medium text-gold-dim group-hover:text-white">Premium / Salary</span>
                <span className="text-[10px] text-gold-dim/30 font-bold group-hover:text-gold-dim">12</span>
              </a>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0c0706] relative scrollbar-hide">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#1a100c] to-[#0c0706] pointer-events-none"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto max-w-[1600px] px-8 py-10 relative z-10">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-copper-500" style={{ fontSize: '18px' }}>
                  stars
                </span>
                <span className="text-xs font-semibold text-gold-dim/80 uppercase tracking-widest">
                  Premium Selection
                </span>
              </div>
              <h2 className="text-4xl font-display font-medium text-white tracking-tight mb-2">
                Banking Tiers <span className="copper-gradient-text font-bold">Decoded</span>
              </h2>
              <p className="text-sm text-gold-dim/60 font-light max-w-2xl">
                Compare wealth and family banking eligibility across HDFC, ICICI, and more. Find the tier that matches
                your lifestyle and financial stature.
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <button className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-gold-dim hover:bg-white/10 hover:text-white hover:border-white/20 transition-all">
                <span
                  className="material-symbols-outlined text-gold-dim/60 group-hover:text-white transition-colors"
                  style={{ fontSize: '18px' }}
                >
                  download
                </span>
                Download Guide
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bankingTiers.map((tier, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-0 relative overflow-hidden group hover:border-copper-500/40 transition-all duration-500 flex flex-col h-full"
              >
                <button
                  className="absolute top-6 right-6 z-20 h-8 w-8 rounded-full bg-black/20 hover:bg-copper-500/20 flex items-center justify-center text-gold-dim/50 hover:text-copper-500 transition-all backdrop-blur-sm border border-white/5 hover:border-copper-500/30"
                  title="Add to Favourites"
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>

                <div className="p-8 pb-6 border-b border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 bg-white/90 rounded flex items-center justify-center">
                      <span className="text-[#004c8f] font-bold text-xs tracking-tighter">{tier.bank}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full bg-${tier.color}-500/10 text-${tier.color}-500 text-[10px] font-bold uppercase tracking-wider border border-${tier.color}-500/20`}
                    >
                      {tier.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{tier.tier}</h3>
                  <p className="text-xs text-gold-dim/60">Top-tier wealth management.</p>
                </div>

                <div className="p-8 py-6 flex-1">
                  <h4 className="text-xs font-bold text-copper-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">verified</span> Eligibility Criteria
                  </h4>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/5 mb-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-xs text-gold-dim">Monthly Avg Balance</span>
                        <span className="text-sm font-mono text-copper-400">{tier.requirements.mab}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gold-dim">Total Relationship Value</span>
                        <span className="text-sm font-mono text-copper-400">{tier.requirements.trv}</span>
                      </div>
                      {tier.requirements.salary && (
                        <div className="flex justify-between">
                          <span className="text-xs text-gold-dim">Net Salary Credit</span>
                          <span className="text-sm font-mono text-copper-400">{tier.requirements.salary}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-copper-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">redeem</span> Exclusive Benefits
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gold-dim">
                        <span className="material-symbols-outlined text-copper-500 text-base mt-0.5">
                          check_circle
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {tier.services.map((service, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gold-dim/80"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 pt-0 mt-auto flex gap-3">
                  <button className="flex-1 py-3 rounded-lg bg-gradient-to-r from-copper-500 to-[#a66a30] hover:from-[#dba365] hover:to-[#be7a39] text-[#1a100c] text-sm font-bold uppercase tracking-wider shadow-lg shadow-copper-500/20 transition-all flex items-center justify-center gap-2">
                    <span>Check Eligibility</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <button
                    className="h-[46px] w-[46px] flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold-dim hover:text-white hover:border-copper-500/40 hover:bg-white/10 transition-all"
                    title="Compare"
                  >
                    <span className="material-symbols-outlined">compare_arrows</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
