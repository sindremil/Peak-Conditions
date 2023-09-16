import star1 from "./../assets/star1.png";
import star2 from "./../assets/star2.png";
import { useState } from "react";
import DestinationCardWeather from "../schemas/SelectedWeatherData";


export default function DestinationCard({destination, temperature, windSpeed, symbolCode} : DestinationCardWeather) {

  
  const destinationImgPath: string = "src/assets/destinationimages/" + destination + ".jpg"
  const symbolImgPath: string = "src/assets/weathericons/svg/" + symbolCode + ".svg"

  const [isFavorite, setIsFavorite] = useState(false);

  function handleFavorite() {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
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
        <p>Detaljer</p>
      </div>
    </div>
  )
}