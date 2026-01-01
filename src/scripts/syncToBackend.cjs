const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../data/creditCards.js');
const destPath = path.join(__dirname, '../../backend/creditCards.json');

try {
    let content = fs.readFileSync(srcPath, 'utf8');

    // Extract the array using regex to handle the ES module export
    // Assuming the file looks like "export const creditCards = [...]" or "const creditCards = [...]; export default creditCards;"
    // But based on previous views, it starts with "export const creditCards = ["

    const startIndex = content.indexOf('[');
    const endIndex = content.lastIndexOf(']') + 1;

    if (startIndex === -1 || endIndex === 0) {
        throw new Error('Could not find array in creditCards.js');
    }

    const arrayString = content.slice(startIndex, endIndex);

    // Use eval to parse the JS array (including comments, unquoted keys if any, though JSON usually strictly quoted)
    // Since it's a data file, eval is acceptable for this build script
    const cards = eval(arrayString);

    // Write to JSON
    fs.writeFileSync(destPath, JSON.stringify(cards, null, 2));
    console.log(`Successfully synced ${cards.length} cards to ${destPath}`);

} catch (err) {
    console.error('Error syncing data:', err);
    process.exit(1);
}
