import React from 'react';
import VoucherCard from './VoucherCard';

const VoucherGrid = ({ vouchers, onVoucherClick }) => {
    const [visibleCount, setVisibleCount] = React.useState(12);
    const observerRef = React.useRef();

    // Reset visible count when vouchers list changes (e.g. filter)
    React.useEffect(() => {
        setVisibleCount(12);
    }, [vouchers]);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + 12, vouchers.length));
                }
            },
            { threshold: 0.1 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.disconnect();
            }
        };
    }, [vouchers.length]);

    // Calculate discount for a voucher
    const getDiscount = (voucher) => {
        let maxDisc = 0;
        voucher.platforms?.forEach(p => {
            const fee = p.fee || '';
            const match = fee.match(/(\d+(\.\d+)?)%/);
            if (match && (fee.toLowerCase().includes('discount') || fee.toLowerCase().includes('save') || fee.toLowerCase().includes('off'))) {
                maxDisc = Math.max(maxDisc, parseFloat(match[1]));
            }
        });
        return maxDisc;
    };

    // Get top deals with best discounts
    const topDeals = React.useMemo(() => {
        return [...vouchers]
            .map(v => ({ ...v, discount: getDiscount(v) }))
            .filter(v => v.discount > 0)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, 4);
    }, [vouchers]);

    // Calculate stats
    const stats = React.useMemo(() => ({
        total: vouchers.length,
        platforms: new Set(vouchers.flatMap(v => v.platforms?.map(p => p.name) || [])).size,
        maxDiscount: Math.max(...vouchers.map(v => getDiscount(v)), 0)
    }), [vouchers]);

    if (!vouchers || vouchers.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                <h3>No vouchers found matching your search.</h3>
                <p>Try a different keyword or check back later.</p>
            </div>
        );
    }

    const visibleVouchers = vouchers.slice(0, visibleCount);

    return (
        <>
            {/* Stats Bar */}
            <div style={{
                display: 'flex',
                gap: '1.5rem',
                marginBottom: '1.5rem',
                padding: '1rem 1.5rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>🎫</span>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>{stats.total}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Vouchers</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>🏪</span>
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a78bfa' }}>{stats.platforms}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Platforms</div>
                    </div>
                </div>
                {stats.maxDiscount > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.5rem' }}>🔥</span>
                        <div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#4ade80' }}>{stats.maxDiscount}%</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Max Discount</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Top Deals Section */}
            {topDeals.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                        margin: '0 0 1rem 0',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--text-primary)'
                    }}>
                        <span style={{ color: '#fbbf24' }}>⚡</span> Top Deals Today
                    </h3>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        overflowX: 'auto',
                        paddingBottom: '0.5rem',
                        width: '100%',
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE/Edge
                        WebkitOverflowScrolling: 'touch'
                    }} className="hide-scrollbar">
                        <style>
                            {`
                                .hide-scrollbar::-webkit-scrollbar {
                                    display: none;
                                }
                            `}
                        </style>
                        {topDeals.map(voucher => (
                            <div
                                key={voucher.id}
                                onClick={() => onVoucherClick(voucher)}
                                style={{
                                    minWidth: '200px',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                                    border: '1px solid rgba(251, 191, 36, 0.2)',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{voucher.icon || '🎁'}</span>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{voucher.brand}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{voucher.category}</div>
                                    </div>
                                </div>
                                <div style={{
                                    display: 'inline-block',
                                    background: '#22c55e',
                                    color: '#000',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    fontWeight: '700'
                                }}>
                                    {voucher.discount}% OFF
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Grid */}
            <div className="voucher-grid">
                {visibleVouchers.map(voucher => (
                    <VoucherCard
                        key={voucher.id}
                        voucher={voucher}
                        onClick={onVoucherClick}
                    />
                ))}
            </div>

            {/* Sentinel element for infinite scroll */}
            {visibleCount < vouchers.length && (
                <div
                    ref={observerRef}
                    style={{
                        height: '50px',
                        margin: '2rem 0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'var(--text-secondary)'
                    }}
                >
                    Loading more...
                </div>
            )}
        </>
    );
};

export default VoucherGrid;
