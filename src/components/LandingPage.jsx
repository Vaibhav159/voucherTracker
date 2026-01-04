import { Link } from 'react-router-dom';
import PopularCards from './PopularCards';

/**
 * LandingPage - Premium Dark Luxe Design
 * Main landing page with hero, products grid, and featured sections
 */
const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Decorative gradient orbs */}
        <div className="hero-orb hero-orb-gold" />
        <div className="hero-orb hero-orb-emerald" />

        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-gold">India's Smartest</span>
              <br />
              <span className="hero-title-white">Savings Platform</span>
            </h1>
            <p className="hero-subtitle">
              Compare 500+ vouchers, 160+ credit cards, and maximize your savings with AI-powered recommendations.
            </p>
            <Link to="/vouchers" className="hero-cta">
              Find Best Deals
              <span style={{ fontSize: '20px' }}>→</span>
            </Link>
          </div>

          {/* Floating Cards Visual */}
          <div className="floating-cards">
            <div className="floating-card floating-card-1" />
            <div className="floating-card floating-card-2" />
            <div className="floating-card floating-card-3" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="section-header">
          <div className="section-line" />
          <h2 className="section-title">Our Products</h2>
          <div className="section-line" />
        </div>

        <div className="products-grid">
          {[
            { title: 'Voucher\nShop', desc: 'Compare deals across 6 platforms', gradient: 'emerald-teal', icon: '🎟️', link: '/' },
            { title: 'Card\nGenius', desc: 'Find cards tailored to your spending', gradient: 'blue-indigo', icon: '🧠', link: '/know-your-cards' },
            { title: 'Beat\nMy Card', desc: "You're not on the best card — let's fix that", gradient: 'purple-pink', icon: '⚔️', link: '/know-your-cards' },
            { title: 'Banking\nTiers', desc: 'Understand wealth banking programs', gradient: 'dark', icon: '🏦', link: '/banking-guides' },
          ].map((product, i) => (
            <Link to={product.link} key={i} className="product-card">
              <div className={`product-card-header gradient-${product.gradient}`}>
                <div className="product-arch" />
                <h3 className="product-title">{product.title}</h3>
                <div className="product-icon">{product.icon}</div>
              </div>
              <div className="product-card-body">
                <p>{product.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Cards Section */}
      <PopularCards />

      {/* Knowledge Vault */}
      <section className="knowledge-section">
        <div className="section-header">
          <div className="section-line" />
          <h2 className="section-title">Knowledge Vault</h2>
          <div className="section-line" />
        </div>

        <div className="knowledge-grid">
          {[
            { title: 'Best Cashback Credit Cards in India 2025', icon: '💳', link: '/guides' },
            { title: 'Expert Insights: Maximizing Credit Card Rewards', icon: '🧠', link: '/guides' },
            { title: 'Comparing the Best Travel Credit Cards', icon: '✈️', link: '/guides' },
            { title: 'Best Credit Cards for Online Shopping', icon: '🛒', link: '/guides' },
          ].map((article, i) => (
            <Link to={article.link} key={i} className="knowledge-card">
              <div className="knowledge-icon">{article.icon}</div>
              <div className="knowledge-content">
                <h4>{article.title}</h4>
                <span className="knowledge-link">Read Article →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .landing-page {
          background: var(--bg-color, #0a0a0a);
          min-height: 100vh;
        }

        /* Hero Section */
        .hero-section {
          min-height: 80vh;
          background: linear-gradient(135deg, #1a0f00 0%, #0a0a0a 50%, #001a1a 100%);
          display: flex;
          align-items: center;
          padding: 60px 48px;
          position: relative;
          overflow: hidden;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .hero-orb-gold {
          top: 10%;
          right: 15%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%);
        }

        .hero-orb-emerald {
          bottom: 20%;
          left: 10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 80px;
        }

        .hero-content {
          flex: 1;
        }

        .hero-title {
          font-size: 64px;
          font-weight: 400;
          font-family: var(--font-family-heading, Georgia, serif);
          line-height: 1.1;
          margin: 0 0 24px 0;
        }

        .hero-title-gold {
          color: var(--accent-gold-light, #e8c49a);
          font-style: italic;
        }

        .hero-title-white {
          color: var(--text-primary, #fff);
          font-style: normal;
        }

        .hero-subtitle {
          font-size: 18px;
          color: var(--text-secondary, #9ca3af);
          margin-bottom: 40px;
          max-width: 500px;
          line-height: 1.6;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 40px;
          background: var(--gradient-gold-button, linear-gradient(135deg, #d4a574 0%, #b8956a 100%));
          color: #000;
          border: none;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 8px 40px rgba(212, 165, 116, 0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 50px rgba(212, 165, 116, 0.4);
        }

        /* Floating Cards */
        .floating-cards {
          flex: 1;
          position: relative;
          height: 500px;
        }

        .floating-card {
          position: absolute;
          width: 280px;
          height: 180px;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          animation: float 3s ease-in-out infinite;
        }

        .floating-card-1 {
          left: 0;
          top: 50px;
          background: var(--gradient-blue-indigo, linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%));
          transform: rotate(-15deg);
          animation-delay: 0s;
        }

        .floating-card-2 {
          left: 80px;
          top: 0;
          background: var(--gradient-gold-copper, linear-gradient(135deg, #d4a574 0%, #8b6914 100%));
          transform: rotate(0deg);
          animation-delay: 0.1s;
        }

        .floating-card-3 {
          left: 160px;
          top: 50px;
          background: var(--gradient-emerald-teal, linear-gradient(135deg, #065f46 0%, #14b8a6 100%));
          transform: rotate(15deg);
          animation-delay: 0.2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .floating-card-1 { animation-name: float1; }
        .floating-card-2 { animation-name: float2; }
        .floating-card-3 { animation-name: float3; }

        @keyframes float1 {
          0%, 100% { transform: rotate(-15deg) translateY(0); }
          50% { transform: rotate(-15deg) translateY(-20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(0deg) translateY(-20px); }
        }
        @keyframes float3 {
          0%, 100% { transform: rotate(15deg) translateY(0); }
          50% { transform: rotate(15deg) translateY(-20px); }
        }

        /* Section Headers */
        .section-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 60px;
        }

        .section-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--text-dim, #6b7280));
        }

        .section-header .section-line:last-child {
          background: linear-gradient(90deg, var(--text-dim, #6b7280), transparent);
        }

        .section-title {
          font-size: 42px;
          font-weight: 400;
          color: var(--text-primary, #fff);
          font-family: var(--font-family-heading, Georgia, serif);
          margin: 0;
        }

        /* Products Section */
        .products-section {
          padding: 80px 48px;
          background: var(--bg-color, #0a0a0a);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background: var(--bg-card, #141414);
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid var(--border-color, #262626);
          text-decoration: none;
        }

        .product-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent-emerald, #10b981);
        }

        .product-card-header {
          height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 24px 24px 0 0;
        }

        .gradient-emerald-teal { background: var(--gradient-emerald-teal, linear-gradient(135deg, #065f46 0%, #14b8a6 100%)); }
        .gradient-blue-indigo { background: var(--gradient-blue-indigo, linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)); }
        .gradient-purple-pink { background: var(--gradient-purple-pink, linear-gradient(135deg, #581c87 0%, #a855f7 100%)); }
        .gradient-dark { background: linear-gradient(135deg, #1f2937 0%, #374151 100%); }

        .product-arch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 60px;
          border-radius: 0 0 60px 60px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top: none;
        }

        .product-title {
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          text-align: center;
          white-space: pre-line;
          font-family: var(--font-family-heading, Georgia, serif);
          margin: 20px 0 0 0;
        }

        .product-icon {
          font-size: 48px;
          margin-top: 16px;
        }

        .product-card-body {
          padding: 24px;
          text-align: center;
        }

        .product-card-body p {
          color: var(--text-secondary, #9ca3af);
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }

        /* Knowledge Section */
        .knowledge-section {
          padding: 80px 48px;
          background: var(--bg-color, #0a0a0a);
        }

        .knowledge-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .knowledge-card {
          display: flex;
          gap: 24px;
          align-items: center;
          cursor: pointer;
          text-decoration: none;
          padding: 20px;
          border-radius: 16px;
          transition: background 0.2s;
        }

        .knowledge-card:hover {
          background: var(--bg-card, #141414);
        }

        .knowledge-icon {
          width: 80px;
          height: 80px;
          background: var(--bg-card, #141414);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          flex-shrink: 0;
        }

        .knowledge-content h4 {
          font-size: 18px;
          font-weight: 500;
          color: var(--text-primary, #fff);
          margin: 0 0 8px 0;
        }

        .knowledge-link {
          color: var(--accent-gold, #d4a574);
          font-size: 14px;
          font-weight: 500;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-container {
            flex-direction: column;
            gap: 40px;
            text-align: center;
          }
          .hero-title {
            font-size: 48px;
          }
          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }
          .floating-cards {
            height: 300px;
          }
          .floating-card {
            width: 200px;
            height: 130px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 24px;
            min-height: auto;
          }
          .hero-title {
            font-size: 36px;
          }
          .products-section,
          .knowledge-section {
            padding: 60px 24px;
          }
          .section-title {
            font-size: 28px;
          }
          .products-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .product-card-header {
            height: 180px;
          }
          .product-title {
            font-size: 24px;
          }
          .knowledge-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .floating-cards {
            display: none;
          }
        }

        /* Light Mode */
        [data-theme='light'] .hero-section {
          background: linear-gradient(135deg, #fffbf5 0%, #f8fafc 50%, #f0fdfa 100%);
        }
        [data-theme='light'] .hero-orb-gold {
          background: radial-gradient(circle, rgba(212, 165, 116, 0.2) 0%, transparent 70%);
        }
        [data-theme='light'] .hero-orb-emerald {
          background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
