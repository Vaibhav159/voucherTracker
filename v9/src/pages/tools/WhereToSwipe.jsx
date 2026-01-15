import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    Fuel,
    Plane,
    Utensils,
    Film,
    Zap,
    Search,
    CreditCard,
    TrendingUp,
    BadgePercent,
    ArrowRight,
    Check,
    AlertCircle,
    Info
} from 'lucide-react';
import { parseAmount, formatAmountForUrl } from '../../utils/slugify';
import SEO from '../../components/SEO';
import { creditCards } from '../../data/creditCards';

const categories = [
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    { id: 'fuel', name: 'Fuel', icon: Fuel, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'travel', name: 'Travel', icon: Plane, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'dining', name: 'Dining', icon: Utensils, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { id: 'movies', name: 'Movies', icon: Film, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { id: 'utilities', name: 'Utilities', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
];

export default function WhereToSwipe() {
    const { category: categoryParam, amount: amountParam } = useParams();
    const navigate = useNavigate();

    // Initialize from URL params or defaults
    const initialCategory = categories.find(c => c.id === categoryParam)?.id || 'shopping';
    const initialAmount = amountParam ? parseAmount(amountParam)?.toLocaleString('en-IN') || '25,000' : '25,000';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [amount, setAmount] = useState(initialAmount);
    const [isOptimizing, setIsOptimizing] = useState(false);

    // Update URL when state changes
    const updateUrl = (newCategory, newAmount) => {
        const amountValue = parseAmount(newAmount);
        if (amountValue) {
            navigate(`/tools/swipe/${newCategory}/${formatAmountForUrl(amountValue)}`, { replace: true });
        } else {
            navigate(`/tools/swipe/${newCategory}`, { replace: true });
        }
    };

    const handleCategoryChange = (catId) => {
        setSelectedCategory(catId);
        updateUrl(catId, amount);
    };

    const handleAmountChange = (e) => {
        // Simple numeric input handling override for now
        setAmount(e.target.value);
    };

    const handleAmountBlur = () => {
        updateUrl(selectedCategory, amount);
    };

    // Calculate Recommendations (Simulated Logic)
    const recommendation = useMemo(() => {
        const numAmount = parseAmount(amount) || 0;

        // Find cards relevant to category (Mock logic)
        let bestCardSlug = 'hdfc-infinia-metal';
        let runnerUpSlug = 'axis-magnus';
        let multiplier = 0.033; // Default 3.3%
        let bestReason = "5X Reward Points via SmartBuy";

        if (selectedCategory === 'fuel') {
            bestCardSlug = 'bpcl-sbi-octane';
            runnerUpSlug = 'axis-indianoil'; // Or similar
            multiplier = 0.0725;
            bestReason = "25X Reward Points on Fuel";
        } else if (selectedCategory === 'dining') {
            bestCardSlug = 'axis-magnus';
            runnerUpSlug = 'hdfc-regalia-gold';
            multiplier = 0.08; // approx
            bestReason = "40% off upto ₹1000 via EazyDiner";
        } else if (selectedCategory === 'travel') {
            bestCardSlug = 'axis-atlas';
            runnerUpSlug = 'amex-platinum-travel';
            multiplier = 0.06;
            bestReason = "Milestone benefits on travel spend";
        } else if (selectedCategory === 'utilities') {
            bestCardSlug = 'axis-airtel';
            runnerUpSlug = 'amazon-pay-icici';
            multiplier = 0.10;
            bestReason = "10% Cashback on Bill Payments";
        } else if (selectedCategory === 'movies') {
            bestCardSlug = 'axis-magnus'; // Or RBL Play if exists
            runnerUpSlug = 'icici-sapphiro'; // BOGO
            multiplier = 0.50; // BOGO representation
            bestReason = "Buy 1 Get 1 Free on BookMyShow";
        }

        // Lookup cards
        let bestCard = creditCards.find(c => c.id === bestCardSlug || c.slug === bestCardSlug);
        let runnerUp = creditCards.find(c => c.id === runnerUpSlug || c.slug === runnerUpSlug);

        // Fallbacks if mapped cards aren't in loaded data
        if (!bestCard) bestCard = creditCards.find(c => c.id === 'hdfc-infinia-metal') || creditCards[0];
        if (!runnerUp) runnerUp = creditCards.find(c => c.id === 'sbi-cashback') || creditCards[1];

        // Ensure we handle missing images gracefully in the UI (already handled)

        const points = Math.floor(numAmount * multiplier * 10); // Mock points calculation
        const value = Math.floor(numAmount * multiplier);
        const roi = (multiplier * 100).toFixed(1);

        return {
            bestCard,
            runnerUp,
            explanation: {
                bonus: `${roi}% Value`, // Dynamic bonus text
                detail: `on ${selectedCategory} spends`,
                points: points.toLocaleString(),
                value: `₹${value.toLocaleString()}`,
                baseRate: "1.5%",
                bonusRate: `${(roi - 1.5).toFixed(1)}%`
            }
        };
    }, [selectedCategory, amount]);

    // Get current category object
    const currentCategory = categories.find(c => c.id === selectedCategory);

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title={`Best Card for ${currentCategory?.name || 'Spending'} | Where Should I Swipe?`}
                description={`Maximize rewards on your ${currentCategory?.name} spends. Find out which credit card gives the best ROI for your transaction.`}
                keywords={`best credit card for ${selectedCategory}, credit card rewards calculator, maximize points, ${selectedCategory} offers`}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Panel: Inputs */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h1 className="text-3xl font-serif font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Where Should I Swipe?</h1>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Maximize your rewards for every transaction by choosing the right card.
                            </p>
                        </div>

                        {/* Category Selection */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                Step 1: Select Category
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    const isSelected = selectedCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategoryChange(cat.id)}
                                            className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${isSelected
                                                ? `bg-[var(--surface)] border-[var(--accent)] shadow-lg scale-105`
                                                : `bg-[var(--surface)] border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--bg-alt)]`
                                                }`}
                                        >
                                            <div className={`mb-3 p-3 rounded-full ${isSelected ? cat.bg : 'bg-[var(--bg)]'}`}>
                                                <Icon size={24} className={isSelected ? cat.color : 'text-[var(--text-secondary)]'} />
                                            </div>
                                            <span className={`text-sm font-medium ${isSelected ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                                                {cat.name}
                                            </span>
                                            {isSelected && (
                                                <div className="absolute top-2 right-2">
                                                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></div>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Amount Input */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                Step 2: Spend Amount
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-serif" style={{ color: 'var(--text-muted)' }}>₹</span>
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    onBlur={handleAmountBlur}
                                    className="w-full pl-10 pr-4 py-4 text-3xl font-serif font-bold bg-[var(--surface)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                                    style={{ color: 'var(--text-primary)' }}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--text-muted)]">INR</span>
                            </div>
                        </div>

                        <button
                            className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                        >
                            <Search size={18} />
                            Recalculate Best Card
                        </button>
                    </div>

                    {/* Right Panel: Results */}
                    <div className="lg:col-span-7">
                        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-1 overflow-hidden h-full flex flex-col items-center justify-center text-center relative">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50"></div>

                            {/* Best Card Display */}
                            <div className="p-8 w-full max-w-lg relative">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 mb-8 animate-bounce">
                                    <TrendingUp size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Best Recommendation</span>
                                </div>

                                <div className="relative mb-8 group perspective-1000">
                                    {/* Card Image */}
                                    <div className="w-full aspect-[1.586/1] rounded-xl shadow-2xl overflow-hidden relative transform transition-transform duration-500 hover:rotate-y-12 hover:scale-105 z-10">
                                        {recommendation.bestCard.image ? (
                                            <img
                                                src={recommendation.bestCard.image}
                                                alt={recommendation.bestCard.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                                <span className="text-white font-serif text-2xl">{recommendation.bestCard.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Runner Up Card Peeking */}
                                    <div className="absolute top-4 -right-12 w-3/4 aspect-[1.586/1] rounded-xl bg-gray-800 shadow-xl opacity-40 transform translate-z-[-20px] rotate-6 scale-90 z-0 border border-white/10 group-hover:-right-16 transition-all duration-500"></div>
                                </div>

                                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    {recommendation.bestCard.name}
                                </h2>
                                <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                                    {recommendation.bestCard.bank}
                                </p>

                                {/* Savings Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                                        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[var(--text-muted)]">Total Savings</p>
                                        <div className="text-2xl font-serif font-bold text-[var(--accent)]">{recommendation.explanation.value}</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                                        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[var(--text-muted)]">Points Earned</p>
                                        <div className="text-2xl font-serif font-bold text-[var(--text-primary)]">{recommendation.explanation.points}</div>
                                    </div>
                                </div>

                                {/* Explanation */}
                                <div className="text-left bg-[var(--bg-alt)] rounded-xl p-4 border border-[var(--border)]">
                                    <div className="flex items-start gap-3">
                                        <Info size={20} className="text-[var(--accent)] shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Why this card?</h4>
                                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                Use <span className="font-semibold text-[var(--text-primary)]">{recommendation.bestCard.name}</span> to earn <span className="font-bold text-[var(--accent)]">{recommendation.explanation.bonus}</span>. This is your most rewarding card for {currentCategory?.name} transactions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
