export default function MilestoneTracker() {
  return (
    <div className="min-h-screen bg-background-dark flex">
      <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-text-main">Milestone & Capping Tracker</h1>
              <p className="text-text-muted text-base mt-2">Monitor your progress toward reward milestones and spending caps across all cards.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-dark text-text-muted hover:text-text-main hover:border-copper/50 transition-all">
                <span className="material-symbols-outlined text-lg">filter_list</span>
                <span className="text-sm font-medium">Filter</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-copper text-text-main hover:bg-copper/90 transition-colors shadow-lg">
                <span className="material-symbols-outlined text-lg">add</span>
                <span className="text-sm font-bold">Add Card</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Active Milestones', value: '5', icon: 'flag', color: 'text-green-500' },
              { label: 'Total Progress', value: '68%', icon: 'trending_up', color: 'text-copper' },
              { label: 'Expected Rewards', value: '₹24,500', icon: 'stars', color: 'text-primary' }
            ].map((stat, index) => (
              <div key={index} className="bg-surface-dark border border-border-dark rounded-xl p-6 relative overflow-hidden group hover:border-copper/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="material-symbols-outlined text-4xl text-text-muted/20 group-hover:text-copper/20 transition-colors">{stat.icon}</span>
                  <span className={`${stat.color} text-xs font-bold uppercase tracking-wider`}>{stat.label}</span>
                </div>
                <p className="text-3xl font-bold text-text-main">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
              <span className="material-symbols-outlined text-copper">credit_card</span>
              Cards Overview
            </h2>

            {[
              { name: 'HDFC Infinia', milestone: 'Fee Waiver', target: 800000, current: 656000, dueDate: '15 days left', color: 'bg-blue-600' },
              { name: 'Amex Platinum Travel', milestone: 'Bonus Points (50k)', target: 400000, current: 180000, dueDate: '42 days left', color: 'bg-purple-600' },
              { name: 'Axis Magnus', milestone: 'Milestone Benefit', target: 100000, current: 85000, dueDate: '8 days left', color: 'bg-red-600' }
            ].map((card, index) => {
              const progress = (card.current / card.target) * 100;
              return (
                <div key={index} className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-copper/30 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {card.name.substring(0, 1)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-text-main">{card.name}</h3>
                        <p className="text-sm text-text-muted">{card.milestone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-text-muted">Progress</p>
                        <p className="text-xl font-bold text-copper">{progress.toFixed(0)}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-text-muted">Remaining</p>
                        <p className="text-xl font-bold text-text-main">₹{((card.target - card.current) / 1000).toFixed(0)}k</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">₹{(card.current / 1000).toFixed(0)}k spent</span>
                      <span className="text-text-muted">Target: ₹{(card.target / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="h-3 bg-border-dark rounded-full overflow-hidden">
                      <div className={`h-full ${card.color} transition-all duration-500 shadow-[0_0_10px_currentColor]`} style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-primary font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {card.dueDate}
                      </span>
                      <button className="text-xs font-bold text-copper hover:text-copper/80 transition-colors">View Details →</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
