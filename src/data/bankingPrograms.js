// Banking programs data - Family Banking and Wealth Banking tiers
// Last Updated: 2025 - Sourced from banking.js (Unified Data Source)
import { bankingData } from './banking';

// Helper to transform tiers data into component-expected format
const transformTier = (tier) => {
    // Extract debit card name if available
    const debitCardName = tier.benefits?.debitCard?.name || "";

    // Extract features array from benefits
    const features = tier.benefits?.features || [];

    // Collect eligible cards (debit card name for now)
    const eligibleCards = [];
    if (debitCardName) {
        // Simplify the card name
        eligibleCards.push(debitCardName.replace(/Credit Card|Debit Card/gi, '').trim());
    }

    // If we have lounge info, add it as a notable benefit
    const lounge = tier.benefits?.debitCard?.lounge;
    let loungeInfo = [];
    if (lounge) {
        if (lounge.domestic && lounge.domestic !== "None") {
            loungeInfo.push(`Domestic Lounge: ${lounge.domestic}`);
        }
        if (lounge.international && lounge.international !== "None") {
            loungeInfo.push(`International Lounge: ${lounge.international}`);
        }
    }

    // Collect key benefits
    const benefitsList = [
        ...loungeInfo,
        tier.benefits?.locker?.text,
        tier.benefits?.investments?.text,
        tier.benefits?.welcomeBenefits,
        ...features
    ].filter(Boolean);

    return {
        name: tier.name,
        id: tier.id,
        minNRV: tier.eligibility?.description || "Contact Bank for details",
        eligibleCards: eligibleCards.length > 0 ? eligibleCards : [tier.name + " Debit Card"],
        benefits: benefitsList.slice(0, 8), // Limit to 8 benefits for display
        rm: tier.hasRM || false,
        // Keep original data for advanced use
        originalData: tier
    };
};

// Helper to convert array to object keyed by bank name for backward compatibility
const createWealthBankingMap = () => {
    const map = {};
    bankingData.forEach(bank => {
        if (bank && bank.name && bank.tiers) {
            map[bank.name] = {
                tiers: bank.tiers.map(transformTier),
                notes: bank.notes || "" // Preserve top-level notes if any
            };
        }
    });
    return map;
};

const createFamilyBankingMap = () => {
    const map = {};
    bankingData.forEach(bank => {
        if (bank && bank.familyBanking) {
            const fb = bank.familyBanking;
            map[bank.name] = {
                name: fb.name,
                minNRV: fb.eligibility?.description || "Contact Bank", // Fallback for display
                eligibleMembers: fb.members?.allowed || [],
                maxMembers: fb.members?.maxCount || 0,
                benefits: fb.benefits || [],
                howToApply: "Visit your nearest branch or contact your Relationship Manager.",
                notes: fb.eligibility?.description || ""
            };
        }
    });
    return map;
};

// Export the maps
export const wealthBanking = createWealthBankingMap();
export const familyBanking = createFamilyBankingMap();

// Get list of all banks
export const getBankNames = () => {
    return Object.keys(wealthBanking);
};

// Get banks where a specific tier fits within a budget
export const getBanksByBudget = (amount) => {
    // Convert input to raw value if small number (Lakhs assumption safe for < 100)
    let budgetRaw = amount;
    if (amount < 1000) {
        budgetRaw = amount * 100000;
    }

    const results = [];
    Object.entries(wealthBanking).forEach(([bankName, bankData]) => {
        bankData.tiers.forEach(tier => {
            const originalTier = tier.originalData;
            let minReq = 0;

            // Prefer NRV, fallback to AMB/AQB/Salary logic
            if (originalTier?.eligibility?.nrv > 0) {
                minReq = originalTier.eligibility.nrv;
            } else if (originalTier?.eligibility?.amb > 0) {
                minReq = originalTier.eligibility.amb;
            } else if (originalTier?.eligibility?.aqb > 0) {
                minReq = originalTier.eligibility.aqb;
            } else if (originalTier?.eligibility?.salary > 0) {
                minReq = originalTier.eligibility.salary * 10;
            }

            if (minReq > 0 && minReq <= budgetRaw) {
                results.push({
                    bank: bankName,
                    tier: tier.name,
                    minNRV: tier.minNRV // Display string
                });
            }
        });
    });
    return results;
};

// Get banks that offer specific benefits
export const getBanksByBenefit = (benefitQuery) => {
    const results = [];
    const lowerQuery = benefitQuery.toLowerCase();

    Object.entries(wealthBanking).forEach(([bankName, bankData]) => {
        bankData.tiers.forEach(tier => {
            const originalTier = tier.originalData;
            const ben = originalTier?.benefits;
            let matches = false;

            // Helper to check and add unique hits
            const check = (text) => {
                if (text && text.toLowerCase().includes(lowerQuery)) {
                    matches = true;
                }
            };

            // Search known fields
            if (ben) {
                check(ben.welcomeBenefits);
                if (ben.debitCard) {
                    check(ben.debitCard.name);
                    check(ben.debitCard.forex?.text);
                    if (ben.debitCard.lounge) {
                        check(ben.debitCard.lounge.domestic);
                        check(ben.debitCard.lounge.international);
                    }
                }
                if (ben.locker) check(ben.locker.text);
                if (ben.investments) check(ben.investments.text);
                if (ben.features && Array.isArray(ben.features)) {
                    ben.features.forEach(f => check(f));
                }
            }

            if (originalTier?.metadata) {
                if (originalTier.metadata.pros) originalTier.metadata.pros.forEach(p => check(p));
                check(originalTier.metadata.bestFor);
            }

            // Also check the transformed benefits array
            tier.benefits.forEach(b => check(b));

            if (matches) {
                results.push({
                    bank: bankName,
                    tier: tier.name,
                    match: originalTier?.metadata?.bestFor || "Benefit match found"
                });
            }
        });
    });
    return results;
};
