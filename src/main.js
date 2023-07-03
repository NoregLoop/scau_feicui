
import { createApp } from 'vue'

import Cookies from 'js-cookie'

import App from './App.vue'
import constantRoutes from './router/index'
import ElementPlus from 'element-plus'
import store from './store'

import 'element-plus/theme-chalk/index.css'
import print from 'vue3-print-nb'



const app = createApp(App)
app.use(constantRoutes)
app.use(ElementPlus)
app.use(print)
app.use(store)
app.mount('#app')


