import React from 'react';
import { useDiscountParser } from '../hooks/useDiscountParser';

/**
 * VoucherListRow
 * Renders a voucher in list view (row layout) matching v3 mockup
 */
const VoucherListRow = ({ voucher, onClick, style, favorites = [], toggleFavorite }) => {
    const { getBestRate } = useDiscountParser();
    const bestRate = getBestRate(voucher.platforms);

    // Styles from v3 mockup
    const styles = {
        bgCard: '#141414',
        bgElevated: '#1e1e1e',
        text: '#ffffff',
        textMuted: '#9ca3af',
        textDim: '#6b7280',
        border: '#262626',
        emerald: '#10b981',
        emeraldGlow: 'rgba(16, 185, 129, 0.3)',
    };

    return (
        <div
            onClick={() => onClick(voucher)}
            style={{
                ...style,
                background: styles.bgCard,
                borderRadius: '20px',
                border: `1px solid ${styles.border}`,
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
            }}
            className="voucher-list-row"
        >
            {/* Logo */}
            <div style={{
                width: '80px',
                height: '80px',
                background: `${voucher.color}20`,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                flexShrink: 0,
            }}>{voucher.logo}</div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: styles.text, margin: 0 }}>{voucher.brand}</h3>
                    {voucher.discount && (
                        <span style={{
                            padding: '4px 10px',
                            background: styles.emerald,
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#000',
                        }}>{voucher.discount} OFF</span>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ padding: '4px 10px', background: styles.bgElevated, borderRadius: '6px', fontSize: '12px', color: styles.textMuted }}>{voucher.category}</span>
                    <span style={{ padding: '4px 10px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '6px', fontSize: '12px', color: styles.emerald }}>✓ {voucher.validity || 'Valid Today'}</span>
                </div>

                {/* Platforms */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {voucher.platforms && voucher.platforms.slice(0, 4).map((p, i) => (
                        <span key={i} style={{
                            padding: '6px 12px',
                            background: styles.bgElevated,
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: styles.textMuted,
                            border: `1px solid ${styles.border}`,
                        }}>
                            {p.name}: {p.rate || p.fee}
                        </span>
                    ))}
                </div>
            </div>

            {/* Best Rate */}
            <div style={{ textAlign: 'right', minWidth: '100px' }} className="hide-mobile">
                <div style={{ fontSize: '11px', color: styles.textDim, marginBottom: '4px' }}>Best Rate</div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: styles.emerald }}>~{bestRate}%</div>
            </div>

            {/* Favorite (if functionality exists passed down, otherwise omit or dummy) */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (toggleFavorite) toggleFavorite(voucher.id);
                }}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    opacity: favorites && favorites.includes(voucher.id) ? 1 : 0.4,
                    padding: '8px',
                }}
                title="Toggle Favorite"
            >💚</button>

            <style>{`
        .voucher-list-row:hover {
            border-color: var(--accent-emerald, #10b981) !important;
            transform: translateY(-2px);
        }
        @media (max-width: 768px) {
            .hide-mobile { display: none !important; }
            .voucher-list-row { flex-direction: column; align-items: stretch; gap: 16px; }
            .voucher-list-row > div:first-child { width: 60px; height: 60px; font-size: 30px; }
            /* Adjust layout for mobile */
        }
      `}</style>
        </div>
    );
};

export default VoucherListRow;
