import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'
// import { buildParamURI } from 'src/util/index'

const QUESTION_API = '/api/admin/question'

// const PARAM_GROUP_TYPE = ':groupType'

const QUESTION_GROUP_LIST = QUESTION_API + '/groupList'

// const getGroupInfoUri = function({ groupName }) {
//   return buildParamURI({
//     originalURI: GROUP_INFO,
//     paramName: PARAM_GROUP_NAME,
//     substitutedValue: groupName,
//   })
// }

// export const getGroupInfo = async function({ groupName }) {
//   const uri = getGroupInfoUri({ groupName })
//   return await axios.get(uri)
// }

export const getQuestionGroup = async function() {
  return await axios.get(QUESTION_GROUP_LIST)
}