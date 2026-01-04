import { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * StatsBar - Redesigned
 * 
 * Cleaner stats display for the home page
 */

const StatsBar = ({ vouchers = [], platforms = [], variant = 'full' }) => {
  const isSidebar = variant === 'sidebar';

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
    <div className={`stats-bar-premium ${isSidebar ? 'stats-bar-sidebar' : ''}`}>
      {!isSidebar && <div className="stats-bar-glow"></div>}
      <div className={`stats-bar-content ${isSidebar ? 'sidebar-content' : ''}`}>
        <div className="stat-item-premium">
          <div className="stat-icon-wrapper voucher-icon">
            <svg width={isSidebar ? "18" : "22"} height={isSidebar ? "18" : "22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <path d="M13 5v2" />
              <path d="M13 17v2" />
              <path d="M13 11v2" />
            </svg>
          </div>
          <div className="stat-content-premium">
            <span className="stat-value-premium">
              {stats.vouchers}<span className="stat-plus">+</span>
            </span>
            <span className="stat-label-premium">Vouchers</span>
          </div>
        </div>

        {!isSidebar && (
          <div className="stat-divider-premium">
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>
        )}

        <div className="stat-item-premium">
          <div className="stat-icon-wrapper platform-icon">
            <svg width={isSidebar ? "18" : "22"} height={isSidebar ? "18" : "22"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <div className="stat-content-premium">
            <span className="stat-value-premium">{stats.platforms}</span>
            <span className="stat-label-premium">Platforms</span>
          </div>
        </div>

      </div>

      <style>{`
        .stats-bar-premium {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 2.5rem;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.06) 50%,
            rgba(255, 255, 255, 0.03) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
          overflow: hidden;
          box-shadow: 
            0 4px 24px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }


        .stats-bar-premium.stats-bar-sidebar {
          padding: 1.25rem 1rem;
          margin-bottom: 1rem;
          border-radius: 16px;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: visible; /* Ensure content isn't clipped */
          min-height: auto;
        }

        .stats-bar-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            ellipse at center,
            rgba(139, 92, 246, 0.08) 0%,
            rgba(59, 130, 246, 0.05) 30%,
            transparent 70%
          );
          animation: pulseGlow 8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .stats-bar-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        .stats-bar-content.sidebar-content {
          gap: 1rem;
          justify-content: space-between;
          width: 100%;
          flex-direction: row; /* Keep side-by-side but compact */
        }

        .stat-item-premium {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0.5rem;
          transition: transform 0.3s ease;
        }

        .stats-bar-sidebar .stat-item-premium {
            padding: 0;
            gap: 10px;
            flex-direction: column;
            text-align: center;
            flex: 1;
        }

        .stat-item-premium:hover {
          transform: translateY(-2px);
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          color: white;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .stats-bar-sidebar .stat-icon-wrapper {
            width: 36px;
            height: 36px;
            border-radius: 10px;
        }

        .stat-item-premium:hover .stat-icon-wrapper {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .voucher-icon {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
        }

        .platform-icon {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }

        .savings-icon {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .stat-content-premium {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stats-bar-sidebar .stat-content-premium {
            align-items: center;
        }

        .stat-value-premium {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          letter-spacing: -0.02em;
          display: flex;
          align-items: baseline;
        }

        .stats-bar-sidebar .stat-value-premium {
            font-size: 1.2rem;
        }

        .stat-plus {
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          margin-left: 1px;
        }

        .stat-label-premium {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
        }

        .stats-bar-sidebar .stat-label-premium {
            font-size: 0.7rem;
            margin-top: 4px;
            display: block; /* Ensure it takes up space */
            opacity: 0.8;
        }

        .stat-divider-premium {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          height: 50px;
        }

        .divider-line {
          width: 1px;
          flex: 1;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            rgba(255, 255, 255, 0.15) 50%,
            transparent 100%
          );
        }

        .divider-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .stats-bar-premium {
            padding: 1.25rem 1.5rem;
            border-radius: 16px;
          }

          .stats-bar-content {
            gap: 1.5rem;
          }

          .stat-divider-premium {
            display: none;
          }

          .stat-item-premium {
            flex: 0 0 auto;
          }

          .stat-icon-wrapper {
            width: 42px;
            height: 42px;
            border-radius: 12px;
          }

          .stat-icon-wrapper svg {
            width: 20px;
            height: 20px;
          }

          .stat-value-premium {
            font-size: 1.25rem;
          }

          .stat-label-premium {
            font-size: 0.7rem;
          }
        }

        @media (max-width: 480px) {
          .stats-bar-premium {
            padding: 1rem;
          }

          .stats-bar-content {
            gap: 1rem;
            justify-content: space-around;
            width: 100%;
          }

          .stat-item-premium {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }

          .stat-content-premium {
            align-items: center;
          }

          .stat-icon-wrapper {
            width: 38px;
            height: 38px;
            border-radius: 10px;
          }

          .stat-icon-wrapper svg {
            width: 18px;
            height: 18px;
          }

          .stat-value-premium {
            font-size: 1.1rem;
          }

          .stat-label-premium {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </div>
  );
};

StatsBar.propTypes = {
  vouchers: PropTypes.array,
  platforms: PropTypes.array,
  variant: PropTypes.oneOf(['full', 'sidebar']),
};

export default StatsBar;
