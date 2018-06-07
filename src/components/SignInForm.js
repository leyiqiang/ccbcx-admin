import React, { Component } from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

// @withRouter
@observer
class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.renderErrorMessage = this.renderErrorMessage.bind(this)
    this.onLogin = this.onLogin.bind(this)
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  }


  renderErrorMessage() {
    if (_.isNil(this.props.errorMessage)) {
      return
    } else {
      return (
        <div className='alert alert-danger' role='alert'>
          {this.props.errorMessage}
        </div>
      )
    }
  }

  onLogin(e) {
    e.preventDefault()
    this.props.login()
  }

  render() {
    return (
      <div>
        <h3>请登陆</h3>
        {this.renderErrorMessage()}
        <Button onClick={this.onLogin}>登陆</Button>
      </div>
    )
  }
}

export default SignInForm
