import React from 'react';
import VoucherCard from './VoucherCard';
import EmptyState from './EmptyState';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const VoucherGrid = ({ vouchers, onVoucherClick }) => {
    const [visibleCount, setVisibleCount] = React.useState(12);

    // Reset visible count when vouchers list changes (e.g. filter)
    React.useEffect(() => {
        setVisibleCount(12);
    }, [vouchers]);

    // Use custom intersection observer hook for infinite scroll
    const observerRef = useIntersectionObserver(
        React.useCallback(() => {
            setVisibleCount((prev) => Math.min(prev + 12, vouchers.length));
        }, [vouchers.length]),
        { threshold: 0.1 }
    );

    if (!vouchers || vouchers.length === 0) {
        return (
            <EmptyState
                illustration="search"
                title="No vouchers found"
                description="Try adjusting your search or filters to see results."
            />
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

    const visibleVouchers = vouchers.slice(0, visibleCount);

    return (
        <>
            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="stat-item">
                    <span className="stat-icon">🎫</span>
                    <div>
                        <div className="stat-value text-cyan">{stats.total}</div>
                        <div className="stat-label">Vouchers</div>
                    </div>
                </div>
                <div className="stat-item">
                    <span className="stat-icon">🏪</span>
                    <div>
                        <div className="stat-value text-pink">{stats.platforms}</div>
                        <div className="stat-label">Platforms</div>
                    </div>
                </div>
                {stats.maxDiscount > 0 && (
                    <div className="stat-item">
                        <span className="stat-icon">🔥</span>
                        <div>
                            <div className="stat-value text-success">{stats.maxDiscount}%</div>
                            <div className="stat-label">Max Discount</div>
                        </div>
                    </div>
                )}
            </div>

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
                        className="loading-more"
                    >
                        Loading more...
                    </div>
                )
            }
        </>
    );
};

export default VoucherGrid;
