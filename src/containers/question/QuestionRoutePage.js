import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import GroupDetailsPage from './GroupDetailsPage'
import {QUESTION_LIST, QUESTION_SETTINGS} from 'src/data/route'
import QuestionGroupPage from './QuestionGroupPage'
// import RoutePage from './RoutePage'

class QuestionRoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={QUESTION_LIST} component={QuestionGroupPage} />
          {/*<Route path={QUESTION_SETTINGS} component={GroupDetailsPage} />*/}
          <Route path={'*'} component={() => <Redirect to={QUESTION_LIST}/> } />
        </Switch>
      </div>
    )
  }
}

export default QuestionRoutePage