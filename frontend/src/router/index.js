import { createRouter, createWebHistory } from 'vue-router'
import { appRoutes } from './routes'
import createRouteGuard from './guard'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: 'login',
      component: () => import('@/components/layout/GlobalLayout.vue'),
      children: [...appRoutes]
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

createRouteGuard(router)

export default router
