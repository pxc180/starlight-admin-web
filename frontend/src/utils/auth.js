import { Modal } from '@arco-design/web-vue'

const TOKEN_KEY = 'STARLIGHT_TOKEN'

const setToken = (value) => {
  localStorage.setItem(TOKEN_KEY, value)
}

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

const needLoginModal = (okCallback) => {
  Modal.info({
    title: '登录过期',
    content: '用户未登录或登录状态已过期!',
    okText: '返回登录',
    alignCenter: false,
    modalClass: 'need-login-modal',
    maskClosable: true,
    onOk: () => {
      okCallback()
    }
  })
}

export { setToken, getToken, clearToken, isLogin, needLoginModal }
