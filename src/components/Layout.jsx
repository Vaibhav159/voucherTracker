import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">

      <header className="app-header">
        <div className="container">
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="./logo.svg" alt="Logo" style={{ height: '32px', width: '32px' }} />
            <h1 className="text-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>VoucherTracker</h1>
          </Link>

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

export default Layout;
