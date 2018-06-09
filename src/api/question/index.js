import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'
// import { buildParamURI } from 'src/util/index'

const QUESTION_API = '/api/admin/question'

// const PARAM_GROUP_TYPE = ':groupType'

const QUESTION_GROUP_LIST = QUESTION_API + '/groupList'

const UPDATE_QUESTION_GROUP = QUESTION_API + '/update'

// const putGroupInfoUri = function({ groupType }) {
//   return buildParamURI({
//     originalURI: UPDATE_QUESTION_GROUP,
//     paramName: PARAM_GROUP_TYPE,
//     substitutedValue: groupType,
//   })
// }

// export const getGroupInfo = async function({ groupName }) {
//   const uri = getGroupInfoUri({ groupName })
//   return await axios.get(uri)
// }

export const getQuestionGroup = async function() {
  return await axios.get(QUESTION_GROUP_LIST)
}

export const updateQuestionGroup = async function({groupType, groupName, releaseTime}) {
  // const uri = putGroupInfoUri({ groupType })
  return await axios.put(UPDATE_QUESTION_GROUP, {groupType, groupName, releaseTime})

}