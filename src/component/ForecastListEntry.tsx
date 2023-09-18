import WeatherData from '../schemas/WeatherData';

export default function ForecastListEntry(day: string, data: WeatherData) {
  const dataForDay = getDataForDay(day, data);
  const precipitationAmount = getPrecipitationAmount(dataForDay);
  return (
    <tr key={day}>
      <td>{day}</td>
      {createSymbols(getSymbolCodes(dataForDay))}
      <td>{getMaxTemperature(dataForDay)}</td>
      <td>{getMinTemperature(dataForDay)}</td>
      <td>{precipitationAmount !== 0 ? precipitationAmount : '-'}</td>
      <td>{getAvgWindSpeed(dataForDay)}</td>
    </tr>
  );
}

function getDataForDay(day: string, data: WeatherData): WeatherData {
  const dataForDay = data.properties.timeseries.filter((item) =>
    item.time.startsWith(day)
  );

  // Create a new WeatherData object with the filtered timeseries
  const filteredData: WeatherData = {
    ...data,
    properties: {
      ...data.properties,
      timeseries: dataForDay,
    },
  };

  return filteredData;
}

// Calculate the minimum and maximum temperatures
function getMinTemperature(dataForDay: WeatherData) {
  let minTemperature = Number.POSITIVE_INFINITY; // Initialize with a large positive value
  const temperatures = getTemperatures(dataForDay);
  minTemperature = Math.min(...temperatures);
  return minTemperature;
}
function getMaxTemperature(dataForDay: WeatherData) {
  let maxTemperature = Number.NEGATIVE_INFINITY; // Initialize with a large negative value
  const temperatures = getTemperatures(dataForDay);
  maxTemperature = Math.max(...temperatures);
  return maxTemperature;
}
function getTemperatures(dataForDay: WeatherData) {
  const temperatures = dataForDay.properties.timeseries.map((element) => {
    return element.data.instant.details.air_temperature;
  });
  return temperatures;
}
function getAvgWindSpeed(dataForDay: WeatherData) {
  let avgWindSpeed = 0;
  const windSpeeds = dataForDay.properties.timeseries.map(
    (element) => element.data.instant.details.wind_speed
  );

  if (windSpeeds.length > 0) {
    const sumWindSpeeds = windSpeeds.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    avgWindSpeed = parseFloat((sumWindSpeeds / windSpeeds.length).toFixed(1)); // Round to one decimal place
  }

  return avgWindSpeed;
}

function getPrecipitationAmount(dataForDay: WeatherData) {
  const sixHourIntervals = ['00:00:00', '06:00:00', '12:00:00', '18:00:00'];
  let precipitationAmount = 0;
  // Filter out undefined or null values from precipitationAmounts
  const precipitationAmounts = dataForDay.properties.timeseries
    .filter((element) => sixHourIntervals.includes(element.time.slice(11, 19))) // Filter by valid times
    .map((element) => {
      return element.data?.next_6_hours?.details?.precipitation_amount;
    });

  // Calculate the sum of precipitation amounts
  if (precipitationAmounts.length > 0) {
    precipitationAmount = precipitationAmounts.reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      0
    );
  }
  precipitationAmount = parseFloat(precipitationAmount.toFixed(1));
  return precipitationAmount;
}

function getSymbolCodes(dataForDay: WeatherData) {
  const sixHourIntervals = ['00:00:00', '06:00:00', '12:00:00', '18:00:00'];
  const symbolCodes = [];

  for (const interval of sixHourIntervals) {
    const matchingElement = dataForDay.properties.timeseries.find((element) =>
      element.time.includes(interval)
    );

    if (matchingElement) {
      symbolCodes.push(
        matchingElement.data?.next_6_hours?.summary?.symbol_code
      );
    } else {
      symbolCodes.push('');
    }
  }

  return symbolCodes;
}

function createSymbols(symbolCodes: string[]) {
  return (
    <>
      {symbolCodes.map((symbolCode, index) => (
        <td key={index}>
          {symbolCode && (
            <img
              src={'src/assets/weathericons/svg/' + symbolCode + '.svg'}
              alt={`Weather icon for ${symbolCode}`}
            />
          )}
          {!symbolCode && <div style={{ width: '30px' }}></div>}
        </td>
      ))}
    </>
  );
}
