import { useState } from 'react';
import {
    Clock,
    ArrowRight,
    Landmark,
    PlaneTakeoff,
    Lightbulb,
    Gift,
    Timer,
    History,
    Plane,
    Hotel,
    Gem
} from 'lucide-react';
import SEO from '../../components/SEO';

const partners = [
    { name: 'KrisFlyer', type: 'Airline', ratio: '1:1', icon: <Plane size={14} /> },
    { name: 'Bonvoy', type: 'Hotel', ratio: '1:1', icon: <Hotel size={14} /> },
    { name: 'Flying Blue', type: 'Airline', ratio: '1:1', icon: <Plane size={14} /> },
    { name: 'Accor', type: 'Hotel', ratio: '2:1', icon: <Hotel size={14} /> },
];

const redemptions = [
    { title: 'Economy Saver', route: 'Mumbai to Singapore', points: '20k pts', value: 'High Value', gradient: 'from-blue-500 to-indigo-600', icon: <Plane size={24} /> },
    { title: 'Luxury Stay', route: 'Ritz Carlton (1 Night)', points: '45k pts', value: 'Avg Value', gradient: 'from-purple-500 to-pink-600', icon: <Hotel size={24} /> },
    { title: 'Business Upgrade', route: 'Delhi to London', points: '60k pts', value: 'Best Value', gradient: 'from-amber-500 to-orange-600', icon: <Gem size={24} /> },
];

export default function PointsTransfer() {
    const [fromBank, setFromBank] = useState('HDFC Infinia');
    const [toPartner, setToPartner] = useState('KrisFlyer (SIA)');
    const [transferAmount, setTransferAmount] = useState(10000);

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Points Transfer Tool | Convert Credit Card Points to Miles"
                description="Visualize point migration, live transfer ratios, and find the best redemption sweet spots for your credit card points."
                keywords="credit card points transfer, hdfc infinia points transfer, axis magnus miles transfer, airline partners, hotel partners"
            />

            <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-10">
                {/* Header */}
                <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-bold border" style={{ backgroundColor: 'var(--accent-dim)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>Transfer Tool</span>
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>v2.4 Updated</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>
                            Transfer <span style={{ color: 'var(--accent)' }}>Journey</span>
                        </h1>
                        <p className="mt-2 text-sm md:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                            Visualize point migration, check real-time ratios, and discover the best redemption sweet spots.
                        </p>
                    </div>
                    <button className="hidden md:inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition-colors hover:bg-[var(--bg-alt)]" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                        <History size={16} />
                        History
                    </button>
                </header>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Main Transfer Card */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <div className="relative overflow-hidden rounded-2xl border shadow-xl" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[80px]" style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}></div>
                            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full blur-[80px]" style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}></div>

                            <div className="relative p-6 md:p-10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                                    {/* From Bank */}
                                    <div className="w-full md:w-5/12 relative z-10">
                                        <label className="mb-3 block text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>From (Bank)</label>
                                        <div className="relative rounded-xl border-2 border-transparent p-1 transition-all hover:bg-[var(--bg-alt)]" style={{ backgroundColor: 'var(--bg)' }}>
                                            <div className="flex items-center gap-3 rounded-lg p-3">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}>
                                                    <Landmark size={24} />
                                                </div>
                                                <div className="flex-1">
                                                    <select
                                                        className="w-full border-none bg-transparent p-0 text-sm font-bold focus:ring-0 cursor-pointer outline-none appearance-none"
                                                        style={{ color: 'var(--text-primary)' }}
                                                        value={fromBank}
                                                        onChange={(e) => setFromBank(e.target.value)}
                                                    >
                                                        <option style={{ color: 'black' }}>HDFC Infinia Metal</option>
                                                        <option style={{ color: 'black' }}>Axis Magnus</option>
                                                        <option style={{ color: 'black' }}>Amex Platinum</option>
                                                    </select>
                                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>100,000 pts available</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 border-t px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                                                <label className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>TRANSFER AMOUNT</label>
                                                <input
                                                    className="w-full border-none bg-transparent p-0 text-2xl font-mono font-bold focus:ring-0 outline-none placeholder:opacity-50"
                                                    style={{ color: 'var(--text-primary)' }}
                                                    type="number"
                                                    value={transferAmount}
                                                    onChange={(e) => setTransferAmount(Number(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ratio & Arrow */}
                                    <div className="flex flex-col items-center justify-center relative z-20 min-w-[140px] my-6 md:my-0">
                                        <div className="mb-6 relative">
                                            <div className="relative flex flex-col items-center rounded-lg border px-5 py-2 shadow-lg" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
                                                <span className="mb-0.5 text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Live Ratio</span>
                                                <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>1 : 1</span>
                                            </div>
                                        </div>
                                        <div className="relative flex w-full items-center justify-center">
                                            <div className="hidden md:block absolute h-[2px] w-48 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                                                <div className="absolute inset-0 h-full w-1/3 animate-pulse" style={{ backgroundColor: 'var(--accent)' }}></div>
                                            </div>
                                            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 shadow-2xl transition-transform duration-500 hover:scale-110 z-10"
                                                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--bg)' }}>
                                                <ArrowRight size={24} style={{ color: 'var(--accent)' }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* To Partner */}
                                    <div className="w-full md:w-5/12 relative z-10">
                                        <label className="mb-3 block text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>To (Partner)</label>
                                        <div className="relative rounded-xl border-2 border-transparent p-1 transition-all hover:bg-[var(--bg-alt)]" style={{ backgroundColor: 'var(--bg)' }}>
                                            <div className="flex items-center gap-3 rounded-lg p-3">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}>
                                                    <PlaneTakeoff size={24} />
                                                </div>
                                                <div className="flex-1">
                                                    <select
                                                        className="w-full border-none bg-transparent p-0 text-sm font-bold focus:ring-0 cursor-pointer outline-none appearance-none"
                                                        style={{ color: 'var(--text-primary)' }}
                                                        value={toPartner}
                                                        onChange={(e) => setToPartner(e.target.value)}
                                                    >
                                                        <option style={{ color: 'black' }}>KrisFlyer (SIA)</option>
                                                        <option style={{ color: 'black' }}>British Airways</option>
                                                        <option style={{ color: 'black' }}>Marriott Bonvoy</option>
                                                    </select>
                                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Airline Partner</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 border-t px-4 py-3 bg-gradient-to-br from-transparent to-transparent" style={{ borderColor: 'var(--border)' }}>
                                                <label className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>YOU RECEIVE</label>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-mono font-bold" style={{ color: 'var(--accent)' }}>{transferAmount.toLocaleString()}</span>
                                                    <span className="text-sm font-bold opacity-80" style={{ color: 'var(--accent)' }}>Miles</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Footer */}
                                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Est. Value: <span className="font-bold text-emerald-500">₹ 8,500</span></span>
                                    </div>
                                    <button className="w-full md:w-auto rounded-xl px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]" style={{ backgroundColor: 'var(--accent)' }}>
                                        Confirm Transfer
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Smart Suggestion */}
                        <div className="flex items-start gap-4 rounded-xl border p-4" style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                                <Lightbulb size={18} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-amber-500">Smart Suggestion</h4>
                                <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    Consider transferring to <strong>Marriott Bonvoy</strong> instead. There is a <span className="font-bold text-amber-500">30% bonus</span> active until Friday, giving you better effective value (₹1.2 vs ₹0.85).
                                </p>
                            </div>
                            <button className="ml-auto text-xs font-bold hover:underline whitespace-nowrap text-amber-500">Switch Partner</button>
                        </div>

                        {/* What Can I Get */}
                        <section>
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                                <Gift className="text-[var(--accent)]" size={20} />
                                What Can I Get?
                            </h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {redemptions.map((item) => (
                                    <div key={item.title} className="group relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                        <div className={`mb-3 h-24 w-full rounded-lg bg-gradient-to-br ${item.gradient} opacity-80 group-hover:opacity-100 transition-opacity relative flex items-center justify-center`}>
                                            <div className="text-white opacity-80">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.route}</p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{item.points}</span>
                                            <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${item.value === 'Best Value' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[var(--bg)] text-[var(--text-muted)]'}`}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Partners List */}
                        <div className="rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: 'var(--border)' }}>
                                <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Partners</h3>
                                <span className="text-xs font-bold opacity-50" style={{ color: 'var(--text-secondary)' }}>All Partners</span>
                            </div>
                            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                                {partners.map((partner) => (
                                    <div key={partner.name} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-[var(--bg-alt)]">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                                                {partner.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{partner.name}</p>
                                            </div>
                                        </div>
                                        <span className={`text-xs font-bold ${partner.ratio === '1:1' ? 'text-emerald-500' : 'text-amber-500'}`}>{partner.ratio}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Limited Offer */}
                        <div className="relative overflow-hidden rounded-2xl border p-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start">
                                    <span className="mb-3 inline-block rounded bg-[var(--accent)]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]">Limited Offer</span>
                                    <Timer size={16} className="text-[var(--accent)] opacity-50" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold" style={{ color: 'var(--text-primary)' }}>30% Bonus Avios</h3>
                                <p className="mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>Transfer from HDFC Bank to British Airways Executive Club before Sep 30.</p>
                                <button className="w-full rounded-lg bg-[var(--bg)] py-2 text-sm font-bold transition-colors hover:brightness-95" style={{ color: 'var(--text-primary)' }}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
