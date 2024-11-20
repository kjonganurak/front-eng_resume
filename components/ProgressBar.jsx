import React from 'react';

const CircleProgressBar = ({ current, total, label }) => {
  const percentage = (current / total) * 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="100" viewBox="0 0 100 100">
        {/* Grey background circle */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke="#e0e0e0" 
          strokeWidth="10"
        />
        {/* Gradient filled circle */}
        <defs>
          <linearGradient id="blueToPinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke="url(#blueToPinkGradient)" 
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="text-center mt-2">
        <div className="font-bold">{label}</div>
        <div>{current}/{total}</div>
        <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
      </div>
    </div>
  );
};

export default CircleProgressBar;