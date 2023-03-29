import { defineStore } from 'pinia'
import { DEFAULT_ROUTE_NAME, DEFAULT_ROUTE } from '@/router/constants'

const formatRoute = (route) => {
  const { meta, fullPath, name } = route
  return {
    name,
    fullPath,
    title: meta.title
  }
}

const useTabBarStore = defineStore('tabBar', {
  state: () => ({
    routeList: [DEFAULT_ROUTE],
    cacheTabList: new Set([DEFAULT_ROUTE_NAME])
  }),

  getters: {
    getRouteList() {
      return this.routeList
    },
    getCacheList() {
      return Array.from(this.cacheTabList)
    }
  },

  actions: {
    resetRouteList() {
      this.routeList = [
        {
          title: '工作台',
          name: 'Workplace',
          fullPath: '/dashboard/workplace'
        }
      ]
    },
    updateSettings(partial) {
      this.$patch(partial)
    },
    updateRouteList(route) {
      this.routeList.push(formatRoute(route))
      if (route.meta.keepAlive) {
        this.cacheTabList.add(route.name)
      }
    },
    deleteRoute(idx, tag) {
      this.routeList.splice(idx, 1)
      this.cacheTabList.delete(tag.name)
    }
  }
})

export default useTabBarStore
