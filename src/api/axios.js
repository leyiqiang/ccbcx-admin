import axiosClass from 'axios'
import { API_END_POINT } from 'src/data/api'
import {getAuthTokenFromCookie} from 'src/util'

export const axios = axiosClass.create({
  baseURL: API_END_POINT,
  headers: {
    'Authorization': 'Bearer ' + getAuthTokenFromCookie(),
  },
})
