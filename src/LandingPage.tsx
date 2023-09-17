import "./component/DestinationCardStyle.css"
import "./LandingPage.css"
import DestinationCard from './component/DestinationCardComponent'
import getDestinationWeatherData from "./utils/getDestinationWeatherData"

function renderCard(destinationName : string) {

  const weatherData = getDestinationWeatherData(destinationName, 0, 0)

  if (weatherData === null) {
    return <p key={crypto.randomUUID()}>Error or loading</p>
  }

  const { destination, temperature, windSpeed, symbolCode } = weatherData;

  return (
    <div key={destination} className="destinationCardContainer">
      <DestinationCard
        destination={destination}
        temperature={temperature}
        windSpeed={windSpeed}
        symbolCode={symbolCode}
      />
    </div>
  )
}

export default function LandingPage() {
  
  const destinationList = ["Aare", "Hemsedal", "Hafjell", "Kvitfjell", "Haukelifjell"]

  return (
    <div className="content">
      {destinationList.map((destination) => (renderCard(destination)))}
    </div>
  )
}