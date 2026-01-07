import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-espresso-700 bg-espresso-900 py-16 text-center">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="mb-10 flex flex-col items-center justify-center gap-4">
          <span className="material-symbols-outlined text-gold-500 text-5xl">diamond</span>
          <span className="font-serif text-2xl font-bold text-white tracking-wide">
            Voucher<span className="text-gold-400">Tracker</span>
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
          <p className="text-gray-400 font-medium">
            An Open Source Community Project created by{' '}
            <a
              className="text-gold-400 hover:text-gold-300 font-bold transition-colors"
              href="https://twitter.com/vaibhav_lodha"
              target="_blank"
              rel="noopener noreferrer"
            >
              @vaibhav_lodha
            </a>
            .
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-6 py-2 mb-10">
          <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
          <span className="text-sm font-semibold text-green-400 tracking-wide">
            100% Free. No Ads. Just Savings.
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <Link className="text-sm text-gray-500 hover:text-gold-400 transition-colors" to="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-sm text-gray-500 hover:text-gold-400 transition-colors" to="/terms">
            Terms of Service
          </Link>
          <Link className="text-sm text-gray-500 hover:text-gold-400 transition-colors" to="/contact">
            Contact Support
          </Link>
        </div>

        <div className="flex justify-center gap-6">
          <a
            className="text-gray-600 transition-colors hover:text-gold-400 p-2 rounded-full hover:bg-espresso-800"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined">public</span>
          </a>
          <a
            className="text-gray-600 transition-colors hover:text-gold-400 p-2 rounded-full hover:bg-espresso-800"
            href="mailto:support@vouchertracker.com"
          >
            <span className="material-symbols-outlined">mail</span>
          </a>
        </div>

        <p className="mt-8 text-xs text-gray-700">
          © {new Date().getFullYear()} VoucherTracker. Premium Financial Dashboard.
        </p>
      </div>
    </footer>
  );
}
