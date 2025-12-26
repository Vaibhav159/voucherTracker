import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import vouchers from '../data/vouchers.json';
import { creditCards } from '../data/creditCards';
import guidesData from '../data/guides.json';

const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const lastShiftKeyTime = useRef(0);

    // Hardcoded Pages
    const pages = [
        { name: 'Home', type: 'page', path: '/', tags: ['dashboard', 'main'] },
        { name: 'Know Your Cards', type: 'page', path: '/know-your-cards', tags: ['credit', 'cards', 'compare'] },
        { name: 'Guides', type: 'page', path: '/guides', tags: ['tutorials', 'help', 'blog'] },
        { name: 'Compare Cards', type: 'page', path: '/compare-cards', tags: ['comparison', 'diff'] },
        { name: 'Ask AI', type: 'page', path: '/ask-ai', tags: ['ai', 'chat', 'bot'] }
    ];

    // Combine all searchable items
    const allItems = useMemo(() => {
        const voucherItems = vouchers.map(v => ({
            ...v,
            name: v.brand,
            type: 'voucher',
            path: `/voucher/${v.id}`
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

        return [...pages, ...voucherItems, ...cardItems, ...guideItems];
    }, []);

    // toggle search logic
    const toggleSearch = () => {
        setIsOpen(prev => !prev);
        setQuery('');
        setSelectedIndex(0);
    };

    // Keyboard Event Listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            // CMD+K or CTRL+K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleSearch();
                return;
            }

            // Double Shift
            if (e.key === 'Shift') {
                const now = Date.now();
                if (now - lastShiftKeyTime.current < 500) {
                    toggleSearch();
                }
                lastShiftKeyTime.current = now;
            }

            // Escape to close
            if (isOpen && e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Focus input when open
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 10);
        }
    }, [isOpen]);

    // Filter results
    const results = useMemo(() => {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();

        return allItems.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(lowerQuery);
            const tagMatch = item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
            const bankMatch = item.bank?.toLowerCase().includes(lowerQuery);
            return nameMatch || tagMatch || bankMatch;
        }).slice(0, 10); // Limit to 10 results
    }, [query, allItems]);

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

        } else {
            navigate(item.path);
        }
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div
            className="global-search-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 10000, // Very high z-index
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '15vh'
            }}
            onClick={() => setIsOpen(false)}
        >
            <div
                className="global-search-container glass-panel"
                style={{
                    width: '600px',
                    maxWidth: '90%',
                    background: 'var(--card-bg)', // improved generic theme
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    borderBottom: '1px solid var(--glass-border)'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search anything..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '1.2rem',
                            outline: 'none'
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        gap: '8px'
                    }}>
                        <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            background: 'rgba(255,255,255,0.1)',
                            padding: '2px 6px',
                            borderRadius: '4px'
                        }}>ESC</span>
                    </div>
                </div>

                {results.length > 0 ? (
                    <ul style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: '8px 0',
                        maxHeight: '400px',
                        overflowY: 'auto'
                    }}>
                        {results.map((item, index) => (
                            <li
                                key={index}
                                onMouseEnter={() => setSelectedIndex(index)}
                                onClick={() => handleSelect(item)}
                                style={{
                                    padding: '12px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    cursor: 'pointer',
                                    background: index === selectedIndex ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                                    borderLeft: index === selectedIndex ? '3px solid var(--accent-cyan)' : '3px solid transparent'
                                }}
                            >
                                {/* Icons based on type */}
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-secondary)'
                                }}>
                                    {item.type === 'page' && <span>📄</span>}
                                    {item.type === 'voucher' && <span>🎟️</span>}
                                    {item.type === 'card' && <span>💳</span>}
                                    {item.type === 'guide' && <span>📚</span>}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{item.name}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                        {item.type.toUpperCase()} • {item.description || item.bank || item.category || 'Page'}
                                    </div>
                                </div>

                                {index === selectedIndex && (
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>↵</span>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : query && (
                    <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        No results found for "{query}"
                    </div>
                )}

                {!query && (
                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        Type to search for Vouchers, Credit Cards, Guides, and Pages...
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlobalSearch;
