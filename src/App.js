
import GlobalStats from './components/globalView/GlobalStats';
import MapData from './components/globalView/MapData';
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
