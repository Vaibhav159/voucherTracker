import { useState } from 'react';

const myCards = [
    {
        id: 1,
        name: 'Infinia Metal Edition',
        bank: 'HDFC Bank',
        network: 'VISA',
        lastFour: '8892',
        tag: 'Best for Travel & Dining',
        feeProgress: { label: '₹1.8L left for Fee Waiver', percent: 82 },
        annualSavings: '₹1,20,000',
        lifetimeRewards: '4.5L Pts',
        lifetimeValue: '~₹4.50L',
        returnRate: { min: '3.3%', max: '16.5%', tooltip: 'Base: 3.3% | SmartBuy: 5X (16.5%)' },
        pointsExpiry: { value: 'Never', color: 'text-green-400' },
        bgColor: 'bg-blue-900/20',
    },
    {
        id: 2,
        name: 'Platinum Travel',
        bank: 'American Express',
        network: 'AMEX',
        lastFour: '1005',
        tag: 'Best for Milestones',
        feeProgress: { label: '₹2.2L left for Milestone', percent: 45 },
        annualSavings: '₹35,000',
        lifetimeRewards: '80k Pts',
        lifetimeValue: '~₹32k',
        returnRate: { min: '~5.5%', tooltip: 'Base: 2% | Milestone Bonus' },
        pointsExpiry: { value: 'Dec 2025', color: 'text-gold-dim' },
        bgColor: 'bg-gray-400/10',
    },
    {
        id: 3,
        name: 'Cashback Card',
        bank: 'SBI Card',
        network: 'VISA',
        lastFour: '4221',
        tag: 'Best for Online Shopping',
        feeProgress: { label: '₹1.55L left for Fee Reversal', percent: 22, color: 'orange' },
        annualSavings: '₹18,000',
        lifetimeRewards: '₹15,000',
        lifetimeValue: 'Cashback',
        returnRate: { min: '5% Flat', tooltip: 'Online Spends Only' },
        pointsExpiry: { value: 'N/A (Cash)', color: 'text-gold-dim' },
        bgColor: 'bg-purple-900/20',
    },
];

const banks = ['HDFC Bank', 'American Express', 'SBI Card', 'Axis Bank'];

export default function MyCards() {
    const [selectedBanks, setSelectedBanks] = useState(['HDFC Bank', 'SBI Card']);

    const toggleBank = (bank) => {
        setSelectedBanks(prev =>
            prev.includes(bank)
                ? prev.filter(b => b !== bank)
                : [...prev, bank]
        );
    };

    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-950">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 border-r border-espresso-700 bg-espresso-950 overflow-y-auto shrink-0">
                <div className="p-6 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-gold-dim text-xs font-bold uppercase tracking-wider mb-2 pl-3">Menu</h3>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gold-dim hover:text-white hover:bg-espresso-700/50 transition-all group" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">dashboard</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-espresso-700/60 text-white border-l-4 border-primary shadow-[0_4px_12px_rgba(0,0,0,0.2)]" href="#">
                            <span className="material-symbols-outlined text-primary">credit_card</span>
                            <span className="text-sm font-bold">My Cards</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gold-dim hover:text-white hover:bg-espresso-700/50 transition-all group" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">bar_chart</span>
                            <span className="text-sm font-medium">Rewards Analysis</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gold-dim hover:text-white hover:bg-espresso-700/50 transition-all group" href="#">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </a>
                    </div>

                    <div className="h-px bg-espresso-700 w-full"></div>

                    {/* Bank Filters */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-gold-dim text-xs font-bold uppercase tracking-wider mb-2 pl-3">Filter By Bank</h3>
                        {banks.map((bank) => (
                            <label key={bank} className="flex items-center gap-3 px-3 py-1 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedBanks.includes(bank)}
                                    onChange={() => toggleBank(bank)}
                                    className="rounded border-gold-dim bg-transparent text-primary focus:ring-offset-espresso-950 focus:ring-primary h-4 w-4"
                                />
                                <span className="text-sm text-gold-dim group-hover:text-white transition-colors">{bank}</span>
                            </label>
                        ))}
                    </div>

                    {/* Premium Report Card */}
                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-espresso-700 to-espresso-800 border border-copper/30 flex flex-col gap-3 relative overflow-hidden group cursor-pointer">
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all"></div>
                        <div className="flex items-center gap-2 text-white z-10">
                            <span className="material-symbols-outlined text-primary">diamond</span>
                            <span className="text-sm font-bold">Premium Report</span>
                        </div>
                        <p className="text-xs text-gold-dim z-10">Get a detailed analysis of your spending habits.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative scroll-smooth">
                <div className="w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 flex flex-col gap-10 min-h-full">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-black tracking-tight text-white">Strategic Overview</h1>
                            <p className="text-gold-dim text-base max-w-md">Optimize your wallet strategy, track milestone progress, and maximize reward returns.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-all font-bold text-sm">
                                <span className="material-symbols-outlined text-lg">timeline</span>
                                <span>Track Rewards</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all font-bold text-sm transform hover:scale-105 active:scale-95">
                                <span className="material-symbols-outlined text-lg">add_card</span>
                                <span>Add New Card</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col justify-between p-6 rounded-2xl bg-espresso-800 border border-espresso-700 shadow-lg relative overflow-hidden group">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-espresso-700 text-gold-dim">
                                    <span className="material-symbols-outlined">savings</span>
                                </div>
                                <p className="text-gold-dim text-sm font-medium uppercase tracking-wide">Projected Annual Savings</p>
                            </div>
                            <p className="text-3xl font-bold text-white tracking-tight">₹1,72,500</p>
                            <div className="mt-2 text-xs text-gold-dim flex items-center gap-1">
                                <span className="text-green-500 font-medium">↑ 12%</span> vs last year's projection
                            </div>
                        </div>

                        <div className="flex flex-col justify-between p-6 rounded-2xl bg-espresso-800 border border-espresso-700 shadow-lg relative overflow-hidden group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-espresso-700 text-gold-dim">
                                    <span className="material-symbols-outlined">hotel_class</span>
                                </div>
                                <p className="text-gold-dim text-sm font-medium uppercase tracking-wide">Lifetime Rewards</p>
                            </div>
                            <p className="text-3xl font-bold text-white tracking-tight">₹4,25,000</p>
                            <div className="mt-2 text-xs text-gold-dim flex items-center gap-1">
                                <span className="text-gold-dim font-medium">Across 3 active cards</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between p-6 rounded-2xl bg-espresso-800 border border-espresso-700 shadow-lg relative overflow-hidden group">
                            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-espresso-700 text-primary">
                                    <span className="material-symbols-outlined">loyalty</span>
                                </div>
                                <p className="text-gold-dim text-sm font-medium uppercase tracking-wide">Current Points Value</p>
                            </div>
                            <p className="text-3xl font-bold text-primary tracking-tight">₹58,700</p>
                            <div className="mt-2 text-xs text-gold-dim flex items-center gap-1">
                                <span className="text-white font-medium">Redeemable now</span>
                            </div>
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-espresso-700/50">
                        <div className="flex items-center gap-4 text-sm font-medium text-gold-dim">
                            <span className="text-white">Sort by:</span>
                            <button className="hover:text-primary transition-colors">Highest Return %</button>
                            <button className="text-primary underline decoration-2 underline-offset-4">Fee Waiver</button>
                            <button className="hover:text-primary transition-colors">Expiring Soon</button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-espresso-700 text-white transition-colors">
                                <span className="material-symbols-outlined">grid_view</span>
                            </button>
                            <button className="p-2 rounded-lg text-gold-dim hover:bg-espresso-700 transition-colors">
                                <span className="material-symbols-outlined">list</span>
                            </button>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-10">
                        {myCards.map((card) => (
                            <div
                                key={card.id}
                                className="group relative flex flex-col rounded-2xl bg-espresso-800 border border-espresso-700 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-primary/30"
                            >
                                {/* Card Visual */}
                                <div className="relative h-48 w-full bg-espresso-950 flex items-center justify-center p-6 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 ${card.bgColor} rounded-full blur-3xl group-hover:opacity-75 transition-all duration-500`}></div>
                                    <div className="relative z-20 w-full max-w-[280px] aspect-[1.586/1] rounded-xl shadow-2xl bg-gradient-to-br from-espresso-700 to-espresso-900 transform rotate-0 group-hover:rotate-1 group-hover:scale-105 transition-transform duration-500 flex flex-col justify-between p-4">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] text-white/60 font-mono uppercase tracking-widest">{card.bank}</span>
                                            <span className="material-symbols-outlined text-white/80 text-lg">contactless</span>
                                        </div>
                                        <div className="text-[10px] text-white/80 font-mono tracking-widest">**** **** **** {card.lastFour}</div>
                                    </div>
                                </div>

                                {/* Card Info */}
                                <div className="flex flex-col p-5 gap-4">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-white">{card.name}</h3>
                                                <p className="text-sm text-gold-dim">{card.bank}</p>
                                            </div>
                                            <div className={`w-10 h-6 ${card.network === 'AMEX' ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/10'} rounded flex items-center justify-center`}>
                                                <span className={`text-[10px] font-bold tracking-tighter ${card.network === 'AMEX' ? 'text-blue-300' : 'italic text-white/70'}`}>{card.network}</span>
                                            </div>
                                        </div>
                                        <div className="inline-flex">
                                            <span className="bg-espresso-700/60 border border-espresso-700 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wide">{card.tag}</span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="flex flex-col gap-1.5 pt-1">
                                        <div className="flex justify-between items-end text-xs mb-1">
                                            <span className={`font-medium text-[11px] uppercase tracking-wide ${card.feeProgress.color === 'orange' ? 'text-orange-400' : 'text-primary'}`}>{card.feeProgress.label}</span>
                                            <span className="text-gold-dim font-mono text-[10px]">{card.feeProgress.percent}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-espresso-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${card.feeProgress.color === 'orange' ? 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]' : 'bg-primary shadow-[0_0_10px_rgba(177,115,53,0.5)]'}`}
                                                style={{ width: `${card.feeProgress.percent}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-espresso-700 w-full"></div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gold-dim uppercase tracking-wider mb-0.5">Annual Savings</span>
                                            <span className="text-sm font-bold text-white">{card.annualSavings}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gold-dim uppercase tracking-wider mb-0.5">Lifetime Rewards</span>
                                            <div className="flex flex-col leading-none gap-0.5">
                                                <span className="text-sm font-bold text-white">{card.lifetimeRewards}</span>
                                                <span className="text-[10px] text-gold-dim font-medium">({card.lifetimeValue})</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gold-dim uppercase tracking-wider mb-0.5">Return Rate</span>
                                            <span className="text-sm font-bold text-primary">
                                                {card.returnRate.min}{card.returnRate.max && ` - ${card.returnRate.max}`}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gold-dim uppercase tracking-wider mb-0.5">Points Expiry</span>
                                            <span className={`text-sm font-bold ${card.pointsExpiry.color}`}>{card.pointsExpiry.value}</span>
                                        </div>
                                    </div>

                                    <button className="mt-2 w-full py-2.5 rounded-lg border border-espresso-700 text-sm font-medium text-gold-dim hover:text-white hover:border-primary/50 hover:bg-espresso-700/30 transition-all flex items-center justify-center gap-2 group/btn">
                                        View Strategy
                                        <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add Card Button */}
                        <button className="group relative flex flex-col items-center justify-center rounded-2xl bg-espresso-800 border border-dashed border-espresso-700 min-h-[400px] hover:bg-espresso-700/20 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-espresso-700 group-hover:bg-primary group-hover:text-white text-gold-dim flex items-center justify-center transition-colors mb-4">
                                <span className="material-symbols-outlined text-3xl">add</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Add Another Card</h3>
                            <p className="text-sm text-gold-dim">Link a new credit card to track</p>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
