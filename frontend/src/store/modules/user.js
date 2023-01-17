import { defineStore } from 'pinia'
import { setToken, clearToken } from '@/utils/auth'
import { userLogin } from '@/api/modules/user'
import { removeRouteListener } from '@/utils/routeListener'

import useAppStore from './app'
import useTabBarStore from './tabBar'

const useUserStore = defineStore('user', {
  state: () => ({
    userName: undefined,
    realName: undefined,
    roleId: undefined
  }),

  getters: {
    userInfo: (state) => ({ ...state })
  },

  actions: {
    resetInfo() {
      this.$reset()
    },
    setInfo(partial) {
      this.$patch(partial)
    },
    async login(params) {
      try {
        const { success, data, message } = await userLogin(params)
        if (success) {
          setToken(data.token)
          this.setInfo({
            userName: data.userInfo.userName,
            realName: data.userInfo.realName,
            roleId: data.userInfo.roleId
          })
        }
        return { success, message }
      } catch (err) {
        clearToken()
        throw err
      }
    },
    async logout() {
      try {
        // await userLogout()
        this.resetInfo()
        useAppStore().updateSettings({ serverMenu: [] })
        useTabBarStore().resetRouteList()
        clearToken()
        removeRouteListener()
      } catch (err) {
        clearToken()
        throw err
      }
    }
  }
})

export default useUserStore
