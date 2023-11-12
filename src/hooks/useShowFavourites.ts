import { useState } from 'react';

// Hook to handle showing favourites
function useShowFavourites() {
  // Retrieve the initial state from sessionStorage or default to false
  const [showFavourites, setShowFavourites] = useState(
    sessionStorage.getItem('showFavourites') === 'checked'
  );

  // Toggler function for the showFavourites state
  const handleShowFavourites = () => {
    setShowFavourites(prevShowFavourites => {
      const newShowFavourites = !prevShowFavourites;
      // Update sessionStorage immediately
      sessionStorage.setItem('showFavourites', newShowFavourites ? 'checked' : 'unchecked');
      return newShowFavourites;
    });
  };

  return { showFavourites, handleShowFavourites };
}

export default useShowFavourites;
