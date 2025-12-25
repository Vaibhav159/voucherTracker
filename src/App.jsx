import { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import VoucherGrid from './components/VoucherGrid';
import VoucherDetail from './components/VoucherDetail';
import { vouchers as INITIAL_DATA } from './data/vouchers';

// Extract unique platforms from data
const ALL_PLATFORMS = [...new Set(INITIAL_DATA.flatMap(v => v.platforms.map(p => p.name)))];

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const filteredVouchers = useMemo(() => {
    let result = INITIAL_DATA;

    // Filter by Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(voucher =>
        voucher.brand.toLowerCase().includes(lowerTerm) ||
        voucher.category.toLowerCase().includes(lowerTerm)
      );
    }

    // Filter by Platform
    if (selectedPlatform) {
      result = result.filter(voucher =>
        voucher.platforms.some(p => p.name === selectedPlatform)
      );
    }

    return result;
  }, [searchTerm, selectedPlatform]);

  return (
    <>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        selectedPlatform={selectedPlatform}
        onPlatformSelect={setSelectedPlatform}
        platforms={ALL_PLATFORMS}
      />
      <VoucherGrid vouchers={filteredVouchers} />
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
