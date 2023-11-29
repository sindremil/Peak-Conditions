import style from "./LandingPage.module.css";
import DestinationCard from "../../features/DestinationCard/DestinationCard";
import { getFavouritesArray, isFavourite } from "../../utils/favourite";
import FilterComponent from "../../features/Filter/Filter";
import getDestinationNames from "../../utils/getDestinationNames";
import Navbar from "../../features/Navbar.tsx/NavBar";
import DestinationPoint from "../../interfaces/DestinationPoint";
import destinationsJson from "../../configs/destinations.json";
import usePageTitle from "../../hooks/usePageTitle";
import useShowFavourites from "../../hooks/useShowFavourites";
import useSortBy from "../../hooks/useSortBy";

export default function LandingPage() {
  usePageTitle("Home");
  const { showFavourites, handleShowFavourites } = useShowFavourites();
  const { sortBy, handleSortBy } = useSortBy();

  let destinationList = getDestinationNames();
  if (sortBy === "lexicographic") {
    destinationList = destinationList.sort();
  } else {
    destinationList = destinationList.sort().reverse();
  }

  function getFirstDestinationPoint(destinationName: string): DestinationPoint {
    // Find the destination with the matching name
    const destinationIndex = destinationsJson.destinations.findIndex(
      (dest) => dest.name === destinationName,
    );

    // If the destination is found and has points, return the first point index
    if (
      destinationIndex !== -1 &&
      destinationsJson.destinations[destinationIndex].points.length > 0
    ) {
      return { destination: destinationName, pointIndex: 0 };
    }

    // If no matching destination is found or there are no points, return Åre
    return { destination: "Åre", pointIndex: 0 };
  }

  function renderCard(destinationPoint: DestinationPoint) {
    const { destination } = destinationPoint;

    return (
      <div key={Math.random().toString(36).substring(2, 10)}>
        <DestinationCard
          destinationPoint={destinationPoint}
          isLocalStorageFavourite={isFavourite(destination)}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className={style.landingPageContainer}>
        <aside className={style.filterContainer}>
          <FilterComponent
            showFavourites={showFavourites}
            handleShowFavourites={handleShowFavourites}
            sortBy={sortBy}
            handleSorting={handleSortBy}
          />
        </aside>
        <section className={style.destinationCardsWrapper}>
          {destinationList.map((destination) => (
            // Conditionally set the style to display "none" if destination is in array2 but not in array1
            <div
              key={destination}
              className={style.destinationCardContainer}
              style={{
                display:
                  showFavourites && !getFavouritesArray().includes(destination)
                    ? "none"
                    : "block",
              }}
            >
              {renderCard(getFirstDestinationPoint(destination))}
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
