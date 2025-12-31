/**
 * VoucherTracker UX Features
 * 
 * 8 production-ready components to enhance user experience:
 * 
 * 1. SpendOptimizer - Optimal card rotation based on spending categories
 * 2. QuickCardPicker - Floating widget for instant "I'm paying at X" recommendations
 * 3. MilestoneTracker - Track spending goals, fee waivers, bonus unlocks
 * 4. ComparisonShare - Generate shareable links for card comparisons
 * 5. RecentSearches - Search history with one-click re-search
 * 6. VoucherAlerts - Notifications for voucher discount changes
 * 7. OnboardingTour - First-time user guidance with spotlight
 * 8. SavingsDashboard - Visual summary of savings
 */

// Main Components (route-level)
export { default as SpendOptimizer } from './SpendOptimizer';
export { default as MilestoneTracker } from './MilestoneTracker';
export { default as SavingsDashboard } from './SavingsDashboard';

// Floating/Global Components
export { default as QuickCardPicker } from './QuickCardPicker';
export { default as OnboardingTour } from './OnboardingTour';
export { useOnboarding, TourTarget, RestartTourButton } from './OnboardingTour';

// Utility Components & Hooks
export { 
  default as ShareButton,
  QuickShareButton,
  generateComparisonLink,
  parseComparisonFromURL,
  useSharedComparison,
} from './ComparisonShare';

export {
  default as RecentSearches,
  useRecentSearches,
  SearchBarWithHistory,
} from './RecentSearches';

export {
  default as AlertsPanel,
  useVoucherAlerts,
  WatchButton,
  AlertBell,
} from './VoucherAlerts';

export { useSavingsTracker } from './SavingsDashboard';
