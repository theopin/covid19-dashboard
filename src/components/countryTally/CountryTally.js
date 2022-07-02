import React, { Component } from 'react';
import './CountryTally.css'
import axios from 'axios'


class CountryTally extends Component {
  constructor(props) {
    super(props);
    this.state = { countryTally: [] };
  }

  async componentDidMount() {
    const countryTally = await axios.get('https://disease.sh/v3/covid-19/countries?sort=cases')

    this.setState({
      countryTally: countryTally.data,
    });
    console.log(this.state.countryTally)
  }

  render() {
    const CountryTallyRows = ({ countries }) => {
      return countries.map(country => {
        if (!country.countryInfo._id) return null
        return (
          <tr>
            <td>
              <img className="flag" src={country.countryInfo.flag}/>
            </td>
            
            <td>{country.country}</td>
            <td>{country.cases}</td>
          </tr>
        )
      })
    }

    return (
      <div className='container-country'>
        <div>Hi</div>
        <div className='container-table'>
        <table>
          <CountryTallyRows countries={this.state.countryTally} />
        </table>
        </div>
      </div>
    );
  }
}

export default CountryTally;

