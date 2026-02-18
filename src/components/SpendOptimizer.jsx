import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import creditCards from '../data/creditCards.json';

/**
 * SpendOptimizer - Redesigned
 *
 * Cleaner 3-column layout with better visual hierarchy
 */

const SPENDING_CATEGORIES = [
  { key: 'groceries', label: 'Groceries', icon: '🥦', color: '#22c55e' },
  { key: 'fuel', label: 'Fuel', icon: '⛽', color: '#f59e0b' },
  { key: 'dining', label: 'Dining & Food Apps', icon: '🍔', color: '#ef4444' },
  { key: 'travel', label: 'Travel & Flights', icon: '✈️', color: '#3b82f6' },
  { key: 'amazon', label: 'Amazon', icon: '📦', color: '#f97316' },
  { key: 'flipkart', label: 'Flipkart', icon: '🛒', color: '#eab308' },
  { key: 'utilities', label: 'Bills & Utilities', icon: '💡', color: '#8b5cf6' },
  { key: 'movies', label: 'Entertainment', icon: '🎬', color: '#ec4899' },
  { key: 'others', label: 'Other Spends', icon: '💳', color: '#6b7280' },
];

const CARD_CATEGORY_REWARDS = {
  'Amazon Pay ICICI': {
    amazon: { rate: 0.05, label: '5% cashback', unlimited: true },
    others: { rate: 0.01, label: '1% cashback' },
  },
  'Flipkart Axis Bank': {
    flipkart: { rate: 0.05, label: '5% cashback', unlimited: true },
    others: { rate: 0.015, label: '1.5% cashback' },
  },
  'HDFC Swiggy Credit Card': {
    dining: { rate: 0.10, label: '10% cashback', cap: 1500 },
    others: { rate: 0.01, label: '1% cashback' },
  },
  'SBI Cashback Credit Card': {
    amazon: { rate: 0.05, label: '5% online' },
    flipkart: { rate: 0.05, label: '5% online' },
    others: { rate: 0.01, label: '1% offline' },
  },
  'HDFC Regalia Credit Card': {
    travel: { rate: 0.033, label: '3.3% SmartBuy' },
    dining: { rate: 0.02, label: '2% dining' },
    others: { rate: 0.013, label: '1.3% base' },
  },
  'ICICI Emeralde Private Metal': {
    groceries: { rate: 0.03, label: '3% base' },
    travel: { rate: 0.18, label: '18% iShop hotels' },
    others: { rate: 0.03, label: '3% base' },
  },
  'Axis Ace Credit Card': {
    utilities: { rate: 0.05, label: '5% GPay bills', cap: 500 },
    dining: { rate: 0.04, label: '4% Swiggy/Zomato' },
    others: { rate: 0.015, label: '1.5% base' },
  },
  'BPCL SBI Credit Card': {
    fuel: { rate: 0.13, label: '13% BPCL fuel', cap: 500 },
    others: { rate: 0.01, label: '1% base' },
  },
  'HDFC Infinia Metal Credit Card': {
    travel: { rate: 0.33, label: '33% SmartBuy', cap: 15000 },
    dining: { rate: 0.033, label: '3.3% base' },
    others: { rate: 0.033, label: '3.3% base' },
  },
};

const SpendOptimizer = () => {
  const [userCards, setUserCards] = useState([]);
  const [spending, setSpending] = useState(
    SPENDING_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.key]: 0 }), {})
  );
  const [showCardPicker, setShowCardPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('optimizerCards');
    if (saved) setUserCards(JSON.parse(saved));
  }, []);

  const saveUserCards = (cards) => {
    setUserCards(cards);
    localStorage.setItem('optimizerCards', JSON.stringify(cards));
  };

  const toggleCard = (cardName) => {
    if (userCards.includes(cardName)) {
      saveUserCards(userCards.filter(c => c !== cardName));
    } else {
      saveUserCards([...userCards, cardName]);
    }
  };

  // Calculate optimal card per category
  const optimization = useMemo(() => {
    const results = {};
    let totalRewards = 0;
    let totalSpend = 0;

    SPENDING_CATEGORIES.forEach(category => {
      const amount = spending[category.key] || 0;
      if (amount <= 0) return;

      totalSpend += amount;
      let bestCard = null;
      let bestReward = 0;
      let bestLabel = '';

      userCards.forEach(cardName => {
        const cardRewards = CARD_CATEGORY_REWARDS[cardName];
        if (!cardRewards) return;

        const categoryRate = cardRewards[category.key] || cardRewards.others;
        if (!categoryRate) return;

        let reward = amount * categoryRate.rate;
        if (categoryRate.cap) reward = Math.min(reward, categoryRate.cap);

        if (reward > bestReward) {
          bestReward = reward;
          bestCard = cardName;
          bestLabel = categoryRate.label;
        }
      });

      if (bestCard) {
        results[category.key] = { card: bestCard, reward: bestReward, label: bestLabel, amount };
        totalRewards += bestReward;
      }
    });

    return { results, totalRewards, totalSpend };
  }, [spending, userCards]);

  const filteredCards = useMemo(() => {
    return Object.keys(CARD_CATEGORY_REWARDS).filter(card =>
      card.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const hasSpending = Object.values(spending).some(v => v > 0);

  return (
    <div className="optimizer-page">
      <Helmet>
        <title>Spend Optimizer - Best Card for Each Category | Card Perks</title>
        <meta name="description" content="Find the best credit card for each spending category. Enter your monthly spending and get personalized card recommendations." />
        <link rel="canonical" href="https://cardperks.xyz/spend-optimizer" />
        <meta property="og:title" content="Spend Optimizer - Card Perks" />
        <meta property="og:description" content="Optimize your spending to maximize credit card rewards." />
        <meta property="og:url" content="https://cardperks.xyz/spend-optimizer" />
        <meta property="og:image" content="https://cardperks.xyz/og/og-optimizer.png" />
        <meta property="twitter:image" content="https://cardperks.xyz/og/og-optimizer.png" />
      </Helmet>
      {/* Header */}
      <header className="optimizer-header">
        <div className="header-icon">💳</div>
        <h1>Spend Optimizer</h1>
        <p>Tell us your monthly spending, we'll tell you which card to use for each category</p>
      </header>

      {/* Main Grid */}
      <div className="optimizer-grid">
        {/* Column 1: My Cards */}
        <section className="optimizer-section glass-panel">
          <div className="section-header">
            <h2>🎴 My Cards</h2>
            <span className="badge">{userCards.length}</span>
          </div>

          {/* Selected Cards */}
          <div className="selected-cards">
            {userCards.length === 0 ? (
              <p className="empty-text">Add your cards to get started</p>
            ) : (
              userCards.map(card => (
                <div key={card} className="selected-card">
                  <span className="card-name">{card.split(' ').slice(0, 3).join(' ')}</span>
                  <button onClick={() => toggleCard(card)} className="remove-btn">×</button>
                </div>
              ))
            )}
          </div>

          {/* Add Cards Button */}
          <button
            className="add-cards-btn"
            onClick={() => setShowCardPicker(!showCardPicker)}
          >
            {showCardPicker ? '✕ Close' : '+ Add Cards'}
          </button>

          {/* Card Picker */}
          {showCardPicker && (
            <div className="card-picker">
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <div className="card-list">
                {filteredCards.map(card => (
                  <label key={card} className={`card-option ${userCards.includes(card) ? 'selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={userCards.includes(card)}
                      onChange={() => toggleCard(card)}
                    />
                    <span>{card}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Column 2: Monthly Spending */}
        <section className="optimizer-section glass-panel">
          <div className="section-header">
            <h2>📊 Monthly Spending</h2>
          </div>

          <div className="spending-list">
            {SPENDING_CATEGORIES.map(cat => (
              <div key={cat.key} className="spending-row">
                <div className="spending-category">
                  <span
                    className="category-icon"
                    style={{ background: `${cat.color}20` }}
                  >
                    {cat.icon}
                  </span>
                  <span className="category-label">{cat.label}</span>
                </div>
                <div className="spending-input-wrapper">
                  <span className="currency">₹</span>
                  <input
                    type="number"
                    value={spending[cat.key] || ''}
                    onChange={(e) => setSpending(prev => ({
                      ...prev,
                      [cat.key]: parseInt(e.target.value) || 0
                    }))}
                    placeholder="0"
                    className="spending-input"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="spending-total">
            <span>Total Monthly Spend</span>
            <span className="total-amount">₹{optimization.totalSpend.toLocaleString('en-IN')}</span>
          </div>
        </section>

        {/* Column 3: Recommendations */}
        <section className="optimizer-section glass-panel">
          <div className="section-header">
            <h2>🎯 Your Optimal Card Rotation</h2>
          </div>

          {userCards.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👈</div>
              <p>Add your cards to see recommendations</p>
            </div>
          ) : !hasSpending ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p>Enter your spending to see which card to use</p>
            </div>
          ) : Object.keys(optimization.results).length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🤔</div>
              <p>No matching rewards found for your cards</p>
            </div>
          ) : (
            <>
              <div className="recommendations-list">
                {SPENDING_CATEGORIES.map(cat => {
                  const result = optimization.results[cat.key];
                  if (!result) return null;

                  return (
                    <div key={cat.key} className="recommendation-row">
                      <div className="rec-category">
                        <span className="rec-icon" style={{ background: `${cat.color}20` }}>
                          {cat.icon}
                        </span>
                        <div className="rec-info">
                          <span className="rec-label">{cat.label}</span>
                          <span className="rec-amount">₹{result.amount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <div className="rec-card">
                        <span className="rec-card-name">{result.card.split(' ').slice(0, 2).join(' ')}</span>
                        <span className="rec-reward">+₹{Math.round(result.reward).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Rewards */}
              <div className="rewards-total">
                <div className="rewards-label">
                  <span className="trophy">🏆</span>
                  <span>Total Monthly Rewards</span>
                </div>
                <span className="rewards-amount">
                  ₹{Math.round(optimization.totalRewards).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Reward Rate */}
              {optimization.totalSpend > 0 && (
                <div className="reward-rate">
                  Effective reward rate: {((optimization.totalRewards / optimization.totalSpend) * 100).toFixed(1)}%
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <style>{`
        .optimizer-page {
          padding: 1rem 0 4rem;
        }

        .optimizer-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .optimizer-header h1 {
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 700;
          margin: 0 0 0.5rem;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-pink));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .optimizer-header p {
          color: var(--text-secondary);
          margin: 0;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Grid Layout */
        .optimizer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .optimizer-section {
          padding: 1.5rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .section-header h2 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .badge {
          padding: 4px 10px;
          background: rgba(139, 92, 246, 0.15);
          border-radius: 12px;
          font-size: 0.8rem;
          color: var(--accent-violet);
        }

        /* My Cards Column */
        .selected-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
          min-height: 60px;
        }

        .empty-text {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin: 0;
        }

        .selected-card {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: rgba(6, 182, 212, 0.15);
          border: 1px solid rgba(6, 182, 212, 0.3);
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--accent-cyan);
        }

        .remove-btn {
          background: none;
          border: none;
          color: var(--accent-cyan);
          cursor: pointer;
          font-size: 1rem;
          line-height: 1;
          padding: 0;
        }

        .add-cards-btn {
          width: 100%;
          padding: 10px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 10px;
          color: var(--accent-violet);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-cards-btn:hover {
          background: rgba(139, 92, 246, 0.2);
        }

        .card-picker {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .search-input {
          width: 100%;
          padding: 10px 12px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }

        .card-list {
          max-height: 200px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .card-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }

        .card-option:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .card-option.selected {
          background: rgba(34, 197, 94, 0.15);
          border-color: rgba(34, 197, 94, 0.3);
          color: var(--text-primary);
        }

        .card-option input {
          accent-color: #22c55e;
        }

        /* Spending Column */
        .spending-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .spending-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .spending-category {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .category-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .category-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .spending-input-wrapper {
          position: relative;
          width: 100px;
        }

        .currency {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .spending-input {
          width: 100%;
          padding: 8px 8px 8px 26px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.9rem;
          text-align: right;
        }

        .spending-input:focus {
          outline: none;
          border-color: var(--accent-cyan);
        }

        .spending-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .total-amount {
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Recommendations Column */
        .empty-state {
          text-align: center;
          padding: 2rem 1rem;
        }

        .empty-icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          opacity: 0.5;
        }

        .empty-state p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0;
        }

        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .recommendation-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 10px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }

        .rec-category {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rec-icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .rec-info {
          display: flex;
          flex-direction: column;
        }

        .rec-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .rec-amount {
          font-size: 0.7rem;
          color: var(--text-secondary);
          opacity: 0.7;
        }

        .rec-card {
          text-align: right;
        }

        .rec-card-name {
          display: block;
          font-size: 0.8rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .rec-reward {
          font-size: 0.75rem;
          color: #22c55e;
        }

        .rewards-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.25rem;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(6, 182, 212, 0.1));
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 12px;
        }

        .rewards-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .trophy {
          font-size: 1.25rem;
        }

        .rewards-amount {
          font-size: 1.5rem;
          font-weight: 700;
          color: #22c55e;
        }

        .reward-rate {
          text-align: center;
          margin-top: 0.75rem;
          font-size: 0.8rem;
          color: var(--accent-cyan);
        }

        @media (max-width: 768px) {
          .optimizer-grid {
            grid-template-columns: 1fr;
          }

          .spending-row {
            flex-wrap: wrap;
          }

          .spending-input-wrapper {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default SpendOptimizer;
