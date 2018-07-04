import { observable } from 'mobx'
// import { setXAccessToken } from 'src/util'
// import { signIn } from 'src/api/auth'
// import sessionStore from 'src/stores/session'

class LoadingStore {
  @observable isUserInfoLoading = true;
  @observable isGroupListLoading = true;
  @observable isGroupProfileLoading = true;
  @observable isQuestionGroupLoading = true;
  @observable isQuestionListLoading = true;
  @observable isQuestionInfoLoading = true;
  @observable isDataGroupLoading = true;
  @observable isDataQuestionLoading = true;
  @observable isDataChartLoading = true;
  @observable isNewsListLoading = true;

  constructor () {
  }
}

const self = new LoadingStore()

export default self