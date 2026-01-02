import { useState, useEffect } from 'react';
import { featureFlags } from '../config/featureFlags';
import guidesData from '../data/guides.json';

// Simple in-memory cache
const cache = {
    data: null,
    promise: null,
    timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useGuides = (options = {}) => {
    const { enabled = true } = options;
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!enabled) {
            setLoading(false);
            return;
        }

        const fetchGuides = async () => {
            // Check feature flag first
            if (!featureFlags.useBackendApi || !featureFlags.useGuidesApi) {
                console.log('Using local guides data (Feature flag off)');
                setGuides(guidesData);
                setLoading(false);
                return;
            }

            // Check cache
            const now = Date.now();
            if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
                console.log('Using cached guides data');
                setGuides(cache.data);
                setLoading(false);
                return;
            }

            // Check if fetch in progress
            if (cache.promise) {
                try {
                    const data = await cache.promise;
                    setGuides(data);
                } catch (err) {
                    console.error("Error waiting for shared guides fetch:", err);
                    setGuides(guidesData);
                } finally {
                    setLoading(false);
                }
                return;
            }

            // Start new fetch
            cache.promise = (async () => {
                try {
                    const response = await fetch('/api/guides/');
                    if (!response.ok) {
                        throw new Error('Failed to fetch guides');
                    }
                    const data = await response.json();

                    let processedData = data;
                    if (data.results && Array.isArray(data.results)) {
                        processedData = data.results;
                    }

                    if (!processedData || processedData.length === 0) {
                        console.warn('API returned empty guides list, using fallback');
                        cache.data = guidesData;
                        cache.timestamp = Date.now();
                        return guidesData;
                    } else {
                        // Update cache
                        cache.data = processedData;
                        cache.timestamp = Date.now();
                        return processedData;
                    }
                } catch (err) {
                    cache.promise = null;
                    throw err;
                }
            })();

            try {
                const data = await cache.promise;
                setGuides(data);
            } catch (err) {
                console.error('Error fetching guides:', err);
                // Fallback to local data on error
                setGuides(guidesData);
                setError(err); // Keep error state but we still show data from fallback
            } finally {
                setLoading(false);
            }
        };

        fetchGuides();
    }, [enabled]);

    return { guides, loading, error };
};
