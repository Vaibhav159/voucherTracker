import React, { useState } from 'react';

// ============================================
// VOUCHERTRACKER - PREMIUM DARK LUXE DESIGN
// Inspired by BankKaro - Emerald, Deep Blue, Gold
// ============================================

export default function VoucherTracker() {
  const [activePage, setActivePage] = useState('home');
  const [activeVoucherFilter, setActiveVoucherFilter] = useState('All Platforms');
  const [activeCardFilter, setActiveCardFilter] = useState('All');
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [activeBank, setActiveBank] = useState('HDFC Bank');
  const [favorites, setFavorites] = useState(['amazon-voucher', 'sbi-cashback']);
  const [searchQuery, setSearchQuery] = useState('');

  // Data
  const platforms = ['All Platforms', 'Gyftr', 'Maximize', 'iShop', 'MagicPin', 'SaveSage', 'Amazon'];

  const vouchers = [
    { id: 'amazon-voucher', name: 'Amazon Shopping Voucher', category: 'Shopping', validity: '365 days', discount: '18%', logo: '🛒', color: '#FF9900', platforms: [
      { name: 'Gyftr', savings: '12.4%', fee: '4.13%', cap: '10k/month' },
      { name: 'Maximize', savings: '2.2%', fee: null, cap: 'Unlimited' },
      { name: 'iShop', savings: '18%', fee: null, cap: '10k/month', best: true },
      { name: 'MagicPin', savings: '5%', fee: null, cap: 'Check App' },
      { name: 'SaveSage', savings: '1.8%', fee: null, cap: 'Check App' },
    ]},
    { id: 'flipkart-voucher', name: 'Flipkart Gift Card', category: 'Shopping', validity: '365 days', discount: '18%', logo: '🛍️', color: '#2874F0', platforms: [
      { name: 'Gyftr', savings: '12.4%', fee: '4.13%', cap: '10k/month', best: true },
      { name: 'Maximize', savings: '2.2%', fee: null, cap: 'Unlimited' },
      { name: 'iShop', savings: '10%', fee: null, cap: '10k/month' },
    ]},
    { id: 'swiggy-voucher', name: 'Swiggy Money', category: 'Food', validity: '270 days', discount: '18%', logo: '🍔', color: '#FC8019', platforms: [
      { name: 'Gyftr', savings: '10%', fee: null, cap: '5k/month' },
      { name: 'Maximize', savings: '5%', fee: null, cap: 'Unlimited' },
      { name: 'iShop', savings: '18%', fee: null, cap: '10k/month', best: true },
    ]},
    { id: 'zomato-voucher', name: 'Zomato', category: 'Food', validity: '365 days', discount: '18%', logo: '🍕', color: '#E23744', platforms: [
      { name: 'Gyftr', savings: '12%', fee: null, cap: '10k/month' },
      { name: 'Maximize', savings: '15%', fee: null, cap: 'Unlimited', best: true },
    ]},
    { id: 'pvr-voucher', name: 'PVR INOX', category: 'Entertainment', validity: '270 days', discount: '21%', logo: '🎬', color: '#1A1A1A', platforms: [
      { name: 'Gyftr', savings: '15%', fee: null, cap: '5k/month' },
      { name: 'MagicPin', savings: '21%', fee: null, cap: 'Check App', best: true },
    ]},
    { id: 'uber-voucher', name: 'Uber', category: 'Travel', validity: '540 days', discount: '18%', logo: '🚗', color: '#000000', platforms: [
      { name: 'Gyftr', savings: '10%', fee: null, cap: '5k/month' },
      { name: 'iShop', savings: '18%', fee: null, cap: '10k/month', best: true },
    ]},
    { id: 'bigbasket-voucher', name: 'BigBasket', category: 'Grocery', validity: '365 days', discount: '18%', logo: '🥬', color: '#84C225', platforms: [
      { name: 'Gyftr', savings: '12%', fee: null, cap: '10k/month' },
      { name: 'iShop', savings: '18%', fee: null, cap: '10k/month', best: true },
    ]},
    { id: 'blinkit-voucher', name: 'Blinkit', category: 'Grocery', validity: '270 days', discount: '18%', logo: '⚡', color: '#F8CB46', platforms: [
      { name: 'Gyftr', savings: '15%', fee: null, cap: '5k/month', best: true },
      { name: 'Maximize', savings: '10%', fee: null, cap: 'Unlimited' },
    ]},
  ];

  const quickBrands = [
    { name: 'Amazon', discount: '18%', logo: '🛒' },
    { name: 'Flipkart', discount: '18%', logo: '🛍️' },
    { name: 'Myntra', discount: '20%', logo: '👗' },
    { name: 'Ajio', discount: '5%', logo: '👔' },
    { name: 'Nykaa', discount: '18%', logo: '💄' },
    { name: 'Swiggy', discount: '18%', logo: '🍔' },
    { name: 'Zomato', discount: '18%', logo: '🍕' },
    { name: 'Blinkit', discount: '18%', logo: '⚡' },
    { name: 'Zepto', discount: '2.5%', logo: '🚀' },
    { name: 'BigBasket', discount: '5%', logo: '🥬' },
    { name: 'Uber', discount: '18%', logo: '🚗' },
    { name: 'Rapido', discount: '5%', logo: '🏍️' },
  ];

  const cards = [
    { id: 'sbi-cashback', name: 'SBI Cashback', bank: 'SBI Card', fee: '₹999', reward: '5% online, 1% offline', forex: '3.5%', lounge: false, fuel: true, tags: ['Cashback', 'Entry'], bestFor: 'Online shoppers seeking simple cashback', annualSavings: '₹60,000', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', image: '💳' },
    { id: 'amazon-icici', name: 'Amazon Pay ICICI', bank: 'ICICI Bank', fee: 'Lifetime Free', reward: '5% Amazon, 2% partners, 1% elsewhere', forex: '1.99%', lounge: false, fuel: true, tags: ['Cashback', 'Co-Branded'], bestFor: 'Amazon Prime members', annualSavings: '₹48,000', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', image: '🛒' },
    { id: 'hdfc-infinia', name: 'HDFC Infinia', bank: 'HDFC Bank', fee: '₹12,500', reward: '3.3% value back', forex: '2% + GST', lounge: true, fuel: true, tags: ['Travel', 'Super Premium'], bestFor: 'High spenders seeking premium benefits', annualSavings: '₹1,50,000', gradient: 'linear-gradient(135deg, #0c0c0c 0%, #434343 100%)', image: '✈️' },
    { id: 'icici-emeralde', name: 'ICICI Emeralde Private Metal', bank: 'ICICI Bank', fee: '₹12,499', reward: '6 RP per ₹200 (3% at 1:1)', forex: '2% + GST', lounge: true, fuel: true, tags: ['Travel', 'Super Premium'], bestFor: 'High spenders with lounge needs', annualSavings: '₹1,20,000', gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', image: '💎' },
    { id: 'axis-atlas', name: 'Axis Atlas', bank: 'Axis Bank', fee: '₹5,000', reward: '2-5% on travel', forex: '0%', lounge: true, fuel: true, tags: ['Travel', 'Low Forex'], bestFor: 'Frequent travelers', annualSavings: '₹80,000', gradient: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)', image: '🌍' },
    { id: 'hdfc-regalia-gold', name: 'HDFC Regalia Gold', bank: 'HDFC Bank', fee: '₹2,500', reward: '4 RP/₹150 (2.67%)', forex: '2% + GST', lounge: true, fuel: true, tags: ['Premium', 'Lounge'], bestFor: 'Mid-tier spenders', annualSavings: '₹45,000', gradient: 'linear-gradient(135deg, #D4A574 0%, #8B6914 100%)', image: '👑' },
  ];

  const guides = [
    { id: 1, title: "From 'Rejected' to 'Card Issued': Winning against HSBC", author: '@vaibhav_lodha', tags: ['Credit Cards', 'RBI Ombudsman'], description: 'How I fought a 4-month battle with HSBC and won.' },
    { id: 2, title: 'Debit Cards of 2025 ✨', author: '@aree_dinosaur', tags: ['Debit Cards', 'Finance'], description: 'Breaking down practical debit cards usage for 2025.' },
    { id: 3, title: 'Axis Atlas Guide 🌍', author: 'u/TomorrowAdvanced2749', tags: ['Axis Bank', 'Credit Cards'], description: 'Comprehensive guide on Axis Atlas devaluation and strategies.' },
    { id: 4, title: 'Regalia Gold Guide 👑', author: 'u/TomorrowAdvanced2749', tags: ['HDFC', 'Credit Cards'], description: 'Everything about HDFC Regalia Gold rewards.' },
  ];

  const wealthTiers = {
    'HDFC Bank': [
      { name: 'Classic', requirement: 'AMB ₹1L Savings OR ₹2L Current', card: 'HDFC Classic', hasRM: false, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      { name: 'Preferred', requirement: 'AMB ₹2L Savings OR ₹5L Current', card: 'HDFC Preferred Platinum', hasRM: true, gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
      { name: 'Imperia', requirement: 'AMB ₹10L Savings OR ₹15L Current', card: 'HDFC Imperia Platinum', hasRM: true, gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' },
      { name: 'Private Banking', requirement: 'NRV ₹10 Crores+', card: 'HDFC Private World', hasRM: true, gradient: 'linear-gradient(135deg, #D4A574 0%, #8B6914 100%)' },
    ],
  };

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  const toggleCardSelect = (id) => setSelectedCards(prev => prev.includes(id) ? prev.filter(c => c !== id) : prev.length >= 3 ? prev : [...prev, id]);

  // ============================================
  // PREMIUM DARK THEME STYLES
  // ============================================
  const styles = {
    // Base colors
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
    blueDark: '#1e40af',
    blueGlow: 'rgba(59, 130, 246, 0.3)',
    purple: '#8b5cf6',
    text: '#ffffff',
    textMuted: '#9ca3af',
    textDim: '#6b7280',
    border: '#262626',
    borderLight: '#333333',
  };

  // Gradient presets
  const gradients = {
    emeraldTeal: 'linear-gradient(135deg, #065f46 0%, #0d9488 50%, #14b8a6 100%)',
    blueIndigo: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #4f46e5 100%)',
    purplePink: 'linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #a855f7 100%)',
    goldCopper: 'linear-gradient(135deg, #78350f 0%, #d97706 50%, #fbbf24 100%)',
    darkCard: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)',
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
      {/* Logo */}
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

      {/* Nav Links */}
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
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right Actions */}
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
  // HOME PAGE - BANKKARO INSPIRED
  // ============================================
  const HomePage = () => (
    <div style={{ background: styles.bg }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '80vh',
        background: `linear-gradient(135deg, #1a0f00 0%, #0a0a0a 50%, #001a1a 100%)`,
        display: 'flex',
        alignItems: 'center',
        padding: '60px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative gradient orbs */}
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
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '80px' }}>
          <div style={{ flex: 1 }}>
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
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 40px rgba(212, 165, 116, 0.3)',
              }}
            >
              Find Best Deals
              <span style={{ fontSize: '20px' }}>→</span>
            </button>
          </div>

          {/* Floating Cards Visual */}
          <div style={{ flex: 1, position: 'relative', height: '500px' }}>
            {[
              { rotate: -15, x: 0, y: 50, gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)', delay: '0s' },
              { rotate: 0, x: 80, y: 0, gradient: 'linear-gradient(135deg, #d4a574 0%, #8b6914 100%)', delay: '0.1s' },
              { rotate: 15, x: 160, y: 50, gradient: 'linear-gradient(135deg, #065f46 0%, #14b8a6 100%)', delay: '0.2s' },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: card.x,
                  top: card.y,
                  width: '280px',
                  height: '180px',
                  background: card.gradient,
                  borderRadius: '20px',
                  transform: `rotate(${card.rotate}deg)`,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: `float 3s ease-in-out infinite`,
                  animationDelay: card.delay,
                }}
              >
                <div style={{ color: '#fff', fontSize: '14px', opacity: 0.8 }}>💳 Credit Card</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section style={{ padding: '80px 48px', background: styles.bg }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '16px' }}>
            <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, transparent, ${styles.textDim})` }} />
            <h2 style={{ fontSize: '42px', fontWeight: '400', color: styles.text, fontFamily: 'Georgia, serif' }}>Our Products</h2>
            <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, ${styles.textDim}, transparent)` }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { title: 'Voucher\nShop', desc: 'Compare deals across 6 platforms', gradient: gradients.emeraldTeal, icon: '🎟️', page: 'vouchers' },
            { title: 'Card\nGenius', desc: 'Find cards tailored to your spending', gradient: gradients.blueIndigo, icon: '🧠', page: 'tools' },
            { title: 'Beat\nMy Card', desc: "You're not on the best card — let's fix that", gradient: gradients.purplePink, icon: '⚔️', page: 'cards' },
            { title: 'Banking\nTiers', desc: 'Understand wealth banking programs', gradient: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)', icon: '🏦', page: 'banking' },
          ].map((product, i) => (
            <div
              key={i}
              onClick={() => setActivePage(product.page)}
              style={{
                background: styles.bgCard,
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: `1px solid ${styles.border}`,
              }}
            >
              {/* Gradient Top */}
              <div style={{
                height: '220px',
                background: product.gradient,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderRadius: '24px 24px 0 0',
              }}>
                {/* Arch shape at top */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px',
                  height: '60px',
                  borderRadius: '0 0 60px 60px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderTop: 'none',
                }} />
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#fff',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                  fontFamily: 'Georgia, serif',
                  marginTop: '20px',
                }}>{product.title}</h3>
                <div style={{ fontSize: '48px', marginTop: '16px' }}>{product.icon}</div>
              </div>

              {/* Description */}
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <p style={{ color: styles.textMuted, fontSize: '14px', lineHeight: 1.5 }}>{product.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Cards Section */}
      <section style={{ padding: '80px 48px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '400', color: styles.text, fontFamily: 'Georgia, serif' }}>Popular Credit Cards</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Online Shopping', 'Dining', 'Travel', 'Fuel'].map((cat, i) => (
                <button key={i} style={{
                  padding: '10px 20px',
                  background: i === 0 ? styles.gold : 'transparent',
                  color: i === 0 ? '#000' : styles.textMuted,
                  border: `1px solid ${i === 0 ? styles.gold : styles.border}`,
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}>{cat}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {cards.slice(0, 3).map(card => (
              <div key={card.id} style={{
                background: styles.bgCard,
                borderRadius: '20px',
                overflow: 'hidden',
                border: `1px solid ${styles.border}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}>
                {/* Card Image Area */}
                <div style={{
                  height: '200px',
                  background: card.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  <div style={{ fontSize: '64px' }}>{card.image}</div>
                  {/* Apply Now Button */}
                  <button style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '12px 32px',
                    background: `linear-gradient(135deg, ${styles.gold} 0%, ${styles.goldDark} 100%)`,
                    color: '#000',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}>Apply Now</button>
                </div>

                {/* Card Details */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: styles.text, marginBottom: '8px' }}>{card.name}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {card.tags.map((tag, i) => (
                      <span key={i} style={{
                        padding: '4px 12px',
                        background: styles.bgElevated,
                        borderRadius: '15px',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: styles.textMuted,
                        textTransform: 'uppercase',
                      }}>{tag}</span>
                    ))}
                  </div>
                  <p style={{ color: styles.emerald, fontSize: '14px', fontWeight: '500' }}>{card.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Vault */}
      <section style={{ padding: '80px 48px', background: styles.bg }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, transparent, ${styles.textDim})` }} />
            <h2 style={{ fontSize: '42px', fontWeight: '400', color: styles.text, fontFamily: 'Georgia, serif' }}>Knowledge Vault</h2>
            <div style={{ width: '60px', height: '1px', background: `linear-gradient(90deg, ${styles.textDim}, transparent)` }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { title: 'Best Cashback Credit Cards in India 2025', icon: '💳' },
            { title: 'Expert Insights: Maximizing Credit Card Rewards', icon: '🧠' },
            { title: 'Comparing the Best Travel Credit Cards', icon: '✈️' },
            { title: 'Best Credit Cards for Online Shopping', icon: '🛒' },
          ].map((article, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: gradients.goldCopper,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                flexShrink: 0,
              }}>{article.icon}</div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '500', color: styles.text, marginBottom: '12px', fontFamily: 'Georgia, serif' }}>{article.title}</h3>
                <span style={{ color: styles.goldLight, fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Learn More <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // ============================================
  // VOUCHERS PAGE
  // ============================================
  const VouchersPage = () => (
    <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '400', color: styles.goldLight, fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
          Voucher Shop
        </h1>
        <p style={{ color: styles.textMuted, fontSize: '16px' }}>Compare {vouchers.length * 60}+ brand vouchers across 6 platforms</p>
      </div>

      {/* Quick Brands Carousel */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '14px', color: styles.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>⚡ Daily Essentials</h3>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
          {quickBrands.map((brand, i) => (
            <div key={i} style={{
              minWidth: '110px',
              padding: '20px 16px',
              background: styles.bgCard,
              borderRadius: '16px',
              border: `1px solid ${styles.border}`,
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>{brand.logo}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: styles.text }}>{brand.name}</div>
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: styles.emerald,
                color: '#000',
                fontSize: '10px',
                fontWeight: '700',
                padding: '4px 8px',
                borderRadius: '8px',
              }}>{brand.discount}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Sidebar */}
        <div style={{ width: '240px', flexShrink: 0 }}>
          <div style={{
            background: styles.bgCard,
            borderRadius: '20px',
            border: `1px solid ${styles.border}`,
            padding: '24px',
            position: 'sticky',
            top: '120px',
          }}>
            <h3 style={{ fontSize: '12px', color: styles.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Filter by Platform</h3>
            {platforms.map(platform => (
              <button
                key={platform}
                onClick={() => setActiveVoucherFilter(platform)}
                style={{
                  display: 'block',
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
              >{platform}</button>
            ))}
          </div>
        </div>

        {/* Voucher Grid */}
        <div style={{ flex: 1 }}>
          {/* Search */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '32px',
          }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                placeholder="Search for brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 50px',
                  background: styles.bgCard,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '14px',
                  fontSize: '15px',
                  color: styles.text,
                  outline: 'none',
                }}
              />
              <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔍</span>
            </div>
            <select style={{
              padding: '16px 24px',
              background: styles.bgCard,
              border: `1px solid ${styles.border}`,
              borderRadius: '14px',
              fontSize: '15px',
              color: styles.text,
              cursor: 'pointer',
            }}>
              <option>Recommended</option>
              <option>Best Discount</option>
              <option>A-Z</option>
            </select>
          </div>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {vouchers.filter(v => searchQuery === '' || v.name.toLowerCase().includes(searchQuery.toLowerCase())).map(voucher => (
              <div
                key={voucher.id}
                onClick={() => setSelectedVoucher(voucher)}
                style={{
                  background: styles.bgCard,
                  borderRadius: '20px',
                  border: `1px solid ${styles.border}`,
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                }}
              >
                {/* Discount Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: styles.emerald,
                  color: '#000',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '5px 12px',
                  borderRadius: '8px',
                }}>{voucher.discount} OFF</div>

                {/* Favorite */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(voucher.id); }}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    fontSize: '22px',
                    cursor: 'pointer',
                    opacity: favorites.includes(voucher.id) ? 1 : 0.4,
                  }}
                >💚</button>

                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: `${voucher.color}20`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                  }}>{voucher.logo}</div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: '600', color: styles.text, marginBottom: '8px' }}>{voucher.name}</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ padding: '4px 10px', background: styles.bgElevated, borderRadius: '8px', fontSize: '12px', color: styles.textMuted }}>{voucher.category}</span>
                      <span style={{ padding: '4px 10px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '8px', fontSize: '12px', color: styles.emerald }}>✓ {voucher.validity}</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <div style={{ fontSize: '12px', color: styles.textDim, marginBottom: '10px' }}>Available on</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {voucher.platforms.slice(0, 3).map((p, i) => (
                      <span key={i} style={{
                        padding: '6px 12px',
                        background: p.best ? 'rgba(16, 185, 129, 0.2)' : styles.bgElevated,
                        border: p.best ? `1px solid ${styles.emerald}` : 'none',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: p.best ? styles.emerald : styles.textMuted,
                      }}>{p.name}</span>
                    ))}
                    {voucher.platforms.length > 3 && (
                      <span style={{ padding: '6px 12px', background: styles.bgElevated, borderRadius: '8px', fontSize: '12px', color: styles.textDim }}>+{voucher.platforms.length - 3}</span>
                    )}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: `1px solid ${styles.border}`,
                }}>
                  <span style={{ color: styles.textMuted, fontSize: '14px' }}>Check Rates</span>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    background: styles.emerald,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontSize: '18px',
                  }}>→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Voucher Detail Modal */}
      {selectedVoucher && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '24px',
        }} onClick={() => setSelectedVoucher(null)}>
          <div style={{
            background: styles.bgCard,
            borderRadius: '24px',
            border: `1px solid ${styles.border}`,
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '28px', borderBottom: `1px solid ${styles.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    background: `${selectedVoucher.color}20`,
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                  }}>{selectedVoucher.logo}</div>
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: '600', color: styles.text, marginBottom: '8px' }}>{selectedVoucher.name}</h2>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ padding: '4px 12px', background: styles.bgElevated, borderRadius: '8px', fontSize: '12px', color: styles.textMuted }}>{selectedVoucher.category}</span>
                      <span style={{ padding: '4px 12px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '8px', fontSize: '12px', color: styles.emerald }}>✓ {selectedVoucher.validity}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedVoucher(null)} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: styles.textDim }}>×</button>
              </div>
            </div>

            <div style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '12px', color: styles.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Available Offers</h3>
              {selectedVoucher.platforms.map((platform, i) => (
                <div key={i} style={{
                  padding: '20px',
                  background: platform.best ? 'rgba(16, 185, 129, 0.1)' : styles.bgElevated,
                  border: platform.best ? `2px solid ${styles.emerald}` : `1px solid ${styles.border}`,
                  borderRadius: '16px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}>
                  {platform.best && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '20px',
                      background: styles.emerald,
                      color: '#000',
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '4px 12px',
                      borderRadius: '8px',
                    }}>🏆 BEST RATE</div>
                  )}
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: styles.text, marginBottom: '4px' }}>{platform.name}</div>
                    <div style={{ fontSize: '13px', color: styles.textMuted }}>{platform.fee ? `Fee: ${platform.fee}` : 'No Fee'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: styles.emerald }}>~{platform.savings}</div>
                    <div style={{ fontSize: '12px', color: styles.textMuted }}>Cap: {platform.cap}</div>
                  </div>
                  <button style={{
                    padding: '12px 24px',
                    background: platform.best ? styles.emerald : styles.bgCard,
                    color: platform.best ? '#000' : styles.text,
                    border: platform.best ? 'none' : `1px solid ${styles.border}`,
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginLeft: '16px',
                  }}>Buy Now ↗</button>
                </div>
              ))}

              <div style={{
                marginTop: '24px',
                padding: '20px',
                background: 'rgba(212, 165, 116, 0.1)',
                borderRadius: '14px',
                border: `1px solid ${styles.gold}40`,
              }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>💡</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: styles.goldLight, marginBottom: '6px' }}>Pro Tip</div>
                    <div style={{ fontSize: '13px', color: styles.textMuted, lineHeight: 1.5 }}>Stack with credit card rewards! Check your card's 'Gift Card' multiplier before buying.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ============================================
  // CARDS PAGE
  // ============================================
  const CardsPage = () => (
    <div style={{ padding: '40px 48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '400', color: styles.goldLight, fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
          Best Credit Cards For You
        </h1>
        <p style={{ color: styles.textMuted }}>Showing {cards.length} Credit Cards</p>
      </div>

      {/* Category Icons */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
        {[
          { name: 'All Cards', icon: '💳', active: true },
          { name: 'Fuel', icon: '⛽' },
          { name: 'Shopping', icon: '🛍️' },
          { name: 'Food', icon: '🍔' },
          { name: 'Dining', icon: '🍽️' },
          { name: 'Travel', icon: '✈️' },
        ].map((cat, i) => (
          <div key={i} style={{
            padding: '16px 24px',
            background: cat.active ? styles.gold : styles.bgCard,
            borderRadius: '16px',
            border: `1px solid ${cat.active ? styles.gold : styles.border}`,
            cursor: 'pointer',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{cat.icon}</div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: cat.active ? '#000' : styles.textMuted, textDecoration: cat.active ? 'underline' : 'none' }}>{cat.name}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        {['Filters', 'Sort By', 'Eligibility', 'Free Cards Only'].map((filter, i) => (
          <button key={i} style={{
            padding: '12px 20px',
            background: i === 1 ? styles.bgElevated : 'transparent',
            border: `1px solid ${styles.border}`,
            borderRadius: '10px',
            color: styles.textMuted,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            {filter} {i < 3 && <span>▾</span>}
          </button>
        ))}
      </div>

      {/* Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {cards.map(card => (
          <div key={card.id} style={{
            background: styles.bgCard,
            borderRadius: '20px',
            border: selectedCards.includes(card.id) ? `2px solid ${styles.emerald}` : `1px solid ${styles.border}`,
            padding: '24px',
            display: 'flex',
            gap: '32px',
          }}>
            {/* Card Visual */}
            <div style={{
              width: '280px',
              height: '180px',
              background: card.gradient,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
            }}>
              <div style={{ fontSize: '56px' }}>{card.image}</div>
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '600',
                padding: '6px 12px',
                borderRadius: '8px',
              }}>JOINING FEE {card.fee}</div>
            </div>

            {/* Card Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: '600', color: styles.text, marginBottom: '4px' }}>{card.name}</h3>
                  <p style={{ color: styles.textMuted, fontSize: '14px' }}>{card.bank}</p>
                </div>
                <div style={{
                  padding: '12px 20px',
                  background: styles.bgElevated,
                  borderRadius: '12px',
                  textAlign: 'right',
                }}>
                  <div style={{ fontSize: '12px', color: styles.textDim, marginBottom: '4px' }}>Annual Savings</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: styles.emerald }}>{card.annualSavings}</div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                {['✨ ' + card.reward, '✨ ' + card.bestFor].map((benefit, i) => (
                  <p key={i} style={{ color: styles.textMuted, fontSize: '14px', marginBottom: '8px', lineHeight: 1.5 }}>{benefit}</p>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {card.tags.map((tag, i) => (
                  <span key={i} style={{
                    padding: '6px 14px',
                    background: styles.bgElevated,
                    borderRadius: '15px',
                    fontSize: '12px',
                    color: styles.textMuted,
                    textTransform: 'uppercase',
                  }}>{tag}</span>
                ))}
              </div>

              <button
                onClick={() => toggleCardSelect(card.id)}
                style={{
                  padding: '10px 20px',
                  background: selectedCards.includes(card.id) ? styles.emerald : 'transparent',
                  border: `1px solid ${selectedCards.includes(card.id) ? styles.emerald : styles.gold}`,
                  borderRadius: '10px',
                  color: selectedCards.includes(card.id) ? '#000' : styles.gold,
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {selectedCards.includes(card.id) ? '✓ Added to Compare' : 'Add To Compare'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Compare Bar */}
      {selectedCards.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: styles.bgCard,
          border: `1px solid ${styles.border}`,
          padding: '16px 32px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>
          <span style={{ color: styles.textMuted }}>{selectedCards.length}/3 cards selected</span>
          <button
            onClick={() => setShowCompare(true)}
            style={{
              padding: '12px 28px',
              background: styles.gold,
              color: '#000',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >+ Compare Now</button>
          <button onClick={() => setSelectedCards([])} style={{
            padding: '12px 20px',
            background: 'transparent',
            border: `1px solid ${styles.border}`,
            borderRadius: '12px',
            color: styles.textMuted,
            cursor: 'pointer',
          }}>Clear</button>
        </div>
      )}
    </div>
  );

  // ============================================
  // GUIDES PAGE
  // ============================================
  const GuidesPage = () => (
    <div style={{ padding: '40px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '400', color: styles.goldLight, fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
          Community Guides
        </h1>
        <p style={{ color: styles.textMuted }}>Curated discussions and threads to maximize your savings</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {guides.map(guide => (
          <div key={guide.id} style={{
            background: styles.bgCard,
            borderRadius: '20px',
            border: `1px solid ${styles.border}`,
            padding: '28px',
            cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
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
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: styles.text, marginBottom: '12px', lineHeight: 1.4 }}>{guide.title}</h3>
            <p style={{ color: styles.textMuted, fontSize: '14px', marginBottom: '20px', lineHeight: 1.5 }}>{guide.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: styles.textDim, fontSize: '13px' }}>{guide.author}</span>
              <button style={{
                padding: '10px 20px',
                background: styles.emerald,
                color: '#000',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}>Read Thread</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================
  // BANKING PAGE
  // ============================================
  const BankingPage = () => (
    <div style={{ padding: '40px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '400', color: styles.goldLight, fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
          Banking Guides
        </h1>
        <p style={{ color: styles.textMuted }}>Understand wealth tiers and family banking programs</p>
      </div>

      {/* Bank Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px' }}>
        {['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'SBI', 'Kotak'].map(bank => (
          <button
            key={bank}
            onClick={() => setActiveBank(bank)}
            style={{
              padding: '12px 24px',
              background: activeBank === bank ? styles.gold : 'transparent',
              color: activeBank === bank ? '#000' : styles.textMuted,
              border: `1px solid ${activeBank === bank ? styles.gold : styles.border}`,
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >{bank}</button>
        ))}
      </div>

      {/* Section Header */}
      <div style={{
        background: styles.gold,
        padding: '20px 32px',
        borderRadius: '16px',
        textAlign: 'center',
        marginBottom: '32px',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#000', fontFamily: 'Georgia, serif' }}>{activeBank} Wealth Banking Tiers</h2>
      </div>

      {/* Tiers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {(wealthTiers[activeBank] || wealthTiers['HDFC Bank']).map((tier, i) => (
          <div key={i} style={{
            background: styles.bgCard,
            borderRadius: '20px',
            border: `1px solid ${styles.border}`,
            overflow: 'hidden',
          }}>
            <div style={{
              background: tier.gradient,
              padding: '24px',
              color: '#fff',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '600', fontFamily: 'Georgia, serif' }}>{tier.name}</h3>
                <button onClick={() => toggleFavorite(`tier-${tier.name}`)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
                  {favorites.includes(`tier-${tier.name}`) ? '💚' : '🤍'}
                </button>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{
                padding: '16px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '12px',
                marginBottom: '16px',
                fontSize: '13px',
                color: styles.emerald,
                lineHeight: 1.5,
              }}>{tier.requirement}</div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: styles.textDim, marginBottom: '8px' }}>Eligible Card</div>
                <span style={{ padding: '8px 14px', background: styles.bgElevated, borderRadius: '8px', fontSize: '13px', color: styles.text }}>{tier.card}</span>
              </div>
              {tier.hasRM && (
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(212, 165, 116, 0.1)',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: styles.goldLight,
                }}>✓ Dedicated Relationship Manager</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================
  // TOOLS PAGE
  // ============================================
  const ToolsPage = () => (
    <div style={{ padding: '40px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '400', color: styles.goldLight, fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
          Card Genius
        </h1>
        <p style={{ color: styles.textMuted }}>You think your card is unbeatable? Let's find out.</p>
      </div>

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: '#f0f4ff',
        borderRadius: '24px',
        padding: '48px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '80px', marginBottom: '24px' }}>💳</div>
        <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#1a1a2e', marginBottom: '12px' }}>Add Your Credit Card</h2>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>Compare your card with the best out there and find your perfect match in seconds.</p>
        <button style={{
          padding: '16px 48px',
          background: '#fff',
          border: '2px solid #e5e7eb',
          borderRadius: '14px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#6366f1',
          cursor: 'pointer',
        }}>Add Card +</button>
      </div>

      {/* Spending Categories */}
      <div style={{ marginTop: '48px' }}>
        <h3 style={{ fontSize: '20px', color: styles.goldLight, textAlign: 'center', marginBottom: '32px' }}>What card suits you? Select areas where you spend the most</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
          {[
            { name: 'Online Shopping', icon: '🛍️' },
            { name: 'Paying Bills', icon: '📄' },
            { name: 'Groceries', icon: '🥬' },
            { name: 'Ordering Food', icon: '🍔' },
            { name: 'Filling Fuel', icon: '⛽' },
            { name: 'Dining Out', icon: '🍽️' },
            { name: 'Flights/Hotels', icon: '✈️' },
            { name: 'Movies', icon: '🎬' },
          ].map((cat, i) => (
            <div key={i} style={{
              padding: '24px 16px',
              background: styles.bgCard,
              borderRadius: '16px',
              border: `1px solid ${styles.border}`,
              textAlign: 'center',
              cursor: 'pointer',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{cat.icon}</div>
              <div style={{ fontSize: '13px', color: styles.textMuted }}>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // ASK AI PAGE
  // ============================================
  const AskAIPage = () => (
    <div style={{ padding: '40px 48px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '400', color: styles.goldLight, fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
          Ask AI ✨
        </h1>
        <p style={{ color: styles.textMuted }}>{cards.length} Cards • {vouchers.length * 60}+ Vouchers • 14 Banks</p>
      </div>

      <div style={{
        background: styles.bgCard,
        borderRadius: '24px',
        border: `1px solid ${styles.border}`,
        padding: '32px',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '24px' }}>👋</span>
          <span style={{ fontSize: '16px', color: styles.text }}>Hi! I'm your <span style={{ color: styles.emerald, fontWeight: '600' }}>Credit Card + Banking + Voucher AI Advisor</span></span>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', color: styles.emerald, fontWeight: '600', marginBottom: '12px' }}>Powered by:</div>
          <ul style={{ margin: 0, paddingLeft: '24px', color: styles.textMuted, lineHeight: 2 }}>
            <li><span style={{ color: styles.emerald }}>{cards.length} Credit Cards</span> with detailed caps & strategies</li>
            <li><span style={{ color: styles.emerald }}>{vouchers.length * 60}+ Brand Vouchers</span> with best discounts</li>
            <li><span style={{ color: styles.emerald }}>14 Banks</span> with wealth tiers & family programs</li>
          </ul>
        </div>
        <div>
          <div style={{ fontSize: '14px', color: styles.gold, fontWeight: '600', marginBottom: '12px' }}>🏦 Try asking:</div>
          <ul style={{ margin: 0, paddingLeft: '24px', color: styles.textMuted, lineHeight: 2, fontSize: '14px' }}>
            <li>"Best combo for Amazon" → Card + voucher savings</li>
            <li>"Compare Infinia vs Magnus"</li>
            <li>"HDFC wealth tiers" → See all requirements</li>
          </ul>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {['HDFC wealth tiers', 'Best premium card', 'Best combo for Amazon'].map(q => (
          <button key={q} style={{
            padding: '12px 20px',
            background: styles.bgElevated,
            border: `1px solid ${styles.border}`,
            borderRadius: '25px',
            color: styles.textMuted,
            fontSize: '14px',
            cursor: 'pointer',
          }}>💡 {q}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <input
          type="text"
          placeholder="Ask about cards, banking, vouchers..."
          style={{
            flex: 1,
            padding: '18px 24px',
            background: styles.bgCard,
            border: `1px solid ${styles.border}`,
            borderRadius: '16px',
            fontSize: '16px',
            color: styles.text,
            outline: 'none',
          }}
        />
        <button style={{
          padding: '18px 40px',
          background: styles.gold,
          color: '#000',
          border: 'none',
          borderRadius: '16px',
          fontSize: '16px',
          fontWeight: '700',
          cursor: 'pointer',
        }}>Ask</button>
      </div>
    </div>
  );

  // ============================================
  // FAVORITES PAGE
  // ============================================
  const FavoritesPage = () => (
    <div style={{ padding: '40px 48px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '400', color: styles.goldLight, fontFamily: 'Georgia, serif', marginBottom: '8px' }}>
          💚 My Favorites
        </h1>
        <p style={{ color: styles.textMuted }}>You have {favorites.length} saved items</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {favorites.map(id => {
          const card = cards.find(c => c.id === id);
          const voucher = vouchers.find(v => v.id === id);
          if (card) {
            return (
              <div key={id} style={{
                background: styles.bgCard,
                borderRadius: '16px',
                border: `1px solid ${styles.border}`,
                padding: '20px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
              }}>
                <div style={{ width: '60px', height: '60px', background: card.gradient, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{card.image}</div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: styles.text }}>{card.name}</div>
                  <div style={{ fontSize: '13px', color: styles.textMuted }}>{card.bank}</div>
                  <div style={{ fontSize: '13px', color: styles.emerald, marginTop: '4px' }}>{card.fee}</div>
                </div>
              </div>
            );
          }
          if (voucher) {
            return (
              <div key={id} style={{
                background: styles.bgCard,
                borderRadius: '16px',
                border: `1px solid ${styles.border}`,
                padding: '20px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
              }}>
                <div style={{ width: '60px', height: '60px', background: `${voucher.color}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{voucher.logo}</div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: styles.text }}>{voucher.name}</div>
                  <div style={{ fontSize: '13px', color: styles.textMuted }}>{voucher.category}</div>
                  <div style={{ fontSize: '13px', color: styles.emerald, marginTop: '4px' }}>{voucher.discount} OFF</div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
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
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--rotate, 0deg)); }
          50% { transform: translateY(-20px) rotate(var(--rotate, 0deg)); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        input::placeholder { color: #6b7280; }
      `}</style>
      <Nav />
      {activePage === 'home' && <HomePage />}
      {activePage === 'vouchers' && <VouchersPage />}
      {activePage === 'cards' && <CardsPage />}
      {activePage === 'guides' && <GuidesPage />}
      {activePage === 'banking' && <BankingPage />}
      {activePage === 'tools' && <ToolsPage />}
      {activePage === 'ask-ai' && <AskAIPage />}
      {activePage === 'favorites' && <FavoritesPage />}

      {/* Footer */}
      <footer style={{
        padding: '40px 48px',
        borderTop: `1px solid ${styles.border}`,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '24px', fontWeight: '700', color: styles.goldLight, fontFamily: 'Georgia, serif', marginBottom: '12px' }}>
          Voucher<span style={{ color: styles.gold }}>Tracker</span>
        </div>
        <p style={{ fontSize: '14px', color: styles.textDim }}>© 2026 VoucherTracker • Created by @vaibhav_lodha</p>
      </footer>
    </div>
  );
}
