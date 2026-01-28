
import { useMemo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ensureHttps } from '../utils/urlUtils';

/**
 * TopDeals (Daily Essentials) - Redesigned
 *
 * Cleaner card design with better hover states
 */

const DAILY_ESSENTIALS = [
  'amazon', 'flipkart', 'myntra', 'ajio', 'district', 'nykaa', 'tata cliq',
  'swiggy', 'zomato', 'bigbasket', 'blinkit', 'zepto', 'instamart', 'jiomart',
  'uber', 'ola', 'rapido', 'bookmyshow', 'pvr', 'inox'
];

const TopDeals = ({ vouchers, onVoucherClick }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const dailyDeals = useMemo(() => {
    const seenBrands = new Set();
    const essentials = vouchers
      .map(v => {
        const brandLower = v.brand.toLowerCase();
        if (brandLower.includes('e-gift') || brandLower.includes('money') || v.brand.length <= 2) {
          return null;
        }
        const matchedEssential = DAILY_ESSENTIALS.find(e =>
          brandLower.includes(e) || brandLower.startsWith(e)
        );
        if (!matchedEssential || seenBrands.has(matchedEssential)) return null;
        seenBrands.add(matchedEssential);
        const priority = DAILY_ESSENTIALS.indexOf(matchedEssential);
        const maxDiscount = Math.max(0, ...v.platforms.map(p => {
          const fee = p.fee || '';
          const match = fee.match(/(\d+(\.\d+)?)%/);
          if (match && (fee.toLowerCase().includes('discount') || fee.toLowerCase().includes('save') || fee.toLowerCase().includes('off'))) {
            return parseFloat(match[1]);
          }
          return 0;
        }));
        return { ...v, maxDiscount, priority, essentialBrand: matchedEssential };
      })
      .filter(v => v !== null)
      .sort((a, b) => a.priority - b.priority);
    // REMOVED .slice(0, 8) to show all

    return essentials;
  }, [vouchers]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5); // 5px tolerance
    }
  };

  useEffect(() => {
    checkScroll();
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScroll);
    }
    window.addEventListener('resize', checkScroll);
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [dailyDeals]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of view
      const targetScroll = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (dailyDeals.length === 0) return null;

  return (
    <section className="daily-essentials-v2">
      <div className="section-header">
        <div className="header-content">
          <span className="header-icon">⚡</span>
          <div>
            <h2>Daily Essentials</h2>
            <p>Premium deals on your favorite brands</p>
          </div>
        </div>
      </div>

      <div className="essentials-scroll-container">
        {/* Left Scroll Gradient & Button */}
        <div className={`scroll-control-left ${canScrollLeft ? 'visible' : ''}`}>
          <div className="scroll-gradient-mask left"></div>
          <button
            className="scroll-btn scroll-left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>

        <div
          className="essentials-grid"
          ref={scrollRef}
          onScroll={checkScroll}
        >
          {dailyDeals.map((voucher) => (
            <button
              key={voucher.id}
              className="essential-card-v2"
              onClick={() => onVoucherClick(voucher)}
              title={voucher.brand}
              data-brand={voucher.brand.toLowerCase()}
            >
              <div className="card-logo">
                {voucher.logo ? (
                  <img
                    src={ensureHttps(voucher.logo)}
                    alt={voucher.brand}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span
                  className="brand-fallback"
                  style={{ display: voucher.logo ? 'none' : 'flex' }}
                >
                  {voucher.brand.charAt(0).toUpperCase()}
                </span>
              </div>
              {voucher.maxDiscount > 0 && (
                <div className="essential-discount-chip">
                  {voucher.maxDiscount}% OFF
                </div>
              )}
            </button>
          ))}
          {/* Spacer to ensure last item is easily visible/snappable */}
          <div style={{ minWidth: '1px', flexShrink: 0 }}></div>
        </div>

        {/* Right Scroll Gradient & Button */}
        <div className={`scroll-control-right ${canScrollRight ? 'visible' : ''}`}>
          <div className="scroll-gradient-mask right"></div>
          <button
            className="scroll-btn scroll-right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .daily-essentials-v2 {
          margin-bottom: 2.5rem;
          position: relative;
        }

        .section-header {
          margin-bottom: 1.25rem;
          padding: 0 4px;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .header-icon {
          font-size: 1.5rem;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.4));
        }

        .section-header h2 {
          margin: 0;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .section-header p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
          opacity: 0.8;
        }

        .essentials-scroll-container {
          position: relative;
          margin: 0 -1.5rem;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
        }

        /* Control Containers with Masks */
        .scroll-control-left, .scroll-control-right {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 5;
          pointer-events: none; /* Let clicks pass unless on button */
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .scroll-control-left.visible, .scroll-control-right.visible {
          opacity: 1;
        }

        .scroll-control-left {
          left: 0;
          width: 80px;
        }

        .scroll-control-right {
          right: 0;
          width: 80px;
        }

        .scroll-gradient-mask {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
        }

        .scroll-gradient-mask.left {
          left: 0;
          background: linear-gradient(to right, var(--bg-color, #0f172a) 20%, transparent 100%);
        }

        .scroll-gradient-mask.right {
          right: 0;
          background: linear-gradient(to left, var(--bg-color, #0f172a) 20%, transparent 100%);
        }

        .essentials-grid {
          display: flex;
          overflow-x: auto;
          gap: 1rem;
          padding: 0.5rem 0.5rem 1.5rem 0.5rem;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          flex: 1;

          /* SCROLL SNAP LOGIC */
          scroll-snap-type: x mandatory;
          scroll-padding: 0 1rem;
        }

        .essentials-grid::-webkit-scrollbar {
          display: none;
        }

        /* Scroll Buttons */
        .scroll-btn {
          position: absolute;
          top: 45%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto; /* Enable clicks */
          z-index: 20;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }

        .scroll-btn:hover {
          background: #fff;
          color: #0f172a;
          transform: translateY(-50%) scale(1.1);
          border-color: #fff;
        }

        .scroll-btn:active {
          transform: translateY(-50%) scale(0.95);
        }

        .scroll-left {
          left: 1.5rem; /* Inside padding */
        }

        .scroll-right {
          right: 1.5rem; /* Inside padding */
        }

        .essential-card-v2 {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          min-width: 92px;
          width: 92px;
          height: 92px;
          flex-shrink: 0;
          box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.3);
          overflow: visible;

          /* Snap Alignment */
          scroll-snap-align: start;
        }

        .essential-card-v2:hover {
          transform: translateY(-4px) scale(1.02);
          background: rgba(51, 65, 85, 0.5);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.5),
                      0 0 15px rgba(255, 255, 255, 0.05);
          z-index: 10;
        }

        .essential-card-v2:active {
          transform: translateY(-1px) scale(0.96);
        }

        .essential-discount-chip {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          height: 20px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ef4444, #b91c1c);
          border-radius: 10px;
          font-size: 0.65rem;
          font-weight: 800;
          color: white;
          white-space: nowrap;
          z-index: 2;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
          letter-spacing: 0.02em;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .card-logo {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          transition: transform 0.3s ease;
        }

        .essential-card-v2:hover .card-logo {
          transform: scale(1.1);
        }

        .card-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .brand-fallback {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent-violet, #8b5cf6), var(--accent-cyan, #06b6d4));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 640px) {
          .daily-essentials-v2 {
            margin-bottom: 2rem;
          }
          .section-header h2 {
            font-size: 1.2rem;
          }
          .essentials-grid {
             gap: 0.85rem;
          }
          .essential-card-v2 {
             min-width: 78px;
             width: 78px;
             height: 78px;
             border-radius: 18px;
          }
          .card-logo {
            padding: 14px;
          }
          .essential-discount-chip {
            padding: 0 8px;
            font-size: 0.6rem;
          }
          /* Always show scroll buttons on mobile or hide? Usually hiding is better as touch works.
             Let's keep them hidden on touch devices if possible, or small.
             Actually, touch scrolling is better essentially. */
          .scroll-btn {
             display: none;
          }
        }
      `}</style>
    </section>);
};

TopDeals.propTypes = {
  vouchers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    logo: PropTypes.string,
    category: PropTypes.string,
    platforms: PropTypes.arrayOf(PropTypes.shape({ fee: PropTypes.string })),
  })).isRequired,
  onVoucherClick: PropTypes.func.isRequired,
};

export default TopDeals;
