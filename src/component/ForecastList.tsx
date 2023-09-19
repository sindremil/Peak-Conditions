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
      <table>
        <thead id="forecastListTableHead">
          <tr>
            <th>Dato</th>
            <th>Natt</th>
            <th>Morgen</th>
            <th>Ettermiddag</th>
            <th>Kveld</th>
            <th>Maks temperatur</th>
            <th>Min temperatur</th>
            <th>Nedbør</th>
            <th>Vind</th>
          </tr>
        </thead>
        <tbody>
          {daysArray.map((day) =>
            renderEntry(day.toISOString().slice(0, 10), weatherData)
          )}
        </tbody>
      </table>
    </div>
  );
}

function renderEntry(day: string, data: WeatherData) {
  return <ForecastListEntry key={day} day={day} data={data} />;
}
