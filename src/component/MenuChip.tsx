import React, { useState } from 'react';
import './Chip.css';
import expandMore from './../assets/expandMore.svg';
import expandLess from './../assets/expandLess.svg';

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface MenuChipProps {
  label: string;
  selected: boolean;
  menuItems?: MenuItem[];
}

const MenuChip: React.FC<MenuChipProps> = ({ label, selected, menuItems }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuChipClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (onClick: () => void) => {
    setMenuOpen(false);
    onClick();
  };

  return (
    <div className="chip-container">
      <button
        className={`chip ${selected ? 'selected' : ''}`}
        onClick={handleMenuChipClick}
        role="button"
        tabIndex={0}
        aria-label={label}
      >
        <span className="chip-label">{label === 'lexicographic' ? 'A - Z' : 'Z - A'}</span>
        <img src={isMenuOpen ? expandLess : expandMore} alt="menu" className={`chipIcon`} />
      </button>
      {isMenuOpen && menuItems && (
        <ul className="menu-items">
          {menuItems.map((menuItem, index) => (
            <li key={index} onClick={() => handleMenuItemClick(menuItem.onClick)}>
              {menuItem.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuChip;
