import { useMemo } from 'react';
import { useMyCards } from '../context/MyCardsContext';
import smartBuyCardsData from '../data/smartBuyCards.json';

/**
 * useSmartBuySavings - Returns personalized Gyftr savings based on user's wallet cards
 *
 * Checks user's card collection for HDFC cards that have SmartBuy instant voucher benefits.
 * Returns the best (highest) effective rate among all qualifying cards.
 * Defaults to Infinia (16.5%) when no HDFC card is in the wallet.
 *
 * @returns {Object} { bestCard, bestRate, bestCardName, hasSmartBuyCard, allRates }
 */
export const useSmartBuySavings = () => {
    const { myCards } = useMyCards();

    // Default fallback to Infinia when no qualifying HDFC card is found
    const INFINIA_DEFAULT = {
        cardId: 'hdfc-infinia-metal',
        cardName: 'HDFC Infinia Metal Edition',
        shortName: 'Infinia',
        effectiveRate: 16.5,
        effectiveRateStr: '16.5%',
    };

    const result = useMemo(() => {
        const allRates = [];

        // Check user's cards for HDFC SmartBuy eligible cards
        if (myCards && myCards.length > 0) {
            myCards.forEach(card => {
                // Priority 1: Check dynamic data from creditCards.json
                const instantVouchers = card.rewards?.calculator?.smartBuy?.merchants?.instantVouchers;
                if (instantVouchers?.effectiveRate) {
                    const rate = parseFloat(instantVouchers.effectiveRate);
                    if (!isNaN(rate) && rate > 0) {
                        allRates.push({
                            cardId: card.id,
                            cardName: card.name,
                            shortName: getShortName(card.id, card.name),
                            effectiveRate: rate,
                            effectiveRateStr: instantVouchers.effectiveRate,
                        });
                        return;
                    }
                }

                // Priority 2: Check static fallback data
                const staticMatch = smartBuyCardsData.find(s => s.cardId === card.id);
                if (staticMatch) {
                    const rate = parseFloat(staticMatch.effectiveRate);
                    if (!isNaN(rate) && rate > 0) {
                        allRates.push({
                            cardId: card.id,
                            cardName: card.name || staticMatch.cardName,
                            shortName: staticMatch.cardName,
                            effectiveRate: rate,
                            effectiveRateStr: staticMatch.effectiveRate,
                        });
                    }
                }
            });
        }

        // If no qualifying HDFC cards found, default to Infinia
        if (allRates.length === 0) {
            return {
                bestCard: INFINIA_DEFAULT,
                bestRate: INFINIA_DEFAULT.effectiveRate,
                bestCardName: INFINIA_DEFAULT.shortName,
                hasSmartBuyCard: true,
                allRates: [INFINIA_DEFAULT],
            };
        }

        // Sort by effectiveRate descending, pick best
        allRates.sort((a, b) => b.effectiveRate - a.effectiveRate);
        const best = allRates[0];

        return {
            bestCard: best,
            bestRate: best.effectiveRate,
            bestCardName: best.shortName,
            hasSmartBuyCard: true,
            allRates,
        };
    }, [myCards]);

    return result;
};

/**
 * Get a short display name for the card (for the badge)
 */
function getShortName(cardId, fullName) {
    const shortNames = {
        'hdfc-infinia-metal': 'Infinia',
        'hdfc-diners-club-black-metal': 'DCB Metal',
        'hdfc-diners-club-black': 'Diners Black',
        'hdfc-regalia': 'Regalia',
        'hdfc-diners-club-privilege': 'Diners Privilege',
        'hdfc-regalia-gold': 'Regalia Gold',
    };
    return shortNames[cardId] || fullName?.split(' ').slice(-2).join(' ') || 'Card';
}

export default useSmartBuySavings;
