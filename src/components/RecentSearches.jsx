import { useState, useEffect, useCallback } from 'react';

/**
 * useRecentSearches - Hook to manage search history
 * Stores recent searches in localStorage and provides methods to manage them
 */

const STORAGE_KEY = 'voucherTracker_recentSearches';
const MAX_SEARCHES = 8;

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Failed to load recent searches:', err);
    }
  }, []);

  // Save to localStorage whenever searches change
  const saveSearches = useCallback((searches) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
      setRecentSearches(searches);
    } catch (err) {
      console.error('Failed to save recent searches:', err);
    }
  }, []);

  // Add a new search
  const addSearch = useCallback((query, type = 'voucher') => {
    if (!query || query.trim().length < 2) return;

    const trimmedQuery = query.trim();
    
    setRecentSearches(prev => {
      // Remove if already exists (will re-add at top)
      const filtered = prev.filter(s => 
        s.query.toLowerCase() !== trimmedQuery.toLowerCase()
      );
      
      const newSearch = {
        id: Date.now(),
        query: trimmedQuery,
        type,
        timestamp: new Date().toISOString(),
      };
      
      const updated = [newSearch, ...filtered].slice(0, MAX_SEARCHES);
      saveSearches(updated);
      return updated;
    });
  }, [saveSearches]);

  // Remove a specific search
  const removeSearch = useCallback((id) => {
    setRecentSearches(prev => {
      const updated = prev.filter(s => s.id !== id);
      saveSearches(updated);
      return updated;
    });
  }, [saveSearches]);

  // Clear all searches
  const clearSearches = useCallback(() => {
    saveSearches([]);
  }, [saveSearches]);

  return {
    recentSearches,
    addSearch,
    removeSearch,
    clearSearches,
  };
};

/**
 * RecentSearches - Dropdown component showing recent search history
 */
const RecentSearches = ({ 
  isVisible, 
  searches, 
  onSelect, 
  onRemove, 
  onClear,
  style = {} 
}) => {
  if (!isVisible || searches.length === 0) return null;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'card': return '💳';
      case 'voucher': return '🎫';
      case 'guide': return '📖';
      default: return '🔍';
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: '8px',
        background: 'var(--glass-bg, rgba(30, 30, 40, 0.98))',
        borderRadius: '12px',
        border: '1px solid var(--glass-border, rgba(255,255,255,0.1))',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
        zIndex: 100,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid var(--glass-border, rgba(255,255,255,0.1))',
      }}>
        <span style={{ 
          fontSize: '0.75rem', 
          color: 'var(--text-secondary, #888)',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Recent Searches
        </span>
        <button
          onClick={onClear}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            background: 'transparent',
            color: 'var(--text-secondary, #888)',
            cursor: 'pointer',
            fontSize: '0.7rem',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary, #888)'}
        >
          Clear all
        </button>
      </div>

      {/* Search List */}
      <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
        {searches.map((search, index) => (
          <div
            key={search.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 16px',
              cursor: 'pointer',
              transition: 'background 0.15s',
              borderBottom: index < searches.length - 1 
                ? '1px solid rgba(255,255,255,0.05)' 
                : 'none',
            }}
            onClick={() => onSelect(search.query)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span style={{ marginRight: '12px', fontSize: '1rem' }}>
              {getTypeIcon(search.type)}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                color: 'var(--text-primary, #fff)',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {search.query}
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-secondary, #666)',
              }}>
                {formatTime(search.timestamp)}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(search.id);
              }}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary, #666)',
                cursor: 'pointer',
                fontSize: '1rem',
                opacity: 0.5,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Keyboard hint */}
      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid var(--glass-border, rgba(255,255,255,0.1))',
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
      }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #666)' }}>
          <kbd style={{
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,0.1)',
            marginRight: '4px',
          }}>↑↓</kbd>
          Navigate
        </span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #666)' }}>
          <kbd style={{
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,0.1)',
            marginRight: '4px',
          }}>Enter</kbd>
          Select
        </span>
      </div>
    </div>
  );
};

/**
 * SearchBarWithHistory - Enhanced search bar with recent searches
 */
export const SearchBarWithHistory = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search vouchers, cards...',
  style = {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const { recentSearches, addSearch, removeSearch, clearSearches } = useRecentSearches();

  const showRecent = isFocused && value.length === 0;

  const handleSelect = (query) => {
    onChange(query);
    if (onSearch) onSearch(query);
    setIsFocused(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      addSearch(value.trim());
      if (onSearch) onSearch(value.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (!showRecent) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(prev => 
        prev < recentSearches.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(recentSearches[highlightIndex].query);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', ...style }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '12px',
        border: `1px solid ${isFocused ? 'var(--accent-cyan, #06b6d4)' : 'var(--glass-border, rgba(255,255,255,0.1))'}`,
        background: 'rgba(0, 0, 0, 0.3)',
        transition: 'border-color 0.2s',
      }}>
        <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary, #fff)',
            fontSize: '1rem',
          }}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: 'rgba(255,255,255,0.1)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.8rem',
            }}
          >
            ✕
          </button>
        )}
      </div>

      <RecentSearches
        isVisible={showRecent}
        searches={recentSearches}
        onSelect={handleSelect}
        onRemove={removeSearch}
        onClear={clearSearches}
      />
    </form>
  );
};

export default RecentSearches;
