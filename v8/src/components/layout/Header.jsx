import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Sample search data - in a real app, this would come from an API or context
const searchData = [
    { type: 'card', name: 'HDFC Infinia', path: '/cards', icon: 'credit_card' },
    { type: 'card', name: 'Axis Magnus', path: '/cards', icon: 'credit_card' },
    { type: 'card', name: 'Amex Platinum', path: '/cards', icon: 'credit_card' },
    { type: 'card', name: 'ICICI Sapphiro', path: '/cards', icon: 'credit_card' },
    { type: 'voucher', name: 'Amazon Pay', path: '/vouchers', icon: 'sell' },
    { type: 'voucher', name: 'Swiggy Money', path: '/vouchers', icon: 'sell' },
    { type: 'voucher', name: 'Flipkart', path: '/vouchers', icon: 'sell' },
    { type: 'tool', name: 'Effective Price Calculator', path: '/tools/effective-price', icon: 'calculate' },
    { type: 'tool', name: 'MCC Finder', path: '/tools/mcc', icon: 'qr_code_scanner' },
    { type: 'tool', name: 'Lounge Access', path: '/tools/lounge', icon: 'airline_seat_recline_extra' },
    { type: 'tool', name: 'Milestone Tracker', path: '/tools/milestones', icon: 'flag' },
    { type: 'tool', name: 'Perk AI', path: '/tools/perk-ai', icon: 'auto_awesome' },
    { type: 'page', name: 'Guides', path: '/guides', icon: 'menu_book' },
    { type: 'page', name: 'Banking', path: '/banking', icon: 'account_balance' },
];

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef(null);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    // Filter results based on query
    const filteredResults = searchQuery.length > 0
        ? searchData.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 6)
        : [];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!showDropdown || filteredResults.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            navigate(filteredResults[selectedIndex].path);
            setSearchQuery('');
            setShowDropdown(false);
        } else if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };

    const handleResultClick = (path) => {
        navigate(path);
        setSearchQuery('');
        setShowDropdown(false);
    };

    return (
        <header className="z-20 flex h-16 shrink-0 items-center gap-4 border-b border-espresso-700 bg-espresso-900/90 px-4 shadow-lg backdrop-blur-md lg:gap-8 lg:px-6">
            <Link to="/" className="flex items-center gap-2">
                <img src="/assets/logo.jpg" alt="CardPerks Logo" className="h-10 w-auto rounded object-contain" />
                <h1 className="font-serif text-xl font-bold tracking-wide text-white">
                    Card<span className="text-gold-400">Perks</span>
                </h1>
            </Link>

            {/* Search with Dropdown */}
            <div className="relative hidden max-w-sm flex-1 md:block" ref={searchRef}>
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-espresso-700 text-[20px] dark:text-gray-500">search</span>
                <input
                    className="h-10 w-full rounded-full border border-espresso-700 bg-espresso-800 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition-all focus:border-gold-400 focus:bg-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold-400"
                    placeholder="Search cards, tools, vouchers..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowDropdown(e.target.value.length > 0);
                        setSelectedIndex(-1);
                    }}
                    onFocus={() => setShowDropdown(searchQuery.length > 0)}
                    onKeyDown={handleKeyDown}
                />

                {/* Search Dropdown */}
                {showDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-espresso-700 bg-espresso-800 shadow-2xl overflow-hidden z-50">
                        {filteredResults.length > 0 ? (
                            <div className="divide-y divide-espresso-700">
                                {filteredResults.map((result, index) => (
                                    <button
                                        key={`${result.type}-${result.name}`}
                                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${index === selectedIndex
                                            ? 'bg-gold-400/10 text-gold-400'
                                            : 'text-white hover:bg-white/5'
                                            }`}
                                        onClick={() => handleResultClick(result.path)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-gold-dim">{result.icon}</span>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{result.name}</p>
                                            <p className="text-xs text-gold-dim capitalize">{result.type}</p>
                                        </div>
                                        <span className="material-symbols-outlined text-[16px] text-gold-dim/50">arrow_forward</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="px-4 py-6 text-center">
                                <span className="material-symbols-outlined text-3xl text-espresso-700 mb-2">search_off</span>
                                <p className="text-sm text-gold-dim">No results found for "{searchQuery}"</p>
                            </div>
                        )}

                        {/* Quick Links */}
                        <div className="border-t border-espresso-700 px-4 py-3 bg-espresso-900/50">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gold-dim/60 mb-2">Quick Links</p>
                            <div className="flex gap-2">
                                <Link
                                    to="/tools/perk-ai"
                                    className="flex items-center gap-1 rounded-lg bg-gold-400/10 px-2 py-1 text-xs font-medium text-gold-400"
                                    onClick={() => { setSearchQuery(''); setShowDropdown(false); }}
                                >
                                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                                    Perk AI
                                </Link>
                                <Link
                                    to="/vouchers"
                                    className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-xs font-medium text-gold-dim"
                                    onClick={() => { setSearchQuery(''); setShowDropdown(false); }}
                                >
                                    <span className="material-symbols-outlined text-[14px]">sell</span>
                                    Vouchers
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <nav className="ml-auto hidden items-center gap-1 lg:flex">
                <Link
                    to="/"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive('/') && location.pathname === '/'
                        ? 'nav-link-active'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
                        }`}
                >
                    <span className="material-symbols-outlined filled text-[18px]">home</span>
                    Home
                </Link>
                <Link
                    to="/vouchers"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive('/vouchers')
                        ? 'nav-link-active'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
                        }`}
                >
                    <span className="material-symbols-outlined text-[18px]">sell</span>
                    Vouchers
                </Link>
                <Link
                    to="/cards"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive('/cards')
                        ? 'nav-link-active'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
                        }`}
                >
                    <span className="material-symbols-outlined text-[18px]">credit_card</span>
                    Cards
                </Link>
                <Link
                    to="/banking"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive('/banking')
                        ? 'nav-link-active'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
                        }`}
                >
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                    Banking
                </Link>
                <Link
                    to="/tools/perk-ai"
                    className="group flex items-center gap-2 rounded-lg border border-gold-400/20 bg-gold-400/5 px-3 py-2 text-sm font-medium text-gold-300 transition-all hover:border-gold-400/50 hover:bg-gold-400/10 hover:text-gold-400"
                >
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    Perk AI
                </Link>
                <Link
                    to="/guides"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive('/guides')
                        ? 'nav-link-active'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gold-300'
                        }`}
                >
                    <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    Guides
                </Link>
            </nav>

            <button className="ml-auto flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-espresso-800 lg:hidden">
                <span className="material-symbols-outlined">menu</span>
            </button>

            <Link to="/settings" className="hidden h-9 w-9 items-center justify-center rounded-full border border-gold-400/30 bg-espresso-800 ring-2 ring-transparent transition-all hover:ring-gold-400/50 lg:flex">
                <span className="font-serif text-sm font-bold text-gold-400">JD</span>
            </Link>
        </header>
    );
}
