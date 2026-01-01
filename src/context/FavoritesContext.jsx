/**
 * FavoritesContext - Enhanced with Toast Notifications
 * 
 * Provides toast feedback for all favorite actions:
 * - Adding/removing card favorites
 * - Adding/removing voucher favorites
 * - Adding/removing guide favorites
 * - Clearing all favorites (with undo)
 */

import { createContext, useContext, useCallback, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../components/UXPolish';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const toast = useToast();

    // Use safe localStorage hook with error handling
    const [favoriteCards, setFavoriteCards] = useLocalStorage('favoriteCards', []);
    const [favoriteVouchers, setFavoriteVouchers] = useLocalStorage('favoriteVouchers', []);
    const [favoriteGuides, setFavoriteGuides] = useLocalStorage('favoriteGuides', []);

    // Track first-time actions for celebration
    const hasShownFirstFavorite = useRef(
        typeof window !== 'undefined' && localStorage.getItem('hasShownFirstFavorite') === 'true'
    );

    // Show first favorite celebration
    const maybeShowFirstFavoriteCelebration = useCallback(() => {
        if (!hasShownFirstFavorite.current) {
            hasShownFirstFavorite.current = true;
            localStorage.setItem('hasShownFirstFavorite', 'true');
            setTimeout(() => {
                toast.info('🎉 Your first favorite! Find all your favorites in the ❤️ menu.', 5000);
            }, 500);
        }
    }, [toast]);

    const toggleFavoriteCard = useCallback((cardId, cardName = 'Card') => {
        const numericId = typeof cardId === 'string' ? parseInt(cardId, 10) : cardId;

        setFavoriteCards(prev => {
            const isRemoving = prev.includes(numericId);
            const newFavorites = isRemoving
                ? prev.filter(id => id !== numericId)
                : [...prev, numericId];

            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(isRemoving ? 30 : [30, 50, 30]);
            }

            // Toast feedback
            if (isRemoving) {
                toast.info(`${cardName} removed from favorites`);
            } else {
                toast.success(`${cardName} added to favorites!`);
                if (prev.length === 0 && favoriteVouchers.length === 0) {
                    maybeShowFirstFavoriteCelebration();
                }
            }

            return newFavorites;
        });
    }, [toast, setFavoriteCards, favoriteVouchers.length, maybeShowFirstFavoriteCelebration]);

    const toggleFavoriteVoucher = useCallback((voucherId, brandName = 'Voucher') => {
        const strId = String(voucherId);

        setFavoriteVouchers(prev => {
            const isRemoving = prev.includes(strId);
            const newFavorites = isRemoving
                ? prev.filter(id => id !== strId)
                : [...prev, strId];

            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(isRemoving ? 30 : [30, 50, 30]);
            }

            // Toast feedback
            if (isRemoving) {
                toast.info(`${brandName} removed from favorites`);
            } else {
                toast.success(`${brandName} added to favorites!`);
                if (prev.length === 0 && favoriteCards.length === 0) {
                    maybeShowFirstFavoriteCelebration();
                }
            }

            return newFavorites;
        });
    }, [toast, setFavoriteVouchers, favoriteCards.length, maybeShowFirstFavoriteCelebration]);

    const toggleFavoriteGuide = useCallback((guideId, guideName = 'Guide') => {
        setFavoriteGuides(prev => {
            const isRemoving = prev.includes(guideId);
            const newFavorites = isRemoving
                ? prev.filter(id => id !== guideId)
                : [...prev, guideId];

            // Toast feedback
            if (isRemoving) {
                toast.info(`${guideName} removed from saved guides`);
            } else {
                toast.success(`${guideName} saved!`);
            }

            return newFavorites;
        });
    }, [toast, setFavoriteGuides]);

    const isCardFavorite = useCallback((cardId) => {
        const numericId = typeof cardId === 'string' ? parseInt(cardId, 10) : cardId;
        return favoriteCards.includes(numericId);
    }, [favoriteCards]);

    const isVoucherFavorite = useCallback((voucherId) => {
        return favoriteVouchers.includes(String(voucherId));
    }, [favoriteVouchers]);

    const isGuideFavorite = useCallback((guideId) => {
        return favoriteGuides.includes(guideId);
    }, [favoriteGuides]);

    const clearAllFavorites = useCallback(() => {
        const total = favoriteCards.length + favoriteVouchers.length + favoriteGuides.length;

        if (total === 0) {
            toast.info('No favorites to clear');
            return;
        }

        // Store for undo
        const backup = {
            cards: [...favoriteCards],
            vouchers: [...favoriteVouchers],
            guides: [...favoriteGuides],
        };

        setFavoriteCards([]);
        setFavoriteVouchers([]);
        setFavoriteGuides([]);

        // Toast with undo - using a workaround since our simple toast doesn't have actions
        toast.warning(`Cleared ${total} favorites`);

        // Store backup for potential manual recovery
        sessionStorage.setItem('favoritesBackup', JSON.stringify(backup));
    }, [toast, favoriteCards, favoriteVouchers, favoriteGuides, setFavoriteCards, setFavoriteVouchers, setFavoriteGuides]);

    // Restore from backup (can be called manually)
    const restoreFavorites = useCallback(() => {
        try {
            const backup = JSON.parse(sessionStorage.getItem('favoritesBackup'));
            if (backup) {
                setFavoriteCards(backup.cards || []);
                setFavoriteVouchers(backup.vouchers || []);
                setFavoriteGuides(backup.guides || []);
                toast.success('Favorites restored!');
                sessionStorage.removeItem('favoritesBackup');
            }
        } catch (e) {
            toast.error('Could not restore favorites');
        }
    }, [toast, setFavoriteCards, setFavoriteVouchers, setFavoriteGuides]);

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
            restoreFavorites,
            totalFavorites: favoriteCards.length + favoriteVouchers.length + favoriteGuides.length
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
