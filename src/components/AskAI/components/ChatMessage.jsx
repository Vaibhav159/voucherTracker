/**
 * ChatMessage Component
 * Renders individual chat messages with proper formatting
 */

import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styles from '../styles/AskAI.module.css';

/**
 * Copy text to clipboard
 */
const copyToClipboard = async (text) => {
  try {
    // Strip markdown formatting for plain text
    const plainText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/## (.*?)(?:\n|$)/g, '$1\n')
      .replace(/### (.*?)(?:\n|$)/g, '$1\n')
      .replace(/- /g, '• ');
    await navigator.clipboard.writeText(plainText);
    return true;
  } catch {
    return false;
  }
};

/**
 * Message Feedback Component
 */
const MessageFeedback = memo(({ messageId, onFeedback }) => {
  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (type) => {
    setFeedback(type);
    if (onFeedback) {
      onFeedback(messageId, type);
    }
  };

  if (feedback) {
    return (
      <div className={styles.feedbackContainer}>
        <span>{feedback === 'positive' ? '👍 Thanks!' : '👎 Thanks for the feedback'}</span>
      </div>
    );
  }

  return (
    <div className={styles.feedbackContainer}>
      <span>Helpful?</span>
      <button
        className={styles.feedbackButton}
        onClick={() => handleFeedback('positive')}
        aria-label="Helpful"
      >
        👍
      </button>
      <button
        className={styles.feedbackButton}
        onClick={() => handleFeedback('negative')}
        aria-label="Not helpful"
      >
        👎
      </button>
    </div>
  );
});

MessageFeedback.displayName = 'MessageFeedback';

MessageFeedback.propTypes = {
  messageId: PropTypes.string.isRequired,
  onFeedback: PropTypes.func,
};

/**
 * Markdown components configuration
 */
const markdownComponents = {
  h2: ({ children }) => (
    <h2 style={{ margin: '0.5rem 0', fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ margin: '0.4rem 0', fontSize: '1rem', color: 'var(--accent-purple)' }}>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 style={{ margin: '0.3rem 0', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
      {children}
    </h4>
  ),
  strong: ({ children }) => (
    <strong style={{ color: 'var(--accent-cyan)' }}>{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul style={{ margin: '0.3rem 0', paddingLeft: '1.2rem' }}>{children}</ul>
  ),
  li: ({ children }) => <li style={{ margin: '0.2rem 0' }}>{children}</li>,
  table: ({ children }) => (
    <div style={{ overflowX: 'auto', margin: '0.5rem 0' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.85rem',
        }}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th
      style={{
        padding: '8px',
        border: '1px solid var(--glass-border)',
        background: 'rgba(255,255,255,0.05)',
        textAlign: 'left',
      }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      style={{
        padding: '8px',
        border: '1px solid var(--glass-border)',
      }}
    >
      {children}
    </td>
  ),
  code: ({ children }) => (
    <code
      style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '2px 6px',
        borderRadius: '4px',
        fontFamily: 'monospace',
      }}
    >
      {children}
    </code>
  ),
};

/**
 * ChatMessage Component
 */
const ChatMessage = memo(({
  message,
  isLast = false,
  onFollowUp,
  onFeedback,
  showFeedback = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUser = message.role === 'user';
  const isWelcome = message.id === 'welcome';

  return (
    <div className={`${styles.messageWrapper} ${isUser ? styles.user : styles.assistant}`}>
      <div className={`${styles.messageBubble} ${isUser ? styles.user : styles.assistant}`}>
        {/* Message Content */}
        <div className={styles.messageContent}>
          <ReactMarkdown components={markdownComponents}>
            {message.content}
          </ReactMarkdown>
        </div>

        {/* Copy Button (for assistant messages, not welcome) */}
        {!isUser && !isWelcome && (
          <button
            className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
            title="Copy response"
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
        )}
      </div>

      {/* Card Links */}
      {message.cards?.length > 0 && (
        <div className={styles.cardLinks}>
          {message.cards.map((card) => (
            <Link
              key={card.id}
              to={`/card-guide/${card.slug || card.id}`}
              className={styles.cardLink}
            >
              💳 {card.name?.split(' ').slice(0, 2).join(' ')} →
            </Link>
          ))}
        </div>
      )}

      {/* Voucher Links */}
      {message.vouchers?.length > 0 && (
        <div className={styles.voucherLinks}>
          {message.vouchers.map((voucher) => (
            <Link
              key={voucher.slug}
              to={`/voucher/${voucher.slug}`}
              className={styles.voucherLink}
            >
              🎫 {voucher.brand} →
            </Link>
          ))}
        </div>
      )}

      {/* Banking Link */}
      {message.bankingData?.type === 'wealth' && (
        <Link to="/banking-guides" className={styles.bankingLink}>
          🏦 View Full Banking Guide →
        </Link>
      )}

      {/* Follow-up Suggestions (only for last assistant message) */}
      {!isUser && isLast && message.followUps?.length > 0 && (
        <div className={styles.followUps}>
          <p className={styles.followUpsLabel}>💡 Follow-up questions:</p>
          <div className={styles.followUpsContainer}>
            {message.followUps.map((suggestion, idx) => (
              <button
                key={idx}
                className={styles.followUpButton}
                onClick={() => onFollowUp?.(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback (for assistant messages, not welcome, only if enabled) */}
      {!isUser && !isWelcome && showFeedback && onFeedback && (
        <MessageFeedback messageId={message.id} onFeedback={onFeedback} />
      )}
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

ChatMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.oneOf(['user', 'assistant']).isRequired,
    content: PropTypes.string.isRequired,
    cards: PropTypes.array,
    vouchers: PropTypes.array,
    bankingData: PropTypes.object,
    followUps: PropTypes.array,
  }).isRequired,
  isLast: PropTypes.bool,
  onFollowUp: PropTypes.func,
  onFeedback: PropTypes.func,
  showFeedback: PropTypes.bool,
};

export default ChatMessage;
