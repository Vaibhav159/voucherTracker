import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { wealthBanking, getBankNames } from '../data/bankingPrograms';
import { useFavorites } from '../context/FavoritesContext';

// Helper to parse NRV string to number for sorting
const parseNRV = (nrvStr) => {
    if (!nrvStr) return 0;
    const match = nrvStr.match(/₹([\d.]+)\s*(L|Cr)/i);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    return unit === 'cr' ? value * 100 : value;
};

// Tier color helper
const getTierColor = (tierName) => {
    const name = tierName?.toLowerCase() || '';
    if (name.includes('private') || name.includes('insignia') || name.includes('burgundy private')) return '#FFD700';
    if (name.includes('premier') || name.includes('imperia') || name.includes('priority')) return '#C0C0C0';
    if (name.includes('preferred') || name.includes('select') || name.includes('first')) return '#06b6d4';
    return '#8B5CF6';
};

const BrowseBanking = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize state from URL params
    const [selectedTiers, setSelectedTiers] = useState(() => {
        const tiersParam = searchParams.get('tiers');
        return tiersParam ? tiersParam.split(',').filter(Boolean) : [];
    });
    const [searchTerm, setSearchTerm] = useState(() => searchParams.get('q') || '');
    const [sortBy, setSortBy] = useState(() => searchParams.get('sort') || 'bank');
    const { isGuideFavorite, toggleFavoriteGuide } = useFavorites();

    // Sync state changes to URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('q', searchTerm);
        if (sortBy && sortBy !== 'bank') params.set('sort', sortBy);
        if (selectedTiers.length > 0) params.set('tiers', selectedTiers.join(','));

        setSearchParams(params, { replace: true });
    }, [searchTerm, sortBy, selectedTiers, setSearchParams]);

    const banks = getBankNames();

    // Flatten all tiers with bank info for grid display
    const allTiers = useMemo(() => {
        const tiers = [];
        banks.forEach(bankName => {
            const bankData = wealthBanking[bankName];
            if (bankData?.tiers) {
                bankData.tiers.forEach((tier, idx) => {
                    tiers.push({
                        id: `${bankName}-${tier.name}`,
                        bank: bankName,
                        tier: tier,
                        tierIndex: idx,
                        totalTiers: bankData.tiers.length,
                        notes: bankData.notes
                    });
                });
            }
        });
        return tiers;
    }, [banks]);

    // Filter and sort tiers
    const filteredTiers = useMemo(() => {
        let result = allTiers;

        // Filter by search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.bank.toLowerCase().includes(term) ||
                item.tier.name.toLowerCase().includes(term) ||
                item.tier.benefits?.some(b => b.toLowerCase().includes(term))
            );
        }

        // Sort
        if (sortBy === 'nrv-low') {
            result = [...result].sort((a, b) => parseNRV(a.tier.minNRV) - parseNRV(b.tier.minNRV));
        } else if (sortBy === 'nrv-high') {
            result = [...result].sort((a, b) => parseNRV(b.tier.minNRV) - parseNRV(a.tier.minNRV));
        } else {
            // Default: group by bank
            result = [...result].sort((a, b) => {
                if (a.bank !== b.bank) return a.bank.localeCompare(b.bank);
                return a.tierIndex - b.tierIndex;
            });
        }

        return result;
    }, [allTiers, searchTerm, sortBy]);

    const toggleTierSelection = (tierId) => {
        setSelectedTiers(prev =>
            prev.includes(tierId)
                ? prev.filter(id => id !== tierId)
                : prev.length < 4
                    ? [...prev, tierId]
                    : prev
        );
    };

    const handleCompareNow = () => {
        const tierIds = selectedTiers.join(',');
        navigate(`/compare-banking?tiers=${tierIds}`);
    };

    const clearSelection = () => {
        setSelectedTiers([]);
    };

    return (
        <div style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
            {/* Header */}
            <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                    Browse Banking Tiers
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {allTiers.length} wealth tiers across {banks.length} banks • Select to compare
                </p>
            </header>

            {/* Search and Filters */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* Search */}
                    <div style={{ flex: '1', minWidth: '250px' }}>
                        <input
                            type="text"
                            placeholder="Search banks, tiers, or benefits..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-primary)',
                                fontSize: '0.95rem'
                            }}
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="bank">Sort by Bank</option>
                        <option value="nrv-low">NRV: Low to High</option>
                        <option value="nrv-high">NRV: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Tier Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem',
                marginBottom: selectedTiers.length > 0 ? '100px' : '2rem'
            }}>
                {filteredTiers.map(item => {
                    const isSelected = selectedTiers.includes(item.id);

                    return (
                        <div
                            key={item.id}
                            className="glass-panel credit-card-item"
                            style={{
                                padding: '1.5rem',
                                cursor: 'pointer',
                                border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                                position: 'relative',
                                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                boxShadow: isSelected ? '0 0 30px rgba(6, 182, 212, 0.2)' : 'none',
                            }}
                            onClick={() => toggleTierSelection(item.id)}
                        >
                            {/* Selection Checkbox - Top Left */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    height: '32px',
                                    width: '32px',
                                    borderRadius: '50%',
                                    border: isSelected ? '2px solid var(--accent-cyan)' : '2px solid rgba(255,255,255,0.25)',
                                    backgroundColor: isSelected ? 'var(--accent-cyan)' : 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: isSelected ? '0 0 15px rgba(6, 182, 212, 0.5)' : 'none'
                                }}
                            >
                                {isSelected && <span style={{ color: '#000', fontSize: '16px', fontWeight: 'bold' }}>✓</span>}
                            </div>

                            {/* Favorite Button - Top Right */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    height: '32px',
                                    width: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: isGuideFavorite(`${item.bank}::wealth::${item.tier.name}`) ? 'rgba(236, 72, 153, 0.2)' : 'rgba(0,0,0,0.4)',
                                    border: isGuideFavorite(`${item.bank}::wealth::${item.tier.name}`) ? '1px solid rgba(236, 72, 153, 0.5)' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavoriteGuide(`${item.bank}::wealth::${item.tier.name}`, `${item.bank} ${item.tier.name}`);
                                }}
                            >
                                <span style={{ fontSize: '14px' }}>
                                    {isGuideFavorite(`${item.bank}::wealth::${item.tier.name}`) ? '❤️' : '🤍'}
                                </span>
                            </div>

                            {/* Bank Icon */}
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '16px',
                                background: `linear-gradient(135deg, ${getTierColor(item.tier.name)}30, ${getTierColor(item.tier.name)}10)`,
                                border: `2px solid ${getTierColor(item.tier.name)}40`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem',
                                fontSize: '1.5rem'
                            }}>
                                🏦
                            </div>

                            {/* Bank & Tier Name */}
                            <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                {item.tier.name}
                            </h3>
                            <p style={{ margin: '0 0 0.8rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                {item.bank}
                            </p>

                            {/* Tier Badge */}
                            <span style={{
                                display: 'inline-block',
                                background: `${getTierColor(item.tier.name)}20`,
                                color: getTierColor(item.tier.name),
                                padding: '4px 12px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                marginBottom: '1rem'
                            }}>
                                Tier {item.tierIndex + 1} of {item.totalTiers}
                            </span>

                            {/* NRV Requirement */}
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '10px',
                                padding: '12px',
                                marginBottom: '1rem'
                            }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '4px' }}>
                                    Minimum Requirement
                                </div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.4 }}>
                                    {item.tier.minNRV || 'Contact bank'}
                                </div>
                            </div>

                            {/* Key Benefits */}
                            <div style={{ fontSize: '0.85rem' }}>
                                <div style={{ color: 'var(--text-secondary)', marginBottom: '6px' }}>Key Benefits:</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {item.tier.benefits?.slice(0, 3).map((benefit, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                background: 'rgba(99, 102, 241, 0.15)',
                                                color: '#a5b4fc',
                                                padding: '4px 10px',
                                                borderRadius: '6px',
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            {benefit}
                                        </span>
                                    ))}
                                    {item.tier.benefits?.length > 3 && (
                                        <span style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.75rem',
                                            padding: '4px'
                                        }}>
                                            +{item.tier.benefits.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* RM Badge */}
                            {item.tier.rm && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '12px',
                                    right: '12px',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    color: '#22c55e',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    fontSize: '0.7rem',
                                    fontWeight: 600
                                }}>
                                    RM Assigned
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredTiers.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <p>No tiers found matching "{searchTerm}"</p>
                </div>
            )}

            {/* Floating Compare Bar */}
            {selectedTiers.length > 0 && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(10, 10, 20, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--accent-cyan)',
                    borderRadius: '16px',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(6, 182, 212, 0.2)',
                    zIndex: 1000
                }}>
                    <span style={{ fontWeight: 600 }}>
                        {selectedTiers.length}/4 tiers selected
                    </span>

                    <button
                        onClick={handleCompareNow}
                        style={{
                            background: 'linear-gradient(90deg, var(--accent-violet), var(--accent-pink))',
                            border: 'none',
                            color: '#fff',
                            padding: '10px 24px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        Compare Now →
                    </button>

                    <button
                        onClick={clearSelection}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            padding: '10px 16px',
                            borderRadius: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
};

export default BrowseBanking;
