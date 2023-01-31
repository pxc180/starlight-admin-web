import { useAppStore } from '@/store'
import { computed } from 'vue'
import { appRoutes } from '@/router/routes'

export default function useMenuTree() {
  const appStore = useAppStore()

  const appRoute = computed(() => {
    if (appStore.menuFromServer) {
      return appStore.serverMenu
    }
    return appRoutes
  })

  const menuTree = computed(() => {
    const copyRouter = JSON.parse(JSON.stringify(appRoute.value))
    function travel(routes) {
      if (!routes) return null

      const collector = routes.map((element) => {
        if (element.children && element.children.length) {
          element.children = element.children.filter(
            (item) => item.meta?.hidden !== true
          )

          const subItem = travel(element.children)

          if (subItem.length) {
            element.children = subItem
            return element
          }
        }

        if (element.meta?.hidden !== true) {
          return element
        }

        return null
      })

      return collector.filter(Boolean)
    }

    return travel(copyRouter)
  })

  return {
    menuTree
  }
}
