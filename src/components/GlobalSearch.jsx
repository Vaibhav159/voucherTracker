import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVouchers } from '../hooks/useVouchers';
import { creditCards } from '../data/creditCards';
import guidesData from '../data/guides.json';
import { useModalKeyHandler } from '../hooks/useModalKeyHandler';
import { useFuzzySearch } from '../hooks/useFuzzySearch';

const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all', 'voucher', 'card', 'platform'
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const lastShiftKeyTime = useRef(0);
    const { vouchers } = useVouchers();

    // Hardcoded Pages
    const pages = [
        { name: 'Home', type: 'page', path: '/', tags: ['dashboard', 'main'] },
        { name: 'Know Your Cards', type: 'page', path: '/know-your-cards', tags: ['credit', 'cards', 'compare'] },
        { name: 'Guides', type: 'page', path: '/guides', tags: ['tutorials', 'help', 'blog'] },
        { name: 'Ask AI', type: 'page', path: '/ask-ai', tags: ['ai', 'chat', 'bot'] }
    ];

    // Combine all searchable items
    const allItems = useMemo(() => {
        const voucherItems = vouchers.map(v => ({
            ...v,
            name: v.brand,
            type: 'voucher',
            path: `/?voucher=${v.id}`
        }));

        const cardItems = creditCards.map(c => ({
            ...c,
            type: 'card',
            path: `/card-guide/${c.id}`
        }));

        const guideItems = guidesData.map(g => ({
            ...g,
            name: g.title,
            type: 'guide',
            path: g.link // External link handling might be needed
        }));

        // Extract unique platforms
        const uniquePlatforms = [...new Set(vouchers.flatMap(v => v.platforms.map(p => p.name)))];
        const platformItems = uniquePlatforms.map(p => ({
            name: p,
            type: 'platform',
            path: `/?platform=${encodeURIComponent(p)}`
        }));

        return [...pages, ...voucherItems, ...cardItems, ...guideItems, ...platformItems];
    }, [vouchers]);

    // toggle search logic
    const toggleSearch = (initialFilter = 'all') => {
        if (isOpen) {
            // If we are switching to a different specific filter, don't close
            if (initialFilter !== 'all' && initialFilter !== filterType) {
                setFilterType(initialFilter);
                setQuery('');
                setSelectedIndex(0);
                // Ensure text input gains focus back if needed
                if (inputRef.current) inputRef.current.focus();
                return;
            }
            // Otherwise close (toggle off)
            setIsOpen(false);
            setQuery(''); // Optional: clear query on close
            setSelectedIndex(0);
        } else {
            // Open
            setIsOpen(prev => true);
            setFilterType(initialFilter);
            setQuery('');
            setSelectedIndex(0);
        }
    };

    // Keyboard Event Listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Disable on mobile
            if (window.innerWidth < 768) return;

            // Check if input is focused
            const isInputFocused = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

            // CMD+K or CTRL+K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleSearch('all');
                return;
            }

            // Double Shift
            if (e.key === 'Shift') {
                const now = Date.now();
                if (now - lastShiftKeyTime.current < 500) {
                    toggleSearch('all');
                }
                lastShiftKeyTime.current = now;
            }

            // Shift + V (Vouchers)
            if (e.shiftKey && (e.key === 'V' || e.key === 'v') && (!isInputFocused || (document.activeElement?.id === 'global-search-input' && query === '')) && !e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                toggleSearch('voucher');
            }

            // Shift + C (Cards)
            if (e.shiftKey && (e.key === 'C' || e.key === 'c') && (!isInputFocused || (document.activeElement?.id === 'global-search-input' && query === '')) && !e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                toggleSearch('card');
            }

            // Shift + P (Platforms)
            if (e.shiftKey && (e.key === 'P' || e.key === 'p') && (!isInputFocused || (document.activeElement?.id === 'global-search-input' && query === '')) && !e.metaKey && !e.ctrlKey) {
                e.preventDefault();
                toggleSearch('platform');
            }

            // Escape to close
            if (isOpen && e.key === 'Escape') {
                e.preventDefault();
                setIsOpen(false);
                setQuery('');
                setSelectedIndex(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filterType, query]);

    // Focus input when open
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 10);
        }
    }, [isOpen]);

    // Filter items by type first
    const filteredItems = useMemo(() => {
        return filterType === 'all'
            ? allItems
            : allItems.filter(item => item.type === filterType);
    }, [allItems, filterType]);

    // Use custom fuzzy search hook
    const searchResults = useFuzzySearch(filteredItems, query, {
        keys: [
            { name: 'name', weight: 0.4 },
            { name: 'tags', weight: 0.3 },
            { name: 'bank', weight: 0.2 },
            { name: 'type', weight: 0.1 }
        ],
        threshold: 0.4
    });

    // Limit results to top 10
    const results = useMemo(() => {
        return searchResults.slice(0, 10);
    }, [searchResults]);

    // Navigate selection
    useEffect(() => {
        const handleNavigation = (e) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % results.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (results[selectedIndex]) {
                    handleSelect(results[selectedIndex]);
                }
            }
        };

        window.addEventListener('keydown', handleNavigation);
        return () => window.removeEventListener('keydown', handleNavigation);
    }, [isOpen, results, selectedIndex]);

    const handleSelect = (item) => {
        if (item.type === 'guide') {
            window.open(item.link, '_blank');
        } else if (item.type === 'platform') {
            // Force reload if already on home or just navigate
            // Using navigate with search params
            navigate(item.path);
            // Dispatch a custom event or force update if needed, but navigate should work if App.jsx listens to params
        } else {
            navigate(item.path);
        }
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div
            className="global-search-overlay"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="global-search-container glass-panel"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="search-input-container">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        id="global-search-input"
                        ref={inputRef}
                        type="text"
                        placeholder="Search anything..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                    <div className="search-shortcuts">
                        <span className="search-shortcut">ESC</span>
                        {filterType !== 'all' && (
                            <span
                                onClick={() => setFilterType('all')}
                                className="search-filter-badge"
                            >
                                {filterType.toUpperCase()} ✕
                            </span>
                        )}
                    </div>
                </div>

                {results.length > 0 ? (
                    <ul className="search-results">
                        {results.map((item, index) => (
                            <li
                                key={index}
                                onMouseEnter={() => setSelectedIndex(index)}
                                onClick={() => handleSelect(item)}
                                className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                            >
                                {/* Icons based on type */}
                                <div className="search-result-icon">
                                    {item.type === 'page' && <span>📄</span>}
                                    {item.type === 'voucher' && <span>🎟️</span>}
                                    {item.type === 'card' && <span>💳</span>}
                                    {item.type === 'guide' && <span>📚</span>}
                                    {item.type === 'platform' && <span>🛒</span>}
                                </div>

                                <div className="search-result-content">
                                    <div className="search-result-title">{item.name}</div>
                                    <div className="search-result-meta">
                                        {item.type.toUpperCase()} • {item.description || item.bank || item.category || 'Page'}
                                    </div>
                                </div>

                                {index === selectedIndex && (
                                    <span className="search-result-indicator">↵</span>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : query && (
                    <div className="search-empty">
                        No results found for "{query}"
                    </div>
                )}

                {!query && (
                    <div className="search-helper">
                        Type to search for Vouchers, Credit Cards, Guides, and Pages...
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlobalSearch;
