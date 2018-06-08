import { action, observable } from 'mobx'
import { setAuthToken, getErrorMessage } from 'src/util'
import sessionStore from 'src/stores/session'
import { webAuth } from 'src/util/auth0'

class AuthStore {
  @observable userName = '';
  @observable password = '';
  @observable errorMessage = null;

  constructor () {
  }

  @action async login() {
    webAuth.authorize()
  }

  @action async handleAuthentication({hash}) {
    await webAuth.parseHash({hash}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        sessionStore.promise.then(() => {
          setAuthToken(authResult.accessToken)
          sessionStore.getAuthInfo()
        })
      } else if (err) {
        self.errorMessage = getErrorMessage(err)
      }
    })
  }
}

const self = new AuthStore()

export default self