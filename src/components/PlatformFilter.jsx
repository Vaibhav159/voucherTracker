import React from 'react';
import { getPlatformStyle } from '../utils/platformLogos';

const PlatformFilter = ({ selectedPlatform, onPlatformSelect, platforms }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
                onClick={() => onPlatformSelect(null)}
                style={{
                    background: !selectedPlatform ? 'var(--nav-bg-active)' : 'transparent',
                    color: !selectedPlatform ? 'var(--nav-text-hover)' : 'var(--nav-text)',
                    border: '1px solid transparent',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    fontWeight: !selectedPlatform ? 600 : 400,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%'
                }}
            >
                All Platforms
            </button>
            {platforms.map(platform => {
                const style = getPlatformStyle(platform);
                return (
                    <button
                        key={platform}
                        onClick={() => onPlatformSelect(platform)}
                        style={{
                            background: selectedPlatform === platform ? 'var(--nav-bg-active)' : 'transparent',
                            color: selectedPlatform === platform ? 'var(--accent-cyan)' : 'var(--nav-text)',
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
                            justifyContent: 'flex-start', // Ensure left align
                            gap: '12px',
                            boxShadow: selectedPlatform === platform ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                            width: '100%'
                        }}
                    >
                        {style.logo && (
                            <div style={{
                                background: style.bg,
                                borderRadius: '8px', // Slightly more rounded
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: style.padding,
                                flexShrink: 0,
                                overflow: 'hidden' // Ensure content stays inside
                            }}>
                                <img src={style.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
