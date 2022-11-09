import axios from 'axios'

const apiBaseUrl = 'http://localhost:9001/api/v1'

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

export { request as axios }
