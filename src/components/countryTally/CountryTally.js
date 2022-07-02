import React, { Component } from 'react';
import './CountryTally.css'
import axios from 'axios'


async function getData(countryString) {
  if (countryString == "")
    return await axios.get('https://disease.sh/v3/covid-19/countries?sort=cases')
  return await axios.get('https://disease.sh/v3/covid-19/countries/' + countryString + '?yesterday')
}

class CountryTally extends Component {
  constructor(props) {
    super(props);
    this.state = { countryTally: [], countrySearch: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const countryTally = await getData("")

    this.setState({
      countryTally: countryTally.data,
    });
  }

  async handleChange(event) {    
    const countryTally = await getData(event.target.value)
    console.log(countryTally.data)
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
              <img className="flag" src={country.countryInfo.flag} alt={country.countryInfo.iso3}/>
            </td>
            
            <td>{country.country}</td>
            <td>{country.cases}</td>
          </tr>
        )
      })
    }

    return (
      <div className='container-country'>
        <input contentEditable="true" className="search-bar" placeholder="Search Country" onChange={this.handleChange}/>
        <div className='container-table'>
        <table>
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

