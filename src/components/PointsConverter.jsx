import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { pointsConversion, getCardNames, tierConfig, getAllBanks } from '../data/pointsConversion';
import '../styles/components/points-converter.css';

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
    <span
      className="tier-badge"
      style={{
        background: config.bg,
        color: config.color,
      }}
    >
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
        <span className="highlight-match">
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
            <div className="calc-grid">
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

    </div>
  );
};

export default PointsConverter;
