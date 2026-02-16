import { useState, useMemo } from 'react';
import { useMyCards } from '../context/MyCardsContext';

const CATEGORIES = [
    'Shopping',
    'Food & Dining',
    'Travel',
    'Bills & Utilities',
    'Entertainment',
    'Health',
    'Groceries',
    'Fuel',
    'EMI',
    'Other',
];

const CATEGORY_ICONS = {
    'Shopping': '🛍️',
    'Food & Dining': '🍽️',
    'Travel': '✈️',
    'Bills & Utilities': '📱',
    'Entertainment': '🎬',
    'Health': '💊',
    'Groceries': '🛒',
    'Fuel': '⛽',
    'EMI': '🏦',
    'Other': '📋',
};

const getToday = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
};

const emptyForm = {
    date: getToday(),
    platform: '',
    amount: '',
    category: 'Shopping',
    reason: '',
};

const CardExpenses = ({ card, onClose }) => {
    const {
        getExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        getCardTotalSpend,
    } = useMyCards();

    const [form, setForm] = useState({ ...emptyForm });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const expenses = getExpenses(card.id);
    const totalSpend = getCardTotalSpend(card.id);

    const filteredExpenses = useMemo(() => {
        let list = [...expenses];
        if (filterCategory !== 'all') {
            list = list.filter(e => e.category === filterCategory);
        }
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
        return list;
    }, [expenses, filterCategory]);

    // Category spend breakdown
    const categoryBreakdown = useMemo(() => {
        const breakdown = {};
        expenses.forEach(exp => {
            const cat = exp.category || 'Other';
            breakdown[cat] = (breakdown[cat] || 0) + (Number(exp.amount) || 0);
        });
        return Object.entries(breakdown)
            .sort(([, a], [, b]) => b - a);
    }, [expenses]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.platform.trim() || !form.amount) return;

        if (editingId) {
            updateExpense(card.id, editingId, {
                date: form.date,
                platform: form.platform.trim(),
                amount: Number(form.amount),
                category: form.category,
                reason: form.reason.trim(),
            });
            setEditingId(null);
        } else {
            addExpense(card.id, {
                date: form.date,
                platform: form.platform.trim(),
                amount: Number(form.amount),
                category: form.category,
                reason: form.reason.trim(),
            });
        }

        setForm({ ...emptyForm });
        setShowForm(false);
    };

    const handleEdit = (exp) => {
        setForm({
            date: exp.date,
            platform: exp.platform,
            amount: exp.amount,
            category: exp.category,
            reason: exp.reason || '',
        });
        setEditingId(exp.id);
        setShowForm(true);
    };

    const handleDelete = (expId) => {
        deleteExpense(card.id, expId);
        setDeleteConfirmId(null);
    };

    const handleCancel = () => {
        setForm({ ...emptyForm });
        setEditingId(null);
        setShowForm(false);
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="ce-overlay" onClick={onClose}>
            <div className="ce-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="ce-header">
                    <div className="ce-header-info">
                        <h2>{card.name}</h2>
                        <span className="ce-header-bank">{card.bank}</span>
                    </div>
                    <div className="ce-header-right">
                        <div className="ce-total-spend">
                            <span className="ce-total-label">Total Spend</span>
                            <span className="ce-total-value">₹{totalSpend.toLocaleString('en-IN')}</span>
                        </div>
                        <button className="ce-close-btn" onClick={onClose}>✕</button>
                    </div>
                </div>

                {/* Category Breakdown (compact) */}
                {categoryBreakdown.length > 0 && (
                    <div className="ce-breakdown">
                        {categoryBreakdown.slice(0, 5).map(([cat, amount]) => (
                            <div key={cat} className="ce-breakdown-chip">
                                <span>{CATEGORY_ICONS[cat] || '📋'}</span>
                                <span className="ce-breakdown-cat">{cat}</span>
                                <span className="ce-breakdown-amt">₹{amount.toLocaleString('en-IN')}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Toolbar */}
                <div className="ce-toolbar">
                    <div className="ce-toolbar-left">
                        <select
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                            className="ce-filter-select"
                        >
                            <option value="all">All Categories</option>
                            {CATEGORIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <span className="ce-count">{filteredExpenses.length} transaction{filteredExpenses.length !== 1 ? 's' : ''}</span>
                    </div>
                    {!showForm && (
                        <button className="ce-add-btn" onClick={() => setShowForm(true)}>
                            + Add Expense
                        </button>
                    )}
                </div>

                {/* Add/Edit Form */}
                {showForm && (
                    <form className="ce-form" onSubmit={handleSubmit}>
                        <div className="ce-form-title">{editingId ? '✏️ Edit Expense' : '➕ New Expense'}</div>
                        <div className="ce-form-grid">
                            <div className="ce-field">
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={form.date}
                                    onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="ce-field">
                                <label>Platform / Merchant</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Amazon, Swiggy"
                                    value={form.platform}
                                    onChange={e => setForm(p => ({ ...p, platform: e.target.value }))}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="ce-field">
                                <label>Amount (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                    value={form.amount}
                                    onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="ce-field">
                                <label>Category</label>
                                <select
                                    value={form.category}
                                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                                >
                                    {CATEGORIES.map(c => (
                                        <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="ce-field ce-field-wide">
                                <label>Reason / Note</label>
                                <input
                                    type="text"
                                    placeholder="Optional note"
                                    value={form.reason}
                                    onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="ce-form-actions">
                            <button type="button" className="ce-cancel-btn" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="ce-save-btn">
                                {editingId ? 'Update' : 'Add Expense'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Transaction List */}
                <div className="ce-list">
                    {filteredExpenses.length === 0 ? (
                        <div className="ce-empty">
                            <div className="ce-empty-icon">📊</div>
                            <p>No expenses logged yet</p>
                            <span>Start tracking your spending on this card</span>
                        </div>
                    ) : (
                        filteredExpenses.map(exp => (
                            <div key={exp.id} className="ce-row">
                                <div className="ce-row-left">
                                    <div className="ce-row-icon">{CATEGORY_ICONS[exp.category] || '📋'}</div>
                                    <div className="ce-row-details">
                                        <div className="ce-row-top">
                                            <span className="ce-row-platform">{exp.platform}</span>
                                            <span className="ce-row-cat">{exp.category}</span>
                                        </div>
                                        <div className="ce-row-bottom">
                                            <span className="ce-row-date">{formatDate(exp.date)}</span>
                                            {exp.reason && <span className="ce-row-reason">{exp.reason}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="ce-row-right">
                                    <span className="ce-row-amount">₹{Number(exp.amount).toLocaleString('en-IN')}</span>
                                    <div className="ce-row-actions">
                                        <button className="ce-act-btn edit" onClick={() => handleEdit(exp)} title="Edit">✏️</button>
                                        {deleteConfirmId === exp.id ? (
                                            <div className="ce-delete-confirm">
                                                <button className="ce-act-btn confirm-yes" onClick={() => handleDelete(exp.id)}>Yes</button>
                                                <button className="ce-act-btn confirm-no" onClick={() => setDeleteConfirmId(null)}>No</button>
                                            </div>
                                        ) : (
                                            <button className="ce-act-btn delete" onClick={() => setDeleteConfirmId(exp.id)} title="Delete">🗑️</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style>{`
        /* ========================================
           CARD EXPENSES MODAL - GLASSMORPHISM
           ======================================== */

        .ce-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: var(--z-modal, 10000);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: ceOverlayIn 0.2s ease;
        }

        @keyframes ceOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .ce-modal {
          width: 100%;
          max-width: 720px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          background: var(--modal-bg, #0a0a0a);
          border: 1px solid var(--glass-border, rgba(255,255,255,0.08));
          border-radius: 20px;
          overflow: hidden;
          animation: ceModalIn 0.25s ease;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
        }

        @keyframes ceModalIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ===== HEADER ===== */
        .ce-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.08));
          border-bottom: 1px solid var(--glass-border, rgba(255,255,255,0.08));
          gap: 1rem;
        }

        .ce-header-info h2 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary, #fff);
        }

        .ce-header-bank {
          font-size: 0.85rem;
          color: var(--text-secondary, #94a3b8);
          font-weight: 500;
        }

        .ce-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ce-total-spend {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .ce-total-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary, #94a3b8);
          font-weight: 600;
        }

        .ce-total-value {
          font-size: 1.35rem;
          font-weight: 800;
          color: #f59e0b;
          text-shadow: 0 0 16px rgba(245, 158, 11, 0.3);
        }

        .ce-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--glass-border, rgba(255,255,255,0.08));
          background: rgba(255,255,255,0.05);
          color: var(--text-secondary, #94a3b8);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .ce-close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.4);
          color: #ef4444;
        }

        /* ===== CATEGORY BREAKDOWN ===== */
        .ce-breakdown {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          overflow-x: auto;
          border-bottom: 1px solid var(--glass-border, rgba(255,255,255,0.06));
          scrollbar-width: none;
        }

        .ce-breakdown::-webkit-scrollbar { display: none; }

        .ce-breakdown-chip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.75rem;
          background: var(--item-bg, rgba(255,255,255,0.02));
          border: 1px solid var(--glass-border, rgba(255,255,255,0.06));
          border-radius: 20px;
          white-space: nowrap;
          font-size: 0.78rem;
        }

        .ce-breakdown-cat {
          color: var(--text-secondary, #94a3b8);
          font-weight: 500;
        }

        .ce-breakdown-amt {
          color: var(--text-primary, #fff);
          font-weight: 700;
        }

        /* ===== TOOLBAR ===== */
        .ce-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          border-bottom: 1px solid var(--glass-border, rgba(255,255,255,0.06));
          gap: 0.75rem;
        }

        .ce-toolbar-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .ce-filter-select {
          background: var(--item-bg, rgba(255,255,255,0.05));
          border: 1px solid var(--glass-border, rgba(255,255,255,0.08));
          border-radius: 8px;
          padding: 0.5rem 0.75rem;
          color: var(--text-primary, #fff);
          font-size: 0.82rem;
          font-family: inherit;
          cursor: pointer;
        }

        .ce-filter-select option {
          background: var(--modal-bg, #0a0a0a);
          color: var(--text-primary, #fff);
        }

        .ce-count {
          font-size: 0.8rem;
          color: var(--text-secondary, #94a3b8);
          font-weight: 500;
        }

        .ce-add-btn {
          padding: 0.5rem 1.25rem;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          white-space: nowrap;
        }

        .ce-add-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        /* ===== FORM ===== */
        .ce-form {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--glass-border, rgba(255,255,255,0.06));
          background: linear-gradient(180deg, rgba(99, 102, 241, 0.04), transparent);
          animation: ceSlideDown 0.2s ease;
        }

        @keyframes ceSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ce-form-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary, #fff);
          margin-bottom: 0.75rem;
        }

        .ce-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .ce-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .ce-field-wide {
          grid-column: 1 / -1;
        }

        .ce-field label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-secondary, #94a3b8);
          font-weight: 600;
        }

        .ce-field input,
        .ce-field select {
          padding: 0.6rem 0.75rem;
          background: var(--item-bg, rgba(255,255,255,0.05));
          border: 1px solid var(--glass-border, rgba(255,255,255,0.1));
          border-radius: 8px;
          color: var(--text-primary, #fff);
          font-size: 0.88rem;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .ce-field input:focus,
        .ce-field select:focus {
          outline: none;
          border-color: rgba(99, 102, 241, 0.5);
        }

        .ce-field input::placeholder {
          color: var(--text-secondary, rgba(148,163,184,0.5));
        }

        .ce-field select option {
          background: var(--modal-bg, #0a0a0a);
        }

        .ce-form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 0.75rem;
        }

        .ce-cancel-btn {
          padding: 0.5rem 1.25rem;
          background: var(--item-bg, rgba(255,255,255,0.05));
          border: 1px solid var(--glass-border, rgba(255,255,255,0.1));
          border-radius: 8px;
          color: var(--text-secondary, #94a3b8);
          font-size: 0.85rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ce-cancel-btn:hover {
          background: rgba(255,255,255,0.1);
          color: var(--text-primary, #fff);
        }

        .ce-save-btn {
          padding: 0.5rem 1.5rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border: none;
          border-radius: 8px;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
        }

        .ce-save-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(34, 197, 94, 0.35);
        }

        /* ===== TRANSACTION LIST ===== */
        .ce-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem 0;
        }

        .ce-empty {
          text-align: center;
          padding: 3rem 2rem;
        }

        .ce-empty-icon {
          font-size: 3rem;
          margin-bottom: 0.75rem;
          opacity: 0.6;
        }

        .ce-empty p {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary, #fff);
        }

        .ce-empty span {
          font-size: 0.85rem;
          color: var(--text-secondary, #94a3b8);
        }

        .ce-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          border-bottom: 1px solid var(--glass-border, rgba(255,255,255,0.04));
          transition: background 0.15s;
          gap: 0.75rem;
        }

        .ce-row:last-child {
          border-bottom: none;
        }

        .ce-row:hover {
          background: rgba(99, 102, 241, 0.04);
        }

        .ce-row-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 0;
        }

        .ce-row-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--item-bg, rgba(255,255,255,0.05));
          border: 1px solid var(--glass-border, rgba(255,255,255,0.06));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .ce-row-details {
          flex: 1;
          min-width: 0;
        }

        .ce-row-top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ce-row-platform {
          font-weight: 600;
          color: var(--text-primary, #fff);
          font-size: 0.92rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ce-row-cat {
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          border-radius: 6px;
          background: var(--item-bg, rgba(255,255,255,0.06));
          color: var(--text-secondary, #94a3b8);
          font-weight: 600;
          white-space: nowrap;
        }

        .ce-row-bottom {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.15rem;
        }

        .ce-row-date {
          font-size: 0.78rem;
          color: var(--text-secondary, #94a3b8);
        }

        .ce-row-reason {
          font-size: 0.78rem;
          color: var(--text-secondary, rgba(148,163,184,0.7));
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ce-row-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .ce-row-amount {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary, #fff);
          white-space: nowrap;
        }

        .ce-row-actions {
          display: flex;
          gap: 0.25rem;
          opacity: 0.4;
          transition: opacity 0.2s;
        }

        .ce-row:hover .ce-row-actions {
          opacity: 1;
        }

        .ce-act-btn {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.82rem;
          transition: all 0.15s;
          padding: 0;
        }

        .ce-act-btn.edit:hover {
          background: rgba(99, 102, 241, 0.15);
        }

        .ce-act-btn.delete:hover {
          background: rgba(239, 68, 68, 0.15);
        }

        .ce-delete-confirm {
          display: flex;
          gap: 0.25rem;
        }

        .ce-act-btn.confirm-yes {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          font-size: 0.7rem;
          font-weight: 700;
          width: auto;
          padding: 0.2rem 0.5rem;
        }

        .ce-act-btn.confirm-no {
          background: rgba(255,255,255,0.05);
          color: var(--text-secondary, #94a3b8);
          font-size: 0.7rem;
          font-weight: 700;
          width: auto;
          padding: 0.2rem 0.5rem;
        }

        /* ===== LIGHT MODE ===== */
        [data-theme='light'] .ce-overlay {
          background: rgba(0, 0, 0, 0.4);
        }

        [data-theme='light'] .ce-modal {
          box-shadow: 0 24px 80px rgba(0,0,0,0.2);
        }

        [data-theme='light'] .ce-total-value {
          color: #d97706;
          text-shadow: none;
        }

        [data-theme='light'] .ce-row:hover {
          background: rgba(99, 102, 241, 0.06);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .ce-overlay {
            padding: 0;
            align-items: flex-end;
          }

          .ce-modal {
            max-height: 95vh;
            border-radius: 20px 20px 0 0;
            max-width: 100%;
          }

          .ce-header {
            padding: 1rem;
            flex-wrap: wrap;
          }

          .ce-header-info h2 {
            font-size: 1.05rem;
          }

          .ce-total-value {
            font-size: 1.1rem;
          }

          .ce-toolbar {
            padding: 0.6rem 1rem;
            flex-wrap: wrap;
          }

          .ce-form {
            padding: 0.75rem 1rem;
          }

          .ce-form-grid {
            grid-template-columns: 1fr;
          }

          .ce-row {
            padding: 0.75rem 1rem;
            flex-wrap: wrap;
          }

          .ce-row-left {
            width: 100%;
          }

          .ce-row-right {
            width: 100%;
            justify-content: space-between;
            padding-left: calc(36px + 0.75rem);
          }

          .ce-row-actions {
            opacity: 1;
          }

          .ce-breakdown {
            padding: 0.6rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .ce-header-right {
            gap: 0.5rem;
          }

          .ce-add-btn {
            padding: 0.45rem 0.9rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
        </div>
    );
};

export default CardExpenses;
