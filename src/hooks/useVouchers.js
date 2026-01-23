import { useState, useEffect } from 'react';

import { featureFlags } from '../config/featureFlags';
import { API_BASE_URL } from '../config/api';
import vouchersData from '../data/vouchers.json';
import { sortPlatforms } from '../utils/sortUtils';

// Simple in-memory cache
const cache = {
    data: null,
    promise: null,
    timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper to process and sort voucher data
// Moved outside component to avoid ReferenceError during initialization
const processVouchers = (items) => {
    return items.map(voucher => ({
        ...voucher,
        platforms: sortPlatforms(voucher.platforms || [])
    }));
};

export const useVouchers = (options = {}) => {
    const { enabled = true } = options;
    // Initialize with static data immediately for optimistic UI
    const [vouchers, setVouchers] = useState(() => {
        return processVouchers(vouchersData);
    });
    // We start with loading=false because we have static data!
    // We can add a separate 'isRefetching' state if we want to show a small spinner,
    // but for the main blocking load, it should be false.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const fetchVouchers = async () => {
            // Check feature flag first
            if (!featureFlags.useBackendApi) {
                console.log("Backend API disabled (feature flag), using local data");
                // Already initialized with local data, just return
                return;
            }

            // Check cache validity (checking data exists and is fresh)
            const now = Date.now();
            if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
                setVouchers(cache.data);
                return;
            }

            // Check if a fetch is already in progress
            if (cache.promise) {
                try {
                    const data = await cache.promise;
                    setVouchers(data);
                } catch (err) {
                    console.error("Error waiting for shared voucher fetch:", err);
                    // No need to fallback, we already have static data
                }
                return;
            }

            // Start new fetch and assign to cache.promise
            cache.promise = (async () => {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

                try {
                    const response = await fetch(`${API_BASE_URL}/vouchers/`, {
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error(`API Error: ${response.status} ${response.statusText}`);
                    }
                    const data = await response.json();

                    // Handle pagination or direct array
                    const items = Array.isArray(data) ? data : (data.results || []);
                    let processed = [];

                    if (!items || items.length === 0) {
                        console.warn("API returned no data, keeping local data");
                        // Return current static data if API fails to give meaningful data
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
                console.error("Error fetching vouchers from API, using fallback data:", err);
                // We already have static data, so just log the error
                // setVouchers(processVouchers(vouchersData));
            }
        };

        fetchVouchers();
    }, [enabled]);



    return { vouchers, loading, error };
};
