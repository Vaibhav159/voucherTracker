/**
 * MyCardsContext - Enhanced with Toast Notifications
 *
 * Provides toast feedback for card collection actions:
 * - Adding cards to collection
 * - Removing cards
 * - Setting primary cards
 * - Clearing collection
 */

import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCreditCards } from '../hooks/useCreditCards';
import { useToast } from '../components/UXPolish';

const MyCardsContext = createContext();

export const useMyCards = () => {
    const context = useContext(MyCardsContext);
    if (!context) {
        throw new Error('useMyCards must be used within a MyCardsProvider');
    }
    return context;
};

export const MyCardsProvider = ({ children }) => {
    const toast = useToast();
    const { creditCards, loading } = useCreditCards();

    // Persisted state
    const [myCardIds, setMyCardIds] = useLocalStorage('myCards', []);
    const [primaryCards, setPrimaryCards] = useLocalStorage('primaryCards', {});
    const [cardNotes, setCardNotes] = useLocalStorage('cardNotes', {});
    const [cardExpenses, setCardExpenses] = useLocalStorage('cardExpenses', {});

    // Get full card objects for user's cards
    const myCards = useMemo(() => {
        if (loading || !creditCards.length) return [];
        return myCardIds
            .map(id => creditCards.find(c => c.id === id))
            .filter(Boolean);
    }, [myCardIds, creditCards, loading]);

    // Group cards by bank
    const cardsByBank = useMemo(() => {
        const grouped = {};
        myCards.forEach(card => {
            if (!grouped[card.bank]) {
                grouped[card.bank] = [];
            }
            grouped[card.bank].push(card);
        });
        return grouped;
    }, [myCards]);

    // Calculate total annual value estimate
    const totalAnnualValue = useMemo(() => {
        return myCards.reduce((sum, card) => {
            // Priority 1: Use calculator monthly cap from new data
            if (card.rewards?.calculator?.monthlyCap > 0) {
                return sum + (card.rewards.calculator.monthlyCap * 12);
            }
            // Priority 2: Use calculator yearly cap
            if (card.rewards?.calculator?.yearlyCap > 0) {
                return sum + card.rewards.calculator.yearlyCap;
            }

            // Priority 3: Rough estimate based on card tier (Fallback)
            const tierValues = {
                'super-premium': 50000,
                'premium': 25000,
                'mid': 10000,
                'entry': 5000,
            };
            return sum + (tierValues[card.tier] || 5000);
        }, 0);
    }, [myCards]);

    // Calculate total monthly value estimate
    const totalMonthlyValue = useMemo(() => {
        return Math.round(totalAnnualValue / 12);
    }, [totalAnnualValue]);

    // Get recommendations based on gaps
    const recommendations = useMemo(() => {
        const owned = new Set(myCardIds);
        const ownedTiers = new Set(myCards.map(c => c.tier));
        const ownedBanks = new Set(myCards.map(c => c.bank));

        return creditCards
            .filter(card => !owned.has(card.id))

            .filter(card => {
                // Recommend if:
                // 1. It's a different tier than what user has
                // 2. It's from a bank they don't have
                // 3. It complements their collection
                const differentTier = !ownedTiers.has(card.tier);
                const differentBank = !ownedBanks.has(card.bank);
                const isPremium = card.tier === 'super-premium' || card.tier === 'premium';

                return (differentTier && isPremium) || differentBank;
            })
            .slice(0, 6);
    }, [myCardIds, myCards]);

    // Add a card to collection
    const addCard = useCallback((cardId, showToast = true) => {
        const card = creditCards.find(c => c.id === cardId);

        setMyCardIds(prev => {
            if (prev.includes(cardId)) {
                if (showToast) toast.info(`${card?.name || 'Card'} is already in your collection`);
                return prev;
            }

            if (showToast) {
                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate([30, 50, 30]);
                }
                toast.success(`${card?.name || 'Card'} added to your collection!`);
            }

            return [...prev, cardId];
        });
    }, [setMyCardIds, toast]);

    // Remove a card from collection
    const removeCard = useCallback((cardId, showToast = true) => {
        const card = creditCards.find(c => c.id === cardId);

        setMyCardIds(prev => {
            if (!prev.includes(cardId)) return prev;

            if (showToast) {
                toast.info(`${card?.name || 'Card'} removed from collection`);
            }

            return prev.filter(id => id !== cardId);
        });

        // Also remove from primary cards
        setPrimaryCards(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(category => {
                if (updated[category] === cardId) {
                    delete updated[category];
                }
            });
            return updated;
        });
    }, [setMyCardIds, setPrimaryCards, toast]);

    // Check if user has a card
    const hasCard = useCallback((cardId) => {
        return myCardIds.includes(cardId);
    }, [myCardIds]);

    // Set primary card for a category
    const setPrimaryCard = useCallback((category, cardId) => {
        const card = creditCards.find(c => c.id === cardId);

        setPrimaryCards(prev => {
            const updated = { ...prev };
            if (cardId === null) {
                delete updated[category];
                toast.info(`Primary card cleared for ${category}`);
            } else {
                updated[category] = cardId;
                toast.success(`${card?.name || 'Card'} set as primary for ${category}`);
            }
            return updated;
        });
    }, [setPrimaryCards, toast]);

    // Get primary card for a category
    const getPrimaryCard = useCallback((category) => {
        const cardId = primaryCards[category];
        if (!cardId) return null;
        return creditCards.find(c => c.id === cardId);
    }, [primaryCards, creditCards]);

    // Set a note for a card
    const setCardNote = useCallback((cardId, note) => {
        setCardNotes(prev => {
            const updated = { ...prev };
            if (note && note.trim()) {
                updated[cardId] = note.trim();
                toast.success('Note saved');
            } else {
                delete updated[cardId];
            }
            return updated;
        });
    }, [setCardNotes, toast]);

    // Get note for a card
    const getCardNote = useCallback((cardId) => {
        return cardNotes[cardId] || '';
    }, [cardNotes]);

    // ===== EXPENSE TRACKING =====

    // Add an expense to a card
    const addExpense = useCallback((cardId, expense) => {
        const newExpense = {
            ...expense,
            id: crypto.randomUUID(),
        };
        setCardExpenses(prev => {
            const updated = { ...prev };
            if (!updated[cardId]) updated[cardId] = [];
            updated[cardId] = [newExpense, ...updated[cardId]];
            return updated;
        });
        toast.success('Expense added');
        return newExpense;
    }, [setCardExpenses, toast]);

    // Update an expense
    const updateExpense = useCallback((cardId, expenseId, updates) => {
        setCardExpenses(prev => {
            const updated = { ...prev };
            if (!updated[cardId]) return prev;
            updated[cardId] = updated[cardId].map(exp =>
                exp.id === expenseId ? { ...exp, ...updates } : exp
            );
            return updated;
        });
        toast.success('Expense updated');
    }, [setCardExpenses, toast]);

    // Delete an expense
    const deleteExpense = useCallback((cardId, expenseId) => {
        setCardExpenses(prev => {
            const updated = { ...prev };
            if (!updated[cardId]) return prev;
            updated[cardId] = updated[cardId].filter(exp => exp.id !== expenseId);
            if (updated[cardId].length === 0) delete updated[cardId];
            return updated;
        });
        toast.info('Expense deleted');
    }, [setCardExpenses, toast]);

    // Get expenses for a card
    const getExpenses = useCallback((cardId) => {
        return cardExpenses[cardId] || [];
    }, [cardExpenses]);

    // Get total spend for a card
    const getCardTotalSpend = useCallback((cardId) => {
        const expenses = cardExpenses[cardId] || [];
        return expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
    }, [cardExpenses]);

    // Clear all cards
    const clearAllCards = useCallback(() => {
        if (myCardIds.length === 0) {
            toast.info('No cards to clear');
            return;
        }

        const count = myCardIds.length;

        // Backup for recovery
        sessionStorage.setItem('myCardsBackup', JSON.stringify({
            ids: myCardIds,
            primary: primaryCards,
            notes: cardNotes,
        }));

        setMyCardIds([]);
        setPrimaryCards({});
        setCardNotes({});

        toast.warning(`Removed ${count} card${count !== 1 ? 's' : ''} from collection`);
    }, [myCardIds, primaryCards, cardNotes, setMyCardIds, setPrimaryCards, setCardNotes, toast]);

    // Restore from backup
    const restoreCards = useCallback(() => {
        try {
            const backup = JSON.parse(sessionStorage.getItem('myCardsBackup'));
            if (backup) {
                setMyCardIds(backup.ids || []);
                setPrimaryCards(backup.primary || {});
                setCardNotes(backup.notes || {});
                toast.success('Cards restored!');
                sessionStorage.removeItem('myCardsBackup');
            }
        } catch (e) {
            toast.error('Could not restore cards');
        }
    }, [setMyCardIds, setPrimaryCards, setCardNotes, toast]);

    return (
        <MyCardsContext.Provider value={{
            myCards,
            myCardIds,
            cardsByBank,
            totalAnnualValue,
            totalMonthlyValue,
            recommendations,
            addCard,
            removeCard,
            hasCard,
            setPrimaryCard,
            getPrimaryCard,
            setCardNote,
            getCardNote,
            clearAllCards,
            restoreCards,
            addExpense,
            updateExpense,
            deleteExpense,
            getExpenses,
            getCardTotalSpend,
        }}>
            {children}
        </MyCardsContext.Provider>
    );
};

export default MyCardsContext;
