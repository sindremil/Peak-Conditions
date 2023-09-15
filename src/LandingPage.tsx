import "./component/DestinationCardStyle.css"
import DestinationCard from './component/DestinationCardComponent'
import DebugComponent from './component/DebugComponent'
import DestinationPoint from './schemas/DestinationPoint'
import { useWeatherData } from './api/FetchWeatherData'

export default function LandingPage() {
  
  const destinationList = ["Aare", "Hemsedal"]

  function getDestinationWeatherData(destinationName: string) {
    const destinationPoint: DestinationPoint = {destination: destinationName, pointIndex: 0}
    const { data, isLoading, isError } = useWeatherData(destinationPoint);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error loading weather data</div>;
    } 

    const airTemperature = data.properties.timeseries[0].data.instant.details.air_temperature;
    const windSpeed = data.properties.timeseries[0].data.instant.details.wind_speed;
    const symbolCode = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code;

    console.log(destinationPoint.destination)

    return (
      <div key={destinationPoint.destination}>
        <DestinationCard
          destination={destinationPoint.destination}
          temperature={airTemperature}
          windSpeed={windSpeed}
          symbolCode={symbolCode}
        />
      </div>)
    }
  

  return (
    <div className="content">
      {destinationList.map((destination) => (getDestinationWeatherData(destination)))}
      <DebugComponent/>
    </div>
  )
}