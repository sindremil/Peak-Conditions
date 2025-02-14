import { useParams } from "react-router-dom";
import style from "./DestinationPage.module.css";
import NewForecastList from "../../features/NewForecastList/NewForecastList";
import Navbar from "../../features/Navbar.tsx/NavBar";
import destinationsJson from "../../configs/destinations.json";
import PeakSelector from "../../component/PeakSelector/PeakSelector";
import useScrollToTop from "../../hooks/useScrollToTop";
import usePageTitle from "../../hooks/usePageTitle";
import BackButton from "../../component/BackButton/BackButton";
import useActivePoint from "../../hooks/useActivePoint";

export default function DestinationPage() {
  useScrollToTop();
  const { destinationParam } = useParams();
  const destination = decodeURIComponent(destinationParam || "");
  usePageTitle(destination);
  const [activePoint, setActivePoint] = useActivePoint(destination);

  // Only retuns the name of the point and its altitiude in meters
  function getPoints(destinationName: string): { name: string; alt: number }[] {
    // Find the destination with the matching name
    const queriedDestination = destinationsJson.destinations.find(
      (dest) => dest.name === destinationName,
    );

    // If the destination is found, map over its points to get an array of point names and altitudes
    return queriedDestination
      ? queriedDestination.points.map((point) => ({
          name: point.name,
          alt: point.alt,
        }))
      : [];
  }

  const points = getPoints(destination);
  const labels: readonly string[] = ["Bunn", "Midten", "Toppen"];

  return (
    <>
      <Navbar />
      <main id={style.DestinationPageWrapper}>
        <header className={style.header}>
          <BackButton to=".." />
          <h2>{`${destination}, ${points[activePoint].name}, ${points[activePoint].alt} moh.`}</h2>
        </header>
        <nav className={style.floatingNav}>
          {points.map((point, index) => (
            <PeakSelector
              key={point.name}
              label={labels[index]}
              onClick={() => setActivePoint(index)}
              isActive={index === activePoint}
            />
          ))}
        </nav>
        <NewForecastList destination={destination} pointIndex={activePoint} />
      </main>
    </>
  );
}
