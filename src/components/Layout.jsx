import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ThemeToggle from './ThemeToggle';
import { featureFlags } from '../config/featureFlags';
import GlobalSearch from './GlobalSearch';
import ShortcutsModal from './ShortcutsModal';
import { useFavorites } from '../context/FavoritesContext';

const Layout = ({ children, selectedCardsCount = 0, isShortcutsOpen, setIsShortcutsOpen }) => {
  const location = useLocation();
  const [showOthersMenu, setShowOthersMenu] = useState(false);
  const { totalFavorites } = useFavorites();
  const isActive = (path) => location.pathname === path;
  // Local state removed, using props from App

  // Only show tools that are enabled
  const othersLinks = [
    featureFlags.rewardsCalculator && { path: '/rewards-calculator', label: '🧮 Calculator' },
    featureFlags.pointsConverter && { path: '/points-converter', label: '💎 Points Value' },
    featureFlags.bankingGuides && { path: '/banking-guides', label: '🏦 Banking' },
  ].filter(Boolean);

  const isOthersActive = othersLinks.some(link => location.pathname === link.path);

  return (
    <div className="app-layout">
      <GlobalSearch />
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />

      <header className="app-header">
        <div className="container">
          <div className="header-branding">
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="./logo.svg" alt="Voucher Tracker Logo" style={{ height: '32px', width: '32px' }} />
              <h1 className="text-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>VoucherTracker</h1>
            </Link>
            <div className="mobile-theme-toggle">
              <ThemeToggle />
            </div>
          </div>

          <nav className="nav-container">
            <div className="nav-links">
              <Link
                to="/"
                className={`nav-item ${isActive('/') ? 'active' : ''}`}
              >
                Vouchers
              </Link>
              <Link
                to="/guides"
                className={`nav-item ${isActive('/guides') ? 'active' : ''}`}
              >
                Guides
              </Link>
              <Link
                to="/know-your-cards"
                className={`nav-item ${isActive('/know-your-cards') ? 'active' : ''}`}
              >
                Cards
              </Link>
              <Link
                to="/compare-cards"
                className={`nav-item ${isActive('/compare-cards') ? 'active' : ''}`}
                style={{ position: 'relative' }}
              >
                Compare
                {selectedCardsCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    background: 'var(--accent-pink)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {selectedCardsCount}
                  </span>
                )}
              </Link>
              {featureFlags.askAI && (
                <Link
                  to="/ask-ai"
                  className={`nav-item ${isActive('/ask-ai') ? 'active' : ''}`}
                >
                  Ask AI 🧞‍♂️
                </Link>
              )}
              <Link
                to="/favorites"
                className={`nav-item ${isActive('/favorites') ? 'active' : ''}`}
                style={{ position: 'relative' }}
              >
                ❤️
                {totalFavorites > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    background: 'var(--accent-pink)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {totalFavorites}
                  </span>
                )}
              </Link>

              {/* Others Dropdown - only show if at least one tool is enabled */}
              {othersLinks.length > 0 && (
                <div
                  className="nav-dropdown"
                  onMouseEnter={() => setShowOthersMenu(true)}
                  onMouseLeave={() => setShowOthersMenu(false)}
                  style={{ position: 'relative' }}
                >
                  <span
                    className={`nav-item ${isOthersActive ? 'active' : ''}`}
                    style={{ cursor: 'pointer' }}
                  >
                    Tools ▾
                  </span>
                  {showOthersMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      background: 'var(--glass-background)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '12px',
                      padding: '8px 0',
                      minWidth: '160px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                      zIndex: 1000
                    }}>
                      {othersLinks.map(link => (
                        <Link
                          key={link.path}
                          to={link.path}
                          style={{
                            display: 'block',
                            padding: '10px 16px',
                            color: isActive(link.path) ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseOut={(e) => e.target.style.background = 'transparent'}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <a
                href="https://twitter.com/vaibhav_lodha"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item"
              >
                <span>Follow</span>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <div className="desktop-theme-toggle">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      </header >

      <main className="container main-content">
        {children}
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <p>© {new Date().getFullYear()} Voucher Tracker. Open Source Community Project.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Created by <a href="https://twitter.com/vaibhav_lodha" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>@vaibhav_lodha</a>
        </p>
      </footer>
    </div >
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  selectedCardsCount: PropTypes.number,
  isShortcutsOpen: PropTypes.bool,
  setIsShortcutsOpen: PropTypes.func,
};

export default Layout;

