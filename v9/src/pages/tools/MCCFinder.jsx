import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Search,
    X,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Copy,
    Flag,
    Lightbulb,
    Verified,
    ShoppingBag,
    Utensils,
    Car,
    Shield
} from 'lucide-react';
import SEO from '../../components/SEO';

const popularSearches = [
    { id: 'amazon', name: 'Amazon', mcc: '5311', logo: <ShoppingBag size={16} />, bgColor: 'bg-orange-500' },
    { id: 'swiggy', name: 'Swiggy', mcc: '5814', logo: <Utensils size={16} />, bgColor: 'bg-orange-600' },
    { id: 'lic', name: 'LIC Insurance', mcc: '6300', logo: <Shield size={16} />, bgColor: 'bg-blue-900' },
    { id: 'uber', name: 'Uber', mcc: '4121', logo: <Car size={16} />, bgColor: 'bg-black' },
];

export default function MCCFinder() {
    const { query: queryParam } = useParams();
    const navigate = useNavigate();

    // Initialize from URL param or default
    const [searchQuery, setSearchQuery] = useState(queryParam ? decodeURIComponent(queryParam) : 'Starbucks');
    const [searchResult, setSearchResult] = useState({
        name: 'Starbucks India',
        verified: true,
        mcc: '5812',
        category: 'Eating Places, Restaurants',
        status: 'safe', // safe, caution, excluded
        rewardMultiplier: '5X',
        recommendedCard: 'Amex Platinum Travel',
    });

    // Update URL when search changes
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const submitSearch = (query) => {
        if (query.trim()) {
            navigate(`/tools/mcc/${encodeURIComponent(query.trim())}`, { replace: true });
            // Simulate search effect if needed, here we just keep static mock result updated if logic existed
        } else {
            navigate('/tools/mcc', { replace: true });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitSearch(searchQuery);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'safe': return 'bg-emerald-500 text-emerald-100';
            case 'caution': return 'bg-amber-500 text-amber-100';
            case 'excluded': return 'bg-red-500 text-red-100';
            default: return 'bg-emerald-500 text-emerald-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'safe': return <CheckCircle2 size={48} />;
            case 'caution': return <AlertTriangle size={48} />;
            case 'excluded': return <XCircle size={48} />;
            default: return <CheckCircle2 size={48} />;
        }
    };

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title={`${searchQuery || 'Merchant'} MCC Code Finder | Check Eligibility`}
                description="Verify merchant eligibility and MCC codes for credit card rewards. Check if your transaction qualifies for points or cashback."
                keywords="mcc code finder, merchant category code, credit card rewards eligibility, amazon mcc, swiggy mcc"
            />

            <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
                {/* Header */}
                <div className="text-center space-y-3 pt-4">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight font-serif" style={{ color: 'var(--text-primary)' }}>
                        Verify Merchant Eligibility
                    </h1>
                    <p className="text-lg max-w-xl mx-auto opacity-90 font-light" style={{ color: 'var(--text-secondary)' }}>
                        Enter a merchant name to instantly reveal the MCC and reward status for your specific card portfolio.
                    </p>
                </div>

                {/* Search Box */}
                <div className="w-full max-w-2xl mx-auto relative z-10 space-y-4">
                    <div className="h-16 flex items-center px-4 rounded-xl border shadow-lg transition-all focus-within:ring-2 focus-within:ring-[var(--accent)]"
                        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
                        <Search className="mr-4 text-[var(--text-muted)]" size={24} />
                        <input
                            autoFocus
                            className="bg-transparent border-none text-lg w-full h-full focus:ring-0 p-0 focus:outline-none"
                            style={{ color: 'var(--text-primary)' }}
                            placeholder="e.g. Amazon India, Paytm Utilities, Starbucks..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {searchQuery && (
                            <button
                                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                onClick={() => { setSearchQuery(''); navigate('/tools/mcc'); }}
                                title="Clear"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Result Card */}
                {searchQuery && searchResult && (
                    <div className="w-full max-w-2xl mx-auto animate-fade-in">
                        <div className="rounded-xl border shadow-xl overflow-hidden relative group"
                            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                            {/* Status bar */}
                            <div className="h-1 w-full bg-gradient-to-r from-emerald-600 to-emerald-400"></div>

                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                                {/* Status Icon */}
                                <div className={`flex-shrink-0 size-24 rounded-full flex items-center justify-center shadow-lg ${getStatusColor(searchResult.status)}`}>
                                    {getStatusIcon(searchResult.status)}
                                </div>

                                {/* Main Content */}
                                <div className="flex-1 min-w-0 pt-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h2 className="text-2xl font-bold truncate font-serif" style={{ color: 'var(--text-primary)' }}>{searchResult.name}</h2>
                                        {searchResult.verified && (
                                            <Verified size={20} className="text-[var(--accent)]" />
                                        )}
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm mb-6">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono px-2 py-0.5 rounded border font-bold"
                                                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                                                {searchResult.mcc}
                                            </span>
                                            <span style={{ color: 'var(--text-secondary)' }}>{searchResult.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-xs font-bold uppercase tracking-wider hover:brightness-110"
                                            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                                            <Copy size={14} />
                                            Copy MCC
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-xs font-bold uppercase tracking-wider hover:bg-[var(--bg-alt)]"
                                            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                                            <Flag size={14} />
                                            Report
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Pro Tip */}
                            <div className="px-6 md:px-8 py-4 border-t flex items-start gap-3"
                                style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
                                <Lightbulb size={20} className="text-[var(--accent)] mt-0.5 shrink-0" />
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="font-bold font-serif" style={{ color: 'var(--text-primary)' }}>Pro Tip:</span> This category qualifies for <span className="font-bold border-b border-dashed cursor-help" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>{searchResult.rewardMultiplier} Reward Points</span>. Use your <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{searchResult.recommendedCard}</span> for maximum returns.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Popular Searches */}
                <div className="w-full max-w-2xl mx-auto pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Popular Searches</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {popularSearches.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { setSearchQuery(item.name); submitSearch(item.name); }}
                                className="flex flex-col items-center justify-center p-4 rounded-xl border transition-all group hover:scale-105"
                                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                            >
                                <div className={`size-10 rounded-full ${item.bgColor} flex items-center justify-center mb-3 text-white shadow-md`}>
                                    {item.logo}
                                </div>
                                <span className="text-sm font-medium font-serif" style={{ color: 'var(--text-primary)' }}>{item.name}</span>
                                <span className="text-[10px] mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>{item.mcc}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
