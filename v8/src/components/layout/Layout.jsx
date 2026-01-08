import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
    const location = useLocation();

    // Pages that need the default sidebar (home has sidebar, vouchers has its own)
    const pagesWithSidebar = ['/'];
    const showSidebar = pagesWithSidebar.includes(location.pathname);

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-texture">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                {showSidebar && <Sidebar />}
                <main className={`flex-1 overflow-y-auto bg-espresso-950 ${!showSidebar ? 'overflow-hidden' : ''}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
