import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ children, showSidebar = true }) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-texture">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar />}

        <main className="flex-1 overflow-y-auto bg-espresso-950">
          {children}
        </main>
      </div>
    </div>
  );
}
