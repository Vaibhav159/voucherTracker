import Fuse from 'fuse.js';

export const createFuse = (data, keys, threshold = 0.4) => {
    const options = {
        keys: keys,
        threshold: threshold,
        ignoreLocation: true,
        includeScore: true,
        useExtendedSearch: true
    };
    return new Fuse(data, options);
};

export const fuzzySearch = (fuse, query) => {
    if (!query) return [];
    return fuse.search(query).map(result => result.item);
};
