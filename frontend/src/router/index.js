import { createRouter, createWebHistory } from 'vue-router'
import { appRoutes } from './routes'
import createRouteGuard from './guard'
import { generateLocalMenu } from '@/utils/permissions.js'

import defaultSettings from '@/config/appSettings.json'

const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/notFound/index.vue')
}

const constantRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
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
  router.addRoute(notFoundRouter)
}

createRouteGuard(router)

export default router
