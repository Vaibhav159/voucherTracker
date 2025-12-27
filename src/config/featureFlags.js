// Feature flags configuration
// Set to true to enable a feature, false to hide it

export const featureFlags = {
    // Core features (always enabled)
    home: true,
    voucherTracker: true,

    // Credit card features
    knowYourCards: true,
    compareCards: true,
    cardGuide: true,

    // Tools (can be disabled)
    rewardsCalculator: false,
    pointsConverter: false,
    bankingGuides: false,
    askAI: false,

    // Homepage enhancements
    topDeals: true,
    statsBar: true,

    // Static pages
    guides: true,
};

// Helper to check if a feature is enabled
export const isFeatureEnabled = (featureName) => {
    return featureFlags[featureName] ?? false;
};
