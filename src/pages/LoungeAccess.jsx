export default function LoungeAccess() {
  return (
    <div className="min-h-screen bg-background-dark p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-black text-text-main mb-2">Lounge Access Directory</h1>
            <p className="text-text-muted text-lg">Find and access premium lounges worldwide with your credit cards.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-dark text-text-muted hover:text-text-main transition-all">
              <span className="material-symbols-outlined">filter_list</span>
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Lounges', value: '1,200+', icon: 'flight_class' },
            { label: 'Countries', value: '140', icon: 'public' },
            { label: 'Your Access', value: '8 Cards', icon: 'credit_card' },
            { label: 'Free Visits/Year', value: '24', icon: 'confirmation_number' }
          ].map((stat, index) => (
            <div key={index} className="bg-surface-dark border border-border-dark rounded-xl p-5 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="material-symbols-outlined text-primary text-3xl">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold text-text-main mb-1">{stat.value}</p>
              <p className="text-xs text-text-muted uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { name: 'Plaza Premium Lounge', airport: 'Delhi (DEL) - Terminal 3', program: 'Priority Pass', complimentary: true, rating: 4.8 },
            { name: 'Oberoi Lounge', airport: 'Mumbai (BOM) - International', program: 'Diners Club', complimentary: true, rating: 4.9 },
            { name: 'GVK Lounge', airport: 'Bangalore (BLR) - Domestic', program: 'MasterCard', complimentary: false, rating: 4.5 },
            { name: 'Taj Lounge', airport: 'Delhi (DEL) - Terminal 1', program: 'Visa Infinite', complimentary: true, rating: 4.7 },
            { name: 'ITC Green Lounge', airport: 'Hyderabad (HYD) - Domestic', program: 'Priority Pass', complimentary: true, rating: 4.6 },
            { name: 'The Oberoi Luxury', airport: 'Mumbai (BOM) - Domestic', program: 'American Express', complimentary: false, rating: 4.9 }
          ].map((lounge, index) => (
            <div key={index} className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/30 transition-all group">
              <div className="h-32 bg-gradient-to-br from-surface-border to-background-dark flex items-center justify-center relative overflow-hidden">
                <span className="material-symbols-outlined text-6xl text-text-muted/10">flight_class</span>
                {lounge.complimentary && (
                  <div className="absolute top-3 right-3 bg-green-600 text-text-main text-xs font-bold px-2 py-1 rounded">
                    Free Access
                  </div>
                )}
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-text-main mb-1">{lounge.name}</h3>
                  <p className="text-sm text-text-muted">{lounge.airport}</p>
                </div>

                <div className="flex items-center justify-between py-3 border-y border-border-dark">
                  <span className="text-xs text-text-muted">Access Program</span>
                  <span className="text-sm font-bold text-primary">{lounge.program}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-sm">star</span>
                    <span className="text-sm font-bold text-text-main">{lounge.rating}</span>
                    <span className="text-xs text-text-muted ml-1">(245 reviews)</span>
                  </div>
                  <button className="text-primary text-sm font-bold hover:text-copper/80">Details →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
