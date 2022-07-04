import React, { Component } from 'react';
import axios from 'axios'
import Fuse from 'fuse.js'

import './CountryTally.css'

const fuzzySearchOptions = {
  keys: [
    "country",
    "countryInfo.iso3"
  ]
};

const statisticsTags = ['Confirmed', 'Active', 'Dead', 'Recovered']

class CountryTally extends Component {
  constructor(props) {
    super(props);
    this.state = { countryTally: [] };
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleChangeStatistic = this.handleChangeStatistic.bind(this);
  }

  async componentDidMount() {
    const countryTally = await axios.get('https://disease.sh/v3/covid-19/countries?sort=cases')

    this.setState({
      countryTally: countryTally.data,
      countrySelectedStat: statisticsTags[0]
    });
  }

  async handleChangeQuery(event) {
    console.log(event.target.value !== "")
    const countryTally = await axios.get('https://disease.sh/v3/covid-19/countries?sort=cases')
    if (event.target.value !== "") {
      const fuse = new Fuse(countryTally.data, fuzzySearchOptions);
      this.setState({
        countryTally: fuse.search(event.target.value).map(a => a.item),
      });
    }
    else
      this.setState({
        countryTally: countryTally.data,
      });
  }

  async handleChangeStatistic(event) {
    this.setState({
      countrySelectedStat: statisticsTags[event.target.id],
    });
  }

  render() {

    const CountryTallyRows = ({ countries }) => {
      return countries.map(country => {
        if (!country.countryInfo._id) return null
        return (
          <tr id={country.countryInfo._id}>
            <td>
              <img className="flag" src={country.countryInfo.flag} alt={country.countryInfo.iso3} />
            </td>

            <td>{country.country}</td>
            <td>{country.cases}</td>
          </tr>
        )
      })
    }


    const CountryStatTags = () => {
      return statisticsTags.map((element, index) => {
        return (
          <button className='sorting-chip' 
          id={index}
          style={{ 
            'background-color': this.state.countrySelectedStat === element ? 'black' : 'white',
            'color': this.state.countrySelectedStat === element ? 'white' : 'black'
          }} 
          onClick={this.handleChangeStatistic}>
            {element}
            </button>
        )
      });
    }

    return (
      <div className='container-country'>
        <div className='sorting-row'>
          <CountryStatTags />
        </div>

        <div className='search-bar'>
          <input contentEditable="true" className="search-bar-text" placeholder="Search Country" onChange={this.handleChangeQuery} />
        </div>
        <div className='container-table'>
          <table cellSpacing={0}>
            <tbody>
              <CountryTallyRows countries={this.state.countryTally} />
            </tbody>

          </table>
        </div>
      </div>
    );
  }
}

export default CountryTally;

