import { action, observable } from 'mobx'
import routing from '../routing'
import { getErrorMessage } from 'src/util'
import loadingStore from '../loading'
import _ from 'lodash'
import moment from 'moment'
import { addNews, getNews, deleteNews } from 'src/api/news'


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
      await self.getNews()
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
      const newsList = res.data
      self.newsList = _.map(newsList, (n) => {
        n.createdAt = moment.utc(n.createdAt).local().format('MM/DD/YYYY, h:mm:ss a')
        return n
      })
      loadingStore.isNewsListLoading = false
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
      self.newsList = null
      loadingStore.isNewsListLoading = false
    }
  }

  @action async deleteNews({_id}) {
    self.clearDataInfo()
    try {
      await deleteNews({_id})
      await self.getNews()
    } catch (err) {
      self.errorMessage = getErrorMessage(err)
      self.newsList = null

    }
  }
}
const self = new NewsStore()

export default self