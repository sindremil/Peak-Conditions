import './App.css'
import "./component/DestinationCardStyle.css"
import DestinationPage from './DestinationPage';
import LandingPage from './LandingPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/aare" element={<DestinationPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
