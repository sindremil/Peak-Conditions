import zermatt from "./../assets/zermatt.jpg"
import cloudy from "./../assets/cloudy.svg"

export default function DestinationCard() {
  return (
    <div className="destinationCard">
      <img className="destinationCardImg" src={zermatt}/>
      <div className="destinationCardInfo">
        <div>Zermatt</div>
        <div>0°  3m/s</div>
      </div>
      <img className="weatherIcon" src={cloudy}/>
    </div>
  )
}