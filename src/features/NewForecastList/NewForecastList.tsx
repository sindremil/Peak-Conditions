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

  const time = formatTime(timeseriesData?.time || "");
  const symbolCode = timeseriesData?.data.next_1_hours.summary.symbol_code;
  const precipitation = timeseriesData?.data.next_1_hours.details.precipitation_amount;
  const wind = timeseriesData?.data.instant.details.wind_speed;

  const symbolImgPath: string = 'images/weather/' + symbolCode + '.svg';

  function formatTime(isoString: string): string {
    const date = new Date(isoString);
  
    // Get the day of the week as a string
    const dayOfWeek = new Intl.DateTimeFormat('no', { weekday: 'short' }).format(date);
  
    // Get the hours and minutes, converting from 24h to 12h format if needed
    // padStart() ensures minutes and hours always are two digits
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); 
  
    // Return the formatted string
    return `${dayOfWeek} ${hours}:${minutes}`;
  }
  
  return (
    <tr>
      <td>{time}</td>
      <td><img src={symbolImgPath} alt={symbolCode}/></td>
      <td>{precipitation} mm</td>
      <td>{wind} m/s</td>
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
          <th>Tid</th>
          <th>Vær</th>
          <th>Nedbør</th>
          <th>Vind</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
