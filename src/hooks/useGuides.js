import { useState, useEffect } from 'react';
import { featureFlags } from '../config/featureFlags';
import guidesData from '../data/guides.json';
import { API_BASE_URL } from '../config/api';

// Simple in-memory cache
const cache = {
    data: null,
    promise: null,
    timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useGuides = (options = {}) => {
    const { enabled = true } = options;
    // Initialize with static data immediately for optimistic UI
    const [guides, setGuides] = useState(guidesData);
    // Start with loading=false to unblock UI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const fetchGuides = async () => {
            // Check feature flag first
            if (!featureFlags.useBackendApi || !featureFlags.useGuidesApi) {
                console.log('Using local guides data (Feature flag off)');
                // Already initialized with local data
                return;
            }

            // Check cache
            const now = Date.now();
            if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
                console.log('Using cached guides data');
                setGuides(cache.data);
                return;
            }

            // Check if fetch in progress
            if (cache.promise) {
                try {
                    const data = await cache.promise;
                    setGuides(data);
                } catch (err) {
                    console.error("Error waiting for shared guides fetch:", err);
                    // Stay with static data
                }
                return;
            }

            // Start new fetch
            cache.promise = (async () => {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

                try {
                    const response = await fetch(`${API_BASE_URL}/v2/pages/?type=guides.GuidePage&fields=_,id,title,intro,body,tags,author,external_link,html_url`, {
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error('Failed to fetch guides');
                    }
                    const data = await response.json();

                    let backendGuides = [];
                    if (data.items && Array.isArray(data.items)) {
                        backendGuides = data.items.map(page => ({
                            id: `cms-${page.id}`,
                            title: page.title,
                            description: page.intro,
                            contentHtml: (page.body && page.body.length > 0) ? page.body : null,
                            tags: page.tags || [],
                            author: page.author,
                            // If external_link is present, use it. Otherwise use '#'.
                            // Note: frontend uses presence of content/embed to decide if internal.
                            link: page.external_link || '#',
                            meta: page.meta,
                            // Ensure URL is absolute pointing to backend
                            url: (page.meta?.html_url || page.html_url) ?
                                ((page.meta?.html_url || page.html_url).startsWith('http') ? (page.meta?.html_url || page.html_url) : `${API_BASE_URL}${page.meta?.html_url || page.html_url}`)
                                : null
                        }));
                    } else if (data.results) { // Fallback if structure differs
                        backendGuides = data.results;
                    }

                    // Update cache
                    cache.data = backendGuides;
                    cache.timestamp = Date.now();
                    return backendGuides;
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
                // Fallback to local data on error (already set, but log error)
                // setGuides(guidesData); // No need to re-set if already initial
                // setError(err); // Removed to prevent UI blocking since we have fallback
            }
        };

        fetchGuides();
    }, [enabled]);

    return { guides, loading, error };
};
