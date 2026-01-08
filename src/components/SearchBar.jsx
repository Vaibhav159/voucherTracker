import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, sortOption, onSortChange, onOpenShortcuts }) => {

    const getSortLabel = (option) => {
        switch (option) {
            case 'Alphabetical': return 'A-Z';
            case 'Discount': return 'Best Discount';
            default: return 'Recommended';
        }
    };

    return (
        <div className="guides-control-bar" style={{ marginBottom: '1.5rem', width: '100%', maxWidth: '100%' }} data-tour="search">
            <div className="guides-search-wrapper">
                <div className="guides-search-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input
                    type="text"
                    className="guides-search-input"
                    placeholder="Search vouchers, brands..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={{ paddingRight: '110px' }}
                />

                <button
                    type="button"
                    onClick={onOpenShortcuts}
                    className="shortcuts-badge"
                    title="View Keyboard Shortcuts"
                >
                    <span>⌘</span>
                    <span className="hide-mobile">SHORTCUTS</span>
                </button>
            </div>

            <div className="guides-divider"></div>

            <div style={{ position: 'relative' }}>
                <button className="guides-filter-trigger">
                    <span>{getSortLabel(sortOption)}</span>
                    <span className="arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </span>
                </button>

                <select
                    value={sortOption || 'Recommended'}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="sort-select-overlay"
                    aria-label="Sort options"
                >
                    <option value="Recommended">Recommended</option>
                    <option value="Alphabetical">A-Z</option>
                    <option value="Discount">Best Discount</option>
                </select>
            </div>

            <style>{`
                .shortcuts-badge {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
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
                    transition: all 0.2s ease;
                    z-index: 5;
                }

                .shortcuts-badge:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--text-primary);
                }

                .sort-select-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    cursor: pointer;
                    appearance: none;
                }

                @media (max-width: 600px) {
                    .guides-control-bar {
                        top: 10px !important;
                    }
                    .shortcuts-badge, .hide-mobile {
                        display: none;
                    }
                    .guides-search-input {
                        padding-right: 16px !important;
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
