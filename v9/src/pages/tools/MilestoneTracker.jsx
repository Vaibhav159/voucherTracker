import { useState } from 'react';
import {
    Calendar,
    CreditCard,
    Info,
    TrendingUp,
    Target,
    Zap,
    AlertTriangle,
    CheckCircle2,
    Search,
    ChevronDown,
    Building2,
    Plane,
    ShoppingBag
} from 'lucide-react';
import SEO from '../../components/SEO';
import { creditCards } from '../../data/creditCards';

// Mock data based on v8 but using v9 card logic if available
const availableCards = [
    { id: 'axis-magnus', name: 'Axis Magnus', ending: '4092', color: 'bg-gradient-to-br from-red-900 to-red-800' },
    { id: 'hdfc-infinia-metal', name: 'HDFC Infinia', ending: '8812', color: 'bg-gradient-to-br from-blue-900 to-blue-800' },
    { id: 'amex-platinum-travel', name: 'Amex Platinum Travel', ending: '1005', color: 'bg-gradient-to-br from-purple-900 to-purple-800' },
];

const milestonesData = [
    {
        id: 'monthly',
        title: 'Monthly Milestone',
        target: 100000,
        current: 87600,
        color: 'text-[var(--accent)]',
        barColor: 'bg-[var(--accent)]',
        reward: '25,000 Edge Points',
        status: 'Active',
    },
    {
        id: 'annual',
        title: 'Annual Fee Waiver',
        target: 1000000,
        current: 220000,
        color: 'text-emerald-500',
        barColor: 'bg-emerald-500',
        reward: null,
        status: null,
    },
    {
        id: 'utility',
        title: 'Utility Spend Cap',
        target: 20000,
        current: 20500,
        color: 'text-red-500',
        barColor: 'bg-red-500',
        reward: null,
        status: 'Maxed Out',
        warning: 'Warning: Spend above ₹20k on utilities earns 0 points! Stop spend here.',
    },
];

const recentTransactions = [
    { id: 1, merchant: 'Amazon India', date: 'Oct 24, 2023', category: 'Shopping', amount: '₹ 14,200', logo: <ShoppingBag size={14} />, bgColor: 'bg-orange-500' },
    { id: 2, merchant: 'Air India', date: 'Oct 22, 2023', category: 'Travel', amount: '₹ 8,500', logo: <Plane size={14} />, bgColor: 'bg-red-600' },
];

export default function MilestoneTracker() {
    const [selectedCardId, setSelectedCardId] = useState('axis-magnus');
    const [spendAmount, setSpendAmount] = useState('87,600');

    // Get selected card details (mocked + real data lookup if needed)
    const selectedCard = availableCards.find(c => c.id === selectedCardId);

    // Milestones (mocked based on selection logic could go here)
    const milestones = milestonesData;

    // Calculate gap
    const activeMilestone = milestones[0];
    const gap = Math.max(0, activeMilestone.target - activeMilestone.current);

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title={`${selectedCard.name} Milestone Tracker | CardPerks`}
                description="Track your credit card spend milestones and fee waivers."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Milestone Tracker</h1>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Manage your spend milestones and capping limits.</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                        <Calendar size={16} className="text-[var(--accent)]" />
                        <span style={{ color: 'var(--text-secondary)' }}>Statement Cycle: <span className="font-bold" style={{ color: 'var(--text-primary)' }}>12th - 11th</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Card & Input */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Card Selector & Input */}
                        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-6 shadow-sm">
                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">
                                {/* Card Visual */}
                                <div className="w-full md:w-1/3 shrink-0">
                                    <div className={`aspect-[1.586/1] w-full rounded-xl shadow-2xl relative overflow-hidden text-white p-6 flex flex-col justify-between ${selectedCard.color}`}>
                                        <div className="flex justify-between items-start">
                                            <span className="font-mono text-xs uppercase opacity-70">Credit Card</span>
                                            <Zap size={20} className="opacity-80" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg tracking-widest">{selectedCard.name}</p>
                                            <p className="font-mono text-sm opacity-80 mt-1">**** {selectedCard.ending}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Select Card</label>
                                        <div className="relative">
                                            <select
                                                value={selectedCardId}
                                                onChange={(e) => setSelectedCardId(e.target.value)}
                                                className="w-full appearance-none bg-[var(--bg)] border border-[var(--border)] rounded-lg py-2.5 px-3 pr-10 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-[var(--text-primary)]"
                                            >
                                                {availableCards.map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Spend Input */}
                                <div className="flex-1 w-full flex flex-col justify-center">
                                    <label className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                        Current Statement Spend
                                        <Info size={14} className="text-[var(--text-muted)]" />
                                    </label>
                                    <div className="relative flex items-center mb-2">
                                        <span className="absolute left-4 text-2xl font-serif" style={{ color: 'var(--text-muted)' }}>₹</span>
                                        <input
                                            className="w-full bg-[var(--bg)] text-3xl font-serif font-bold py-4 pl-10 pr-24 rounded-lg border border-[var(--border)] focus:border-[var(--accent)] focus:ring-0 outline-none transition-all"
                                            style={{ color: 'var(--text-primary)' }}
                                            placeholder="0"
                                            type="text"
                                            value={spendAmount}
                                            onChange={(e) => setSpendAmount(e.target.value)}
                                        />
                                        <button className="absolute right-2 top-2 bottom-2 px-4 rounded font-medium text-sm transition-colors hover:brightness-110 text-white bg-[var(--accent)]">
                                            Update
                                        </button>
                                    </div>
                                    <p className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>Last updated: Today, 10:42 AM</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div>
                            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Recent Qualifying Spends</h3>
                            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[var(--bg-alt)] border-b border-[var(--border)]">
                                        <tr>
                                            <th className="px-6 py-3 font-medium text-[var(--text-secondary)]">Merchant</th>
                                            <th className="px-6 py-3 font-medium text-[var(--text-secondary)]">Date</th>
                                            <th className="px-6 py-3 font-medium text-[var(--text-secondary)]">Category</th>
                                            <th className="px-6 py-3 font-medium text-right text-[var(--text-secondary)]">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border)]">
                                        {recentTransactions.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-[var(--bg-alt)] transition-colors">
                                                <td className="px-6 py-4 font-medium flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                                                    <div className={`w-8 h-8 rounded flex items-center justify-center text-white ${tx.bgColor}`}>
                                                        {tx.logo}
                                                    </div>
                                                    {tx.merchant}
                                                </td>
                                                <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{tx.date}</td>
                                                <td className="px-6 py-4" style={{ color: 'var(--text-secondary)' }}>{tx.category}</td>
                                                <td className="px-6 py-4 text-right font-medium" style={{ color: 'var(--text-primary)' }}>{tx.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Milestones */}
                    <div className="space-y-6">
                        {/* Milestone Visual */}
                        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-6 shadow-sm relative overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Target size={18} className="text-[var(--accent)]" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Milestone Gap</h3>
                                </div>
                                <TrendingUp size={18} className="text-[var(--text-muted)]" />
                            </div>
                            <div className="mb-4">
                                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Remaining Spend</p>
                                <p className="text-4xl font-serif font-bold text-[var(--accent)]">
                                    ₹{gap.toLocaleString()}
                                </p>
                            </div>
                            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>
                                Spend this to unlock <span className="font-bold text-[var(--accent)]">25,000 Edge Points</span> bonus this month.
                            </p>
                            <div className="h-2 w-full bg-[var(--bg)] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--accent)] relative" style={{ width: '87%' }}></div>
                            </div>
                        </div>

                        {/* List */}
                        <div className="space-y-4">
                            {milestones.map((milestone) => (
                                <div
                                    key={milestone.id}
                                    className={`bg-[var(--surface)] rounded-xl border p-5 transition-all ${milestone.color.includes('red')
                                            ? 'border-red-500/30'
                                            : 'border-[var(--border)]'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] ${milestone.color}`}>
                                                {milestone.color.includes('red') ? <AlertTriangle size={18} /> :
                                                    milestone.color.includes('emerald') ? <CheckCircle2 size={18} /> :
                                                        <Target size={18} />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{milestone.title}</h3>
                                                <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                                    Target: ₹{milestone.target.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        {milestone.status && (
                                            <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${milestone.status === 'Maxed Out'
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-[var(--accent)]/10 text-[var(--accent)]'
                                                }`}>
                                                {milestone.status}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>₹{milestone.current.toLocaleString()}</span>
                                            <span>{(milestone.current / milestone.target * 100).toFixed(0)}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${milestone.barColor}`}
                                                style={{ width: `${Math.min((milestone.current / milestone.target * 100), 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {milestone.warning && (
                                        <div className="mt-3 flex items-start gap-2 text-xs text-red-500">
                                            <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                                            <span>{milestone.warning}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
