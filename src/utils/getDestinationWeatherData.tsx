import DestinationPoint from '../schemas/DestinationPoint'
import { useWeatherData } from '../api/FetchWeatherData'
import DestinationCardWeather from '../schemas/SelectedWeatherData'
import SelectedWeatherData from '../schemas/SelectedWeatherData';

export default function getDestinationWeatherData(destinationName: string, point: number, timeseries : number) : SelectedWeatherData | null {
  const destinationPoint: DestinationPoint = {destination: destinationName, pointIndex: point}
  const { data, isLoading, isError } = useWeatherData(destinationPoint);

  if (isLoading) {
    console.log("Loading weather data")
    return null
  }

  if (isError) {
    console.log("Error loading weather data")
    return null
  }

  const airTemperature = data.properties.timeseries[timeseries].data.instant.details.air_temperature;
  const windSpeed = data.properties.timeseries[timeseries].data.instant.details.wind_speed;
  const symbolCode = data.properties.timeseries[timeseries].data.next_1_hours.summary.symbol_code;


  const weatherData : SelectedWeatherData = {
    destination: destinationName,
    temperature: airTemperature,
    windSpeed: windSpeed,
    symbolCode: symbolCode
  }

  return weatherData
}