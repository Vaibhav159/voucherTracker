import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useCreditCards } from '../hooks/useCreditCards';
import { useTheme } from '../context/ThemeContext';
import CardImage from './CardImage';
import LoadingSpinner from './LoadingSpinner';

const CardGuide = () => {
    const { id } = useParams();
    const { creditCards, loading, error } = useCreditCards();
    const { theme } = useTheme();

    const card = useMemo(() => {
        if (!creditCards) return null;
        return creditCards.find(c => c.id === parseInt(id));
    }, [creditCards, id]);

    // Find similar cards based on: same bank, same category, or similar fee tier
    const similarCards = useMemo(() => {
        if (!card) return [];

        const parseFee = (fee) => {
            if (!fee) return 9999;
            const lower = fee.toLowerCase();
            if (lower.includes('lifetime free') || lower.includes('₹0') || lower === 'free') return 0;
            const match = fee.match(/₹?([\d,]+)/);
            return match ? parseInt(match[1].replace(/,/g, '')) : 9999;
        };

        const currentFee = parseFee(card.annualFee);

        // Score cards based on similarity
        const scored = creditCards
            .filter(c => c.id !== card.id)
            .map(c => {
                let score = 0;
                // Same bank = high score
                if (c.bank === card.bank) score += 3;
                // Same category = high score
                if (c.category === card.category) score += 3;
                // Similar fee tier (within 20% or both free)
                const otherFee = parseFee(c.annualFee);
                if (currentFee === 0 && otherFee === 0) score += 2;
                else if (Math.abs(currentFee - otherFee) < currentFee * 0.3) score += 2;
                // Similar best use
                if (c.bestFor === card.bestFor) score += 1;

                return { ...c, score };
            })
            .filter(c => c.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 4);

        return scored;
    }, [card]);

    if (!card) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Card not found</h2>
                <Link to="/compare-cards" className="btn-primary">Back to Comparison</Link>
            </div>
        );
    }

    return (
        <div className="card-guide-container" style={{ paddingTop: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <Link to="/compare-cards" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
                ← Back to Comparison
            </Link>

            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
                    <div style={{ flexShrink: 0, width: '300px', maxWidth: '100%' }}>
                        <div style={{ height: '190px', background: '#333', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={card.image} alt={card.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = '#444'; e.target.parentElement.innerText = card.name; }}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} className="text-gradient">{card.name}</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{card.bank}</p>
                        <a href={card.applyLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
                            Apply Now
                        </a>
                    </div>
                </div>

                <div className="markdown-content" style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
                    <ReactMarkdown
                        components={{
                            h2: ({ node, ...props }) => <h2 style={{ color: 'var(--accent-cyan)', marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }} {...props} />,
                            h3: ({ node, ...props }) => <h3 style={{ color: 'var(--accent-purple)', marginTop: '1.5rem', marginBottom: '0.8rem' }} {...props} />,
                            table: ({ node, ...props }) => <div style={{ overflowX: 'auto', marginBottom: '2rem' }}><table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--glass-border)' }} {...props} /></div>,
                            th: ({ node, ...props }) => <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', backgroundColor: 'rgba(255,255,255,0.05)', textAlign: 'left' }} {...props} />,
                            td: ({ node, ...props }) => <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }} {...props} />,
                            ul: ({ node, ...props }) => <ul style={{ paddingLeft: '1.5rem' }} {...props} />,
                            li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                        }}
                    >
                        {card.detailedGuide || "Detailed guide coming soon..."}
                    </ReactMarkdown>
                </div>
            </div>

            {/* Similar Cards Section */}
            {similarCards.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                        🔄 Similar Cards You Might Like
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                        {similarCards.map(similarCard => (
                            <Link
                                key={similarCard.id}
                                to={`/card-guide/${similarCard.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div
                                    className="glass-panel"
                                    style={{
                                        padding: '1rem',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        height: '100%'
                                    }}
                                >
                                    <div style={{
                                        height: '100px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '0.75rem',
                                        overflow: 'hidden'
                                    }}>
                                        <CardImage card={similarCard} style={{ maxWidth: '90%', maxHeight: '80px' }} />
                                    </div>
                                    <h4 style={{
                                        margin: '0 0 0.25rem 0',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: 'var(--card-title)',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {similarCard.name}
                                    </h4>
                                    <p style={{
                                        margin: '0 0 0.5rem 0',
                                        fontSize: '0.75rem',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {similarCard.bank}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {similarCard.bank === card.bank && (
                                            <span style={{
                                                fontSize: '0.65rem',
                                                padding: '2px 6px',
                                                background: 'rgba(99, 102, 241, 0.2)',
                                                color: '#a5b4fc',
                                                borderRadius: '4px'
                                            }}>Same Bank</span>
                                        )}
                                        {similarCard.category === card.category && (
                                            <span style={{
                                                fontSize: '0.65rem',
                                                padding: '2px 6px',
                                                background: 'rgba(34, 197, 94, 0.2)',
                                                color: '#86efac',
                                                borderRadius: '4px'
                                            }}>{card.category}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Sticky Apply Button */}
            <div className="sticky-apply-container">
                <a
                    href={card.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                >
                    Apply Now
                </a>
            </div>
        </div>
    );
};

export default CardGuide;

