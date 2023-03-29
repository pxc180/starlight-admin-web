import { setRouteEmitter } from '@/utils/routeListener'
import setupPermissionGuard from './permissions'
import setupServerPermissionGuard from './serverPermissions'

function setupPageGuard(router) {
  router.beforeEach(async (to) => {
    if (to.matched && to.matched.length > 2) {
      to.matched.splice(1, to.matched.length - 2)
    }
    setRouteEmitter(to)
  })
}

export default function createRouteGuard(router) {
  setupPageGuard(router)
  setupPermissionGuard(router)
  setupServerPermissionGuard(router)
}
