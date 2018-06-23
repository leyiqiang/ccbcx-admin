import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'
import { PARAM_GROUP_NAME } from '../group'
import { PARAM_QUESTION_NUMBER } from '../question'

const DATA_API = '/api/admin/data'

const DATA_BY_GROUP = DATA_API + '/group/' + PARAM_GROUP_NAME

const DATA_BY_QUESTION = DATA_API + '/question/' + PARAM_QUESTION_NUMBER

const DATA_LIST = DATA_API + '/list'


const getProgressListByGroupUri = function({ groupName }) {
  return buildParamURI({
    originalURI: DATA_BY_GROUP,
    paramName: PARAM_GROUP_NAME,
    substitutedValue: groupName,
  })
}


const getProgressListByQuestionUri = function({ questionNumber }) {
  return buildParamURI({
    originalURI: DATA_BY_QUESTION,
    paramName: PARAM_QUESTION_NUMBER,
    substitutedValue: questionNumber,
  })
}

export const getProgressListByGroupName = async function({ groupName }) {
  const uri = getProgressListByGroupUri({ groupName })
  return await axios.get(uri)
}

export const getProgressListByQuestionNumber = async function({ questionNumber }) {
  const uri = getProgressListByQuestionUri({ questionNumber })
  return await axios.get(uri)
}

export const getProgressList = async function() {
  return await axios.get(DATA_LIST)
}