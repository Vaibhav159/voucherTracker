# System Agents & Architecture

This document outlines the three primary "agents" or components that power the Voucher Tracker system: the **Frontend Application**, the **Backend API**, and the **Data Sync Agents**.

## 1. Frontend Agent (Web Client)
**Stack:** React, Vite, Tailwind CSS
**Path:** `src/`

The Frontend Agent is the user-facing interface, responsible for:
- Displaying vouchers, guides, and credit card comparisons.
- Managing user interaction and local state (Favorites, Search).
- Communicating with the Backend API (optional/fallback logic exists).

### Key Directories
- `src/components/`: Reusable UI components (Cards, Modals, Search).
- `src/pages/`: Main views (Guides, VoucherList, CreditCardComparison - routed via `App.jsx`).
- `src/context/`: Global state management (`VouchersContext`, `FavoritesContext`, `ThemeContext`).
- `src/hooks/`: Custom hooks for data fetching (`useGuides`, `useVouchers`).

### Commands
- **Start Dev Server:** `npm run dev` (Runs on `localhost:5173`)
- **Build:** `npm run build`

---

## 2. Backend Agent (API Server)
**Stack:** Django, Django Rest Framework (DRF), Python
**Path:** `backend/`

The Backend Agent acts as the centralized source of truth, managing:
- **API Endpoints:** Serves data for Vouchers, Credit Cards, and Guides.
- **Admin Interface:** Allows management of mismatched vouchers and content.
- **Database:** Stores structured data (SQLite/Postgres).

### Key Apps (`backend/backend/`)
- `vouchers`: Manages voucher data, brands, and platforms.
- `credit_cards`: Handles credit card details, rewards, and eligibility logic.
- `guides`: Manages content for the "Guides" page.
- `users`: User authentication and management.

### Commands
- **Start Server:** `python backend/manage.py runserver` (Runs on `localhost:8000`)
- **Run Migrations:** `python backend/manage.py migrate`

---

## 3. Data Sync Agents (Automation)
**Stack:** Node.js Scripts
**Path:** `scripts/`

These agents autonomously fetch and synchronize data from external platforms to keep the system up-to-date.

### A. Gyftr Agent
- **Script:** `scripts/sync-gyftr.js`
- **Source:** HDFC SmartBuy Gyftr
- **Function:** Fetches categories and brands, updates discounts and links.

### B. Maximize Agent
- **Script:** `scripts/sync-maximize.js`
- **Source:** Maximize.money
- **Function:** Merges broad gift card data and discount rates.

### C. MagicPin Agent
- **Script:** `scripts/sync-magicpin.js`
- **Source:** MagicPin API
- **Function:** Fetches location-based voucher inventory and discounts.

### Commands
```bash
# Run individual agents
npm run sync-vouchers   # Gyftr
npm run sync-maximise   # Maximize
npm run sync-magicpin   # MagicPin
```
