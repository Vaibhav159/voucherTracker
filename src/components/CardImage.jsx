// Bank colors for generating styled placeholder cards
export const bankColors = {
    'HDFC Bank': { primary: '#004c8f', secondary: '#ff6b00', name: 'HDFC' },
    'ICICI Bank': { primary: '#f58220', secondary: '#1a1a1a', name: 'ICICI' },
    'Axis Bank': { primary: '#97144d', secondary: '#2e1f63', name: 'AXIS' },
    'SBI Card': { primary: '#2d5ba8', secondary: '#1a1a1a', name: 'SBI' },
    'American Express': { primary: '#016fd0', secondary: '#1a1a1a', name: 'AMEX' },
    'Kotak Mahindra Bank': { primary: '#ed1c24', secondary: '#1a1a1a', name: 'KOTAK' },
    'IndusInd Bank': { primary: '#98002e', secondary: '#1a1a1a', name: 'INDUSIND' },
    'Yes Bank': { primary: '#00529b', secondary: '#e31837', name: 'YES' },
    'IDFC First Bank': { primary: '#9c1e23', secondary: '#1a1a1a', name: 'IDFC' },
    'AU Small Finance Bank': { primary: '#ec008c', secondary: '#3a3a3a', name: 'AU' },
    'RBL Bank': { primary: '#e31837', secondary: '#1a1a1a', name: 'RBL' },
    'Federal Bank': { primary: '#003366', secondary: '#ffd700', name: 'FEDERAL' },
    'BOB Financial': { primary: '#f26522', secondary: '#1a1a1a', name: 'BOB' },
    'Bank of Baroda': { primary: '#f26522', secondary: '#1a1a1a', name: 'BOB' },
    'Canara Bank': { primary: '#ffc72c', secondary: '#1a1a1a', name: 'CANARA' },
    'HSBC': { primary: '#db0011', secondary: '#1a1a1a', name: 'HSBC' },
    'Standard Chartered': { primary: '#0072aa', secondary: '#1a1a1a', name: 'SC' },
    'Citi Bank': { primary: '#003b70', secondary: '#e31837', name: 'CITI' },
    'FPL Technologies': { primary: '#1a1a1a', secondary: '#3a3a3a', name: 'ONE' },
    'Scapia': { primary: '#6366f1', secondary: '#1a1a1a', name: 'SCAPIA' },
    'Kiwi': { primary: '#22c55e', secondary: '#1a1a1a', name: 'KIWI' },
    'default': { primary: '#374151', secondary: '#1a1a1a', name: '?' }
};

// CardImage component with smart fallback
const CardImage = ({ card, style = {}, className = '' }) => {
    const isPlaceholder = card.image?.includes('placeholder');
    const bankColor = bankColors[card.bank] || bankColors.default;

    if (isPlaceholder) {
        // Return stylized card placeholder
        return (
            <div
                className={className}
                style={{
                    background: `linear-gradient(135deg, ${bankColor.primary} 0%, ${bankColor.secondary} 100%)`,
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    aspectRatio: '1.586 / 1', // Standard credit card ratio
                    minHeight: '80px',
                    maxWidth: '160px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    ...style
                }}
            >
                <div style={{
                    fontSize: '0.6rem',
                    fontWeight: '700',
                    color: 'rgba(255,255,255,0.9)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }}>
                    {bankColor.name}
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}>
                    <div style={{
                        width: '24px',
                        height: '18px',
                        background: 'linear-gradient(135deg, #ffd700 0%, #d4af37 100%)',
                        borderRadius: '3px'
                    }} />
                    <div style={{
                        fontSize: '0.5rem',
                        color: 'rgba(255,255,255,0.7)',
                        textAlign: 'right',
                        maxWidth: '60%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {card.name.split(' ').slice(-2).join(' ')}
                    </div>
                </div>
            </div>
        );
    }

    // Return actual image
    return (
        <img
            src={card.image}
            alt={card.name}
            className={className}
            style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                ...style
            }}
            onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none';
                const parent = e.target.parentElement;
                if (parent) {
                    parent.style.background = bankColor.primary;
                    parent.innerHTML = `<span style="color:#fff;font-size:11px;text-align:center;padding:8px">${card.name}</span>`;
                }
            }}
        />
    );
};

export default CardImage;
