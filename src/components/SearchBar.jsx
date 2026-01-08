import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, sortOption, onSortChange, onOpenShortcuts }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`sticky-search-bar ${isScrolled ? 'scrolled' : ''}`} data-tour="search">
            <div className="search-container-inner">

                {/* Search Input Group */}
                <div className="search-input-group">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={onOpenShortcuts}
                        title="View Keyboard Shortcuts"
                        className="shortcuts-badge"
                    >
                        <span>⌘</span>
                        <span className="hide-mobile">SHORTCUTS</span>
                    </button>
                </div>

                {/* Sort Dropdown Group */}
                <div className="sort-dropdown-group">
                    <div className="select-wrapper">
                        <select
                            value={sortOption || 'Recommended'}
                            onChange={(e) => onSortChange(e.target.value)}
                            aria-label="Sort options"
                        >
                            <option value="Recommended">Recommended</option>
                            <option value="Alphabetical">A-Z</option>
                            <option value="Discount">Best Discount</option>
                        </select>
                        <div className="select-arrow">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 1l4 4 4-4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                /* --- Desktop Layout (Standard) --- */
                .sticky-search-bar {
                    margin: 0 auto 1.5rem;
                    width: 100%;
                    position: sticky;
                    top: 80px; /* Adjust this based on your Header height */
                    z-index: 90;
                    transition: all 0.3s ease;
                    padding: 0 1rem; /* Added base padding for safety */
                }

                .search-container-inner {
                    display: flex;
                    gap: 1rem;
                    width: 100%;
                    max-width: 1200px; /* Optional: Constrain max width */
                    margin: 0 auto;
                    align-items: stretch;
                    transition: gap 0.3s ease;
                }

                /* Collapse gap when scrolled (Desktop Only) */
                .sticky-search-bar.scrolled .search-container-inner {
                    gap: 0;
                }

                /* --- Search Input Group --- */
                .search-input-group {
                    display: flex;
                    align-items: center;
                    background: rgba(20, 20, 30, 0.4);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 0 1rem;
                    flex: 1;
                    height: 48px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }

                .sticky-search-bar.scrolled .search-input-group {
                    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.3);
                }

                .search-input-group:focus-within {
                    border-color: rgba(6, 182, 212, 0.5);
                    box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.1);
                }

                .search-icon {
                    width: 18px;
                    height: 18px;
                    margin-right: 0.75rem;
                    opacity: 0.7;
                    stroke: var(--text-secondary);
                    flex-shrink: 0; /* Prevent icon squishing */
                }

                .search-input-group input {
                    background: transparent;
                    border: none;
                    color: var(--text-primary);
                    font-size: 0.95rem;
                    flex: 1;
                    min-width: 0;
                    height: 100%;
                    outline: none;
                    font-family: inherit;
                    font-weight: 400;
                }

                .shortcuts-badge {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 6px;
                    padding: 4px 8px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    color: var(--text-secondary);
                    font-size: 0.7rem;
                    font-weight: 600;
                    height: 28px;
                    margin-left: 0.5rem;
                    transition: all 0.2s ease;
                }

                /* --- Sort Dropdown Group --- */
                .sort-dropdown-group {
                    position: relative;
                    min-width: 160px;
                    max-width: 200px;
                    width: auto;
                    opacity: 1;
                    transform: translateX(0);
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Collapsed State (Desktop Only) */
                .sticky-search-bar.scrolled .sort-dropdown-group {
                    min-width: 0;
                    max-width: 0;
                    width: 0;
                    opacity: 0;
                    transform: translateX(20px);
                    pointer-events: none;
                }

                .select-wrapper select {
                    width: 100%;
                    height: 48px;
                    appearance: none;
                    background: rgba(20, 20, 30, 0.4);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 0 2.5rem 0 1rem;
                    color: var(--text-primary);
                    font-size: 0.9rem;
                    cursor: pointer;
                    outline: none;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }

                .select-arrow {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    color: var(--text-secondary);
                }

                /* --- MOBILE FIXES --- */
                @media (max-width: 600px) {
                    .sticky-search-bar {
                        padding: 0 12px;
                        top: 68px; /* Ensure this matches your Header height! */
                    }

                    .search-container-inner {
                        gap: 10px !important; /* Force gap to stay */
                    }

                    /* 1. Stop the Collapse Animation on Mobile */
                    /* Users want to sort while scrolling without jumping to top */
                    .sticky-search-bar.scrolled .sort-dropdown-group,
                    .sort-dropdown-group {
                        width: 110px !important;
                        min-width: 110px !important;
                        max-width: 110px !important;
                        opacity: 1 !important;
                        transform: none !important;
                        pointer-events: auto !important;
                    }

                    /* 2. Stabilize Input Height */
                    .search-input-group,
                    .select-wrapper select {
                        height: 44px; /* Standard mobile tap size */
                    }

                    /* 3. Refine Input Font Size (stops iOS zoom) */
                    .search-input-group input,
                    .select-wrapper select {
                        font-size: 16px;
                    }

                    /* 4. Hide Shortcuts */
                    .shortcuts-badge, .hide-mobile {
                        display: none;
                    }

                    /* 5. Tighter Mobile Padding inside inputs */
                    .search-input-group {
                        padding: 0 10px;
                        background: rgba(20, 20, 30, 0.7); /* Slightly darker for contrast */
                    }

                    .select-wrapper select {
                        padding: 0 24px 0 10px;
                        background: rgba(20, 20, 30, 0.7);
                    }

                    .select-arrow {
                        right: 8px;
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
