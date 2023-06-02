import { createRouter, createWebHistory } from 'vue-router'
import Router from 'vue-router'

/* Layout */
// import Layout from '@/layout'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }

// ]
// 公共路由
export const routes = [
  {
    path:"/",
    redirect:"/home",
    meta: {
      keepAlive: true
     }
  },
  {
    name:'login',
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
    meta: {
      keepAlive: false
     }
  },
  {
    name:'register',
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true,
    meta: {
      keepAlive: false
     }
  },
  {
    name:'inboundaction',
    path: '/inboundaction',
    component: () => import('@/views/inbound/action/index'),
    hidden: true,
    meta: {
      keepAlive: true
     }

  },
  {
    name:'inboundrecord',
    path: '/inboundrecord',
    component: () => import('@/views/inbound/record/index'),
    hidden: true,
    meta: {
      keepAlive: true
     }
  },
  // {
  //   name:'outboundaction',
  //   path: '/outboundaction',
  //   component: () => import('@/views/outbound/action/index'),
  //   hidden: true
  // },
  {
    name:'outboundrecord',
    path: '/outboundrecord',
    component: () => import('@/views/outbound/record/index'),
    hidden: true,
    meta: {
      keepAlive: true
     }
  },

  {
    path: '/home',
    component: () => import('@/views/index'),
    name:"home",
    meta: {
      keepAlive: true
     }
  }
]


export const constantRoutes = createRouter ({
  history: createWebHistory(), 
  routes
})



export default constantRoutes