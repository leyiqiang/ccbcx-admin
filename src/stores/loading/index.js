import { observable } from 'mobx'
// import { setXAccessToken } from 'src/util'
// import { signIn } from 'src/api/auth'
// import sessionStore from 'src/stores/session'

class LoadingStore {
  @observable isAuthLoading = true;
  @observable isGroupListLoading = true;
  @observable isGroupProfileLoading = true;
  @observable isQuestionGroupLoading = true;
  @observable isQuestionListLoading = true;
  @observable isQuestionInfoLoading = true;
  constructor () {
  }
}

const self = new LoadingStore()

export default self