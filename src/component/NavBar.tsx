import peakConditionsLogo from './../assets/peakConditionsLogo.svg';
import './NavBarStyle.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logoImg" src={peakConditionsLogo} alt="Logo" />
      </Link>
    </nav>
  );
}
