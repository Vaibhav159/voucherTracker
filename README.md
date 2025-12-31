# 🎟️ Voucher Tracker

 > A community-driven platform to track shopping voucher caps, fees, and platforms.
 > **[Live Demo](https://vaibhav159.github.io/voucherTracker/)**

<video src="https://github.com/user-attachments/assets/dcd76170-5bd3-46d6-92b0-40004845cc14" controls muted autoplay loop style="width: 100%"></video>

## 🚀 Features

### Core Features
- **Multi-Platform Comparison**: See caps and fees for Amazon, Flipkart, Uber, etc., across different buying platforms (Gyftr, iShop, etc.)
- **🔍 Fuzzy Search**: Fast, intelligent search powered by Fuse.js with 300ms debouncing
- **🎯 Advanced Filtering**: Filter by category, platform, and favorites with real-time updates
- **📊 Live Stats**: Real-time statistics showing total vouchers, platforms, and best discounts
- **💳 Credit Card Integration**: Compare credit cards and calculate rewards
- **🎨 Glassmorphism UI**: Beautiful deep space theme with aurora background
- **🌓 Dark/Light Theme**: Toggle between dark and light modes
- **📱 Mobile-First**: Responsive design with sticky filters and optimized layouts
- **⚡ Infinite Scroll**: Smooth pagination with Intersection Observer API
- **🔍 Global Search**: CMD+K or Shift+Shift to search across all content
- **Community Powered**: Open-source data that anyone can contribute to

### Performance & Accessibility
- **♿ WCAG 2.1 AA Compliant**: Proper color contrast, keyboard navigation, screen reader support
- **⚡ Code Splitting**: Lazy-loaded routes for optimal bundle size (~200KB gzipped)
- **🔄 PWA Support**: Offline-first with service worker caching
- **🎨 Design Tokens**: Consistent spacing, colors, typography system
- **🛡️ Error Boundaries**: Graceful error handling preventing app crashes
- **⌨️ Keyboard Shortcuts**: Full keyboard navigation support

## 🛠️ Tech Stack

### Core
- **Framework**: React 19.2.0 (Vite 7.3.0)
- **Routing**: React Router DOM v7 (HashRouter for GitHub Pages)
- **Search**: Fuse.js v7.1.0 (fuzzy search)
- **Styling**: Modular CSS with design tokens (Glassmorphism, Animations)
- **Deployment**: GitHub Pages

### Architecture
- **Custom Hooks**: useLocalStorage, useDebounce, useFuzzySearch, useModalKeyHandler, useDiscountParser
- **Context API**: Theme and Favorites management
- **Error Handling**: ErrorBoundary components with graceful fallbacks
- **Performance**: Code splitting, lazy loading, manual chunking
- **PWA**: Service worker, manifest.json, offline support

## 🤝 How to Contribute Data
Found a new voucher cap? Or a fee change?
1.  Click the **"Suggest Data Change"** button in the app.
2.  This opens the `src/data/vouchers.js` file on GitHub.
3.  Click the **Pencil Icon** to edit.
4.  Add or modify the data:
    ```js
    {
      id: "unique-id",
      brand: "Brand Name",
      category: "Category",
      platforms: [
        { name: "Platform", cap: "10k/month", fee: "2%", link: "..." }
      ]
    }
    ```
5.  Scroll down and click **"Propose changes"**.

## 💻 Running Locally
```bash
# Clone the repo
git clone https://github.com/Vaibhav159/voucherTracker.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📄 License
PolyForm Noncommercial License 1.0.0. Free for personal and non-profit use. Business use prohibited.

https://tracker.cheq.dpdns.org/api/docs/#/credit-cards/credit_cards_list
