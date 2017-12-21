/**
 * Created by user on 2017/12/16.
 */
import * as API from './index'

export function getOrgs () {
  const url = '/organizational'
  const data = Object.assign({}, {
    paging: false,
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

export function getDepartment (queryParamsIndex) {
  const url = '/department'
  const data = Object.assign({}, queryParamsIndex)
  return API.GET(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

export function getPosition (queryParamsIndex) {
  const url = '/position'
  const data = Object.assign({}, queryParamsIndex)
  return API.GET(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

export function getPerson (id) {
  const url = `/person/in-position/${id}`
  return API.GET(url)
}

export function addDepartment (params) {
  return API.POST('/department', params)
}
