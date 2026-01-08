import { useState } from 'react';

const lounges = [
    {
        id: 1,
        name: '080 Domestic Lounge',
        airport: 'BLR',
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
        terminal: 'Terminal 2, Domestic',
        hours: 'Spa Services',
        guests: 'Cardholder + 1',
        status: 'unlocked',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600',
    },
];

export default function LoungeAccess() {
    const [searchQuery, setSearchQuery] = useState('HDFC Infinia Credit Card Metal Edition');
    const [filterType, setFilterType] = useState('domestic');

    return (
        <div className="flex flex-1 overflow-hidden relative bg-espresso-900">
            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="flex-1 overflow-y-auto px-6 pb-10 hide-scrollbar">
                    <div className="max-w-6xl mx-auto flex flex-col gap-8 mt-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div className="flex flex-col gap-2 max-w-xl">
                                <h2 className="text-4xl md:text-5xl font-black text-gold-400 leading-tight tracking-tight">
                                    Airport Lounge <br /><span className="text-white">Access Finder</span>
                                </h2>
                                <p className="text-gold-dim text-lg mt-2">Discover your complimentary lounge privileges worldwide. Exclusive to your premium card portfolio.</p>
                            </div>
                            <div className="bg-espresso-950 p-1.5 rounded-full border border-espresso-700 flex relative">
                                <button
                                    onClick={() => setFilterType('card')}
                                    className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all ${filterType === 'card' ? 'bg-gold-400 text-espresso-950 shadow-[0_0_15px_rgba(205,160,45,0.1)]' : 'text-copper hover:text-white'}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">credit_card</span>
                                    Check by Card
                                </button>
                                <button
                                    onClick={() => setFilterType('airport')}
                                    className={`px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all ${filterType === 'airport' ? 'bg-gold-400 text-espresso-950 shadow-[0_0_15px_rgba(205,160,45,0.1)]' : 'text-copper hover:text-white'}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    Check by Airport
                                </button>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="w-full relative group z-20">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gold-400 text-3xl group-focus-within:text-white transition-colors">search</span>
                            </div>
                            <input
                                className="w-full bg-espresso-950 border border-espresso-700 text-white text-xl md:text-2xl placeholder:text-espresso-700 rounded-2xl py-6 pl-16 pr-6 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 outline-none shadow-xl transition-all font-light"
                                placeholder="Search for your credit card (e.g. HDFC Infinia, Amex Platinum)..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2">
                                <span className="text-xs text-copper uppercase tracking-widest font-bold px-2">Card Selected</span>
                            </div>
                        </div>

                        {/* Selected Card Display */}
                        <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-espresso-950 to-espresso-800/30 border border-espresso-700">
                            <div className="relative w-32 h-20 md:w-48 md:h-28 rounded-xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer group">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-xl border border-gray-600 overflow-hidden">
                                    <div className="p-3 md:p-4 flex flex-col justify-between h-full">
                                        <div className="flex justify-between items-start">
                                            <div className="h-4 w-8 bg-gray-400/50 rounded"></div>
                                            <span className="text-[10px] md:text-xs text-gray-300 font-mono">INFINIA</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-10 bg-orange-500/80 rounded-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl md:text-2xl font-bold text-white">HDFC Infinia Metal Edition</h3>
                                    <span className="material-symbols-outlined text-gold-400 text-xl" title="Verified Card">verified</span>
                                </div>
                                <p className="text-copper text-sm">Visa Infinite • Ends in 8892</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-medium">
                                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                        Unlimited Access
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-medium">
                                        <span className="material-symbols-outlined text-[14px]">group_add</span>
                                        +1 Guest Allowed
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lounges Header */}
                        <div className="flex items-center gap-4">
                            <h4 className="text-lg font-bold text-gold-400 whitespace-nowrap">Eligible Lounges</h4>
                            <div className="h-[1px] w-full bg-espresso-700"></div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 rounded-lg bg-espresso-800 text-white text-xs border border-gold-400/30">Domestic</button>
                                <button className="px-3 py-1 rounded-lg bg-transparent text-gold-dim text-xs border border-espresso-700 hover:border-gold-400/50 transition-colors">International</button>
                            </div>
                        </div>

                        {/* Lounge Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                            {lounges.map((lounge) => (
                                <div
                                    key={lounge.id}
                                    className={`group bg-espresso-800 rounded-xl overflow-hidden border border-espresso-700 hover:border-${lounge.status === 'criteria' ? 'amber-500' : 'gold-400'}/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(205,160,45,0.1)] hover:-translate-y-1 relative`}
                                >
                                    {/* Image */}
                                    <div className="relative h-48 w-full overflow-hidden bg-espresso-700">
                                        <div className="absolute inset-0 bg-gradient-to-br from-espresso-700 to-espresso-900 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-6xl text-espresso-600">chair</span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-espresso-800 via-transparent to-transparent opacity-90"></div>
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                                            {lounge.airport}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 relative -mt-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-gold-400 group-hover:text-white transition-colors">{lounge.name}</h3>
                                                <p className="text-sm text-gray-300 mt-0.5">{lounge.terminal}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-copper mb-4">
                                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                                            <span>{lounge.hours}</span>
                                        </div>
                                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-white/60 text-[18px]">person</span>
                                                <span className="text-sm text-white font-medium">{lounge.guests}</span>
                                            </div>
                                            {lounge.status === 'unlocked' ? (
                                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-900 border border-copper/40 text-white text-xs font-bold shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-105 transition-all duration-300">
                                                    <span className="material-symbols-outlined text-[16px] text-emerald-100 drop-shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lock_open</span>
                                                    <span className="tracking-wide text-[11px] uppercase">Unlocked</span>
                                                </div>
                                            ) : (
                                                <div className="group/badge relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border border-copper/50 text-white text-xs font-bold shadow-lg cursor-help">
                                                    <span className="material-symbols-outlined text-[16px] text-amber-100 drop-shadow-sm">lock</span>
                                                    <span className="tracking-wide text-[11px] uppercase">Spend Criteria</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
