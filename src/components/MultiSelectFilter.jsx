import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MultiSelectFilter = ({ title, options, selectedValues, onChange, icon, getCounts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter options based on search
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (option) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(v => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const handleSelectAll = () => {
    onChange(filteredOptions);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="multi-select-filter">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-md)'
      }}>
        <h3 className="multi-select-filter__title">
          {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
          {title}
        </h3>
        {selectedValues.length > 0 && (
          <button
            onClick={handleClearAll}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-cyan)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 'var(--radius-xs)',
              transition: 'background var(--duration-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--glass-bg)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Clear ({selectedValues.length})
          </button>
        )}
      </div>

      {/* Search input */}
      {options.length > 5 && (
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="category-filter__input"
        />
      )}

      {/* Select All / Clear All buttons */}
      {filteredOptions.length > 3 && (
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <button
            onClick={handleSelectAll}
            style={{
              flex: 1,
              padding: '6px 12px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all var(--duration-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--item-hover-bg)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--glass-bg)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            Select All
          </button>
        </div>
      )}

      {/* Options list */}
      <div className="multi-select-filter__options">
        {filteredOptions.map((option) => {
          const isSelected = selectedValues.includes(option);
          const count = getCounts ? getCounts(option) : null;

          return (
            <div
              key={option}
              className="multi-select-filter__option"
              onClick={() => handleToggle(option)}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => {}} // Controlled by parent onClick
                className="multi-select-filter__checkbox"
                style={{ cursor: 'pointer' }}
              />
              <label className="multi-select-filter__label" style={{ cursor: 'pointer' }}>
                {option}
              </label>
              {count !== null && count !== undefined && (
                <span className="multi-select-filter__count">{count}</span>
              )}
            </div>
          );
        })}
      </div>

      {filteredOptions.length === 0 && (
        <div style={{
          padding: 'var(--space-lg)',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem'
        }}>
          No {title.toLowerCase()} found
        </div>
      )}
    </div>
  );
};

MultiSelectFilter.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
  getCounts: PropTypes.func
};

export default MultiSelectFilter;
