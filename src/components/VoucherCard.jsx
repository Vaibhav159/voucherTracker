import React from 'react';
import PropTypes from 'prop-types';
import { getPlatformLogo } from '../utils/platformLogos';
import ExpiryBadge from './ExpiryBadge';
import RatingStars from './RatingStars';
import { useReviews } from '../hooks/useReviews';
import { useFavorites } from '../context/FavoritesContext';

const VoucherCard = ({ voucher, onClick, index = 0 }) => {
  const platformNames = voucher.platforms.map(p => p.name);
  const { averageRating, reviewCount } = useReviews(voucher.id);
  const { toggleFavoriteVoucher, isVoucherFavorite } = useFavorites();
  const isFavorite = isVoucherFavorite(voucher.id);

  // Calculate max discount from platform fees
  const maxDiscount = React.useMemo(() => {
    let max = 0;
    voucher.platforms.forEach(p => {
      const fee = p.fee || '';
      const match = fee.match(/(\d+(?:\.\d+)?)\s*%/);
      if (match) {
        const discount = parseFloat(match[1]);
        if (discount > max) max = discount;
      }
    });
    return Math.round(max);
  }, [voucher.platforms]);

  // Staggered animation delay (max 0.5s)
  const animationDelay = Math.min(index * 0.03, 0.5);

  return (
    <button
      onClick={() => onClick && onClick(voucher)}
      className="glass-panel voucher-card"
      aria-label={`View details for ${voucher.brand} in ${voucher.category} category. Available on ${platformNames.length} platform${platformNames.length > 1 ? 's' : ''}`}
      data-tour={index === 0 ? "voucher-card" : undefined}
      style={{
        position: 'relative',
        animationDelay: `${animationDelay}s`
      }}
    >
      {/* Favorite Toggle Button */}
      <span
        onClick={(e) => {
          e.stopPropagation();
          toggleFavoriteVoucher(voucher.id);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
            toggleFavoriteVoucher(voucher.id);
          }
        }}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          background: isFavorite ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          border: isFavorite ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--glass-border)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '0.9rem',
          zIndex: 5
        }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </span>

      {/* Discount Badge */}
      {maxDiscount > 0 && (
        <span
          className="voucher-discount-badge"
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '4px 8px',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)',
            zIndex: 5
          }}
        >
          {maxDiscount}% OFF
        </span>
      )}

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
  index: PropTypes.number,
};

export default VoucherCard;
