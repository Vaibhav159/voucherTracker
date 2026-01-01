import { useState, useMemo, useCallback } from 'react';
import { creditCards } from '../data/creditCards';
import { SPENDING_PRESETS, SPENDING_CATEGORIES, BANKS } from '../data/calculatorConfig';

const parseAnnualFee = (feeString) => {
    if (!feeString || feeString.toLowerCase().includes('free')) return 0;
    const match = feeString.match(/₹?([\d,]+)/);
    return match ? parseInt(match[1].replace(/,/g, '')) : 0;
};

const loadSavedSpending = () => {
    try {
        const saved = localStorage.getItem('rewardsCalcSpending');
        if (saved) return JSON.parse(saved);
    } catch { }
    return null;
};

const RewardsCalculator = () => {
    const [spending, setSpending] = useState(() => loadSavedSpending() || SPENDING_PRESETS.family.spending);
    const [savedMessage, setSavedMessage] = useState('');
    const [selectedBank, setSelectedBank] = useState('All Banks');
    const [searchQuery, setSearchQuery] = useState('');
    const [showOnlyLTF, setShowOnlyLTF] = useState(false);
    const [rewardTypeFilter, setRewardTypeFilter] = useState('all');
    const [expandedCard, setExpandedCard] = useState(null);

    const handleSpendingChange = useCallback((category, value) => {
        setSpending(prev => ({ ...prev, [category]: Math.max(0, parseInt(value) || 0) }));
    }, []);

    const handlePreset = useCallback((presetKey) => {
        setSpending(SPENDING_PRESETS[presetKey].spending);
    }, []);

    const saveSpendingProfile = useCallback(() => {
        localStorage.setItem('rewardsCalcSpending', JSON.stringify(spending));
        setSavedMessage('✓ Saved!');
        setTimeout(() => setSavedMessage(''), 2000);
    }, [spending]);

    const totalMonthlySpend = useMemo(() => Object.values(spending).reduce((a, b) => a + b, 0), [spending]);

    const cardRewards = useMemo(() => {
        // Filter only cards that have calculator data (nested in rewards.calculator)
        const activeCards = creditCards.filter(c => c.rewards?.calculator);

        return activeCards.map(card => {
            const calc = card.rewards.calculator;
            const rewardType = card.rewards?.type || 'points';
            const annualFee = card.fees?.annual || 0;
            const annualFeeStr = annualFee === 0 ? 'Lifetime Free' : `₹${annualFee.toLocaleString('en-IN')}`;

            let monthlyRewards = 0;
            let rewardBreakdown = [];
            let cappedAmount = null;

            if (calc.specialLogic === 'onecard') {
                const sorted = [spending.online, spending.dining, spending.fuel, spending.groceries, spending.travel, spending.utilities].sort((a, b) => b - a);
                const topTwoTotal = sorted[0] + sorted[1];
                monthlyRewards = (topTwoTotal * 0.01) + ((totalMonthlySpend - topTwoTotal) * 0.002);
                rewardBreakdown.push('1% top 2 cats', '0.2% rest');
            } else {
                let catRewards = 0;
                let catSpend = 0;

                // Calculate category-specific rewards
                if (calc.categories) {
                    Object.entries(calc.categories).forEach(([catKey, det]) => {
                        const sp = spending[catKey] || 0;
                        if (sp > 0) {
                            let rw = sp * det.rate;
                            if (det.cap) {
                                rw = Math.min(rw, det.cap);
                            }
                            catRewards += rw;
                            catSpend += sp;
                            // Only add to breakdown if significant
                            if (rw > 0) rewardBreakdown.push(det.label || `${det.rate * 100}% ${catKey}`);
                        }
                    });
                }

                // Base rewards on remaining spend (use card's baseRate or calc's baseRate)
                const baseRate = calc.baseRate || card.rewards?.baseRate || 0;
                const remainingSpend = Math.max(0, totalMonthlySpend - catSpend);
                const baseReward = remainingSpend * baseRate;

                monthlyRewards = catRewards + baseReward;

                if (Object.keys(calc.categories || {}).length === 0 && baseRate) {
                    rewardBreakdown.push(`${(baseRate * 100).toFixed(1)}% base`);
                }
            }

            // Apply overall monthly cap if exists
            if (calc.monthlyCap && monthlyRewards > calc.monthlyCap) {
                monthlyRewards = calc.monthlyCap;
                cappedAmount = calc.monthlyCap;
            }

            const annualRewards = monthlyRewards * 12;
            const netAnnualValue = annualRewards - annualFee;
            const effectiveRate = totalMonthlySpend > 0 ? ((monthlyRewards / totalMonthlySpend) * 100).toFixed(2) : '0.00';

            return {
                ...card,
                ...calc, // Spread calculator props like feeWaiver, highlight, tier
                rewardType,
                annualFee: annualFeeStr,
                annualFeeAmount: annualFee,
                monthlyRewards: Math.round(monthlyRewards),
                annualRewards: Math.round(annualRewards),
                netAnnualValue: Math.round(netAnnualValue),
                effectiveRate,
                rewardBreakdown,
                cappedAmount,
                isCapped: cappedAmount !== null
            };
        }).sort((a, b) => b.netAnnualValue - a.netAnnualValue);
    }, [spending, totalMonthlySpend]);


    const filteredCards = useMemo(() => {
        return cardRewards.filter(card => {
            if (selectedBank !== 'All Banks' && card.bank !== selectedBank) return false;
            if (searchQuery && !card.name.toLowerCase().includes(searchQuery.toLowerCase()) && !card.bank.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (showOnlyLTF && card.annualFeeAmount > 0) return false;
            if (rewardTypeFilter !== 'all' && card.rewardType !== rewardTypeFilter) return false;
            return true;
        });
    }, [cardRewards, selectedBank, searchQuery, showOnlyLTF, rewardTypeFilter]);

    const bestCard = filteredCards[0];

    return (
        <div style={{ minHeight: '100vh', padding: '2rem 1rem 4rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
                <h1 className="text-gradient" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '800', marginBottom: '0.5rem' }}>Credit Card Rewards Calculator</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Compare <strong style={{ color: '#22c55e' }}>{cardRewards.length} cards</strong> across <strong style={{ color: '#06b6d4' }}>{BANKS.length - 1} banks</strong></p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 380px) 1fr', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }} className="calc-grid">
                {/* Left Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>Monthly Spending</h2>
                            <button onClick={saveSpendingProfile} style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', background: savedMessage ? 'rgba(34,197,94,0.2)' : 'rgba(139,92,246,0.2)', color: savedMessage ? '#22c55e' : '#a78bfa', fontSize: '0.7rem', cursor: 'pointer' }}>{savedMessage || '💾 Save'}</button>
                        </div>
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            {Object.entries(SPENDING_PRESETS).map(([k, p]) => (
                                <button key={k} onClick={() => handlePreset(k)} style={{ padding: '4px 8px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', fontSize: '0.65rem', cursor: 'pointer' }}>{p.label}</button>
                            ))}
                        </div>
                        {SPENDING_CATEGORIES.map(cat => (
                            <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${cat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{cat.icon}</span>
                                <span style={{ flex: 1, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{cat.label}</span>
                                <div style={{ position: 'relative', width: '90px' }}>
                                    <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>₹</span>
                                    <input type="number" value={spending[cat.key]} onChange={(e) => handleSpendingChange(cat.key, e.target.value)} style={{ width: '100%', padding: '6px 6px 6px 22px', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)', fontSize: '0.85rem', textAlign: 'right' }} />
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.1))', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Total Monthly</span>
                            <span style={{ fontSize: '1.3rem', fontWeight: '700', background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₹{totalMonthlySpend.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    {bestCard && (
                        <div style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(6,182,212,0.1))', borderRadius: '16px', border: '1px solid rgba(34,197,94,0.2)', padding: '1rem' }}>
                            <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: '#22c55e' }}>🏆 Best Match</h3>
                            <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>{bestCard.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{bestCard.bank} • {bestCard.annualFee}</div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div><div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#22c55e' }}>₹{bestCard.netAnnualValue.toLocaleString('en-IN')}</div><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Net/yr</div></div>
                                <div><div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#06b6d4' }}>{bestCard.effectiveRate}%</div><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Effective</div></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel */}
                <div>
                    <div className="glass-panel" style={{ padding: '0.75rem 1rem', marginBottom: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <input type="text" placeholder="Search cards..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1, minWidth: '150px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
                        <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)', fontSize: '0.8rem', cursor: 'pointer' }}>
                            {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <div style={{ display: 'flex', gap: '2px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '2px' }}>
                            {[{ v: 'all', l: 'All' }, { v: 'cashback', l: '💵' }, { v: 'points', l: '🎯' }].map(o => (
                                <button key={o.v} onClick={() => setRewardTypeFilter(o.v)} style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', background: rewardTypeFilter === o.v ? 'rgba(139,92,246,0.3)' : 'transparent', color: rewardTypeFilter === o.v ? '#a78bfa' : 'var(--text-secondary)', fontSize: '0.7rem', cursor: 'pointer' }}>{o.l}</button>
                            ))}
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                            <input type="checkbox" checked={showOnlyLTF} onChange={(e) => setShowOnlyLTF(e.target.checked)} style={{ accentColor: '#8b5cf6' }} /> Free only
                        </label>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{filteredCards.length} Cards Ranked</div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '65vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
                        {filteredCards.map((card, idx) => (
                            <div key={card.id} onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)} style={{ background: idx === 0 ? 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(6,182,212,0.08))' : 'rgba(255,255,255,0.03)', borderRadius: '12px', border: idx === 0 ? '1px solid rgba(34,197,94,0.3)' : '1px solid var(--glass-border)', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '35px 1fr auto', gap: '0.75rem', alignItems: 'center' }}>
                                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: idx === 0 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : idx === 1 ? 'linear-gradient(135deg, #9ca3af, #6b7280)' : idx === 2 ? 'linear-gradient(135deg, #d97706, #b45309)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.7rem', color: idx < 3 ? '#000' : 'var(--text-secondary)' }}>{idx + 1}</div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>{card.name}</span>
                                            {card.isCapped && <span style={{ fontSize: '0.55rem', padding: '2px 5px', borderRadius: '3px', background: 'rgba(251,191,36,0.2)', color: '#fbbf24' }}>Capped</span>}
                                            {card.annualFeeAmount === 0 && <span style={{ fontSize: '0.55rem', padding: '2px 5px', borderRadius: '3px', background: 'rgba(34,197,94,0.2)', color: '#22c55e' }}>LTF</span>}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{card.bank} • {card.annualFee}</div>
                                        {card.rewardBreakdown.length > 0 && <div style={{ fontSize: '0.65rem', color: '#8b5cf6', marginTop: '2px' }}>{card.rewardBreakdown.slice(0, 2).join(' • ')}</div>}
                                    </div>
                                    <div style={{ textAlign: 'right', minWidth: '90px' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: card.netAnnualValue >= 0 ? '#22c55e' : '#ef4444' }}>₹{card.netAnnualValue.toLocaleString('en-IN')}<span style={{ fontSize: '0.65rem', fontWeight: '400', color: 'var(--text-secondary)' }}>/yr</span></div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{card.effectiveRate}% eff.</div>
                                        <span style={{ display: 'inline-block', marginTop: '3px', padding: '2px 5px', borderRadius: '3px', fontSize: '0.55rem', background: card.rewardType === 'cashback' ? 'rgba(34,197,94,0.15)' : 'rgba(139,92,246,0.15)', color: card.rewardType === 'cashback' ? '#4ade80' : '#a78bfa' }}>{card.rewardType === 'cashback' ? '💵' : '🎯'}</span>
                                    </div>
                                </div>
                                {expandedCard === card.id && (
                                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--glass-border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                                        <div><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Monthly</div><div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#06b6d4' }}>₹{card.monthlyRewards.toLocaleString('en-IN')}</div></div>
                                        <div><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Annual</div><div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#22c55e' }}>₹{card.annualRewards.toLocaleString('en-IN')}</div></div>
                                        <div><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Fee</div><div style={{ fontSize: '0.9rem', fontWeight: '600', color: card.annualFeeAmount > 0 ? '#f87171' : '#22c55e' }}>{card.annualFeeAmount > 0 ? `−₹${card.annualFeeAmount.toLocaleString('en-IN')}` : 'Free'}</div></div>
                                        <div><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Tier</div><div style={{ fontSize: '0.8rem', fontWeight: '500', color: card.tier === 'super-premium' ? '#fbbf24' : card.tier === 'premium' ? '#8b5cf6' : card.tier === 'co-branded' ? '#06b6d4' : 'var(--text-secondary)', textTransform: 'capitalize' }}>{(card.tier || 'Standard').replace('-', ' ')}</div></div>
                                        {card.feeWaiver && <div style={{ gridColumn: '1/-1' }}><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Fee Waiver</div><div style={{ fontSize: '0.8rem', color: '#22c55e' }}>{card.feeWaiver}</div></div>}
                                        <div style={{ gridColumn: '1/-1' }}><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Highlights</div><div style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{card.highlight}</div></div>

                                        {card.portals && (
                                            <div style={{ gridColumn: '1/-1', marginTop: '0.5rem', background: 'rgba(139, 92, 246, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px dashed rgba(139, 92, 246, 0.4)' }}>
                                                <div style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 'bold', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🚀 Portal Multipliers</div>
                                                <div style={{ display: 'grid', gap: '0.4rem' }}>
                                                    {card.portals.map((p, pIdx) => (
                                                        <div key={pIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                                            <span style={{ color: 'var(--text-primary)' }}>{p.name}</span>
                                                            <span style={{ fontWeight: '600', color: '#22c55e' }}>{p.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <p style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>* Data verified from official sources (Dec 2025). Estimates only - actual rewards vary.</p>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) { .calc-grid { grid-template-columns: 1fr !important; } }
        input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type="number"] { -moz-appearance: textfield; }
        select option { background: var(--bg-secondary); color: var(--text-primary); }
      `}</style>
        </div>
    );
};

export default RewardsCalculator;
