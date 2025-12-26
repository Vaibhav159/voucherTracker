import React from 'react';

const SearchBar = ({ value, onChange, sortOption, onSortChange }) => {
    return (
        <div className="sticky-search-bar" style={{ marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
            {/* Search Input */}
            <div
                className="glass-panel"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem 1.5rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.03)'
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

                <div style={{ position: 'relative', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
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
                            paddingRight: '1.2rem'
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
    );
};

export default SearchBar;
