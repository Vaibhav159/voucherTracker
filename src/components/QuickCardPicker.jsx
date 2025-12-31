import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * QuickCardPicker - Floating widget for instant card recommendations
 * "I'm paying at Swiggy" → "Use HDFC Swiggy for 10%!"
 */

const MERCHANT_RECOMMENDATIONS = {
  // E-commerce
  amazon: {
    icon: '📦',
    name: 'Amazon',
    cards: [
      { name: 'Amazon Pay ICICI', reward: '5% cashback', note: 'Prime members' },
      { name: 'HDFC Infinia', reward: '3.3% + SmartBuy vouchers', note: '33% via SmartBuy' },
    ],
    tip: 'Buy Amazon vouchers on iShop for extra 18% with ICICI cards!',
  },
  flipkart: {
    icon: '🛒',
    name: 'Flipkart',
    cards: [
      { name: 'Flipkart Axis Bank', reward: '5% cashback', note: 'Unlimited' },
      { name: 'ICICI Emeralde', reward: '18% via iShop vouchers', note: 'Buy vouchers first' },
    ],
    tip: 'During Big Billion Days, stack with bank offers for 10%+ total!',
  },
  myntra: {
    icon: '👗',
    name: 'Myntra',
    cards: [
      { name: 'Flipkart Axis Bank', reward: '5% cashback', note: 'Same as Flipkart' },
      { name: 'ICICI Emeralde', reward: '18% via iShop', note: 'Voucher stacking' },
    ],
  },

  // Food & Dining
  swiggy: {
    icon: '🍔',
    name: 'Swiggy',
    cards: [
      { name: 'HDFC Swiggy', reward: '10% cashback', note: 'Up to ₹1,500/month' },
      { name: 'Axis Ace', reward: '4% cashback', note: 'Via GPay' },
    ],
    tip: 'HDFC Swiggy card also gives 5% on all online spends!',
  },
  zomato: {
    icon: '🍕',
    name: 'Zomato',
    cards: [
      { name: 'IndusInd EazyDiner', reward: '5% on dining', note: 'All food apps' },
      { name: 'Axis Ace', reward: '4% cashback', note: 'Via food apps' },
    ],
    tip: 'EazyDiner Prime membership gets you 25% off at 2000+ restaurants!',
  },
  'blinkit': {
    icon: '⚡',
    name: 'Blinkit',
    cards: [
      { name: 'HDFC Swiggy', reward: '10% as Instamart', note: 'Swiggy Instamart' },
      { name: 'SBI Cashback', reward: '5% online', note: 'All online merchants' },
    ],
  },

  // Travel
  makemytrip: {
    icon: '✈️',
    name: 'MakeMyTrip',
    cards: [
      { name: 'HDFC Infinia', reward: '33% via SmartBuy', note: 'Book via SmartBuy portal' },
      { name: 'Axis Atlas', reward: '5% + miles', note: 'Transfer to airlines' },
    ],
    tip: 'Always book flights via bank portals for 10X rewards!',
  },
  uber: {
    icon: '🚗',
    name: 'Uber',
    cards: [
      { name: 'Axis Ace', reward: '4% cashback', note: 'Travel category' },
      { name: 'HDFC Regalia', reward: '3.3% points', note: 'All spends' },
    ],
  },

  // Entertainment
  'pvr': {
    icon: '🎬',
    name: 'PVR INOX',
    cards: [
      { name: 'PVR INOX Kotak', reward: 'BOGO + 5%', note: 'Buy 1 Get 1 tickets' },
      { name: 'HDFC Diners Black', reward: 'BOGO tickets', note: '2 per month' },
    ],
    tip: 'Book through PayTM for additional cashback!',
  },
  'bookmyshow': {
    icon: '🎭',
    name: 'BookMyShow',
    cards: [
      { name: 'ICICI Emeralde', reward: 'BOGO up to ₹750', note: 'Twice monthly' },
      { name: 'Kotak 811', reward: '25% off', note: 'Up to ₹100' },
    ],
  },
  spotify: {
    icon: '🎵',
    name: 'Spotify',
    cards: [
      { name: 'SBI Cashback', reward: '5% online', note: 'Recurring payments' },
      { name: 'Amazon Pay ICICI', reward: '2% on payments', note: 'Auto-pay' },
    ],
  },

  // Fuel
  'petrol': {
    icon: '⛽',
    name: 'Petrol Pump',
    cards: [
      { name: 'BPCL SBI', reward: '13% at BPCL', note: 'Max ₹500/month' },
      { name: 'IndianOil Axis', reward: '4% at IOCL', note: 'Unlimited' },
      { name: 'HPCL ICICI Coral', reward: '2.5% at HPCL', note: 'Unlimited' },
    ],
    tip: 'Use fuel-specific cards only at partner stations. Others: 1% surcharge waiver cards.',
  },

  // Utilities
  'electricity': {
    icon: '💡',
    name: 'Electricity Bill',
    cards: [
      { name: 'Axis Ace', reward: '5% via GPay', note: 'Max ₹500/month' },
      { name: 'Airtel Axis', reward: '25% Airtel payments', note: 'Airtel Thanks' },
    ],
  },

  // Groceries
  bigbasket: {
    icon: '🥦',
    name: 'BigBasket',
    cards: [
      { name: 'SBI Cashback', reward: '5% online', note: 'Cap ₹5,000/month' },
      { name: 'HDFC Regalia', reward: '3.3% points', note: 'All online' },
    ],
    tip: 'Buy BigBasket vouchers on iShop for additional 8-10% off!',
  },
};

const QuickCardPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const inputRef = useRef(null);

  // Keyboard shortcut: Ctrl/Cmd + Shift + C
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedMerchant(null);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredMerchants = Object.entries(MERCHANT_RECOMMENDATIONS)
    .filter(([key, data]) =>
      key.includes(searchQuery.toLowerCase()) ||
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 6);

  const handleMerchantSelect = (key) => {
    setSelectedMerchant(MERCHANT_RECOMMENDATIONS[key]);
    setSearchQuery('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedMerchant(null);
    setSearchQuery('');
  };

  // Floating button + Modal
  return createPortal(
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
          border: 'none',
          boxShadow: '0 4px 20px rgba(6, 182, 212, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          zIndex: 1000,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(6, 182, 212, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(6, 182, 212, 0.4)';
        }}
        title="Quick Card Picker (Ctrl+Shift+C)"
      >
        💳
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '15vh',
          }}
        >
          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: '480px',
              background: 'var(--glass-bg, rgba(30, 30, 40, 0.95))',
              borderRadius: '20px',
              border: '1px solid var(--glass-border, rgba(255,255,255,0.1))',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
              animation: 'slideDown 0.2s ease-out',
            }}
          >
            {/* Search Header */}
            {!selectedMerchant && (
              <div style={{ padding: '20px 20px 0' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border, rgba(255,255,255,0.1))',
                }}>
                  <span style={{ fontSize: '1.2rem' }}>🔍</span>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Where are you paying? (Amazon, Swiggy, PVR...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'var(--text-primary, #fff)',
                      fontSize: '1rem',
                    }}
                  />
                  <kbd style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.1)',
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary, #888)',
                  }}>
                    ESC
                  </kbd>
                </div>
              </div>
            )}

            {/* Merchant List or Selected Merchant */}
            <div style={{ padding: '16px 20px 20px' }}>
              {selectedMerchant ? (
                // Selected Merchant View
                <div>
                  <button
                    onClick={() => setSelectedMerchant(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-cyan, #06b6d4)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      marginBottom: '12px',
                      padding: 0,
                    }}
                  >
                    ← Back to search
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '2rem' }}>{selectedMerchant.icon}</span>
                    <h3 style={{ margin: 0, color: 'var(--text-primary, #fff)', fontSize: '1.3rem' }}>
                      {selectedMerchant.name}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedMerchant.cards.map((card, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '14px 16px',
                          borderRadius: '12px',
                          background: idx === 0 
                            ? 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(6,182,212,0.15))'
                            : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${idx === 0 ? 'rgba(34,197,94,0.3)' : 'var(--glass-border, rgba(255,255,255,0.1))'}`,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{
                              fontSize: '0.95rem',
                              fontWeight: '600',
                              color: 'var(--text-primary, #fff)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}>
                              {idx === 0 && <span style={{ color: '#22c55e' }}>👑</span>}
                              {card.name}
                            </div>
                            {card.note && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #888)', marginTop: '2px' }}>
                                {card.note}
                              </div>
                            )}
                          </div>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '20px',
                            background: idx === 0 ? 'rgba(34,197,94,0.2)' : 'rgba(6,182,212,0.2)',
                            color: idx === 0 ? '#22c55e' : '#06b6d4',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                          }}>
                            {card.reward}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedMerchant.tip && (
                    <div style={{
                      marginTop: '16px',
                      padding: '12px 14px',
                      background: 'rgba(6, 182, 212, 0.1)',
                      borderRadius: '10px',
                      borderLeft: '3px solid #06b6d4',
                    }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #aaa)' }}>
                        💡 <strong style={{ color: 'var(--text-primary, #fff)' }}>Pro tip:</strong> {selectedMerchant.tip}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                // Merchant Search Results
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {filteredMerchants.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary, #888)' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤔</div>
                      <p style={{ margin: 0 }}>No merchant found. Try "Amazon", "Swiggy", or "PVR"</p>
                    </div>
                  ) : (
                    filteredMerchants.map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => handleMerchantSelect(key)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '14px 16px',
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid var(--glass-border, rgba(255,255,255,0.1))',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          width: '100%',
                          textAlign: 'left',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                          e.currentTarget.style.borderColor = 'var(--glass-border, rgba(255,255,255,0.1))';
                        }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>{data.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', color: 'var(--text-primary, #fff)' }}>
                            {data.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #888)' }}>
                            Best: {data.cards[0].name} ({data.cards[0].reward})
                          </div>
                        </div>
                        <span style={{ color: 'var(--text-secondary, #888)' }}>→</span>
                      </button>
                    ))
                  )}

                  {/* Popular shortcuts */}
                  {searchQuery === '' && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #888)', marginBottom: '8px' }}>
                        Popular
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {['amazon', 'swiggy', 'petrol', 'pvr'].map(key => (
                          <button
                            key={key}
                            onClick={() => handleMerchantSelect(key)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '20px',
                              background: 'rgba(139, 92, 246, 0.15)',
                              border: '1px solid rgba(139, 92, 246, 0.3)',
                              color: '#a78bfa',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                            }}
                          >
                            {MERCHANT_RECOMMENDATIONS[key].icon} {MERCHANT_RECOMMENDATIONS[key].name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>,
    document.body
  );
};

export default QuickCardPicker;
