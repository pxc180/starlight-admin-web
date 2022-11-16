import { getAction, postAction } from '../http'

const queryAllMenu = (params) => getAction('/menu/queryAll', params)
const addMenu = (params) => postAction('/menu/add', params)

export { queryAllMenu, addMenu }
