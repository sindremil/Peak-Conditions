import './global.css';
import './component/DestinationCardStyle.css';
import LandingPage from './LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DestinationPage from './DestinationPage';
import Navbar from './component/NavBar';
import getDestinationNames from './utils/getDestinationNames';
import SetPageTitle from './utils/SetPageTitle';

function App() {
  const destinationList = getDestinationNames();
  return (
    <Router basename="/project1">
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SetPageTitle title="Home" />
            <LandingPage />
          </>
        }
      />
      {destinationList.map((destination) => (
          <Route
            key={destination}
            path={destination.toLowerCase()}
            element={
              <>
                <SetPageTitle title={destination} />
                <DestinationPage destination={destination} />
              </>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
