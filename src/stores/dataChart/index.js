import { action, observable } from 'mobx'
import {DATA} from '../../data/route'
import routing from '../routing'
import { getErrorMessage } from 'src/util'
import loadingStore from '../loading'
import _ from 'lodash'
import { getProgressList } from 'src/api/data'

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
    routing.history.push(DATA)
  }

  @action async getProgressList() {
    self.errorMessage = null
    self.successMessage = null
    loadingStore.isDataChartLoading = true
    try {
      const res = await getProgressList()
      self.progressList = res.data
      loadingStore.isDataChartLoading = false
    } catch(err) {
      self.errorMessage = getErrorMessage(err)
      self.progressList = null
      loadingStore.isDataChartLoading = false
    }

  }
}
const self = new DataStore()

export default self