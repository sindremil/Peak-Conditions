interface FilterComponentProps {
  showFavourites: boolean;
  handleShowFavourites: () => void;

  sortBy: string;
  handleSorting: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterComponent({showFavourites, handleShowFavourites, sortBy, handleSorting}: FilterComponentProps) {

  return (
    <div>
      <label>Sort by:
        <select 
          name="sortBy" 
          id="sortBy"
          onChange={handleSorting}
        >
            <option value="lexicographic">Alphbetical</option>
            <option value="reverseLexicographic">Reverse alphabetical</option>
        </select>
      </label>
      <label>
        Show Favorites:
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
