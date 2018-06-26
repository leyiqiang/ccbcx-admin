import { axios } from 'src/api/axios'
import {buildParamURI} from 'src/util'


const NEWS_API = '/api/admin/news'
const CREATE_NEWS = NEWS_API + '/create'
const NEWS_LIST = NEWS_API + '/list'
const PARAM_NEWS_ID = ':newsId'
const DELETE_NEWS = NEWS_API + '/' + PARAM_NEWS_ID

const deleteNewsUri = function({_id}) {
  return buildParamURI({
    originalURI:DELETE_NEWS,
    paramName: PARAM_NEWS_ID,
    substitutedValue: _id,
  })
}


export const addNews = async function({ message }) {
  return await axios.post(CREATE_NEWS, {message})
}


export const getNews = async function() {
  return await axios.get(NEWS_LIST)
}


export const deleteNews = async function({_id}) {
  const uri = deleteNewsUri({_id})
  return await axios.delete(uri)
}