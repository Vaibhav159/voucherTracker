import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { pointsConversion, getCardNames, tierConfig, getAllBanks } from '../data/pointsConversion';

/**
 * PointsConverter - Premium Redesigned
 * 
 * Features:
 * - Premium glassmorphism card selector
 * - Grouped by bank with visual hierarchy
 * - Tier badges for card quality
 * - Smooth animations and micro-interactions
 * - Search with highlighting
 */

const POINT_PRESETS = [5000, 10000, 25000, 50000, 100000];
const LAST_UPDATED = '2025-12-26';

// Bank brand colors for visual identity
const bankColors = {
  'HDFC Bank': { primary: '#004C8F', gradient: 'linear-gradient(135deg, #004C8F, #0066CC)' },
  'ICICI Bank': { primary: '#F37421', gradient: 'linear-gradient(135deg, #F37421, #FF8C42)' },
  'Axis Bank': { primary: '#97144D', gradient: 'linear-gradient(135deg, #97144D, #B8185E)' },
  'SBI Card': { primary: '#22409A', gradient: 'linear-gradient(135deg, #22409A, #1E5BC6)' },
  'IDFC First Bank': { primary: '#9C1D26', gradient: 'linear-gradient(135deg, #9C1D26, #C62828)' },
  'AU Small Finance Bank': { primary: '#8B2346', gradient: 'linear-gradient(135deg, #8B2346, #A52A4F)' },
  'American Express': { primary: '#006FCF', gradient: 'linear-gradient(135deg, #006FCF, #0095FF)' },
  'Kotak Mahindra Bank': { primary: '#ED1C24', gradient: 'linear-gradient(135deg, #ED1C24, #FF4136)' },
  'IndusInd Bank': { primary: '#98252B', gradient: 'linear-gradient(135deg, #98252B, #B8323A)' },
  'RBL Bank': { primary: '#E31837', gradient: 'linear-gradient(135deg, #E31837, #FF2D4D)' },
  'Yes Bank': { primary: '#0066B3', gradient: 'linear-gradient(135deg, #0066B3, #0088D1)' },
  'HSBC': { primary: '#DB0011', gradient: 'linear-gradient(135deg, #DB0011, #FF1A2B)' },
  'FPL Technologies (Federal Bank)': { primary: '#1A1A1A', gradient: 'linear-gradient(135deg, #1A1A1A, #333)' },
  'Federal Bank': { primary: '#00529B', gradient: 'linear-gradient(135deg, #00529B, #0066CC)' },
  'SBM Bank India': { primary: '#003366', gradient: 'linear-gradient(135deg, #003366, #004C99)' },
};

// Get bank initials for avatar
const getBankInitials = (bankName) => {
  const words = bankName.split(' ');
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return words.slice(0, 2).map(w => w[0]).join('').toUpperCase();
};

// Partner icons
const getPartnerIcon = (type) => {
  const t = type.toLowerCase();
  if (t.includes('air') || t.includes('miles') || t.includes('flight') || t.includes('vistara')) return '✈️';
  if (t.includes('hotel') || t.includes('itc') || t.includes('marriott')) return '🏨';
  if (t.includes('statement') || t.includes('cash')) return '💵';
  if (t.includes('amazon')) return '🛒';
  if (t.includes('travel') || t.includes('smartbuy') || t.includes('ishop')) return '🌍';
  if (t.includes('voucher') || t.includes('gift')) return '🎁';
  return '💳';
};

// Tier badge component
const TierBadge = ({ tier }) => {
  const config = tierConfig[tier] || { color: '#888', label: tier };
  return (
    <span style={{
      fontSize: '0.65rem',
      padding: '2px 6px',
      borderRadius: '4px',
      background: config.bg,
      color: config.color,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      whiteSpace: 'nowrap',
    }}>
      {config.label}
    </span>
  );
};

const PointsConverter = () => {
  const [selectedCard, setSelectedCard] = useState('');
  const [points, setPoints] = useState(10000);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCardList, setShowCardList] = useState(false);
  const [expandedBanks, setExpandedBanks] = useState(new Set());

  const cardNames = useMemo(() => getCardNames(), []);
  const allBanks = useMemo(() => getAllBanks(), []);
  const cardData = selectedCard ? pointsConversion[selectedCard] : null;

  // Group cards by bank
  const cardsByBank = useMemo(() => {
    const grouped = {};
    cardNames.forEach(name => {
      const card = pointsConversion[name];
      if (!grouped[card.bank]) grouped[card.bank] = [];
      grouped[card.bank].push({ name, ...card });
    });
    return grouped;
  }, [cardNames]);

  // Filter cards by search
  const filteredCardsByBank = useMemo(() => {
    if (!searchQuery) return cardsByBank;

    const filtered = {};
    Object.entries(cardsByBank).forEach(([bank, cards]) => {
      const matchingCards = cards.filter(card =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingCards.length > 0) {
        filtered[bank] = matchingCards;
      }
    });
    return filtered;
  }, [cardsByBank, searchQuery]);

  const totalFilteredCards = useMemo(() =>
    Object.values(filteredCardsByBank).reduce((sum, cards) => sum + cards.length, 0),
    [filteredCardsByBank]
  );

  // Toggle bank expansion
  const toggleBank = (bank) => {
    setExpandedBanks(prev => {
      const next = new Set(prev);
      if (next.has(bank)) next.delete(bank);
      else next.add(bank);
      return next;
    });
  };

  // Expand all when searching
  useMemo(() => {
    if (searchQuery) {
      setExpandedBanks(new Set(Object.keys(filteredCardsByBank)));
    }
  }, [searchQuery, filteredCardsByBank]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showCardList && e.key === 'Escape') {
        setShowCardList(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCardList]);

  // Calculate conversions
  const conversions = useMemo(() => {
    if (!cardData || !points) return [];
    return cardData.options
      .map(option => ({
        ...option,
        rupeeValue: points * option.value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [cardData, points]);

  const bestConversion = conversions[0] || null;

  // Highlight matching text
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.substring(0, index)}
        <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
          {text.substring(index, index + query.length)}
        </span>
        {text.substring(index + query.length)}
      </>
    );
  };

  return (
    <div className="points-page">
      {/* Header */}
      <header className="points-header">
        <h1>Points Converter</h1>
        <p>Find the best redemption value for your credit card reward points</p>
        <span className="last-updated">
          Last updated: {new Date(LAST_UPDATED).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
          })}
        </span>
      </header>

      {/* Two Column Layout */}
      <div className="converter-layout">
        {/* LEFT: Controls */}
        <div className="controls-column">
          <div className="calculator-card glass-panel">
            <div className="calc-grid" style={{ overflow: 'visible' }}>
              {/* Card Selection */}
              <div className="calc-section">
                <label className="calc-label">Select Credit Card</label>
                <div className="card-selector">
                  <button
                    className="card-selector-btn"
                    onClick={() => setShowCardList(!showCardList)}
                  >
                    {selectedCard && cardData ? (
                      <>
                        <span className="selector-bank-avatar" style={{
                          background: bankColors[cardData.bank]?.gradient || 'linear-gradient(135deg, #555, #777)',
                        }}>
                          {getBankInitials(cardData.bank)}
                        </span>
                        <span className="selector-text">{selectedCard}</span>
                        <TierBadge tier={cardData.tier} />
                      </>
                    ) : (
                      <>
                        <span className="selector-icon">💳</span>
                        <span className="selector-text">Choose a card...</span>
                      </>
                    )}
                    <svg className={`selector-chevron ${showCardList ? 'open' : ''}`} width="16" height="16" viewBox="0 0 16 16">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  </button>

                  {showCardList && (
                    createPortal(<>
                      {/* Backdrop with blur */}
                      <div
                        className="premium-backdrop"
                        onClick={() => {
                          setShowCardList(false);
                          setSearchQuery('');
                        }}
                      />
                      {/* Premium Modal */}
                      <div className="premium-card-modal">
                        {/* Modal Header */}
                        <div className="modal-header">
                          <div className="modal-title">
                            <span className="modal-icon">💳</span>
                            <div>
                              <h3>Select Credit Card</h3>
                              <p>{totalFilteredCards} cards available</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="modal-close"
                            aria-label="Close modal"
                            onClick={() => {
                              setShowCardList(false);
                              setSearchQuery('');
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>

                        {/* Search Input */}
                        <div className="modal-search">
                          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          <input
                            type="text"
                            placeholder="Search by card or bank name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                          />
                          {searchQuery && (
                            <button
                              className="search-clear"
                              onClick={() => setSearchQuery('')}
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        {/* Cards List Grouped by Bank */}
                        <div className="modal-cards-list">
                          {Object.entries(filteredCardsByBank).map(([bank, cards]) => {
                            const isExpanded = expandedBanks.has(bank) || searchQuery;
                            const bankColor = bankColors[bank] || { primary: '#666', gradient: 'linear-gradient(135deg, #555, #777)' };

                            return (
                              <div key={bank} className="bank-group">
                                {/* Bank Header */}
                                <button
                                  className="bank-header"
                                  onClick={() => !searchQuery && toggleBank(bank)}
                                >
                                  <div className="bank-info">
                                    <span
                                      className="bank-avatar"
                                      style={{ background: bankColor.gradient }}
                                    >
                                      {getBankInitials(bank)}
                                    </span>
                                    <span className="bank-name">{highlightMatch(bank, searchQuery)}</span>
                                    <span className="bank-count">{cards.length}</span>
                                  </div>
                                  {!searchQuery && (
                                    <svg
                                      className={`bank-chevron ${isExpanded ? 'expanded' : ''}`}
                                      width="16" height="16" viewBox="0 0 16 16"
                                    >
                                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                                    </svg>
                                  )}
                                </button>

                                {/* Cards List */}
                                {isExpanded && (
                                  <div className="bank-cards">
                                    {cards.map(card => (
                                      <button
                                        key={card.name}
                                        className={`card-option ${selectedCard === card.name ? 'selected' : ''}`}
                                        onClick={() => {
                                          setSelectedCard(card.name);
                                          setShowCardList(false);
                                          setSearchQuery('');
                                        }}
                                      >
                                        <div className="card-option-info">
                                          <span className="card-option-name">
                                            {highlightMatch(card.name, searchQuery)}
                                          </span>
                                          <span className="card-option-points">{card.pointName}</span>
                                        </div>
                                        <div className="card-option-meta">
                                          <TierBadge tier={card.tier} />
                                          {selectedCard === card.name && (
                                            <span className="card-check">
                                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                              </svg>
                                            </span>
                                          )}
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {Object.keys(filteredCardsByBank).length === 0 && (
                            <div className="no-results">
                              <span className="no-results-icon">🔍</span>
                              <p>No cards found matching "{searchQuery}"</p>
                              <button onClick={() => setSearchQuery('')}>Clear search</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </>, document.body)
                  )}
                </div>
              </div>

              {/* Points Input */}
              <div className="calc-section">
                <label className="calc-label">
                  {cardData ? cardData.pointName : 'Reward Points'}
                </label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                  className="points-input"
                  placeholder="Enter points"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="presets-section">
              <span className="presets-label">Quick presets:</span>
              <div className="presets-grid">
                {POINT_PRESETS.map(preset => (
                  <button
                    key={preset}
                    className={`preset-btn ${points === preset ? 'active' : ''}`}
                    onClick={() => setPoints(preset)}
                  >
                    {preset.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="results-column">
          {/* Results */}
          {cardData && points > 0 ? (
            <div className="results-section">
              {/* Best Option Highlight */}
              {bestConversion && (
                <div className="best-option glass-panel">
                  <div className="best-badge">🏆 Best Value</div>
                  <div className="best-content">
                    <div className="best-icon">{getPartnerIcon(bestConversion.type)}</div>
                    <div className="best-info">
                      <h3>{bestConversion.type}</h3>
                      <p className="best-rate">₹{bestConversion.value.toFixed(2)} per point</p>
                    </div>
                    <div className="best-value">
                      <span className="value-label">Total Value</span>
                      <span className="value-amount">₹{bestConversion.rupeeValue.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* All Options */}
              <h2 className="section-title">All Redemption Options</h2>
              <div className="options-grid">
                {conversions.map((conv, i) => (
                  <div
                    key={i}
                    className={`option-card ${i === 0 ? 'best' : ''}`}
                  >
                    <div className="option-icon">{getPartnerIcon(conv.type)}</div>
                    <div className="option-info">
                      <h4>{conv.type}</h4>
                      <p className="option-rate">₹{conv.value.toFixed(2)}/pt</p>
                    </div>
                    <div className="option-value">
                      <span>₹{conv.rupeeValue.toLocaleString('en-IN')}</span>
                    </div>
                    {i === 0 && <div className="best-indicator">Best</div>}
                  </div>
                ))}
              </div>

              {/* Point Value Info */}
              {cardData.notes && (
                <div className="info-box">
                  <span className="info-icon">ℹ️</span>
                  <p>{cardData.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-results">
              <div className="empty-icon">🎯</div>
              <p>Select a credit card to see redemption values</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .points-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 0 4rem;
        }

        /* Two Column Layout */
        .converter-layout {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 2rem;
          align-items: start;
        }

        .controls-column {
          position: sticky;
          top: 100px;
        }

        .results-column {
          min-height: 400px;
          padding-top: 12px;
        }

        @media (max-width: 900px) {
          .converter-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .controls-column {
            position: static;
          }
        }

        .points-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .points-header h1 {
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 700;
          margin: 0 0 0.5rem;
          background: linear-gradient(135deg, var(--accent-cyan), #fff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .points-header p {
          color: var(--text-secondary);
          margin: 0 0 0.5rem;
        }

        .last-updated {
          font-size: 0.75rem;
          color: var(--text-secondary);
          opacity: 0.7;
        }

        /* Calculator Card */
        .calculator-card {
          padding: 1.5rem;
          margin-bottom: 0;
          border-radius: 16px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        }

        .calc-section {
          margin-bottom: 1rem;
        }

        .card-selector {
          position: relative;
        }

        .calc-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .calc-section {
          position: relative;
        }

        .calc-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        /* Card Selector */
        .card-selector {
          position: relative;
        }

        .card-selector-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: var(--item-bg);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .card-selector-btn:hover {
          border-color: var(--accent-cyan);
          background: var(--nav-bg-hover);
        }

        .selector-icon {
          font-size: 1.2rem;
        }

        .selector-bank-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          flex-shrink: 0;
        }

        .selector-text {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 500;
        }

        .selector-chevron {
          transition: transform 0.2s ease;
          opacity: 0.5;
        }

        .selector-chevron.open {
          transform: rotate(180deg);
        }

        /* Premium Backdrop */
        .premium-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(4px);
          z-index: 1000;
        }

        /* Premium Modal - Centered */
        .premium-card-modal {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 92%;
          max-width: 550px;
          max-height: 75vh;
          background: var(--modal-bg);
          backdrop-filter: blur(20px); /* Heavy blur for glass effect */
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 24px; /* More rounded */
          z-index: 1001;
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.05), /* Inner subtle border */
            0 25px 80px rgba(0, 0, 0, 0.6), 
            0 0 60px rgba(139, 92, 246, 0.15); /* Violet glow */
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: modalPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalPopIn {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -46%) scale(0.96) !important;
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1) !important;
          }
        }

        /* Modal Header */
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--glass-border);
          background: var(--nav-bg);
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .modal-icon {
          font-size: 1.8rem;
        }

        .modal-title h3 {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .modal-title p {
          margin: 2px 0 0;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .modal-close {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--btn-secondary-bg);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Modal Search */
        .modal-search {
          position: relative;
          padding: 16px 24px;
          background: var(--item-bg);
        }

        .modal-search .search-icon {
          position: absolute;
          left: 40px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          pointer-events: none;
        }

        .modal-search input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          background: var(--modal-bg);
          border: 1px solid var(--glass-border);
          border-radius: 14px;
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.25s ease;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .modal-search input:focus {
          background: var(--item-bg);
          border-color: var(--accent-violet);
          box-shadow: 
            0 0 0 4px rgba(139, 92, 246, 0.15),
            inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .search-clear {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          color: var(--text-secondary);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .search-clear:hover {
          background: rgba(255, 255, 255, 0.2);
          color: var(--text-primary);
        }

        /* Cards List */
        .modal-cards-list {
          flex: 1;
          overflow-y: auto;
          padding: 12px 16px 20px;
        }

        .modal-cards-list::-webkit-scrollbar {
          width: 5px;
        }

        .modal-cards-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .modal-cards-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .modal-cards-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Bank Group Animation & Styling */
        @keyframes slideBottom {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .bank-group {
          margin-bottom: 8px;
          opacity: 0;
          animation: slideBottom 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .bank-group:nth-child(1) { animation-delay: 0.05s; }
        .bank-group:nth-child(2) { animation-delay: 0.1s; }
        .bank-group:nth-child(3) { animation-delay: 0.15s; }
        .bank-group:nth-child(4) { animation-delay: 0.2s; }
        .bank-group:nth-child(5) { animation-delay: 0.25s; }

        .bank-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          color: var(--text-primary);
          transition: all 0.2s ease;
        }

        .bank-header:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.05);
          transform: translateX(4px);
        }

        .bank-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bank-avatar {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .bank-name {
          font-family: inherit;
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .bank-count {
          font-size: 0.7rem;
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .bank-chevron {
          color: var(--text-secondary);
          transition: transform 0.25s ease;
        }

        .bank-chevron.expanded {
          transform: rotate(180deg);
        }

        /* Bank Cards */
        .bank-cards {
          padding: 8px 0 8px 48px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: expandIn 0.2s ease;
        }

        @keyframes expandIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card-option {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
        }

        .card-option:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .card-option.selected {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.1));
          border-color: rgba(139, 92, 246, 0.3);
        }

        .card-option-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .card-option-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .card-option.selected .card-option-name {
          color: var(--accent-violet);
        }

        .card-option-points {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .card-option-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-check {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan));
          border-radius: 6px;
          color: white;
          animation: checkPop 0.2s ease;
        }

        @keyframes checkPop {
          0% { transform: scale(0); }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        /* No Results */
        .no-results {
          text-align: center;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .no-results-icon {
          font-size: 2.5rem;
          opacity: 0.5;
        }

        .no-results p {
          color: var(--text-secondary);
          margin: 0;
          font-size: 0.9rem;
        }

        .no-results button {
          padding: 8px 16px;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 8px;
          color: var(--accent-violet);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .no-results button:hover {
          background: rgba(139, 92, 246, 0.3);
        }

        /* Points Input */
        .points-input {
          width: 100%;
          padding: 12px 14px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .points-input:focus {
          outline: none;
          border-color: var(--accent-cyan);
        }

        /* Presets */
        .presets-section {
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .presets-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 0.5rem;
        }

        .presets-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .preset-btn {
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .preset-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
        }

        .preset-btn.active {
          background: rgba(6, 182, 212, 0.2);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        /* Results */
        .results-section {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Best Option */
        .best-option {
          padding: 2rem;
          padding-top: 3.5rem;
          margin-bottom: 1.5rem;
          position: relative;
          background: linear-gradient(145deg, rgba(139, 92, 246, 0.12), rgba(6, 182, 212, 0.08));
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 16px;
          box-shadow: 
            0 0 30px rgba(139, 92, 246, 0.15),
            0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .best-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 4px 12px;
          background: linear-gradient(135deg, var(--accent-violet), var(--accent-pink));
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .best-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .best-icon {
          font-size: 2.5rem;
        }

        .best-info {
          flex: 1;
          min-width: 150px;
        }

        .best-info h3 {
          margin: 0 0 0.25rem;
          color: var(--text-primary);
          font-size: 1.1rem;
        }

        .best-rate {
          margin: 0;
          color: var(--accent-cyan);
          font-size: 0.9rem;
        }

        .best-value {
          text-align: right;
        }

        .value-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .value-amount {
          font-size: 1.5rem;
          font-weight: 700;
          color: #22c55e;
        }

        /* Section Title */
        .section-title {
          font-size: 1rem;
          color: var(--text-secondary);
          margin: 0 0 1rem;
          font-weight: 500;
        }

        /* Options Grid */
        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 0.75rem;
        }

        .option-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 1.1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          position: relative;
          transition: all 0.2s ease;
          cursor: default;
        }

        .option-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .option-card.best {
          display: none;
        }

        .option-icon {
          font-size: 1.5rem;
        }

        .option-info {
          flex: 1;
        }

        .option-info h4 {
          margin: 0 0 0.25rem;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .option-rate {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .option-value {
          font-weight: 600;
          color: var(--accent-cyan);
        }

        .best-indicator {
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 2px 8px;
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
          font-size: 0.65rem;
          color: var(--accent-violet);
          font-weight: 600;
        }

        /* Info Box */
        .info-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 10px;
        }

        .info-icon {
          font-size: 1rem;
        }

        .info-box p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Empty Results */
        .empty-results {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-results p {
          color: var(--text-secondary);
          margin: 0;
        }

        @media (max-width: 640px) {
          .calc-grid {
            grid-template-columns: 1fr;
          }

          .best-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .best-value {
            text-align: center;
          }

          .options-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PointsConverter;
