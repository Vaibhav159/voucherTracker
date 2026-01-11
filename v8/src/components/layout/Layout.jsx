import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
    const location = useLocation();

    // Pages that have their own sidebar or don't need the global sidebar
    const pagesWithoutSidebar = ['/vouchers', '/cards', '/banking', '/guides', '/settings', '/tools/perk-ai'];
    const showSidebar = !pagesWithoutSidebar.some(p => location.pathname === p || location.pathname.startsWith(p + '/'));

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
