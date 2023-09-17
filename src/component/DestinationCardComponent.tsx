import notFavorite from "./../assets/star1.svg";
import favorite from "./../assets/star2.svg";
import { useState } from "react";
import SelectedWeatherData from "../schemas/SelectedWeatherData";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite } from "../utils/favourite";

interface DestinationCardProps extends SelectedWeatherData {
  isLocalStorageFavourite: boolean;
}

export default function DestinationCard({destination, temperature, windSpeed, symbolCode, isLocalStorageFavourite}: DestinationCardProps) {

  
  const destinationImgPath: string = "src/assets/destinationimages/" + destination + ".jpg"
  const symbolImgPath: string = "src/assets/weathericons/svg/" + symbolCode + ".svg"

  const [isFavorite, setIsFavorite] = useState(isLocalStorageFavourite);

  function handleFavorite() {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      addFavourite(destination);
    }
    else {
      removeFavourite(destination);
    }
  }

  return (
    <div className="destinationCard">
      <div className="imgContainer">
        <img className="destinationCardImg" src={destinationImgPath}/>
        <img className="favorite" onClick={handleFavorite} src={isFavorite ? favorite : notFavorite}/>
      </div>
      <div className="destinationCardInfo">
        <p className="destinationName">{destination}</p>
        <p className="destinationInfo">{temperature}°  {windSpeed}m/s</p>
      </div>
      <img className="weatherIcon" src={symbolImgPath}/>
      <Link to={destination.toLowerCase()} className="details">
        <hr className="destinationCardDivider"/>
        <p>Detaljer</p>
      </Link>
    </div>
  )
}