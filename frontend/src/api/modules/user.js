import { getAction, deleteAction, postAction, putAction } from '../http'

const queryUserList = (params) => getAction('/user/queryList', params)
const deleteUserById = (params) => deleteAction('/user/deleteById', params)
const addUser = (params) => postAction('/user/add', params)
const editUser = (params) => putAction('/user/edit', params)

export { queryUserList, deleteUserById, addUser, editUser }
