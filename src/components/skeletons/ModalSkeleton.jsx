import React from 'react';
import './skeletons.css';

const ModalSkeleton = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-container glass-panel">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header__logo skeleton">
            <div className="skeleton-box" style={{ width: '100%', height: '100%', borderRadius: '12px' }}></div>
          </div>
          <div className="modal-header__info" style={{ flex: 1 }}>
            <div className="skeleton-box" style={{ width: '60%', height: '28px', marginBottom: '6px', borderRadius: '8px' }}></div>
            <div className="skeleton-box" style={{ width: '30%', height: '18px', borderRadius: '4px' }}></div>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="skeleton-box" style={{ width: '150px', height: '16px', marginBottom: '1rem', borderRadius: '4px' }}></div>

          <div className="modal-content">
            {[1, 2, 3].map((i) => (
              <div key={i} className="platform-offer skeleton-card">
                <div className="platform-offer__header">
                  <div className="skeleton-box" style={{ width: '48px', height: '48px', borderRadius: '10px' }}></div>
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div className="skeleton-box" style={{ width: '60px', height: '14px', marginBottom: '4px', borderRadius: '4px' }}></div>
                      <div className="skeleton-box" style={{ width: '80px', height: '24px', borderRadius: '4px' }}></div>
                    </div>
                    <div>
                      <div className="skeleton-box" style={{ width: '80px', height: '14px', marginBottom: '4px', borderRadius: '4px' }}></div>
                      <div className="skeleton-box" style={{ width: '70px', height: '20px', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                </div>
                <div className="platform-offer__footer">
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="skeleton-box" style={{ width: '45px', height: '24px', borderRadius: '4px' }}></div>
                    ))}
                  </div>
                  <div className="skeleton-box" style={{ width: '120px', height: '32px', borderRadius: '8px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSkeleton;
