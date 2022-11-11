import axios from 'axios'

const apiBaseUrl = '/api'

const request = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
})

request.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.params = { _t: Date.parse(new Date()) / 1000, ...config.params }
  }
  return config
})

request.interceptors.response.use((response) => {
  return response.data
})

export { request as axios }
