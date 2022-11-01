const dashboard = {
  path: '/dashboard',
  name: 'dashboard',
  redirect: 'dashboard',
  meta: {
    title: '首页',
    icon: 'icon-dashboard'
  },
  children: [
    {
      path: 'workplace',
      name: 'dashboard-workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        title: '工作台'
      }
    },
    {
      path: 'monitor',
      name: 'dashboard-monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        title: '监控台'
      }
    }
  ]
}

export default dashboard
