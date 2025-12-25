import React, { useEffect, useState } from 'react';
import guidesData from '../data/guides.json';

const GuideModal = ({ guide, onClose }) => {
    useEffect(() => {
        // Re-scan for widgets when modal opens
        if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'rgba(23, 23, 23, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    padding: '2rem'
                }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: '#fff',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        transition: 'background 0.2s'
                    }}
                >
                    ×
                </button>

                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', paddingRight: '2rem' }}>{guide.title}</h3>

                <div dangerouslySetInnerHTML={{ __html: guide.embedHtml }} />

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <a
                        href={guide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ fontSize: '0.9rem', textDecoration: 'none' }}
                    >
                        Open on Twitter ↗
                    </a>
                </div>
            </div>
        </div>
    );
};

const Guides = () => {
    const [selectedGuide, setSelectedGuide] = useState(null);

    useEffect(() => {
        // Load Twitter Widget Script globally
        if (!document.getElementById('twitter-wjs')) {
            const script = document.createElement('script');
            script.id = 'twitter-wjs';
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.charset = "utf-8";
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Community Guides</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Curated discussions and threads to help you maximize savings.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem',
                alignItems: 'start'
            }}>
                {guidesData.map(guide => {
                    const hasEmbed = !!guide.embedHtml;

                    return (
                        <div
                            key={guide.id}
                            className="glass-panel"
                            style={{
                                padding: '1.5rem',
                                border: '1px solid rgba(255,255,255,0.08)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                cursor: 'default'
                            }}
                        >
                            {/* Header: Tags */}
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                {guide.tags.slice(0, 3).map(tag => (
                                    <span key={tag} style={{
                                        fontSize: '0.7rem',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'var(--text-secondary)',
                                        fontWeight: 500,
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.2rem', lineHeight: '1.4', color: '#fff' }}>
                                <a href={guide.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-underline">
                                    {guide.title}
                                </a>
                            </h3>

                            <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                {guide.description}
                            </p>

                            {/* Footer */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {guide.author}
                                </span>

                                {hasEmbed ? (
                                    <button
                                        onClick={() => setSelectedGuide(guide)}
                                        style={{
                                            background: 'var(--accent-cyan)',
                                            color: '#000',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s',
                                            boxShadow: '0 4px 12px rgba(0, 240, 255, 0.3)'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        Read Thread
                                    </button>
                                ) : (
                                    <a
                                        href={guide.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}
                                    >
                                        Visit Link ↗
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedGuide && (
                <GuideModal
                    guide={selectedGuide}
                    onClose={() => setSelectedGuide(null)}
                />
            )}

            <style>{`
                .hover-underline:hover { text-decoration: underline !important; }
            `}</style>
        </div>
    );
};

export default Guides;
