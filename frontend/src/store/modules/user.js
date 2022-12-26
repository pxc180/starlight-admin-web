import { defineStore } from 'pinia'
import { setToken, clearToken } from '@/utils/auth'

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
    async login() {
      try {
        // const res = await userLogin(loginForm)
        setToken('token12345')
      } catch (err) {
        clearToken()
        throw err
      }
    },
    async logout() {
      try {
        // await userLogout()
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
