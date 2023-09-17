import './App.css'
import "./component/DestinationCardStyle.css"
import ForecastList from './component/ForecastList';
import LandingPage from './LandingPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/forecastList" element={<ForecastList/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
