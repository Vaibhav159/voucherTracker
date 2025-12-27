import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favoriteCards, setFavoriteCards] = useState(() => {
        const saved = localStorage.getItem('favoriteCards');
        return saved ? JSON.parse(saved) : [];
    });

    const [favoriteVouchers, setFavoriteVouchers] = useState(() => {
        const saved = localStorage.getItem('favoriteVouchers');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards));
    }, [favoriteCards]);

    useEffect(() => {
        localStorage.setItem('favoriteVouchers', JSON.stringify(favoriteVouchers));
    }, [favoriteVouchers]);

    const toggleFavoriteCard = (cardId) => {
        setFavoriteCards(prev =>
            prev.includes(cardId)
                ? prev.filter(id => id !== cardId)
                : [...prev, cardId]
        );
    };

    const toggleFavoriteVoucher = (voucherId) => {
        setFavoriteVouchers(prev =>
            prev.includes(voucherId)
                ? prev.filter(id => id !== voucherId)
                : [...prev, voucherId]
        );
    };

    const isCardFavorite = (cardId) => favoriteCards.includes(cardId);
    const isVoucherFavorite = (voucherId) => favoriteVouchers.includes(voucherId);

    const clearAllFavorites = () => {
        setFavoriteCards([]);
        setFavoriteVouchers([]);
    };

    return (
        <FavoritesContext.Provider value={{
            favoriteCards,
            favoriteVouchers,
            toggleFavoriteCard,
            toggleFavoriteVoucher,
            isCardFavorite,
            isVoucherFavorite,
            clearAllFavorites,
            totalFavorites: favoriteCards.length + favoriteVouchers.length
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
