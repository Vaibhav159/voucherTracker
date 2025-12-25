import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">
      <header style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="./logo.svg" alt="Logo" style={{ height: '32px', width: '32px' }} />
            <h1 className="text-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>VoucherTracker</h1>
          </Link>

          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link
              to="/"
              style={{
                color: isActive('/') ? '#fff' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: isActive('/') ? 600 : 400,
                transition: 'color 0.2s'
              }}
            >
              Vouchers
            </Link>
            <Link
              to="/guides"
              style={{
                color: isActive('/guides') ? '#fff' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: isActive('/guides') ? 600 : 400,
                transition: 'color 0.2s'
              }}
            >
              Guides
            </Link>
            <a
              href="https://twitter.com/vaibhav_lodha"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              <span>Follow</span>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/Vaibhav159/voucherTracker/edit/main/src/data/guides.json" // Pointed to guides for contribution
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '8px 16px' }}
            >
              Submit a Guide
            </a>
          </nav>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 0', minHeight: '80vh' }}>
        {children}
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <p>© {new Date().getFullYear()} Voucher Tracker. Open Source Community Project.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Created by <a href="https://twitter.com/vaibhav_lodha" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>@vaibhav_lodha</a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
