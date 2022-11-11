import { getAction, deleteAction } from '../http'

const queryRoleList = (params) => getAction('/role/queryList', params)
const deleteRoleById = (params) => deleteAction('/role/deleteById', params)

export { queryRoleList, deleteRoleById }
