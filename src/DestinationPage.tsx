import WeatherNowComponent from './component/WeatherNowComponent';

interface Props {
  destination: string;
}

function renderWeatherNowComponents(destination: string, count: number) {
  const weatherComponents = [];

  for (let i = 0; i < count; i++) {
    weatherComponents.push(WeatherNowComponent(destination, i));
  }

  return weatherComponents;
}

export default function DestinationPage({ destination }: Props) {
  return (
    <>
      <h1>{destination}</h1>
      {renderWeatherNowComponents(destination, 3)}
    </>
  );
}
