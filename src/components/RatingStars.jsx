import React from 'react';
import PropTypes from 'prop-types';

const RatingStars = ({ rating, maxRating = 5, size = 'md', interactive = false, onChange, reviewCount }) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizeMap = {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px'
  };

  const starSize = sizeMap[size] || sizeMap.md;

  const handleClick = (value) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div
      className="rating-stars"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px'
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          gap: '2px',
          cursor: interactive ? 'pointer' : 'default'
        }}
      >
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;
          const isHalfFilled = !isFilled && starValue - 0.5 <= displayRating;

          return (
            <span
              key={index}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              style={{
                fontSize: starSize,
                color: isFilled || isHalfFilled ? '#fbbf24' : 'var(--glass-border)',
                transition: 'color var(--duration-fast)',
                position: 'relative',
                display: 'inline-block',
                lineHeight: 1
              }}
            >
              {isHalfFilled ? '⭐' : isFilled ? '⭐' : '☆'}
            </span>
          );
        })}
      </div>

      {!interactive && rating > 0 && (
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>
          {rating.toFixed(1)}
          {reviewCount !== undefined && <span> ({reviewCount})</span>}
        </span>
      )}
    </div>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  interactive: PropTypes.bool,
  onChange: PropTypes.func,
  reviewCount: PropTypes.number
};

export default RatingStars;
