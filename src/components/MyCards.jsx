import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMyCards } from '../context/MyCardsContext';
import creditCards from '../data/creditCards.json';
import CardImage from './CardImage';

/**
 * MyCards V2 - Complete Overhaul
 * 
 * Features:
 * - Compact stat pills
 * - Sorting & filtering toolbar
 * - Dense card grid with meaningful metrics
 * - Premium glassmorphism styling
 */

const TIER_CONFIG = {
  'super-premium': { color: '#fbbf24', bg: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.1))', label: 'Elite', icon: '👑' },
  'premium': { color: '#c084fc', bg: 'linear-gradient(135deg, rgba(192, 132, 252, 0.2), rgba(139, 92, 246, 0.1))', label: 'Premium', icon: '💎' },
  'mid': { color: '#60a5fa', bg: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(59, 130, 246, 0.1))', label: 'Mid-Tier', icon: '⭐' },
  'entry': { color: '#4ade80', bg: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.1))', label: 'Starter', icon: '🎯' },
  'co-branded': { color: '#f472b6', bg: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(236, 72, 153, 0.1))', label: 'Partner', icon: '🤝' },
};

const SORT_OPTIONS = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'fee-asc', label: 'Fee: Low to High' },
  { value: 'fee-desc', label: 'Fee: High to Low' },
  { value: 'bank', label: 'Bank' },
  { value: 'tier', label: 'Tier' },
];

const MyCards = () => {
  const {
    myCards,
    cardsByBank,
    totalAnnualValue,
    totalMonthlyValue,
    recommendations,
    removeCard,
    addCard,
    hasCard,

  } = useMyCards();

  const [activeTab, setActiveTab] = useState('collection');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBank, setSelectedBank] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [collectionSearch, setCollectionSearch] = useState('');
  const [collectionFilter, setCollectionFilter] = useState('all');


  // Banks in user's collection
  const myBanks = useMemo(() => {
    return ['all', ...Object.keys(cardsByBank).sort()];
  }, [cardsByBank]);

  // All available banks for add tab
  const availableBanks = useMemo(() => {
    const banks = [...new Set(creditCards.map(c => c.bank))].sort();
    return ['all', ...banks];
  }, []);

  // Sorted & filtered collection
  const sortedMyCards = useMemo(() => {
    let cards = [...myCards];

    // Filter by search
    if (collectionSearch) {
      cards = cards.filter(c =>
        c.name.toLowerCase().includes(collectionSearch.toLowerCase()) ||
        c.bank.toLowerCase().includes(collectionSearch.toLowerCase())
      );
    }

    // Filter by bank
    if (collectionFilter !== 'all') {
      cards = cards.filter(c => c.bank === collectionFilter);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        cards.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'fee-asc':
        cards.sort((a, b) => (a.fees?.annual || a.annualFee || 0) - (b.fees?.annual || b.annualFee || 0));
        break;
      case 'fee-desc':
        cards.sort((a, b) => (b.fees?.annual || b.annualFee || 0) - (a.fees?.annual || a.annualFee || 0));
        break;
      case 'bank':
        cards.sort((a, b) => a.bank.localeCompare(b.bank));
        break;
      case 'tier':
        const tierOrder = { 'super-premium': 0, 'premium': 1, 'mid': 2, 'entry': 3 };
        cards.sort((a, b) => (tierOrder[a.tier] || 3) - (tierOrder[b.tier] || 3));
        break;
      default:
        break;
    }

    return cards;
  }, [myCards, collectionSearch, collectionFilter, sortBy]);

  // Filter cards for adding
  const filteredCards = useMemo(() => {
    return creditCards
      .filter(card => !hasCard(card.id))
      .filter(card =>
        searchQuery === '' ||
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.bank.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(card =>
        selectedBank === 'all' || card.bank === selectedBank
      );
  }, [searchQuery, selectedBank, hasCard]);

  // Group by bank for add display
  const groupedCards = useMemo(() => {
    const grouped = {};
    filteredCards.forEach(card => {
      if (!grouped[card.bank]) grouped[card.bank] = [];
      grouped[card.bank].push(card);
    });
    return grouped;
  }, [filteredCards]);



  // Helper to get card's main benefit text
  const getCardBenefit = (card) => {
    if (card.rewards?.type === 'cashback') {
      return `${card.rewards.baseRate || card.rewardRate || 'Up to 5%'} Cashback`;
    }
    if (card.rewards?.type === 'points') {
      return `${card.rewards.baseRate || '2X'} Reward Points`;
    }
    if (card.rewards?.type === 'miles') {
      return `${card.rewards.baseRate || '2X'} Miles`;
    }
    return card.rewardRate || 'Multi-benefit';
  };

  // Helper to get card network
  const getNetwork = (card) => {
    const name = card.name.toLowerCase();
    if (name.includes('amex') || card.bank?.toLowerCase().includes('amex')) return 'AMEX';
    if (name.includes('visa') || name.includes('signature') || name.includes('infinite')) return 'Visa';
    if (name.includes('master') || name.includes('world')) return 'MC';
    if (name.includes('rupay')) return 'RuPay';
    if (name.includes('diners')) return 'Diners';
    return 'Visa';
  };

  // Helper to get card tier - check both locations
  const getCardTier = (card) => {
    // Check in rewards.calculator.tier first (preferred location in data)
    const calculatorTier = card.rewards?.calculator?.tier;
    if (calculatorTier && TIER_CONFIG[calculatorTier]) {
      return TIER_CONFIG[calculatorTier];
    }
    // Fallback to direct tier property
    if (card.tier && TIER_CONFIG[card.tier]) {
      return TIER_CONFIG[card.tier];
    }
    // Infer from fee if no tier specified
    const fee = card.fees?.annual || card.annualFee || 0;
    if (fee >= 10000) return TIER_CONFIG['super-premium'];
    if (fee >= 2500) return TIER_CONFIG['premium'];
    if (fee >= 500) return TIER_CONFIG['mid'];
    return TIER_CONFIG['entry'];
  };

  return (
    <div className="mc-page">
      {/* Compact Header */}
      <header className="mc-header">
        <div className="mc-title-row">
          <div className="mc-title">
            <span className="mc-emoji">💳</span>
            <div>
              <h1>My Wallet</h1>
              <p>Manage your credit card portfolio</p>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="mc-stats mc-stats-compact">
            <div className="stat-pill">
              <div className="stat-icon">💳</div>
              <span className="sp-label">Total Cards</span>
              <span className="sp-value">{myCards.length}</span>
            </div>
            <div className="stat-pill">
              <div className="stat-icon">💰</div>
              <span className="sp-label">Max Monthly Savings</span>
              <span className="sp-value green">₹{totalMonthlyValue > 0 ? totalMonthlyValue.toLocaleString() : '0'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="mc-tabs">
        <div className="tabs-container">
          {[
            { id: 'collection', label: 'Portfolio', icon: '📂', count: myCards.length },
            { id: 'add', label: 'Add Cards', icon: '➕' },
            { id: 'recommendations', label: 'For You', icon: '✨' },
          ].map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && <span className="tab-count">{tab.count}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="mc-content">
        {/* Portfolio Tab */}
        {activeTab === 'collection' && (
          <div className="portfolio-view">
            {myCards.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎴</div>
                <h2>No cards yet</h2>
                <p>Add your credit cards to track benefits and maximize rewards.</p>
                <button className="btn-primary" onClick={() => setActiveTab('add')}>
                  Browse Cards
                </button>
              </div>
            ) : (
              <>
                {/* Toolbar */}
                <div className="portfolio-toolbar">
                  <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search your cards..."
                      value={collectionSearch}
                      onChange={(e) => setCollectionSearch(e.target.value)}
                    />
                  </div>

                  <div className="toolbar-controls">
                    <select
                      value={collectionFilter}
                      onChange={(e) => setCollectionFilter(e.target.value)}
                      className="filter-select"
                    >
                      {myBanks.map(b => (
                        <option key={b} value={b}>{b === 'all' ? 'All Banks' : b}</option>
                      ))}
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                    >
                      {SORT_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Card Grid */}
                <div className="card-grid">
                  {sortedMyCards.map(card => {
                    const tier = getCardTier(card);

                    const benefit = getCardBenefit(card);
                    const network = getNetwork(card);
                    const fee = card.fees?.annual || card.annualFee || 0;

                    return (
                      <div key={card.id} className="card-tile">
                        {/* Top Row: Image + Actions */}
                        <div className="tile-top">
                          <div className="tile-image">
                            <CardImage card={card} />
                          </div>
                          <div className="tile-actions">
                            <Link
                              to={`/card-guide/${card.slug || card.id}`}
                              className="action-btn view"
                              title="View Details"
                            >
                              →
                            </Link>
                            <button
                              className="action-btn remove"
                              onClick={() => removeCard(card.id)}
                              title="Remove Card"
                            >
                              ×
                            </button>
                          </div>
                          <div className="tier-badge" style={{ background: tier.bg, color: tier.color, borderColor: `${tier.color}40` }}>
                            <span>{tier.icon}</span>
                            <span>{tier.label}</span>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="tile-info">
                          <div className="tile-header">
                            <h3 className="tile-name">{card.name}</h3>
                            <span className="tile-bank">{card.bank}</span>
                          </div>

                          <div className="tile-metrics">
                            <div className="metric">
                              <span className="m-label">Fee</span>
                              <span className="m-value">₹{fee.toLocaleString()}</span>
                            </div>
                            <div className="metric">
                              <span className="m-label">Benefit</span>
                              <span className="m-value highlight">{benefit}</span>
                            </div>
                            <div className="metric small">
                              <span className="m-label">Network</span>
                              <span className="m-value">{network}</span>
                            </div>
                          </div>
                        </div>


                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Add Cards Tab */}
        {activeTab === 'add' && (
          <div className="add-view">
            <div className="add-toolbar">
              <div className="search-box large">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by name or bank..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="filter-select"
              >
                {availableBanks.map(b => (
                  <option key={b} value={b}>{b === 'all' ? 'All Banks' : b}</option>
                ))}
              </select>
            </div>

            <div className="add-results">
              {Object.keys(groupedCards).length === 0 ? (
                <div className="no-results">
                  <p>No cards found. Try a different search term.</p>
                </div>
              ) : (
                Object.entries(groupedCards).map(([bank, cards]) => (
                  <div key={bank} className="bank-group">
                    <h4 className="bank-name">{bank}</h4>
                    <div className="bank-cards">
                      {cards.map(card => {
                        const tier = getCardTier(card);
                        return (
                          <div key={card.id} className="add-card-row">
                            <div className="add-card-info">
                              <span className="tier-dot" style={{ background: tier.color }}></span>
                              <span className="add-card-name">{card.name}</span>
                              <span className="add-card-fee">₹{(card.fees?.annual || card.annualFee || 0).toLocaleString()}</span>
                            </div>
                            <button className="add-btn" onClick={() => addCard(card.id)}>
                              + Add
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="rec-view">
            {recommendations.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h2>No recommendations</h2>
                <p>Add more cards to your portfolio to get personalized suggestions.</p>
              </div>
            ) : (
              <div className="rec-grid">
                {recommendations.map(rec => {
                  const tier = getCardTier(rec);
                  return (
                    <div key={rec.id} className="rec-card">
                      <div className="rec-badge">✨ {rec.reason}</div>
                      <div className="rec-image">
                        <CardImage card={rec} />
                      </div>
                      <div className="rec-info">
                        <h3>{rec.name}</h3>
                        <p>{rec.bank}</p>
                        <div className="rec-actions">
                          <button className="btn-primary" onClick={() => addCard(rec.id)}>
                            Add to Wallet
                          </button>
                          <Link to={`/card-guide/${rec.slug || rec.id}`} className="btn-text">
                            Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        /* ========================================
           MY WALLET - PREMIUM GLASSMORPHISM DESIGN
           ======================================== */
        
        .mc-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
          background: radial-gradient(ellipse at top, rgba(30, 41, 59, 0.4) 0%, transparent 60%);
        }

        /* ===== HEADER SECTION ===== */
        .mc-header {
          margin-bottom: 2.5rem;
        }
        
        .mc-title-row {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .mc-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .mc-emoji {
          font-size: 2.75rem;
          filter: drop-shadow(0 4px 12px rgba(251, 191, 36, 0.4));
        }
        
        .mc-title h1 {
          margin: 0;
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #fff 0%, #e2e8f0 50%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .mc-title p {
          margin: 0.25rem 0 0;
          font-size: 1rem;
          color: rgba(148, 163, 184, 0.9);
          letter-spacing: 0.01em;
        }

        /* ===== STATS DASHBOARD - PREMIUM CARDS ===== */
        .mc-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.875rem;
        }

        .mc-stats-compact {
          grid-template-columns: repeat(2, 1fr);
          max-width: 600px;
        }
        
        .stat-pill {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 1.25rem;
          background: linear-gradient(
            145deg,
            rgba(30, 41, 59, 0.95) 0%,
            rgba(15, 23, 42, 0.9) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          overflow: hidden;
          will-change: transform;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        
        .stat-pill::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 100%
          );
        }
        
        .stat-pill:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.12);
        }
        
        .stat-pill:nth-child(1) { --accent: #60a5fa; }
        .stat-pill:nth-child(2) { --accent: #4ade80; }
        .stat-pill:nth-child(3) { --accent: #c084fc; }
        .stat-pill:nth-child(4) { --accent: #94a3b8; }
        
        .stat-pill .stat-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 25%, transparent), color-mix(in srgb, var(--accent) 10%, transparent));
          border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }
        
        .sp-label {
          font-size: 0.8rem;
          text-transform: capitalize;
          letter-spacing: 0.02em;
          color: rgba(148, 163, 184, 0.9);
          margin-bottom: 0.25rem;
          font-weight: 500;
        }
        
        .sp-value {
          font-size: 1.75rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        
        .sp-value.green { 
          color: #4ade80; 
          text-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
        }
        
        .sp-value.purple { 
          color: #c084fc; 
          text-shadow: 0 0 20px rgba(192, 132, 252, 0.3);
        }

        /* ===== PREMIUM TABS ===== */
        .mc-tabs {
          margin-bottom: 2rem;
        }
        
        .tabs-container {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          background: transparent;
          border: none;
        }
        
        .tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(30, 41, 59, 0.7);
          color: rgba(148, 163, 184, 0.9);
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        
        .tab-btn:hover {
          color: #fff;
          border-color: rgba(99, 102, 241, 0.4);
          background: rgba(99, 102, 241, 0.15);
        }
        
        .tab-btn.active {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
        }
        
        .tab-btn span:first-child {
          display: none;
        }
        
        .tab-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        /* ===== MAIN CONTENT AREA ===== */
        .mc-content {
          background: transparent;
          border: none;
          padding: 0;
          min-height: 400px;
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          text-align: center;
          padding: 5rem 2rem;
          background: rgba(30, 41, 59, 0.3);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .empty-icon {
          font-size: 5rem;
          margin-bottom: 1.5rem;
          filter: grayscale(0.3);
        }
        
        .empty-state h2 {
          margin: 0 0 0.75rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
        }
        
        .empty-state p {
          color: rgba(148, 163, 184, 0.8);
          margin: 0 0 2rem;
          font-size: 1rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        /* ===== BUTTONS ===== */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
        }
        
        .btn-text {
          color: rgba(148, 163, 184, 0.9);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .btn-text:hover {
          color: #fff;
        }

        /* ===== PORTFOLIO TOOLBAR ===== */
        .portfolio-toolbar {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        
        .search-box {
          flex: 1;
          min-width: 220px;
          display: flex;
          align-items: center;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 0 1rem;
          transition: border-color 0.2s ease;
        }
        
        .search-box:focus-within {
          border-color: rgba(99, 102, 241, 0.4);
        }
        
        .search-box.large {
          flex: 2;
        }
        
        .search-icon {
          margin-right: 0.6rem;
          opacity: 0.5;
          font-size: 1rem;
        }
        
        .search-box input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 0.875rem 0;
          color: #fff;
          font-size: 0.9rem;
        }
        
        .search-box input:focus {
          outline: none;
        }
        
        .search-box input::placeholder {
          color: rgba(148, 163, 184, 0.5);
        }
        
        .toolbar-controls {
          display: flex;
          gap: 0.5rem;
        }
        
        .filter-select, .sort-select {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 0.875rem 1rem;
          color: #fff;
          font-size: 0.85rem;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }
        
        .filter-select:hover, .sort-select:hover {
          border-color: rgba(255, 255, 255, 0.12);
        }
        
        .filter-select option, .sort-select option {
          background: #1e293b;
          color: #fff;
        }

        /* ===== CARD GRID - LUXURY TILES ===== */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }
        
        .card-tile {
          position: relative;
          background: linear-gradient(
            145deg,
            rgba(30, 41, 59, 0.95) 0%,
            rgba(15, 23, 42, 0.9) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          overflow: hidden;
          will-change: transform, box-shadow;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        
        .card-tile::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.12) 50%,
            transparent 100%
          );
          z-index: 1;
        }
        
        .card-tile:hover {
          transform: translateY(-4px);
          border-color: rgba(139, 92, 246, 0.35);
          box-shadow: 
            0 16px 40px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(139, 92, 246, 0.08);
        }

        /* ===== TILE TOP - CARD IMAGE AREA ===== */
        .tile-top {
          position: relative;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            145deg,
            rgba(15, 23, 42, 0.9) 0%,
            rgba(30, 41, 59, 0.6) 100%
          );
          overflow: hidden;
        }
        
        .tile-top::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .tile-image {
          width: 180px;
          position: relative;
          z-index: 1;
        }
        
        .tile-image img {
          width: 100%;
          height: auto;
          border-radius: 10px;
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;
        }
        
        .card-tile:hover .tile-image img {
          transform: scale(1.03);
        }
        
        .tile-actions {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          gap: 6px;
          opacity: 0;
          transform: translateY(-5px);
          transition: all 0.25s ease;
          z-index: 10;
        }
        
        .card-tile:hover .tile-actions {
          opacity: 1;
          transform: translateY(0);
        }
        
        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          backdrop-filter: blur(10px);
        }
        
        .action-btn.view {
          background: rgba(99, 102, 241, 0.9);
          color: #fff;
        }
        
        .action-btn.view:hover {
          background: #6366f1;
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
        }
        
        .action-btn.remove {
          background: rgba(239, 68, 68, 0.85);
          color: #fff;
        }
        
        .action-btn.remove:hover {
          background: #ef4444;
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
        }
        
        /* ===== TIER BADGE - PREMIUM STYLING ===== */
        .tier-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 0.4rem 0.75rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 5;
        }
        
        .card-tile:hover .tile-actions {
          opacity: 1;
        }
        
        .card-tile:hover .tier-badge {
          opacity: 0;
        }

        /* ===== TILE INFO SECTION ===== */
        .tile-info {
          padding: 1.25rem 1.5rem 1rem;
        }
        
        .tile-header {
          margin-bottom: 1rem;
        }
        
        .tile-name {
          margin: 0 0 0.25rem;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: -0.01em;
        }
        
        .tile-bank {
          font-size: 0.85rem;
          color: rgba(148, 163, 184, 0.8);
          font-weight: 500;
        }
        
        .tile-metrics {
          display: flex;
          gap: 1.5rem;
          padding: 0.75rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        
        .metric {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        
        .metric.small {
          margin-left: auto;
        }
        
        .m-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(148, 163, 184, 0.7);
          font-weight: 600;
        }
        
        .m-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
        }
        
        .m-value.highlight {
          color: #4ade80;
          text-shadow: 0 0 12px rgba(74, 222, 128, 0.3);
        }



        /* ===== ADD VIEW ===== */
        .add-view {
          padding: 0;
        }
        
        .add-toolbar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .add-results {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .no-results {
          text-align: center;
          padding: 4rem;
          color: rgba(148, 163, 184, 0.7);
          background: rgba(30, 41, 59, 0.3);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .bank-group {
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        
        .bank-name {
          margin: 0;
          padding: 1rem 1.25rem;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(148, 163, 184, 0.8);
          font-weight: 700;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .bank-cards {
          display: flex;
          flex-direction: column;
        }
        
        .add-card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          transition: all 0.2s;
        }
        
        .add-card-row:last-child {
          border-bottom: none;
        }
        
        .add-card-row:hover {
          background: rgba(99, 102, 241, 0.05);
        }
        
        .add-card-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .tier-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }
        
        .add-card-name {
          font-weight: 600;
          color: #fff;
          font-size: 0.95rem;
        }
        
        .add-card-fee {
          font-size: 0.85rem;
          color: rgba(148, 163, 184, 0.7);
          font-weight: 500;
        }
        
        .add-btn {
          padding: 0.6rem 1.25rem;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
        }
        
        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
        }

        /* ===== RECOMMENDATIONS ===== */
        .rec-view {
          padding: 0;
        }
        
        .rec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }
        
        .rec-card {
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(30, 41, 59, 0.4));
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(20px);
        }
        
        .rec-card:hover {
          transform: translateY(-4px);
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
        }
        
        .rec-badge {
          padding: 0.75rem 1.25rem;
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.15), transparent);
          font-size: 0.85rem;
          color: #a5b4fc;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .rec-image {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.08) 0%,
            rgba(139, 92, 246, 0.05) 100%
          );
        }
        
        .rec-info {
          padding: 1.25rem 1.5rem;
        }
        
        .rec-info h3 {
          margin: 0 0 0.35rem;
          font-size: 1.15rem;
          font-weight: 700;
        }
        
        .rec-info p {
          margin: 0 0 1.25rem;
          font-size: 0.9rem;
          color: rgba(148, 163, 184, 0.8);
        }
        
        .rec-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 1024px) {
          .mc-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .mc-page {
            padding: 1.25rem;
          }
          
          .mc-title h1 {
            font-size: 1.75rem;
          }
          
          .mc-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          
          .stat-pill {
            padding: 1rem;
          }
          
          .sp-value {
            font-size: 1.35rem;
          }
          
          .tabs-container {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.5rem;
          }
          
          .tab-btn {
            padding: 0.75rem 1.25rem;
            font-size: 0.85rem;
            white-space: nowrap;
          }
          
          .portfolio-toolbar {
            flex-direction: column;
          }
          
          .toolbar-controls {
            width: 100%;
          }
          
          .filter-select, .sort-select {
            flex: 1;
          }
          
          .card-grid {
            grid-template-columns: 1fr;
          }
          
          .add-toolbar {
            flex-direction: column;
          }
          
          .rec-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .mc-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .stat-pill {
            padding: 0.875rem 0.75rem;
          }
          
          .sp-value {
            font-size: 1.2rem;
          }
          
          .sp-label {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyCards;
