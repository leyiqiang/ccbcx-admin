import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {SIGN_IN, GROUP, QUESTION, DATA, NEWS} from 'src/data/route'
import SignInPage from './SignInPage'
import InfoCard from 'src/components/InfoCard'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import GroupRoutePage from './group/GroupRoutePage'
import QuestionRoutePage from './question/QuestionRoutePage'
import DataRoutePage from './data/DataRoutePage'
import NewsPage from './news/NewsPage'

@withRouter
@inject(stores => {
  const { sessionStore, loadingStore } = stores
  const { userInfo, logout } = sessionStore
  const { isAuthLoading } = loadingStore
  return {
    userInfo,
    logout,
    isAuthLoading,
  }
})
@observer
class RoutePage extends Component {
  constructor(props) {
    super(props)
    this.renderRoute = this.renderRoute.bind(this)
  }

  static propTypes =  {
    userInfo: PropTypes.object,
    logout: PropTypes.func.isRequired,
    isAuthLoading: PropTypes.bool.isRequired,
  }

  renderRoute() {
    const { userInfo, logout, isAuthLoading } = this.props
    if(isAuthLoading) {
      return (<h3>Loading...</h3>)
    }
    if (_.isNil(userInfo)) {
      return(
        <div>
          <InfoCard/>
          <Switch>
            <Route path={SIGN_IN} component={SignInPage} />
            <Route path={'*'} component={() => <Redirect to={SIGN_IN}/> } />
          </Switch>
          <Footer/>
        </div>
      )
    } else {
      return (
        <div>
          <NavBar logout={logout}/>
          <Switch>
            <Route exact path={NEWS} component={NewsPage} />
            <Route path={QUESTION} component={QuestionRoutePage} />
            <Route path={DATA} component={DataRoutePage} />
            <Route path={GROUP} component={GroupRoutePage} />
            <Route path={'*'} component={() => <Redirect to={QUESTION}/> } />
          </Switch>
          <Footer/>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.renderRoute()}
      </div>
    )
  }

}

export default RoutePage
