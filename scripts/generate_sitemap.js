import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://vaibhav159.github.io/voucherTracker';
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

// Define your routes here
// Since it's a HashRouter app, we use /#/ prefix.
// Google CAN index hash URLs if they are in the sitemap or properly linked.
const routes = [
    '/',
    '/know-your-cards',
    '/compare-cards',
    '/guides',
    '/browse-banking',
    '/compare-banking',
    '/favorites',
    '/spend-optimizer',
    '/milestones',
    '/savings',
    '/my-cards',
    '/rewards-calculator',
    '/points-converter',
];

const generateSitemap = () => {
    const currentDate = new Date().toISOString().split('T')[0];

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => {
        // For HashRouter, the URL fragment is part of the URL.
        // However, technically standard sitemaps act on the path.
        // It is debated if Hashbangs are fully supported in standard sitemaps, 
        // but for SPA on GH Pages, this is a common workaround.
        // We will list the full URL including the hash.
        const url = `${BASE_URL}/#${route}`;
        return `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    }).join('\n')}
</urlset>`;

    fs.writeFileSync(OUTPUT_FILE, xmlContent);
    console.log(`Sitemap generated at ${OUTPUT_FILE}`);
};

generateSitemap();
