const systemRoutes = {
  path: '/system',
  name: 'system',
  redirect: '/system/role',
  meta: {
    title: '系统管理',
    icon: 'icon-apps',
    requireAuth: true
  },
  children: [
    {
      path: '/system/role',
      name: 'system-role',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: '角色管理',
        requireAuth: true
      }
    },
    {
      path: '/system/user',
      name: 'system-user',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户管理',
        requireAuth: true
      }
    },
    {
      path: '/system/menu',
      name: 'system-menu',
      component: () => import('@/views/system/menu/index.vue'),
      meta: {
        title: '菜单管理',
        requireAuth: true
      }
    }
  ]
}

export default systemRoutes
