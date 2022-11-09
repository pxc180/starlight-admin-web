import { axios } from './server'

export function getAction(url, param) {
  return axios({ url, method: 'get', params: param })
}
