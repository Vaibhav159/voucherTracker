export const SPENDING_PRESETS = {
    student: { label: '🎓 Student', spending: { online: 3000, dining: 2000, fuel: 0, groceries: 1000, travel: 500, utilities: 500, other: 2000 } },
    family: { label: '👨‍👩‍👧‍👦 Family', spending: { online: 8000, dining: 5000, fuel: 4000, groceries: 10000, travel: 3000, utilities: 5000, other: 5000 } },
    professional: { label: '💼 Professional', spending: { online: 10000, dining: 8000, fuel: 5000, groceries: 5000, travel: 15000, utilities: 3000, other: 10000 } },
    minimal: { label: '🌿 Minimal', spending: { online: 2000, dining: 1000, fuel: 1000, groceries: 3000, travel: 0, utilities: 2000, other: 1000 } },
    traveler: { label: '✈️ Traveler', spending: { online: 5000, dining: 6000, fuel: 2000, groceries: 3000, travel: 25000, utilities: 2000, other: 7000 } },
    foodie: { label: '🍕 Foodie', spending: { online: 8000, dining: 15000, fuel: 2000, groceries: 5000, travel: 2000, utilities: 2000, other: 6000 } }
};

export const SPENDING_CATEGORIES = [
    { key: 'online', label: 'Online Shopping', icon: '🛒', color: '#8b5cf6' },
    { key: 'dining', label: 'Dining & Food', icon: '🍔', color: '#f59e0b' },
    { key: 'fuel', label: 'Fuel', icon: '⛽', color: '#ef4444' },
    { key: 'groceries', label: 'Groceries', icon: '🥬', color: '#22c55e' },
    { key: 'travel', label: 'Travel', icon: '✈️', color: '#06b6d4' },
    { key: 'utilities', label: 'Bills & Utilities', icon: '💡', color: '#3b82f6' },
    { key: 'other', label: 'Other Spends', icon: '💳', color: '#6b7280' }
];

export const BANKS = ['All Banks', 'HDFC Bank', 'Axis Bank', 'SBI Card', 'ICICI Bank', 'IDFC First Bank', 'American Express', 'AU Small Finance Bank', 'IndusInd Bank', 'Kotak Mahindra Bank', 'HSBC', 'RBL Bank', 'Yes Bank', 'Bank of Baroda', 'Federal Bank', 'Other'];
