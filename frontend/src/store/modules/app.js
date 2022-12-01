import { defineStore } from 'pinia'
import { queryAllMenu } from '@/api/modules/menu'
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
    getServerMenu() {
      return new Promise((resolve, reject) => {
        queryAllMenu()
          .then((res) => {
            const menuData = generateAsyncMenu(res.data.result)
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
