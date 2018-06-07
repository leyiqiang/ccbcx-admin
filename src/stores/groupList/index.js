import { action, observable } from 'mobx'
import { getErrorMessage } from 'src/util/index'
import { getGroupList } from 'src/api/group'
import { GROUP_DETAILS, PARAM_GROUP_NAME } from 'src/data/route'
import loadingStore from '../loading'
import {buildParamURI} from 'src/util'
import routing from '../routing'
import _ from 'lodash'

class GroupListStore {
  @observable errorMessage = null
  @observable groupList = []

  constructor() {
    // this.getGroupList()
  }

  @action clearGroupList() {
    self.groupList = null
  }

  @action async getGroupList() {
    self.clearGroupList()
    loadingStore.isGroupListLoading = true
    try {
      self.errorMessage = null
      const res = await getGroupList()
      const groupList = res.data
      self.groupList = groupList
    } catch (err) {
      self.clearGroupList()
      self.errorMessage = getErrorMessage(err)
    }
    loadingStore.isGroupListLoading = false
  }

  @action redirectToDetails({ groupName }) {
    let redirectedURI = buildParamURI({
      originalURI: GROUP_DETAILS,
      paramName: PARAM_GROUP_NAME,
      substitutedValue: groupName,
    })
    routing.history.push(redirectedURI)
  }
}


const self = new GroupListStore()

export default self