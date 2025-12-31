import { creditCards } from './src/data/creditCards.js';
import fs from 'fs';
import path from 'path';

// Output to a file in the backend directory that the management command can read
// We assume execution from project root
const outputPath = path.resolve('backend/backend/credit_cards/management/commands/credit_cards.json');

fs.writeFileSync(outputPath, JSON.stringify(creditCards, null, 2));
console.log(`Converted creditCards.js to ${outputPath}`);
