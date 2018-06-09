import { action, observable } from 'mobx'
import loadingStore from '../loading'
import {getErrorMessage} from 'src/util'
import {getQuestionGroup, updateQuestionGroup} from 'src/api/question'
import _ from 'lodash'
import moment from 'moment'

// const GROUP_ONE = 1
// const GROUP_TWO = 2
// const GROUP_THREE = 3
// const GROUP_META = 4

class QuestionGroupStore {
  @observable questionGroup = null
  @observable isQuestionGroupsLoading = true
  @observable errorMessage= null
  @observable successMessage = null
  @observable activeKey = 1

  @action setActiveKey(key) {
    self.activeKey = key
  }

  @action clearQuestionGroupList() {
    self.questionGroup = null
  }
  getGroupByType(type) {
    const group = _.find(self.questionGroup, (g) => {
      return g.groupType === type
    })
    if(!_.isNil(group.releaseTime)) {
      group.releaseTime = moment.utc(group.releaseTime).local()
    }
    return group
  }

  @action async updateQuestionGroup({groupType, groupName, releaseTime}) {
    const releaseTimeUTC = moment.utc(releaseTime)
    try {
      self.successMessage = null
      self.errorMessage = null
      await updateQuestionGroup({
        groupType,
        groupName,
        releaseTime: releaseTimeUTC,
      })
      self.getQuestionGroup()
      self.successMessage='更新问题组成功'
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
    }
  }



  @action async getQuestionGroup() {
    self.clearQuestionGroupList()
    loadingStore.isQuestionGroupLoading = true
    try {
      self.errorMessage = null
      const res = await getQuestionGroup()
      const questionGroup = res.data
      const questionGroupWithLocale = _.map(questionGroup, (g) => {
        const releaseTime = g.releaseTime
        g.releaseTime = moment.utc(releaseTime).local()
        return g
      })

      self.questionGroup = questionGroupWithLocale
    } catch (err) {
      self.clearQuestionGroupList()
      self.errorMessage = getErrorMessage(err)
    }
    loadingStore.isQuestionGroupLoading = false

  }
}

const self = new QuestionGroupStore()

export default self