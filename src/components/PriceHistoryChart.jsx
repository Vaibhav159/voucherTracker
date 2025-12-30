import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const PriceHistoryChart = ({ priceHistory, platformName }) => {
  // Filter history for specific platform and sort by date
  const data = useMemo(() => {
    return priceHistory
      .filter(point => point.platform === platformName)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-30); // Last 30 data points
  }, [priceHistory, platformName]);

  if (data.length === 0) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        background: 'var(--glass-bg)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)'
      }}>
        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>📈</span>
        No price history available for {platformName}
      </div>
    );
  }

  const width = 600;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  // Calculate scales
  const maxDiscount = Math.max(...data.map(d => d.discount), 5);
  const minDiscount = Math.min(...data.map(d => d.discount), 0);

  const xScale = (index) => {
    return padding.left + (index / (data.length - 1)) * (width - padding.left - padding.right);
  };

  const yScale = (value) => {
    const range = maxDiscount - minDiscount;
    const normalized = range > 0 ? (value - minDiscount) / range : 0.5;
    return height - padding.bottom - normalized * (height - padding.top - padding.bottom);
  };

  // Generate path for line chart
  const linePath = data
    .map((point, index) => {
      const x = xScale(index);
      const y = yScale(point.discount);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate area fill
  const areaPath = data.length > 0
    ? `${linePath} L ${xScale(data.length - 1)} ${height - padding.bottom} L ${xScale(0)} ${height - padding.bottom} Z`
    : '';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  return (
    <div style={{
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-md)',
      overflow: 'auto'
    }}>
      <div style={{ marginBottom: '12px' }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
          Price History - {platformName}
        </h4>
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          Showing last {data.length} data points
        </p>
      </div>

      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'visible' }}
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding.top + (i / 4) * (height - padding.top - padding.bottom);
          const value = maxDiscount - (i / 4) * (maxDiscount - minDiscount);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="var(--glass-border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {value.toFixed(1)}%
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path
          d={areaPath}
          fill="var(--accent-cyan)"
          fillOpacity="0.1"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((point, index) => (
          <g key={index}>
            <circle
              cx={xScale(index)}
              cy={yScale(point.discount)}
              r="4"
              fill="var(--accent-cyan)"
              stroke="var(--bg-color)"
              strokeWidth="2"
            />
            {/* Tooltip on hover */}
            <title>{`${formatDate(point.date)}: ${point.discount}%`}</title>
          </g>
        ))}

        {/* X-axis labels */}
        {data.filter((_, i) => i % Math.ceil(data.length / 5) === 0 || i === data.length - 1).map((point, index, arr) => {
          const dataIndex = data.indexOf(point);
          return (
            <text
              key={dataIndex}
              x={xScale(dataIndex)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              {formatDate(point.date)}
            </text>
          );
        })}

        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="var(--glass-border)"
          strokeWidth="2"
        />
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="var(--glass-border)"
          strokeWidth="2"
        />

        {/* Y-axis label */}
        <text
          x={15}
          y={height / 2}
          textAnchor="middle"
          fontSize="11"
          fill="var(--text-secondary)"
          transform={`rotate(-90, 15, ${height / 2})`}
        >
          Discount %
        </text>
      </svg>

      {/* Stats */}
      <div style={{
        marginTop: '16px',
        display: 'flex',
        gap: '16px',
        paddingTop: '12px',
        borderTop: '1px solid var(--glass-border)'
      }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Current</div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
            {data[data.length - 1].discount}%
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Best</div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-success)' }}>
            {Math.max(...data.map(d => d.discount))}%
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>Average</div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {(data.reduce((sum, d) => sum + d.discount, 0) / data.length).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

PriceHistoryChart.propTypes = {
  priceHistory: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired
  })).isRequired,
  platformName: PropTypes.string.isRequired
};

export default PriceHistoryChart;
