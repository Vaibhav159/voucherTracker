import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { useDebounce } from './hooks/useDebounce';
import { useFuzzySearch } from './hooks/useFuzzySearch';
import { useDiscountParser } from './hooks/useDiscountParser';
import { useVouchers } from './hooks/useVouchers';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import VoucherGrid from './components/VoucherGrid';
import VoucherModal from './components/VoucherModal';
import PlatformFilter from './components/PlatformFilter';
import MobileStickyFilterBar from './components/MobileStickyFilterBar';
import TopDeals from './components/TopDeals';
import StatsBar from './components/StatsBar';
import LoadingSpinner from './components/LoadingSpinner';
import { featureFlags } from './config/featureFlags';

// Lazy load route components for code splitting
const VoucherDetail = lazy(() => import('./components/VoucherDetail'));
const Guides = lazy(() => import('./components/Guides'));
const CreditCardComparison = lazy(() => import('./components/CreditCardComparison'));
const CardGuide = lazy(() => import('./components/CardGuide'));
const RewardsCalculator = lazy(() => import('./components/RewardsCalculator'));
const PointsConverter = lazy(() => import('./components/PointsConverter'));
const BankingGuides = lazy(() => import('./components/BankingGuides'));
const AskAI = lazy(() => import('./components/AskAI'));
const Favorites = lazy(() => import('./components/Favorites'));
const LoadingScreen = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: '1rem' }}>
    <LoadingSpinner size="lg" />
    <span style={{ color: 'var(--text-secondary)' }}>Loading Vouchers...</span>
  </div>
);

function Home({ data, onOpenShortcuts }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Use data from props instead of static RAW_DATA or INITIAL_DATA
  const ALL_PLATFORMS = useMemo(() => [...new Set(data.flatMap(v => v.platforms.map(p => p.name)))], [data]);
  const ALL_CATEGORIES = useMemo(() => [...new Set(data.map(v => v.category))].sort(), [data]);

  // State variables for filters, initialized from URL search params
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || null);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);
  const [selectedVoucher, setSelectedVoucher] = useState(null); // Local state fallback, but we primarily use URL now
  const [activeMobileFilter, setActiveMobileFilter] = useState('none'); // 'none', 'platform', 'category'

  const [sortOption, setSortOption] = useState('Recommended');

  // Local state for input value with custom debounce hook
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedSearchValue = useDebounce(inputValue, 300);

  // Helper to update URL params and local state
  const updateParams = (key, value, setStateFn) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    }, { replace: true });
    if (setStateFn) setStateFn(value);
  };

  // Update searchTerm when debounced value changes
  useEffect(() => {
    if (debouncedSearchValue !== searchTerm) {
      updateParams('search', debouncedSearchValue, setSearchTerm);
    }
  }, [debouncedSearchValue]);

  const handleSearchChange = (val) => setInputValue(val);
  const handlePlatformSelect = (p) => updateParams('platform', p, setSelectedPlatform);
  const handleCategorySelect = (c) => updateParams('category', c, setSelectedCategory);

  // Handle Voucher selection (updates URL)
  const handleVoucherSelect = (voucher) => {
    if (voucher) {
      updateParams('voucher', voucher.id);
    } else {
      updateParams('voucher', null);
    }
  };


  // Use custom fuzzy search hook
  // Use custom fuzzy search hook
  const searchResults = useFuzzySearch(data, searchTerm, {
    keys: ['brand', 'category'],
    threshold: 0.3
  });

  // Use discount parser hook for sorting
  const { getMaxDiscount } = useDiscountParser();

  const filteredVouchers = useMemo(() => {
    let result = searchTerm ? searchResults : [...data];

    if (selectedPlatform) {
      result = result.filter(voucher =>
        voucher.platforms.some(p => p.name === selectedPlatform)
      );
    }

    if (selectedCategory) {
      result = result.filter(voucher => voucher.category === selectedCategory);
    }

    // Sorting Logic
    if (sortOption === 'Alphabetical') {
      result.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (sortOption === 'Discount') {
      result.sort((a, b) => {
        return getMaxDiscount(b.platforms) - getMaxDiscount(a.platforms);
      });
    }

    return result;
  }, [searchResults, selectedPlatform, selectedCategory, sortOption, searchTerm, getMaxDiscount]);


  // Sync URL to State (Deep linking / External navigation)
  useEffect(() => {
    const currentPlatform = searchParams.get('platform');
    const currentCategory = searchParams.get('category');
    const currentSearch = searchParams.get('search');
    const currentVoucherId = searchParams.get('voucher');

    if (currentPlatform !== selectedPlatform) {
      setSelectedPlatform(currentPlatform || null);
    }
    if (currentCategory !== selectedCategory) {
      setSelectedCategory(currentCategory || null);
    }
    // Sync from URL to State
    // We treat null (missing param) as empty string to ensure input clears if param is removed
    const targetSearch = currentSearch || '';
    if (targetSearch !== searchTerm) {
      setSearchTerm(targetSearch);
      setInputValue(targetSearch); // Also sync the input value
    }

    // Sync Voucher Modal
    if (currentVoucherId) {
      const voucher = data.find(v => v.id === currentVoucherId);
      if (voucher) {
        setSelectedVoucher(voucher);
      } else {
        setSelectedVoucher(null);
      }
    } else {
      setSelectedVoucher(null);
    }

  }, [searchParams, selectedPlatform, selectedCategory, searchTerm]);
  return (
    <div className="home-container">
      {/* Mobile Filter Toggle Removed */}

      {/* Backdrop for mobile filters */}
      <div
        className={`mobile-filter-overlay ${activeMobileFilter !== 'none' ? 'active' : ''}`}
        onClick={() => setActiveMobileFilter('none')}
      />

      {/* Sidebar */}
      <aside className={`glass-panel sidebar 
        ${activeMobileFilter !== 'none' ? 'mobile-visible' : ''} 
        ${activeMobileFilter === 'platform' ? 'show-platform' : ''} 
        ${activeMobileFilter === 'category' ? 'show-category' : ''}
      `}>
        {/* Close handle/indicator for mobile */}
        <div style={{
          width: '40px',
          height: '4px',
          background: 'var(--glass-border)',
          borderRadius: '2px',
          margin: '8px auto',
          display: activeMobileFilter !== 'none' ? 'block' : 'none'
        }} onClick={() => setActiveMobileFilter('none')} />

        <div className="sidebar-content-wrapper">
          <div className="platform-section">
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--nav-text)' }}>
              Filter By Platform
            </h3>
            <PlatformFilter
              selectedPlatform={selectedPlatform}
              onPlatformSelect={(p) => {
                // Toggle behavior: if clicking selected, unselect it
                handlePlatformSelect(p === selectedPlatform ? null : p);
              }}
              platforms={ALL_PLATFORMS}
            />
          </div>

          <div className="sidebar-divider" /> {/* Added divider */}

          <div className="category-section" style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0, // Critical for flex scrolling
            flex: 1
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--nav-text)' }}>
              Filter By Category
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
              overflow: 'hidden'
            }}>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategorySelect={(c) => {
                  // Toggle behavior
                  handleCategorySelect(c === selectedCategory ? null : c);
                }}
                categories={ALL_CATEGORIES}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sticky Bar */}
      <MobileStickyFilterBar
        activeFilter={activeMobileFilter}
        onSortClick={() => setActiveMobileFilter(prev => prev === 'platform' ? 'none' : 'platform')}
        onFilterClick={() => setActiveMobileFilter(prev => prev === 'category' ? 'none' : 'category')}
      />


      {/* Main Content */}
      <main>
        {/* Show Top Deals and Stats only when no filters active */}
        {!searchTerm && !selectedPlatform && !selectedCategory && (
          <>
            {/* Show Top Deals and Stats only when no filters active */}
            {!searchTerm && !selectedPlatform && !selectedCategory && (
              <>
                <StatsBar vouchers={data} platforms={ALL_PLATFORMS} />
                <TopDeals vouchers={data} onVoucherClick={handleVoucherSelect} />
              </>
            )}
          </>
        )}

        <SearchBar
          value={inputValue}
          onChange={handleSearchChange}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onOpenShortcuts={onOpenShortcuts}
        />

        <VoucherGrid
          vouchers={filteredVouchers}
          onVoucherClick={handleVoucherSelect}
        />
      </main>

      {selectedVoucher && (
        <VoucherModal
          voucher={selectedVoucher}
          selectedPlatform={selectedPlatform} // Pass selected platform context
          onClose={() => handleVoucherSelect(null)}
        />
      )}
    </div>
  );
}


function App() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Use custom hook to fetch data
  const { vouchers, loading, error } = useVouchers();

  // Seed sample data on first run (for demo purposes) - Might be redundant now if backend is source
  /* 
  useEffect(() => {
    if (!hasSampleData()) {
      seedSampleData();
    }
  }, []);
  */

  // Toggle card selection
  const toggleCardSelection = (cardId) => {
    setSelectedCards(prevCards => {
      if (prevCards.includes(cardId)) {
        return prevCards.filter(id => id !== cardId);
      } else {
        if (prevCards.length < 4) {
          return [...prevCards, cardId];
        } else {
          alert("You can compare up to 4 cards at a time.");
          return prevCards;
        }
      }
    });
  };

  // Global listener for Shortcuts Modal (Shift + / which is ?)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Disable on mobile
      if (window.innerWidth < 768) return;

      const isInputFocused = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      // Allow shortcut if focused element is the global search input
      if (isInputFocused && document.activeElement?.id !== 'global-search-input') return;

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <div className="error-screen">Error: {error.message}. Is Backend running?</div>;

  return (
    <FavoritesProvider>
      <Router>
        <Layout
          selectedCardsCount={selectedCards.length}
          isShortcutsOpen={isShortcutsOpen}
          setIsShortcutsOpen={setIsShortcutsOpen}
        >
          <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}><LoadingSpinner size="lg" text="Loading..." /></div>}>
            <Routes>
              <Route path="/" element={<Home data={vouchers} onOpenShortcuts={() => setIsShortcutsOpen(true)} />} />
              <Route path="/guides" element={<Guides />} />
              <Route
                path="/know-your-cards"
                element={
                  <CreditCardComparison
                    view="grid"
                    selectedCards={selectedCards}
                    toggleCardSelection={toggleCardSelection}
                    clearSelection={() => setSelectedCards([])}
                  />
                }
              />
              <Route
                path="/compare-cards"
                element={
                  <CreditCardComparison
                    view="table"
                    selectedCards={selectedCards}
                    toggleCardSelection={toggleCardSelection}
                    clearSelection={() => setSelectedCards([])}
                  />
                }
              />
              <Route path="/card-guide/:id" element={<CardGuide />} />
              {featureFlags.rewardsCalculator && (
                <Route path="/rewards-calculator" element={<RewardsCalculator />} />
              )}
              {featureFlags.pointsConverter && (
                <Route path="/points-converter" element={<PointsConverter />} />
              )}
              {featureFlags.bankingGuides && (
                <Route path="/banking-guides" element={<BankingGuides />} />
              )}
              <Route path="/voucher/:id" element={<VoucherDetail vouchers={vouchers} />} />
              {featureFlags.askAI && (
                <Route path="/ask-ai" element={<AskAI />} />
              )}
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
