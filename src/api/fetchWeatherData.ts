import PointParser from "../utils/PointParser";
import DestinationPoint from "../interfaces/DestinationPoint";
import Point from "../interfaces/Point";
import destinationsJson from "../configs/destinations.json";

interface StaleTimes {
  [key: string]: number;
}

function setStaleTime(
  destinationPoint: DestinationPoint,
  staleTime: number,
): void {
  // Create a unique identifier for the destinationPoint
  const identifier = `${destinationPoint.destination}_${destinationPoint.pointIndex}`;

  // Retrieve the existing record from localStorage
  const staleTimesString = localStorage.getItem("staleTimes");
  const staleTimes: StaleTimes = staleTimesString
    ? JSON.parse(staleTimesString)
    : {};

  // Update the specific destinationPoint's staleTime
  staleTimes[identifier] = staleTime;

  // Save the updated record back to localStorage
  localStorage.setItem("staleTimes", JSON.stringify(staleTimes));
}

export function PointFinder(destinationPoint: DestinationPoint) {
  const { destination, pointIndex } = destinationPoint;

  const queryResult = destinationsJson.destinations.find(
    (dest) => dest.name.toLowerCase() === destination.toLowerCase(),
  );

  if (queryResult === undefined) {
    throw new Error("Destination does not found");
  }

  return queryResult.points[pointIndex];
}
export const fetchWeatherData = async (destinationPoint: DestinationPoint) => {
  const point: Point = PointFinder(destinationPoint);
  const query: string = PointParser(point);
  const response = await fetch(query, {
    headers: {
      "User-Agent":
        "PeakConditions (Studentprosjekt ved NTNU i emne IT2810) jesperrg@stud.ntnu.no",
    },
  });

  const staleTime =
    new Date(response.headers.get("Expires") || "").getTime() -
    new Date().getTime();

  setStaleTime(destinationPoint, staleTime);
  return response.json();
};
