// Accessibility utilities

/**
 * Create a focus trap within an element
 * @param {HTMLElement} element - The element to trap focus within
 * @returns {Function} cleanup function to remove the trap
 */
export const focusTrap = (element) => {
  if (!element) return () => {};

  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Focus the first focusable element
  if (firstFocusable) {
    firstFocusable.focus();
  }

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Announce a message to screen readers
 * @param {string} message - The message to announce
 * @param {string} politeness - 'polite' or 'assertive'
 */
export const announceToScreenReader = (message, politeness = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', politeness);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Get a unique ID for aria-labelledby and aria-describedby
 * @param {string} prefix - Prefix for the ID
 * @returns {string} unique ID
 */
let idCounter = 0;
export const generateUniqueId = (prefix = 'id') => {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Date.now()}`;
};

/**
 * Check if element is visible and focusable
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export const isFocusable = (element) => {
  if (!element) return false;
  if (element.disabled || element.hidden) return false;
  if (element.offsetWidth === 0 || element.offsetHeight === 0) return false;
  return true;
};
