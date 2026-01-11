import { useState } from 'react';

const partners = [
    { name: 'KrisFlyer', type: 'Airline', ratio: '1:1', icon: 'flight' },
    { name: 'Bonvoy', type: 'Hotel', ratio: '1:1', icon: 'hotel' },
    { name: 'Flying Blue', type: 'Airline', ratio: '1:1', icon: 'flight' },
    { name: 'Accor', type: 'Hotel', ratio: '2:1', icon: 'hotel' },
];

const redemptions = [
    { title: 'Economy Saver', route: 'Mumbai to Singapore', points: '20k pts', value: 'High Value', gradient: 'from-blue-500 to-indigo-600', icon: 'flight' },
    { title: 'Luxury Stay', route: 'Ritz Carlton (1 Night)', points: '45k pts', value: 'Avg Value', gradient: 'from-purple-500 to-pink-600', icon: 'hotel' },
    { title: 'Business Upgrade', route: 'Delhi to London', points: '60k pts', value: 'Best Value', gradient: 'from-amber-500 to-orange-600', icon: 'diamond' },
];

export default function PointsTransfer() {
    const [fromBank, setFromBank] = useState('HDFC Infinia');
    const [toPartner, setToPartner] = useState('KrisFlyer (SIA)');
    const [transferAmount, setTransferAmount] = useState(10000);

    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-950">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-espresso-950 relative">
                <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
                <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-10 relative z-10">
                    {/* Header */}
                    <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center rounded-full bg-gold-400/10 px-2 py-1 text-xs font-medium text-gold-400 ring-1 ring-inset ring-gold-400/20">Transfer Tool</span>
                                <span className="h-1 w-1 rounded-full bg-gold-dim"></span>
                                <span className="text-xs text-gold-dim">v2.4 Updated</span>
                            </div>
                            <h1 className="text-3xl font-black text-white lg:text-4xl">
                                Transfer <span className="bg-gradient-to-r from-gold-400 to-copper bg-clip-text text-transparent">Journey</span>
                            </h1>
                            <p className="mt-2 max-w-2xl text-gold-dim">
                                Visualize point migration, check real-time ratios, and discover the best redemption sweet spots.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="inline-flex items-center gap-2 rounded-lg border border-espresso-700 bg-espresso-800 px-4 py-2 text-sm font-medium text-gold-dim transition-colors hover:bg-espresso-700 shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">history</span>
                                History
                            </button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Main Transfer Card */}
                        <div className="lg:col-span-8 flex flex-col gap-8">
                            <div className="group relative overflow-hidden rounded-2xl border border-espresso-700 bg-espresso-800 shadow-xl">
                                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-400/5 blur-[80px]"></div>
                                <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gold-400/5 blur-[80px]"></div>

                                <div className="relative p-6 md:p-10">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                                        {/* From Bank */}
                                        <div className="w-full md:w-5/12 relative z-10">
                                            <label className="mb-3 block font-serif text-xs font-bold uppercase tracking-[0.25em] text-gold-dim">From (Bank)</label>
                                            <div className="relative rounded-xl border-2 border-transparent bg-espresso-950/40 p-1 transition-all focus-within:border-gold-400/50 hover:bg-espresso-950/60">
                                                <div className="flex items-center gap-3 rounded-lg p-3">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-espresso-700 text-white">
                                                        <span className="material-symbols-outlined">account_balance</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <select
                                                            className="w-full border-none bg-transparent p-0 text-sm font-bold text-white focus:ring-0 cursor-pointer"
                                                            value={fromBank}
                                                            onChange={(e) => setFromBank(e.target.value)}
                                                        >
                                                            <option>HDFC Infinia</option>
                                                            <option>Axis Magnus</option>
                                                            <option>Amex Platinum</option>
                                                        </select>
                                                        <input className="w-full border-none bg-transparent p-0 text-xs text-gold-dim focus:ring-0" readOnly type="text" value="100,000 pts available" />
                                                    </div>
                                                </div>
                                                <div className="mt-2 border-t border-espresso-700 px-4 py-3">
                                                    <label className="text-[10px] font-semibold text-gold-dim">TRANSFER AMOUNT</label>
                                                    <input
                                                        className="w-full border-none bg-transparent p-0 text-2xl font-mono font-bold text-white focus:ring-0 placeholder:text-gold-dim/50"
                                                        type="number"
                                                        value={transferAmount}
                                                        onChange={(e) => setTransferAmount(Number(e.target.value))}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ratio & Arrow */}
                                        <div className="flex flex-col items-center justify-center relative z-20 min-w-[140px]">
                                            <div className="mb-6 group relative">
                                                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-yellow-300 via-gold-400 to-yellow-300 opacity-60 blur transition duration-1000 group-hover:opacity-100 animate-pulse"></div>
                                                <div className="relative flex flex-col items-center rounded-lg border border-yellow-200/40 bg-gradient-to-br from-gold-400 via-amber-600 to-amber-700 px-5 py-2 shadow-lg">
                                                    <span className="mb-0.5 text-[9px] font-black uppercase tracking-widest text-espresso-950/60">Live Ratio</span>
                                                    <span className="font-serif text-xl font-bold text-espresso-950">1 : 1</span>
                                                </div>
                                            </div>
                                            <div className="relative flex w-full items-center justify-center">
                                                <div className="absolute h-[2px] w-48 bg-espresso-700 rounded-full overflow-hidden">
                                                    <div className="absolute inset-0 h-full w-1/3 bg-gradient-to-r from-transparent via-gold-400 to-transparent animate-pulse"></div>
                                                </div>
                                                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-espresso-800 bg-gradient-to-br from-espresso-700 to-espresso-950 shadow-2xl transition-transform duration-500 hover:scale-110">
                                                    <span className="material-symbols-outlined text-gold-400 text-2xl">arrow_forward</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* To Partner */}
                                        <div className="w-full md:w-5/12 relative z-10">
                                            <label className="mb-3 block font-serif text-xs font-bold uppercase tracking-[0.25em] text-gold-dim">To (Partner)</label>
                                            <div className="relative rounded-xl border-2 border-transparent bg-espresso-950/40 p-1 transition-all focus-within:border-gold-400/50 hover:bg-espresso-950/60">
                                                <div className="flex items-center gap-3 rounded-lg p-3">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-espresso-700 text-white">
                                                        <span className="material-symbols-outlined">flight_takeoff</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <select
                                                            className="w-full border-none bg-transparent p-0 text-sm font-bold text-white focus:ring-0 cursor-pointer"
                                                            value={toPartner}
                                                            onChange={(e) => setToPartner(e.target.value)}
                                                        >
                                                            <option>KrisFlyer (SIA)</option>
                                                            <option>British Airways</option>
                                                            <option>Marriott Bonvoy</option>
                                                        </select>
                                                        <div className="text-xs text-gold-dim">Airline Partner</div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 border-t border-espresso-700 px-4 py-3 bg-gradient-to-br from-gold-400/5 to-transparent">
                                                    <label className="text-[10px] font-semibold text-gold-400">YOU RECEIVE</label>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-2xl font-mono font-bold text-gold-400">{transferAmount.toLocaleString()}</span>
                                                        <span className="text-sm font-medium text-gold-400/80">Miles</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-espresso-700 pt-6">
                                        <div className="flex items-center gap-3">
                                            <label className="inline-flex cursor-pointer items-center gap-3">
                                                <input className="peer sr-only" type="checkbox" />
                                                <div className="peer relative h-6 w-11 rounded-full bg-espresso-700 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-espresso-600 after:bg-espresso-500 after:transition-all peer-checked:bg-gold-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                                                <span className="text-sm font-medium text-gold-dim">Show Cash Value</span>
                                            </label>
                                            <span className="hidden text-sm text-gold-dim md:inline">|</span>
                                            <span className="text-sm text-gold-dim">Est. Value: <span className="font-bold text-emerald-400">₹ 8,500</span></span>
                                        </div>
                                        <button className="w-full rounded-xl bg-gold-400 px-6 py-3 text-sm font-bold text-espresso-950 shadow-lg shadow-gold-400/20 transition-transform hover:scale-[1.02] active:scale-[0.98] md:w-auto">
                                            Confirm Transfer
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Smart Suggestion */}
                            <div className="flex items-start gap-4 rounded-xl border border-amber-900/20 bg-amber-900/10 p-4">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-900/30 text-amber-500">
                                    <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-amber-500">Smart Suggestion</h4>
                                    <p className="mt-1 text-sm text-gold-dim">
                                        Consider transferring to <strong>Marriott Bonvoy</strong> instead. There is a <span className="font-bold text-amber-400">30% bonus</span> active until Friday, giving you better effective value (₹1.2 vs ₹0.85).
                                    </p>
                                </div>
                                <button className="ml-auto text-xs font-semibold text-amber-500 hover:underline whitespace-nowrap">Switch Partner</button>
                            </div>

                            {/* What Can I Get */}
                            <section>
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                                    <span className="material-symbols-outlined text-gold-400">redeem</span>
                                    What Can I Get?
                                </h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    {redemptions.map((item) => (
                                        <div key={item.title} className="group relative overflow-hidden rounded-xl border border-espresso-700 bg-espresso-800 p-4 transition-all hover:border-gold-400/50 hover:shadow-lg">
                                            <div className={`mb-3 h-24 w-full rounded-lg bg-gradient-to-br ${item.gradient} opacity-80 group-hover:opacity-100 transition-opacity relative`}>
                                                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl opacity-50">{item.icon}</span>
                                            </div>
                                            <h4 className="font-bold text-white">{item.title}</h4>
                                            <p className="text-xs text-gold-dim">{item.route}</p>
                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-sm font-bold text-gold-400">{item.points}</span>
                                                <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${item.value === 'Best Value' ? 'bg-emerald-500/10 text-emerald-400' : item.value === 'High Value' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gold-dim/10 text-gold-dim'}`}>{item.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            {/* Partners List */}
                            <div className="rounded-2xl border border-espresso-700 bg-espresso-800">
                                <div className="flex items-center justify-between border-b border-espresso-700 px-6 py-4">
                                    <h3 className="font-bold text-white">Partners</h3>
                                    <span className="text-xs font-semibold text-gold-dim/50">All Partners</span>
                                </div>
                                <div className="divide-y divide-espresso-700">
                                    {partners.map((partner) => (
                                        <div key={partner.name} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso-700">
                                                    <span className="material-symbols-outlined text-gold-dim text-sm">{partner.icon}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">{partner.name}</p>
                                                </div>
                                            </div>
                                            <span className={`text-xs font-bold ${partner.ratio === '1:1' ? 'text-emerald-400' : 'text-amber-400'}`}>{partner.ratio}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Limited Offer */}
                            <div className="relative overflow-hidden rounded-2xl border border-gold-400/20 bg-gradient-to-b from-espresso-800 to-espresso-900 p-6">
                                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/10 blur-2xl"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start">
                                        <span className="mb-3 inline-block rounded bg-gold-400/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-400">Limited Offer</span>
                                        <span className="material-symbols-outlined text-gold-400/50">timer</span>
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-white">30% Bonus Avios</h3>
                                    <p className="mb-4 text-sm text-gold-dim">Transfer from HDFC Bank to British Airways Executive Club before Sep 30.</p>
                                    <button className="w-full rounded-lg bg-white/10 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
