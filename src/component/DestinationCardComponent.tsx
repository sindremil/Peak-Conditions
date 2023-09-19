import notFavourite from "./../assets/star1.svg";
import favourite from "./../assets/star2.svg";
import { useState } from "react";
import SelectedWeatherData from "../schemas/SelectedWeatherData";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite } from "../utils/favourite";

interface DestinationCardProps extends SelectedWeatherData {
  isLocalStorageFavourite: boolean;
}

export default function DestinationCard({destination, temperature, windSpeed, symbolCode, isLocalStorageFavourite}: DestinationCardProps) {

  const [isFavourite, setIsFavorite] = useState(isLocalStorageFavourite);
  
  const destinationImgPath: string = "src/assets/destinationimages/" + destination + ".jpg"
  const symbolImgPath: string = "src/assets/weathericons/svg/" + symbolCode + ".svg"

  function handleFavorite() {
    setIsFavorite(!isFavourite);
    if (!isFavourite) {
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
        <img className="favourite" onClick={handleFavorite} src={isFavourite ? favourite : notFavourite}/>
      </div>
      <div className="destinationNameContainer">
        <p className="destinationName">{destination}</p>
      </div>
      <div className="destinationInfoContainer">
        <p className="destinationTemp">{temperature}°</p>
        <p className="destinationWind">{windSpeed}m/s</p>
      </div>
      <div className="destinationSymbol">
        <img className="weatherIcon" src={symbolImgPath}/>
      </div>
      <Link to={destination.toLowerCase()} className="details">
        <hr className="destinationCardDivider"/>
        <p>Detaljer</p>
      </Link>
    </div>
  )
}