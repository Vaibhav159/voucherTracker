import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    CreditCard,
    Shield,
    Gift,
    Plane,
    Star,
    Info,
    Check,
    X,
    ExternalLink,
    ArrowRight,
    Share2,
    Heart,
    Zap,
    TrendingUp,
    Clock,
    DollarSign,
    Award
} from 'lucide-react';
import { creditCards } from '../data/creditCards';

import SEO from '../components/SEO';

// Format currency helper
const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}k`;
    return `₹${amount}`;
};

export default function CardDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        // Find card by slug or id
        const foundCard = creditCards.find(c => c.slug === id || c.id === id);

        if (foundCard) {
            setCard(foundCard);
        } else {
            // Redirect to cards page if not found
            // navigate('/cards');
        }
        setLoading(false);
    }, [id, navigate]);

    if (loading) return <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">Loading...</div>;
    if (!card) return <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center text-[var(--text-primary)]">Card not found</div>;

    // Determine card tier and styling
    const tags = card.metadata?.tags || [];
    const isMetal = tags.includes('Metal Card');
    const isPremium = tags.includes('Super Premium') || tags.includes('Ultra Premium');

    // Fee formatting
    const joiningFee = card.fees?.joining || 0;
    const annualFee = card.fees?.annual || 0;

    // Reward Rate
    const baseRate = card.rewards?.baseRate ? (card.rewards.baseRate * 100).toFixed(1) : '0';

    const sections = [
        { id: 'overview', label: 'Overview' },
        { id: 'rewards', label: 'Rewards' },
        { id: 'travel', label: 'Travel' },
        { id: 'benefits', label: 'Benefits' },
        { id: 'fees', label: 'Fees' },
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
        }
    };

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title={`${card.name} - Reviews, Rewards & Benefits`}
                description={`Detailed review of ${card.name} from ${card.bank}. Check annual fees, reward rates, lounge access, and benefits. Apply now or compare with other cards.`}
                keywords={`${card.name}, ${card.bank} credit card, ${card.bank} cards, credit card reviews`}
                image={card.image}
            />
            {/* Breadcrumb */}
            <div className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-alt)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <Link to="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/cards" className="hover:text-[var(--accent)] transition-colors">Credit Cards</Link>
                        <ChevronRight size={14} />
                        <span style={{ color: 'var(--text-primary)' }}>{card.name}</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 70% 30%, var(--accent) 0%, transparent 60%)`
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        {/* Card Image */}
                        <div className="w-full lg:w-1/3 flex justify-center perspective-1000">
                            <div className="relative w-full max-w-sm aspect-[1.586/1] group transition-transform duration-500 hover:scale-105 hover:rotate-y-12 shadow-2xl rounded-2xl">
                                {card.image ? (
                                    <img
                                        src={card.image}
                                        alt={card.name}
                                        className="w-full h-full object-cover rounded-2xl shadow-2xl"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex items-center justify-center">
                                        <CreditCard size={64} className="text-[var(--text-muted)]" />
                                    </div>
                                )}

                                {/* Metal Sheen Effect if applicable */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </div>

                        {/* Card Info */}
                        <div className="w-full lg:w-2/3 space-y-6 text-center lg:text-left">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                                    {card.bank}
                                </span>
                                {isPremium && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                                        style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}>
                                        Premium Choice
                                    </span>
                                )}
                                {isMetal && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gray-300 to-gray-100 text-gray-800">
                                        Metal
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl lg:text-5xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>
                                {card.name}
                            </h1>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-8 py-6 border-y border-[var(--border)]">
                                <div className="text-center lg:text-left">
                                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Reward Rate</p>
                                    <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{baseRate}%</p>
                                </div>
                                <div className="text-center lg:text-left">
                                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Annual Fee</p>
                                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                        {annualFee === 0 ? 'Free' : `₹${annualFee.toLocaleString()}`}
                                    </p>
                                </div>
                                <div className="text-center lg:text-left">
                                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Joining Fee</p>
                                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                        {joiningFee === 0 ? 'Free' : `₹${joiningFee.toLocaleString()}`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <a
                                    href={card.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                                    style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                                >
                                    Apply Now <ArrowRight size={18} />
                                </a>
                                {/* <button 
                                    className="px-6 py-3 rounded-xl font-bold border transition-all hover:bg-[var(--surface)]"
                                    style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                >
                                    Compare
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Navigation */}
            <div className="sticky top-0 z-40 backdrop-blur-md border-b"
                style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)', borderColor: 'var(--border)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto no-scrollbar gap-8">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${activeSection === section.id
                                    ? 'border-[var(--accent)] text-[var(--accent)]'
                                    : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">

                {/* Main Content */}
                <div className="flex-1 space-y-12">

                    {/* Overview & Verdict */}
                    <section id="overview" className="scroll-mt-24 space-y-6">
                        <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                                <Award className="text-[var(--accent)]" />
                                Expert Verdict
                            </h2>
                            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                                {card.metadata?.verdict || "A premium credit card offering excellent rewards and benefits for its category."}
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="flex items-center gap-2 font-bold mb-4 text-green-500">
                                        <Check size={18} /> What we love
                                    </h3>
                                    <ul className="space-y-3">
                                        {card.metadata?.pros?.map((pro, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="flex items-center gap-2 font-bold mb-4 text-red-500">
                                        <X size={18} /> Drawbacks
                                    </h3>
                                    <ul className="space-y-3">
                                        {card.metadata?.cons?.map((con, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {card.metadata?.bestFor && (
                            <div className="p-6 rounded-xl border flex items-start gap-4"
                                style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 5%, transparent)', borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                                <Star className="text-[var(--accent)] shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Best For</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{card.metadata.bestFor}</p>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Rewards */}
                    <section id="rewards" className="scroll-mt-24 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)]">
                                <DollarSign size={24} />
                            </span>
                            <h2 className="text-2xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>Rewards Program</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-[var(--text-muted)]">Base Reward Rate</h3>
                                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>{baseRate}%</div>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    {card.rewards?.earningText}
                                </p>
                            </div>

                            {card.rewards?.joiningBonus && (
                                <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                    <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-[var(--text-muted)]">Welcome Bonus</h3>
                                    <div className="flex items-start gap-3">
                                        <Gift className="text-[var(--accent)] shrink-0" />
                                        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                            {card.rewards.joiningBonus}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Accelerators/SmartBuy if exists */}
                        {card.rewards?.calculator?.smartBuy && (
                            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    <Zap size={18} className="text-[var(--accent)]" />
                                    Accelerated Rewards
                                </h3>
                                <div className="space-y-4">
                                    {Object.entries(card.rewards.calculator.smartBuy.merchants || {}).slice(0, 5).map(([key, merchant]) => (
                                        merchant.label && (
                                            <div key={key} className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-0 text-sm">
                                                <span style={{ color: 'var(--text-secondary)' }}>{merchant.label.split('-')[0]}</span>
                                                <div className="text-right">
                                                    <span className="font-bold block" style={{ color: 'var(--accent)' }}>{merchant.effectiveRate || merchant.multiplier}</span>
                                                    {merchant.multiplier && <span className="text-xs text-[var(--text-muted)]">{merchant.multiplier} Points</span>}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Redemption Options */}
                        {card.rewards?.redemption?.options && (
                            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Redemption Options</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {card.rewards.redemption.options.slice(0, 4).map((option, idx) => (
                                        <div key={idx} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{option.type}</span>
                                                {option.recommended && (
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 font-bold border border-green-500/20">BEST</span>
                                                )}
                                            </div>
                                            <div className="text-lg font-bold mb-1" style={{ color: 'var(--accent)' }}>₹ {option.value}</div>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{option.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Travel Benefits */}
                    <section id="travel" className="scroll-mt-24 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)]">
                                <Plane size={24} />
                            </span>
                            <h2 className="text-2xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>Travel Benefits</h2>
                        </div>

                        {/* Lounge Access */}
                        {card.features?.lounge && (
                            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Airport Lounge Access</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                                        <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] block mb-2">Domestic</span>
                                        <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                                            {card.features.lounge.domestic}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                                        <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] block mb-2">International</span>
                                        <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                                            {card.features.lounge.international}
                                        </div>
                                        {card.features.lounge.accessType && (
                                            <span className="text-xs mt-1 block text-[var(--accent)]">via {card.features.lounge.accessType}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Forex */}
                        {card.features?.forex && (
                            <div className="p-6 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <div>
                                    <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Forex Markup</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Fee on international transactions</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                                        {card.features.forex.text || `${(card.features.forex.markup * 100).toFixed(2)}%`}
                                    </div>
                                    <div className="text-xs text-[var(--text-muted)]">Typical card: 3.5%</div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Fees section */}
                    <section id="fees" className="scroll-mt-24 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)]">
                                <CreditCard size={24} />
                            </span>
                            <h2 className="text-2xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>Fees & Charges</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <div className="text-sm text-[var(--text-muted)] mb-2">Joining Fee</div>
                                <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    {joiningFee === 0 ? 'Free' : `₹${joiningFee.toLocaleString()}`}
                                </div>
                                <div className="text-xs mt-1 text-[var(--text-muted)]">+ 18% GST</div>
                            </div>
                            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <div className="text-sm text-[var(--text-muted)] mb-2">Annual Fee</div>
                                <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    {annualFee === 0 ? 'Free' : `₹${annualFee.toLocaleString()}`}
                                </div>
                                <div className="text-xs mt-1 text-[var(--text-muted)]">+ 18% GST</div>
                            </div>
                            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <div className="text-sm text-[var(--text-muted)] mb-2">Fee Waiver</div>
                                {card.fees?.waiverText ? (
                                    <>
                                        <div className="text-xl font-bold truncate" style={{ color: 'var(--accent)' }}>
                                            Available
                                        </div>
                                        <div className="text-xs mt-1 text-[var(--text-secondary)] line-clamp-2" title={card.fees.waiverText}>
                                            {card.fees.waiverText}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-xl font-bold text-[var(--text-muted)]">
                                        Not Available
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 space-y-6">
                    <div className="sticky top-24 space-y-6">
                        {/* Apply Card */}
                        <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Ready to apply?</h3>
                            <a
                                href={card.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all hover:brightness-110 mb-3"
                                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                            >
                                Apply Now <ExternalLink size={16} />
                            </a>
                            <p className="text-xs text-center text-[var(--text-muted)]">
                                Redirects to official bank website
                            </p>
                        </div>

                        {/* Similar Cards */}
                        <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Similar Cards</h3>
                            <div className="space-y-4">
                                {creditCards
                                    .filter(c => c.id !== card.id && (c.bank === card.bank || c.metadata?.tags?.some(tag => card.metadata?.tags?.includes(tag))))
                                    .slice(0, 3)
                                    .map(similar => (
                                        <Link to={`/cards/${similar.slug}`} key={similar.id} className="block group">
                                            <div className="flex gap-3 items-center">
                                                <div className="w-12 h-8 rounded bg-[var(--bg)] border border-[var(--border)] overflow-hidden shrink-0">
                                                    {similar.image && <img src={similar.image} alt="" className="w-full h-full object-cover" />}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-sm font-medium truncate group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                                                        {similar.name}
                                                    </h4>
                                                    <p className="text-xs text-[var(--text-muted)]">{similar.bank}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
