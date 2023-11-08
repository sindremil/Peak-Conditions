export function getFavouritesArray(): string[] {
  const favoritesString: string | null = localStorage.getItem('favourites');
  let favoritesArray: string[] = [];
  if (favoritesString) {
    favoritesArray = JSON.parse(favoritesString);
  }
  return favoritesArray;
}

export function addFavourite(destinationName: string) {
  const favoritesArray = getFavouritesArray();
  favoritesArray.push(destinationName);
  localStorage.setItem('favourites', JSON.stringify(favoritesArray));
}

export function removeFavourite(destinationName: string) {
  const favoritesArray = getFavouritesArray();
  const destinationIndex = favoritesArray.indexOf(destinationName);

  //If destinatnion not found, then do nothing
  if (destinationIndex !== -1) {
    favoritesArray.splice(destinationIndex, 1);
  }
  localStorage.setItem('favourites', JSON.stringify(favoritesArray));
}

export function isFavourite(destinationName: string): boolean {
  const favouritesArray: string[] = getFavouritesArray();
  if (favouritesArray.indexOf(destinationName) == -1) {
    return false;
  }
  return true;
}
