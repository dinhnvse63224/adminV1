import { BehaviorSubject } from 'rxjs'

import { handleResponse } from '../utils/handle-response'
import axios from 'axios'
import { config } from '../utils/config'

const userTokenSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('userToken'))
)

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser'))
)

export const authenticationService = {
  login,
  logout,
  userInfo,
  userToken: userTokenSubject.asObservable(),
  currentUser: currentUserSubject.asObservable(),
  get userTokenValue () {
    return userTokenSubject.value
  },
  get currentUserValue () {
    return currentUserSubject.value
  }
}

function login (userName, password) {
  const params = new URLSearchParams()
  params.append('userName', userName)
  params.append('password', password)
  params.append('grant_type', 'password')
  return axios.post(`${config.apiUrl}/token?role=manager`, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    .then(handleResponse)
    .then(token => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('userToken', JSON.stringify(token))
      userTokenSubject.next(token)
      const accessToken = token.access_token
      return userInfo(accessToken).then(user => {
        return user
      })
    })
}

function userInfo (accessToken) {
  return axios
    .get(`${config.apiUrl}/manager/self`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('currentUser', JSON.stringify(user.data))
      currentUserSubject.next(user.data)
      return user.data
    })
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('userToken')
  localStorage.removeItem('currentUser')
  userTokenSubject.next(null)
  currentUserSubject.next(null)
}
