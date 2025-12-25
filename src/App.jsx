import { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import VoucherGrid from './components/VoucherGrid';
import VoucherModal from './components/VoucherModal';
import VoucherDetail from './components/VoucherDetail';
import { vouchers as INITIAL_DATA } from './data/vouchers';

// Extract unique platforms and categories from data
const ALL_PLATFORMS = [...new Set(INITIAL_DATA.flatMap(v => v.platforms.map(p => p.name)))];
const ALL_CATEGORIES = [...new Set(INITIAL_DATA.map(v => v.category))].sort();

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  return (
    <>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          selectedPlatform={selectedPlatform}
          onPlatformSelect={setSelectedPlatform}
          platforms={ALL_PLATFORMS}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          categories={ALL_CATEGORIES}
        />
      </div>
      <VoucherGrid
        vouchers={filteredVouchers}
        onVoucherClick={setSelectedVoucher}
      />
      {selectedVoucher && (
        <VoucherModal
          voucher={selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
        />
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voucher/:id" element={<VoucherDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
