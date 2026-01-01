import { creditCards } from './src/data/creditCards.js';

console.log('Total cards:', creditCards.length);

const missingCalc = creditCards.filter(c => !c.rewards?.calculator);
console.log('\nCards missing calculator data (' + missingCalc.length + '):');
missingCalc.forEach(c => console.log(' - ' + c.name));

const flatRates = creditCards.filter(c => {
    if (!c.rewards?.calculator?.categories) return false;
    const cats = c.rewards.calculator.categories;
    const base = c.rewards.baseRate || 0;

    // Check key categories
    const relevantCats = ['online', 'dining', 'travel', 'groceries'];
    let hasAcceleration = false;

    for (const cat of relevantCats) {
        if (cats[cat] && cats[cat].rate > base) {
            hasAcceleration = true;
            break;
        }
    }

    return !hasAcceleration;
});

console.log('\nCards with flat rates (no acceleration logic found in calculator) (' + flatRates.length + '):');
flatRates.slice(0, 10).forEach(c => console.log(' - ' + c.name + ` (Base: ${c.rewards.baseRate})`));
if (flatRates.length > 10) console.log('...and ' + (flatRates.length - 10) + ' more');
