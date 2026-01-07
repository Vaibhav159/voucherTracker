export default function PointsTransfer() {
  return (
    <div className="min-h-screen bg-background-dark p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-black text-text-main mb-2">Points Transfer Partners</h1>
          <p className="text-text-muted text-lg">Maximize the value of your credit card points by transferring to airline and hotel partners.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {[
              { name: 'Emirates Skywards', bank: 'HDFC Infinia', ratio: '1:1', value: '₹1.20/point', logo: 'flight_takeoff', color: 'bg-red-600' },
              { name: 'Marriott Bonvoy', bank: 'American Express', ratio: '1:1', value: '₹0.80/point', logo: 'hotel', color: 'bg-purple-600' },
              { name: 'InterMiles', bank: 'Axis Magnus', ratio: '5:4', value: '₹0.40/point', logo: 'flight', color: 'bg-blue-600' }
            ].map((partner, index) => (
              <div key={index} className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/30 transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-lg ${partner.color} flex items-center justify-center shadow-lg`}>
                      <span className="material-symbols-outlined text-text-main text-2xl">{partner.logo}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-main">{partner.name}</h3>
                      <p className="text-sm text-text-muted">{partner.bank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-text-muted">Transfer Ratio</p>
                    <p className="text-xl font-bold text-primary">{partner.ratio}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-background-dark rounded-lg p-4">
                    <p className="text-xs text-text-muted mb-1">Avg. Point Value</p>
                    <p className="text-lg font-bold text-text-main">{partner.value}</p>
                  </div>
                  <div className="bg-background-dark rounded-lg p-4">
                    <p className="text-xs text-text-muted mb-1">Transfer Time</p>
                    <p className="text-lg font-bold text-text-main">Instant</p>
                  </div>
                </div>

                <button className="w-full py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-text-main transition-all font-bold">
                  Transfer Points
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
              <h3 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calculate</span>
                Quick Calculator
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-muted mb-2">Points to Transfer</label>
                  <input className="w-full bg-background-dark border border-border-dark text-text-main rounded-lg px-4 py-3 focus:outline-none focus:border-primary" placeholder="10000" type="number" />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-2">Select Partner</label>
                  <select className="w-full bg-background-dark border border-border-dark text-text-main rounded-lg px-4 py-3 focus:outline-none focus:border-primary">
                    <option>Emirates Skywards</option>
                    <option>Marriott Bonvoy</option>
                    <option>InterMiles</option>
                  </select>
                </div>
                <div className="bg-background-dark rounded-lg p-4 border border-primary/20">
                  <p className="text-xs text-text-muted mb-1">You will receive</p>
                  <p className="text-2xl font-bold text-primary">10,000 miles</p>
                  <p className="text-xs text-text-muted mt-2">Estimated value: ₹12,000</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6">
              <span className="material-symbols-outlined text-primary text-3xl mb-3 block">lightbulb</span>
              <h4 className="text-lg font-bold text-text-main mb-2">Pro Tip</h4>
              <p className="text-sm text-text-muted leading-relaxed">
                Transfer points during airline promotions to get bonus miles. Check partner websites for current offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
