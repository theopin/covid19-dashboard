import React, { Component } from 'react';
import axios from 'axios'
import Fuse from 'fuse.js'

import './CountryTally.css'

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    "country",
    "countryInfo.iso3"
  ]
};

class CountryTally extends Component {
  constructor(props) {
    super(props);
    this.state = { countryTally: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const countryTally = await axios.get('https://disease.sh/v3/covid-19/countries?sort=cases')

    this.setState({
      countryTally: countryTally.data,
    });
  }

  async handleChange(event) {
    console.log(event.target.value !== "")
    const countryTally = await axios.get('https://disease.sh/v3/covid-19/countries?sort=cases')
    if (event.target.value !== "") {
      const fuse = new Fuse(countryTally.data, options);
      this.setState({
        countryTally: fuse.search(event.target.value).map(a => a.item),
      });
    }
    else
      this.setState({
        countryTally: countryTally.data,
      });


  }

  render() {

    const CountryTallyRows = ({ countries }) => {
      return countries.map(country => {
        if (!country.countryInfo._id) return null
        return (
          <tr key={country.countryInfo._id}>
            <td>
              <img className="flag" src={country.countryInfo.flag} alt={country.countryInfo.iso3} />
            </td>

            <td>{country.country}</td>
            <td>{country.cases}</td>
          </tr>
        )
      })
    }

    return (
      <div className='container-country'>
        <div className='search-bar'>
          <input contentEditable="true" className="search-bar-text" placeholder="Search Country" onChange={this.handleChange} />
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

