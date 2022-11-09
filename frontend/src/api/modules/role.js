import { getAction } from '../http'

const queryRoleList = (params) => getAction('/role/queryList', params)

export { queryRoleList }
