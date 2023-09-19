import './component/DestinationCardStyle.css';
import './LandingPage.css';
import DestinationCard from './component/DestinationCardComponent';
import { getSelectedWeatherData } from './utils/getDestinationWeatherData';
import { isFavourite } from './utils/favourite';
import SelectedWeatherData from './schemas/SelectedWeatherData';

function renderCard(destinationName: string) {
  const selectedWeatherData: SelectedWeatherData = getSelectedWeatherData(
    destinationName,
    0,
    0
  );

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
    </div>
  );
}

export default function LandingPage() {
  const destinationList = [
    'Åre',
    'Hemsedal',
    'Hafjell',
    'Kvitfjell',
    'Norefjell',
    'Geilo (Vestlia)',
    'Geilo (Geilosiden)',
    'Åre (Duved)',
    'Haukelifjell',
  ];

  return (
    <>
      <div className="content">
        {destinationList.map((destination) => renderCard(destination))}
      </div>
    </>
  );
}
