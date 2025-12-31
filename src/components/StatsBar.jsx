import { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * StatsBar - Redesigned
 * 
 * Cleaner stats display for the home page
 */

const StatsBar = ({ vouchers = [], platforms = [] }) => {
  const stats = useMemo(() => {
    // Count vouchers
    const voucherCount = vouchers.length;
    
    // Count unique platforms
    const platformCount = platforms.length || 6;
    
    // Find max discount
    let maxDiscount = 0;
    vouchers.forEach(v => {
      v.platforms?.forEach(p => {
        const fee = p.fee || '';
        const match = fee.match(/(\d+(\.\d+)?)%/);
        if (match && (fee.toLowerCase().includes('discount') || fee.toLowerCase().includes('save') || fee.toLowerCase().includes('off'))) {
          const discount = parseFloat(match[1]);
          if (discount > maxDiscount) maxDiscount = discount;
        }
      });
    });

    return {
      vouchers: voucherCount,
      platforms: platformCount,
      maxDiscount: Math.round(maxDiscount),
      avgSavings: '₹1,139', // Placeholder - calculate from actual data if available
    };
  }, [vouchers, platforms]);

  return (
    <div className="stats-bar-v2">
      <div className="stat-item">
        <span className="stat-icon">🎫</span>
        <div className="stat-content">
          <span className="stat-value">{stats.vouchers}+</span>
          <span className="stat-label">VOUCHERS</span>
        </div>
      </div>

      <div className="stat-divider" />

      <div className="stat-item">
        <span className="stat-icon">📅</span>
        <div className="stat-content">
          <span className="stat-value">{stats.platforms}</span>
          <span className="stat-label">PLATFORMS</span>
        </div>
      </div>

      <div className="stat-divider" />

      <div className="stat-item">
        <span className="stat-icon">💰</span>
        <div className="stat-content">
          <span className="stat-value">{stats.avgSavings}</span>
          <span className="stat-label">AVG. MONTHLY SAVINGS</span>
        </div>
      </div>

      <div className="stat-divider" />

      <div className="stat-item">
        <span className="stat-icon">⭐</span>
        <div className="stat-content">
          <span className="stat-value">100%</span>
          <span className="stat-label">FREE TO USE</span>
        </div>
      </div>

      <style>{`
        .stats-bar-v2 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 1.25rem 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stat-icon {
          font-size: 1.5rem;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--glass-border);
        }

        @media (max-width: 768px) {
          .stats-bar-v2 {
            padding: 1rem;
            gap: 1rem;
          }

          .stat-divider {
            display: none;
          }

          .stat-item {
            flex: 1 1 45%;
            min-width: 130px;
          }

          .stat-value {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .stat-item {
            flex: 1 1 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

StatsBar.propTypes = {
  vouchers: PropTypes.array,
  platforms: PropTypes.array,
};

export default StatsBar;
