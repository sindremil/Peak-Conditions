import "./global.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DestinationPage from "./pages/DestinationPage/DestinationPage";

function App() {
  return (
    <Router basename="/project1">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:destinationParam" element={<DestinationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
