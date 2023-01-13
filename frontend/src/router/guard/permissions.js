import { isLogin, needLoginModal } from '@/utils/auth'

export default function setupPermissionGuard(router) {
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
