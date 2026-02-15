import React, { useState, useMemo, useEffect } from 'react';
import {
    TrendingUp,
    Award,
    Wallet,
    ShieldCheck,
    Plus,
    Search,
    X,
    Diamond,
    Edit3,
    Trash2,
    RotateCw,
    Plane,
    Calculator,
    PlusCircle,
    FileSpreadsheet,
    Download,
    PieChart,
    BarChart3,
    Clock,
    LayoutGrid,
    List
} from 'lucide-react';
import SEO from '../../components/SEO';

const MyCardsPage = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [flippedCards, setFlippedCards] = useState({});
    const [showSimModal, setShowSimModal] = useState(false);
    const [simAmount, setSimAmount] = useState('');
    const [simCategory, setSimCategory] = useState('Travel');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showSpendModal, setShowSpendModal] = useState(false);
    const [spendForm, setSpendForm] = useState({ date: '', amount: '', description: '' });
    const [selectedCardForSpend, setSelectedCardForSpend] = useState(null);
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportDateRange, setExportDateRange] = useState({
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    });

    const defaultCards = [
        {
            id: 1, bank: 'HDFC Bank', name: 'Infinia Metal Edition', type: 'Super Premium', network: 'Visa', tier: 'Infinite', theme: 'metal', colorAccent: '#e5c175',
            stats: { savings: 85000, returnRate: 3.3, pointsBalance: 42500, valuePerPoint: 1.0, fee: 12500, feeStatus: 'Paid', creditLimit: 1500000, billDate: 12 },
            milestone: { current: 820000, target: 1000000, label: 'Fee Waiver', deadline: 'Dec 2025' },
            details: { lounge: 'Unlimited (Global)', forex: '2% + GST', capping: '15k pts/mo (SmartBuy)', helpline: '1800-202-6161' },
            transactions: [{ id: 101, date: '2025-01-10', description: 'Opening Balance', amount: 820000 }],
            bestFor: ['Travel', 'Premium Dining'],
        },
        {
            id: 2, bank: 'American Express', name: 'Platinum Travel', type: 'Travel', network: 'Amex', tier: 'Platinum', theme: 'platinum', colorAccent: '#3b82f6',
            stats: { savings: 35000, returnRate: 6.5, pointsBalance: 18000, valuePerPoint: 0.5, fee: 5000, feeStatus: 'Waived', creditLimit: 500000, billDate: 5 },
            milestone: { current: 380000, target: 400000, label: '4L Milestone', deadline: 'Mar 2026' },
            details: { lounge: '8/Year (Domestic)', forex: '3.5% + GST', capping: 'No Capping', helpline: '1800-419-3688' },
            transactions: [{ id: 201, date: '2025-02-15', description: 'Opening Balance', amount: 380000 }],
            bestFor: ['Milestones', 'Flights'],
        },
        {
            id: 3, bank: 'SBI Card', name: 'Cashback', type: 'Shopping', network: 'Visa', tier: 'Signature', theme: 'cashback', colorAccent: '#a855f7',
            stats: { savings: 22500, returnRate: 5.0, pointsBalance: 4200, valuePerPoint: 1.0, fee: 999, feeStatus: 'Due Sep', creditLimit: 200000, billDate: 20 },
            milestone: { current: 120000, target: 200000, label: 'Fee Waiver', deadline: 'Sep 2026' },
            details: { lounge: '4/Year (Domestic)', forex: '3.5% + GST', capping: '₹5000 Cashback/mo', helpline: '1860-180-1290' },
            transactions: [{ id: 301, date: '2025-03-01', description: 'Opening Balance', amount: 120000 }],
            bestFor: ['Online Shopping'],
        }
    ];

    const [cards, setCards] = useState(() => {
        try { const saved = localStorage.getItem('cardFlowData'); return saved ? JSON.parse(saved) : defaultCards; } catch (e) { return defaultCards; }
    });

    useEffect(() => { localStorage.setItem('cardFlowData', JSON.stringify(cards)); }, [cards]);

    useEffect(() => {
        if (!window.XLSX) {
            const script = document.createElement('script');
            script.src = "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const formatCurrency = (amount) => {
        if (amount === 'LTF' || amount === 'Free' || amount === 'Waived') return amount;
        const num = typeof amount === 'string' ? Number(amount.replace(/[^0-9.-]+/g, "")) : amount;
        if (isNaN(num)) return amount;
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
    };

    const getDaysToBill = (billDay) => {
        if (!billDay) return null;
        const today = new Date();
        const currentDay = today.getDate();
        if (currentDay === billDay) return 0;
        if (currentDay < billDay) return billDay - currentDay;
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        return (daysInMonth - currentDay) + billDay;
    };

    const portfolioStats = useMemo(() => {
        const totalSavings = cards.reduce((acc, c) => acc + (c.stats.savings || 0), 0);
        const totalLimit = cards.reduce((acc, c) => acc + (c.stats.creditLimit || 0), 0);
        const totalFees = cards.reduce((acc, c) => acc + (c.stats.feeStatus === 'Paid' ? c.stats.fee : 0), 0);
        const totalPointsVal = cards.reduce((acc, c) => acc + (c.stats.pointsBalance * (c.stats.valuePerPoint || 0.25)), 0);
        return [
            { label: 'Total Annual Savings', value: totalSavings, icon: TrendingUp, sub: 'Across all cards' },
            { label: 'Total Credit Limit', value: totalLimit, icon: ShieldCheck, sub: 'Combined purchasing power' },
            { label: 'Total Reward Value', value: totalPointsVal, icon: Award, sub: 'Est. redemption value' },
            { label: 'Net Annual Fees', value: totalFees, icon: Wallet, sub: 'After waivers' },
        ];
    }, [cards]);

    const initialFormState = { id: null, bank: '', name: '', type: 'Travel', network: 'Visa', tier: 'Signature', theme: 'platinum', colorAccent: '#e5c175', milestoneTarget: 100000, milestoneCurrent: 0, fee: '', creditLimit: '', billDate: '', valuePerPoint: '0.25', isLtf: false };
    const [formData, setFormData] = useState(initialFormState);

    const bestCard = useMemo(() => {
        if (!simAmount) return null;
        const sorted = [...cards].sort((a, b) => {
            const scoreA = a.bestFor.some(t => t.toLowerCase().includes(simCategory.toLowerCase())) ? a.stats.returnRate * 1.5 : a.stats.returnRate;
            const scoreB = b.bestFor.some(t => t.toLowerCase().includes(simCategory.toLowerCase())) ? b.stats.returnRate * 1.5 : b.stats.returnRate;
            return scoreB - scoreA;
        });
        return sorted[0];
    }, [simAmount, simCategory, cards]);

    const handleOpenAdd = () => { setFormData(initialFormState); setIsEditing(false); setShowModal(true); };
    const handleOpenEdit = (card) => { setFormData({ id: card.id, bank: card.bank, name: card.name, type: card.type, network: card.network, tier: card.tier || 'Signature', theme: card.theme, colorAccent: card.colorAccent || '#e5c175', milestoneTarget: card.milestone.target, milestoneCurrent: card.milestone.current, fee: card.stats.fee, creditLimit: card.stats.creditLimit, billDate: card.stats.billDate || '', valuePerPoint: card.stats.valuePerPoint || '0.25', isLtf: card.stats.feeStatus === 'LTF' }); setIsEditing(true); setShowModal(true); };
    const handleDelete = (id) => { if (window.confirm('Are you sure you want to remove this card from your portfolio?')) { setCards(cards.filter(c => c.id !== id)); } };
    const toggleFlip = (id) => { setFlippedCards(prev => ({ ...prev, [id]: !prev[id] })); };
    const handleOpenSpend = (card, e) => { e.stopPropagation(); setSelectedCardForSpend(card); setSpendForm({ date: new Date().toISOString().split('T')[0], amount: '', description: '' }); setShowSpendModal(true); };
    const handleLogSpend = (e) => { e.preventDefault(); if (!selectedCardForSpend || !spendForm.amount) return; const amountToAdd = Number(spendForm.amount); const newTransaction = { id: Date.now(), date: spendForm.date, amount: amountToAdd, description: spendForm.description || 'Manual Entry' }; setCards(cards.map(c => { if (c.id === selectedCardForSpend.id) { return { ...c, milestone: { ...c.milestone, current: c.milestone.current + amountToAdd }, transactions: [...(c.transactions || []), newTransaction] }; } return c; })); setShowSpendModal(false); };
    const handleExport = () => { if (!window.XLSX) { alert("Export library is loading. Please try again."); return; } const wb = window.XLSX.utils.book_new(); cards.forEach(card => { const filteredTxns = (card.transactions || []).filter(txn => txn.date >= exportDateRange.start && txn.date <= exportDateRange.end); if (filteredTxns.length === 0 && card.milestone.current === 0) return; const wsData = [["Date", "Description", "Amount"], ...filteredTxns.map(t => [t.date, t.description, t.amount]), [], ["", "Grand Total", filteredTxns.reduce((sum, t) => sum + t.amount, 0)]]; const ws = window.XLSX.utils.aoa_to_sheet(wsData); window.XLSX.utils.book_append_sheet(wb, ws, (card.bank + " " + card.name).substring(0, 30)); }); window.XLSX.writeFile(wb, `CardFlow_Report_${exportDateRange.start}_to_${exportDateRange.end}.xlsx`); setShowExportModal(false); };
    const handleSubmit = (e) => { e.preventDefault(); const feeStatusDisplay = formData.isLtf ? 'LTF' : 'Active'; const feeValue = formData.isLtf ? 0 : Number(formData.fee); const newCardObj = { id: isEditing ? formData.id : Date.now(), bank: formData.bank || 'New Bank', name: formData.name || 'New Card', type: formData.type, network: formData.network, tier: formData.tier, theme: formData.theme, colorAccent: formData.colorAccent, stats: { savings: 0, returnRate: 1.0, pointsBalance: 0, fee: feeValue, feeStatus: feeStatusDisplay, creditLimit: Number(formData.creditLimit), billDate: Number(formData.billDate), valuePerPoint: Number(formData.valuePerPoint) }, milestone: { current: Number(formData.milestoneCurrent), target: Number(formData.milestoneTarget), label: 'Annual Milestone', deadline: 'Dec 2026' }, details: { lounge: 'Check App', forex: '3.5% + GST', capping: 'N/A', helpline: 'N/A' }, transactions: isEditing ? [] : [{ id: Date.now(), date: new Date().toISOString().split('T')[0], amount: Number(formData.milestoneCurrent), description: 'Opening Balance' }], bestFor: [formData.type] }; if (isEditing) { setCards(cards.map(c => c.id === formData.id ? { ...c, ...newCardObj, stats: { ...c.stats, fee: feeValue, feeStatus: feeStatusDisplay, returnRate: c.stats.returnRate, creditLimit: Number(formData.creditLimit), billDate: Number(formData.billDate), valuePerPoint: Number(formData.valuePerPoint) }, details: c.details, transactions: c.transactions } : c)); } else { setCards([...cards, newCardObj]); } setShowModal(false); };

    const NetworkLogo = ({ network }) => {
        if (network === 'Visa') return <div className="font-serif font-black italic text-2xl text-white tracking-tighter" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>VISA</div>;
        if (network === 'Mastercard') return <div className="flex"><div className="w-6 h-6 rounded-full bg-white/80 mix-blend-screen"></div><div className="w-6 h-6 rounded-full bg-white/50 mix-blend-screen -ml-3"></div></div>;
        if (network === 'Amex') return <div className="w-8 h-8 bg-[#2e7d32] flex items-center justify-center rounded-sm border border-white/20"><span className="text-[6px] font-bold text-white text-center leading-tight">AMERICAN<br />EXPRESS</span></div>;
        return <span className="font-bold text-xs uppercase">{network}</span>;
    };

    const filteredCards = cards.filter(card => (filter === 'All' || card.bestFor.some(t => t.toLowerCase().includes(filter.toLowerCase())) || card.type.toLowerCase().includes(filter.toLowerCase())) && (card.name.toLowerCase().includes(searchQuery.toLowerCase()) || card.bank.toLowerCase().includes(searchQuery.toLowerCase())));
    const categories = ['All', 'Travel', 'Shopping', 'Fuel', 'Dining'];

    const AnalyticsView = () => {
        const totalLimit = cards.reduce((sum, card) => sum + (card.stats.creditLimit || 0), 0);
        const totalSpend = cards.reduce((sum, card) => sum + (card.milestone.current || 0), 0);
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-xl relative">
                    <h3 className="text-[var(--accent)] font-serif text-xl mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Credit Allocation</h3>
                    {totalLimit > 0 ? (<div className="space-y-4">{cards.map(card => (<div key={card.id}><div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1 uppercase tracking-widest"><span style={{ color: card.colorAccent }}>{card.name}</span><span>{formatCurrency(card.stats.creditLimit)}</span></div><div className="h-2 w-full bg-[var(--bg)] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(card.stats.creditLimit / totalLimit) * 100}%`, backgroundColor: card.colorAccent }}></div></div></div>))}</div>) : (<div className="text-[var(--text-muted)] text-sm text-center py-10 italic border border-dashed border-[var(--border)]">No credit limits defined.<br />Edit your cards to add limits.</div>)}
                </div>
                <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-xl relative">
                    <h3 className="text-[var(--accent)] font-serif text-xl mb-6 flex items-center gap-2"><PieChart className="w-5 h-5" /> Spend Distribution</h3>
                    {totalSpend > 0 ? (<div className="flex items-center gap-8"><div className="w-40 h-40 rounded-full border-4 border-[#1c1210] shadow-xl shrink-0" style={{ background: `conic-gradient(${cards.map((card, i, arr) => { const prevSum = arr.slice(0, i).reduce((sum, c) => sum + (c.milestone.current || 0), 0); const start = (prevSum / totalSpend) * 100; const end = start + ((card.milestone.current || 0) / totalSpend) * 100; return `${card.colorAccent} ${start}% ${end}%`; }).join(', ')})` }}></div><div className="space-y-2 flex-grow">{cards.map(card => (<div key={card.id} className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.colorAccent }}></div><span className="text-[var(--text-primary)] flex-1 truncate">{card.name}</span><span className="text-[var(--text-secondary)]">{((card.milestone.current / totalSpend) * 100).toFixed(0)}%</span></div>))}</div></div>) : (<div className="text-[var(--text-muted)] text-sm text-center py-10 italic border border-dashed border-[var(--border)]">No spending data found.<br />Log transactions to see insights.</div>)}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-sans relative overflow-x-hidden">
            <SEO
                title="My Cards Portfolio | VoucherTracker"
                description="Manage your credit card portfolio, track milestones, simulate spends, and analyze your credit allocation in one place."
                keywords="credit card portfolio, spend tracker, milestone tracker, credit card manager"
            />
            <style>{`
        .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"); }
        .gold-text { background: linear-gradient(to bottom, #e5c175, #c5a059); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: #e5c175; }
        .copper-gradient { background: linear-gradient(135deg, #c08045 0%, #8a5a3a 100%); }
        .input-engraved { background-color: var(--surface); border-bottom: 1px solid var(--border); box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s; }
        .input-engraved:focus { border-bottom-color: var(--accent); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), 0 1px 0 rgba(192,128,69,0.5); outline: none; }
        select.input-engraved { appearance: auto; }
        option { background-color: var(--surface); color: var(--text-primary); }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-15deg); } 100% { transform: translateX(150%) skewX(-15deg); } }
        .animate-shimmer { animation: shimmer 3s infinite; }
      `}</style>
            <div className="fixed inset-0 bg-noise pointer-events-none z-0"></div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 relative z-10">
                <section>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                        <div><h1 className="font-serif text-4xl font-normal text-[var(--accent)] tracking-wide mb-2">Portfolio Overview</h1><p className="text-[var(--text-secondary)] font-light tracking-wide text-sm border-l border-[var(--accent)] pl-4">PORTFOLIO ANALYSIS & STRATEGY</p></div>
                        <div className="flex flex-wrap gap-3">
                            <button onClick={() => setShowSimModal(true)} className="px-4 py-3 bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2"><Calculator className="w-4 h-4" /> Simulate</button>
                            <button onClick={() => setShowExportModal(true)} className="px-4 py-3 bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] text-[var(--accent)] text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2"><FileSpreadsheet className="w-4 h-4" /> Report</button>
                            <button onClick={handleOpenAdd} className="px-6 py-3 copper-gradient hover:opacity-90 text-white text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 shadow-lg"><Plus className="w-4 h-4" /> Acquire Asset</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{portfolioStats.map((stat, idx) => (<div key={idx} className="bg-[var(--surface)] border-t-2 border-[var(--accent)] p-6 shadow-xl relative overflow-hidden group hover:bg-[var(--surface-hover)] transition-colors"><div className="absolute top-0 right-0 w-20 h-20 bg-[var(--accent)] opacity-5 rounded-full -mr-10 -mt-10 blur-xl"></div><div className="flex justify-between items-start mb-4"><span className="text-[var(--text-secondary)] text-[10px] font-bold tracking-widest uppercase">{stat.label}</span><stat.icon className="w-5 h-5 text-[var(--accent)]" /></div><div className="font-serif text-2xl font-medium gold-text">{formatCurrency(stat.value)}</div><div className="text-[10px] text-[var(--text-muted)] mt-2 font-mono border-t border-[var(--border)] pt-2 inline-block w-full">{stat.sub}</div></div>))}</div>
                </section>
                {viewMode === 'analytics' ? (<AnalyticsView />) : (<>
                    <section className="sticky top-20 z-40 py-4 bg-[var(--bg)]/95 border-b border-[var(--border)] backdrop-blur-sm transition-all">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="relative w-full md:w-72 group"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors" /><input type="text" placeholder="SEARCH ASSETS..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 pl-10 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] tracking-widest uppercase focus:border-[var(--accent)] focus:outline-none transition-all shadow-inner" /></div>
                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 no-scrollbar">{categories.map((cat) => (<button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 text-[10px] font-bold tracking-widest uppercase transition-all border ${filter === cat ? 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]' : 'bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}>{cat}</button>))}</div>
                                <div className="flex bg-[var(--surface)] border border-[var(--border)] shrink-0"><button onClick={() => setViewMode('grid')} className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-[var(--border)] text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}><LayoutGrid className="w-4 h-4" /></button><button onClick={() => setViewMode('list')} className={`p-2 transition-all ${viewMode === 'list' ? 'bg-[var(--border)] text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}><List className="w-4 h-4" /></button></div>
                            </div>
                        </div>
                    </section>
                    <section className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {filteredCards.map((card) => {
                            const progress = (card.milestone.current / card.milestone.target) * 100;
                            const remaining = card.milestone.target - card.milestone.current;
                            const isFlipped = flippedCards[card.id];
                            const daysToBill = getDaysToBill(card.stats.billDate);
                            if (viewMode === 'list') {
                                return (<div key={card.id} className="group bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] p-6 flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-2xl relative rounded-xl"><div className="w-full md:w-32 h-20 shrink-0 relative overflow-hidden shadow-2xl bg-[#2a1d1b] border-l-2 rounded-lg" style={{ borderLeftColor: card.colorAccent }}><div className="p-3 h-full flex flex-col justify-between relative z-10"><span className="font-serif text-[10px] font-bold uppercase tracking-widest" style={{ color: card.colorAccent }}>{card.bank}</span><div className="w-8 h-5 opacity-80" style={{ background: `linear-gradient(135deg, ${card.colorAccent}, #000)` }}></div></div></div><div className="flex-grow min-w-0 grid grid-cols-2 md:grid-cols-4 gap-6 w-full items-center"><div className="col-span-2 md:col-span-1 border-l border-[var(--border)] pl-4"><h3 className="font-serif text-lg text-[var(--text-primary)] tracking-wide truncate">{card.name}</h3><div className="flex gap-2 mt-2">{card.bestFor.slice(0, 1).map(t => <span key={t} className="text-[9px] font-bold tracking-widest uppercase text-[var(--text-secondary)]">{t}</span>)}</div></div><div className="col-span-2 md:col-span-1 flex flex-col justify-center"><div className="flex justify-between text-[9px] font-bold uppercase tracking-widest mb-2"><span className="text-[var(--text-secondary)]">{card.milestone.label}</span><span style={{ color: remaining <= 0 ? '#10b981' : card.colorAccent }}>{remaining <= 0 ? 'Done' : `${(progress).toFixed(0)}%`}</span></div><div className="h-1 bg-[var(--bg)] w-full rounded-full"><div className="h-full rounded-full" style={{ width: `${Math.min(progress, 100)}%`, background: card.colorAccent }}></div></div></div><div className="flex flex-col justify-center border-l border-[var(--border)] pl-4"><span className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Savings</span><span className="font-serif text-lg" style={{ color: card.colorAccent }}>{formatCurrency(card.stats.savings)}</span></div></div><div className="flex items-center gap-2"><button onClick={(e) => handleOpenSpend(card, e)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"><PlusCircle className="w-4 h-4" /></button><button onClick={() => handleOpenEdit(card)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"><Edit3 className="w-4 h-4" /></button><button onClick={() => handleDelete(card.id)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button></div></div>);
                            }
                            return (<div key={card.id} className="relative h-[480px] perspective-1000 group z-0 hover:z-10"><div className={`w-full h-full relative transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}><div className="absolute inset-0 backface-hidden bg-[var(--surface)] border border-[var(--border)] flex flex-col shadow-2xl rounded-xl overflow-hidden" style={{ borderTopColor: card.colorAccent, borderTopWidth: '1px' }}><div className="relative p-8 h-56 flex flex-col justify-between overflow-hidden bg-[#2a1d1b] border-0" style={{ borderLeft: `2px solid ${card.colorAccent}` }}><div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] mix-blend-overlay"></div><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div><div className="flex justify-between items-start relative z-10 pr-8"><div><h3 className="font-serif font-bold text-xl tracking-widest uppercase" style={{ color: card.colorAccent }}>{card.bank}</h3><p className="text-[9px] text-[#8a7f70] font-bold tracking-[0.2em] uppercase mt-1">{card.tier}</p></div><div className="opacity-90"><NetworkLogo network={card.network} /></div></div>{daysToBill !== null && (<div className="absolute top-2 right-2 md:top-8 md:right-8 flex flex-col items-end pointer-events-none"><div className={`flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[9px] font-bold uppercase tracking-widest shadow-lg ${daysToBill <= 5 ? 'text-red-400 border-red-500/50' : 'text-[#8a7f70]'}`}><Clock className="w-3 h-3" />{daysToBill === 0 ? 'Bill Generated' : `${daysToBill} Days`}</div></div>)}<div className="relative z-10"><div className="flex items-center gap-3 mb-3"><h2 className="font-serif text-2xl text-[#f2f0ea] tracking-wide drop-shadow-md">{card.name}</h2></div><div className="flex gap-2">{card.bestFor.map(tag => (<span key={tag} className="text-[9px] font-bold tracking-widest bg-[#0f0908]/80 text-[#a89f91] px-3 py-1 border border-[#3d2b28] uppercase shadow-sm">{tag}</span>))}</div></div></div><div className="px-8 py-6 border-y border-[var(--border)] bg-[var(--surface-50)]"><div className="flex justify-between items-center mb-3"><span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{card.milestone.label}</span><span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: remaining <= 0 ? '#10b981' : card.colorAccent }}>{remaining <= 0 ? 'TARGET MET' : `${formatCurrency(remaining)} REMAINING`}</span></div><div className="h-2 w-full bg-[var(--bg)] shadow-inner border-b border-[var(--border)]"><div className="h-full transition-all duration-1000 ease-out" style={{ width: `${Math.min(progress, 100)}%`, background: `linear-gradient(90deg, ${card.colorAccent}, #000)` }}></div></div><div className="flex justify-between mt-3 text-[9px] text-[var(--text-muted)] font-mono uppercase tracking-wider items-center"><span>{formatCurrency(card.milestone.current)} SPENT</span><span>DUE: {card.milestone.deadline}</span></div></div><div className="grid grid-cols-2 gap-[1px] bg-[var(--border)] flex-grow"><div className="bg-[var(--surface)] p-5 flex flex-col justify-center"><span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-widest mb-1">Savings</span><span className="font-serif text-xl text-[var(--text-primary)]">{formatCurrency(card.stats.savings)}</span></div><div className="bg-[var(--surface)] p-5 flex flex-col justify-center"><span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-widest mb-1">Return</span><div className="flex items-center gap-2"><span className="font-mono text-lg" style={{ color: card.colorAccent }}>{card.stats.returnRate}%</span><TrendingUp className="w-3 h-3" style={{ color: card.colorAccent }} /></div></div><div className="bg-[var(--surface)] p-5 flex flex-col justify-center"><span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-widest mb-1">Limit</span><span className="font-mono text-sm text-[var(--text-primary)]">{formatCurrency(card.stats.creditLimit)}</span></div><div className="bg-[var(--surface)] p-5 flex flex-col justify-center"><span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-widest mb-1">Fee Status</span><span className={`text-[10px] font-bold uppercase tracking-widest ${card.stats.feeStatus === 'Waived' || card.stats.feeStatus === 'LTF' ? 'text-[#10b981]' : 'text-[var(--text-secondary)]'}`}>{card.stats.feeStatus}</span></div></div><div className="p-4 bg-[var(--surface)] border-t border-[var(--border)] flex gap-3"><button onClick={(e) => handleOpenSpend(card, e)} className="flex-1 group/btn relative flex items-center justify-center gap-2 py-3 bg-[var(--input-bg)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all rounded"><PlusCircle className="w-3.5 h-3.5" /> <span className="text-[10px] font-bold uppercase tracking-widest">Log</span></button><button onClick={() => toggleFlip(card.id)} className="flex-1 group/btn relative flex items-center justify-center gap-2 py-3 bg-[var(--input-bg)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all rounded"><span className="text-[10px] font-bold uppercase tracking-widest">Strategy</span><RotateCw className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" /></button></div></div><div className="absolute inset-0 backface-hidden rotate-y-180 bg-[var(--surface)] border shadow-2xl p-8 flex flex-col rounded-xl" style={{ borderColor: card.colorAccent }}><div className="flex justify-between items-start mb-6 border-b border-[var(--border)] pb-4"><h3 className="font-serif text-2xl tracking-wide" style={{ color: card.colorAccent }}>Tactical Data</h3><button onClick={() => toggleFlip(card.id)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X className="w-6 h-6" /></button></div><div className="space-y-6 flex-grow"><div><div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-1 font-bold">Lounge Access</div><div className="text-[var(--text-primary)] text-sm flex items-center gap-2"><Diamond className="w-3 h-3" style={{ color: card.colorAccent }} /> {card.details?.lounge || 'Check App'}</div></div><div><div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-1 font-bold">Forex Markup</div><div className="text-[var(--text-primary)] text-sm flex items-center gap-2"><Plane className="w-3 h-3" style={{ color: card.colorAccent }} /> {card.details?.forex || 'Standard'}</div></div><div><div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-1 font-bold">Bill Generation Date</div><div className="font-mono text-sm tracking-wide" style={{ color: card.colorAccent }}>Day {card.stats.billDate || 'N/A'} of every month</div></div><div><div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-1 font-bold">Helpline</div><div className="text-[var(--text-primary)] font-mono text-sm tracking-wide">{card.details?.helpline || 'N/A'}</div></div></div><div className="mt-auto grid grid-cols-2 gap-4"><button onClick={() => handleOpenEdit(card)} className="py-3 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-bold uppercase tracking-widest transition-colors rounded">Edit Asset</button><button onClick={() => handleDelete(card.id)} className="py-3 border border-[var(--border)] hover:border-red-900/50 text-[var(--text-secondary)] hover:text-red-400 text-xs font-bold uppercase tracking-widest transition-colors rounded">Liquidity</button></div></div></div></div>);
                        })}
                    </section>
                </>)}
            </main>
            {showSimModal && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowSimModal(false)}></div><div className="relative bg-[var(--surface)] border border-[var(--accent)] w-full max-w-lg shadow-2xl p-8 rounded-xl"><button onClick={() => setShowSimModal(false)} className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--accent)]"><X className="w-5 h-5" /></button><h2 className="font-serif text-2xl text-[var(--accent)] mb-6 tracking-wide flex items-center gap-2"><Calculator className="w-6 h-6" /> Spend Simulator</h2><div className="space-y-6"><div className="grid grid-cols-2 gap-4"><div><label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2 block">Amount</label><input type="number" placeholder="50000" value={simAmount} onChange={(e) => setSimAmount(e.target.value)} className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" /></div><div><label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2 block">Category</label><select value={simCategory} onChange={(e) => setSimCategory(e.target.value)} className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded"><option>Travel</option><option>Shopping</option><option>Dining</option><option>Fuel</option></select></div></div><div className="bg-[var(--bg)] border border-[var(--border)] p-6 text-center rounded"><div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-2">Recommended Strategy</div>{bestCard ? (<div className="animate-in fade-in zoom-in duration-300"><div className="text-[var(--accent)] font-serif text-2xl mb-1">{bestCard.name}</div><div className="text-[var(--text-primary)] text-sm mb-4">{bestCard.bank} - {bestCard.tier}</div><div className="inline-block px-4 py-2 bg-[var(--surface)] border border-[var(--accent)] text-[var(--accent)] text-xs font-bold uppercase tracking-widest rounded">Est. Return: {formatCurrency(simAmount * (bestCard.stats.returnRate / 100))}</div></div>) : (<div className="text-[var(--text-muted)] italic">Enter spend details to analyze...</div>)}</div></div></div></div>)}
            {showExportModal && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowExportModal(false)}></div><div className="relative bg-[var(--surface)] border border-[var(--accent)] w-full max-w-sm shadow-2xl p-6 rounded-xl"><button onClick={() => setShowExportModal(false)} className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--accent)]"><X className="w-5 h-5" /></button><div className="flex items-center gap-2 mb-6"><FileSpreadsheet className="w-5 h-5 text-[var(--accent)]" /><h2 className="font-serif text-xl text-[var(--accent)] tracking-wide">Export Report</h2></div><div className="space-y-4"><div><label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2 block">Start Date</label><input type="date" value={exportDateRange.start} onChange={(e) => setExportDateRange({ ...exportDateRange, start: e.target.value })} className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" /></div><div><label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2 block">End Date</label><input type="date" value={exportDateRange.end} onChange={(e) => setExportDateRange({ ...exportDateRange, end: e.target.value })} className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" /></div><button onClick={handleExport} className="w-full mt-2 copper-gradient text-white font-bold tracking-widest uppercase py-3 hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2 rounded"><Download className="w-4 h-4" /> Generate Excel</button></div></div></div>)}
            {showSpendModal && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowSpendModal(false)}></div><div className="relative bg-[var(--surface)] border border-[var(--accent)] w-full max-w-sm shadow-2xl p-6 animate-in zoom-in duration-200 rounded-xl"><button onClick={() => setShowSpendModal(false)} className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--accent)]"><X className="w-5 h-5" /></button><div className="flex items-center gap-2 mb-2"><Wallet className="w-5 h-5 text-[var(--accent)]" /><h2 className="font-serif text-xl text-[var(--accent)] tracking-wide">Log Transaction</h2></div><p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest mb-6 pb-2 border-b border-[var(--border)]">{selectedCardForSpend?.name}</p><form onSubmit={handleLogSpend} className="space-y-6"><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Date</label><input type="date" required className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" value={spendForm.date} onChange={(e) => setSpendForm({ ...spendForm, date: e.target.value })} /></div><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Description</label><input type="text" placeholder="e.g. Flight to Mumbai" className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" value={spendForm.description} onChange={(e) => setSpendForm({ ...spendForm, description: e.target.value })} /></div><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Amount Spent</label><div className="relative"><span className="absolute left-4 top-3 text-[var(--text-primary)] text-sm font-serif">₹</span><input type="number" required placeholder="0" className="w-full pl-8 pr-4 py-3 text-[var(--text-primary)] text-lg font-serif input-engraved rounded" value={spendForm.amount} onChange={(e) => setSpendForm({ ...spendForm, amount: e.target.value })} /></div></div><div className="pt-2"><button type="submit" className="w-full copper-gradient text-white font-bold tracking-widest uppercase py-3 hover:opacity-90 transition-opacity shadow-lg rounded">Confirm Log</button></div></form></div></div>)}
            {showModal && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowModal(false)}></div><div className="relative bg-[var(--surface)] border border-[var(--accent)] w-full max-w-md shadow-2xl p-8 max-h-[90vh] overflow-y-auto rounded-xl"><button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--accent)]"><X className="w-5 h-5" /></button><h2 className="font-serif text-2xl text-[var(--accent)] mb-2 tracking-wide">{isEditing ? 'Configure Asset' : 'Acquire Asset'}</h2><p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest mb-8 border-b border-[var(--border)] pb-4">{isEditing ? 'Update Card Details' : 'Enter Card Details'}</p><form onSubmit={handleSubmit} className="space-y-6"><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Bank Name</label><input type="text" required placeholder="e.g. Axis Bank" className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" value={formData.bank} onChange={(e) => setFormData({ ...formData, bank: e.target.value })} /></div><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Card Name</label><input type="text" required placeholder="e.g. Magnus" className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div><div className="grid grid-cols-2 gap-6"><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Network</label><select className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" value={formData.network} onChange={(e) => setFormData({ ...formData, network: e.target.value })}><option>Visa</option><option>Mastercard</option><option>Amex</option><option>Rupay</option></select></div><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Tier/Variant</label><input type="text" placeholder="e.g. Infinite" className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" value={formData.tier} onChange={(e) => setFormData({ ...formData, tier: e.target.value })} /></div></div><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Theme Accent</label><div className="flex gap-3">{['#e5c175', '#3b82f6', '#a855f7', '#ef4444', '#10b981', '#f97316'].map(color => (<button type="button" key={color} onClick={() => setFormData({ ...formData, colorAccent: color })} className={`w-8 h-8 rounded-full border-2 transition-all ${formData.colorAccent === color ? 'border-white scale-110' : 'border-transparent'}`} style={{ backgroundColor: color }} />))}</div></div><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Bill Generation Date (Day)</label><input type="number" min="1" max="31" placeholder="e.g. 15" className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" value={formData.billDate} onChange={(e) => setFormData({ ...formData, billDate: e.target.value })} /></div><div className="bg-[var(--surface-hover)] p-4 border border-[var(--border)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] rounded"><div className="flex justify-between items-center mb-3"><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Annual Fee</label><div className="flex items-center gap-3"><input type="checkbox" id="ltf-toggle" checked={formData.isLtf} onChange={(e) => setFormData({ ...formData, isLtf: e.target.checked })} className="w-4 h-4 rounded-none border border-[var(--accent)] bg-[var(--surface)] checked:bg-[var(--accent)] appearance-none cursor-pointer" /><label htmlFor="ltf-toggle" className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest cursor-pointer select-none">Lifetime Free</label></div></div><div className="relative"><span className={`absolute left-3 top-3 text-sm ${formData.isLtf ? 'text-[var(--text-muted)]' : 'text-[var(--text-secondary)]'}`}>₹</span><input type="number" placeholder={formData.isLtf ? "WAIVED" : "4999"} disabled={formData.isLtf} className={`w-full bg-[var(--surface)] border-b border-[var(--border)] pl-8 pr-3 py-2 text-[var(--text-primary)] text-sm focus:border-[var(--accent)] focus:outline-none transition-opacity rounded ${formData.isLtf ? 'opacity-30 cursor-not-allowed' : ''}`} value={formData.isLtf ? '' : formData.fee} onChange={(e) => setFormData({ ...formData, fee: e.target.value })} /></div></div><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Credit Limit (₹)</label><input type="number" placeholder="500000" className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" value={formData.creditLimit} onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })} /></div><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Value Per Point (₹)</label><input type="number" step="0.01" placeholder="0.25" className="w-full px-4 py-3 text-[var(--text-primary)] text-sm input-engraved rounded" value={formData.valuePerPoint} onChange={(e) => setFormData({ ...formData, valuePerPoint: e.target.value })} /></div><div><label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Milestone Tracking (₹)</label><div className="grid grid-cols-2 gap-4"><div className="relative"><span className="absolute left-2 top-2.5 text-xs text-[var(--text-muted)]">Target</span><input type="number" placeholder="100000" className="w-full pl-2 pr-2 pt-6 pb-2 text-[var(--text-primary)] text-sm input-engraved rounded" value={formData.milestoneTarget} onChange={(e) => setFormData({ ...formData, milestoneTarget: e.target.value })} /></div><div className="relative"><span className="absolute left-2 top-2.5 text-xs text-[var(--text-muted)]">Current</span><input type="number" placeholder="0" className="w-full pl-2 pr-2 pt-6 pb-2 text-[var(--text-primary)] text-sm input-engraved rounded" value={formData.milestoneCurrent} onChange={(e) => setFormData({ ...formData, milestoneCurrent: e.target.value })} /></div></div></div><div className="pt-4"><button type="submit" className="w-full copper-gradient text-white font-bold tracking-widest uppercase py-4 hover:opacity-90 transition-opacity shadow-lg rounded">{isEditing ? 'Update Configuration' : 'Confirm Addition'}</button></div></form></div></div>)}
        </div>
    );
};

export default MyCardsPage;
