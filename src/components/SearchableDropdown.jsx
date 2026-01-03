import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * SearchableDropdown - Premium Reusable Dropdown
 * 
 * Features:
 * - Searchable options
 * - Glassmorphism UI
 * - Click outside to close
 * - Keyboard navigation support
 */
const SearchableDropdown = ({
    options = [],
    value,
    onChange,
    placeholder = 'Select an option',
    label = 'Select',
    icon = null,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef(null);
    const searchInputRef = useRef(null);

    // Filter options based on search term
    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options;
        return options.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm]);

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm(''); // Reset search on close
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when opened
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const handleSelect = (option) => {
        onChange(option === value ? null : option); // Toggle behavior
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div
            className={`searchable-dropdown-container ${className}`}
            ref={containerRef}
            style={{ position: 'relative', width: '100%' }}
        >
            {/* Trigger Button */}
            <button
                className={`dropdown-trigger ${isOpen ? 'active' : ''} ${value ? 'has-value' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    color: value ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    boxShadow: isOpen ? '0 0 0 2px rgba(139, 92, 246, 0.2)' : 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                    {icon && <span style={{ fontSize: '1.1rem' }}>{icon}</span>}
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {value || label}
                    </span>
                </div>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        opacity: 0.5,
                        flexShrink: 0
                    }}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="dropdown-menu glass-panel" style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    width: '100%',
                    maxHeight: '300px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 50,
                    padding: '8px',
                    borderRadius: '12px',
                    background: 'var(--modal-bg)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                    animation: 'slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                    {/* Search Input */}
                    <div style={{ padding: '0 4px 8px 4px', borderBottom: '1px solid var(--glass-border)', marginBottom: '4px' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder={placeholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px 8px 36px',
                                    borderRadius: '8px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid transparent',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                            />
                            <svg
                                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>

                    {/* Options List */}
                    <div className="custom-scrollbar" style={{ overflowY: 'auto', flex: 1, paddingRight: '2px' }}>
                        {/* 'All' Option */}
                        <div
                            onClick={() => handleSelect(null)}
                            style={{
                                padding: '10px 12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: !value ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                                background: !value ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.15s',
                                marginBottom: '2px'
                            }}
                            onMouseEnter={(e) => {
                                if (value) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                                if (value) e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <span>All {label}s</span>
                            {!value && <span>•</span>}
                        </div>

                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    style={{
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        color: value === option ? 'var(--accent-pink)' : 'var(--text-secondary)',
                                        background: value === option ? 'rgba(236, 72, 153, 0.1)' : 'transparent',
                                        transition: 'all 0.15s',
                                        marginBottom: '1px'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (value !== option) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                            e.currentTarget.style.color = 'var(--text-primary)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (value !== option) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                        }
                                    }}
                                >
                                    {option}
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                No results found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

SearchableDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.node,
    className: PropTypes.string
};

export default SearchableDropdown;
