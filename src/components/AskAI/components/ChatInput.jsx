/**
 * ChatInput Component
 * Text input with voice support and submit functionality
 */

import React, { useState, useRef, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/AskAI.module.css';

/**
 * Check if Web Speech API is supported
 */
const isSpeechSupported = () => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

/**
 * ChatInput Component
 */
const ChatInput = memo(({
  onSubmit,
  isTyping = false,
  hasMessages = false,
  onClear,
  placeholder = 'Ask about cards, vouchers, platforms, banking...',
}) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (trimmedInput && !isTyping) {
        onSubmit(trimmedInput);
        setInput('');
      }
    },
    [input, isTyping, onSubmit]
  );

  /**
   * Start voice recognition
   */
  const startVoiceInput = useCallback(() => {
    if (!isSpeechSupported()) {
      alert('Voice input is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    // Stop if already listening
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Indian English for better recognition of Indian terms

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      recognitionRef.current = null;

      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access to use voice input.');
      }
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');

      setInput(transcript);

      // Auto-submit on final result if it looks like a complete sentence
      if (event.results[0].isFinal) {
        inputRef.current?.focus();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isListening]);

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = useCallback(
    (e) => {
      // Submit on Enter (without Shift)
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <form className={styles.inputForm} onSubmit={handleSubmit}>
      {/* Text Input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.inputField}
        disabled={isTyping}
        aria-label="Ask a question"
        autoComplete="off"
      />

      {/* Voice Input Button */}
      {isSpeechSupported() && (
        <button
          type="button"
          onClick={startVoiceInput}
          className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
          disabled={isTyping}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
          title={isListening ? 'Listening... Click to stop' : 'Voice input'}
        >
          {isListening ? '🔴' : '🎤'}
        </button>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isTyping || !input.trim()}
        aria-label="Send message"
      >
        {isTyping ? '...' : 'Ask'}
      </button>

      {/* Clear Chat Button */}
      {hasMessages && onClear && (
        <button
          type="button"
          onClick={onClear}
          className={styles.clearButton}
          title="Clear chat history"
          aria-label="Clear chat history"
        >
          🗑️
        </button>
      )}
    </form>
  );
});

ChatInput.displayName = 'ChatInput';

ChatInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isTyping: PropTypes.bool,
  hasMessages: PropTypes.bool,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
};

export default ChatInput;
