/**
 * Skeleton Components - Base styles and reusable skeleton elements
 * Features shimmer animation for loading states
 */

import './Skeleton.css';

// Base skeleton block with shimmer animation
export const SkeletonBlock = ({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) => (
    <div
        className={`skeleton-block ${className}`}
        style={{ width, height, borderRadius }}
    />
);

// Skeleton for text lines
export const SkeletonText = ({ lines = 3, lastLineWidth = '60%' }) => (
    <div className="skeleton-text">
        {Array.from({ length: lines }).map((_, i) => (
            <SkeletonBlock
                key={i}
                height="12px"
                width={i === lines - 1 ? lastLineWidth : '100%'}
            />
        ))}
    </div>
);

// Voucher Card Skeleton
export const VoucherCardSkeleton = () => (
    <div className="skeleton-voucher-card glass-panel">
        <div className="skeleton-voucher-header">
            <SkeletonBlock width="50px" height="50px" borderRadius="12px" />
            <div className="skeleton-voucher-title">
                <SkeletonBlock width="120px" height="16px" />
                <SkeletonBlock width="80px" height="12px" />
            </div>
        </div>
        <div className="skeleton-voucher-body">
            <SkeletonBlock width="100%" height="40px" borderRadius="8px" />
        </div>
        <div className="skeleton-voucher-platforms">
            <SkeletonBlock width="60px" height="24px" borderRadius="12px" />
            <SkeletonBlock width="70px" height="24px" borderRadius="12px" />
            <SkeletonBlock width="50px" height="24px" borderRadius="12px" />
        </div>
    </div>
);

// Credit Card Skeleton
export const CreditCardSkeleton = () => (
    <div className="skeleton-credit-card glass-panel">
        <SkeletonBlock width="100%" height="120px" borderRadius="12px" className="skeleton-card-image" />
        <div className="skeleton-card-info">
            <SkeletonBlock width="80%" height="18px" />
            <SkeletonBlock width="60%" height="14px" />
        </div>
        <div className="skeleton-card-meta">
            <SkeletonBlock width="40%" height="12px" />
            <SkeletonBlock width="35%" height="12px" />
        </div>
        <div className="skeleton-card-footer">
            <SkeletonBlock width="100%" height="36px" borderRadius="8px" />
        </div>
    </div>
);

// Banking Tier Card Skeleton
export const TierCardSkeleton = () => (
    <div className="skeleton-tier-card glass-panel">
        <div className="skeleton-tier-header">
            <SkeletonBlock width="60%" height="20px" />
            <SkeletonBlock width="40%" height="14px" />
        </div>
        <div className="skeleton-tier-tags">
            <SkeletonBlock width="50px" height="22px" borderRadius="10px" />
            <SkeletonBlock width="70px" height="22px" borderRadius="10px" />
            <SkeletonBlock width="60px" height="22px" borderRadius="10px" />
        </div>
        <div className="skeleton-tier-benefits">
            <SkeletonText lines={4} />
        </div>
        <div className="skeleton-tier-footer">
            <SkeletonBlock width="100%" height="36px" borderRadius="8px" />
        </div>
    </div>
);

// Voucher Grid Skeleton (multiple voucher cards)
export const VoucherGridSkeleton = ({ count = 6 }) => (
    <div className="skeleton-voucher-grid">
        {Array.from({ length: count }).map((_, i) => (
            <VoucherCardSkeleton key={i} />
        ))}
    </div>
);

// Card Grid Skeleton (multiple credit cards)
export const CardGridSkeleton = ({ count = 6 }) => (
    <div className="skeleton-card-grid">
        {Array.from({ length: count }).map((_, i) => (
            <CreditCardSkeleton key={i} />
        ))}
    </div>
);

// Tier Grid Skeleton (multiple banking tiers)
export const TierGridSkeleton = ({ count = 6 }) => (
    <div className="skeleton-tier-grid">
        {Array.from({ length: count }).map((_, i) => (
            <TierCardSkeleton key={i} />
        ))}
    </div>
);

export default {
    SkeletonBlock,
    SkeletonText,
    VoucherCardSkeleton,
    CreditCardSkeleton,
    TierCardSkeleton,
    VoucherGridSkeleton,
    CardGridSkeleton,
    TierGridSkeleton
};
