const modules = import.meta.glob('@/views/**/*.vue')
const pageModules = import.meta.glob('@/components/page/**/*.vue')

/**
 * 格式化服务端返回的路由信息
 *
 * @param {Array} menu 菜单数据
 * @returns 处理后的菜单数据
 */
export function generateAsyncMenu(menu, layer = 0) {
  if (
    !menu ||
    Object.prototype.toString.call(menu) !== '[object Array]' ||
    !menu.length
  ) {
    return []
  }

  const result = []
  menu.forEach((item) => {
    const itemMenu = {
      path: item.url,
      name: item.url.split('/').filter(Boolean).join('-'),
      component: item.component.startsWith('/page')
        ? pageModules[`/src/components${item.component}.vue`]
        : modules[`/src/views${item.component}.vue`],
      redirect: item.redirect,
      meta: {
        title: item.name,
        requireAuth: true,
        hidden: !!item.hide,
        keepAlive: !!item.keepAlive,
        icon: item.icon,
        root: !layer
      }
    }
    if (item.children && item.children.length) {
      itemMenu.children = generateAsyncMenu(item.children, layer + 1)

      const hasChildrenMenu = item.children.filter((i) => !i.hide)

      // 当一个菜单的所有子菜单都处于隐藏状态时，此菜单也置于隐藏状态
      if (hasChildrenMenu && !hasChildrenMenu.length) {
        item.hide = 1
        itemMenu.meta.hidden = true
      } else {
        // 当菜单有非隐藏状态的子菜单时，重定向到第一个非隐藏状态的子菜单
        itemMenu.redirect = item.redirect || hasChildrenMenu[0].url
      }
    }

    result.push(itemMenu)
  })

  return result
}

/**
 * 格式化本地的路由信息
 *
 * @param {Array} menu 菜单数据
 * @returns 处理后的菜单数据
 */
export function generateLocalMenu(menu, layer = 0) {
  if (
    !menu ||
    Object.prototype.toString.call(menu) !== '[object Array]' ||
    !menu.length
  ) {
    return []
  }

  const result = []

  menu.forEach((item) => {
    const itemMenu = {
      ...item
    }
    itemMenu.meta.root = !layer
    if (item.children && item.children.length) {
      itemMenu.children = generateLocalMenu(item.children, layer + 1)

      const hasChildrenMenu = item.children.filter((i) => !i.hide)

      // 当一个菜单的所有子菜单都处于隐藏状态时，此菜单也置于隐藏状态
      if (hasChildrenMenu && !hasChildrenMenu.length) {
        itemMenu.meta.hidden = true
      } else {
        // 当菜单有非隐藏状态的子菜单时，重定向到第一个非隐藏状态的子菜单
        itemMenu.redirect = item.redirect || hasChildrenMenu[0].url
      }
    }

    result.push(itemMenu)
  })

  return result
}
