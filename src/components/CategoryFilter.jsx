import React, { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const CategoryFilter = ({ selectedCategory, onCategorySelect, categories }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce search term to avoid filtering on every keystroke
    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    const filteredCategories = categories.filter(category =>
        category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: 0, /* Enable flex shrinking */
            overflow: 'hidden' /* Contain children */
        }}>
            {/* Search Bar */}
            <div className="category-search-wrapper">
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="category-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                    className="category-search-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                /* Style removed to rely on CSS centering */
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>

            <div className="category-list">
                {/* Always show "All Categories" unless searching (optional, let's keep it always visible for easy reset) */}
                {!searchTerm && (
                    <button
                        onClick={() => onCategorySelect(null)}
                        className={`category-item ${!selectedCategory ? 'active' : ''}`}
                    >
                        <span className="category-item-text">All Categories</span>
                        {!selectedCategory && (
                            <span style={{ color: 'var(--accent-pink)', fontSize: '1.2rem' }}>•</span>
                        )}
                    </button>
                )}

                {filteredCategories.length > 0 ? (
                    filteredCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => onCategorySelect(category)}
                            className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                            title={category}
                        >
                            <span className="category-item-text">{category}</span>
                        </button>
                    ))
                ) : (
                    <div style={{ padding: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
                        No categories found
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryFilter;
