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

  function getPointNames(destinationName: string): string[] {
    // Find the destination with the matching name
    const destination = destinationsJson.destinations.find(dest => dest.name === destinationName);
    
    // If the destination is found, map over its points to get an array of point names
    return destination ? destination.points.map(point => point.name) : [];
  }
  
  const pointNames = getPointNames(destination);

  const handelPeakSelectorClick = (index: number) => {
    setActivePoint(index);
  };

  return (
    <>
    <SetPageTitle title={destination} />
    <Navbar />
    <main id={style.DestinationPageWrapper}>
      <h1>{destination}</h1>
      <div>
        {pointNames.map((label, index) => (
          <PeakSelector key={label} label={index} onClick={() => handelPeakSelectorClick(index)} isActive={index === activePoint} />
        ))}
      </div>
      <NewForecastList destination={destination} pointIndex={activePoint}/>
    </main>
    </>
  );
}
