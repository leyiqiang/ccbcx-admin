import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import SignInForm from 'src/components/SignInForm'


// @withRouter
@inject(stores => {
  const { authStore } = stores
  const {
    userName,
    password,
    setUserName,
    setPassword,
    errorMessage,
    login,
  } = authStore
  return {
    userName,
    password,
    setUserName,
    setPassword,
    errorMessage,
    login,
  }
})

@observer
class SignInPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // const { userName, password, setUserName, setPassword, errorMessage, login } = this.props
    return (
      <div>
        <SignInForm
          {...this.props}
        />
      </div>
    )
  }
}

export default SignInPage