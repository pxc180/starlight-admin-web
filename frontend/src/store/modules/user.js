import { defineStore } from 'pinia'
import { setToken, clearToken } from '@/utils/auth'
import { userLogin } from '@/api/modules/user'

import useAppStore from './app'

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
        useAppStore().updateSettings({ serverMenu: [] })
        clearToken()
        this.resetInfo()
      } catch (err) {
        clearToken()
        throw err
      }
    }
  }
})

export default useUserStore
