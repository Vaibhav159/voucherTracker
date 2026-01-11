import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parseAmount, formatAmountForUrl } from '../../utils/slugify';

const categories = [
    { id: 'shopping', name: 'Shopping', icon: 'shopping_cart', selected: true },
    { id: 'fuel', name: 'Fuel', icon: 'local_gas_station' },
    { id: 'travel', name: 'Travel', icon: 'flight' },
    { id: 'dining', name: 'Dining', icon: 'restaurant' },
    { id: 'movies', name: 'Movies', icon: 'movie' },
    { id: 'utilities', name: 'Utilities', icon: 'bolt' },
];

export default function WhereToSwipe() {
    const { category: categoryParam, amount: amountParam } = useParams();
    const navigate = useNavigate();

    // Initialize from URL params or defaults
    const initialCategory = categories.find(c => c.id === categoryParam)?.id || 'shopping';
    const initialAmount = amountParam ? parseAmount(amountParam)?.toLocaleString('en-IN') || '25,000' : '25,000';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [amount, setAmount] = useState(initialAmount);

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

    const handleAmountChange = (newAmount) => {
        setAmount(newAmount);
        // Debounce URL update - only update on blur or when user stops typing
    };

    const handleAmountBlur = () => {
        updateUrl(selectedCategory, amount);
    };

    const recommendation = {
        bestCard: {
            name: 'Infinia Metal',
            bank: 'HDFC BANK',
            lastFour: '4512',
            savings: 1250,
            roi: '5.0%',
        },
        runnerUp: {
            name: 'AMEX',
            lastFour: '8008',
            points: '+1,200 Pts',
        },
        explanation: {
            card: 'Infinia Metal',
            bonus: '5X Reward Points',
            detail: 'on shopping via the SmartBuy portal',
            points: '3,750',
            value: '₹1,250',
        },
    };

    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-950 bg-espresso-texture">
            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative overflow-y-auto bg-transparent">
                <div className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
                    {/* Mobile Header */}
                    <div className="md:hidden mb-6">
                        <h2 className="text-2xl font-serif font-bold text-white mb-2">Where Should I Swipe?</h2>
                        <p className="text-gold-dim text-sm">Maximize your rewards for every transaction.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                        {/* Left Panel - Inputs */}
                        <div className="lg:col-span-5 flex flex-col gap-8">
                            {/* Category Selection */}
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-1">
                                    <label className="text-copper text-xs font-bold tracking-wider uppercase">Step 1</label>
                                    <span className="text-white font-display text-xl font-medium">Select Category</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategoryChange(cat.id)}
                                            className={`relative flex flex-col items-center justify-center aspect-[1.1/1] rounded-xl transition-all duration-300 active:scale-95 group overflow-hidden ${selectedCategory === cat.id
                                                ? 'bg-espresso-900 border-2 border-copper-500 shadow-glow-copper'
                                                : 'bg-espresso-950 border border-copper-500/30 hover:border-copper-500 hover:shadow-[0_4px_20px_rgba(184,115,51,0.15)] hover:-translate-y-1'
                                                }`}
                                        >
                                            {selectedCategory === cat.id && (
                                                <>
                                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-100"></div>
                                                    <div className="absolute top-3 right-3 size-2 bg-primary rounded-full shadow-[0_0_8px_#bb9b72]"></div>
                                                </>
                                            )}
                                            <span
                                                className={`material-symbols-outlined text-5xl mb-3 transition-transform duration-300 group-hover:scale-110 ${selectedCategory === cat.id ? 'text-primary drop-shadow-md' : 'text-copper/80 group-hover:text-copper'
                                                    }`}
                                                style={{ fontVariationSettings: selectedCategory === cat.id ? "'FILL' 1, 'wght' 400" : "'wght' 300" }}
                                            >
                                                {cat.icon}
                                            </span>
                                            <span className={`text-base font-sans tracking-wide z-10 ${selectedCategory === cat.id ? 'font-bold text-white' : 'font-medium text-white/90 group-hover:text-white'
                                                }`}>
                                                {cat.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Spend Amount */}
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-copper text-xs font-bold tracking-wider uppercase">Step 2</label>
                                    <span className="text-white font-display text-xl font-medium">Spend Amount</span>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-3xl text-primary font-display">₹</span>
                                    </div>
                                    <input
                                        className="block w-full pl-12 pr-4 py-6 bg-espresso-900 border-b-2 border-copper-500 text-white text-4xl font-serif placeholder-espresso-700 focus:outline-none focus:border-white transition-colors"
                                        placeholder="0.00"
                                        type="text"
                                        value={amount}
                                        onChange={(e) => handleAmountChange(e.target.value)}
                                        onBlur={handleAmountBlur}
                                    />
                                    <div className="absolute bottom-2 right-2 text-xs text-gold-dim">INR</div>
                                </div>
                            </div>

                            {/* Optimize Button */}
                            <button className="w-full mt-2 bg-gradient-to-r from-copper-600 to-copper-500 hover:from-copper-500 hover:to-copper-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 btn-press">
                                <span className="material-symbols-outlined">auto_awesome</span>
                                Optimize Spend
                            </button>
                        </div>

                        {/* Right Panel - Results */}
                        <div className="lg:col-span-7 flex flex-col h-full">
                            <div className="flex-1 bg-espresso-900 rounded-3xl p-8 border border-copper-500/30 relative overflow-hidden flex flex-col items-center">
                                {/* Background effects */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-copper/20 blur-[100px] rounded-full pointer-events-none"></div>

                                <div className="relative w-full flex flex-col items-center z-10 flex-1 justify-center min-h-[400px]">
                                    {/* Best Choice Badge */}
                                    <div className="flex items-center gap-2 mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
                                        <span className="material-symbols-outlined text-4xl text-gold-400" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                                        <span className="text-gold-400 font-bold tracking-widest uppercase text-sm">Best Choice</span>
                                    </div>

                                    {/* Card Display */}
                                    <div className="relative w-full flex items-center justify-center mb-10">
                                        {/* Runner Up Card */}
                                        <div className="absolute left-4 lg:left-12 opacity-60 scale-75 hover:opacity-100 hover:scale-90 transition-all duration-300 cursor-pointer z-0 -rotate-6">
                                            <div className="w-[280px] aspect-[1.586] rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 shadow-2xl overflow-hidden relative">
                                                <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-mono tracking-widest">**** {recommendation.runnerUp.lastFour}</div>
                                                <div className="absolute top-4 right-4 text-gray-200 font-bold italic">{recommendation.runnerUp.name}</div>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p className="text-gray-400 text-sm font-medium">Runner Up</p>
                                                <p className="text-white text-xs">{recommendation.runnerUp.points}</p>
                                            </div>
                                        </div>

                                        {/* Best Card */}
                                        <div className="relative z-20 transform hover:-translate-y-2 transition-transform duration-500">
                                            <div className="w-[340px] aspect-[1.586] rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-black border border-copper-500/50 shadow-[0_0_30px_rgba(187,155,114,0.5)] overflow-hidden relative group">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                                <div className="absolute top-6 right-6">
                                                    <div className="h-8 w-12 bg-white/10 rounded border border-white/20"></div>
                                                </div>
                                                <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                                                    <p className="text-gold-300/80 text-xs font-mono uppercase tracking-widest">{recommendation.bestCard.name}</p>
                                                    <p className="text-white/90 text-sm font-mono tracking-widest">**** {recommendation.bestCard.lastFour}</p>
                                                </div>
                                                <div className="absolute top-6 left-6 text-white font-display font-bold text-xl italic tracking-tighter">{recommendation.bestCard.bank}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Savings Display */}
                                    <div className="text-center space-y-2 z-10">
                                        <p className="text-gold-dim text-sm font-medium uppercase tracking-widest">Total Savings</p>
                                        <h3 className="text-4xl lg:text-5xl font-serif font-bold text-gold-400 drop-shadow-lg">
                                            <span className="text-2xl align-top">₹</span>{recommendation.bestCard.savings.toLocaleString()}
                                        </h3>
                                        <p className="text-xs text-copper bg-copper/10 px-3 py-1 rounded-full inline-block mt-2 border border-copper/20">
                                            ROI: {recommendation.bestCard.roi}
                                        </p>
                                    </div>
                                </div>

                                {/* Explanation Box */}
                                <div className="w-full mt-6 bg-espresso-950/50 rounded-xl border border-espresso-700 overflow-hidden">
                                    <div className="p-4 flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-copper-500/10 text-copper-500">
                                            <span className="material-symbols-outlined">psychology</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-bold text-sm mb-1">Why this card?</h4>
                                            <p className="text-gold-dim text-sm leading-relaxed">
                                                The <span className="text-white font-medium">{recommendation.explanation.card}</span> gives you <span className="text-gold-400 font-bold">{recommendation.explanation.bonus}</span> {recommendation.explanation.detail}. This transaction earns you {recommendation.explanation.points} points valued at {recommendation.explanation.value} for travel booking.
                                            </p>
                                            <div className="mt-3 pt-3 border-t border-white/5 flex gap-4 text-xs">
                                                <div className="flex items-center gap-1 text-gold-dim">
                                                    <span className="material-symbols-outlined text-sm">payments</span>
                                                    <span>Base: 1.5%</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-gold-400">
                                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                                    <span>Bonus: +3.5%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
