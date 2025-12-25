import React from 'react';

const SearchBar = ({ value, onChange, selectedPlatform, onPlatformSelect, platforms }) => {
    return (
        <div style={{ marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem', position: 'relative', zIndex: 10 }}>
            {/* Search Input */}
            <div
                className="glass-panel"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.2rem 1.5rem',
                    marginBottom: '2rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
                    borderRadius: '50px', // Pill shape
                    background: 'rgba(0,0,0,0.4)'
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-cyan)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: '1rem', filter: 'drop-shadow(0 0 5px var(--accent-cyan))' }}
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    placeholder="Search for instant savings..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '1.2rem',
                        width: '100%',
                        outline: 'none',
                        fontFamily: 'inherit',
                        fontWeight: 500
                    }}
                />
            </div>

            {/* Modern Filter Pills */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                    onClick={() => onPlatformSelect(null)}
                    style={{
                        background: !selectedPlatform ? '#fff' : 'rgba(255,255,255,0.03)',
                        color: !selectedPlatform ? '#000' : 'var(--text-secondary)',
                        border: '1px solid var(--glass-border)',
                        padding: '10px 24px',
                        borderRadius: '100px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        boxShadow: !selectedPlatform ? '0 0 20px rgba(255,255,255,0.3)' : 'none'
                    }}
                >
                    All
                </button>
                {platforms.map(platform => (
                    <button
                        key={platform}
                        onClick={() => onPlatformSelect(platform)}
                        style={{
                            background: selectedPlatform === platform ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.03)',
                            color: selectedPlatform === platform ? '#000' : 'var(--text-secondary)',
                            border: selectedPlatform === platform ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                            padding: '10px 24px',
                            borderRadius: '100px',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            boxShadow: selectedPlatform === platform ? '0 0 20px rgba(0, 240, 255, 0.5)' : 'none'
                        }}
                    >
                        {platform}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
