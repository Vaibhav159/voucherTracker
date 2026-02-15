import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-theme-border bg-theme-surface py-16 text-center">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="mb-10 flex flex-col items-center justify-center gap-4">
                    <span className="material-symbols-outlined text-accent text-5xl">diamond</span>
                    <span className="font-serif text-2xl font-bold text-theme-primary tracking-wide">
                        Voucher<span className="text-accent">Tracker</span>
                    </span>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
                    <p className="text-theme-secondary font-medium">
                        An Open Source Community Project created by{' '}
                        <a
                            className="text-accent hover:text-accent font-bold transition-colors"
                            href="https://x.com/vaibhav_lodha"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @vaibhav_lodha
                        </a>.
                    </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-6 py-2 mb-10">
                    <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                    <span className="text-sm font-semibold text-green-400 tracking-wide">100% Free. No Ads. Just Savings.</span>
                </div>
                <div className="flex flex-wrap justify-center gap-8 mb-8">
                    <Link to="/privacy" className="text-sm text-theme-muted hover:text-accent transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="text-sm text-theme-muted hover:text-accent transition-colors">Terms of Service</Link>
                    <Link to="/contact" className="text-sm text-theme-muted hover:text-accent transition-colors">Contact Support</Link>
                </div>
                <div className="flex justify-center gap-6">
                    <a
                        className="text-theme-muted transition-colors hover:text-accent p-2 rounded-full hover:bg-theme-surface"
                        href="https://vouchertracker.in"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="material-symbols-outlined">public</span>
                    </a>
                    <a
                        className="text-theme-muted transition-colors hover:text-accent p-2 rounded-full hover:bg-theme-surface"
                        href="mailto:support@vouchertracker.in"
                    >
                        <span className="material-symbols-outlined">mail</span>
                    </a>
                </div>
                <p className="mt-8 text-xs text-theme-muted">© 2024 CardPerks. Premium Financial Dashboard.</p>
            </div>
        </footer>
    );
}
