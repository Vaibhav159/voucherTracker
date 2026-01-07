export default function WhereToSwipe() {
  return (
    <div className="min-h-screen bg-background-dark p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-text-main mb-4">Where Should I Swipe?</h1>
          <p className="text-text-muted text-lg leading-relaxed">
            Get instant recommendations on which credit card to use for maximum rewards based on the merchant and transaction type.
          </p>
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-8 md:p-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-text-main mb-3">What are you buying?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Groceries', 'Dining', 'Fuel', 'Travel', 'Shopping', 'Entertainment', 'Bills', 'Other'].map((category) => (
                  <button key={category} className="px-4 py-3 rounded-lg border border-border-dark text-text-muted hover:border-primary hover:text-primary hover:bg-border-dark transition-all text-sm font-medium">
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-main mb-3" htmlFor="merchant">Merchant Name (Optional)</label>
              <input className="w-full bg-background-dark border border-border-dark text-text-main rounded-lg px-4 py-3 focus:outline-none focus:border-primary" id="merchant" placeholder="e.g., Amazon, Swiggy, Shell..." type="text" />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-main mb-3" htmlFor="amount">Transaction Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">₹</span>
                <input className="w-full bg-background-dark border border-border-dark text-text-main rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary" id="amount" placeholder="1000" type="number" />
              </div>
            </div>

            <button className="w-full py-4 rounded-lg bg-primary text-text-main font-bold hover:bg-copper/90 transition-colors text-lg shadow-lg shadow-primary/20">
              Find Best Card
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">recommend</span>
            Recommendations
          </h2>

          {[
            { card: 'HDFC Infinia', reward: '₹165', rate: '16.5%', reason: '5x on SmartBuy for Amazon', rank: 1, color: 'border-green-500' },
            { card: 'Axis Magnus', reward: '₹48', rate: '4.8%', reason: 'Base rewards on online shopping', rank: 2, color: 'border-blue-500' },
            { card: 'AMEX Platinum', reward: '₹55', rate: '5.5%', reason: 'Milestone benefits apply', rank: 3, color: 'border-purple-500' }
          ].map((rec, index) => (
            <div key={index} className={`bg-surface-dark border-2 ${rec.color} rounded-xl p-6 relative overflow-hidden`}>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-text-main font-bold text-lg">
                {rec.rank}
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-text-main font-bold text-lg shadow-lg">
                      {rec.card[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-main">{rec.card}</h3>
                      <p className="text-sm text-text-muted">{rec.reason}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center px-6 py-3 bg-background-dark rounded-lg border border-border-dark">
                    <p className="text-xs text-text-muted mb-1">You'll Earn</p>
                    <p className="text-2xl font-bold text-primary">{rec.reward}</p>
                  </div>

                  <div className="text-center px-6 py-3 bg-background-dark rounded-lg border border-border-dark">
                    <p className="text-xs text-text-muted mb-1">Reward Rate</p>
                    <p className="text-2xl font-bold text-text-main">{rec.rate}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border-dark flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <span>Assuming 1:1 point valuation</span>
                </div>
                <button className="text-primary font-bold text-sm hover:text-copper/80">
                  View Card Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-3xl">tips_and_updates</span>
            <div>
              <h3 className="text-lg font-bold text-text-main mb-2">Smart Tip</h3>
              <p className="text-text-muted leading-relaxed">
                For online shopping, always check if your bank offers a voucher portal (like SmartBuy for HDFC) that gives higher reward rates. You can save significantly by buying vouchers first.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
