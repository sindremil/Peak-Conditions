import notFavorite from "./../assets/star1.png";
import favorite from "./../assets/star2.png";
import { useState } from "react";
import zermatt from "./../assets/zermatt.jpg";
import partlycloudy from "./../assets/partlycloudy.png";

export default function DestinationCard() {

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
      <img className="destinationCardImg" src={zermatt} alt="Picture of location"/>
      <div className="destinationCardInfo">
        <p>Zermatt</p>
        <p>0°  13m/s</p>
      </div>
      <img className="weatherIcon" src={partlycloudy}/>
      <img className="favorite" onClick={handleFavorite} src={isFavorite ? favorite : notFavorite}/>
      <div className="details">
        <hr className="destinationCardDivider"/>
        <p>Detaljer</p>
      </div>
    </div>
  )
}