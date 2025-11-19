import React from 'react';

const FloorNumberSVG = ({
  floor = 1,
  size = 30,
  bgColor = '#3498db',
  textColor = '#ffffff',
  borderColor = '#ccc',
  fontFamily = 'Arial Black, Arial, sans-serif',
}) => {
  return (
    <svg
    title={`Floor ${floor}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Floor ${floor}`}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill={bgColor}
        stroke={borderColor}
        strokeWidth="0"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="50"
        fontFamily={fontFamily}
        fontWeight="bold"
        fill={textColor}
      >
        {floor}
      </text>
    </svg>
  );
};

export default FloorNumberSVG;
