const CategoryFilter = ({ selectedCategory, onCategorySelect, categories }) => {
    return (
        <div className="category-list">
            <button
                onClick={() => onCategorySelect(null)}
                className={`category-item ${!selectedCategory ? 'active' : ''}`}
            >
                <span className="category-item-text">All Categories</span>
                {/* Optional checkmark for active state */}
                {!selectedCategory && (
                    <span style={{ color: 'var(--accent-pink)', fontSize: '1.2rem' }}>•</span>
                )}
            </button>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onCategorySelect(category)}
                    className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                    title={category}
                >
                    <span className="category-item-text">{category}</span>
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
