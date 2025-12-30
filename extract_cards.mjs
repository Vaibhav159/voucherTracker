import fs from 'fs';
import { creditCards } from './src/data/creditCards.js';
fs.writeFileSync('backend/creditCards.json', JSON.stringify(creditCards, null, 2));
console.log('Extracted creditCards.json');
