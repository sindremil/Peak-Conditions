import './component/DestinationCardStyle.css';
import './LandingPage.css';
import DestinationCard from './component/DestinationCardComponent';
import { getSelectedWeatherData } from './utils/getDestinationWeatherData';
import { getFavouritesArray, isFavourite } from './utils/favourite';
import FilterComponent from './component/FilterComponent';
import { useState } from 'react';
import getDestinationNames from './utils/getDestinationNames';

function renderCard(destinationName: string) {
  const weatherData = getSelectedWeatherData(destinationName, 0, 0);

  if (!getSelectedWeatherData) {
    return (
      <p key={Math.random().toString(36).substring(2, 10)}>Error or loading</p>
    );
  }

  return (
    <div key={Math.random().toString(36).substring(2, 10)}>
      <DestinationCard
        destination={weatherData.destination}
        temperature={weatherData.temperature}
        windSpeed={weatherData.windSpeed}
        symbolCode={weatherData.symbolCode}
        isLocalStorageFavourite={isFavourite(destinationName)}
      />
    </div>
  );
}

export default function LandingPage() {
  const [showFavourites, setShowFavourites] = useState(
    sessionStorage.getItem('showFavourites') === 'checked' ? true : false
  );
  const [sortBy, setSortBy] = useState(
    sessionStorage.getItem('sortBy') || 'lexicographic'
  );

  function handleShowFavourites() {
    setShowFavourites((prevShowFavourites) => !prevShowFavourites);
    !showFavourites
      ? sessionStorage.setItem('showFavourites', 'checked')
      : sessionStorage.setItem('showFavourites', 'unchecked');
  }

  //Gets the value of the option element in the FilterComponent's select element.
  function handleSortBy(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value);
    sortBy !== 'lexicographic'
      ? sessionStorage.setItem('sortBy', 'lexicographic')
      : sessionStorage.setItem('sortBy', 'reverseLexicographic');
  }

  let destinationList = getDestinationNames();
  if (sortBy === 'lexicographic') {
    destinationList = destinationList.sort();
  } else {
    destinationList = destinationList.sort().reverse();
  }

  return (
    <main className="landingPageContainer">
      <aside className="filterContainer">
        <FilterComponent
          showFavourites={showFavourites}
          handleShowFavourites={handleShowFavourites}
          sortBy={sortBy}
          handleSorting={handleSortBy}
        />
      </aside>
      <section className="destinationCardsWrapper">
        {destinationList.map((destination) => (
          // Conditionally set the style to display "none" if destination is in array2 but not in array1
          <div
            key={destination}
            className="destinationCardContainer"
            style={{
              display:
                showFavourites && !getFavouritesArray().includes(destination)
                  ? 'none'
                  : 'block',
            }}
          >
            {renderCard(destination)}
          </div>
        ))}
      </section>
    </main>
  );
}
