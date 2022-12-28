import axios from 'axios'
import { getToken, clearToken, needLoginModal } from '@/utils/auth'

const apiBaseUrl = '/api'

const request = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
})

request.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }
  if (config.method === 'get') {
    config.params = { _t: Date.parse(new Date()) / 1000, ...config.params }
  }
  return config
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    const { statusCode, code } = err.response.data
    if (
      statusCode === 401 ||
      code.includes('JWT_INVALID') ||
      code.includes('JWT_MALFORMED')
    ) {
      needLoginModal(function () {
        clearToken()
        window.location.reload()
      })
    }

    return Promise.reject(err.response.data)
  }
)

export { request as axios }
