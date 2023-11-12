import style from './DestinationPage.module.css';
import NewForecastList from '../../features/NewForecastList/NewForecastList';
import Navbar from '../../features/Navbar.tsx/NavBar';
import destinationsJson from '../../configs/destinations.json'
import PeakSelector from '../../component/PeakSelector/PeakSelector';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SetPageTitle from '../../utils/SetPageTitle';

export default function DestinationPage() {
  const [activePoint, setActivePoint] = useState<number>(0);
  
  const { destinationParam } = useParams();
  const destination = decodeURIComponent(destinationParam || "");

  // Only retuns the name of the point and its altitiude in meters
  function getPoints(destinationName: string): { name: string, alt: number }[] {
    // Find the destination with the matching name
    const destination = destinationsJson.destinations.find(dest => dest.name === destinationName);
    
    // If the destination is found, map over its points to get an array of point names and altitudes
    return destination ? destination.points.map(point => ({ name: point.name, alt: point.alt })) : [];
  }
  
  const points = getPoints(destination);
  const labels: readonly string[] = ["Bunn", "Midten", "Toppen"]

  const handelPeakSelectorClick = (index: number) => {
    setActivePoint(index);
  };

  return (
    <>
    <SetPageTitle title={destination} />
    <Navbar />
    <main id={style.DestinationPageWrapper}>
      <h2>{`${destination}, ${points[activePoint].name}, ${points[activePoint].alt} moh.`}</h2>
      <nav className={style.floatingNav}>
        {points.map((point, index) => (
          <PeakSelector key={point.name} label={labels[index]} onClick={() => handelPeakSelectorClick(index)} isActive={index === activePoint} />
        ))}
      </nav>
      <NewForecastList destination={destination} pointIndex={activePoint}/>
    </main>
    </>
  );
}
