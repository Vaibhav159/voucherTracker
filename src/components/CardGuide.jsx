import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import { useCreditCards } from '../hooks/useCreditCards';
import { useTheme } from '../context/ThemeContext';
import CardImage from './CardImage';
import LoadingSpinner from './LoadingSpinner';

const CardGuide = () => {
    const { slug } = useParams();
    const { creditCards, loading, error } = useCreditCards();
    const { theme } = useTheme();

    const card = useMemo(() => {
        if (!creditCards) return null;
        // Find by slug first, then fallback to id (as string or int)
        return creditCards.find(c => c.slug === slug || c.id === slug || c.id === parseInt(slug));
    }, [creditCards, slug]);

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

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <LoadingSpinner size="lg" text="Loading card details..." />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Error loading card details</h2>
                <p>{error.message}</p>
                <Link to="/compare-cards" className="btn-primary">Back to Comparison</Link>
            </div>
        );
    }

    if (!card) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Card not found</h2>
                <Link to="/compare-cards" className="btn-primary">Back to Comparison</Link>
            </div>
        );
    }

    // SEO Data
    const pageTitle = `${card.name} Review & Benefits - Card Perks`;
    const pageDescription = `Comprehensive guide for ${card.name}. Learn about fees, rewards, benefits, and eligibility criteria to decide if this card is right for you.`;
    const pageUrl = `${window.location.origin}${window.location.pathname}#/card-guide/${slug}`;

    // Structured Data (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "FinancialProduct",
        "name": card.name,
        "description": pageDescription,
        "brand": {
            "@type": "Brand",
            "name": card.bank
        },
        "image": card.image,
        "offers": {
            "@type": "Offer",
            "price": card.joiningFee.replace(/[^0-9]/g, ''),
            "priceCurrency": "INR",
            "url": card.applyLink
        },
        "feesAndCommissionsSpecification": card.annualFee
    };

    return (
        <div className="card-guide-container" style={{ paddingTop: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                {/* Open Graph */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={card.image} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="article" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={card.image} />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

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

                <div className="card-content-sections" style={{ display: 'grid', gap: '2.5rem' }}>
                    {/* Quick Summary Section */}
                    {(card.metadata?.verdict || card.metadata?.bestFor) && (
                        <section>
                            <h2 style={{ color: 'var(--accent-cyan)', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                ✨ Quick Summary
                            </h2>
                            {card.metadata?.verdict && (
                                <div style={{ marginBottom: '1rem', fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '1.1rem', background: 'rgba(6, 182, 212, 0.05)', padding: '1rem', borderRadius: '8px' }}>
                                    <ReactMarkdown>{card.metadata.verdict}</ReactMarkdown>
                                </div>
                            )}
                            {card.metadata?.bestFor && (
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    <strong>Best For:</strong> {card.metadata.bestFor}
                                </p>
                            )}
                        </section>
                    )}

                    {/* Pros & Cons Section */}
                    {(card.metadata?.pros?.length > 0 || card.metadata?.cons?.length > 0) && (
                        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {card.metadata?.pros?.length > 0 && (
                                <div className="pros-container">
                                    <h3 style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>✅ Pros</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {card.metadata.pros.map((pro, i) => (
                                            <li key={i} style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: 0, color: '#22c55e' }}>•</span>
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {card.metadata?.cons?.length > 0 && (
                                <div className="cons-container">
                                    <h3 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>❌ Cons</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {card.metadata.cons.map((con, i) => (
                                            <li key={i} style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: 0, color: '#ef4444' }}>•</span>
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Main Content (Detailed Guide) */}
                    {card.detailedGuide && (
                        <section className="markdown-content" style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
                            <ReactMarkdown
                                components={{
                                    h2: ({ node, ...props }) => <h2 style={{ color: 'var(--accent-cyan)', marginTop: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }} {...props} />,
                                    h3: ({ node, ...props }) => <h3 style={{ color: 'var(--accent-purple)', marginTop: '1.5rem', marginBottom: '0.8rem' }} {...props} />,
                                    table: ({ node, ...props }) => <div style={{ overflowX: 'auto', marginBottom: '2rem' }}><table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--glass-border)' }} {...props} /></div>,
                                    th: ({ node, ...props }) => <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', backgroundColor: 'rgba(255,255,255,0.05)', textAlign: 'left' }} {...props} />,
                                    td: ({ node, ...props }) => <td style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }} {...props} />,
                                    ul: ({ node, ...props }) => <ul style={{ paddingLeft: '1.5rem' }} {...props} />,
                                    li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                                }}
                            >
                                {card.detailedGuide}
                            </ReactMarkdown>
                        </section>
                    )}

                    {/* Related Guides Section */}
                    {card.related_guides && card.related_guides.length > 0 && (
                        <section style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                            <h2 style={{ color: 'var(--accent-purple)', fontSize: '1.5rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                📚 Related Guides & Resources
                            </h2>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {card.related_guides.map((guide) => (
                                    <a
                                        key={guide.id}
                                        href={guide.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px',
                                            padding: '1rem',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '8px',
                                            border: '1px solid var(--glass-border)',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                            e.currentTarget.style.borderColor = 'var(--accent-purple)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                                        }}
                                    >
                                        <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1.05rem' }}>{guide.title}</div>
                                        {guide.author && (
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>By {guide.author}</div>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Dynamic Rewards & Fees Sections (only if detailedGuide is missing) */}
                    {!card.detailedGuide && (
                        <>
                            {/* Reward Structure */}
                            {card.rewards && (
                                <section>
                                    <h2 style={{ color: 'var(--accent-cyan)', fontSize: '1.5rem', marginBottom: '1.2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                        💰 Reward Structure
                                    </h2>
                                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                                            <strong>Base Rate:</strong> {card.rewards.earningText || card.rewardRate}
                                        </p>

                                        {card.rewards.calculator?.categories && (
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                                {Object.entries(card.rewards.calculator.categories).map(([key, cat]) => (
                                                    <div key={key} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                                        <div style={{ textTransform: 'capitalize', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px' }}>{key}</div>
                                                        <div style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>{cat.label || `${(cat.rate * 100).toFixed(1)}%`}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* SmartBuy / Accelerated Rewards Section */}
                            {(card.rewards?.calculator?.smartBuy?.merchants || card.rewards?.calculator?.acceleratedRewards?.merchants) && (() => {
                                const rewardData = card.rewards.calculator.smartBuy || card.rewards.calculator.acceleratedRewards;
                                const isHDFC = card.bank === 'HDFC Bank';
                                const sectionTitle = isHDFC ? '🛒 SmartBuy Portal Rewards' : '🚀 Accelerated Rewards';
                                const titleColor = isHDFC ? 'var(--accent-purple)' : 'var(--accent-cyan)';

                                return (
                                    <section>
                                        <h2 style={{ color: titleColor, fontSize: '1.5rem', marginBottom: '1.2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                            {sectionTitle}
                                        </h2>
                                        <div style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(99, 102, 241, 0.08))', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                                            {/* SmartBuy Summary */}
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                                                {rewardData.baseRewardRate && (
                                                    <div style={{ padding: '0.75rem 1rem', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '8px' }}>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Base Rate</div>
                                                        <div style={{ fontWeight: '600', color: '#c084fc' }}>{rewardData.baseRewardRate}</div>
                                                    </div>
                                                )}
                                                {rewardData.monthlyCap && (
                                                    <div style={{ padding: '0.75rem 1rem', background: 'rgba(34, 197, 94, 0.15)', borderRadius: '8px' }}>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Monthly Cap</div>
                                                        <div style={{ fontWeight: '600', color: '#4ade80' }}>
                                                            {rewardData.monthlyCap.toLocaleString()} {rewardData.type === 'cashback' ? '' : 'RP'}
                                                        </div>
                                                    </div>
                                                )}
                                                {rewardData.pointValueTravel && (
                                                    <div style={{ padding: '0.75rem 1rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '8px' }}>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Point Value (Travel)</div>
                                                        <div style={{ fontWeight: '600', color: '#a5b4fc' }}>₹{rewardData.pointValueTravel}/point</div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Merchants Grid */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                                                {Object.entries(rewardData.merchants).map(([key, merchant]) => (
                                                    <div key={key} style={{
                                                        padding: '0.75rem 1rem',
                                                        background: 'rgba(0,0,0,0.3)',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(255,255,255,0.06)',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}>
                                                        <span style={{
                                                            textTransform: 'capitalize',
                                                            fontSize: '0.85rem',
                                                            color: 'var(--text-primary)'
                                                        }}>
                                                            {key === 'igp' ? 'IGP.com' :
                                                                key === 'mmtHoliday' ? 'MMT Holiday' :
                                                                    key === 'instantVouchers' ? 'Gyftr' :
                                                                        key === 'redbus' ? 'RedBus' :
                                                                            key === 'pharmeasy' ? 'PharmEasy' :
                                                                                key === 'amazonPrime' ? 'Amazon (Prime)' :
                                                                                    key === 'amazonNonPrime' ? 'Amazon (Non-Prime)' :
                                                                                        key === 'amazonPayPartners' ? 'Amazon Pay Partners' :
                                                                                            key}
                                                        </span>
                                                        <span style={{
                                                            fontWeight: '700',
                                                            color: merchant.effectiveRate?.includes('33') || merchant.rate?.includes('10') ? '#22c55e' :
                                                                merchant.effectiveRate?.includes('16') || merchant.rate?.includes('5') || merchant.rate?.includes('6') ? '#4ade80' :
                                                                    '#94a3b8',
                                                            fontSize: '0.9rem'
                                                        }}>
                                                            {merchant.multiplier || merchant.rate}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {rewardData.note && (
                                                <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                                    ℹ️ {rewardData.note}
                                                </p>
                                            )}
                                        </div>
                                    </section>
                                );
                            })()}

                            {/* Fees & Eligibility */}
                            {(card.fees || card.eligibility) && (
                                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    {card.fees && (
                                        <div>
                                            <h3 style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}>💳 Fees & Charges</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)' }}>
                                                    <span style={{ color: 'var(--text-secondary)' }}>Joining Fee</span>
                                                    <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{card.joiningFee}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)' }}>
                                                    <span style={{ color: 'var(--text-secondary)' }}>Annual Fee</span>
                                                    <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{card.annualFee}</span>
                                                </div>
                                                {card.fees.waiverText && (
                                                    <p style={{ fontSize: '0.85rem', color: '#22c55e', marginTop: '4px' }}>✨ {card.fees.waiverText}</p>
                                                )}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)' }}>
                                                    <span style={{ color: 'var(--text-secondary)' }}>Forex Markup</span>
                                                    <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{card.fxMarkup}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {card.eligibility && (
                                        <div>
                                            <h3 style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}>📋 Eligibility</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {card.eligibility.income && (
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <span style={{ color: 'var(--text-secondary)' }}>Min Monthly Income</span>
                                                        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>₹{(card.eligibility.income / 12 / 1000).toFixed(0)}K+</span>
                                                    </div>
                                                )}
                                                {card.eligibility.age && (
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <span style={{ color: 'var(--text-secondary)' }}>Age Requirement</span>
                                                        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{card.eligibility.age.min}-{card.eligibility.age.max} years</span>
                                                    </div>
                                                )}
                                                {card.eligibility.type && (
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <span style={{ color: 'var(--text-secondary)' }}>Employment</span>
                                                        <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{card.eligibility.type}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* Features Section */}
                            {card.features?.length > 0 && (
                                <section>
                                    <h2 style={{ color: 'var(--accent-cyan)', fontSize: '1.5rem', marginBottom: '1.2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                        🌟 Key Features
                                    </h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                                        {card.features.map((feature, i) => (
                                            <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Placeholder message if everything is missing */}
                            {!card.rewards && !card.fees && !card.features?.length && (
                                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                                    Detailed guide coming soon...
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div >

            {/* Similar Cards Section */}
            {
                similarCards.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                            🔄 Similar Cards You Might Like
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                            {similarCards.map(similarCard => (
                                <Link
                                    key={similarCard.id}
                                    to={`/card-guide/${similarCard.slug || similarCard.id}`}
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
                )
            }

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
        </div >
    );
};

export default CardGuide;
