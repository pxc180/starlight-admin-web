import { getAction, postAction, deleteAction } from '../http'

const queryAllMenu = (params) => getAction('/menu/queryAll', params)
const addMenu = (params) => postAction('/menu/add', params)
const deleteMenuById = (params) => deleteAction('/menu/deleteById', params)

export { queryAllMenu, addMenu, deleteMenuById }
