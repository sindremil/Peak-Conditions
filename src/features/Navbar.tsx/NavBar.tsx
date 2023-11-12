import { Link } from 'react-router-dom';
import peakConditionsLogo from '../../assets/peakConditionsLogo.svg'
import style from './NavbarStyle.module.css';

export default function Navbar() {
  return (
    <nav className={style.navbar}>
      <Link to="/">
        <img className={style.logoImg} src={peakConditionsLogo} alt="Logo" />
      </Link>
    </nav>
  );
}
