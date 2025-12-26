import { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import VoucherGrid from './components/VoucherGrid';
import VoucherModal from './components/VoucherModal';
import PlatformFilter from './components/PlatformFilter';
import VoucherDetail from './components/VoucherDetail';
import Guides from './components/Guides';
import CreditCardComparison from './components/CreditCardComparison';
import CardGuide from './components/CardGuide';
import ChatBot from './components/ChatBot';
import MobileStickyFilterBar from './components/MobileStickyFilterBar';
import { vouchers as RAW_DATA } from './data/vouchers';
import { sortPlatforms } from './utils/sortUtils';

// Apply global platform sorting
const INITIAL_DATA = RAW_DATA.map(voucher => ({
  ...voucher,
  platforms: sortPlatforms(voucher.platforms)
}));

// Extract unique platforms and categories from data
const ALL_PLATFORMS = [...new Set(INITIAL_DATA.flatMap(v => v.platforms.map(p => p.name)))];
const ALL_CATEGORIES = [...new Set(INITIAL_DATA.map(v => v.category))].sort();

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('search') || '';
  const selectedPlatform = searchParams.get('platform') || null;
  const selectedCategory = searchParams.get('category') || null;
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [activeMobileFilter, setActiveMobileFilter] = useState('none'); // 'none', 'platform', 'category'

  const [sortOption, setSortOption] = useState('Recommended');

  // Helper to update URL params
  const updateParams = (key, value) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    }, { replace: true });
  };

  const handleSearchChange = (val) => updateParams('search', val);
  const handlePlatformSelect = (p) => updateParams('platform', p);
  const handleCategorySelect = (c) => updateParams('category', c);


  const filteredVouchers = useMemo(() => {
    let result = [...INITIAL_DATA];

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(voucher =>
        voucher.brand.toLowerCase().includes(lowerTerm) ||
        voucher.category.toLowerCase().includes(lowerTerm)
      );
    }

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
        const getMaxDiscount = (v) => {
          return Math.max(...v.platforms.map(p => {
            const fee = p.fee || '';
            // Extract number from "2.5% Discount" or "Save 5%"
            const match = fee.match(/(\d+(\.\d+)?)%/);
            if (match && (fee.toLowerCase().includes('discount') || fee.toLowerCase().includes('save'))) {
              return parseFloat(match[1]);
            }
            return 0;
          }));
        };
        return getMaxDiscount(b) - getMaxDiscount(a);
      });
    }

    return result;
  }, [searchTerm, selectedPlatform, selectedCategory, sortOption]);


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
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />

        <VoucherGrid
          vouchers={filteredVouchers}
          onVoucherClick={setSelectedVoucher}
        />
      </main>

      {selectedVoucher && (
        <VoucherModal
          voucher={selectedVoucher}
          selectedPlatform={selectedPlatform} // Pass selected platform context
          onClose={() => setSelectedVoucher(null)}
        />
      )}
    </div>
  );
}


function App() {
  const [selectedCards, setSelectedCards] = useState([]);

  // Toggle card selection
  const toggleCardSelection = (cardId) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter(id => id !== cardId));
    } else {
      if (selectedCards.length < 4) {
        setSelectedCards([...selectedCards, cardId]);
      } else {
        alert("You can compare up to 4 cards at a time.");
      }
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <Layout selectedCardsCount={selectedCards.length}>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/voucher/:id" element={<VoucherDetail />} />
            <Route path="/ask-ai" element={
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                padding: '2rem'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧞‍♂️</div>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Ask AI</h2>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '2rem' }}>Coming Soon</p>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: '1.6' }}>
                  Our AI-powered credit card advisor is under development.
                  It will help you find the best card for any spending category.
                </p>
              </div>
            } />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
