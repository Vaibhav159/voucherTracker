import { useState } from 'react';

/**
 * ComparisonShare - Generate shareable links for card comparisons
 * Share via clipboard, WhatsApp, Twitter, or email
 */

// Generate shareable comparison URL
export const generateComparisonLink = (type, ids) => {
  const base = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();
  params.set('compare', ids.join(','));
  params.set('type', type); // 'cards' or 'vouchers'
  return `${base}#/compare-cards?${params.toString()}`;
};

// Parse comparison from URL
export const parseComparisonFromURL = () => {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const compareStr = params.get('compare');
  const type = params.get('type') || 'cards';
  
  if (!compareStr) return null;
  
  const ids = compareStr.split(',').map(id => {
    const parsed = parseInt(id, 10);
    return isNaN(parsed) ? id : parsed;
  });
  
  return { type, ids };
};

// Share button component
const ShareButton = ({ 
  type = 'cards', 
  ids = [], 
  cardNames = [],
  style = {} 
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareLink = generateComparisonLink(type, ids);
  const title = `Credit Card Comparison: ${cardNames.slice(0, 3).join(' vs ')}`;
  const text = `Check out this ${type} comparison on VoucherTracker!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${shareLink}`)}`;
    window.open(url, '_blank');
    setShowMenu(false);
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareLink)}`;
    window.open(url, '_blank');
    setShowMenu(false);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${text}\n\n${shareLink}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowMenu(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareLink,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      setShowMenu(true);
    }
  };

  if (ids.length === 0) return null;

  return (
    <div style={{ position: 'relative', ...style }}>
      <button
        onClick={handleNativeShare}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          borderRadius: '10px',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          background: 'rgba(139, 92, 246, 0.1)',
          color: '#a78bfa',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: '500',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
        }}
      >
        📤 Share Comparison
      </button>

      {/* Share Menu (fallback for browsers without native share) */}
      {showMenu && (
        <>
          <div
            onClick={() => setShowMenu(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              padding: '8px',
              background: 'var(--glass-bg, rgba(30, 30, 40, 0.95))',
              borderRadius: '12px',
              border: '1px solid var(--glass-border, rgba(255,255,255,0.1))',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
              zIndex: 101,
              minWidth: '180px',
            }}
          >
            <ShareMenuItem 
              icon="📋" 
              label={copied ? 'Copied!' : 'Copy Link'} 
              onClick={handleCopy}
              highlight={copied}
            />
            <ShareMenuItem 
              icon="💬" 
              label="WhatsApp" 
              onClick={handleWhatsApp}
            />
            <ShareMenuItem 
              icon="🐦" 
              label="Twitter" 
              onClick={handleTwitter}
            />
            <ShareMenuItem 
              icon="📧" 
              label="Email" 
              onClick={handleEmail}
            />
          </div>
        </>
      )}
    </div>
  );
};

const ShareMenuItem = ({ icon, label, onClick, highlight = false }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      padding: '10px 12px',
      borderRadius: '8px',
      border: 'none',
      background: highlight ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
      color: highlight ? '#22c55e' : 'var(--text-primary, #fff)',
      cursor: 'pointer',
      fontSize: '0.9rem',
      textAlign: 'left',
      transition: 'background 0.2s',
    }}
    onMouseEnter={(e) => {
      if (!highlight) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
    }}
    onMouseLeave={(e) => {
      if (!highlight) e.currentTarget.style.background = 'transparent';
    }}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </button>
);

// Quick share inline component (for use in comparison tables)
export const QuickShareButton = ({ type, ids, compact = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const link = generateComparisonLink(type, ids);
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (ids.length === 0) return null;

  return (
    <button
      onClick={handleCopy}
      title="Copy comparison link"
      style={{
        padding: compact ? '6px 10px' : '8px 14px',
        borderRadius: '8px',
        border: '1px solid var(--glass-border)',
        background: copied ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.03)',
        color: copied ? '#22c55e' : 'var(--text-secondary)',
        cursor: 'pointer',
        fontSize: compact ? '0.75rem' : '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s',
      }}
    >
      {copied ? '✓ Copied!' : '🔗 Share'}
    </button>
  );
};

// Hook to handle incoming shared comparisons
export const useSharedComparison = (onComparisonLoad) => {
  useState(() => {
    const comparison = parseComparisonFromURL();
    if (comparison && onComparisonLoad) {
      onComparisonLoad(comparison);
    }
  });
};

export default ShareButton;
