// Script to add expiry data to all vouchers
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vouchersPath = path.join(__dirname, '../src/data/vouchers.json');
const vouchers = JSON.parse(fs.readFileSync(vouchersPath, 'utf8'));

// Define expiry days by category (realistic values)
const expiryDaysByCategory = {
  'Shopping': [180, 270, 365, 365, 365], // Most shopping vouchers last 1 year
  'Food & Dining': [90, 120, 180, 180], // Food vouchers 3-6 months
  'Travel': [365, 365, 540, 730], // Travel vouchers 1-2 years
  'Fashion': [180, 270, 365, 365], // Fashion vouchers 6-12 months
  'Electronics': [180, 270, 365, 365], // Electronics vouchers 6-12 months
  'Entertainment': [180, 270, 365], // Entertainment 6-12 months
  'Health & Wellness': [180, 270, 365], // Health 6-12 months
  'Grocery': [90, 120, 180], // Grocery 3-6 months
  'Services': [180, 270, 365], // Services 6-12 months
  'Fuel': [90, 180, 270], // Fuel 3-9 months
  'Education': [365, 365, 540], // Education 1-1.5 years
  'Beauty': [180, 270, 365], // Beauty 6-12 months
  'Fitness': [180, 270, 365], // Fitness 6-12 months
  'default': [180, 270, 365] // Default 6-12 months
};

// Generate random lastUpdated date (within last 30 days)
function getRandomRecentDate() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30); // 0-30 days ago
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Get random expiry days for a category
function getRandomExpiryDays(category) {
  const options = expiryDaysByCategory[category] || expiryDaysByCategory['default'];
  return options[Math.floor(Math.random() * options.length)];
}

// Add expiry data to each voucher
let updatedCount = 0;
vouchers.forEach(voucher => {
  if (!voucher.expiryDays || !voucher.lastUpdated) {
    voucher.expiryDays = getRandomExpiryDays(voucher.category);
    voucher.lastUpdated = getRandomRecentDate();
    updatedCount++;
  }
});

// Write updated vouchers back to file
fs.writeFileSync(vouchersPath, JSON.stringify(vouchers, null, 4), 'utf8');

console.log(`✅ Successfully added expiry data to ${updatedCount} vouchers!`);
console.log(`📊 Total vouchers: ${vouchers.length}`);
console.log(`📅 Last updated dates: within last 30 days`);
console.log(`⏰ Expiry days: based on category (90-730 days)`);
