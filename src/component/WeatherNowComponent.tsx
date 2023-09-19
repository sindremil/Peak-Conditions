import clearsky_day from './../assets/weathericons/svg/clearsky_day.svg';
import thermotstat from './../assets/weahterNowComponent/thermostat.svg';
import waterDrop from './../assets/weahterNowComponent/waterDrop.svg';
import wind from './../assets/weahterNowComponent/wind.svg';
import './WeatherNowStyle.css';
import getDestinationWeatherData from '../utils/getDestinationWeatherData';
import { PointFinder } from '../api/FetchWeatherData';
import isValidWeatherData from '../utils/isValidWeatherData';

interface WeatherNowData {
  destination: string;
  temperature: number;
  precipitation: number;
  windSpeed: number;
  altitude: number;
}

export default function WeatherNowComponent(
  destination: string,
  point: number
) {
  const weatherNowData = getWeatherNow(destination, point);
  return (
    <section key={crypto.randomUUID()}>
      <header>
        <h4>{weatherNowData.destination}</h4>
        <h4>{weatherNowData.altitude} moh.</h4>
      </header>
      <summary>
        <img id="skyIcon" src={clearsky_day} alt="clear sky" />
        <div className="conditions">
          <div>
            <img
              className="conditionIcons"
              src={thermotstat}
              alt="thermostat"
            />
            <p>{weatherNowData.temperature}</p>
          </div>
          <div>
            <img
              className="conditionIcons"
              src={waterDrop}
              alt="percipiation"
            />
            <p>{weatherNowData.precipitation}</p>
          </div>
          <div>
            <img className="conditionIcons" src={wind} alt="wind" />
            <p>{weatherNowData.windSpeed}</p>
          </div>
        </div>
      </summary>
    </section>
  );
}

function getWeatherNow(
  destination: string,
  pointIndex: number
): WeatherNowData {
  const weatherData = getDestinationWeatherData(destination, pointIndex);
  const point = PointFinder({
    destination: destination,
    pointIndex: pointIndex,
  });
  if (isValidWeatherData(weatherData)) {
    const dataPath = weatherData.properties.timeseries[0].data;
    return {
      destination: point.name,
      temperature: dataPath.instant.details.air_temperature,
      precipitation: dataPath.next_1_hours.details.precipitation_amount,
      windSpeed: dataPath.instant.details.wind_speed,
      altitude: point.alt,
    };
  } else {
    return {
      destination: '',
      temperature: 0,
      precipitation: 0,
      windSpeed: 0,
      altitude: 0,
    };
  }
}
