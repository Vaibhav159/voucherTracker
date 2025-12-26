import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { vouchers } from '../data/vouchers';
import { getPlatformLogo } from '../utils/platformLogos';

const VoucherDetail = () => {
    const { id } = useParams();

    const voucher = useMemo(() => {
        return vouchers.find(v => v.id === id);
    }, [id]);

    if (!voucher) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Voucher not found</h2>
                <Link to="/" className="btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '1000px' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '2rem' }}>
                ← Back to Vouchers
            </Link>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ width: '100px', height: '100px', background: '#fff', borderRadius: '20px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={voucher.logo} alt={voucher.brand} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                    <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>{voucher.brand}</h1>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '20px' }}>{voucher.category}</span>
                </div>
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Available Platforms</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {voucher.platforms.map((platform, idx) => (
                    <div key={idx} className="glass-panel" style={{ padding: '0', overflow: 'hidden', borderTop: `4px solid ${platform.color || '#8b5cf6'}` }}>
                        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                                    {getPlatformLogo(platform.name) && (
                                        <div style={{
                                            background: '#fff',
                                            borderRadius: '6px',
                                            padding: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '36px',
                                            width: '36px',
                                            minWidth: '36px',
                                            flexShrink: 0
                                        }}>
                                            <img src={getPlatformLogo(platform.name)} alt={platform.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                                        </div>
                                    )}
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{platform.name}</h3>
                                </div>
                                <a
                                    href={platform.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{ padding: '8px 16px', fontSize: '0.9rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                                >
                                    Buy Now ↗
                                </a>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Monthly Cap</span>
                                <span style={{ fontWeight: 500 }}>{platform.cap}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Fees / Discount</span>
                                <span style={{ fontWeight: 500, color: platform.fee.includes('Discount') ? '#4ade80' : platform.fee === 'None' ? 'inherit' : '#f87171' }}>
                                    {platform.fee}
                                </span>
                            </div>
                            <div>
                                <span style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Denominations</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {platform.denominations.map(d => (
                                        <span key={d} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>₹{d}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default VoucherDetail;
