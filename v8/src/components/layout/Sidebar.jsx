import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="hidden w-64 flex-col justify-between border-r border-espresso-700 bg-espresso-900 lg:flex overflow-y-auto">
            <div className="flex flex-col gap-6 p-4 pt-8">
                {/* Tools Section */}
                <div className="flex flex-col gap-2">
                    <p className="px-3 text-xs font-bold uppercase tracking-widest text-copper-400/80">Tools</p>
                    <nav className="flex flex-col gap-1">
                        <Link to="/tools/effective-price" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive('/tools/effective-price') ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'}`}>
                            <span className="material-symbols-outlined text-[20px]">calculate</span>
                            Effective Price Calculator
                        </Link>
                        <Link to="/tools/points-transfer" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive('/tools/points-transfer') ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'}`}>
                            <span className="material-symbols-outlined text-[20px]">currency_exchange</span>
                            Points Transfer
                        </Link>
                        <Link to="/tools/mcc" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive('/tools/mcc') ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'}`}>
                            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                            MCC Finder
                        </Link>
                        <Link to="/tools/milestones" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive('/tools/milestones') ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'}`}>
                            <span className="material-symbols-outlined text-[20px]">flag</span>
                            Milestone Tracker
                        </Link>
                        <Link to="/tools/swipe" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive('/tools/swipe') ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'}`}>
                            <span className="material-symbols-outlined text-[20px]">swipe</span>
                            Where To Swipe
                        </Link>
                        <Link to="/tools/lounge" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive('/tools/lounge') ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'}`}>
                            <span className="material-symbols-outlined text-[20px]">airline_seat_recline_extra</span>
                            Lounge Access
                        </Link>
                    </nav>
                </div>

                {/* Compare Section */}
                <div className="flex flex-col gap-2">
                    <p className="px-3 text-xs font-bold uppercase tracking-widest text-copper-400/80">Compare</p>
                    <nav className="flex flex-col gap-1">
                        <Link to="/compare" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive('/compare') ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'}`}>
                            <span className="material-symbols-outlined text-[20px]">compare</span>
                            Compare Cards
                        </Link>
                        <Link to="/compare-banks" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive('/compare-banks') ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'}`}>
                            <span className="material-symbols-outlined text-[20px]">account_balance</span>
                            Compare Banks
                        </Link>
                    </nav>
                </div>

                {/* Personal Section */}
                <div className="flex flex-col gap-2">
                    <p className="px-3 text-xs font-bold uppercase tracking-widest text-copper-400/80">Personal</p>
                    <nav className="flex flex-col gap-1">
                        <Link to="/favorites" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive('/favorites') ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'}`}>
                            <span className="material-symbols-outlined text-[20px]">favorite</span>
                            Favourites
                        </Link>
                        <Link to="/my-cards" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive('/my-cards') ? 'bg-gold-400/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'}`}>
                            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                            My Wallet
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-2 border-t border-espresso-700 p-4">
                <a href="https://x.com/vaibhav_lodha" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                    Follow X
                </a>
                <Link to="/settings" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive('/settings') ? 'bg-gold-400/10 text-gold-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                    <span className="material-symbols-outlined text-[20px]">settings</span>
                    Settings
                </Link>
            </div>
        </aside>
    );
}
