// Feature flags configuration
// Set to true to enable a feature, false to hide it

// Helper to check for URL overrides
const getUrlOverride = (param) => {
    if (typeof window === 'undefined') return null;

    // 1. Check standard URL query string (?api=true#/)
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has(param)) return searchParams.get(param);

    // 2. Check Hash URL query string (#/page?api=true)
    if (window.location.hash.includes('?')) {
        const hashSearch = window.location.hash.split('?')[1];
        const hashParams = new URLSearchParams(hashSearch);
        if (hashParams.has(param)) return hashParams.get(param);
    }

    return null;
};

// Base flags
const baseFlags = {
    // Core features (always enabled)
    home: true,
    voucherTracker: true,
    useBackendApi: false, // Master switch for backend API, default OFF
    useGuidesApi: false,
    useCreditCardsApi: false,

    // Credit card features
    knowYourCards: true,
    compareCards: true,
    cardGuide: true,

    // Tools (can be disabled)
    rewardsCalculator: true,
    pointsConverter: true,
    bankingGuides: true,
    askAI: true,

    // Homepage enhancements
    topDeals: true,
    statsBar: true,

    // Static pages
    guides: true,
};

// Apply overrides
const apiOverride = getUrlOverride('api'); // ?api=true or ?api=1

export const featureFlags = {
    ...baseFlags,
    // If ?api=true, force enable all API flags
    useBackendApi: apiOverride === 'true' || apiOverride === '1' ? true : baseFlags.useBackendApi,
    useGuidesApi: apiOverride === 'true' || apiOverride === '1' ? true : baseFlags.useGuidesApi,
    useCreditCardsApi: apiOverride === 'true' || apiOverride === '1' ? true : baseFlags.useCreditCardsApi,
};

// Helper to check if a feature is enabled
export const isFeatureEnabled = (featureName) => {
    return featureFlags[featureName] ?? false;
};
