import { useState, useMemo, useEffect } from 'react';

/**
 * MilestoneTracker - Track spending goals for fee waivers & bonus rewards
 * Shows progress towards milestones like "₹15K more to waive annual fee"
 */

const CARD_MILESTONES = {
  'HDFC Infinia Metal': {
    milestones: [
      { 
        type: 'quarterly', 
        target: 150000, 
        reward: '15,000 bonus points',
        description: 'Quarterly milestone bonus',
      },
      { 
        type: 'annual', 
        target: 800000, 
        reward: '₹6,000 SmartBuy voucher',
        description: 'Annual spend benefit',
      },
      { 
        type: 'annual', 
        target: 1000000, 
        reward: 'Annual fee waiver',
        description: 'Fee waiver on ₹10L spend',
      },
    ],
    annualFee: 12500,
  },
  'HDFC Regalia Credit Card': {
    milestones: [
      { 
        type: 'annual', 
        target: 300000, 
        reward: 'Annual fee waiver',
        description: 'Fee waiver on ₹3L spend',
      },
    ],
    annualFee: 2500,
  },
  'Axis Magnus Credit Card': {
    milestones: [
      { 
        type: 'monthly', 
        target: 100000, 
        reward: 'Tier 2 unlock (35 EP/₹200)',
        description: 'Monthly spend for better rewards',
      },
      { 
        type: 'annual', 
        target: 1500000, 
        reward: 'Annual fee waiver',
        description: 'Fee waiver on ₹15L spend',
      },
    ],
    annualFee: 12500,
  },
  'ICICI Emeralde Private Metal': {
    milestones: [
      { 
        type: 'annual', 
        target: 800000, 
        reward: '₹6,000 EaseMyTrip vouchers',
        description: 'Annual spend benefit',
      },
      { 
        type: 'annual', 
        target: 1000000, 
        reward: 'Annual fee waiver',
        description: 'Fee waiver on ₹10L spend',
      },
    ],
    annualFee: 14749,
  },
  'SBI Cashback Credit Card': {
    milestones: [
      { 
        type: 'annual', 
        target: 200000, 
        reward: 'Annual fee waiver',
        description: 'Fee waiver on ₹2L spend',
      },
    ],
    annualFee: 999,
  },
  'Axis Atlas Credit Card': {
    milestones: [
      { 
        type: 'annual', 
        target: 900000, 
        reward: '25,000 bonus miles',
        description: 'Annual milestone benefit',
      },
      { 
        type: 'annual', 
        target: 1500000, 
        reward: 'Annual fee waiver',
        description: 'Fee waiver on ₹15L spend',
      },
    ],
    annualFee: 5000,
  },
  'HDFC Diners Club Black Metal': {
    milestones: [
      { 
        type: 'annual', 
        target: 500000, 
        reward: '₹5,000 bonus voucher',
        description: 'Annual milestone benefit',
      },
      { 
        type: 'annual', 
        target: 800000, 
        reward: 'Annual fee waiver',
        description: 'Fee waiver on ₹8L spend',
      },
    ],
    annualFee: 10000,
  },
  'Amazon Pay ICICI': {
    milestones: [
      { 
        type: 'info', 
        target: 0, 
        reward: 'Lifetime Free',
        description: 'No milestones needed - LTF card!',
      },
    ],
    annualFee: 0,
  },
};

const MilestoneTracker = () => {
  const [trackedCards, setTrackedCards] = useState([]);
  const [cardSpends, setCardSpends] = useState({});
  const [showAddCard, setShowAddCard] = useState(false);
  const [activeTab, setActiveTab] = useState('progress'); // 'progress' | 'calendar'

  // Load from localStorage
  useEffect(() => {
    const savedCards = localStorage.getItem('trackedMilestoneCards');
    const savedSpends = localStorage.getItem('cardMilestoneSpends');
    if (savedCards) setTrackedCards(JSON.parse(savedCards));
    if (savedSpends) setCardSpends(JSON.parse(savedSpends));
  }, []);

  // Save to localStorage
  const saveData = (cards, spends) => {
    localStorage.setItem('trackedMilestoneCards', JSON.stringify(cards));
    localStorage.setItem('cardMilestoneSpends', JSON.stringify(spends));
  };

  const addCard = (cardName) => {
    if (!trackedCards.includes(cardName)) {
      const newCards = [...trackedCards, cardName];
      const newSpends = { ...cardSpends, [cardName]: { monthly: 0, quarterly: 0, annual: 0, lastUpdated: new Date().toISOString() } };
      setTrackedCards(newCards);
      setCardSpends(newSpends);
      saveData(newCards, newSpends);
    }
    setShowAddCard(false);
  };

  const removeCard = (cardName) => {
    const newCards = trackedCards.filter(c => c !== cardName);
    const newSpends = { ...cardSpends };
    delete newSpends[cardName];
    setTrackedCards(newCards);
    setCardSpends(newSpends);
    saveData(newCards, newSpends);
  };

  const updateSpend = (cardName, period, value) => {
    const newSpends = {
      ...cardSpends,
      [cardName]: {
        ...cardSpends[cardName],
        [period]: parseInt(value) || 0,
        lastUpdated: new Date().toISOString(),
      },
    };
    setCardSpends(newSpends);
    saveData(trackedCards, newSpends);
  };

  // Calculate days remaining in period
  const getDaysRemaining = (type) => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const endOfQuarter = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3 + 3, 0);
    const endOfYear = new Date(now.getFullYear(), 11, 31);

    switch (type) {
      case 'monthly': return Math.ceil((endOfMonth - now) / (1000 * 60 * 60 * 24));
      case 'quarterly': return Math.ceil((endOfQuarter - now) / (1000 * 60 * 60 * 24));
      case 'annual': return Math.ceil((endOfYear - now) / (1000 * 60 * 60 * 24));
      default: return 0;
    }
  };

  const availableCards = Object.keys(CARD_MILESTONES).filter(
    card => !trackedCards.includes(card)
  );

  return (
    <div style={{ padding: '1rem 0 4rem' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>
          🎯 Milestone Tracker
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
          Track your spending progress towards fee waivers and bonus rewards
        </p>
      </header>

      {/* Tab Switcher */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '2rem',
      }}>
        {[
          { id: 'progress', label: '📊 Progress', icon: '📊' },
          { id: 'calendar', label: '📅 Calendar', icon: '📅' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: activeTab === tab.id
                ? '1px solid var(--accent-cyan)'
                : '1px solid var(--glass-border)',
              background: activeTab === tab.id
                ? 'rgba(6, 182, 212, 0.15)'
                : 'rgba(255,255,255,0.05)',
              color: activeTab === tab.id
                ? 'var(--accent-cyan)'
                : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab.id ? '600' : '400',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Add Card Button */}
      <div style={{ maxWidth: '900px', margin: '0 auto 1.5rem', textAlign: 'right', padding: '0 1rem' }}>
        <button
          onClick={() => setShowAddCard(!showAddCard)}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: '1px solid var(--accent-cyan)',
            background: 'rgba(6, 182, 212, 0.1)',
            color: 'var(--accent-cyan)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
          }}
        >
          {showAddCard ? '✕ Close' : '+ Track a Card'}
        </button>
      </div>

      {/* Add Card Panel */}
      {showAddCard && (
        <div 
          className="glass-panel"
          style={{
            maxWidth: '900px',
            margin: '0 auto 1.5rem',
            padding: '1.5rem',
          }}
        >
          <h3 style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>
            Select a card to track
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {availableCards.map(card => (
              <button
                key={card}
                onClick={() => addCard(card)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.background = 'rgba(6,182,212,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                {card}
              </button>
            ))}
            {availableCards.length === 0 && (
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                All available cards are already being tracked!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Calendar View */}
      {activeTab === 'calendar' && (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', color: 'var(--text-primary)' }}>
              📅 Milestone Deadlines
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {/* End of Month */}
              <div style={{
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
              }}>
                <div style={{ fontSize: '0.8rem', color: '#f87171', marginBottom: '4px' }}>
                  Monthly Reset
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {getDaysRemaining('monthly')} days
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Axis Magnus Tier 2
                </div>
              </div>

              {/* End of Quarter */}
              <div style={{
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}>
                <div style={{ fontSize: '0.8rem', color: '#fbbf24', marginBottom: '4px' }}>
                  Quarterly Reset
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {getDaysRemaining('quarterly')} days
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  HDFC Infinia quarterly bonus
                </div>
              </div>

              {/* End of Year */}
              <div style={{
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
              }}>
                <div style={{ fontSize: '0.8rem', color: '#4ade80', marginBottom: '4px' }}>
                  Annual Reset
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {getDaysRemaining('annual')} days
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Fee waivers & annual benefits
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress View - Card List */}
      {activeTab === 'progress' && (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          {trackedCards.length === 0 ? (
            <div 
              className="glass-panel"
              style={{
                padding: '3rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                No cards tracked yet
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Add your credit cards to track milestones and fee waivers
              </p>
              <button
                onClick={() => setShowAddCard(true)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                }}
              >
                + Track Your First Card
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {trackedCards.map(cardName => {
                const cardData = CARD_MILESTONES[cardName];
                const spends = cardSpends[cardName] || { monthly: 0, quarterly: 0, annual: 0 };

                return (
                  <div 
                    key={cardName}
                    className="glass-panel"
                    style={{ padding: '1.5rem' }}
                  >
                    {/* Card Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '1.5rem',
                    }}>
                      <div>
                        <h3 style={{ margin: '0 0 4px', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                          {cardName}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          Annual Fee: ₹{cardData.annualFee.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button
                        onClick={() => removeCard(cardName)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#f87171',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                        }}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Spend Inputs */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      padding: '1rem',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '12px',
                    }}>
                      {['monthly', 'quarterly', 'annual'].map(period => (
                        <div key={period}>
                          <label style={{ 
                            display: 'block', 
                            fontSize: '0.75rem', 
                            color: 'var(--text-secondary)',
                            marginBottom: '4px',
                            textTransform: 'capitalize',
                          }}>
                            {period} Spend
                          </label>
                          <div style={{ position: 'relative' }}>
                            <span style={{
                              position: 'absolute',
                              left: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              color: 'var(--text-secondary)',
                            }}>₹</span>
                            <input
                              type="number"
                              value={spends[period] || ''}
                              onChange={(e) => updateSpend(cardName, period, e.target.value)}
                              placeholder="0"
                              style={{
                                width: '100%',
                                padding: '10px 10px 10px 26px',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'var(--text-primary)',
                                fontSize: '0.95rem',
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Milestones */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {cardData.milestones.map((milestone, idx) => {
                        const currentSpend = spends[milestone.type] || 0;
                        const progress = milestone.target > 0 
                          ? Math.min(100, (currentSpend / milestone.target) * 100) 
                          : 100;
                        const remaining = Math.max(0, milestone.target - currentSpend);
                        const isCompleted = progress >= 100;
                        const daysLeft = getDaysRemaining(milestone.type);

                        return (
                          <div
                            key={idx}
                            style={{
                              padding: '1rem',
                              borderRadius: '12px',
                              background: isCompleted 
                                ? 'rgba(34, 197, 94, 0.1)' 
                                : 'rgba(255,255,255,0.03)',
                              border: `1px solid ${isCompleted ? 'rgba(34,197,94,0.3)' : 'var(--glass-border)'}`,
                            }}
                          >
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'flex-start',
                              marginBottom: '8px',
                            }}>
                              <div>
                                <div style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '8px',
                                  marginBottom: '2px',
                                }}>
                                  <span style={{
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    background: milestone.type === 'monthly' 
                                      ? 'rgba(239,68,68,0.2)' 
                                      : milestone.type === 'quarterly'
                                        ? 'rgba(245,158,11,0.2)'
                                        : 'rgba(34,197,94,0.2)',
                                    color: milestone.type === 'monthly'
                                      ? '#f87171'
                                      : milestone.type === 'quarterly'
                                        ? '#fbbf24'
                                        : '#4ade80',
                                    fontSize: '0.65rem',
                                    textTransform: 'uppercase',
                                    fontWeight: '600',
                                  }}>
                                    {milestone.type}
                                  </span>
                                  <span style={{ 
                                    fontWeight: '600', 
                                    color: 'var(--text-primary)',
                                    fontSize: '0.95rem',
                                  }}>
                                    {milestone.reward}
                                  </span>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                  {milestone.description}
                                </div>
                              </div>
                              {milestone.type !== 'info' && (
                                <div style={{ 
                                  textAlign: 'right',
                                  fontSize: '0.75rem',
                                  color: 'var(--text-secondary)',
                                }}>
                                  {daysLeft} days left
                                </div>
                              )}
                            </div>

                            {milestone.type !== 'info' && (
                              <>
                                {/* Progress Bar */}
                                <div style={{
                                  height: '8px',
                                  background: 'rgba(0,0,0,0.3)',
                                  borderRadius: '4px',
                                  overflow: 'hidden',
                                  marginBottom: '8px',
                                }}>
                                  <div style={{
                                    height: '100%',
                                    width: `${progress}%`,
                                    background: isCompleted 
                                      ? 'linear-gradient(90deg, #22c55e, #4ade80)'
                                      : 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                                    borderRadius: '4px',
                                    transition: 'width 0.3s ease',
                                  }} />
                                </div>

                                {/* Progress Text */}
                                <div style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between',
                                  fontSize: '0.8rem',
                                }}>
                                  <span style={{ color: 'var(--text-secondary)' }}>
                                    ₹{currentSpend.toLocaleString('en-IN')} / ₹{milestone.target.toLocaleString('en-IN')}
                                  </span>
                                  {isCompleted ? (
                                    <span style={{ color: '#22c55e', fontWeight: '600' }}>
                                      ✅ Achieved!
                                    </span>
                                  ) : (
                                    <span style={{ color: '#f59e0b' }}>
                                      ₹{remaining.toLocaleString('en-IN')} to go
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MilestoneTracker;
