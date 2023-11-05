import DestinationPoint from "../../interfaces/DestinationPoint";
import { useTimeseriesData } from "../../hooks/useTimeseriesData";

export default function NewForecastList(destinationPoint: DestinationPoint) {

  const { timeseriesData, isLoading, isError } = useTimeseriesData(destinationPoint, 0);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error fetching forecast</p>;
  }

  return (
    <h3>Test</h3>
  );

}
