/**
 * VoucherTracker UX Features
 *
 * 8 production-ready components to enhance user experience:
 *
 * 1. SpendOptimizer - Optimal card rotation based on spending categories
 * 3. MilestoneTracker - Track spending goals, fee waivers, bonus unlocks
 * 4. SavingsDashboard - Visual summary of savings
 * 5. OnboardingTour - First-time user guidance
 */

// Main Components (route-level)
export { default as SpendOptimizer } from './SpendOptimizer';
export { default as MilestoneTracker } from './MilestoneTracker';
export { default as SavingsDashboard } from './SavingsDashboard';
export { default as OnboardingTour } from './OnboardingTour';
export { useOnboarding, TourTarget, RestartTourButton } from './OnboardingTour';
export { useSavingsTracker } from './SavingsDashboard';
