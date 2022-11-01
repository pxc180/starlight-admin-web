import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: 'login',
      component: () => import('@/components/layout/GlobalLayout.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          redirect: '/dashboard/workplace',
          meta: {
            icon: 'icon-dashboard'
          },
          children: [
            {
              path: '/dashboard/workplace',
              name: 'dashboard-workplace',
              component: () => import('@/views/dashboard/workplace/index.vue')
            },
            {
              path: '/dashboard/monitor',
              name: 'dashboard-monitor',
              component: () => import('@/views/dashboard/monitor/index.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ],
  // 用于控制切换路由后页面滚动条置于何处
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
