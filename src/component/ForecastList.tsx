import './ForecastList.css';
import getDestinationWeatherData from '../utils/getDestinationWeatherData';
import ForecastListEntry from './ForecastListEntry';
import WeatherData from '../schemas/WeatherData';
import isValidWeatherData from '../utils/isValidWeatherData';

export default function ForecastList(destination: string, point: number) {
  destination = 'Åre';
  point = 0;
  const daysArray: Date[] = [];

  const data = getDestinationWeatherData(destination, point);

  // Check if data is defined and timeseries array has elements
  if (isValidWeatherData(data)) {
    const firstDayString = data.properties.timeseries[0].time;
    const lastDayString =
      data.properties.timeseries[data.properties.timeseries.length - 1].time;

    const firstDay = new Date(firstDayString);
    const currentDay = firstDay;
    const lastDay = new Date(lastDayString);

    while (currentDay <= lastDay) {
      daysArray.push(new Date(currentDay)); // Create a new Date object
      currentDay.setDate(currentDay.getDate() + 1);
    }
  } else {
    // Handle the case where data or timeseries[0].time is undefined
    console.log('Data or timeseries[0].time is undefined');
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Morning</th>
            <th>Afternoon</th>
            <th>Evening</th>
            <th>Night</th>
            <th>Max Temperature</th>
            <th>Min Temperature</th>
            <th>Precipitation Amount</th>
            <th>Avg Wind Speed</th>
          </tr>
        </thead>
        <tbody>
          {daysArray.map((day) =>
            renderEntry(day.toISOString().slice(0, 10), data)
          )}
        </tbody>
      </table>
    </div>
  );
}

function renderEntry(day: string, data: WeatherData) {
  return ForecastListEntry(day, data);
}
