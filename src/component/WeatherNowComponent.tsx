import clearsky_day from './../assets/weathericons/svg/clearsky_day.svg';
import thermotstat from './../assets/weahterNowComponent/thermostat.svg';
import waterDrop from './../assets/weahterNowComponent/waterDrop.svg';
import wind from './../assets/weahterNowComponent/wind.svg';
import './WeatherNowStyle.css'

export default function WeatherNowComponent() {
  return (
    <section>
      <header>
        <h4>Åre by</h4>
        <h4>390 moh.</h4>
      </header>
      <summary>
        <img 
          id='skyIcon'
          src={clearsky_day}
          alt='clear sky'
        />
        <div className='conditions'>
          <div>
            <img
              className='conditionIcons'
              src={thermotstat} 
              alt='thermostat' 
            />
            <p>7°</p>
          </div>
          <div>
            <img 
              className='conditionIcons'
              src={waterDrop}
              alt="percipiation" 
            />
            <p>0mm</p>
          </div>
          <div>
            <img
              className='conditionIcons'
              src={wind} 
              alt="wind" 
            />
            <p>8 m/s</p>
          </div>
        </div>
      </summary>
    </section>
  );
}