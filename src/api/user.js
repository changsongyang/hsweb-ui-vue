// import qs from 'qs'
import * as API from './index'

export function getUser () {
  const url = '/user'
  const data = Object.assign({}, {
    pageIndex: 0,
    pageSize: 10,
    sortField: '',
    sortOrder: ''
  })
  return API.GET(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

export function addUser (userParams) {
  return API.POST('/user', userParams)
}

export function editUser (id, userParams) {
  return API.PUT(`/user/${id}`, userParams)
}

export function searchUser (queryParams, queryParamsIndex) {
  const url = '/user'
  const data = Object.assign({}, queryParams, queryParamsIndex)
  return API.GET(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}
