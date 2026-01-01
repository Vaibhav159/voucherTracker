import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './OnboardingTour.css';

const TOUR_STORAGE_KEY = 'voucherTracker_tourCompleted';

const tourSteps = [
  {
    target: '[data-tour="navigation"]',
    title: 'Welcome to Voucher Tracker! 🎉',
    content: 'Your one-stop hub for credit cards, vouchers, and banking guides. Let me show you around!',
    position: 'bottom'
  },
  {
    target: '.nav-dropdown-wrapper:first-of-type',
    title: 'Browse & Compare Cards 💳',
    content: 'Explore 50+ credit cards, compare features side-by-side, and find the perfect card for your spending.',
    position: 'bottom'
  },
  {
    target: '.nav-dropdown-wrapper:nth-of-type(2)',
    title: 'Banking Tiers 🏦',
    content: 'Discover wealth banking programs, check eligibility, and compare benefits across banks.',
    position: 'bottom'
  },
  {
    target: '.nav-link-highlight',
    title: 'AI Assistant ✨',
    content: 'Ask questions about cards, rewards, or banking. Get personalized recommendations instantly!',
    position: 'bottom'
  },
  {
    target: '.nav-dropdown-wrapper:nth-of-type(3)',
    title: 'Rewards Calculator 🧮',
    content: 'Calculate exact rewards you\'ll earn on purchases. Find the best card for each spending category!',
    position: 'bottom'
  },
  {
    target: '.nav-dropdown-wrapper:nth-of-type(3)',
    title: 'Points Value 💎',
    content: 'Discover what your credit card points are really worth. Compare redemption options for maximum value!',
    position: 'bottom'
  }
];

const OnboardingTour = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const step = tourSteps[currentStep];

  // Find and highlight target element
  const updateTargetRect = useCallback(() => {
    if (!step) return;
    const target = document.querySelector(step.target);
    if (target) {
      const rect = target.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    }
  }, [step]);

  useEffect(() => {
    // Delay showing to let page render
    const timer = setTimeout(() => {
      setIsVisible(true);
      updateTargetRect();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    return () => window.removeEventListener('resize', updateTargetRect);
  }, [updateTargetRect, currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false); // Hide immediately
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    onComplete?.();
  };

  if (!isVisible || !targetRect) return null;

  const isLastStep = currentStep === tourSteps.length - 1;

  // Calculate tooltip position
  const tooltipStyle = {
    top: step.position === 'bottom'
      ? targetRect.top + targetRect.height + 16
      : targetRect.top - 200,
    left: Math.max(16, Math.min(
      targetRect.left + targetRect.width / 2 - 160,
      window.innerWidth - 336
    ))
  };

  return createPortal(
    <div className="onboarding-overlay">
      {/* Spotlight cutout */}
      <div
        className="onboarding-spotlight"
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16
        }}
      />

      {/* Tooltip */}
      <div className="onboarding-tooltip" style={tooltipStyle}>
        <div className="onboarding-progress">
          {tourSteps.map((_, idx) => (
            <div
              key={idx}
              className={`progress-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
            />
          ))}
        </div>

        <h3 className="onboarding-title">{step.title}</h3>
        <p className="onboarding-content">{step.content}</p>

        <div className="onboarding-actions">
          <button className="onboarding-skip" onClick={handleSkip}>
            Skip Tour
          </button>
          <button className="onboarding-next" onClick={handleNext}>
            {isLastStep ? "Let's Go!" : 'Next'} →
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Hook to check if tour should show
export const useShouldShowTour = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!completed) {
      // Delay to let initial render complete
      const timer = setTimeout(() => setShouldShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return [shouldShow, () => setShouldShow(false)];
};

// Reset tour (for testing)
export const resetTour = () => {
  localStorage.removeItem(TOUR_STORAGE_KEY);
};

export default OnboardingTour;
