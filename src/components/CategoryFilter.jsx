const CategoryFilter = ({ selectedCategory, onCategorySelect, categories }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
                onClick={() => onCategorySelect(null)}
                style={{
                    background: !selectedCategory ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: !selectedCategory ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid transparent',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    fontSize: '0.9rem',
                    fontWeight: !selectedCategory ? 600 : 400
                }}
            >
                All Categories
            </button>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onCategorySelect(category)}
                    style={{
                        background: selectedCategory === category ? 'rgba(189, 0, 255, 0.15)' : 'transparent',
                        color: selectedCategory === category ? 'var(--accent-purple)' : 'var(--text-secondary)',
                        border: '1px solid transparent',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        fontSize: '0.9rem',
                        fontWeight: selectedCategory === category ? 600 : 400,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                    title={category}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
