/**
 * QuickActions Component (Redesigned)
 * Cleaner, collapsible sections instead of tag cloud chaos
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/AskAI.module.css';

// Simplified quick actions - most useful queries only
const QUICK_ACTIONS = {
  popular: [
    { label: 'Best overall card', query: 'best overall credit card', icon: '🏆' },
    { label: 'Best for Amazon', query: 'best card for Amazon', icon: '📦' },
    { label: 'Best for travel', query: 'best travel credit card', icon: '✈️' },
    { label: 'Compare top cards', query: 'compare top 5 credit cards', icon: '⚖️' },
  ],
  cards: [
    { label: 'Cashback cards', query: 'best cashback credit cards', icon: '💰' },
    { label: 'Lifetime free cards', query: 'lifetime free credit cards', icon: '🆓' },
    { label: 'Zero forex cards', query: 'zero forex fee cards', icon: '🌍' },
    { label: 'Fuel cards', query: 'best fuel credit cards', icon: '⛽' },
    { label: 'Dining cards', query: 'best dining credit cards', icon: '🍽️' },
    { label: 'Entry level cards', query: 'best entry level credit cards', icon: '🚀' },
  ],
  platforms: [
    { label: 'iShop guide', query: 'which card for iShop', icon: '🛒' },
    { label: 'SmartBuy guide', query: 'which card for SmartBuy', icon: '🛍️' },
    { label: 'Flipkart deals', query: 'best card for Flipkart', icon: '🏷️' },
    { label: 'Swiggy/Zomato', query: 'best card for food delivery', icon: '🍔' },
  ],
  banking: [
    { label: 'HDFC tiers', query: 'HDFC wealth tiers', icon: '🏦' },
    { label: 'ICICI tiers', query: 'ICICI wealth tiers', icon: '🏛️' },
    { label: 'My eligibility', query: 'which tier am I eligible for', icon: '📊' },
    { label: 'Family banking', query: 'family banking benefits', icon: '👨‍👩‍👧‍👦' },
  ],
};

/**
 * Quick Action Button
 */
const ActionButton = memo(({ action, onClick }) => (
  <button
    className={styles.actionButton}
    onClick={() => onClick(action.query)}
  >
    <span className={styles.actionIcon}>{action.icon}</span>
    <span className={styles.actionLabel}>{action.label}</span>
  </button>
));

ActionButton.displayName = 'ActionButton';

/**
 * Collapsible Section
 */
const Section = memo(({ title, icon, actions, onAction, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.quickSection}>
      <button
        className={styles.sectionHeader}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.sectionIcon}>{icon}</span>
        <span className={styles.sectionTitle}>{title}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={styles.sectionContent}>
          {actions.map((action, i) => (
            <ActionButton key={i} action={action} onClick={onAction} />
          ))}
        </div>
      )}
    </div>
  );
});

Section.displayName = 'Section';

/**
 * QuickActions Component
 */
const QuickActions = memo(({ onAction, voucherCount = 0 }) => {
  return (
    <div className={styles.quickActions}>
      {/* Popular - Always visible as buttons */}
      <div className={styles.popularActions}>
        <span className={styles.popularLabel}>Quick questions:</span>
        <div className={styles.popularGrid}>
          {QUICK_ACTIONS.popular.map((action, i) => (
            <ActionButton key={i} action={action} onClick={onAction} />
          ))}
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className={styles.sectionsContainer}>
        <Section
          title="Credit Cards"
          icon="💳"
          actions={QUICK_ACTIONS.cards}
          onAction={onAction}
        />
        <Section
          title="Platforms"
          icon="🛒"
          actions={QUICK_ACTIONS.platforms}
          onAction={onAction}
        />
        <Section
          title="Banking"
          icon="🏦"
          actions={QUICK_ACTIONS.banking}
          onAction={onAction}
        />
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <span>Powered by</span>
        <span className={styles.statItem}>100+ Cards</span>
        <span className={styles.statDivider}>•</span>
        <span className={styles.statItem}>{voucherCount}+ Vouchers</span>
        <span className={styles.statDivider}>•</span>
        <span className={styles.statItem}>14 Banks</span>
      </div>
    </div>
  );
});

QuickActions.displayName = 'QuickActions';

QuickActions.propTypes = {
  onAction: PropTypes.func.isRequired,
  voucherCount: PropTypes.number,
};

export default QuickActions;
