import { observable, action } from 'mobx'
// import { setXAccessToken } from 'src/util'
// import { signIn } from 'src/api/auth'
// import sessionStore from 'src/stores/session'

class QuestionStore {
  @observable errorMessage = null

  constructor () {
  }
}

const self = new QuestionStore()

export default self