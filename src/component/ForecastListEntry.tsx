import WeatherData from '../schemas/WeatherData';

export default function ForecastListEntry({
  day,
  data,
  index,
}: {
  day: string;
  data: WeatherData;
  index: number;
}) {
  const dataForDay = getDataForDay(day, data);
  const precipitationAmount = getPrecipitationAmount(dataForDay);
  return (
    <>
      <div id={`tableData${index * 9}`} className="tableData forecastListDate">
        {formatDate(new Date(day))}
      </div>
      <div className="tableData" id={`tableData${index * 9 + 1}`}>
        {getMaxTemperature(dataForDay)}°
      </div>
      <div className="tableData" id={`tableData${index * 9 + 2}`}>
        {getMinTemperature(dataForDay)}°
      </div>
      <div className="tableData" id={`tableData${index * 9 + 3}`}>
        {precipitationAmount !== 0 ? precipitationAmount + ' mm' : '-'}
      </div>
      <div className="tableData" id={`tableData${index * 9 + 4}`}>
        {getAvgWindSpeed(dataForDay)} m/s
      </div>
      {createSymbols(getSymbolCodes(dataForDay), index)}
    </>
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
  if (symbolCodes.every((element) => element == '')) {
    symbolCodes.pop();
    symbolCodes.push(
      dataForDay.properties.timeseries[0].data.next_6_hours.summary.symbol_code
    );
  }

  return symbolCodes;
}

function createSymbols(symbolCodes: string[], count: number) {
  return (
    <>
      {symbolCodes.map((symbolCode, index) => (
        <div
          key={index}
          id={`tableData${9 * count + 5 + index}`}
          className="tableData"
        >
          {symbolCode && typeof symbolCode === 'string' && (
            <img
              className="symbolCodes"
              src={`https://raw.githubusercontent.com/metno/weathericons/89e3173756248b4696b9b10677b66c4ef435db53/weather/svg/${symbolCode}.svg`}
              alt={`Weather icon for ${symbolCode}`}
            />
          )}
          {!symbolCode && <div className="symbolCodes"></div>}
        </div>
      ))}
    </>
  );
}

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  };
  return date.toLocaleDateString(undefined, options);
}
