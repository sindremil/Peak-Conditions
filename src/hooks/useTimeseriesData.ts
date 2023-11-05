import { useEffect, useState } from 'react';
import { useWeatherDataQuery } from './useWeatherData';
import WeatherData from '../interfaces/WeatherData';
import DestinationPoint from '../interfaces/DestinationPoint';

// Returns the forecast object at the index of a timeseries
// Visit api docs for more info about timeseries and forecast objects 
// https://docs.api.met.no/doc/ForecastJSON.html
export const useTimeseriesData = (destinationPoint: DestinationPoint, index: number) => {
  const { data, isLoading, isError } = useWeatherDataQuery(destinationPoint);
  const [timeseriesData, setTimeseriesData] = useState<WeatherData['properties']['timeseries'][number] | null>(null);

  useEffect(() => {
    if (!isLoading && !isError && data?.properties.timeseries) {
      // Access the data at the specified index
      setTimeseriesData(data.properties.timeseries[index] || null);
    }
  }, [data, isLoading, isError, index]);

  return { timeseriesData, isLoading, isError };
};
