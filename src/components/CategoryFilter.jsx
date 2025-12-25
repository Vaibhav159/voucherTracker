const CategoryFilter = ({ selectedCategory, onCategorySelect, categories }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
                onClick={() => onCategorySelect(null)}
                style={{
                    background: !selectedCategory ? 'var(--nav-bg-active)' : 'transparent',
                    color: !selectedCategory ? 'var(--nav-text-hover)' : 'var(--nav-text)',
                    border: '1px solid transparent',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    fontSize: '0.9rem',
                    fontWeight: !selectedCategory ? 600 : 400,
                    width: '100%'
                }}
            >
                All Categories
            </button>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onCategorySelect(category)}
                    style={{
                        background: selectedCategory === category ? 'var(--nav-bg-active)' : 'transparent',
                        color: selectedCategory === category ? 'var(--accent-pink)' : 'var(--nav-text)',
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
                        textOverflow: 'ellipsis',
                        boxShadow: selectedCategory === category ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                        width: '100%',
                        textAlign: 'left',
                        display: 'block' // Ensure text overflow works, block usually better for simple text buttons but let's try strict left

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
