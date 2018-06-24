import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {
  DATA,
  DATA_CHART,
  DATA_GROUP,
  DATA_QUESTION,
  DATA_QUESTION_PROGRESS,
  DATA_GROUP_PROGRESS,
} from 'src/data/route'
import DataHomePage from './DataHomePage'
import DataQuestionPage from './DataQuestionPage'
import DataGroupPage from './DataGroupPage'
import DataChartPage from './DataChartPage'
import ProgressQuestionPage from './ProgressQuestionPage'
import ProgressGroupPage from './ProgressGroupPage'
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
          <Route exact path={DATA_QUESTION} component={DataQuestionPage} />
          <Route path={DATA_QUESTION_PROGRESS} component={ProgressQuestionPage} />
          <Route exact path={DATA_GROUP} component={DataGroupPage} />
          <Route path={DATA_GROUP_PROGRESS} component={ProgressGroupPage} />
          <Route exact path={DATA_CHART} component={DataChartPage} />
          <Route path={'*'} component={() => <Redirect to={DATA}/> } />
        </Switch>
      </div>
    )
  }
}

export default DataRoutePage