const APIPATH = '/api/'
const VERSION = 'v1'
const ENDPOINT = '/user'

export const getFullPath = (method = '') =>
  `${APIPATH}${VERSION}${ENDPOINT}${method}`
