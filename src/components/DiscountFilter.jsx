import PropTypes from 'prop-types';

const DISCOUNT_OPTIONS = [
    { label: 'All', value: 0 },
    { label: '10%+', value: 10 },
    { label: '15%+', value: 15 },
    { label: '20%+', value: 20 },
];

const DiscountFilter = ({ selectedDiscount, onSelect }) => {
    return (
        <div className="discount-filter">
            <span className="discount-filter__label">Filter by discount:</span>
            <div className="discount-filter__chips">
                {DISCOUNT_OPTIONS.map(opt => (
                    <button
                        key={opt.value}
                        className={`discount-chip ${selectedDiscount === opt.value ? 'active' : ''}`}
                        onClick={() => onSelect(opt.value)}
                        aria-pressed={selectedDiscount === opt.value}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

DiscountFilter.propTypes = {
    selectedDiscount: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default DiscountFilter;
