export default function CompareCards() {
  return (
    <div className="min-h-screen bg-background-dark p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-black text-text-main mb-2">Compare Credit Cards</h1>
            <p className="text-text-muted text-lg">Side-by-side comparison of features, rewards, and benefits.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-text-main font-bold hover:bg-copper/90 transition-colors shadow-lg">
            <span className="material-symbols-outlined">add</span>
            Add Card to Compare
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'HDFC Infinia Metal', bank: 'HDFC Bank', fee: '₹12,500 + GST', reward: '3.3% - 33%', welcome: '12,000 pts', lounge: 'Unlimited', color: 'from-gray-700 to-black' },
            { name: 'Axis Magnus', bank: 'Axis Bank', fee: '₹10,000 + GST', reward: '4.8% - 24%', welcome: '25,000 pts', lounge: '8/quarter', color: 'from-red-900 to-red-700' },
            { name: 'AMEX Platinum Travel', bank: 'American Express', fee: '₹5,000 + GST', reward: '5% base', welcome: '50,000 pts', lounge: 'Priority Pass', color: 'from-gray-500 to-gray-400' }
          ].map((card, index) => (
            <div key={index} className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/30 transition-all group">
              <div className={`h-40 bg-gradient-to-br ${card.color} p-6 relative`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <p className="text-text-main/70 text-sm font-medium mb-1">{card.bank}</p>
                    <h3 className="text-text-main text-xl font-bold">{card.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-10 rounded bg-white/20"></div>
                    <span className="material-symbols-outlined text-text-main/50">contactless</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border-dark">
                  <span className="text-sm text-text-muted">Annual Fee</span>
                  <span className="text-sm font-bold text-text-main">{card.fee}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border-dark">
                  <span className="text-sm text-text-muted">Reward Rate</span>
                  <span className="text-sm font-bold text-primary">{card.reward}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border-dark">
                  <span className="text-sm text-text-muted">Welcome Bonus</span>
                  <span className="text-sm font-bold text-text-main">{card.welcome}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border-dark">
                  <span className="text-sm text-text-muted">Lounge Access</span>
                  <span className="text-sm font-bold text-text-main">{card.lounge}</span>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Key Features</p>
                  {['Milestone Benefits', 'Insurance Coverage', 'Concierge Service'].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-text-muted">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-text-main transition-all font-bold mt-4">
                  View Full Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-text-main mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-dark">
                  <th className="text-left text-text-muted font-medium text-sm py-4 pr-4">Feature</th>
                  <th className="text-center text-text-main font-bold text-sm py-4 px-4">HDFC Infinia</th>
                  <th className="text-center text-text-main font-bold text-sm py-4 px-4">Axis Magnus</th>
                  <th className="text-center text-text-main font-bold text-sm py-4 px-4">AMEX Platinum</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Annual Fee Waiver', vals: ['₹8L spend', '₹15L spend', 'None'] },
                  { feature: 'Foreign Transaction', vals: ['3.5% + GST', '2% + GST', '3.5% + GST'] },
                  { feature: 'Fuel Surcharge Waiver', vals: ['Yes', 'Yes', 'No'] },
                  { feature: 'Add-on Cards', vals: ['3 Free', '3 Free', '1 Free'] },
                  { feature: 'Travel Insurance', vals: ['Up to $500k', 'Up to $300k', 'Up to $200k'] }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border-dark/50">
                    <td className="text-text-muted text-sm py-4 pr-4">{row.feature}</td>
                    {row.vals.map((val, i) => (
                      <td key={i} className="text-text-main text-sm py-4 px-4 text-center">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
