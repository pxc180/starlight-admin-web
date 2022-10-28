import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/index.vue'
import GlobalLayout from '@/components/layout/GlobalLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/', redirect: 'login' },
    { path: '/dashboard', name: 'dashboard', component: GlobalLayout }
  ],
  // 用于控制切换路由后页面滚动条置于何处
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
