import { authenticationService } from '../services/authentication.service'

export function handleResponse (response) {
  if (response.response) {
    response = response.response
  }
  const data = response.data
  if (response.statusText !== 'OK') {
    if ([401, 403].indexOf(response.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authenticationService.logout()
      location.reload()
    }
    if ([400].indexOf(response.status) !== -1) {
      let messageError = ''
      if (data.modelState) {
        for (const [key, value] of Object.entries(data.modelState)) {
          console.log(key)
          messageError += '\n' + value[0]
        }
      } else if (data.message) {
        messageError = data.message
      }
      alert('Có lỗi xảy ra: ' + messageError)
    }
    const error = (data && data.message) || response.statusText
    return Promise.reject(error)
  }
  return Promise.resolve(data)
}
