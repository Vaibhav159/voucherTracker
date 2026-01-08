import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, sortOption, onSortChange, onOpenShortcuts }) => {

    return (
        <div className="sticky-search-wrapper" data-tour="search">
            <div className="search-control-bar">

                {/* Search Input Section */}
                <div className="search-input-wrapper">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>

                    <input
                        type="text"
                        placeholder="Search vouchers, brands..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="search-input"
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

                {/* Divider */}
                <div className="divider"></div>

                {/* Sort Section */}
                <div className="sort-wrapper">
                    <div className="sort-trigger">
                        <span className="sort-label">
                            {sortOption === 'Recommended' ? 'Recommended' :
                                sortOption === 'Alphabetical' ? 'A-Z' : 'Best Discount'}
                        </span>

                        <svg className="sort-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>

                    {/* Invisible Native Select overlaying the custom trigger for full accessibility/functionality without custom dropdown logic */}
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
            </div>

            <style>{`
                /* Wrapper for positioning */
                .sticky-search-wrapper {
                    position: sticky;
                    top: 80px; /* Adjusted to cleared Header */
                    z-index: 90;
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto 1.5rem auto;
                    padding: 0 1rem;
                }

                /* The Main Pill */
                .search-control-bar {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(20, 20, 30, 0.4);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    border-radius: 16px; /* Match Guides */
                    padding: 0.5rem;
                    transition: all 0.3s ease;
                }

                .search-control-bar:focus-within {
                    border-color: var(--accent-cyan-dim, rgba(6, 182, 212, 0.3));
                    box-shadow: 0 10px 50px -10px rgba(0, 240, 255, 0.15);
                }

                /* Search Section */
                .search-input-wrapper {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    position: relative;
                }

                .search-icon {
                    position: absolute;
                    left: 12px;
                    width: 18px;
                    height: 18px;
                    color: var(--text-secondary);
                    pointer-events: none;
                    transition: color 0.2s;
                }

                .search-control-bar:focus-within .search-icon {
                    color: var(--accent-cyan);
                }

                .search-input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    color: var(--text-primary);
                    font-size: 1rem;
                    padding: 10px 10px 10px 42px; /* Space for icon */
                    outline: none;
                    font-family: inherit;
                    font-weight: 500;
                }

                .search-input::placeholder {
                    color: var(--text-secondary);
                    opacity: 0.7;
                }

                /* Shortcuts Badge */
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
                    margin-right: 0.5rem; /* Space before divider */
                    transition: all 0.2s ease;
                }

                .shortcuts-badge:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--text-primary);
                }

                /* Divider */
                .divider {
                    width: 1px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    margin: 0 0.25rem;
                }

                /* Sort Section */
                .sort-wrapper {
                    position: relative;
                    min-width: 140px; /* Ensure enough space for text */
                }

                .sort-trigger {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid transparent; /* Match guides hover state spacing */
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    font-weight: 500;
                    padding: 10px 16px;
                    border-radius: 12px;
                    transition: all 0.2s;
                    white-space: nowrap;
                    cursor: pointer;
                    height: 42px;
                }

                .sort-trigger:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--text-primary);
                }

                /* Overlay Select for Functionality */
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

                /* Responsive */
                @media (max-width: 600px) {
                    .sticky-search-wrapper {
                        padding: 0 12px;
                        top: 10px;
                        margin-bottom: 1rem;
                    }

                    .search-control-bar {
                        padding: 4px; /* Tighter padding on mobile */
                    }

                    .search-input {
                        font-size: 16px; /* Stop zoom */
                        padding-left: 36px;
                    }

                    .search-icon {
                        left: 8px;
                    }

                    .shortcuts-badge, .hide-mobile {
                        display: none;
                    }

                    .sort-wrapper {
                        min-width: auto;
                    }

                    .sort-label {
                        display: none; /* Hide text on mobile just like Guides */
                    }

                    .sort-trigger {
                        padding: 10px;
                        justify-content: center;
                        gap: 0;
                        width: 42px; /* Square-ish on mobile */
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
