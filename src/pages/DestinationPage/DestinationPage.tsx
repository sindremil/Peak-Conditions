import style from './DestinationPage.module.css';
import NewForecastList from '../../features/NewForecastList/NewForecastList';
import Navbar from '../../features/Navbar.tsx/NavBar';

export default function DestinationPage({
  destination,
}: {
  destination: string;
}) {

  return (
    <>
    <Navbar />
    <main id={style.DestinationPageWrapper}>
      <h1>{destination}</h1>
      <NewForecastList destination='Hafjell' pointIndex={2}/>
    </main>
    </>
  );
}
