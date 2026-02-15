import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { Search, ChevronRight, Heart, Clock, ExternalLink, Tag, User, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { GUIDES_API_URL, staticGuides, transformGuideForUI, getSourceType } from '../data/guides';

// Extract unique tags from guides for filtering
const getUniqueTags = (guides) => {
    const tagSet = new Set();
    guides.forEach(guide => {
        (guide.tags || []).forEach(tag => tagSet.add(tag));
    });
    return ['All', ...Array.from(tagSet).sort()];
};

// Source type icons
const SourceIcon = ({ type }) => {
    if (type === 'twitter') {
        return (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        );
    }
    if (type === 'reddit') {
        return (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
            </svg>
        );
    }
    return <ExternalLink size={16} />;
};

export default function Guides() {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTag, setSelectedTag] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { isFavorite, toggleFavorite } = useFavorites();

    // Fetch guides from API
    useEffect(() => {
        const fetchGuides = async () => {
            try {
                setLoading(true);
                const response = await fetch(GUIDES_API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch guides');
                }
                const data = await response.json();
                const transformedGuides = (data.items || []).map(transformGuideForUI);
                setGuides(transformedGuides);
                setError(null);
            } catch (err) {
                console.error('Error fetching guides:', err);
                // Fallback to static data
                setGuides(staticGuides.map(transformGuideForUI));
                setError('Using cached data');
            } finally {
                setLoading(false);
            }
        };

        fetchGuides();
    }, []);

    // Get unique tags for filtering
    const availableTags = useMemo(() => getUniqueTags(guides), [guides]);

    // Filter guides based on search and tag
    const filteredGuides = useMemo(() => {
        return guides.filter(guide => {
            const matchesTag = selectedTag === 'All' || guide.tags?.includes(selectedTag);
            const matchesSearch = !searchQuery ||
                guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                guide.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                guide.author?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTag && matchesSearch;
        });
    }, [guides, selectedTag, searchQuery]);

    // Split guides into featured and rest
    const featuredGuide = filteredGuides[0];
    const otherGuides = filteredGuides.slice(1);

    const handleToggleFavorite = (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite('guides', id);
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100dvh-64px)] overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
            <SEO
                title="Financial Guides & Credit Card Insights"
                description="Expert guides on credit cards, rewards optimization, forex markup, and financial strategies from the community."
                keywords="credit card guides, rewards optimization, forex markup, financial tips, HDFC Infinia, Axis Magnus"
            />

            {/* Sidebar */}
            <aside className="hidden lg:flex w-80 flex-col border-r overflow-y-auto flex-shrink-0"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="p-6">
                    {/* Search */}
                    <div className="mb-8 relative">
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-secondary)' }}>Find Guides</h3>
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input
                                className="w-full rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                                placeholder="Search topics..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Filter by Topic</h3>
                    <nav className="flex flex-col gap-1.5">
                        {availableTags.slice(0, 12).map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${selectedTag === tag
                                    ? 'bg-[var(--bg-alt)] border border-[var(--border)] shadow-sm'
                                    : 'border border-transparent hover:bg-[var(--bg-alt)]'
                                    }`}
                            >
                                <span className={`text-sm font-medium transition-colors ${selectedTag === tag ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-secondary)]'
                                    }`}>
                                    {tag}
                                </span>
                                {selectedTag === tag && (
                                    <ChevronRight size={16} className="text-[var(--accent)]" />
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="h-px w-full my-8" style={{ backgroundColor: 'var(--border)' }}></div>

                    {/* Stats */}
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
                        <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>{guides.length}</div>
                        <div className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Community Guides</div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative scroll-smooth p-6 md:p-8 lg:p-12 pb-24" style={{ backgroundColor: 'var(--bg)' }}>
                <div className="max-w-5xl mx-auto w-full">
                    {/* Header */}
                    <div className="flex items-end justify-between mb-8">
                        <div className="animate-fade-in-up">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: 'var(--text-secondary)' }}>Community Hub</span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold" style={{ color: 'var(--text-primary)' }}>
                                Guides <span className="font-light italic" style={{ color: 'var(--text-secondary)' }}>&</span> Insights
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <span className="text-sm font-light italic" style={{ color: 'var(--text-secondary)' }}>Curated from the community</span>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="lg:hidden mb-6">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input
                                className="w-full rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                                placeholder="Search guides..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {/* Mobile Tags */}
                        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
                            {availableTags.slice(0, 8).map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${selectedTag === tag
                                        ? 'bg-[var(--accent)] text-[var(--bg)]'
                                        : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--accent)' }} />
                        </div>
                    )}

                    {/* Error Notice */}
                    {error && !loading && (
                        <div className="mb-6 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent)' }}>
                            {error}
                        </div>
                    )}

                    {/* No Results */}
                    {!loading && filteredGuides.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No guides found</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters</p>
                        </div>
                    )}

                    {/* Featured Guide */}
                    {!loading && featuredGuide && (
                        <section className="mb-12">
                            <a
                                href={featuredGuide.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5 bg-black"
                                style={{ minHeight: '320px' }}
                            >
                                {/* Gradient Background */}
                                <div
                                    className="absolute inset-0 opacity-90"
                                    style={{
                                        background: `linear-gradient(135deg, 
                                            color-mix(in srgb, var(--accent) 30%, #000) 0%, 
                                            color-mix(in srgb, var(--surface) 50%, #000) 50%,
                                            var(--bg) 100%)`
                                    }}
                                />

                                {/* Favorite Button */}
                                <button
                                    className={`absolute top-6 right-6 z-30 size-10 flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300 ${isFavorite('guides', featuredGuide.id) ? 'text-red-500 border-red-500/50 bg-black/20' : 'border-white/20 text-white/70 hover:text-white hover:border-white/50 bg-black/20'}`}
                                    onClick={(e) => handleToggleFavorite(e, featuredGuide.id)}
                                >
                                    <Heart size={20} fill={isFavorite('guides', featuredGuide.id) ? 'currentColor' : 'none'} />
                                </button>

                                {/* Content */}
                                <div className="relative z-20 p-8 md:p-12 flex flex-col justify-end h-full" style={{ minHeight: '320px' }}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-3 py-1 rounded border border-white/30 bg-black/30 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-2">
                                            <SourceIcon type={featuredGuide.sourceType} />
                                            {featuredGuide.category}
                                        </span>
                                        <span className="w-px h-3 bg-white/40"></span>
                                        <span className="text-white/80 text-xs font-medium tracking-wide flex items-center gap-1.5">
                                            <User size={14} /> {featuredGuide.authorDisplay}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4 leading-[1.1] tracking-wide drop-shadow-lg group-hover:text-[var(--accent)] transition-colors">
                                        {featuredGuide.title}
                                    </h3>
                                    <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-6 max-w-2xl border-l-2 pl-4" style={{ borderColor: 'var(--accent)' }}>
                                        {featuredGuide.description}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {featuredGuide.tags?.slice(0, 4).map((tag) => (
                                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium bg-white/10 text-white/70">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        </section>
                    )}

                    {/* Guides Grid */}
                    {!loading && otherGuides.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="w-12 h-[1px]" style={{ backgroundColor: 'var(--accent)' }}></span>
                                <h2 className="text-2xl font-serif font-semibold" style={{ color: 'var(--text-primary)' }}>
                                    All Guides
                                    <span className="text-sm font-normal ml-2" style={{ color: 'var(--text-muted)' }}>
                                        ({filteredGuides.length})
                                    </span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {otherGuides.map((guide) => (
                                    <a
                                        key={guide.id}
                                        href={guide.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
                                        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                                    >
                                        {/* Header with source indicator */}
                                        <div
                                            className="h-24 relative overflow-hidden"
                                            style={{
                                                background: `linear-gradient(135deg, 
                                                    color-mix(in srgb, var(--accent) 20%, var(--surface)) 0%, 
                                                    var(--surface) 100%)`
                                            }}
                                        >
                                            {/* Source Icon */}
                                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                                <span
                                                    className="p-2 rounded-lg backdrop-blur-sm"
                                                    style={{
                                                        backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)',
                                                        color: guide.sourceType === 'twitter' ? '#1DA1F2' : guide.sourceType === 'reddit' ? '#FF4500' : 'var(--accent)'
                                                    }}
                                                >
                                                    <SourceIcon type={guide.sourceType} />
                                                </span>
                                            </div>

                                            {/* Favorite Button */}
                                            <button
                                                className={`absolute top-4 right-4 z-20 size-8 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${isFavorite('guides', guide.id) ? 'text-red-500 bg-white/20' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-white/10'}`}
                                                onClick={(e) => handleToggleFavorite(e, guide.id)}
                                            >
                                                <Heart size={16} fill={isFavorite('guides', guide.id) ? 'currentColor' : 'none'} />
                                            </button>

                                            {/* External Link Icon */}
                                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ExternalLink size={16} style={{ color: 'var(--text-muted)' }} />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                                                {guide.title}
                                            </h3>
                                            <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                                {guide.description}
                                            </p>

                                            {/* Author & Tags */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                                                    <User size={12} />
                                                    <span>{guide.authorDisplay}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {guide.tags?.slice(0, 2).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium"
                                                            style={{ backgroundColor: 'var(--bg-alt)', color: 'var(--text-muted)' }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
