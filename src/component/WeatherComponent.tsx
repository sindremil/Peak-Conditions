import { useWeatherData } from '../api/FetchWeatherData';

function WeatherComponent() {
  const { data, isLoading, isError } = useWeatherData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  return (
    <div>
      {/* Render the weather data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default WeatherComponent;
