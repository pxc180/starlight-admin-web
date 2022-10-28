import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import router from '@/router'
import '@arco-design/web-vue/dist/arco.css'
import '@/assets/style/global.less'

createApp(App).use(ArcoVue).use(router).mount('#app')
