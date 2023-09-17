import { getAllWeatherData, getSelectedWeatherData } from "../utils/getDestinationWeatherData";
import SelectedWeatherData from "../schemas/SelectedWeatherData";
import ForecastListEntry from "../schemas/ForecastListEntry";

export default function ForecastListEntry(destinationName: string, point: number, day: number) {
    const hoursInDay = 24;
    const hoursLeftInDayList = Array.from({length: hoursInDay}, (_, index) => index + (day * hoursInDay));
    const sectionsInDay = 4;
    const sectionsLeftInDayList = Array.from({length: sectionsInDay}, (_, index) => 48 + index + ((day - 2) * sectionsInDay));
    const weatherDataList: SelectedWeatherData[] = [];

    if (day == 0) {
        const date = new Date();
        const currentTimeISO = date.toISOString();
        const currentTimeIndex = parseInt(currentTimeISO.slice(11, 13));
        if (currentTimeIndex >= 0) {
            // Remove all elements prior to and including currentTimeIndex
            hoursLeftInDayList.splice(0, currentTimeIndex);
        }
    } else if (day == 2) {
        const date = new Date();
        const currentTimeISO = date.toISOString();
        const currentTimeIndex = parseInt(currentTimeISO.slice(11, 13));
        if (currentTimeIndex >= 0) {
            // Remove all elements prior to and including currentTimeIndex
            hoursLeftInDayList.splice(currentTimeIndex, hoursInDay);
            const temp = Math.floor(hoursLeftInDayList.length / 6)
            sectionsLeftInDayList.splice(0, temp - 1)
        }
    }

    if (-1 < day && day < 2) {
        hoursLeftInDayList.forEach((number) => { 
            const data = getSelectedWeatherData(destinationName, point, number)
            if (data != null) {
                weatherDataList.push(data)
            }
        })
    } else if (day == 2) {
        hoursLeftInDayList.forEach((number) => { 
            const data = getSelectedWeatherData(destinationName, point, number)
            if (data != null) {
                weatherDataList.push(data)
            }
        })
        sectionsLeftInDayList.forEach((number) => { 
            const data = getSelectedWeatherData(destinationName, point, number)
            if (data != null) {
                weatherDataList.push(data)
            }
        })
    } else {
        sectionsLeftInDayList.forEach((number) => { 
            const data = getSelectedWeatherData(destinationName, point, number)
            if (data != null) {
                weatherDataList.push(data)
            }
        })
    }

    const { maxTemperature, minTemperature, totalWindSpeed } = weatherDataList.reduce(
        (acc, data) => {
            return {
                maxTemperature: Math.max(acc.maxTemperature, data.temperature),
                minTemperature: Math.min(acc.minTemperature, data.temperature),
                totalWindSpeed: acc.totalWindSpeed + data.windSpeed,
            };
        },
        { maxTemperature: -Infinity, minTemperature: Infinity, totalWindSpeed: 0 }
    );

    // Calculate average windSpeed
    const averageWindSpeed = Math.round((totalWindSpeed / weatherDataList.length) * 10) / 10;

    const data = getAllWeatherData(destinationName, point, 0);
    let symbolCode = "";
    let precipitationAmount = 0;
    if (data != null) {
        if (-1 < day && day < 2) {
            const hoursLeftinDay = hoursInDay - hoursLeftInDayList[0];
            if (hoursLeftinDay > 12) {
                symbolCode = data.properties.timeseries[0].data.next_12_hours.summary.symbol_code;
            } else if (hoursLeftinDay > 6) {
                symbolCode = data.properties.timeseries[0].data.next_6_hours.summary.symbol_code;
                precipitationAmount = data.properties.timeseries[0].data.next_6_hours.details.precipitation_amount;
            } else {
                symbolCode = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code;
                precipitationAmount = data.properties.timeseries[0].data.next_1_hours.details.precipitation_amount;
            }
        } else {
            symbolCode = data.properties.timeseries[0].data.next_6_hours.summary.symbol_code;
            precipitationAmount = data.properties.timeseries[0].data.next_6_hours.details.precipitation_amount;
        }
    }

    const foreCastListEntry : ForecastListEntry = {
        minTemperature: minTemperature,
        maxTemperature: maxTemperature,
        avgWindSpeed: averageWindSpeed,
        precipitationAmount: precipitationAmount,
        symbolCode: symbolCode,
      }

    return foreCastListEntry;
}