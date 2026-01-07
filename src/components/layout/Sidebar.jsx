import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col justify-between border-r border-espresso-700 bg-espresso-900 lg:flex overflow-y-auto">
      <div className="flex flex-col gap-6 p-4 pt-8">
        <div className="flex flex-col gap-2">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-copper-400/80">Tools</p>
          <nav className="flex flex-col gap-1">
            <Link
              to="/calculator"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-gold-300"
            >
              <span className="material-symbols-outlined text-[20px]">calculate</span>
              Price Calculator
            </Link>
            <Link
              to="/points-transfer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-gold-300"
            >
              <span className="material-symbols-outlined text-[20px]">currency_exchange</span>
              Points Transfer
            </Link>
            <Link
              to="/where-to-swipe"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-gold-300"
            >
              <span className="material-symbols-outlined text-[20px]">credit_card_heart</span>
              Where to Swipe
            </Link>
            <Link
              to="/mcc"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-gold-300"
            >
              <span className="material-symbols-outlined text-[20px]">category</span>
              MCC Directory
            </Link>
            <Link
              to="/lounge-access"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-gold-300"
            >
              <span className="material-symbols-outlined text-[20px]">flight</span>
              Lounge Access
            </Link>
            <Link
              to="/compare-cards"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-gold-300"
            >
              <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
              Compare Cards
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-copper-400/80">Personal</p>
          <nav className="flex flex-col gap-1">
            <Link
              to="/my-cards"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-gold-300"
            >
              <span className="material-symbols-outlined text-[20px]">wallet</span>
              My Cards
            </Link>
            <Link
              to="/milestone-tracker"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-gold-300"
            >
              <span className="material-symbols-outlined text-[20px]">flag</span>
              Milestone Tracker
            </Link>
            <Link
              to="/favourites"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-gold-300"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              Favourites
            </Link>
          </nav>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-espresso-700 p-4">
        <Link
          to="/about"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
        >
          <span className="material-symbols-outlined text-[20px]">info</span>
          About Us
        </Link>
        <Link
          to="/contact"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
        >
          <span className="material-symbols-outlined text-[20px]">mail</span>
          Get in Touch
        </Link>
        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
          Follow X
        </a>
      </div>
    </aside>
  );
}
