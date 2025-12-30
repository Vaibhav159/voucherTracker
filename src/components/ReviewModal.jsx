import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RatingStars from './RatingStars';
import { useModalKeyHandler } from '../hooks/useModalKeyHandler';

const ReviewModal = ({ voucher, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('General');

  useModalKeyHandler(true, onClose);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    const review = {
      rating,
      comment: comment.trim(),
      userName: userName.trim() || 'Anonymous',
      platform: selectedPlatform
    };

    onSubmit(review);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header__info">
            <h2 className="modal-header__title">Write a Review</h2>
            <span className="modal-header__meta">
              for <strong>{voucher.brand}</strong>
            </span>
          </div>
          <button onClick={onClose} className="btn-close">×</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label required">Your Rating</label>
              <div style={{ marginTop: '8px' }}>
                <RatingStars
                  rating={rating}
                  size="xl"
                  interactive
                  onChange={setRating}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="platform-select" className="form-label">Platform Used</label>
              <select
                id="platform-select"
                className="sort-dropdown"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="General">General</option>
                {voucher.platforms.map((platform, idx) => (
                  <option key={idx} value={platform.name}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="user-name" className="form-label">Your Name (Optional)</label>
              <input
                id="user-name"
                type="text"
                placeholder="Anonymous"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={50}
              />
            </div>

            <div className="form-group">
              <label htmlFor="review-comment" className="form-label">Your Review</label>
              <textarea
                id="review-comment"
                placeholder="Share your experience with this voucher..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                maxLength={500}
                style={{ width: '100%' }}
              />
              <div className="form-help">
                {comment.length}/500 characters
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={rating === 0}
                style={{
                  opacity: rating === 0 ? 0.5 : 1,
                  cursor: rating === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ReviewModal.propTypes = {
  voucher: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ReviewModal;
