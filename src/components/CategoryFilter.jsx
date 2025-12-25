import React from 'react';

const CategoryFilter = ({ selectedCategory, onCategorySelect, categories }) => {
    return (
        <div style={{ marginBottom: '2rem', overflowX: 'auto', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'nowrap', minWidth: 'min-content', padding: '0 20px' }}>
                <button
                    onClick={() => onCategorySelect(null)}
                    style={{
                        background: !selectedCategory ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        border: !selectedCategory ? '1px solid var(--accent-purple)' : '1px solid var(--glass-border)',
                        padding: '8px 20px',
                        borderRadius: '100px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        whiteSpace: 'nowrap',
                        boxShadow: !selectedCategory ? '0 0 15px rgba(189, 0, 255, 0.4)' : 'none'
                    }}
                >
                    All Categories
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => onCategorySelect(category)}
                        style={{
                            background: selectedCategory === category ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                            color: '#fff',
                            border: selectedCategory === category ? '1px solid var(--accent-purple)' : '1px solid var(--glass-border)',
                            padding: '8px 20px',
                            borderRadius: '100px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            whiteSpace: 'nowrap',
                            boxShadow: selectedCategory === category ? '0 0 15px rgba(189, 0, 255, 0.4)' : 'none'
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
