import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users, Check, X, Shield, Star, Landmark, Wallet, Plane, Globe, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { bankingData } from '../data/banking';

// Helper to flatten tiers from banking data for easy lookup
const getTierById = (id) => {
    for (const bank of bankingData) {
        if (bank.tiers) {
            const tier = bank.tiers.find(t => t.id === id);
            if (tier) return { ...tier, bankName: bank.name, bankTheme: bank.theme || '#333' };
        }
    }
    return null;
};

export default function BankingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tier, setTier] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // Simulate fetch delay
        setTimeout(() => {
            const data = getTierById(id) || getTierById('hdfc-imperia'); // Fallback for safety
            setTier(data);
            setIsLoading(false);
        }, 300);
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]"></div>
            </div>
        );
    }

    if (!tier) return <div className="min-h-screen flex items-center justify-center text-[var(--text-primary)]">Tier not found</div>;

    const bankColor = tier.bankTheme || 'var(--accent)';

    return (
        <div className="min-h-screen pb-20 bg-[var(--bg)]">
            <SEO title={`${tier.name} - ${tier.bankName} | Eligibility & Benefits`} description={`Detailed review of ${tier.name} from ${tier.bankName}. Check eligibility criteria, lounge access, wealth benefits, and family banking features.`} />

            {/* Header / Hero */}
            <div className="relative bg-[var(--bg-alt)] border-b border-[var(--border)] pt-12 pb-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <button
                        onClick={() => navigate('/banking')}
                        className="mb-8 flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Banking Tiers
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="h-24 w-24 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shrink-0"
                            style={{ backgroundColor: bankColor }}>
                            <Landmark size={40} />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[var(--text-secondary)] font-medium text-sm">{tier.bankName}</span>
                                {tier.type === 'Wealth' && (
                                    <span className="px-2 py-0.5 rounded border border-[var(--accent)] text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest">
                                        Wealth
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[var(--text-primary)] mb-4">
                                {tier.name}
                            </h1>
                            <p className="text-lg text-[var(--text-primary)] opacity-80 max-w-2xl leading-relaxed">
                                {tier.metadata?.bestFor || 'Exclusive banking privileges designed for the elite.'}
                                <br />
                                <span className="text-sm mt-2 block text-[var(--text-secondary)]">{tier.description}</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[var(--accent)]/20">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-lg flex flex-col justify-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                            <Wallet size={14} /> Monthly Balance (AMB)
                        </span>
                        <span className="text-2xl font-bold text-[var(--text-primary)]">
                            {tier.eligibility?.amb ? `₹${(tier.eligibility.amb / 100000).toFixed(1)} Lakhs` : 'N/A'}
                        </span>
                    </div>
                    <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-lg flex flex-col justify-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                            <Shield size={14} /> Total Relationship (TRV)
                        </span>
                        <span className="text-2xl font-bold text-[var(--text-primary)]">
                            {tier.eligibility?.nrv ? `₹${(tier.eligibility.nrv / 100000).toFixed(1)} Lakhs` : 'N/A'}
                        </span>
                    </div>
                    <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-lg flex flex-col justify-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                            <Users size={14} /> Family Grouping
                        </span>
                        <span className="text-2xl font-bold text-[var(--text-primary)]">
                            {tier.eligibility?.familyGrouping ? 'Allowed' : 'Not Specified'}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Highlights */}
                        <section>
                            <h2 className="text-xl font-serif font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                                <Star size={20} className="text-[var(--accent)]" /> Key Highlights
                            </h2>
                            <ul className="space-y-4">
                                {tier.benefits?.features?.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-[var(--accent)]" />
                                        </div>
                                        <span className="text-[var(--text-secondary)] leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Travel & Lifestyle */}
                        <section>
                            <h2 className="text-xl font-serif font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                                <Plane size={20} className="text-[var(--accent)]" /> Travel & Lifestyle
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[var(--surface)] p-5 rounded-lg border border-[var(--border)]">
                                    <h4 className="font-bold text-[var(--text-primary)] mb-2 text-sm uppercase tracking-wide">Lounge Access</h4>
                                    <p className="text-sm text-[var(--text-secondary)] mb-1"><strong>Domestic:</strong> {tier.benefits?.lounge?.domestic || 'N/A'}</p>
                                    <p className="text-sm text-[var(--text-secondary)]"><strong>International:</strong> {tier.benefits?.lounge?.international || 'N/A'}</p>
                                </div>
                                <div className="bg-[var(--surface)] p-5 rounded-lg border border-[var(--border)]">
                                    <h4 className="font-bold text-[var(--text-primary)] mb-2 text-sm uppercase tracking-wide">Forex Benefits</h4>
                                    <p className="text-sm text-[var(--text-secondary)]">{tier.benefits?.forex?.text || 'Standard rates apply'}</p>
                                </div>
                            </div>
                        </section>

                        {/* Charges */}
                        {tier.charges && (
                            <section>
                                <h2 className="text-xl font-serif font-bold text-[var(--text-primary)] mb-6">Charges & Fees</h2>
                                <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-[var(--bg-alt)] text-[var(--text-secondary)] uppercase text-xs font-bold tracking-wider">
                                            <tr>
                                                <th className="px-6 py-4">Type</th>
                                                <th className="px-6 py-4">Charge</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
                                            {tier.charges.nonMaintenance && (
                                                <tr>
                                                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">Non-Maintenance Penalty</td>
                                                    <td className="px-6 py-4 text-[var(--text-secondary)]">{tier.charges.nonMaintenance}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar / Eligibility Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-xl">
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Detailed Criteria</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Savings Account Balance</p>
                                        <p className="text-[var(--text-primary)] font-medium">
                                            {tier.eligibility?.amb ? `Average Monthly Balance of ₹${(tier.eligibility.amb).toLocaleString()}` : '-'}
                                        </p>
                                    </div>
                                    <div className="w-full h-px bg-[var(--border)]"></div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Net Salary Credit</p>
                                        <p className="text-[var(--text-primary)] font-medium">
                                            {tier.eligibility?.salary ? `> ₹${(tier.eligibility.salary / 100000).toFixed(1)} Lakhs / month` : "Not applicable"}
                                        </p>
                                    </div>
                                    <div className="w-full h-px bg-[var(--border)]"></div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Fixed Deposits</p>
                                        <p className="text-[var(--text-primary)] font-medium">
                                            {tier.eligibility?.fixedDeposit ? `min ₹${(tier.eligibility.fixedDeposit / 100000).toFixed(1)} Lakhs` : "Check bank terms"}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-[var(--border)]">
                                    <p className="text-xs text-[var(--text-secondary)] italic">
                                        *Criteria is subject to change by the bank. Please verify with official bank documentation.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[var(--accent)] rounded-xl p-6 text-[var(--bg)] shadow-lg relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="font-serif font-bold text-xl mb-2">Need Help Upgrading?</h3>
                                    <p className="opacity-90 text-sm mb-4">Use our Banking Optimizer tool to see if you qualify for an upgrade based on your current portfolio.</p>
                                    <button className="w-full py-3 bg-white text-[var(--accent)] font-bold rounded-lg uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors">
                                        Check Eligibility
                                    </button>
                                </div>
                                <Globe className="absolute -bottom-4 -right-4 size-32 opacity-10 rotate-12" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
