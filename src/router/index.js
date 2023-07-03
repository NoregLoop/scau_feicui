import { createRouter, createWebHistory } from 'vue-router'
import Router from 'vue-router'


// 公共路由
export const routes = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    name: "home",
    meta: {
      keepAlive: true,
      title: "首页"
    }
  },

  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
    meta: {
      keepAlive: false,
      title: "登陆"
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  //入库路由

  {
    name: 'inbound',
    path: '/inbound',
    hidden: true,
    meta: {
      keepAlive: true,
      title: "快速入库"
    },
    children: [
      {
        name: 'inboundaction',
        path: 'action',
        component: () => import('@/views/inbound/action'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "快速入库"
        }
      },
      {
        name: 'inboundreturn',
        path: 'return',
        component: () => import('@/views/inbound/return'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "还货入库"
        }
      },
      {
        name: 'inboundrecord',
        path: 'record',
        component: () => import('@/views/inbound/record'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "入库单列表"
        }
      },
    ],
  },


  //出库路由
  {
    name: 'outbound',
    path: '/outbound',
    hidden: true,
    meta: {
      keepAlive: true,
      title: "出库操作"
    },
    children: [
      {
        name: 'outboundaction',
        path: 'action',
        component: () => import('@/views/outbound/outbound'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "出库操作"
        },
      },
      {
        name: 'outboundrecord',
        path: 'record',
        component: () => import('@/views/outbound/record'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "出库货品列表"
        }
      },
      {
        name: 'outboundorder',
        path: 'order',
        component: () => import('@/views/outbound/order'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "出库单列表"
        }
      },
    ]
  },


  //销售路由
  {
    name: 'sale',
    path: '/sale',
    hidden: true,
    meta: {
      keepAlive: true,
      title: "销售管理"
    },
    children: [
      {
        name: 'lend',
        path: 'lend',
        component: () => import('@/views/sale/lend'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "未还列表"
        }
      },
      {
        name: 'return',
        path: 'return',
        component: () => import('@/views/sale/return'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "还货列表"
        }
      },
      {
        name: 'saled',
        path: 'saled',
        component: () => import('@/views/sale/saled'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "已售列表"
        }
      },
    ],

  },

  //库存路由
  {
    name: 'inventorymanage',
    path: '/inventorymanage',
    component: () => import('@/views/inventory/manage'),
    hidden: true,
    meta: {
      keepAlive: true,
      title: "供应商管理"
    }
  },
  {
    name: 'inventoryrecord',
    path: '/inventoryrecord',
    component: () => import('@/views/inventory/record'),
    hidden: true,
    meta: {
      keepAlive: true,
      title: "出借客户管理"
    }
  },
  //排班路由
  {
    name: 'schedule',
    path: '/schedule',
    component: () => import('@/views/schedule/schedule'),
    hidden: true,
    meta: {
      keepAlive: true,
      title: "供应商管理"
    }
  },
  {
    name: 'store',
    path: '/store',
    component: () => import('@/views/schedule/store'),
    hidden: true,
    meta: {
      keepAlive: true,
      title: "出借客户管理"
    }
  },

  //客户路由
  {
    name: 'custom',
    path: '/custom',
    hidden: true,
    meta: {
      keepAlive: true,
      title: "客户管理"
    },
    children: [
      {
        name: 'supplier',
        path: 'supplier',
        component: () => import('@/views/user/supplier'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "供应商管理"
        },
      },
      {
        name: 'custom',
        path: 'custom',
        component: () => import('@/views/user/custom'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "出借客户管理"
        }
      },
    ]
  },


  //角色控制路由
  {
    name: 'permission',
    path: '/permission',
    hidden: true,
    meta: {
      keepAlive: true,
      title: "权限管理"
    },
    children: [
      {
        name: 'role',
        path: 'role',
        component: () => import('@/views/role/role'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "角色管理"
        },
      },
      {
        name: 'user',
        path: 'user',
        component: () => import('@/views/role/user'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "用户管理"
        }
      },
      {
        name: 'tenant',
        path: 'tenant',
        component: () => import('@/views/role/tenant'),
        hidden: true,
        meta: {
          keepAlive: true,
          title: "租户管理"
        }
      },
    ]
  },



]


export const constantRoutes = createRouter({
  history: createWebHistory(),
  routes
})

export default constantRoutes