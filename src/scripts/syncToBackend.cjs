const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../data/creditCards.json');
const destPath = path.join(__dirname, '../../backend/creditCards.json');

try {
    const content = fs.readFileSync(srcPath, 'utf8');
    // Verify it is valid JSON
    const cards = JSON.parse(content);

    fs.writeFileSync(destPath, JSON.stringify(cards, null, 2));
    console.log(`Successfully synced ${cards.length} cards from JSON to JSON`);

} catch (err) {
    console.error('Error syncing data:', err);
    process.exit(1);
}
