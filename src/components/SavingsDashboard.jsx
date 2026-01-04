import { useState, useMemo, useEffect } from 'react';

/**
 * SavingsDashboard - Visual summary of savings from vouchers and card rewards
 * Shows potential and tracked savings
 */

const STORAGE_KEY = 'voucherTracker_savingsHistory';

// Sample savings categories for visualization
const SAVINGS_CATEGORIES = [
  { key: 'vouchers', label: 'Voucher Discounts', icon: '🎫', color: '#22c55e' },
  { key: 'cashback', label: 'Card Cashback', icon: '💰', color: '#06b6d4' },
  { key: 'rewards', label: 'Reward Points', icon: '⭐', color: '#8b5cf6' },
  { key: 'lounge', label: 'Lounge Access', icon: '✈️', color: '#f59e0b' },
  { key: 'offers', label: 'Card Offers', icon: '🎁', color: '#ec4899' },
];

// Hook to manage savings tracking
export const useSavingsTracker = () => {
  const [savingsHistory, setSavingsHistory] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState({});

  // Load from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavingsHistory(parsed.history || []);
        setMonthlyTotals(parsed.monthlyTotals || {});
      }
    } catch (err) {
      console.error('Failed to load savings:', err);
    }
  }, []);

  // Save to storage
  const saveData = (history, totals) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        history,
        monthlyTotals: totals,
      }));
    } catch (err) {
      console.error('Failed to save savings:', err);
    }
  };

  // Add a savings entry
  const addSaving = (saving) => {
    const entry = {
      id: Date.now(),
      ...saving,
      timestamp: new Date().toISOString(),
    };

    setSavingsHistory(prev => {
      const updated = [entry, ...prev].slice(0, 100);

      // Update monthly totals
      const month = new Date().toISOString().slice(0, 7);
      const newTotals = {
        ...monthlyTotals,
        [month]: (monthlyTotals[month] || 0) + (saving.amount || 0),
      };
      setMonthlyTotals(newTotals);

      saveData(updated, newTotals);
      return updated;
    });
  };

  // Get current month's total
  const currentMonthSavings = useMemo(() => {
    const month = new Date().toISOString().slice(0, 7);
    return monthlyTotals[month] || 0;
  }, [monthlyTotals]);

  // Get last 6 months for chart
  const chartData = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toISOString().slice(0, 7);
      months.push({
        month: date.toLocaleDateString('en-IN', { month: 'short' }),
        amount: monthlyTotals[month] || 0,
      });
    }
    return months;
  }, [monthlyTotals]);

  return {
    savingsHistory,
    monthlyTotals,
    currentMonthSavings,
    chartData,
    addSaving,
  };
};

// Quick Add Savings Modal
const QuickAddSavings = ({ isOpen, onClose, onAdd }) => {
  const [category, setCategory] = useState('vouchers');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;

    onAdd({
      category,
      amount: parseFloat(amount),
      description: description || `${SAVINGS_CATEGORIES.find(c => c.key === category)?.label} savings`,
    });

    setAmount('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          width: '90%',
          maxWidth: '400px',
          background: 'var(--glass-bg, rgba(30, 30, 40, 0.98))',
          borderRadius: '20px',
          border: '1px solid var(--glass-border)',
          padding: '1.5rem',
        }}
      >
        <h3 style={{ margin: '0 0 1.5rem', color: 'var(--text-primary)', textAlign: 'center' }}>
          💰 Log Savings
        </h3>

        {/* Category Selection */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Category
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {SAVINGS_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setCategory(cat.key)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${category === cat.key ? cat.color : 'var(--glass-border)'}`,
                  background: category === cat.key ? `${cat.color}20` : 'transparent',
                  color: category === cat.key ? cat.color : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Amount Saved
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
            }}>₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              required
              style={{
                width: '100%',
                padding: '12px 12px 12px 30px',
                borderRadius: '10px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.3)',
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
              }}
            />
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Description (optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Amazon voucher on iShop"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(0,0,0,0.3)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid var(--glass-border)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              flex: 2,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #22c55e, #06b6d4)',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Add Savings
          </button>
        </div>
      </form>
    </div>
  );
};

// Simple Bar Chart Component
const SavingsChart = ({ data, maxValue }) => {
  const max = maxValue || Math.max(...data.map(d => d.amount), 1);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: '8px',
      height: '120px',
      padding: '0 8px',
    }}>
      {data.map((item, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '100%',
              background: item.amount > 0
                ? 'linear-gradient(180deg, #06b6d4, #8b5cf6)'
                : 'rgba(255,255,255,0.1)',
              borderRadius: '6px 6px 0 0',
              height: `${Math.max(4, (item.amount / max) * 100)}px`,
              transition: 'height 0.3s ease',
            }}
          />
          <span style={{
            fontSize: '0.65rem',
            color: 'var(--text-secondary)',
          }}>
            {item.month}
          </span>
        </div>
      ))}
    </div>
  );
};

// Main Dashboard Component
const SavingsDashboard = () => {
  const {
    savingsHistory,
    currentMonthSavings,
    chartData,
    addSaving,
  } = useSavingsTracker();

  const [showAddModal, setShowAddModal] = useState(false);

  // Calculate totals by category
  const categoryTotals = useMemo(() => {
    const totals = {};
    savingsHistory.forEach(entry => {
      totals[entry.category] = (totals[entry.category] || 0) + entry.amount;
    });
    return totals;
  }, [savingsHistory]);

  const totalSavings = savingsHistory.reduce((sum, entry) => sum + entry.amount, 0);

  // Potential savings calculator (simplified)
  const potentialMonthlySavings = 5000; // Could be calculated from user's cards/spending

  return (
    <div style={{ padding: '1rem 0 4rem' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>
          💰 Savings Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
          Track your savings from vouchers, cashback, and card rewards
        </p>
      </header>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Top Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {/* This Month */}
          <div
            className="glass-panel"
            style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(6,182,212,0.1))',
              borderColor: 'rgba(34,197,94,0.3)',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              This Month
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#22c55e',
            }}>
              ₹{currentMonthSavings.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </div>
          </div>

          {/* Total Savings */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              All-Time Savings
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              ₹{totalSavings.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {savingsHistory.length} transactions logged
            </div>
          </div>

          {/* Potential */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Potential Monthly
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#f59e0b',
            }}>
              ₹{potentialMonthlySavings.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Based on your cards
            </div>
          </div>
        </div>

        {/* Add Savings Button */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '14px 32px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #22c55e, #06b6d4)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(34, 197, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.3)';
            }}
          >
            + Log Savings
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Chart */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: 'var(--text-primary)' }}>
              📈 Last 6 Months
            </h3>
            <SavingsChart data={chartData} />
          </div>

          {/* Category Breakdown */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: 'var(--text-primary)' }}>
              📊 By Category
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SAVINGS_CATEGORIES.map(cat => {
                const amount = categoryTotals[cat.key] || 0;
                const percentage = totalSavings > 0 ? (amount / totalSavings) * 100 : 0;

                return (
                  <div key={cat.key}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {cat.icon} {cat.label}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: cat.color, fontWeight: '600' }}>
                        ₹{amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: cat.color,
                        borderRadius: '3px',
                        transition: 'width 0.3s',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: 'var(--text-primary)' }}>
            📝 Recent Activity
          </h3>
          {savingsHistory.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
              <p style={{ margin: 0 }}>No savings logged yet. Start tracking your savings!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {savingsHistory.slice(0, 10).map(entry => {
                const cat = SAVINGS_CATEGORIES.find(c => c.key === entry.category);
                return (
                  <div
                    key={entry.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <span style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: `${cat?.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                    }}>
                      {cat?.icon}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {entry.description}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {new Date(entry.timestamp).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#22c55e',
                    }}>
                      +₹{entry.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tips */}
        <div style={{
          marginTop: '2rem',
          padding: '1.25rem',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '12px',
          borderLeft: '4px solid #8b5cf6',
        }}>
          <h3 style={{ margin: '0 0 0.75rem', color: 'var(--text-primary)', fontSize: '1rem' }}>
            💡 Maximize Your Savings
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <li>Buy vouchers on <strong style={{ color: '#06b6d4' }}>iShop</strong> with ICICI cards for up to 36% savings</li>
            <li>Use <strong style={{ color: '#22c55e' }}>HDFC SmartBuy</strong> for 10X rewards on travel bookings</li>
            <li>Stack voucher discounts with card cashback for maximum value</li>
            <li>Track all your savings here to see your total benefits!</li>
          </ul>
        </div>
      </div>

      {/* Add Modal */}
      <QuickAddSavings
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addSaving}
      />
    </div>
  );
};

export default SavingsDashboard;
