import React from 'react';
import './Chip.css';
import checkmark from './../assets/checkmark.svg';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => {
  const handleChipClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`chip ${selected ? 'selected' : ''}`}
      onClick={handleChipClick}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      <img src={checkmark} alt="checkmark" className={`checkmark ${selected ? '' : 'hidden'}`}/>
      <span className="chip-label">{label}</span>
    </button>
  );
};

export default Chip;
