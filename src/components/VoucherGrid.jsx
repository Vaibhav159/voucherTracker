import React from 'react';
import VoucherCard from './VoucherCard';

const VoucherGrid = ({ vouchers }) => {
    if (vouchers.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                <h3>No vouchers found matching your search.</h3>
                <p>Try a different keyword or check back later.</p>
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '2rem'
            }}
        >
            {vouchers.map(voucher => (
                <VoucherCard key={voucher.id} voucher={voucher} />
            ))}
        </div>
    );
};

export default VoucherGrid;
