export const PLATFORM_STYLES = {
    "iShop": {
        logo: "https://d35fe9hjas7aql.cloudfront.net/ishop1.0/prod/shared-ui/v1/assets/images/icons/logo.svg",
        bg: "transparent", // iShop logo is colored, needs white
        padding: "0px"
    },
    "Gyftr": {
        logo: "https://www.gyftr.com/instantvouchers/static/images/logo_gv.svg", // The small G icon often used
        bg: "transparent",
        padding: "0px"
    },
    "MagicPin": {
        logo: "https://cdn.brandfetch.io/idYiJB0V8Y/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667563687342",
        bg: "transparent",
        padding: "0px"
    },
    "Maximize": {
        logo: "https://www.google.com/s2/favicons?domain=www.maximize.money&sz=128",
        bg: "transparent", // Icon has its own background
        padding: "0px"
    },
    "Amazon": {
        logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/amazon-white-icon.svg",
        bg: "#232F3E", // Amazon Dark Blue
        padding: "6px" // Needs padding as it's an icon
    },
    "SaveSage": {
        logo: "https://savesage.club/SaveSage-Symbol-on-Light-Background.png",
        bg: "transparent",
        padding: "0px"
    }
};

// Fallback for getting just the logo URL for backward compatibility if needed elsewhere
export const getPlatformLogo = (name) => {
    // Exact match
    if (PLATFORM_STYLES[name]) return PLATFORM_STYLES[name].logo;

    // Partial Match logic
    const keys = Object.keys(PLATFORM_STYLES);
    const match = keys.find(k => name.includes(k));
    return match ? PLATFORM_STYLES[match].logo : null;
};

export const getPlatformStyle = (name) => {
    if (PLATFORM_STYLES[name]) return PLATFORM_STYLES[name];

    const keys = Object.keys(PLATFORM_STYLES);
    const match = keys.find(k => name.includes(k));
    return match ? PLATFORM_STYLES[match] : { logo: null, bg: '#fff', padding: '4px' };
};
