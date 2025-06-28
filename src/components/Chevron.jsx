import React from 'react';
import '../styles/Chevron.css';

const Chevron = ({ direction = 'right', onClick }) => {
  const isLeft = direction === 'left';

  return (
    <button
      className={`chevron-button ${isLeft ? 'left' : 'right'}`}
      onClick={onClick}
      aria-label={`Scroll ${direction}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isLeft ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
};

export default Chevron;
