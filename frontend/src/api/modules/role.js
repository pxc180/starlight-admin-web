import { getAction, deleteAction, postAction } from '../http'

const queryRoleList = (params) => getAction('/role/queryList', params)
const deleteRoleById = (params) => deleteAction('/role/deleteById', params)
const addRole = (params) => postAction('/role/add', params)

export { queryRoleList, deleteRoleById, addRole }
