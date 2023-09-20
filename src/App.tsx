import './global.css';
import './component/DestinationCardStyle.css';
import LandingPage from './LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DestinationPage from './DestinationPage';
import Navbar from './component/NavBar';
import getDestinationNames from './utils/getDestinationNames';

function App() {
  const destinationList = getDestinationNames();
  return (
    <Router basename="/project1">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {destinationList.map((destination) => (
          <Route
            key={destination}
            path={destination.toLowerCase()}
            element={<DestinationPage destination={destination} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
