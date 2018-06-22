import { action, observable } from 'mobx'
import {DATA_CHART, DATA_GROUP, DATA_QUESTION} from '../../data/route'
import routing from '../routing'

class DataStore {
  @observable errorMessage = null
  @observable successMessage = null

  constructor() {
    // this.getGroupInfo()
  }

  @action clearDataInfo() {
    self.errorMessage = null
    self.successMessage = null
  }

  @action redirectToGroupData() {
    routing.history.push(DATA_GROUP)
  }

  @action redirectToQuestionData() {
    routing.history.push(DATA_QUESTION)
  }

  @action redirectToChart() {
    routing.history.push(DATA_CHART)
  }
}
const self = new DataStore()

export default self