import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Award,
    CheckCircle2,
    Banknote,
    PiggyBank,
    Sparkles,
    HelpCircle,
    Zap,
    Flag,
    ListOrdered
} from 'lucide-react';
import { parseAmount, formatAmountForUrl } from '../../utils/slugify';
import SEO from '../../components/SEO';

const brands = [
    { id: 'amazon', name: 'Amazon', initial: 'A' },
    { id: 'flipkart', name: 'Flipkart', initial: 'F' },
    { id: 'zomato', name: 'Zomato', initial: 'Z' },
    { id: 'myntra', name: 'Myntra', initial: 'M' },
    { id: 'swiggy', name: 'Swiggy', initial: 'S' },
    { id: 'uber', name: 'Uber', initial: 'U' },
];

const paymentCards = [
    {
        id: 'infinia',
        name: 'HDFC Infinia',
        returnRate: '16.5%',
        description: 'SmartBuy Multiplier (5x)',
        borderColor: 'var(--text-primary)',
        label: 'INF',
    },
    {
        id: 'magnus',
        name: 'Axis Magnus',
        returnRate: '4.8%',
        description: 'Base Reward Rate',
        borderColor: '#97144d',
        label: 'MAG',
    },
    {
        id: 'dcb',
        name: 'Diners Club Black',
        returnRate: '9.9%',
        description: 'SmartBuy Multiplier (3x)',
        borderColor: '#1a1a1a',
        label: 'DCB',
    },
    {
        id: 'plat-travel',
        name: 'Amex Platinum Travel',
        returnRate: '4%',
        description: 'Milestone Benefit',
        borderColor: '#006fcf',
        label: 'PT',
    },
];

export default function EffectivePriceCalculator() {
    const { amount: amountParam } = useParams();
    const navigate = useNavigate();

    // Initialize from URL param or default
    const initialAmount = amountParam ? parseAmount(amountParam) || 10000 : 10000;

    const [spendAmount, setSpendAmount] = useState(initialAmount);
    const [selectedBrand, setSelectedBrand] = useState('amazon');
    const [selectedCard, setSelectedCard] = useState('infinia');
    const [pointValue, setPointValue] = useState(1.0);

    // Update URL when amount changes (debounced/on blur handled manually here)
    const handleAmountBlur = () => {
        if (spendAmount > 0) {
            navigate(`/tools/effective-price?amount=${formatAmountForUrl(spendAmount)}`, { replace: true });
        }
    };

    // Calculate effective values logic (simplified for demo)
    // In real app, this would use a robust calculation engine
    const getSavingsRate = (cardId, brandId) => {
        if (cardId === 'infinia') return 16.5;
        if (cardId === 'dcb') return 9.9;
        if (cardId === 'magnus') return 4.8;
        if (cardId === 'plat-travel') return 4.0;
        return 0;
    };

    const savingsPercent = getSavingsRate(selectedCard, selectedBrand);
    const savings = Math.round(spendAmount * (savingsPercent / 100) * pointValue); // Adjusted for point value if needed, effectively "Savings Value"
    // Actually savings usually implies Points * PointValue. 
    // Let's assume returnRate is percentage points return.
    // Savings = (Spend * (Rate/100)) * PointValue
    // Wait, the returnRate string has %, so 16.5 means 16.5% return assuming 1rupee/point?
    // HDFC Infinia 16.5% is 5x reward points (3.3 * 5 = 16.5) where 1 RP = 1 INR.
    // So Savings INR = Spend * 0.165 * (PointValue / 1.0)

    // Let's refine calculation
    const baseSavings = Math.round(spendAmount * (savingsPercent / 100));
    const adjustedSavings = Math.round(baseSavings * pointValue);
    const effectivePrice = spendAmount - adjustedSavings;
    const pointsEarned = Math.round(spendAmount * (savingsPercent / 100)); // Assuming 1:1 for simplicity in display

    return (
        <div className="flex flex-1 overflow-hidden relative">
            <SEO
                title="Effective Price Calculator"
                description="Calculate effective price of vouchers and transactions using credit card reward points multiplier."
                keywords="effective price, smartbuy calculator, credit card points calculator, infinia calculator"
            />
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative scroll-smooth p-6 lg:p-8" style={{ backgroundColor: 'var(--bg)' }}>
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                        <div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Effective Price Calculator</h1>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Optimize every transaction. Calculate the true effective price for maximum savings.</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border animate-pulse"
                            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
                            <Award size={18} className="text-[var(--accent)]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">Best Value Found</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Input Section */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Spend Amount */}
                            <div className="p-6 rounded-xl border relative group focus-within:ring-1 focus-within:ring-[var(--accent)] transition-all shadow-lg"
                                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--accent)]">Spend Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-lg" style={{ color: 'var(--text-secondary)' }}>₹</span>
                                    <input
                                        className="w-full text-xl font-serif py-3 pl-10 pr-4 rounded-lg outline-none transition-all placeholder-gray-500"
                                        style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}
                                        placeholder="0"
                                        type="number"
                                        value={spendAmount}
                                        onChange={(e) => setSpendAmount(Number(e.target.value))}
                                        onBlur={handleAmountBlur}
                                    />
                                </div>
                                <p className="text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>Enter the total transaction value</p>
                            </div>

                            {/* Brand Selection */}
                            <div className="p-6 rounded-xl border shadow-lg"
                                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--accent)]">Brand / Category</label>
                                    <span className="text-[10px] cursor-pointer hover:text-[var(--accent)] transition-all" style={{ color: 'var(--text-secondary)' }}>View All Brands</span>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {brands.map((brand) => (
                                        <button
                                            key={brand.id}
                                            onClick={() => setSelectedBrand(brand.id)}
                                            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all border ${selectedBrand === brand.id
                                                    ? 'bg-[var(--bg)] border-[var(--accent)] ring-1 ring-[var(--accent)]'
                                                    : 'bg-[var(--bg)] border-[var(--border)] hover:border-[var(--text-muted)]'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${selectedBrand === brand.id ? 'bg-[var(--accent)] text-white' : 'bg-[var(--surface)] text-[var(--text-secondary)]'
                                                }`}>
                                                {brand.initial}
                                            </div>
                                            <span className="text-xs font-medium" style={{ color: selectedBrand === brand.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                                {brand.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Mode */}
                            <div className="p-6 rounded-xl border shadow-lg"
                                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-4 text-[var(--accent)]">Payment Mode</label>
                                <div className="space-y-3">
                                    {paymentCards.map((card) => (
                                        <label
                                            key={card.id}
                                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${selectedCard === card.id
                                                    ? 'border-[var(--accent)] bg-[var(--bg)]'
                                                    : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--text-muted)]'
                                                }`}
                                        >
                                            <input
                                                checked={selectedCard === card.id}
                                                onChange={() => setSelectedCard(card.id)}
                                                className="accent-[var(--accent)]"
                                                name="card"
                                                type="radio"
                                            />
                                            <div className="h-8 w-12 rounded flex items-center justify-center shadow-sm border"
                                                style={{ backgroundColor: 'var(--surface)', borderColor: card.borderColor }}>
                                                <span className="text-[8px] font-bold" style={{ color: 'var(--text-primary)' }}>{card.label}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{card.name}</span>
                                                    <span className="text-xs font-bold px-1.5 py-0.5 rounded border"
                                                        style={{ borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                                                        {card.returnRate} Return
                                                    </span>
                                                </div>
                                                {card.description && <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{card.description}</p>}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Point Valuation */}
                            <div className="p-6 rounded-xl border shadow-lg"
                                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">Point Valuation</label>
                                        <HelpCircle size={14} className="text-[var(--text-muted)] cursor-help" />
                                    </div>
                                    <span className="font-bold text-sm px-2 py-0.5 rounded border"
                                        style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                                        ₹{pointValue.toFixed(2)} / pt
                                    </span>
                                </div>
                                <input
                                    className="w-full accent-[var(--accent)]"
                                    max="1.50"
                                    min="0.20"
                                    step="0.05"
                                    type="range"
                                    value={pointValue}
                                    onChange={(e) => setPointValue(Number(e.target.value))}
                                />
                                <div className="flex justify-between text-[10px] mt-2 font-mono" style={{ color: 'var(--text-muted)' }}>
                                    <span>₹0.20</span>
                                    <span>Conservative</span>
                                    <span>Optimistic</span>
                                    <span>₹1.50</span>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-5 rounded-xl border flex flex-col relative overflow-hidden group hover:border-[var(--accent)] transition-colors shadow-lg"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>

                                    <span className="text-xs uppercase tracking-wide mb-1 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>Effective Price</span>
                                    <span className="text-2xl font-serif font-bold text-[var(--accent)]">₹{effectivePrice.toLocaleString()}</span>
                                    <span className="text-[10px] mt-auto line-through decoration-red-500/50" style={{ color: 'var(--text-muted)' }}>Original: ₹{spendAmount.toLocaleString()}</span>
                                </div>

                                <div className="p-5 rounded-xl border flex flex-col relative overflow-hidden shadow-2xl transition-all scale-105 z-10"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                        <PiggyBank size={32} className="text-[var(--accent)]" />
                                    </div>
                                    <span className="text-xs uppercase tracking-wide mb-1 font-bold flex items-center gap-1 text-[var(--accent)]">Total Savings</span>
                                    <span className="text-2xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>₹{adjustedSavings.toLocaleString()}</span>
                                    <div className="flex items-center gap-1 mt-auto">
                                        <span className="text-[10px] px-1.5 py-0.5 rounded font-bold border"
                                            style={{ borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                                            {savingsPercent}% OFF
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 rounded-xl border flex flex-col relative overflow-hidden group hover:border-[var(--accent)] transition-colors shadow-lg"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>

                                    <span className="text-xs uppercase tracking-wide mb-1 flex items-center gap-1 text-[var(--text-muted)]">Points Earned</span>
                                    <span className="text-2xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>{pointsEarned.toLocaleString()} <span className="text-sm font-normal text-[var(--text-secondary)]">pts</span></span>
                                    <span className="text-[10px] mt-auto flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block"></span>
                                        Valued at ₹{pointValue.toFixed(2)}/pt
                                    </span>
                                </div>
                            </div>

                            {/* Detailed Breakdown */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                                {/* Comparison */}
                                <div className="p-6 rounded-xl border flex flex-col shadow-lg"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                    <div className="flex justify-between items-start mb-6">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">Comparison</h4>
                                        <div className="text-[10px] px-2 py-1 rounded border font-medium"
                                            style={{ borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                                            Using SmartBuy
                                        </div>
                                    </div>
                                    <div className="space-y-6 my-auto">
                                        <div className="group">
                                            <div className="flex justify-between text-xs mb-2">
                                                <span style={{ color: 'var(--text-secondary)' }}>Standard Pay</span>
                                                <span style={{ color: 'var(--text-primary)' }}>₹{spendAmount.toLocaleString()}</span>
                                            </div>
                                            <div className="h-8 w-full rounded-sm relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
                                                <div className="absolute top-0 left-0 h-full w-full" style={{ backgroundColor: 'var(--text-muted)', opacity: 0.2 }}></div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className="font-bold flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                                                    <Zap size={14} className="text-[var(--accent)]" />
                                                    Smart Pay
                                                </span>
                                                <span className="font-bold text-[var(--accent)]">₹{effectivePrice.toLocaleString()}</span>
                                            </div>
                                            <div className="h-8 w-full rounded-sm flex overflow-hidden border" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg)' }}>
                                                <div
                                                    className="h-full flex items-center justify-center text-[10px] border-r border-black/10"
                                                    style={{ width: `${100 - savingsPercent}%`, backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                                                >
                                                    Net Cost
                                                </div>
                                                <div
                                                    className="h-full flex items-center justify-center text-[10px] font-bold"
                                                    style={{ width: `${savingsPercent}%`, backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                                                >
                                                    Saved
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                                        <p className="text-[10px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="font-bold text-[var(--accent)]">Analysis:</span> You save <span className="font-bold text-[var(--accent)]">₹{adjustedSavings.toLocaleString()}</span> by using {paymentCards.find(c => c.id === selectedCard)?.name} for this purchase.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Milestone Progress */}
                            <div className="p-4 rounded-xl border shadow-lg"
                                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                        <Flag size={14} className="text-[var(--accent)]" />
                                        Monthly Milestone
                                    </span>
                                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>₹{spendAmount.toLocaleString()} / ₹20,000</span>
                                </div>
                                <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden relative" style={{ backgroundColor: 'var(--bg)' }}>
                                    <div
                                        className="h-1.5 rounded-full relative overflow-hidden"
                                        style={{ width: `${Math.min((spendAmount / 20000) * 100, 100)}%`, backgroundColor: 'var(--accent)' }}
                                    ></div>
                                </div>
                                <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                                    Spend <span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{Math.max(20000 - spendAmount, 0).toLocaleString()} more</span> to unlock <span className="font-bold text-[var(--accent)]">2,000 bonus points</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
