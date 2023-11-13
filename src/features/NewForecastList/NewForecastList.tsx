import DestinationPoint from "../../interfaces/DestinationPoint";
import style from "./NewForecastList.module.css";
import useTimeseriesData from "../../hooks/useTimeseriesData";
import forecastListHours from "../../configs/settings";

// Entry component for each row in the table
function ForecastListEntry({
  destinationPoint,
  timeseriesIndex,
}: {
  destinationPoint: DestinationPoint;
  timeseriesIndex: number;
}): JSX.Element {
  const { timeseriesData, isLoading, isError } = useTimeseriesData(
    destinationPoint,
    timeseriesIndex
  );

  if (isLoading) {
    return (
      <tr>
        <td colSpan={4}>Loading...</td>
      </tr>
    );
  }
  if (isError) {
    return (
      <tr>
        <td colSpan={4}>Error fetching forecast</td>
      </tr>
    );
  }

  function formatTime(isoString: string): string {
    const date = new Date(isoString);

    // Get the day of the week as a string
    const dayOfWeek = new Intl.DateTimeFormat("no", {
      weekday: "short",
    }).format(date);

    // Get the hours and minutes, converting from 24h to 12h format if needed
    // padStart() ensures minutes and hours always are two digits
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Return the formatted string
    return `${dayOfWeek} ${hours}:${minutes}`;
  }

  const time = formatTime(timeseriesData?.time || "");
  const symbolCode = timeseriesData?.data.next_1_hours.summary.symbol_code;
  const temperature = timeseriesData?.data.instant.details.air_temperature;
  const precipitation =
    timeseriesData?.data.next_1_hours.details.precipitation_amount;
  const wind = Math.floor(timeseriesData?.data.instant.details.wind_speed || 0);

  const symbolImgPath: string = `images/weather/${symbolCode}.svg`;

  return (
    <tr>
      <td>{time}</td>
      <td>
        <img
          src={symbolImgPath}
          alt={symbolCode}
          className={style.symbolSize}
        />
      </td>
      <td>{temperature}</td>
      <td>{precipitation !== 0 ? `${precipitation  } mm` : null}</td>
      <td>{wind} m/s</td>
    </tr>
  );
}

// Main list component to render the table
export default function NewForecastList({
  destination,
  pointIndex,
}: DestinationPoint) {
  const rows = [];
  for (let i = 0; i < forecastListHours; i+=1) {
    rows.push(
      <ForecastListEntry
        key={i}
        destinationPoint={{ destination, pointIndex }}
        timeseriesIndex={i}
      />
    );
  }

  return (
    <table className={`${style.table} card`}>
      <thead>
        <tr>
          <th>Tidspunkt</th>
          <th>Vær</th>
          <th>Cº</th>
          <th>Nedbør</th>
          <th>Vind</th>
        </tr>
      </thead>
      <tbody className={style.tbody}>{rows}</tbody>
    </table>
  );
}
