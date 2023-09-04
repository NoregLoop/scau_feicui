import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import store from '@/store'

import { getRouters } from '@/api/login'

// 公共路由
export const routes = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/1',
    component: () => import('@/views/home/index.vue'),
    name: "1",
    meta: {
      keepAlive: true,
      title: "首页"
    }
  },
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
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
    name: 'test',
    path: '/test',
    component: () => import('@/views/test'),
    hidden: true,
    meta: {
      keepAlive: true,
      title: "测试"
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true,
    meta: {
      keepAlive: false,
      title: "注册"
    }
  },
    //角色控制路由
    {
      name: 'Permission',
      path: '/permission',
  
      meta: {
        keepAlive: true,
        title: "权限管理",
        icon: "UserFilled"
      },
      children: [
        {
          name: 'role',
          path: 'role',
          component: () => import('@/views/role/role'),
          meta: {
            keepAlive: true,
            title: "角色管理"
          },
        },
        {
          name: 'user',
          path: 'user',
          component: () => import('@/views/role/user'),
          meta: {
            keepAlive: true,
            title: "用户管理"
          }
        },
        {
          name: 'tenant',
          path: 'tenant',
          component: () => import('@/views/role/tenant'),
          meta: {
            keepAlive: true,
            title: "租户管理"
          }
        },
      ]
    },

]

const dynamicRoutes = [
  //销售路由
  {
    name: 'Sale',
    path: '/sale',

    meta: {
      keepAlive: true,
      title: "销售管理",
      icon: "CreditCard"
    },
    children: [
      {
        name: 'lend',
        path: 'lend',
        component: () => import('@/views/sale/lend'),
        meta: {
          keepAlive: true,
          title: "未还列表"
        }
      },
      {
        name: 'return',
        path: 'return',
        component: () => import('@/views/sale/return'),
        meta: {
          keepAlive: true,
          title: "还货列表"
        }
      },
      {
        name: 'saled',
        path: 'saled',
        component: () => import('@/views/sale/saled'),
        meta: {
          keepAlive: true,
          title: "已售列表"
        }
      },
    ],
  },

  //库存路由
  {
    name: 'Inventory',
    path: '/inventory',

    meta: {
      keepAlive: true,
      title: "库存管理",
      icon: "Box"
    },
    children: [
      {
        name: 'inventorymanage',
        path: 'manage',
        component: () => import('@/views/inventory/manage'),
        meta: {
          keepAlive: true,
          title: "在线货物管理"
        },
      },
      {
        name: 'inventoryrecord',
        path: 'record',
        component: () => import('@/views/inventory/record'),
        meta: {
          keepAlive: true,
          title: "货品列表"
        }
      },
    ]
  },

  //排班路由
  {
    name: 'Schedule',
    path: '/pb',
    meta: {
      keepAlive: true,
      title: "排班管理",
      icon: "Timer"
    },
    children: [
      {
        name: 'streamShop',
        path: 'streamShop',
        component: () => import('@/views/schedule/streamShop'),
        meta: {
          keepAlive: true,
          title: "店铺信息管理"
        }
      },
      {
        name: 'schedule',
        path: 'schedule',
        component: () => import('@/views/schedule/schedule'),
        meta: {
          keepAlive: true,
          title: "店铺排班管理"
        },
      },
      {
        name: 'streamHost',
        path: 'streamHost',
        component: () => import('@/views/schedule/streamHost'),
        meta: {
          keepAlive: true,
          title: "主播管理"
        },
      },
    ]
  },

  //入库路由
  {
    name: 'Inbound',
    path: '/inbound',
    meta: {
      keepAlive: true,
      title: "入库管理",
      icon: "Printer"
    },
    children: [
      {
        name: 'inboundaction',
        path: 'action',
        component: () => import('@/views/inbound/action'),
        
        meta: {
          keepAlive: true,
          title: "快速入库"
        }
      },
      // {
      //   name: 'inboundreturn',
      //   path: 'return',
      //   component: () => import('@/views/inbound/return'),
      //   meta: {
      //     keepAlive: true,
      //     title: "还货入库"
      //   }
      // },
      {
        name: 'inboundorder',
        path: 'order',
        component: () => import('@/views/inbound/order'),
        meta: {
          keepAlive: true,
          title: "入库单列表"
        }
      },
      // {
      //   name: 'inboundrecord',
      //   path: 'record',
      //   component: () => import('@/views/inbound/record'),
      //   meta: {
      //     keepAlive: true,
      //     title: "入库货品列表"
      //   }
      // },
    ],
  },

  //出库路由
  {
    name: 'Outbound',
    path: '/outbound',

    meta: {
      keepAlive: true,
      title: "出库管理",
      icon: "IconMenu",
    },
    children: [
      {
        name: 'outboundaction',
        path: 'action',
        component: () => import('@/views/outbound/outbound'),
        meta: {
          keepAlive: true,
          title: "出库操作"
        },
      },
      // {
      //   name: 'outboundrecord',
      //   path: 'record',
      //   component: () => import('@/views/outbound/record'),
      //   meta: {
      //     keepAlive: true,
      //     title: "出库货品列表"
      //   }
      // },
      {
        name: 'outboundorder',
        path: 'order',
        component: () => import('@/views/outbound/order'),
        meta: {
          keepAlive: true,
          title: "出库单列表"
        }
      },
    ]
  },

  //客户路由
  {
    name: 'Custom',
    path: '/custom',

    meta: {
      keepAlive: true,
      title: "客户管理",
      icon: "User"
    },
    children: [
      {
        name: 'supplier',
        path: 'supplier',
        component: () => import('@/views/user/supplier'),
        meta: {
          keepAlive: true,
          title: "供应商管理"
        },
      },
      {
        name: 'custom',
        path: 'custom',
        component: () => import('@/views/user/custom'),
        meta: {
          keepAlive: true,
          title: "出借客户管理"
        }
      },
    ]
  },

  //系统配置路由
  {
    name: 'System',
    path: '/system',

    meta: {
      keepAlive: true,
      title: "系统设置",
      icon: "Setting"
    },
    children: [
      {
        name: 'category',
        path: 'category',
        component: () => import('@/views/setting/index'),
        meta: {
          keepAlive: true,
          title: "品类管理"
        },
      },
      {
        name: 'warehouse',
        path: 'warehouse',
        component: () => import('@/views/setting/warehouse'),
        meta: {
          keepAlive: true,
          title: "仓库管理"
        }
      },
      {
        name: 'storage',
        path: 'storage',
        component: () => import('@/views/setting/storage'),
        meta: {
          keepAlive: true,
          title: "仓位管理"
        },
      },
      {
        name: 'customize',
        path: 'customize',
        component: () => import('@/views/setting/index'),
        meta: {
          keepAlive: true,
          title: "自定义属性"
        },
      },
      {
        name: 'setting',
        path: 'setting',
        component: () => import('@/views/setting/index'),
        meta: {
          keepAlive: true,
          title: "基础设置"
        },
      },
    ]
  },
]

const roleRoutes = [
  //角色控制路由
  {
    name: 'Permission',
    path: '/permission',

    meta: {
      keepAlive: true,
      title: "权限管理",
      icon: "UserFilled"
    },
    children: [
      {
        name: 'role',
        path: 'role',
        component: () => import('@/views/role/role'),
        meta: {
          keepAlive: true,
          title: "角色管理"
        },
      },
      {
        name: 'user',
        path: 'user',
        component: () => import('@/views/role/user'),
        meta: {
          keepAlive: true,
          title: "用户管理"
        }
      },
      {
        name: 'tenant',
        path: 'tenant',
        component: () => import('@/views/role/tenant'),
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

export function addRoutes(data) {
  store.state.routes = routes
  constantRoutes.replace(routes)
  data.forEach(function (item_d) {
    dynamicRoutes.forEach(function (item_r) {
      if (item_d.name == item_r.name) {
        constantRoutes.addRoute(item_r)
        store.state.routes.push(item_r)
      }
    })
  })
}

constantRoutes.beforeEach((to, from, next) => {
  let isLogin = Cookies.get('isLogin')
  if (to.path == '/login') {
    next()
  }
  else if (store.state.routes.length == 0) {
    getRouters().then((res) => {
      if(res){
        console.log('111')
        addRoutes(res.data)
        next({
          ...to,
          replace: true
        })
      }
      else{
        // ElMessage.error('登录状态已过期，请重新登录')
        // constantRoutes.push('/login')
      }
    })

  }
  else {
    console.log('直接跳转')
    next()
  }
})

export default constantRoutes;
