import { useState, useEffect } from 'react';
import { featureFlags } from '../config/featureFlags';
import { API_ENDPOINTS } from '../config/apiConfig';
import guidesData from '../data/guides.json';

// Simple in-memory cache
const cache = {
    data: null,
    timestamp: 0,
    fetchPromise: null, // To deduplicate simultaneous requests
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useGuides = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

            // If a fetch is already in progress, wait for it
            if (cache.fetchPromise) {
                try {
                    const data = await cache.fetchPromise;
                    setGuides(data);
                    setLoading(false);
                } catch (err) {
                    setGuides(guidesData);
                    setLoading(false);
                }
                return;
            }

            // Start a new fetch and store the promise
            cache.fetchPromise = (async () => {
                try {
                    const response = await fetch(API_ENDPOINTS.GUIDES);
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
                        return guidesData;
                    } else {
                        cache.data = processedData;
                        cache.timestamp = Date.now();
                        return processedData;
                    }
                } catch (err) {
                    throw err;
                } finally {
                    cache.fetchPromise = null;
                }
            })();

            try {
                const data = await cache.fetchPromise;
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
    }, []);

    return { guides, loading, error };
};
