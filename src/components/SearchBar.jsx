import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, sortOption, onSortChange, onOpenShortcuts }) => {
    return (
        <div className="sticky-search-bar" data-tour="search" style={{ marginBottom: '1.5rem', width: '100%', margin: '0 auto 1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', width: '100%', alignItems: 'stretch' }}>
                {/* Search Input Container */}
                <div
                    className="search-input-container"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        padding: '0 1rem',
                        flex: 1,
                        height: '48px',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
                        minWidth: '160px'
                    }}
                >
                    <select
                        value={sortOption || 'Recommended'}
                        onChange={(e) => onSortChange(e.target.value)}
                        style={{
                            width: '100%',
                            height: '48px',
                            appearance: 'none',
                            background: 'var(--glass-bg)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '12px',
                            padding: '0 2.5rem 0 1rem',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontWeight: 400,
                            cursor: 'pointer',
                            outline: 'none',
                            fontFamily: 'inherit',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
                        display: 'flex'
                    }}>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1l4 4 4-4" /></svg>
                    </div>
                </div>
            </div>

            <style>{`
                .sticky-search-bar input::placeholder {
                    color: var(--text-secondary);
                    opacity: 0.5;
                }
                .search-input-container:focus-within,
                .sort-dropdown-container select:focus {
                    border-color: rgba(255, 255, 255, 0.2) !important;
                    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.05) !important;
                }

                @media (max-width: 600px) {
                    .hide-mobile {
                        display: none;
                    }
                    .sticky-search-bar {
                        padding: 0 1rem;
                    }
                    .shortcuts-badge {
                        padding: 4px 6px !important;
                    }
                    .sort-dropdown-container {
                        min-width: 50px !important; /* Shrink to icon only possibly? Or just smaller */
                        flex-shrink: 0;
                    }
                    .sort-dropdown-container select {
                        padding-right: 1.5rem !important;
                        font-size: 0.85rem !important;
                        text-overflow: clip; /* Or hide text and show icon? For now keep text */
                    }
                    /* For separate line on mobile? No, let's keep side-by-side but squeeze */
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
