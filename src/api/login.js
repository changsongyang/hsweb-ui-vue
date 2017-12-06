import qs from 'qs'
import * as API from './index'

export function loginByUsername (loginparams) {
  return API.POST('/authorize/login', qs.stringify(loginparams))
}
