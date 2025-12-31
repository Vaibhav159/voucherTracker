import { useState, useEffect } from 'react';

/**
 * Custom hook for safe localStorage operations with error handling
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if key doesn't exist
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    const item = window.localStorage.getItem(key);

    if (!item) {
      return initialValue;
    }

    try {
      // Try to parse as JSON
      return JSON.parse(item);
    } catch (error) {
      // Fallback: if not valid JSON, return as-is (handles legacy raw strings)
      return item;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to local storage
      if (typeof window !== 'undefined') {
        // If value is a string, we still JSON.stringify it to keep it consistent
        // But if we want to support raw strings from other sources, we just have to be careful
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error(`localStorage quota exceeded for key "${key}"`);
      } else {
        console.error(`Error writing localStorage key "${key}":`, error);
      }
    }
  };

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          // Fallback for non-JSON strings
          setStoredValue(e.newValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;
