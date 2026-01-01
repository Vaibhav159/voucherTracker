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
          >
            {voucher.maxDiscount > 0 && (
              <span className="discount-badge">
                {voucher.maxDiscount}% OFF
              </span>
            )}

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

            <span className="brand-name">
              {voucher.essentialBrand.charAt(0).toUpperCase() + voucher.essentialBrand.slice(1)}
            </span>

            <span className="category-tag">{voucher.category}</span>
          </button>
        ))}
      </div>

      <style>{`
        .daily-essentials-v2 {
          margin-bottom: 2rem;
        }

        .section-header {
          margin-bottom: 1.25rem;
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
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1rem;
        }

        .essential-card-v2 {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.25rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: center;
        }

        .essential-card-v2:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .discount-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          padding: 4px 8px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 8px;
          font-size: 0.65rem;
          font-weight: 700;
          color: white;
          white-space: nowrap;
        }

        .card-logo {
          width: 56px;
          height: 56px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          overflow: hidden;
        }

        .card-logo img {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .brand-fallback {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent-violet);
        }

        .brand-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .category-tag {
          font-size: 0.7rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        @media (max-width: 640px) {
          .essentials-grid {
            grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
            gap: 0.75rem;
          }

          .essential-card-v2 {
            padding: 1rem 0.75rem;
          }

          .card-logo {
            width: 48px;
            height: 48px;
          }

          .brand-name {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
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
