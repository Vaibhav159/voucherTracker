import { useEffect } from 'react';

/**
 * Custom hook for handling keyboard events in modals
 * Consolidates modal keyboard handling logic (Escape, Enter, etc.)
 *
 * @param {boolean} isOpen - Whether the modal is currently open
 * @param {Function} onClose - Function to call when closing the modal
 * @param {Object} options - Additional options
 * @param {Function} options.onEnter - Optional function to call on Enter key
 * @param {boolean} options.lockScroll - Whether to lock body scroll (default: true)
 */
export const useModalKeyHandler = (isOpen, onClose, options = {}) => {
  const { onEnter, lockScroll = true } = options;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Handle Escape key
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      // Handle Enter key if callback provided
      if (e.key === 'Enter' && onEnter) {
        e.preventDefault();
        onEnter();
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Lock body scroll to prevent background scrolling
    if (lockScroll) {
      document.body.style.overflow = 'hidden';
    }

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (lockScroll) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose, onEnter, lockScroll]);
};

export default useModalKeyHandler;
