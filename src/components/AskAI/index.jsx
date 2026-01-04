/**
 * AskAI Component (Refactored)
 *
 * AI-powered assistant for credit cards, vouchers, and banking queries.
 *
 * Features:
 * - Intent recognition for natural language queries
 * - Fuzzy search for cards and vouchers
 * - Card + voucher combo recommendations
 * - Wealth banking tier eligibility
 * - Voice input support
 * - Chat history persistence
 * - Accessible and responsive design
 *
 * @version 2.0.0
 */

import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Components
import { ChatMessage, QuickActions, ChatInput, TypingIndicator } from './components';

// Hooks
import { useChatHistory } from './hooks/useChatHistory';
import { useQueryProcessor } from './hooks/useQueryProcessor';

// Styles
import styles from './styles/AskAI.module.css';

// Import data directly for standalone usage
import defaultCreditCards from '../../data/creditCards.json';
import { vouchers as defaultVouchers } from '../../data/vouchers';
import { wealthBanking as defaultWealthBanking, familyBanking as defaultFamilyBanking, getBankNames as defaultGetBankNames } from '../../data/bankingPrograms';

/**
 * AskAI Main Component
 */
const AskAI = ({
  creditCards = defaultCreditCards,
  vouchers = defaultVouchers,
  wealthBanking = defaultWealthBanking,
  familyBanking = defaultFamilyBanking,
  getBankNames = defaultGetBankNames,
}) => {
  // Refs
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Get bank names
  const bankNames = useMemo(() => getBankNames(), [getBankNames]);

  // Stats for display
  const stats = useMemo(
    () => ({
      cardCount: creditCards.length,
      voucherCount: vouchers.length,
      bankCount: Object.keys(wealthBanking).length,
    }),
    [creditCards.length, vouchers.length, wealthBanking]
  );

  // Chat history management
  const {
    messages,
    isTyping,
    addUserMessage,
    simulateTyping,
    clearSession,
    hasMessages,
  } = useChatHistory(stats);

  // Query processor
  const { processQuery } = useQueryProcessor({
    creditCards,
    vouchers,
    wealthBanking,
    familyBanking,
  });

  /**
   * Scroll to bottom of chat
   */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /**
   * Handle user message submission
   */
  const handleSubmit = useCallback(
    async (query) => {
      if (!query.trim() || isTyping) return;

      // Add user message
      addUserMessage(query);

      // Process query and get response
      const response = processQuery(query);

      // Add assistant response with typing simulation
      await simulateTyping(response);
    },
    [isTyping, addUserMessage, processQuery, simulateTyping]
  );

  /**
   * Handle quick action click
   */
  const handleQuickAction = useCallback(
    (query) => {
      handleSubmit(query);
    },
    [handleSubmit]
  );

  /**
   * Handle follow-up suggestion click
   */
  const handleFollowUp = useCallback(
    (suggestion) => {
      handleSubmit(suggestion);
    },
    [handleSubmit]
  );

  /**
   * Handle message feedback
   */
  const handleFeedback = useCallback((messageId, feedbackType) => {
    // Track feedback (could be sent to analytics)
    console.log('Feedback:', { messageId, feedbackType });

    // Could integrate with analytics here
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ai_feedback', {
        message_id: messageId,
        feedback_type: feedbackType,
      });
    }
  }, []);

  /**
   * Handle clear chat
   */
  const handleClear = useCallback(() => {
    if (window.confirm('Clear chat history?')) {
      clearSession();
    }
  }, [clearSession]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>🤖 Ask AI</h1>
        <p className={styles.subtitle}>
          Your intelligent assistant for credit cards, vouchers, and banking advice
        </p>
      </header>

      {/* Quick Actions */}
      <QuickActions
        onAction={handleQuickAction}
        bankNames={bankNames}
        voucherCount={stats.voucherCount}
      />

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className={`${styles.chatContainer} glass-panel`}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg.id || index}
            message={msg}
            isLast={index === messages.length - 1 && !isTyping}
            onFollowUp={handleFollowUp}
            onFeedback={handleFeedback}
            showFeedback={index > 0 && index === messages.length - 1}
          />
        ))}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <ChatInput
        onSubmit={handleSubmit}
        isTyping={isTyping}
        hasMessages={hasMessages}
        onClear={handleClear}
      />
    </div>
  );
};

AskAI.propTypes = {
  creditCards: PropTypes.array,
  vouchers: PropTypes.array,
  wealthBanking: PropTypes.object,
  familyBanking: PropTypes.object,
  getBankNames: PropTypes.func,
};

export default AskAI;
