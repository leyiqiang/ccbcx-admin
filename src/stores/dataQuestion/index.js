import { action, observable } from 'mobx'
import {DATA_QUESTION} from '../../data/route'
import routing from '../routing'
import { getErrorMessage } from 'src/util'
import loadingStore from '../loading'
import _ from 'lodash'
import moment from 'moment'
import { getProgressListByQuestionNumber } from 'src/api/data'

class DataStore {
  @observable errorMessage = null
  @observable successMessage = null
  @observable progressList = null

  constructor() {
    // this.getGroupInfo()
  }

  @action clearDataInfo() {
    self.errorMessage = null
    self.successMessage = null
  }

  @action redirectToHome() {
    routing.history.push(DATA_QUESTION)
  }

  @action async getProgressListByQuestionNumber({ questionNumber }) {
    self.errorMessage = null
    self.successMessage = null
    loadingStore.isDataQuestionLoading = true
    try {
      const res = await getProgressListByQuestionNumber({questionNumber})
      const progressList = res.data
      self.progressList = _.map(progressList, (p)=>{
        p.completeTime = moment(p.completeTime).utc().local().format('MM/DD/YYYY h:mm:ss a')
        return p
      })
      loadingStore.isDataQuestionLoading = false
    } catch(err) {
      self.errorMessage = getErrorMessage(err)
      self.progressList = null
      loadingStore.isDataQuestionLoading = false
    }

  }
}
const self = new DataStore()

export default self