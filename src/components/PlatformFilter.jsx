import React from 'react';
import { getPlatformLogo } from '../utils/platformLogos';

const PlatformFilter = ({ selectedPlatform, onPlatformSelect, platforms }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
                onClick={() => onPlatformSelect(null)}
                style={{
                    background: !selectedPlatform ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: !selectedPlatform ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid transparent',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    fontWeight: !selectedPlatform ? 600 : 400,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                All Platforms
            </button>
            {platforms.map(platform => {
                const logo = getPlatformLogo(platform);
                return (
                    <button
                        key={platform}
                        onClick={() => onPlatformSelect(platform)}
                        style={{
                            background: selectedPlatform === platform ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                            color: selectedPlatform === platform ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            border: '1px solid transparent',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            fontWeight: selectedPlatform === platform ? 600 : 400,
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        {logo && (
                            <div style={{
                                background: '#fff',
                                borderRadius: '6px',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2px',
                                flexShrink: 0
                            }}>
                                <img src={logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                        )}
                        {platform}
                    </button>
                );
            })}
        </div>
    );
};

export default PlatformFilter;
