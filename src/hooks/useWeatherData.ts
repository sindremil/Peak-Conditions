import { useQuery } from "@tanstack/react-query";
import DestinationPoint from "../interfaces/DestinationPoint";
import WeatherData from "../interfaces/WeatherData";
import { fetchWeatherData } from "../api/fetchWeatherData";

export function useWeatherDataQuery(destinationPoint: DestinationPoint) {
  
  const getStaleTime = (destinationPoint: DestinationPoint): number => {
    const identifier = `${destinationPoint.destination}_${destinationPoint.pointIndex}`;
    const staleTimesString = localStorage.getItem('staleTimes');
    const staleTimes: Record<string, number> = staleTimesString ? JSON.parse(staleTimesString) : {};
    return staleTimes[identifier] ?? 0;
  };

  return useQuery<WeatherData>({
    queryKey: ["weatherData", destinationPoint.destination, destinationPoint.pointIndex],
    queryFn: () => fetchWeatherData(destinationPoint),
    staleTime: getStaleTime(destinationPoint),
  });
}
