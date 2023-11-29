import { useQuery } from "@tanstack/react-query";
import DestinationPoint from "../interfaces/DestinationPoint";
import WeatherData from "../interfaces/WeatherData";
import { fetchWeatherData } from "../api/fetchWeatherData";

export default function useWeatherDataQuery(
  destinationPoint: DestinationPoint,
) {
  const getStaleTime = (theDestinationPoint: DestinationPoint): number => {
    const identifier = `${theDestinationPoint.destination}_${theDestinationPoint.pointIndex}`;
    const staleTimesString = localStorage.getItem("staleTimes");
    const staleTimes: Record<string, number> = staleTimesString
      ? JSON.parse(staleTimesString)
      : {};
    return staleTimes[identifier] ?? 0;
  };

  return useQuery<WeatherData>({
    queryKey: ["weatherData", destinationPoint],
    queryFn: () => fetchWeatherData(destinationPoint),
    staleTime: getStaleTime(destinationPoint),
  });
}
