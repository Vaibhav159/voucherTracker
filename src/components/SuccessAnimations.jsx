/**
 * Success Animation Components
 * 
 * Delightful animations for successful actions.
 * Includes checkmark, confetti, and counter animations.
 */

import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Animated Checkmark - Shows after successful action
 */
export const AnimatedCheckmark = memo(({ 
  size = 60, 
  color = '#22c55e',
  strokeWidth = 4,
  onComplete,
  autoHide = true,
  hideDelay = 2000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, hideDelay);
      return () => clearTimeout(timer);
    }
  }, [autoHide, hideDelay, onComplete]);

  if (!isVisible) return null;

  const circleRadius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={circleRadius}
          fill="none"
          stroke={`${color}30`}
          strokeWidth={strokeWidth}
        />
        
        {/* Animated circle */}
        <circle
          cx={center}
          cy={center}
          r={circleRadius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            animation: 'checkmark-circle 0.4s ease forwards',
          }}
        />
        
        {/* Checkmark */}
        <g style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}>
          <path
            d={`M ${size * 0.28} ${size * 0.5} L ${size * 0.45} ${size * 0.65} L ${size * 0.72} ${size * 0.35}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{
              animation: 'checkmark-check 0.3s ease forwards 0.4s',
            }}
          />
        </g>
      </svg>

      <style>{`
        @keyframes checkmark-circle {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes checkmark-check {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
});

AnimatedCheckmark.displayName = 'AnimatedCheckmark';

AnimatedCheckmark.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  onComplete: PropTypes.func,
  autoHide: PropTypes.bool,
  hideDelay: PropTypes.number,
};

/**
 * Confetti Burst - Celebration effect
 */
export const ConfettiBurst = memo(({ 
  count = 50,
  colors = ['#22c55e', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899'],
  duration = 2000,
  spread = 360,
  onComplete,
}) => {
  const [particles, setParticles] = useState([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Generate confetti particles
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * spread - spread / 2,
      y: Math.random() * -200 - 50,
      rotation: Math.random() * 720 - 360,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 0.3,
      type: Math.random() > 0.5 ? 'square' : 'circle',
    }));
    setParticles(newParticles);

    // Cleanup
    const timer = setTimeout(() => {
      setIsActive(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [count, colors, spread, duration, onComplete]);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 10000,
      }}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            width: particle.type === 'square' ? '10px' : '8px',
            height: particle.type === 'square' ? '10px' : '8px',
            backgroundColor: particle.color,
            borderRadius: particle.type === 'circle' ? '50%' : '2px',
            transform: `scale(${particle.scale})`,
            animation: `confetti-fall ${duration}ms ease-out forwards`,
            animationDelay: `${particle.delay}s`,
            '--x': `${particle.x}px`,
            '--y': `${particle.y}px`,
            '--rotation': `${particle.rotation}deg`,
          }}
        />
      ))}

      <style>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(var(--x), calc(var(--y) + 400px)) rotate(var(--rotation));
          }
        }
      `}</style>
    </div>
  );
});

ConfettiBurst.displayName = 'ConfettiBurst';

ConfettiBurst.propTypes = {
  count: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  duration: PropTypes.number,
  spread: PropTypes.number,
  onComplete: PropTypes.func,
};

/**
 * Animated Counter - Counts up/down with easing
 */
export const AnimatedCounter = memo(({ 
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  decimals = 0,
  easing = 'easeOutCubic',
  className = '',
  style = {},
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = React.useRef(0);

  // Easing functions
  const easings = {
    linear: t => t,
    easeOutCubic: t => 1 - Math.pow(1 - t, 3),
    easeOutQuart: t => 1 - Math.pow(1 - t, 4),
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    const startTime = performance.now();
    const ease = easings[easing] || easings.easeOutCubic;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = ease(progress);
      
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValueRef.current = endValue;
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, easing]);

  const formattedValue = displayValue.toFixed(decimals);

  return (
    <span className={className} style={style}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
});

AnimatedCounter.displayName = 'AnimatedCounter';

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  decimals: PropTypes.number,
  easing: PropTypes.oneOf(['linear', 'easeOutCubic', 'easeOutQuart', 'easeOutExpo', 'easeInOutCubic']),
  className: PropTypes.string,
  style: PropTypes.object,
};

/**
 * Pulse Heart Animation - For favorites
 */
export const PulseHeart = memo(({ 
  isActive = false, 
  size = 24,
  activeColor = '#ef4444',
  inactiveColor = 'currentColor',
  onToggle,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setIsAnimating(true);
    onToggle?.();
    setTimeout(() => setIsAnimating(false), 400);
  }, [onToggle]);

  return (
    <button
      onClick={handleClick}
      aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        transform: isAnimating ? 'scale(1.3)' : 'scale(1)',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isActive ? activeColor : 'none'}
        stroke={isActive ? activeColor : inactiveColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: 'all 0.2s ease',
          filter: isActive ? `drop-shadow(0 0 8px ${activeColor}60)` : 'none',
        }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      {/* Burst particles on activate */}
      {isAnimating && isActive && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '4px',
                height: '4px',
                background: activeColor,
                borderRadius: '50%',
                animation: `heart-particle 0.4s ease-out forwards`,
                '--angle': `${i * 60}deg`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes heart-particle {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-20px);
          }
        }
      `}</style>
    </button>
  );
});

PulseHeart.displayName = 'PulseHeart';

PulseHeart.propTypes = {
  isActive: PropTypes.bool,
  size: PropTypes.number,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  onToggle: PropTypes.func,
};

/**
 * Success Overlay - Full screen success state
 */
export const SuccessOverlay = memo(({
  isVisible,
  title = 'Success!',
  message,
  onClose,
  autoClose = true,
  autoCloseDelay = 2500,
}) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, autoCloseDelay, onClose]);

  if (!isVisible) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        animation: 'success-overlay-in 0.3s ease forwards',
      }}
    >
      <AnimatedCheckmark size={80} autoHide={false} />
      
      <h2
        style={{
          color: '#fff',
          fontSize: '1.5rem',
          marginTop: '1.5rem',
          animation: 'success-text-in 0.4s ease forwards 0.3s',
          opacity: 0,
        }}
      >
        {title}
      </h2>
      
      {message && (
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
            marginTop: '0.5rem',
            animation: 'success-text-in 0.4s ease forwards 0.4s',
            opacity: 0,
          }}
        >
          {message}
        </p>
      )}

      <style>{`
        @keyframes success-overlay-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes success-text-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
});

SuccessOverlay.displayName = 'SuccessOverlay';

SuccessOverlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  autoClose: PropTypes.bool,
  autoCloseDelay: PropTypes.number,
};

/**
 * Ripple Effect - Material-like touch feedback
 */
export const useRipple = () => {
  const [ripples, setRipples] = useState([]);

  const addRipple = useCallback((event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  }, []);

  const RippleContainer = useCallback(({ style = {} }) => (
    <>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            transform: 'scale(0)',
            animation: 'ripple 0.6s ease-out forwards',
            pointerEvents: 'none',
            ...style,
          }}
        />
      ))}
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  ), [ripples]);

  return { addRipple, RippleContainer };
};

export default {
  AnimatedCheckmark,
  ConfettiBurst,
  AnimatedCounter,
  PulseHeart,
  SuccessOverlay,
  useRipple,
};
