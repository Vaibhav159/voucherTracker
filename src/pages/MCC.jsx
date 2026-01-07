export default function MCC() {
  return (
    <div className="min-h-screen bg-background-dark p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-black text-text-main mb-2">MCC Code Directory</h1>
          <p className="text-text-muted text-lg">Understand Merchant Category Codes and how they affect your credit card rewards.</p>
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-4xl">info</span>
            <div>
              <h3 className="text-xl font-bold text-text-main mb-2">What are MCC Codes?</h3>
              <p className="text-text-muted leading-relaxed">
                Merchant Category Codes (MCC) are four-digit numbers used by credit card networks to classify businesses by the type of goods or services they provide. Your credit card rewards depend on the MCC code assigned to each merchant.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <input className="w-full bg-surface-dark border border-border-dark text-text-main rounded-xl px-6 py-4 pl-14 focus:outline-none focus:border-primary text-lg" placeholder="Search MCC codes or merchant names..." type="text" />
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-text-muted text-2xl">search</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { code: '5411', category: 'Grocery Stores', multiplier: '5x', color: 'bg-green-600', merchants: ['Big Basket', 'DMart', 'Reliance Fresh'] },
            { code: '5812', category: 'Restaurants', multiplier: '4x', color: 'bg-orange-600', merchants: ['Swiggy', 'Zomato', 'Dine-in'] },
            { code: '4121', category: 'Taxi & Rideshare', multiplier: '3x', color: 'bg-blue-600', merchants: ['Uber', 'Ola', 'Rapido'] },
            { code: '5541', category: 'Fuel Stations', multiplier: '2x', color: 'bg-red-600', merchants: ['HP', 'Indian Oil', 'Bharat Petroleum'] },
            { code: '5311', category: 'Department Stores', multiplier: '3x', color: 'bg-purple-600', merchants: ['Shoppers Stop', 'Lifestyle', 'Westside'] },
            { code: '4511', category: 'Airlines', multiplier: '10x', color: 'bg-indigo-600', merchants: ['IndiGo', 'Air India', 'Vistara'] },
            { code: '7011', category: 'Hotels', multiplier: '8x', color: 'bg-pink-600', merchants: ['Taj', 'Marriott', 'ITC'] },
            { code: '5968', category: 'Online Shopping', multiplier: '6x', color: 'bg-yellow-600', merchants: ['Amazon', 'Flipkart', 'Myntra'] },
            { code: '7832', category: 'Movie Theaters', multiplier: '4x', color: 'bg-teal-600', merchants: ['BookMyShow', 'PVR', 'INOX'] }
          ].map((mcc, index) => (
            <div key={index} className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/30 transition-all group">
              <div className={`${mcc.color} p-4 flex items-center justify-between`}>
                <div>
                  <p className="text-text-main/80 text-xs font-medium mb-1">MCC Code</p>
                  <p className="text-text-main text-2xl font-bold">{mcc.code}</p>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-1">
                  <p className="text-text-main text-xs font-bold">{mcc.multiplier}</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-text-main mb-2">{mcc.category}</h3>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Common Merchants</p>
                  <div className="flex flex-wrap gap-2">
                    {mcc.merchants.map((merchant, i) => (
                      <span key={i} className="text-xs bg-background-dark text-text-muted px-2 py-1 rounded border border-border-dark">
                        {merchant}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border-dark">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">Reward Rate</span>
                    <span className="text-sm font-bold text-primary">{mcc.multiplier} Points</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">warning</span>
            Important Notes
          </h3>
          <ul className="space-y-3 text-text-muted">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
              <span>MCC codes are assigned by the merchant's payment processor, not by the merchant itself.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
              <span>Some merchants may have incorrect MCC codes that don't match their actual business category.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
              <span>Reward rates vary by card issuer and the specific credit card product you hold.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
