import './ForecastList.css';
import { getAllWeatherData } from '../utils/getDestinationWeatherData';
import ForecastListEntry from '../schemas/ForecastListEntry';
import getForecastListEntry from './ForecastListEntry';

export default function ForecastList(destination: string, point: number) {
  destination = 'Åre';
  point = 0;
  let forecastEntries: ForecastListEntry[] = [];
  const daysArray: Date[] = [];

  const data = getAllWeatherData(destination, point);

  if (data != null) {
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
          {forecastEntries.map((entry, index) => (
            <tr key={index}>
              <td>{daysArray[index].toISOString().slice(0, 10)}</td>
              {entry.symbolCodes[0] && (
                <td>
                  <img
                    src={
                      'src/assets/weathericons/svg/' +
                      entry.symbolCodes[0] +
                      '.svg'
                    }
                    alt={`Weather icon for ${entry.symbolCodes[0]}`}
                  ></img>
                </td>
              )}
              {!entry.symbolCodes[0] && <td style={{ width: '30px' }}></td>}
              {entry.symbolCodes[1] && (
                <td>
                  <img
                    src={
                      'src/assets/weathericons/svg/' +
                      entry.symbolCodes[1] +
                      '.svg'
                    }
                    alt={`Weather icon for ${entry.symbolCodes[1]}`}
                  ></img>
                </td>
              )}
              {!entry.symbolCodes[1] && <td style={{ width: '30px' }}></td>}
              {entry.symbolCodes[2] && (
                <td>
                  <img
                    src={
                      'src/assets/weathericons/svg/' +
                      entry.symbolCodes[2] +
                      '.svg'
                    }
                    alt={`Weather icon for ${entry.symbolCodes[2]}`}
                  ></img>
                </td>
              )}
              {!entry.symbolCodes[2] && <td style={{ width: '30px' }}></td>}
              {entry.symbolCodes[3] && (
                <td>
                  <img
                    src={
                      'src/assets/weathericons/svg/' +
                      entry.symbolCodes[3] +
                      '.svg'
                    }
                    alt={`Weather icon for ${entry.symbolCodes[3]}`}
                  ></img>
                </td>
              )}
              {!entry.symbolCodes[3] && <td style={{ width: '30px' }}></td>}
              <td>{entry.maxTemperature}</td>
              <td>{entry.minTemperature}</td>
              <td>
                {entry.precipitationAmount !== 0
                  ? entry.precipitationAmount
                  : '-'}
              </td>
              <td>{entry.avgWindSpeed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
