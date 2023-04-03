export const NOT_FOUND = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/notFound/index.vue'),
  meta: {
    title: '404',
    noAffix: true
  }
}

export const DEFAULT_ROUTE_NAME = 'dashboard-workplace'

export const DEFAULT_ROUTE = {
  title: '工作台',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/dashboard/workplace'
}
