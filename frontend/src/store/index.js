import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useTabBarStore from './modules/tabBar'

const pinia = createPinia()

export { useAppStore, useUserStore, useTabBarStore }
export default pinia
