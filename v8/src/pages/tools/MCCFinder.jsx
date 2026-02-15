import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const popularSearches = [
    { id: 'amazon', name: 'Amazon', mcc: '5311', logo: 'A', bgColor: 'bg-orange-500' },
    { id: 'swiggy', name: 'Swiggy', mcc: '5814', logo: 'S', bgColor: 'bg-orange-600' },
    { id: 'lic', name: 'LIC Insurance', mcc: '6300', logo: 'LIC', bgColor: 'bg-blue-900' },
    { id: 'uber', name: 'Uber', mcc: '4121', logo: 'U', bgColor: 'bg-black' },
];

export default function MCCFinder() {
    const { query: queryParam } = useParams();
    const navigate = useNavigate();

    // Initialize from URL param or default
    const [searchQuery, setSearchQuery] = useState(queryParam ? decodeURIComponent(queryParam) : 'Starbucks');
    const [searchResult] = useState({
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
        if (query.trim()) {
            navigate(`/tools/mcc/${encodeURIComponent(query.trim())}`, { replace: true });
        } else {
            navigate('/tools/mcc', { replace: true });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'safe': return 'from-[#1E5631] to-[#0F2B18]';
            case 'caution': return 'from-amber-600 to-amber-800';
            case 'excluded': return 'from-red-600 to-red-900';
            default: return 'from-[#1E5631] to-[#0F2B18]';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'safe': return 'check_circle';
            case 'caution': return 'warning';
            case 'excluded': return 'cancel';
            default: return 'check_circle';
        }
    };

    return (
        <div className="flex flex-1 overflow-hidden relative">
            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-theme-surface">
                {/* Background gradient */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-theme-surface/40 to-transparent pointer-events-none"></div>

                <div className="flex-1 overflow-y-auto relative">
                    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10 min-h-[calc(100vh-64px)]">
                        {/* Header */}
                        <div className="text-center space-y-3 pt-4">
                            <h1 className="text-3xl md:text-5xl font-bold text-accent tracking-tight font-serif">Verify Merchant Eligibility</h1>
                            <p className="text-warm-white text-lg max-w-xl mx-auto opacity-90 font-light">Enter a merchant name to instantly reveal the MCC and reward status for your specific card portfolio.</p>
                        </div>

                        {/* Search Box */}
                        <div className="w-full max-w-2xl mx-auto relative z-10">
                            <div className="bg-theme-bg border border-copper/50 rounded-lg h-16 flex items-center px-4 shadow-lg transition-all duration-200 focus-within:border-accent focus-within:shadow-[0_0_0_1px_#d4af37]">
                                <span className="material-symbols-outlined text-accent-secondary text-3xl mr-4">search</span>
                                <input
                                    autoFocus
                                    className="bg-transparent border-none text-warm-white text-lg placeholder:text-theme-primary/30 w-full h-full focus:ring-0 p-0"
                                    placeholder="e.g. Amazon India, Paytm Utilities, Starbucks..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        className="text-accent-dim hover:text-theme-primary transition-colors"
                                        onClick={() => handleSearch('')}
                                        title="Clear"
                                    >
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                )}
                            </div>
                            <div className="mt-4 pl-4">
                                <p className="text-sm text-accent-dim">Did you mean: <button className="text-accent font-bold hover:underline font-serif">Starbucks Coffee</button>?</p>
                            </div>
                        </div>

                        {/* Search Result Card */}
                        {searchResult && (
                            <div className="w-full max-w-2xl mx-auto animate-fade-in">
                                <div className="bg-theme-surface rounded-lg border border-copper/30 shadow-xl overflow-hidden relative group">
                                    {/* Status bar - Green for safe */}
                                    <div className="h-1 w-full bg-gradient-to-r from-emerald-700 to-emerald-500 shadow-[0_0_15px_rgba(61,139,77,0.6)]"></div>

                                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                                        {/* Status Icon */}
                                        <div className="flex-shrink-0 relative">
                                            <div className={`size-24 rounded-full bg-gradient-to-br ${getStatusColor(searchResult.status)} flex items-center justify-center border border-copper/20 shadow-lg relative z-10`}>
                                                <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse"></div>
                                                <span className="material-symbols-outlined text-warm-white text-[48px] drop-shadow-lg">{getStatusIcon(searchResult.status)}</span>
                                            </div>
                                            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl animate-pulse z-0"></div>
                                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-theme-bg/95 backdrop-blur px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-emerald-500 border border-copper/30 shadow-lg z-20 whitespace-nowrap">
                                                Safe
                                            </div>
                                        </div>

                                        {/* Main Content */}
                                        <div className="flex-1 min-w-0 pt-2">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-3xl font-bold text-accent truncate font-serif">{searchResult.name}</h2>
                                                {searchResult.verified && (
                                                    <span className="material-symbols-outlined text-accent-dim text-xl" title="Verified Merchant">verified</span>
                                                )}
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm mb-6">
                                                <div className="flex items-center gap-2 text-accent-dim">
                                                    <span className="font-mono text-accent-secondary bg-copper/5 px-2 py-0.5 rounded border border-copper/40 font-bold">{searchResult.mcc}</span>
                                                    <span className="text-warm-white">{searchResult.category}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button className="flex items-center gap-2 px-5 py-2.5 rounded border border-copper text-accent-secondary hover:bg-copper hover:text-theme-primary transition-all text-xs font-bold uppercase tracking-wider">
                                                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                                    Copy MCC
                                                </button>
                                                <button className="flex items-center gap-2 px-5 py-2.5 rounded border border-white/20 text-accent-dim hover:text-theme-primary hover:border-white/40 hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider">
                                                    <span className="material-symbols-outlined text-[16px]">flag</span>
                                                    Report Issue
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pro Tip */}
                                    <div className="bg-theme-bg/40 px-6 md:px-8 py-4 border-t border-copper/20 flex items-start gap-3">
                                        <span className="material-symbols-outlined text-accent text-xl mt-0.5">tips_and_updates</span>
                                        <p className="text-sm text-theme-primary/90 leading-relaxed">
                                            <span className="text-accent font-bold font-serif">Pro Tip:</span> This category qualifies for <span className="text-theme-primary font-bold border-b border-dashed border-white/40 cursor-help" title="Based on your Amex Platinum">{searchResult.rewardMultiplier} Reward Points</span> on your current card portfolio. Use your <span className="text-theme-primary font-bold">{searchResult.recommendedCard}</span> for maximum returns.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Popular Searches */}
                        <div className="w-full max-w-2xl mx-auto pt-8 border-t border-white/5">
                            <h3 className="text-accent-dim text-xs font-bold uppercase tracking-widest mb-4">Popular Searches</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {popularSearches.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSearchQuery(item.name)}
                                        className="flex flex-col items-center justify-center p-4 rounded bg-theme-surface border border-copper/30 hover:border-accent hover:bg-theme-surface/80 transition-all group"
                                    >
                                        <div className={`size-10 rounded-full ${item.bgColor} flex items-center justify-center mb-3 overflow-hidden shadow-md`}>
                                            <span className="font-bold text-theme-primary text-xs">{item.logo}</span>
                                        </div>
                                        <span className="text-sm font-medium text-warm-white group-hover:text-accent font-serif">{item.name}</span>
                                        <span className="text-[10px] text-accent-dim mt-1 font-mono">{item.mcc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
