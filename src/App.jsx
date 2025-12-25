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

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || null);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [activeMobileFilter, setActiveMobileFilter] = useState('none'); // 'none', 'platform', 'category'

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
                setSelectedPlatform(p);
                // Optional: Close on select? Maybe not for multi-browse
              }}
              platforms={ALL_PLATFORMS}
            />
          </div>

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
              overflowY: 'auto',
              paddingRight: '5px',
              // Custom scrollbar
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.2) transparent'
            }}>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategorySelect={(c) => {
                  setSelectedCategory(c);
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
          selectedPlatform={selectedPlatform} // Pass selected platform context
          onClose={() => setSelectedVoucher(null)}
        />
      )}
    </div>
  );
}


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/voucher/:id" element={<VoucherDetail />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
