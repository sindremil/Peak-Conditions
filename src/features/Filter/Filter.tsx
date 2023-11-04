import './Filter.css';
import Chip from '../../component/Chips/Chip';
import MenuChip from '../../component/Chips/MenuChip';

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
      label: 'A - Z',
      onClick: () => {
        handleSorting("lexicographic")
      },
    },
    {
      label: 'Z - A',
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
