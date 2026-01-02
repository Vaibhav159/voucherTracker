import { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * TopDeals (Daily Essentials) - Redesigned
 * 
 * Cleaner card design with better hover states
 */

const DAILY_ESSENTIALS = [
  'amazon', 'flipkart', 'myntra', 'ajio', 'district', 'nykaa', 'tata cliq',
  'swiggy', 'zomato', 'bigbasket', 'blinkit', 'zepto', 'instamart', 'jiomart',
  'uber', 'ola', 'rapido', 'bookmyshow', 'pvr', 'inox'
];

const TopDeals = ({ vouchers, onVoucherClick }) => {
  const dailyDeals = useMemo(() => {
    const seenBrands = new Set();

    const essentials = vouchers
      .map(v => {
        const brandLower = v.brand.toLowerCase();

        if (brandLower.includes('e-gift') || brandLower.includes('money') || v.brand.length <= 2) {
          return null;
        }

        const matchedEssential = DAILY_ESSENTIALS.find(e =>
          brandLower.includes(e) || brandLower.startsWith(e)
        );

        if (!matchedEssential || seenBrands.has(matchedEssential)) return null;
        seenBrands.add(matchedEssential);

        const priority = DAILY_ESSENTIALS.indexOf(matchedEssential);
        const maxDiscount = Math.max(0, ...v.platforms.map(p => {
          const fee = p.fee || '';
          const match = fee.match(/(\d+(\.\d+)?)%/);
          if (match && (fee.toLowerCase().includes('discount') || fee.toLowerCase().includes('save') || fee.toLowerCase().includes('off'))) {
            return parseFloat(match[1]);
          }
          return 0;
        }));

        return { ...v, maxDiscount, priority, essentialBrand: matchedEssential };
      })
      .filter(v => v !== null)
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 8);

    return essentials;
  }, [vouchers]);

  if (dailyDeals.length === 0) return null;

  return (
    <section className="daily-essentials-v2">
      <div className="section-header">
        <div className="header-content">
          <span className="header-icon">⚡</span>
          <div>
            <h2>Daily Essentials</h2>
            <p>Premium deals on your favorite brands</p>
          </div>
        </div>
      </div>

      <div className="essentials-scroll-container">
        <div className="essentials-grid">
          {dailyDeals.map((voucher) => (
            <button
              key={voucher.id}
              className="essential-card-v2"
              onClick={() => onVoucherClick(voucher)}
              title={voucher.brand}
              data-brand={voucher.brand.toLowerCase()}
            >
              <div className="card-logo">
                {voucher.logo ? (
                  <img
                    src={voucher.logo}
                    alt={voucher.brand}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span
                  className="brand-fallback"
                  style={{ display: voucher.logo ? 'none' : 'flex' }}
                >
                  {voucher.brand.charAt(0).toUpperCase()}
                </span>
              </div>
              {voucher.maxDiscount > 0 && (
                <div className="discount-chip">
                  {voucher.maxDiscount}% OFF
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .daily-essentials-v2 {
          margin-bottom: 2.5rem;
          position: relative;
        }

        .section-header {
          margin-bottom: 1.25rem;
          padding: 0 4px;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .header-icon {
          font-size: 1.5rem;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.4));
        }

        .section-header h2 {
          margin: 0;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .section-header p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
          opacity: 0.8;
        }

        .essentials-scroll-container {
          position: relative;
          margin: 0 -1rem;
          padding: 0 1rem;
        }

        /* Fading masks for better scroll UI */
        .essentials-scroll-container::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to left, var(--bg-color, #0f172a), transparent);
          pointer-events: none;
          z-index: 5;
        }

        .essentials-grid {
          display: flex;
          overflow-x: auto;
          gap: 1rem;
          padding: 0.5rem 0.5rem 1.5rem 0;
          scrollbar-width: none; /* Firefox */
          -webkit-overflow-scrolling: touch;
        }
        
        .essentials-grid::-webkit-scrollbar {
          display: none; /* Hide scrollbar for cleaner look */
        }

        .essential-card-v2 {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          min-width: 92px;
          width: 92px;
          height: 92px;
          flex-shrink: 0;
          box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.3);
          overflow: visible;
        }

        .essential-card-v2:hover {
          transform: translateY(-4px) scale(1.02);
          background: rgba(51, 65, 85, 0.5);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.5), 
                      0 0 15px rgba(255, 255, 255, 0.05);
          z-index: 10;
        }

        .essential-card-v2:active {
           transform: translateY(-1px) scale(0.96);
        }

        .discount-chip {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          height: 20px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ef4444, #b91c1c);
          border-radius: 10px;
          font-size: 0.65rem;
          font-weight: 800;
          color: white;
          white-space: nowrap;
          z-index: 2;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
          letter-spacing: 0.02em;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .card-logo {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          transition: transform 0.3s ease;
        }

        .essential-card-v2:hover .card-logo {
          transform: scale(1.1);
        }

        .card-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
        }

        .brand-fallback {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent-violet, #8b5cf6), var(--accent-cyan, #06b6d4));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 640px) {
          .daily-essentials-v2 {
            margin-bottom: 2rem;
          }
          .section-header h2 {
            font-size: 1.2rem;
          }
          .essentials-grid {
             gap: 0.85rem;
          }
          .essential-card-v2 {
             min-width: 78px;
             width: 78px;
             height: 78px;
             border-radius: 18px;
          }
          .card-logo {
            padding: 14px;
          }
          .discount-chip {
            padding: 0 8px;
            font-size: 0.6rem;
          }
        }
      `}</style>
    </section>);
};

TopDeals.propTypes = {
  vouchers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    logo: PropTypes.string,
    category: PropTypes.string,
    platforms: PropTypes.arrayOf(PropTypes.shape({ fee: PropTypes.string })),
  })).isRequired,
  onVoucherClick: PropTypes.func.isRequired,
};

export default TopDeals;
