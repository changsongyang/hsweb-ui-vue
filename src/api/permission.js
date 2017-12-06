import * as API from './index'

export function getPermissList () {
  const url = '/api/permission'
  const data = Object.assign({}, {
    pageIndex: 0,
    pageSize: 20,
    sortField: '',
    sortOrder: ''
  })
  return API.GET(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}
