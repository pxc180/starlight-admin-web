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

export { setToken, getToken, clearToken, isLogin }
