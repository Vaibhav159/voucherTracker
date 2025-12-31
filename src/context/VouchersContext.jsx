import { createContext, useState, useEffect, useCallback } from 'react';
import { featureFlags } from '../config/featureFlags';
import { API_ENDPOINTS } from '../config/apiConfig';
import vouchersData from '../data/vouchers.json';
import { sortPlatforms } from '../utils/sortUtils';

export const VouchersContext = createContext();

export const VouchersProvider = ({ children }) => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);

    const processVouchers = useCallback((items) => {
        return items.map(voucher => ({
            ...voucher,
            platforms: sortPlatforms(voucher.platforms || [])
        }));
    }, []);

    const fetchVouchers = useCallback(async () => {
        // Prevent multiple simultaneous fetches if needed, 
        // though with Context it will usually only be called once on mount.
        setLoading(true);

        // Check feature flag first
        if (!featureFlags.useBackendApi) {
            console.log("Backend API disabled (feature flag), using local data");
            setVouchers(processVouchers(vouchersData));
            setLoading(false);
            setHasFetched(true);
            return;
        }

        try {
            const response = await fetch(API_ENDPOINTS.VOUCHERS);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            // Handle pagination or direct array
            const items = Array.isArray(data) ? data : (data.results || []);

            if (!items || items.length === 0) {
                console.warn("API returned no data, falling back to local data");
                setVouchers(processVouchers(vouchersData));
            } else {
                setVouchers(processVouchers(items));
            }
            setError(null);
        } catch (err) {
            console.error("Error fetching vouchers from API, falling back to local data:", err);
            // Fallback to local data on error
            setVouchers(processVouchers(vouchersData));
            // We set error but allow app to function with fallback
            setError(err.message);
        } finally {
            setLoading(false);
            setHasFetched(true);
        }
    }, [processVouchers]);

    useEffect(() => {
        if (!hasFetched) {
            fetchVouchers();
        }
    }, [fetchVouchers, hasFetched]);

    const value = {
        vouchers,
        loading,
        error,
        refreshVouchers: fetchVouchers
    };

    return (
        <VouchersContext.Provider value={value}>
            {children}
        </VouchersContext.Provider>
    );
};
