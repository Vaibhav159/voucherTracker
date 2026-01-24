import { useState, useEffect } from 'react';
import { creditCards as staticCreditCards } from '../data/creditCards';

const API_URL = 'https://tracker.cheq.dpdns.org/api/credit-cards/';

/**
 * Hook to fetch credit cards from API with static data fallback
 * @returns {Object} { cards, loading, error, isFromApi }
 */
export function useCreditCards() {
    const [cards, setCards] = useState(staticCreditCards);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFromApi, setIsFromApi] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchCards = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();

                if (isMounted && Array.isArray(data) && data.length > 0) {
                    // Transform API data to match expected format
                    const transformedCards = data.map(card => ({
                        ...card,
                        // Ensure image paths work (API returns relative paths)
                        image: card.image?.startsWith('/') ? card.image : `/${card.image}`,
                        // Ensure slug exists
                        slug: card.slug || card.id?.toString(),
                        // Add link field for apply button
                        link: card.applyLink || card.link,
                    }));

                    setCards(transformedCards);
                    setIsFromApi(true);
                }
            } catch (err) {
                console.warn('Failed to fetch credit cards from API, using static data:', err.message);
                if (isMounted) {
                    setError(err);
                    // Keep using static data (already set as initial state)
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCards();

        return () => {
            isMounted = false;
        };
    }, []);

    return { cards, loading, error, isFromApi };
}

export default useCreditCards;
