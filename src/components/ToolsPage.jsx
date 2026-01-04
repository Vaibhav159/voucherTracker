import React from 'react';

/**
 * ToolsPage - Card Genius
 * Implements the Tools Page design from Premium Dark Luxe v2 mockup
 */
const ToolsPage = () => {
    return (
        <div className="tools-page">
            <div className="tools-header">
                <h1 className="tools-title">
                    Card Genius
                </h1>
                <p className="tools-subtitle">You think your card is unbeatable? Let's find out.</p>
            </div>

            <div className="genius-card">
                <div className="genius-icon">💳</div>
                <h2 className="genius-cta-title">Add Your Credit Card</h2>
                <p className="genius-cta-desc">Compare your card with the best out there and find your perfect match in seconds.</p>
                <button className="add-card-btn">Add Card +</button>
            </div>

            {/* Spending Categories */}
            <div className="categories-section">
                <h3 className="categories-title">What card suits you? Select areas where you spend the most</h3>
                <div className="categories-grid">
                    {[
                        { name: 'Online Shopping', icon: '🛍️' },
                        { name: 'Paying Bills', icon: '📄' },
                        { name: 'Groceries', icon: '🥬' },
                        { name: 'Ordering Food', icon: '🍔' },
                        { name: 'Filling Fuel', icon: '⛽' },
                        { name: 'Dining Out', icon: '🍽️' },
                        { name: 'Flights/Hotels', icon: '✈️' },
                        { name: 'Movies', icon: '🎬' },
                    ].map((cat, i) => (
                        <div key={i} className="category-card">
                            <div className="category-icon">{cat.icon}</div>
                            <div className="category-name">{cat.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .tools-page {
          padding: 40px 48px;
          max-width: 1200px;
          margin: 0 auto;
          background: var(--bg-color, #0a0a0a);
          min-height: 100vh;
        }

        .tools-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .tools-title {
          font-size: 48px;
          font-weight: 400;
          color: var(--accent-gold-light, #e8c49a);
          font-family: var(--font-family-heading, Georgia, serif);
          margin: 0 0 8px 0;
        }

        .tools-subtitle {
          color: var(--text-secondary, #9ca3af);
          font-size: 16px;
        }

        .genius-card {
          max-width: 600px;
          margin: 0 auto;
          background: #f0f4ff;
          border-radius: 24px;
          padding: 48px;
          text-align: center;
        }

        /* Dark mode override for genius card if needed, or keep white as in mockup? 
           Mockup had specific colors. I'll stick to mockup's light card or adapt to dark theme?
           Mockup: background: '#f0f4ff', color: '#1a1a2e'. It looks like a "light" element in dark theme.
        */
        
        .genius-icon {
          font-size: 80px;
          margin-bottom: 24px;
        }

        .genius-cta-title {
          font-size: 28px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 12px;
        }

        .genius-cta-desc {
          color: #6b7280;
          margin-bottom: 32px;
        }

        .add-card-btn {
          padding: 16px 48px;
          background: #fff;
          border: 2px solid #e5e7eb;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          color: #6366f1;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-card-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        /* Categories */
        .categories-section {
          margin-top: 48px;
        }

        .categories-title {
          font-size: 20px;
          color: var(--accent-gold-light, #e8c49a);
          text-align: center;
          margin-bottom: 32px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 600px;
          margin: 0 auto;
        }

        .category-card {
          padding: 24px 16px;
          background: var(--bg-card, #141414);
          border-radius: 16px;
          border: 1px solid var(--border-color, #262626);
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .category-card:hover {
          border-color: var(--accent-gold, #d4a574);
          transform: translateY(-2px);
        }

        .category-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .category-name {
          font-size: 13px;
          color: var(--text-secondary, #9ca3af);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .tools-page { padding: 80px 24px; }
          .tools-title { font-size: 32px; }
          .categories-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
        </div>
    );
};

export default ToolsPage;
