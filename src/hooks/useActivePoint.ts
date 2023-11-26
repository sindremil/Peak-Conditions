import { useState, useEffect } from "react";

function useActivePoint(
  destination: string,
  defaultValue: number = 0,
): [number, (newValue: number) => void] {
  // Construct a unique key for session storage based on the destination
  const storageKey = `activePoint-${destination}`;

  // Try to read the activePoint for the given destination from session storage, default to the provided defaultValue if not found
  const initialActivePoint =
    Number(sessionStorage.getItem(storageKey)) || defaultValue;
  const [activePoint, setActivePoint] = useState<number>(initialActivePoint);

  // Update session storage when activePoint changes
  useEffect(() => {
    sessionStorage.setItem(storageKey, activePoint.toString());
  }, [activePoint, storageKey]);

  return [activePoint, setActivePoint];
}

export default useActivePoint;
