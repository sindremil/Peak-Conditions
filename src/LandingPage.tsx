import './component/DestinationCardStyle.css';
import './LandingPage.css';
import DestinationCard from './component/DestinationCardComponent';
import getDestinationWeatherData from './utils/getDestinationWeatherData';
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

  if (weatherData === null) {
    return <p key={crypto.randomUUID()}>Error or loading</p>;
  }

  const { destination, temperature, windSpeed, symbolCode } = weatherData;

  return (
      <DestinationCard
        destination={destination}
        temperature={temperature}
        windSpeed={windSpeed}
        symbolCode={symbolCode}
        isLocalStorageFavourite={isFavourite(destinationName)}
      />
  );
}

export default function LandingPage() {

  const [showFavourites, setShowFavourites] = useState(sessionStorage.getItem("showFavourites") === "checked" ? true : false);
  
  function handleShowFavourites() {
    setShowFavourites(prevShowFavourites => !prevShowFavourites);
    !showFavourites ? sessionStorage.setItem("showFavourites", "checked") : sessionStorage.setItem("showFavourites", "unchecked");
  }

  return (
    <div className="content">
      <FilterComponent
        showFavourites={showFavourites}
        handleShowFavourites={handleShowFavourites}
      />
      {getDestinationNames().map((destination) => (
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
  );
}