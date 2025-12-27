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

    if (!vouchers || vouchers.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                <h3>No vouchers found matching your search.</h3>
                <p>Try a different keyword or check back later.</p>
            </div>
        );
    }


    const stats = React.useMemo(() => {
        if (!vouchers) return { total: 0, platforms: 0, maxDiscount: 0 };
        const uniqueBrands = new Set(vouchers.map(v => v.brand)).size;
        const maxDisc = Math.max(...vouchers.map(v => v.discount || 0), 0);
        return {
            total: vouchers.length,
            platforms: uniqueBrands,
            maxDiscount: maxDisc
        };
    }, [vouchers]);

    const topDeals = React.useMemo(() => {
        if (!vouchers) return [];
        return [...vouchers]
            .sort((a, b) => (b.discount || 0) - (a.discount || 0))
            .slice(0, 10);
    }, [vouchers]);

    const visibleVouchers = vouchers.slice(0, visibleCount);

    return (
        <>
            {/* Stats Bar */}
            <div className="stats-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>🎫</span>
                    <div>
                        <div className="stat-value" style={{ color: 'var(--accent-cyan)' }}>{stats.total}</div>
                        <div className="stat-label">Vouchers</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>🏪</span>
                    <div>
                        <div className="stat-value" style={{ color: '#a78bfa' }}>{stats.platforms}</div>
                        <div className="stat-label">Platforms</div>
                    </div>
                </div>
                {stats.maxDiscount > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.5rem' }}>🔥</span>
                        <div>
                            <div className="stat-value" style={{ color: '#4ade80' }}>{stats.maxDiscount}%</div>
                            <div className="stat-label">Max Discount</div>
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
                    <div className="top-deals-container">
                        {topDeals.map(voucher => (
                            <div
                                key={voucher.id}
                                onClick={() => onVoucherClick(voucher)}
                                className="top-deal-card"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{voucher.icon || '🎁'}</span>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{voucher.brand}</div>
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
            {
                visibleCount < vouchers.length && (
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
                )
            }
        </>
    );
};

export default VoucherGrid;
