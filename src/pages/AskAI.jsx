export default function AskAI() {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-8 lg:p-12 flex flex-col">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-gold mb-4 shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-text-main text-3xl">auto_awesome</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-main mb-3">Ask PerkAI</h1>
          <p className="text-text-muted text-lg">Get instant answers about credit cards, rewards, and financial optimization.</p>
        </div>

        <div className="flex-1 flex flex-col gap-6 mb-6">
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-text-main">smart_toy</span>
            </div>
            <div className="flex-1">
              <p className="text-text-main leading-relaxed mb-4">
                Hello! I'm PerkAI, your personal credit card rewards assistant. I can help you with:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Best card for specific purchases',
                  'Reward optimization strategies',
                  'Milestone tracking tips',
                  'Point valuation & transfers'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-text-muted text-sm">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex items-start gap-4 ml-12">
              <div className="w-10 h-10 rounded-full bg-border-dark flex items-center justify-center flex-shrink-0">
                <span className="text-text-main font-bold">You</span>
              </div>
              <div className="flex-1">
                <p className="text-text-main">Which card should I use for grocery shopping to maximize rewards?</p>
              </div>
            </div>

            <div className="bg-surface-dark border border-border-dark rounded-xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-text-main">smart_toy</span>
              </div>
              <div className="flex-1">
                <p className="text-text-main leading-relaxed mb-4">
                  For grocery shopping, I recommend using your <strong className="text-primary">HDFC Infinia</strong> card through SmartBuy. Here's why:
                </p>
                <ul className="space-y-2 text-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">arrow_right</span>
                    <span>Get 5x reward points (16.5% return) on BigBasket via SmartBuy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">arrow_right</span>
                    <span>Points never expire and can be transferred 1:1 to airline partners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">arrow_right</span>
                    <span>Monthly cap of ₹1,50,000 for accelerated rewards</span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-background-dark rounded-lg border border-primary/20">
                  <p className="text-sm text-text-muted mb-2">Example calculation for ₹10,000 spend:</p>
                  <div className="flex items-center justify-between">
                    <span className="text-text-main">Base Points (3.3%)</span>
                    <span className="text-text-muted">₹330</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-primary">
                    <span>SmartBuy Bonus (16.5%)</span>
                    <span>₹1,650</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-background-dark pt-4">
          <div className="bg-surface-dark border border-border-dark rounded-xl p-4">
            <div className="flex items-center gap-3">
              <input className="flex-1 bg-background-dark border border-border-dark text-text-main rounded-lg px-4 py-3 focus:outline-none focus:border-primary placeholder-text-muted" placeholder="Ask me anything about credit cards and rewards..." type="text" />
              <button className="px-6 py-3 rounded-lg bg-primary text-text-main font-bold hover:bg-copper/90 transition-colors shadow-lg">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs text-text-muted">Try asking:</span>
              {['Best travel card?', 'Fee waiver tips', 'Point transfers'].map((q, i) => (
                <button key={i} className="text-xs px-3 py-1 rounded-full bg-background-dark border border-border-dark text-text-muted hover:text-primary hover:border-primary transition-colors">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
