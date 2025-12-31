import { useMyCards } from '../context/MyCardsContext';

/**
 * AddToMyCardsButton - Button to add/remove cards from user's collection
 * Use this component anywhere you show credit cards
 */

const AddToMyCardsButton = ({ 
    cardId, 
    variant = 'default', // 'default' | 'compact' | 'icon'
    showLabel = true,
    style = {} 
}) => {
    const { hasCard, toggleCard } = useMyCards();
    const isInCollection = hasCard(cardId);

    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleCard(cardId);
    };

    // Icon-only variant
    if (variant === 'icon') {
        return (
            <button
                onClick={handleClick}
                title={isInCollection ? 'Remove from My Cards' : 'Add to My Cards'}
                style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: isInCollection 
                        ? '2px solid #22c55e' 
                        : '2px solid rgba(255,255,255,0.25)',
                    background: isInCollection 
                        ? 'rgba(34, 197, 94, 0.2)' 
                        : 'rgba(0,0,0,0.4)',
                    color: isInCollection ? '#22c55e' : 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                    ...style,
                }}
            >
                {isInCollection ? '✓' : '+'}
            </button>
        );
    }

    // Compact variant
    if (variant === 'compact') {
        return (
            <button
                onClick={handleClick}
                style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: isInCollection 
                        ? '1px solid rgba(34, 197, 94, 0.3)' 
                        : '1px solid var(--glass-border)',
                    background: isInCollection 
                        ? 'rgba(34, 197, 94, 0.15)' 
                        : 'rgba(255,255,255,0.03)',
                    color: isInCollection ? '#22c55e' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                    ...style,
                }}
            >
                {isInCollection ? '✓' : '+'} 
                {showLabel && (isInCollection ? 'In Collection' : 'Add')}
            </button>
        );
    }

    // Default variant
    return (
        <button
            onClick={handleClick}
            style={{
                padding: '10px 18px',
                borderRadius: '10px',
                border: isInCollection 
                    ? '1px solid rgba(34, 197, 94, 0.4)' 
                    : '1px solid var(--accent-cyan)',
                background: isInCollection 
                    ? 'rgba(34, 197, 94, 0.15)' 
                    : 'rgba(6, 182, 212, 0.1)',
                color: isInCollection ? '#22c55e' : 'var(--accent-cyan)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                ...style,
            }}
            onMouseEnter={(e) => {
                if (!isInCollection) {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.2)';
                }
            }}
            onMouseLeave={(e) => {
                if (!isInCollection) {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                }
            }}
        >
            {isInCollection ? (
                <>
                    <span>✓</span>
                    {showLabel && 'In My Cards'}
                </>
            ) : (
                <>
                    <span>+</span>
                    {showLabel && 'Add to My Cards'}
                </>
            )}
        </button>
    );
};

/**
 * MyCardsIndicator - Small indicator showing card count
 * Use in navbar or header
 */
export const MyCardsIndicator = ({ onClick, style = {} }) => {
    const { totalCards } = useMyCards();

    return (
        <button
            onClick={onClick}
            style={{
                position: 'relative',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                ...style,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                e.currentTarget.style.color = 'var(--accent-cyan)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
            }}
        >
            💳 My Cards
            {totalCards > 0 && (
                <span style={{
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: 'rgba(6, 182, 212, 0.2)',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                }}>
                    {totalCards}
                </span>
            )}
        </button>
    );
};

/**
 * BestCardForMerchant - Shows best card recommendation from user's collection
 */
export const BestCardForMerchant = ({ merchant, platform, style = {} }) => {
    const { getBestCardFor, totalCards } = useMyCards();
    
    if (totalCards === 0) return null;
    
    const bestCard = getBestCardFor(merchant, platform);
    if (!bestCard) return null;

    return (
        <div style={{
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(6, 182, 212, 0.1))',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            ...style,
        }}>
            <span style={{ fontSize: '1.2rem' }}>💳</span>
            <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    Best card from your collection
                </div>
                <div style={{ fontSize: '0.9rem', color: '#22c55e', fontWeight: '600' }}>
                    {bestCard.name}
                </div>
            </div>
        </div>
    );
};

export default AddToMyCardsButton;
