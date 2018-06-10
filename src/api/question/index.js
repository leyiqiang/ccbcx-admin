import { axios } from 'src/api/axios'

const QUESTION_API = '/api/admin/question'

const QUESTION_LIST = QUESTION_API + '/list'



export const getQuestionList = async function() {
  return await axios.get(QUESTION_LIST)
}