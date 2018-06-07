import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'
// import { buildParamURI } from 'src/util/index'

const GROUP_API = '/api/admin/group'

const PARAM_GROUP_NAME = ':groupName'

const GROUP_INFO = GROUP_API + '/info/' + PARAM_GROUP_NAME
const GROUP_LIST = GROUP_API + '/list'

const getGroupInfoUri = function({ groupName }) {
  return buildParamURI({
    originalURI: GROUP_INFO,
    paramName: PARAM_GROUP_NAME,
    substitutedValue: groupName,
  })
}

export const getGroupInfo = async function({ groupName }) {
  const uri = getGroupInfoUri({ groupName })
  console.log(axios.defaults.headers)
  return await axios.get(uri)
}

export const getGroupList = async function() {
  console.log(axios.defaults.headers)

  return await axios.get(GROUP_LIST)
}