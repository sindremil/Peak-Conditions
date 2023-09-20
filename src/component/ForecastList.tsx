import './ForecastList.css';
import ForecastListEntry from './ForecastListEntry';
import WeatherData from '../schemas/WeatherData';
import getDestinationWeatherData from '../utils/getDestinationWeatherData';
import isValidWeatherData from '../utils/isValidWeatherData';

export default function ForecastList({
  destination,
  point,
}: {
  destination: string;
  point: number;
}) {
  const daysArray: Date[] = [];
  const weatherData = getDestinationWeatherData(destination, point);
  if (isValidWeatherData(weatherData)) {
    const firstDayString = weatherData.properties.timeseries[0].time;
    const lastDayString =
      weatherData.properties.timeseries[
        weatherData.properties.timeseries.length - 1
      ].time;

    const firstDay = new Date(firstDayString);
    const currentDay = firstDay;
    const lastDay = new Date(lastDayString);

    while (currentDay <= lastDay) {
      daysArray.push(new Date(currentDay)); // Create a new Date object
      currentDay.setDate(currentDay.getDate() + 1);
    }
  }

  return (
    <div id="forecastListWrapper" key={destination + point}>
      <div id="forecastListTable">
        <div id="forecastListTableHeader">
            <div className='tableHeader'>Dato</div>
            <div className='tableHeader'>Natt</div>
            <div className='tableHeader'>Morgen</div>
            <div className='tableHeader'>Ettermiddag</div>
            <div className='tableHeader'>Kveld</div>
            <div className='tableHeader showOnSmall'>Vær</div>
            <div className='tableHeader hideOnSmall'>Maks temperatur</div>
            <div className='tableHeader hideOnSmall'>Min temperatur</div>
            <div className='tableHeader hideOnSmall'>Nedbør</div>
            <div className='tableHeader hideOnSmall'>Vind</div>
        </div>
        <tbody id="forecastListTableBody">
          {daysArray.map((day) =>
            renderEntry(day.toISOString().slice(0, 10), weatherData)
          )}
        </tbody>
      </div>
    </div>
  );
}

function renderEntry(day: string, data: WeatherData) {
  return <ForecastListEntry key={day} day={day} data={data} />;
}
