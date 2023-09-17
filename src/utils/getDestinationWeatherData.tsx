import DestinationPoint from '../schemas/DestinationPoint'
import { useWeatherData } from '../api/FetchWeatherData'
import SelectedWeatherData from '../schemas/SelectedWeatherData';
import WeatherData from '../schemas/WeatherData';

export default function getDestinationWeatherData(destinationName: string, point: number, timeseries : number) : any {
  const destinationPoint: DestinationPoint = {destination: destinationName, pointIndex: point}
  const { data, isLoading, isError, isFetched, isRefetching, isSuccess } = useWeatherData(destinationPoint);

  if (isLoading) {
    console.log("Loading weather data")
    return null
  } else if (isError) {
    console.log("Error loading weather data")
    return null
  } else if (isFetched && isSuccess && !isRefetching) {
    return data;
  } else {
    return null;
  }
}

export function getSelectedWeatherData(destinationName: string, point: number, timeseries : number) : SelectedWeatherData | null {
  const data = getDestinationWeatherData(destinationName, point, timeseries);

  if (data == null) {
    return null;
  } else {
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
}

export function getAllWeatherData(destinationName: string, point: number, timeseries : number) : WeatherData | null {
  const data = getDestinationWeatherData(destinationName, point, timeseries);
  if (data == null) {
    return null;
  } else {
    const weatherData : WeatherData = {
      properties: data.properties,
    }

    return weatherData;
  }
}

