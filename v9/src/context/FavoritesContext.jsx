import { createContext, useContext, useState, useEffect, useRef } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        // Load from localStorage on initial mount
        const saved = localStorage.getItem('favorites');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return {
                    vouchers: new Set(parsed.vouchers || []),
                    cards: new Set(parsed.cards || []),
                    guides: new Set(parsed.guides || []),
                    articles: new Set(parsed.articles || []),
                    trending: new Set(parsed.trending || []),
                    banking: new Set(parsed.banking || []),
                };
            } catch (e) {
                console.error('Failed to parse favorites from localStorage:', e);
            }
        }
        return {
            vouchers: new Set(),
            cards: new Set(),
            guides: new Set(),
            articles: new Set(),
            trending: new Set(),
            banking: new Set(),
        };
    });

    const [notification, setNotification] = useState({ type: null, show: false });
    const notificationTimeoutRef = useRef(null);

    // Persist to localStorage whenever favorites change
    useEffect(() => {
        const toSave = {
            vouchers: Array.from(favorites.vouchers),
            cards: Array.from(favorites.cards),
            guides: Array.from(favorites.guides),
            articles: Array.from(favorites.articles),
            trending: Array.from(favorites.trending),
            banking: Array.from(favorites.banking),
        };
        localStorage.setItem('favorites', JSON.stringify(toSave));
    }, [favorites]);

    const toggleFavorite = (type, id) => {
        setFavorites(prev => {
            const newSet = new Set(prev[type]);
            if (newSet.has(id)) {
                newSet.delete(id);
                // Optional: We could show a "Removed" notification, but the requirement specifically says "show that fav got added"
            } else {
                newSet.add(id);
                // Show notification when added
                if (notificationTimeoutRef.current) {
                    clearTimeout(notificationTimeoutRef.current);
                }
                setNotification({ type, show: true });
                // Auto-dismiss after 3 seconds
                notificationTimeoutRef.current = setTimeout(() => {
                    setNotification(prev => ({ ...prev, show: false }));
                    notificationTimeoutRef.current = null;
                }, 3000);
            }
            return { ...prev, [type]: newSet };
        });
    };

    const isFavorite = (type, id) => {
        return favorites[type]?.has(id) || false;
    };

    const getFavoriteCount = (type) => {
        if (type) {
            return favorites[type]?.size || 0;
        }
        // Total count across all types
        return Object.values(favorites).reduce((sum, set) => sum + set.size, 0);
    };

    const clearFavorites = (type) => {
        if (type) {
            setFavorites(prev => ({ ...prev, [type]: new Set() }));
        } else {
            setFavorites({
                vouchers: new Set(),
                cards: new Set(),
                guides: new Set(),
                articles: new Set(),
                trending: new Set(),
                banking: new Set(),
            });
        }
    };

    const getFavoriteIds = (type) => {
        return Array.from(favorites[type] || []);
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite,
            getFavoriteCount,
            clearFavorites,
            getFavoriteIds,
            notification, // Expose notification state
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
