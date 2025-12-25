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

  const filteredVouchers = useMemo(() => {
    let result = INITIAL_DATA;

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

    return result;
  }, [searchTerm, selectedPlatform, selectedCategory]);

  return (
    <>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          selectedPlatform={selectedPlatform}
          onPlatformSelect={setSelectedPlatform}
          platforms={ALL_PLATFORMS}
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
