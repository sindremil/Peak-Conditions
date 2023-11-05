import style from './Filter.module.css';
import Chip from '../../component/Chips/Chip';
import MenuChip from '../../component/Chips/MenuChip';

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
<<<<<<< HEAD
    <div className={`${'filterCard'}`}>
      <MenuChip label={sortBy} selected={false} menuItems={menuItems} />
=======
    <div className={style.filterContainer}>
      <MenuChip
        label={sortBy}
        selected={false}
        menuItems={menuItems}
      />
>>>>>>> 66008cc (♻Refactored code to use css modules)
      <Chip
        label="Vis favoritter"
        selected={showFavourites}
        onClick={handleShowFavourites}
      />
    </div>
  );
}

export default FilterComponent;
