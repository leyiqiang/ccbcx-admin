import { action, observable } from 'mobx'
import { getAuthInfo } from 'src/api/session'
import { setAuthToken } from 'src/util'
import loadingStore from '../loading'

class SessionStore {
  @observable authMessage = null

  constructor() {
    this.getAuthInfo()
  }

  @action logout() {
    setAuthToken(null)
    self.authMessage = null
  }

  @action async getAuthInfo() {
    try {
      loadingStore.isAuthLoading = true
      const res = await getAuthInfo()
      self.authMessage = res.data
      loadingStore.isAuthLoading = false
    } catch (err) {
      setAuthToken(null)
      self.authMessage = null
    }
    loadingStore.isAuthLoading = false
  }

}

const self = new SessionStore()

export default self