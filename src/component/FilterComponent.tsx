import './../component/FilterComponent.css';
import Chip from './Chip';

interface FilterComponentProps {
  showFavourites: boolean;
  handleShowFavourites: () => void;

  sortBy: string;
  handleSorting: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterComponent({
  showFavourites,
  handleShowFavourites,
  sortBy,
  handleSorting,
}: FilterComponentProps) {
  return (
    <div className={`${'filterCard'}`}>
      <Chip
        label={"Vis favoritter"}
        selected={showFavourites}
        onClick={handleShowFavourites}
      ></Chip>
      <div style={{display: "none"}}>
        <label>Sorter etter</label>
        <select
          name="sortBy"
          id="sortBy"
          onChange={handleSorting}
          value={sortBy}
        >
          <option value="lexicographic">Alfabetisk</option>
          <option value="reverseLexicographic">Reversert alfabetisk</option>
        </select>
      </div>
    </div>
  );
}
