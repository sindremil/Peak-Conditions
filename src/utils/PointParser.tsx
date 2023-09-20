import Point from '../schemas/Point.tsx';

//Parses a Point object into an API query
export default function getPointQuery(point: Point): string {
  const { lat, lon, alt } = point;
  return (
    'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' +
    lat +
    '&lon=' +
    lon +
    '&altitude=' +
    alt
  );
}
