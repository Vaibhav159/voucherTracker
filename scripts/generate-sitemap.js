import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import data directly from JSON files
// relative to this script in scripts/ folder
const vouchersPath = path.resolve(__dirname, '../src/data/vouchers.json');
const cardsPath = path.resolve(__dirname, '../src/data/creditCards.json');

const vouchers = JSON.parse(fs.readFileSync(vouchersPath, 'utf8'));
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));

const BASE_URL = 'https://cardperks.xyz';
const OUTPUT_FILE = path.resolve(__dirname, '../public/sitemap.xml');

// Static routes
const staticRoutes = [
  '/',
  '/guides',
  '/know-your-cards',
  '/compare-cards',
  '/browse-banking',
  '/compare-banking',
  '/rewards-calculator',
  '/points-converter',
  '/ask-ai', // Feature flagged but good to index if available or will 404 cleanly
  '/favorites',
  '/spend-optimizer',
  '/milestones',
  '/savings',
  '/my-cards',
];

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  staticRoutes.forEach(route => {
    xml += `
  <url>
    <loc>${BASE_URL}/${route === '/' ? '' : route.substring(1)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  //  // Add Voucher routes
  //  vouchers.forEach(voucher => {
  //    xml += `
  //  <url>
  //    <loc>${BASE_URL}/voucher/${voucher.id}</loc>
  //    <lastmod>${today}</lastmod>
  //    <changefreq>weekly</changefreq>
  //    <priority>0.7</priority>
  //  </url>`;
  //  });

  // Add Credit Card Guide routes
  cards.forEach(card => {
    // Fallback to id if slug is missing, matching component logic
    const slug = card.slug || card.id;
    xml += `
  <url>
    <loc>${BASE_URL}/card-guide/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`✅ Sitemap generated at ${OUTPUT_FILE}`);
  console.log(`   - ${staticRoutes.length} static routes`);
  console.log(`   - ${vouchers.length} voucher routes`);
  console.log(`   - ${cards.length} card routes`);
};

try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
