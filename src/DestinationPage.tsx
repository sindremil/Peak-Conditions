import { useState } from 'react';
import ForecastList from './component/ForecastList';
import WeatherNowComponent from './component/WeatherNowComponent';
import getDestinationWeatherData from './utils/getDestinationWeatherData';
import isValidWeatherData from './utils/isValidWeatherData';
import './DestinationPage.css';

export default function DestinationPage({
  destination,
}: {
  destination: string;
}) {
  const points: number[] = [0, 1, 2];
  const [selectedPoint, setSelectedPoint] = useState(0);

  function handleWeatherComponentClick(point: number) {
    setSelectedPoint(point);
  }

  function renderWeatherNowComponent(destination: string, point: number) {
    const weatherData = getDestinationWeatherData(destination, point);
    if (isValidWeatherData(weatherData)) {
      return (
        <div key={destination + point}>
          <WeatherNowComponent
            destination={destination}
            point={point}
            data={weatherData}
            handleWeatherComponentClick={handleWeatherComponentClick}
          />
        </div>
      );
    }
  }

  function renderForecastLists(destination: string, points: number[]) {
    const forecastList = [];
    for (let point = 0; point < points.length; point++) {
      forecastList.push(
        <div
          key={destination + point}
          className="forecastListDisplay"
          style={{
            display: selectedPoint == point ? 'grid' : 'none',
          }}
        >
          <ForecastList
            key={destination + point}
            destination={destination}
            point={point}
          />
        </div>
      );
    }
    return forecastList;
  }

  return (
    <div id="DestinationPageWrapper">
      <h1>{destination}</h1>
      <section id="weatherNowContainer">
        {points.map((point) => renderWeatherNowComponent(destination, point))}
      </section>
      <section id="forecastListContainer">
        {renderForecastLists(destination, points)}
      </section>
    </div>
  );
}
