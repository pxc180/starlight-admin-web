import { isLogin } from '@/utils/auth'
import { Modal } from '@arco-design/web-vue'

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

function setupPermissionGuard(router) {
  router.beforeEach((to, from, next) => {
    if (isLogin()) {
      if (to.name === 'login') {
        next({ path: '/dashboard' })
      }
      next()
    } else {
      if (to.meta.requireAuth) {
        needLoginModal(router)
        // next({ path: '/login' })
        return undefined
      }
      next()
    }
    // to and from are both route objects. must call `next`.
  })
}

export default function createRouteGuard(router) {
  setupPermissionGuard(router)
}
