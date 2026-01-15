// Static fallback data for guides - fetched from API on load
// API: https://tracker.cheq.dpdns.org/api/v2/pages/?type=guides.GuidePage&fields=_,id,title,intro,body,tags,author,external_link

export const GUIDES_API_URL = 'https://tracker.cheq.dpdns.org/api/v2/pages/?type=guides.GuidePage&fields=_,id,title,intro,body,tags,author,external_link';

export const staticGuides = [
    {
        id: 3,
        title: "From 'Rejected' to 'Card Issued': Winning against HSBC",
        intro: "How I fought a 4-month battle with HSBC and won using the RBI Ombudsman.",
        author: "@vaibhav_lodha",
        external_link: "https://twitter.com/vaibhav_lodha/status/2002687925549690991",
        body: [
            {
                type: "embed",
                value: "<blockquote class=\"twitter-tweet\" data-theme=\"dark\"><p lang=\"en\" dir=\"ltr\">From &quot;Rejected&quot; to &quot;Card Issued&quot;—how I fought a 4-month battle with HSBC_IN and won.</p></blockquote>",
                id: "57582f14-fe0b-473a-a822-54e238f0c240"
            }
        ],
        tags: ["Credit Cards", "Guide", "HSBC", "RBI Ombudsman"]
    },
    {
        id: 4,
        title: "Debit Cards of 2025 💳✨",
        intro: "Thread of threads breaking down practical debit cards usage for 2025.",
        author: "@aree_dinosaur",
        external_link: "https://twitter.com/aree_dinosaur/status/2004073246527049752",
        body: [
            {
                type: "embed",
                value: "<blockquote class=\"twitter-tweet\" data-theme=\"dark\"><p lang=\"en\" dir=\"ltr\">Debit Cards of 2025 💳✨</p></blockquote>",
                id: "c190fb34-ee03-4cd7-92bb-bfe85d0796a4"
            }
        ],
        tags: ["2025", "Debit Cards", "Finance", "Guide"]
    },
    {
        id: 5,
        title: "Axis Atlas Guide 🌏",
        intro: "Comprehensive guide on Axis Atlas credit card devaluation and optimal usage strategies.",
        author: "u/TomorrowAdvanced2749",
        external_link: "https://www.reddit.com/r/CreditCardsIndia/comments/1jl1s6f/axis_atlas_guide/",
        body: [
            {
                type: "embed",
                value: "<blockquote class=\"reddit-embed-bq\">Axis Atlas Guide</blockquote>",
                id: "12f23b95-8c73-43c1-b681-57e5608dfc18"
            }
        ],
        tags: ["Axis Bank", "Credit Cards", "Guide", "Travel"]
    },
    {
        id: 6,
        title: "Diners Club Black (DCB) Metal Guide 💳",
        intro: "Everything you need to know about the HDFC Diners Club Black Metal credit card.",
        author: "u/TomorrowAdvanced2749",
        external_link: "https://www.reddit.com/r/CreditCardsIndia/comments/1jl1s6f/dcb_metal_guide/",
        body: [],
        tags: ["HDFC", "Diners Club", "Credit Cards", "Premium"]
    },
    {
        id: 7,
        title: "HDFC Regalia Gold Guide 👑",
        intro: "Complete breakdown of HDFC Regalia Gold credit card benefits and redemption strategies.",
        author: "u/TomorrowAdvanced2749",
        external_link: "https://www.reddit.com/r/CreditCardsIndia/",
        body: [],
        tags: ["HDFC", "Credit Cards", "Guide", "Rewards"]
    },
    {
        id: 8,
        title: "ICICI Emeralde Private Metal 101 💎",
        intro: "Deep dive into ICICI's ultra-premium Emeralde Private Metal credit card.",
        author: "u/ME_LIKEY_SUGAR",
        external_link: "https://www.reddit.com/r/CreditCardsIndia/",
        body: [],
        tags: ["ICICI", "Credit Cards", "Premium", "Metal"]
    },
    {
        id: 9,
        title: "Maximizing Credit Card Rewards: A Beginner's Guide",
        intro: "Learn the fundamentals of credit card rewards optimization.",
        author: "@creditkeeda",
        external_link: "https://twitter.com/creditkeeda",
        body: [],
        tags: ["Rewards", "Beginners", "Credit Cards", "Guide"]
    },
    {
        id: 10,
        title: "Understanding Forex Markup & International Transactions",
        intro: "Complete guide to forex charges, best cards for international use, and money-saving tips.",
        author: "@cards_wizard",
        external_link: "https://twitter.com/cards_wizard",
        body: [],
        tags: ["Forex", "International", "Travel", "Guide"]
    },
    {
        id: 11,
        title: "Credit Score: Everything You Need to Know",
        intro: "Build, improve, and maintain your credit score with this comprehensive guide.",
        author: "@SavingsSimpl",
        external_link: "https://twitter.com/SavingsSimpl",
        body: [],
        tags: ["Credit Score", "Finance", "Guide", "Beginners"]
    },
    {
        id: 12,
        title: "HDFC Infinia 101 (2025 Edition) ♾️",
        intro: "The ultimate guide to HDFC's flagship credit card - Infinia.",
        author: "u/ME_LIKEY_SUGAR",
        external_link: "https://www.reddit.com/r/CreditCardsIndia/",
        body: [],
        tags: ["HDFC", "Infinia", "Premium", "Guide"]
    }
];

// Helper to get source type from external link
export const getSourceType = (externalLink) => {
    if (!externalLink) return 'article';
    if (externalLink.includes('twitter.com') || externalLink.includes('x.com')) return 'twitter';
    if (externalLink.includes('reddit.com')) return 'reddit';
    return 'article';
};

// Helper to get author display name
export const getAuthorDisplay = (author) => {
    if (!author) return 'Anonymous';
    // Remove @ or u/ prefix for display
    return author.replace(/^[@u\/]+/, '');
};

// Transform API guide to UI format
export const transformGuideForUI = (guide) => {
    const sourceType = getSourceType(guide.external_link);
    return {
        id: guide.id,
        title: guide.title,
        description: guide.intro || '',
        author: guide.author || 'Anonymous',
        authorDisplay: getAuthorDisplay(guide.author),
        externalLink: guide.external_link,
        tags: guide.tags || [],
        body: guide.body || [],
        sourceType,
        // Generate a category from tags
        category: guide.tags?.[0] || 'Guide',
        // Estimate read time based on body content
        readTime: guide.body?.length > 2 ? '8 min read' : '3 min read',
    };
};
