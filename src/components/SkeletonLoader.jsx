import './SkeletonLoader.css';

// Base skeleton component with shimmer animation
export const Skeleton = ({ width, height, borderRadius = '8px', className = '' }) => (
    <div
        className={`skeleton ${className}`}
        style={{ width, height, borderRadius }}
    />
);

// Card skeleton for credit card grid
export const CardSkeleton = () => (
    <div className="skeleton-card glass-panel">
        <div className="skeleton-card-image">
            <Skeleton width="100%" height="120px" borderRadius="12px" />
        </div>
        <Skeleton width="70%" height="20px" className="skeleton-title" />
        <Skeleton width="50%" height="14px" className="skeleton-subtitle" />
        <div className="skeleton-tags">
            <Skeleton width="60px" height="24px" borderRadius="6px" />
            <Skeleton width="80px" height="24px" borderRadius="6px" />
        </div>
        <div className="skeleton-stats">
            <Skeleton width="45%" height="40px" borderRadius="8px" />
            <Skeleton width="45%" height="40px" borderRadius="8px" />
        </div>
    </div>
);

// Voucher skeleton for voucher grid
export const VoucherSkeleton = () => (
    <div className="skeleton-voucher glass-panel">
        <div className="skeleton-voucher-header">
            <Skeleton width="50px" height="50px" borderRadius="12px" />
            <div className="skeleton-voucher-info">
                <Skeleton width="120px" height="18px" />
                <Skeleton width="80px" height="14px" />
            </div>
        </div>
        <div className="skeleton-voucher-platforms">
            <Skeleton width="100%" height="60px" borderRadius="8px" />
        </div>
    </div>
);

// Banking tier skeleton
export const TierSkeleton = () => (
    <div className="skeleton-tier glass-panel">
        <Skeleton width="60px" height="60px" borderRadius="16px" />
        <Skeleton width="80%" height="20px" className="skeleton-title" />
        <Skeleton width="60%" height="14px" className="skeleton-subtitle" />
        <Skeleton width="100%" height="60px" borderRadius="10px" />
        <div className="skeleton-benefits">
            <Skeleton width="30%" height="24px" borderRadius="6px" />
            <Skeleton width="35%" height="24px" borderRadius="6px" />
            <Skeleton width="25%" height="24px" borderRadius="6px" />
        </div>
    </div>
);

// Grid skeleton containers
export const CardGridSkeleton = ({ count = 6 }) => (
    <div className="skeleton-grid skeleton-grid-cards">
        {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
);

export const VoucherGridSkeleton = ({ count = 8 }) => (
    <div className="skeleton-grid skeleton-grid-vouchers">
        {Array.from({ length: count }).map((_, i) => (
            <VoucherSkeleton key={i} />
        ))}
    </div>
);

export const TierGridSkeleton = ({ count = 4 }) => (
    <div className="skeleton-grid skeleton-grid-tiers">
        {Array.from({ length: count }).map((_, i) => (
            <TierSkeleton key={i} />
        ))}
    </div>
);

export default {
    Skeleton,
    CardSkeleton,
    VoucherSkeleton,
    TierSkeleton,
    CardGridSkeleton,
    VoucherGridSkeleton,
    TierGridSkeleton
};
