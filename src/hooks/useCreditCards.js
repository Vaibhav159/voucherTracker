import { useState, useEffect } from 'react';
import { featureFlags } from '../config/featureFlags';
// We need to import creditCards from creditCards.js
// Note: creditCards.js has named export 'creditCards'
import localCreditCards from '../data/creditCards.json';

// Simple in-memory cache
const cache = {
    data: null,
    promise: null,
    timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper to convert new features object to array of strings for display
const extractFeaturesArray = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) return features; // Already an array (old format)

    const result = [];

    // Extract lounge access
    if (features.lounge) {
        if (features.lounge.domestic && features.lounge.domestic !== 'None') {
            result.push(`Domestic Lounge: ${features.lounge.domestic}`);
        }
        if (features.lounge.international && features.lounge.international !== 'None') {
            result.push(`International Lounge: ${features.lounge.international}`);
        }
    }

    // Extract forex markup
    if (features.forex) {
        if (features.forex.markup === 0) {
            result.push('Zero Forex Markup');
        } else if (features.forex.text) {
            result.push(`Forex Markup: ${features.forex.text}`);
        }
    }

    // Extract fuel surcharge
    if (features.fuel && features.fuel.surchargeWaiver) {
        result.push(`Fuel Surcharge Waiver: ${features.fuel.surchargeWaiver} (up to ₹${features.fuel.cap || 'N/A'})`);
    }

    // Extract golf benefits
    if (features.golf && features.golf.included) {
        result.push(features.golf.text || 'Golf privileges included');
    }

    // Extract movie benefits
    if (features.movies && features.movies.included) {
        result.push(features.movies.text || 'Movie benefits included');
    }

    // Extract milestone benefits
    if (features.milestones && features.milestones.length > 0) {
        features.milestones.forEach(m => {
            result.push(`Milestone: ₹${(m.spend / 100000).toFixed(0)}L spend → ${m.benefit}`);
        });
    }

    return result;
};

// Transform new credit card data structure to match component expectations
const transformCreditCard = (card) => {
    // If card already has the old flat structure (annualFee as string), skip transformation
    if (typeof card.annualFee === 'string' && Array.isArray(card.features)) {
        return card;
    }

    // Extract annual fee from nested structure
    const annualFee = card.fees?.annual !== undefined && card.fees?.annual !== null
        ? (card.fees.annual === 0 ? 'Lifetime Free' : `₹${card.fees.annual.toLocaleString('en-IN')}`)
        : 'N/A';

    // Extract joining fee
    const joiningFee = card.fees?.joining !== undefined
        ? (card.fees.joining === 0 ? 'Free' : `₹${card.fees.joining.toLocaleString('en-IN')}`)
        : annualFee;

    // Extract reward rate
    const rewardRate = card.rewards?.earningText ||
        (card.rewards?.baseRate ? `${(card.rewards.baseRate * 100).toFixed(1)}%` : 'Varies');

    // Extract forex markup
    const fxMarkup = card.features?.forex?.text ||
        (card.features?.forex?.markup !== undefined ? `${card.features.forex.markup * 100}%` : '3.5%');

    // Convert features object to array
    const featuresArray = extractFeaturesArray(card.features);

    // Extract tags from metadata
    const tags = card.metadata?.tags || [];

    // Extract best for
    const bestFor = card.metadata?.bestFor || '';

    // Extract tier from calculator
    const tier = card.rewards?.calculator?.tier ||
        (tags.some(t => t.toLowerCase().includes('super-premium')) ? 'super-premium' :
            tags.some(t => t.toLowerCase().includes('premium')) ? 'premium' : 'entry');

    // Extract reward type
    const rewardType = card.rewards?.type || 'points';

    // Extract category from tags
    const category = tags.find(t => ['Travel', 'Cashback', 'Premium', 'Shopping', 'Dining', 'Fuel', 'Co-branded'].includes(t)) || '';

    // Extract portals for highlighting
    const portals = card.rewards?.calculator?.portals || [];
    let multiplierBadge = null;
    if (portals.length > 0) {
        // Find max rate
        const maxRate = Math.max(...portals.map(p => p.rate));
        const maxRatePercentage = (maxRate * 100).toFixed(0);

        // Find the best portal
        const bestPortal = portals.find(p => p.rate === maxRate);
        const namePart = bestPortal.name.replace('SmartBuy ', '').split(' ')[0]; // "Flights/Hotels" -> "Flights"

        // Try to parse "10X" from label
        const multiplierMatch = bestPortal.label.match(/(\d+X)/i);
        const xVal = multiplierMatch ? multiplierMatch[0] : `${maxRatePercentage}%`;

        multiplierBadge = `🚀 ${xVal} on ${namePart}`;
    }

    return {
        ...card,
        multiplierBadge,
        // Ensure slug exists (fall back to id if missing from source)
        slug: card.slug || card.id,
        // Flatten commonly accessed fields for backward compatibility
        annualFee,
        joiningFee,
        rewardRate,
        fxMarkup,
        features: featuresArray,
        tags,
        bestFor,
        tier,
        rewardType,
        category,
        // Keep original nested data for components that need it
        _originalFees: card.fees,
        _originalFeatures: card.features,
        _originalRewards: card.rewards,
        _originalMetadata: card.metadata,
    };
};

export const useCreditCards = (options = {}) => {
    const { enabled = true } = options;
    const [creditCards, setCreditCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!enabled) {
            setLoading(false);
            return;
        }

        const fetchCreditCards = async () => {
            // Check feature flag first
            if (!featureFlags.useBackendApi || !featureFlags.useCreditCardsApi) {
                // Transform all cards to ensure compatibility
                const transformedCards = localCreditCards.map(transformCreditCard);
                setCreditCards(transformedCards);
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

            // Check if fetch in progress
            if (cache.promise) {
                try {
                    const data = await cache.promise;
                    setCreditCards(data);
                } catch (err) {
                    console.error("Error waiting for shared credit cards fetch:", err);
                    const transformedCards = localCreditCards.map(transformCreditCard);
                    setCreditCards(transformedCards);
                } finally {
                    setLoading(false);
                }
                return;
            }

            // Start new fetch
            cache.promise = (async () => {
                try {
                    const response = await fetch('/api/credit-cards/');
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
                        const transformedCards = localCreditCards.map(transformCreditCard);
                        cache.data = transformedCards;
                        cache.timestamp = Date.now();
                        return transformedCards;
                    } else {
                        const transformedCards = processedData.map(transformCreditCard);
                        cache.data = transformedCards;
                        cache.timestamp = Date.now();
                        return transformedCards;
                    }

                } catch (err) {
                    cache.promise = null;
                    throw err;
                }
            })();

            try {
                const data = await cache.promise;
                setCreditCards(data);
            } catch (err) {
                console.error('Error fetching credit cards:', err);
                const transformedCards = localCreditCards.map(transformCreditCard);
                setCreditCards(transformedCards);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCreditCards();
    }, [enabled]);

    return { creditCards, loading, error };
};
