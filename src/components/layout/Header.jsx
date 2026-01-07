import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="z-20 flex h-16 shrink-0 items-center gap-4 border-b border-espresso-700 bg-espresso-900/90 px-4 shadow-lg backdrop-blur-md lg:gap-8 lg:px-6">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-gold-400 text-3xl">diamond</span>
        <Link to="/">
          <h1 className="font-serif text-xl font-bold tracking-wide text-white">
            Voucher<span className="text-gold-400">Tracker</span>
          </h1>
        </Link>
      </div>

      <div className="relative hidden max-w-sm flex-1 md:block">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-espresso-700 text-[20px] dark:text-gray-500">
          search
        </span>
        <input
          className="h-10 w-full rounded-full border border-espresso-700 bg-espresso-800 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition-all focus:border-gold-400 focus:bg-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold-400"
          placeholder="Search cards, rates..."
          type="text"
        />
      </div>

      <nav className="ml-auto hidden items-center gap-1 lg:flex">
        <Link
          to="/"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-gold-400 ${
            isActive('/') ? 'nav-link-active' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
          }`}
        >
          <span className={`material-symbols-outlined ${isActive('/') ? 'filled' : ''} text-[18px]`}>
            home
          </span>
          Home
        </Link>

        <Link
          to="/vouchers"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-gold-400 ${
            isActive('/vouchers') ? 'nav-link-active' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">sell</span>
          Vouchers
        </Link>

        <Link
          to="/cards"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-gold-400 ${
            isActive('/cards') ? 'nav-link-active' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">credit_card</span>
          Cards
        </Link>

        <Link
          to="/banking"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-gold-400 ${
            isActive('/banking') ? 'nav-link-active' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">account_balance</span>
          Banking
        </Link>

        <Link
          to="/ask-ai"
          className="group flex items-center gap-2 rounded-lg border border-gold-400/20 bg-gold-400/5 px-3 py-2 text-sm font-medium text-gold-300 transition-all hover:border-gold-400/50 hover:bg-gold-400/10 hover:text-gold-400"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          Ask AI
        </Link>

        <Link
          to="/guides"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-gold-400 ${
            isActive('/guides') ? 'nav-link-active' : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          Guides
        </Link>
      </nav>

      <button
        className="ml-auto flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-espresso-800 lg:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <button className="hidden h-9 w-9 items-center justify-center rounded-full border border-gold-400/30 bg-espresso-800 ring-2 ring-transparent transition-all hover:ring-gold-400/50 lg:flex">
        <span className="font-serif text-sm font-bold text-gold-400">JD</span>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 border-b border-espresso-700 bg-espresso-900 p-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-gold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              Home
            </Link>
            <Link
              to="/vouchers"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-gold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px]">sell</span>
              Vouchers
            </Link>
            <Link
              to="/cards"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-gold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px]">credit_card</span>
              Cards
            </Link>
            <Link
              to="/banking"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-gold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
              Banking
            </Link>
            <Link
              to="/ask-ai"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-gold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              Ask AI
            </Link>
            <Link
              to="/guides"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-gold-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Guides
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
