import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import router from '@/router'
import '@/assets/style/global.less'

createApp(App).use(ArcoVue).use(ArcoVueIcon).use(router).mount('#app')
