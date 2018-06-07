import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import GroupListPage from './GroupListPage'
import GroupDetailsPage from './GroupDetailsPage'
import {GROUP_DETAILS, GROUP_LIST} from 'src/data/route'
// import RoutePage from './RoutePage'

class GroupRoutePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={GROUP_LIST} component={GroupListPage} />
          <Route path={GROUP_DETAILS} component={GroupDetailsPage} />
          <Route path={'*'} component={() => <Redirect to={GROUP_LIST}/> } />
        </Switch>
      </div>
    )
  }
}

export default GroupRoutePage