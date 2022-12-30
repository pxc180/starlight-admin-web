import { defineStore } from 'pinia'
import { getUserPermissions } from '@/api/modules/user'
import { generateAsyncMenu } from '@/utils/permissions.js'

import defaultSettings from '@/config/appSettings.json'

const useAppStore = defineStore('app', {
  state: () => ({
    ...defaultSettings
  }),

  getters: {
    appServerMenuConfig: (state) => state.serverMenu
  },

  actions: {
    updateSettings(partial) {
      this.$patch(partial)
    },
    toggleTheme(dark) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
    },
    getServerMenu() {
      return new Promise((resolve, reject) => {
        getUserPermissions()
          .then((res) => {
            const menuData = generateAsyncMenu(res.result)
            this.serverMenu = menuData

            resolve(menuData)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})

export default useAppStore
