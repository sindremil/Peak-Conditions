import DestinationPoint from '../schemas/DestinationPoint';
import { useWeatherData } from '../api/FetchWeatherData';
import SelectedWeatherData from '../schemas/SelectedWeatherData';
import WeatherData from '../schemas/WeatherData';
import isValidWeatherData from './isValidWeatherData';

export default function getDestinationWeatherData(
  destinationName: string,
  point: number
): WeatherData {
  const destinationPoint: DestinationPoint = {
    destination: destinationName,
    pointIndex: point,
  };
  const { data, isLoading, isError, isFetched, isRefetching, isSuccess } =
    useWeatherData(destinationPoint);

  const weatherData: WeatherData = {
    type: '',
    geometry: {
      type: '',
      coordinates: [0, 0, 0],
    },
    properties: {
      meta: {
        updated_at: '',
        units: {
          air_pressure_at_sea_level: '',
          air_temperature: '',
          cloud_area_fraction: '',
          precipitation_amount: '',
          relative_humidity: '',
          wind_from_direction: '',
          wind_speed: '',
        },
      },
      timeseries: [],
    },
  };

  if (isLoading) {
    console.log('Loading weather data');
    return weatherData;
  } else if (isError) {
    console.log('Error loading weather data');
    return weatherData;
  } else if (isFetched && isSuccess && !isRefetching) {
    return data;
  } else {
    return weatherData;
  }
}

export function getSelectedWeatherData(
  destinationName: string,
  point: number,
  timeseries: number
): SelectedWeatherData {
  const data = getDestinationWeatherData(destinationName, point);

  let weatherData: SelectedWeatherData = {
    destination: '',
    temperature: 0,
    windSpeed: 0,
    symbolCode: '',
  };

  if (isValidWeatherData(data)) {
    const dataPath = data.properties.timeseries[timeseries].data;
    weatherData = {
      destination: destinationName,
      temperature: dataPath.instant.details.air_temperature,
      windSpeed: dataPath.instant.details.wind_speed,
      symbolCode: dataPath.next_1_hours.summary.symbol_code,
    };
  }
  return weatherData;
}
