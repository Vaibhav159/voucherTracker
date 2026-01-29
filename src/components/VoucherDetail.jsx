import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVouchers } from '../hooks/useVouchers';
import { getPlatformLogo } from '../utils/platformLogos';
import { ensureHttps } from '../utils/urlUtils';
import LoadingSpinner from './LoadingSpinner';

import { Helmet } from 'react-helmet-async';

const VoucherDetail = () => {
    const { id } = useParams();
    const { vouchers, loading, error } = useVouchers();

    const voucher = useMemo(() => {
        return vouchers.find(v => v.id === id);
    }, [id, vouchers]);

    // Share to X function
    const shareToX = () => {
        const url = `${window.location.origin}${window.location.pathname}#/voucher/${id}`;
        const text = `Check out ${voucher?.brand} voucher deals on Card Perks! 🎫💰`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Error loading voucher</h2>
                <Link to="/" className="btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
            </div>
        );
    }

    if (!voucher) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Voucher not found</h2>
                <Link to="/" className="btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
            </div>
        );
    }

    // SEO Data
    const platformNames = voucher.platforms.map(p => p.name).join(', ');
    const pageTitle = `${voucher.brand} Voucher & Gift Card Deals - Card Perks`;
    const pageDescription = `Get the best deals and discounts on ${voucher.brand} gift cards. Compare rates across ${platformNames} and maximize your savings.`;
    const pageUrl = `${window.location.origin}${window.location.pathname}#/voucher/${id}`;

    // Structured Data (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": `${voucher.brand} Gift Card`,
        "image": ensureHttps(voucher.logo),
        "description": pageDescription,
        "brand": {
            "@type": "Brand",
            "name": voucher.brand
        },
        "offers": voucher.platforms.map(platform => ({
            "@type": "Offer",
            "priceCurrency": "INR", // Assuming generic currency context
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": platform.name
            },
            "url": platform.link
        }))
    };


    return (
        <div className="container" style={{ maxWidth: '1000px' }}>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                {/* Open Graph */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={ensureHttps(voucher.logo)} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="product" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={ensureHttps(voucher.logo)} />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '2rem' }}>
                ← Back to Vouchers
            </Link>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ width: '100px', height: '100px', background: '#fff', borderRadius: '20px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={ensureHttps(voucher.logo)} alt={voucher.brand} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                    <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>{voucher.brand}</h1>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '20px' }}>{voucher.category}</span>
                </div>
                <button
                    onClick={shareToX}
                    style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: '1px solid rgba(29, 161, 242, 0.4)',
                        background: 'rgba(29, 161, 242, 0.1)',
                        color: '#1DA1F2',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 500,
                    }}
                    title="Share to X (Twitter)"
                >
                    𝕏 Share
                </button>
            </div>


            <h2 style={{ marginBottom: '1.5rem' }}>Available Platforms</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {voucher.platforms.map((platform, idx) => (
                    <div key={idx} className="glass-panel" style={{ padding: '0', overflow: 'hidden', borderTop: `4px solid ${platform.color || '#8b5cf6'}` }}>
                        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                                    {getPlatformLogo(platform.name) && (
                                        <div style={{
                                            background: '#fff',
                                            borderRadius: '6px',
                                            padding: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '36px',
                                            width: '36px',
                                            minWidth: '36px',
                                            flexShrink: 0
                                        }}>
                                            <img src={getPlatformLogo(platform.name)} alt={platform.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                                        </div>
                                    )}
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{platform.name}</h3>
                                </div>
                                <a
                                    href={platform.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{ padding: '8px 16px', fontSize: '0.9rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                                >
                                    Buy Now ↗
                                </a>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Monthly Cap</span>
                                <span style={{ fontWeight: 500 }}>{platform.cap}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Fees / Discount</span>
                                <span style={{ fontWeight: 500, color: platform.fee.includes('Discount') ? '#4ade80' : platform.fee === 'None' ? 'inherit' : '#f87171' }}>
                                    {platform.fee}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default VoucherDetail;
