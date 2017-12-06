import axios from 'axios'
import Vue from 'vue'

let v = new Vue()

axios.defaults.withCredentials = true

axios.create({
  headers: {'content-type': 'application/x-www-form-urlencoded'}
})

// 添加一个响应拦截器
axios.interceptors.response.use((response) => {
  if (response.data && response.data.errcode) {
    if (parseInt(response.data.errcode) === 40001) {
      console.log('未登录')
      // 未登录
      v.$emit('goto', '/login')
    }
  }
  return response
}, error => {
  return Promise.reject(error)
})

export const POST = (url, params) => {
  return axios.post(url, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(url, params).then(res => JSON.stringify(res.data))
}

export const PUT = (url, params) => {
  return axios.put(url, params).then(res => res.data)
}
