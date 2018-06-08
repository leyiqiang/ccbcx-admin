import { action, observable } from 'mobx'
// import { setXAccessToken } from 'src/util'
// import { signIn } from 'src/api/auth'
// import sessionStore from 'src/stores/session'
import loadingStore from '../loading'
import {getErrorMessage} from 'src/util'
import {getQuestionGroup} from 'src/api/question'

class QuestionGroupStore {
  @observable questionGroup = null;
  @observable isQuestionGroupsLoading = true;
  @observable errorMessage= null

  constructor () {
  }

  componentWillMount() {
    this.props.getGroupList()
  }

  @action clearQuestionGroupList() {
    self.questionGroup = null
  }

  @action async getQuestionGroup() {
    self.clearQuestionGroupList()
    loadingStore.isQuestionGroupLoading = true
    try {
      self.errorMessage = null
      const res = await getQuestionGroup()
      self.questionGroup = res.data
    } catch (err) {
      self.clearQuestionGroupList()
      self.errorMessage = getErrorMessage(err)
    }
    loadingStore.isQuestionGroupLoading = false

  }
}

const self = new QuestionGroupStore()

export default self