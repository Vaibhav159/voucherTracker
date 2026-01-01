/**
 * useChatHistory Hook
 * Manages chat state with optional persistence to localStorage
 */

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'askAI_chatHistory';
const MAX_SESSIONS = 10;

/**
 * Get initial welcome message
 */
const getWelcomeMessage = (stats = {}) => ({
  id: 'welcome',
  role: 'assistant',
  content: `👋 Hi! I'm your **Credit Card + Banking + Voucher AI Advisor**

**Powered by:**
• **${stats.cardCount || 99}+ Credit Cards** across 15 banks
• **${stats.voucherCount || 920}+ Vouchers** across multiple categories
• **14 Banks** with wealth tiers & family programs

🛒 **Platform Intelligence!**
- "Which card for iShop?" → ICICI cards for 36% savings
- "Which card for SmartBuy?" → HDFC cards for 33% value

🏦 **Banking Intelligence!**
- "HDFC wealth tiers" → See all tier requirements
- "What tier for 25L NRV?" → Find eligibility across banks

**Try the quick actions below or ask me anything!**`,
  cards: [],
  vouchers: [],
  bankingData: null,
  followUps: ['Which card for iShop?', 'HDFC wealth tiers', 'Best combo for Amazon'],
  timestamp: new Date().toISOString(),
});

/**
 * Load chat history from localStorage
 */
const loadHistory = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load chat history:', error);
    return [];
  }
};

/**
 * Save chat history to localStorage
 */
const saveHistory = (history) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_SESSIONS)));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
};

/**
 * Custom hook for managing chat history
 */
export const useChatHistory = (stats = {}) => {
  const [messages, setMessages] = useState(() => [getWelcomeMessage(stats)]);
  const [history, setHistory] = useState(() => loadHistory());
  const [isTyping, setIsTyping] = useState(false);

  // Update welcome message stats when they change
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([getWelcomeMessage(stats)]);
    }
  }, [stats.cardCount, stats.voucherCount]);

  /**
   * Add a user message
   */
  const addUserMessage = useCallback((content) => {
    const message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    return message;
  }, []);

  /**
   * Add an assistant message
   */
  const addAssistantMessage = useCallback((response) => {
    const message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: response.content || '',
      cards: response.cards || [],
      vouchers: response.vouchers || [],
      bankingData: response.bankingData || null,
      followUps: response.followUps || [],
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    return message;
  }, []);

  /**
   * Simulate typing delay for more natural UX
   */
  const simulateTyping = useCallback(async (response) => {
    setIsTyping(true);

    // Calculate delay based on response complexity
    const baseDelay = 300;
    const contentDelay = Math.min((response.content?.length || 0) * 2, 1200);
    const cardDelay = (response.cards?.length || 0) * 100;
    const totalDelay = baseDelay + contentDelay + cardDelay;

    await new Promise((resolve) => setTimeout(resolve, Math.min(totalDelay, 1500)));

    setIsTyping(false);
    return addAssistantMessage(response);
  }, [addAssistantMessage]);

  /**
   * Clear current session
   */
  const clearSession = useCallback(() => {
    setMessages([getWelcomeMessage(stats)]);
  }, [stats]);

  /**
   * Save current session to history
   */
  const saveSession = useCallback(() => {
    if (messages.length <= 1) return; // Don't save empty sessions

    const session = {
      id: Date.now(),
      date: new Date().toISOString(),
      messages: messages,
      summary: messages[1]?.content?.slice(0, 100) || 'Chat session',
      messageCount: messages.length,
    };

    setHistory((prev) => {
      const updated = [session, ...prev.slice(0, MAX_SESSIONS - 1)];
      saveHistory(updated);
      return updated;
    });
  }, [messages]);

  /**
   * Load a session from history
   */
  const loadSession = useCallback((sessionId) => {
    const session = history.find((h) => h.id === sessionId);
    if (session) {
      setMessages(session.messages);
    }
  }, [history]);

  /**
   * Delete a session from history
   */
  const deleteSession = useCallback((sessionId) => {
    setHistory((prev) => {
      const updated = prev.filter((h) => h.id !== sessionId);
      saveHistory(updated);
      return updated;
    });
  }, []);

  /**
   * Clear all history
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  /**
   * Get last user message
   */
  const getLastUserMessage = useCallback(() => {
    const userMessages = messages.filter((m) => m.role === 'user');
    return userMessages[userMessages.length - 1] || null;
  }, [messages]);

  /**
   * Update the last assistant message (for streaming responses)
   */
  const updateLastAssistantMessage = useCallback((updates) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      const lastIndex = newMessages.length - 1;
      if (newMessages[lastIndex]?.role === 'assistant') {
        newMessages[lastIndex] = {
          ...newMessages[lastIndex],
          ...updates,
        };
      }
      return newMessages;
    });
  }, []);

  return {
    // Current session
    messages,
    isTyping,
    addUserMessage,
    addAssistantMessage,
    simulateTyping,
    clearSession,
    updateLastAssistantMessage,
    getLastUserMessage,

    // History management
    history,
    saveSession,
    loadSession,
    deleteSession,
    clearHistory,

    // Utility
    messageCount: messages.length,
    hasMessages: messages.length > 1,
  };
};

export default useChatHistory;
