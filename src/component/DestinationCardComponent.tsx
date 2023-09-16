import star1 from "./../assets/star1.svg";
import star2 from "./../assets/star2.svg";
import { useState } from "react";
import DestinationCardWeather from "../schemas/SelectedWeatherData";
import { Link } from "react-router-dom";


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
      <div className="imgContainer">
        <img className="destinationCardImg" src={destinationImgPath}/>
        <img className="favorite" onClick={handleFavorite} src={isFavorite}/>
      </div>
      <div className="destinationCardInfo">
        <div className="destinationName">{destination}</div>
        <div className="destinationInfo">{temperature}°  {windSpeed}m/s</div>
      </div>
      <img className="weatherIcon" src={symbolImgPath}/>
      <Link to={destination.toLowerCase()} className="details">
        <hr className="destinationCardDivider"/>
        Detaljer
      </Link>
    </div>
  )
}