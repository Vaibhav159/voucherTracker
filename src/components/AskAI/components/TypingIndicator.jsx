/**
 * TypingIndicator Component
 * Animated typing indicator for assistant responses
 */

import React, { memo } from 'react';
import styles from '../styles/AskAI.module.css';

/**
 * TypingIndicator Component
 */
const TypingIndicator = memo(() => {
  return (
    <div className={styles.typingIndicator} role="status" aria-label="Assistant is typing">
      <span className={styles.typingDot} />
      <span className={styles.typingDot} />
      <span className={styles.typingDot} />
    </div>
  );
});

TypingIndicator.displayName = 'TypingIndicator';

export default TypingIndicator;
