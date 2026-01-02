import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simulate the environment for the potentially non-module JS file if needed, 
// or just try to import it if it's an ES module (it uses 'export const').
// Since the source is 'export const creditCards = [...]', dynamic import should work if package.json allows or we use .mjs

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.resolve(__dirname, '../src/data/creditCards.js');
const destPath = path.resolve(__dirname, '../backend/creditCards.json');

async function migrate() {
    console.log(`Reading from ${sourcePath}...`);

    try {
        // Dynamic import of the source file
        const module = await import(sourcePath);
        const data = module.creditCards;

        if (!Array.isArray(data)) {
            throw new Error('Exported "creditCards" is not an array.');
        }

        console.log(`Found ${data.length} cards.`);

        // Stringify with pretty printing
        const jsonContent = JSON.stringify(data, null, 2);

        console.log(`Writing to ${destPath}...`);
        fs.writeFileSync(destPath, jsonContent, 'utf8');

        console.log('Migration successful!');

    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
