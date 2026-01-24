// Static vouchers data - Used as fallback when API is unavailable
// API endpoint: https://tracker.cheq.dpdns.org/api/vouchers/

export const voucherCategories = [
    'All',
    'Shopping',
    'Food',
    'Fashion',
    'Entertainment',
    'Travel',
    'Grocery',
    'Electronics',
    'Health & Wellness',
    'Dining & Food',
    'Fashion & Accessories',
    'Travel & Leisure',
    'E-commerce & Technology',
    'Groceries & Essentials',
    'Entertainment & OTT',
    'Home & Living',
    'Jewellery',
    'Beauty & Personal Care',
    'Books & Stationery',
    'Gaming',
    'Sports & Fitness',
    'Miscellaneous',
    'New',
];

export const staticVouchers = [
    {
        id: "1",
        brand: "Amazon Shopping Voucher",
        logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png",
        category: "Shopping",
        site: "https://amzn.to/4ayHWbo",
        platforms: [
            { name: "iShop", cap: "10k/month", fee: "Discount ~18%", denominations: ["500", "1000", "2000"], link: "https://ishop.reward360.in/", color: "#232F3E" },
            { name: "Gyftr", cap: "10k/month", fee: "Discount ~16.25%", denominations: ["250", "500", "1000"], link: "https://www.gyftr.com/instantvouchers/amazon-shopping-voucher-gift-vouchers", color: "#D42426" },
            { name: "MagicPin", cap: "Check App", fee: "Discount ~5%", denominations: ["Check Link"], link: "https://magicpin.in/walletRecharge/?merchantId=3402658", color: "#7000ff" },
            { name: "SaveSage", cap: "Check App", fee: "Discount ~1.8%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "1.75% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Amazon/25", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "2",
        brand: "Flipkart Gift Card",
        logo: "https://savemax.s3.ap-south-1.amazonaws.com/app/logo/v1/flipkart.png",
        category: "Shopping",
        site: "https://fktr.in/s6py76D",
        platforms: [
            { name: "Gyftr", cap: "5k/month", fee: "Discount 1%", denominations: ["500", "1000"], link: "https://www.gyftr.com/instantvouchers/flipkart-gift-vouchers", color: "#2874F0" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 1%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "1.9% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Flipkart/203", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "3",
        brand: "Swiggy Money",
        logo: "https://cdn2.gyftr.com/common/logo/344.png",
        category: "Food",
        site: "https://www.swiggy.com",
        platforms: [
            { name: "Gyftr", cap: "10k/month", fee: "None", denominations: ["Check Link"], link: "https://www.gyftr.com/instantvouchers/swiggy-gv-gift-vouchers", color: "#D42426" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "Maximize", cap: "No Cap", fee: "3.25% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Swiggy/536", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "4",
        brand: "Zomato",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg",
        category: "Food",
        site: "https://www.zomato.com",
        platforms: [
            { name: "Gyftr", cap: "10k/month", fee: "None", denominations: ["500", "1000", "2000"], link: "https://www.gyftr.com/instantvouchers/zomato-gift-card-gift-vouchers", color: "#D42426" },
            { name: "MagicPin", cap: "Check App", fee: "Discount 5%", denominations: ["Check Link"], link: "https://magicpin.in/walletRecharge/?merchantId=4924499", color: "#7000ff" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 2.25%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "3% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Zomato/783", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "5",
        brand: "PVR",
        logo: "https://cdn2.gyftr.com/common/logo/60.png",
        category: "Entertainment",
        site: "https://www.pvrcinemas.com",
        platforms: [
            { name: "Gyftr", cap: "12.5k/month", fee: "Discount 7.5%", denominations: ["500", "1000"], link: "https://www.gyftr.com/instantvouchers/pvr-gift-vouchers", color: "#ffd700" },
            { name: "Maximize", cap: "Unlimited", fee: "Discount 21%", denominations: ["Any"], link: "https://www.maximize.money/", color: "#1c1c1c" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 12%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "6",
        brand: "Uber",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
        category: "Travel",
        site: "https://www.uber.com",
        platforms: [
            { name: "Gyftr", cap: "10k/month", fee: "None", denominations: ["250", "500"], link: "https://www.gyftr.com/instantvouchers/uber-gift-vouchers", color: "#000000" },
            { name: "MagicPin", cap: "Check App", fee: "Discount 5%", denominations: ["Check Link"], link: "https://magicpin.in/walletRecharge/?merchantId=4729943", color: "#7000ff" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 4%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "4.35% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Uber/802", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "7",
        brand: "BigBasket",
        logo: "https://cdn2.gyftr.com/common/logo/44.png",
        category: "Grocery",
        site: "https://www.bigbasket.com",
        platforms: [
            { name: "Gyftr", cap: "10k/month", fee: "None", denominations: ["500", "1000"], link: "https://www.gyftr.com/instantvouchers/bigbasket-gift-vouchers", color: "#84c225" },
            { name: "MagicPin", cap: "Check App", fee: "Discount 5%", denominations: ["Check Link"], link: "https://magicpin.in/walletRecharge/?merchantId=4972690", color: "#7000ff" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 4.5%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "3.75% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Bigbasket/342", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "8",
        brand: "Blinkit",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg",
        category: "Grocery",
        site: "https://blinkit.com",
        platforms: [
            { name: "Gyftr", cap: "5k/month", fee: "Discount 5%", denominations: ["250", "500"], link: "https://www.gyftr.com/blinkit", color: "#F8CB46" },
            { name: "MagicPin", cap: "Check App", fee: "Discount 5%", denominations: ["Check Link"], link: "https://magicpin.in/walletRecharge/?merchantId=4376387", color: "#7000ff" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 2.5%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "3.75% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Blinkit/782", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "9",
        brand: "Dominos",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Domino's_pizza_logo.svg",
        category: "Food",
        site: "https://pizzaonline.dominos.co.in",
        platforms: [
            { name: "Gyftr", cap: "5k/month", fee: "Discount 7.5%", denominations: ["250", "500"], link: "https://www.gyftr.com/dominos", color: "#006491" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "Maximize", cap: "No Cap", fee: "19% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Dominos/507", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "10",
        brand: "Myntra",
        logo: "https://lh3.googleusercontent.com/e1FojZJYqqvanJ4BXfla7gmWhFy50fJrziavDpdtB5_mm1l8JEWTXvc3Ujfpt9YDJ1wXG-ER761uIWNkrdgHvNkKKcrJgb67JtDh5Vo",
        category: "Fashion",
        site: "https://myntr.it/qtsjD3l",
        platforms: [
            { name: "Gyftr", cap: "15k/month", fee: "Discount 1%", denominations: ["500", "2000"], link: "https://www.gyftr.com/instantvouchers/myntra-gift-vouchers", color: "#ff3f6c" },
            { name: "MagicPin", cap: "Check App", fee: "Discount 5%", denominations: ["Check Link"], link: "https://magicpin.in/walletRecharge/?merchantId=5302129", color: "#7000ff" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "Maximize", cap: "No Cap", fee: "4.25% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Myntra/429", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "11",
        brand: "Levi's",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Levi%27s_logo.svg",
        category: "Fashion",
        site: "https://www.levi.in",
        platforms: [
            { name: "Gyftr", cap: "5k/month", fee: "None", denominations: ["500", "2000"], link: "https://www.gyftr.com/instantvouchers/levis-gift-vouchers", color: "#c41230" },
            { name: "Maximize", cap: "Unlimited", fee: "None", denominations: ["Any"], link: "https://www.maximize.money/", color: "#1c1c1c" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 10%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "12",
        brand: "Reliance Trends",
        logo: "https://savemax.s3.ap-south-1.amazonaws.com/app/logo/v1/Reliance Trends E-Gift Voucher.png",
        category: "Fashion",
        site: "https://ajiio.in/8N3suhS",
        platforms: [
            { name: "Gyftr", cap: "5k/month", fee: "Discount 10%", denominations: ["500", "1000"], link: "https://www.gyftr.com/trends", color: "#178e47" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 5.5%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "5.5% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Reliance Trends/575", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "13",
        brand: "Ajio",
        logo: "https://images.seeklogo.com/logo-png/34/1/ajio-logo-png_seeklogo-348946.png",
        category: "Fashion",
        site: "https://ajiio.in/8N3suhS",
        platforms: [
            { name: "Gyftr", cap: "10k/month", fee: "None", denominations: ["500", "2000"], link: "https://www.gyftr.com/instantvouchers/ajio-gift-vouchers", color: "#2c4152" },
            { name: "MagicPin", cap: "Check App", fee: "Discount 5%", denominations: ["Check Link"], link: "https://magicpin.in/walletRecharge/?merchantId=5302055", color: "#7000ff" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 7.2%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "7% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Ajio/416", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "14",
        brand: "Reliance Digital",
        logo: "https://images.seeklogo.com/logo-png/37/1/reliance-digital-logo-png_seeklogo-373459.png",
        category: "Electronics",
        site: "https://www.reliancedigital.in",
        platforms: [
            { name: "Gyftr", cap: "25k/month", fee: "None", denominations: ["1000", "5000"], link: "https://www.gyftr.com/instantvouchers/reliance-digital-gift-vouchers", color: "#e31e24" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "Maximize", cap: "No Cap", fee: "4% OFF", denominations: [], link: "https://www.maximize.money/gift-cards/Reliance/671", color: "" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "15",
        brand: "Croma",
        logo: "https://savemax.s3.ap-south-1.amazonaws.com/app/logo/v1/Croma.png",
        category: "Electronics",
        site: "https://www.croma.com",
        platforms: [
            { name: "Gyftr", cap: "10k/month", fee: "None", denominations: ["Check Link"], link: "https://www.gyftr.com/instantvouchers/croma-gift-vouchers", color: "#D42426" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 3%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "2.75% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Croma/220", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "16",
        brand: "MakeMyTrip",
        logo: "https://savemax.s3.ap-south-1.amazonaws.com/giftcard/logo/v2/MmtWeddingsLogo.png",
        category: "Travel",
        site: "https://www.makemytrip.com",
        platforms: [
            { name: "Maximize", cap: "Unlimited", fee: "Discount 12%", denominations: ["Any"], link: "https://www.maximize.money/", color: "#1c1c1c" },
            { name: "MagicPin", cap: "Check App", fee: "Discount 5%", denominations: ["Check Link"], link: "https://magicpin.in/walletRecharge/?merchantId=3314200", color: "#7000ff" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 7.8%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "17",
        brand: "KFC",
        logo: "https://images.seeklogo.com/logo-png/17/1/kfc-logo-png_seeklogo-176326.png",
        category: "Food",
        site: "https://online.kfc.co.in",
        platforms: [
            { name: "Gyftr", cap: "2.5k/month", fee: "None", denominations: ["250", "500"], link: "https://www.gyftr.com/instantvouchers/kfc-gift-vouchers", color: "#a3080c" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 5.75%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "6.25% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/KFC/811", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "18",
        brand: "JioHotstar",
        logo: "https://savemax.s3.ap-south-1.amazonaws.com/app/logo/v1/JioHotstar.png",
        category: "Entertainment",
        site: "https://www.hotstar.com",
        platforms: [
            { name: "Gyftr", cap: "10k/month", fee: "Discount 2.5%", denominations: ["Check Link"], link: "https://www.gyftr.com/instantvouchers/jio-hotstar-gift-vouchers", color: "#D42426" },
            { name: "MagicPin", cap: "Check App", fee: "Discount 5%", denominations: ["Check Link"], link: "https://magicpin.in/walletRecharge/?merchantId=8429994", color: "#7000ff" },
            { name: "Maximize", cap: "No Cap", fee: "8.5% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/JioHotstar/303", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "19",
        brand: "Nykaa",
        logo: "https://savemax.s3.ap-south-1.amazonaws.com/app/logo/v1/nykaa.png",
        category: "Fashion",
        site: "https://www.nykaa.com",
        platforms: [
            { name: "Gyftr", cap: "10k/month", fee: "None", denominations: ["Check Link"], link: "https://www.gyftr.com/instantvouchers/nykaa-gift-vouchers", color: "#D42426" },
            { name: "iShop", cap: "Check Site", fee: "Discount ~18%", denominations: ["Check Site"], link: "https://ishop.reward360.in/", color: "#f37e20" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 6%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "6.75% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/Nykaa/657", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    },
    {
        id: "20",
        brand: "BookMyShow",
        logo: "https://savemax.s3.ap-south-1.amazonaws.com/app/logo/v1/BookMyShow Instant Voucher.png",
        category: "Entertainment",
        site: "https://in.bookmyshow.com",
        platforms: [
            { name: "MagicPin", cap: "Check App", fee: "Discount 5%", denominations: ["Check Link"], link: "https://magicpin.in/walletRecharge/?merchantId=1355791", color: "#7000ff" },
            { name: "SaveSage", cap: "Check App", fee: "Discount 4%", denominations: ["Check App"], link: "https://savesage.club/", color: "#8B5CF6" },
            { name: "Maximize", cap: "No Cap", fee: "3.75% OFF", denominations: ["Any"], link: "https://www.maximize.money/gift-cards/BookMyShow/375", color: "#1c1c1c" }
        ],
        lastUpdated: "2025-12-31",
        expiry_date: "365"
    }
];

// Helper function to extract best discount from platforms
export function getBestDiscount(platforms) {
    if (!platforms || platforms.length === 0) return '0%';

    let bestDiscount = 0;

    platforms.forEach(platform => {
        const fee = platform.fee || '';
        // Extract numeric discount from strings like "Discount ~18%", "1.75% OFF", "None"
        const match = fee.match(/(\d+\.?\d*)\s*%/);
        if (match) {
            const discount = parseFloat(match[1]);
            if (discount > bestDiscount) {
                bestDiscount = discount;
            }
        }
    });

    return bestDiscount > 0 ? `${bestDiscount}%` : 'Varies';
}

// Helper function to format denominations for display
export function getDenominationsRange(platforms) {
    if (!platforms || platforms.length === 0) return 'Check Platform';

    const allDenominations = [];
    platforms.forEach(platform => {
        if (platform.denominations && Array.isArray(platform.denominations)) {
            platform.denominations.forEach(d => {
                const num = parseInt(d);
                if (!isNaN(num)) {
                    allDenominations.push(num);
                }
            });
        }
    });

    if (allDenominations.length === 0) return 'Check Platform';

    const min = Math.min(...allDenominations);
    const max = Math.max(...allDenominations);

    if (min === max) return `₹${min}`;
    return `₹${min} - ₹${max}`;
}

// Normalize voucher data from API to match expected format
export function normalizeVoucher(voucher) {
    return {
        id: voucher.id,
        name: voucher.brand,
        brand: voucher.brand,
        category: voucher.category,
        logo: voucher.logo,
        site: voucher.site,
        platforms: voucher.platforms || [],
        lastUpdated: voucher.lastUpdated,
        expiry_date: voucher.expiry_date,
        rate: getBestDiscount(voucher.platforms),
        value: getDenominationsRange(voucher.platforms),
        description: voucher.category,
    };
}
