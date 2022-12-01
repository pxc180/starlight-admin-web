import { isLogin } from '@/utils/auth'
import { Modal } from '@arco-design/web-vue'
import { useAppStore } from '@/store'

function needLoginModal(router) {
  Modal.info({
    title: '登录过期',
    content: '用户未登录或登录状态已过期!',
    okText: '返回登录',
    alignCenter: false,
    modalClass: 'need-login-modal',
    onOk: () => {
      router.push('/login')
    }
  })
}

function setupServerPermissionGuard(router) {
  router.beforeEach((to, from, next) => {
    const appStore = useAppStore()
    if (appStore.menuFromServer && !appStore.serverMenu.length) {
      appStore.getServerMenu().then((result) => {
        result.forEach((item) => {
          router.addRoute('root', item)
        })
        router.addRoute({
          path: '/:pathMatch(.*)*',
          name: 'notFound',
          component: () => import('@/views/notFound/index.vue')
        })
        next({ ...to, replace: true })
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
        needLoginModal(router)
        return undefined
      } else {
        next()
      }
    }
  })
}

export default function createRouteGuard(router) {
  setupPermissionGuard(router)
  setupServerPermissionGuard(router)
}
