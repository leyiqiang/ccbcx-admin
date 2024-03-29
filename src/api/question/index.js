import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'

export const PARAM_QUESTION_NUMBER = ':questionNumber'

const QUESTION_API = '/api/admin/question'

const QUESTION_LIST = QUESTION_API + '/list'

const QUESTION_INFO = QUESTION_API + '/' + PARAM_QUESTION_NUMBER

const UPDATE_QUESTION = QUESTION_API + '/update'

const UPDATE_QUESTION_LOCATION = QUESTION_API + '/updateLocation'

const getQuestionUri = function({ questionNumber }) {
  return buildParamURI({
    originalURI: QUESTION_INFO,
    paramName: PARAM_QUESTION_NUMBER,
    substitutedValue: questionNumber,
  })
}

export const getQuestionList = async function() {
  return await axios.get(QUESTION_LIST)
}

export const getQuestion = async function({ questionNumber }) {
  const uri = getQuestionUri({ questionNumber })
  return await axios.get(uri)
}

export const updateQuestionLocation = async function({ questionNumber, location}) {
  return await axios.post(UPDATE_QUESTION_LOCATION, {questionNumber, location})
}

export const updateQuestion = async function({
  questionNumber,
  questionContent,
  answer,
  hint1,
  hint2,
  hint3,
}) {
  return await axios.post(UPDATE_QUESTION, {
    questionNumber,
    questionContent,
    answer,
    hint1,
    hint2,
    hint3,
  })
}