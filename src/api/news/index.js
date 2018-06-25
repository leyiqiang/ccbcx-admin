import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'

export const PARAM_QUESTION_NUMBER = ':questionNumber'

const NEWS_API = '/api/admin/news'
const CREATE_NEWS = NEWS_API + '/create'
const NEWS_LIST = NEWS_API + '/list'


export const addNews = async function({ message }) {
  return await axios.post(CREATE_NEWS, {message})
}


export const getNews = async function() {
  return await axios.get(NEWS_LIST)
}
