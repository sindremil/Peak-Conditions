import { useQuery } from '@tanstack/react-query';
import PointParser from '../utils/PointParser';
import DestinationPoint from '../schemas/DestinationPoint';
import Point from '../schemas/Point';
import destinationsJson from '../configs/destinations.json';

const fetchWeatherData = async (DestinationPoint: DestinationPoint) => {
  const point: Point = PointFinder(DestinationPoint);
  const query: string = PointParser(point);
  const response = await fetch(query, {
    headers: {
      'User-Agent':
        'PeakConditions (Studentprosjekt ved NTNU i emne IT2810) jesperrg@stud.ntnu.no',
      // Add any other headers if required
    },
  });
  /* console.log( DestinationPoint.destination + " expires at " + expires) */
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const staleTime =
    new Date(response.headers.get('Expires') || '').getTime() -
    new Date().getTime();
  console.log('setting staleTime: ' + staleTime);
  localStorage.setItem(
    DestinationPoint.destination + DestinationPoint.pointIndex + 'staleTime',
    staleTime.toString()
  );
  return response.json();
};

export const useWeatherData = (destinationPoint: DestinationPoint) => {
  const staleTime = localStorage.getItem(
    destinationPoint.destination + destinationPoint.pointIndex + 'staleTime'
  );

  const query = useQuery(
    [destinationPoint], // Pass destinationPoint as part of the query key
    () => fetchWeatherData(destinationPoint),
    {
      enabled: !!destinationPoint, // Enable the query when destinationPoint is truthy
      staleTime: Number(staleTime),
    }
  );

  return query;
};

export function PointFinder(destinationPoint: DestinationPoint) {
  const { destination, pointIndex } = destinationPoint;

  const queryResult = destinationsJson.destinations.find(
    (dest) => dest.name.toLowerCase() === destination.toLowerCase()
  );

  if (queryResult === undefined) {
    throw new Error('Destination does not found');
  }

  return queryResult.points[pointIndex];
}
