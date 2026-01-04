import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useGuides } from '../hooks/useGuides';
import Markdown from 'react-markdown';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import LoadingSpinner from './LoadingSpinner';

const RedditEmbed = ({ embedHtml, theme, onLoad }) => {
    // ... (same implementation as before)
    const containerRef = React.useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !embedHtml) return;

        const cleanHtml = embedHtml.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "");
        containerRef.current.innerHTML = cleanHtml;

        const blockquote = containerRef.current.querySelector('blockquote');
        if (blockquote) {
            if (theme === 'dark') {
                blockquote.setAttribute('data-embed-theme', 'dark');
            } else {
                blockquote.removeAttribute('data-embed-theme');
            }
        }

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

        const timeout = setTimeout(() => {
            clearInterval(checkIframe);
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

    const processedEmbedHtml = useMemo(() => {
        if (!guide.embedHtml) return '';
        // Inject theme for Twitter embeds
        if (guide.embedHtml.includes('twitter-tweet')) {
            // Check if it already has data-theme to allow manual override if needed, otherwise inject
            if (!guide.embedHtml.includes('data-theme=')) {
                return guide.embedHtml.replace(
                    /class=["']twitter-tweet["']/,
                    `class="twitter-tweet" data-theme="${theme}"`
                );
            }
        }
        return guide.embedHtml;
    }, [guide.embedHtml, theme]);

    useEffect(() => {
        if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [guide, theme]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const getPlatformLabel = () => {
        if (guide.link.includes('reddit.com')) return 'Open on Reddit';
        if (guide.link.includes('twitter.com') || guide.link.includes('x.com')) return 'Open on Twitter';
        return 'Open Link';
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div
            className="guide-modal-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(8px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'flex-start', // Changed from center to prevent top cropping
                justifyContent: 'center',
                padding: '2rem 1rem', // Add padding for safe area
                overflowY: 'auto'
            }}
            onClick={onClose}
        >
            <div
                className="guide-modal-container"
                style={{
                    background: 'var(--modal-bg)',
                    border: '1px solid var(--modal-border)',
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: '700px',
                    // maxHeight: isMobile ? '95vh' : '90vh', // Removed max-height constraint to let page scroll
                    margin: 'auto', // Centers vertically if content is short
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    position: 'relative'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div className="guide-modal-header-wrapper">
                    <h3 className="guide-modal-title">{guide.title}</h3>
                    <button
                        className="guide-modal-close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                {guide.content ? (
                    <div style={{ color: 'var(--text-primary)', lineHeight: '1.6', width: '100%' }}>
                        <Markdown components={{
                            h1: ({ node, ...props }) => <h1 style={{ fontSize: '1.8rem', margin: '1.5rem 0 1rem' }} {...props} />,
                            h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem', color: 'var(--accent-cyan)' }} {...props} />,
                            h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.2rem', margin: '1.2rem 0 0.8rem' }} {...props} />,
                            p: ({ node, ...props }) => <p style={{ marginBottom: '1rem' }} {...props} />,
                            ul: ({ node, ...props }) => <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }} {...props} />,
                            li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                            blockquote: ({ node, ...props }) => (
                                <blockquote style={{
                                    borderLeft: '4px solid var(--accent-cyan)',
                                    margin: '1rem 0',
                                    paddingLeft: '1rem',
                                    color: 'var(--text-secondary)',
                                    fontStyle: 'italic'
                                }} {...props} />
                            ),
                            a: ({ node, ...props }) => <a style={{ color: 'var(--accent-cyan)' }} {...props} />
                        }}>
                            {guide.content}
                        </Markdown>
                    </div>
                ) : guide.embedHtml && guide.embedHtml.includes('blockquote class="reddit-embed-bq"') ? (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <RedditEmbed embedHtml={guide.embedHtml} theme={theme} />
                    </div>
                ) : (
                    <div className="guide-embed-wrapper">
                        <div dangerouslySetInnerHTML={{ __html: processedEmbedHtml }} />
                    </div>
                )}

                {guide.link && guide.link !== '#' && (
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
                )}
            </div>
        </div>
    );
};

const Guides = () => {
    const { guides: guidesData, loading, error } = useGuides();
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleCount, setVisibleCount] = useState(9); // Pagination state
    const { toggleFavoriteGuide, isGuideFavorite } = useFavorites();

    // Dropdown state
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    // Reset pagination when filters change
    useEffect(() => {
        setVisibleCount(9);
    }, [selectedTag, searchTerm]);

    const filteredGuides = useMemo(() => {
        if (!guidesData) return [];
        let guides = [...guidesData];

        if (selectedTag) {
            guides = guides.filter(guide => guide.tags && guide.tags.includes(selectedTag));
        }

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

    // Apply pagination
    const displayedGuides = useMemo(() => {
        return filteredGuides.slice(0, visibleCount);
    }, [filteredGuides, visibleCount]);

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

        // Click outside handler for dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <div className="guides-container">
            <header className="guides-header">
                <h2 className="guides-title">Community Guides</h2>
                <p className="guides-subtitle">
                    Curated discussions and threads to help you maximize savings.
                </p>
            </header>

            {/* Minimalist Control Bar */}
            <div className="guides-control-bar">
                <div className="guides-search-wrapper">
                    <span className="guides-search-icon">🔍</span>
                    <input
                        type="text"
                        className="guides-search-input"
                        placeholder="Search guides, authors, topics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="guides-divider"></div>

                <div style={{ position: 'relative' }} ref={dropdownRef}>
                    <button
                        className={`guides-filter-trigger ${isDropdownOpen ? 'open' : ''} ${selectedTag ? 'has-selection' : ''}`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span>{selectedTag || 'Filter by Category'}</span>
                        {selectedTag && (
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTag(null);
                                }}
                                style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '50%',
                                    width: '16px',
                                    height: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.6rem',
                                    marginLeft: '4px'
                                }}
                            >
                                ✕
                            </span>
                        )}
                        {!selectedTag && <span className="arrow">▼</span>}
                    </button>

                    <div className={`guides-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                        <div
                            className={`guides-dropdown-item ${!selectedTag ? 'selected' : ''}`}
                            onClick={() => {
                                setSelectedTag(null);
                                setIsDropdownOpen(false);
                            }}
                        >
                            <span>All Categories</span>
                            <span className="guides-filter-count">{guidesData?.length}</span>
                        </div>
                        {allTags.map(tag => (
                            <div
                                key={tag}
                                className={`guides-dropdown-item ${selectedTag === tag ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedTag(tag);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                <span>{tag}</span>
                                <span className="guides-filter-count">
                                    {guidesData.filter(g => g.tags && g.tags.includes(tag)).length}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Guides Grid */}
            <div className="guides-grid">
                {displayedGuides.map(guide => {
                    const hasEmbed = !!guide.embedHtml;
                    const hasContent = !!guide.content;
                    const isInternal = hasEmbed || hasContent;

                    return (
                        <div
                            key={guide.id}
                            className="guide-card glass-panel"
                            onClick={() => {
                                if (isInternal) {
                                    setSelectedGuide(guide);
                                } else {
                                    window.open(guide.link, '_blank');
                                }
                            }}
                        >
                            <div className="guide-card-content">
                                <div className="guide-card-header">
                                    <div className="guide-tags-wrapper">
                                        {guide.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="guide-tag-pill">{tag}</span>
                                        ))}
                                        {guide.tags.length > 2 && (
                                            <span className="guide-tag-pill">+{guide.tags.length - 2}</span>
                                        )}
                                    </div>
                                    <button
                                        className="guide-fav-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavoriteGuide(guide.id);
                                        }}
                                        title={isGuideFavorite(guide.id) ? 'Remove from favorites' : 'Add to favorites'}
                                        style={{
                                            color: isGuideFavorite(guide.id) ? '#ef4444' : 'var(--text-secondary)'
                                        }}
                                    >
                                        {isGuideFavorite(guide.id) ? '❤️' : '🤍'}
                                    </button>
                                </div>

                                <h3 className="guide-card-title">{guide.title}</h3>
                                <p className="guide-card-description">{guide.description}</p>

                                <div className="guide-card-footer">
                                    <span className="guide-author">
                                        {guide.author}
                                    </span>
                                    {isInternal ? (
                                        <button className="guide-action-btn">
                                            {hasContent ? 'Read Guide' : 'Read Thread'}
                                        </button>
                                    ) : (
                                        <span className="guide-action-btn" style={{ border: 'none', background: 'transparent', padding: '0' }}>
                                            Visit Link ↗
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredGuides.length && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                    <button
                        className="guide-load-more-btn"
                        onClick={() => setVisibleCount(prev => prev + 9)}
                    >
                        Load More Guides
                    </button>
                </div>
            )}

            {filteredGuides.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                    No guides found matching your filters.
                </div>
            )}

            {selectedGuide && (
                <GuideModal
                    guide={selectedGuide}
                    onClose={() => setSelectedGuide(null)}
                />
            )}
        </div>
    );
};

export default Guides;
