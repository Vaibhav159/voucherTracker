import { useState, useMemo } from 'react';
import { pointsConversion, getCardNames } from '../data/pointsConversion';

// Quick point presets
const POINT_PRESETS = [5000, 10000, 25000, 50000, 100000];

// Last updated date (you can update this when data changes)
const LAST_UPDATED = '2025-12-26';

const PointsConverter = () => {
    const [selectedCard, setSelectedCard] = useState('');
    const [points, setPoints] = useState(10000);

    // Multi-card state
    const [additionalCards, setAdditionalCards] = useState([]);
    const [showMultiCard, setShowMultiCard] = useState(false);

    const cardNames = getCardNames();
    const cardData = selectedCard ? pointsConversion[selectedCard] : null;

    const conversions = useMemo(() => {
        if (!cardData || !points) return [];
        return cardData.options.map(option => ({
            ...option,
            rupeeValue: points * option.value
        }));
    }, [cardData, points]);

    const bestConversion = useMemo(() => {
        if (!conversions.length) return null;
        return conversions.reduce((best, current) =>
            current.value > best.value ? current : best
        );
    }, [conversions]);

    // Calculate total value from all cards (primary + additional)
    const totalMultiCardValue = useMemo(() => {
        if (!showMultiCard) return null;

        let total = 0;

        // Add primary card
        if (bestConversion) {
            total += bestConversion.rupeeValue;
        }

        // Add additional cards
        additionalCards.forEach(card => {
            if (card.cardName && card.points > 0) {
                const cardInfo = pointsConversion[card.cardName];
                if (cardInfo) {
                    const bestOption = cardInfo.options.reduce((best, current) =>
                        current.value > best.value ? current : best
                    );
                    total += card.points * bestOption.value;
                }
            }
        });

        return total;
    }, [showMultiCard, bestConversion, additionalCards]);

    const addCard = () => {
        setAdditionalCards(prev => [...prev, { cardName: '', points: 0 }]);
    };

    const updateAdditionalCard = (index, field, value) => {
        setAdditionalCards(prev => prev.map((card, i) =>
            i === index ? { ...card, [field]: value } : card
        ));
    };

    const removeAdditionalCard = (index) => {
        setAdditionalCards(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div style={{ padding: '1rem 0 4rem' }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    Points Converter
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                    Find the best redemption value for your credit card reward points
                </p>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    marginTop: '0.5rem',
                    opacity: 0.7
                }}>
                    Last updated: {new Date(LAST_UPDATED).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })}
                </p>
            </header>

            {/* Card Selection & Points Input */}
            <div className="glass-panel" style={{
                padding: '2rem',
                maxWidth: '800px',
                margin: '0 auto 2rem'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {/* Card Selection */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem'
                        }}>
                            Select Credit Card
                        </label>
                        <select
                            value={selectedCard}
                            onChange={(e) => setSelectedCard(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem'
                            }}
                        >
                            <option value="">Choose a card...</option>
                            {cardNames.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Points Input */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem'
                        }}>
                            {cardData ? cardData.pointName : 'Reward Points'}
                        </label>
                        <input
                            type="number"
                            value={points}
                            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                </div>

                {/* Quick Point Presets */}
                <div style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Quick presets:</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {POINT_PRESETS.map(preset => (
                            <button
                                key={preset}
                                onClick={() => setPoints(preset)}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    border: points === preset ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                                    background: points === preset ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.05)',
                                    color: points === preset ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {preset.toLocaleString()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Multi-Card Toggle */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                    <button
                        onClick={() => setShowMultiCard(!showMultiCard)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: '1px solid var(--glass-border)',
                            background: showMultiCard ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                            color: showMultiCard ? 'var(--accent-purple)' : 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        {showMultiCard ? '➖' : '➕'} Multi-Card Calculator
                    </button>
                </div>

                {/* Additional Cards Section */}
                {showMultiCard && (
                    <div style={{ marginTop: '1rem' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Add points from multiple cards to see your total portfolio value:
                        </p>

                        {additionalCards.map((card, index) => (
                            <div key={index} style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 120px 40px',
                                gap: '0.5rem',
                                marginBottom: '0.75rem',
                                alignItems: 'center'
                            }}>
                                <select
                                    value={card.cardName}
                                    onChange={(e) => updateAdditionalCard(index, 'cardName', e.target.value)}
                                    style={{
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: '1px solid var(--glass-border)',
                                        background: 'rgba(0,0,0,0.2)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <option value="">Select card...</option>
                                    {cardNames.filter(n => n !== selectedCard).map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    placeholder="Points"
                                    value={card.points || ''}
                                    onChange={(e) => updateAdditionalCard(index, 'points', parseInt(e.target.value) || 0)}
                                    style={{
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: '1px solid var(--glass-border)',
                                        background: 'rgba(0,0,0,0.2)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.85rem'
                                    }}
                                />
                                <button
                                    onClick={() => removeAdditionalCard(index)}
                                    style={{
                                        padding: '6px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: 'rgba(239, 68, 68, 0.2)',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={addCard}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: '1px dashed var(--glass-border)',
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            + Add Another Card
                        </button>

                        {/* Total Portfolio Value */}
                        {totalMultiCardValue !== null && totalMultiCardValue > 0 && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    Total Portfolio Value (Best Redemption)
                                </p>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-purple)' }}>
                                    ₹{totalMultiCardValue.toLocaleString('en-IN')}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Results */}
            {cardData && (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {/* Best Option Banner */}
                    {bestConversion && (
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(6, 182, 212, 0.2))',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem' }}>
                                Best Redemption Option
                            </p>
                            <h3 style={{ color: '#4ade80', margin: '0 0 0.5rem', fontSize: '1.3rem' }}>
                                {bestConversion.type}
                            </h3>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                                ₹{bestConversion.rupeeValue.toLocaleString('en-IN')}
                            </div>
                            <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0', fontSize: '0.85rem' }}>
                                {points.toLocaleString()} {cardData.pointName} × ₹{bestConversion.value}/point
                            </p>
                        </div>
                    )}

                    {/* All Options */}
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        All Redemption Options
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {conversions.map((option, idx) => (
                            <div
                                key={idx}
                                className="glass-panel"
                                style={{
                                    padding: '1rem 1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderColor: option.recommended ? 'rgba(34, 197, 94, 0.3)' : undefined
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontWeight: '600' }}>{option.type}</span>
                                        {option.recommended && (
                                            <span style={{
                                                fontSize: '0.7rem',
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                background: 'rgba(34, 197, 94, 0.2)',
                                                color: '#4ade80'
                                            }}>
                                                Recommended
                                            </span>
                                        )}
                                    </div>
                                    <p style={{
                                        margin: '0.25rem 0 0',
                                        fontSize: '0.8rem',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {option.description}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        fontSize: '1.25rem',
                                        fontWeight: '700',
                                        color: option.recommended ? '#4ade80' : 'var(--text-primary)'
                                    }}>
                                        ₹{option.rupeeValue.toLocaleString('en-IN')}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        ₹{option.value}/point
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Card Notes */}
                    {cardData.notes && (
                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            background: 'rgba(6, 182, 212, 0.1)',
                            borderRadius: '8px',
                            borderLeft: '3px solid var(--accent-cyan)'
                        }}>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                💡 <strong style={{ color: 'var(--text-primary)' }}>Tip:</strong> {cardData.notes}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Empty State */}
            {!selectedCard && (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: 'var(--text-secondary)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                    <p>Select a credit card to see redemption values</p>
                </div>
            )}

            {/* Legend */}
            <div style={{
                maxWidth: '800px',
                margin: '3rem auto 0',
                textAlign: 'center'
            }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    Understanding Point Values
                </h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)'
                }}>
                    <div className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: '#4ade80', fontWeight: '600' }}>₹0.75 - ₹1.00</div>
                        <div>Excellent Value</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: '#fbbf24', fontWeight: '600' }}>₹0.40 - ₹0.74</div>
                        <div>Good Value</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: '#ef4444', fontWeight: '600' }}>Below ₹0.40</div>
                        <div>Poor Value - Avoid</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointsConverter;
