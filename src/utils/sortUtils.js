export const PLATFORM_PRIORITY = {
    "Gyftr": 1,
    "Maximize": 2,
    "iShop": 3,
    "MagicPin": 4,
    "SaveSage": 5,
    "Amazon": 6,
};

export const sortPlatforms = (platforms) => {
    if (!platforms) return [];
    return [...platforms].sort((a, b) => {
        const priorityA = PLATFORM_PRIORITY[a.name] || 999;
        const priorityB = PLATFORM_PRIORITY[b.name] || 999;

        // If priority is same (or both unknown), sort alphabetically
        if (priorityA === priorityB) {
            return a.name.localeCompare(b.name);
        }

        return priorityA - priorityB;
    });
};
