import { Link } from 'react-router-dom';
import {
    Calculator,
    CreditCard,
    MapPin,
    Search,
    Sparkles,
    ArrowRightLeft,
    Plane,
    BarChart3
} from 'lucide-react';
import SEO from '../components/SEO';

const tools = [
    {
        id: 'effective-price',
        title: 'Effective Price Calculator',
        description: 'Calculate the real cost of products after applying credit card rewards and offers.',
        icon: <Calculator size={32} />,
        path: '/tools/effective-price',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
    {
        id: 'where-to-swipe',
        title: 'Where Should I Swipe?',
        description: 'Get AI-powered recommendations on which card to use for your specific transaction.',
        icon: <CreditCard size={32} />,
        path: '/tools/swipe',
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10'
    },
    {
        id: 'milestone-tracker',
        title: 'Milestone Tracker',
        description: 'Track your progress towards credit card spend milestones and annual fee waivers.',
        icon: <BarChart3 size={32} />,
        path: '/tools/milestone',
        color: 'text-purple-500',
        bg: 'bg-purple-500/10'
    },
    {
        id: 'lounge-access',
        title: 'Lounge Access Finder',
        description: 'Find airport lounges accessible with your cards and check guest policies.',
        icon: <MapPin size={32} />,
        path: '/tools/lounge',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10'
    },
    {
        id: 'mcc-finder',
        title: 'MCC Finder',
        description: 'Verify merchant category codes to ensure you get the rewards you expect.',
        icon: <Search size={32} />,
        path: '/tools/mcc',
        color: 'text-pink-500',
        bg: 'bg-pink-500/10'
    },

    {
        id: 'points-transfer',
        title: 'Points Transfer Tool',
        description: 'Visualize point transfers to airline and hotel partners with live ratios.',
        icon: <ArrowRightLeft size={32} />,
        path: '/tools/transfer',
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10'
    }
];

export default function Tools() {
    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Tools & Calculators | Credit Card Optimizer"
                description="Suite of powerful tools to optimize your credit card rewards, track milestones, find lounges, and calculate effective prices."
                keywords="credit card tools, reward calculator, mcc finder, lounge access, milestone tracker"
            />

            {/* Hero Section */}
            <div className="relative py-20 px-6 text-center border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] to-transparent opacity-50 pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                        Optimization Suite
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Power Tools for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-amber-600">Power Users</span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Maximize every rupee spent. From selecting the right card to tracking complex milestones, we've got a tool for that.
                    </p>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <Link
                            key={tool.id}
                            to={tool.path}
                            className="group relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full"
                            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${tool.bg} ${tool.color}`}>
                                {tool.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-3 font-serif" style={{ color: 'var(--text-primary)' }}>
                                {tool.title}
                            </h3>

                            <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--text-secondary)' }}>
                                {tool.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all" style={{ color: 'var(--accent)' }}>
                                Open Tool <ArrowRightLeft className="rotate-180" size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
