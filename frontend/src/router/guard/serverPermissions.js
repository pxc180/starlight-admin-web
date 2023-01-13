import { Message } from '@arco-design/web-vue'
import { useAppStore, useUserStore } from '@/store'

export default function setupServerPermissionGuard(router) {
  router.beforeEach((to, from, next) => {
    const appStore = useAppStore()
    const userStore = useUserStore()
    if (
      to.name !== 'login' &&
      appStore.menuFromServer &&
      !appStore.serverMenu.length
    ) {
      appStore.getServerMenu().then(async (result) => {
        if (!result.length) {
          Message.warning('您无访问任何菜单的权限，暂无法进入')
          await userStore.logout()
          next({ path: '/login', replace: true })
          return
        }
        result.forEach((item) => {
          router.addRoute('root', item)
        })
        router.addRoute({
          path: '/:pathMatch(.*)*',
          name: 'notFound',
          component: () => import('@/views/notFound/index.vue')
        })

        const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) {
          next({ ...to, replace: true })
        } else {
          next({
            path: redirect,
            replace: true
          })
        }
      })
    } else {
      next()
    }
  })
}
