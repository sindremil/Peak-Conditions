interface FilterComponentProps {
  showFavourites: boolean;
  handleShowFavourites: () => void;
}

export default function FilterComponent({showFavourites, handleShowFavourites}: FilterComponentProps) {

  return (
    <div>
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
