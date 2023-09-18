import './ForecastList.css';
import getDestinationWeatherData from '../utils/getDestinationWeatherData';
import ForecastListEntry from '../schemas/ForecastListEntry';
import getForecastListEntry from './ForecastListEntry';

export default function ForecastList(destination: string, point: number) {
  destination = 'Åre';
  point = 0;
  let forecastEntries: ForecastListEntry[] = [];
  const daysArray: Date[] = [];

  const data = getDestinationWeatherData(destination, point);

  // Check if data is defined and timeseries array has elements
  if (
    data &&
    data.properties &&
    data.properties.timeseries &&
    data.properties.timeseries.length > 0
  ) {
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

    forecastEntries = daysArray.map((day) => {
      return getForecastListEntry(day.toISOString().slice(0, 10), data);
    });
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
          {}
          {forecastEntries.map((entry, index) =>
            renderEntry(entry, index, daysArray)
          )}
        </tbody>
      </table>
    </div>
  );
}

function createSymbol(entry: ForecastListEntry, index: number) {
  const symbolCode = entry.symbolCodes[index];
  return (
    <>
      {symbolCode && (
        <td>
          <img
            src={'src/assets/weathericons/svg/' + symbolCode + '.svg'}
            alt={`Weather icon for ${symbolCode}`}
          ></img>
        </td>
      )}
      {!symbolCode && <td style={{ width: '30px' }}></td>}
    </>
  );
}

function renderEntry(
  entry: ForecastListEntry,
  index: number,
  daysArray: Date[]
) {
  return (
    <tr key={index}>
      <td>{daysArray[index].toISOString().slice(0, 10)}</td>
      {createSymbol(entry, 0)}
      {createSymbol(entry, 1)}
      {createSymbol(entry, 2)}
      {createSymbol(entry, 3)}
      <td>{entry.maxTemperature}</td>
      <td>{entry.minTemperature}</td>
      <td>
        {entry.precipitationAmount !== 0 ? entry.precipitationAmount : '-'}
      </td>
      <td>{entry.avgWindSpeed}</td>
    </tr>
  );
}
