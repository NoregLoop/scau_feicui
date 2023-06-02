
import { createApp } from 'vue'

import Cookies from 'js-cookie'

import App from './App.vue'
import constantRoutes from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'



const app = createApp(App)
app.use(constantRoutes)
app.use(ElementPlus)
app.mount('#app')
