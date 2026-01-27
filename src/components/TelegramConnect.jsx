import React from 'react';
import { useTelegram } from '../hooks/useTelegram';

const TelegramConnect = ({ voucherId = null }) => {
    const { isLinked, subscription, getBotUrl, loading, refetch } = useTelegram();
    const botUrl = getBotUrl(voucherId);

    // Poll for status update if not linked (e.g. user just clicked link)
    React.useEffect(() => {
        if (!isLinked && !loading) {
            const interval = setInterval(() => {
                // Periodically check if user connected
                refetch();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isLinked, loading, refetch]);

    if (loading) return null;

    if (isLinked) {
        return (
            <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', border: '1px solid rgba(34, 158, 217, 0.3)', background: 'rgba(34, 158, 217, 0.05)' }}>
                <div style={{ background: '#229ED9', color: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    ✈️
                </div>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Connected to Telegram</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>@{subscription.username || 'User'}</div>
                </div>
            </div>
        );
    }

    return (
        <a href={botUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
            <div className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid rgba(34, 158, 217, 0.3)' }}>
                <div style={{ background: '#229ED9', color: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    🔔
                </div>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#229ED9' }}>Get Stock Alerts</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Connect Telegram to get notified regarding stock updates</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#229ED9', fontSize: '1.2rem' }}>
                    →
                </div>
            </div>
        </a>
    );
};

export default TelegramConnect;
