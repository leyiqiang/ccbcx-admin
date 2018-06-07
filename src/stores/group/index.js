import { action, observable } from 'mobx'
import { getErrorMessage } from 'src/util/index'
import { getGroupInfo } from 'src/api/group'
import loadingStore from '../loading'
import _ from 'lodash'

class GroupStore {
  @observable errorMessage = null
  @observable groupName = null
  @observable groupContact = null
  @observable invitationCode = null
  @observable memberList = []

  constructor() {
    // this.getGroupInfo()
  }

  @action clearGroupInfo() {
    self.groupName = null
    self.groupContact = null
    self.invitationCode = null
    self.memberList = null
  }

  @action async getGroupInfo({ groupName }) {
    self.clearGroupInfo()
    loadingStore.isGroupProfileLoading = true
    try {
      self.errorMessage = null
      const res = await getGroupInfo({ groupName })
      const {groupInfo, memberList} = res.data
      if (!_.isNil(groupInfo)) {
        const {groupName, groupContact, invitationCode} = groupInfo
        self.groupName = groupName
        self.groupContact = groupContact
        self.invitationCode = invitationCode
        self.memberList = memberList
      }
    } catch (err) {
      self.clearGroupInfo()
      self.errorMessage = getErrorMessage(err)
    }
    loadingStore.isGroupProfileLoading = false
  }

}


const self = new GroupStore()

export default self