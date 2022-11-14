import { axios } from './server'

export function getAction(url, param) {
  return axios({ url, method: 'get', params: param })
}

export function deleteAction(url, param) {
  return axios({ url, method: 'delete', params: param })
}

export function postAction(url, param, config) {
  return axios({ url, method: 'post', data: param, ...config })
}

export function putAction(url, param, config) {
  return axios({ url, method: 'put', data: param, ...config })
}
