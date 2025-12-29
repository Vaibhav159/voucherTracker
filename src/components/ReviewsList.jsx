import React from 'react';
import PropTypes from 'prop-types';
import RatingStars from './RatingStars';

const ReviewsList = ({ reviews, onMarkHelpful }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        background: 'var(--glass-bg)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)'
      }}>
        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>💬</span>
        No reviews yet. Be the first to review!
      </div>
    );
  }

  // Sort reviews by date (newest first)
  const sortedReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="reviews-list" style={{ display: 'grid', gap: '1rem' }}>
      {sortedReviews.map((review) => (
        <div
          key={review.id}
          className="review-item"
          style={{
            background: 'var(--item-bg)',
            border: '1px solid var(--item-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-md)'
          }}
        >
          {/* Review Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {review.userName || 'Anonymous'}
                </span>
                {review.platform && review.platform !== 'General' && (
                  <span style={{
                    fontSize: '0.7rem',
                    background: 'var(--tag-bg)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-secondary)'
                  }}>
                    {review.platform}
                  </span>
                )}
              </div>
              <RatingStars rating={review.rating} size="sm" />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {formatDate(review.date)}
            </span>
          </div>

          {/* Review Comment */}
          {review.comment && (
            <p style={{
              margin: '0 0 12px 0',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              fontSize: '0.9rem'
            }}>
              {review.comment}
            </p>
          )}

          {/* Review Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px', borderTop: '1px solid var(--glass-border)' }}>
            <button
              onClick={() => onMarkHelpful && onMarkHelpful(review.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: 'var(--radius-xs)',
                transition: 'all var(--duration-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--glass-bg)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              👍 Helpful {review.helpful > 0 && `(${review.helpful})`}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string,
    userName: PropTypes.string,
    platform: PropTypes.string,
    date: PropTypes.string.isRequired,
    helpful: PropTypes.number
  })),
  onMarkHelpful: PropTypes.func
};

export default ReviewsList;
