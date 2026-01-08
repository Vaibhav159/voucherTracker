import { useState } from 'react';

const cards = [
    { id: 'magnus', name: 'Axis Magnus', ending: '4092', gradient: 'from-gray-700 to-gray-600', active: true },
    { id: 'infinia', name: 'HDFC Infinia', ending: '8812', gradient: 'from-blue-900 to-blue-800' },
    { id: 'platinum', name: 'Amex Platinum', ending: '1005', gradient: 'from-purple-900 to-purple-800' },
];

const milestones = [
    {
        id: 'monthly',
        title: 'Monthly Milestone',
        target: '₹ 1.0L',
        current: 87600,
        max: 100000,
        percent: 87,
        color: 'amber',
        reward: '25,000 Edge Points',
        status: 'Active',
    },
    {
        id: 'annual',
        title: 'Annual Fee Waiver',
        target: '₹ 10.0L',
        current: 220000,
        max: 1000000,
        percent: 22,
        color: 'emerald',
        reward: null,
        status: null,
    },
    {
        id: 'utility',
        title: 'Utility Spend Cap',
        target: '₹ 20K',
        current: 20500,
        max: 20000,
        percent: 100,
        color: 'red',
        reward: null,
        status: 'Maxed Out',
        warning: 'Warning: Spend above ₹20k on utilities earns 0 points! Stop spend here.',
    },
];

const recentTransactions = [
    { id: 1, merchant: 'Amazon India', date: 'Oct 24, 2023', category: 'Shopping', amount: '₹ 14,200', logo: 'A', bgColor: 'bg-orange-500' },
    { id: 2, merchant: 'Air India', date: 'Oct 22, 2023', category: 'Travel', amount: '₹ 8,500', logo: 'AI', bgColor: 'bg-red-600' },
];

export default function MilestoneTracker() {
    const [selectedCard, setSelectedCard] = useState('magnus');
    const [spendAmount, setSpendAmount] = useState('87,600');

    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-950">
            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
                <main className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-6 sm:gap-8 pb-20">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">Axis Magnus Tracker</h1>
                                <p className="text-gold-dim text-base font-normal">Manage your spend milestones and capping limits.</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gold-dim">
                                <span className="material-symbols-outlined text-primary text-base">calendar_today</span>
                                <span>Statement Cycle: <span className="text-white font-medium">12th - 11th</span></span>
                            </div>
                        </div>

                        {/* Card and Spend Input */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bg-espresso-800 rounded-xl border border-espresso-700 p-6 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">
                                    {/* Card Visual */}
                                    <div className="w-full md:w-1/3 shrink-0 flex flex-col gap-3">
                                        <div className="aspect-[1.586/1] w-full rounded-xl shadow-2xl relative overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-bl from-gray-800 to-black z-0"></div>
                                            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                            <div className="absolute bottom-4 left-4 z-10 flex flex-col">
                                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Axis Bank</p>
                                                <p className="text-white font-bold text-lg tracking-widest drop-shadow-md">MAGNUS</p>
                                            </div>
                                            <div className="absolute top-4 right-4 z-10">
                                                <span className="material-symbols-outlined text-white/80 text-3xl">contactless</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-xs font-medium text-gold-dim">Status: Active</span>
                                            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                                                <span className="size-1.5 rounded-full bg-emerald-500"></span> Online
                                            </span>
                                        </div>
                                    </div>

                                    {/* Spend Input */}
                                    <div className="flex-1 flex flex-col justify-center w-full">
                                        <label className="text-gold-dim text-sm font-medium mb-3 flex items-center gap-2" htmlFor="spend-input">
                                            Current Statement Spend
                                            <span className="material-symbols-outlined text-base text-gold-dim/60" title="Enter the total spend for the current statement cycle">info</span>
                                        </label>
                                        <div className="relative flex items-center">
                                            <span className="absolute left-4 text-gold-dim text-xl font-light">₹</span>
                                            <input
                                                className="w-full bg-espresso-950 text-white text-3xl font-bold py-4 pl-10 pr-24 rounded-lg border border-espresso-700 focus:border-primary focus:ring-0 outline-none transition-all placeholder:text-espresso-700"
                                                id="spend-input"
                                                placeholder="0"
                                                type="text"
                                                value={spendAmount}
                                                onChange={(e) => setSpendAmount(e.target.value)}
                                            />
                                            <button className="absolute right-2 top-2 bottom-2 bg-espresso-700 hover:bg-primary text-white px-4 rounded font-medium text-sm transition-colors">
                                                Update
                                            </button>
                                        </div>
                                        <p className="text-xs text-gold-dim mt-3 pl-1">Last updated: Today, 10:42 AM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Milestone Gap Card */}
                            <div className="bg-espresso-800 rounded-xl border border-espresso-700 p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-copper">savings</span>
                                                <h3 className="text-gold-dim text-xs font-bold uppercase tracking-widest">Milestone Gap</h3>
                                            </div>
                                            <span className="material-symbols-outlined text-copper/40 group-hover:text-copper transition-colors">trending_up</span>
                                        </div>
                                        <p className="text-gold-dim text-sm font-medium mb-2">Remaining Spend</p>
                                        <p className="text-4xl lg:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-amber-400 to-amber-700 drop-shadow-sm mb-1">
                                            ₹12,400
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-white font-medium leading-relaxed mb-4">
                                            Spend this to unlock <span className="text-copper font-bold">25,000 Edge Points</span> bonus this month.
                                        </p>
                                        <div className="h-2 w-full bg-espresso-950 rounded-full overflow-hidden border border-espresso-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                                            <div className="h-full bg-gradient-to-r from-copper via-amber-400 to-amber-100 w-[87%] rounded-full relative shadow-[0_0_10px_rgba(195,112,60,0.4)]">
                                                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/60 shadow-[0_0_4px_white]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Milestone Cards */}
                        {milestones.map((milestone) => (
                            <div
                                key={milestone.id}
                                className={`bg-espresso-800 rounded-xl border p-6 shadow-lg flex flex-col gap-6 group transition-colors duration-300 ${milestone.color === 'red'
                                    ? 'border-red-500/30 shadow-[0_0_20px_rgba(244,67,54,0.15)]'
                                    : milestone.color === 'amber'
                                        ? 'border-espresso-700 hover:border-amber-400/30'
                                        : 'border-espresso-700 hover:border-emerald-400/30'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className={`bg-gradient-to-br from-espresso-800 to-espresso-950 p-3 rounded-xl border shadow-inner ${milestone.color === 'red' ? 'border-red-500/30' : 'border-espresso-700'
                                            } ${milestone.color === 'red' ? 'animate-pulse' : ''}`}>
                                            <span className={`material-symbols-outlined ${milestone.color === 'amber' ? 'text-amber-400' :
                                                milestone.color === 'emerald' ? 'text-emerald-400' :
                                                    'text-red-500'
                                                }`}>
                                                {milestone.color === 'red' ? 'warning' : milestone.color === 'amber' ? 'calendar_view_month' : 'verified'}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg tracking-tight">{milestone.title}</h3>
                                            <p className="text-xs text-gold-dim font-medium uppercase tracking-wider mt-0.5">{milestone.color === 'red' ? 'Limit' : 'Target'}: {milestone.target}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`text-2xl font-black drop-shadow-sm ${milestone.color === 'amber' ? 'text-amber-400' :
                                            milestone.color === 'emerald' ? 'text-emerald-400' :
                                                'text-red-500'
                                            }`}>{milestone.percent}%</span>
                                        {milestone.status && (
                                            <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${milestone.status === 'Maxed Out'
                                                ? 'bg-red-500 text-white shadow-lg shadow-red-900/50'
                                                : `bg-amber-400/10 text-amber-400`
                                                }`}>{milestone.status}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gold-dim mb-3">
                                        <span className={milestone.color === 'red' ? 'text-red-500' : 'text-white'}>₹ {milestone.current.toLocaleString()}</span>
                                        <span>₹ {milestone.max.toLocaleString()}</span>
                                    </div>
                                    <div className="h-5 w-full bg-espresso-950 rounded-full relative shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] border border-espresso-700/60 overflow-hidden">
                                        <div
                                            className={`h-full rounded-l-full relative flex items-center transition-all duration-1000 ease-out ${milestone.color === 'amber' ? 'bg-gradient-to-r from-amber-800 via-amber-500 to-amber-300 shadow-[0_2px_15px_rgba(251,191,36,0.25)]' :
                                                milestone.color === 'emerald' ? 'bg-gradient-to-r from-emerald-800 via-emerald-500 to-emerald-300 shadow-[0_2px_15px_rgba(52,211,153,0.25)]' :
                                                    'bg-gradient-to-r from-red-800 via-red-500 to-red-300 shadow-[0_2px_15px_rgba(248,113,113,0.3)]'
                                                }`}
                                            style={{ width: `${Math.min(milestone.percent, 100)}%` }}
                                        >
                                            <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/20 to-transparent"></div>
                                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-copper shadow-[0_0_10px_#c3703c] z-10 border-l border-white/30"></div>
                                        </div>
                                    </div>

                                    {milestone.warning ? (
                                        <div className="mt-4 flex items-start gap-3 p-3 bg-gradient-to-r from-red-500/10 to-transparent rounded-lg border-l-2 border-red-500">
                                            <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">info</span>
                                            <p className="text-xs text-red-500/90 font-medium leading-relaxed">
                                                {milestone.warning}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gold-dim mt-4 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                            {milestone.reward ? (
                                                <>
                                                    <span className={`material-symbols-outlined text-sm ${milestone.color === 'amber' ? 'text-amber-400' : 'text-emerald-400'}`}>bolt</span>
                                                    You are just <span className="text-white font-bold">₹{(milestone.max - milestone.current).toLocaleString()}</span> away from the goal!
                                                </>
                                            ) : (
                                                'Long way to go. Keep spending strategically.'
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Recent Transactions */}
                        <div className="mt-4">
                            <h3 className="text-lg font-bold text-white mb-4">Recent Qualifying Spends</h3>
                            <div className="bg-espresso-800 border border-espresso-700 rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-espresso-950 text-gold-dim">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">Merchant</th>
                                            <th className="px-6 py-3 font-medium">Date</th>
                                            <th className="px-6 py-3 font-medium">Category</th>
                                            <th className="px-6 py-3 font-medium text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-espresso-700">
                                        {recentTransactions.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-espresso-900 transition-colors">
                                                <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                                    <div className={`size-8 rounded ${tx.bgColor} flex items-center justify-center`}>
                                                        <span className="text-white font-bold text-xs">{tx.logo}</span>
                                                    </div>
                                                    {tx.merchant}
                                                </td>
                                                <td className="px-6 py-4 text-gold-dim">{tx.date}</td>
                                                <td className="px-6 py-4 text-gold-dim">{tx.category}</td>
                                                <td className="px-6 py-4 text-right font-medium text-white">{tx.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
