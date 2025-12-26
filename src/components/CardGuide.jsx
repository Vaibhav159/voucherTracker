import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { creditCards } from '../data/creditCards';

const CardGuide = () => {
    const { id } = useParams();
    const card = creditCards.find(c => c.id === parseInt(id));

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

            {/* Sticky Apply Button for Mobile */}
            <div className="sticky-apply-container"> {/* Visibility handled by CSS */}
                <a
                    href={card.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ width: '100%', textAlign: 'center', justifyContent: 'center', padding: '1rem' }}
                >
                    Apply Now
                </a>
            </div>
        </div>
    );
};

export default CardGuide;
