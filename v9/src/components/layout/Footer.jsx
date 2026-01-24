import { Link } from 'react-router-dom';
import { Heart, Github, Twitter } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Vouchers', path: '/vouchers' },
            { name: 'Credit Cards', path: '/cards' },
            { name: 'Banking Offers', path: '/banking' },
            { name: 'Tools', path: '/tools' },
        ],
        company: [
            { name: 'About Us', path: '/about' },
            { name: 'Contact', path: '/contact' },
            { name: 'Privacy Policy', path: '/privacy' },
            { name: 'Terms of Service', path: '/terms' },
        ],
    };

    return (
        <footer
            className="border-t mt-auto"
            style={{
                backgroundColor: 'var(--bg-alt)',
                borderColor: 'var(--border)',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link to="/" className="inline-flex items-center gap-3 mb-4">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-base font-bold"
                                style={{
                                    backgroundColor: 'var(--accent)',
                                    color: 'var(--bg)'
                                }}
                            >
                                C
                            </div>
                            <span
                                className="text-lg font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Card<span style={{ color: 'var(--accent)' }}>Perks</span>
                            </span>
                        </Link>
                        <p
                            className="text-sm max-w-md mb-4"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Your premium destination for maximizing credit card rewards,
                            discovering the best vouchers, and tracking your perks.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg transition-all"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text-muted)',
                                }}
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg transition-all"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text-muted)',
                                }}
                            >
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3
                            className="text-sm font-semibold mb-4"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Product
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm transition-all hover:underline"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3
                            className="text-sm font-semibold mb-4"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Company
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm transition-all hover:underline"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{ borderColor: 'var(--border)' }}
                >
                    <p
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        © {currentYear} CardPerks. All rights reserved.
                    </p>
                    <p
                        className="text-sm flex items-center gap-1"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Made with <Heart size={14} className="text-red-500" /> in India
                    </p>
                </div>
            </div>
        </footer>
    );
}
