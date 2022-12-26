import { getAction, deleteAction, postAction, putAction } from '../http'

const queryUserList = (params) => getAction('/user/queryList', params)
const queryUserByRoleId = (params) => getAction('/user/queryByRoleId', params)
const deleteUserById = (params) => deleteAction('/user/deleteById', params)
const addUser = (params) => postAction('/user/add', params)
const editUser = (params) => putAction('/user/edit', params)
const userLogin = (params) => getAction('/user/login', params)

export {
  queryUserList,
  queryUserByRoleId,
  deleteUserById,
  addUser,
  editUser,
  userLogin
}
