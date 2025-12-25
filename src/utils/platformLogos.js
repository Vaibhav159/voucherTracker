export const PLATFORM_LOGOS = {
    "iShop": "https://ishop.reward360.in/assets/images/logo.svg",
    "Gyftr": "https://www.gyftr.com/instantvouchers/static/images/logo_gv.svg",
    "MagicPin": "https://static.magicpin.com/samara/static/images/logo-v1.svg",
    "Maximize": "https://savemax.s3.ap-south-1.amazonaws.com/website/maximize_new_logo.png", // Fallback/Guess
    "Amazon": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "SaveSage": "https://savesage.club/SaveSage-Symbol-on-Light-Background.png",
};

export const getPlatformLogo = (name) => {
    // Exact match
    if (PLATFORM_LOGOS[name]) return PLATFORM_LOGOS[name];
    // Partial Match (e.g. "Amazon Shopping" -> "Amazon")
    const keys = Object.keys(PLATFORM_LOGOS);
    const match = keys.find(k => name.includes(k));
    return match ? PLATFORM_LOGOS[match] : null;
};
