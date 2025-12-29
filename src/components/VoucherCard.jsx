import React from 'react';
import PropTypes from 'prop-types';
import { getPlatformLogo } from '../utils/platformLogos';
import ExpiryBadge from './ExpiryBadge';
import RatingStars from './RatingStars';
import { useReviews } from '../hooks/useReviews';

const VoucherCard = ({ voucher, onClick }) => {
  const platformNames = voucher.platforms.map(p => p.name);
  const { averageRating, reviewCount } = useReviews(voucher.id);

  return (
    <button
      onClick={() => onClick && onClick(voucher)}
      className="glass-panel voucher-card"
      aria-label={`View details for ${voucher.brand} in ${voucher.category} category. Available on ${platformNames.length} platform${platformNames.length > 1 ? 's' : ''}`}
    >
      <div className="voucher-card__header">
        <div className="voucher-card__logo">
          <img
            src={voucher.logo}
            alt={`${voucher.brand} logo`}
            loading="lazy"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${voucher.brand}&background=random` }}
          />
        </div>
        <div className="voucher-card__info">
          <h3 className="voucher-card__brand">{voucher.brand}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span className="voucher-card__category">{voucher.category}</span>
            {voucher.expiryDays && voucher.lastUpdated && (
              <ExpiryBadge
                lastUpdated={voucher.lastUpdated}
                expiryDays={voucher.expiryDays}
                size="xs"
              />
            )}
          </div>
          {averageRating > 0 && (
            <div style={{ marginTop: '4px' }}>
              <RatingStars rating={averageRating} size="xs" reviewCount={reviewCount} />
            </div>
          )}
        </div>
      </div>

      <div className="voucher-card__body">
        <div className="voucher-card__platforms-section">
          <p className="voucher-card__platforms-label">Available on</p>
          <div className="voucher-card__platforms-list">
            {platformNames.slice(0, 3).map(name => {
              const logo = getPlatformLogo(name);
              return (
                <span key={name} className="platform-badge">
                  {logo && <img src={logo} alt={name} loading="lazy" />}
                  {name}
                </span>
              );
            })}
            {platformNames.length > 3 && (
              <span className="platform-badge__count">+{platformNames.length - 3}</span>
            )}
          </div>
        </div>

        <div className="voucher-card__footer">
          <span className="voucher-card__cta-text">Check Rates</span>
          <div className="btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--bg-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
    </button>
  );
};

VoucherCard.propTypes = {
  voucher: PropTypes.shape({
    id: PropTypes.string,
    brand: PropTypes.string.isRequired,
    logo: PropTypes.string,
    category: PropTypes.string.isRequired,
    platforms: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      fee: PropTypes.string,
      cap: PropTypes.string,
      link: PropTypes.string,
    })).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

export default VoucherCard;
