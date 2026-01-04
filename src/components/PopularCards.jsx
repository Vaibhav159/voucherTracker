import { Link } from 'react-router-dom';
import { useCreditCards } from '../hooks/useCreditCards';

// Fallback static cards data
const FALLBACK_CARDS = [
  { id: 'hdfc-infinia', name: 'HDFC Infinia', bank: 'HDFC', tier: 'Super Premium', icon: '💳' },
  { id: 'axis-atlas', name: 'Axis Atlas', bank: 'Axis', tier: 'Super Premium', icon: '✈️' },
  { id: 'icici-sapphiro', name: 'ICICI Sapphiro', bank: 'ICICI', tier: 'Premium', icon: '💎' },
];

/**
 * PopularCards - Popular Credit Cards section for the landing page
 * Shows top cards with gradient backgrounds and category filters
 */
const PopularCards = () => {
  const { cards, loading } = useCreditCards();

  // Get top 3 cards (super premium and premium), with fallback
  const popularCards = cards?.length > 0
    ? cards
      .filter(card =>
        card.tier === 'Super Premium' ||
        card.tier === 'Premium' ||
        card.name?.includes('Infinia') ||
        card.name?.includes('Atlas')
      )
      .slice(0, 3)
    : FALLBACK_CARDS;

  // Card gradients mapping by bank
  const getCardGradient = (card) => {
    const bank = card.bank?.toLowerCase() || '';
    if (bank.includes('hdfc')) return 'linear-gradient(135deg, #0c0c0c 0%, #434343 100%)';
    if (bank.includes('icici')) return 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)';
    if (bank.includes('axis')) return 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)';
    if (bank.includes('sbi')) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    return 'linear-gradient(135deg, #d4a574 0%, #8b6914 100%)';
  };

  const getCardIcon = (card) => {
    if (card.icon) return card.icon;
    const name = card.name?.toLowerCase() || '';
    if (name.includes('travel') || name.includes('atlas')) return '✈️';
    if (name.includes('amazon') || name.includes('shopping')) return '🛒';
    if (name.includes('fuel') || name.includes('bpcl')) return '⛽';
    if (name.includes('cashback')) return '💰';
    return '💳';
  };

  if (popularCards.length === 0) return null;

  return (
    <section className="popular-cards-section">
      <div className="popular-cards-container">
        <div className="popular-cards-header">
          <h2 className="popular-cards-title">Popular Credit Cards</h2>
          <div className="popular-cards-filters">
            {['Online Shopping', 'Dining', 'Travel', 'Fuel'].map((cat, i) => (
              <button
                key={cat}
                className={`filter-pill ${i === 0 ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="popular-cards-grid">
          {popularCards.map((card, index) => (
            <Link to="/know-your-cards" key={card.id || index} className="popular-card">
              <div
                className="popular-card-image"
                style={{ background: getCardGradient(card) }}
              >
                <span className="popular-card-icon">{getCardIcon(card)}</span>
                <button className="popular-card-cta">Apply Now</button>
              </div>
              <div className="popular-card-content">
                <h3 className="popular-card-name">{card.name}</h3>
                <div className="popular-card-tags">
                  {card.tier && <span className="popular-card-tag">{card.tier}</span>}
                  {card.lounge && <span className="popular-card-tag">Lounge</span>}
                </div>
                <p className="popular-card-reward">
                  {card.rewards?.base?.value || card.rewardRate || 'Premium rewards'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .popular-cards-section {
          padding: 80px 48px;
          background: #0d0d0d;
        }

        .popular-cards-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .popular-cards-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .popular-cards-title {
          font-size: 36px;
          font-weight: 400;
          color: var(--text-primary, #fff);
          font-family: var(--font-family-heading, Georgia, serif);
          margin: 0;
        }

        .popular-cards-filters {
          display: flex;
          gap: 12px;
        }

        .filter-pill {
          padding: 10px 20px;
          background: transparent;
          color: var(--text-secondary, #9ca3af);
          border: 1px solid var(--border-color, #262626);
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-pill.active {
          background: var(--accent-gold, #d4a574);
          color: #000;
          border-color: var(--accent-gold, #d4a574);
        }

        .filter-pill:hover:not(.active) {
          border-color: var(--accent-gold, #d4a574);
          color: var(--accent-gold, #d4a574);
        }

        .popular-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .popular-card {
          background: var(--bg-card, #141414);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border-color, #262626);
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }

        .popular-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent-emerald, #10b981);
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
        }

        .popular-card-image {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .popular-card-icon {
          font-size: 64px;
        }

        .popular-card-cta {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          padding: 12px 32px;
          background: var(--gradient-gold-button, linear-gradient(135deg, #d4a574 0%, #b8956a 100%));
          color: #000;
          border: none;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .popular-card:hover .popular-card-cta {
          opacity: 1;
        }

        .popular-card-content {
          padding: 24px;
        }

        .popular-card-name {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary, #fff);
          margin: 0 0 8px 0;
        }

        .popular-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .popular-card-tag {
          padding: 4px 12px;
          background: var(--bg-elevated, #1e1e1e);
          border-radius: 15px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary, #9ca3af);
          text-transform: uppercase;
        }

        .popular-card-reward {
          color: var(--accent-emerald, #10b981);
          font-size: 14px;
          font-weight: 500;
          margin: 0;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .popular-cards-header {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }

          .popular-cards-filters {
            flex-wrap: wrap;
          }

          .popular-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .popular-cards-section {
            padding: 60px 24px;
          }

          .popular-cards-title {
            font-size: 28px;
          }

          .popular-cards-grid {
            grid-template-columns: 1fr;
          }

          .popular-card-cta {
            opacity: 1;
          }
        }

        /* Light Mode */
        [data-theme='light'] .popular-cards-section {
          background: #f8fafc;
        }

        [data-theme='light'] .popular-card {
          background: #fff;
          border-color: #e2e8f0;
        }
      `}</style>
    </section>
  );
};

export default PopularCards;
