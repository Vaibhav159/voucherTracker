# Voucher Tracker - Project Summary

> Upload this file to Claude for suggestions on what to improve.

## Overview
A community-driven platform to track shopping voucher caps, fees, and platforms for Indian users. Built with React 19 + Vite.

**Live Demo**: https://vaibhav159.github.io/voucherTracker/

---

## Tech Stack
- **Framework**: React 19.2.0, Vite 7.x
- **Routing**: React Router DOM v7 (HashRouter)
- **Search**: Fuse.js (fuzzy search)
- **Styling**: Vanilla CSS with design tokens, glassmorphism theme
- **Deployment**: GitHub Pages

---

## Project Structure

```
src/
├── components/           # 35 React components
│   ├── AskAI.jsx         # AI chatbot (72KB) - card/voucher recommendations
│   ├── BankingGuides.jsx # Wealth banking tiers comparison
│   ├── CreditCardComparison.jsx # Compare credit cards (104KB)
│   ├── PointsConverter.jsx # Convert reward points to value
│   ├── RewardsCalculator.jsx # Calculate card rewards
│   ├── Favorites.jsx     # Saved items
│   ├── Guides.jsx        # Shopping/redemption guides
│   ├── Layout.jsx        # Navigation, hamburger menu
│   ├── VoucherModal.jsx  # Voucher detail modal
│   └── ... (25+ more)
├── data/
│   ├── creditCards.js    # 100+ credit cards (132KB)
│   ├── vouchers.json     # 500+ vouchers (522KB)
│   ├── guides.json       # Shopping guides
│   ├── bankingPrograms.js # Wealth banking tiers
│   ├── pointsConversion.js # Points→value ratios
│   └── calculatorCards.js # Rewards calculator data
├── hooks/                # 8 custom hooks
│   ├── useFuzzySearch.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   └── ...
├── context/
│   ├── ThemeContext.jsx
│   └── FavoritesContext.jsx
└── styles/               # Modular CSS
```

---

## Current Features

### Core
- ✅ Voucher tracking with caps/fees across platforms (Amazon, Flipkart, Uber, etc.)
- ✅ Multi-platform comparison (Gyftr, iShop, Maximise, etc.)
- ✅ Fuzzy search with real-time filtering
- ✅ Credit card database (100+ cards with fees, rewards, lounges)
- ✅ Card comparison tool
- ✅ Rewards calculator (spending → points/cashback)
- ✅ Points value converter
- ✅ Ask AI chatbot for recommendations
- ✅ Banking guides (wealth tiers, NRV requirements)
- ✅ Favorites system
- ✅ Dark/Light theme toggle

### UX
- ✅ Mobile-friendly with hamburger menu
- ✅ Keyboard shortcuts (Cmd+K for search)
- ✅ Infinite scroll
- ✅ WCAG 2.1 AA accessibility
- ✅ PWA support

---

## Data Samples

### Credit Card (from creditCards.js)
```javascript
{
  id: "hdfc-infinia",
  name: "HDFC Infinia",
  bank: "HDFC",
  network: "Visa",
  tier: "super-premium",
  annualFee: 12500,
  welcomeBonus: "12,500 reward points",
  rewardRate: "3.3% SmartBuy, 5 RP/₹150",
  loungeAccess: "Unlimited domestic & international",
  features: ["Golf privileges", "Concierge", "Travel insurance"]
}
```

### Voucher (from vouchers.json)
```json
{
  "id": "amazon-001",
  "brand": "Amazon",
  "category": "Shopping",
  "logo": "/logos/amazon.png",
  "platforms": [
    { "name": "Gyftr", "cap": "10000", "fee": "3%", "link": "..." },
    { "name": "Maximise", "cap": "25000", "fee": "2%", "link": "..." }
  ]
}
```

### Banking Program (from bankingPrograms.js)
```javascript
{
  bank: "HDFC",
  tier: "Imperia",
  nrv: "₹10L-₹30L",
  benefits: ["Relationship Manager", "Fee waivers", "Priority service"],
  eligibleCards: ["Regalia", "Diners Black"]
}
```

---

## Upcoming / Ideas (from upcomingFeatures.md)

### Completed
- [x] Shareable links for vouchers
- [x] Tags for guides
- [x] Mobile-friendly version
- [x] Light mode toggle
- [x] Keyboard shortcuts

### Pending
- [ ] Real-time voucher tracking (Gyftr, Maximise API integration)

---

## Key Areas for Improvement Suggestions

1. **Performance**: Large component files (AskAI: 72KB, CreditCardComparison: 104KB)
2. **Data**: Large static JSON files (vouchers: 522KB, creditCards: 132KB)
3. **AI Chat**: Currently uses pattern matching, could use actual LLM
4. **Features**: What new features would add value?
5. **UX**: Any UI/UX improvements to suggest?
6. **SEO/Marketing**: How to improve discoverability?
7. **Monetization**: Ideas for sustainable revenue (non-commercial license)
8. **Testing**: Currently no test coverage

---

## Questions for Claude

1. What new features would be most valuable for Indian credit card users?
2. How can I improve the AI chatbot experience?
3. What's the best way to handle the large data files?
4. Any architectural improvements you'd suggest?
5. What's missing that similar apps have?
