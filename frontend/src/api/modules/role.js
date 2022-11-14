import { getAction, deleteAction, postAction, putAction } from '../http'

const queryRoleList = (params) => getAction('/role/queryList', params)
const deleteRoleById = (params) => deleteAction('/role/deleteById', params)
const addRole = (params) => postAction('/role/add', params)
const editRole = (params) => putAction('/role/edit', params)

export { queryRoleList, deleteRoleById, addRole, editRole }
