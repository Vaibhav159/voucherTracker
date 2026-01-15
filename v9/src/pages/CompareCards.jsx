import { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
    X,
    Plus,
    ChevronRight,
    Check,
    Minus,
    ArrowRight,
    Search
} from 'lucide-react';
import { creditCards } from '../data/creditCards';
import SEO from '../components/SEO';

// Format currency
const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    // If it's 0, return Free
    if (amount === 0) return 'Free';

    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}k`;
    return `₹${amount}`;
};

export default function CompareCards() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Get selected cards from URL (ids separated by comma)
    const selectedIds = useMemo(() => {
        const ids = searchParams.get('ids');
        return ids ? ids.split(',').filter(Boolean) : [];
    }, [searchParams]);

    const selectedCards = useMemo(() => {
        return selectedIds
            .map(id => creditCards.find(c => c.id === id || c.slug === id))
            .filter(Boolean);
    }, [selectedIds]);

    const availableCards = useMemo(() => {
        if (!searchQuery) return creditCards.slice(0, 10);
        return creditCards.filter(c =>
            !selectedIds.includes(c.id) &&
            (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.bank.toLowerCase().includes(searchQuery.toLowerCase()))
        ).slice(0, 10);
    }, [searchQuery, selectedIds]);

    const removeCard = (id) => {
        const newIds = selectedIds.filter(cardId => cardId !== id);
        setSearchParams({ ids: newIds.join(',') });
    };

    const addCard = (id) => {
        if (selectedIds.length >= 3) return;
        const newIds = [...selectedIds, id];
        setSearchParams({ ids: newIds.join(',') });
        setIsAddingCard(false);
        setSearchQuery('');
    };

    const categories = [
        {
            title: 'Fees',
            rows: [
                { label: 'Joining Fee', render: c => formatCurrency(c.fees?.joining) },
                { label: 'Annual Fee', render: c => formatCurrency(c.fees?.annual) },
                { label: 'Waiver Condition', render: c => c.fees?.waiverText || 'None' }
            ]
        },
        {
            title: 'Rewards',
            rows: [
                { label: 'Base Rate', render: c => c.rewards?.baseRate ? `${(c.rewards.baseRate * 100).toFixed(1)}%` : 'N/A' },
                { label: 'Key Benefit', render: c => c.rewards?.earningText || '-' },
                { label: 'Welcome Bonus', render: c => c.rewards?.joiningBonus || '-' }
            ]
        },
        {
            title: 'Travel',
            rows: [
                { label: 'Domestic Lounge', render: c => c.features?.lounge?.domestic || '-' },
                { label: 'Intl Lounge', render: c => c.features?.lounge?.international || '-' },
                { label: 'Forex Markup', render: c => c.features?.forex?.text || (c.features?.forex?.markup ? `${(c.features?.forex?.markup * 100).toFixed(1)}%` : '-') }
            ]
        },
        {
            title: 'Additional',
            rows: [
                { label: 'Golf Games', render: c => c.features?.golf?.included ? 'Yes' : '-' },
                { label: 'Movies', render: c => c.features?.movies?.text || '-' },
                { label: 'Best For', render: c => c.metadata?.bestFor || '-' }
            ]
        }
    ];

    if (selectedCards.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg)]">
                <SEO
                    title="Compare Credit Cards | CardPerks"
                    description="Select up to 3 credit cards to compare their features, fees, and rewards side by side."
                />
                <div className="text-center max-w-md">
                    <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Compare Credit Cards</h2>
                    <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>Select up to 3 cards to compare their features side by side.</p>
                    <Link
                        to="/cards"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold bg-[var(--accent)] text-[var(--bg)] hover:brightness-110 transition-all"
                    >
                        Browse Cards <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Compare Credit Cards Side-by-Side"
                description="Compare fees, rewards, lounge access and benefits of up to 3 credit cards side by side to choose the best one for you."
                keywords="compare credit cards, credit card comparison india, card vs card"
            />
            {/* Header */}
            <div className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-alt)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <Link to="/cards" className="hover:text-[var(--accent)] transition-colors">
                            <ChevronRight size={14} className="rotate-180 inline mr-1" /> Back to Cards
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-serif font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Compare Cards</h1>

                <div className="overflow-x-auto pb-6">
                    <div className="min-w-[800px]">
                        {/* Header Row - Images */}
                        <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-6 mb-8">
                            <div className="flex items-end pb-4 font-bold text-lg" style={{ color: 'var(--text-secondary)' }}>
                                {categories.length} Categories
                            </div>

                            {selectedCards.map(card => (
                                <div key={card.id} className="relative group">
                                    <button
                                        onClick={() => removeCard(card.id)}
                                        className="absolute -top-2 -right-2 z-10 p-1 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remove card"
                                    >
                                        <X size={14} />
                                    </button>

                                    <div className="aspect-[1.586/1] rounded-xl overflow-hidden mb-4 shadow-lg border border-[var(--border)] relative bg-[var(--surface)]">
                                        {card.image ? (
                                            <img src={card.image} alt={card.name} className="w-full h-full object-contain p-1" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">N/A</div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-lg leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>{card.name}</h3>
                                    <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{card.bank}</p>

                                    <Link
                                        to={`/cards/${card.slug}`}
                                        className="block w-full py-2 text-center rounded-lg border text-sm font-medium transition-colors hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:border-transparent"
                                        style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}

                            {/* Add Card Slot */}
                            {selectedCards.length < 3 && (
                                <div>
                                    {!isAddingCard ? (
                                        <button
                                            onClick={() => setIsAddingCard(true)}
                                            className="w-full h-full min-h-[300px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-colors hover:border-[var(--accent)] hover:bg-[var(--surface)]"
                                            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                                        >
                                            <div className="p-3 rounded-full bg-[var(--surface)]">
                                                <Plus size={24} />
                                            </div>
                                            <span className="font-medium">Add Card</span>
                                        </button>
                                    ) : (
                                        <div className="w-full h-full min-h-[300px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>Add Card</h4>
                                                <button onClick={() => setIsAddingCard(false)} style={{ color: 'var(--text-muted)' }}>
                                                    <X size={18} />
                                                </button>
                                            </div>
                                            <div className="relative mb-4">
                                                <Search size={16} className="absolute left-3 top-2.5 text-[var(--text-muted)]" />
                                                <input
                                                    type="text"
                                                    placeholder="Search cards..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    autoFocus
                                                    className="w-full pl-9 pr-3 py-2 rounded-lg text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                                                />
                                            </div>
                                            <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                                {availableCards.map(card => (
                                                    <button
                                                        key={card.id}
                                                        onClick={() => addCard(card.id)}
                                                        className="w-full text-left p-2 rounded-lg hover:bg-[var(--bg)] flex items-center gap-3"
                                                    >
                                                        <div className="w-8 h-5 rounded bg-gray-700 overflow-hidden shrink-0">
                                                            {card.image && <img src={card.image} className="w-full h-full object-cover" />}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{card.name}</div>
                                                        </div>
                                                    </button>
                                                ))}
                                                {availableCards.length === 0 && (
                                                    <div className="text-center py-4 text-xs text-[var(--text-muted)]">No cards found</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Comparison Rows */}
                        <div className="space-y-8">
                            {categories.map((category, idx) => (
                                <section key={idx}>
                                    <h4 className="font-serif font-bold text-xl mb-4 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
                                        {category.title}
                                    </h4>
                                    <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-x-6 gap-y-0">
                                        {category.rows.map((row, rIdx) => (
                                            <>
                                                <div key={`header-${rIdx}`} className="py-4 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                                    {row.label}
                                                </div>
                                                {selectedCards.map(card => (
                                                    <div
                                                        key={`${card.id}-${rIdx}`}
                                                        className={`py-4 text-sm ${rIdx % 2 === 0 ? 'bg-[var(--surface)]/30' : ''} -mx-3 px-3 rounded`}
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        {row.render(card)}
                                                    </div>
                                                ))}
                                                {/* Filler for empty slots */}
                                                {Array.from({ length: 3 - selectedCards.length }).map((_, i) => (
                                                    <div key={`empty-${i}-${rIdx}`} className="py-4"></div>
                                                ))}
                                            </>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
