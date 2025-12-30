import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { creditCards } from '../data/creditCards';
import { vouchers } from '../data/vouchers';
import { wealthBanking, familyBanking, getBankNames } from '../data/bankingPrograms';

// ===== DATABASE SUMMARY =====
// Credit Cards: 99 cards across 15 banks
// Vouchers: 920+ vouchers across multiple categories
// Banks: 14 banks with wealth tiers & family programs
// Platforms: iShop, SmartBuy, Gyftr, Maximize, MagicPin, SaveSage
// =============================

// Platform info for voucher purchases
const PLATFORM_INFO = {
    ishop: {
        name: 'iShop (Reward360)',
        bestFor: 'ICICI Bank cardholders',
        cards: ['ICICI Emeralde Private Metal', 'ICICI Sapphiro Credit Card', 'ICICI Rubyx Credit Card'],
        benefit: '18% discount + up to 18% reward points = ~36% total savings',
        url: 'https://ishop.reward360.in/',
        emoji: '🛒'
    },
    gyftr: {
        name: 'Gyftr',
        bestFor: 'Any credit card with good reward rate',
        cards: ['HDFC Infinia Metal', 'Axis Magnus Credit Card', 'SBI Elite Credit Card'],
        benefit: '10-15% discount + card rewards',
        url: 'https://www.gyftr.com/',
        emoji: '🎁'
    },
    maximize: {
        name: 'Maximize',
        bestFor: 'Unlimited voucher purchases',
        cards: ['Amazon Pay ICICI', 'Flipkart Axis Bank Credit Card', 'SBI Cashback Credit Card'],
        benefit: '2-5% discount + unlimited cap',
        url: 'https://www.maximize.money/',
        emoji: '📈'
    },
    magicpin: {
        name: 'MagicPin',
        bestFor: 'Food & local shopping',
        cards: ['HDFC Swiggy Credit Card', 'IndusInd EazyDiner Credit Card'],
        benefit: '5-10% discount on select brands',
        url: 'https://magicpin.in/',
        emoji: '📍'
    },
    savesage: {
        name: 'SaveSage',
        bestFor: 'Small consistent savings',
        cards: ['Any cashback card'],
        benefit: '1-3% discount',
        url: 'https://savesage.club/',
        emoji: '💰'
    },
    smartbuy: {
        name: 'HDFC SmartBuy',
        bestFor: 'HDFC cardholders',
        cards: ['HDFC Infinia Metal', 'HDFC Diners Club Black Metal', 'HDFC Regalia Credit Card'],
        benefit: '10X rewards (33% value) on flights, hotels, vouchers',
        url: 'https://smartbuy.hdfcbank.com/',
        emoji: '🔵'
    }
};

// Voucher categories
const VOUCHER_CATEGORIES = ['Shopping', 'Food', 'Entertainment', 'Travel', 'Fashion', 'Electronics', 'Grocery', 'Dining & Food', 'Health & Wellness', 'Home & Living', 'Beauty', 'Automotive'];

// Copy to clipboard helper
const copyToClipboard = async (text) => {
    const plainText = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/## (.*?)(?:\n|$)/g, '$1\n')
        .replace(/### (.*?)(?:\n|$)/g, '$1\n')
        .replace(/- /g, '• ');
    try {
        await navigator.clipboard.writeText(plainText);
        return true;
    } catch {
        return false;
    }
};

// Parse NRV string to number (in lakhs)
const parseNRV = (nrvStr) => {
    if (!nrvStr) return 0;
    const lower = nrvStr.toLowerCase();
    const match = lower.match(/₹?(\d+(?:\.\d+)?)\s*(lakh|l|crore|cr)/i);
    if (!match) {
        const numMatch = lower.match(/₹?(\d+(?:\.\d+)?)/);
        return numMatch ? parseFloat(numMatch[1]) : 0;
    }
    const num = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    return unit.startsWith('cr') ? num * 100 : num;
};

// Find eligible tier based on NRV
const findEligibleTier = (bank, nrvInLakhs) => {
    const bankData = wealthBanking[bank];
    if (!bankData) return null;
    let matchedTier = null;
    for (const tier of bankData.tiers) {
        const minNRV = parseNRV(tier.minNRV);
        if (nrvInLakhs >= minNRV) {
            matchedTier = tier;
        }
    }
    return matchedTier;
};

// Get all eligible tiers across banks for a given NRV
const getAllEligibleTiers = (nrvInLakhs) => {
    const results = [];
    Object.entries(wealthBanking).forEach(([bankName, bankData]) => {
        let bestTier = null;
        for (const tier of bankData.tiers) {
            const minNRV = parseNRV(tier.minNRV);
            if (nrvInLakhs >= minNRV) {
                bestTier = { bank: bankName, tier, minNRV };
            }
        }
        if (bestTier) results.push(bestTier);
    });
    results.sort((a, b) => b.minNRV - a.minNRV);
    return results;
};

// Get platform recommendation
const getPlatformAdvice = (platform) => {
    const info = PLATFORM_INFO[platform.toLowerCase()];
    if (!info) return null;
    const recommendedCards = creditCards.filter(c =>
        info.cards.some(cardName => c.name?.includes(cardName.split(' ')[0]))
    ).slice(0, 3);
    return { info, cards: recommendedCards };
};

// Search vouchers by category
const searchVouchersByCategory = (query) => {
    const lowerQuery = query.toLowerCase();
    let results = [];
    let explanation = '';

    const categoryMatch = VOUCHER_CATEGORIES.find(cat => lowerQuery.includes(cat.toLowerCase()));
    if (categoryMatch) {
        results = vouchers.filter(v => v.category?.toLowerCase().includes(categoryMatch.toLowerCase()));
        explanation = `🎫 ${categoryMatch} vouchers`;
    } else if (lowerQuery.includes('ishop')) {
        results = vouchers.filter(v => v.platforms?.some(p => p.name?.toLowerCase().includes('ishop')));
        explanation = '🛒 Vouchers on iShop';
    } else if (lowerQuery.includes('gyftr')) {
        results = vouchers.filter(v => v.platforms?.some(p => p.name?.toLowerCase().includes('gyftr')));
        explanation = '🎁 Vouchers on Gyftr';
    } else if (lowerQuery.includes('maximize')) {
        results = vouchers.filter(v => v.platforms?.some(p => p.name?.toLowerCase().includes('maximize')));
        explanation = '📈 Vouchers on Maximize';
    } else {
        results = vouchers.filter(v =>
            v.brand?.toLowerCase().includes(lowerQuery) ||
            v.category?.toLowerCase().includes(lowerQuery)
        );
        explanation = `🔍 Voucher results for "${query}"`;
    }
    return { vouchers: results.slice(0, 8), explanation, totalFound: results.length };
};

// Generate follow-up suggestions based on response
const getFollowUpSuggestions = (query, response) => {
    const lowerQuery = query.toLowerCase();
    const suggestions = [];

    if (response.bankingData) {
        if (lowerQuery.includes('wealth') || lowerQuery.includes('tier')) {
            suggestions.push('Show family banking options');
            suggestions.push('Which cards for this tier?');
        }
        if (lowerQuery.includes('family')) {
            suggestions.push('Check wealth tiers instead');
        }
        if (!lowerQuery.includes('compare')) {
            suggestions.push('Compare with other banks');
        }
    }

    if (response.cards?.length > 0) {
        const firstCard = response.cards[0];
        if (firstCard?.category === 'Premium') {
            suggestions.push('Compare with other premium cards');
        }
        if (!lowerQuery.includes('fee')) {
            suggestions.push(`Fees for ${firstCard?.name?.split(' ')[0] || 'this card'}?`);
        }
        suggestions.push('Show lifetime free alternatives');
    }

    if (response.vouchers?.length > 0 || lowerQuery.includes('combo')) {
        suggestions.push('Show more voucher combos');
        suggestions.push('Best card for online shopping');
    }

    if (lowerQuery.includes('platform') || lowerQuery.includes('ishop') || lowerQuery.includes('smartbuy')) {
        suggestions.push('Compare all platforms');
        suggestions.push('Best combo for Amazon');
    }

    if (lowerQuery.includes('cashback')) {
        suggestions.push('Compare cashback vs reward points');
        suggestions.push('Best travel cards instead');
    } else if (lowerQuery.includes('travel')) {
        suggestions.push('Cards with lounge access');
        suggestions.push('Best forex cards');
    }

    if (suggestions.length === 0) {
        suggestions.push('HDFC wealth tiers');
        suggestions.push('Best premium card');
        suggestions.push('Which card for iShop?');
    }

    return suggestions.slice(0, 3);
};


// Smart card matching engine with ALL 99 cards
const findBestCards = (query) => {
    const lowerQuery = query.toLowerCase();
    let results = [];
    let explanation = '';

    const categoryMatches = {
        // Shopping platforms
        amazon: { filter: c => c.name?.toLowerCase().includes('amazon') || c.verdict?.toLowerCase().includes('amazon'), explanation: '🛒 Best cards for Amazon' },
        flipkart: { filter: c => c.name?.toLowerCase().includes('flipkart') || c.verdict?.toLowerCase().includes('flipkart'), explanation: '🛍️ Best cards for Flipkart' },
        swiggy: { filter: c => c.name?.toLowerCase().includes('swiggy') || c.verdict?.toLowerCase().includes('swiggy'), explanation: '🍔 Best cards for Swiggy' },
        zomato: { filter: c => c.verdict?.toLowerCase().includes('zomato') || c.features?.some(f => f.toLowerCase().includes('zomato')), explanation: '🍕 Best cards for Zomato' },
        myntra: { filter: c => c.verdict?.toLowerCase().includes('myntra'), explanation: '👗 Best cards for Myntra' },
        ajio: { filter: c => c.verdict?.toLowerCase().includes('ajio'), explanation: '👕 Best cards for AJIO' },
        bigbasket: { filter: c => c.verdict?.toLowerCase().includes('bigbasket') || c.bestFor?.toLowerCase().includes('grocery'), explanation: '🥦 Best cards for BigBasket' },
        croma: { filter: c => c.verdict?.toLowerCase().includes('croma'), explanation: '📱 Best cards for Croma' },
        blinkit: { filter: c => c.verdict?.toLowerCase().includes('blinkit'), explanation: '⚡ Best cards for Blinkit' },

        // Fuel
        fuel: { filter: c => c.category === 'Fuel' || c.bestFor?.toLowerCase().includes('fuel'), explanation: '⛽ Best fuel cards' },
        petrol: { filter: c => c.category === 'Fuel' || c.bestFor?.toLowerCase().includes('fuel'), explanation: '⛽ Best cards for petrol' },
        ioc: { filter: c => c.name?.toLowerCase().includes('ioc') || c.name?.toLowerCase().includes('indian oil'), explanation: '⛽ Indian Oil cards' },
        'indian oil': { filter: c => c.name?.toLowerCase().includes('ioc') || c.name?.toLowerCase().includes('indian oil'), explanation: '⛽ Indian Oil cards' },
        hpcl: { filter: c => c.name?.toLowerCase().includes('hpcl'), explanation: '⛽ HPCL cards' },
        bpcl: { filter: c => c.name?.toLowerCase().includes('bpcl'), explanation: '⛽ BPCL cards' },

        // Travel & Hotels
        travel: { filter: c => c.category === 'Travel' || (c.category === 'Premium' && c.features?.some(f => f.toLowerCase().includes('lounge'))), explanation: '✈️ Best travel cards' },
        lounge: { filter: c => c.features?.some(f => f.toLowerCase().includes('lounge')), explanation: '🛋️ Lounge access cards' },
        airport: { filter: c => c.features?.some(f => f.toLowerCase().includes('lounge') || f.toLowerCase().includes('airport')), explanation: '✈️ Airport benefits cards' },
        forex: { filter: c => parseFloat(c.fxMarkup) <= 2 || c.fxMarkup === '0%', explanation: '🌍 Best forex cards' },
        international: { filter: c => parseFloat(c.fxMarkup) <= 2.5 || c.fxMarkup === '0%', explanation: '🌍 Best international cards' },
        miles: { filter: c => c.name?.toLowerCase().includes('miles') || c.rewardType === 'miles', explanation: '✈️ Air miles cards' },
        marriott: { filter: c => c.name?.toLowerCase().includes('marriott'), explanation: '🏨 Marriott Bonvoy cards' },
        taj: { filter: c => c.name?.toLowerCase().includes('taj'), explanation: '🏨 Taj Hotels cards' },
        itc: { filter: c => c.name?.toLowerCase().includes('itc'), explanation: '🏨 ITC Hotels cards' },
        vistara: { filter: c => c.name?.toLowerCase().includes('vistara'), explanation: '✈️ Club Vistara cards' },
        'air india': { filter: c => c.name?.toLowerCase().includes('air india'), explanation: '✈️ Air India cards' },
        irctc: { filter: c => c.name?.toLowerCase().includes('irctc'), explanation: '🚂 IRCTC railway cards' },
        railway: { filter: c => c.name?.toLowerCase().includes('irctc'), explanation: '🚂 Railway cards' },

        // Rewards
        cashback: { filter: c => c.rewardType === 'cashback' || c.name?.toLowerCase().includes('cashback'), explanation: '💰 Cashback cards' },
        points: { filter: c => c.rewardType === 'points', explanation: '🎯 Reward points cards' },
        rewards: { filter: c => c.rewardType === 'points' || c.name?.toLowerCase().includes('reward'), explanation: '🎁 Rewards cards' },

        // Fee categories
        'lifetime free': { filter: c => c.annualFee?.toLowerCase().includes('lifetime free') || c.annualFee?.toLowerCase().includes('ltf'), explanation: '🆓 Lifetime free cards' },
        ltf: { filter: c => c.annualFee?.toLowerCase().includes('lifetime free') || c.annualFee?.toLowerCase().includes('ltf'), explanation: '🆓 LTF cards' },
        free: { filter: c => c.annualFee?.toLowerCase().includes('free') || c.annualFee?.toLowerCase().includes('nil'), explanation: '🆓 Free cards' },
        'no fee': { filter: c => c.annualFee?.toLowerCase().includes('free') || c.annualFee?.toLowerCase().includes('nil'), explanation: '🆓 No fee cards' },

        // Card tiers
        premium: { filter: c => c.category === 'Premium', explanation: '👑 Premium cards' },
        'super premium': { filter: c => c.category === 'Premium' && (c.name?.toLowerCase().includes('infinia') || c.name?.toLowerCase().includes('emeralde') || c.name?.toLowerCase().includes('magnus') || c.name?.toLowerCase().includes('reserve')), explanation: '💎 Super premium cards' },
        metal: { filter: c => c.name?.toLowerCase().includes('metal'), explanation: '🔩 Metal cards' },
        entry: { filter: c => c.category === 'Entry Level' || c.annualFee?.toLowerCase().includes('free'), explanation: '🌱 Entry-level cards' },
        beginner: { filter: c => c.category === 'Entry Level' || c.annualFee?.toLowerCase().includes('free'), explanation: '🌱 Beginner cards' },
        signature: { filter: c => c.name?.toLowerCase().includes('signature'), explanation: '✍️ Signature cards' },

        // Use cases
        dining: { filter: c => c.bestFor?.toLowerCase().includes('dining') || c.bestFor?.toLowerCase().includes('food') || c.name?.toLowerCase().includes('diner'), explanation: '🍽️ Dining cards' },
        food: { filter: c => c.bestFor?.toLowerCase().includes('dining') || c.bestFor?.toLowerCase().includes('food') || c.name?.toLowerCase().includes('swiggy'), explanation: '🍔 Food cards' },
        grocery: { filter: c => c.bestFor?.toLowerCase().includes('grocery'), explanation: '🛒 Grocery cards' },
        online: { filter: c => c.bestFor?.toLowerCase().includes('online') || c.name?.toLowerCase().includes('simplyclick'), explanation: '💻 Online shopping cards' },
        shopping: { filter: c => c.bestFor?.toLowerCase().includes('shopping') || c.category === 'Cashback', explanation: '🛍️ Shopping cards' },
        movie: { filter: c => c.features?.some(f => f.toLowerCase().includes('movie') || f.toLowerCase().includes('bogo') || f.toLowerCase().includes('pvr')), explanation: '🎬 Movie benefits cards' },
        pvr: { filter: c => c.name?.toLowerCase().includes('pvr') || c.features?.some(f => f.toLowerCase().includes('pvr')), explanation: '🎬 PVR cards' },
        inox: { filter: c => c.name?.toLowerCase().includes('inox') || c.features?.some(f => f.toLowerCase().includes('inox')), explanation: '🎬 INOX cards' },
        business: { filter: c => c.name?.toLowerCase().includes('biz') || c.name?.toLowerCase().includes('business'), explanation: '💼 Business cards' },

        // All 15 Banks
        hdfc: { filter: c => c.bank === 'HDFC Bank', explanation: '🏦 HDFC Bank cards (17)' },
        icici: { filter: c => c.bank === 'ICICI Bank', explanation: '🏦 ICICI Bank cards (8)' },
        axis: { filter: c => c.bank === 'Axis Bank', explanation: '🏦 Axis Bank cards (16)' },
        sbi: { filter: c => c.bank === 'SBI Card', explanation: '🏦 SBI cards (11)' },
        amex: { filter: c => c.bank === 'American Express', explanation: '🏦 Amex cards (5)' },
        'american express': { filter: c => c.bank === 'American Express', explanation: '🏦 Amex cards (5)' },
        kotak: { filter: c => c.bank === 'Kotak Mahindra Bank', explanation: '🏦 Kotak cards (5)' },
        idfc: { filter: c => c.bank === 'IDFC First Bank', explanation: '🏦 IDFC First cards (8)' },
        'idfc first': { filter: c => c.bank === 'IDFC First Bank', explanation: '🏦 IDFC First cards (8)' },
        indusind: { filter: c => c.bank === 'IndusInd Bank', explanation: '🏦 IndusInd cards (5)' },
        au: { filter: c => c.bank === 'AU Small Finance Bank', explanation: '🏦 AU Bank cards (6)' },
        'au bank': { filter: c => c.bank === 'AU Small Finance Bank', explanation: '🏦 AU Bank cards (6)' },
        rbl: { filter: c => c.bank === 'RBL Bank', explanation: '🏦 RBL cards (4)' },
        yes: { filter: c => c.bank === 'Yes Bank', explanation: '🏦 Yes Bank cards (3)' },
        'yes bank': { filter: c => c.bank === 'Yes Bank', explanation: '🏦 Yes Bank cards (3)' },
        federal: { filter: c => c.bank === 'Federal Bank', explanation: '🏦 Federal Bank cards (3)' },
        hsbc: { filter: c => c.bank === 'HSBC', explanation: '🏦 HSBC cards (2)' },
        bob: { filter: c => c.bank === 'Bank of Baroda' || c.name?.toLowerCase().includes('bob'), explanation: '🏦 Bank of Baroda cards (2)' },
        baroda: { filter: c => c.bank === 'Bank of Baroda', explanation: '🏦 Bank of Baroda cards (2)' },
        'bank of baroda': { filter: c => c.bank === 'Bank of Baroda', explanation: '🏦 Bank of Baroda cards (2)' },

        // Fintech
        onecard: { filter: c => c.name?.toLowerCase().includes('onecard'), explanation: '💳 OneCard' },
        'one card': { filter: c => c.name?.toLowerCase().includes('onecard'), explanation: '💳 OneCard' },
        jupiter: { filter: c => c.name?.toLowerCase().includes('jupiter'), explanation: '💳 Jupiter Edge' },
        niyo: { filter: c => c.name?.toLowerCase().includes('niyo'), explanation: '💳 Niyo Global' },
        kiwi: { filter: c => c.name?.toLowerCase().includes('kiwi'), explanation: '💳 Kiwi RuPay' },
        scapia: { filter: c => c.name?.toLowerCase().includes('scapia'), explanation: '💳 Scapia' },
        fi: { filter: c => c.name?.toLowerCase().includes('fi federal'), explanation: '💳 Fi Federal' },

        // All 99 card names searchable
        infinia: { filter: c => c.name?.toLowerCase().includes('infinia'), explanation: '💎 HDFC Infinia' },
        diners: { filter: c => c.name?.toLowerCase().includes('diners'), explanation: '💎 HDFC Diners Club' },
        regalia: { filter: c => c.name?.toLowerCase().includes('regalia'), explanation: '💳 HDFC Regalia' },
        millennia: { filter: c => c.name?.toLowerCase().includes('millennia'), explanation: '💳 Millennia cards' },
        pixel: { filter: c => c.name?.toLowerCase().includes('pixel'), explanation: '🎮 HDFC Pixel' },
        'tata neu': { filter: c => c.name?.toLowerCase().includes('tata neu'), explanation: '💳 Tata Neu card' },
        neu: { filter: c => c.name?.toLowerCase().includes('neu'), explanation: '💳 Tata Neu card' },
        bizblack: { filter: c => c.name?.toLowerCase().includes('bizblack'), explanation: '💼 HDFC BizBlack' },
        bharat: { filter: c => c.name?.toLowerCase().includes('bharat'), explanation: '💳 Bharat Cashback' },
        freedom: { filter: c => c.name?.toLowerCase().includes('freedom'), explanation: '💳 HDFC Freedom' },
        'shoppers stop': { filter: c => c.name?.toLowerCase().includes('shoppers stop'), explanation: '🛍️ Shoppers Stop card' },
        magnus: { filter: c => c.name?.toLowerCase().includes('magnus'), explanation: '💎 Axis Magnus' },
        atlas: { filter: c => c.name?.toLowerCase().includes('atlas'), explanation: '✈️ Axis Atlas' },
        reserve: { filter: c => c.name?.toLowerCase().includes('reserve'), explanation: '💎 Reserve cards' },
        olympus: { filter: c => c.name?.toLowerCase().includes('olympus'), explanation: '💎 Axis Olympus' },
        ace: { filter: c => c.name?.toLowerCase().includes('ace'), explanation: '💳 Ace cards' },
        privilege: { filter: c => c.name?.toLowerCase().includes('privilege'), explanation: '💳 Axis Privilege' },
        select: { filter: c => c.name?.toLowerCase().includes('select'), explanation: '💳 Select cards' },
        neo: { filter: c => c.name?.toLowerCase().includes('neo') && !c.name?.toLowerCase().includes('tata'), explanation: '💳 Axis Neo' },
        myzone: { filter: c => c.name?.toLowerCase().includes('myzone'), explanation: '💳 Axis MyZone' },
        airtel: { filter: c => c.name?.toLowerCase().includes('airtel'), explanation: '📱 Airtel cards' },
        lic: { filter: c => c.name?.toLowerCase().includes('lic'), explanation: '🛡️ LIC cards' },
        emeralde: { filter: c => c.name?.toLowerCase().includes('emeralde'), explanation: '💎 ICICI Emeralde' },
        sapphiro: { filter: c => c.name?.toLowerCase().includes('sapphiro'), explanation: '💳 ICICI Sapphiro' },
        rubyx: { filter: c => c.name?.toLowerCase().includes('rubyx'), explanation: '�� ICICI Rubyx' },
        coral: { filter: c => c.name?.toLowerCase().includes('coral'), explanation: '💳 ICICI Coral' },
        'amazon prime': { filter: c => c.name?.toLowerCase().includes('amazon prime'), explanation: '💳 Amazon Prime card' },
        elite: { filter: c => c.name?.toLowerCase().includes('elite'), explanation: '💳 Elite cards' },
        simplyclick: { filter: c => c.name?.toLowerCase().includes('simplyclick'), explanation: '�� SBI SimplyCLICK' },
        simplysave: { filter: c => c.name?.toLowerCase().includes('simplysave'), explanation: '💳 SBI SimplySAVE' },
        titan: { filter: c => c.name?.toLowerCase().includes('titan'), explanation: '⌚ Titan cards' },
        wealth: { filter: c => c.name?.toLowerCase().includes('wealth'), explanation: '💳 IDFC Wealth' },
        power: { filter: c => c.name?.toLowerCase().includes('power'), explanation: '💳 IDFC Power+' },
        'power+': { filter: c => c.name?.toLowerCase().includes('power'), explanation: '💳 IDFC Power+' },
        wow: { filter: c => c.name?.toLowerCase().includes('wow'), explanation: '💳 IDFC WOW' },
        mayura: { filter: c => c.name?.toLowerCase().includes('mayura'), explanation: '💳 IDFC Mayura' },
        ashva: { filter: c => c.name?.toLowerCase().includes('ashva'), explanation: '💳 IDFC Ashva' },
        private: { filter: c => c.name?.toLowerCase().includes('private'), explanation: '💎 Private cards' },
        platinum: { filter: c => c.name?.toLowerCase().includes('platinum'), explanation: '💳 Platinum cards' },
        'membership rewards': { filter: c => c.name?.toLowerCase().includes('membership rewards'), explanation: '🎁 Amex MRCC' },
        mrcc: { filter: c => c.name?.toLowerCase().includes('membership rewards'), explanation: '🎁 Amex MRCC' },
        smartearn: { filter: c => c.name?.toLowerCase().includes('smartearn'), explanation: '💳 Amex SmartEarn' },
        gold: { filter: c => c.name?.toLowerCase().includes('gold'), explanation: '✨ Gold cards' },
        altura: { filter: c => c.name?.toLowerCase().includes('altura'), explanation: '💳 AU ALTURA' },
        lit: { filter: c => c.name?.toLowerCase().includes('lit'), explanation: '💳 AU LIT' },
        vetta: { filter: c => c.name?.toLowerCase().includes('vetta'), explanation: '💳 AU Vetta' },
        xcite: { filter: c => c.name?.toLowerCase().includes('xcite'), explanation: '💳 AU Xcite' },
        ixigo: { filter: c => c.name?.toLowerCase().includes('ixigo'), explanation: '✈️ Ixigo cards' },
        tiger: { filter: c => c.name?.toLowerCase().includes('tiger'), explanation: '💳 IndusInd Tiger' },
        legend: { filter: c => c.name?.toLowerCase().includes('legend'), explanation: '💳 IndusInd Legend' },
        aura: { filter: c => c.name?.toLowerCase().includes('aura'), explanation: '💳 IndusInd Aura' },
        easydiner: { filter: c => c.name?.toLowerCase().includes('easydiner') || c.name?.toLowerCase().includes('eazydiner'), explanation: '🍽️ EazyDiner card' },
        eazydiner: { filter: c => c.name?.toLowerCase().includes('easydiner') || c.name?.toLowerCase().includes('eazydiner'), explanation: '🍽️ EazyDiner card' },
        '811': { filter: c => c.name?.toLowerCase().includes('811'), explanation: '💳 Kotak 811' },
        dream: { filter: c => c.name?.toLowerCase().includes('dream'), explanation: '💳 Kotak Dream Different' },
        royale: { filter: c => c.name?.toLowerCase().includes('royale'), explanation: '💳 Kotak Royale' },
        urbane: { filter: c => c.name?.toLowerCase().includes('urbane'), explanation: '💳 Kotak Urbane' },
        zen: { filter: c => c.name?.toLowerCase().includes('zen'), explanation: '💳 Kotak Zen' },
        live: { filter: c => c.name?.toLowerCase().includes('live'), explanation: '💳 HSBC Live+' },
        'live+': { filter: c => c.name?.toLowerCase().includes('live'), explanation: '💳 HSBC Live+' },
        shoprite: { filter: c => c.name?.toLowerCase().includes('shoprite'), explanation: '💳 RBL Shoprite' },
        maxima: { filter: c => c.name?.toLowerCase().includes('maxima'), explanation: '💳 RBL Maxima' },
        xtra: { filter: c => c.name?.toLowerCase().includes('xtra'), explanation: '💳 RBL XTRA' },
        marquee: { filter: c => c.name?.toLowerCase().includes('marquee'), explanation: '💳 Yes Marquee' },
        paisasave: { filter: c => c.name?.toLowerCase().includes('paisasave'), explanation: '💳 Yes PaisaSave' },
        eterna: { filter: c => c.name?.toLowerCase().includes('eterna'), explanation: '💳 BOB Eterna' },
        premier: { filter: c => c.name?.toLowerCase().includes('premier'), explanation: '💳 Premier cards' },
        celesta: { filter: c => c.name?.toLowerCase().includes('celesta'), explanation: '💳 Federal Celesta' },
        edge: { filter: c => c.name?.toLowerCase().includes('edge'), explanation: '💳 Edge cards' },
        global: { filter: c => c.name?.toLowerCase().includes('global'), explanation: '🌍 Global cards' },
        rupay: { filter: c => c.name?.toLowerCase().includes('rupay'), explanation: '🇮🇳 RuPay cards' },

        // Platforms
        smartbuy: { filter: c => c.verdict?.toLowerCase().includes('smartbuy') || c.features?.some(f => f.toLowerCase().includes('smartbuy')) || c.bank === 'HDFC Bank', explanation: '🔵 SmartBuy cards (HDFC)' },
        ishop: { filter: c => c.verdict?.toLowerCase().includes('ishop') || c.features?.some(f => f.toLowerCase().includes('ishop')) || c.bank === 'ICICI Bank', explanation: '🛒 iShop cards (ICICI)' },
    };

    for (const [keyword, config] of Object.entries(categoryMatches)) {
        if (lowerQuery.includes(keyword)) {
            results = creditCards.filter(config.filter);
            explanation = config.explanation;
            break;
        }
    }

    if (results.length === 0) {
        results = creditCards.filter(c =>
            c.name?.toLowerCase().includes(lowerQuery) ||
            c.bank?.toLowerCase().includes(lowerQuery) ||
            c.bestFor?.toLowerCase().includes(lowerQuery) ||
            c.verdict?.toLowerCase().includes(lowerQuery) ||
            c.category?.toLowerCase().includes(lowerQuery)
        );
        explanation = `🔍 Results for "${query}"`;
    }

    results.sort((a, b) => {
        if (a.category === 'Premium' && b.category !== 'Premium') return -1;
        if (b.category === 'Premium' && a.category !== 'Premium') return 1;
        return 0;
    });

    return { cards: results.slice(0, 6), explanation, totalFound: results.length };
};

// Get best platform for a voucher
const getBestPlatform = (voucher) => {
    if (!voucher?.platforms || voucher.platforms.length === 0) return null;
    let bestPlatform = voucher.platforms[0];
    let bestDiscount = 0;
    voucher.platforms.forEach(p => {
        const match = p.fee?.match(/(\d+(?:\.\d+)?)/);
        if (match) {
            const discount = parseFloat(match[1]);
            if (discount > bestDiscount) {
                bestDiscount = discount;
                bestPlatform = p;
            }
        }
    });
    return { platform: bestPlatform, discount: bestDiscount };
};

// Card + Voucher combo recommendations
const getComboRecommendation = (brand) => {
    const lowerBrand = brand.toLowerCase();
    const matchingVoucher = vouchers.find(v => v.brand?.toLowerCase().includes(lowerBrand));
    if (!matchingVoucher) return null;

    const bestPlatformInfo = getBestPlatform(matchingVoucher);
    let recommendedCards = [];
    let strategy = '';

    const hasIshop = matchingVoucher.platforms?.some(p => p.name?.toLowerCase().includes('ishop'));

    if (hasIshop) {
        recommendedCards = creditCards.filter(c => c.bank === 'ICICI Bank' && c.category === 'Premium').slice(0, 2);
        const ishopPlatform = matchingVoucher.platforms?.find(p => p.name?.toLowerCase().includes('ishop'));
        strategy = `**Best Strategy:** Use ICICI card on iShop\n- Voucher discount: ${ishopPlatform?.fee || '~18%'}\n- Card rewards: up to 18% on Emeralde\n- **Total savings: ~36%!**`;
    } else if (lowerBrand.includes('amazon')) {
        recommendedCards = [
            creditCards.find(c => c.name?.includes('Amazon Pay')),
            creditCards.find(c => c.name?.includes('Infinia'))
        ].filter(Boolean);
        strategy = `**Options:**\n1. Amazon Pay ICICI: 5% unlimited cashback\n2. HDFC Infinia via SmartBuy: 33% value!`;
    } else if (lowerBrand.includes('flipkart')) {
        recommendedCards = [
            creditCards.find(c => c.name?.includes('Flipkart')),
            creditCards.find(c => c.name?.includes('Emeralde'))
        ].filter(Boolean);
        strategy = `**Options:**\n1. Flipkart Axis: 5% unlimited\n2. ICICI Emeralde via iShop: ~36%`;
    } else if (lowerBrand.includes('swiggy')) {
        recommendedCards = [
            creditCards.find(c => c.name?.includes('Swiggy')),
            creditCards.find(c => c.name?.includes('Emeralde'))
        ].filter(Boolean);
        strategy = `**Best Strategy:** HDFC Swiggy for 10% on Swiggy OR buy vouchers via iShop with ICICI!`;
    } else if (lowerBrand.includes('zomato')) {
        recommendedCards = [
            creditCards.find(c => c.name?.includes('EazyDiner')),
            creditCards.find(c => c.name?.includes('Emeralde'))
        ].filter(Boolean);
        strategy = `**Best Strategy:** IndusInd EazyDiner for dining OR buy vouchers via iShop!`;
    } else if (lowerBrand.includes('pvr') || lowerBrand.includes('inox')) {
        recommendedCards = [
            creditCards.find(c => c.name?.includes('PVR')),
            creditCards.find(c => c.name?.includes('Diners'))
        ].filter(Boolean);
        strategy = `**Best Strategy:** PVR INOX Kotak OR HDFC Diners for BOGO!`;
    } else {
        recommendedCards = creditCards.filter(c => c.category === 'Premium').slice(0, 2);
        strategy = `**Tip:** Buy ${matchingVoucher.brand} vouchers at discount, then use rewards card!`;
    }

    return { voucher: matchingVoucher, bestPlatform: bestPlatformInfo, cards: recommendedCards, strategy };
};

// Get spending recommendation
const getSpendingAdvice = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('₹') || lowerQuery.includes('spend') || lowerQuery.includes('monthly') || lowerQuery.includes('budget')) {
        const amountMatch = query.match(/₹?\s?(\d+(?:,\d+)*)/i);
        if (amountMatch) {
            let amount = parseFloat(amountMatch[1].replace(/,/g, ''));
            if (lowerQuery.includes('lakh') || lowerQuery.includes('lac') || lowerQuery.includes('l')) amount *= 100000;
            else if (lowerQuery.includes('k')) amount *= 1000;

            if (amount >= 500000) {
                return {
                    advice: `For ₹${(amount / 100000).toFixed(1)}L+ monthly spend:\n- **Axis Reserve/Magnus** - Tier 2 rewards (35 pts/₹200)\n- **HDFC Infinia** - 33% via SmartBuy\n- **ICICI Emeralde** - 36% via iShop`,
                    recommended: ['Axis Reserve', 'Axis Magnus', 'HDFC Infinia', 'ICICI Emeralde']
                };
            } else if (amount >= 300000) {
                return {
                    advice: `For ₹${(amount / 100000).toFixed(1)}L spend, Axis Magnus is optimal. You'll hit Tier 2 (35 pts/₹200) and maximize miles.`,
                    recommended: ['Axis Magnus Credit Card', 'HDFC Infinia Metal', 'ICICI Emeralde Private Metal']
                };
            } else if (amount >= 100000) {
                return {
                    advice: `For ₹${(amount / 1000).toFixed(0)}K spend:\n- **HDFC Infinia** - SmartBuy (15K RP cap)\n- **ICICI Emeralde** - iShop (18K RP cap)`,
                    recommended: ['HDFC Infinia Metal', 'ICICI Emeralde Private Metal', 'SBI Elite']
                };
            } else if (amount >= 50000) {
                return {
                    advice: `For ₹${(amount / 1000).toFixed(0)}K spend:\n- **SBI Cashback** - 5% online (₹5K cap)\n- **HDFC Regalia** - Good rewards\n- **ICICI Sapphiro** - iShop benefits`,
                    recommended: ['SBI Cashback', 'HDFC Regalia', 'ICICI Sapphiro']
                };
            } else {
                return {
                    advice: `For under ₹50K spend:\n- **Amazon Pay ICICI** - 5% unlimited\n- **SBI Cashback** - 5% online\n- **Flipkart Axis** - 5% unlimited`,
                    recommended: ['Amazon Pay ICICI', 'SBI Cashback', 'Flipkart Axis']
                };
            }
        }
    }
    return null;
};

// Quick actions
const quickActions = [
    { label: '🏆 Best Overall', query: 'best premium card' },
    { label: '💰 Cashback', query: 'best cashback card' },
    { label: '✈️ Travel', query: 'best travel card' },
    { label: '🆓 Lifetime Free', query: 'lifetime free cards' },
    { label: '�� Zero Forex', query: 'best forex card' },
    { label: '⛽ Fuel', query: 'best fuel card' },
];

const comboActions = [
    { label: '🛒 Amazon', query: 'best combo for amazon' },
    { label: '🛍️ Flipkart', query: 'best combo for flipkart' },
    { label: '🍔 Swiggy', query: 'best combo for swiggy' },
    { label: '🍕 Zomato', query: 'best combo for zomato' },
    { label: '🎬 PVR', query: 'best combo for pvr' },
    { label: '🥦 BigBasket', query: 'best combo for bigbasket' },
];

const bankingActions = [
    { label: '💎 HDFC Tiers', query: 'HDFC wealth tiers' },
    { label: '🏦 Axis Burgundy', query: 'Axis wealth tiers' },
    { label: '💰 My Eligibility', query: 'what tier for 25L NRV' },
    { label: '👨‍👩‍👧‍👦 Family Banking', query: 'family banking options' },
    { label: '📊 Compare Tiers', query: 'compare Imperia vs Burgundy' },
];

const platformActions = [
    { label: '🛒 iShop', query: 'which card for ishop' },
    { label: '🔵 SmartBuy', query: 'which card for smartbuy' },
    { label: '🎁 Gyftr', query: 'which card for gyftr' },
    { label: '📈 Maximize', query: 'which card for maximize' },
];

const voucherCategoryActions = [
    { label: '🛍️ Shopping', query: 'shopping vouchers' },
    { label: '🍔 Food', query: 'food vouchers' },
    { label: '🎬 Entertainment', query: 'entertainment vouchers' },
    { label: '✈️ Travel', query: 'travel vouchers' },
    { label: '👗 Fashion', query: 'fashion vouchers' },
];


const AskAI = () => {
    const bankNames = getBankNames();
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `👋 Hi! I'm your **Credit Card + Banking + Voucher AI Advisor**

**Powered by:**
• **${creditCards.length} Credit Cards** across 15 banks
• **${vouchers.length}+ Vouchers** across multiple categories
• **14 Banks** with wealth tiers & family programs

🛒 **Platform Intelligence!**
- "Which card for iShop?" → ICICI cards for 36% savings
- "Which card for SmartBuy?" → HDFC cards for 33% value
- "Shopping vouchers" → Browse by category

🏦 **Banking Intelligence!**
- "HDFC wealth tiers" → See all tier requirements
- "What tier for 25L NRV?" → Find eligibility across banks

**Also try:** "Best combo for Amazon" • "Compare Infinia vs Magnus"`,
            cards: [],
            vouchers: [],
            bankingData: null,
            followUps: ['Which card for iShop?', 'HDFC wealth tiers', 'Best combo for Amazon']
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [showBankFilter, setShowBankFilter] = useState(false);
    const [showVoucherFilter, setShowVoucherFilter] = useState(false);
    const messagesEndRef = useRef(null);

    const handleCopy = async (text, index) => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const processQuery = (query) => {
        const lowerQuery = query.toLowerCase();
        let response = { content: '', cards: [], vouchers: [], bankingData: null };

        // ===== PLATFORM ADVICE QUERIES =====
        if (lowerQuery.includes('which card for') || lowerQuery.includes('best card for')) {
            for (const [platform, info] of Object.entries(PLATFORM_INFO)) {
                if (lowerQuery.includes(platform) || lowerQuery.includes(info.name.toLowerCase().split(' ')[0].toLowerCase())) {
                    const advice = getPlatformAdvice(platform);
                    if (advice) {
                        response.content = `## ${advice.info.emoji} Best Cards for ${advice.info.name}\n\n`;
                        response.content += `**Best For:** ${advice.info.bestFor}\n`;
                        response.content += `**Benefit:** ${advice.info.benefit}\n\n`;
                        response.content += `### 💳 Recommended Cards:\n`;
                        advice.info.cards.forEach(card => {
                            response.content += `- **${card}**\n`;
                        });
                        response.content += `\n🔗 [Visit ${advice.info.name}](${advice.info.url})`;
                        response.cards = advice.cards;
                        return response;
                    }
                }
            }
        }

        // ===== VOUCHER CATEGORY SEARCH =====
        const categoryMatch = VOUCHER_CATEGORIES.find(cat => lowerQuery.includes(cat.toLowerCase()));
        if (categoryMatch || (lowerQuery.includes('voucher') && !lowerQuery.includes('combo') && !lowerQuery.includes('best for'))) {
            const voucherResult = searchVouchersByCategory(query);
            if (voucherResult.vouchers.length > 0) {
                response.content = `## ${voucherResult.explanation}\n\n`;
                response.content += `Found **${voucherResult.totalFound} vouchers**${voucherResult.totalFound > 8 ? ' (showing top 8)' : ''}:\n\n`;
                voucherResult.vouchers.forEach((v, i) => {
                    const best = getBestPlatform(v);
                    response.content += `### ${i + 1}. ${v.brand}\n`;
                    response.content += `**Best:** ${best?.platform?.name || 'Multiple'} - ${best?.platform?.fee || 'Varies'}\n\n`;
                });
                response.vouchers = voucherResult.vouchers;
                return response;
            }
        }

        // ===== BEST PLATFORM FOR VOUCHER =====
        if (lowerQuery.includes('best platform') || lowerQuery.includes('where to buy') || lowerQuery.includes('compare platform')) {
            const brands = ['amazon', 'flipkart', 'swiggy', 'zomato', 'pvr', 'bigbasket', 'myntra'];
            const detectedBrand = brands.find(b => lowerQuery.includes(b));
            if (detectedBrand) {
                const voucher = vouchers.find(v => v.brand?.toLowerCase().includes(detectedBrand));
                if (voucher?.platforms?.length) {
                    response.content = `## 🎫 ${voucher.brand} - Platform Comparison\n\n`;
                    voucher.platforms.forEach(p => {
                        response.content += `### ${p.name}\n`;
                        response.content += `- **Discount:** ${p.fee}\n`;
                        response.content += `- **Cap:** ${p.cap}\n`;
                        response.content += `- [Buy Now](${p.link})\n\n`;
                    });
                    const best = getBestPlatform(voucher);
                    response.content += `**🏆 Best:** ${best?.platform?.name} with ${best?.platform?.fee}`;
                    response.vouchers = [voucher];
                    return response;
                }
            }
        }

        // ===== VOUCHER CATEGORIES LIST =====
        if (lowerQuery === 'vouchers' || lowerQuery.includes('voucher categories') || lowerQuery.includes('show categories')) {
            response.content = `## 🎫 Voucher Categories (${vouchers.length}+ vouchers)\n\n`;
            VOUCHER_CATEGORIES.forEach(cat => {
                const count = vouchers.filter(v => v.category?.toLowerCase().includes(cat.toLowerCase())).length;
                if (count > 0) response.content += `- **${cat}**: ${count} vouchers\n`;
            });
            response.content += `\n💡 Try: "shopping vouchers" or "food vouchers"`;
            return response;
        }

        // ===== BANKING QUERIES =====

        // Wealth tier query for specific bank
        const bankMatch = bankNames.find(bank => lowerQuery.includes(bank.toLowerCase().split(' ')[0].toLowerCase()));
        if (bankMatch && (lowerQuery.includes('tier') || lowerQuery.includes('wealth') || lowerQuery.includes('banking') || lowerQuery.includes('nrv'))) {
            const bankData = wealthBanking[bankMatch];
            if (bankData) {
                response.content = `## 💎 ${bankMatch} - Wealth Banking Tiers\n\n`;
                bankData.tiers.forEach((tier, i) => {
                    const emoji = i === bankData.tiers.length - 1 ? '👑' : i === 0 ? '🌱' : '💳';
                    response.content += `### ${emoji} ${tier.name}\n`;
                    response.content += `**NRV:** ${tier.minNRV}\n`;
                    response.content += `**Cards:** ${tier.eligibleCards.join(', ')}\n`;
                    response.content += `**RM:** ${tier.rm ? '✅ Yes' : '❌ No'}\n`;
                    response.content += `**Benefits:** ${tier.benefits.slice(0, 3).join(' • ')}\n\n`;
                });
                if (bankData.notes) {
                    response.content += `💡 **Note:** ${bankData.notes}`;
                }
                response.bankingData = { type: 'wealth', bank: bankMatch, data: bankData };
                return response;
            }
        }

        // Family banking query
        if (lowerQuery.includes('family')) {
            const familyBankMatch = bankNames.find(bank => lowerQuery.includes(bank.toLowerCase().split(' ')[0].toLowerCase()));
            if (familyBankMatch) {
                const familyData = familyBanking[familyBankMatch];
                if (familyData) {
                    response.content = `## 👨‍👩‍👧‍👦 ${familyData.name}\n\n`;
                    response.content += `**Min NRV:** ${familyData.minNRV}\n`;
                    response.content += `**Max Members:** ${familyData.maxMembers}\n`;
                    response.content += `**Eligible:** ${familyData.eligibleMembers.join(', ')}\n\n`;
                    response.content += `### ✨ Benefits\n`;
                    familyData.benefits.forEach(b => {
                        response.content += `- ${b}\n`;
                    });
                    response.content += `\n### 📝 How to Apply\n${familyData.howToApply}\n`;
                    if (familyData.notes) {
                        response.content += `\n💡 **Note:** ${familyData.notes}`;
                    }
                    response.bankingData = { type: 'family', bank: familyBankMatch, data: familyData };
                    return response;
                }
            }
            // Show all family banking options
            response.content = `## 👨‍👩‍👧‍👦 Family Banking Programs\n\n`;
            response.content += `**${Object.keys(familyBanking).length} banks** offer family banking:\n\n`;
            Object.entries(familyBanking).slice(0, 6).forEach(([bank, data]) => {
                response.content += `### ${bank}\n`;
                response.content += `- **Min NRV:** ${data.minNRV}\n`;
                response.content += `- **Max Members:** ${data.maxMembers}\n\n`;
            });
            response.content += `\n💡 Ask "family banking at [bank name]" for details`;
            response.bankingData = { type: 'family-list' };
            return response;
        }

        // NRV eligibility query
        const nrvMatch = query.match(/(\d+(?:\.\d+)?)\s*(l(?:akh)?|cr(?:ore)?|k)?/i);
        if (nrvMatch && (lowerQuery.includes('tier') || lowerQuery.includes('nrv') || lowerQuery.includes('eligib') || lowerQuery.includes('what') || lowerQuery.includes('which bank'))) {
            let nrvInLakhs = parseFloat(nrvMatch[1]);
            const unit = nrvMatch[2]?.toLowerCase() || '';
            if (unit.startsWith('cr')) nrvInLakhs *= 100;
            else if (unit === 'k') nrvInLakhs /= 100;

            if (nrvInLakhs > 0) {
                const eligibleTiers = getAllEligibleTiers(nrvInLakhs);
                response.content = `## 🎯 Your Eligibility with ₹${nrvInLakhs >= 100 ? (nrvInLakhs / 100).toFixed(1) + ' Cr' : nrvInLakhs + 'L'} NRV\n\n`;

                if (eligibleTiers.length > 0) {
                    response.content += `You qualify for **${eligibleTiers.length} banks**:\n\n`;
                    eligibleTiers.slice(0, 6).forEach(({ bank, tier }) => {
                        response.content += `### 🏦 ${bank} → ${tier.name}\n`;
                        response.content += `**Cards:** ${tier.eligibleCards.slice(0, 2).join(', ')}\n`;
                        response.content += `**RM:** ${tier.rm ? '✅' : '❌'} | **Benefits:** ${tier.benefits[0]}\n\n`;
                    });
                    response.content += `💡 **Best Options:**\n`;
                    const withRM = eligibleTiers.filter(t => t.tier.rm);
                    if (withRM.length > 0) {
                        response.content += `- With RM: ${withRM.slice(0, 2).map(t => `${t.bank} ${t.tier.name}`).join(', ')}\n`;
                    }
                } else {
                    response.content += `No premium tiers available. Build to ₹1L+ for entry-level benefits.`;
                }
                response.bankingData = { type: 'eligibility', nrv: nrvInLakhs, tiers: eligibleTiers };
                return response;
            }
        }

        // Compare banking tiers
        if (lowerQuery.includes('compare') && (lowerQuery.includes('tier') || lowerQuery.includes('imperia') || lowerQuery.includes('burgundy') || lowerQuery.includes('privy') || lowerQuery.includes('emeralde'))) {
            const tierComparisons = [];
            const tierKeywords = {
                'imperia': { bank: 'HDFC Bank', tierIndex: 2 },
                'burgundy': { bank: 'Axis Bank', tierIndex: 1 },
                'privy': { bank: 'Kotak Mahindra Bank', tierIndex: 1 },
                'emeralde': { bank: 'ICICI Bank', tierIndex: 2 },
                'pioneer': { bank: 'IndusInd Bank', tierIndex: 1 },
                'wealth': { bank: 'IDFC First Bank', tierIndex: 1 },
                'premier': { bank: 'HSBC India', tierIndex: 1 },
                'priority': { bank: 'Standard Chartered Bank', tierIndex: 0 },
            };

            Object.entries(tierKeywords).forEach(([keyword, config]) => {
                if (lowerQuery.includes(keyword)) {
                    const bankData = wealthBanking[config.bank];
                    if (bankData?.tiers[config.tierIndex]) {
                        tierComparisons.push({
                            bank: config.bank,
                            tier: bankData.tiers[config.tierIndex]
                        });
                    }
                }
            });

            if (tierComparisons.length >= 1) {
                response.content = `## 📊 Banking Tier Comparison\n\n`;
                tierComparisons.forEach(({ bank, tier }) => {
                    response.content += `### ${bank} - ${tier.name}\n`;
                    response.content += `**NRV:** ${tier.minNRV}\n`;
                    response.content += `**Cards:** ${tier.eligibleCards.join(', ')}\n`;
                    response.content += `**RM:** ${tier.rm ? '✅ Yes' : '❌ No'}\n`;
                    response.content += `**Top Benefits:**\n`;
                    tier.benefits.slice(0, 4).forEach(b => {
                        response.content += `- ${b}\n`;
                    });
                    response.content += '\n';
                });
                response.bankingData = { type: 'comparison', tiers: tierComparisons };
                return response;
            }
        }

        // Banks with RM
        if (lowerQuery.includes('rm') || lowerQuery.includes('relationship manager')) {
            response.content = `## 👔 Tiers with Relationship Manager\n\n`;
            Object.entries(wealthBanking).forEach(([bank, data]) => {
                const rmTiers = data.tiers.filter(t => t.rm);
                if (rmTiers.length > 0) {
                    const lowestRM = rmTiers[0];
                    response.content += `**${bank}:** ${lowestRM.name} (${lowestRM.minNRV})\n`;
                }
            });
            response.content += `\n💡 RM provides dedicated service, priority support, and personalized advice.`;
            response.bankingData = { type: 'rm-list' };
            return response;
        }

        // ===== CARD/VOUCHER QUERIES =====

        // Detect brand for combo queries
        const brands = ['amazon', 'flipkart', 'swiggy', 'zomato', 'pvr', 'bigbasket', 'blinkit', 'myntra', 'uber', 'dominos', 'ajio', 'croma', 'titan', 'inox'];
        const detectedBrand = brands.find(b => lowerQuery.includes(b));
        const isComboQuery = ['combo', 'maximize', 'savings', 'best for'].some(k => lowerQuery.includes(k));

        if (isComboQuery && detectedBrand) {
            const combo = getComboRecommendation(detectedBrand);
            if (combo) {
                response.content = `## 🎯 ${combo.voucher.brand} - Ultimate Savings Combo\n\n`;
                response.content += `### 🎫 Best Voucher Deal\n`;
                response.content += `**Platform:** ${combo.bestPlatform?.platform?.name || 'Check available'}\n`;
                response.content += `**Discount:** ${combo.bestPlatform?.platform?.fee || 'Varies'}\n`;
                response.content += `**Cap:** ${combo.bestPlatform?.platform?.cap || 'Check site'}\n\n`;
                response.content += `### 💳 Best Cards to Pair\n`;
                combo.cards.forEach(card => {
                    if (card) response.content += `- **${card.name}**: ${card.verdict || card.bestFor}\n`;
                });
                response.content += `\n### 💡 Pro Strategy\n${combo.strategy}\n`;
                response.cards = combo.cards.filter(Boolean);
                response.vouchers = [combo.voucher];
                return response;
            }
        }

        // Card comparison
        if (lowerQuery.includes('vs') || (lowerQuery.includes('compare') && !response.bankingData)) {
            const cardNames = [];
            const cardKeywords = [
                { key: 'infinia', finder: c => c.name?.includes('Infinia') },
                { key: 'diners', finder: c => c.name?.includes('Diners') },
                { key: 'magnus', finder: c => c.name?.includes('Magnus') },
                { key: 'emeralde', finder: c => c.name?.includes('Emeralde') },
                { key: 'atlas', finder: c => c.name?.includes('Atlas') },
                { key: 'regalia', finder: c => c.name?.includes('Regalia') && !c.name?.includes('Gold') },
                { key: 'reserve', finder: c => c.name?.includes('Reserve') },
                { key: 'sapphiro', finder: c => c.name?.includes('Sapphiro') },
                { key: 'olympus', finder: c => c.name?.includes('Olympus') },
                { key: 'elite', finder: c => c.name?.includes('Elite') && c.bank === 'SBI Card' },
                { key: 'cashback', finder: c => c.name?.includes('Cashback') && c.bank === 'SBI Card' },
                { key: 'millennia', finder: c => c.name?.includes('Millennia') },
                { key: 'wealth', finder: c => c.name?.includes('Wealth') },
            ];

            cardKeywords.forEach(({ key, finder }) => {
                if (lowerQuery.includes(key)) {
                    const found = creditCards.find(finder);
                    if (found) cardNames.push(found);
                }
            });

            const uniqueCards = [...new Set(cardNames.filter(Boolean))].slice(0, 3);

            if (uniqueCards.length >= 2) {
                response.content = `## 📊 Card Comparison\n\n`;
                uniqueCards.forEach(card => {
                    response.content += `### ${card.name}\n`;
                    response.content += `- **Bank:** ${card.bank}\n`;
                    response.content += `- **Fee:** ${card.annualFee}\n`;
                    response.content += `- **Rewards:** ${card.rewardRate}\n`;
                    response.content += `- **Forex:** ${card.fxMarkup}\n`;
                    response.content += `- **Best For:** ${card.bestFor}\n\n`;
                });
                response.cards = uniqueCards;
                return response;
            }
        }

        // Spending advice
        const spendingAdvice = getSpendingAdvice(query);
        if (spendingAdvice) {
            response.content = `## 💡 Spending Strategy\n\n${spendingAdvice.advice}`;
            response.cards = creditCards.filter(c =>
                spendingAdvice.recommended.some(name => c.name?.includes(name))
            ).slice(0, 4);
            return response;
        }

        // Help command
        if (lowerQuery === 'help' || lowerQuery === '?') {
            response.content = `## 🧞‍♂️ How to Use\n\n`;
            response.content += `**💳 Cards:**\n- "HDFC cards", "premium cards", "cashback"\n- "Infinia vs Magnus", "best travel card"\n\n`;
            response.content += `**🎫 Vouchers:**\n- "shopping vouchers", "food vouchers"\n- "best platform for Amazon"\n\n`;
            response.content += `**🛒 Platforms:**\n- "which card for iShop" → ICICI\n- "which card for SmartBuy" → HDFC\n\n`;
            response.content += `**🏦 Banking:**\n- "HDFC wealth tiers"\n- "what tier for 25L NRV"\n- "family banking at Axis"`;
            return response;
        }

        // Stats
        if (lowerQuery.includes('stats') || lowerQuery.includes('how many')) {
            response.content = `## 📊 Database Stats\n\n`;
            response.content += `**💳 Credit Cards:** ${creditCards.length}\n`;
            response.content += `**🎫 Vouchers:** ${vouchers.length}+\n`;
            response.content += `**🏦 Banks with Wealth Tiers:** ${Object.keys(wealthBanking).length}\n`;
            response.content += `**🛒 Platforms:** iShop, SmartBuy, Gyftr, Maximize, MagicPin, SaveSage`;
            return response;
        }

        // General card search
        const searchResult = findBestCards(query);
        if (searchResult.cards.length > 0) {
            response.content = `## ${searchResult.explanation}\n\n`;
            response.content += `Found **${searchResult.totalFound} cards**${searchResult.totalFound > 6 ? ' (showing top 6)' : ''}:\n\n`;
            searchResult.cards.forEach((card, i) => {
                response.content += `### ${i + 1}. ${card.name}\n`;
                response.content += `${card.verdict || card.bestFor || ''}\n`;
                response.content += `**Fee:** ${card.annualFee} | **Rewards:** ${card.rewardRate}\n\n`;
            });
            response.cards = searchResult.cards;
        } else {
            response.content = `🔍 No results for "${query}".\n\n`;
            response.content += `**Try:**\n- Card: "Infinia", "HDFC", "cashback"\n- Voucher: "shopping vouchers"\n- Platform: "which card for iShop"\n- Banking: "HDFC wealth tiers"\n- Type "help" for all options`;
        }

        return response;
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setInput('');
        setIsTyping(true);

        const queryText = input;
        setTimeout(() => {
            const response = processQuery(queryText);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.content,
                cards: response.cards,
                vouchers: response.vouchers,
                bankingData: response.bankingData,
                followUps: getFollowUpSuggestions(queryText, response)
            }]);
            setIsTyping(false);
        }, 500);
    };

    const handleQuickAction = (query) => {
        setMessages(prev => [...prev, { role: 'user', content: query }]);
        setIsTyping(true);
        setTimeout(() => {
            const response = processQuery(query);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.content,
                cards: response.cards,
                vouchers: response.vouchers,
                bankingData: response.bankingData,
                followUps: getFollowUpSuggestions(query, response)
            }]);
            setIsTyping(false);
        }, 500);
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Ask AI 🧞‍♂️</h1>
                <p style={{ color: 'var(--text-secondary)' }}>{creditCards.length} Cards • {vouchers.length}+ Vouchers • 14 Banks • 6 Platforms</p>
            </div>

            {/* Card Quick Actions */}
            <div style={{ marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', textAlign: 'center' }}>💳 Cards</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                    {quickActions.map((action, i) => (
                        <button key={i} onClick={() => handleQuickAction(action.query)} style={{ padding: '5px 10px', borderRadius: '16px', border: '1px solid var(--glass-border)', background: 'var(--glass-background)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.75rem' }}>{action.label}</button>
                    ))}
                </div>
            </div>

            {/* Combo Quick Actions */}
            <div style={{ marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', textAlign: 'center' }}>🎯 Card + Voucher Combos</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                    {comboActions.map((action, i) => (
                        <button key={i} onClick={() => handleQuickAction(action.query)} style={{ padding: '5px 10px', borderRadius: '16px', border: '1px solid rgba(236, 72, 153, 0.3)', background: 'rgba(236, 72, 153, 0.1)', color: '#f472b6', cursor: 'pointer', fontSize: '0.75rem' }}>{action.label}</button>
                    ))}
                </div>
            </div>

            {/* Platform Quick Actions */}
            <div style={{ marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', textAlign: 'center' }}>🛒 Which Card for Platform?</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                    {platformActions.map((action, i) => (
                        <button key={i} onClick={() => handleQuickAction(action.query)} style={{ padding: '5px 10px', borderRadius: '16px', border: '1px solid rgba(249, 115, 22, 0.3)', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', cursor: 'pointer', fontSize: '0.75rem' }}>{action.label}</button>
                    ))}
                </div>
            </div>

            {/* Banking Quick Actions */}
            <div style={{ marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', textAlign: 'center' }}>🏦 Banking Tiers & Eligibility</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                    {bankingActions.map((action, i) => (
                        <button key={i} onClick={() => handleQuickAction(action.query)} style={{ padding: '5px 10px', borderRadius: '16px', border: '1px solid rgba(34, 197, 94, 0.3)', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', cursor: 'pointer', fontSize: '0.75rem' }}>{action.label}</button>
                    ))}
                </div>
            </div>

            {/* Voucher Category Actions */}
            <div style={{ marginBottom: '0.5rem' }}>
                <button onClick={() => setShowVoucherFilter(!showVoucherFilter)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', margin: '0 auto', padding: '4px 12px', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.3)', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', cursor: 'pointer', fontSize: '0.7rem' }}>
                    🎫 Browse Vouchers ({vouchers.length}+) {showVoucherFilter ? '▲' : '▼'}
                </button>
                {showVoucherFilter && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '12px' }}>
                        {voucherCategoryActions.map((action, i) => (
                            <button key={i} onClick={() => handleQuickAction(action.query)} style={{ padding: '4px 8px', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.3)', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', cursor: 'pointer', fontSize: '0.7rem' }}>{action.label}</button>
                        ))}
                    </div>
                )}
            </div>

            {/* Bank Filter Toggle */}
            <div style={{ marginBottom: '1rem' }}>
                <button onClick={() => setShowBankFilter(!showBankFilter)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', margin: '0 auto', padding: '4px 12px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', cursor: 'pointer', fontSize: '0.7rem' }}>
                    🏦 Browse All 14 Banks {showBankFilter ? '▲' : '▼'}
                </button>
                {showBankFilter && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '12px' }}>
                        {bankNames.map((bank, i) => (
                            <button key={i} onClick={() => handleQuickAction(`${bank} wealth tiers`)} style={{ padding: '4px 8px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', cursor: 'pointer', fontSize: '0.7rem' }}>{bank.split(' ')[0]}</button>
                        ))}
                    </div>
                )}
            </div>

            {/* Chat Container */}
            <div className="glass-panel" style={{ height: '400px', overflowY: 'auto', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{ padding: '12px 16px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.role === 'user' ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))' : 'rgba(255,255,255,0.05)', color: msg.role === 'user' ? '#000' : 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{
                                __html: msg.content
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/## (.*?)(?:\n|$)/g, '<h3 style="margin: 0.5rem 0; font-size: 1.05rem;">$1</h3>')
                                    .replace(/### (.*?)(?:\n|$)/g, '<h4 style="margin: 0.3rem 0; font-size: 0.95rem; color: var(--accent-cyan);">$1</h4>')
                                    .replace(/- (.*?)(?:\n|$)/g, '<div style="margin-left: 0.8rem;">• $1</div>')
                                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: var(--accent-cyan);">$1</a>')
                                    .replace(/\n/g, '<br/>')
                            }} />
                            {msg.role === 'assistant' && i > 0 && (
                                <button onClick={() => handleCopy(msg.content, i)} style={{ position: 'absolute', top: '8px', right: '8px', padding: '4px 8px', background: copiedIndex === i ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem', color: copiedIndex === i ? '#22c55e' : 'var(--text-secondary)' }} title="Copy response">{copiedIndex === i ? '✓ Copied' : '📋 Copy'}</button>
                            )}
                        </div>
                        {msg.cards?.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                {msg.cards.map(card => (
                                    <Link key={card.id} to={`/card-guide/${card.id}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 8px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '6px', border: '1px solid rgba(0, 212, 255, 0.3)', textDecoration: 'none', color: 'var(--accent-cyan)', fontSize: '0.7rem' }}>💳 {card.name?.split(' ').slice(0, 2).join(' ')} →</Link>
                                ))}
                            </div>
                        )}
                        {msg.vouchers?.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                                {msg.vouchers.map(voucher => (
                                    <Link key={voucher.id} to={`/voucher/${voucher.id}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 8px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '6px', border: '1px solid rgba(236, 72, 153, 0.3)', textDecoration: 'none', color: '#f472b6', fontSize: '0.7rem' }}>🎫 {voucher.brand} →</Link>
                                ))}
                            </div>
                        )}
                        {msg.bankingData?.type === 'wealth' && (
                            <div style={{ marginTop: '0.4rem' }}>
                                <Link to="/banking-guides" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '5px 8px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '6px', border: '1px solid rgba(34, 197, 94, 0.3)', textDecoration: 'none', color: '#22c55e', fontSize: '0.7rem' }}>🏦 View Full Banking Guide →</Link>
                            </div>
                        )}
                        {msg.role === 'assistant' && msg.followUps?.length > 0 && i === messages.length - 1 && (
                            <div style={{ marginTop: '0.75rem' }}>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>💡 Follow-up questions:</p>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    {msg.followUps.map((suggestion, idx) => (
                                        <button key={idx} onClick={() => handleQuickAction(suggestion)} style={{ padding: '5px 10px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', cursor: 'pointer', fontSize: '0.75rem' }}>{suggestion}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div style={{ display: 'flex', gap: '4px', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '18px', width: 'fit-content' }}>
                        <span style={{ animation: 'pulse 1s infinite' }}>●</span>
                        <span style={{ animation: 'pulse 1s infinite', animationDelay: '0.2s' }}>●</span>
                        <span style={{ animation: 'pulse 1s infinite', animationDelay: '0.4s' }}>●</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about cards, vouchers, platforms, banking..." style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--glass-background)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }} />
                <button type="submit" style={{ padding: '12px 20px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))', color: '#000', fontWeight: '600', cursor: 'pointer' }}>Ask</button>
                {messages.length > 1 && (
                    <button type="button" onClick={() => setMessages([messages[0]])} title="Clear chat history" style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', cursor: 'pointer' }}>🗑️</button>
                )}
            </form>

            <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
        </div>
    );
};

export default AskAI;
