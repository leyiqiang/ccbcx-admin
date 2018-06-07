import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ROOT, SIGN_IN, USER, GROUP }  from 'src/data/route'
import HomePage from './HomePage'
import SignInPage from './SignInPage'
import InfoCard from 'src/components/InfoCard'
import NavBar from '../components/NavBar'
import UserRoutePage from './user/UserRoutePage'
import Footer from '../components/Footer'
import GroupRoutePage from './group/GroupRoutePage'

@withRouter
@inject(stores => {
  const { sessionStore, authStore, loadingStore } = stores
  const { authMessage, logout, getAuthInfo } = sessionStore
  const { handleAuthentication } = authStore
  const { isAuthLoading } = loadingStore
  return {
    authMessage,
    getAuthInfo,
    logout,
    handleAuthentication,
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
    authMessage: PropTypes.object,
    logout: PropTypes.func.isRequired,
    getAuthInfo: PropTypes.func.isRequired,
    handleAuthentication: PropTypes.func.isRequired,
    isAuthLoading: PropTypes.bool.isRequired,
  }

  componentWillMount() {

  }

  renderRoute() {
    const { authMessage, logout, isAuthLoading } = this.props
    if (/access_token|id_token|error/.test(location.hash)) {
      this.props.handleAuthentication()
      // this.props.getAuthInfo()
    }
    if(isAuthLoading) {
      return (<h3>Loading...</h3>)
    }
    if (_.isNil(authMessage)) {
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
            <Route exact path={ROOT} component={HomePage} />
            {/*<Route path={USER} component={UserRoutePage} />*/}
            {/*<Route path={GROUP} component={GroupRoutePage} />*/}
            <Route path={'*'} component={() => <Redirect to={ROOT}/> } />
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
