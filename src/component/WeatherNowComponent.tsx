import clearsky_day from './../assets/weathericons/svg/clearsky_day.svg';
import thermotstat from './../assets/weahterNowComponent/thermostat.svg';
import waterDrop from './../assets/weahterNowComponent/waterDrop.svg';
import wind from './../assets/weahterNowComponent/wind.svg';
import './WeatherNowStyle.css';
import { PointFinder } from '../api/FetchWeatherData';
import WeatherData from '../schemas/WeatherData';

interface WeatherNowData {
  destination: string;
  temperature: number;
  precipitation: number;
  windSpeed: number;
  altitude: number;
}

export default function WeatherNowComponent({
  destination,
  point,
  data,
  handleWeatherComponentClick,
}: {
  destination: string;
  point: number;
  data: WeatherData;
  handleWeatherComponentClick: (point: number) => void;
}) {
  const weatherNowData = getWeatherNow(destination, point, data);
  return (
    <section id='weatherNowCard'
      key={destination + point}
      onClick={() => handleWeatherComponentClick(point)}
    >
      <header id='weatherNowHeader'>
        <h4>{weatherNowData.destination}</h4>
        <h4>{weatherNowData.altitude} moh.</h4>
      </header>
      <summary id='weatherNowSummary'>
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
  pointIndex: number,
  weatherData: WeatherData
): WeatherNowData {
  const point = PointFinder({
    destination: destination,
    pointIndex: pointIndex,
  });
  const dataPath = weatherData.properties.timeseries[0].data;
  return {
    destination: point.name,
    temperature: dataPath.instant.details.air_temperature,
    precipitation: dataPath.next_1_hours.details.precipitation_amount,
    windSpeed: dataPath.instant.details.wind_speed,
    altitude: point.alt,
  };
}
