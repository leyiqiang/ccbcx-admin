import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {
  DATA,
  DATA_CHART,
  DATA_GROUP,
  DATA_QUESTION,
} from 'src/data/route'
import DataHomePage from './DataHomePage'
import DataQuestionPage from './DataQuestionPage'
import DataGroupPage from './DataGroupPage'
import DataChartPage from './DataChartPage'
// import RoutePage from './RoutePage'

class DataRoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={DATA} component={DataHomePage} />
          <Route path={DATA_QUESTION} component={DataQuestionPage} />
          <Route path={DATA_GROUP} component={DataGroupPage} />
          <Route path={DATA_CHART} component={DataChartPage} />
          <Route path={'*'} component={() => <Redirect to={DATA}/> } />
        </Switch>
      </div>
    )
  }
}

export default DataRoutePage