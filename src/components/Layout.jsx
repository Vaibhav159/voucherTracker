import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">
      <header style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
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
      </footer>
    </div>
  );
};

export default Layout;
