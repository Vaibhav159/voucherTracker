import { useState, useEffect } from 'react';

import { featureFlags } from '../config/featureFlags';
import vouchersData from '../data/vouchers.json';
import { sortPlatforms } from '../utils/sortUtils';

export const useVouchers = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVouchers = async () => {
            // Check feature flag first
            if (!featureFlags.useBackendApi) {
                console.log("Backend API disabled (feature flag), using local data");
                setVouchers(processVouchers(vouchersData));
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/vouchers/');
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

            } catch (err) {
                console.error("Error fetching vouchers from API, falling back to local data:", err);
                // Fallback to local data on error
                setVouchers(processVouchers(vouchersData));
                // We don't set error state here to allow the app to function with fallback data
            } finally {
                setLoading(false);
            }
        };

        fetchVouchers();
    }, []);

    // Helper to process and sort voucher data
    const processVouchers = (items) => {
        return items.map(voucher => ({
            ...voucher,
            platforms: sortPlatforms(voucher.platforms || [])
        }));
    };

    return { vouchers, loading, error };
};
