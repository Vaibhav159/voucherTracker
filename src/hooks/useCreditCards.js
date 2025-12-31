import { useState, useEffect } from 'react';
import { featureFlags } from '../config/featureFlags';
import { API_ENDPOINTS } from '../config/apiConfig';
// We need to import creditCards from creditCards.js
// Note: creditCards.js has named export 'creditCards'
import { creditCards as localCreditCards } from '../data/creditCards';

// Simple in-memory cache
const cache = {
    data: null,
    timestamp: 0,
    fetchPromise: null, // To deduplicate simultaneous requests
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useCreditCards = () => {
    const [creditCards, setCreditCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCreditCards = async () => {
            // Check feature flag first
            if (!featureFlags.useBackendApi || !featureFlags.useCreditCardsApi) {
                setCreditCards(localCreditCards);
                setLoading(false);
                return;
            }

            // Check cache
            const now = Date.now();
            if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
                setCreditCards(cache.data);
                setLoading(false);
                return;
            }

            // If a fetch is already in progress, wait for it
            if (cache.fetchPromise) {
                try {
                    const data = await cache.fetchPromise;
                    setCreditCards(data);
                    setLoading(false);
                } catch (err) {
                    // If the other request failed, we just use local data
                    setCreditCards(localCreditCards);
                    setLoading(false);
                }
                return;
            }

            // Start a new fetch and store the promise
            cache.fetchPromise = (async () => {
                try {
                    const response = await fetch(API_ENDPOINTS.CREDIT_CARDS);
                    if (!response.ok) {
                        throw new Error('Failed to fetch credit cards');
                    }
                    const data = await response.json();

                    // Handle pagination
                    let processedData = data;
                    if (data.results && Array.isArray(data.results)) {
                        processedData = data.results;
                    }

                    // Ensure robust fallback if data is messed up
                    if (!processedData || !Array.isArray(processedData) || processedData.length === 0) {
                        console.warn('API returned invalid/empty credit cards, using fallback');
                        return localCreditCards;
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
                setCreditCards(data);
            } catch (err) {
                console.error('Error fetching credit cards:', err);
                setCreditCards(localCreditCards);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCreditCards();
    }, []);

    return { creditCards, loading, error };
};
