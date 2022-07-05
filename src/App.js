
import GlobalStats from './components/globalStats/GlobalStats';
import MapData from './components/mapData/MapData';
import CountryTally from './components/countryTally/CountryTally';
import './App.css';

function App() {
    return (
        <div>
            <GlobalStats />
            <div className="container">
            <CountryTally />
            <MapData />
            </div>
        </div>

    )
}

export default App;
