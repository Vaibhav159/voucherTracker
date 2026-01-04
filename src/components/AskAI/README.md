# AskAI Component (Refactored)

A fully refactored AI-powered chat assistant for credit cards, vouchers, and banking queries.

## 🎯 Key Improvements

### Security
- ✅ **Fixed XSS vulnerability** - Replaced `dangerouslySetInnerHTML` with `react-markdown`
- ✅ **Safe markdown rendering** - All user/AI content is properly sanitized

### Architecture
- ✅ **Split 1,200+ line file** into 15+ focused modules
- ✅ **Separation of concerns** - Components, hooks, processors, constants
- ✅ **Intent recognition system** - Natural language understanding
- ✅ **Fuzzy search** - Better search results using Fuse.js

### Performance
- ✅ **Memoized components** - Using `React.memo` for all components
- ✅ **Optimized hooks** - `useCallback` and `useMemo` where appropriate
- ✅ **CSS Modules** - No more inline styles recreated on every render

### Features
- ✅ **Voice input support** - Web Speech API integration
- ✅ **Chat history persistence** - LocalStorage support
- ✅ **Message feedback** - Thumbs up/down on responses
- ✅ **Accessibility** - ARIA labels, keyboard navigation

## 📁 File Structure

```
AskAI/
├── index.jsx                    # Main component (< 150 lines!)
├── components/
│   ├── index.js                 # Barrel export
│   ├── ChatMessage.jsx          # Individual message rendering
│   ├── ChatInput.jsx            # Input with voice support
│   ├── QuickActions.jsx         # Quick action buttons
│   └── TypingIndicator.jsx      # Animated typing dots
├── hooks/
│   ├── index.js                 # Barrel export
│   ├── useChatHistory.js        # Chat state + persistence
│   └── useQueryProcessor.js     # Query orchestration
├── processors/
│   ├── index.js                 # Barrel export
│   ├── intentRecognizer.js      # NLU intent recognition
│   ├── cardProcessor.js         # Card search + comparison
│   ├── voucherProcessor.js      # Voucher search + filtering
│   ├── comboProcessor.js        # Card+voucher combos
│   ├── bankingProcessor.js      # Wealth tier queries
│   └── responseGenerator.js     # Response building
├── constants/
│   ├── index.js                 # Barrel export
│   ├── platforms.js             # Platform configurations
│   ├── quickActions.js          # Quick action buttons
│   └── keywords.js              # Search keyword mappings
└── styles/
    └── AskAI.module.css         # Scoped CSS styles
```

## 🚀 Usage

```jsx
import AskAI from './components/AskAI';
import { creditCards } from './data/creditCards';
import { vouchers } from './data/vouchers';
import { wealthBanking, familyBanking, getBankNames } from './data/bankingPrograms';

function App() {
  return (
    <AskAI
      creditCards={creditCards}
      vouchers={vouchers}
      wealthBanking={wealthBanking}
      familyBanking={familyBanking}
      getBankNames={getBankNames}
    />
  );
}
```

## 🧠 Intent Recognition

The system recognizes these intents from natural language:

| Intent | Example Queries |
|--------|----------------|
| `CARD_COMPARISON` | "Compare Infinia vs Magnus", "Infinia vs Emeralde" |
| `CARD_SEARCH` | "Best cashback card", "HDFC premium cards" |
| `COMBO_RECOMMENDATION` | "Best combo for Amazon", "How to save on Flipkart" |
| `PLATFORM_ADVICE` | "Which card for iShop?", "SmartBuy cards" |
| `VOUCHER_SEARCH` | "Shopping vouchers", "Amazon vouchers" |
| `SPENDING_ADVICE` | "I spend 2L monthly", "Best card for 50K spend" |
| `BANKING_TIER_INFO` | "HDFC wealth tiers", "Axis Burgundy" |
| `BANKING_TIER_ELIGIBILITY` | "What tier for 25L NRV?" |
| `FAMILY_BANKING` | "Family banking options" |

## 🔧 Adding New Intents

1. Add pattern in `processors/intentRecognizer.js`:

```javascript
NEW_INTENT: {
  patterns: [
    /your\s+pattern\s+here/i,
  ],
  extract: (match) => ({ entity: match[1] }),
  priority: 5,
},
```

2. Handle intent in `hooks/useQueryProcessor.js`:

```javascript
case 'NEW_INTENT': {
  // Process and return response
  return { content: '...', cards: [], followUps: [] };
}
```

## 🎨 Styling

The component uses CSS Modules for scoped styling. To customize:

1. Edit `styles/AskAI.module.css`
2. Use CSS custom properties for theming:

```css
:root {
  --accent-cyan: #06b6d4;
  --accent-purple: #8b5cf6;
  --accent-blue: #3b82f6;
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-background: rgba(255, 255, 255, 0.05);
}
```

## 📊 Analytics Integration

The component supports analytics tracking:

```javascript
// In handleFeedback callback
window.gtag('event', 'ai_feedback', {
  message_id: messageId,
  feedback_type: feedbackType,
});
```

## 🔒 Security Notes

1. **No `dangerouslySetInnerHTML`** - All markdown is rendered via react-markdown
2. **No eval()** - All processing is done with safe string operations
3. **Input sanitization** - User input is trimmed and validated
4. **External links** - All links use `rel="noopener noreferrer"`

## 📱 Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management
- Screen reader friendly chat log
- Reduced motion support in animations

## 🧪 Testing

Recommended tests to add:

```javascript
// Intent recognition tests
describe('recognizeIntent', () => {
  it('recognizes card comparison intent', () => {
    const result = recognizeIntent('compare infinia vs magnus');
    expect(result.intent).toBe('CARD_COMPARISON');
  });
});

// Component tests
describe('AskAI', () => {
  it('renders without crashing', () => {
    render(<AskAI creditCards={[]} vouchers={[]} />);
  });

  it('processes user input', async () => {
    // Test user interaction
  });
});
```

## 📝 Migration Guide

To migrate from the old AskAI:

1. Copy the entire `AskAI/` folder to `src/components/`
2. Update imports in your app:

```javascript
// Before
import AskAI from './components/AskAI';

// After (same import, new implementation)
import AskAI from './components/AskAI';
```

3. Ensure dependencies are installed:
```bash
npm install react-markdown fuse.js prop-types
```

4. The component API is backward compatible - no changes needed!

## 🛠 Dependencies

- `react` >= 18.0.0
- `react-router-dom` >= 6.0.0
- `react-markdown` >= 8.0.0
- `fuse.js` >= 6.0.0
- `prop-types` >= 15.0.0

## 📄 License

MIT
