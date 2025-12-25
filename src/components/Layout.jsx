import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <header style={{ padding: '2rem 0', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="text-gradient" style={{ margin: 0, fontSize: '2rem' }}>VoucherTracker</h1>
            <p style={{ margin: '5px 0 0', color: 'var(--text-secondary)' }}>Find the best deals & buying caps</p>
          </div>
          <a
            href="https://github.com/Vaibhav159/voucherTracker/edit/main/src/data/vouchers.js"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '0.9rem' }}
          >
            Suggest Data Change
          </a>
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
