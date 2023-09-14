import zermatt from "./../assets/zermatt.jpg";
import partlycloudy from "./../assets/partlycloudy.png";
import partlycloudyalt from "./../assets/partlycloudyalt.png";
import star1 from "./../assets/star1.png";
import star2 from "./../assets/star2.png";
import { useState } from "react";

export default function DestinationCard() {

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
        <div>Zermatt</div>
        <div>0°  3m/s</div>
      </div>
      <img className="weatherIcon" src={partlycloudy}/>
      <img className="favorite" onClick={handleFavorite} src={isFavorite}/>
      <div className="details">
        <hr className="destinationCardDivider"/>
        Detaljer
      </div>
    </div>
  )
}