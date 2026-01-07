export default function Signup() {
  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-gold/5 opacity-80"></div>
        <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="w-full max-w-[440px] flex flex-col gap-8 relative z-10">
        <div className="flex justify-center mb-1">
          <div className="relative group cursor-default">
            <div className="absolute inset-0 bg-primary blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
            <div className="relative h-14 w-14 rounded-lg bg-gradient-to-br from-[#2a2018] to-[#150f0a] flex items-center justify-center shadow-lg border border-primary/40 ring-1 ring-white/5">
              <span className="material-symbols-outlined text-primary drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]" style={{fontSize: '30px'}}>account_balance_wallet</span>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-b from-[#1E1814]/95 to-[#140F0A]/98 rounded-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-primary/30 p-8 sm:p-10 overflow-hidden group/card transition-all duration-700 hover:border-primary/50">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-7">
            <div className="text-center space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl bg-gradient-to-r from-gold via-[#e5cca0] to-primary bg-clip-text text-transparent font-medium tracking-tight drop-shadow-sm pb-1">
                Exclusive Access
              </h1>
              <p className="text-text-muted text-xs font-semibold tracking-[0.2em] uppercase opacity-70">
                The Elite Indian Credit Community
              </p>
            </div>

            <form className="flex flex-col gap-5 mt-1">
              <div className="space-y-2 group/field">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#8c8279] ml-1 group-focus-within/field:text-primary transition-colors duration-300" htmlFor="fullname">Full Name</label>
                <div className="relative group/input">
                  <input className="w-full bg-[#221b15] border border-primary/20 text-[#e0d8d0] placeholder-white/10 rounded px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-0 focus:shadow-[0_0_0_1px_#b87332,0_0_20px_-4px_rgba(184,115,50,0.3)] transition-all hover:border-primary/40 font-medium tracking-wide" id="fullname" placeholder="e.g. Rahul Verma" type="text" />
                  <span className="material-symbols-outlined absolute right-4 top-3.5 text-primary/30 pointer-events-none group-focus-within/input:text-primary transition-colors" style={{fontSize: '20px'}}>person</span>
                </div>
              </div>

              <div className="space-y-2 group/field">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#8c8279] ml-1 group-focus-within/field:text-primary transition-colors duration-300" htmlFor="email">Email Address</label>
                <div className="relative group/input">
                  <input className="w-full bg-[#221b15] border border-primary/20 text-[#e0d8d0] placeholder-white/10 rounded px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-0 focus:shadow-[0_0_0_1px_#b87332,0_0_20px_-4px_rgba(184,115,50,0.3)] transition-all hover:border-primary/40 font-medium tracking-wide" id="email" placeholder="name@example.com" type="email" />
                  <span className="material-symbols-outlined absolute right-4 top-3.5 text-primary/30 pointer-events-none group-focus-within/input:text-primary transition-colors" style={{fontSize: '20px'}}>mail</span>
                </div>
              </div>

              <div className="space-y-2 group/field">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#8c8279] ml-1 group-focus-within/field:text-primary transition-colors duration-300" htmlFor="password">Password</label>
                <div className="relative group/input">
                  <input className="w-full bg-[#221b15] border border-primary/20 text-[#e0d8d0] placeholder-white/10 rounded px-4 py-3.5 pr-10 focus:outline-none focus:border-primary focus:ring-0 focus:shadow-[0_0_0_1px_#b87332,0_0_20px_-4px_rgba(184,115,50,0.3)] transition-all hover:border-primary/40 font-medium tracking-wide" id="password" placeholder="Create a strong password" type="password" />
                  <button className="absolute right-3 top-3 text-primary/30 hover:text-primary transition-all p-1" type="button">
                    <span className="material-symbols-outlined" style={{fontSize: '18px'}}>visibility_off</span>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 px-1">
                  <div className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(212,175,55,0.6)] border border-primary"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/80 shadow-[0_0_6px_rgba(212,175,55,0.4)] border border-primary/80"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-transparent border border-primary/30"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-transparent border border-primary/30"></div>
                  </div>
                  <span className="text-[10px] text-primary/80 font-bold uppercase tracking-widest drop-shadow-sm">Medium</span>
                </div>
              </div>

              <div className="space-y-2 group/field">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#8c8279] ml-1 group-focus-within/field:text-primary transition-colors duration-300" htmlFor="confirm_password">Confirm Password</label>
                <div className="relative group/input">
                  <input className="w-full bg-[#221b15] border border-primary/20 text-[#e0d8d0] placeholder-white/10 rounded px-4 py-3.5 pr-10 focus:outline-none focus:border-primary focus:ring-0 focus:shadow-[0_0_0_1px_#b87332,0_0_20px_-4px_rgba(184,115,50,0.3)] transition-all hover:border-primary/40 font-medium tracking-wide" id="confirm_password" placeholder="Repeat password" type="password" />
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full relative overflow-hidden bg-primary text-white font-bold py-4 px-6 rounded shadow-lg transition-all flex items-center justify-center gap-3 group/btn border border-white/10 hover:border-primary/30 hover:text-white active:scale-95" type="submit">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#c68b4c] to-gold opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 tracking-wide">Request Access</span>
                  <span className="material-symbols-outlined relative z-10 group-hover/btn:translate-x-1 transition-transform text-white/80 group-hover/btn:text-white" style={{fontSize: '18px'}}>arrow_forward</span>
                </button>
                <p className="text-center text-[11px] text-[#8c8279] mt-5 leading-relaxed font-medium">
                  By proceeding, you acknowledge that membership is subject to approval and agree to our{' '}
                  <a className="text-[#a89f96] hover:text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-gold/60 transition-all" href="#">Terms of Service</a>.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center group">
          <p className="text-[#8c8279] text-sm font-medium">
            Already hold a membership?{' '}
            <a className="relative inline-flex items-center gap-1.5 text-[#e0d8d0] font-semibold hover:text-primary transition-colors duration-300 ml-1 py-1" href="#">
              Log In
            </a>
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0"></div>
    </div>
  );
}
