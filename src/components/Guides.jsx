
import React, { useEffect, useState, useMemo } from 'react';
import { useGuides } from '../hooks/useGuides';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import LoadingSpinner from './LoadingSpinner';


const RedditEmbed = ({ embedHtml, theme, onLoad }) => {
    // ... (unchanged)
    const containerRef = React.useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !embedHtml) return;

        // Strip existing script tags to prevent conflicts
        const cleanHtml = embedHtml.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "");

        // Inject content manually to prevent React reconciliation from undoing the iframe transformation
        containerRef.current.innerHTML = cleanHtml;

        const blockquote = containerRef.current.querySelector('blockquote');
        if (blockquote) {
            if (theme === 'dark') {
                blockquote.setAttribute('data-embed-theme', 'dark');
            } else {
                blockquote.removeAttribute('data-embed-theme');
            }
        }

        // Reload Reddit widgets script
        const scriptId = 'reddit-wjs';
        let script = document.getElementById(scriptId);
        if (script) {
            script.remove();
        }
        script = document.createElement('script');
        script.id = scriptId;
        script.src = "https://embed.reddit.com/widgets.js";
        script.async = true;
        script.charset = "UTF-8";
        document.body.appendChild(script);

        // Check for iframe creation
        const checkIframe = setInterval(() => {
            if (containerRef.current) {
                const iframe = containerRef.current.querySelector('iframe');
                if (iframe && iframe.offsetHeight > 0) {
                    setIsLoaded(true);
                    onLoad && onLoad();
                    clearInterval(checkIframe);
                }
            }
        }, 100);

        // Cleanup
        const timeout = setTimeout(() => {
            clearInterval(checkIframe);
            // Fallback: assume loaded if timeout hits to show whatever we have
            setIsLoaded(true);
            onLoad && onLoad();
        }, 8000);

        return () => {
            clearInterval(checkIframe);
            clearTimeout(timeout);
        };
    }, [embedHtml, theme]);

    return (
        <div style={{ position: 'relative', minHeight: isLoaded ? '0' : '300px' }}>
            {!isLoaded && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'var(--modal-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    zIndex: 10,
                    borderRadius: '12px'
                }}>
                    <div className="loading-spinner"></div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading discussion...</span>
                </div>
            )}
            <div ref={containerRef} />
        </div>
    );
};

const GuideModal = ({ guide, onClose }) => {
    const { theme } = useTheme();

    useEffect(() => {
        // Re-scan for Twitter widgets when modal opens
        if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [guide]);

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
                    background: 'var(--modal-bg)',
                    border: '1px solid var(--modal-border)',
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
                        background: 'var(--btn-secondary-bg)',
                        border: 'none',
                        color: 'var(--text-primary)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        transition: 'background 0.2s',
                        zIndex: 10
                    }}
                >
                    ×
                </button>

                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem', paddingRight: '2rem' }}>{guide.title}</h3>

                {/* Embed Container */}
                {guide.embedHtml && guide.embedHtml.includes('blockquote class="reddit-embed-bq"') ? (
                    <RedditEmbed embedHtml={guide.embedHtml} theme={theme} />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: guide.embedHtml }} />
                )}

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
    const { guides: guidesData, loading, error } = useGuides();
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { toggleFavoriteGuide, isGuideFavorite } = useFavorites();

    // Extract unique tags
    const allTags = useMemo(() => {
        if (!guidesData) return [];
        const tags = new Set();
        guidesData.forEach(guide => {
            if (guide.tags) {
                guide.tags.forEach(tag => tags.add(tag));
            }
        });
        return Array.from(tags).sort();
    }, [guidesData]);

    // ... (rest of filtering logic)
    const filteredGuides = useMemo(() => {
        if (!guidesData) return [];
        let guides = [...guidesData]; // Copy to avoid mutation

        // Filter by tag
        if (selectedTag) {
            guides = guides.filter(guide => guide.tags && guide.tags.includes(selectedTag));
        }

        // Filter by search term
        if (searchTerm.trim()) {
            const lowerSearch = searchTerm.toLowerCase();
            guides = guides.filter(guide =>
                guide.title.toLowerCase().includes(lowerSearch) ||
                (guide.description && guide.description.toLowerCase().includes(lowerSearch)) ||
                (guide.tags && guide.tags.some(tag => tag.toLowerCase().includes(lowerSearch))) ||
                (guide.author && guide.author.toLowerCase().includes(lowerSearch))
            );
        }

        return guides;
    }, [guidesData, selectedTag, searchTerm]);

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

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-danger)' }}>
                <h3>Error loading guides</h3>
                <p>Please try again later.</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Community Guides</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Curated discussions and threads to help you maximize savings.
                </p>
            </div>

            {/* Search Bar */}
            <div style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
                <div className="glass-panel" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)'
                }}>
                    <span style={{ marginRight: '0.75rem', color: 'var(--text-secondary)' }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search guides..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            width: '100%',
                            outline: 'none'
                        }}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.8rem'
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>
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
                        background: !selectedTag ? 'var(--nav-bg-active)' : 'var(--tag-bg)',
                        color: !selectedTag ? 'var(--nav-text-hover)' : 'var(--nav-text)',
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
                            background: selectedTag === tag ? 'var(--accent-cyan)' : 'var(--tag-bg)',
                            color: selectedTag === tag ? '#000' : 'var(--nav-text)',
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
                                border: '1px solid var(--item-border)',
                                background: 'var(--item-bg)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                        >
                            {/* Favorite Toggle Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavoriteGuide(guide.id);
                                }}
                                title={isGuideFavorite(guide.id) ? 'Remove from favorites' : 'Add to favorites'}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: isGuideFavorite(guide.id) ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                    border: isGuideFavorite(guide.id) ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--glass-border)',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    fontSize: '1rem',
                                    zIndex: 5
                                }}
                            >
                                {isGuideFavorite(guide.id) ? '❤️' : '🤍'}
                            </button>
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
                                            background: selectedTag === tag ? 'var(--accent-cyan-dim)' : 'var(--tag-bg)',
                                            color: selectedTag === tag ? 'var(--accent-cyan)' : 'var(--tag-text)',
                                            fontWeight: 500,
                                            border: selectedTag === tag ? '1px solid var(--accent-cyan)' : '1px solid var(--tag-border)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.2rem', lineHeight: '1.4', color: 'var(--card-title)' }}>
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
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--item-border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        {guide.author}
                                    </span>
                                </div>

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
