import React, { useState, useMemo } from 'react';
import { useCreditCards } from '../hooks/useCreditCards';
import LoadingSpinner from './LoadingSpinner';

/**
 * CardsPage - Best Credit Cards Comparison Page
 * Implements the "Best Credit Cards For You" design from Premium Dark Luxe v2 mockup
 */
const CardsPage = () => {
    const { cards, loading } = useCreditCards();
    const [selectedCards, setSelectedCards] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All Cards');
    const [showCompare, setShowCompare] = useState(false);

    const toggleCardSelect = (cardId) => {
        if (selectedCards.includes(cardId)) {
            setSelectedCards(selectedCards.filter(id => id !== cardId));
        } else {
            if (selectedCards.length >= 3) {
                alert("You can only compare up to 3 cards");
                return;
            }
            setSelectedCards([...selectedCards, cardId]);
        }
    };

    // Helper to get card gradient
    const getCardGradient = (card) => {
        const bank = card.bank?.toLowerCase() || '';
        if (bank.includes('hdfc')) return 'linear-gradient(135deg, #0c0c0c 0%, #434343 100%)';
        if (bank.includes('icici')) return 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)';
        if (bank.includes('axis')) return 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)';
        if (bank.includes('sbi')) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        return 'linear-gradient(135deg, #d4a574 0%, #8b6914 100%)';
    };

    // Helper to get card icon
    const getCardIcon = (card) => {
        if (card.icon) return card.icon;
        const name = card.name?.toLowerCase() || '';
        if (name.includes('travel') || name.includes('atlas')) return '✈️';
        if (name.includes('amazon') || name.includes('shopping')) return '🛒';
        if (name.includes('fuel') || name.includes('bpcl')) return '⛽';
        if (name.includes('food') || name.includes('swiggy') || name.includes('zomato')) return '🍔';
        return '💳';
    };

    // Filter cards based on active category
    const filteredCards = useMemo(() => {
        if (!cards) return [];
        if (activeCategory === 'All Cards') return cards;
        return cards.filter(card => {
            // Simple keyword matching for demo purposes
            const searchStr = (card.name + card.bestFor + (card.tags || []).join(' ')).toLowerCase();
            return searchStr.includes(activeCategory.toLowerCase().replace(' cards', ''));
        });
    }, [cards, activeCategory]);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><LoadingSpinner /></div>;

    return (
        <div className="cards-page">
            <div className="cards-header">
                <h1 className="cards-title">
                    Best Credit Cards For You
                </h1>
                <p className="cards-subtitle">Showing {filteredCards.length} Credit Cards</p>
            </div>

            {/* Category Icons */}
            <div className="category-tabs">
                {[
                    { name: 'All Cards', icon: '💳' },
                    { name: 'Fuel', icon: '⛽' },
                    { name: 'Shopping', icon: '🛍️' },
                    { name: 'Food', icon: '🍔' },
                    { name: 'Dining', icon: '🍽️' },
                    { name: 'Travel', icon: '✈️' },
                ].map((cat, i) => (
                    <div
                        key={i}
                        className={`category-tab ${activeCategory === cat.name ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.name)}
                    >
                        <div className="cat-icon">{cat.icon}</div>
                        <div className="cat-name">{cat.name}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="filters-bar">
                {['Filters', 'Sort By', 'Eligibility', 'Free Cards Only'].map((filter, i) => (
                    <button key={i} className={`filter-btn ${i === 1 ? 'elevated' : ''}`}>
                        {filter} {i < 3 && <span>▾</span>}
                    </button>
                ))}
            </div>

            {/* Cards List */}
            <div className="cards-list">
                {filteredCards.map(card => (
                    <div key={card.id || card.name} className={`card-item ${selectedCards.includes(card.id) ? 'selected' : ''}`}>
                        {/* Card Visual */}
                        <div className="card-visual" style={{ background: getCardGradient(card) }}>
                            <div className="card-visual-icon">{getCardIcon(card)}</div>
                            <div className="card-joining-fee">JOINING FEE {card.fees?.joining || 'Free'}</div>
                        </div>

                        {/* Card Info */}
                        <div className="card-info">
                            <div className="card-info-header">
                                <div>
                                    <h3 className="card-name">{card.name}</h3>
                                    <p className="card-bank">{card.bank}</p>
                                </div>
                                <div className="card-savings-badge">
                                    <div className="savings-label">Annual Savings</div>
                                    <div className="savings-val">{card.rewards?.base?.value || '₹2,500+'}</div>
                                </div>
                            </div>

                            <div className="card-benefits">
                                <p>✨ {card.rewardRate || 'Best in class rewards'}</p>
                                <p>✨ {card.bestFor || 'Great for all spends'}</p>
                            </div>

                            <div className="card-tags">
                                {(card.tags || [card.tier]).filter(Boolean).slice(0, 3).map((tag, i) => (
                                    <span key={i} className="card-tag">{tag}</span>
                                ))}
                            </div>

                            <button
                                onClick={() => toggleCardSelect(card.id)}
                                className={`compare-btn ${selectedCards.includes(card.id) ? 'active' : ''}`}
                            >
                                {selectedCards.includes(card.id) ? '✓ Added to Compare' : 'Add To Compare'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Compare Bar */}
            {selectedCards.length > 0 && (
                <div className="compare-bar">
                    <span className="compare-count">{selectedCards.length}/3 cards selected</span>
                    <button
                        onClick={() => setShowCompare(true)}
                        className="compare-now-btn"
                    >+ Compare Now</button>
                    <button onClick={() => setSelectedCards([])} className="compare-clear-btn">Clear</button>
                </div>
            )}

            <style>{`
        .cards-page {
          padding: 40px 48px;
          max-width: 1400px;
          margin: 0 auto;
          background: var(--bg-color, #0a0a0a);
          min-height: 100vh;
        }

        .cards-header {
          margin-bottom: 40px;
        }

        .cards-title {
          font-size: 48px;
          font-weight: 400;
          color: var(--accent-gold-light, #e8c49a);
          font-family: var(--font-family-heading, Georgia, serif);
          margin: 0 0 8px 0;
        }

        .cards-subtitle {
          color: var(--text-secondary, #9ca3af);
          font-size: 16px;
        }

        /* Category Tabs */
        .category-tabs {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .category-tab {
          padding: 16px 24px;
          background: var(--bg-card, #141414);
          borderRadius: 16px;
          border: 1px solid var(--border-color, #262626);
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
          min-width: 100px;
        }

        .category-tab.active {
          background: var(--accent-gold, #d4a574);
          border-color: var(--accent-gold, #d4a574);
        }

        .cat-icon {
          font-size: 28px;
          margin-bottom: 8px;
        }

        .cat-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary, #9ca3af);
        }

        .category-tab.active .cat-name {
          color: #000;
          text-decoration: underline;
        }

        /* Filters */
        .filters-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 12px 20px;
          background: transparent;
          border: 1px solid var(--border-color, #262626);
          border-radius: 10px;
          color: var(--text-secondary, #9ca3af);
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
      }

        .filter-btn.elevated {
            background: var(--bg-elevated, #1e1e1e);
        }

        /* Cards List */
        .cards-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .card-item {
          background: var(--bg-card, #141414);
          border-radius: 20px;
          border: 1px solid var(--border-color, #262626);
          padding: 24px;
          display: flex;
          gap: 32px;
          transition: all 0.2s;
        }

        .card-item.selected {
            border: 2px solid var(--accent-emerald, #10b981);
        }

        .card-visual {
          width: 280px;
          height: 180px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }

        .card-visual-icon {
          font-size: 56px;
        }

        .card-joining-fee {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(0,0,0,0.6);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 8px;
        }

        .card-info {
          flex: 1;
        }

        .card-info-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 16px;
        }

        .card-name {
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary, #fff);
          margin: 0 0 4px 0;
        }

        .card-bank {
          color: var(--text-secondary, #9ca3af);
          font-size: 14px;
          margin: 0;
        }

        .card-savings-badge {
          padding: 12px 20px;
          background: var(--bg-elevated, #1e1e1e);
          border-radius: 12px;
          text-align: right;
        }

        .savings-label {
          font-size: 12px;
          color: var(--text-dim, #6b7280);
          margin-bottom: 4px;
        }

        .savings-val {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent-emerald, #10b981);
        }

        .card-benefits p {
            color: var(--text-secondary, #9ca3af);
            font-size: 14px;
            margin: 0 0 8px 0;
            line-height: 1.5;
        }

        .card-tags {
            display: flex;
            gap: 8px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .card-tag {
            padding: 6px 14px;
            background: var(--bg-elevated, #1e1e1e);
            border-radius: 15px;
            font-size: 12px;
            color: var(--text-secondary, #9ca3af);
            text-transform: uppercase;
        }

        .compare-btn {
            padding: 10px 20px;
            background: transparent;
            border: 1px solid var(--accent-gold, #d4a574);
            border-radius: 10px;
            color: var(--accent-gold, #d4a574);
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .compare-btn.active {
            background: var(--accent-emerald, #10b981);
            border-color: var(--accent-emerald, #10b981);
            color: #000;
        }

        /* Compare Bar */
        .compare-bar {
            position: fixed;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-card, #141414);
            border: 1px solid var(--border-color, #262626);
            padding: 16px 32px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 24px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            z-index: 100;
        }

        .compare-count {
            color: var(--text-secondary, #9ca3af);
        }

        .compare-now-btn {
            padding: 12px 28px;
            background: var(--accent-gold, #d4a574);
            color: #000;
            border: none;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
        }

        .compare-clear-btn {
            padding: 12px 20px;
            background: transparent;
            border: 1px solid var(--border-color, #262626);
            border-radius: 12px;
            color: var(--text-secondary, #9ca3af);
            cursor: pointer;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .cards-page { padding: 80px 20px 100px; }
            .cards-title { font-size: 32px; }
            .card-item { flex-direction: column; gap: 16px; padding: 16px; }
            .card-visual { width: 100%; height: 200px; }
            .card-info-header { flex-direction: column; gap: 16px; }
            .card-savings-badge { width: 100%; text-align: left; display: flex; justify-content: space-between; align-items: center; }
            .compare-bar { width: 90%; padding: 12px 16px; flex-direction: row; justify-content: space-between; gap: 12px; }
            .compare-now-btn { padding: 10px 16px; width: auto; font-size: 13px; }
            .compare-count { font-size: 12px; }
            .compare-clear-btn { padding: 10px; }
        }
      `}</style>
        </div>
    );
};

export default CardsPage;
