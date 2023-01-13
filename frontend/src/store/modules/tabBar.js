import { defineStore } from 'pinia'

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
    routeList: [
      {
        title: '工作台',
        name: 'Workplace',
        fullPath: '/dashboard/workplace'
      }
    ]
  }),

  getters: {
    getRouteList() {
      return this.routeList
    }
  },

  actions: {
    updateRouteList(route) {
      this.routeList.push(formatRoute(route))
    },
    deleteRoute(idx) {
      this.routeList.splice(idx, 1)
    }
  }
})

export default useTabBarStore
