const dashboard = {
  path: '/dashboard',
  name: 'dashboard',
  redirect: '/dashboard/workplace',
  meta: {
    title: '首页',
    icon: 'icon-dashboard',
    requireAuth: true
  },
  children: [
    {
      path: '/dashboard/workplace',
      name: 'dashboard-workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        title: '工作台',
        requireAuth: true
      }
    },
    {
      path: '/dashboard/monitor',
      name: 'dashboard-monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        title: '监控台',
        requireAuth: true
      }
    }
  ]
}

export default dashboard
