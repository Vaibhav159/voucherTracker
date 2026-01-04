import React, { useState } from 'react';

// ============================================
// VOUCHERTRACKER - PREMIUM DARK LUXE DESIGN
// REVAMPED VOUCHERS & GUIDES UI
// ============================================

export default function VoucherTracker() {
  const [activePage, setActivePage] = useState('home');
  const [activeVoucherFilter, setActiveVoucherFilter] = useState('All Platforms');
  const [activeVoucherCategory, setActiveVoucherCategory] = useState('All');
  const [activeGuideFilter, setActiveGuideFilter] = useState('All');
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [activeBank, setActiveBank] = useState('HDFC Bank');
  const [favorites, setFavorites] = useState(['amazon-voucher', 'sbi-cashback']);
  const [searchQuery, setSearchQuery] = useState('');
  const [voucherView, setVoucherView] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('recommended');

  // Platforms
  const platforms = ['All Platforms', 'Gyftr', 'Maximize', 'iShop', 'MagicPin', 'SaveSage', 'Amazon'];
  const voucherCategories = ['All', 'Shopping', 'Food', 'Travel', 'Grocery', 'Entertainment', 'Fashion', 'Electronics'];

  // Vouchers Data - Extended
  const vouchers = [
    { id: 'amazon-voucher', name: 'Amazon', fullName: 'Amazon Shopping Voucher', category: 'Shopping', validity: '365 days', discount: '18%', discountNum: 18, logo: '🛒', color: '#FF9900', description: 'India\'s largest online marketplace', platforms: [
      { name: 'Gyftr', savings: '12.4%', savingsNum: 12.4, fee: '4.13%', cap: '10k/month' },
      { name: 'Maximize', savings: '2.2%', savingsNum: 2.2, fee: null, cap: 'Unlimited' },
      { name: 'iShop', savings: '18%', savingsNum: 18, fee: null, cap: '10k/month', best: true },
      { name: 'MagicPin', savings: '5%', savingsNum: 5, fee: null, cap: 'Check App' },
      { name: 'SaveSage', savings: '1.8%', savingsNum: 1.8, fee: null, cap: 'Check App' },
    ]},
    { id: 'flipkart-voucher', name: 'Flipkart', fullName: 'Flipkart Gift Card', category: 'Shopping', validity: '365 days', discount: '18%', discountNum: 18, logo: '🛍️', color: '#2874F0', description: 'Shop for electronics, fashion & more', platforms: [
      { name: 'Gyftr', savings: '12.4%', savingsNum: 12.4, fee: '4.13%', cap: '10k/month', best: true },
      { name: 'Maximize', savings: '2.2%', savingsNum: 2.2, fee: null, cap: 'Unlimited' },
      { name: 'iShop', savings: '10%', savingsNum: 10, fee: null, cap: '10k/month' },
    ]},
    { id: 'swiggy-voucher', name: 'Swiggy', fullName: 'Swiggy Money', category: 'Food', validity: '270 days', discount: '18%', discountNum: 18, logo: '🍔', color: '#FC8019', description: 'Food delivery & quick commerce', platforms: [
      { name: 'Gyftr', savings: '10%', savingsNum: 10, fee: null, cap: '5k/month' },
      { name: 'Maximize', savings: '5%', savingsNum: 5, fee: null, cap: 'Unlimited' },
      { name: 'iShop', savings: '18%', savingsNum: 18, fee: null, cap: '10k/month', best: true },
    ]},
    { id: 'zomato-voucher', name: 'Zomato', fullName: 'Zomato Credits', category: 'Food', validity: '365 days', discount: '18%', discountNum: 18, logo: '🍕', color: '#E23744', description: 'Food delivery & dining out', platforms: [
      { name: 'Gyftr', savings: '12%', savingsNum: 12, fee: null, cap: '10k/month' },
      { name: 'Maximize', savings: '15%', savingsNum: 15, fee: null, cap: 'Unlimited', best: true },
    ]},
    { id: 'pvr-voucher', name: 'PVR INOX', fullName: 'PVR INOX Gift Card', category: 'Entertainment', validity: '270 days', discount: '21%', discountNum: 21, logo: '🎬', color: '#1A1A1A', description: 'Movies & entertainment', platforms: [
      { name: 'Gyftr', savings: '15%', savingsNum: 15, fee: null, cap: '5k/month' },
      { name: 'MagicPin', savings: '21%', savingsNum: 21, fee: null, cap: 'Check App', best: true },
    ]},
    { id: 'uber-voucher', name: 'Uber', fullName: 'Uber Gift Card', category: 'Travel', validity: '540 days', discount: '18%', discountNum: 18, logo: '🚗', color: '#000000', description: 'Rides & delivery', platforms: [
      { name: 'Gyftr', savings: '10%', savingsNum: 10, fee: null, cap: '5k/month' },
      { name: 'iShop', savings: '18%', savingsNum: 18, fee: null, cap: '10k/month', best: true },
    ]},
    { id: 'bigbasket-voucher', name: 'BigBasket', fullName: 'BigBasket Gift Card', category: 'Grocery', validity: '365 days', discount: '5%', discountNum: 5, logo: '🥬', color: '#84C225', description: 'Online grocery shopping', platforms: [
      { name: 'Gyftr', savings: '3%', savingsNum: 3, fee: null, cap: '10k/month' },
      { name: 'iShop', savings: '5%', savingsNum: 5, fee: null, cap: '10k/month', best: true },
    ]},
    { id: 'blinkit-voucher', name: 'Blinkit', fullName: 'Blinkit Gift Card', category: 'Grocery', validity: '270 days', discount: '18%', discountNum: 18, logo: '⚡', color: '#F8CB46', description: '10-minute delivery', platforms: [
      { name: 'Gyftr', savings: '15%', savingsNum: 15, fee: null, cap: '5k/month', best: true },
      { name: 'Maximize', savings: '10%', savingsNum: 10, fee: null, cap: 'Unlimited' },
    ]},
    { id: 'myntra-voucher', name: 'Myntra', fullName: 'Myntra Gift Card', category: 'Fashion', validity: '365 days', discount: '20%', discountNum: 20, logo: '👗', color: '#FF3E6C', description: 'Fashion & lifestyle', platforms: [
      { name: 'Gyftr', savings: '15%', savingsNum: 15, fee: null, cap: '10k/month' },
      { name: 'iShop', savings: '20%', savingsNum: 20, fee: null, cap: '10k/month', best: true },
    ]},
    { id: 'ajio-voucher', name: 'AJIO', fullName: 'AJIO Gift Card', category: 'Fashion', validity: '365 days', discount: '5%', discountNum: 5, logo: '👔', color: '#4A4A4A', description: 'Fashion from Reliance', platforms: [
      { name: 'Gyftr', savings: '5%', savingsNum: 5, fee: null, cap: '10k/month', best: true },
    ]},
    { id: 'nykaa-voucher', name: 'Nykaa', fullName: 'Nykaa Gift Card', category: 'Fashion', validity: '365 days', discount: '18%', discountNum: 18, logo: '💄', color: '#FC2779', description: 'Beauty & cosmetics', platforms: [
      { name: 'Gyftr', savings: '12%', savingsNum: 12, fee: null, cap: '10k/month' },
      { name: 'iShop', savings: '18%', savingsNum: 18, fee: null, cap: '10k/month', best: true },
    ]},
    { id: 'croma-voucher', name: 'Croma', fullName: 'Croma Gift Card', category: 'Electronics', validity: '365 days', discount: '5%', discountNum: 5, logo: '📱', color: '#00A859', description: 'Electronics & appliances', platforms: [
      { name: 'Gyftr', savings: '5%', savingsNum: 5, fee: null, cap: '25k/month', best: true },
    ]},
  ];

  // Guides Data - Extended
  const guides = [
    { 
      id: 1, 
      title: "From 'Rejected' to 'Card Issued': Winning against HSBC", 
      author: '@vaibhav_lodha', 
      authorAvatar: '👨‍💼',
      platform: 'Twitter',
      tags: ['Credit Cards', 'RBI Ombudsman', 'HSBC'], 
      category: 'Credit Cards',
      description: 'How I fought a 4-month battle with HSBC and won using RBI Ombudsman. Complete step-by-step guide.',
      readTime: '8 min read',
      likes: 1247,
      date: 'Dec 2025',
      featured: true,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    { 
      id: 2, 
      title: 'Best Debit Cards of 2025 ✨', 
      author: '@aree_dinosaur', 
      authorAvatar: '🦖',
      platform: 'Twitter',
      tags: ['Debit Cards', 'Finance', '2025'], 
      category: 'Debit Cards',
      description: 'Breaking down the most practical debit cards for everyday usage in 2025. Features, benefits & analysis.',
      readTime: '12 min read',
      likes: 892,
      date: 'Jan 2026',
      featured: true,
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    },
    { 
      id: 3, 
      title: 'Axis Atlas Complete Guide 🌍', 
      author: 'u/TomorrowAdvanced2749', 
      authorAvatar: '🌐',
      platform: 'Reddit',
      tags: ['Axis Bank', 'Travel', 'Credit Cards'], 
      category: 'Credit Cards',
      description: 'Comprehensive guide on Axis Atlas devaluation, Edge rewards, transfer partners and optimization strategies.',
      readTime: '15 min read',
      likes: 2341,
      date: 'Nov 2025',
      featured: false,
      gradient: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
    },
    { 
      id: 4, 
      title: 'HDFC Regalia Gold Deep Dive 👑', 
      author: 'u/TomorrowAdvanced2749', 
      authorAvatar: '👑',
      platform: 'Reddit',
      tags: ['HDFC', 'Credit Cards', 'Premium'], 
      category: 'Credit Cards',
      description: 'Everything about HDFC Regalia Gold - reward rates, SmartBuy, lounge access, and hidden benefits.',
      readTime: '10 min read',
      likes: 1876,
      date: 'Oct 2025',
      featured: false,
      gradient: 'linear-gradient(135deg, #D4A574 0%, #8B6914 100%)',
    },
    { 
      id: 5, 
      title: 'Amazon Pay ICICI Maximization', 
      author: '@creditcardgeeks', 
      authorAvatar: '💳',
      platform: 'Twitter',
      tags: ['ICICI', 'Amazon', 'Cashback'], 
      category: 'Credit Cards',
      description: 'How to squeeze maximum value from the Amazon Pay ICICI card including Prime stacking strategies.',
      readTime: '6 min read',
      likes: 3210,
      date: 'Dec 2025',
      featured: true,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    { 
      id: 6, 
      title: 'CIBIL Score Improvement Guide', 
      author: '@finance_monk', 
      authorAvatar: '📊',
      platform: 'Twitter',
      tags: ['CIBIL', 'Finance', 'Beginner'], 
      category: 'Finance',
      description: 'Step-by-step guide to improve your CIBIL score from 650 to 800+ in 6 months.',
      readTime: '9 min read',
      likes: 4521,
      date: 'Jan 2026',
      featured: false,
      gradient: 'linear-gradient(135deg, #0c0c0c 0%, #434343 100%)',
    },
    { 
      id: 7, 
      title: 'HDFC Wealth Banking Complete Guide', 
      author: '@vaibhav_lodha', 
      authorAvatar: '👨‍💼',
      platform: 'Twitter',
      tags: ['HDFC', 'Wealth Banking', 'Premium'], 
      category: 'Banking',
      description: 'Classic vs Preferred vs Imperia - which tier is right for you? Complete breakdown of requirements and benefits.',
      readTime: '14 min read',
      likes: 2890,
      date: 'Dec 2025',
      featured: true,
      gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
    },
    { 
      id: 8, 
      title: 'Voucher Stacking Masterclass', 
      author: '@savingsexpert', 
      authorAvatar: '💰',
      platform: 'Twitter',
      tags: ['Vouchers', 'Savings', 'Strategy'], 
      category: 'Vouchers',
      description: 'How to combine credit card rewards with voucher platforms for maximum savings - real examples included.',
      readTime: '11 min read',
      likes: 1654,
      date: 'Jan 2026',
      featured: false,
      gradient: 'linear-gradient(135deg, #065f46 0%, #14b8a6 100%)',
    },
  ];

  const guideCategories = ['All', 'Credit Cards', 'Debit Cards', 'Finance', 'Banking', 'Vouchers'];

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  // Filter vouchers
  const filteredVouchers = vouchers
    .filter(v => activeVoucherCategory === 'All' || v.category === activeVoucherCategory)
    .filter(v => activeVoucherFilter === 'All Platforms' || v.platforms.some(p => p.name === activeVoucherFilter))
    .filter(v => searchQuery === '' || v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'discount') return b.discountNum - a.discountNum;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // recommended - keep original order
    });

  // Filter guides
  const filteredGuides = guides
    .filter(g => activeGuideFilter === 'All' || g.category === activeGuideFilter);

  // ============================================
  // STYLES
  // ============================================
  const styles = {
    bg: '#0a0a0a',
    bgCard: '#141414',
    bgCardHover: '#1a1a1a',
    bgElevated: '#1e1e1e',
    gold: '#d4a574',
    goldLight: '#e8c49a',
    goldDark: '#b8956a',
    emerald: '#10b981',
    emeraldDark: '#059669',
    emeraldGlow: 'rgba(16, 185, 129, 0.3)',
    blue: '#3b82f6',
    purple: '#8b5cf6',
    text: '#ffffff',
    textMuted: '#9ca3af',
    textDim: '#6b7280',
    border: '#262626',
    borderLight: '#333333',
  };

  const gradients = {
    emeraldTeal: 'linear-gradient(135deg, #065f46 0%, #0d9488 50%, #14b8a6 100%)',
    blueIndigo: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #4f46e5 100%)',
    purplePink: 'linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #a855f7 100%)',
    goldCopper: 'linear-gradient(135deg, #78350f 0%, #d97706 50%, #fbbf24 100%)',
  };

  // ============================================
  // NAVIGATION
  // ============================================
  const Nav = () => (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 48px',
      background: 'rgba(10, 10, 10, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${styles.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActivePage('home')}>
        <div style={{
          width: '42px',
          height: '42px',
          background: gradients.emeraldTeal,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: '800',
          fontSize: '18px',
          boxShadow: `0 0 30px ${styles.emeraldGlow}`,
        }}>V</div>
        <span style={{ fontSize: '22px', fontWeight: '700', color: styles.text, fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>
          Voucher<span style={{ color: styles.gold }}>Tracker</span>
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { key: 'home', label: 'Home' },
          { key: 'vouchers', label: 'Vouchers' },
          { key: 'cards', label: 'Cards' },
          { key: 'guides', label: 'Guides' },
          { key: 'banking', label: 'Banking' },
          { key: 'tools', label: 'Tools' },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            style={{
              padding: '10px 20px',
              background: activePage === item.key ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              color: activePage === item.key ? styles.emerald : styles.textMuted,
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >{item.label}</button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => setActivePage('ask-ai')}
          style={{
            padding: '12px 24px',
            background: `linear-gradient(135deg, ${styles.gold} 0%, ${styles.goldDark} 100%)`,
            color: '#000',
            border: 'none',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 20px rgba(212, 165, 116, 0.3)',
          }}
        >
          <span>✨</span> Ask AI
        </button>
        
        <button
          onClick={() => setActivePage('favorites')}
          style={{
            width: '44px',
            height: '44px',
            background: styles.bgCard,
            border: `1px solid ${styles.border}`,
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            fontSize: '20px',
          }}
        >
          💚
          {favorites.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: styles.emerald,
              color: '#fff',
              fontSize: '11px',
              fontWeight: '700',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>{favorites.length}</span>
          )}
        </button>
      </div>
    </nav>
  );

  // ============================================
  // REVAMPED VOUCHERS PAGE
  // ============================================
  const VouchersPage = () => {
    const getBestRate = (platforms) => {
      const best = platforms.find(p => p.best) || platforms[0];
      return best.savings;
    };

    return (
      <div style={{ background: styles.bg, minHeight: '100vh' }}>
        {/* Hero Banner */}
        <div style={{
          background: `linear-gradient(135deg, #0a1a0a 0%, #0a0a0a 50%, #0a0a1a 100%)`,
          padding: '60px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative orbs */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            left: '5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }} />

          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '48px' }}>🎟️</span>
                  <h1 style={{
                    fontSize: '52px',
                    fontWeight: '400',
                    color: styles.goldLight,
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                  }}>Voucher Shop</h1>
                </div>
                <p style={{ fontSize: '18px', color: styles.textMuted, maxWidth: '500px', lineHeight: 1.6 }}>
                  Save up to <span style={{ color: styles.emerald, fontWeight: '700' }}>21%</span> on your favorite brands. 
                  Compare rates across 6 platforms instantly.
                </p>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '32px' }}>
                {[
                  { value: '519+', label: 'Vouchers', icon: '🎫' },
                  { value: '6', label: 'Platforms', icon: '🏪' },
                  { value: '21%', label: 'Max Savings', icon: '💰' },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '24px 32px',
                    textAlign: 'center',
                    border: `1px solid ${styles.border}`,
                  }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: styles.emerald }}>{stat.value}</div>
                    <div style={{ fontSize: '14px', color: styles.textMuted }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Brands Carousel */}
        <div style={{ padding: '40px 48px 0', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', color: styles.textMuted, textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#fbbf24' }}>⚡</span> Daily Essentials
            </h3>
            <button style={{
              background: 'none',
              border: 'none',
              color: styles.gold,
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>View All →</button>
          </div>

          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '20px' }}>
            {vouchers.slice(0, 10).map((voucher, i) => (
              <div
                key={i}
                onClick={() => setSelectedVoucher(voucher)}
                style={{
                  minWidth: '140px',
                  padding: '24px 20px',
                  background: styles.bgCard,
                  borderRadius: '20px',
                  border: `1px solid ${styles.border}`,
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                {/* Discount Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: styles.emerald,
                  color: '#000',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                }}>{voucher.discount}</div>
                
                <div style={{ 
                  fontSize: '42px', 
                  marginBottom: '12px',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                }}>{voucher.logo}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: styles.text }}>{voucher.name}</div>
                <div style={{ fontSize: '12px', color: styles.textDim, marginTop: '4px' }}>{voucher.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            {/* Sidebar */}
            <div style={{ width: '280px', flexShrink: 0 }}>
              <div style={{
                background: styles.bgCard,
                borderRadius: '24px',
                border: `1px solid ${styles.border}`,
                padding: '28px',
                position: 'sticky',
                top: '120px',
              }}>
                {/* Platform Filter */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '12px', color: styles.gold, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', fontWeight: '600' }}>
                    🏪 Filter by Platform
                  </h3>
                  {platforms.map(platform => (
                    <button
                      key={platform}
                      onClick={() => setActiveVoucherFilter(platform)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '14px 16px',
                        marginBottom: '6px',
                        background: activeVoucherFilter === platform ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                        border: activeVoucherFilter === platform ? `1px solid ${styles.emerald}` : '1px solid transparent',
                        borderRadius: '12px',
                        color: activeVoucherFilter === platform ? styles.emerald : styles.textMuted,
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                    >
                      {platform}
                      {activeVoucherFilter === platform && <span>✓</span>}
                    </button>
                  ))}
                </div>

                {/* Category Filter */}
                <div>
                  <h3 style={{ fontSize: '12px', color: styles.gold, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', fontWeight: '600' }}>
                    📂 Category
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {voucherCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveVoucherCategory(cat)}
                        style={{
                          padding: '8px 14px',
                          background: activeVoucherCategory === cat ? styles.emerald : styles.bgElevated,
                          border: 'none',
                          borderRadius: '20px',
                          color: activeVoucherCategory === cat ? '#000' : styles.textMuted,
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >{cat}</button>
                    ))}
                  </div>
                </div>

                {/* Pro Tip */}
                <div style={{
                  marginTop: '32px',
                  padding: '20px',
                  background: 'rgba(212, 165, 116, 0.1)',
                  borderRadius: '16px',
                  border: `1px solid rgba(212, 165, 116, 0.2)`,
                }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: styles.goldLight, marginBottom: '8px' }}>💡 Pro Tip</div>
                  <div style={{ fontSize: '13px', color: styles.textMuted, lineHeight: 1.5 }}>
                    Stack vouchers with credit card rewards for double savings!
                  </div>
                </div>
              </div>
            </div>

            {/* Voucher Grid */}
            <div style={{ flex: 1 }}>
              {/* Search & Controls */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search vouchers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '18px 24px 18px 56px',
                      background: styles.bgCard,
                      border: `1px solid ${styles.border}`,
                      borderRadius: '16px',
                      fontSize: '15px',
                      color: styles.text,
                      outline: 'none',
                    }}
                  />
                  <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}>🔍</span>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '18px 24px',
                    background: styles.bgCard,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '16px',
                    fontSize: '14px',
                    color: styles.text,
                    cursor: 'pointer',
                    minWidth: '160px',
                  }}
                >
                  <option value="recommended">Recommended</option>
                  <option value="discount">Best Discount</option>
                  <option value="name">A-Z</option>
                </select>

                {/* View Toggle */}
                <div style={{ display: 'flex', background: styles.bgCard, borderRadius: '12px', border: `1px solid ${styles.border}`, overflow: 'hidden' }}>
                  <button
                    onClick={() => setVoucherView('grid')}
                    style={{
                      padding: '14px 18px',
                      background: voucherView === 'grid' ? styles.emerald : 'transparent',
                      border: 'none',
                      color: voucherView === 'grid' ? '#000' : styles.textMuted,
                      cursor: 'pointer',
                      fontSize: '18px',
                    }}
                  >⊞</button>
                  <button
                    onClick={() => setVoucherView('list')}
                    style={{
                      padding: '14px 18px',
                      background: voucherView === 'list' ? styles.emerald : 'transparent',
                      border: 'none',
                      color: voucherView === 'list' ? '#000' : styles.textMuted,
                      cursor: 'pointer',
                      fontSize: '18px',
                    }}
                  >☰</button>
                </div>
              </div>

              {/* Results Count */}
              <div style={{ marginBottom: '24px', color: styles.textMuted, fontSize: '14px' }}>
                Showing <span style={{ color: styles.emerald, fontWeight: '600' }}>{filteredVouchers.length}</span> vouchers
              </div>

              {/* Grid View */}
              {voucherView === 'grid' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                  {filteredVouchers.map(voucher => (
                    <div
                      key={voucher.id}
                      onClick={() => setSelectedVoucher(voucher)}
                      style={{
                        background: styles.bgCard,
                        borderRadius: '24px',
                        border: `1px solid ${styles.border}`,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        position: 'relative',
                      }}
                    >
                      {/* Top Banner with gradient */}
                      <div style={{
                        height: '100px',
                        background: `linear-gradient(135deg, ${voucher.color}30 0%, transparent 100%)`,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{ fontSize: '52px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>{voucher.logo}</span>
                        
                        {/* Discount Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          background: styles.emerald,
                          color: '#000',
                          fontSize: '12px',
                          fontWeight: '700',
                          padding: '6px 14px',
                          borderRadius: '10px',
                        }}>{voucher.discount} OFF</div>

                        {/* Favorite */}
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(voucher.id); }}
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: 'rgba(0,0,0,0.3)',
                            border: 'none',
                            borderRadius: '10px',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            cursor: 'pointer',
                            opacity: favorites.includes(voucher.id) ? 1 : 0.6,
                          }}
                        >💚</button>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: styles.text, marginBottom: '8px' }}>{voucher.fullName}</h3>
                        <p style={{ fontSize: '13px', color: styles.textDim, marginBottom: '16px' }}>{voucher.description}</p>
                        
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                          <span style={{ padding: '6px 12px', background: styles.bgElevated, borderRadius: '8px', fontSize: '12px', color: styles.textMuted }}>{voucher.category}</span>
                          <span style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '8px', fontSize: '12px', color: styles.emerald }}>✓ {voucher.validity}</span>
                        </div>

                        {/* Best Rate Preview */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px',
                          background: styles.bgElevated,
                          borderRadius: '14px',
                        }}>
                          <div>
                            <div style={{ fontSize: '11px', color: styles.textDim, marginBottom: '4px' }}>Best Rate</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: styles.emerald }}>~{getBestRate(voucher.platforms)}</div>
                          </div>
                          <div style={{
                            padding: '12px 20px',
                            background: styles.emerald,
                            borderRadius: '12px',
                            color: '#000',
                            fontSize: '13px',
                            fontWeight: '700',
                          }}>Compare →</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* List View */}
              {voucherView === 'list' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredVouchers.map(voucher => (
                    <div
                      key={voucher.id}
                      onClick={() => setSelectedVoucher(voucher)}
                      style={{
                        background: styles.bgCard,
                        borderRadius: '20px',
                        border: `1px solid ${styles.border}`,
                        padding: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                        transition: 'all 0.3s',
                      }}
                    >
                      {/* Logo */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: `${voucher.color}20`,
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        flexShrink: 0,
                      }}>{voucher.logo}</div>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: '600', color: styles.text }}>{voucher.fullName}</h3>
                          <span style={{
                            padding: '4px 10px',
                            background: styles.emerald,
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#000',
                          }}>{voucher.discount} OFF</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                          <span style={{ padding: '4px 10px', background: styles.bgElevated, borderRadius: '6px', fontSize: '12px', color: styles.textMuted }}>{voucher.category}</span>
                          <span style={{ padding: '4px 10px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '6px', fontSize: '12px', color: styles.emerald }}>✓ {voucher.validity}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {voucher.platforms.slice(0, 4).map((p, i) => (
                            <span key={i} style={{
                              padding: '6px 12px',
                              background: p.best ? 'rgba(16, 185, 129, 0.2)' : styles.bgElevated,
                              border: p.best ? `1px solid ${styles.emerald}` : 'none',
                              borderRadius: '8px',
                              fontSize: '12px',
                              color: p.best ? styles.emerald : styles.textMuted,
                            }}>{p.name}</span>
                          ))}
                        </div>
                      </div>

                      {/* Best Rate */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', color: styles.textDim, marginBottom: '4px' }}>Best Rate</div>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: styles.emerald }}>~{getBestRate(voucher.platforms)}</div>
                      </div>

                      {/* Favorite */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(voucher.id); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '24px',
                          cursor: 'pointer',
                          opacity: favorites.includes(voucher.id) ? 1 : 0.4,
                        }}
                      >💚</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Voucher Detail Modal */}
        {selectedVoucher && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '24px',
          }} onClick={() => setSelectedVoucher(null)}>
            <div style={{
              background: styles.bgCard,
              borderRadius: '28px',
              border: `1px solid ${styles.border}`,
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
            }} onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div style={{
                padding: '32px',
                background: `linear-gradient(135deg, ${selectedVoucher.color}30 0%, transparent 100%)`,
                borderBottom: `1px solid ${styles.border}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div style={{
                      width: '88px',
                      height: '88px',
                      background: `${selectedVoucher.color}30`,
                      borderRadius: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px',
                    }}>{selectedVoucher.logo}</div>
                    <div>
                      <h2 style={{ fontSize: '26px', fontWeight: '600', color: styles.text, marginBottom: '8px' }}>{selectedVoucher.fullName}</h2>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ padding: '6px 14px', background: styles.bgElevated, borderRadius: '10px', fontSize: '13px', color: styles.textMuted }}>{selectedVoucher.category}</span>
                        <span style={{ padding: '6px 14px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '10px', fontSize: '13px', color: styles.emerald }}>✓ {selectedVoucher.validity}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedVoucher(null)} style={{ 
                    background: 'rgba(255,255,255,0.1)', 
                    border: 'none', 
                    borderRadius: '12px',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px', 
                    cursor: 'pointer', 
                    color: styles.textMuted 
                  }}>×</button>
                </div>
              </div>

              {/* Platforms */}
              <div style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '12px', color: styles.gold, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px', fontWeight: '600' }}>
                  🏪 Available Platforms ({selectedVoucher.platforms.length})
                </h3>
                
                {selectedVoucher.platforms.map((platform, i) => (
                  <div key={i} style={{
                    padding: '24px',
                    background: platform.best ? 'rgba(16, 185, 129, 0.1)' : styles.bgElevated,
                    border: platform.best ? `2px solid ${styles.emerald}` : `1px solid ${styles.border}`,
                    borderRadius: '18px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}>
                    {platform.best && (
                      <div style={{
                        position: 'absolute',
                        top: '-12px',
                        right: '24px',
                        background: styles.emerald,
                        color: '#000',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '6px 14px',
                        borderRadius: '10px',
                      }}>🏆 BEST RATE</div>
                    )}
                    <div>
                      <div style={{ fontSize: '17px', fontWeight: '600', color: styles.text, marginBottom: '6px' }}>{platform.name}</div>
                      <div style={{ fontSize: '13px', color: styles.textMuted }}>
                        {platform.fee ? `Processing Fee: ${platform.fee}` : '✓ No Processing Fee'}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: platform.best ? styles.emerald : styles.text }}>~{platform.savings}</div>
                      <div style={{ fontSize: '12px', color: styles.textMuted }}>Cap: {platform.cap}</div>
                    </div>
                    <button style={{
                      padding: '14px 28px',
                      background: platform.best ? styles.emerald : styles.bgCard,
                      color: platform.best ? '#000' : styles.text,
                      border: platform.best ? 'none' : `1px solid ${styles.border}`,
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}>Buy Now ↗</button>
                  </div>
                ))}

                {/* Pro Tip */}
                <div style={{
                  marginTop: '28px',
                  padding: '24px',
                  background: 'rgba(212, 165, 116, 0.1)',
                  borderRadius: '18px',
                  border: `1px solid ${styles.gold}30`,
                }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '32px' }}>💡</span>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: styles.goldLight, marginBottom: '8px' }}>Maximize Your Savings</div>
                      <div style={{ fontSize: '14px', color: styles.textMuted, lineHeight: 1.6 }}>
                        Use a credit card with gift card multipliers (like HDFC SmartBuy or SBI BPCL) when purchasing vouchers to stack rewards!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // REVAMPED GUIDES PAGE
  // ============================================
  const GuidesPage = () => (
    <div style={{ background: styles.bg, minHeight: '100vh' }}>
      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(135deg, #1a0f1a 0%, #0a0a0a 50%, #0f1a1a 100%)`,
        padding: '60px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '20%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <span style={{ fontSize: '56px' }}>📚</span>
              <h1 style={{
                fontSize: '52px',
                fontWeight: '400',
                color: styles.goldLight,
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
              }}>Knowledge Vault</h1>
            </div>
            <p style={{ fontSize: '18px', color: styles.textMuted, maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Curated guides, threads, and strategies from the community to help you maximize your financial benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div style={{ padding: '40px 48px 0', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {guideCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveGuideFilter(cat)}
              style={{
                padding: '14px 28px',
                background: activeGuideFilter === cat ? styles.gold : styles.bgCard,
                color: activeGuideFilter === cat ? '#000' : styles.textMuted,
                border: `1px solid ${activeGuideFilter === cat ? styles.gold : styles.border}`,
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* Featured Guides */}
      <div style={{ padding: '48px 48px 0', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '14px', 
          color: styles.gold, 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>⭐</span> Featured Guides
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {filteredGuides.filter(g => g.featured).map(guide => (
            <div
              key={guide.id}
              style={{
                background: styles.bgCard,
                borderRadius: '24px',
                overflow: 'hidden',
                border: `1px solid ${styles.border}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {/* Gradient Header */}
              <div style={{
                height: '140px',
                background: guide.gradient,
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '24px',
              }}>
                {/* Platform Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '6px 14px',
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: '#fff',
                  fontWeight: '500',
                }}>
                  {guide.platform === 'Twitter' ? '𝕏' : '🔗'} {guide.platform}
                </div>
                
                {/* Featured Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  padding: '6px 12px',
                  background: styles.gold,
                  borderRadius: '8px',
                  fontSize: '10px',
                  color: '#000',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                }}>⭐ Featured</div>

                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  color: '#fff',
                  lineHeight: 1.3,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}>{guide.title}</h3>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <p style={{ fontSize: '14px', color: styles.textMuted, marginBottom: '20px', lineHeight: 1.6 }}>
                  {guide.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {guide.tags.map((tag, i) => (
                    <span key={i} style={{
                      padding: '6px 12px',
                      background: styles.bgElevated,
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: styles.textMuted,
                    }}>{tag}</span>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>{guide.authorAvatar}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: styles.text }}>{guide.author}</div>
                      <div style={{ fontSize: '12px', color: styles.textDim }}>{guide.date} • {guide.readTime}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: styles.emerald, fontSize: '14px' }}>
                    <span>❤️</span>
                    <span style={{ fontWeight: '600' }}>{guide.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Guides */}
      <div style={{ padding: '48px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '14px', 
          color: styles.gold, 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>📖</span> All Guides ({filteredGuides.length})
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {filteredGuides.map(guide => (
            <div
              key={guide.id}
              style={{
                background: styles.bgCard,
                borderRadius: '20px',
                border: `1px solid ${styles.border}`,
                padding: '28px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Top Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {guide.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} style={{
                      padding: '5px 10px',
                      background: styles.bgElevated,
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '600',
                      color: styles.textMuted,
                      textTransform: 'uppercase',
                    }}>{tag}</span>
                  ))}
                </div>
                <span style={{
                  padding: '5px 10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: styles.emerald,
                }}>{guide.readTime}</span>
              </div>

              {/* Title */}
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: styles.text, 
                marginBottom: '12px', 
                lineHeight: 1.4,
                flex: 1,
              }}>{guide.title}</h3>

              {/* Description */}
              <p style={{ fontSize: '14px', color: styles.textMuted, marginBottom: '24px', lineHeight: 1.5 }}>
                {guide.description}
              </p>

              {/* Author & CTA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>{guide.authorAvatar}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: styles.text }}>{guide.author}</div>
                    <div style={{ fontSize: '11px', color: styles.textDim }}>{guide.date}</div>
                  </div>
                </div>
                <button style={{
                  padding: '12px 24px',
                  background: styles.emerald,
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  Read <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{ padding: '0 48px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: `linear-gradient(135deg, ${styles.gold}20 0%, ${styles.emerald}20 100%)`,
          borderRadius: '28px',
          padding: '48px',
          border: `1px solid ${styles.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ fontSize: '28px', fontWeight: '600', color: styles.text, marginBottom: '12px', fontFamily: 'Georgia, serif' }}>
              Have a guide to share?
            </h3>
            <p style={{ fontSize: '16px', color: styles.textMuted }}>
              Submit your threads, analyses, or strategies to help the community save more.
            </p>
          </div>
          <button style={{
            padding: '18px 36px',
            background: styles.gold,
            color: '#000',
            border: 'none',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
          }}>Submit Guide ↗</button>
        </div>
      </div>
    </div>
  );

  // ============================================
  // HOME PAGE (Simplified for brevity)
  // ============================================
  const HomePage = () => (
    <div style={{ background: styles.bg }}>
      {/* Hero */}
      <section style={{
        minHeight: '80vh',
        background: `linear-gradient(135deg, #1a0f00 0%, #0a0a0a 50%, #001a1a 100%)`,
        display: 'flex',
        alignItems: 'center',
        padding: '60px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: '400',
            color: styles.goldLight,
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}>
            India's Smartest<br />
            <span style={{ color: styles.text, fontStyle: 'normal' }}>Savings Platform</span>
          </h1>
          <p style={{ fontSize: '18px', color: styles.textMuted, marginBottom: '40px', maxWidth: '500px', lineHeight: 1.6 }}>
            Compare 500+ vouchers, 160+ credit cards, and maximize your savings with AI-powered recommendations.
          </p>
          <button
            onClick={() => setActivePage('vouchers')}
            style={{
              padding: '18px 40px',
              background: `linear-gradient(135deg, ${styles.gold} 0%, ${styles.goldDark} 100%)`,
              color: '#000',
              border: 'none',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 40px rgba(212, 165, 116, 0.3)',
            }}
          >
            Find Best Deals →
          </button>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: '80px 48px', background: styles.bg }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '400', color: styles.text, fontFamily: 'Georgia, serif' }}>Our Products</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { title: 'Voucher\nShop', desc: 'Compare deals across 6 platforms', gradient: gradients.emeraldTeal, icon: '🎟️', page: 'vouchers' },
            { title: 'Card\nGenius', desc: 'Find cards tailored to your spending', gradient: gradients.blueIndigo, icon: '🧠', page: 'tools' },
            { title: 'Community\nGuides', desc: 'Learn from expert strategies', gradient: gradients.purplePink, icon: '📚', page: 'guides' },
            { title: 'Banking\nTiers', desc: 'Understand wealth programs', gradient: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)', icon: '🏦', page: 'banking' },
          ].map((product, i) => (
            <div
              key={i}
              onClick={() => setActivePage(product.page)}
              style={{
                background: styles.bgCard,
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: `1px solid ${styles.border}`,
              }}
            >
              <div style={{
                height: '200px',
                background: product.gradient,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <h3 style={{ fontSize: '26px', fontWeight: '600', color: '#fff', textAlign: 'center', whiteSpace: 'pre-line', fontFamily: 'Georgia, serif' }}>{product.title}</h3>
                <div style={{ fontSize: '42px', marginTop: '16px' }}>{product.icon}</div>
              </div>
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <p style={{ color: styles.textMuted, fontSize: '14px' }}>{product.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div style={{
      minHeight: '100vh',
      background: styles.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: styles.text,
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        input::placeholder { color: #6b7280; }
        select option { background: #141414; color: #fff; }
      `}</style>
      
      <Nav />
      
      {activePage === 'home' && <HomePage />}
      {activePage === 'vouchers' && <VouchersPage />}
      {activePage === 'guides' && <GuidesPage />}

      {/* Footer */}
      <footer style={{
        padding: '40px 48px',
        borderTop: `1px solid ${styles.border}`,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '24px', fontWeight: '700', color: styles.goldLight, fontFamily: 'Georgia, serif', marginBottom: '12px' }}>
          Voucher<span style={{ color: styles.gold }}>Tracker</span>
        </div>
        <p style={{ fontSize: '14px', color: styles.textDim }}>© 2026 VoucherTracker • Made with 💚</p>
      </footer>
    </div>
  );
}
