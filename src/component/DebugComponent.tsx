//import { useWeatherData } from "../api/FetchWeatherData";

import { useWeatherData } from '../api/FetchWeatherData';
import DestinationPoint from '../schemas/DestinationPoint';

function DebugComponent() {
  const destinationPoint: DestinationPoint = {
    destination: 'Aare',
    pointIndex: 0,
  };
  const { data, isLoading, isError } = useWeatherData(destinationPoint);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading weather data</div>;
  }

  const airTemp =
    data.properties.timeseries[0].data.instant.details.air_temperature;
  const windSpeed =
    data.properties.timeseries[0].data.instant.details.wind_speed;
  const symbol =
    data.properties.timeseries[0].data.next_1_hours.summary.symbol_code;

  return (
    <div>
      <p>{airTemp}</p>
      <p>{windSpeed}</p>
      <p>{symbol}</p>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}

export default DebugComponent;
