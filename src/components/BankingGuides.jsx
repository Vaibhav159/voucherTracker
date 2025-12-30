import { useState, useMemo } from 'react';
import { familyBanking, wealthBanking, getBankNames } from '../data/bankingPrograms';
import { useFavorites } from '../context/FavoritesContext';

// Helper to parse NRV string to number (in lakhs)
const parseNRV = (nrvStr) => {
    if (!nrvStr) return 0;
    const lower = nrvStr.toLowerCase();

    // Extract the first number
    const match = lower.match(/₹?([\d.]+)\s*(lakh|l|crore|cr)/i);
    if (!match) return 0;

    const num = parseFloat(match[1]);
    const unit = match[2].toLowerCase();

    if (unit.startsWith('cr')) {
        return num * 100; // Convert crores to lakhs
    }
    return num; // Already in lakhs
};

const BankingGuides = () => {
    const [activeTab, setActiveTab] = useState('wealth');
    const [selectedBank, setSelectedBank] = useState('HDFC Bank');
    const [showEligibilityChecker, setShowEligibilityChecker] = useState(false);
    const [userBalance, setUserBalance] = useState('');
    const [showAllBanks, setShowAllBanks] = useState(false);

    const bankNames = getBankNames();

    // Calculate eligible tier based on user's balance
    const eligibleTier = useMemo(() => {
        if (!userBalance || !selectedBank) return null;

        const balanceInLakhs = parseFloat(userBalance);
        if (isNaN(balanceInLakhs) || balanceInLakhs <= 0) return null;

        const bankData = wealthBanking[selectedBank];
        if (!bankData) return null;

        let matchedTier = null;

        for (const tier of bankData.tiers) {
            const minNRV = parseNRV(tier.minNRV);
            if (balanceInLakhs >= minNRV) {
                matchedTier = tier;
            }
        }

        return matchedTier;
    }, [userBalance, selectedBank]);

    return (
        <div style={{ padding: '1rem 0 4rem' }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    Banking Guides
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                    Understand wealth tiers and family banking programs at top Indian banks
                </p>
            </header>

            {/* Tab Switcher */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '2rem'
            }}>
                {[
                    { id: 'wealth', label: '💎 Wealth Banking', icon: '💎' },
                    { id: 'family', label: '👨‍👩‍👧‍👦 Family Banking', icon: '👨‍👩‍👧‍👦' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: activeTab === tab.id
                                ? '1px solid var(--accent-cyan)'
                                : '1px solid var(--glass-border)',
                            background: activeTab === tab.id
                                ? 'rgba(6, 182, 212, 0.15)'
                                : 'rgba(255,255,255,0.05)',
                            color: activeTab === tab.id
                                ? 'var(--accent-cyan)'
                                : 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: activeTab === tab.id ? '600' : '400',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Eligibility Checker */}
            <div className="glass-panel" style={{
                padding: '1rem 1.5rem',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                textAlign: 'center'
            }}>
                <button
                    onClick={() => setShowEligibilityChecker(!showEligibilityChecker)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: showEligibilityChecker ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                        color: showEligibilityChecker ? '#4ade80' : 'var(--accent-purple)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}
                >
                    🎯 {showEligibilityChecker ? 'Hide' : 'Check My'} Eligibility
                </button>

                {showEligibilityChecker && (
                    <div style={{ marginTop: '1rem' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                            Enter your total balance with {selectedBank} (in Lakhs):
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>₹</span>
                            <input
                                type="number"
                                placeholder="e.g. 25"
                                value={userBalance}
                                onChange={(e) => setUserBalance(e.target.value)}
                                style={{
                                    padding: '10px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    width: '120px',
                                    textAlign: 'center'
                                }}
                            />
                            <span style={{ color: 'var(--text-secondary)' }}>Lakhs</span>
                        </div>

                        {/* Result */}
                        {userBalance && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                borderRadius: '8px',
                                background: eligibleTier
                                    ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(6, 182, 212, 0.2))'
                                    : 'rgba(239, 68, 68, 0.1)'
                            }}>
                                {eligibleTier ? (
                                    <>
                                        <p style={{ color: '#4ade80', margin: '0 0 0.5rem', fontWeight: '600' }}>
                                            ✓ You qualify for: {eligibleTier.name}
                                        </p>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.85rem' }}>
                                            Eligible cards: {eligibleTier.eligibleCards.join(', ')}
                                        </p>
                                        {eligibleTier.rm && (
                                            <p style={{ color: 'var(--accent-cyan)', margin: '0.5rem 0 0', fontSize: '0.8rem' }}>
                                                ✓ Includes dedicated Relationship Manager
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <p style={{ color: '#ef4444', margin: 0 }}>
                                        Balance below minimum tier. Maintain higher NRV for benefits.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bank Selection Pills */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                maxWidth: '800px',
                margin: '0 auto 2rem'
            }}>
                {(showAllBanks ? bankNames : bankNames.slice(0, 5)).map(bank => (
                    <button
                        key={bank}
                        onClick={() => setSelectedBank(bank)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            border: selectedBank === bank
                                ? '1px solid var(--accent-cyan)'
                                : '1px solid var(--glass-border)',
                            background: selectedBank === bank
                                ? 'rgba(6, 182, 212, 0.2)'
                                : 'transparent',
                            color: selectedBank === bank
                                ? 'var(--accent-cyan)'
                                : 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        {bank}
                    </button>
                ))}
                {bankNames.length > 5 && (
                    <button
                        onClick={() => setShowAllBanks(!showAllBanks)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(139, 92, 246, 0.1)',
                            color: 'var(--accent-purple)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                        }}
                    >
                        {showAllBanks ? '− Less' : `+${bankNames.length - 5} more`}
                    </button>
                )}
            </div>

            {/* Content */}
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {activeTab === 'wealth' && <WealthBankingContent bank={selectedBank} />}
                {activeTab === 'family' && <FamilyBankingContent bank={selectedBank} />}
            </div>
        </div>
    );
};

// Wealth Banking Component
const WealthBankingContent = ({ bank }) => {
    const bankData = wealthBanking[bank];
    const { isGuideFavorite, toggleFavoriteGuide } = useFavorites();
    if (!bankData) return <div>Bank data not available</div>;

    return (
        <div>
            <h3 style={{
                textAlign: 'center',
                marginBottom: '1.5rem',
                color: 'var(--text-primary)'
            }}>
                {bank} Wealth Banking Tiers
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem'
            }}>
                {bankData.tiers.map((tier, idx) => (
                    <div
                        key={idx}
                        className="glass-panel"
                        style={{
                            padding: '1.5rem',
                            borderTop: `3px solid ${getTierColor(idx, bankData.tiers.length)}`
                        }}
                    >
                        {/* Tier Header */}
                        <div style={{ marginBottom: '1rem' }}>
                            <h4 style={{
                                margin: '0 0 0.5rem',
                                color: getTierColor(idx, bankData.tiers.length),
                                fontSize: '1.2rem'
                            }}>
                                {tier.name}
                            </h4>
                            <div style={{
                                fontSize: '0.9rem',
                                color: 'var(--accent-cyan)',
                                fontWeight: '600'
                            }}>
                                {tier.minNRV}
                            </div>
                        </div>

                        {/* Eligible Cards */}
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '0.25rem'
                            }}>
                                Eligible Cards
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                {tier.eligibleCards.map((card, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.75rem',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {card}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '0.25rem'
                            }}>
                                Benefits
                            </div>
                            <ul style={{
                                margin: 0,
                                paddingLeft: '1rem',
                                fontSize: '0.8rem',
                                color: 'var(--text-primary)'
                            }}>
                                {tier.benefits.map((benefit, i) => (
                                    <li key={i} style={{ marginBottom: '0.25rem' }}>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* RM Badge */}
                        {tier.rm && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '0.5rem',
                                background: 'rgba(34, 197, 94, 0.1)',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                color: '#4ade80',
                                textAlign: 'center'
                            }}>
                                ✓ Dedicated Relationship Manager
                            </div>
                        )}

                        {/* Key Takeaways */}
                        <div className="key-takeaways-box">
                            <h5>💡 Key Takeaways</h5>
                            <ul>
                                <li>Best card: {tier.eligibleCards[0]}</li>
                                <li>{tier.benefits[0]}</li>
                                {tier.rm && <li>Dedicated RM included</li>}
                            </ul>
                        </div>

                        {/* Bookmark Button */}
                        <button
                            className={`bookmark-btn ${isGuideFavorite(`${bank}::wealth::${tier.name}`) ? 'active' : ''}`}
                            onClick={() => toggleFavoriteGuide(`${bank}::wealth::${tier.name}`)}
                            style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                        >
                            {isGuideFavorite(`${bank}::wealth::${tier.name}`) ? '🔖 Bookmarked' : '🔖 Bookmark'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Family Banking Component
const FamilyBankingContent = ({ bank }) => {
    const bankData = familyBanking[bank];
    if (!bankData) return <div>Bank data not available</div>;

    return (
        <div>
            <div className="glass-panel" style={{
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h3 style={{
                        margin: '0 0 0.5rem',
                        color: 'var(--text-primary)',
                        fontSize: '1.4rem'
                    }}>
                        {bankData.name}
                    </h3>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'rgba(6, 182, 212, 0.2)',
                        borderRadius: '20px',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.9rem'
                    }}>
                        Min Combined NRV: {bankData.minNRV}
                    </div>
                </div>

                {/* Eligible Members */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        marginBottom: '0.5rem'
                    }}>
                        👨‍👩‍👧‍👦 Eligible Family Members (Max {bankData.maxMembers})
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {bankData.eligibleMembers.map((member, i) => (
                            <span key={i} style={{
                                padding: '0.5rem 1rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                fontSize: '0.85rem',
                                color: 'var(--text-primary)'
                            }}>
                                {member}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Benefits */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        marginBottom: '0.5rem'
                    }}>
                        ✨ Benefits
                    </h4>
                    <ul style={{
                        margin: 0,
                        paddingLeft: '1.5rem',
                        color: 'var(--text-primary)'
                    }}>
                        {bankData.benefits.map((benefit, i) => (
                            <li key={i} style={{
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem'
                            }}>
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* How to Apply */}
                <div style={{
                    padding: '1rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                }}>
                    <h4 style={{
                        color: '#4ade80',
                        fontSize: '0.85rem',
                        margin: '0 0 0.5rem'
                    }}>
                        📝 How to Apply
                    </h4>
                    <p style={{
                        margin: 0,
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem'
                    }}>
                        {bankData.howToApply}
                    </p>
                </div>

                {/* Notes */}
                {bankData.notes && (
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(251, 191, 36, 0.1)',
                        borderRadius: '8px',
                        borderLeft: '3px solid #fbbf24'
                    }}>
                        <p style={{
                            margin: 0,
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem'
                        }}>
                            💡 {bankData.notes}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper function for tier colors
const getTierColor = (idx, total) => {
    const colors = ['#9ca3af', '#60a5fa', '#a78bfa', '#fbbf24'];
    return colors[Math.min(idx, colors.length - 1)];
};

export default BankingGuides;
