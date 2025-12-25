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
import { vouchers as INITIAL_DATA } from './data/vouchers';

// Extract unique platforms and categories from data
const ALL_PLATFORMS = [...new Set(INITIAL_DATA.flatMap(v => v.platforms.map(p => p.name)))];
const ALL_CATEGORIES = [...new Set(INITIAL_DATA.map(v => v.category))].sort();

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platform') || null);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

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
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '3rem', alignItems: 'start' }}>
      {/* Sidebar */}
      <aside className="glass-panel" style={{ padding: '1.5rem', position: 'sticky', top: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Platforms</h3>
          <PlatformFilter
            selectedPlatform={selectedPlatform}
            onPlatformSelect={setSelectedPlatform}
            platforms={ALL_PLATFORMS}
          />
        </div>

        <div>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Categories</h3>
          <div style={{ maxHeight: 'calc(100vh - 400px)', overflowY: 'auto', paddingRight: '5px' }}>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              categories={ALL_CATEGORIES}
            />
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
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/voucher/:id" element={<VoucherDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
