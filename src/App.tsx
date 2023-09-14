import './App.css'
import "./component/DestinationCardStyle.css"
import DestinationCard from './component/DestinationCardComponent'

function App() {

  return (
    <div className="content">
      <DestinationCard
        destination="Åre"
        temperature={3}
        windSpeed={3}
        symbolCode="partlycloudy"
      />
    </div>
  )
}

export default App
