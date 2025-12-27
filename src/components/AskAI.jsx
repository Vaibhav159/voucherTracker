import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { creditCards } from '../data/creditCards';
import { vouchers } from '../data/vouchers';

// Copy to clipboard helper
const copyToClipboard = async (text) => {
    // Strip HTML-like markdown for plain text
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

// Generate follow-up suggestions based on response
const getFollowUpSuggestions = (query, response) => {
    const lowerQuery = query.toLowerCase();
    const suggestions = [];

    // If they asked about a specific card
    if (response.cards?.length > 0) {
        const firstCard = response.cards[0];
        if (firstCard.category === 'Premium') {
            suggestions.push('Compare with other premium cards');
        }
        if (!lowerQuery.includes('fee')) {
            suggestions.push(`What are the fees for ${firstCard.name.split(' ')[0]}?`);
        }
        suggestions.push('Show lifetime free alternatives');
    }

    // If they asked about vouchers/combos
    if (response.vouchers?.length > 0 || lowerQuery.includes('combo')) {
        suggestions.push('Show more voucher combos');
        suggestions.push('Best card for online shopping');
    }

    // Category-based suggestions
    if (lowerQuery.includes('cashback')) {
        suggestions.push('Compare cashback vs reward points');
        suggestions.push('Best travel cards instead');
    } else if (lowerQuery.includes('travel')) {
        suggestions.push('Cards with lounge access');
        suggestions.push('Best forex cards');
    } else if (lowerQuery.includes('spend')) {
        suggestions.push('How to maximize SmartBuy?');
        suggestions.push('Best for online shopping');
    }

    // Generic fallbacks
    if (suggestions.length === 0) {
        suggestions.push('Best card for beginners');
        suggestions.push('Show premium cards');
        suggestions.push('Best combo for Amazon');
    }

    return suggestions.slice(0, 3);
};

// Smart card matching engine
const findBestCards = (query) => {
    const lowerQuery = query.toLowerCase();
    let results = [];
    let explanation = '';

    const categoryMatches = {
        amazon: { filter: c => c.name.toLowerCase().includes('amazon') || c.verdict.toLowerCase().includes('amazon'), explanation: 'Best cards for Amazon shopping' },
        flipkart: { filter: c => c.name.toLowerCase().includes('flipkart') || c.verdict.toLowerCase().includes('flipkart'), explanation: 'Best cards for Flipkart shopping' },
        swiggy: { filter: c => c.name.toLowerCase().includes('swiggy') || c.verdict.toLowerCase().includes('swiggy'), explanation: 'Best cards for Swiggy orders' },
        zomato: { filter: c => c.verdict.toLowerCase().includes('zomato') || c.features.some(f => f.toLowerCase().includes('zomato')), explanation: 'Best cards for food delivery' },
        fuel: { filter: c => c.category === 'Fuel' || c.bestFor.toLowerCase().includes('fuel'), explanation: 'Best fuel cards' },
        travel: { filter: c => c.category === 'Travel' || (c.category === 'Premium' && c.features.some(f => f.toLowerCase().includes('lounge'))), explanation: 'Best travel cards' },
        lounge: { filter: c => c.features.some(f => f.toLowerCase().includes('lounge')), explanation: 'Cards with lounge access' },
        forex: { filter: c => parseFloat(c.fxMarkup) <= 2 || c.fxMarkup === '0%', explanation: 'Best cards for international spends' },
        cashback: { filter: c => c.rewardType === 'cashback', explanation: 'Best cashback credit cards' },
        points: { filter: c => c.rewardType === 'points', explanation: 'Best reward points cards' },
        'lifetime free': { filter: c => c.annualFee.toLowerCase().includes('lifetime free'), explanation: 'Lifetime free cards' },
        ltf: { filter: c => c.annualFee.toLowerCase().includes('lifetime free'), explanation: 'Lifetime free cards' },
        free: { filter: c => c.annualFee.toLowerCase().includes('free'), explanation: 'Free or low-fee cards' },
        premium: { filter: c => c.category === 'Premium', explanation: 'Premium credit cards' },
        dining: { filter: c => c.bestFor.toLowerCase().includes('dining') || c.bestFor.toLowerCase().includes('food'), explanation: 'Best dining cards' },
        grocery: { filter: c => c.bestFor.toLowerCase().includes('grocery') || c.features.some(f => f.toLowerCase().includes('grocery')), explanation: 'Best grocery cards' },
        online: { filter: c => c.bestFor.toLowerCase().includes('online') || c.category === 'Cashback', explanation: 'Best online shopping cards' },
        movie: { filter: c => c.features.some(f => f.toLowerCase().includes('movie') || f.toLowerCase().includes('bogo')), explanation: 'Cards with movie benefits' },
        hdfc: { filter: c => c.bank === 'HDFC Bank', explanation: 'HDFC Bank credit cards' },
        icici: { filter: c => c.bank === 'ICICI Bank', explanation: 'ICICI Bank credit cards' },
        axis: { filter: c => c.bank === 'Axis Bank', explanation: 'Axis Bank credit cards' },
        sbi: { filter: c => c.bank === 'SBI Card', explanation: 'SBI credit cards' },
        amex: { filter: c => c.bank === 'American Express', explanation: 'American Express cards' },
        smartbuy: { filter: c => c.verdict.toLowerCase().includes('smartbuy') || c.features.some(f => f.toLowerCase().includes('smartbuy')), explanation: 'Cards with SmartBuy benefits' },
        ishop: { filter: c => c.verdict.toLowerCase().includes('ishop') || c.features.some(f => f.toLowerCase().includes('ishop')), explanation: 'Cards with iShop benefits' },
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
            c.name.toLowerCase().includes(lowerQuery) ||
            c.bank.toLowerCase().includes(lowerQuery) ||
            c.bestFor.toLowerCase().includes(lowerQuery) ||
            c.verdict.toLowerCase().includes(lowerQuery) ||
            c.category.toLowerCase().includes(lowerQuery)
        );
        explanation = `Search results for "${query}"`;
    }

    results.sort((a, b) => {
        if (a.category === 'Premium' && b.category !== 'Premium') return -1;
        if (b.category === 'Premium' && a.category !== 'Premium') return 1;
        return 0;
    });

    return { cards: results.slice(0, 5), explanation, totalFound: results.length };
};

// Find vouchers for a brand
const findVouchers = (query) => {
    const lowerQuery = query.toLowerCase();
    return vouchers.filter(v =>
        v.brand.toLowerCase().includes(lowerQuery) ||
        v.category.toLowerCase().includes(lowerQuery)
    );
};

// Get best platform for a voucher (highest discount)
const getBestPlatform = (voucher) => {
    if (!voucher.platforms || voucher.platforms.length === 0) return null;

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

    const matchingVoucher = vouchers.find(v => v.brand.toLowerCase().includes(lowerBrand));
    if (!matchingVoucher) return null;

    const bestPlatformInfo = getBestPlatform(matchingVoucher);

    let recommendedCards = [];
    let strategy = '';

    if (bestPlatformInfo?.platform?.name === 'iShop') {
        recommendedCards = creditCards.filter(c => c.bank === 'ICICI Bank' && c.category === 'Premium').slice(0, 2);
        strategy = `**Best Strategy:** Use ICICI Emeralde/Sapphiro on iShop for 18% discount + up to 18% reward points = **~36% total savings!**`;
    } else if (lowerBrand.includes('amazon')) {
        recommendedCards = [
            creditCards.find(c => c.name.includes('Amazon Pay')),
            creditCards.find(c => c.name.includes('Infinia'))
        ].filter(Boolean);
        strategy = `**Best Strategy:** Amazon Pay ICICI for 5% unlimited cashback OR HDFC Infinia via SmartBuy for 33%!`;
    } else if (lowerBrand.includes('flipkart')) {
        recommendedCards = [
            creditCards.find(c => c.name.includes('Flipkart')),
            creditCards.find(c => c.name.includes('Emeralde'))
        ].filter(Boolean);
        strategy = `**Best Strategy:** Flipkart Axis for 5% unlimited OR ICICI Emeralde via iShop for 36%!`;
    } else if (lowerBrand.includes('swiggy')) {
        recommendedCards = [
            creditCards.find(c => c.name.includes('Swiggy')),
            creditCards.find(c => c.name.includes('Emeralde'))
        ].filter(Boolean);
        strategy = `**Best Strategy:** HDFC Swiggy for 10% on Swiggy OR buy vouchers via iShop with ICICI!`;
    } else {
        recommendedCards = creditCards.filter(c => c.category === 'Premium').slice(0, 2);
        strategy = `**Tip:** Buy ${matchingVoucher.brand} vouchers at discount, then use a rewards card for double savings!`;
    }

    return {
        voucher: matchingVoucher,
        bestPlatform: bestPlatformInfo,
        cards: recommendedCards,
        strategy
    };
};

// Get spending recommendation
const getSpendingAdvice = (query) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('₹') || lowerQuery.includes('spend') || lowerQuery.includes('monthly')) {
        const amountMatch = query.match(/₹?\s?(\d+(?:,\d+)*)/i);
        if (amountMatch) {
            let amount = parseFloat(amountMatch[1].replace(/,/g, ''));
            if (lowerQuery.includes('lakh') || lowerQuery.includes('l')) amount *= 100000;
            else if (lowerQuery.includes('k')) amount *= 1000;

            if (amount >= 300000) {
                return {
                    advice: `For ₹${(amount / 1000).toFixed(0)}K+ monthly spend, Axis Magnus is optimal. You'll hit Tier 2 rewards (35 pts/₹200) and maximize the 5:4 miles ratio.`,
                    recommended: ['Axis Magnus Credit Card', 'HDFC Infinia Metal', 'ICICI Emeralde Private Metal']
                };
            } else if (amount >= 100000) {
                return {
                    advice: `For ₹${(amount / 1000).toFixed(0)}K monthly spend, maximize SmartBuy/iShop caps. HDFC Infinia (15K RP cap) or ICICI Emeralde (18K RP cap) work well.`,
                    recommended: ['HDFC Infinia Metal', 'ICICI Emeralde Private Metal', 'SBI Cashback Credit Card']
                };
            } else {
                return {
                    advice: `For under ₹1L monthly spend, focus on cashback cards like SBI Cashback (5% online, ₹5K cap) or Amazon Pay ICICI (5% unlimited).`,
                    recommended: ['SBI Cashback Credit Card', 'Amazon Pay ICICI', 'HDFC Millennia Credit Card']
                };
            }
        }
    }
    return null;
};

const quickActions = [
    { label: '🏆 Best Overall', query: 'best premium card' },
    { label: '💰 Best Cashback', query: 'best cashback card' },
    { label: '✈️ Best Travel', query: 'best travel card' },
    { label: '🆓 Lifetime Free', query: 'lifetime free cards' },
    { label: '🌍 Zero Forex', query: 'best forex card' },
    { label: '⛽ Fuel Cards', query: 'best fuel card' },
];

const comboActions = [
    { label: '🛒 Amazon', query: 'best combo for amazon' },
    { label: '🛍️ Flipkart', query: 'best combo for flipkart' },
    { label: '🍔 Swiggy', query: 'best combo for swiggy' },
    { label: '🍕 Zomato', query: 'best combo for zomato' },
    { label: '🎬 PVR', query: 'best combo for pvr' },
    { label: '🥦 BigBasket', query: 'best combo for bigbasket' },
];

const AskAI = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `👋 Hi! I'm your **Credit Card + Voucher AI Advisor**

**Powered by:**
• **${creditCards.length} Credit Cards** with detailed caps & strategies
• **${vouchers.length}+ Brand Vouchers** with best discounts

🔥 **NEW: Card + Voucher Combos!**
Ask "best combo for Amazon" to get the ultimate savings strategy!

**Try asking:**
- "Best card + voucher for Swiggy?"
- "Compare Infinia vs Magnus"
- "Best card for ₹50k monthly spend"`,
            cards: [],
            vouchers: [],
            followUps: ['Best cashback card', 'Show premium cards', 'Best combo for Amazon']
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
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
        let response = { content: '', cards: [], vouchers: [] };

        // Detect brand for combo queries
        const brands = ['amazon', 'flipkart', 'swiggy', 'zomato', 'pvr', 'bigbasket', 'blinkit', 'myntra', 'uber', 'dominos', 'ajio', 'croma', 'titan'];
        const detectedBrand = brands.find(b => lowerQuery.includes(b));
        const isComboQuery = ['combo', 'voucher', 'maximize', 'savings', 'best for'].some(k => lowerQuery.includes(k));

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
                    if (card) response.content += `- **${card.name}**: ${card.verdict}\n`;
                });
                response.content += `\n### 💡 Pro Strategy\n${combo.strategy}\n`;
                response.cards = combo.cards.filter(Boolean);
                response.vouchers = [combo.voucher];
                return response;
            }
        }

        // Card comparison
        if (lowerQuery.includes('vs') || lowerQuery.includes('compare')) {
            const cardNames = [];
            if (lowerQuery.includes('infinia')) cardNames.push(creditCards.find(c => c.name.includes('Infinia')));
            if (lowerQuery.includes('diners')) cardNames.push(creditCards.find(c => c.name.includes('Diners')));
            if (lowerQuery.includes('magnus')) cardNames.push(creditCards.find(c => c.name.includes('Magnus')));
            if (lowerQuery.includes('emeralde')) cardNames.push(creditCards.find(c => c.name.includes('Emeralde')));
            if (lowerQuery.includes('atlas')) cardNames.push(creditCards.find(c => c.name.includes('Atlas')));
            if (lowerQuery.includes('regalia')) cardNames.push(creditCards.find(c => c.name.includes('Regalia')));

            const uniqueCards = [...new Set(cardNames.filter(Boolean))].slice(0, 3);

            if (uniqueCards.length >= 2) {
                response.content = `## 📊 Comparison\n\n`;
                uniqueCards.forEach(card => {
                    response.content += `### ${card.name}\n`;
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
                spendingAdvice.recommended.some(name => c.name.includes(name))
            ).slice(0, 3);
            return response;
        }

        // General card search
        const searchResult = findBestCards(query);
        if (searchResult.cards.length > 0) {
            response.content = `## ${searchResult.explanation}\n\nFound **${searchResult.totalFound} cards**:\n\n`;
            searchResult.cards.forEach((card, i) => {
                response.content += `### ${i + 1}. ${card.name}\n`;
                response.content += `${card.verdict}\n`;
                response.content += `**Fee:** ${card.annualFee} | **Rewards:** ${card.rewardRate}\n\n`;
            });
            response.cards = searchResult.cards;
        } else {
            response.content = `I couldn't find specific results for "${query}". Try:\n- A card name (e.g., "HDFC Infinia")\n- A category (e.g., "best cashback")\n- A combo (e.g., "best combo for Amazon")`;
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
                followUps: getFollowUpSuggestions(query, response)
            }]);
            setIsTyping(false);
        }, 500);
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    Ask AI 🧞‍♂️
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {creditCards.length} Cards • {vouchers.length}+ Vouchers • Smart Combos
                </p>
            </div>

            {/* Card Quick Actions */}
            <div style={{ marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', textAlign: 'center' }}>💳 Cards</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                    {quickActions.map((action, i) => (
                        <button key={i} onClick={() => handleQuickAction(action.query)} style={{
                            padding: '5px 10px', borderRadius: '16px', border: '1px solid var(--glass-border)',
                            background: 'var(--glass-background)', color: 'var(--text-secondary)',
                            cursor: 'pointer', fontSize: '0.75rem'
                        }}>{action.label}</button>
                    ))}
                </div>
            </div>

            {/* Combo Quick Actions */}
            <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.3rem', textAlign: 'center' }}>🎯 Card + Voucher Combos</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                    {comboActions.map((action, i) => (
                        <button key={i} onClick={() => handleQuickAction(action.query)} style={{
                            padding: '5px 10px', borderRadius: '16px', border: '1px solid rgba(236, 72, 153, 0.3)',
                            background: 'rgba(236, 72, 153, 0.1)', color: '#f472b6',
                            cursor: 'pointer', fontSize: '0.75rem'
                        }}>{action.label}</button>
                    ))}
                </div>
            </div>

            {/* Chat Container */}
            <div className="glass-panel" style={{ height: '420px', overflowY: 'auto', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                padding: '12px 16px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                background: msg.role === 'user' ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))' : 'rgba(255,255,255,0.05)',
                                color: msg.role === 'user' ? '#000' : 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.5', whiteSpace: 'pre-wrap'
                            }} dangerouslySetInnerHTML={{
                                __html: msg.content
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/## (.*?)(?:\n|$)/g, '<h3 style="margin: 0.5rem 0; font-size: 1.05rem;">$1</h3>')
                                    .replace(/### (.*?)(?:\n|$)/g, '<h4 style="margin: 0.3rem 0; font-size: 0.95rem; color: var(--accent-cyan);">$1</h4>')
                                    .replace(/- (.*?)(?:\n|$)/g, '<div style="margin-left: 0.8rem;">• $1</div>')
                                    .replace(/\n/g, '<br/>')
                            }} />

                            {/* Copy button for assistant messages */}
                            {msg.role === 'assistant' && i > 0 && (
                                <button
                                    onClick={() => handleCopy(msg.content, i)}
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        padding: '4px 8px',
                                        background: copiedIndex === i ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.7rem',
                                        color: copiedIndex === i ? '#22c55e' : 'var(--text-secondary)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    title="Copy response"
                                >
                                    {copiedIndex === i ? '✓ Copied' : '📋 Copy'}
                                </button>
                            )}
                        </div>

                        {msg.cards?.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                {msg.cards.map(card => (
                                    <Link key={card.id} to={`/card-guide/${card.id}`} style={{
                                        display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 8px',
                                        background: 'rgba(0, 212, 255, 0.1)', borderRadius: '6px',
                                        border: '1px solid rgba(0, 212, 255, 0.3)', textDecoration: 'none',
                                        color: 'var(--accent-cyan)', fontSize: '0.7rem'
                                    }}>💳 {card.name.split(' ').slice(0, 2).join(' ')} →</Link>
                                ))}
                            </div>
                        )}

                        {msg.vouchers?.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                                {msg.vouchers.map(voucher => (
                                    <Link key={voucher.id} to={`/voucher/${voucher.id}`} style={{
                                        display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 8px',
                                        background: 'rgba(236, 72, 153, 0.1)', borderRadius: '6px',
                                        border: '1px solid rgba(236, 72, 153, 0.3)', textDecoration: 'none',
                                        color: '#f472b6', fontSize: '0.7rem'
                                    }}>🎫 {voucher.brand} →</Link>
                                ))}
                            </div>
                        )}

                        {/* Follow-up suggestions */}
                        {msg.role === 'assistant' && msg.followUps?.length > 0 && i === messages.length - 1 && (
                            <div style={{ marginTop: '0.75rem' }}>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>💡 Follow-up questions:</p>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    {msg.followUps.map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuickAction(suggestion)}
                                            style={{
                                                padding: '5px 10px',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                                background: 'rgba(139, 92, 246, 0.1)',
                                                color: 'var(--accent-purple)',
                                                cursor: 'pointer',
                                                fontSize: '0.75rem',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            {suggestion}
                                        </button>
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
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about cards, vouchers, or combos..."
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--glass-background)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
                />
                <button type="submit" style={{
                    padding: '12px 20px', borderRadius: '12px', border: 'none',
                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
                    color: '#000', fontWeight: '600', cursor: 'pointer'
                }}>Ask</button>
            </form>

            <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
        </div>
    );
};

export default AskAI;
