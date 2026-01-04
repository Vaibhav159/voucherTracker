import { useState, useEffect } from 'react';

import { featureFlags } from '../config/featureFlags';
import vouchersData from '../data/vouchers.json';
import { sortPlatforms } from '../utils/sortUtils';

// Simple in-memory cache
const cache = {
    data: null,
    promise: null,
    timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useVouchers = (options = {}) => {
    const { enabled = true } = options;
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!enabled) {
            setLoading(false);
            return;
        }

        const fetchVouchers = async () => {
            // Check feature flag first
            if (!featureFlags.useBackendApi) {
                console.log("Backend API disabled (feature flag), using local data");
                setVouchers(processVouchers(vouchersData));
                setLoading(false);
                return;
            }

            // Check cache validity (checking data exists and is fresh)
            const now = Date.now();
            if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
                setVouchers(cache.data);
                setLoading(false);
                return;
            }

            // Check if a fetch is already in progress
            if (cache.promise) {
                try {
                    const data = await cache.promise;
                    setVouchers(data);
                } catch (err) {
                    console.error("Error waiting for shared voucher fetch:", err);
                    setVouchers(processVouchers(vouchersData));
                } finally {
                    setLoading(false);
                }
                return;
            }

            // Start new fetch and assign to cache.promise
            cache.promise = (async () => {
                try {
                    const response = await fetch('/api/vouchers/');
                    if (!response.ok) {
                        throw new Error(`API Error: ${response.status} ${response.statusText}`);
                    }
                    const data = await response.json();

                    // Handle pagination or direct array
                    const items = Array.isArray(data) ? data : (data.results || []);
                    let processed = [];

                    if (!items || items.length === 0) {
                        console.warn("API returned no data, falling back to local data");
                        processed = processVouchers(vouchersData);
                    } else {
                        processed = processVouchers(items);
                    }

                    // Update cache data
                    cache.data = processed;
                    cache.timestamp = Date.now();
                    return processed;
                } catch (err) {
                    // Reset promise so existing failures don't block future retries forever,
                    // though for this session we might just fallback.
                    cache.promise = null;
                    throw err;
                }
            })();

            // Await the newly created promise
            try {
                const data = await cache.promise;
                setVouchers(data);
            } catch (err) {
                console.error("Error fetching vouchers from API, falling back to local data:", err);
                // Fallback to local data on error
                setVouchers(processVouchers(vouchersData));
            } finally {
                setLoading(false);
            }
        };

        fetchVouchers();
    }, [enabled]);

    // Helper to process and sort voucher data
    const processVouchers = (items) => {
        return items.map(voucher => ({
            ...voucher,
            platforms: sortPlatforms(voucher.platforms || [])
        }));
    };

    return { vouchers, loading, error };
};
