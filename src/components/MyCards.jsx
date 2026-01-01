import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMyCards } from '../context/MyCardsContext';
import { creditCards } from '../data/creditCards';
import CardImage from './CardImage';

/**
 * MyCards - Redesigned personal credit card collection
 * 
 * Improvements:
 * - Better empty state with illustrations
 * - Cleaner card grid
 * - Improved tab navigation
 * - Better visual hierarchy
 */

const TIER_CONFIG = {
  'super-premium': { color: '#FFD700', label: 'Super Premium', icon: '👑' },
  'premium': { color: '#C0C0C0', label: 'Premium', icon: '⭐' },
  'mid': { color: '#CD7F32', label: 'Mid-Tier', icon: '🎯' },
  'entry': { color: '#6B7280', label: 'Entry', icon: '🚀' },
};

const MyCards = () => {
  const {
    myCards,
    cardsByBank,
    totalAnnualValue,
    recommendations,
    removeCard,
    addCard,
    hasCard,
    setPrimaryCard,
    getPrimaryCard,
    setCardNote,
    getCardNote,
  } = useMyCards();

  const [activeTab, setActiveTab] = useState('collection');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBank, setSelectedBank] = useState('all');
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Get unique banks from available cards
  const availableBanks = useMemo(() => {
    const banks = [...new Set(creditCards.map(c => c.bank))].sort();
    return ['all', ...banks];
  }, []);

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

  // Group by bank for display
  const groupedCards = useMemo(() => {
    const grouped = {};
    filteredCards.forEach(card => {
      if (!grouped[card.bank]) grouped[card.bank] = [];
      grouped[card.bank].push(card);
    });
    return grouped;
  }, [filteredCards]);

  const handleSaveNote = (cardId) => {
    setCardNote(cardId, noteText);
    setEditingNote(null);
    setNoteText('');
  };

  return (
    <div className="mycards-page">
      {/* Hero Header */}
      <header className="mycards-header">
        <div className="mycards-icon">💳</div>
        <h1>My Cards</h1>
        <p>Your personal credit card collection</p>

        {/* Stats */}
        <div className="mycards-stats">
          <div className="stat">
            <span className="stat-value" style={{ color: 'var(--accent-cyan)' }}>
              {myCards.length}
            </span>
            <span className="stat-label">Cards</span>
          </div>
          <div className="stat">
            <span className="stat-value" style={{ color: '#22c55e' }}>
              {Object.keys(cardsByBank).length}
            </span>
            <span className="stat-label">Banks</span>
          </div>
          <div className="stat">
            <span className="stat-value" style={{ color: '#8b5cf6' }}>
              ₹{totalAnnualValue > 0 ? `${(totalAnnualValue / 1000).toFixed(0)}K` : '0'}
            </span>
            <span className="stat-label">Est. Annual Value</span>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="mycards-tabs">
        {[
          { id: 'collection', label: 'My Collection', icon: '📁', count: myCards.length },
          { id: 'add', label: 'Add Cards', icon: '➕' },
          { id: 'recommendations', label: 'Recommended', icon: '💡', count: recommendations.length },
        ].map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {tab.count !== undefined && (
              <span className="tab-badge">{tab.count}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="mycards-content">

        {/* Collection Tab */}
        {activeTab === 'collection' && (
          <>
            {myCards.length === 0 ? (
              <div className="empty-state">
                <div className="empty-illustration">
                  <div className="empty-card empty-card-1"></div>
                  <div className="empty-card empty-card-2"></div>
                  <div className="empty-card empty-card-3"></div>
                </div>
                <h2>No cards yet</h2>
                <p>Add your credit cards to get personalized recommendations and track your rewards</p>
                <button
                  className="btn-primary"
                  onClick={() => setActiveTab('add')}
                >
                  <span>➕</span> Add Your First Card
                </button>
              </div>
            ) : (
              <div className="cards-collection">
                {Object.entries(cardsByBank).map(([bank, cards]) => (
                  <div key={bank} className="bank-section">
                    <h3 className="bank-header">
                      <span className="bank-name">{bank}</span>
                      <span className="bank-count">{cards.length} card{cards.length !== 1 ? 's' : ''}</span>
                    </h3>
                    <div className="cards-grid">
                      {cards.map(card => {
                        const note = getCardNote(card.id);
                        const tierInfo = TIER_CONFIG[card.tier] || TIER_CONFIG.entry;

                        return (
                          <div key={card.id} className="card-item glass-panel">
                            {/* Tier Badge */}
                            <div
                              className="tier-badge"
                              style={{
                                background: `${tierInfo.color}20`,
                                borderColor: `${tierInfo.color}40`,
                                color: tierInfo.color,
                              }}
                            >
                              {tierInfo.icon} {tierInfo.label}
                            </div>

                            {/* Card Visual */}
                            <div className="card-visual">
                              <CardImage card={card} />
                            </div>

                            {/* Card Info */}
                            <div className="card-info">
                              <h4>{card.name}</h4>
                              <p className="card-meta">
                                {card.annualFee} • {card.rewardRate || 'Rewards vary'}
                              </p>
                            </div>

                            {/* Note */}
                            {editingNote === card.id ? (
                              <div className="note-editor">
                                <textarea
                                  value={noteText}
                                  onChange={(e) => setNoteText(e.target.value)}
                                  placeholder="Add a personal note..."
                                  autoFocus
                                />
                                <div className="note-actions">
                                  <button className="btn-save" onClick={() => handleSaveNote(card.id)}>Save</button>
                                  <button className="btn-cancel" onClick={() => setEditingNote(null)}>Cancel</button>
                                </div>
                              </div>
                            ) : note ? (
                              <div
                                className="card-note"
                                onClick={() => { setEditingNote(card.id); setNoteText(note); }}
                              >
                                📝 {note}
                              </div>
                            ) : null}

                            {/* Actions */}
                            <div className="card-actions">
                              <button
                                className="btn-icon"
                                onClick={() => { setEditingNote(card.id); setNoteText(note || ''); }}
                                title="Add note"
                              >
                                📝
                              </button>
                              <Link to={`/card-guide/${card.slug || card.id}`} className="btn-icon" title="View guide">
                                📖
                              </Link>
                              <button
                                className="btn-icon btn-danger"
                                onClick={() => removeCard(card.id)}
                                title="Remove card"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Add Cards Tab */}
        {activeTab === 'add' && (
          <div className="add-cards-section">
            {/* Search & Filter */}
            <div className="search-filter-bar">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="bank-filter"
              >
                {availableBanks.map(bank => (
                  <option key={bank} value={bank}>
                    {bank === 'all' ? 'All Banks' : bank}
                  </option>
                ))}
              </select>
            </div>

            {/* Results count */}
            <p className="results-count">
              {filteredCards.length} cards available to add
            </p>

            {/* Cards by Bank */}
            <div className="add-cards-list">
              {Object.entries(groupedCards).map(([bank, cards]) => (
                <div key={bank} className="bank-group">
                  <h4 className="bank-group-header">{bank}</h4>
                  <div className="bank-group-cards">
                    {cards.map(card => (
                      <div key={card.id} className="add-card-item">
                        <div className="add-card-info">
                          <span className="add-card-name">{card.name}</span>
                          <span className="add-card-fee">{card.annualFee}</span>
                        </div>
                        <button
                          className="btn-add"
                          onClick={() => addCard(card.id)}
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="recommendations-section">
            {recommendations.length === 0 ? (
              <div className="empty-state small">
                <div className="empty-icon">💡</div>
                <h3>No recommendations yet</h3>
                <p>Add more cards to your collection to get personalized suggestions</p>
              </div>
            ) : (
              <div className="recommendations-grid">
                {recommendations.map(rec => (
                  <div key={rec.id} className="recommendation-card glass-panel">
                    <div className="rec-header">
                      <span className="rec-badge">{rec.reason}</span>
                    </div>
                    <div className="rec-card-visual">
                      <CardImage card={rec} />
                    </div>
                    <h4>{rec.name}</h4>
                    <p className="rec-bank">{rec.bank}</p>
                    <p className="rec-benefit">{rec.annualFee}</p>
                    <div className="rec-actions">
                      <button
                        className="btn-primary"
                        onClick={() => addCard(rec.id)}
                      >
                        + Add to Collection
                      </button>
                      <Link to={`/card-guide/${rec.slug || rec.id}`} className="btn-secondary">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .mycards-page {
          padding: 1rem 0 4rem;
        }

        /* Header */
        .mycards-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .mycards-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .mycards-header h1 {
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 700;
          margin: 0 0 0.5rem;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-pink));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mycards-header p {
          color: var(--text-secondary);
          margin: 0;
        }

        .mycards-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 1.5rem;
        }

        .stat {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        /* Tabs */
        .mycards-tabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
        }

        .tab-btn.active {
          background: rgba(139, 92, 246, 0.15);
          border-color: rgba(139, 92, 246, 0.3);
          color: var(--accent-violet);
        }

        .tab-icon {
          font-size: 1rem;
        }

        .tab-badge {
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.75rem;
        }

        .tab-btn.active .tab-badge {
          background: rgba(139, 92, 246, 0.3);
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-illustration {
          position: relative;
          width: 200px;
          height: 140px;
          margin: 0 auto 2rem;
        }

        .empty-card {
          position: absolute;
          width: 140px;
          height: 90px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .empty-card-1 {
          left: 50%;
          transform: translateX(-50%) rotate(-5deg);
          top: 20px;
        }

        .empty-card-2 {
          left: 50%;
          transform: translateX(-50%) rotate(5deg);
          top: 10px;
          opacity: 0.7;
        }

        .empty-card-3 {
          left: 50%;
          transform: translateX(-50%);
          top: 30px;
          opacity: 0.4;
        }

        .empty-state h2 {
          margin: 0 0 0.5rem;
          color: var(--text-primary);
        }

        .empty-state p {
          color: var(--text-secondary);
          margin: 0 0 1.5rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .empty-state.small {
          padding: 2rem;
        }

        .empty-state.small .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-state.small h3 {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
        }

        /* Cards Collection */
        .bank-section {
          margin-bottom: 2rem;
        }

        .bank-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .bank-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .bank-count {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: normal;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }

        .card-item {
          padding: 1.25rem;
          position: relative;
        }

        .tier-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 10px;
          border-radius: 12px;
          border: 1px solid;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .card-visual {
          height: 100px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .card-visual img {
          max-width: 160px;
          max-height: 90px;
        }

        .card-info h4 {
          margin: 0 0 0.25rem;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .card-meta {
          margin: 0 0 0.75rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .card-note {
          padding: 8px 10px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          margin-bottom: 0.75rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .note-editor textarea {
          width: 100%;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          background: rgba(0, 0, 0, 0.3);
          color: var(--text-primary);
          font-size: 0.85rem;
          resize: none;
          min-height: 60px;
          margin-bottom: 8px;
        }

        .note-actions {
          display: flex;
          gap: 8px;
        }

        .btn-save, .btn-cancel {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .btn-save {
          background: #22c55e;
          border: none;
          color: white;
        }

        .btn-cancel {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
        }

        .card-actions {
          display: flex;
          gap: 8px;
        }

        .btn-icon {
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-icon:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .btn-icon.btn-danger:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.3);
        }

        /* Add Cards */
        .search-filter-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          flex: 1;
          min-width: 200px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 44px;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          background: rgba(0, 0, 0, 0.3);
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .bank-filter {
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          background: rgba(0, 0, 0, 0.3);
          color: var(--text-primary);
          font-size: 0.95rem;
          min-width: 150px;
        }

        .results-count {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .bank-group {
          margin-bottom: 1.5rem;
        }

        .bank-group-header {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0 0 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .bank-group-cards {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .add-card-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
        }

        .add-card-name {
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .add-card-fee {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-left: 8px;
        }

        .btn-add {
          padding: 6px 14px;
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 8px;
          color: #22c55e;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-add:hover {
          background: rgba(34, 197, 94, 0.25);
        }

        /* Recommendations */
        .recommendations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .recommendation-card {
          padding: 1.5rem;
          text-align: center;
        }

        .rec-header {
          margin-bottom: 1rem;
        }

        .rec-badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 20px;
          color: var(--accent-violet);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .rec-card-visual {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .recommendation-card h4 {
          margin: 0 0 0.25rem;
          color: var(--text-primary);
        }

        .rec-bank {
          margin: 0 0 0.25rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .rec-benefit {
          margin: 0 0 1rem;
          font-size: 0.8rem;
          color: var(--accent-cyan);
        }

        .rec-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .btn-primary {
          padding: 10px 20px;
          background: linear-gradient(135deg, var(--accent-violet), var(--accent-pink));
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }

        .btn-secondary {
          padding: 10px 20px;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        @media (max-width: 640px) {
          .mycards-stats {
            gap: 1.5rem;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .mycards-tabs {
            gap: 0.25rem;
          }

          .tab-btn {
            padding: 8px 12px;
            font-size: 0.8rem;
          }

          .tab-label {
            display: none;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default MyCards;
