import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'
import './GlobalView.css'



class MapData extends Component {
  constructor(props) {
    super(props);
    this.state = { countriesData: [] };
  }

  async componentDidMount() {
    const countriesData = await axios.get('https://disease.sh/v3/covid-19/countries')
    this.setState({
      countriesData: countriesData.data,
    });
  }

  render() {

    const CountryMarkers = ({ countries }) => {
      return countries.map(country => {
        if(!country.countryInfo._id) return null
        return (
          <Marker position={[country.countryInfo.lat, country.countryInfo.long]} key={country.countryInfo._id} >
            <Popup>
              <h3>{country.country}</h3>
              <div>Confirmed: {country.cases}</div>
              <div>Deaths: {country.deaths}</div>
              <div>Last Updated: {new Date(country.updated).toLocaleString()}</div>
            </Popup>
          </Marker>
        )
      })
    }
    return (
      <div className='container-map'>
      <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom={true} style={{'flex-grow': '1',}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CountryMarkers countries={this.state.countriesData} />
      </MapContainer>
      </div>
    );
  }
}

export default MapData;

