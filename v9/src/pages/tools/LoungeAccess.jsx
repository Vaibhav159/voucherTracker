import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    CreditCard,
    Plane,
    Search,
    CheckCircle2,
    Users,
    Clock,
    LockOpen,
    Lock,
    MapPin,
    Armchair,
    Info,
    ChevronDown
} from 'lucide-react';
import SEO from '../../components/SEO';

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
    { id: 1, name: 'HDFC Infinia Metal', bank: 'HDFC', network: 'Visa Infinite', ending: '8892' },
    { id: 2, name: 'Axis Magnus', bank: 'Axis', network: 'Visa Signature', ending: '4092' },
    { id: 3, name: 'Amex Platinum', bank: 'Amex', network: 'American Express', ending: '1005' },
    { id: 4, name: 'SBI Cashback', bank: 'SBI', network: 'Visa Signature', ending: '9421' },
];

export default function LoungeAccess() {
    const { mode: modeParam, selection: selectionParam } = useParams();
    const navigate = useNavigate();

    // Initialize from URL params or defaults
    const initialMode = modeParam === 'airport' ? 'airport' : 'card';
    const initialCard = selectionParam
        ? cards.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === selectionParam) || cards[0]
        : cards[0];
    const initialAirport = modeParam === 'airport' && selectionParam
        ? airports.find(a => a.code.toLowerCase() === selectionParam.toLowerCase())
        : null;

    const [filterType, setFilterType] = useState(initialMode);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCard, setSelectedCard] = useState(initialCard);
    const [selectedAirport, setSelectedAirport] = useState(initialAirport);
    const [loungeType, setLoungeType] = useState('domestic');

    // Update URL helper
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
        } else if (filterType === 'card') {
            // For cards, we could use a dropdown or search, but for now we'll match name
            const found = cards.find(c => c.name.toLowerCase().includes(query.toLowerCase()));
            if (found) {
                setSelectedCard(found);
                updateUrl('card', found.name.toLowerCase().replace(/\s+/g, '-'));
            }
        }
    };

    // Filter lounges logic
    const filteredLounges = filterType === 'airport' && selectedAirport
        ? lounges.filter(l => l.airport === selectedAirport.code)
        : filterType === 'card'
            ? lounges // Should filter by card if we had mapping, for now show all
            : lounges;

    const placeholder = filterType === 'card'
        ? "Search for your credit card..."
        : "Search for an airport (e.g. BLR, DEL)...";

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title={`${filterType === 'card' ? selectedCard.name : selectedAirport?.code || 'Airport'} Lounge Access | Lounge Finder`}
                description="Find complimentary domestic and international lounge access across airports in India and abroad."
                keywords="airport lounge, priority pass, credit card lounge access, visa infinite lounge"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                            Lounge Access <span className="text-[var(--accent)]">Finder</span>
                        </h1>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Discover your complimentary lounge privileges worldwide.
                        </p>
                    </div>

                    {/* Toggle */}
                    <div className="bg-[var(--surface)] p-1 rounded-full border border-[var(--border)] flex">
                        <button
                            onClick={() => handleModeChange('card')}
                            className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${filterType === 'card'
                                    ? 'bg-[var(--accent)] text-white shadow-md'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            <CreditCard size={16} />
                            Check by Card
                        </button>
                        <button
                            onClick={() => handleModeChange('airport')}
                            className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${filterType === 'airport'
                                    ? 'bg-[var(--accent)] text-white shadow-md'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            <Plane size={16} />
                            Check by Airport
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--accent)]" size={20} />
                    <input
                        className="w-full bg-[var(--surface)] border border-[var(--border)] text-lg py-4 pl-14 pr-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all shadow-sm"
                        style={{ color: 'var(--text-primary)' }}
                        placeholder={placeholder}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                {/* Selection Display Card */}
                {((filterType === 'card' && selectedCard) || (filterType === 'airport' && selectedAirport)) && (
                    <div className="mb-8 p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

                        {filterType === 'card' ? (
                            <>
                                <div className="w-32 h-20 md:w-40 md:h-24 rounded-lg bg-gradient-to-br from-slate-800 to-black shadow-xl flex flex-col p-3 justify-between text-white relative z-10 transform -rotate-2 hover:rotate-0 transition-transform">
                                    <div className="text-[10px] uppercase opacity-70">Credit Card</div>
                                    <div>
                                        <div className="text-xs font-bold truncate">{selectedCard.name}</div>
                                        <div className="text-[10px] font-mono opacity-80">**** {selectedCard.ending}</div>
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedCard.name}</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedCard.network}</p>
                                    <div className="mt-3 flex flex-wrap gap-3 justify-center md:justify-start">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                            <CheckCircle2 size={12} /> Unlimited Access
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                                            <Users size={12} /> +1 Guest
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[var(--bg)] border-2 border-[var(--accent)] flex items-center justify-center shrink-0">
                                    <Plane size={32} className="text-[var(--accent)]" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedAirport.code}</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedAirport.name}</p>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Filters */}
                <div className="flex items-center justify-between border-b pb-4 mb-6" style={{ borderColor: 'var(--border)' }}>
                    <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                        {filterType === 'airport' && selectedAirport ? `Lounges at ${selectedAirport.code}` : 'Eligible Lounges'}
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setLoungeType('domestic')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${loungeType === 'domestic'
                                    ? 'bg-[var(--accent)] text-white'
                                    : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
                                }`}
                        >
                            Domestic
                        </button>
                        <button
                            onClick={() => setLoungeType('international')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${loungeType === 'international'
                                    ? 'bg-[var(--accent)] text-white'
                                    : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
                                }`}
                        >
                            International
                        </button>
                    </div>
                </div>

                {/* Lounge Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLounges.length > 0 ? (
                        filteredLounges.map((lounge) => (
                            <div
                                key={lounge.id}
                                className="group rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)'
                                }}
                            >
                                <div className="relative h-48 bg-gray-200">
                                    <img
                                        src={lounge.image}
                                        alt={lounge.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-[var(--surface)] hidden items-center justify-center flex-col gap-2">
                                        <Armchair size={48} className="text-[var(--text-muted)]" />
                                        <span className="text-xs text-[var(--text-muted)]">No Image</span>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                                        {lounge.airport}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="mb-4">
                                        <h3 className="font-bold text-lg mb-1 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>{lounge.name}</h3>
                                        <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                            <MapPin size={10} />
                                            {lounge.terminal}
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                            <Clock size={14} className="text-[var(--accent)]" />
                                            <span>{lounge.hours}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                            <Users size={14} className="text-[var(--accent)]" />
                                            <span>{lounge.guests}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
                                        {lounge.status === 'unlocked' ? (
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                                                <LockOpen size={14} /> Unlocked
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500" title={lounge.requirement}>
                                                <Lock size={14} /> {lounge.requirement}
                                            </div>
                                        )}
                                        <button className="text-xs font-bold uppercase hover:underline" style={{ color: 'var(--accent)' }}>
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <Info size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
                            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No lounges found</h3>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Try selecting a different {filterType} or checking "All".
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
