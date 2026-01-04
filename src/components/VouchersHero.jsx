import PropTypes from 'prop-types';

/**
 * VouchersHero - Hero banner for the Vouchers page
 * Matches the Premium Dark Luxe mockup design
 */
const VouchersHero = ({ voucherCount = 519, platformCount = 6, maxSavings = 21 }) => {
    return (
        <section className="vouchers-hero">
            {/* Decorative orbs */}
            <div className="vouchers-hero-orb vouchers-hero-orb-emerald" />
            <div className="vouchers-hero-orb vouchers-hero-orb-gold" />

            <div className="vouchers-hero-content">
                <div className="vouchers-hero-text">
                    <div className="vouchers-hero-title-row">
                        <span className="vouchers-hero-icon">🎟️</span>
                        <h1 className="vouchers-hero-title">Voucher Shop</h1>
                    </div>
                    <p className="vouchers-hero-subtitle">
                        Save up to <span className="highlight">{maxSavings}%</span> on your favorite brands.
                        Compare rates across {platformCount} platforms instantly.
                    </p>
                </div>

                {/* Stats */}
                <div className="vouchers-hero-stats">
                    <div className="vouchers-hero-stat">
                        <div className="stat-icon">🎫</div>
                        <div className="stat-value">{voucherCount}+</div>
                        <div className="stat-label">Vouchers</div>
                    </div>
                    <div className="vouchers-hero-stat">
                        <div className="stat-icon">🏪</div>
                        <div className="stat-value">{platformCount}</div>
                        <div className="stat-label">Platforms</div>
                    </div>
                    <div className="vouchers-hero-stat">
                        <div className="stat-icon">💰</div>
                        <div className="stat-value">{maxSavings}%</div>
                        <div className="stat-label">Max Savings</div>
                    </div>
                </div>
            </div>

            <style>{`
        .vouchers-hero {
          background: linear-gradient(135deg, #0a1a0a 0%, #0a0a0a 50%, #0a0a1a 100%);
          padding: 60px 48px;
          position: relative;
          overflow: hidden;
        }

        .vouchers-hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .vouchers-hero-orb-emerald {
          top: -100px;
          right: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
        }

        .vouchers-hero-orb-gold {
          bottom: -50px;
          left: 5%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%);
        }

        .vouchers-hero-content {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .vouchers-hero-text {
          flex: 1;
        }

        .vouchers-hero-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .vouchers-hero-icon {
          font-size: 48px;
        }

        .vouchers-hero-title {
          font-size: 52px;
          font-weight: 400;
          color: var(--accent-gold-light, #e8c49a);
          font-family: var(--font-family-heading, Georgia, serif);
          font-style: italic;
          margin: 0;
        }

        .vouchers-hero-subtitle {
          font-size: 18px;
          color: var(--text-secondary, #9ca3af);
          max-width: 500px;
          line-height: 1.6;
          margin: 0;
        }

        .vouchers-hero-subtitle .highlight {
          color: var(--accent-emerald, #10b981);
          font-weight: 700;
        }

        .vouchers-hero-stats {
          display: flex;
          gap: 32px;
        }

        .vouchers-hero-stat {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 24px 32px;
          text-align: center;
          border: 1px solid var(--border-color, #262626);
          min-width: 120px;
        }

        .vouchers-hero-stat .stat-icon {
          font-size: 28px;
          margin-bottom: 8px;
        }

        .vouchers-hero-stat .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: var(--accent-emerald, #10b981);
        }

        .vouchers-hero-stat .stat-label {
          font-size: 14px;
          color: var(--text-secondary, #9ca3af);
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .vouchers-hero-content {
            flex-direction: column;
            text-align: center;
          }

          .vouchers-hero-title-row {
            justify-content: center;
          }

          .vouchers-hero-subtitle {
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .vouchers-hero {
            padding: 40px 24px;
          }

          .vouchers-hero-title {
            font-size: 36px;
          }

          .vouchers-hero-icon {
            font-size: 36px;
          }

          .vouchers-hero-stats {
            gap: 16px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .vouchers-hero-stat {
            padding: 16px 20px;
            min-width: 100px;
          }

          .vouchers-hero-stat .stat-value {
            font-size: 24px;
          }

          .vouchers-hero-stat .stat-icon {
            font-size: 24px;
          }
        }

        /* Light Mode */
        [data-theme='light'] .vouchers-hero {
          background: linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0f9ff 100%);
        }

        [data-theme='light'] .vouchers-hero-stat {
          background: rgba(255, 255, 255, 0.9);
          border-color: var(--border-color, #e2e8f0);
        }
      `}</style>
        </section>
    );
};

VouchersHero.propTypes = {
    voucherCount: PropTypes.number,
    platformCount: PropTypes.number,
    maxSavings: PropTypes.number,
};

export default VouchersHero;
