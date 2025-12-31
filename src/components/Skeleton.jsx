/**
 * Skeleton Loading Components
 * 
 * Content-aware skeleton loaders that match actual component shapes.
 * Provides better perceived performance than generic spinners.
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

// Base shimmer animation styles
const shimmerStyle = `
  @keyframes skeleton-shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

/**
 * Base Skeleton element with shimmer effect
 */
const SkeletonBase = memo(({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '8px',
  style = {},
  className = '',
}) => (
  <div
    className={`skeleton-element ${className}`}
    aria-hidden="true"
    style={{
      width,
      height,
      borderRadius,
      background: `linear-gradient(
        90deg,
        var(--skeleton-base, rgba(255, 255, 255, 0.05)) 0%,
        var(--skeleton-highlight, rgba(255, 255, 255, 0.1)) 50%,
        var(--skeleton-base, rgba(255, 255, 255, 0.05)) 100%
      )`,
      backgroundSize: '200% 100%',
      animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
      ...style,
    }}
  />
));

SkeletonBase.displayName = 'SkeletonBase';

/**
 * Skeleton Text - Single line of text
 */
export const SkeletonText = memo(({ 
  width = '100%', 
  height = '14px',
  lines = 1,
  gap = '8px',
  lastLineWidth = '60%',
}) => {
  if (lines === 1) {
    return <SkeletonBase width={width} height={height} borderRadius="4px" />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase
          key={i}
          width={i === lines - 1 ? lastLineWidth : width}
          height={height}
          borderRadius="4px"
        />
      ))}
    </div>
  );
});

SkeletonText.displayName = 'SkeletonText';

/**
 * Skeleton Circle - For avatars and icons
 */
export const SkeletonCircle = memo(({ size = '40px' }) => (
  <SkeletonBase width={size} height={size} borderRadius="50%" />
));

SkeletonCircle.displayName = 'SkeletonCircle';

/**
 * Skeleton Image - For images and thumbnails
 */
export const SkeletonImage = memo(({ 
  width = '100%', 
  height = '200px',
  aspectRatio,
}) => (
  <div style={{ 
    width, 
    aspectRatio: aspectRatio || undefined,
    height: aspectRatio ? 'auto' : height,
  }}>
    <SkeletonBase 
      width="100%" 
      height={aspectRatio ? '100%' : height} 
      borderRadius="12px" 
    />
  </div>
));

SkeletonImage.displayName = 'SkeletonImage';

/**
 * Skeleton Button
 */
export const SkeletonButton = memo(({ 
  width = '120px', 
  height = '40px',
}) => (
  <SkeletonBase width={width} height={height} borderRadius="10px" />
));

SkeletonButton.displayName = 'SkeletonButton';

/**
 * VoucherCard Skeleton - Matches VoucherCard layout
 */
export const VoucherCardSkeleton = memo(() => (
  <div
    className="glass-panel skeleton-voucher-card"
    style={{
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      minHeight: '240px',
    }}
  >
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <SkeletonCircle size="48px" />
      <div style={{ flex: 1 }}>
        <SkeletonText width="70%" height="18px" />
        <div style={{ height: '8px' }} />
        <SkeletonText width="40%" height="12px" />
      </div>
    </div>

    {/* Platform badges */}
    <div>
      <SkeletonText width="80px" height="10px" />
      <div style={{ height: '8px' }} />
      <div style={{ display: 'flex', gap: '8px' }}>
        <SkeletonBase width="80px" height="28px" borderRadius="6px" />
        <SkeletonBase width="80px" height="28px" borderRadius="6px" />
        <SkeletonBase width="60px" height="28px" borderRadius="6px" />
      </div>
    </div>

    {/* Footer */}
    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <SkeletonText width="80px" height="14px" />
      <SkeletonCircle size="32px" />
    </div>
  </div>
));

VoucherCardSkeleton.displayName = 'VoucherCardSkeleton';

/**
 * VoucherGrid Skeleton - Grid of VoucherCard skeletons
 */
export const VoucherGridSkeleton = memo(({ count = 6, columns = 3 }) => (
  <>
    {/* Stats bar skeleton */}
    <div className="stats-bar" style={{ marginBottom: '1.5rem' }}>
      {[1, 2, 3].map(i => (
        <div key={i} className="stat-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SkeletonCircle size="32px" />
          <div>
            <SkeletonText width="40px" height="20px" />
            <div style={{ height: '4px' }} />
            <SkeletonText width="60px" height="12px" />
          </div>
        </div>
      ))}
    </div>

    {/* Grid */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(280px, 1fr))`,
        gap: '24px',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <VoucherCardSkeleton key={i} />
      ))}
    </div>

    {/* Shimmer styles */}
    <style>{shimmerStyle}</style>
  </>
));

VoucherGridSkeleton.displayName = 'VoucherGridSkeleton';

/**
 * CreditCard Skeleton - Matches credit card item layout
 */
export const CreditCardSkeleton = memo(() => (
  <div
    className="glass-panel skeleton-credit-card"
    style={{
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >
    {/* Card image */}
    <SkeletonImage aspectRatio="1.586" />
    
    {/* Card name */}
    <SkeletonText width="80%" height="20px" />
    
    {/* Bank */}
    <SkeletonText width="50%" height="14px" />
    
    {/* Tags */}
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <SkeletonBase width="70px" height="24px" borderRadius="12px" />
      <SkeletonBase width="90px" height="24px" borderRadius="12px" />
      <SkeletonBase width="60px" height="24px" borderRadius="12px" />
    </div>
    
    {/* Buttons */}
    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
      <SkeletonButton width="100%" height="36px" />
    </div>
  </div>
));

CreditCardSkeleton.displayName = 'CreditCardSkeleton';

/**
 * CreditCardGrid Skeleton
 */
export const CreditCardGridSkeleton = memo(({ count = 8 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <CreditCardSkeleton key={i} />
    ))}
    <style>{shimmerStyle}</style>
  </div>
));

CreditCardGridSkeleton.displayName = 'CreditCardGridSkeleton';

/**
 * Sidebar Filter Skeleton
 */
export const SidebarSkeleton = memo(() => (
  <div style={{ padding: '1rem' }}>
    {/* Platform section */}
    <SkeletonText width="120px" height="12px" />
    <div style={{ height: '16px' }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
      <SkeletonBase width="100%" height="60px" borderRadius="12px" />
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBase key={i} width="100%" height="60px" borderRadius="12px" />
      ))}
    </div>

    <div style={{ height: '24px' }} />

    {/* Category section */}
    <SkeletonText width="100px" height="12px" />
    <div style={{ height: '16px' }} />
    <SkeletonBase width="100%" height="40px" borderRadius="10px" />
    <div style={{ height: '12px' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonBase key={i} width="100%" height="40px" borderRadius="8px" />
      ))}
    </div>

    <style>{shimmerStyle}</style>
  </div>
));

SidebarSkeleton.displayName = 'SidebarSkeleton';

/**
 * Table Row Skeleton
 */
export const TableRowSkeleton = memo(({ columns = 5 }) => (
  <tr>
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} style={{ padding: '16px' }}>
        <SkeletonText width={i === 0 ? '80%' : '60%'} height="16px" />
      </td>
    ))}
    <style>{shimmerStyle}</style>
  </tr>
));

TableRowSkeleton.displayName = 'TableRowSkeleton';

/**
 * Modal Content Skeleton
 */
export const ModalContentSkeleton = memo(() => (
  <div style={{ padding: '1.5rem' }}>
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
      <SkeletonCircle size="64px" />
      <div style={{ flex: 1 }}>
        <SkeletonText width="70%" height="24px" />
        <div style={{ height: '8px' }} />
        <SkeletonText width="40%" height="16px" />
      </div>
    </div>

    {/* Content */}
    <SkeletonText lines={4} gap="12px" />
    
    <div style={{ height: '24px' }} />
    
    {/* Action area */}
    <div style={{ display: 'flex', gap: '12px' }}>
      <SkeletonButton width="120px" height="44px" />
      <SkeletonButton width="160px" height="44px" />
    </div>

    <style>{shimmerStyle}</style>
  </div>
));

ModalContentSkeleton.displayName = 'ModalContentSkeleton';

/**
 * Chart Skeleton
 */
export const ChartSkeleton = memo(({ height = '200px' }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'flex-end', 
    gap: '8px', 
    height,
    padding: '0 16px',
  }}>
    {[40, 65, 45, 80, 55, 70].map((h, i) => (
      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <SkeletonBase width="100%" height={`${h}%`} borderRadius="4px 4px 0 0" />
        <SkeletonText width="30px" height="10px" />
      </div>
    ))}
    <style>{shimmerStyle}</style>
  </div>
));

ChartSkeleton.displayName = 'ChartSkeleton';

/**
 * Search Results Skeleton
 */
export const SearchResultsSkeleton = memo(({ count = 5 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <div 
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          background: 'var(--glass-bg)',
          borderRadius: '8px',
        }}
      >
        <SkeletonCircle size="32px" />
        <div style={{ flex: 1 }}>
          <SkeletonText width="60%" height="14px" />
          <div style={{ height: '4px' }} />
          <SkeletonText width="40%" height="12px" />
        </div>
      </div>
    ))}
    <style>{shimmerStyle}</style>
  </div>
));

SearchResultsSkeleton.displayName = 'SearchResultsSkeleton';

// PropTypes
SkeletonBase.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

SkeletonText.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lines: PropTypes.number,
  gap: PropTypes.string,
  lastLineWidth: PropTypes.string,
};

SkeletonCircle.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SkeletonImage.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  aspectRatio: PropTypes.string,
};

SkeletonButton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

VoucherGridSkeleton.propTypes = {
  count: PropTypes.number,
  columns: PropTypes.number,
};

CreditCardGridSkeleton.propTypes = {
  count: PropTypes.number,
};

TableRowSkeleton.propTypes = {
  columns: PropTypes.number,
};

ChartSkeleton.propTypes = {
  height: PropTypes.string,
};

SearchResultsSkeleton.propTypes = {
  count: PropTypes.number,
};

// Default export with all components
export default {
  Base: SkeletonBase,
  Text: SkeletonText,
  Circle: SkeletonCircle,
  Image: SkeletonImage,
  Button: SkeletonButton,
  VoucherCard: VoucherCardSkeleton,
  VoucherGrid: VoucherGridSkeleton,
  CreditCard: CreditCardSkeleton,
  CreditCardGrid: CreditCardGridSkeleton,
  Sidebar: SidebarSkeleton,
  TableRow: TableRowSkeleton,
  ModalContent: ModalContentSkeleton,
  Chart: ChartSkeleton,
  SearchResults: SearchResultsSkeleton,
};
