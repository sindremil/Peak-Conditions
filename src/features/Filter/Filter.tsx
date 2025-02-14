import style from "./Filter.module.css";
import Chip from "../../component/Chips/Chip";
import MenuChip from "../../component/Chips/MenuChip";

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
}: FilterComponentProps) {
  const menuItems = [
    {
      label: "A - Z",
      onClick: () => {
        handleSorting("lexicographic");
      },
    },
    {
      label: "Z - A",
      onClick: () => {
        handleSorting("reverseLexicographic");
      },
    },
  ];

  return (
    <div className={style.filterContainer}>
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
