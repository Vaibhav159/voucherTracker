import { useMemo, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { wealthBanking, getBankNames } from '../data/bankingPrograms';
import { useFavorites } from '../context/FavoritesContext';

// Tier color helper
const getTierColor = (tierName) => {
    const name = tierName?.toLowerCase() || '';
    if (name.includes('private') || name.includes('insignia') || name.includes('burgundy private')) return '#FFD700';
    if (name.includes('premier') || name.includes('imperia') || name.includes('priority')) return '#C0C0C0';
    if (name.includes('preferred') || name.includes('select') || name.includes('first')) return '#06b6d4';
    return '#8B5CF6';
};

const CompareBanking = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const tierIdsParam = searchParams.get('tiers') || '';
    const { isGuideFavorite, toggleFavoriteGuide } = useFavorites();

    // Dropdown state
    const [selectedBankToAdd, setSelectedBankToAdd] = useState('');
    const [selectedTierToAdd, setSelectedTierToAdd] = useState('');
    const [showAddDropdown, setShowAddDropdown] = useState(false);

    const bankNames = getBankNames();

    // Parse tier IDs and get tier data
    const selectedTiers = useMemo(() => {
        if (!tierIdsParam) return [];

        const tierIds = tierIdsParam.split(',');
        return tierIds.map(id => {
            const [bankName, ...tierParts] = id.split('-');
            const tierName = tierParts.join('-');

            const bankData = wealthBanking[bankName];
            if (!bankData?.tiers) return null;

            const tier = bankData.tiers.find(t => t.name === tierName);
            if (!tier) return null;

            return {
                id,
                bank: bankName,
                tier,
                notes: bankData.notes
            };
        }).filter(Boolean);
    }, [tierIdsParam]);

    // Get available tiers for selected bank
    const availableTiers = useMemo(() => {
        if (!selectedBankToAdd) return [];
        const bankData = wealthBanking[selectedBankToAdd];
        if (!bankData?.tiers) return [];

        // Filter out already selected tiers
        return bankData.tiers.filter(tier => {
            const tierId = `${selectedBankToAdd}-${tier.name}`;
            return !selectedTiers.some(t => t.id === tierId);
        });
    }, [selectedBankToAdd, selectedTiers]);

    // Add tier to comparison
    const handleAddTier = () => {
        if (!selectedBankToAdd || !selectedTierToAdd) return;

        const newTierId = `${selectedBankToAdd}-${selectedTierToAdd}`;
        const currentIds = tierIdsParam ? tierIdsParam.split(',') : [];

        if (currentIds.length >= 4) {
            alert('Maximum 4 tiers can be compared');
            return;
        }

        if (!currentIds.includes(newTierId)) {
            const newIds = [...currentIds, newTierId].join(',');
            navigate(`/compare-banking?tiers=${newIds}`);
        }

        // Reset dropdown
        setSelectedBankToAdd('');
        setSelectedTierToAdd('');
        setShowAddDropdown(false);
    };

    // Remove tier from comparison
    const handleRemoveTier = (tierId) => {
        const currentIds = tierIdsParam.split(',').filter(id => id !== tierId);
        if (currentIds.length > 0) {
            navigate(`/compare-banking?tiers=${currentIds.join(',')}`);
        } else {
            navigate('/compare-banking');
        }
    };

    // Share to X
    const handleShareToX = () => {
        const tierNames = selectedTiers.map(t => `${t.bank} ${t.tier.name}`).join(' vs ');
        const text = `Comparing banking tiers: ${tierNames} on Voucher Tracker 🏦\n\nCheck out wealth banking options:`;
        const url = window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
    };

    // Comparison rows
    const comparisonFields = [
        { key: 'minNRV', label: 'Minimum NRV/AMB' },
        { key: 'benefits', label: 'Key Benefits', isList: true },
        { key: 'rm', label: 'Relationship Manager', isBoolean: true },
        { key: 'linkedCards', label: 'Linked Credit Cards', isList: true },
    ];

    if (selectedTiers.length === 0) {
        return (
            <div style={{ paddingTop: '1rem', paddingBottom: '4rem', textAlign: 'center' }}>
                <header style={{ marginBottom: '2.5rem' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                        Compare Banking Tiers
                    </h2>
                </header>

                <div className="glass-panel" style={{ padding: '3rem', maxWidth: '500px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        No tiers selected for comparison. Browse and select tiers to compare.
                    </p>
                    <Link
                        to="/browse-banking"
                        style={{
                            background: 'linear-gradient(90deg, var(--accent-violet), var(--accent-pink))',
                            border: 'none',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}
                    >
                        Browse Banking Tiers
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
            {/* Header */}
            <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                    Compare Banking Tiers
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Comparing {selectedTiers.length} wealth banking tiers
                </p>
            </header>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Add Tier Dropdown */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowAddDropdown(!showAddDropdown)}
                        disabled={selectedTiers.length >= 4}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            background: selectedTiers.length >= 4
                                ? 'rgba(255,255,255,0.05)'
                                : 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))',
                            color: selectedTiers.length >= 4 ? 'var(--text-secondary)' : '#fff',
                            border: 'none',
                            fontWeight: 600,
                            cursor: selectedTiers.length >= 4 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        + Add Tier {selectedTiers.length}/4
                    </button>

                    {showAddDropdown && selectedTiers.length < 4 && (
                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(10, 10, 20, 0.98)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '12px',
                            padding: '1rem',
                            minWidth: '280px',
                            zIndex: 100,
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                        }}>
                            {/* Bank Select */}
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                                Select Bank
                            </label>
                            <select
                                value={selectedBankToAdd}
                                onChange={(e) => {
                                    setSelectedBankToAdd(e.target.value);
                                    setSelectedTierToAdd('');
                                }}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.9rem',
                                    marginBottom: '0.75rem'
                                }}
                            >
                                <option value="">Choose a bank...</option>
                                {bankNames.map(bank => (
                                    <option key={bank} value={bank}>{bank}</option>
                                ))}
                            </select>

                            {/* Tier Select */}
                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                                Select Tier
                            </label>
                            <select
                                value={selectedTierToAdd}
                                onChange={(e) => setSelectedTierToAdd(e.target.value)}
                                disabled={!selectedBankToAdd}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: selectedBankToAdd ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    fontSize: '0.9rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                <option value="">{selectedBankToAdd ? 'Choose a tier...' : 'Select bank first'}</option>
                                {availableTiers.map(tier => (
                                    <option key={tier.name} value={tier.name}>{tier.name}</option>
                                ))}
                            </select>

                            {/* Add Button */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={handleAddTier}
                                    disabled={!selectedBankToAdd || !selectedTierToAdd}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: selectedBankToAdd && selectedTierToAdd
                                            ? 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))'
                                            : 'rgba(255,255,255,0.1)',
                                        color: selectedBankToAdd && selectedTierToAdd ? '#fff' : 'var(--text-secondary)',
                                        cursor: selectedBankToAdd && selectedTierToAdd ? 'pointer' : 'not-allowed',
                                        fontWeight: 600
                                    }}
                                >
                                    Add to Compare
                                </button>
                                <button
                                    onClick={() => setShowAddDropdown(false)}
                                    style={{
                                        padding: '10px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--glass-border)',
                                        background: 'transparent',
                                        color: 'var(--text-secondary)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleShareToX}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--glass-border)',
                        cursor: 'pointer'
                    }}
                >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Share to X
                </button>
            </div>

            {/* Comparison Table */}
            <div className="glass-panel" style={{ overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        <tr>
                            <th style={{
                                padding: '1.5rem',
                                textAlign: 'left',
                                borderBottom: '1px solid var(--glass-border)',
                                color: 'var(--text-secondary)',
                                fontWeight: 500,
                                width: '180px'
                            }}>
                                Feature
                            </th>
                            {selectedTiers.map(item => (
                                <th key={item.id} style={{
                                    padding: '1.5rem',
                                    textAlign: 'center',
                                    borderBottom: '1px solid var(--glass-border)',
                                    background: `linear-gradient(135deg, ${getTierColor(item.tier.name)}10, transparent)`,
                                    position: 'relative'
                                }}>
                                    {/* Remove Button */}
                                    <button
                                        onClick={() => handleRemoveTier(item.id)}
                                        style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            background: 'rgba(239, 68, 68, 0.2)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: '#ef4444',
                                            fontSize: '14px',
                                            fontWeight: 'bold'
                                        }}
                                        title="Remove from comparison"
                                    >
                                        ×
                                    </button>

                                    <div style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        marginBottom: '4px',
                                        color: getTierColor(item.tier.name)
                                    }}>
                                        {item.tier.name}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        {item.bank}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonFields.map(field => (
                            <tr key={field.key}>
                                <td style={{
                                    padding: '1rem 1.5rem',
                                    borderBottom: '1px solid var(--glass-border)',
                                    color: 'var(--text-secondary)',
                                    fontWeight: 500
                                }}>
                                    {field.label}
                                </td>
                                {selectedTiers.map(item => {
                                    const value = item.tier[field.key];

                                    return (
                                        <td key={item.id} style={{
                                            padding: '1rem 1.5rem',
                                            borderBottom: '1px solid var(--glass-border)',
                                            textAlign: 'center',
                                            verticalAlign: 'top'
                                        }}>
                                            {field.isBoolean ? (
                                                <span style={{
                                                    color: value ? '#22c55e' : 'var(--text-secondary)',
                                                    fontWeight: value ? 600 : 400
                                                }}>
                                                    {value ? '✓ Yes' : '✗ No'}
                                                </span>
                                            ) : field.isList ? (
                                                <div style={{ textAlign: 'left' }}>
                                                    {Array.isArray(value) && value.length > 0 ? (
                                                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                                                            {value.slice(0, 5).map((v, i) => (
                                                                <li key={i} style={{ marginBottom: '4px', color: 'var(--text-primary)' }}>{v}</li>
                                                            ))}
                                                            {value.length > 5 && (
                                                                <li style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                                                    +{value.length - 5} more
                                                                </li>
                                                            )}
                                                        </ul>
                                                    ) : (
                                                        <span style={{ color: 'var(--text-secondary)' }}>—</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span style={{ color: value ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                                    {value || '—'}
                                                </span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}

                        {/* Notes Row */}
                        <tr>
                            <td style={{
                                padding: '1rem 1.5rem',
                                color: 'var(--text-secondary)',
                                fontWeight: 500
                            }}>
                                Important Notes
                            </td>
                            {selectedTiers.map(item => (
                                <td key={item.id} style={{
                                    padding: '1rem 1.5rem',
                                    textAlign: 'left',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)',
                                    fontStyle: 'italic'
                                }}>
                                    {item.notes || '—'}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Summary Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(selectedTiers.length, 4)}, 1fr)`,
                gap: '1.5rem',
                marginTop: '2rem'
            }}>
                {selectedTiers.map(item => (
                    <div
                        key={item.id}
                        className="glass-panel"
                        style={{
                            padding: '1.5rem',
                            borderTop: `3px solid ${getTierColor(item.tier.name)}`
                        }}
                    >
                        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', color: getTierColor(item.tier.name) }}>
                            {item.tier.name}
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            {item.bank}
                        </p>
                        <div style={{
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            fontSize: '0.85rem'
                        }}>
                            <strong>Requirement:</strong> {item.tier.minNRV || 'Contact bank'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompareBanking;

