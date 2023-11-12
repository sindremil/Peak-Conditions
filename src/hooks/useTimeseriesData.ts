import { useWeatherDataQuery } from "./useWeatherData";
import DestinationPoint from "../interfaces/DestinationPoint";

// Returns the forecast object at the index of a timeseries
// Visit api docs for more info about timeseries and forecast objects
// https://docs.api.met.no/doc/ForecastJSON.html
export function useTimeseriesData(
  destinationPoint: DestinationPoint,
  index: number
) {
  const {
    data,
    isLoading,
    isError,
    error
  } = useWeatherDataQuery(destinationPoint);

  if (isLoading || isError) {
    return {
      isLoading, isError, error
    };
  }

  const timeseriesData = data.properties.timeseries[index];


  return {
    timeseriesData,
    isLoading,
    isError,
    error
  };
}
