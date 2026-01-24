import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const lounges = [
    {
        id: 1,
        name: '080 Domestic Lounge',
        airport: 'BLR',
        airportName: 'Kempegowda International',
        terminal: 'Terminal 1, Departure',
        hours: 'Open 24 Hours',
        guests: 'Cardholder + 1',
        status: 'unlocked',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600',
    },
    {
        id: 2,
        name: 'Adani Lounge East Wing',
        airport: 'BOM',
        airportName: 'Chhatrapati Shivaji Maharaj',
        terminal: 'Terminal 2, International',
        hours: '04:00 - 02:00 Daily',
        guests: 'Cardholder Only',
        status: 'criteria',
        requirement: 'Spend ₹35k/quarter',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600',
    },
    {
        id: 3,
        name: 'Encalm Privé',
        airport: 'DEL',
        airportName: 'Indira Gandhi International',
        terminal: 'Terminal 3, Domestic',
        hours: 'Premium Bar Access',
        guests: 'Cardholder + 1',
        status: 'unlocked',
        image: 'https://images.unsplash.com/photo-1553619551-d4e1a8b9cc87?w=600',
    },
    {
        id: 4,
        name: 'Travel Club Lounge',
        airport: 'MAA',
        airportName: 'Chennai International',
        terminal: 'Terminal 2, Domestic',
        hours: 'Spa Services',
        guests: 'Cardholder + 1',
        status: 'unlocked',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600',
    },
];

const airports = [
    { code: 'BLR', name: 'Bengaluru - Kempegowda International' },
    { code: 'BOM', name: 'Mumbai - Chhatrapati Shivaji Maharaj' },
    { code: 'DEL', name: 'Delhi - Indira Gandhi International' },
    { code: 'MAA', name: 'Chennai - Chennai International' },
    { code: 'HYD', name: 'Hyderabad - Rajiv Gandhi International' },
    { code: 'CCU', name: 'Kolkata - Netaji Subhas Chandra Bose' },
];

const cards = [
    { id: 1, name: 'HDFC Infinia Credit Card Metal Edition', bank: 'HDFC', network: 'Visa Infinite', ending: '8892' },
    { id: 2, name: 'Axis Magnus Burgundy', bank: 'Axis', network: 'Visa Signature', ending: '4092' },
    { id: 3, name: 'Amex Platinum Charge', bank: 'Amex', network: 'American Express', ending: '1005' },
];

export default function LoungeAccess() {
    const { mode: modeParam, selection: selectionParam } = useParams();
    const navigate = useNavigate();

    // Initialize from URL params
    const initialMode = modeParam === 'airport' ? 'airport' : 'card';
    const initialCard = selectionParam
        ? cards.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === selectionParam) || cards[0]
        : cards[0];
    const initialAirport = modeParam === 'airport' && selectionParam
        ? airports.find(a => a.code.toLowerCase() === selectionParam.toLowerCase())
        : null;

    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState(initialMode);
    const [selectedCard, setSelectedCard] = useState(initialCard);
    const [selectedAirport, setSelectedAirport] = useState(initialAirport);
    const [loungeType, setLoungeType] = useState('domestic');

    // Update URL when state changes
    const updateUrl = (mode, selection) => {
        if (selection) {
            navigate(`/tools/lounge/${mode}/${selection}`, { replace: true });
        } else {
            navigate(`/tools/lounge/${mode}`, { replace: true });
        }
    };

    const handleModeChange = (newMode) => {
        setFilterType(newMode);
        setSearchQuery('');
        if (newMode === 'card') {
            setSelectedAirport(null);
            updateUrl('card', selectedCard.name.toLowerCase().replace(/\s+/g, '-'));
        } else {
            updateUrl('airport', selectedAirport?.code?.toLowerCase() || '');
        }
    };

    // Filter lounges based on mode
    const filteredLounges = filterType === 'airport' && selectedAirport
        ? lounges.filter(l => l.airport === selectedAirport.code)
        : lounges;

    const placeholder = filterType === 'card'
        ? "Search for your credit card (e.g. HDFC Infinia, Amex Platinum)..."
        : "Search for an airport (e.g. BLR, DEL, Mumbai)...";

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (filterType === 'airport') {
            const found = airports.find(a =>
                a.code.toLowerCase().includes(query.toLowerCase()) ||
                a.name.toLowerCase().includes(query.toLowerCase())
            );
            setSelectedAirport(found || null);
            if (found) {
                updateUrl('airport', found.code.toLowerCase());
            }
        }
    };

    return (
        <div className="flex flex-1 overflow-hidden relative bg-theme-surface">
            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="flex-1 overflow-y-auto px-6 pb-10 hide-scrollbar">
                    <div className="max-w-6xl mx-auto flex flex-col gap-8 mt-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div className="flex flex-col gap-2 max-w-xl">
                                <h2 className="text-4xl md:text-5xl font-black text-accent leading-tight tracking-tight">
                                    Airport Lounge <br /><span className="text-theme-primary">Access Finder</span>
                                </h2>
                                <p className="text-accent-dim text-lg mt-2">Discover your complimentary lounge privileges worldwide. Exclusive to your premium card portfolio.</p>
                            </div>
                            <div className="bg-theme-bg p-1.5 rounded-full border border-theme-border flex relative">
                                <button
                                    onClick={() => handleModeChange('card')}
                                    className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all ${filterType === 'card' ? 'bg-accent text-theme-primary shadow-[0_0_15px_rgba(205,160,45,0.1)]' : 'text-accent-secondary hover:text-theme-primary'}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">credit_card</span>
                                    Check by Card
                                </button>
                                <button
                                    onClick={() => handleModeChange('airport')}
                                    className={`px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all ${filterType === 'airport' ? 'bg-accent text-theme-primary shadow-[0_0_15px_rgba(205,160,45,0.1)]' : 'text-accent-secondary hover:text-theme-primary'}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    Check by Airport
                                </button>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="w-full relative group z-20">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-accent text-3xl group-focus-within:text-theme-primary transition-colors">
                                    {filterType === 'card' ? 'search' : 'flight'}
                                </span>
                            </div>
                            <input
                                className="w-full bg-theme-bg border border-theme-border text-theme-primary text-xl md:text-2xl placeholder:text-theme-muted rounded-2xl py-6 pl-16 pr-6 focus:ring-2 focus:ring-accent focus:border-accent outline-none shadow-xl transition-all font-light"
                                placeholder={placeholder}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2">
                                <span className="text-xs text-accent-secondary uppercase tracking-widest font-bold px-2">
                                    {filterType === 'card' ? 'Card Selected' : 'Airport Selected'}
                                </span>
                            </div>
                        </div>

                        {/* Card Mode: Selected Card Display */}
                        {filterType === 'card' && (
                            <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-theme-bg to-theme-bg/30 border border-theme-border">
                                <div className="relative w-32 h-20 md:w-48 md:h-28 rounded-xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-600 overflow-hidden">
                                        <div className="p-3 md:p-4 flex flex-col justify-between h-full">
                                            <div className="flex justify-between items-start">
                                                <div className="h-4 w-8 bg-gray-400/50 rounded"></div>
                                                <span className="text-[10px] md:text-xs text-theme-secondary font-mono">INFINIA</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-10 bg-orange-500/80 rounded-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl md:text-2xl font-bold text-theme-primary">{selectedCard.name}</h3>
                                        <span className="material-symbols-outlined text-accent text-xl" title="Verified Card">verified</span>
                                    </div>
                                    <p className="text-accent-secondary text-sm">{selectedCard.network} • Ends in {selectedCard.ending}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-medium">
                                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                            Unlimited Access
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-medium">
                                            <span className="material-symbols-outlined text-[14px]">group_add</span>
                                            +1 Guest Allowed
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Airport Mode: Selected Airport Display */}
                        {filterType === 'airport' && (
                            <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-theme-bg to-theme-bg/30 border border-theme-border">
                                <div className="flex h-20 w-20 md:h-28 md:w-28 items-center justify-center rounded-xl bg-theme-surface border border-theme-border">
                                    <span className="material-symbols-outlined text-accent text-4xl md:text-5xl">flight_takeoff</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {selectedAirport ? (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl md:text-2xl font-bold text-theme-primary">{selectedAirport.code}</h3>
                                                <span className="material-symbols-outlined text-emerald-400 text-xl">check_circle</span>
                                            </div>
                                            <p className="text-accent-secondary text-sm">{selectedAirport.name}</p>
                                            <p className="text-accent-dim text-xs mt-2">
                                                {filteredLounges.length} lounge{filteredLounges.length !== 1 ? 's' : ''} available at this airport
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="text-xl md:text-2xl font-bold text-theme-primary/50">Select an Airport</h3>
                                            <p className="text-accent-secondary text-sm">Search above or select from popular airports below</p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {airports.slice(0, 4).map(airport => (
                                                    <button
                                                        key={airport.code}
                                                        onClick={() => { setSelectedAirport(airport); setSearchQuery(airport.code); }}
                                                        className="px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-border text-accent text-xs font-bold hover:border-accent/50 transition-colors"
                                                    >
                                                        {airport.code}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Lounges Header */}
                        <div className="flex items-center gap-4">
                            <h4 className="text-lg font-bold text-accent whitespace-nowrap">
                                {filterType === 'airport' && selectedAirport
                                    ? `Lounges at ${selectedAirport.code}`
                                    : 'Eligible Lounges'}
                            </h4>
                            <div className="h-[1px] w-full bg-theme-border"></div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setLoungeType('domestic')}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${loungeType === 'domestic'
                                        ? 'bg-accent text-theme-primary shadow-[0_0_10px_rgba(205,160,45,0.3)]'
                                        : 'bg-transparent text-accent-dim border border-theme-border hover:border-accent/50'}`}
                                >
                                    Domestic
                                </button>
                                <button
                                    onClick={() => setLoungeType('international')}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${loungeType === 'international'
                                        ? 'bg-accent text-theme-primary shadow-[0_0_10px_rgba(205,160,45,0.3)]'
                                        : 'bg-transparent text-accent-dim border border-theme-border hover:border-accent/50'}`}
                                >
                                    International
                                </button>
                            </div>
                        </div>

                        {/* Lounge Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                            {filteredLounges.length > 0 ? (
                                filteredLounges.map((lounge) => (
                                    <div
                                        key={lounge.id}
                                        className={`group bg-theme-surface rounded-xl overflow-hidden border border-theme-border hover:border-${lounge.status === 'criteria' ? 'amber-500' : 'gold-400'}/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(205,160,45,0.1)] hover:-translate-y-1 relative`}
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 w-full overflow-hidden bg-theme-border">
                                            <div className="absolute inset-0 bg-gradient-to-br from-theme-surface to-theme-surface flex items-center justify-center">
                                                <span className="material-symbols-outlined text-6xl text-theme-muted">chair</span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-transparent to-transparent opacity-90"></div>
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-theme-primary border border-white/10">
                                                {lounge.airport}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 relative -mt-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-accent group-hover:text-theme-primary transition-colors">{lounge.name}</h3>
                                                    <p className="text-sm text-theme-secondary mt-0.5">{lounge.terminal}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-accent-secondary mb-4">
                                                <span className="material-symbols-outlined text-[16px]">schedule</span>
                                                <span>{lounge.hours}</span>
                                            </div>
                                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-theme-primary/60 text-[18px]">person</span>
                                                    <span className="text-sm text-theme-primary font-medium">{lounge.guests}</span>
                                                </div>
                                                {lounge.status === 'unlocked' ? (
                                                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-900 border border-copper/40 text-theme-primary text-xs font-bold shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-105 transition-all duration-300">
                                                        <span className="material-symbols-outlined text-[16px] text-emerald-100 drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lock_open</span>
                                                        <span className="tracking-wide text-[11px] uppercase">Unlocked</span>
                                                    </div>
                                                ) : (
                                                    <div className="group/badge relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border border-copper/50 text-theme-primary text-xs font-bold shadow-lg cursor-help">
                                                        <span className="material-symbols-outlined text-[16px] text-amber-100 drop-shadow-sm">lock</span>
                                                        <span className="tracking-wide text-[11px] uppercase">Spend Criteria</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                                    <span className="material-symbols-outlined text-6xl text-theme-muted mb-4">search_off</span>
                                    <h3 className="text-xl font-bold text-theme-primary mb-2">No lounges found</h3>
                                    <p className="text-accent-dim">Try selecting a different airport or check your search query.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
