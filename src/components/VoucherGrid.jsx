/**
 * VoucherGrid - FIXED VERSION
 *
 * Fixes:
 * - Proper width calculation to prevent horizontal overflow
 * - Cards no longer cut off on the right
 * - Better responsive column calculation
 */

import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import VoucherCard from './VoucherCardPolished';
import EmptyState from './EmptyState';
import { VoucherGridSkeleton } from './Skeleton';

const CARD_MIN_WIDTH = 260;
const CARD_GAP = 20;
const CARD_HEIGHT = 225;
const OVERSCAN = 5;

const VoucherGrid = ({ vouchers, onVoucherClick, isLoading = false }) => {
    const parentRef = useRef(null);
    // Initialize columns based on window width to prevent flash of wrong layout
    const [columns, setColumns] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth <= 768 ? 1 : 3;
        }
        return 3;
    });

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [scrollMargin, setScrollMargin] = useState(0);

    // Simulate initial load delay for skeleton demo
    useEffect(() => {
        if (vouchers && vouchers.length > 0) {
            const timer = setTimeout(() => setIsInitialLoad(false), 300);
            return () => clearTimeout(timer);
        }
    }, [vouchers]);

    // Calculate columns based on container width - FIXED VERSION
    // Calculate columns based on container width - ROBUST VERSION
    useEffect(() => {
        if (!parentRef.current) return;

        const updateColumns = (width) => {
            // Mobile Override: Force 1 column if width <= 768px (using window width for mobile check is safer for responsive breakpoints)
            if (window.innerWidth <= 768) {
                setColumns(1);
                return;
            }

            const possibleCols = Math.floor((width + CARD_GAP) / (CARD_MIN_WIDTH + CARD_GAP));
            const cols = Math.max(1, possibleCols);
            setColumns(cols);
        };

        // Initial calculation
        updateColumns(parentRef.current.getBoundingClientRect().width);

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                updateColumns(entry.contentRect.width);
            }
        });

        observer.observe(parentRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (parentRef.current) {
            setScrollMargin(parentRef.current.offsetTop);
        }
    }, []);
    // Group vouchers into rows
    const rows = useMemo(() => {
        if (!vouchers || vouchers.length === 0) return [];
        const result = [];
        for (let i = 0; i < vouchers.length; i += columns) {
            result.push(vouchers.slice(i, i + columns));
        }
        return result;
    }, [vouchers, columns]);

    const getRowHeight = useCallback(() => CARD_HEIGHT + CARD_GAP, []);

    const virtualizer = useWindowVirtualizer({
        count: rows.length,
        estimateSize: getRowHeight,
        overscan: OVERSCAN,
        scrollMargin,
    });

    // Calculate stats
    const stats = useMemo(() => {
        if (!vouchers || vouchers.length === 0) {
            return { total: 0, brands: 0, platforms: 0, maxDiscount: 0 };
        }

        const uniqueBrands = new Set(vouchers.map(v => v.brand)).size;
        const uniquePlatforms = new Set(
            vouchers.flatMap(v => v.platforms.map(p => p.name))
        ).size;

        let maxDisc = 0;
        vouchers.forEach(v => {
            v.platforms.forEach(p => {
                const fee = p.fee || '';
                const match = fee.match(/(\d+(?:\.\d+)?)\s*%/);
                if (match) {
                    const discount = parseFloat(match[1]);
                    if (discount > maxDisc) maxDisc = discount;
                }
            });
        });

        return {
            total: vouchers.length,
            brands: uniqueBrands,
            platforms: uniquePlatforms,
            maxDiscount: Math.round(maxDisc)
        };
    }, [vouchers]);

    // Show skeleton during loading
    if (isLoading || isInitialLoad) {
        return <VoucherGridSkeleton count={9} />;
    }

    // Empty state
    if (!vouchers || vouchers.length === 0) {
        return (
            <EmptyState
                illustration="search"
                title="No vouchers found"
                description="Try adjusting your search or filters to see results."
            />
        );
    }

    const virtualRows = virtualizer.getVirtualItems();

    return (
        <>
            {/* Window Scroll Container - Natural Height */}
            <div
                ref={parentRef}
                className="voucher-grid-virtual-container"
                role="feed"
                aria-busy={isLoading}
                aria-label={`${stats.total} vouchers available`}
                style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                    // contain: 'strict', // Removed to prevent scrolling issues
                    padding: '0 8px',
                    boxSizing: 'border-box',
                }}
            >
                {virtualRows.map((virtualRow) => {
                    const rowVouchers = rows[virtualRow.index];
                    return (
                        <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            ref={virtualizer.measureElement}
                            role="group"
                            aria-label={`Voucher row ${virtualRow.index + 1}`}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
                                display: 'grid',
                                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                gap: `${CARD_GAP}px`,
                                boxSizing: 'border-box',
                                paddingBottom: `${CARD_GAP}px`,
                            }}
                        >
                            {rowVouchers.map((voucher, colIndex) => (
                                <VoucherCard
                                    key={voucher.id}
                                    voucher={voucher}
                                    onClick={onVoucherClick}
                                    index={virtualRow.index * columns + colIndex}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

VoucherGrid.propTypes = {
    vouchers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        logo: PropTypes.string,
        category: PropTypes.string,
        discount: PropTypes.number,
        platforms: PropTypes.array,
    })),
    onVoucherClick: PropTypes.func,
    isLoading: PropTypes.bool,
};

export default VoucherGrid;
