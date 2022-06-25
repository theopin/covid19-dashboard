import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import './App.css';

function App() {
  const sampleLocation =  {
    "updated": 1656163358377,
    "country": "Afghanistan",
    "countryInfo": {
        "_id": 4,
        "iso2": "AF",
        "iso3": "AFG",
        "lat": 33,
        "long": 65,
        "flag": "https://disease.sh/assets/img/flags/af.png"
    },
    "cases": 182072,
    "todayCases": 28,
    "deaths": 7717,
    "todayDeaths": 0,
    "recovered": 164040,
    "todayRecovered": 54,
    "active": 10315,
    "critical": 1124,
    "casesPerOneMillion": 4478,
    "deathsPerOneMillion": 190,
    "tests": 996925,
    "testsPerOneMillion": 24519,
    "population": 40659086,
    "continent": "Asia",
    "oneCasePerPeople": 223,
    "oneDeathPerPeople": 5269,
    "oneTestPerPeople": 41,
    "activePerOneMillion": 253.69,
    "recoveredPerOneMillion": 4034.52,
    "criticalPerOneMillion": 27.64
}
  return (
      <MapContainer center={[sampleLocation.countryInfo.lat, sampleLocation.countryInfo.long]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[sampleLocation.countryInfo.lat, sampleLocation.countryInfo.long]}>
    <Popup>
      <h3>{sampleLocation.country}</h3>
      <div>Confirmed: {sampleLocation.cases}</div>
      <div>Deaths: {sampleLocation.deaths}</div>
      <div>Last Updated: {new Date(sampleLocation.updated).toLocaleString()}</div>
    </Popup>
  </Marker>
</MapContainer>   
  );
}

export default App;
