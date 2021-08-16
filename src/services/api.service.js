import axios from 'axios'
import { config } from '../utils/config'
import { authenticationService } from './authentication.service'

export const ApiService = {
  get,
  post,
  put,
  remove
}

function get (url, hasToken = true) {
  let axiosConfig = {}
  if (hasToken) {
    const accessToken = authenticationService.userTokenValue.access_token
    axiosConfig = { headers: { Authorization: `Bearer ${accessToken}` } }
  }
  return axios.get(`${config.apiUrl}/${url}`, axiosConfig)
}

function post (url, data, hasToken = true, blobType = null) {
  let axiosConfig = {}
  if (hasToken) {
    const accessToken = authenticationService.userTokenValue.access_token
    axiosConfig = { headers: { Authorization: `Bearer ${accessToken}` } }
    if (blobType) {
      axiosConfig.responseType = 'blob'
    }
  }
  return axios.post(`${config.apiUrl}/${url}`, data, axiosConfig)
}

function put (url, data, hasToken = true) {
  let axiosConfig = {}
  if (hasToken) {
    const accessToken = authenticationService.userTokenValue.access_token
    axiosConfig = { headers: { Authorization: `Bearer ${accessToken}` } }
  }
  return axios.put(`${config.apiUrl}/${url}`, data, axiosConfig)
}

function remove (url, hasToken = true) {
  let axiosConfig = {}
  if (hasToken) {
    const accessToken = authenticationService.userTokenValue.access_token
    axiosConfig = { headers: { Authorization: `Bearer ${accessToken}` } }
  }
  return axios.delete(`${config.apiUrl}/${url}`, axiosConfig)
}
