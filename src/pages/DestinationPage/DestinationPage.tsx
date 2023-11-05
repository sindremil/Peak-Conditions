import { useState } from 'react';
import ForecastList from '../../features/Forecast/ForecastList';
import WeatherNowComponent from '../../features/WeatherNow/WeatherNow';
import getDestinationWeatherData from '../../utils/getDestinationWeatherData';
import isValidWeatherData from '../../utils/isValidWeatherData';
import style from './DestinationPage.module.css';
import NewForecastList from '../../features/NewForecastList/NewForecastList';

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
        <div key={destination + point} id={style.weatherNowContainer}>
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
    <div id={style.DestinationPageWrapper}>
      <h1>{destination}</h1>
{/*       <section>
        {points.map((point) => renderWeatherNowComponent(destination, point))}
      </section> */}
      <NewForecastList destination='Åre' pointIndex={0}/>
    </div>
  );
}
