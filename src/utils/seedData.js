// Sample data seeding utility for testing Phase 6 features
// Run this once to populate sample reviews and price history

export const seedSampleData = () => {
  // Sample reviews for popular vouchers
  const sampleReviews = {
    'amazon': [
      {
        id: '1',
        voucherId: 'amazon',
        rating: 5,
        comment: 'Great discounts on Gyftr! Saved a lot on my purchase.',
        platform: 'Gyftr',
        userName: 'Raj K.',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        helpful: 5
      },
      {
        id: '2',
        voucherId: 'amazon',
        rating: 4,
        comment: 'Good experience overall. Delivery was instant.',
        platform: 'MobiKwik',
        userName: 'Priya S.',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        helpful: 3
      },
      {
        id: '3',
        voucherId: 'amazon',
        rating: 4.5,
        comment: 'Very convenient! The discount helped reduce the cost significantly.',
        platform: 'General',
        userName: 'Amit P.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        helpful: 8
      }
    ],
    'flipkart': [
      {
        id: '4',
        voucherId: 'flipkart',
        rating: 4,
        comment: 'Worked perfectly for my big sale purchase. Recommended!',
        platform: 'Gyftr',
        userName: 'Sneha M.',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        helpful: 2
      }
    ],
    'swiggy': [
      {
        id: '5',
        voucherId: 'swiggy',
        rating: 5,
        comment: 'Perfect for ordering food regularly. The discount adds up!',
        platform: 'Gyftr',
        userName: 'Rohit V.',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        helpful: 6
      }
    ]
  };

  // Sample price history (last 30 days)
  const samplePriceHistory = {};

  const generatePriceHistory = (voucherId, platforms) => {
    const history = [];
    const baseDiscount = Math.random() * 3 + 1; // 1-4%

    platforms.forEach(platform => {
      // Generate 10 historical points over last 30 days
      for (let i = 0; i < 10; i++) {
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
        const variance = (Math.random() - 0.5) * 1; // +/- 0.5%
        const discount = Math.max(0, baseDiscount + variance);

        history.push({
          date: date.toISOString(),
          platform: platform.name,
          discount: parseFloat(discount.toFixed(2))
        });
      }
    });

    return history.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // This is a placeholder - would need actual voucher data to seed properly
  samplePriceHistory['amazon'] = [
    { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), platform: 'Gyftr', discount: 2.5 },
    { date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), platform: 'Gyftr', discount: 2.8 },
    { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), platform: 'Gyftr', discount: 3.0 },
    { date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), platform: 'Gyftr', discount: 2.9 },
    { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), platform: 'Gyftr', discount: 3.2 },
    { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), platform: 'Gyftr', discount: 3.5 },
    { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), platform: 'Gyftr', discount: 3.3 },

    { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), platform: 'MobiKwik', discount: 2.0 },
    { date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), platform: 'MobiKwik', discount: 2.2 },
    { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), platform: 'MobiKwik', discount: 2.5 },
    { date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), platform: 'MobiKwik', discount: 2.3 },
    { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), platform: 'MobiKwik', discount: 2.7 },
    { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), platform: 'MobiKwik', discount: 3.0 },
    { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), platform: 'MobiKwik', discount: 2.8 }
  ];

  // Save to localStorage
  try {
    localStorage.setItem('voucherReviews', JSON.stringify(sampleReviews));
    localStorage.setItem('priceHistory', JSON.stringify(samplePriceHistory));
    console.log('✅ Sample data seeded successfully!');
    console.log('- Reviews:', Object.keys(sampleReviews).length, 'vouchers');
    console.log('- Price history:', Object.keys(samplePriceHistory).length, 'vouchers');
    return true;
  } catch (error) {
    console.error('❌ Failed to seed sample data:', error);
    return false;
  }
};

// Clear all sample data
export const clearSampleData = () => {
  try {
    localStorage.removeItem('voucherReviews');
    localStorage.removeItem('priceHistory');
    console.log('✅ Sample data cleared!');
    return true;
  } catch (error) {
    console.error('❌ Failed to clear sample data:', error);
    return false;
  }
};

// Check if sample data exists
export const hasSampleData = () => {
  try {
    const reviews = localStorage.getItem('voucherReviews');
    const history = localStorage.getItem('priceHistory');
    return !!(reviews || history);
  } catch (error) {
    return false;
  }
};
