import React, { useEffect } from 'react';
import { getPlatformStyle } from '../utils/platformLogos';
import { Link } from 'react-router-dom';

const VoucherModal = ({ voucher, onClose, selectedPlatform }) => {
    if (!voucher) return null;

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    // Helper to parse discount value
    const parseDiscount = (fee) => {
        if (!fee) return 0;
        const match = fee.match(/(\d+(\.\d+)?)%/);
        if (match && (fee.toLowerCase().includes('discount') || fee.toLowerCase().includes('save'))) {
            return parseFloat(match[1]);
        }
        return 0;
    };

    // Calculate best platform ID/Index
    const bestPlatformIndex = React.useMemo(() => {
        let maxDiscount = -1;
        let bestIdx = -1;

        voucher.platforms.forEach((p, idx) => {
            const discount = parseDiscount(p.fee);
            if (discount > maxDiscount) {
                maxDiscount = discount;
                bestIdx = idx;
            }
        });

        // Only highlight if there is actually a discount > 0
        return maxDiscount > 0 ? bestIdx : -1;
    }, [voucher]);

    const getRewardText = (fee) => {
        if (fee.toLowerCase().includes('discount')) {
            return { label: 'Savings', value: fee.replace('Discount', '').trim() };
        }
        if (fee === 'None') {
            return { label: 'Fees', value: '0%' };
        }
        return { label: 'Fees', value: fee };
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflowY: 'auto'
        }} onClick={onClose}>
            <div
                className="glass-panel"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    position: 'relative',
                    background: 'var(--modal-bg)',
                    border: '1px solid var(--modal-border)',
                    margin: 'auto'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '1.25rem 1.5rem',
                    borderBottom: '1px solid var(--modal-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'sticky',
                    top: 0,
                    background: 'var(--modal-bg)',
                    zIndex: 10
                }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: '#fff',
                        borderRadius: '12px',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <img
                            src={voucher.logo}
                            alt={voucher.brand}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{voucher.brand}</h2>
                        <span style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '2px'
                        }}>
                            <span style={{ background: 'var(--tag-bg)', padding: '2px 8px', borderRadius: '4px' }}>{voucher.category}</span>
                        </span>
                    </div>
                    {voucher.site && (
                        <a
                            href={voucher.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="launch-site-btn"
                        >
                            <span className="btn-text-desktop">Launch Site</span>
                            <span className="btn-text-mobile">Site</span>
                            <span className="btn-icon">↗</span>
                        </a>
                    )}
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: '4px'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 600 }}>AVAILABLE OFFERS</span>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {voucher.platforms.map((platform, idx) => {
                            const { label, value } = getRewardText(platform.fee);
                            const style = getPlatformStyle(platform.name);

                            const isBest = idx === bestPlatformIndex;
                            const isSelected = selectedPlatform === platform.name;

                            return (
                                <div key={idx} style={{
                                    border: isBest ? '1px solid var(--color-success)' : (isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--item-border)'),
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    background: isSelected ? 'var(--accent-cyan-dim)' : 'var(--item-bg)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    position: 'relative',
                                    boxShadow: isBest ? '0 0 0 1px var(--color-success)' : 'none'
                                }}>
                                    {isBest && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-10px',
                                            right: '1rem',
                                            background: 'var(--color-success)',
                                            color: 'var(--text-on-success)',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}>
                                            BEST RATE
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {/* Platform Logo */}
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            background: style.bg,
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            padding: style.padding,
                                            overflow: 'hidden'
                                        }}>
                                            {style.logo ? (
                                                <img src={style.logo} alt={platform.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            ) : (
                                                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '1.2rem' }}>{platform.name[0]}</span>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '2px' }}>{label}</div>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: label === 'Savings' ? '#4ade80' : 'inherit' }}>{value}</div>
                                            </div>
                                            <div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '2px' }}>Monthly Cap</div>
                                                <div style={{ fontSize: '1rem', fontWeight: 500 }}>{platform.cap}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Denominations & Button */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                            {platform.denominations.slice(0, 4).map(d => (
                                                <span key={d} style={{
                                                    background: 'var(--tag-bg)',
                                                    border: '1px solid var(--item-border)',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                    ₹{d}
                                                </span>
                                            ))}
                                            {platform.denominations.length > 4 && <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', alignSelf: 'center' }}>+more</span>}
                                        </div>

                                        <a
                                            href={platform.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary"
                                            style={{
                                                padding: '8px 16px',
                                                fontSize: '0.85rem',
                                                background: 'var(--btn-secondary-bg)',
                                                border: '1px solid var(--item-border)',
                                                boxShadow: 'none',
                                                color: 'var(--btn-secondary-text)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                marginLeft: 'auto',
                                                transition: 'all 0.2s',
                                                textDecoration: 'none'
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = 'var(--btn-secondary-hover-bg)';
                                                e.currentTarget.style.color = 'var(--btn-secondary-hover-text)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = 'var(--btn-secondary-bg)';
                                                e.currentTarget.style.color = 'var(--btn-secondary-text)';
                                            }}
                                        >
                                            Buy on {platform.name} ↗
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Did you know section */}
                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#F0F9FF', borderRadius: '12px', color: '#0C4A6E' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ fontSize: '1rem' }}>💡</span>
                            <div>
                                <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem' }}>Did you know?</h4>
                                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9, lineHeight: '1.4' }}>
                                    Buying vouchers often stacks with credit card rewards. Check your card's specific multiplier for 'Gift Card' purchases before buying.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoucherModal;
