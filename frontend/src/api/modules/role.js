import { getAction, deleteAction, postAction, putAction } from '../http'

const queryAllRoleList = (params) => getAction('/role/queryAll', params)
const queryRoleList = (params) => getAction('/role/queryList', params)
const deleteRoleById = (params) => deleteAction('/role/deleteById', params)
const addRole = (params) => postAction('/role/add', params)
const editRole = (params) => putAction('/role/edit', params)

export { queryAllRoleList, queryRoleList, deleteRoleById, addRole, editRole }
