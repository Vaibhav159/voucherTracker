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
import { useVirtualizer } from '@tanstack/react-virtual';
import VoucherCard from './VoucherCardPolished';
import EmptyState from './EmptyState';
import { VoucherGridSkeleton } from './Skeleton';

const CARD_MIN_WIDTH = 200;
const CARD_GAP = 32;
const CARD_HEIGHT = 400;
const OVERSCAN = 5;

const VoucherGrid = ({ vouchers, onVoucherClick, isLoading = false }) => {
    const parentRef = useRef(null);
    const [columns, setColumns] = useState(3);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Simulate initial load delay for skeleton demo
    useEffect(() => {
        if (vouchers && vouchers.length > 0) {
            const timer = setTimeout(() => setIsInitialLoad(false), 300);
            return () => clearTimeout(timer);
        }
    }, [vouchers]);

    // Calculate columns based on container width - FIXED VERSION
    useEffect(() => {
        const calculateColumns = () => {
            if (!parentRef.current) return;

            // Get actual available width (accounting for padding/scrollbar)
            const containerRect = parentRef.current.getBoundingClientRect();
            const width = containerRect.width - 16; // Account for padding

            setContainerWidth(width);

            // Calculate how many cards can fit
            // Formula: (width + gap) / (cardWidth + gap) = number of cards
            const possibleCols = Math.floor((width + CARD_GAP) / (CARD_MIN_WIDTH + CARD_GAP));
            const cols = Math.max(1, possibleCols); // Remove 2-column limit

            setColumns(cols);
        };

        calculateColumns();

        // Use ResizeObserver for responsive updates
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(calculateColumns);
        });

        if (parentRef.current) {
            resizeObserver.observe(parentRef.current);
        }

        // Also listen to window resize as backup
        window.addEventListener('resize', calculateColumns);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', calculateColumns);
        };
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

    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: getRowHeight,
        overscan: OVERSCAN,
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

    // Calculate actual card width based on container and columns
    const cardWidth = containerWidth > 0
        ? Math.floor((containerWidth - (CARD_GAP * (columns - 1))) / columns)
        : CARD_MIN_WIDTH;

    return (
        <>
            {/* Virtualized Grid Container */}
            <div
                ref={parentRef}
                className="voucher-grid-virtual-container"
                role="feed"
                aria-busy={isLoading}
                aria-label={`${stats.total} vouchers available`}
                style={{
                    flex: 1,
                    minHeight: '500px',
                    overflow: 'auto',
                    overflowX: 'hidden', // PREVENT HORIZONTAL SCROLL
                    contain: 'strict',
                    padding: '0 8px',
                    boxSizing: 'border-box',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        height: `${virtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
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
                                    transform: `translateY(${virtualRow.start}px)`,
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                    gap: `${CARD_GAP}px`,
                                    boxSizing: 'border-box',
                                    paddingBottom: `${CARD_GAP}px`, // Enforce vertical spacing
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
