import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    // Use safe localStorage hook with error handling
    const [favoriteCards, setFavoriteCards] = useLocalStorage('favoriteCards', []);
    const [favoriteVouchers, setFavoriteVouchers] = useLocalStorage('favoriteVouchers', []);
    const [favoriteGuides, setFavoriteGuides] = useLocalStorage('favoriteGuides', []);

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

    const toggleFavoriteGuide = (guideId) => {
        setFavoriteGuides(prev =>
            prev.includes(guideId)
                ? prev.filter(id => id !== guideId)
                : [...prev, guideId]
        );
    };

    const isCardFavorite = (cardId) => favoriteCards.includes(cardId);
    const isVoucherFavorite = (voucherId) => favoriteVouchers.includes(voucherId);
    const isGuideFavorite = (guideId) => favoriteGuides.includes(guideId);

    const clearAllFavorites = () => {
        setFavoriteCards([]);
        setFavoriteVouchers([]);
        setFavoriteGuides([]);
    };

    return (
        <FavoritesContext.Provider value={{
            favoriteCards,
            favoriteVouchers,
            favoriteGuides,
            toggleFavoriteCard,
            toggleFavoriteVoucher,
            toggleFavoriteGuide,
            isCardFavorite,
            isVoucherFavorite,
            isGuideFavorite,
            clearAllFavorites,
            totalFavorites: favoriteCards.length + favoriteVouchers.length + favoriteGuides.length
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
