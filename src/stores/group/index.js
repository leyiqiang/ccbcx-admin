import { action, observable } from 'mobx'
import { getErrorMessage } from 'src/util/index'
import { getGroupInfo, getBlackList, addBlackList, removeBlackList } from 'src/api/group'
import loadingStore from '../loading'
import _ from 'lodash'
import moment from 'moment'

class GroupStore {
  @observable errorMessage = null
  @observable groupName = null
  @observable groupContact = null
  @observable invitationCode = null
  @observable memberList = []
  @observable blockedUntil = null
  @observable errorMessage = null
  @observable successMessage = null

  constructor() {
    // this.getGroupInfo()
  }

  @action clearGroupInfo() {
    self.groupName = null
    self.groupContact = null
    self.invitationCode = null
    self.memberList = null
    self.blockedUntil = null
    self.errorMessage = null
    self.successMessage = null
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
      await self.getBlackList({groupName})
    } catch (err) {
      self.clearGroupInfo()
      self.errorMessage = getErrorMessage(err)
    }
    loadingStore.isGroupProfileLoading = false
  }

  @action async getBlackList({groupName}) {
    try {
      self.blockedUntil = null
      const res = await getBlackList({groupName})
      if (!_.isNil(res.data.blacklist)) {
        const { blockedUntil } = res.data.blacklist
        self.blockedUntil = moment.utc(blockedUntil).local().format('MM/DD/YYYY, h:mm:ss a')
        console.log(self.blockedUntil)
      }
    } catch (err) {
      self.clearGroupInfo()
      self.errorMessage = getErrorMessage(err)
    }
  }

  @action async addBlackList({groupName, seconds}) {
    try {
      self.errorMessage = null
      await addBlackList({groupName, seconds})
      await self.getBlackList({groupName})
      self.successMessage = 'success'
    } catch (err) {
      self.clearGroupInfo()
      self.errorMessage = getErrorMessage(err)
    }
  }

  @action async removeBlackList({groupName}) {
    try {
      self.errorMessage = null
      await removeBlackList({groupName})
      self.blockedUntil = null
      self.successMessage = 'success'
    } catch (err) {
      self.clearGroupInfo()
      slef.errorMessage = getErrorMessage(err)
    }
  }

}


const self = new GroupStore()

export default self