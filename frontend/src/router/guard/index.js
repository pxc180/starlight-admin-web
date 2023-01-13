import { setRouteEmitter } from '@/utils/routeListener'
import setupPermissionGuard from './permissions'
import setupServerPermissionGuard from './serverPermissions'

function setupPageGuard(router) {
  router.beforeEach(async (to) => {
    setRouteEmitter(to)
  })
}

export default function createRouteGuard(router) {
  setupPageGuard(router)
  setupPermissionGuard(router)
  setupServerPermissionGuard(router)
}
