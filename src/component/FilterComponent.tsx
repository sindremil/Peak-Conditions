import './../component/FilterComponent.css';

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
    <div className={`${'card'} ${'filterCard'}`}>
      <div>
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
      <div>
        <label>Vis favoritter</label>
        <input
          className="showFavouritesCheckbox"
          type="checkbox"
          name="showFavourites"
          id="showFavourites"
          checked={showFavourites}
          onChange={handleShowFavourites}
        />
      </div>
    </div>
  );
}
