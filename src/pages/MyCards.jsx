export default function MyCards() {
  return (
    <div className="min-h-screen bg-background-dark text-text-main">
      <div className="w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 flex flex-col gap-10 min-h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black tracking-tight text-text-main">Strategic Overview</h1>
            <p className="text-text-muted text-base max-w-md">Optimize your wallet strategy, track milestone progress, and maximize reward returns.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-copper/40 text-copper hover:bg-copper/10 hover:border-copper transition-all font-bold text-sm">
              <span className="material-symbols-outlined text-lg">timeline</span>
              <span>Track Rewards</span>
            </button>
            <button className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-copper text-text-main hover:bg-copper/90 shadow-lg shadow-copper/20 transition-all font-bold text-sm transform hover:scale-105 active:scale-95">
              <span className="material-symbols-outlined text-lg">add_card</span>
              <span>Add New Card</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Projected Annual Savings', value: '₹1,72,500', change: '↑ 12% vs last year', icon: 'savings' },
            { label: 'Lifetime Rewards', value: '₹4,25,000', subtext: 'Across 3 active cards', icon: 'hotel_class' },
            { label: 'Current Points Value', value: '₹58,700', subtext: 'Redeemable now', icon: 'loyalty', highlight: true }
          ].map((stat, index) => (
            <div key={index} className="flex flex-col justify-between p-6 rounded-2xl bg-surface-dark border border-border-dark shadow-lg relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
              {stat.highlight && <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-copper/10 rounded-full blur-2xl group-hover:bg-copper/20 transition-all duration-500"></div>}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${stat.highlight ? 'bg-border-dark text-copper' : 'bg-border-dark text-text-muted'}`}>
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <p className="text-text-muted text-sm font-medium uppercase tracking-wide">{stat.label}</p>
              </div>
              <p className={`text-3xl font-bold tracking-tight ${stat.highlight ? 'text-copper' : 'text-text-main'}`}>{stat.value}</p>
              <div className="mt-2 text-xs text-text-muted flex items-center gap-1">
                {stat.change && <span className="text-green-500 font-medium">{stat.change}</span>}
                {stat.subtext && <span className={stat.highlight ? 'text-text-main font-medium' : 'text-text-muted font-medium'}>{stat.subtext}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-10">
          {[
            { name: 'Infinia Metal Edition', bank: 'HDFC Bank', image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400', tag: 'Best for Travel & Dining', savings: '₹1,20,000', points: '4.5L Pts', return: '3.3% - 16.5%', milestone: '₹1.8L left for Fee Waiver', progress: 82 },
            { name: 'Platinum Travel', bank: 'American Express', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', tag: 'Best for Milestones', savings: '₹35,000', points: '80k Pts', return: '~5.5%', milestone: '₹2.2L left for Milestone', progress: 45 },
            { name: 'Cashback Card', bank: 'SBI Card', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400', tag: 'Best for Online Shopping', savings: '₹18,000', points: '₹15,000', return: '5% Flat', milestone: '₹1.55L left for Fee Reversal', progress: 22 }
          ].map((card, index) => (
            <div key={index} className="group relative flex flex-col rounded-2xl bg-surface-dark border border-border-dark overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-copper/30">
              <div className="relative h-48 w-full bg-surface-highlight flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-copper/10 rounded-full blur-3xl group-hover:bg-copper/20 transition-all duration-500"></div>
                <div className="relative z-20 w-full max-w-[280px] aspect-[1.586/1] rounded-xl shadow-2xl transform rotate-0 group-hover:rotate-1 group-hover:scale-105 transition-transform duration-500 bg-cover bg-center" style={{backgroundImage: `url(${card.image})`}}>
                  <div className="absolute bottom-4 left-4 text-[10px] text-white/80 font-mono tracking-widest">**** **** **** 8892</div>
                  <div className="absolute top-4 right-4"><span className="material-symbols-outlined text-white/80 text-lg">contactless</span></div>
                </div>
              </div>
              <div className="flex flex-col p-5 gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-text-main">{card.name}</h3>
                      <p className="text-sm text-text-muted">{card.bank}</p>
                    </div>
                    <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                      <span className="text-[10px] font-bold tracking-tighter italic text-white/70">VISA</span>
                    </div>
                  </div>
                  <div className="inline-flex">
                    <span className="bg-border-dark/60 border border-border-dark text-copper text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wide">{card.tag}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex justify-between items-end text-xs mb-1">
                    <span className="text-copper font-medium text-[11px] uppercase tracking-wide">{card.milestone}</span>
                    <span className="text-text-muted font-mono text-[10px]">{card.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-border-dark rounded-full overflow-hidden">
                    <div className="h-full bg-copper rounded-full shadow-[0_0_10px_rgba(200,126,78,0.5)]" style={{width: `${card.progress}%`}}></div>
                  </div>
                </div>
                <div className="h-px bg-border-dark w-full"></div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Annual Savings</span>
                    <span className="text-sm font-bold text-text-main">{card.savings}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Lifetime Rewards</span>
                    <div className="flex flex-col leading-none gap-0.5">
                      <span className="text-sm font-bold text-text-main">{card.points}</span>
                    </div>
                  </div>
                </div>
                <button className="mt-2 w-full py-2.5 rounded-lg border border-border-dark text-sm font-medium text-text-muted hover:text-text-main hover:border-copper/50 hover:bg-border-dark/30 transition-all flex items-center justify-center gap-2 group/btn">
                  View Strategy
                  <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
