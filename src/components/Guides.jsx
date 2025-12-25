import React, { useEffect, useState, useMemo } from 'react';
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

    // Determine platform label
    const getPlatformLabel = () => {
        if (guide.link.includes('reddit.com')) return 'Open on Reddit';
        if (guide.link.includes('twitter.com') || guide.link.includes('x.com')) return 'Open on Twitter';
        return 'Open Link';
    };

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
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                overflowY: 'auto'
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
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    padding: '2rem',
                    margin: 'auto'
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

                {/* Embed Container */}
                <div dangerouslySetInnerHTML={{ __html: guide.embedHtml }} />

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <a
                        href={guide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ fontSize: '0.9rem', textDecoration: 'none' }}
                    >
                        {getPlatformLabel()} ↗
                    </a>
                </div>
            </div>
        </div>
    );
};

const Guides = () => {
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set();
        guidesData.forEach(guide => {
            guide.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, []);

    const filteredGuides = useMemo(() => {
        if (!selectedTag) return guidesData;
        return guidesData.filter(guide => guide.tags.includes(selectedTag));
    }, [selectedTag]);

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

            {/* Tag Filter */}
            <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '3rem',
                maxWidth: '900px',
                margin: '0 auto 3rem'
            }}>
                <button
                    onClick={() => setSelectedTag(null)}
                    style={{
                        background: !selectedTag ? '#fff' : 'rgba(255,255,255,0.05)',
                        color: !selectedTag ? '#000' : 'var(--text-secondary)',
                        border: '1px solid var(--glass-border)',
                        padding: '8px 20px',
                        borderRadius: '100px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                    }}
                >
                    All
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        style={{
                            background: selectedTag === tag ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)',
                            color: selectedTag === tag ? '#000' : 'var(--text-secondary)',
                            border: selectedTag === tag ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            cursor: 'pointer',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            transition: 'all 0.2s',
                            boxShadow: selectedTag === tag ? '0 0 15px rgba(0, 240, 255, 0.3)' : 'none'
                        }}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem',
                alignItems: 'start'
            }}>
                {filteredGuides.map(guide => {
                    const hasEmbed = !!guide.embedHtml;

                    return (
                        <div
                            key={guide.id}
                            className="glass-panel"
                            onClick={() => {
                                if (hasEmbed) {
                                    setSelectedGuide(guide);
                                } else {
                                    window.open(guide.link, '_blank');
                                }
                            }}
                            style={{
                                padding: '1.5rem',
                                border: '1px solid rgba(255,255,255,0.08)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                cursor: 'pointer'
                            }}
                        >
                            {/* Header: Tags */}
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                {guide.tags.slice(0, 3).map(tag => (
                                    <button
                                        key={tag}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTag(tag);
                                        }}
                                        style={{
                                            fontSize: '0.7rem',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            background: selectedTag === tag ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                                            color: selectedTag === tag ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                                            fontWeight: 500,
                                            border: selectedTag === tag ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.05)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.2rem', lineHeight: '1.4', color: '#fff' }}>
                                <a
                                    href={guide.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                    className="hover-underline"
                                    onClick={(e) => e.stopPropagation()}
                                >
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedGuide(guide);
                                        }}
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
                                        onClick={(e) => e.stopPropagation()}
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

            {filteredGuides.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                    No guides found for tag "{selectedTag}".
                </div>
            )}

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
