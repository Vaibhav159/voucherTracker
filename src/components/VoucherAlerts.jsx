import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * VoucherAlerts - Notification system for voucher discount changes
 * Tracks watched vouchers and alerts users when discounts change
 */

const STORAGE_KEY = 'voucherTracker_watchedVouchers';
const ALERTS_KEY = 'voucherTracker_alerts';

// Hook to manage watched vouchers
export const useVoucherAlerts = (currentVouchers = []) => {
  const [watchedVouchers, setWatchedVouchers] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Load watched vouchers from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedAlerts = localStorage.getItem(ALERTS_KEY);
      if (saved) setWatchedVouchers(JSON.parse(saved));
      if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
    } catch (err) {
      console.error('Failed to load watched vouchers:', err);
    }
  }, []);

  // Check for changes when vouchers update
  useEffect(() => {
    if (currentVouchers.length === 0 || watchedVouchers.length === 0) return;

    const newAlerts = [];

    watchedVouchers.forEach(watched => {
      const current = currentVouchers.find(v => v.id === watched.id);
      if (!current) return;

      // Check each platform for changes
      current.platforms?.forEach(platform => {
        const oldPlatform = watched.platforms?.find(p => p.name === platform.name);
        if (!oldPlatform) {
          // New platform added
          newAlerts.push({
            id: `${watched.id}-${platform.name}-${Date.now()}`,
            type: 'new_platform',
            voucherId: watched.id,
            brand: watched.brand,
            platform: platform.name,
            message: `${watched.brand} now available on ${platform.name}!`,
            discount: platform.fee,
            timestamp: new Date().toISOString(),
            read: false,
          });
        } else {
          // Check if discount changed
          const oldDiscount = parseDiscount(oldPlatform.fee);
          const newDiscount = parseDiscount(platform.fee);

          if (newDiscount > oldDiscount) {
            newAlerts.push({
              id: `${watched.id}-${platform.name}-${Date.now()}`,
              type: 'discount_increase',
              voucherId: watched.id,
              brand: watched.brand,
              platform: platform.name,
              message: `${watched.brand} discount increased to ${platform.fee} on ${platform.name}!`,
              oldDiscount: oldPlatform.fee,
              newDiscount: platform.fee,
              timestamp: new Date().toISOString(),
              read: false,
            });
          }
        }
      });
    });

    if (newAlerts.length > 0) {
      setAlerts(prev => {
        const updated = [...newAlerts, ...prev].slice(0, 50);
        localStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
        return updated;
      });

      // Update watched vouchers with new data
      const updatedWatched = watchedVouchers.map(watched => {
        const current = currentVouchers.find(v => v.id === watched.id);
        return current ? { ...watched, ...current, watchedAt: watched.watchedAt } : watched;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWatched));
      setWatchedVouchers(updatedWatched);
    }
  }, [currentVouchers, watchedVouchers]);

  // Watch a voucher
  const watchVoucher = useCallback((voucher) => {
    setWatchedVouchers(prev => {
      if (prev.some(v => v.id === voucher.id)) return prev;

      const updated = [...prev, { ...voucher, watchedAt: new Date().toISOString() }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Unwatch a voucher
  const unwatchVoucher = useCallback((voucherId) => {
    setWatchedVouchers(prev => {
      const updated = prev.filter(v => v.id !== voucherId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if voucher is watched
  const isWatched = useCallback((voucherId) => {
    return watchedVouchers.some(v => v.id === voucherId);
  }, [watchedVouchers]);

  // Mark alert as read
  const markAlertRead = useCallback((alertId) => {
    setAlerts(prev => {
      const updated = prev.map(a => 
        a.id === alertId ? { ...a, read: true } : a
      );
      localStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear all alerts
  const clearAlerts = useCallback(() => {
    setAlerts([]);
    localStorage.setItem(ALERTS_KEY, JSON.stringify([]));
  }, []);

  const unreadCount = alerts.filter(a => !a.read).length;

  return {
    watchedVouchers,
    alerts,
    unreadCount,
    watchVoucher,
    unwatchVoucher,
    isWatched,
    markAlertRead,
    clearAlerts,
  };
};

// Parse discount from fee string
const parseDiscount = (fee) => {
  if (!fee) return 0;
  const match = fee.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
};

// Watch Button Component
export const WatchButton = ({ voucher, isWatched, onWatch, onUnwatch, compact = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isWatched) {
      onUnwatch(voucher.id);
    } else {
      onWatch(voucher);
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={isWatched ? 'Stop watching' : 'Watch for discount changes'}
      style={{
        padding: compact ? '6px 10px' : '8px 14px',
        borderRadius: '8px',
        border: `1px solid ${isWatched ? 'rgba(245, 158, 11, 0.3)' : 'var(--glass-border)'}`,
        background: isWatched 
          ? 'rgba(245, 158, 11, 0.15)' 
          : isHovered 
            ? 'rgba(245, 158, 11, 0.1)' 
            : 'rgba(255,255,255,0.03)',
        color: isWatched ? '#fbbf24' : 'var(--text-secondary)',
        cursor: 'pointer',
        fontSize: compact ? '0.75rem' : '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s',
      }}
    >
      {isWatched ? '🔔' : '🔕'}
      {!compact && (isWatched ? 'Watching' : 'Watch')}
    </button>
  );
};

// Alert Bell Component with Badge
export const AlertBell = ({ unreadCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid var(--glass-border)',
        background: unreadCount > 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.03)',
        cursor: 'pointer',
        fontSize: '1.2rem',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(245, 158, 11, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = unreadCount > 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.03)';
      }}
    >
      🔔
      {unreadCount > 0 && (
        <span style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          minWidth: '18px',
          height: '18px',
          borderRadius: '9px',
          background: '#ef4444',
          color: '#fff',
          fontSize: '0.65rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 4px',
        }}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
};

// Alerts Panel Component
export const AlertsPanel = ({ 
  isOpen, 
  onClose, 
  alerts, 
  onMarkRead, 
  onClear,
  onVoucherClick 
}) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '400px',
          background: 'var(--glass-bg, rgba(20, 20, 30, 0.98))',
          borderLeft: '1px solid var(--glass-border)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.2s ease-out',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
            🔔 Alerts
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {alerts.length > 0 && (
              <button
                onClick={onClear}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#f87171',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--text-secondary)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔕</div>
              <p style={{ margin: '0 0 0.5rem' }}>No alerts yet</p>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>
                Watch vouchers to get notified when discounts change
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  onClick={() => {
                    onMarkRead(alert.id);
                    if (onVoucherClick) onVoucherClick(alert.voucherId);
                  }}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: alert.read 
                      ? 'rgba(255,255,255,0.02)' 
                      : 'rgba(245, 158, 11, 0.1)',
                    border: `1px solid ${alert.read ? 'var(--glass-border)' : 'rgba(245, 158, 11, 0.3)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = alert.read 
                      ? 'rgba(255,255,255,0.02)' 
                      : 'rgba(245, 158, 11, 0.1)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}>
                    <span style={{
                      fontSize: '1.5rem',
                      lineHeight: 1,
                    }}>
                      {alert.type === 'discount_increase' ? '📈' : '🆕'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                        fontSize: '0.9rem',
                      }}>
                        {alert.brand}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        {alert.message}
                      </div>
                      {alert.type === 'discount_increase' && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.75rem',
                        }}>
                          <span style={{ color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                            {alert.oldDiscount}
                          </span>
                          <span style={{ color: 'var(--text-secondary)' }}>→</span>
                          <span style={{ color: '#22c55e', fontWeight: '600' }}>
                            {alert.newDiscount}
                          </span>
                        </div>
                      )}
                      <div style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-secondary)',
                        marginTop: '8px',
                      }}>
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                    {!alert.read && (
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#fbbf24',
                      }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>,
    document.body
  );
};

export default AlertsPanel;
