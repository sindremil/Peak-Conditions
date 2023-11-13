import { useState } from 'react';

// Hook to handle sorting preferences
function useSortBy() {
  // Retrieve the initial state from sessionStorage or default to 'lexicographic'
  const [sortBy, setSortBy] = useState(
    sessionStorage.getItem('sortBy') || 'lexicographic'
  );

  // Function to update sortBy state and sessionStorage
  const handleSortBy = (order: string) => {
    setSortBy(order);
    // Update sessionStorage immediately
    sessionStorage.setItem('sortBy', order);
  };

  return { sortBy, handleSortBy };
}

export default useSortBy;
