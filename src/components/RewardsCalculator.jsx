import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { creditCards } from '../data/creditCards';

// Spending presets for quick setup
const SPENDING_PRESETS = {
    student: {
        label: '🎓 Student',
        spending: { online: 3000, dining: 2000, fuel: 0, groceries: 1000, travel: 500, utilities: 500, other: 2000 }
    },
    family: {
        label: '👨‍👩‍👧‍👦 Family',
        spending: { online: 8000, dining: 5000, fuel: 4000, groceries: 10000, travel: 3000, utilities: 5000, other: 5000 }
    },
    professional: {
        label: '💼 Professional',
        spending: { online: 10000, dining: 8000, fuel: 5000, groceries: 5000, travel: 15000, utilities: 3000, other: 10000 }
    },
    minimal: {
        label: '🌿 Minimal',
        spending: { online: 2000, dining: 1000, fuel: 1000, groceries: 3000, travel: 0, utilities: 2000, other: 1000 }
    }
};

// Load saved spending from localStorage
const loadSavedSpending = () => {
    try {
        const saved = localStorage.getItem('rewardsCalcSpending');
        if (saved) return JSON.parse(saved);
    } catch { }
    return null;
};

const RewardsCalculator = () => {
    // Spending categories with monthly amounts
    const [spending, setSpending] = useState(() =>
        loadSavedSpending() || {
            online: 5000,
            dining: 3000,
            fuel: 3000,
            groceries: 5000,
            travel: 2000,
            utilities: 3000,
            other: 5000
        }
    );
    const [savedMessage, setSavedMessage] = useState('');

    const handleSpendingChange = (category, value) => {
        const numValue = parseInt(value) || 0;
        setSpending(prev => ({ ...prev, [category]: numValue }));
    };

    const handlePreset = (presetKey) => {
        setSpending(SPENDING_PRESETS[presetKey].spending);
    };

    const saveSpendingProfile = () => {
        localStorage.setItem('rewardsCalcSpending', JSON.stringify(spending));
        setSavedMessage('Profile saved!');
        setTimeout(() => setSavedMessage(''), 2000);
    };

    const totalMonthlySpend = Object.values(spending).reduce((a, b) => a + b, 0);

    // Calculate rewards for each card based on spending pattern
    const cardRewards = useMemo(() => {
        return creditCards.map(card => {
            let monthlyRewards = 0;
            let rewardBreakdown = [];
            let cappedAmount = null;

            // Parse reward rate to get base percentage (capped at 5% to avoid misinterpreting accelerated rates)
            const getBaseRate = () => {
                const rate = card.rewardRate || '';
                // Look for base rate patterns, avoid accelerated rates
                const match = rate.match(/(\d+\.?\d*)%/);
                if (match) {
                    const parsedRate = parseFloat(match[1]) / 100;
                    // Cap at 5% - anything higher is likely an accelerated/category rate
                    return Math.min(parsedRate, 0.05);
                }
                return 0.01; // Default 1%
            };

            const baseRate = getBaseRate();

            // Special card calculations
            const cardName = card.name.toLowerCase();

            // SBI Cashback: 5% online, 1% offline - ₹5000/mo cap
            if (cardName.includes('sbi cashback')) {
                monthlyRewards += spending.online * 0.05;
                monthlyRewards += (totalMonthlySpend - spending.online) * 0.01;
                rewardBreakdown.push('5% online, 1% other');
                cappedAmount = 5000;
            }
            // Amazon Pay ICICI: 5% Amazon (as online), 2% other - NO CAP
            else if (cardName.includes('amazon pay')) {
                monthlyRewards += spending.online * 0.05;
                monthlyRewards += (totalMonthlySpend - spending.online) * 0.02;
                rewardBreakdown.push('5% Amazon, 2% other');
            }
            // HDFC Swiggy: 10% Swiggy (as dining), 5% online - ₹3500/mo cap
            else if (cardName.includes('swiggy')) {
                monthlyRewards += Math.min(spending.dining * 0.10, 1500);
                monthlyRewards += Math.min(spending.online * 0.05, 1500);
                monthlyRewards += Math.min((totalMonthlySpend - spending.dining - spending.online) * 0.01, 500);
                rewardBreakdown.push('10% Swiggy, 5% online');
                cappedAmount = 3500;
            }
            // Axis Airtel: 25% Airtel (as utilities)
            else if (cardName.includes('airtel')) {
                monthlyRewards += spending.utilities * 0.25;
                monthlyRewards += (totalMonthlySpend - spending.utilities) * 0.01;
                rewardBreakdown.push('25% Airtel bills');
            }
            // Fuel cards: BPCL, HPCL, IndianOil - typically ₹400/mo cap
            else if (cardName.includes('bpcl') || cardName.includes('hpcl') || cardName.includes('power+') || cardName.includes('indian oil')) {
                monthlyRewards += Math.min(spending.fuel * 0.04, 400);
                monthlyRewards += (totalMonthlySpend - spending.fuel) * 0.01;
                rewardBreakdown.push('4% fuel (₹400 cap)');
                cappedAmount = 400;
            }
            // Travel cards: Scapia, Atlas, Infinia - NO CAP
            else if (cardName.includes('scapia') || cardName.includes('atlas') || cardName.includes('infinia') || cardName.includes('diners black')) {
                monthlyRewards += spending.travel * 0.05;
                monthlyRewards += spending.online * 0.033;
                monthlyRewards += (totalMonthlySpend - spending.travel - spending.online) * 0.033;
                rewardBreakdown.push('3.3% base, 5% travel');
            }
            // HDFC Millennia: 5% on 10 merchants - ₹2000/mo cap
            else if (cardName.includes('millennia')) {
                monthlyRewards += Math.min(spending.online * 0.05, 1000);
                monthlyRewards += Math.min((totalMonthlySpend - spending.online) * 0.01, 1000);
                rewardBreakdown.push('5% on 10 brands');
                cappedAmount = 2000;
            }
            // Flipkart Axis: 5% Flipkart - ₹4000/quarter cap
            else if (cardName.includes('flipkart')) {
                monthlyRewards += Math.min(spending.online * 0.05, 1333); // ~4000/3
                monthlyRewards += (totalMonthlySpend - spending.online) * 0.01;
                rewardBreakdown.push('5% Flipkart (₹4k/qtr)');
                cappedAmount = 1333;
            }
            // OneCard: 5% on top 2 categories - NO CAP
            else if (cardName.includes('onecard')) {
                const topTwo = [spending.online, spending.dining, spending.fuel, spending.groceries]
                    .sort((a, b) => b - a).slice(0, 2);
                monthlyRewards += topTwo.reduce((a, b) => a + b, 0) * 0.05;
                monthlyRewards += (totalMonthlySpend - topTwo.reduce((a, b) => a + b, 0)) * 0.02;
                rewardBreakdown.push('5% top 2 cats, no cap');
            }
            // Shoprite: 5% grocery
            else if (cardName.includes('shoprite')) {
                monthlyRewards += spending.groceries * 0.05;
                monthlyRewards += (totalMonthlySpend - spending.groceries) * 0.01;
                rewardBreakdown.push('5% groceries');
            }
            // IDFC First Wealth: 10X on >20k txn
            else if (cardName.includes('idfc first wealth')) {
                monthlyRewards += totalMonthlySpend * 0.025; // Approx 2.5% effective
                rewardBreakdown.push('10X on >₹20k txns');
            }
            // Default calculation
            else {
                monthlyRewards = totalMonthlySpend * baseRate;
                rewardBreakdown.push(`${(baseRate * 100).toFixed(1)}% base`);
            }

            // Apply monthly cap from card data if available
            if (card.rewardCaps?.monthly) {
                const capStr = card.rewardCaps.monthly;
                const capMatch = capStr.match(/₹?([\d,]+)/);
                if (capMatch && !capStr.toLowerCase().includes('no cap')) {
                    const cap = parseInt(capMatch[1].replace(/,/g, ''));
                    if (monthlyRewards > cap) {
                        monthlyRewards = cap;
                        cappedAmount = cap;
                    }
                }
            }

            // Calculate annual fee impact
            const annualFee = card.annualFee || '';
            let feeAmount = 0;
            if (!annualFee.toLowerCase().includes('free')) {
                const feeMatch = annualFee.match(/₹?([\d,]+)/);
                if (feeMatch) {
                    feeAmount = parseInt(feeMatch[1].replace(/,/g, ''));
                }
            }

            const annualRewards = monthlyRewards * 12;
            const netAnnualValue = annualRewards - feeAmount;

            return {
                ...card,
                monthlyRewards: Math.round(monthlyRewards),
                annualRewards: Math.round(annualRewards),
                annualFeeAmount: feeAmount,
                netAnnualValue: Math.round(netAnnualValue),
                rewardBreakdown,
                cappedAmount
            };
        }).sort((a, b) => b.netAnnualValue - a.netAnnualValue);
    }, [spending, totalMonthlySpend]);

    const categories = [
        { key: 'online', label: 'Online Shopping', icon: '🛒', color: '#8b5cf6' },
        { key: 'dining', label: 'Dining & Food', icon: '🍔', color: '#f59e0b' },
        { key: 'fuel', label: 'Fuel', icon: '⛽', color: '#ef4444' },
        { key: 'groceries', label: 'Groceries', icon: '🥬', color: '#22c55e' },
        { key: 'travel', label: 'Travel', icon: '✈️', color: '#06b6d4' },
        { key: 'utilities', label: 'Bills & Utilities', icon: '💡', color: '#3b82f6' },
        { key: 'other', label: 'Other Spends', icon: '💳', color: '#6b7280' }
    ];

    return (
        <div style={{ padding: '1rem 0 4rem' }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    Rewards Calculator
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                    Enter your monthly spending to find the best credit card for your lifestyle
                </p>
            </header>

            {/* Spending Inputs */}
            <div className="glass-panel" style={{
                padding: '2rem',
                marginBottom: '2rem',
                maxWidth: '800px',
                margin: '0 auto 2rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                        Monthly Spending
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button
                            onClick={saveSpendingProfile}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '8px',
                                border: 'none',
                                background: savedMessage ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.1)',
                                color: savedMessage ? '#22c55e' : 'var(--text-secondary)',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {savedMessage || '💾 Save Profile'}
                        </button>
                    </div>
                </div>

                {/* Presets */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Quick presets:</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {Object.entries(SPENDING_PRESETS).map(([key, preset]) => (
                            <button
                                key={key}
                                onClick={() => handlePreset(key)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = 'rgba(139, 92, 246, 0.2)';
                                    e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = 'rgba(255,255,255,0.05)';
                                    e.target.style.borderColor = 'var(--glass-border)';
                                }}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }}>
                    {categories.map(cat => (
                        <div key={cat.key} style={{
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '12px',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '0.5rem',
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)'
                            }}>
                                <span>{cat.icon}</span>
                                {cat.label}
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-secondary)'
                                }}>₹</span>
                                <input
                                    type="number"
                                    value={spending[cat.key]}
                                    onChange={(e) => handleSpendingChange(cat.key, e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px 10px 28px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--glass-border)',
                                        background: 'rgba(0,0,0,0.2)',
                                        color: 'var(--text-primary)',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(6, 182, 212, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Total Monthly Spend</span>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'var(--accent-cyan)'
                    }}>
                        ₹{totalMonthlySpend.toLocaleString('en-IN')}
                    </span>
                </div>
            </div>

            {/* Results */}
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h3 style={{
                    marginBottom: '1rem',
                    fontSize: '1.2rem',
                    color: 'var(--text-primary)'
                }}>
                    Best Cards for Your Spending
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cardRewards.slice(0, 10).map((card, index) => (
                        <div
                            key={card.id}
                            className="glass-panel"
                            style={{
                                padding: '1.5rem',
                                display: 'grid',
                                gridTemplateColumns: '50px 1fr auto',
                                gap: '1rem',
                                alignItems: 'center'
                            }}
                        >
                            {/* Rank */}
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: index === 0 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                                    : index === 1 ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                                        : index === 2 ? 'linear-gradient(135deg, #d97706, #b45309)'
                                            : 'rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                color: index < 3 ? '#000' : 'var(--text-secondary)'
                            }}>
                                #{index + 1}
                            </div>

                            {/* Card Info */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <h4 style={{ margin: '0', fontSize: '1rem' }}>{card.name}</h4>
                                    {card.cappedAmount && (
                                        <span style={{
                                            fontSize: '0.65rem',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            background: 'rgba(251, 191, 36, 0.2)',
                                            color: '#fbbf24'
                                        }}>
                                            ₹{card.cappedAmount.toLocaleString()}/mo cap
                                        </span>
                                    )}
                                </div>
                                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    {card.bank} • {card.annualFee}
                                </p>
                                {card.rewardBreakdown.length > 0 && (
                                    <p style={{
                                        margin: '0.25rem 0 0',
                                        fontSize: '0.75rem',
                                        color: 'var(--accent-cyan)'
                                    }}>
                                        {card.rewardBreakdown.join(' • ')}
                                    </p>
                                )}
                            </div>

                            {/* Rewards - Enhanced display */}
                            <div style={{ textAlign: 'right', minWidth: '120px' }}>
                                {/* Annual Value - Primary */}
                                <div style={{
                                    fontSize: '1.4rem',
                                    fontWeight: '700',
                                    color: card.netAnnualValue >= 0 ? '#4ade80' : '#ef4444'
                                }}>
                                    ₹{card.netAnnualValue.toLocaleString('en-IN')}
                                    <span style={{
                                        fontSize: '0.8rem',
                                        fontWeight: '400',
                                        color: 'var(--text-secondary)'
                                    }}>/yr</span>
                                </div>
                                {/* Monthly Value - Secondary */}
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    marginTop: '2px'
                                }}>
                                    ₹{card.monthlyRewards.toLocaleString('en-IN')}/mo rewards
                                </div>
                                {/* Fee deduction */}
                                {card.annualFeeAmount > 0 && (
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: '#f87171',
                                        marginTop: '2px'
                                    }}>
                                        − ₹{card.annualFeeAmount.toLocaleString()} annual fee
                                    </div>
                                )}
                                {/* Reward Type Badge */}
                                <div style={{
                                    display: 'inline-block',
                                    marginTop: '4px',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '0.65rem',
                                    background: card.rewardType === 'cashback'
                                        ? 'rgba(34, 197, 94, 0.2)'
                                        : 'rgba(139, 92, 246, 0.2)',
                                    color: card.rewardType === 'cashback'
                                        ? '#4ade80'
                                        : '#a78bfa'
                                }}>
                                    {card.rewardType === 'cashback'
                                        ? '💵 Cashback'
                                        : '🎯 Points'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Note */}
                <p style={{
                    marginTop: '2rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    textAlign: 'center'
                }}>
                    * Calculations are estimates based on typical reward rates. Actual rewards may vary based on
                    specific merchants, promotions, and reward caps.
                </p>
            </div>
        </div>
    );
};

export default RewardsCalculator;
