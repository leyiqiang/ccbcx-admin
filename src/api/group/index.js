import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'
// import { buildParamURI } from 'src/util/index'

const GROUP_API = '/api/admin/group'

export const PARAM_GROUP_NAME = ':groupName'

const GROUP_INFO = GROUP_API + '/info/' + PARAM_GROUP_NAME
const GROUP_LIST = GROUP_API + '/list'

const GROUP_BLACKLIST = GROUP_API + '/blacklist/' + PARAM_GROUP_NAME
const GROUP_ADD_BLACKLIST = GROUP_API + '/addBlacklist'

const GROUP_REMOVE_BLACKLIST = GROUP_API + '/removeBlacklist/' + PARAM_GROUP_NAME

const getGroupInfoUri = function({ groupName }) {
  return buildParamURI({
    originalURI: GROUP_INFO,
    paramName: PARAM_GROUP_NAME,
    substitutedValue: groupName,
  })
}

const getBlackListUri = function({groupName}) {
  return buildParamURI({
    originalURI:GROUP_BLACKLIST,
    paramName: PARAM_GROUP_NAME,
    substitutedValue: groupName,
  })
}

const removeBlackListUri = function({groupName}) {
  return buildParamURI({
    originalURI:GROUP_REMOVE_BLACKLIST,
    paramName: PARAM_GROUP_NAME,
    substitutedValue: groupName,
  })
}

export const getGroupInfo = async function({ groupName }) {
  const uri = getGroupInfoUri({ groupName })
  return await axios.get(uri)
}

export const getBlackList = async function({ groupName }) {
  const uri = getBlackListUri({groupName})
  return await axios.get(uri)
}

export const removeBlackList = async function({ groupName }) {
  const uri = removeBlackListUri({groupName})
  return await axios.delete(uri)
}

export const addBlackList = async function({ groupName, seconds}) {
  return await axios.post(GROUP_ADD_BLACKLIST, {groupName, seconds})
}
export const getGroupList = async function() {
  return await axios.get(GROUP_LIST)
}