export default function About() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-6xl mx-auto px-8 py-16 md:px-16 md:py-24 space-y-24 md:space-y-32">
        <section className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight drop-shadow-sm">
            Democratizing Credit<br />Card Rewards.
          </h1>
          <p className="text-xl md:text-2xl text-white font-body font-light tracking-wide opacity-90 max-w-2xl mx-auto leading-relaxed">
            Making every rupee count through transparency and precision data.
          </p>
        </section>

        <section>
          <div className="border-l border-primary pl-8 md:pl-12 max-w-4xl mx-auto">
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-6 block">The Problem</span>
            <div className="space-y-8 text-lg md:text-xl leading-loose text-white font-body font-light">
              <p>
                The financial rewards ecosystem is <span className="text-primary font-medium">intentionally opaque</span>. With fragmented data across multiple portals, complex redemption ratios, and hidden terms, genuine savings are often elusive.
              </p>
              <p>
                Banks rely on this complexity. We believe in <span className="text-primary font-medium">clarity</span>. By aggregating real-time data and simplifying the mathematics of rewards, we ensure you never leave money on the table.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-primary mb-6">What We Build</h2>
            <p className="text-white max-w-xl font-body text-lg font-light tracking-wide opacity-80">
              A comprehensive ecosystem of tools designed to replace spreadsheets and guesswork with actionable intelligence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'hub', title: 'Rate Aggregator', desc: 'Real-time consolidation of voucher rates across Gyftr, Amazon, and direct portals, instantly highlighting the highest redemption value.' },
              { icon: 'calculate', title: 'Reward Calculator', desc: 'Advanced algorithms that factor in card-specific multipliers, monthly capping limits, and MCC codes to project exact savings.' },
              { icon: 'notifications_active', title: 'Deal Alerts', desc: 'Automated monitoring of limited-time offers and potential devaluations, ensuring you maximize benefits before they expire.' }
            ].map((feature, index) => (
              <div key={index} className="bg-surface-dark/40 p-10 rounded-sm border border-copper/20 hover:border-primary transition-all duration-500 group hover:-translate-y-1 backdrop-blur-sm">
                <span className="material-symbols-outlined text-primary text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 font-light">{feature.icon}</span>
                <h3 className="text-white font-body font-medium text-xl mb-4 tracking-wide">{feature.title}</h3>
                <p className="text-gray-300 font-body leading-relaxed text-sm font-light opacity-90">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-primary/20 py-20 -mx-8 px-8 md:-mx-16 md:px-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-surface-dark/20 pointer-events-none"></div>
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl text-primary mb-6">Our Open Source Promise</h2>
              <p className="text-gray-200 font-body font-light text-lg tracking-wide max-w-2xl mx-auto">
                Financial tools require absolute trust. We don't just ask for it; we prove it through transparency.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { title: 'Community Audited', desc: 'Our entire codebase is open for public inspection. Security researchers and community members verify our calculations daily.' },
                { title: 'Privacy Centric', desc: 'We practice data minimization. Your financial data stays on your device and is never sold to third-party advertisers.' },
                { title: 'User Governance', desc: 'Roadmap decisions are driven by user votes, not investor pressure. We build what the community actually needs.' }
              ].map((promise, index) => (
                <div key={index} className={`text-center px-4 group ${index > 0 ? 'border-t md:border-t-0 md:border-l border-primary/30 pt-10 md:pt-0' : ''}`}>
                  <h4 className="text-xl text-white font-display font-bold mb-4 group-hover:text-primary transition-colors">{promise.title}</h4>
                  <p className="text-sm text-gray-400 font-body leading-loose font-light">{promise.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#252322] to-[#1D1C1B] border border-primary/40 p-10 md:p-16 rounded-sm overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-48 bg-primary/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12 text-center md:text-left">
              <div className="flex-shrink-0 relative group">
                <div className="h-40 w-40 rounded-full p-2 border border-primary/40 group-hover:border-primary transition-colors duration-500">
                  <div className="h-full w-full rounded-full bg-cover bg-center bg-gray-600 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400")'}}></div>
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-background-dark border border-primary text-primary text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest shadow-lg">
                  Founder
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-display text-4xl text-primary font-bold mb-2">Vaibhav Lodha</h3>
                <p className="text-white font-body text-sm tracking-[0.2em] uppercase mb-8 opacity-90">Creator & Lead Architect</p>
                <blockquote className="text-xl text-white font-body font-light italic mb-10 leading-relaxed opacity-90">
                  "I built VoucherTracker because I was tired of spreadsheets. I wanted a dashboard that respected both my time and my wallet."
                </blockquote>
                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  <a className="px-8 py-3 bg-background-dark border border-primary/60 text-white font-body text-sm hover:border-primary hover:text-primary transition-all duration-300 rounded-sm uppercase tracking-widest font-medium" href="#">
                    Contact
                  </a>
                  <a className="px-8 py-3 bg-background-dark border border-primary/60 text-white font-body text-sm hover:border-primary hover:text-primary transition-all duration-300 rounded-sm uppercase tracking-widest font-medium" href="#">
                    View Source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-16 border-t border-primary/20 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-text-muted pb-12">
          <p className="font-light tracking-wide">© 2024 VoucherTracker Inc. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0 font-light">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
