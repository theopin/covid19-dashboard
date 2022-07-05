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

const statisticsTags = ['cases', 'active', 'deaths', 'recovered']

class CountryTally extends Component {
  constructor(props) {
    super(props);
    this.state = { countryTally: [] };
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleChangeStatistic = this.handleChangeStatistic.bind(this);
  }

  obtainPercentageChange(newStat, previousDayStat, country) {
    console.log(newStat, previousDayStat, country)
    return +((newStat - previousDayStat) / previousDayStat * 100).toFixed(2)
  }

  async componentDidMount() {
    const countryTally = await axios.get('https://disease.sh/v3/covid-19/countries?sort=cases')

    this.setState({
      countryTally: countryTally.data,
    });
  }

  async handleChangeQuery(event) {
    console.log(event.target.value !== "")
    const countryTally = await axios.get('https://disease.sh/v3/covid-19/countries?sort=' + this.state.countrySelectedStat)
    
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
    const countryTally = await axios.get('https://disease.sh/v3/covid-19/countries?sort=' + statisticsTags[event.target.id])
    this.setState({
      countryTally: countryTally.data
    });
  }

  render() {

    const CountryTallyRows = ({ countries }) => {
      return countries.map((country, index) => {
        if (!country.countryInfo._id) return null
        return (
          <tr id={country.countryInfo._id}>
            <td>
              <img className="flag" src={country.countryInfo.flag} alt={country.countryInfo.iso3} />
            </td>

            <td>{country.country}</td>
            <td>{country[this.state.countrySelectedStat]}</td>
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
            {element.charAt(0).toUpperCase() + element.slice(1)} 
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

