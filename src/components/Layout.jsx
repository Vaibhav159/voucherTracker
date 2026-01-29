import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ThemeToggle from './ThemeToggle';
import { featureFlags } from '../config/featureFlags';
import GlobalSearch from './GlobalSearch';
import ShortcutsModal from './ShortcutsModal';
import { useFavorites } from '../context/FavoritesContext';
import OnboardingTour, { useShouldShowTour } from './OnboardingTour';

const Layout = ({ children, selectedCardsCount = 0, isShortcutsOpen, setIsShortcutsOpen }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const { totalFavorites } = useFavorites();
  const [showTour, setShowTourComplete] = useShouldShowTour();

  const isActive = (path) => location.pathname === path;
  const isActiveGroup = (paths) => paths.some(p => location.pathname === p);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation structure - cleaner groupings
  const cardsLinks = [
    { path: '/know-your-cards', label: 'Browse Cards', icon: '🎴' },
    { path: '/compare-cards', label: 'Compare Cards', icon: '⚖️', badge: selectedCardsCount },
  ];

  const toolsLinks = [
    featureFlags.rewardsCalculator && { path: '/rewards-calculator', label: 'Rewards Calculator', icon: '🧮' },
    featureFlags.pointsConverter && { path: '/points-converter', label: 'Points Value', icon: '💎' },
    // Hidden for now - will implement later:
    // { path: '/spend-optimizer', label: 'Spend Optimizer', icon: '📊' },
    // { path: '/milestones', label: 'Milestones', icon: '🎯' },
    // { path: '/savings', label: 'Savings Dashboard', icon: '💰' },
  ].filter(Boolean);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };


  // Dropdown Component
  const NavDropdown = ({ name, label, icon, links, isActiveCheck }) => {
    const isOpen = activeDropdown === name;
    const hasActivePath = isActiveCheck ? isActiveCheck() : links.some(l => isActive(l.path));

    return (
      <div className="nav-dropdown-wrapper" ref={name === activeDropdown ? dropdownRef : null}>
        <button
          className={`nav-link nav-dropdown-trigger ${hasActivePath ? 'active' : ''}`}
          onClick={() => toggleDropdown(name)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {icon && <span className="nav-icon">{icon}</span>}
          <span>{label}</span>
          <svg
            className={`dropdown-chevron ${isOpen ? 'open' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {isOpen && (
          <div className="nav-dropdown-menu">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`dropdown-item ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setActiveDropdown(null)}
              >
                <span className="dropdown-item-icon">{link.icon}</span>
                <span className="dropdown-item-label">{link.label}</span>
                {link.badge > 0 && (
                  <span className="dropdown-item-badge">{link.badge}</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-layout">
      <GlobalSearch />
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      {showTour && <OnboardingTour onComplete={setShowTourComplete} />}

      <header className="app-header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img src="./logo.svg" alt="" className="logo-icon" />
            <span className="logo-text">
              <span className="logo-primary">Card</span>
              <span className="logo-secondary">Perks</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop" data-tour="navigation">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <span className="nav-icon">🏷️</span>
              <span>Vouchers</span>
            </Link>

            <Link
              to="/guides"
              className={`nav-link ${isActive('/guides') ? 'active' : ''}`}
            >
              <span className="nav-icon">📚</span>
              <span>Guides</span>
            </Link>

            <NavDropdown
              name="cards"
              label="Cards"
              icon="💳"
              links={cardsLinks}
              isActiveCheck={() => isActiveGroup(['/know-your-cards', '/compare-cards'])}
            />

            <Link
              to="/browse-banking"
              className={`nav-link ${isActiveGroup(['/browse-banking', '/compare-banking']) ? 'active' : ''}`}
            >
              <span className="nav-icon">🏦</span>
              <span>Banking</span>
            </Link>

            {featureFlags.askAI && (
              <Link
                to="/ask-ai"
                className={`nav-link nav-link-highlight ${isActive('/ask-ai') ? 'active' : ''}`}
              >
                <span className="nav-icon">✨</span>
                <span>Ask AI</span>
              </Link>
            )}


            <NavDropdown
              name="tools"
              label="Tools"
              icon="🛠️"
              links={toolsLinks}
            />
          </nav>

          {/* Right Side Actions */}
          <div className="header-actions">
            <Link
              to="/my-cards"
              className={`action-btn ${isActive('/my-cards') ? 'active' : ''}`}
              aria-label="My Wallet"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12V8H6a2 2 0 0 1-2-2 2 2 0 0 1 2-2h12" />
                <path d="M4 6v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H4.5" />
                <path d="M18 12v2" />
              </svg>
            </Link>

            <Link
              to="/favorites"
              className={`action-btn favorites-btn ${isActive('/favorites') ? 'active' : ''}`}
              aria-label={`Favorites${totalFavorites > 0 ? ` (${totalFavorites})` : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={totalFavorites > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {totalFavorites > 0 && (
                <span className="action-badge">{totalFavorites}</span>
              )}
            </Link>

            <a
              href="https://twitter.com/vaibhav_lodha"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn twitter-btn"
              aria-label="Follow on X"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <div className="theme-toggle-wrapper">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">Menu</span>
          <button
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mobile-nav-content">
          <div className="mobile-nav-section">
            <span className="mobile-section-label">Main</span>
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}>
              <span className="mobile-nav-icon">🏷️</span>
              <span>Vouchers</span>
            </Link>
            <Link to="/guides" className={`mobile-nav-link ${isActive('/guides') ? 'active' : ''}`}>
              <span className="mobile-nav-icon">📚</span>
              <span>Guides</span>
            </Link>
            <Link to="/browse-banking" className={`mobile-nav-link ${isActiveGroup(['/browse-banking', '/compare-banking']) ? 'active' : ''}`}>
              <span className="mobile-nav-icon">🏦</span>
              <span>Banking</span>
            </Link>
            {featureFlags.askAI && (
              <Link to="/ask-ai" className={`mobile-nav-link highlight ${isActive('/ask-ai') ? 'active' : ''}`}>
                <span className="mobile-nav-icon">✨</span>
                <span>Ask AI</span>
              </Link>
            )}
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-section-label">Cards</span>
            {cardsLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                <span className="mobile-nav-icon">{link.icon}</span>
                <span>{link.label}</span>
                {link.badge > 0 && <span className="mobile-badge">{link.badge}</span>}
              </Link>
            ))}
          </div>



          <div className="mobile-nav-section">
            <span className="mobile-section-label">Tools</span>
            {toolsLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                <span className="mobile-nav-icon">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>


          <div className="mobile-nav-section">
            <span className="mobile-section-label">More</span>
            <Link to="/my-cards" className={`mobile-nav-link ${isActive('/my-cards') ? 'active' : ''}`}>
              <span className="mobile-nav-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12V8H6a2 2 0 0 1-2-2 2 2 0 0 1 2-2h12" />
                  <path d="M4 6v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H4.5" />
                  <path d="M18 12v2" />
                </svg>
              </span>
              <span>My Wallet</span>
            </Link>
            <Link to="/favorites" className={`mobile-nav-link ${isActive('/favorites') ? 'active' : ''}`}>
              <span className="mobile-nav-icon">❤️</span>
              <span>Favorites</span>
              {totalFavorites > 0 && <span className="mobile-badge">{totalFavorites}</span>}
            </Link>
            <a
              href="https://twitter.com/vaibhav_lodha"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-link"
            >
              <span className="mobile-nav-icon">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </span>
              <span>Follow on X</span>
            </a>
          </div>
        </div>
      </nav>

      <main className={`${isActive('/') ? 'main-content header-offset' : 'container main-content'}`}>
        {children}
      </main>

      {!isActive('/') && (
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Card Perks.</p>
          <p className="footer-credit">
            Created by <a href="https://twitter.com/vaibhav_lodha" target="_blank" rel="noopener noreferrer">@vaibhav_lodha</a>
          </p>
        </footer>
      )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  selectedCardsCount: PropTypes.number,
  isShortcutsOpen: PropTypes.bool,
  setIsShortcutsOpen: PropTypes.func,
};

export default Layout;
