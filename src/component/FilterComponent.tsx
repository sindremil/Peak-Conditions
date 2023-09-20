import './../component/FilterComponent.css'

interface FilterComponentProps {
  showFavourites: boolean;
  handleShowFavourites: () => void;

  sortBy: string;
  handleSorting: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterComponent({showFavourites, handleShowFavourites, sortBy, handleSorting}: FilterComponentProps) {

  return (
    <div className={`${"card"} ${"filterCard"}`}>
      <label>Sorter etter
        <select 
          name="sortBy" 
          id="sortBy"
          onChange={handleSorting}
          value={sortBy}
        >
            <option value="lexicographic">Alfabetisk</option>
            <option value="reverseLexicographic">Reverste alfabetisk</option>
        </select>
      </label>
      <label className='showFavouritesCheckbox'>
        Vis favoritter
        <input
          type="checkbox"
          name="showFavourites"
          id="showFavourites"
          checked={showFavourites}
          onChange={handleShowFavourites}
        />
      </label>
    </div>
  );
}
