import { observable, action } from 'mobx'
import loadingStore from '../loading'
import {getErrorMessage} from 'src/util'
import {getQuestion, updateQuestion, updateQuestionLocation} from 'src/api/question'
import routing from '../routing'
import _ from 'lodash'
import { QUESTION_LIST} from '../../data/route'
import questionGroupStore from  '../questionGroup'
// import { setXAccessToken } from 'src/util'

class QuestionStore {
  @observable errorMessage = null
  @observable question = null
  @observable successMessage = null

  constructor () {
  }

  @observable async getQuestion({ questionNumber }) {
    self.errorMessage = null
    self.question = null
    self.successMessage = null
    loadingStore.isQuestionInfoLoading = true
    try {
      const res = await getQuestion({ questionNumber })
      self.question = res.data

    } catch (err) {
      self.errorMessage = getErrorMessage(err)
      self.successMessage = null
    }
    loadingStore.isQuestionInfoLoading = false

  }

  @observable async updateQuestionLocation({ questionNumber, location }) {
    self.errorMessage = null
    self.successMessage = null
    try {
      await updateQuestionLocation({ questionNumber, location})
      await questionGroupStore.getQuestionList()
      self.getQuestion({questionNumber})
      self.successMessage = '更新成功'
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
      self.successMessage = null
    }
  }

  @observable async updateQuestion({
    questionNumber,
    questionContent,
    answer,
    hint1,
    hint2,
    hint3,
  }) {
    self.errorMessage = null
    self.successMessage = null
    try {
      await updateQuestion({
        questionNumber,
        questionContent,
        answer,
        hint1,
        hint2,
        hint3,
      })
      self.getQuestion({questionNumber})
      self.successMessage = '更新成功'
    } catch(err)  {
      self.errorMessage = getErrorMessage(err)
      self.question = null
      self.successMessage = null
    }

  }

  @observable redirectToQuestionList() {
    routing.history.push(QUESTION_LIST)
  }
}

const self = new QuestionStore()

export default self