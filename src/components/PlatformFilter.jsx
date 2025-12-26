import React from 'react';
import { getPlatformStyle } from '../utils/platformLogos';

const PlatformFilter = ({ selectedPlatform, onPlatformSelect, platforms }) => {
    const baseCardClass = "group relative flex flex-col items-center justify-center gap-2 p-[12px_6px] bg-item-bg border border-item-border rounded-xl text-text-secondary cursor-pointer w-full text-center font-sans text-[0.85rem] font-normal transition-all duration-200 hover:bg-nav-bg-hover hover:border-white/20 hover:-translate-y-0.5 hover:text-text-primary hover:shadow-lg overflow-hidden min-w-0";
    const activeCardClass = "bg-gradient-to-br from-cyan-500/15 to-cyan-500/5 border-accent-cyan text-accent-cyan font-semibold shadow-[0_0_15px_rgba(0,240,255,0.15)]";

    // Icon container classes
    const baseIconClass = "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/5 border border-white/10 p-1 transition-all duration-200 group-hover:bg-white/10 group-hover:border-white/30";
    const activeIconClass = "border-accent-cyan bg-cyan-500/20";

    return (
        <div className="grid grid-cols-2 gap-[10px]">
            {/* All Platforms */}
            <button
                onClick={() => onPlatformSelect(null)}
                className={`${baseCardClass} col-span-full flex-row justify-start text-left gap-3 px-[14px] py-[10px] ${!selectedPlatform ? activeCardClass : ''}`}
            >
                <div className={`${baseIconClass} ${!selectedPlatform ? activeIconClass : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                </div>
                <span className="truncate w-full p-0">All Platforms</span>
            </button>

            {/* Individual Platforms */}
            {platforms.map(platform => {
                const style = getPlatformStyle(platform);
                const isActive = selectedPlatform === platform;
                return (
                    <button
                        key={platform}
                        onClick={() => onPlatformSelect(platform)}
                        className={`${baseCardClass} ${isActive ? activeCardClass : ''}`}
                    >
                        {style.logo ? (
                            <div
                                className={`${baseIconClass} ${isActive ? activeIconClass : ''}`}
                                style={style.bg ? { background: style.bg, padding: style.padding } : {}}
                            >
                                <img src={style.logo} alt={`${platform} Logo`} className="w-full h-full object-contain" />
                            </div>
                        ) : (
                            <div className={`${baseIconClass} ${isActive ? activeIconClass : ''}`}>
                                {/* Default fallback icon if no logo */}
                                <span style={{ fontSize: '10px' }}>{platform.slice(0, 2)}</span>
                            </div>
                        )}
                        <span className="truncate w-full px-1">{platform}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default PlatformFilter;
