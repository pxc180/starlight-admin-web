import { useAppStore } from '@/store'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default function useMenuTree() {
  const appStore = useAppStore()
  const router = useRouter()

  const appRoute = computed(() => {
    if (appStore.menuFromServer) {
      return appStore.serverMenu
    }
    return router
      .getRoutes()
      .filter((item) => item?.meta?.requireAuth && item.meta.root)
  })

  const menuTree = computed(() => {
    const copyRouter = JSON.parse(JSON.stringify(appRoute.value))
    function travel(routes) {
      if (!routes) return null

      const collector = routes.map((element) => {
        if (!element.children) {
          return element
        }

        element.children = element.children.filter(
          (item) => item.meta?.hidden !== true
        )

        const subItem = travel(element.children)

        if (subItem.length) {
          element.children = subItem
          return element
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
