/**
 * Cloudflare Pages Middleware for SEO Injection
 * This intercepts requests for specific routes and injects the correct
 * Title, Description, and OG Image into the HTML before it's sent to the client.
 * This fixes link previews for social bots (Telegram, WhatsApp) that don't run JS.
 */

const META_MAP = {
    '/guides': {
        title: 'Community Guides - Card Perks',
        description: 'Master Credit Cards, Rewards & Savings with our curated community guides.',
        image: 'https://cardperks.xyz/og/og-guides.png'
    },
    '/banking-guides': {
        title: 'Banking Guides - Card Perks',
        description: 'Explore wealth banking tiers and family banking programs at top Indian banks.',
        image: 'https://cardperks.xyz/og/og-banking.png'
    },
    '/compare-banking': {
        title: 'Compare Banking Tiers - Card Perks',
        description: 'Compare wealth banking tiers (Gold, Imperia, Burgundy, etc.) side-by-side.',
        image: 'https://cardperks.xyz/og/og-compare.png'
    },
    '/rewards-calculator': {
        title: 'Credit Card Rewards Calculator - Card Perks',
        description: 'Calculate and compare credit card rewards across spending categories to find your best card.',
        image: 'https://cardperks.xyz/og/og-calculator.png'
    },
    '/points-converter': {
        title: 'Points Converter - Card Perks',
        description: 'Find the best redemption value for your credit card reward points (Miles, Vouchers, Cash).',
        image: 'https://cardperks.xyz/og/og-converter.png'
    },
    '/favorites': {
        title: 'My Favorites - Card Perks',
        description: 'Access your saved credit cards, vouchers, and guides in one place.',
        image: 'https://cardperks.xyz/og/og-favorites.png'
    },
    '/my-cards': {
        title: 'My Wallet - Card Perks',
        description: 'Manage your credit card portfolio, track expenses, and optimize your strategy.',
        image: 'https://cardperks.xyz/og/og-wallet.png'
    },
    '/spend-optimizer': {
        title: 'Spend Optimizer - Card Perks',
        description: 'Enter your monthly spending to get personalized credit card recommendations.',
        image: 'https://cardperks.xyz/og/og-optimizer.png'
    },
    '/milestones': {
        title: 'Milestone Tracker - Card Perks',
        description: 'Track your credit card spending progress towards fee waivers and bonus rewards.',
        image: 'https://cardperks.xyz/og/og-milestones.png'
    },
    '/savings': {
        title: 'Savings Dashboard - Card Perks',
        description: 'Visualize your total savings and rewards across all your credit cards.',
        image: 'https://cardperks.xyz/og/og-savings.png'
    },
    '/ask-ai': {
        title: 'Ask AI - Card Perks',
        description: 'Your personal AI credit card & banking advisor. Get instant answers and recommendations.',
        image: 'https://cardperks.xyz/og/og-ai.png'
    }
};

export const onRequest = async ({ request, next }) => {
    const url = new URL(request.url);
    const response = await next();

    // Only intervene for HTML requests
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
        return response;
    }

    // Check if we have metadata for this path
    // Handle trailing slashes optionally
    const path = url.pathname.replace(/\/$/, '');
    const meta = META_MAP[path];

    if (meta) {
        return new HTMLRewriter()
            .on('title', {
                element(element) {
                    element.setInnerContent(meta.title);
                }
            })
            .on('meta[name="description"]', {
                element(element) {
                    element.setAttribute('content', meta.description);
                }
            })
            .on('meta[property="og:title"]', {
                element(element) {
                    element.setAttribute('content', meta.title);
                }
            })
            .on('meta[property="og:description"]', {
                element(element) {
                    element.setAttribute('content', meta.description);
                }
            })
            .on('meta[property="og:image"]', {
                element(element) {
                    element.setAttribute('content', meta.image);
                }
            })
            .on('meta[property="twitter:title"]', {
                element(element) {
                    element.setAttribute('content', meta.title);
                }
            })
            .on('meta[property="twitter:description"]', {
                element(element) {
                    element.setAttribute('content', meta.description);
                }
            })
            .on('meta[property="twitter:image"]', {
                element(element) {
                    element.setAttribute('content', meta.image);
                }
            })
            .transform(response);
    }

    return response;
};
