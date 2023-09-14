import zermatt from "./../assets/zermatt.jpg";
import star1 from "./../assets/star1.png";
import star2 from "./../assets/star2.png";
import { useState } from "react";
import DestinationCardWeather from "../schemas/DestinationCardWeather";


export default function DestinationCard({destination, temperature, windSpeed, symbolCode} : DestinationCardWeather) {

  
  const destinationImgPath: string = "src/assets/" + destination + ".png"
  const symbolImgPath: string = "src/assets/" + symbolCode + ".png"

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
      <img className="destinationCardImg" src={zermatt}/>
      <div className="destinationCardInfo">
        <div>{destination}</div>
        <div>{temperature}°  {windSpeed}m/s</div>
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