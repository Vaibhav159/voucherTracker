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
            <p>Deals you use everyday</p>
          </div>
        </div>
      </div>

      <div className="essentials-grid">
        {dailyDeals.map((voucher) => (
          <button
            key={voucher.id}
            className="essential-card-v2"
            onClick={() => onVoucherClick(voucher)}
            title={voucher.brand}
            data-brand={voucher.brand.toLowerCase()}
          >
            {voucher.maxDiscount > 0 && (
              <span className="discount-badge">
                {voucher.maxDiscount}% OFF
              </span>
            )}
            {/* ... rest of the card content ... */}

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
          </button>
        ))}
      </div>

      <style>{`
        .daily-essentials-v2 {
          margin-bottom: 2rem;
        }

        .section-header {
          margin-bottom: 1rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-icon {
          font-size: 1.75rem;
        }

        .section-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .section-header p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .essentials-grid {
          display: flex;
          overflow-x: auto;
          gap: 0.75rem;
          padding-bottom: 0.5rem;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }
        
        .essentials-grid::-webkit-scrollbar {
          height: 4px;
        }
        
        .essentials-grid::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .essential-card-v2 {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: #1c1c1e; /* iOS Dark Mode Grey */
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 22px; /* iOS Squircle approximation */
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy press */
          min-width: 84px;
          width: 84px;
          height: 84px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .essential-card-v2:hover {
          transform: scale(1.05); /* App icon hover effect */
          border-color: rgba(255, 255, 255, 0.3);
          z-index: 10;
        }

        .essential-card-v2:active {
           transform: scale(0.95);
        }

        .discount-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          height: 22px;
          min-width: 22px;
          padding: 0 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ff3b30; /* iOS Red */
          border: 2px solid var(--bg-color); /* Cutout effect */
          border-radius: 11px;
          font-size: 0.7rem;
          font-weight: 700;
          color: white;
          white-space: nowrap;
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .card-logo {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 0;
        }

        .card-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain !important;
          border-radius: 0;
          padding: 8px;
        }

        /* Removed specific logo scalings as full bleed cover handles it better */

        .brand-fallback {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--accent-violet);
        }

        @media (max-width: 640px) {
          .essentials-grid {
             gap: 0.6rem;
          }
          .essential-card-v2 {
             min-width: 70px;
             width: 70px;
             height: 70px;
          }
          .card-logo img {
            width: 48px;
            height: 48px;
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
