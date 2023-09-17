import ForecastListEntry from '../schemas/ForecastListEntry';

export default function getForecastListEntry(day: string, data: any) {
  const sixHourIntervals = ['00:00:00', '06:00:00', '12:00:00', '18:00:00'];

  let minTemperature = Number.POSITIVE_INFINITY; // Initialize with a large positive value
  let maxTemperature = Number.NEGATIVE_INFINITY; // Initialize with a large negative value
  let avgWindSpeed = 0;
  let symbolCodes = [];
  let precipitationAmount = 0;

  if (data != null) {
    const timeseries = data.properties.timeseries;
    const filteredTimes = timeseries.filter((item: { time: string }) =>
      item.time.startsWith(day)
    );
    const temperatures = filteredTimes.map(
      (element: {
        data: { instant: { details: { air_temperature: number } } };
      }) => {
        return element.data.instant.details.air_temperature;
      }
    );

    // Calculate the minimum and maximum temperatures
    if (temperatures.length > 0) {
      minTemperature = Math.min(...temperatures);
      maxTemperature = Math.max(...temperatures);
    }
    const windSpeeds = filteredTimes.map(
      (element: { data: { instant: { details: { wind_speed: number } } } }) => {
        return element.data.instant.details.wind_speed;
      }
    );

    // Calculate the average wind speed
    if (windSpeeds.length > 0) {
      const sumWindSpeeds = windSpeeds.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      );
      avgWindSpeed = parseFloat((sumWindSpeeds / windSpeeds.length).toFixed(1)); // Round to one decimal place
    }

    // Filter out undefined or null values from precipitationAmounts
    const precipitationAmounts = filteredTimes
      .filter((element: { time: string }) =>
        sixHourIntervals.includes(element.time.slice(11, 19))
      ) // Filter by valid times
      .map(
        (element: {
          data: { next_6_hours: { details: { precipitation_amount: number } } };
        }) => {
          return element.data?.next_6_hours?.details?.precipitation_amount;
        }
      );

    // Calculate the sum of precipitation amounts
    if (precipitationAmounts.length > 0) {
      precipitationAmount = precipitationAmounts.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      );
    }
    precipitationAmount = parseFloat(precipitationAmount.toFixed(1));

    symbolCodes = filteredTimes
      .filter((element: { time: string }) =>
        sixHourIntervals.includes(element.time.slice(11, 19))
      ) // Filter by valid times
      .map(
        (element: {
          data: { next_6_hours: { summary: { symbol_code: string } } };
        }) => {
          return element.data?.next_6_hours?.summary?.symbol_code;
        }
      );
  }

  const foreCastListEntry: ForecastListEntry = {
    minTemperature: minTemperature,
    maxTemperature: maxTemperature,
    avgWindSpeed: avgWindSpeed,
    precipitationAmount: precipitationAmount,
    symbolCodes: symbolCodes,
  };

  return foreCastListEntry;
}
