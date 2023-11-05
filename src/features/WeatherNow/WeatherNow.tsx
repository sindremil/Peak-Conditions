import thermotstat from '../../assets/weahterNowComponent/thermostat.svg';
import waterDrop from '../../assets/weahterNowComponent/waterDrop.svg';
import wind from '../../assets/weahterNowComponent/wind.svg';
import style from './WeatherNow.module.css';
import { PointFinder } from '../../api/FetchWeatherData';
import WeatherData from '../../interfaces/WeatherData';

interface WeatherNowData {
  destination: string;
  temperature: number;
  precipitation: number;
  windSpeed: number;
  altitude: number;
  symbolCode: string;
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
    <section
<<<<<<< HEAD
      className="weatherNowCard"
      key={destination + point}
      onClick={() => handleWeatherComponentClick(point)}
    >
      <header className="weatherNowHeader">
        <h4>{weatherNowData.destination}</h4>
        <h4>{weatherNowData.altitude} moh.</h4>
      </header>
      <summary className="weatherNowSummary">
=======
      id={style.weatherNowCard}
      key={destination + point}
      onClick={() => handleWeatherComponentClick(point)}
    >
      <header id={style.weatherNowHeader}>
        <h4>{weatherNowData.destination}</h4>
        <h4>{weatherNowData.altitude} moh.</h4>
      </header>
      <summary id={style.weatherNowSummary}>
>>>>>>> 66008cc (♻Refactored code to use css modules)
        <img
          id={style.skyIcon}
          src={`https://raw.githubusercontent.com/metno/weathericons/89e3173756248b4696b9b10677b66c4ef435db53/weather/svg/${weatherNowData.symbolCode}.svg`}
          alt={`Weather icon for ${weatherNowData.symbolCode}`}
        />
        <div className={style.conditions}>
          <div>
            <img
              className={style.conditionIcons}
              src={thermotstat}
              alt="thermostat"
            />
            <p>{weatherNowData.temperature}</p>
          </div>
          <div>
            <img
              className={style.conditionIcons}
              src={waterDrop}
              alt="percipiation"
            />
            <p>{weatherNowData.precipitation}</p>
          </div>
          <div>
            <img className={style.conditionIcons} src={wind} alt="wind" />
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
    symbolCode: dataPath.next_1_hours.summary.symbol_code,
  };
}
