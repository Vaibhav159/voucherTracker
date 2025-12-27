import React from 'react';
import { getPlatformStyle } from '../utils/platformLogos';

const PlatformFilter = ({ selectedPlatform, onPlatformSelect, platforms }) => {
    return (
        <div className="platform-grid">
            {/* All Platforms */}
            <button
                onClick={() => onPlatformSelect(null)}
                className={`platform-card ${!selectedPlatform ? 'active' : ''}`}
            >
                <div className="icon-container">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                </div>
                <span>All Platforms</span>
            </button>

            {/* Individual Platforms */}
            {platforms.map(platform => {
                const style = getPlatformStyle(platform);
                return (
                    <button
                        key={platform}
                        onClick={() => onPlatformSelect(platform)}
                        className={`platform-card ${selectedPlatform === platform ? 'active' : ''}`}
                    >
                        {style.logo ? (
                            <div className="icon-container" style={{ background: style.bg, padding: style.padding }}>
                                <img src={style.logo} alt={`${platform} Logo`} />
                            </div>
                        ) : (
                            <div className="icon-container">
                                {/* Default fallback icon if no logo */}
                                <span style={{ fontSize: '10px' }}>{platform.slice(0, 2)}</span>
                            </div>
                        )}
                        <span>{platform}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default PlatformFilter;
