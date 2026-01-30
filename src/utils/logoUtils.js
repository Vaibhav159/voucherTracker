/**
 * Logo utility functions
 * Handles logo URL processing and provides metadata for styling
 */

/**
 * Checks if a logo URL is from savemax
 * @param {string} logoUrl - The logo URL to check
 * @returns {boolean} - True if the URL is from savemax
 */
export const isSavemaxLogo = (logoUrl) => {
    if (!logoUrl) return false;
    return logoUrl.includes('savemax.s3.ap-south-1.amazonaws.com');
};

/**
 * Gets the appropriate CSS class for a logo based on its source
 * @param {string} logoUrl - The logo URL
 * @returns {string} - CSS class name
 */
export const getLogoClass = (logoUrl) => {
    return isSavemaxLogo(logoUrl) ? 'logo-savemax' : '';
};

/**
 * Gets inline styling for logos that need special handling
 * This is used for logos from sources known to have sizing issues
 * @param {string} logoUrl - The logo URL
 * @returns {object} - Inline styles object
 */
export const getLogoStyle = (logoUrl) => {
    if (isSavemaxLogo(logoUrl)) {
        return {
            objectFit: 'cover', // Use cover instead of contain for small images
            transform: 'scale(1.5)', // Scale up small images
            imageRendering: 'crisp-edges', // Better rendering for scaled images
        };
    }
    return {};
};
