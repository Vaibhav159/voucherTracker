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

    const visibleVouchers = vouchers.slice(0, visibleCount);

    return (
        <>
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
