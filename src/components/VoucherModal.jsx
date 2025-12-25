import React, { useEffect } from 'react';
import { getPlatformLogo } from '../utils/platformLogos';
import { Link } from 'react-router-dom';

const VoucherModal = ({ voucher, onClose }) => {
    if (!voucher) return null;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

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
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }} onClick={onClose}>
            <div
                className="glass-panel"
                style={{
                    width: '100%',
                    maxWidth: '650px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    background: '#0a0a0a', // Slightly opaque background for modal
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    position: 'sticky',
                    top: 0,
                    background: '#0a0a0a',
                    zIndex: 10
                }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '8px',
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
                        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{voucher.brand}</h2>
                        <span style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '4px'
                        }}>
                            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>{voucher.category}</span>
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: '8px'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '1px', fontWeight: 600 }}>AVAILABLE OFFERS</span>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {voucher.platforms.map((platform, idx) => {
                            const { label, value } = getRewardText(platform.fee);
                            const logo = getPlatformLogo(platform.name);

                            return (
                                <div key={idx} style={{
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem'
                                }}>
                                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                                        {/* Platform Logo */}
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            background: '#fff',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                            padding: '4px'
                                        }}>
                                            {logo ? (
                                                <img src={logo} alt={platform.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                            ) : (
                                                <span style={{ color: '#000', fontWeight: 'bold', fontSize: '1.2rem' }}>{platform.name[0]}</span>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px' }}>{label}</div>
                                                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: label === 'Savings' ? '#4ade80' : 'inherit' }}>{value}</div>
                                            </div>
                                            <div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px' }}>Monthly Cap</div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{platform.cap}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Denominations & Button */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {platform.denominations.slice(0, 4).map(d => (
                                                <span key={d} style={{
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid rgba(255,255,255,0.05)',
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.8rem',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                    ₹{d}
                                                </span>
                                            ))}
                                            {platform.denominations.length > 4 && <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', alignSelf: 'center' }}>+more</span>}
                                        </div>

                                        <a
                                            href={platform.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary"
                                            style={{
                                                padding: '10px 20px',
                                                fontSize: '0.9rem',
                                                background: 'rgba(255,255,255,0.1)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                boxShadow: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginLeft: 'auto'
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = 'var(--text-primary)';
                                                e.currentTarget.style.color = '#000';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                                e.currentTarget.style.color = '#fff';
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
                    <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: '#F0F9FF', borderRadius: '16px', borderRadius: '16px', color: '#0C4A6E' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span style={{ fontSize: '1.2rem' }}>💡</span>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>Did you know?</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9, lineHeight: '1.5' }}>
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
