import zermatt from "./../assets/zermatt.jpg"
import partlycloudy from "./../assets/partlycloudy.png"
import partlycloudyalt from "./../assets/partlycloudyalt.png"

export default function DestinationCard() {
  return (
    <div className="destinationCard">
      <img className="destinationCardImg" src={zermatt}/>
      <div className="destinationCardInfo">
        <div>Zermatt</div>
        <div>0°  3m/s</div>
      </div>
      <img className="weatherIcon" src={partlycloudy}/>
      <div className="details">
        <hr className="destinationCardDivider"/>
        Detaljer
      </div>
    </div>
  )
}