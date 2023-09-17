import ForecastListEntry from "./ForecastListEntry";

export default function ForecastList() {
    const daysInWeekList = Array.from({length: 10}, (_, index) => index);
    daysInWeekList.forEach((number) => { 
        console.log(ForecastListEntry("Aare", 0, number))
    })
    return (
        <div></div>
    )
}