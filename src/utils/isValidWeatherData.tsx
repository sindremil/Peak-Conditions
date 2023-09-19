import WeatherData from '../schemas/WeatherData';

export default function isValidWeatherData(weatherData: WeatherData): boolean {
  return (
    weatherData &&
    weatherData.properties &&
    weatherData.properties.timeseries &&
    weatherData.properties.timeseries.length > 0
  );
}
