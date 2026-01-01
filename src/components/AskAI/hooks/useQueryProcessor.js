/**
 * useQueryProcessor Hook
 * Orchestrates intent recognition and response generation
 */

import { useCallback, useMemo } from 'react';
import { recognizeIntent, extractAmount } from '../processors/intentRecognizer';
import {
  searchCards,
  compareCards,
  getCardsForPlatform,
  getSpendingRecommendations,
} from '../processors/cardProcessor';
import {
  searchVouchers,
  filterVouchersByCategory,
  filterVouchersByPlatform,
} from '../processors/voucherProcessor';
import {
  getComboRecommendation,
  getPlatformCardRecommendation,
} from '../processors/comboProcessor';
import {
  generateWealthTierResponse,
  generateEligibilityResponse,
  generateFamilyBankingResponse,
  parseNRV,
} from '../processors/bankingProcessor';
import {
  buildCardSearchResponse,
  buildComparisonResponse,
  buildVoucherSearchResponse,
  buildComboResponse,
  buildPlatformResponse,
  buildSpendingResponse,
  buildGreetingResponse,
  buildHelpResponse,
  buildErrorResponse,
  buildFallbackResponse,
  generateFollowUps,
} from '../processors/responseGenerator';

/**
 * Custom hook for processing user queries
 */
export const useQueryProcessor = ({ creditCards, vouchers, wealthBanking, familyBanking }) => {
  /**
   * Process a user query and return a response
   */
  const processQuery = useCallback(
    (query) => {
      if (!query || typeof query !== 'string') {
        return buildFallbackResponse('');
      }

      try {
        // Step 1: Recognize intent
        const { intent, entities, confidence } = recognizeIntent(query);

        // Step 2: Process based on intent
        switch (intent) {
          case 'GREETING':
            return buildGreetingResponse({
              cardCount: creditCards?.length,
              voucherCount: vouchers?.length,
              bankCount: Object.keys(wealthBanking || {}).length,
            });

          case 'HELP':
            return buildHelpResponse();

          case 'CARD_COMPARISON': {
            const { card1, card2 } = entities;
            if (card1 && card2) {
              const result = compareCards(creditCards, card1, card2);
              return buildComparisonResponse(result);
            }
            return buildFallbackResponse(query);
          }

          case 'CARD_SEARCH':
          case 'GENERAL_CARD_SEARCH': {
            const searchTerm = entities.category || query;
            const result = searchCards(creditCards, searchTerm, { limit: 6 });
            return buildCardSearchResponse(result);
          }

          case 'CARD_INFO': {
            const { cardName } = entities;
            const result = searchCards(creditCards, cardName, { limit: 1 });
            if (result.cards.length > 0) {
              const card = result.cards[0];
              return {
                content: `## 💳 ${card.name}

**Bank:** ${card.bank}
**Annual Fee:** ${card.annualFee}
**Best For:** ${card.bestFor}
**Reward Rate:** ${card.rewardRate || 'Check bank'}
**Forex Markup:** ${card.fxMarkup || 'Standard'}

**Key Features:**
${(card.features || []).slice(0, 5).map((f) => `- ${f}`).join('\n')}

**Verdict:** ${card.verdict || 'A solid choice for ' + (card.bestFor || 'general use')}`,
                cards: [card],
                followUps: generateFollowUps('CARD_INFO', { cards: [card] }),
              };
            }
            return buildCardSearchResponse({ cards: [], query: cardName, totalFound: 0 });
          }

          case 'COMBO_RECOMMENDATION': {
            const { brand } = entities;
            if (brand) {
              const result = getComboRecommendation(vouchers, creditCards, brand);
              if (result) {
                return buildComboResponse(result);
              }
            }
            // Fall back to general combo advice
            return buildComboResponse(getComboRecommendation(vouchers, creditCards, 'general'));
          }

          case 'PLATFORM_ADVICE':
          case 'GENERAL_PLATFORM_QUERY': {
            const platform = entities.platform || extractPlatformFromQuery(query);
            if (platform) {
              const result = getPlatformCardRecommendation(creditCards, platform);
              return buildPlatformResponse(result);
            }
            return buildFallbackResponse(query);
          }

          case 'VOUCHER_SEARCH':
          case 'GENERAL_VOUCHER_SEARCH': {
            const { category } = entities;
            
            // Check if it's a platform-specific search
            const platformMatch = query.toLowerCase().match(/(ishop|gyftr|smartbuy|maximize|magicpin)/);
            if (platformMatch) {
              const result = filterVouchersByPlatform(vouchers, platformMatch[1]);
              return buildVoucherSearchResponse({
                vouchers: result.vouchers.slice(0, 10),
                explanation: result.explanation,
                totalFound: result.vouchers.length,
                query,
              });
            }

            // Category search
            const result = searchVouchers(vouchers, category || query, { limit: 10 });
            return buildVoucherSearchResponse(result);
          }

          case 'SPENDING_ADVICE': {
            const { monthlySpend } = entities;
            if (monthlySpend) {
              const result = getSpendingRecommendations(creditCards, monthlySpend);
              return buildSpendingResponse(result);
            }
            return buildFallbackResponse(query);
          }

          case 'BANKING_TIER_ELIGIBILITY': {
            const { nrvAmount } = entities;
            if (nrvAmount !== null && nrvAmount !== undefined) {
              // nrvAmount is already in lakhs from intent recognizer
              const result = generateEligibilityResponse(wealthBanking, nrvAmount);
              return {
                content: result.content,
                cards: [],
                vouchers: [],
                bankingData: { type: 'wealth', eligibility: true },
                followUps: generateFollowUps('BANKING_TIER_ELIGIBILITY', result),
              };
            }
            // Try to extract amount from query
            const extractedAmount = extractAmount(query);
            if (extractedAmount) {
              const nrvInLakhs = extractedAmount / 100000;
              const result = generateEligibilityResponse(wealthBanking, nrvInLakhs);
              return {
                content: result.content,
                cards: [],
                vouchers: [],
                bankingData: { type: 'wealth', eligibility: true },
                followUps: generateFollowUps('BANKING_TIER_ELIGIBILITY', result),
              };
            }
            return buildFallbackResponse(query);
          }

          case 'BANKING_TIER_INFO':
          case 'GENERAL_BANKING_QUERY': {
            const { bank } = entities;
            const bankName = bank || extractBankFromQuery(query);
            if (bankName) {
              const result = generateWealthTierResponse(wealthBanking, bankName);
              return {
                content: result.content,
                cards: [],
                vouchers: [],
                bankingData: result.bankingData,
                followUps: generateFollowUps('BANKING_TIER_INFO', result),
              };
            }
            // Return overview of all banks
            return {
              content: `## 🏦 Wealth Banking Programs

I can provide information about wealth tiers for these banks:

${Object.keys(wealthBanking).slice(0, 10).map((bank) => `- **${bank}**`).join('\n')}

**Ask me:**
- "[Bank name] wealth tiers"
- "What tier for [amount] NRV?"
- "Compare [Bank1] vs [Bank2]"`,
              bankingData: { type: 'wealth', overview: true },
              followUps: ['HDFC wealth tiers', 'What tier for 25L NRV?', 'Family banking options'],
            };
          }

          case 'FAMILY_BANKING': {
            const result = generateFamilyBankingResponse(familyBanking);
            return {
              content: result.content,
              cards: [],
              vouchers: [],
              bankingData: result.bankingData,
              followUps: generateFollowUps('FAMILY_BANKING', result),
            };
          }

          case 'GENERAL_SEARCH':
          default: {
            // Try card search first
            const cardResult = searchCards(creditCards, query, { limit: 4 });
            if (cardResult.cards.length > 0) {
              return buildCardSearchResponse(cardResult);
            }

            // Try voucher search
            const voucherResult = searchVouchers(vouchers, query, { limit: 4 });
            if (voucherResult.vouchers.length > 0) {
              return buildVoucherSearchResponse(voucherResult);
            }

            // Fallback
            return buildFallbackResponse(query);
          }
        }
      } catch (error) {
        console.error('Query processing error:', error);
        return buildErrorResponse(error, query);
      }
    },
    [creditCards, vouchers, wealthBanking, familyBanking]
  );

  /**
   * Get stats for display
   */
  const stats = useMemo(
    () => ({
      cardCount: creditCards?.length || 0,
      voucherCount: vouchers?.length || 0,
      bankCount: Object.keys(wealthBanking || {}).length,
    }),
    [creditCards, vouchers, wealthBanking]
  );

  return {
    processQuery,
    stats,
  };
};

/**
 * Extract platform name from query
 */
const extractPlatformFromQuery = (query) => {
  const platforms = ['ishop', 'smartbuy', 'gyftr', 'maximize', 'magicpin', 'savesage'];
  const lowerQuery = query.toLowerCase();
  return platforms.find((p) => lowerQuery.includes(p)) || null;
};

/**
 * Extract bank name from query
 */
const extractBankFromQuery = (query) => {
  const banks = [
    'hdfc', 'icici', 'axis', 'sbi', 'kotak', 'indusind', 'idfc',
    'yes', 'rbl', 'hsbc', 'standard chartered', 'federal', 'au', 'bob',
  ];
  const lowerQuery = query.toLowerCase();
  return banks.find((b) => lowerQuery.includes(b)) || null;
};

export default useQueryProcessor;
