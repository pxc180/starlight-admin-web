import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import '@/assets/style/global.less'
import '@/assets/style/reset-arco-css.less'

import store from './store'

createApp(App).use(store).use(router).mount('#app')
