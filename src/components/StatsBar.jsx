import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const StatsBar = ({ vouchers, platforms }) => {
    const [animatedStats, setAnimatedStats] = useState({
        vouchers: 0,
        platforms: 0,
        savings: 0
    });

    const stats = useMemo(() => {
        // Calculate estimated monthly savings (average discount * assumed spend)
        const avgDiscount = vouchers.reduce((sum, v) => {
            const maxD = Math.max(...v.platforms.map(p => {
                const fee = p.fee || '';
                const match = fee.match(/(\d+(\.\d+)?)%/);
                if (match && (fee.toLowerCase().includes('discount') || fee.toLowerCase().includes('save'))) {
                    return parseFloat(match[1]);
                }
                return 0;
            }));
            return sum + maxD;
        }, 0) / vouchers.length || 0;

        // Assuming ₹10,000 average monthly spend on voucher-eligible purchases
        const estimatedSavings = Math.round((avgDiscount / 100) * 10000);

        return {
            vouchers: vouchers.length,
            platforms: platforms.length,
            savings: estimatedSavings
        };
    }, [vouchers, platforms]);

    // Animate counters on mount
    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const interval = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);

            setAnimatedStats({
                vouchers: Math.round(stats.vouchers * eased),
                platforms: Math.round(stats.platforms * eased),
                savings: Math.round(stats.savings * eased)
            });

            if (step >= steps) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
    }, [stats]);

    return (
        <div className="stats-bar">
            <div className="stat-item">
                <div className="stat-icon">🎟️</div>
                <div className="stat-content">
                    <span className="stat-value">{animatedStats.vouchers}+</span>
                    <span className="stat-label">Vouchers</span>
                </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
                <div className="stat-icon">🏪</div>
                <div className="stat-content">
                    <span className="stat-value">{animatedStats.platforms}</span>
                    <span className="stat-label">Platforms</span>
                </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                    <span className="stat-value">₹{animatedStats.savings.toLocaleString()}</span>
                    <span className="stat-label">Avg. Monthly Savings</span>
                </div>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
                <div className="stat-icon">⭐</div>
                <div className="stat-content">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">Free to Use</span>
                </div>
            </div>
        </div>
    );
};

StatsBar.propTypes = {
    vouchers: PropTypes.arrayOf(PropTypes.shape({
        platforms: PropTypes.arrayOf(PropTypes.shape({
            fee: PropTypes.string,
        })),
    })).isRequired,
    platforms: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StatsBar;
