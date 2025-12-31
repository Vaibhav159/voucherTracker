import { useState, useEffect } from 'react';
import { featureFlags } from '../config/featureFlags';
import guidesData from '../data/guides.json';

// Simple in-memory cache
const cache = {
    data: null,
    timestamp: 0,
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

            try {
                const response = await fetch('/api/guides/');
                if (!response.ok) {
                    throw new Error('Failed to fetch guides');
                }
                const data = await response.json();

                // Backend returns paginated response or list? 
                // ViewSet defaults to pagination usually unless configured otherwise.
                // If StandardResultsSetPagination is global default, it returns { count, next, previous, results: [] }
                // Let's assume pagination is active as per Vouchers.
                // We should handle both cases or verify backend response structure.
                // VoucherViewSet uses StandardResultsSetPagination. 
                // GuideViewSet code: class GuideViewSet(viewsets.ReadOnlyModelViewSet) ...
                // If settings.REST_FRAMEWORK.DEFAULT_PAGINATION_CLASS is set, it will be paginated.
                // Let's assume it is and check for 'results' property.

                let processedData = data;
                if (data.results && Array.isArray(data.results)) {
                    processedData = data.results;
                }

                if (!processedData || processedData.length === 0) {
                    console.warn('API returned empty guides list, using fallback');
                    setGuides(guidesData);
                } else {
                    setGuides(processedData);
                    // Update cache
                    cache.data = processedData;
                    cache.timestamp = now;
                }
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
