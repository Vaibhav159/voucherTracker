import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown, Wallet, Heart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const { themeId, mode, toggleMode, setTheme, themes } = useTheme();
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Vouchers', path: '/vouchers' },
        { name: 'Cards', path: '/cards' },
        { name: 'Banking', path: '/banking' },
        { name: 'Perk AI', path: '/perk-ai' },
        { name: 'Guides', path: '/guides' },
        { name: 'Tools', path: '/tools' },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <header
            className="sticky top-0 z-50 glass"
            style={{
                backgroundColor: `color-mix(in srgb, var(--bg) 85%, transparent)`
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold"
                            style={{
                                backgroundColor: 'var(--accent)',
                                color: 'var(--bg)'
                            }}
                        >
                            C
                        </div>
                        <span
                            className="text-lg font-semibold tracking-tight"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Card<span style={{ color: 'var(--accent)' }}>Perks</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                style={{
                                    color: isActive(item.path) ? 'var(--accent)' : 'var(--text-secondary)',
                                    backgroundColor: isActive(item.path)
                                        ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                                        : 'transparent',
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-2">
                        {/* My Wallet */}
                        <Link
                            to="/my-cards"
                            className="hidden sm:flex p-2 rounded-lg transition-all items-center justify-center"
                            style={{
                                backgroundColor: isActive('/my-cards') ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'var(--surface)',
                                color: isActive('/my-cards') ? 'var(--accent)' : 'var(--text-secondary)',
                                border: `1px solid ${isActive('/my-cards') ? 'var(--accent)' : 'var(--border)'}`,
                            }}
                            title="My Wallet"
                        >
                            <Wallet size={18} />
                        </Link>

                        {/* Favorites */}
                        <Link
                            to="/favorites"
                            className="hidden sm:flex p-2 rounded-lg transition-all items-center justify-center relative"
                            style={{
                                backgroundColor: isActive('/favorites') ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'var(--surface)',
                                color: isActive('/favorites') ? 'var(--accent)' : 'var(--text-secondary)',
                                border: `1px solid ${isActive('/favorites') ? 'var(--accent)' : 'var(--border)'}`,
                            }}
                            title="Favorites"
                        >
                            <Heart size={18} />
                        </Link>

                        {/* Theme selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border)',
                                }}
                            >
                                <span className="capitalize hidden sm:inline">{themes[themeId]?.name}</span>
                                <ChevronDown size={14} />
                            </button>

                            {isThemeMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsThemeMenuOpen(false)}
                                    />
                                    <div
                                        className="absolute right-0 mt-2 w-48 py-2 rounded-lg shadow-lg z-20"
                                        style={{
                                            backgroundColor: 'var(--surface)',
                                            border: '1px solid var(--border)',
                                        }}
                                    >
                                        {Object.values(themes).map((theme) => (
                                            <button
                                                key={theme.id}
                                                onClick={() => {
                                                    setTheme(theme.id);
                                                    setIsThemeMenuOpen(false);
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm transition-all flex items-center gap-3"
                                                style={{
                                                    color: themeId === theme.id ? 'var(--accent)' : 'var(--text-secondary)',
                                                    backgroundColor: themeId === theme.id
                                                        ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                                                        : 'transparent',
                                                }}
                                            >
                                                <span
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: theme.dark.accent }}
                                                />
                                                {theme.name}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Light/Dark mode toggle */}
                        <button
                            onClick={toggleMode}
                            className="p-2 rounded-lg transition-all"
                            style={{
                                backgroundColor: 'var(--surface)',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border)',
                            }}
                            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* User Menu */}
                        <div className="relative group">
                            <button
                                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border transition-all"
                                style={{
                                    backgroundColor: 'var(--accent)',
                                    color: 'var(--bg)',
                                    borderColor: 'var(--accent)'
                                }}
                            >
                                RV
                            </button>

                            {/* Dropdown */}
                            <div className="absolute right-0 mt-2 w-56 py-2 rounded-xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)'
                                }}
                            >
                                <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Rahul Verma</p>
                                    <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>rahul.verma@example.com</p>
                                </div>

                                <div className="py-1">
                                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-[var(--bg)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                        My Profile
                                    </Link>
                                    <Link to="/my-cards" className="block px-4 py-2 text-sm hover:bg-[var(--bg)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                        My Wallet
                                    </Link>
                                    <Link to="/favorites" className="block px-4 py-2 text-sm hover:bg-[var(--bg)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                        Favorites
                                    </Link>
                                </div>

                                <div className="py-1 border-t" style={{ borderColor: 'var(--border)' }}>
                                    <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-[var(--bg)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                        Settings
                                    </Link>
                                    <Link to="/signup" className="block px-4 py-2 text-sm hover:bg-[var(--bg)] transition-colors text-red-500">
                                        Sign Out
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg transition-all"
                            style={{
                                backgroundColor: 'var(--surface)',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border)',
                            }}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <nav
                        className="md:hidden py-4 border-t"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-lg text-sm font-medium transition-all"
                                style={{
                                    color: isActive(item.path) ? 'var(--accent)' : 'var(--text-secondary)',
                                    backgroundColor: isActive(item.path)
                                        ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                                        : 'transparent',
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Divider */}
                        <div className="my-2 mx-4 h-px" style={{ backgroundColor: 'var(--border)' }} />

                        {/* Quick Access */}
                        <Link
                            to="/my-cards"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
                            style={{
                                color: isActive('/my-cards') ? 'var(--accent)' : 'var(--text-secondary)',
                                backgroundColor: isActive('/my-cards')
                                    ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                                    : 'transparent',
                            }}
                        >
                            <Wallet size={16} />
                            My Wallet
                        </Link>
                        <Link
                            to="/favorites"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
                            style={{
                                color: isActive('/favorites') ? 'var(--accent)' : 'var(--text-secondary)',
                                backgroundColor: isActive('/favorites')
                                    ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
                                    : 'transparent',
                            }}
                        >
                            <Heart size={16} />
                            Favorites
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
