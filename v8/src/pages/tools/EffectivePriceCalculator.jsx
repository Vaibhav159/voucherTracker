import { useState } from 'react';

const brands = [
    { id: 'amazon', name: 'Amazon', initial: 'A' },
    { id: 'flipkart', name: 'Flipkart', initial: 'F' },
    { id: 'zomato', name: 'Zomato', initial: 'Z' },
];

const paymentCards = [
    {
        id: 'infinia',
        name: 'HDFC Infinia',
        returnRate: '16.5%',
        description: 'SmartBuy Multiplier (5x)',
        gradient: 'from-gray-700 to-black',
        borderColor: 'gray-600',
        label: 'INF',
    },
    {
        id: 'magnus',
        name: 'Axis Magnus',
        returnRate: '4.8%',
        description: '',
        gradient: 'from-red-900 to-red-700',
        borderColor: 'red-800',
        label: 'MAG',
    },
];

export default function EffectivePriceCalculator() {
    const [spendAmount, setSpendAmount] = useState(10000);
    const [selectedBrand, setSelectedBrand] = useState('amazon');
    const [selectedCard, setSelectedCard] = useState('infinia');
    const [pointValue, setPointValue] = useState(1.0);

    // Calculate effective values
    const savings = Math.round(spendAmount * 0.165);
    const effectivePrice = spendAmount - savings;
    const pointsEarned = savings;
    const savingsPercent = 16.5;

    return (
        <div className="flex flex-1 overflow-hidden relative">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-espresso-950 scroll-smooth relative">
                <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
                    {/* Header */}
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                        <div>
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">Effective Price Calculator</h1>
                            <p className="text-gold-dim text-sm">Optimize every transaction. Calculate the true effective price for maximum savings.</p>
                        </div>
                        <div className="flex items-center gap-2 bg-espresso-800 border border-primary/40 px-3 py-1.5 rounded-sm shadow-[0_0_15px_rgba(205,127,50,0.15)] animate-pulse">
                            <span className="material-symbols-outlined text-gold-400 text-lg">hotel_class</span>
                            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Best Value Found</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Input Section */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Spend Amount */}
                            <div className="bg-espresso-800 p-6 rounded-sm border border-espresso-700 relative group focus-within:border-primary transition-colors shadow-sm">
                                <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">Spend Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-display text-lg">₹</span>
                                    <input
                                        className="w-full bg-espresso-950 border border-espresso-700 text-white text-xl font-display py-3 pl-10 pr-4 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gold-dim/30"
                                        placeholder="0"
                                        type="number"
                                        value={spendAmount}
                                        onChange={(e) => setSpendAmount(Number(e.target.value))}
                                    />
                                </div>
                                <p className="text-[10px] text-gold-dim mt-2">Enter the total transaction value</p>
                            </div>

                            {/* Brand Selection */}
                            <div className="bg-espresso-800 p-6 rounded-sm border border-espresso-700 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider">Brand / Category</label>
                                    <span className="text-[10px] text-primary cursor-pointer hover:text-gold-400 transition-all">View All Brands</span>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {brands.map((brand) => (
                                        <button
                                            key={brand.id}
                                            onClick={() => setSelectedBrand(brand.id)}
                                            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-sm transition-all ${selectedBrand === brand.id
                                                ? 'border-2 border-primary bg-espresso-950 text-white relative shadow-[0_0_10px_rgba(205,127,50,0.2)]'
                                                : 'border border-espresso-700 bg-espresso-950 text-gold-dim hover:border-primary/50 hover:bg-espresso-950/80'
                                                }`}
                                        >
                                            {selectedBrand === brand.id && (
                                                <span className="absolute top-1 right-1 text-primary material-symbols-outlined text-[10px]">check_circle</span>
                                            )}
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-espresso-950 font-bold text-xs">{brand.initial}</div>
                                            <span className="text-xs font-medium">{brand.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Mode */}
                            <div className="bg-espresso-800 p-6 rounded-sm border border-espresso-700 shadow-sm">
                                <label className="block text-xs font-bold text-gold-400 uppercase tracking-wider mb-4">Payment Mode</label>
                                <div className="space-y-3">
                                    {paymentCards.map((card) => (
                                        <label
                                            key={card.id}
                                            className={`flex items-center gap-3 p-3 rounded-sm bg-espresso-950 cursor-pointer transition-all hover:bg-espresso-950/80 relative overflow-hidden group ${selectedCard === card.id
                                                ? 'border border-primary shadow-[inset_0_0_5px_rgba(205,127,50,0.1)]'
                                                : 'border border-espresso-700 hover:border-primary/50'
                                                }`}
                                        >
                                            <input
                                                checked={selectedCard === card.id}
                                                onChange={() => setSelectedCard(card.id)}
                                                className="text-primary focus:ring-primary bg-espresso-800 border-espresso-700"
                                                name="card"
                                                type="radio"
                                            />
                                            <div className={`h-8 w-12 bg-gradient-to-br ${card.gradient} rounded border border-${card.borderColor} flex items-center justify-center shadow-sm`}>
                                                <span className="text-[8px] text-white">{card.label}</span>
                                            </div>
                                            <div className="flex-1 z-10">
                                                <div className="flex justify-between">
                                                    <span className={`text-sm font-medium ${selectedCard === card.id ? 'text-white' : 'text-gold-dim group-hover:text-white'} transition-colors`}>{card.name}</span>
                                                    <span className={`text-xs font-bold ${selectedCard === card.id ? 'text-gold-400 bg-gold-400/10 px-1.5 py-0.5 rounded border border-gold-400/20' : 'text-gold-dim'}`}>{card.returnRate} Return</span>
                                                </div>
                                                {card.description && <p className="text-[10px] text-gold-dim">{card.description}</p>}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Point Valuation */}
                            <div className="bg-espresso-800 p-6 rounded-sm border border-espresso-700 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs font-bold text-gold-400 uppercase tracking-wider">Point Valuation</label>
                                        <span className="material-symbols-outlined text-espresso-700 text-sm cursor-help">info</span>
                                    </div>
                                    <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded border border-primary/20">₹{pointValue.toFixed(2)} / pt</span>
                                </div>
                                <input
                                    className="w-full accent-primary hover:accent-primary-hover transition-colors"
                                    max="1.50"
                                    min="0.20"
                                    step="0.05"
                                    type="range"
                                    value={pointValue}
                                    onChange={(e) => setPointValue(Number(e.target.value))}
                                />
                                <div className="flex justify-between text-[10px] text-gold-dim mt-2 font-mono">
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
                                <div className="bg-espresso-800 p-5 rounded-sm border border-espresso-700 flex flex-col relative overflow-hidden group hover:border-gold-400/30 transition-colors shadow-sm">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-4xl text-gold-400">payments</span>
                                    </div>
                                    <span className="text-gold-dim text-xs uppercase tracking-wide mb-1 flex items-center gap-1">Effective Price</span>
                                    <span className="text-2xl font-display font-bold text-gold-400">₹{effectivePrice.toLocaleString()}</span>
                                    <span className="text-[10px] text-gold-dim mt-auto line-through decoration-primary/50">Original: ₹{spendAmount.toLocaleString()}</span>
                                </div>

                                <div className="bg-espresso-800 p-5 rounded-sm border border-primary flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(205,127,50,0.15)] group hover:shadow-[0_0_25px_rgba(205,127,50,0.25)] transition-all">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-4xl text-primary">savings</span>
                                    </div>
                                    <span className="text-primary text-xs uppercase tracking-wide mb-1 font-bold flex items-center gap-1">Total Savings</span>
                                    <span className="text-2xl font-display font-bold text-white">₹{savings.toLocaleString()}</span>
                                    <div className="flex items-center gap-1 mt-auto">
                                        <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold border border-primary/20">{savingsPercent}% OFF</span>
                                    </div>
                                </div>

                                <div className="bg-espresso-800 p-5 rounded-sm border border-espresso-700 flex flex-col relative overflow-hidden group hover:border-gold-400/50 transition-colors shadow-sm">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-4xl text-gold-400">stars</span>
                                    </div>
                                    <span className="text-gold-400 text-xs uppercase tracking-wide mb-1 flex items-center gap-1">Points Earned</span>
                                    <span className="text-2xl font-display font-bold text-white">{pointsEarned.toLocaleString()} <span className="text-sm font-normal text-gold-dim">pts</span></span>
                                    <span className="text-[10px] text-gold-dim mt-auto flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 inline-block shadow-[0_0_5px_#d4af37]"></span>
                                        Valued at ₹{pointValue.toFixed(2)}/pt
                                    </span>
                                </div>
                            </div>

                            {/* Charts and Comparison */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                                {/* Donut Chart */}
                                <div className="bg-espresso-800 p-6 rounded-sm border border-espresso-700 flex flex-col items-center justify-center relative shadow-sm">
                                    <h4 className="w-full text-xs font-bold text-gold-400 uppercase tracking-wider mb-6 text-left flex items-center gap-2">
                                        Cost Breakdown
                                        <span className="material-symbols-outlined text-[14px] text-espresso-700 cursor-help">help</span>
                                    </h4>
                                    <div className="relative w-48 h-48 hover:scale-105 transition-transform duration-300">
                                        <div
                                            className="w-full h-full rounded-full"
                                            style={{
                                                background: `conic-gradient(#cd7f32 0% ${savingsPercent}%, #4a403c ${savingsPercent}% 100%)`,
                                                maskImage: 'radial-gradient(transparent 60%, black 61%)',
                                                WebkitMaskImage: 'radial-gradient(transparent 60%, black 61%)',
                                                boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                                            }}
                                        ></div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                            <span className="text-3xl font-bold text-white font-display">{savingsPercent}%</span>
                                            <span className="text-xs text-gold-dim uppercase tracking-widest">Saved</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 mt-6 w-full justify-center">
                                        <div className="flex items-center gap-2 group">
                                            <div className="w-3 h-3 rounded-full bg-espresso-700 group-hover:ring-2 ring-offset-1 ring-offset-espresso-800 ring-espresso-700 transition-all"></div>
                                            <span className="text-xs text-gold-dim">Payable ({100 - savingsPercent}%)</span>
                                        </div>
                                        <div className="flex items-center gap-2 group">
                                            <div className="w-3 h-3 rounded-full bg-primary group-hover:ring-2 ring-offset-1 ring-offset-espresso-800 ring-primary transition-all"></div>
                                            <span className="text-xs text-white">Savings ({savingsPercent}%)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Comparison */}
                                <div className="bg-espresso-800 p-6 rounded-sm border border-espresso-700 flex flex-col shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Comparison</h4>
                                        <div className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20 font-medium">
                                            Using SmartBuy
                                        </div>
                                    </div>
                                    <div className="space-y-6 my-auto">
                                        <div className="group">
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className="text-gold-dim">Standard Pay</span>
                                                <span className="text-white">₹{spendAmount.toLocaleString()}</span>
                                            </div>
                                            <div className="h-8 w-full bg-espresso-950 border border-espresso-700 rounded-sm relative overflow-hidden">
                                                <div className="absolute top-0 left-0 h-full bg-espresso-700/50 group-hover:bg-espresso-700/70 transition-colors w-full"></div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className="text-white font-bold flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px] text-primary">auto_awesome</span>
                                                    Smart Pay
                                                </span>
                                                <span className="text-primary font-bold">₹{effectivePrice.toLocaleString()}</span>
                                            </div>
                                            <div className="h-8 w-full bg-espresso-950 border border-primary/30 rounded-sm flex overflow-hidden">
                                                <div
                                                    className="h-full bg-white/10 flex items-center justify-center text-[10px] text-white border-r border-black/20 group-hover:bg-white/15 transition-colors"
                                                    style={{ width: `${100 - savingsPercent}%` }}
                                                >
                                                    Net Cost
                                                </div>
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-primary-hover flex items-center justify-center text-[10px] text-white font-bold group-hover:brightness-110 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]"
                                                    style={{ width: `${savingsPercent}%` }}
                                                >
                                                    Saved
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-espresso-700/30">
                                        <p className="text-[10px] text-gold-dim leading-relaxed">
                                            <span className="text-primary font-bold">Analysis:</span> You save <span className="text-gold-400 font-bold">₹{savings.toLocaleString()}</span> by purchasing an Amazon Voucher via HDFC SmartBuy compared to direct payment.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Milestone Progress */}
                            <div className="bg-espresso-800 p-4 rounded-sm border border-espresso-700 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-gold-400 text-sm animate-bounce">flag</span>
                                        Monthly Milestone
                                    </span>
                                    <span className="text-xs text-gold-dim">₹{spendAmount.toLocaleString()} / ₹20,000</span>
                                </div>
                                <div className="w-full bg-espresso-950 rounded-full h-1.5 mb-2 overflow-hidden relative">
                                    <div
                                        className="bg-gold-400 h-1.5 rounded-full relative overflow-hidden shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                                        style={{ width: `${Math.min((spendAmount / 20000) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-[10px] text-gold-dim">Spend <span className="text-white font-medium">₹{Math.max(20000 - spendAmount, 0).toLocaleString()} more</span> to unlock <span className="text-gold-400 font-bold">2,000 bonus points</span>.</p>
                            </div>

                            {/* Execution Plan */}
                            <div className="bg-espresso-950 p-4 rounded-sm border border-primary/30 border-dashed relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 opacity-5">
                                    <span className="material-symbols-outlined text-6xl">stairs</span>
                                </div>
                                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-4">Execution Plan</h4>
                                <div className="flex items-center justify-between text-center relative z-10">
                                    <div className="absolute top-4 left-0 w-full h-0.5 bg-espresso-700 -z-10"></div>
                                    {['Log in to SmartBuy', 'Buy Amazon Voucher', 'Add to Amazon Pay', 'Pay for Order'].map((step, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-2 bg-espresso-950 px-2 group cursor-pointer">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${idx === 3
                                                ? 'bg-primary text-white shadow-[0_0_10px_rgba(205,127,50,0.4)] group-hover:scale-110'
                                                : 'bg-espresso-800 border border-primary text-primary group-hover:bg-primary group-hover:text-white'
                                                }`}>
                                                {idx === 3 ? <span className="material-symbols-outlined text-sm">check</span> : idx + 1}
                                            </div>
                                            <span className={`text-[10px] ${idx === 3 ? 'text-white font-medium' : 'text-gold-dim group-hover:text-white'} transition-colors`}>
                                                {step.split(' ').slice(0, 2).join(' ')}<br />{step.split(' ').slice(2).join(' ')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
