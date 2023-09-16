import star1 from "./../assets/star1.png";
import star2 from "./../assets/star2.png";
import { useState } from "react";
import DestinationCardWeather from "../schemas/SelectedWeatherData";


export default function DestinationCard({destination, temperature, windSpeed, symbolCode} : DestinationCardWeather) {

  
  const destinationImgPath: string = "src/assets/destinationimages/" + destination + ".jpg"
  const symbolImgPath: string = "src/assets/weathericons/svg/" + symbolCode + ".svg"

  const [isFavorite, setIsFavorite] = useState(star1);

  function handleFavorite() {
    if (isFavorite === star1) {
      setIsFavorite(star2);
    }
    else {
      setIsFavorite(star1);
    }
  }

  return (
    <div className="destinationCard">
      <img className="destinationCardImg" src={destinationImgPath}/>
      <div className="destinationCardInfo">
        <div className="destinationName">{destination}</div>
        <div className="destinationInfo">{temperature}°  {windSpeed}m/s</div>
      </div>
      <img className="weatherIcon" src={symbolImgPath}/>
      <img className="favorite" onClick={handleFavorite} src={isFavorite}/>
      <div className="details">
        <hr className="destinationCardDivider"/>
        Detaljer
      </div>
    </div>
  )
}