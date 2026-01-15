// import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: 'var(--bg)' }}
        >
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
