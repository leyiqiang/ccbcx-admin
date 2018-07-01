import Cookies from 'universal-cookie'
import _ from 'lodash'

const cookies = new Cookies()

const changeAxiosInstanceXAccessTokenHeader = (token) => {
  const { axios } =  require('src/api/axios')
  axios.defaults.headers['x-access-token'] = token
}

const changeAxiosInstanceAuthTokenHeader = (token) => {
  const { axios } =  require('src/api/axios')
  axios.defaults.headers['Authorization'] = 'Bearer ' + token
}

export const getAuthTokenFromCookie = () => {
  return cookies.get('auth0-token')
}

export const setAuthToken = (token) => {
  if (_.isNil(token)) {
    cookies.remove('auth0-token')
  } else {
    cookies.set('auth0-token', token)
  }

  changeAxiosInstanceAuthTokenHeader(token)
}


export const getXAccessTokenFromCookie = () => {
  return cookies.get('x-access-token')
}

export const setXAccessToken = (token) => {
  if (_.isNil(token)) {
    cookies.remove('x-access-token')
  } else {
    cookies.set('x-access-token', token)
  }

  changeAxiosInstanceXAccessTokenHeader(token)
}



export const getErrorMessage = (err) => {
  if (!_.isNil(err.response)) {
    return err.response.data.message
  } else {
    return err.message
  }
}

export const buildParamURI = function({ originalURI, paramName, substitutedValue }) {
  return _.replace(originalURI, paramName, substitutedValue)
}
