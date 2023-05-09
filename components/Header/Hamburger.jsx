import React from 'react';

function Hamburger({ isOpen, onToggle }) {
  return (
    <button onClick={onToggle}>
      {isOpen ? 'Close' : 'Open'}
    </button>
  );
}

export default Hamburger;
