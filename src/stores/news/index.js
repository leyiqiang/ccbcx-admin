import { action, observable } from 'mobx'
import routing from '../routing'
import { getErrorMessage } from 'src/util'
import loadingStore from '../loading'
import _ from 'lodash'
import moment from 'moment'
import { addNews, getNews } from 'src/api/news'


class NewsStore {
  @observable errorMessage = null
  @observable successMessage = null
  @observable newsList = null

  constructor() {
    // this.getGroupInfo()
  }

  @action clearDataInfo() {
    self.errorMessage = null
    self.successMessage = null
  }

  @action async addNews({ message }) {
    self.errorMessage = null
    self.successMessage = null
    try {
      await addNews({message})
      self.successMessage = 'success'
      await getNews()
    } catch(err) {
      self.errorMessage = getErrorMessage(err)
      self.newsList = null
    }
  }

  @action async getNews() {
    self.clearDataInfo()
    loadingStore.isNewsListLoading = true
    try {
      const res = await getNews()
      self.newsList = res.data
      loadingStore.isNewsListLoading = false
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
      self.newsList = null
      loadingStore.isNewsListLoading = false
    }
  }
}
const self = new NewsStore()

export default self