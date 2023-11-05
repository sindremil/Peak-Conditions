import notFavourite from '../../assets/star1.svg';
import style from './DestinationCard.module.css';
import favourite from '../../assets/star2.svg';
import { useState } from 'react';
import SelectedWeatherData from '../../interfaces/SelectedWeatherData';
import { Link } from 'react-router-dom';
import { addFavourite, removeFavourite } from '../../utils/favourite';

interface DestinationCardProps extends SelectedWeatherData {
  isLocalStorageFavourite: boolean;
}

export default function DestinationCard({
  destination,
  temperature,
  windSpeed,
  symbolCode,
  isLocalStorageFavourite,
}: DestinationCardProps) {
  const [isFavourite, setIsFavorite] = useState(isLocalStorageFavourite);

  const destinationImgPath: string =
    'images/destinations/' + destination.toLowerCase() + '.jpg';
  const symbolImgPath: string = 'images/weather/' + symbolCode + '.svg';

  function handleFavorite() {
    setIsFavorite(!isFavourite);
    if (!isFavourite) {
      addFavourite(destination);
    } else {
      removeFavourite(destination);
    }
  }

  return (
    <div className={`${'card'} ${style.destinationCard}`}>
      <div className={style.imgContainer}>
        <img
          className={style.destinationCardImg}
          src={destinationImgPath}
          alt={destination}
        />
        <img
          className={style.favourite}
          onClick={handleFavorite}
          src={isFavourite ? favourite : notFavourite}
          alt="Favourite star"
        />
      </div>
      <div className={style.destinationNameContainer}>
        <p className={style.destinationName}>{destination}</p>
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
      <Link to={destination.toLowerCase()} className={style.details}>
        <hr className={style.destinationCardDivider} />
        <p>Detaljer</p>
      </Link>
    </div>
  );
}
