import { observable, action } from 'mobx'
import loadingStore from '../loading'
import {getErrorMessage} from 'src/util'
import {getQuestion, updateQuestion} from 'src/api/question'
import routing from '../routing'
import _ from 'lodash'
import { QUESTION_LIST} from '../../data/route'
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
    loadingStore.isQuestionInfoLoading = true
    try {
      const res = await getQuestion({ questionNumber })
      const question = res.data
      if(!_.isNil(question.questionContent)) {
        question.questionContent = JSON.parse(question.questionContent)
      }
      self.question = question

    } catch (err) {
      self.errorMessage = getErrorMessage(err)
    }
    loadingStore.isQuestionInfoLoading = false

  }

  @observable async updateQuestion({ questionNumber, questionContent, answer}) {
    self.errorMessage = null
    try {
      const stringContent = JSON.stringify(questionContent)
      await updateQuestion({
        questionNumber,
        questionContent: stringContent,
        answer,
      })
      self.successMessage = '更新成功'
    } catch(err)  {
      self.errorMessage = getErrorMessage(err)
      self.question = null
    }
  }

  @observable redirectToQuestionList() {
    routing.history.push(QUESTION_LIST)
  }
}

const self = new QuestionStore()

export default self