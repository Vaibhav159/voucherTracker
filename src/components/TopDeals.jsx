import { useMemo } from 'react';
import PropTypes from 'prop-types';

// Daily essentials - brands people use regularly (one entry per brand)
const DAILY_ESSENTIALS = [
    'amazon', 'flipkart', 'myntra', 'ajio', 'district', 'nykaa', 'tata cliq',
    'swiggy', 'zomato',
    'bigbasket', 'blinkit', 'zepto', 'instamart', 'jiomart',
    'uber', 'ola', 'rapido',
    'bookmyshow', 'pvr', 'inox'
];

const TopDeals = ({ vouchers, onVoucherClick }) => {
    // Get daily essential deals - ONE per brand
    const dailyDeals = useMemo(() => {
        const seenBrands = new Set(); // Track which brands we've already added

        const essentials = vouchers
            .map(v => {
                const brandLower = v.brand.toLowerCase();

                // Exclude e-gift cards, money vouchers, and very short names
                // But allow regular gift cards for essential brands
                if (brandLower.includes('e-gift') ||
                    brandLower.includes('money') ||
                    v.brand.length <= 2) {
                    return null;
                }

                // Check if this is a daily essential brand
                const matchedEssential = DAILY_ESSENTIALS.find(e =>
                    brandLower.includes(e) || brandLower.startsWith(e)
                );

                if (!matchedEssential) return null;

                // Only allow first voucher per essential brand (deduplication)
                if (seenBrands.has(matchedEssential)) return null;
                seenBrands.add(matchedEssential);

                // Get priority based on order in DAILY_ESSENTIALS
                const priority = DAILY_ESSENTIALS.indexOf(matchedEssential);

                // Get max discount
                const maxDiscount = Math.max(0, ...v.platforms.map(p => {
                    const fee = p.fee || '';
                    const match = fee.match(/(\d+(\.\d+)?)%/);
                    if (match && (fee.toLowerCase().includes('discount') || fee.toLowerCase().includes('save') || fee.toLowerCase().includes('off'))) {
                        return parseFloat(match[1]);
                    }
                    return 0;
                }));

                return {
                    ...v,
                    maxDiscount,
                    priority,
                    essentialBrand: matchedEssential // The matched essential brand name
                };
            })
            .filter(v => v !== null)
            .sort((a, b) => a.priority - b.priority)
            .slice(0, 8);

        return essentials;
    }, [vouchers]);

    if (dailyDeals.length === 0) return null;

    return (
        <section className="daily-essentials">
            <div className="daily-essentials-header">
                <h2>
                    <span className="icon">⚡</span>
                    Daily Essentials
                </h2>
                <span className="subtitle">Deals you use everyday</span>
            </div>

            <div className="daily-essentials-grid">
                {dailyDeals.map((voucher) => (
                    <div
                        key={voucher.id}
                        className="essential-card"
                        onClick={() => onVoucherClick(voucher)}
                    >
                        {/* Discount Badge */}
                        {voucher.maxDiscount > 0 && (
                            <div className="essential-badge">
                                {voucher.maxDiscount}% OFF
                            </div>
                        )}

                        {/* Brand Logo - use voucher logo */}
                        <div className="essential-logo">
                            {voucher.logo ? (
                                <img
                                    src={voucher.logo}
                                    alt={voucher.brand}
                                    onError={(e) => {
                                        // Show first letter as fallback
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <span
                                className="brand-letter"
                                style={{ display: voucher.logo ? 'none' : 'flex' }}
                            >
                                {voucher.brand.charAt(0).toUpperCase()}
                            </span>
                        </div>

                        {/* Brand Name - show the essential brand, capitalized */}
                        <div className="essential-name">
                            {voucher.essentialBrand.charAt(0).toUpperCase() + voucher.essentialBrand.slice(1)}
                        </div>

                        {/* Category */}
                        <div className="essential-category">{voucher.category}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

TopDeals.propTypes = {
    vouchers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        logo: PropTypes.string,
        category: PropTypes.string,
        platforms: PropTypes.arrayOf(PropTypes.shape({
            fee: PropTypes.string,
        })),
    })).isRequired,
    onVoucherClick: PropTypes.func.isRequired,
};

export default TopDeals;
