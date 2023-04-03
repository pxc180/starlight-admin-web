import { createRouter, createWebHistory } from 'vue-router'
import { appRoutes } from './routes'
import createRouteGuard from './guard'
import { generateLocalMenu } from '@/utils/permissions.js'

import defaultSettings from '@/config/appSettings.json'
import { NOT_FOUND } from './constants'

const constantRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '404',
      noAffix: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: 'login',
      component: () => import('@/components/layout/GlobalLayout.vue')
    },
    ...constantRouter
  ],
  // 用于控制切换路由后页面滚动条置于何处
  scrollBehavior() {
    return { top: 0 }
  }
})

if (!defaultSettings.menuFromServer) {
  generateLocalMenu(appRoutes).forEach((item) => {
    router.addRoute('root', item)
  })
  router.addRoute(NOT_FOUND)
}

createRouteGuard(router)

export default router
