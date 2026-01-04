/**
 * Banking Processor
 * Handles wealth banking tiers, family banking, and NRV eligibility queries
 */

/**
 * Parse NRV string to number (in lakhs)
 */
export const parseNRV = (nrvStr) => {
  if (!nrvStr) return 0;

  const lower = nrvStr.toLowerCase();
  const match = lower.match(/₹?(\d+(?:\.\d+)?)\s*(lakh|l|crore|cr|k)?/i);

  if (!match) {
    const numMatch = lower.match(/₹?(\d+(?:\.\d+)?)/);
    return numMatch ? parseFloat(numMatch[1]) : 0;
  }

  const num = parseFloat(match[1]);
  const unit = match[2]?.toLowerCase();

  if (unit?.startsWith('cr')) return num * 100; // Convert crore to lakh
  if (unit === 'k') return num / 100; // Convert thousands to lakh
  return num; // Already in lakhs or no unit
};

/**
 * Format amount in lakhs to readable string
 */
export const formatNRV = (amountInLakhs) => {
  if (amountInLakhs >= 100) {
    return `₹${(amountInLakhs / 100).toFixed(1)} Cr`;
  }
  return `₹${amountInLakhs} Lakh`;
};

/**
 * Find eligible tier for a given NRV at a specific bank
 */
export const findEligibleTier = (bankData, nrvInLakhs) => {
  if (!bankData?.tiers) return null;

  let matchedTier = null;

  for (const tier of bankData.tiers) {
    const minNRV = parseNRV(tier.minNRV);
    if (nrvInLakhs >= minNRV) {
      matchedTier = tier;
    }
  }

  return matchedTier;
};

/**
 * Get all eligible tiers across all banks for a given NRV
 */
export const getAllEligibleTiers = (wealthBanking, nrvInLakhs) => {
  const results = [];

  for (const [bankName, bankData] of Object.entries(wealthBanking)) {
    let bestTier = null;
    let minNRVRequired = 0;

    for (const tier of bankData.tiers || []) {
      const minNRV = parseNRV(tier.minNRV);
      if (nrvInLakhs >= minNRV) {
        bestTier = tier;
        minNRVRequired = minNRV;
      }
    }

    if (bestTier) {
      results.push({
        bank: bankName,
        tier: bestTier,
        minNRV: minNRVRequired,
        formattedNRV: formatNRV(minNRVRequired),
      });
    }
  }

  // Sort by tier level (highest NRV first)
  results.sort((a, b) => b.minNRV - a.minNRV);

  return results;
};

/**
 * Get wealth tier information for a specific bank
 */
export const getBankWealthInfo = (wealthBanking, bankName) => {
  if (!bankName) return null;

  const lowerBank = bankName.toLowerCase();

  // Find matching bank
  const matchedBankKey = Object.keys(wealthBanking).find(
    (key) => key.toLowerCase().includes(lowerBank) || lowerBank.includes(key.toLowerCase().split(' ')[0])
  );

  if (!matchedBankKey) return null;

  const bankData = wealthBanking[matchedBankKey];

  return {
    bankName: matchedBankKey,
    ...bankData,
  };
};

/**
 * Generate wealth tier response
 */
export const generateWealthTierResponse = (wealthBanking, bankName) => {
  const bankInfo = getBankWealthInfo(wealthBanking, bankName);

  if (!bankInfo) {
    return {
      found: false,
      content: `I couldn't find wealth tier information for "${bankName}".

Available banks: ${Object.keys(wealthBanking).slice(0, 8).join(', ')}...`,
      bankingData: null,
    };
  }

  let content = `## 🏦 ${bankInfo.bankName} Wealth Tiers\n\n`;

  if (bankInfo.tiers && bankInfo.tiers.length > 0) {
    for (const tier of bankInfo.tiers) {
      content += `### ${tier.name}\n`;
      content += `**Minimum NRV:** ${tier.minNRV}\n\n`;

      if (tier.eligibleCards?.length > 0) {
        content += `**Eligible Cards:** ${tier.eligibleCards.join(', ')}\n\n`;
      }

      if (tier.benefits?.length > 0) {
        content += `**Key Benefits:**\n`;
        content += tier.benefits.slice(0, 4).map((b) => `- ${b}`).join('\n');
        content += '\n\n';
      }

      if (tier.rm) {
        content += `✅ Dedicated Relationship Manager included\n\n`;
      }
    }
  }

  return {
    found: true,
    content,
    bankingData: {
      type: 'wealth',
      bank: bankInfo.bankName,
      tiers: bankInfo.tiers,
    },
  };
};

/**
 * Generate NRV eligibility response
 */
export const generateEligibilityResponse = (wealthBanking, nrvInLakhs) => {
  const eligibleTiers = getAllEligibleTiers(wealthBanking, nrvInLakhs);
  const formattedNRV = formatNRV(nrvInLakhs);

  if (eligibleTiers.length === 0) {
    return {
      content: `With ${formattedNRV} NRV, you may not qualify for premium wealth tiers at most banks.

**Recommendations:**
- Start with regular savings accounts
- Build your NRV over time
- Consider banks with lower entry tiers like AU Small Finance Bank (₹1L NRV)`,
      eligibleTiers: [],
      nrvAmount: nrvInLakhs,
    };
  }

  let content = `## 💰 Eligibility for ${formattedNRV} NRV\n\n`;
  content += `You qualify for **${eligibleTiers.length} wealth tiers** across different banks:\n\n`;

  // Group by tier level
  const topTiers = eligibleTiers.slice(0, 5);

  for (const result of topTiers) {
    content += `### ${result.bank} - ${result.tier.name}\n`;
    content += `**Minimum:** ${result.tier.minNRV}\n`;

    if (result.tier.eligibleCards?.length > 0) {
      content += `**Cards:** ${result.tier.eligibleCards.slice(0, 2).join(', ')}\n`;
    }

    if (result.tier.benefits?.length > 0) {
      content += `**Top Benefit:** ${result.tier.benefits[0]}\n`;
    }

    content += '\n';
  }

  if (eligibleTiers.length > 5) {
    content += `\n*+${eligibleTiers.length - 5} more banks available*`;
  }

  // Add recommendation
  const bestTier = eligibleTiers[0];
  content += `\n\n**💡 Recommendation:** Consider **${bestTier.bank} ${bestTier.tier.name}** for the best benefits at your NRV level.`;

  return {
    content,
    eligibleTiers,
    nrvAmount: nrvInLakhs,
    recommended: bestTier,
  };
};

/**
 * Get family banking information for a bank
 */
export const getFamilyBankingInfo = (familyBanking, bankName) => {
  if (!bankName) {
    // Return overview of all family banking programs
    return {
      type: 'overview',
      banks: Object.entries(familyBanking).map(([name, data]) => ({
        name,
        programName: data.name,
        minNRV: data.minNRV,
        maxMembers: data.maxMembers,
      })),
    };
  }

  const lowerBank = bankName.toLowerCase();

  const matchedBankKey = Object.keys(familyBanking).find(
    (key) => key.toLowerCase().includes(lowerBank) || lowerBank.includes(key.toLowerCase().split(' ')[0])
  );

  if (!matchedBankKey) return null;

  return {
    type: 'specific',
    bankName: matchedBankKey,
    ...familyBanking[matchedBankKey],
  };
};

/**
 * Generate family banking response
 */
export const generateFamilyBankingResponse = (familyBanking, bankName = null) => {
  const info = getFamilyBankingInfo(familyBanking, bankName);

  if (!info) {
    return {
      found: false,
      content: `I couldn't find family banking information for "${bankName}".`,
    };
  }

  if (info.type === 'overview') {
    let content = `## 👨‍👩‍👧‍👦 Family Banking Programs\n\n`;
    content += `Family banking lets you pool NRV/balances with family members for higher tier benefits.\n\n`;

    for (const bank of info.banks.slice(0, 8)) {
      content += `**${bank.name}**\n`;
      content += `- Program: ${bank.programName}\n`;
      content += `- Min NRV: ${bank.minNRV}\n`;
      content += `- Max Members: ${bank.maxMembers}\n\n`;
    }

    content += `\n💡 *Ask about a specific bank for detailed benefits.*`;

    return {
      found: true,
      content,
      bankingData: { type: 'family', overview: true },
    };
  }

  // Specific bank family banking info
  let content = `## 👨‍👩‍👧‍👦 ${info.name}\n\n`;
  content += `**Bank:** ${info.bankName}\n`;
  content += `**Minimum Combined NRV:** ${info.minNRV}\n`;
  content += `**Max Family Members:** ${info.maxMembers}\n\n`;

  if (info.eligibleMembers?.length > 0) {
    content += `**Eligible Members:**\n`;
    content += info.eligibleMembers.map((m) => `- ${m}`).join('\n');
    content += '\n\n';
  }

  if (info.benefits?.length > 0) {
    content += `**Benefits:**\n`;
    content += info.benefits.map((b) => `- ${b}`).join('\n');
    content += '\n\n';
  }

  if (info.howToApply) {
    content += `**How to Apply:** ${info.howToApply}\n\n`;
  }

  if (info.notes) {
    content += `**Note:** ${info.notes}`;
  }

  return {
    found: true,
    content,
    bankingData: {
      type: 'family',
      bank: info.bankName,
      data: info,
    },
  };
};

/**
 * Compare two wealth programs
 */
export const compareWealthPrograms = (wealthBanking, bank1, bank2) => {
  const info1 = getBankWealthInfo(wealthBanking, bank1);
  const info2 = getBankWealthInfo(wealthBanking, bank2);

  if (!info1 || !info2) {
    return {
      found: false,
      content: `Couldn't compare: ${!info1 ? bank1 : ''} ${!info2 ? bank2 : ''} not found.`,
    };
  }

  let content = `## ⚖️ ${info1.bankName} vs ${info2.bankName}\n\n`;

  // Compare tiers
  content += `### Tier Comparison\n\n`;
  content += `| Aspect | ${info1.bankName} | ${info2.bankName} |\n`;
  content += `|--------|---------|----------|\n`;

  const maxTiers = Math.max(info1.tiers?.length || 0, info2.tiers?.length || 0);

  for (let i = 0; i < Math.min(maxTiers, 3); i++) {
    const tier1 = info1.tiers?.[i];
    const tier2 = info2.tiers?.[i];
    content += `| Tier ${i + 1} | ${tier1?.name || '-'} (${tier1?.minNRV || '-'}) | ${tier2?.name || '-'} (${tier2?.minNRV || '-'}) |\n`;
  }

  content += '\n';

  // Recommendation
  content += `### 💡 Recommendation\n\n`;

  const lowestNRV1 = parseNRV(info1.tiers?.[0]?.minNRV);
  const lowestNRV2 = parseNRV(info2.tiers?.[0]?.minNRV);

  if (lowestNRV1 < lowestNRV2) {
    content += `**${info1.bankName}** has a lower entry point (${formatNRV(lowestNRV1)}) - better if you're starting out.`;
  } else if (lowestNRV2 < lowestNRV1) {
    content += `**${info2.bankName}** has a lower entry point (${formatNRV(lowestNRV2)}) - better if you're starting out.`;
  } else {
    content += `Both have similar entry points. Choose based on card benefits and branch accessibility.`;
  }

  return {
    found: true,
    content,
    bank1Info: info1,
    bank2Info: info2,
  };
};

export default {
  parseNRV,
  formatNRV,
  findEligibleTier,
  getAllEligibleTiers,
  getBankWealthInfo,
  generateWealthTierResponse,
  generateEligibilityResponse,
  getFamilyBankingInfo,
  generateFamilyBankingResponse,
  compareWealthPrograms,
};
