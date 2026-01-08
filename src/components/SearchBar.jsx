import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, sortOption, onSortChange, onOpenShortcuts }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`sticky-search-bar ${isScrolled ? 'scrolled' : ''}`}
            data-tour="search"
            style={{
                marginBottom: '1.5rem',
                width: '100%',
                margin: '0 auto 1.5rem',
                position: 'sticky',
                top: '80px',
                zIndex: 90,
                transition: 'all 0.3s ease',
            }}
        >
            <div className="search-container-inner" style={{ transition: 'all 0.3s ease' }}>
                {/* Search Input Container */}
                <div
                    className="search-input-container"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        // Styles matching Guides search bar
                        background: 'rgba(20, 20, 30, 0.4)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px', // Slightly rounder like guides
                        padding: '0 1rem',
                        flex: 1,
                        height: '48px',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        boxShadow: isScrolled ? '0 10px 40px -10px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--text-secondary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ marginRight: '0.75rem', opacity: 0.7 }}
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '0.95rem',
                            flex: 1,
                            minWidth: 0,
                            height: '100%',
                            outline: 'none',
                            fontFamily: 'inherit',
                            fontWeight: 400
                        }}
                    />

                    {/* Shortcuts Badge */}
                    <button
                        onClick={onOpenShortcuts}
                        title="View Keyboard Shortcuts"
                        className="shortcuts-badge"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            height: '28px',
                            marginLeft: '0.5rem',
                            textTransform: 'uppercase',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        }}
                    >
                        <span>⌘</span>
                        <span className="hide-mobile">SHORTCUTS</span>
                    </button>
                </div>

                {/* Sort Dropdown Container */}
                <div
                    className="sort-dropdown-container"
                    style={{
                        position: 'relative',
                        minWidth: isScrolled ? '0px' : '160px',
                        maxWidth: isScrolled ? '0px' : '200px',
                        width: isScrolled ? '0px' : 'auto',
                        opacity: isScrolled ? 0 : 1,
                        overflow: 'hidden',
                        marginLeft: isScrolled ? '0' : '0', // Gap handled by parent flex gap, need to be careful
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        pointerEvents: isScrolled ? 'none' : 'auto',
                        transform: isScrolled ? 'translateX(20px)' : 'translateX(0)',
                    }}
                >
                    <select
                        value={sortOption || 'Recommended'}
                        onChange={(e) => onSortChange(e.target.value)}
                        style={{
                            width: '100%',
                            height: '48px',
                            appearance: 'none',
                            background: 'rgba(20, 20, 30, 0.4)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '0 2.5rem 0 1rem',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontWeight: 400,
                            cursor: 'pointer',
                            outline: 'none',
                            fontFamily: 'inherit',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <option value="Recommended">Recommended</option>
                        <option value="Alphabetical">A-Z</option>
                        <option value="Discount">Best Discount</option>
                    </select>
                    {/* Custom Arrow */}
                    <div style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        opacity: isScrolled ? 0 : 1,
                        transition: 'opacity 0.2s'
                    }}>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1l4 4 4-4" /></svg>
                    </div>
                </div>
            </div>

            <style>{`
                .search-container-inner {
                    display: flex;
                    gap: ${isScrolled ? '0' : '1rem'};
                    width: 100%;
                    align-items: stretch;
                }
                .sticky-search-bar input::placeholder {
                    color: var(--text-secondary);
                    opacity: 0.5;
                }
                .search-input-container:focus-within,
                .sort-dropdown-container select:focus {
                    border-color: rgba(6, 182, 212, 0.5) !important;
                    box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.1) !important;
                }

                @media (max-width: 600px) {
                    .search-container-inner {
                        flex-direction: row; /* Side by side on mobile for premium look */
                        gap: 10px; /* Tighter gap */
                        align-items: center;
                    }

                    .hide-mobile {
                        display: none;
                    }

                    .sticky-search-bar {
                        padding: 0 16px; /* Standard mobile padding */
                        top: 68px !important; /* Visual fix: closer to header (64px approx height) */
                    }

                    /* Refined Search Input on Mobile */
                    .search-input-container {
                        flex: 1; /* Take available space */
                        min-width: 0;
                        padding: 0 12px !important;
                        background: rgba(20, 20, 30, 0.6) !important; /* Slightly darker for contrast */
                        height: 44px !important; /* Standard mobile touch target */
                    }

                    .search-input-container svg {
                        width: 16px;
                        height: 16px;
                        margin-right: 8px !important;
                    }

                    .search-input-container input {
                        font-size: 14px !important; /* Prevent zoom on iOS */
                    }

                    .shortcuts-badge {
                        display: none !important;
                    }

                    /* Refined Sort Dropdown on Mobile */
                    .sort-dropdown-container {
                        min-width: auto !important;
                        width: 110px !important; /* Fixed compact width */
                        max-width: 110px !important; /* Ensure it doesn't grow */
                        flex-shrink: 0;
                        height: 44px !important;
                        transform: ${isScrolled ? 'translateX(10px)' : 'none'}; /* Subtle hide animation if needed, or remove */
                        opacity: ${isScrolled ? '0' : '1'};
                        width: ${isScrolled ? '0 !important' : '110px !important'};
                        margin-right: ${isScrolled ? '-10px' : '0'};
                    }

                    .sort-dropdown-container select {
                        padding: 0 24px 0 12px !important; /* Tighter padding */
                        font-size: 13px !important;
                        height: 44px !important;
                        background: rgba(20, 20, 30, 0.6) !important;
                    }

                    /* Adjust arrow position */
                    .sort-dropdown-container div {
                         right: 8px !important;
                    }
                }
            `}</style>
        </div>
    );
};

SearchBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    sortOption: PropTypes.string,
    onSortChange: PropTypes.func.isRequired,
    onOpenShortcuts: PropTypes.func,
};

export default SearchBar;
