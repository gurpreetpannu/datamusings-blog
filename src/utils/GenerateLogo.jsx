import React from 'react';

const GenerateLogo = ({ size = 512 }) => {
  return (
    <svg 
      width={size}
      height={size}
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: '#1a8917' }}
    >
      {/* Robot Head */}
      <rect x="8" y="8" width="24" height="24" rx="4" fill="#1a8917"/>
      {/* Eyes */}
      <circle cx="16" cy="18" r="3" fill="white"/>
      <circle cx="24" cy="18" r="3" fill="white"/>
      {/* Antenna */}
      <line x1="20" y1="8" x2="20" y2="4" stroke="#1a8917" strokeWidth="2"/>
      <circle cx="20" cy="4" r="2" fill="#1a8917"/>
      {/* Smile */}
      <path 
        d="M14 24C14 24 16 26 20 26C24 26 26 24 26 24" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default GenerateLogo; 