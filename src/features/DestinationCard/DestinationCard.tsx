import { useState } from 'react';
import { Link } from 'react-router-dom';
import notFavourite from '../../assets/star1.svg';
import style from './DestinationCard.module.css';
import favourite from '../../assets/star2.svg';
import { addFavourite, removeFavourite } from '../../utils/favourite';
import useTimeseriesData from '../../hooks/useTimeseriesData';
import DestinationPoint from '../../interfaces/DestinationPoint';

interface DestinationCardProps {
  destinationPoint: DestinationPoint
  isLocalStorageFavourite: boolean;
}

export default function DestinationCard(DestinationCardProps: DestinationCardProps) {
  const { destinationPoint, isLocalStorageFavourite } = DestinationCardProps;
  const [isFavourite, setIsFavorite] = useState(isLocalStorageFavourite);
  const { timeseriesData, isLoading, isError } = useTimeseriesData(destinationPoint, 0);

  if (isLoading || isError) {
    return <p>Loading</p>
  }

  const symbolCode = timeseriesData?.data.next_1_hours.summary.symbol_code;
  const temperature = timeseriesData?.data.instant.details.air_temperature;
  const windSpeed = timeseriesData?.data.instant.details.wind_speed;

  const destinationImgPath: string =
    `images/destinations/${  destinationPoint.destination.toLowerCase()  }.jpg`;
  const symbolImgPath: string = `images/weather/${  symbolCode  }.svg`;

  function handleFavorite() {
    setIsFavorite(!isFavourite);
    if (!isFavourite) {
      addFavourite(destinationPoint.destination);
    } else {
      removeFavourite(destinationPoint.destination);
    }
  }

  return (
    <div className={`${'card'} ${style.destinationCard}`}>
      <div className={style.imgContainer}>
        <img
          className={style.destinationCardImg}
          src={destinationImgPath}
          alt={destinationPoint.destination}
        />
        <img
          className={style.favourite}
          onClick={handleFavorite}
          src={isFavourite ? favourite : notFavourite}
          alt="Favourite star"
        />
      </div>
      <div className={style.destinationNameContainer}>
        <p className={style.destinationName}>{destinationPoint.destination}</p>
      </div>
      <div className={style.destinationInfoContainer}>
        <p className={style.destinationTemp}>{temperature}°</p>
        <p className={style.destinationWind}>{windSpeed}m/s</p>
      </div>
      <div className={style.destinationSymbol}>
        <img
          className={style.weatherIcon}
          src={symbolImgPath}
          alt="Weather symbol"
        />
      </div>
      <Link to={encodeURIComponent(destinationPoint.destination)} className={style.details}>
        <hr className={style.destinationCardDivider} />
        <p>Detaljer</p>
      </Link>
    </div>
  );
}
