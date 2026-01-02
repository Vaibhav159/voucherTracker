import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, sortOption, onSortChange, onOpenShortcuts }) => {
    return (
        <div className="sticky-search-bar" data-tour="search" style={{ marginBottom: '1rem' }}>
            {/* Search Input */}
            <div
                className="glass-panel"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    borderRadius: '16px',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--text-secondary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: '1rem' }}
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    placeholder="Search for brands..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '1rem',
                        width: '100%',
                        outline: 'none',
                        fontFamily: 'inherit',
                        fontWeight: 400
                    }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={onOpenShortcuts}
                        title="View Keyboard Shortcuts"
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            height: '32px',
                            transition: 'background 0.2s ease',
                            whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    >
                        <span>⌘</span>
                        <span className="hide-mobile">Shortcuts</span>
                    </button>

                    <div style={{ position: 'relative', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.1)', minWidth: '180px' }}>
                        <select
                            value={sortOption || 'Recommended'}
                            onChange={(e) => onSortChange(e.target.value)}
                            style={{
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                border: 'none',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                outline: 'none',
                                appearance: 'none', // Remove default arrow
                                paddingRight: '1.5rem',
                                width: '100%'
                            }}
                        >
                            <option value="Recommended">Recommended</option>
                            <option value="Alphabetical">A-Z</option>
                            <option value="Discount">Best Discount</option>
                        </select>
                        {/* Custom Arrow */}
                        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1l4 4 4-4" /></svg>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 600px) {
                    .hide-mobile {
                        display: none;
                    }
                    /* Also hide the button itself on mobile if desired, or keep icon only */
                    /* User request: "we dont have those shortcuts there" -> imply hiding the button */
                    button[title="View Keyboard Shortcuts"] {
                        display: none !important;
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
