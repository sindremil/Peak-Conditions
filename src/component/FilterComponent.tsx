// FilterComponent.tsx
import React from 'react';
import './../component/FilterComponent.css';
import Chip from './Chip';
import MenuChip from './MenuChip';

interface FilterComponentProps {
  showFavourites: boolean;
  handleShowFavourites: () => void;
  sortBy: string;
  handleSorting: (order: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  showFavourites,
  handleShowFavourites,
  sortBy,
  handleSorting,
}) => {
  const menuItems = [
    {
      label: 'Stigende',
      onClick: () => {
        handleSorting("lexicographic")
      },
    },
    {
      label: 'Synkende',
      onClick: () => {
        handleSorting("reverseLexicographic")
      },
    },
  ];

  return (
    <div className={`${'filterCard'}`}>
      <MenuChip
        label={sortBy}
        selected={false}
        menuItems={menuItems}
      />
      <Chip
        label="Vis favoritter"
        selected={showFavourites}
        onClick={handleShowFavourites}
      />
    </div>
  );
};

export default FilterComponent;
