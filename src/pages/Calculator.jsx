export default function Calculator() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-text-main mb-2">Effective Price Calculator</h1>
            <p className="text-text-muted text-sm">Optimize every transaction. Calculate the true effective price for maximum savings.</p>
          </div>
          <div className="flex items-center gap-2 bg-surface-dark border border-copper/40 px-3 py-1.5 rounded-sm shadow-[0_0_15px_rgba(200,126,78,0.15)] animate-pulse">
            <span className="material-symbols-outlined text-primary text-lg">hotel_class</span>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Best Value Found</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-dark p-6 rounded-sm border border-border-dark relative group focus-within:border-copper transition-colors shadow-sm">
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Spend Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-copper font-display text-lg">₹</span>
                <input className="w-full bg-background-dark border border-border-dark text-text-main text-xl font-display py-3 pl-10 pr-4 rounded-sm focus:ring-1 focus:ring-copper focus:border-copper outline-none transition-all placeholder-text-muted/30" placeholder="0" type="number" defaultValue="10000" />
              </div>
              <p className="text-[10px] text-text-muted mt-2">Enter the total transaction value</p>
            </div>

            <div className="bg-surface-dark p-6 rounded-sm border border-border-dark shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-bold text-primary uppercase tracking-wider">Brand / Category</label>
                <span className="text-[10px] text-copper cursor-pointer hover:text-primary transition-all">View All Brands</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Amazon', 'Flipkart', 'Zomato'].map((brand, index) => (
                  <button key={brand} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-sm border-2 ${index === 0 ? 'border-copper bg-background-dark text-text-main relative shadow-[0_0_10px_rgba(200,126,78,0.2)]' : 'border-border-dark bg-background-dark text-text-muted hover:border-copper/50'} transition-all`}>
                    {index === 0 && <span className="absolute top-1 right-1 text-copper material-symbols-outlined text-[10px]">check_circle</span>}
                    <div className="w-8 h-8 rounded-full bg-text-main flex items-center justify-center text-background-dark font-bold text-xs">{brand[0]}</div>
                    <span className="text-xs font-medium">{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface-dark p-6 rounded-sm border border-border-dark shadow-sm">
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-4">Payment Mode</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-sm bg-background-dark border border-copper cursor-pointer transition-all hover:bg-background-dark/80 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-copper/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <input defaultChecked className="text-copper focus:ring-copper bg-surface-dark border-border-dark" name="card" type="radio" />
                  <div className="h-8 w-12 bg-gradient-to-br from-gray-700 to-black rounded border border-gray-600 flex items-center justify-center shadow-sm">
                    <span className="text-[8px] text-text-main">INF</span>
                  </div>
                  <div className="flex-1 z-10">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-text-main">HDFC Infinia</span>
                      <span className="text-xs text-primary font-bold bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">16.5% Return</span>
                    </div>
                    <p className="text-[10px] text-text-muted">SmartBuy Multiplier (5x)</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-sm bg-background-dark border border-border-dark cursor-pointer hover:border-copper/50 transition-colors group">
                  <input className="text-copper focus:ring-copper bg-surface-dark border-border-dark" name="card" type="radio" />
                  <div className="h-8 w-12 bg-gradient-to-br from-red-900 to-red-700 rounded border border-red-800 flex items-center justify-center shadow-sm">
                    <span className="text-[8px] text-text-main">MAG</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">Axis Magnus</span>
                      <span className="text-xs text-text-muted">4.8% Return</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-dark p-5 rounded-sm border border-border-dark flex flex-col relative overflow-hidden group hover:border-primary/30 transition-colors shadow-sm">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-4xl text-primary">payments</span>
                </div>
                <span className="text-text-muted text-xs uppercase tracking-wide mb-1 flex items-center gap-1">Effective Price</span>
                <span className="text-2xl font-display font-bold text-primary">₹8,350</span>
                <span className="text-[10px] text-text-muted mt-auto line-through decoration-copper/50">Original: ₹10,000</span>
              </div>

              <div className="bg-surface-dark p-5 rounded-sm border border-copper flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(200,126,78,0.15)] group hover:shadow-[0_0_25px_rgba(200,126,78,0.25)] transition-all">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-4xl text-copper">savings</span>
                </div>
                <span className="text-copper text-xs uppercase tracking-wide mb-1 font-bold flex items-center gap-1">Total Savings</span>
                <span className="text-2xl font-display font-bold text-text-main">₹1,650</span>
                <div className="flex items-center gap-1 mt-auto">
                  <span className="bg-copper/20 text-copper text-[10px] px-1.5 py-0.5 rounded font-bold border border-copper/20">16.5% OFF</span>
                </div>
              </div>

              <div className="bg-surface-dark p-5 rounded-sm border border-border-dark flex flex-col relative overflow-hidden group hover:border-primary/50 transition-colors shadow-sm">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-4xl text-primary">stars</span>
                </div>
                <span className="text-primary text-xs uppercase tracking-wide mb-1 flex items-center gap-1">Points Earned</span>
                <span className="text-2xl font-display font-bold text-text-main">1,650 <span className="text-sm font-normal text-text-muted">pts</span></span>
                <span className="text-[10px] text-text-muted mt-auto flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shadow-[0_0_5px_#d4af37]"></span>
                  Valued at ₹1.00/pt
                </span>
              </div>
            </div>

            <div className="bg-background-dark p-4 rounded-sm border border-copper/30 border-dashed relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-5">
                <span className="material-symbols-outlined text-6xl">stairs</span>
              </div>
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Execution Plan</h4>
              <div className="flex items-center justify-between text-center relative z-10">
                <div className="absolute top-4 left-0 w-full h-0.5 bg-border-dark -z-10"></div>
                {['Log in to\nSmartBuy', 'Buy Amazon\nVoucher', 'Add to\nAmazon Pay', 'Pay for\nOrder'].map((step, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 bg-background-dark px-2 group cursor-pointer">
                    <div className={`w-8 h-8 rounded-full ${index === 3 ? 'bg-copper text-text-main shadow-[0_0_10px_rgba(200,126,78,0.4)]' : 'bg-surface-dark border border-copper text-copper'} flex items-center justify-center font-bold text-sm group-hover:bg-copper group-hover:text-text-main transition-colors`}>
                      {index === 3 ? <span className="material-symbols-outlined text-sm">check</span> : index + 1}
                    </div>
                    <span className={`text-[10px] ${index === 3 ? 'text-text-main font-medium' : 'text-text-muted'} group-hover:text-text-main transition-colors whitespace-pre-line`}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
