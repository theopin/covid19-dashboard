import React, { Component } from 'react';
import axios from 'axios'
import './GlobalView.css'


class GlobalStats extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      globalCases: [], 
      globalChange: {
        caseChange: 0,
        deathChange: 0,
        recoveryChange: 0
      } 
    };
  }

  obtainPercentageChange(todayData, yesterdayData) {
    return {
      caseChange: +((yesterdayData.todayCases - todayData.todayCases) / yesterdayData.todayCases * 100).toFixed(1),
      deathChange: +((yesterdayData.todayDeaths - todayData.todayDeaths) / yesterdayData.todayDeaths * 100).toFixed(1),
      recoveryChange: +((yesterdayData.todayRecovered- todayData.todayRecovered) / yesterdayData.todayRecovered * 100).toFixed(1),
    }
  }

  async componentDidMount() {
    const globalCases = await axios.get('https://disease.sh/v3/covid-19/all')
    const previousGlobalCases = await axios.get('https://disease.sh/v3/covid-19/all?yesterday=true')
    this.setState({
      globalCases: globalCases.data,
      globalChange: this.obtainPercentageChange(globalCases.data, previousGlobalCases.data)
    });
  }

  render() {
    return (
      <div className="container-global">
        <div className="card-global">
          <div>Total Cases</div>
          <div>{this.state.globalCases.cases}</div>
          <div>{this.state.globalChange.caseChange + "% " + (this.state.globalChange.caseChange < 0 ? "▲" : "▼")}</div>
        </div>
        <div className="card-global">
          <div>Total Deaths</div>
          <div>{this.state.globalCases.deaths}</div>
          <div>{this.state.globalChange.deathChange + "% " + (this.state.globalChange.deathChange < 0 ? "▲" : "▼")}</div>
        </div>
        <div className="card-global">
          <div>Total Recovered</div>
          <div>{this.state.globalCases.recovered}</div>
          <div>{this.state.globalChange.recoveryChange + "% " + (this.state.globalChange.recoveryChange < 0 ? "▲" : "▼")}</div>
        </div>
      </div>
    );
  }
}

export default GlobalStats;

