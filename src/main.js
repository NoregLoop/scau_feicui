
import { createApp } from 'vue'

import Cookies from 'js-cookie'

import App from './App.vue'
import constantRoutes from './router/index'
import ElementPlus from 'element-plus'
import store from './store'
import 'element-plus/theme-chalk/index.css'
import print from 'vue3-print-nb'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { Document, Menu as IconMenu, Setting, User, UserFilled, CreditCard, Printer, Box, ShoppingTrolley, Timer } from "@element-plus/icons-vue"


const app = createApp(App)
app.use(constantRoutes)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(print)
app.use(store)
app.mount('#app')
app.component('Document', Document)
app.component('IconMenu', IconMenu)
app.component('User', User)
app.component('Setting', Setting)
app.component('UserFilled', UserFilled)
app.component('CreditCard', CreditCard)
app.component('Printer', Printer)
app.component('Box', Box)
app.component('Timer', Timer)
app.component('ShoppingTrolley', ShoppingTrolley)
