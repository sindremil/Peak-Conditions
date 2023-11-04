import './../component/FilterComponent.css';
import Chip from './Chip';
import MenuChip from './MenuChip';

interface FilterComponentProps {
  showFavourites: boolean;
  handleShowFavourites: () => void;
  sortBy: string;
  handleSorting: (order: string) => void;
}

function FilterComponent({
  showFavourites,
  handleShowFavourites,
  sortBy,
  handleSorting,
}: FilterComponentProps): JSX.Element {
  const menuItems = [
    {
      label: 'A - Z',
      onClick: () => {
        handleSorting('lexicographic');
      },
    },
    {
      label: 'Z - A',
      onClick: () => {
        handleSorting('reverseLexicographic');
      },
    },
  ];

  return (
    <div className={`${'filterCard'}`}>
      <MenuChip label={sortBy} selected={false} menuItems={menuItems} />
      <Chip
        label="Vis favoritter"
        selected={showFavourites}
        onClick={handleShowFavourites}
      />
    </div>
  );
}

export default FilterComponent;
