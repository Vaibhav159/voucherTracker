import React from 'react';
import './skeletons.css';

const VoucherCardSkeleton = () => {
  return (
    <div className="glass-panel voucher-card skeleton-card">
      <div className="voucher-card__header">
        <div className="voucher-card__logo skeleton">
          <div className="skeleton-box" style={{ width: '100%', height: '100%', borderRadius: '12px' }}></div>
        </div>
        <div className="voucher-card__info" style={{ flex: 1 }}>
          <div className="skeleton-box" style={{ width: '70%', height: '24px', marginBottom: '8px', borderRadius: '8px' }}></div>
          <div className="skeleton-box" style={{ width: '40%', height: '20px', borderRadius: '20px' }}></div>
        </div>
      </div>

      <div className="voucher-card__body">
        <div className="voucher-card__platforms-section">
          <div className="skeleton-box" style={{ width: '80px', height: '14px', marginBottom: '8px', borderRadius: '4px' }}></div>
          <div className="voucher-card__platforms-list">
            <div className="skeleton-box" style={{ width: '90px', height: '28px', borderRadius: '8px' }}></div>
            <div className="skeleton-box" style={{ width: '80px', height: '28px', borderRadius: '8px' }}></div>
            <div className="skeleton-box" style={{ width: '85px', height: '28px', borderRadius: '8px' }}></div>
          </div>
        </div>

        <div className="voucher-card__footer">
          <div className="skeleton-box" style={{ width: '90px', height: '18px', borderRadius: '4px' }}></div>
          <div className="skeleton-box" style={{ width: '32px', height: '32px', borderRadius: '50%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default VoucherCardSkeleton;
