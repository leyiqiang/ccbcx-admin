import { action, observable } from 'mobx'
import loadingStore from '../loading'
import {getErrorMessage} from 'src/util'
import {getQuestionGroup, updateQuestionGroup} from 'src/api/questionGroup'
import {getQuestionList} from 'src/api/question'
import _ from 'lodash'
import moment from 'moment'
import {PARAM_QUESTION_ID, QUESTION_SETTINGS} from 'src/data/route/index'
import {buildParamURI} from '../../util/index'
import routing from '../routing'

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
  @observable questionList = null

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
    const releaseTimeUTC = moment.utc(releaseTime).seconds(0)
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

  @action async getQuestionList() {
    loadingStore.isQuestionListLoading = true
    try {
      self.errorMessage = null
      const res = await getQuestionList()
      const unsortedQuestionList = res.data
      const groupedQuestionList = _.sortBy(unsortedQuestionList,
        q => parseInt(q.questionNumber))
      self.questionList = groupedQuestionList
    } catch(err) {
      self.clearQuestionGroupList()
      self.errorMessage = getErrorMessage(err)
    }
    loadingStore.isQuestionListLoading = false
  }

  @action redirectToSettings({ questionNumber }) {
    let redirectedURI = buildParamURI({
      originalURI: QUESTION_SETTINGS,
      paramName: PARAM_QUESTION_ID,
      substitutedValue: questionNumber,
    })
    routing.history.push(redirectedURI)
  }

}

const self = new QuestionGroupStore()

export default self