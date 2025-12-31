import { useContext } from 'react';
import { VouchersContext } from '../context/VouchersContext';

export const useVouchers = () => {
    const context = useContext(VouchersContext);

    if (context === undefined) {
        throw new Error('useVouchers must be used within a VouchersProvider');
    }

    return context;
};
