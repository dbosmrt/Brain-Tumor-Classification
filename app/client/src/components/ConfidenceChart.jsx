import { useMemo } from 'react';

export default function ConfidenceChart({ confidence, dark }) {
  const pct = Math.round(confidence * 100);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (confidence * circumference);

  const color = useMemo(() => {
    if (pct >= 80) return '#22c55e';
    if (pct >= 50) return '#f59e0b';
    return '#ef4444';
  }, [pct]);

  return (
    <div className="flex items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 100 100">
        {/* Background ring */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={dark ? '#334155' : '#e2e8f0'}
          strokeWidth="8"
        />
        {/* Animated progress ring */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          className="ring-animate"
          style={{ '--ring-offset': offset }}
        />
        {/* Center text */}
        <text
          x="50" y="46"
          textAnchor="middle"
          className={`text-2xl font-bold ${dark ? 'fill-dark-text' : 'fill-text'}`}
          style={{ fontSize: '22px', fontWeight: 700 }}
        >
          {pct}%
        </text>
        <text
          x="50" y="62"
          textAnchor="middle"
          className={`${dark ? 'fill-dark-text-secondary' : 'fill-text-secondary'}`}
          style={{ fontSize: '8px' }}
        >
          High Confidence
        </text>
      </svg>
    </div>
  );
}
