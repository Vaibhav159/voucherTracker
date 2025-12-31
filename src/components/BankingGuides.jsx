import { useState, useMemo, useEffect } from 'react';
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

// Compare Modal Component
const BankingCompareModal = ({ selectedTiers, onClose, onRemoveTier }) => {
    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (selectedTiers.length === 0) return null;

    return (
        <div className="banking-compare-modal-overlay" onClick={onClose}>
            <div className="banking-compare-modal" onClick={e => e.stopPropagation()}>
                <div className="banking-compare-modal-header">
                    <h2>⚖️ Compare Banking Tiers</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="banking-compare-modal-content">
                    <div className="banking-compare-grid">
                        {selectedTiers.map((item, idx) => (
                            <div key={`${item.bank}-${item.tier.name}-${idx}`} className="banking-compare-column">
                                <div className="banking-compare-column-header">
                                    <div className="bank-name">{item.bank}</div>
                                    <div className="tier-name">{item.tier.name}</div>
                                </div>

                                <div className="banking-compare-section">
                                    <h4>Minimum NRV</h4>
                                    <div className="nrv-value">{item.tier.minNRV}</div>
                                </div>

                                <div className="banking-compare-section">
                                    <h4>Eligible Cards</h4>
                                    <div className="cards-list">
                                        {item.tier.eligibleCards.map((card, i) => (
                                            <span key={i} className="card-tag">{card}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="banking-compare-section">
                                    <h4>Key Benefits</h4>
                                    <ul className="benefits-list">
                                        {item.tier.benefits.slice(0, 5).map((benefit, i) => (
                                            <li key={i}>{benefit}</li>
                                        ))}
                                        {item.tier.benefits.length > 5 && (
                                            <li style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                                +{item.tier.benefits.length - 5} more benefits
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="banking-compare-section">
                                    <h4>Relationship Manager</h4>
                                    <div className={`rm-badge ${item.tier.rm ? 'has-rm' : 'no-rm'}`}>
                                        {item.tier.rm ? '✓ Dedicated RM' : '✗ No RM'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Floating Compare Bar Component
const BankingCompareBar = ({ selectedTiers, onRemoveTier, onClearAll, onCompare }) => {
    if (selectedTiers.length === 0) return null;

    return (
        <div className="banking-compare-bar">
            <div className="compare-items">
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Comparing {selectedTiers.length} tier{selectedTiers.length > 1 ? 's' : ''}:
                </span>
                {selectedTiers.map((item, idx) => (
                    <div key={`${item.bank}-${item.tier.name}-${idx}`} className="compare-chip">
                        <span className="bank-name">{item.bank}</span>
                        <span>{item.tier.name}</span>
                        <button className="remove-btn" onClick={() => onRemoveTier(item)}>×</button>
                    </div>
                ))}
            </div>
            <div className="compare-actions">
                <button className="compare-btn secondary" onClick={onClearAll}>
                    Clear All
                </button>
                <button className="compare-btn primary" onClick={onCompare}>
                    View Comparison →
                </button>
            </div>
        </div>
    );
};

const BankingGuides = () => {
    const [activeTab, setActiveTab] = useState('wealth');
    const [selectedBank, setSelectedBank] = useState('HDFC Bank');
    const [showEligibilityChecker, setShowEligibilityChecker] = useState(false);
    const [userBalance, setUserBalance] = useState('');
    const [showAllBanks, setShowAllBanks] = useState(false);
    const [isTabSwitching, setIsTabSwitching] = useState(false);
    const [isBankSwitching, setIsBankSwitching] = useState(false);

    // Compare feature state
    const [selectedTiersForCompare, setSelectedTiersForCompare] = useState([]);
    const [showCompareModal, setShowCompareModal] = useState(false);

    const bankNames = getBankNames();

    // Handle tab switching with animation
    const handleTabSwitch = (tabId) => {
        if (tabId === activeTab) return;
        setIsTabSwitching(true);
        setTimeout(() => {
            setActiveTab(tabId);
            setIsTabSwitching(false);
        }, 200);
    };

    // Handle bank switching with animation
    const handleBankSwitch = (bank) => {
        if (bank === selectedBank) return;
        setIsBankSwitching(true);
        setTimeout(() => {
            setSelectedBank(bank);
            setIsBankSwitching(false);
        }, 150);
    };

    // Compare feature handlers
    const toggleTierForCompare = (bank, tier) => {
        const exists = selectedTiersForCompare.find(
            item => item.bank === bank && item.tier.name === tier.name
        );

        if (exists) {
            setSelectedTiersForCompare(prev =>
                prev.filter(item => !(item.bank === bank && item.tier.name === tier.name))
            );
        } else {
            if (selectedTiersForCompare.length >= 4) {
                // Show limit message - could use toast here
                return;
            }
            setSelectedTiersForCompare(prev => [...prev, { bank, tier }]);
        }
    };

    const isTierSelected = (bank, tierName) => {
        return selectedTiersForCompare.some(
            item => item.bank === bank && item.tier.name === tierName
        );
    };

    const removeTierFromCompare = (item) => {
        setSelectedTiersForCompare(prev =>
            prev.filter(t => !(t.bank === item.bank && t.tier.name === item.tier.name))
        );
    };

    const clearAllCompare = () => {
        setSelectedTiersForCompare([]);
    };

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
                        onClick={() => handleTabSwitch(tab.id)}
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
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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
                        fontWeight: '500',
                        transition: 'all 0.2s'
                    }}
                >
                    🎯 {showEligibilityChecker ? 'Hide' : 'Check My'} Eligibility
                </button>

                <div style={{
                    maxHeight: showEligibilityChecker ? '300px' : '0',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-out',
                    opacity: showEligibilityChecker ? 1 : 0
                }}>
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
                                    : 'rgba(239, 68, 68, 0.1)',
                                animation: 'fadeInUp 0.3s ease-out'
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
                </div>
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
                        onClick={() => handleBankSwitch(bank)}
                        className={`bank-chip ${selectedBank === bank ? 'active' : ''}`}
                    >
                        {bank}
                    </button>
                ))}
                {bankNames.length > 5 && (
                    <button
                        onClick={() => setShowAllBanks(!showAllBanks)}
                        className="bank-chip"
                        style={{
                            background: 'rgba(139, 92, 246, 0.1)',
                            color: 'var(--accent-purple)',
                            fontWeight: '500'
                        }}
                    >
                        {showAllBanks ? '− Less' : `+${bankNames.length - 5} more`}
                    </button>
                )}
            </div>

            {/* Content */}
            <div
                style={{ maxWidth: '1000px', margin: '0 auto' }}
                className={`banking-tab-content ${isTabSwitching || isBankSwitching ? 'switching' : ''}`}
            >
                {activeTab === 'wealth' && (
                    <WealthBankingContent
                        bank={selectedBank}
                        onToggleCompare={toggleTierForCompare}
                        isTierSelected={isTierSelected}
                    />
                )}
                {activeTab === 'family' && <FamilyBankingContent bank={selectedBank} />}
            </div>

            {/* Compare Bar */}
            <BankingCompareBar
                selectedTiers={selectedTiersForCompare}
                onRemoveTier={removeTierFromCompare}
                onClearAll={clearAllCompare}
                onCompare={() => setShowCompareModal(true)}
            />

            {/* Compare Modal */}
            {showCompareModal && (
                <BankingCompareModal
                    selectedTiers={selectedTiersForCompare}
                    onClose={() => setShowCompareModal(false)}
                    onRemoveTier={removeTierFromCompare}
                />
            )}
        </div>
    );
};

// Wealth Banking Component
const WealthBankingContent = ({ bank, onToggleCompare, isTierSelected }) => {
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
                        className={`glass-panel tier-card animate-fade-in-up stagger-${Math.min(idx + 1, 5)}`}
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

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            {/* Compare Button */}
                            <button
                                className={`tier-compare-checkbox ${isTierSelected(bank, tier.name) ? 'selected' : ''}`}
                                onClick={() => onToggleCompare(bank, tier)}
                                style={{ flex: 1 }}
                            >
                                {isTierSelected(bank, tier.name) ? '✓ Added to Compare' : '⚖️ Compare'}
                            </button>
                        </div>

                        {/* Bookmark Button */}
                        <button
                            className={`bookmark-btn ${isGuideFavorite(`${bank}::wealth::${tier.name}`) ? 'active' : ''}`}
                            onClick={() => toggleFavoriteGuide(`${bank}::wealth::${tier.name}`)}
                            style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
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
        <div className="animate-fade-in-up">
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
