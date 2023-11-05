import DestinationPoint from "../../interfaces/DestinationPoint";
import { useTimeseriesData } from "../../hooks/useTimeseriesData";
import { forecastListHours } from "../../configs/settings";

// Entry component for each row in the table
function ForecastListEntry({ destinationPoint, timeseriesIndex }: { destinationPoint: DestinationPoint, timeseriesIndex: number }) {
  const { timeseriesData, isLoading, isError } = useTimeseriesData(destinationPoint, timeseriesIndex);

  if (isLoading) {
    return <tr><td colSpan={4}>Loading...</td></tr>;
  }
  if (isError) {
    return <tr><td colSpan={4}>Error fetching forecast</td></tr>;
  }

  const time = timeseriesData?.time;
  const weather = timeseriesData?.data.next_1_hours.summary.symbol_code;
  const precipitation = timeseriesData?.data.next_1_hours.details.precipitation_amount;
  const wind = timeseriesData?.data.instant.details.wind_speed;

  return (
    <tr>
      <td>{time}</td>
      <td>{weather}</td>
      <td>{precipitation} mm</td>
      <td>{wind} km/h</td>
    </tr>
  );
}

// Main list component to render the table
export default function NewForecastList({ destination, pointIndex }: DestinationPoint) {
  const rows = [];
  for (let i = 0; i < forecastListHours; i++) {
    rows.push(
      <ForecastListEntry 
        key={i}
        destinationPoint={{ destination, pointIndex }}
        timeseriesIndex={i}
      />
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Weather</th>
          <th>Precipitation</th>
          <th>Wind</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
