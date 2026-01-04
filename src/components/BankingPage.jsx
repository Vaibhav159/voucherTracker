import React, { useState } from 'react';

// Wealth Banking Tiers Data (from mockup)
const wealthTiers = {
    'HDFC Bank': [
        { name: 'Classic', requirement: 'AMB ₹1L Savings OR ₹2L Current', card: 'HDFC Classic', hasRM: false, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { name: 'Preferred', requirement: 'AMB ₹2L Savings OR ₹5L Current', card: 'HDFC Preferred Platinum', hasRM: true, gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
        { name: 'Imperia', requirement: 'AMB ₹10L Savings OR ₹15L Current', card: 'HDFC Imperia Platinum', hasRM: true, gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' },
        { name: 'Private Banking', requirement: 'NRV ₹10 Crores+', card: 'HDFC Private World', hasRM: true, gradient: 'linear-gradient(135deg, #D4A574 0%, #8B6914 100%)' },
    ],
    // Fallback data for other banks (using similar structure for demo)
    'ICICI Bank': [
        { name: 'Gold', requirement: 'MAB ₹50k', card: 'ICICI Gold', hasRM: false, gradient: 'linear-gradient(135deg, #FF8008 0%, #FFC837 100%)' },
        { name: 'Magnum', requirement: 'MAB ₹1L', card: 'ICICI Magnum', hasRM: true, gradient: 'linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)' },
        { name: 'Titanium', requirement: 'MAB ₹2L', card: 'ICICI Titanium', hasRM: true, gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)' },
        { name: 'Wealth', requirement: 'MAB ₹5L+', card: 'ICICI Wealth Select', hasRM: true, gradient: 'linear-gradient(135deg, #cc2b5e 0%, #753a88 100%)' },
    ],
    'Axis Bank': [
        { name: 'Priority', requirement: 'AQB ₹2L', card: 'Axis Priority', hasRM: true, gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' },
        { name: 'Burgundy', requirement: 'TRV ₹10L', card: 'Axis Burgundy', hasRM: true, gradient: 'linear-gradient(135deg, #800080 0%, #ffc0cb 100%)' },
        { name: 'Burgundy Private', requirement: 'TRV ₹5Cr', card: 'Axis Reserve', hasRM: true, gradient: 'linear-gradient(135deg, #000000 0%, #434343 100%)' },
    ]
};

/**
 * BankingPage - Wealth Banking Tiers
 * Implements the Banking Page design from Premium Dark Luxe v2 mockup
 */
const BankingPage = () => {
    const [activeBank, setActiveBank] = useState('HDFC Bank');
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const currentTiers = wealthTiers[activeBank] || wealthTiers['HDFC Bank'];

    return (
        <div className="banking-page">
            <div className="banking-header">
                <h1 className="banking-title">
                    Banking Guides
                </h1>
                <p className="banking-subtitle">Understand wealth tiers and family banking programs</p>
            </div>

            {/* Bank Tabs */}
            <div className="bank-tabs">
                {['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'SBI', 'Kotak'].map(bank => (
                    <button
                        key={bank}
                        onClick={() => setActiveBank(bank)}
                        className={`bank-tab ${activeBank === bank ? 'active' : ''}`}
                    >{bank}</button>
                ))}
            </div>

            {/* Section Header */}
            <div className="section-header-banner">
                <h2 className="section-title">{activeBank} Wealth Banking Tiers</h2>
            </div>

            {/* Tiers Grid */}
            <div className="tiers-grid">
                {currentTiers.map((tier, i) => (
                    <div key={i} className="tier-card">
                        <div className="tier-card-header" style={{ background: tier.gradient }}>
                            <div className="tier-header-content">
                                <h3 className="tier-name">{tier.name}</h3>
                                <button
                                    onClick={() => toggleFavorite(`tier-${tier.name}`)}
                                    className="tier-fav-btn"
                                >
                                    {favorites.includes(`tier-${tier.name}`) ? '💚' : '🤍'}
                                </button>
                            </div>
                        </div>
                        <div className="tier-card-body">
                            <div className="tier-requirement">{tier.requirement}</div>
                            <div className="tier-card-info">
                                <div className="info-label">Eligible Card</div>
                                <span className="info-value">{tier.card}</span>
                            </div>
                            {tier.hasRM && (
                                <div className="tier-rm-badge">✓ Dedicated Relationship Manager</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .banking-page {
          padding: 40px 48px;
          max-width: 1200px;
          margin: 0 auto;
          background: var(--bg-color, #0a0a0a);
          min-height: 100vh;
        }

        .banking-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .banking-title {
          font-size: 48px;
          font-weight: 400;
          color: var(--accent-gold-light, #e8c49a);
          font-family: var(--font-family-heading, Georgia, serif);
          margin: 0 0 8px 0;
        }

        .banking-subtitle {
          color: var(--text-secondary, #9ca3af);
          font-size: 16px;
        }

        /* Bank Tabs */
        .bank-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .bank-tab {
          padding: 12px 24px;
          background: transparent;
          color: var(--text-secondary, #9ca3af);
          border: 1px solid var(--border-color, #262626);
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .bank-tab.active {
          background: var(--accent-gold, #d4a574);
          color: #000;
          border-color: var(--accent-gold, #d4a574);
        }

        .bank-tab:hover:not(.active) {
          border-color: var(--accent-gold, #d4a574);
          color: var(--accent-gold, #d4a574);
        }

        /* Section Header */
        .section-header-banner {
          background: var(--accent-gold, #d4a574);
          padding: 20px 32px;
          border-radius: 16px;
          text-align: center;
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 600;
          color: #000;
          font-family: var(--font-family-heading, Georgia, serif);
          margin: 0;
        }

        /* Tiers Grid */
        .tiers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .tier-card {
          background: var(--bg-card, #141414);
          border-radius: 20px;
          border: 1px solid var(--border-color, #262626);
          overflow: hidden;
          transition: transform 0.2s;
        }

        .tier-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-emerald, #10b981);
        }

        .tier-card-header {
          padding: 24px;
          color: #fff;
        }

        .tier-header-content {
          display: flex;
          justify-content: space-between;
          align-items: start;
        }

        .tier-name {
          font-size: 24px;
          font-weight: 600;
          font-family: var(--font-family-heading, Georgia, serif);
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .tier-fav-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }

        .tier-card-body {
          padding: 24px;
        }

        .tier-requirement {
          padding: 16px;
          background: var(--bg-emerald-glow, rgba(16, 185, 129, 0.1));
          border-radius: 12px;
          margin-bottom: 16px;
          font-size: 13px;
          color: var(--accent-emerald, #10b981);
          line-height: 1.5;
          font-weight: 500;
        }

        .tier-card-info {
          margin-bottom: 16px;
        }

        .info-label {
          font-size: 12px;
          color: var(--text-dim, #6b7280);
          margin-bottom: 8px;
        }

        .info-value {
          padding: 8px 14px;
          background: var(--bg-elevated, #1e1e1e);
          border-radius: 8px;
          font-size: 13px;
          color: var(--text-primary, #fff);
          display: inline-block;
        }

        .tier-rm-badge {
          padding: 12px 16px;
          background: rgba(212, 165, 116, 0.1);
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          color: var(--accent-gold-light, #e8c49a);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .banking-page { padding: 80px 24px; }
          .banking-title { font-size: 32px; }
          .tiers-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default BankingPage;
