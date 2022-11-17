import { getAction, postAction, deleteAction, putAction } from '../http'

const queryAllMenu = (params) => getAction('/menu/queryAll', params)
const addMenu = (params) => postAction('/menu/add', params)
const editMenu = (params) => putAction('/menu/edit', params)
const deleteMenuById = (params) => deleteAction('/menu/deleteById', params)

export { queryAllMenu, addMenu, editMenu, deleteMenuById }
