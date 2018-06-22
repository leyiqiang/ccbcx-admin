import { action, observable } from 'mobx'
import {DATA} from '../../data/route'
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

  @action redirectToHome() {
    routing.history.push(DATA)
  }
}
const self = new DataStore()

export default self