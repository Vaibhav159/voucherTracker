/**
 * GlobalSearch - Polished Version
 * 
 * Improvements:
 * - Better keyboard navigation (↑↓ with scroll into view)
 * - Recent searches with clear option
 * - Search history management
 * - Improved result highlighting
 * - Toast notifications
 * - Better empty states
 * - Accessibility improvements
 */

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVouchers } from '../hooks/useVouchers';
import { useCreditCards } from '../hooks/useCreditCards';
import { useGuides } from '../hooks/useGuides';
import { useModalKeyHandler } from '../hooks/useModalKeyHandler';
import { useFuzzySearch } from '../hooks/useFuzzySearch';
import { familyBanking, wealthBanking } from '../data/bankingPrograms';
import { featureFlags } from '../config/featureFlags';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './UXPolish';

const MAX_RECENT_SEARCHES = 5;

const GlobalSearch = () => {
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const resultsRef = useRef(null);
    const lastShiftKeyTime = useRef(0);
    const { vouchers } = useVouchers();
    const { creditCards } = useCreditCards();
    const { guides: guidesData } = useGuides();

    // Dynamic Pages based on feature flags and main branch additions
    const pages = useMemo(() => {
        const basePages = [
            { name: 'Home', type: 'page', path: '/', tags: ['dashboard', 'main'], icon: '🏠' },
            { name: 'Know Your Cards', type: 'page', path: '/know-your-cards', tags: ['credit', 'cards', 'compare'], icon: '💳' },
            { name: 'Guides', type: 'page', path: '/guides', tags: ['tutorials', 'help', 'blog'], icon: '📚' },
            { name: 'Favorites', type: 'page', path: '/favorites', tags: ['saved', 'bookmarked', 'shortlist'], icon: '❤️' },
            { name: 'My Cards', type: 'page', path: '/my-cards', tags: ['collection', 'wallet'], icon: '👛' },
            { name: 'Spend Optimizer', type: 'page', path: '/spend-optimizer', tags: ['optimize', 'savings'], icon: '💰' },
        ];

        if (featureFlags.askAI) {
            basePages.push({ name: 'Ask AI', type: 'page', path: '/ask-ai', tags: ['ai', 'chat', 'bot', 'assistant'], icon: '🤖' });
        }
        if (featureFlags.rewardsCalculator) {
            basePages.push({ name: 'Rewards Calculator', type: 'page', path: '/rewards-calculator', tags: ['calculate', 'points', 'value'], icon: '📊' });
        }
        if (featureFlags.pointsConverter) {
            basePages.push({ name: 'Points Converter', type: 'page', path: '/points-converter', tags: ['transfer', 'ratio', 'miles'], icon: '🔄' });
        }
        if (featureFlags.bankingGuides) {
            basePages.push({ name: 'Banking Comparison', type: 'page', path: '/banking-guides', tags: ['tiers', 'wealth', 'family', 'limits'], icon: '🏦' });
        }

        return basePages;
    }, []);

    // Combine all searchable items
    const allItems = useMemo(() => {
        // Fallback to empty arrays if data is loading/null
        const safeVouchers = vouchers || [];
        const safeCreditCards = creditCards || [];
        const safeGuides = guidesData || [];

        const voucherItems = safeVouchers.map(v => ({
            ...v,
            name: v.brand,
            type: 'voucher',
            path: `/?voucher=${v.id}`,
            icon: '🎟️'
        }));

        const cardItems = safeCreditCards.map(c => ({
            ...c,
            type: 'card',
            path: `/card-guide/${c.id}`,
            icon: '💳'
        }));

        const guideItems = safeGuides.map(g => ({
            ...g,
            name: g.title,
            type: 'guide',
            path: g.link,
            icon: '📖'
        }));

        // Extract unique platforms safely
        const uniquePlatforms = [...new Set(safeVouchers.flatMap(v => v.platforms ? v.platforms.map(p => p.name) : []))];
        const platformItems = uniquePlatforms.map(p => ({
            name: p,
            type: 'platform',
            path: `/?platform=${encodeURIComponent(p)}`,
            icon: '🛒'
        }));

        // Extract unique categories
        const uniqueCategories = [...new Set(safeVouchers.map(v => v.category).filter(Boolean))];
        const categoryItems = uniqueCategories.map(cat => ({
            name: cat,
            type: 'category',
            path: `/?category=${encodeURIComponent(cat)}`,
            tags: ['voucher', 'shopping', 'brand']
        }));

        // Extract Banking Tiers
        const bankingTierItems = [];
        Object.entries(wealthBanking).forEach(([bank, data]) => {
            data.tiers.forEach(tier => {
                bankingTierItems.push({
                    name: `${bank} ${tier.name}`,
                    bank: bank,
                    type: 'banking',
                    path: `/banking-guides`, // Link to the comparison page
                    description: `Min: ${tier.minNRV}`,
                    tags: ['tier', 'wealth', bank, ...tier.benefits]
                });
            });
        });

        // Extract Family Banking
        const familyBankingItems = Object.entries(familyBanking).map(([bank, data]) => ({
            name: data.name,
            bank: bank,
            type: 'banking',
            path: `/banking-guides`,
            description: `Family Program • Min: ${data.minNRV}`,
            tags: ['family', 'members', bank, ...data.benefits]
        }));

        return [
            ...pages,
            ...voucherItems,
            ...cardItems,
            ...guideItems,
            ...platformItems,
            ...categoryItems,
            ...bankingTierItems,
            ...familyBankingItems
        ];
    }, [vouchers, creditCards, guidesData, pages]);

    // Toggle search
    const toggleSearch = useCallback((initialFilter = 'all') => {
        if (isOpen) {
            if (initialFilter !== 'all' && initialFilter !== filterType) {
                setFilterType(initialFilter);
                setQuery('');
                setSelectedIndex(0);
                inputRef.current?.focus();
                return;
            }
            setIsOpen(false);
            setQuery('');
            setSelectedIndex(0);
        } else {
            setIsOpen(true);
            setFilterType(initialFilter);
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen, filterType]);

    // Add to recent searches
    const addToRecentSearches = useCallback((item) => {
        setRecentSearches(prev => {
            const filtered = prev.filter(s => s.path !== item.path);
            return [{
                name: item.name,
                type: item.type,
                path: item.path,
                icon: item.icon
            }, ...filtered].slice(0, MAX_RECENT_SEARCHES);
        });
    }, [setRecentSearches]);

    // Clear recent searches
    const clearRecentSearches = useCallback(() => {
        setRecentSearches([]);
        toast.success('Search history cleared');
    }, [setRecentSearches, toast]);

    // Remove single recent search
    const removeRecentSearch = useCallback((path, e) => {
        e.stopPropagation();
        setRecentSearches(prev => prev.filter(s => s.path !== path));
    }, [setRecentSearches]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (window.innerWidth < 768) return;

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

            // Shift + V/C/P shortcuts
            if (e.shiftKey && !e.metaKey && !e.ctrlKey) {
                const isSearchInput = document.activeElement?.id === 'global-search-input';
                if (!isInputFocused || (isSearchInput && query === '')) {
                    if (e.key === 'V' || e.key === 'v') {
                        e.preventDefault();
                        toggleSearch('voucher');
                    } else if (e.key === 'C' || e.key === 'c') {
                        e.preventDefault();
                        toggleSearch('card');
                    } else if (e.key === 'P' || e.key === 'p') {
                        e.preventDefault();
                        toggleSearch('platform');
                    }
                }
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
    }, [isOpen, filterType, query, toggleSearch]);

    // Focus input when open
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 10);
        }
    }, [isOpen]);

    // Filter items by type
    const filteredItems = useMemo(() => {
        return filterType === 'all'
            ? allItems
            : allItems.filter(item => item.type === filterType);
    }, [allItems, filterType]);

    // Fuzzy search
    const searchResults = useFuzzySearch(filteredItems, query, {
        keys: [
            { name: 'name', weight: 0.4 },
            { name: 'tags', weight: 0.25 },
            { name: 'bank', weight: 0.15 },
            { name: 'description', weight: 0.1 },
            { name: 'type', weight: 0.1 }
        ],
        threshold: 0.4
    });

    // Limit results
    const results = useMemo(() => {
        return searchResults.slice(0, 10);
    }, [searchResults]);

    // Reset selection when results change
    useEffect(() => {
        setSelectedIndex(0);
    }, [results]);

    // Scroll selected item into view
    useEffect(() => {
        if (resultsRef.current && results.length > 0) {
            const selectedElement = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }, [selectedIndex, results.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleNavigation = (e) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => {
                    const maxIndex = query ? results.length - 1 : recentSearches.length - 1;
                    return Math.min(prev + 1, maxIndex);
                });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (query && results[selectedIndex]) {
                    handleSelect(results[selectedIndex]);
                } else if (!query && recentSearches[selectedIndex]) {
                    handleSelectRecent(recentSearches[selectedIndex]);
                }
            }
        };

        window.addEventListener('keydown', handleNavigation);
        return () => window.removeEventListener('keydown', handleNavigation);
    }, [isOpen, results, selectedIndex, query, recentSearches]);

    // Handle selection
    const handleSelect = useCallback((item) => {
        addToRecentSearches(item);

        if (item.type === 'guide') {
            window.open(item.link || item.path, '_blank');
        } else {
            navigate(item.path);
        }

        setIsOpen(false);
        setQuery('');
    }, [navigate, addToRecentSearches]);

    // Handle recent search selection
    const handleSelectRecent = useCallback((item) => {
        if (item.type === 'guide') {
            window.open(item.path, '_blank');
        } else {
            navigate(item.path);
        }
        setIsOpen(false);
    }, [navigate]);

    // Highlight matching text
    const highlightMatch = useCallback((text, searchQuery) => {
        if (!searchQuery || !text) return text;

        const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i) =>
            regex.test(part) ? (
                <mark key={i} style={{
                    background: 'rgba(6, 182, 212, 0.3)',
                    color: 'var(--accent-cyan)',
                    borderRadius: '2px',
                    padding: '0 2px',
                }}>
                    {part}
                </mark>
            ) : part
        );
    }, []);

    // Get type badge color
    const getTypeBadgeStyle = (type) => {
        const styles = {
            page: { bg: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc' },
            voucher: { bg: 'rgba(34, 197, 94, 0.15)', color: '#86efac' },
            card: { bg: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9' },
            guide: { bg: 'rgba(249, 115, 22, 0.15)', color: '#fdba74' },
            platform: { bg: 'rgba(236, 72, 153, 0.15)', color: '#f9a8d4' },
            banking: { bg: 'rgba(249, 218, 115, 0.15)', color: '#fde68a' },
        };
        return styles[type] || styles.page;
    };

    if (!isOpen) return null;

    return (
        <div
            className="global-search-overlay"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Global search"
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '15vh',
                zIndex: 9999,
                animation: 'fadeIn 0.15s ease-out',
            }}
        >
            <div
                className="global-search-container glass-panel"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 1rem',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    animation: 'slideDown 0.2s ease-out',
                }}
            >
                {/* Search Input */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--glass-border)',
                    gap: '12px',
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        id="global-search-input"
                        ref={inputRef}
                        type="text"
                        placeholder={filterType === 'all' ? 'Search everything...' : `Search ${filterType}s...`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search"
                        aria-autocomplete="list"
                        aria-controls="search-results"
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                        }}
                    />
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {filterType !== 'all' && (
                            <button
                                onClick={() => setFilterType('all')}
                                style={{
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    border: '1px solid var(--accent-cyan)',
                                    background: 'rgba(6, 182, 212, 0.15)',
                                    color: 'var(--accent-cyan)',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                {filterType.toUpperCase()} ✕
                            </button>
                        )}
                        <kbd style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.7rem',
                            fontFamily: 'monospace',
                        }}>
                            ESC
                        </kbd>
                    </div>
                </div>

                {/* Filter Pills */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    padding: '12px 20px',
                    borderBottom: '1px solid var(--glass-border)',
                    overflowX: 'auto',
                }}>
                    {[
                        { id: 'all', label: 'All', shortcut: '⇧⇧' },
                        { id: 'voucher', label: 'Vouchers', shortcut: '⇧V' },
                        { id: 'card', label: 'Cards', shortcut: '⇧C' },
                        { id: 'platform', label: 'Platforms', shortcut: '⇧P' },
                        { id: 'banking', label: 'Banking', shortcut: '⇧B' },
                    ].map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setFilterType(filter.id)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '20px',
                                border: filterType === filter.id
                                    ? '1px solid var(--accent-cyan)'
                                    : '1px solid var(--glass-border)',
                                background: filterType === filter.id
                                    ? 'rgba(6, 182, 212, 0.15)'
                                    : 'transparent',
                                color: filterType === filter.id
                                    ? 'var(--accent-cyan)'
                                    : 'var(--text-secondary)',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            {filter.label}
                            <span style={{
                                fontSize: '0.65rem',
                                opacity: 0.6,
                                fontFamily: 'monospace',
                            }}>
                                {filter.shortcut}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Results */}
                <div
                    ref={resultsRef}
                    id="search-results"
                    role="listbox"
                    style={{
                        maxHeight: '400px',
                        overflowY: 'auto',
                    }}
                >
                    {/* Search Results */}
                    {query && results.length > 0 && (
                        <ul style={{ listStyle: 'none', margin: 0, padding: '8px' }}>
                            {results.map((item, index) => {
                                const typeStyle = getTypeBadgeStyle(item.type);
                                return (
                                    <li
                                        key={`${item.type}-${item.path}-${index}`}
                                        data-index={index}
                                        role="option"
                                        aria-selected={index === selectedIndex}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        onClick={() => handleSelect(item)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            background: index === selectedIndex
                                                ? 'rgba(255, 255, 255, 0.08)'
                                                : 'transparent',
                                            transition: 'background 0.15s',
                                        }}
                                    >
                                        <span style={{ fontSize: '1.2rem' }}>
                                            {item.icon || '📄'}
                                        </span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                fontWeight: 500,
                                                color: 'var(--text-primary)',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}>
                                                {highlightMatch(item.name, query)}
                                            </div>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                color: 'var(--text-secondary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}>
                                                <span style={{
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    background: typeStyle.bg,
                                                    color: typeStyle.color,
                                                    fontSize: '0.7rem',
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                }}>
                                                    {item.type}
                                                </span>
                                                <span style={{ opacity: 0.7 }}>
                                                    {item.bank || item.category || item.description || ''}
                                                </span>
                                            </div>
                                        </div>
                                        {index === selectedIndex && (
                                            <kbd style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.7rem',
                                            }}>
                                                ↵
                                            </kbd>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {/* No Results */}
                    {query && results.length === 0 && (
                        <div style={{
                            padding: '3rem 2rem',
                            textAlign: 'center',
                            color: 'var(--text-secondary)',
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
                            <p style={{ margin: 0 }}>No results for "{query}"</p>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.7 }}>
                                Try different keywords or filters
                            </p>
                        </div>
                    )}

                    {/* Recent Searches */}
                    {!query && recentSearches.length > 0 && (
                        <div style={{ padding: '8px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '0.75rem',
                                color: 'var(--text-secondary)',
                            }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span>
                                        <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', marginRight: '4px' }}>↑</kbd>
                                        <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>↓</kbd>
                                        <span style={{ marginLeft: '6px' }}>Navigate</span>
                                    </span>
                                    <span>
                                        <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>↵</kbd>
                                        <span style={{ marginLeft: '6px' }}>Select</span>
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.8rem' }}>
                                    <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>⇧</kbd>
                                    <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', marginLeft: '2px' }}>B</kbd>
                                    <span style={{ marginLeft: '6px' }}>Banking</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '12px 20px',
                    borderTop: '1px solid var(--glass-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <span>
                            <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', marginRight: '4px' }}>↑</kbd>
                            <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>↓</kbd>
                            <span style={{ marginLeft: '6px' }}>Navigate</span>
                        </span>
                        <span>
                            <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>↵</kbd>
                            <span style={{ marginLeft: '6px' }}>Select</span>
                        </span>
                    </div>
                    <span>
                        <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>⌘</kbd>
                        <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', marginLeft: '2px' }}>K</kbd>
                        <span style={{ marginLeft: '6px' }}>to open</span>
                    </span>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideDown {
                    from { 
                        opacity: 0;
                        transform: translateY(-20px) scale(0.98);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default GlobalSearch;
