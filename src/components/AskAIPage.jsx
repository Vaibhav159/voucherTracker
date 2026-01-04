import React from 'react';
import { useCreditCards } from '../hooks/useCreditCards';
import { useGuides } from '../hooks/useGuides';

/**
 * AskAIPage - Finance AI
 * Implements the Ask AI design from Premium Dark Luxe v2 mockup
 */
const AskAIPage = () => {
    const { cards } = useCreditCards();
    const { guides } = useGuides(); // Assuming useGuides returns guides list, or we use a hardcoded fallback if structure differs

    // Fallback counts if data is loading or structure varies
    const cardsCount = cards?.length || 50;
    const vouchersCount = 100; // Placeholder as useGuides might not return raw voucher count directly
    const banksCount = 14;

    return (
        <div className="ask-ai-page">
            <div className="ai-header">
                <h1 className="ai-title">
                    Ask AI ✨
                </h1>
                <p className="ai-subtitle">{cardsCount} Cards • {vouchersCount * 60}+ Vouchers • {banksCount} Banks</p>
            </div>

            <div className="ai-advisor-card">
                <div className="advisor-intro">
                    <span className="wave-emoji">👋</span>
                    <span className="intro-text">Hi! I'm your <span className="highlight-emerald">Credit Card + Banking + Voucher AI Advisor</span></span>
                </div>
                <div className="powered-by-section">
                    <div className="section-label emerald">Powered by:</div>
                    <ul className="advisor-list">
                        <li><span className="highlight-emerald">{cardsCount} Credit Cards</span> with detailed caps & strategies</li>
                        <li><span className="highlight-emerald">{vouchersCount * 60}+ Brand Vouchers</span> with best discounts</li>
                        <li><span className="highlight-emerald">{banksCount} Banks</span> with wealth tiers & family programs</li>
                    </ul>
                </div>
                <div className="try-asking-section">
                    <div className="section-label gold">🏦 Try asking:</div>
                    <ul className="advisor-list">
                        <li>"Best combo for Amazon" → Card + voucher savings</li>
                        <li>"Compare Infinia vs Magnus"</li>
                        <li>"HDFC wealth tiers" → See all requirements</li>
                    </ul>
                </div>
            </div>

            {/* Quick Suggestions */}
            <div className="suggestions-chips">
                {['HDFC wealth tiers', 'Best premium card', 'Best combo for Amazon'].map(q => (
                    <button key={q} className="suggestion-chip">💡 {q}</button>
                ))}
            </div>

            {/* Input */}
            <div className="ai-input-wrapper">
                <input
                    type="text"
                    placeholder="Ask about cards, banking, vouchers..."
                    className="ai-input"
                />
                <button className="ai-submit-btn">Ask</button>
            </div>

            <style>{`
        .ask-ai-page {
          padding: 40px 48px;
          max-width: 900px;
          margin: 0 auto;
          background: var(--bg-color, #0a0a0a);
          min-height: 100vh;
        }

        .ai-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .ai-title {
          font-size: 48px;
          font-weight: 400;
          color: var(--accent-gold-light, #e8c49a);
          font-family: var(--font-family-heading, Georgia, serif);
          margin: 0 0 8px 0;
        }

        .ai-subtitle {
          color: var(--text-secondary, #9ca3af);
        }

        .ai-advisor-card {
          background: var(--bg-card, #141414);
          border-radius: 24px;
          border: 1px solid var(--border-color, #262626);
          padding: 32px;
          margin-bottom: 24px;
        }

        .advisor-intro {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          align-items: center;
        }

        .wave-emoji {
            font-size: 24px;
        }

        .intro-text {
            font-size: 16px;
            color: var(--text-primary, #fff);
        }

        .highlight-emerald {
            color: var(--accent-emerald, #10b981);
            font-weight: 600;
        }

        .section-label {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        
        .section-label.emerald { color: var(--accent-emerald, #10b981); }
        .section-label.gold { color: var(--accent-gold, #d4a574); }

        .advisor-list {
            margin: 0;
            padding-left: 24px;
            color: var(--text-secondary, #9ca3af);
            line-height: 2;
        }

        .powered-by-section { margin-bottom: 20px; }

        .suggestions-chips {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 24px;
        }

        .suggestion-chip {
            padding: 12px 20px;
            background: var(--bg-elevated, #1e1e1e);
            border: 1px solid var(--border-color, #262626);
            border-radius: 25px;
            color: var(--text-secondary, #9ca3af);
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .suggestion-chip:hover {
            border-color: var(--accent-gold, #d4a574);
            color: var(--accent-gold, #d4a574);
        }

        .ai-input-wrapper {
            display: flex;
            gap: 16px;
        }

        .ai-input {
            flex: 1;
            padding: 18px 24px;
            background: var(--bg-card, #141414);
            border: 1px solid var(--border-color, #262626);
            border-radius: 16px;
            font-size: 16px;
            color: var(--text-primary, #fff);
            outline: none;
            transition: border-color 0.2s;
        }

        .ai-input:focus {
            border-color: var(--accent-gold, #d4a574);
        }

        .ai-submit-btn {
            padding: 18px 40px;
            background: var(--accent-gold, #d4a574);
            color: #000;
            border: none;
            border-radius: 16px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
        }

        /* Mobile */
        @media (max-width: 768px) {
            .ask-ai-page { padding: 80px 24px; }
            .ai-title { font-size: 32px; }
            .ai-input-wrapper { flex-direction: column; }
            .ai-submit-btn { width: 100%; }
        }
      `}</style>
        </div>
    );
};

export default AskAIPage;
