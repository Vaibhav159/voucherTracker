import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * OnboardingTour - First-time user guidance with spotlight and tooltips
 * Shows key features to new users
 */

const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    type: 'modal',
    title: '👋 Welcome to VoucherTracker!',
    content: 'Your ultimate companion for maximizing credit card rewards and finding the best voucher deals in India.',
    buttonText: "Let's Go!",
  },
  {
    id: 'search',
    target: '[data-tour="search"]',
    title: '🔍 Smart Search',
    content: 'Search 500+ vouchers and 99 credit cards instantly. Use Cmd+K for quick access!',
    position: 'bottom',
  },
  {
    id: 'filters',
    target: '[data-tour="filters"]',
    title: '🎯 Platform Filters',
    content: 'Filter by platform to find the best deals. iShop gives ICICI users up to 36% savings!',
    position: 'right',
  },
  {
    id: 'voucher-card',
    target: '[data-tour="voucher-card"]',
    title: '🎫 Voucher Cards',
    content: 'Click any voucher to see all platforms, discounts, and the best card to use for maximum savings.',
    position: 'bottom',
  },
  {
    id: 'navigation',
    target: '[data-tour="navigation"]',
    title: '📍 Explore More',
    content: 'Compare cards, calculate rewards, check banking tiers, and ask our AI for personalized advice!',
    position: 'bottom',
  },
  {
    id: 'complete',
    type: 'modal',
    title: '🎉 You\'re All Set!',
    content: 'Start exploring to find the best deals. Pro tip: Check out "Ask AI" for personalized card recommendations!',
    buttonText: 'Start Exploring',
  },
];

const STORAGE_KEY = 'voucherTracker_onboardingComplete';

// Hook to manage onboarding state
export const useOnboarding = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(true);

  // Check if onboarding was completed
  useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed) {
      setHasCompleted(false);
      // Delay start to let page render
      setTimeout(() => setIsActive(true), 1000);
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const skipOnboarding = useCallback(() => {
    completeOnboarding();
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setHasCompleted(true);
    setIsActive(false);
  };

  const restartOnboarding = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  return {
    isActive,
    currentStep,
    totalSteps: ONBOARDING_STEPS.length,
    currentStepData: ONBOARDING_STEPS[currentStep],
    hasCompleted,
    nextStep,
    prevStep,
    skipOnboarding,
    restartOnboarding,
  };
};

// Main Onboarding Component
const OnboardingTour = () => {
  const {
    isActive,
    currentStep,
    totalSteps,
    currentStepData,
    nextStep,
    prevStep,
    skipOnboarding,
  } = useOnboarding();

  const [targetRect, setTargetRect] = useState(null);

  // Find and measure target element
  useEffect(() => {
    if (!isActive || !currentStepData?.target) {
      setTargetRect(null);
      return;
    }

    const findTarget = () => {
      const target = document.querySelector(currentStepData.target);
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    findTarget();
    window.addEventListener('resize', findTarget);
    window.addEventListener('scroll', findTarget);

    return () => {
      window.removeEventListener('resize', findTarget);
      window.removeEventListener('scroll', findTarget);
    };
  }, [isActive, currentStepData]);

  if (!isActive) return null;

  const isModal = currentStepData?.type === 'modal';

  // Calculate tooltip position
  const getTooltipStyle = () => {
    if (!targetRect || isModal) return {};

    const padding = 12;
    const tooltipWidth = 300;
    const tooltipHeight = 150;

    let top, left;

    switch (currentStepData.position) {
      case 'top':
        top = targetRect.top - tooltipHeight - padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'bottom':
        top = targetRect.top + targetRect.height + padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2);
        left = targetRect.left - tooltipWidth - padding;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - (tooltipHeight / 2);
        left = targetRect.left + targetRect.width + padding;
        break;
      default:
        top = targetRect.top + targetRect.height + padding;
        left = targetRect.left;
    }

    // Keep within viewport
    left = Math.max(16, Math.min(left, window.innerWidth - tooltipWidth - 16));
    top = Math.max(16, Math.min(top, window.innerHeight - tooltipHeight - 16));

    return { top, left, width: tooltipWidth };
  };

  return createPortal(
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      pointerEvents: 'none',
    }}>
      {/* Overlay with spotlight cutout */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
        }}
      >
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - 8}
                y={targetRect.top - 8}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.75)"
          mask={targetRect ? "url(#spotlight-mask)" : undefined}
        />
      </svg>

      {/* Spotlight ring */}
      {targetRect && (
        <div
          style={{
            position: 'absolute',
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            borderRadius: '12px',
            border: '2px solid #06b6d4',
            boxShadow: '0 0 0 4px rgba(6, 182, 212, 0.3)',
            pointerEvents: 'none',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      )}

      {/* Modal or Tooltip */}
      {isModal ? (
        // Modal
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '420px',
            background: 'linear-gradient(135deg, rgba(30, 30, 45, 0.98), rgba(20, 20, 35, 0.98))',
            borderRadius: '20px',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            padding: '2rem',
            textAlign: 'center',
            pointerEvents: 'auto',
            animation: 'fadeInScale 0.3s ease-out',
          }}
        >
          <h2 style={{
            margin: '0 0 1rem',
            fontSize: '1.5rem',
            color: '#fff',
          }}>
            {currentStepData.title}
          </h2>
          <p style={{
            margin: '0 0 1.5rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
          }}>
            {currentStepData.content}
          </p>
          <button
            onClick={nextStep}
            style={{
              padding: '12px 32px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {currentStepData.buttonText || 'Next'}
          </button>
          {currentStep === 0 && (
            <button
              onClick={skipOnboarding}
              style={{
                display: 'block',
                margin: '1rem auto 0',
                padding: '8px',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Skip tour
            </button>
          )}
        </div>
      ) : (
        // Tooltip
        <div
          style={{
            position: 'absolute',
            ...getTooltipStyle(),
            background: 'linear-gradient(135deg, rgba(30, 30, 45, 0.98), rgba(20, 20, 35, 0.98))',
            borderRadius: '16px',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            padding: '1.25rem',
            pointerEvents: 'auto',
            animation: 'fadeInScale 0.2s ease-out',
          }}
        >
          <h3 style={{
            margin: '0 0 0.5rem',
            fontSize: '1rem',
            color: '#fff',
          }}>
            {currentStepData.title}
          </h3>
          <p style={{
            margin: '0 0 1rem',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.5,
          }}>
            {currentStepData.content}
          </p>

          {/* Progress & Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {ONBOARDING_STEPS.filter(s => s.type !== 'modal' || s.id === 'welcome').map((_, idx) => (
                <span
                  key={idx}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: idx <= currentStep ? '#06b6d4' : 'rgba(255,255,255,0.2)',
                    transition: 'background 0.2s',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {currentStep > 0 && currentStepData.type !== 'modal' && (
                <button
                  onClick={prevStep}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  Back
                </button>
              )}
              <button
                onClick={nextStep}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                }}
              >
                {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>

          <button
            onClick={skipOnboarding}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '4px 8px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              fontSize: '0.75rem',
            }}
          >
            Skip
          </button>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(6, 182, 212, 0.1);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

// Helper component to add tour data attributes
export const TourTarget = ({ id, children, style = {} }) => (
  <div data-tour={id} style={style}>
    {children}
  </div>
);

// Button to restart tour (for settings/help menu)
export const RestartTourButton = ({ onRestart }) => (
  <button
    onClick={() => {
      localStorage.removeItem(STORAGE_KEY);
      onRestart();
    }}
    style={{
      padding: '10px 16px',
      borderRadius: '8px',
      border: '1px solid var(--glass-border)',
      background: 'rgba(255,255,255,0.03)',
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    🎓 Restart Tour
  </button>
);

export default OnboardingTour;
