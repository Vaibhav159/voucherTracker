import React from 'react';
import { getPlatformLogo } from '../utils/platformLogos';

const VoucherCard = ({ voucher, onClick }) => {
  const platformNames = voucher.platforms.map(p => p.name);

  return (
    <div
      onClick={() => onClick && onClick(voucher)}
      className="glass-panel voucher-card"
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '2rem', gap: '18px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: '#fff',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={voucher.logo}
            alt={voucher.brand}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${voucher.brand}&background=random` }}
          />
        </div>
        <div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.5px' }}>{voucher.brand}</h3>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--accent-cyan)',
            background: 'rgba(0, 240, 255, 0.1)',
            padding: '4px 10px',
            borderRadius: '20px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {voucher.category}
          </span>
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ marginBottom: '1.2rem' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Available on</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {platformNames.slice(0, 3).map(name => {
              const logo = getPlatformLogo(name);
              return (
                <span
                  key={name}
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {logo && <img src={logo} alt="" style={{ height: '12px', width: 'auto', objectFit: 'contain' }} />}
                  {name}
                </span>
              );
            })}
            {platformNames.length > 3 && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '6px' }}>+{platformNames.length - 3}</span>
            )}
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1rem'
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Check Rates</span>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
