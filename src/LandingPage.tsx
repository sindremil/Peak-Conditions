import './component/DestinationCardStyle.css';
import './LandingPage.css';
import DestinationCard from './component/DestinationCardComponent';
import { selectedWeatherData } from './utils/getDestinationWeatherData';
import { getFavouritesArray, isFavourite } from './utils/favourite';
import destinationsConfig from './configs/destinations.json';
import FilterComponent from './component/FilterComponent';
import { useState } from 'react';

function getDestinationNames() {
  const destinationNames = destinationsConfig.destinations.map(
    (destination) => destination.name
  );
  return destinationNames;
}

function renderCard(destinationName: string) {
  const weatherData = getDestinationWeatherData(destinationName, 0, 0);

  if (!selectedWeatherData) {

    return <p key={crypto.randomUUID()}>Error or loading</p>;
  }

  return (

    <div key={crypto.randomUUID()} className="destinationCardContainer">
      <DestinationCard
        destination={selectedWeatherData.destination}
        temperature={selectedWeatherData.temperature}
        windSpeed={selectedWeatherData.windSpeed}
        symbolCode={selectedWeatherData.symbolCode}
        isLocalStorageFavourite={isFavourite(destinationName)}
      />
  );
}

export default function LandingPage() {

  const [showFavourites, setShowFavourites] = useState(sessionStorage.getItem("showFavourites") === "checked" ? true : false);
  const [sortBy, setSortBy] = useState(sessionStorage.getItem("sortBy") || "lexicographic")
  
  function handleShowFavourites() {
    setShowFavourites(prevShowFavourites => !prevShowFavourites);
    !showFavourites ? sessionStorage.setItem("showFavourites", "checked") : sessionStorage.setItem("showFavourites", "unchecked");
  }

  //Gets the value of the option element in the FilterComponent's select element.
  function handleSortBy(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value);
    sortBy !== "lexicographic" ? sessionStorage.setItem("sortBy", "lexicographic") : sessionStorage.setItem("sortBy", "reverseLexicographic")
  }

  let destinationList = getDestinationNames();
  if (sortBy === "lexicographic") {
    destinationList = destinationList.sort();
  }
  else {
    destinationList = destinationList.sort().reverse();
  }

  return (
    <>
      <FilterComponent
        showFavourites={showFavourites}
        handleShowFavourites={handleShowFavourites}
        sortBy={sortBy}
        handleSorting={handleSortBy}
      />
      <div className="content">
        {destinationList.map((destination) => (
          // Conditionally set the style to display "none" if destination is in array2 but not in array1
          <div
            key={destination}
            className="destinationCardContainer"
            style={{
              display:
                showFavourites && !getFavouritesArray().includes(destination) ? "none" : "block",
            }}
          >
            {renderCard(destination)}
          </div>
        ))}
      </div>
    </>
  );
}
