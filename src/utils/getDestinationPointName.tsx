import destinationsConfig from '../configs/destinations.json';

//Returns an array with the names of all points belonging to a destination
export default function getDestinationPointName(destinationName: string, point: number): string[] {
  //Get the requested destination
  const destination = destinationsConfig.destinations.filter(
    destination => destination.name === destinationName
  );
  //Makes an arry with the destinations point names.
  const destinationPoints = destination.map(destination => destination.points[point].name);
  return destinationPoints;
}