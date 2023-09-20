import destinationsConfig from './../configs/destinations.json';

export default function getDestinationNames() {
  const destinationNames = destinationsConfig.destinations.map(
    (destination) => destination.name
  );
  return destinationNames;
}
