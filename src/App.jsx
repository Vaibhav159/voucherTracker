import { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
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

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || null);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle

  const [sortOption, setSortOption] = useState('Recommended');

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


  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedPlatform) params.set('platform', selectedPlatform);
    if (selectedCategory) params.set('category', selectedCategory);

    // Use replace for search term changes to not clutter history too much while typing
    // But for filters, push (default) might be okay. Using replace for cleaner history for now.
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedPlatform, selectedCategory, setSearchParams]);
  return (
    <div className="home-container">
      {/* Mobile Filter Toggle */}
      <div className="mobile-filter-toggle">
        <button
          className="btn-primary"
          onClick={() => setShowFilters(!showFilters)}
          style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`glass-panel sidebar ${showFilters ? 'mobile-visible' : ''}`}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxHeight: 'calc(100vh - 4rem)', // viewport - sticky top offset
          overflow: 'hidden' // Contain child scrolls
        }}>
          <div>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Platforms</h3>
            <PlatformFilter
              selectedPlatform={selectedPlatform}
              onPlatformSelect={setSelectedPlatform}
              platforms={ALL_PLATFORMS}
            />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0, // Critical for flex scrolling
            flex: 1
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Categories</h3>
            <div style={{
              overflowY: 'auto',
              paddingRight: '5px',
              // Custom scrollbar
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.2) transparent'
            }}>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                categories={ALL_CATEGORIES}
              />
            </div>
          </div>
        </div>
      </aside>


      {/* Main Content */}
      <main>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
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
  );
}

export default App;
