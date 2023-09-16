import './App.css'
import "./component/DestinationCardStyle.css"
import LandingPage from './LandingPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DestinationPage from './DestinationPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/aare" element={<DestinationPage destination='Aare'/>}/>
        <Route path="/hemsedal" element={<DestinationPage destination='Hemsedal'/>}/>
        <Route path="/hafjell" element={<DestinationPage destination='Hafjell'/>}/>
        <Route path="/kvitfjell" element={<DestinationPage destination='Kvitfjell'/>}/>
      </Routes>
    </Router>
  )
}

export default App
