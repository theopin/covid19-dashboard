import React, { Component } from 'react';
import axios from 'axios'
import './GlobalView.css'


class GlobalStats extends Component {
  constructor(props) {
    super(props);
    this.state = { globalCases: [] };
  }

  async componentDidMount() {
    const globalCases = await axios.get('https://disease.sh/v3/covid-19/all')
    this.setState({
      globalCases: globalCases.data,
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
          <div>Total Recovered</div>
          <div>{this.state.globalCases.recovered}</div>
        </div>
      </div>
    );
  }
}

export default GlobalStats;

