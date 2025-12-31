import { useState, useMemo } from 'react';
import { pointsConversion, getCardNames } from '../data/pointsConversion';

/**
 * PointsConverter - Redesigned
 * 
 * Improvements:
 * - Better card selector with search
 * - Visual conversion comparison
 * - Cleaner layout
 */

const POINT_PRESETS = [5000, 10000, 25000, 50000, 100000];
const LAST_UPDATED = '2025-12-26';

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

const PointsConverter = () => {
  const [selectedCard, setSelectedCard] = useState('');
  const [points, setPoints] = useState(10000);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCardList, setShowCardList] = useState(false);

  const cardNames = getCardNames();
  const cardData = selectedCard ? pointsConversion[selectedCard] : null;

  // Filter cards by search
  const filteredCards = useMemo(() => {
    if (!searchQuery) return cardNames;
    return cardNames.filter(name => 
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cardNames, searchQuery]);

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

      {/* Main Calculator */}
      <div className="calculator-card glass-panel">
        <div className="calc-grid">
          {/* Card Selection */}
          <div className="calc-section">
            <label className="calc-label">Select Credit Card</label>
            <div className="card-selector">
              <button
                className="card-selector-btn"
                onClick={() => setShowCardList(!showCardList)}
              >
                <span className="selector-icon">💳</span>
                <span className="selector-text">
                  {selectedCard || 'Choose a card...'}
                </span>
                <svg className={`selector-chevron ${showCardList ? 'open' : ''}`} width="16" height="16" viewBox="0 0 16 16">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
              
              {showCardList && (
                <div className="card-dropdown">
                  <input
                    type="text"
                    placeholder="Search cards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="card-search"
                    autoFocus
                  />
                  <div className="card-list">
                    {filteredCards.map(name => (
                      <button
                        key={name}
                        className={`card-option ${selectedCard === name ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedCard(name);
                          setShowCardList(false);
                          setSearchQuery('');
                        }}
                      >
                        {name}
                        {selectedCard === name && <span className="check">✓</span>}
                      </button>
                    ))}
                    {filteredCards.length === 0 && (
                      <p className="no-results">No cards found</p>
                    )}
                  </div>
                </div>
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

      {/* Results */}
      {cardData && points > 0 ? (
        <div className="results-section">
          {/* Best Option Highlight */}
          {bestConversion && (
            <div className="best-option glass-panel">
              <div className="best-badge">🏆 Best Value</div>
              <div className="best-content">
                <div className="best-icon">{getPartnerIcon(bestConversion.option)}</div>
                <div className="best-info">
                  <h3>{bestConversion.option}</h3>
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
                <div className="option-icon">{getPartnerIcon(conv.option)}</div>
                <div className="option-info">
                  <h4>{conv.option}</h4>
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

      <style>{`
        .points-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 1rem 0 4rem;
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
          margin-bottom: 2rem;
        }

        .calc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
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
          background: rgba(0, 0, 0, 0.3);
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
        }

        .selector-icon {
          font-size: 1.2rem;
        }

        .selector-text {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .selector-chevron {
          transition: transform 0.2s ease;
          opacity: 0.5;
        }

        .selector-chevron.open {
          transform: rotate(180deg);
        }

        .card-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: rgba(20, 20, 35, 0.98);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 8px;
          z-index: 100;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          animation: dropIn 0.15s ease;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card-search {
          width: 100%;
          padding: 10px 12px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.9rem;
          margin-bottom: 8px;
        }

        .card-list {
          max-height: 250px;
          overflow-y: auto;
        }

        .card-option {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
        }

        .card-option:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .card-option.selected {
          background: rgba(139, 92, 246, 0.15);
          color: var(--accent-violet);
        }

        .check {
          color: var(--accent-cyan);
        }

        .no-results {
          text-align: center;
          padding: 1rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
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
          padding: 1.5rem;
          margin-bottom: 2rem;
          position: relative;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1));
          border-color: rgba(139, 92, 246, 0.3);
        }

        .best-badge {
          position: absolute;
          top: -10px;
          left: 20px;
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
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }

        .option-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          position: relative;
          transition: all 0.2s ease;
        }

        .option-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .option-card.best {
          border-color: rgba(139, 92, 246, 0.3);
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
