import { Link } from 'react-router-dom';
import {
    CreditCard,
    Gift,
    Building2,
    Sparkles,
    ArrowRight,
    TrendingUp,
    Calculator,
    Plane,
    Search,
    Zap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

import SEO from '../components/SEO';

export default function Home() {
    const { mode, themeId } = useTheme();

    const quickAccessCards = [
        {
            title: 'Vouchers',
            description: 'Best deals on gift cards & vouchers',
            icon: Gift,
            path: '/vouchers',
            count: '500+',
        },
        {
            title: 'Credit Cards',
            description: 'Compare rewards & benefits',
            icon: CreditCard,
            path: '/cards',
            count: '80+',
        },
        {
            title: 'Banking Offers',
            description: 'Exclusive bank promotions',
            icon: Building2,
            path: '/banking',
            count: '50+',
        },
    ];

    const tools = [
        {
            title: 'Price Calculator',
            description: 'Find the effective price after rewards',
            icon: Calculator,
            path: '/tools/effective-price',
        },
        {
            title: 'Where to Swipe',
            description: 'Best card for every purchase',
            icon: Zap,
            path: '/tools/swipe',
        },
        {
            title: 'Lounge Access',
            description: 'Airport lounge finder',
            icon: Plane,
            path: '/tools/lounge',
        },
        {
            title: 'MCC Finder',
            description: 'Merchant category codes lookup',
            icon: Search,
            path: '/tools/mcc',
        },
    ];

    return (
        <div className="min-h-screen">
            <SEO
                title="Premium Credit Card Rewards & Vouchers"
                description="Maximize your credit card rewards with CardPerks. Compare top cards, find effective voucher prices, and discover exclusive banking offers."
                keywords="credit cards, rewards, vouchers, banking offers, effective price calculator, lounge access"
            />
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Subtle gradient background */}
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 70%)`,
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="text-center max-w-3xl mx-auto">
                        {/* Badge */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                            style={{
                                backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                color: 'var(--accent)',
                            }}
                        >
                            <Sparkles size={16} />
                            <span>Premium Credit Card Rewards Platform</span>
                        </div>

                        {/* Headline */}
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Maximize Your{' '}
                            <span style={{ color: 'var(--accent)' }}>Rewards</span>
                            <br />
                            On Every Purchase
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Discover the best credit card deals, voucher offers, and banking promotions.
                            Make every transaction count.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/cards"
                                className="btn px-8 py-3 text-base font-semibold"
                                style={{
                                    backgroundColor: 'var(--accent)',
                                    color: 'var(--bg)',
                                }}
                            >
                                Explore Cards
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                to="/vouchers"
                                className="btn px-8 py-3 text-base font-semibold"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                Browse Vouchers
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Access Cards */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2
                            className="text-2xl md:text-3xl font-serif font-bold mb-4"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Start Exploring
                        </h2>
                        <p
                            className="text-base"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Access our most popular features
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quickAccessCards.map((card) => (
                            <Link
                                key={card.path}
                                to={card.path}
                                className="group card p-6 md:p-8"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="p-3 rounded-xl"
                                        style={{
                                            backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                                        }}
                                    >
                                        <card.icon
                                            size={24}
                                            style={{ color: 'var(--accent)' }}
                                        />
                                    </div>
                                    <span
                                        className="text-sm font-medium px-3 py-1 rounded-full"
                                        style={{
                                            backgroundColor: 'var(--surface)',
                                            color: 'var(--text-muted)',
                                            border: '1px solid var(--border)',
                                        }}
                                    >
                                        {card.count}
                                    </span>
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {card.title}
                                </h3>
                                <p
                                    className="text-sm mb-4"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {card.description}
                                </p>
                                <div
                                    className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    <span>Browse</span>
                                    <ArrowRight size={16} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section
                className="py-16 md:py-20"
                style={{ backgroundColor: 'var(--bg-alt)' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
                            style={{
                                backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                                color: 'var(--accent)',
                            }}
                        >
                            <TrendingUp size={16} />
                            <span>Smart Tools</span>
                        </div>
                        <h2
                            className="text-2xl md:text-3xl font-serif font-bold mb-4"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Optimize Your Spending
                        </h2>
                        <p
                            className="text-base max-w-2xl mx-auto"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Powerful calculators and tools to help you make smarter financial decisions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {tools.map((tool) => (
                            <Link
                                key={tool.path}
                                to={tool.path}
                                className="group p-5 rounded-xl transition-all"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                <div
                                    className="p-2 rounded-lg w-fit mb-4"
                                    style={{
                                        backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                                    }}
                                >
                                    <tool.icon
                                        size={20}
                                        style={{ color: 'var(--accent)' }}
                                    />
                                </div>
                                <h3
                                    className="text-base font-semibold mb-1"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {tool.title}
                                </h3>
                                <p
                                    className="text-sm"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    {tool.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
                        style={{
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)',
                        }}
                    >
                        {/* Subtle accent gradient */}
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                background: `radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 60%)`,
                            }}
                        />

                        <div className="relative">
                            <h2
                                className="text-2xl md:text-3xl font-serif font-bold mb-4"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                Ready to maximize your rewards?
                            </h2>
                            <p
                                className="text-base mb-8 max-w-xl mx-auto"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Join thousands of smart users who are getting the most out of their credit cards.
                            </p>
                            <Link
                                to="/signup"
                                className="btn px-8 py-3 text-base font-semibold"
                                style={{
                                    backgroundColor: 'var(--accent)',
                                    color: 'var(--bg)',
                                }}
                            >
                                Get Started Free
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
