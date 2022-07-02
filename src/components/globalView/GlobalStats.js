import React, { Component } from 'react';
import './GlobalView.css'
import axios from 'axios'


class GlobalStats extends Component {
  constructor(props) {
    super(props);
    this.state = { globalCases: [] };
  }

  async componentDidMount() {
    const globalCases = await axios.get('https://disease.sh/v3/covid-19/all')
    const globalVaccinations = await axios.get('https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1&fullData=false')
    this.setState({
      globalCases: globalCases.data,
      globalVaccinations: Object.values(globalVaccinations.data)[0]
    });
  }

  render() {

    return (
      <div className="container-global">
        <div className="card-global">
          <div>Total Cases</div>
          <div>{this.state.globalCases.cases}</div>
        </div>
        <div className="card-global">
          <div>Total Deaths</div>
          <div>{this.state.globalCases.deaths}</div>
        </div>
        <div className="card-global">
          <div>Total Vaccines Administered</div>
          <div>{this.state.globalVaccinations}</div>
        </div>
      </div>
    );
  }
}

export default GlobalStats;

