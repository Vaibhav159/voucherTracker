import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    X,
    ChevronRight,
    Search,
    Bell,
    Check,
    Share2,
    Landmark,
    Gem,
    TrendingUp,
    ShieldCheck,
    Coffee,
    Plane,
    Plus
} from 'lucide-react';
import SEO from '../components/SEO';

// Available banks for comparison
const availableBanks = [
    { id: 'hdfc-imperia', name: 'HDFC Imperia', shortName: 'HDFC', tier: 'Private Banking', gradient: 'from-[#004C8F] to-[#003366]' },
    { id: 'axis-burgundy', name: 'Axis Burgundy', shortName: 'AXIS', tier: 'Priority Banking', gradient: 'from-[#97144D] to-[#6D0F38]' },
    { id: 'icici-wealth', name: 'ICICI Wealth', shortName: 'ICICI', tier: 'Wealth Management', gradient: 'from-[#B02A30] to-[#7A1D22]' },
    { id: 'kotak-privy', name: 'Kotak Privy League', shortName: 'KOTAK', tier: 'Premium Banking', gradient: 'from-[#ED1C24] to-[#A31419]' },
    { id: 'sbi-exclusive', name: 'SBI Exclusive', shortName: 'SBI', tier: 'Exclusive Banking', gradient: 'from-[#22409A] to-[#172B6B]' },
];

const compareData = {
    accounts: {
        title: 'Account Features',
        icon: <Landmark size={18} />,
        rows: [
            { metric: 'Savings Rate', bank1: '3.50%', bank2: '4.00%', bank2Best: true },
            { metric: 'Min Balance', bank1: '₹ 25,000', bank2: '₹ 10,000', bank2Best: true },
            { metric: 'Debit Card', bank1: 'Infinia Metal', bank2: 'Burgundy' },
            { metric: 'Account Type', bank1: 'Imperia', bank2: 'Burgundy' },
        ],
    },
    benefits: {
        title: 'Premium Benefits',
        icon: <Gem size={18} />,
        rows: [
            { metric: 'AMC Debit Card', bank1: 'Waived', bank2: '₹ 999', bank1Best: true },
            { metric: 'Forex Markup', bank1: '1.75%', bank2: '2.00%', bank1Best: true, highlight: true },
            { metric: 'Free NEFT/RTGS', bank1: 'Unlimited', bank2: 'Unlimited' },
            { metric: 'DD/Cheque Free', bank1: '25 / Month', bank2: '10 / Month', bank1Best: true },
            { metric: 'Locker Discount', bank1: '50%', bank2: '25%', bank1Best: true },
        ],
    },
    services: {
        title: 'Digital Services',
        icon: <TrendingUp size={18} />,
        rows: [
            { metric: 'Mobile App Rating', bank1: '4.4 ★', bank2: '4.2 ★', bank1Best: true },
            { metric: 'UPI Limit', bank1: '₹ 2 Lakh', bank2: '₹ 1 Lakh', bank1Best: true },
            { metric: 'Virtual Debit Card', bank1: 'Yes', bank2: 'Yes' },
            { metric: 'Instant FD', bank1: 'Yes', bank2: 'Yes' },
        ],
    },
    wealth: {
        title: 'Wealth Management',
        icon: <ShieldCheck size={18} />,
        rows: [
            { metric: 'RM Service', bank1: 'Dedicated', bank2: 'Dedicated', copper: true },
            { metric: 'Investment Products', bank1: 'Full Suite', bank2: 'Full Suite' },
            { metric: 'FD Rate (1 Year)', bank1: '7.10%', bank2: '7.25%', bank2Best: true, highlight: true },
            { metric: 'NRI Services', bank1: 'Comprehensive', bank2: 'Basic', bank1Best: true },
        ],
    },
    lifestyle: {
        title: 'Lifestyle Perks',
        icon: <Coffee size={18} />,
        rows: [
            { metric: 'Golf Access', bank1: '4 Games / Month', bank2: '2 Games / Month', bank1Best: true },
            { metric: 'Airport Lounge', bank1: '8 / Year', bank2: '4 / Year', bank1Best: true },
            { metric: 'Concierge', bank1: '24/7', bank2: 'Business Hrs' },
            { metric: 'Movie Offers', bank1: 'B1G1 PVR', bank2: 'B1G1 INOX' },
        ],
    },
};

export default function CompareBanking() {
    const { bank1: bank1Param, bank2: bank2Param } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    // Find banks from URL params or use defaults
    const selectedBank1 = availableBanks.find(b => b.id === bank1Param) || availableBanks[0];
    const selectedBank2 = availableBanks.find(b => b.id === bank2Param) || availableBanks[1];

    // Update URL when banks change
    // const updateUrl = (newBank1Id, newBank2Id) => {
    //     navigate(`/banking/compare/${newBank1Id}/${newBank2Id}`, { replace: true });
    // };

    // Copy shareable link
    const copyShareLink = () => {
        const url = `${window.location.origin}/banking/compare/${selectedBank1.id}/${selectedBank2.id}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title={`Compare ${selectedBank1.name} vs ${selectedBank2.name} | Banking Tiers`}
                description={`Detailed comparison between ${selectedBank1.name} and ${selectedBank2.name} banking privileges, including wealth management, cards, and lifestyle benefits.`}
                keywords={`${selectedBank1.name}, ${selectedBank2.name}, compare banking, wealth management comparison`}
            />

            {/* Header */}
            <header className="sticky top-0 z-40 border-b backdrop-blur-md" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-50)' }}>
                <div className="max-w-[1500px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
                    <div className="hidden lg:flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span className="cursor-pointer hover:text-[var(--accent)]" onClick={() => navigate('/')}>Home</span>
                        <ChevronRight size={12} />
                        <span className="cursor-pointer hover:text-[var(--accent)]" onClick={() => navigate('/banking')}>Banking</span>
                        <ChevronRight size={12} />
                        <span style={{ color: 'var(--text-primary)' }}>Compare</span>
                    </div>

                    <div className="flex-1 max-w-md mx-auto relative group">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors" />
                        <input
                            className="block w-full py-2 pl-9 pr-3 text-sm rounded-lg border focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all"
                            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                            placeholder="Search banks or features..."
                            type="text"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={copyShareLink}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors text-xs font-bold uppercase tracking-wider ${copied ? 'border-green-500 text-green-500' : 'border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                            style={{ backgroundColor: copied ? 'rgba(34, 197, 94, 0.1)' : 'var(--surface)' }}
                        >
                            {copied ? <Check size={14} /> : <Share2 size={14} />}
                            {copied ? 'Copied' : 'Share'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-[1500px] mx-auto">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-serif font-bold tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Bank Comparison</h1>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Compare premium banking accounts and their privileges.</p>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="w-full overflow-hidden rounded-xl border shadow-xl" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                        <div className="overflow-x-auto">
                            <div className="min-w-[900px] grid grid-cols-[220px_1fr_1fr_1fr]">
                                {/* Header Row */}
                                <div className="sticky top-0 z-30 border-b p-4 flex flex-col justify-end" style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
                                    <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--text-muted)' }}>Metrics</span>
                                </div>

                                {/* Bank 1 Header */}
                                <div className="sticky top-0 z-30 border-b border-l p-6 flex flex-col items-center gap-4 relative" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                    <div className={`relative w-16 h-16 rounded-full shadow-lg bg-gradient-to-br ${selectedBank1.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                                        {selectedBank1.shortName}
                                    </div>
                                    <div className="text-center w-full">
                                        <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>{selectedBank1.name}</h3>
                                        <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: 'var(--text-secondary)' }}>{selectedBank1.tier}</p>
                                    </div>
                                    <button className="w-full max-w-[140px] py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all hover:scale-105" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}>
                                        Open Account
                                    </button>
                                </div>

                                {/* Bank 2 Header */}
                                <div className="sticky top-0 z-30 border-b border-l p-6 flex flex-col items-center gap-4 relative" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                    <div className={`relative w-16 h-16 rounded-full shadow-lg bg-gradient-to-br ${selectedBank2.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                                        {selectedBank2.shortName}
                                    </div>
                                    <div className="text-center w-full">
                                        <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>{selectedBank2.name}</h3>
                                        <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: 'var(--text-secondary)' }}>{selectedBank2.tier}</p>
                                    </div>
                                    <button className="w-full max-w-[140px] py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all hover:scale-105" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}>
                                        Open Account
                                    </button>
                                </div>

                                {/* Add Bank Column */}
                                <div className="sticky top-0 z-30 border-b border-l p-4 flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
                                    <div className="flex flex-col items-center justify-center gap-3 w-full h-full rounded-xl border border-dashed transition-all cursor-pointer hover:bg-[var(--surface)] py-4" style={{ borderColor: 'var(--border)' }}>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-secondary)' }}>
                                            <Plus size={20} />
                                        </div>
                                        <span className="text-xs font-bold text-[var(--text-secondary)]">Add Bank</span>
                                    </div>
                                </div>

                                {/* Data Sections */}
                                {Object.entries(compareData).map(([key, section]) => (
                                    <>
                                        {/* Section Header */}
                                        <div key={`${key}-header`} className="col-span-full px-4 py-3 border-b flex items-center gap-2 mt-4" style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
                                            <span style={{ color: 'var(--accent)' }}>{section.icon}</span>
                                            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>{section.title}</h4>
                                        </div>

                                        {/* Data Rows */}
                                        {section.rows.map((row, idx) => (
                                            <>
                                                <div key={`${key}-${idx}-metric`} className="px-4 py-4 border-b text-xs font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                                                    {row.metric}
                                                </div>
                                                <div key={`${key}-${idx}-bank1`} className="px-4 py-4 border-b border-l text-center relative" style={{ borderColor: 'var(--border)' }}>
                                                    {row.bank1Best && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded absolute top-2 right-2 border" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>BEST</span>}
                                                    <div className={`text-sm ${row.highlight ? 'font-bold' : ''}`} style={{ color: row.highlight ? 'var(--accent)' : 'var(--text-primary)' }}>{row.bank1}</div>
                                                </div>
                                                <div key={`${key}-${idx}-bank2`} className="px-4 py-4 border-b border-l text-center relative" style={{ borderColor: 'var(--border)' }}>
                                                    {row.bank2Best && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded absolute top-2 right-2 border" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>BEST</span>}
                                                    <div className={`text-sm ${row.highlight ? 'font-bold' : ''}`} style={{ color: row.highlight ? 'var(--accent)' : 'var(--text-primary)' }}>{row.bank2}</div>
                                                </div>
                                                <div key={`${key}-${idx}-empty`} className="px-4 py-4 border-b border-l text-center text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>-</div>
                                            </>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] text-center mt-6" style={{ color: 'var(--text-muted)' }}>
                        *Features, rates, and eligibility criteria are subject to change by the bank. CardPerks is not affiliated with these banks. Data updated Jan 2024.
                    </p>
                </div>
            </main>
        </div>
    );
}
