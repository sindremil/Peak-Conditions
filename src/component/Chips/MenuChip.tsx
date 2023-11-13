import { useState } from 'react';
import './Chip.css';
import expandMore from '../../assets/expandMore.svg';
import expandLess from '../../assets/expandLess.svg';

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface MenuChipProps {
  label: string;
  selected: boolean;
  menuItems: MenuItem[];
}

function MenuChip({ label, selected, menuItems }: MenuChipProps): JSX.Element {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuChipClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (onClick: () => void) => {
    setMenuOpen(false);
    onClick();
  };

  const handleKeyPress = (event: React.KeyboardEvent, onClick: () => void) => {
    if (event.key === 'Enter') {
      handleMenuItemClick(onClick);
    }
  };

  return (
    <div className="chip-container">
      <button
        className={`chip ${selected ? 'selected' : ''}`}
        onClick={handleMenuChipClick}
        tabIndex={0}
        aria-label={label}
        type='button'
      >
        <span className="chip-label">{label === 'lexicographic' ? 'A - Z' : 'Z - A'}</span>
        <img src={isMenuOpen ? expandLess : expandMore} alt="Toggle menu" className="chipIcon" />
      </button>
      {isMenuOpen && menuItems && (
        <ul className="menu-items">
          {menuItems.map((menuItem) => (
            <button className='buttonListItem'
              key={menuItem.label}
              type='button'
              onClick={() => handleMenuItemClick(menuItem.onClick)}
              onKeyDown = {(event) => handleKeyPress(event, menuItem.onClick)}
              tabIndex={0}
            >
              {menuItem.label}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuChip;
