import { isLogin, needLoginModal } from '@/utils/auth'

import { useAppStore } from '@/store'

function setupServerPermissionGuard(router) {
  router.beforeEach((to, from, next) => {
    const appStore = useAppStore()
    if (
      to.name !== 'login' &&
      appStore.menuFromServer &&
      !appStore.serverMenu.length
    ) {
      appStore.getServerMenu().then((result) => {
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

function setupPermissionGuard(router) {
  router.beforeEach((to, from, next) => {
    if (isLogin()) {
      if (to.name === 'login') {
        next({ path: '/dashboard' })
      } else {
        next()
      }
    } else {
      if (to.meta.requireAuth) {
        needLoginModal(function () {
          router.push({ path: '/login', query: { redirect: to.fullPath } })
        })
      } else if (to.matched.length) {
        next()
      } else {
        next({ path: '/login', query: { redirect: to.fullPath } })
      }
    }
  })
}

export default function createRouteGuard(router) {
  setupPermissionGuard(router)
  setupServerPermissionGuard(router)
}
