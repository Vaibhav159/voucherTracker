export const PLATFORM_STYLES = {
    "iShop": {
        logo: "https://d35fe9hjas7aql.cloudfront.net/ishop1.0/prod/shared-ui/v1/assets/images/icons/logo.svg",
        bg: "transparent",
        padding: "0px"
    },
    "Gyftr": {
        logo: "https://www.gyftr.com/instantvouchers/static/images/logo_gv.svg",
        bg: "#1a1a2e",
        padding: "8px"
    },
    "MagicPin": {
        logo: "https://cdn.brandfetch.io/idYiJB0V8Y/w/400/h/400/theme/dark/icon.jpeg",
        bg: "transparent",
        padding: "0px"
    },
    "Maximize": {
        logo: "/maximize-logo.jpg",
        bg: "#22c55e",
        padding: "10px"
    },
    "Amazon": {
        logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
        bg: "#232F3E",
        padding: "10px"
    },
    "SaveSage": {
        logo: "https://savesage.club/SaveSage-Symbol-on-Light-Background.png",
        bg: "transparent",
        padding: "0px"
    },
    "SmartBuy": {
        logo: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/2f4a447d-ea24-4847-a498-99c3e1b3dbdb/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Card%20Benefits/smartbuy.svg",
        bg: "#004c8f",
        padding: "8px"
    },
    "GrabDeals": {
        logo: null,
        bg: "#97144d",
        padding: "8px"
    }
};

// Get platform style with smart fallbacks
export const getPlatformStyle = (name) => {
    // Exact match
    if (PLATFORM_STYLES[name]) return PLATFORM_STYLES[name];

    // Partial match (case-insensitive)
    const keys = Object.keys(PLATFORM_STYLES);
    const match = keys.find(k => name.toLowerCase().includes(k.toLowerCase()));
    if (match) return PLATFORM_STYLES[match];

    // Generate a fallback with gradient background
    const colors = [
        "linear-gradient(135deg, #6366f1, #8b5cf6)",
        "linear-gradient(135deg, #f43f5e, #ec4899)",
        "linear-gradient(135deg, #10b981, #059669)",
        "linear-gradient(135deg, #f59e0b, #d97706)",
        "linear-gradient(135deg, #3b82f6, #2563eb)",
    ];
    const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);

    return {
        logo: null,
        bg: colors[hash % colors.length],
        padding: '8px'
    };
};

// Fallback for getting just the logo URL
export const getPlatformLogo = (name) => {
    const style = getPlatformStyle(name);
    return style.logo;
};
