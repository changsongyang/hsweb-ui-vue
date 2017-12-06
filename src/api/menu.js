import axios from 'axios'

export function getMenuList (sortIndex) {
  const url = '/api/menu'
  const data = Object.assign({}, {
    paging: false,
    pageIndex: 0,
    pageSize: 10,
    sortField: sortIndex,
    sortOrder: ''
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
