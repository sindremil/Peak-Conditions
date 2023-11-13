import { useState } from "react";
import { Link } from "react-router-dom";
import notFavourite from "../../assets/destinationCard/star1.svg";
import favourite from "../../assets/destinationCard/star2.svg";
import style from "./DestinationCard.module.css";
import { addFavourite, removeFavourite } from "../../utils/favourite";
import useTimeseriesData from "../../hooks/useTimeseriesData";
import DestinationPoint from "../../interfaces/DestinationPoint";
import windSymbol from "../../assets/destinationCard/wind.svg";
import temperatureSymbol from "../../assets/destinationCard/thermostat.svg";

interface DestinationCardProps {
  destinationPoint: DestinationPoint;
  isLocalStorageFavourite: boolean;
}

export default function DestinationCard(
  DestinationCardProps: DestinationCardProps
) {
  const { destinationPoint, isLocalStorageFavourite } = DestinationCardProps;
  const [isFavourite, setIsFavorite] = useState(isLocalStorageFavourite);
  const { timeseriesData, isLoading, isError } = useTimeseriesData(
    destinationPoint,
    0
  );

  if (isLoading || isError) {
    return <p>Loading</p>;
  }

  const symbolCode = timeseriesData?.data.next_1_hours.summary.symbol_code;
  const temperature = timeseriesData?.data.instant.details.air_temperature;
  const windSpeed = timeseriesData?.data.instant.details.wind_speed;

  const destinationImgPath: string = `images/destinations/${destinationPoint.destination.toLowerCase()}.jpg`;
  const symbolImgPath: string = `images/weather/${symbolCode}.svg`;

  function handleFavorite() {
    setIsFavorite(!isFavourite);
    if (!isFavourite) {
      addFavourite(destinationPoint.destination);
    } else {
      removeFavourite(destinationPoint.destination);
    }
  }

  function handleKeyPress(event: { key: string }) {
    if (event.key === "Enter" || event.key === "Space") {
      handleFavorite();
    }
  }

  return (
    <div className={`${"card"} ${style.destinationCard}`}>
      <Link
        to={encodeURIComponent(destinationPoint.destination)}
        className={style.details}
      >
        <div className={style.imgContainer}>
          <img
            className={style.destinationCardImg}
            src={destinationImgPath}
            alt={destinationPoint.destination}
          />
        </div>
        <div className={style.destinationNameContainer}>
          <p className={style.destinationName}>
            {destinationPoint.destination}
          </p>
        </div>
        <div className={style.summaryContainer}>
          <div className={style.destinationInfoContainer}>
            <div>
              <img
                src={temperatureSymbol}
                alt="temperature symbol"
                className={style.symbol}
              />
              <p className={style.destinationTemp}>{temperature}°</p>
            </div>
            <div>
              <img
                src={windSymbol}
                alt="wind symbol"
                className={style.symbol}
              />
              <p className={style.destinationWind}>{windSpeed}m/s</p>
            </div>
          </div>
          <div className={style.weatherSymbolContainer}>
            <img
              className={style.weatherIcon}
              src={symbolImgPath}
              alt="Weather symbol"
            />
          </div>
        </div>
      </Link>
      <button
        className={style.favouriteButton}
        onClick={handleFavorite}
        onKeyDown={handleKeyPress}
        aria-label="Toggle Favourite"
        type="button"
      >
        <img
          src={isFavourite ? favourite : notFavourite}
          alt="Favourite star"
        />
      </button>
    </div>
  );
}
